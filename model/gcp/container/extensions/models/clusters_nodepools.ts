// Auto-generated extension model for @swamp/gcp/container/clusters-nodepools
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Kubernetes Engine Clusters.NodePools.
 *
 * NodePool contains the name and configuration for a cluster's node pool. Node pools are a set of nodes (i.e. VM's), with a common configuration and specification, under the control of the cluster master. They may have a set of Kubernetes labels applied to them, which may be used to reference them during pod scheduling. They may also be resized up or down, to accommodate the workload.
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
  return `${parent}/nodePools/${shortName}`;
}

const BASE_URL = "https://container.googleapis.com/";

const GET_CONFIG = {
  "id": "container.projects.locations.clusters.nodePools.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "clusterId": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "nodePoolId": {
      "location": "query",
    },
    "projectId": {
      "location": "query",
    },
    "zone": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "container.projects.locations.clusters.nodePools.create",
  "path": "v1/{+parent}/nodePools",
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

const UPDATE_CONFIG = {
  "id": "container.projects.locations.clusters.nodePools.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "container.projects.locations.clusters.nodePools.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "clusterId": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "nodePoolId": {
      "location": "query",
    },
    "projectId": {
      "location": "query",
    },
    "zone": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  nodePool: z.object({
    autopilotConfig: z.object({
      enabled: z.boolean().describe(
        "Denotes that nodes belonging to this node pool are Autopilot nodes.",
      ).optional(),
    }).describe(
      "AutopilotConfig contains configuration of autopilot feature for this node pool.",
    ).optional(),
    autoscaling: z.object({
      autoprovisioned: z.boolean().describe(
        "Can this node pool be deleted automatically.",
      ).optional(),
      enabled: z.boolean().describe(
        "Is autoscaling enabled for this node pool.",
      ).optional(),
      locationPolicy: z.enum(["LOCATION_POLICY_UNSPECIFIED", "BALANCED", "ANY"])
        .describe("Location policy used when scaling up a node pool.")
        .optional(),
      maxNodeCount: z.number().int().describe(
        "Maximum number of nodes for one location in the node pool. Must be >= min_node_count. There has to be enough quota to scale up the cluster.",
      ).optional(),
      minNodeCount: z.number().int().describe(
        "Minimum number of nodes for one location in the node pool. Must be greater than or equal to 0 and less than or equal to max_node_count.",
      ).optional(),
      totalMaxNodeCount: z.number().int().describe(
        "Maximum number of nodes in the node pool. Must be greater than or equal to total_min_node_count. There has to be enough quota to scale up the cluster. The total_*_node_count fields are mutually exclusive with the *_node_count fields.",
      ).optional(),
      totalMinNodeCount: z.number().int().describe(
        "Minimum number of nodes in the node pool. Must be greater than or equal to 0 and less than or equal to total_max_node_count. The total_*_node_count fields are mutually exclusive with the *_node_count fields.",
      ).optional(),
    }).describe(
      "NodePoolAutoscaling contains information required by cluster autoscaler to adjust the size of the node pool to the current cluster usage.",
    ).optional(),
    bestEffortProvisioning: z.object({
      enabled: z.boolean().describe(
        "When this is enabled, cluster/node pool creations will ignore non-fatal errors like stockout to best provision as many nodes as possible right now and eventually bring up all target number of nodes",
      ).optional(),
      minProvisionNodes: z.number().int().describe(
        "Minimum number of nodes to be provisioned to be considered as succeeded, and the rest of nodes will be provisioned gradually and eventually when stockout issue has been resolved.",
      ).optional(),
    }).describe("Best effort provisioning.").optional(),
    conditions: z.array(z.object({
      canonicalCode: z.enum([
        "OK",
        "CANCELLED",
        "UNKNOWN",
        "INVALID_ARGUMENT",
        "DEADLINE_EXCEEDED",
        "NOT_FOUND",
        "ALREADY_EXISTS",
        "PERMISSION_DENIED",
        "UNAUTHENTICATED",
        "RESOURCE_EXHAUSTED",
        "FAILED_PRECONDITION",
        "ABORTED",
        "OUT_OF_RANGE",
        "UNIMPLEMENTED",
        "INTERNAL",
        "UNAVAILABLE",
        "DATA_LOSS",
      ]).describe("Canonical code of the condition.").optional(),
      code: z.enum([
        "UNKNOWN",
        "GCE_STOCKOUT",
        "GKE_SERVICE_ACCOUNT_DELETED",
        "GCE_QUOTA_EXCEEDED",
        "SET_BY_OPERATOR",
        "CLOUD_KMS_KEY_ERROR",
        "CA_EXPIRING",
        "NODE_SERVICE_ACCOUNT_MISSING_PERMISSIONS",
        "CLOUD_KMS_KEY_DESTROYED",
      ]).describe(
        "Machine-friendly representation of the condition Deprecated. Use canonical_code instead.",
      ).optional(),
      message: z.string().describe(
        "Human-friendly representation of the condition",
      ).optional(),
    })).describe("Which conditions caused the current node pool state.")
      .optional(),
    config: z.object({
      accelerators: z.array(z.object({
        acceleratorCount: z.string().describe(
          "The number of the accelerator cards exposed to an instance.",
        ).optional(),
        acceleratorType: z.string().describe(
          "The accelerator type resource name. List of supported accelerators [here](https://cloud.google.com/compute/docs/gpus)",
        ).optional(),
        gpuDriverInstallationConfig: z.object({
          gpuDriverVersion: z.unknown().describe(
            "Mode for how the GPU driver is installed.",
          ).optional(),
        }).describe(
          "GPUDriverInstallationConfig specifies the version of GPU driver to be auto installed.",
        ).optional(),
        gpuPartitionSize: z.string().describe(
          "Size of partitions to create on the GPU. Valid values are described in the NVIDIA [mig user guide](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning).",
        ).optional(),
        gpuSharingConfig: z.object({
          gpuSharingStrategy: z.unknown().describe(
            "The type of GPU sharing strategy to enable on the GPU node.",
          ).optional(),
          maxSharedClientsPerGpu: z.unknown().describe(
            "The max number of containers that can share a physical GPU.",
          ).optional(),
        }).describe(
          "GPUSharingConfig represents the GPU sharing configuration for Hardware Accelerators.",
        ).optional(),
      })).describe(
        "A list of hardware accelerators to be attached to each node. See https://cloud.google.com/compute/docs/gpus for more information about support for GPUs.",
      ).optional(),
      advancedMachineFeatures: z.object({
        enableNestedVirtualization: z.boolean().describe(
          "Whether or not to enable nested virtualization (defaults to false).",
        ).optional(),
        performanceMonitoringUnit: z.enum([
          "PERFORMANCE_MONITORING_UNIT_UNSPECIFIED",
          "ARCHITECTURAL",
          "STANDARD",
          "ENHANCED",
        ]).describe(
          "Type of Performance Monitoring Unit (PMU) requested on node pool instances. If unset, PMU will not be available to the node.",
        ).optional(),
        threadsPerCore: z.string().describe(
          "The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed.",
        ).optional(),
      }).describe(
        "Specifies options for controlling advanced machine features.",
      ).optional(),
      bootDisk: z.object({
        diskType: z.string().describe(
          "Disk type of the boot disk. (i.e. Hyperdisk-Balanced, PD-Balanced, etc.)",
        ).optional(),
        provisionedIops: z.string().describe(
          "For Hyperdisk-Balanced only, the provisioned IOPS config value.",
        ).optional(),
        provisionedThroughput: z.string().describe(
          "For Hyperdisk-Balanced only, the provisioned throughput config value.",
        ).optional(),
        sizeGb: z.string().describe(
          "Disk size in GB. Replaces NodeConfig.disk_size_gb",
        ).optional(),
      }).describe(
        "BootDisk specifies the boot disk configuration for node pools.",
      ).optional(),
      bootDiskKmsKey: z.string().describe(
        "The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption",
      ).optional(),
      confidentialNodes: z.object({
        confidentialInstanceType: z.enum([
          "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED",
          "SEV",
          "SEV_SNP",
          "TDX",
        ]).describe(
          "Defines the type of technology used by the confidential node.",
        ).optional(),
        enabled: z.boolean().describe(
          "Whether Confidential Nodes feature is enabled.",
        ).optional(),
      }).describe(
        "ConfidentialNodes is configuration for the confidential nodes feature, which makes nodes run on confidential VMs.",
      ).optional(),
      consolidationDelay: z.string().describe(
        "Consolidation delay defines duration after which the Cluster Autoscaler can scale down underutilized nodes. If not set, nodes are scaled down by default behavior, i.e. according to the chosen autoscaling profile.",
      ).optional(),
      containerdConfig: z.object({
        privateRegistryAccessConfig: z.object({
          certificateAuthorityDomainConfig: z.array(z.unknown()).describe(
            "Private registry access configuration.",
          ).optional(),
          enabled: z.boolean().describe("Private registry access is enabled.")
            .optional(),
        }).describe(
          "PrivateRegistryAccessConfig contains access configuration for private container registries.",
        ).optional(),
        registryHosts: z.array(z.object({
          hosts: z.unknown().describe(
            "HostConfig configures a list of host-specific configurations for the server. Each server can have at most 10 host configurations.",
          ).optional(),
          server: z.unknown().describe(
            "Defines the host name of the registry server, which will be used to create configuration file as /etc/containerd/hosts.d//hosts.toml. It supports fully qualified domain names (FQDN) and IP addresses: Specifying port is supported, while scheme and path are NOT supported. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `10.0.1.2:5000`",
          ).optional(),
        })).describe(
          "RegistryHostConfig configures containerd registry host configuration. Each registry_hosts represents a hosts.toml file. At most 25 registry_hosts are allowed.",
        ).optional(),
        writableCgroups: z.object({
          enabled: z.boolean().describe(
            "Optional. Whether writable cgroups is enabled.",
          ).optional(),
        }).describe("Defines writable cgroups configuration.").optional(),
      }).describe(
        "ContainerdConfig contains configuration to customize containerd.",
      ).optional(),
      diskSizeGb: z.number().int().describe(
        "Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 10GB. If unspecified, the default disk size is 100GB.",
      ).optional(),
      diskType: z.string().describe(
        "Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard'",
      ).optional(),
      effectiveCgroupMode: z.enum([
        "EFFECTIVE_CGROUP_MODE_UNSPECIFIED",
        "EFFECTIVE_CGROUP_MODE_V1",
        "EFFECTIVE_CGROUP_MODE_V2",
      ]).describe(
        "Output only. effective_cgroup_mode is the cgroup mode actually used by the node pool. It is determined by the cgroup mode specified in the LinuxNodeConfig or the default cgroup mode based on the cluster creation version.",
      ).optional(),
      enableConfidentialStorage: z.boolean().describe(
        "Optional. Reserved for future use.",
      ).optional(),
      ephemeralStorageLocalSsdConfig: z.object({
        dataCacheCount: z.number().int().describe(
          "Number of local SSDs to use for GKE Data Cache.",
        ).optional(),
        localSsdCount: z.number().int().describe(
          "Number of local SSDs to use to back ephemeral storage. Uses NVMe interfaces. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info.",
        ).optional(),
      }).describe(
        "EphemeralStorageLocalSsdConfig contains configuration for the node ephemeral storage using Local SSDs.",
      ).optional(),
      fastSocket: z.object({
        enabled: z.boolean().describe(
          "Whether Fast Socket features are enabled in the node pool.",
        ).optional(),
      }).describe("Configuration of Fast Socket feature.").optional(),
      flexStart: z.boolean().describe(
        "Flex Start flag for enabling Flex Start VM.",
      ).optional(),
      gcfsConfig: z.object({
        enabled: z.boolean().describe("Whether to use GCFS.").optional(),
      }).describe(
        "GcfsConfig contains configurations of Google Container File System (image streaming).",
      ).optional(),
      gpuDirectConfig: z.object({
        gpuDirectStrategy: z.enum(["GPU_DIRECT_STRATEGY_UNSPECIFIED", "RDMA"])
          .describe(
            "The type of GPU direct strategy to enable on the node pool.",
          ).optional(),
      }).describe(
        "GPUDirectConfig specifies the GPU direct strategy on the node pool.",
      ).optional(),
      gvnic: z.object({
        enabled: z.boolean().describe(
          "Whether gVNIC features are enabled in the node pool.",
        ).optional(),
      }).describe("Configuration of gVNIC feature.").optional(),
      imageType: z.string().describe(
        "The image type to use for this node. Note that for a given image type, the latest version of it will be used. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types.",
      ).optional(),
      kubeletConfig: z.object({
        allowedUnsafeSysctls: z.array(z.string()).describe(
          "Optional. Defines a comma-separated allowlist of unsafe sysctls or sysctl patterns (ending in `*`). The unsafe namespaced sysctl groups are `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`, and `net.*`. Leaving this allowlist empty means they cannot be set on Pods. To allow certain sysctls or sysctl patterns to be set on Pods, list them separated by commas. For example: `kernel.msg*,net.ipv4.route.min_pmtu`. See https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/ for more details.",
        ).optional(),
        containerLogMaxFiles: z.number().int().describe(
          "Optional. Defines the maximum number of container log files that can be present for a container. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation The value must be an integer between 2 and 10, inclusive. The default value is 5 if unspecified.",
        ).optional(),
        containerLogMaxSize: z.string().describe(
          "Optional. Defines the maximum size of the container log file before it is rotated. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation Valid format is positive number + unit, e.g. 100Ki, 10Mi. Valid units are Ki, Mi, Gi. The value must be between 10Mi and 500Mi, inclusive. Note that the total container log size (container_log_max_size * container_log_max_files) cannot exceed 1% of the total storage of the node, to avoid disk pressure caused by log files. The default value is 10Mi if unspecified.",
        ).optional(),
        cpuCfsQuota: z.boolean().describe(
          "Enable CPU CFS quota enforcement for containers that specify CPU limits. This option is enabled by default which makes kubelet use CFS quota (https://www.kernel.org/doc/Documentation/scheduler/sched-bwc.txt) to enforce container CPU limits. Otherwise, CPU limits will not be enforced at all. Disable this option to mitigate CPU throttling problems while still having your pods to be in Guaranteed QoS class by specifying the CPU limits. The default value is 'true' if unspecified.",
        ).optional(),
        cpuCfsQuotaPeriod: z.string().describe(
          'Set the CPU CFS quota period value \'cpu.cfs_period_us\'. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration between 1ms and 1 second, inclusive.',
        ).optional(),
        cpuManagerPolicy: z.string().describe(
          'Control the CPU management policy on the node. See https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/ The following values are allowed. * "none": the default, which represents the existing scheduling behavior. * "static": allows pods with certain resource characteristics to be granted increased CPU affinity and exclusivity on the node. The default value is \'none\' if unspecified.',
        ).optional(),
        crashLoopBackOff: z.object({
          maxContainerRestartPeriod: z.string().describe(
            'Optional. The maximum duration the backoff delay can accrue to for container restarts, minimum 1 second, maximum 300 seconds. If not set, defaults to the internal crashloopbackoff maximum. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". See https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#configurable-container-restart-delay for more details.',
          ).optional(),
        }).describe(
          "Contains config to modify node-level parameters for container restart behavior.",
        ).optional(),
        evictionMaxPodGracePeriodSeconds: z.number().int().describe(
          "Optional. eviction_max_pod_grace_period_seconds is the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met. This value effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions. Default: 0. Range: [0, 300].",
        ).optional(),
        evictionMinimumReclaim: z.object({
          imagefsAvailable: z.string().describe(
            'Optional. Minimum reclaim for eviction due to imagefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          imagefsInodesFree: z.string().describe(
            'Optional. Minimum reclaim for eviction due to imagefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          memoryAvailable: z.string().describe(
            'Optional. Minimum reclaim for eviction due to memory available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsAvailable: z.string().describe(
            'Optional. Minimum reclaim for eviction due to nodefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsInodesFree: z.string().describe(
            'Optional. Minimum reclaim for eviction due to nodefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          pidAvailable: z.string().describe(
            'Optional. Minimum reclaim for eviction due to pid available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
        }).describe(
          "Eviction minimum reclaims are the resource amounts of minimum reclaims for each eviction signal.",
        ).optional(),
        evictionSoft: z.object({
          imagefsAvailable: z.string().describe(
            'Optional. Amount of storage available on filesystem that container runtime uses for storing images layers. If the container filesystem and image filesystem are not separate, then imagefs can store both image layers and writeable layers. Defines the amount of "imagefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 15% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          imagefsInodesFree: z.string().describe(
            'Optional. Amount of inodes available on filesystem that container runtime uses for storing images layers. Defines the amount of "imagefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          memoryAvailable: z.string().describe(
            'Optional. Memory available (i.e. capacity - workingSet), in bytes. Defines the amount of "memory.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Format: positive number + unit, e.g. 100Ki, 10Mi, 5Gi. Valid units are Ki, Mi, Gi. Must be >= 100Mi and <= 50% of the node\'s memory. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsAvailable: z.string().describe(
            'Optional. Amount of storage available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsInodesFree: z.string().describe(
            'Optional. Amount of inodes available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          pidAvailable: z.string().describe(
            'Optional. Amount of PID available for pod allocation. Defines the amount of "pid.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
        }).describe(
          "Eviction signals are the current state of a particular resource at a specific point in time. The kubelet uses eviction signals to make eviction decisions by comparing the signals to eviction thresholds, which are the minimum amount of the resource that should be available on the node.",
        ).optional(),
        evictionSoftGracePeriod: z.object({
          imagefsAvailable: z.string().describe(
            'Optional. Grace period for eviction due to imagefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          imagefsInodesFree: z.string().describe(
            'Optional. Grace period for eviction due to imagefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          memoryAvailable: z.string().describe(
            'Optional. Grace period for eviction due to memory available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsAvailable: z.string().describe(
            'Optional. Grace period for eviction due to nodefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsInodesFree: z.string().describe(
            'Optional. Grace period for eviction due to nodefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          pidAvailable: z.string().describe(
            'Optional. Grace period for eviction due to pid available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
        }).describe(
          "Eviction grace periods are grace periods for each eviction signal.",
        ).optional(),
        imageGcHighThresholdPercent: z.number().int().describe(
          "Optional. Defines the percent of disk usage after which image garbage collection is always run. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and greater than image_gc_low_threshold_percent. The default value is 85 if unspecified.",
        ).optional(),
        imageGcLowThresholdPercent: z.number().int().describe(
          "Optional. Defines the percent of disk usage before which image garbage collection is never run. Lowest disk usage to garbage collect to. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and smaller than image_gc_high_threshold_percent. The default value is 80 if unspecified.",
        ).optional(),
        imageMaximumGcAge: z.string().describe(
          'Optional. Defines the maximum age an image can be unused before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration greater than image_minimum_gc_age or "0s". The default value is "0s" if unspecified, which disables this field, meaning images won\'t be garbage collected based on being unused for too long.',
        ).optional(),
        imageMinimumGcAge: z.string().describe(
          'Optional. Defines the minimum age for an unused image before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration less than or equal to 2 minutes. The default value is "2m0s" if unspecified.',
        ).optional(),
        insecureKubeletReadonlyPortEnabled: z.boolean().describe(
          "Enable or disable Kubelet read only port.",
        ).optional(),
        maxParallelImagePulls: z.number().int().describe(
          "Optional. Defines the maximum number of image pulls in parallel. The range is 2 to 5, inclusive. The default value is 2 or 3 depending on the disk type. See https://kubernetes.io/docs/concepts/containers/images/#maximum-parallel-image-pulls for more details.",
        ).optional(),
        memoryManager: z.object({
          policy: z.string().describe(
            'Controls the memory management policy on the Node. See https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/#policies The following values are allowed. * "none" * "static" The default value is \'none\' if unspecified.',
          ).optional(),
        }).describe(
          "The option enables the Kubernetes NUMA-aware Memory Manager feature. Detailed description about the feature can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/).",
        ).optional(),
        podPidsLimit: z.string().describe(
          "Set the Pod PID limits. See https://kubernetes.io/docs/concepts/policy/pid-limiting/#pod-pid-limits Controls the maximum number of processes allowed to run in a pod. The value must be greater than or equal to 1024 and less than 4194304.",
        ).optional(),
        shutdownGracePeriodCriticalPodsSeconds: z.number().int().describe(
          "Optional. shutdown_grace_period_critical_pods_seconds is the maximum allowed grace period (in seconds) used to terminate critical pods during a node shutdown. This value should be <= shutdown_grace_period_seconds, and is only valid if shutdown_grace_period_seconds is set. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ Range: [0, 120].",
        ).optional(),
        shutdownGracePeriodSeconds: z.number().int().describe(
          "Optional. shutdown_grace_period_seconds is the maximum allowed grace period (in seconds) the total duration that the node should delay the shutdown during a graceful shutdown. This is the total grace period for pod termination for both regular and critical pods. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ If set to 0, node will not enable the graceful node shutdown functionality. This field is only valid for Spot VMs. Allowed values: 0, 30, 120.",
        ).optional(),
        singleProcessOomKill: z.boolean().describe(
          "Optional. Defines whether to enable single process OOM killer. If true, will prevent the memory.oom.group flag from being set for container cgroups in cgroups v2. This causes processes in the container to be OOM killed individually instead of as a group.",
        ).optional(),
        topologyManager: z.object({
          policy: z.string().describe(
            "Configures the strategy for resource alignment. Allowed values are: * none: the default policy, and does not perform any topology alignment. * restricted: the topology manager stores the preferred NUMA node affinity for the container, and will reject the pod if the affinity if not preferred. * best-effort: the topology manager stores the preferred NUMA node affinity for the container. If the affinity is not preferred, the topology manager will admit the pod to the node anyway. * single-numa-node: the topology manager determines if the single NUMA node affinity is possible. If it is, Topology Manager will store this and the Hint Providers can then use this information when making the resource allocation decision. If, however, this is not possible then the Topology Manager will reject the pod from the node. This will result in a pod in a Terminated state with a pod admission failure. The default policy value is 'none' if unspecified. Details about each strategy can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-policies).",
          ).optional(),
          scope: z.string().describe(
            "The Topology Manager aligns resources in following scopes: * container * pod The default scope is 'container' if unspecified. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-scopes",
          ).optional(),
        }).describe(
          "TopologyManager defines the configuration options for Topology Manager feature. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/",
        ).optional(),
      }).describe("Node kubelet configs.").optional(),
      labels: z.record(z.string(), z.string()).describe(
        "The Kubernetes labels (key/value pairs) to apply to each node. The values in this field are added to the set of default labels Kubernetes applies to nodes. This field has the following restrictions: * Labels must use a valid Kubernetes syntax and character set, as defined in https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set. * This field supports up to 1,024 total characters in a single request. Depending on the Kubernetes version, keys in this field might conflict with the keys of the default labels, which might change which of your labels are applied to the nodes. Assume that the behavior is unpredictable and avoid label key conflicts. For more information about the default labels, see: https://kubernetes.io/docs/reference/labels-annotations-taints/",
      ).optional(),
      linuxNodeConfig: z.object({
        accurateTimeConfig: z.object({
          enablePtpKvmTimeSync: z.boolean().describe(
            "Enables enhanced time synchronization using PTP-KVM.",
          ).optional(),
        }).describe(
          "AccurateTimeConfig contains configuration for the accurate time synchronization feature.",
        ).optional(),
        cgroupMode: z.enum([
          "CGROUP_MODE_UNSPECIFIED",
          "CGROUP_MODE_V1",
          "CGROUP_MODE_V2",
        ]).describe(
          "cgroup_mode specifies the cgroup mode to be used on the node.",
        ).optional(),
        customNodeInit: z.object({
          initScript: z.object({
            args: z.unknown().describe(
              "Optional. The optional arguments line to be passed to the init script.",
            ).optional(),
            gcpSecretManagerSecretUri: z.unknown().describe(
              "The resource name of the secret manager secret hosting the init script. Both global and regional secrets are supported with format below: Global secret: projects/{project}/secrets/{secret}/versions/{version} Regional secret: projects/{project}/locations/{location}/secrets/{secret}/versions/{version} Example: projects/1234567890/secrets/script_1/versions/1. Accept version number only, not support version alias. User can't configure both gcp_secret_manager_secret_uri and gcs_uri.",
            ).optional(),
            gcsGeneration: z.unknown().describe(
              'The generation of the init script stored in Gloud Storage. This is the required field to identify the version of the init script. User can get the genetaion from `gcloud storage objects describe gs://BUCKET_NAME/OBJECT_NAME --format="value(generation)"` or from the "Version history" tab of the object in the Cloud Console UI.',
            ).optional(),
            gcsUri: z.unknown().describe(
              "The Cloud Storage URI for storing the init script. Format: gs://BUCKET_NAME/OBJECT_NAME The service account on the node pool must have read access to the object. User can't configure both gcs_uri and gcp_secret_manager_secret_uri.",
            ).optional(),
          }).describe(
            "InitScript provide a simply bash script to be executed on the node.",
          ).optional(),
        }).describe(
          "Support for running custom init code while bootstrapping nodes.",
        ).optional(),
        hugepages: z.object({
          hugepageSize1g: z.number().int().describe(
            "Optional. Amount of 1G hugepages",
          ).optional(),
          hugepageSize2m: z.number().int().describe(
            "Optional. Amount of 2M hugepages",
          ).optional(),
        }).describe("Hugepages amount in both 2m and 1g size").optional(),
        nodeKernelModuleLoading: z.object({
          policy: z.enum([
            "POLICY_UNSPECIFIED",
            "ENFORCE_SIGNED_MODULES",
            "DO_NOT_ENFORCE_SIGNED_MODULES",
          ]).describe(
            "Set the node module loading policy for nodes in the node pool.",
          ).optional(),
        }).describe("Configuration for kernel module loading on nodes.")
          .optional(),
        swapConfig: z.object({
          bootDiskProfile: z.object({
            swapSizeGib: z.unknown().describe(
              "Specifies the size of the swap space in gibibytes (GiB).",
            ).optional(),
            swapSizePercent: z.unknown().describe(
              "Specifies the size of the swap space as a percentage of the boot disk size.",
            ).optional(),
          }).describe("Swap on the node's boot disk.").optional(),
          dedicatedLocalSsdProfile: z.object({
            diskCount: z.unknown().describe(
              "The number of physical local NVMe SSD disks to attach.",
            ).optional(),
          }).describe(
            "Provisions a new, separate local NVMe SSD exclusively for swap.",
          ).optional(),
          enabled: z.boolean().describe(
            "Optional. Enables or disables swap for the node pool.",
          ).optional(),
          encryptionConfig: z.object({
            disabled: z.unknown().describe(
              "Optional. If true, swap space will not be encrypted. Defaults to false (encrypted).",
            ).optional(),
          }).describe("Defines encryption settings for the swap space.")
            .optional(),
          ephemeralLocalSsdProfile: z.object({
            swapSizeGib: z.unknown().describe(
              "Specifies the size of the swap space in gibibytes (GiB).",
            ).optional(),
            swapSizePercent: z.unknown().describe(
              "Specifies the size of the swap space as a percentage of the ephemeral local SSD capacity.",
            ).optional(),
          }).describe(
            "Swap on the local SSD shared with pod ephemeral storage.",
          ).optional(),
        }).describe("Configuration for swap memory on a node pool.").optional(),
        sysctls: z.record(z.string(), z.string()).describe(
          "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
        ).optional(),
        transparentHugepageDefrag: z.enum([
          "TRANSPARENT_HUGEPAGE_DEFRAG_UNSPECIFIED",
          "TRANSPARENT_HUGEPAGE_DEFRAG_ALWAYS",
          "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER",
          "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER_WITH_MADVISE",
          "TRANSPARENT_HUGEPAGE_DEFRAG_MADVISE",
          "TRANSPARENT_HUGEPAGE_DEFRAG_NEVER",
        ]).describe(
          "Optional. Defines the transparent hugepage defrag configuration on the node. VM hugepage allocation can be managed by either limiting defragmentation for delayed allocation or skipping it entirely for immediate allocation only. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
        ).optional(),
        transparentHugepageEnabled: z.enum([
          "TRANSPARENT_HUGEPAGE_ENABLED_UNSPECIFIED",
          "TRANSPARENT_HUGEPAGE_ENABLED_ALWAYS",
          "TRANSPARENT_HUGEPAGE_ENABLED_MADVISE",
          "TRANSPARENT_HUGEPAGE_ENABLED_NEVER",
        ]).describe(
          "Optional. Transparent hugepage support for anonymous memory can be entirely disabled (mostly for debugging purposes) or only enabled inside MADV_HUGEPAGE regions (to avoid the risk of consuming more memory resources) or enabled system wide. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
        ).optional(),
      }).describe("Parameters that can be configured on Linux nodes.")
        .optional(),
      localNvmeSsdBlockConfig: z.object({
        localSsdCount: z.number().int().describe(
          "Number of local NVMe SSDs to use. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info.",
        ).optional(),
      }).describe(
        "LocalNvmeSsdBlockConfig contains configuration for using raw-block local NVMe SSDs",
      ).optional(),
      localSsdCount: z.number().int().describe(
        "The number of local SSD disks to be attached to the node. The limit for this value is dependent upon the maximum number of disks available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information.",
      ).optional(),
      localSsdEncryptionMode: z.enum([
        "LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED",
        "STANDARD_ENCRYPTION",
        "EPHEMERAL_KEY_ENCRYPTION",
      ]).describe(
        "Specifies which method should be used for encrypting the Local SSDs attached to the node.",
      ).optional(),
      loggingConfig: z.object({
        variantConfig: z.object({
          variant: z.enum(["VARIANT_UNSPECIFIED", "DEFAULT", "MAX_THROUGHPUT"])
            .describe("Logging variant deployed on nodes.").optional(),
        }).describe(
          "LoggingVariantConfig specifies the behaviour of the logging component.",
        ).optional(),
      }).describe(
        "NodePoolLoggingConfig specifies logging configuration for node pools.",
      ).optional(),
      machineType: z.string().describe(
        "The name of a Google Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-types) If unspecified, the default machine type is `e2-medium`.",
      ).optional(),
      maxRunDuration: z.string().describe(
        "The maximum duration for the nodes to exist. If unspecified, the nodes can exist indefinitely.",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        'The metadata key/value pairs assigned to instances in the cluster. Keys must conform to the regexp `[a-zA-Z0-9-_]+` and be less than 128 bytes in length. These are reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project or be one of the reserved keys: - "cluster-location" - "cluster-name" - "cluster-uid" - "configure-sh" - "containerd-configure-sh" - "enable-os-login" - "gci-ensure-gke-docker" - "gci-metrics-enabled" - "gci-update-strategy" - "instance-template" - "kube-env" - "startup-script" - "user-data" - "disable-address-manager" - "windows-startup-script-ps1" - "common-psm1" - "k8s-node-setup-psm1" - "install-ssh-psm1" - "user-profile-psm1" Values are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on them is that each value\'s size must be less than or equal to 32 KB. The total size of all keys and values must be less than 512 KB.',
      ).optional(),
      minCpuPlatform: z.string().describe(
        'Minimum CPU platform to be used by this instance. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: "Intel Haswell"` or `minCpuPlatform: "Intel Sandy Bridge"`. For more information, read [how to specify min CPU platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform)',
      ).optional(),
      nodeGroup: z.string().describe(
        "Setting this field will assign instances of this pool to run on the specified node group. This is useful for running workloads on [sole tenant nodes](https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes).",
      ).optional(),
      oauthScopes: z.array(z.string()).describe(
        'The set of Google API scopes to be made available on all of the node VMs under the "default" service account. The following scopes are recommended, but not required, and by default are not included: * `https://www.googleapis.com/auth/compute` is required for mounting persistent storage on your nodes. * `https://www.googleapis.com/auth/devstorage.read_only` is required for communicating with **gcr.io** (the [Artifact Registry](https://cloud.google.com/artifact-registry/)). If unspecified, no scopes are added, unless Cloud Logging or Cloud Monitoring are enabled, in which case their required scopes will be added.',
      ).optional(),
      preemptible: z.boolean().describe(
        "Whether the nodes are created as preemptible VM instances. See: https://cloud.google.com/compute/docs/instances/preemptible for more information about preemptible VM instances.",
      ).optional(),
      reservationAffinity: z.object({
        consumeReservationType: z.enum([
          "UNSPECIFIED",
          "NO_RESERVATION",
          "ANY_RESERVATION",
          "SPECIFIC_RESERVATION",
        ]).describe("Corresponds to the type of reservation consumption.")
          .optional(),
        key: z.string().describe(
          'Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, specify "compute.googleapis.com/reservation-name" as the key and specify the name of your reservation as its value.',
        ).optional(),
        values: z.array(z.string()).describe(
          "Corresponds to the label value(s) of reservation resource(s).",
        ).optional(),
      }).describe(
        "[ReservationAffinity](https://cloud.google.com/compute/docs/instances/reserving-zonal-resources) is the configuration of desired reservation which instances could take capacity from.",
      ).optional(),
      resourceLabels: z.record(z.string(), z.string()).describe(
        "The resource labels for the node pool to use to annotate any related Google Compute Engine resources.",
      ).optional(),
      resourceManagerTags: z.object({
        tags: z.record(z.string(), z.string()).describe(
          "TagKeyValue must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}`",
        ).optional(),
      }).describe(
        "A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.",
      ).optional(),
      sandboxConfig: z.object({
        type: z.enum(["UNSPECIFIED", "GVISOR"]).describe(
          "Type of the sandbox to use for the node.",
        ).optional(),
      }).describe(
        "SandboxConfig contains configurations of the sandbox to use for the node.",
      ).optional(),
      secondaryBootDiskUpdateStrategy: z.object({}).describe(
        "SecondaryBootDiskUpdateStrategy is a placeholder which will be extended in the future to define different options for updating secondary boot disks.",
      ).optional(),
      secondaryBootDisks: z.array(z.object({
        diskImage: z.string().describe(
          "Fully-qualified resource ID for an existing disk image.",
        ).optional(),
        mode: z.enum(["MODE_UNSPECIFIED", "CONTAINER_IMAGE_CACHE"]).describe(
          "Disk mode (container image cache, etc.)",
        ).optional(),
      })).describe("List of secondary boot disks attached to the nodes.")
        .optional(),
      serviceAccount: z.string().describe(
        'The Google Cloud Platform Service Account to be used by the node VMs. Specify the email address of the Service Account; otherwise, if no Service Account is specified, the "default" service account is used.',
      ).optional(),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean().describe(
          "Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created.",
        ).optional(),
        enableSecureBoot: z.boolean().describe(
          "Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails.",
        ).optional(),
      }).describe("A set of Shielded Instance options.").optional(),
      soleTenantConfig: z.object({
        minNodeCpus: z.number().int().describe(
          "Optional. The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. This field can only be set if the node pool is created in a shared sole-tenant node group.",
        ).optional(),
        nodeAffinities: z.array(z.object({
          key: z.unknown().describe("Key for NodeAffinity.").optional(),
          operator: z.unknown().describe("Operator for NodeAffinity.")
            .optional(),
          values: z.unknown().describe("Values for NodeAffinity.").optional(),
        })).describe(
          "NodeAffinities used to match to a shared sole tenant node group.",
        ).optional(),
      }).describe(
        "SoleTenantConfig contains the NodeAffinities to specify what shared sole tenant node groups should back the node pool.",
      ).optional(),
      spot: z.boolean().describe(
        "Spot flag for enabling Spot VM, which is a rebrand of the existing preemptible flag.",
      ).optional(),
      storagePools: z.array(z.string()).describe(
        "List of Storage Pools where boot disks are provisioned.",
      ).optional(),
      tags: z.array(z.string()).describe(
        "The list of instance tags applied to all nodes. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during cluster or node pool creation. Each tag within the list must comply with RFC1035.",
      ).optional(),
      taintConfig: z.object({
        architectureTaintBehavior: z.enum([
          "ARCHITECTURE_TAINT_BEHAVIOR_UNSPECIFIED",
          "NONE",
          "ARM",
        ]).describe("Optional. Controls architecture tainting behavior.")
          .optional(),
      }).describe(
        "TaintConfig contains the configuration for the taints of the node pool.",
      ).optional(),
      taints: z.array(z.object({
        effect: z.enum([
          "EFFECT_UNSPECIFIED",
          "NO_SCHEDULE",
          "PREFER_NO_SCHEDULE",
          "NO_EXECUTE",
        ]).describe("Effect for taint.").optional(),
        key: z.string().describe("Key for taint.").optional(),
        value: z.string().describe("Value for taint.").optional(),
      })).describe(
        "List of kubernetes taints to be applied to each node. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/",
      ).optional(),
      windowsNodeConfig: z.object({
        osVersion: z.enum([
          "OS_VERSION_UNSPECIFIED",
          "OS_VERSION_LTSC2019",
          "OS_VERSION_LTSC2022",
        ]).describe(
          "OSVersion specifies the Windows node config to be used on the node.",
        ).optional(),
      }).describe(
        "Parameters that can be configured on Windows nodes. Windows Node Config that define the parameters that will be used to configure the Windows node pool settings.",
      ).optional(),
      workloadMetadataConfig: z.object({
        mode: z.enum(["MODE_UNSPECIFIED", "GCE_METADATA", "GKE_METADATA"])
          .describe(
            "Mode is the configuration for how to expose metadata to workloads running on the node pool.",
          ).optional(),
      }).describe(
        "WorkloadMetadataConfig defines the metadata configuration to expose to workloads on the node pool.",
      ).optional(),
    }).describe(
      "Parameters that describe the nodes in a cluster. GKE Autopilot clusters do not recognize parameters in `NodeConfig`. Use AutoprovisioningNodePoolDefaults instead.",
    ).optional(),
    etag: z.string().describe(
      "This checksum is computed by the server based on the value of node pool fields, and may be sent on update requests to ensure the client has an up-to-date value before proceeding.",
    ).optional(),
    initialNodeCount: z.number().int().describe(
      "The initial node count for the pool. You must ensure that your Compute Engine [resource quota](https://cloud.google.com/compute/quotas) is sufficient for this number of instances. You must also have available firewall and routes quota.",
    ).optional(),
    instanceGroupUrls: z.array(z.string()).describe(
      "Output only. The resource URLs of the [managed instance groups](https://cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with this node pool. During the node pool blue-green upgrade operation, the URLs contain both blue and green resources.",
    ).optional(),
    locations: z.array(z.string()).describe(
      "The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the NodePool's nodes should be located. If this value is unspecified during node pool creation, the [Cluster.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters#Cluster.FIELDS.locations) value will be used, instead. Warning: changing node pool locations will result in nodes being added and/or removed.",
    ).optional(),
    management: z.object({
      autoRepair: z.boolean().describe(
        "A flag that specifies whether the node auto-repair is enabled for the node pool. If enabled, the nodes in this node pool will be monitored and, if they fail health checks too many times, an automatic repair action will be triggered.",
      ).optional(),
      autoUpgrade: z.boolean().describe(
        "A flag that specifies whether node auto-upgrade is enabled for the node pool. If enabled, node auto-upgrade helps keep the nodes in your node pool up to date with the latest release version of Kubernetes.",
      ).optional(),
      upgradeOptions: z.object({
        autoUpgradeStartTime: z.string().describe(
          "Output only. This field is set when upgrades are about to commence with the approximate start time for the upgrades, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
        ).optional(),
        description: z.string().describe(
          "Output only. This field is set when upgrades are about to commence with the description of the upgrade.",
        ).optional(),
      }).describe(
        "AutoUpgradeOptions defines the set of options for the user to control how the Auto Upgrades will proceed.",
      ).optional(),
    }).describe(
      "NodeManagement defines the set of node management services turned on for the node pool.",
    ).optional(),
    maxPodsConstraint: z.object({
      maxPodsPerNode: z.string().describe(
        "Constraint enforced on the max num of pods per node.",
      ).optional(),
    }).describe("Constraints applied to pods.").optional(),
    name: z.string().describe("The name of the node pool.").optional(),
    networkConfig: z.object({
      acceleratorNetworkProfile: z.string().describe(
        'Immutable. The accelerator network profile for the node pool. For now the only valid value is "auto". If specified, the network configuration of the nodes in this node pool will be managed by this profile for the supported machine types, zone, etc.',
      ).optional(),
      additionalNodeNetworkConfigs: z.array(z.object({
        network: z.string().describe(
          "Name of the VPC where the additional interface belongs",
        ).optional(),
        subnetwork: z.string().describe(
          "Name of the subnetwork where the additional interface belongs",
        ).optional(),
      })).describe(
        "We specify the additional node networks for this node pool using this list. Each node network corresponds to an additional interface",
      ).optional(),
      additionalPodNetworkConfigs: z.array(z.object({
        maxPodsPerNode: z.object({
          maxPodsPerNode: z.unknown().describe(
            "Constraint enforced on the max num of pods per node.",
          ).optional(),
        }).describe("Constraints applied to pods.").optional(),
        networkAttachment: z.string().describe(
          "The name of the network attachment for pods to communicate to; cannot be specified along with subnetwork or secondary_pod_range.",
        ).optional(),
        secondaryPodRange: z.string().describe(
          "The name of the secondary range on the subnet which provides IP address for this pod range.",
        ).optional(),
        subnetwork: z.string().describe(
          "Name of the subnetwork where the additional pod network belongs.",
        ).optional(),
      })).describe(
        "We specify the additional pod networks for this node pool using this list. Each pod network corresponds to an additional alias IP range for the node",
      ).optional(),
      createPodRange: z.boolean().describe(
        "Input only. Whether to create a new range for pod IPs in this node pool. Defaults are provided for `pod_range` and `pod_ipv4_cidr_block` if they are not specified. If neither `create_pod_range` or `pod_range` are specified, the cluster-level default (`ip_allocation_policy.cluster_ipv4_cidr_block`) is used. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
      ).optional(),
      enablePrivateNodes: z.boolean().describe(
        "Whether nodes have internal IP addresses only. If enable_private_nodes is not specified, then the value is derived from Cluster.NetworkConfig.default_enable_private_nodes",
      ).optional(),
      networkPerformanceConfig: z.object({
        totalEgressBandwidthTier: z.enum(["TIER_UNSPECIFIED", "TIER_1"])
          .describe(
            "Specifies the total network bandwidth tier for the NodePool.",
          ).optional(),
      }).describe("Configuration of all network bandwidth tiers").optional(),
      networkTierConfig: z.object({
        networkTier: z.enum([
          "NETWORK_TIER_UNSPECIFIED",
          "NETWORK_TIER_DEFAULT",
          "NETWORK_TIER_PREMIUM",
          "NETWORK_TIER_STANDARD",
        ]).describe("Network tier configuration.").optional(),
      }).describe("NetworkTierConfig contains network tier information.")
        .optional(),
      podCidrOverprovisionConfig: z.object({
        disable: z.boolean().describe(
          "Whether Pod CIDR overprovisioning is disabled. Note: Pod CIDR overprovisioning is enabled by default.",
        ).optional(),
      }).describe("[PRIVATE FIELD] Config for pod CIDR size overprovisioning.")
        .optional(),
      podIpv4CidrBlock: z.string().describe(
        "The IP address range for pod IPs in this node pool. Only applicable if `create_pod_range` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) to pick a specific range to use. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
      ).optional(),
      podIpv4RangeUtilization: z.number().describe(
        "Output only. The utilization of the IPv4 range for the pod. The ratio is Usage/[Total number of IPs in the secondary range], Usage=numNodes*numZones*podIPsPerNode.",
      ).optional(),
      podRange: z.string().describe(
        "The ID of the secondary range for pod IPs. If `create_pod_range` is true, this ID is used for the new range. If `create_pod_range` is false, uses an existing secondary range with this ID. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
      ).optional(),
      subnetwork: z.string().describe(
        "Optional. The subnetwork name/path for the node pool. Format: projects/{project}/regions/{region}/subnetworks/{subnetwork} If the cluster is associated with multiple subnetworks, the subnetwork can be either: - A user supplied subnetwork name during node pool creation (e.g., `my-subnet`). The name must be between 1 and 63 characters long, start with a letter, contain only letters, numbers, and hyphens, and end with a letter or a number. - A full subnetwork path during node pool creation, such as `projects/gke-project/regions/us-central1/subnetworks/my-subnet` - A subnetwork path picked based on the IP utilization during node pool creation and is immutable.",
      ).optional(),
    }).describe("Parameters for node pool-level network config.").optional(),
    nodeDrainConfig: z.object({
      respectPdbDuringNodePoolDeletion: z.boolean().describe(
        "Whether to respect PDB during node pool deletion.",
      ).optional(),
    }).describe(
      "NodeDrainConfig contains the node drain related configurations for this node pool.",
    ).optional(),
    placementPolicy: z.object({
      policyName: z.string().describe(
        "If set, refers to the name of a custom resource policy supplied by the user. The resource policy must be in the same project and region as the node pool. If not found, InvalidArgument error is returned.",
      ).optional(),
      tpuTopology: z.string().describe(
        "Optional. TPU placement topology for pod slice node pool. https://cloud.google.com/tpu/docs/types-topologies#tpu_topologies",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "COMPACT"]).describe(
        "The type of placement.",
      ).optional(),
    }).describe(
      "PlacementPolicy defines the placement policy used by the node pool.",
    ).optional(),
    podIpv4CidrSize: z.number().int().describe(
      "Output only. The pod CIDR block size per node in this node pool.",
    ).optional(),
    queuedProvisioning: z.object({
      enabled: z.boolean().describe(
        "Denotes that this node pool is QRM specific, meaning nodes can be only obtained through queuing via the Cluster Autoscaler ProvisioningRequest API.",
      ).optional(),
    }).describe(
      "QueuedProvisioning defines the queued provisioning used by the node pool.",
    ).optional(),
    selfLink: z.string().describe(
      "Output only. Server-defined URL for the resource.",
    ).optional(),
    status: z.enum([
      "STATUS_UNSPECIFIED",
      "PROVISIONING",
      "RUNNING",
      "RUNNING_WITH_ERROR",
      "RECONCILING",
      "STOPPING",
      "ERROR",
    ]).describe("Output only. The status of the nodes in this pool instance.")
      .optional(),
    statusMessage: z.string().describe(
      "Output only. Deprecated. Use conditions instead. Additional information about the current status of this node pool instance, if available.",
    ).optional(),
    updateInfo: z.object({
      blueGreenInfo: z.object({
        blueInstanceGroupUrls: z.array(z.string()).describe(
          "The resource URLs of the [managed instance groups] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with blue pool.",
        ).optional(),
        bluePoolDeletionStartTime: z.string().describe(
          "Time to start deleting blue pool to complete blue-green upgrade, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
        ).optional(),
        greenInstanceGroupUrls: z.array(z.string()).describe(
          "The resource URLs of the [managed instance groups] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with green pool.",
        ).optional(),
        greenPoolVersion: z.string().describe("Version of green pool.")
          .optional(),
        phase: z.enum([
          "PHASE_UNSPECIFIED",
          "UPDATE_STARTED",
          "CREATING_GREEN_POOL",
          "CORDONING_BLUE_POOL",
          "DRAINING_BLUE_POOL",
          "NODE_POOL_SOAKING",
          "DELETING_BLUE_POOL",
          "ROLLBACK_STARTED",
        ]).describe("Current blue-green upgrade phase.").optional(),
      }).describe("Information relevant to blue-green upgrade.").optional(),
    }).describe(
      "UpdateInfo contains resource (instance groups, etc), status and other intermediate information relevant to a node pool upgrade.",
    ).optional(),
    upgradeSettings: z.object({
      blueGreenSettings: z.object({
        autoscaledRolloutPolicy: z.object({
          waitForDrainDuration: z.string().describe(
            "Optional. Time to wait after cordoning the blue pool before draining the nodes. Defaults to 3 days. The value can be set between 0 and 7 days, inclusive.",
          ).optional(),
        }).describe(
          "Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.",
        ).optional(),
        nodePoolSoakDuration: z.string().describe(
          "Time needed after draining entire blue pool. After this period, blue pool will be cleaned up.",
        ).optional(),
        standardRolloutPolicy: z.object({
          batchNodeCount: z.number().int().describe(
            "Number of blue nodes to drain in a batch.",
          ).optional(),
          batchPercentage: z.number().describe(
            "Percentage of the blue pool nodes to drain in a batch. The range of this field should be (0.0, 1.0].",
          ).optional(),
          batchSoakDuration: z.string().describe(
            "Soak time after each batch gets drained. Default to zero.",
          ).optional(),
        }).describe(
          "Standard rollout policy is the default policy for blue-green.",
        ).optional(),
      }).describe("Settings for blue-green upgrade.").optional(),
      maxSurge: z.number().int().describe(
        "The maximum number of nodes that can be created beyond the current size of the node pool during the upgrade process.",
      ).optional(),
      maxUnavailable: z.number().int().describe(
        "The maximum number of nodes that can be simultaneously unavailable during the upgrade process. A node is considered available if its status is Ready.",
      ).optional(),
      strategy: z.enum([
        "NODE_POOL_UPDATE_STRATEGY_UNSPECIFIED",
        "BLUE_GREEN",
        "SURGE",
        "SHORT_LIVED",
      ]).describe("Update strategy of the node pool.").optional(),
    }).describe(
      "These upgrade settings control the level of parallelism and the level of disruption caused by an upgrade. maxUnavailable controls the number of nodes that can be simultaneously unavailable. maxSurge controls the number of additional nodes that can be added to the node pool temporarily for the time of the upgrade to increase the number of available nodes. (maxUnavailable + maxSurge) determines the level of parallelism (how many nodes are being upgraded at the same time). Note: upgrades inevitably introduce some disruption since workloads need to be moved from old nodes to new, upgraded ones. Even if maxUnavailable=0, this holds true. (Disruption stays within the limits of PodDisruptionBudget, if it is configured.) Consider a hypothetical node pool with 5 nodes having maxSurge=2, maxUnavailable=1. This means the upgrade process upgrades 3 nodes simultaneously. It creates 2 additional (upgraded) nodes, then it brings down 3 old (not yet upgraded) nodes at the same time. This ensures that there are always at least 4 nodes available. These upgrade settings configure the upgrade strategy for the node pool. Use strategy to switch between the strategies applied to the node pool. If the strategy is ROLLING, use max_surge and max_unavailable to control the level of parallelism and the level of disruption caused by upgrade. 1. maxSurge controls the number of additional nodes that can be added to the node pool temporarily for the time of the upgrade to increase the number of available nodes. 2. maxUnavailable controls the number of nodes that can be simultaneously unavailable. 3. (maxUnavailable + maxSurge) determines the level of parallelism (how many nodes are being upgraded at the same time). If the strategy is BLUE_GREEN, use blue_green_settings to configure the blue-green upgrade related settings. 1. standard_rollout_policy is the default policy. The policy is used to control the way blue pool gets drained. The draining is executed in the batch mode. The batch size could be specified as either percentage of the node pool size or the number of nodes. batch_soak_duration is the soak time after each batch gets drained. 2. node_pool_soak_duration is the soak time after all blue nodes are drained. After this period, the blue pool nodes will be deleted.",
    ).optional(),
    version: z.string().describe(
      "The version of Kubernetes running on this NodePool's nodes. If unspecified, it defaults as described [here](https://cloud.google.com/kubernetes-engine/versioning#specifying_node_version).",
    ).optional(),
  }).describe(
    "NodePool contains the name and configuration for a cluster's node pool. Node pools are a set of nodes (i.e. VM's), with a common configuration and specification, under the control of the cluster master. They may have a set of Kubernetes labels applied to them, which may be used to reference them during pod scheduling. They may also be resized up or down, to accommodate the workload.",
  ).optional(),
  parent: z.string().describe(
    "The parent (project, location, cluster name) where the node pool will be created. Specified in the format `projects/*/locations/*/clusters/*`.",
  ).optional(),
  accelerators: z.array(z.object({
    acceleratorCount: z.string().describe(
      "The number of the accelerator cards exposed to an instance.",
    ).optional(),
    acceleratorType: z.string().describe(
      "The accelerator type resource name. List of supported accelerators [here](https://cloud.google.com/compute/docs/gpus)",
    ).optional(),
    gpuDriverInstallationConfig: z.object({
      gpuDriverVersion: z.enum([
        "GPU_DRIVER_VERSION_UNSPECIFIED",
        "INSTALLATION_DISABLED",
        "DEFAULT",
        "LATEST",
      ]).describe("Mode for how the GPU driver is installed.").optional(),
    }).describe(
      "GPUDriverInstallationConfig specifies the version of GPU driver to be auto installed.",
    ).optional(),
    gpuPartitionSize: z.string().describe(
      "Size of partitions to create on the GPU. Valid values are described in the NVIDIA [mig user guide](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning).",
    ).optional(),
    gpuSharingConfig: z.object({
      gpuSharingStrategy: z.enum([
        "GPU_SHARING_STRATEGY_UNSPECIFIED",
        "TIME_SHARING",
        "MPS",
      ]).describe("The type of GPU sharing strategy to enable on the GPU node.")
        .optional(),
      maxSharedClientsPerGpu: z.string().describe(
        "The max number of containers that can share a physical GPU.",
      ).optional(),
    }).describe(
      "GPUSharingConfig represents the GPU sharing configuration for Hardware Accelerators.",
    ).optional(),
  })).describe(
    "A list of hardware accelerators to be attached to each node. See https://cloud.google.com/compute/docs/gpus for more information about support for GPUs.",
  ).optional(),
  bootDisk: z.object({
    diskType: z.string().describe(
      "Disk type of the boot disk. (i.e. Hyperdisk-Balanced, PD-Balanced, etc.)",
    ).optional(),
    provisionedIops: z.string().describe(
      "For Hyperdisk-Balanced only, the provisioned IOPS config value.",
    ).optional(),
    provisionedThroughput: z.string().describe(
      "For Hyperdisk-Balanced only, the provisioned throughput config value.",
    ).optional(),
    sizeGb: z.string().describe(
      "Disk size in GB. Replaces NodeConfig.disk_size_gb",
    ).optional(),
  }).describe("BootDisk specifies the boot disk configuration for node pools.")
    .optional(),
  confidentialNodes: z.object({
    confidentialInstanceType: z.enum([
      "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED",
      "SEV",
      "SEV_SNP",
      "TDX",
    ]).describe("Defines the type of technology used by the confidential node.")
      .optional(),
    enabled: z.boolean().describe(
      "Whether Confidential Nodes feature is enabled.",
    ).optional(),
  }).describe(
    "ConfidentialNodes is configuration for the confidential nodes feature, which makes nodes run on confidential VMs.",
  ).optional(),
  consolidationDelay: z.string().describe(
    "Consolidation delay defines duration after which the Cluster Autoscaler can scale down underutilized nodes. If not set, nodes are scaled down by default behavior, i.e. according to the chosen autoscaling profile.",
  ).optional(),
  containerdConfig: z.object({
    privateRegistryAccessConfig: z.object({
      certificateAuthorityDomainConfig: z.array(z.object({
        fqdns: z.array(z.unknown()).describe(
          "List of fully qualified domain names (FQDN). Specifying port is supported. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `10.0.1.2:5000`",
        ).optional(),
        gcpSecretManagerCertificateConfig: z.object({
          secretUri: z.unknown().describe(
            'Secret URI, in the form "projects/$PROJECT_ID/secrets/$SECRET_NAME/versions/$VERSION". Version can be fixed (e.g. "2") or "latest"',
          ).optional(),
        }).describe(
          "GCPSecretManagerCertificateConfig configures a secret from [Secret Manager](https://cloud.google.com/secret-manager).",
        ).optional(),
      })).describe("Private registry access configuration.").optional(),
      enabled: z.boolean().describe("Private registry access is enabled.")
        .optional(),
    }).describe(
      "PrivateRegistryAccessConfig contains access configuration for private container registries.",
    ).optional(),
    registryHosts: z.array(z.object({
      hosts: z.array(z.object({
        ca: z.unknown().describe("CA configures the registry host certificate.")
          .optional(),
        capabilities: z.unknown().describe(
          "Capabilities represent the capabilities of the registry host, specifying what operations a host is capable of performing. If not set, containerd enables all capabilities by default.",
        ).optional(),
        client: z.unknown().describe(
          "Client configures the registry host client certificate and key.",
        ).optional(),
        dialTimeout: z.unknown().describe(
          "Specifies the maximum duration allowed for a connection attempt to complete. A shorter timeout helps reduce delays when falling back to the original registry if the mirror is unreachable. Maximum allowed value is 180s. If not set, containerd sets default 30s. The value should be a decimal number of seconds with an `s` suffix.",
        ).optional(),
        header: z.unknown().describe(
          "Header configures the registry host headers.",
        ).optional(),
        host: z.unknown().describe(
          "Host configures the registry host/mirror. It supports fully qualified domain names (FQDNs) and IP addresses. Specifying scheme, port or path is supported. Scheme can only be http or https. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `https://my.customdomain.com/path` - `10.0.1.2:5000`",
        ).optional(),
        overridePath: z.unknown().describe(
          "OverridePath is used to indicate the host's API root endpoint is defined in the URL path rather than by the API specification. This may be used with non-compliant OCI registries which are missing the /v2 prefix. If not set, containerd sets default false.",
        ).optional(),
      })).describe(
        "HostConfig configures a list of host-specific configurations for the server. Each server can have at most 10 host configurations.",
      ).optional(),
      server: z.string().describe(
        "Defines the host name of the registry server, which will be used to create configuration file as /etc/containerd/hosts.d//hosts.toml. It supports fully qualified domain names (FQDN) and IP addresses: Specifying port is supported, while scheme and path are NOT supported. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `10.0.1.2:5000`",
      ).optional(),
    })).describe(
      "RegistryHostConfig configures containerd registry host configuration. Each registry_hosts represents a hosts.toml file. At most 25 registry_hosts are allowed.",
    ).optional(),
    writableCgroups: z.object({
      enabled: z.boolean().describe(
        "Optional. Whether writable cgroups is enabled.",
      ).optional(),
    }).describe("Defines writable cgroups configuration.").optional(),
  }).describe(
    "ContainerdConfig contains configuration to customize containerd.",
  ).optional(),
  diskSizeGb: z.string().describe(
    "Optional. The desired disk size for nodes in the node pool specified in GB. The smallest allowed disk size is 10GB. Initiates an upgrade operation that migrates the nodes in the node pool to the specified disk size.",
  ).optional(),
  diskType: z.string().describe(
    "Optional. The desired disk type (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') for nodes in the node pool. Initiates an upgrade operation that migrates the nodes in the node pool to the specified disk type.",
  ).optional(),
  etag: z.string().describe(
    "The current etag of the node pool. If an etag is provided and does not match the current etag of the node pool, update will be blocked and an ABORTED error will be returned.",
  ).optional(),
  fastSocket: z.object({
    enabled: z.boolean().describe(
      "Whether Fast Socket features are enabled in the node pool.",
    ).optional(),
  }).describe("Configuration of Fast Socket feature.").optional(),
  flexStart: z.boolean().describe("Flex Start flag for enabling Flex Start VM.")
    .optional(),
  gcfsConfig: z.object({
    enabled: z.boolean().describe("Whether to use GCFS.").optional(),
  }).describe(
    "GcfsConfig contains configurations of Google Container File System (image streaming).",
  ).optional(),
  gvnic: z.object({
    enabled: z.boolean().describe(
      "Whether gVNIC features are enabled in the node pool.",
    ).optional(),
  }).describe("Configuration of gVNIC feature.").optional(),
  imageType: z.string().describe(
    "Required. The desired image type for the node pool. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types.",
  ).optional(),
  kubeletConfig: z.object({
    allowedUnsafeSysctls: z.array(z.string()).describe(
      "Optional. Defines a comma-separated allowlist of unsafe sysctls or sysctl patterns (ending in `*`). The unsafe namespaced sysctl groups are `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`, and `net.*`. Leaving this allowlist empty means they cannot be set on Pods. To allow certain sysctls or sysctl patterns to be set on Pods, list them separated by commas. For example: `kernel.msg*,net.ipv4.route.min_pmtu`. See https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/ for more details.",
    ).optional(),
    containerLogMaxFiles: z.number().int().describe(
      "Optional. Defines the maximum number of container log files that can be present for a container. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation The value must be an integer between 2 and 10, inclusive. The default value is 5 if unspecified.",
    ).optional(),
    containerLogMaxSize: z.string().describe(
      "Optional. Defines the maximum size of the container log file before it is rotated. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation Valid format is positive number + unit, e.g. 100Ki, 10Mi. Valid units are Ki, Mi, Gi. The value must be between 10Mi and 500Mi, inclusive. Note that the total container log size (container_log_max_size * container_log_max_files) cannot exceed 1% of the total storage of the node, to avoid disk pressure caused by log files. The default value is 10Mi if unspecified.",
    ).optional(),
    cpuCfsQuota: z.boolean().describe(
      "Enable CPU CFS quota enforcement for containers that specify CPU limits. This option is enabled by default which makes kubelet use CFS quota (https://www.kernel.org/doc/Documentation/scheduler/sched-bwc.txt) to enforce container CPU limits. Otherwise, CPU limits will not be enforced at all. Disable this option to mitigate CPU throttling problems while still having your pods to be in Guaranteed QoS class by specifying the CPU limits. The default value is 'true' if unspecified.",
    ).optional(),
    cpuCfsQuotaPeriod: z.string().describe(
      'Set the CPU CFS quota period value \'cpu.cfs_period_us\'. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration between 1ms and 1 second, inclusive.',
    ).optional(),
    cpuManagerPolicy: z.string().describe(
      'Control the CPU management policy on the node. See https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/ The following values are allowed. * "none": the default, which represents the existing scheduling behavior. * "static": allows pods with certain resource characteristics to be granted increased CPU affinity and exclusivity on the node. The default value is \'none\' if unspecified.',
    ).optional(),
    crashLoopBackOff: z.object({
      maxContainerRestartPeriod: z.string().describe(
        'Optional. The maximum duration the backoff delay can accrue to for container restarts, minimum 1 second, maximum 300 seconds. If not set, defaults to the internal crashloopbackoff maximum. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". See https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#configurable-container-restart-delay for more details.',
      ).optional(),
    }).describe(
      "Contains config to modify node-level parameters for container restart behavior.",
    ).optional(),
    evictionMaxPodGracePeriodSeconds: z.number().int().describe(
      "Optional. eviction_max_pod_grace_period_seconds is the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met. This value effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions. Default: 0. Range: [0, 300].",
    ).optional(),
    evictionMinimumReclaim: z.object({
      imagefsAvailable: z.string().describe(
        'Optional. Minimum reclaim for eviction due to imagefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      imagefsInodesFree: z.string().describe(
        'Optional. Minimum reclaim for eviction due to imagefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      memoryAvailable: z.string().describe(
        'Optional. Minimum reclaim for eviction due to memory available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsAvailable: z.string().describe(
        'Optional. Minimum reclaim for eviction due to nodefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsInodesFree: z.string().describe(
        'Optional. Minimum reclaim for eviction due to nodefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      pidAvailable: z.string().describe(
        'Optional. Minimum reclaim for eviction due to pid available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
    }).describe(
      "Eviction minimum reclaims are the resource amounts of minimum reclaims for each eviction signal.",
    ).optional(),
    evictionSoft: z.object({
      imagefsAvailable: z.string().describe(
        'Optional. Amount of storage available on filesystem that container runtime uses for storing images layers. If the container filesystem and image filesystem are not separate, then imagefs can store both image layers and writeable layers. Defines the amount of "imagefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 15% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      imagefsInodesFree: z.string().describe(
        'Optional. Amount of inodes available on filesystem that container runtime uses for storing images layers. Defines the amount of "imagefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      memoryAvailable: z.string().describe(
        'Optional. Memory available (i.e. capacity - workingSet), in bytes. Defines the amount of "memory.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Format: positive number + unit, e.g. 100Ki, 10Mi, 5Gi. Valid units are Ki, Mi, Gi. Must be >= 100Mi and <= 50% of the node\'s memory. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsAvailable: z.string().describe(
        'Optional. Amount of storage available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsInodesFree: z.string().describe(
        'Optional. Amount of inodes available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      pidAvailable: z.string().describe(
        'Optional. Amount of PID available for pod allocation. Defines the amount of "pid.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
    }).describe(
      "Eviction signals are the current state of a particular resource at a specific point in time. The kubelet uses eviction signals to make eviction decisions by comparing the signals to eviction thresholds, which are the minimum amount of the resource that should be available on the node.",
    ).optional(),
    evictionSoftGracePeriod: z.object({
      imagefsAvailable: z.string().describe(
        'Optional. Grace period for eviction due to imagefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      imagefsInodesFree: z.string().describe(
        'Optional. Grace period for eviction due to imagefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      memoryAvailable: z.string().describe(
        'Optional. Grace period for eviction due to memory available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsAvailable: z.string().describe(
        'Optional. Grace period for eviction due to nodefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsInodesFree: z.string().describe(
        'Optional. Grace period for eviction due to nodefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      pidAvailable: z.string().describe(
        'Optional. Grace period for eviction due to pid available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
    }).describe(
      "Eviction grace periods are grace periods for each eviction signal.",
    ).optional(),
    imageGcHighThresholdPercent: z.number().int().describe(
      "Optional. Defines the percent of disk usage after which image garbage collection is always run. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and greater than image_gc_low_threshold_percent. The default value is 85 if unspecified.",
    ).optional(),
    imageGcLowThresholdPercent: z.number().int().describe(
      "Optional. Defines the percent of disk usage before which image garbage collection is never run. Lowest disk usage to garbage collect to. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and smaller than image_gc_high_threshold_percent. The default value is 80 if unspecified.",
    ).optional(),
    imageMaximumGcAge: z.string().describe(
      'Optional. Defines the maximum age an image can be unused before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration greater than image_minimum_gc_age or "0s". The default value is "0s" if unspecified, which disables this field, meaning images won\'t be garbage collected based on being unused for too long.',
    ).optional(),
    imageMinimumGcAge: z.string().describe(
      'Optional. Defines the minimum age for an unused image before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration less than or equal to 2 minutes. The default value is "2m0s" if unspecified.',
    ).optional(),
    insecureKubeletReadonlyPortEnabled: z.boolean().describe(
      "Enable or disable Kubelet read only port.",
    ).optional(),
    maxParallelImagePulls: z.number().int().describe(
      "Optional. Defines the maximum number of image pulls in parallel. The range is 2 to 5, inclusive. The default value is 2 or 3 depending on the disk type. See https://kubernetes.io/docs/concepts/containers/images/#maximum-parallel-image-pulls for more details.",
    ).optional(),
    memoryManager: z.object({
      policy: z.string().describe(
        'Controls the memory management policy on the Node. See https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/#policies The following values are allowed. * "none" * "static" The default value is \'none\' if unspecified.',
      ).optional(),
    }).describe(
      "The option enables the Kubernetes NUMA-aware Memory Manager feature. Detailed description about the feature can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/).",
    ).optional(),
    podPidsLimit: z.string().describe(
      "Set the Pod PID limits. See https://kubernetes.io/docs/concepts/policy/pid-limiting/#pod-pid-limits Controls the maximum number of processes allowed to run in a pod. The value must be greater than or equal to 1024 and less than 4194304.",
    ).optional(),
    shutdownGracePeriodCriticalPodsSeconds: z.number().int().describe(
      "Optional. shutdown_grace_period_critical_pods_seconds is the maximum allowed grace period (in seconds) used to terminate critical pods during a node shutdown. This value should be <= shutdown_grace_period_seconds, and is only valid if shutdown_grace_period_seconds is set. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ Range: [0, 120].",
    ).optional(),
    shutdownGracePeriodSeconds: z.number().int().describe(
      "Optional. shutdown_grace_period_seconds is the maximum allowed grace period (in seconds) the total duration that the node should delay the shutdown during a graceful shutdown. This is the total grace period for pod termination for both regular and critical pods. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ If set to 0, node will not enable the graceful node shutdown functionality. This field is only valid for Spot VMs. Allowed values: 0, 30, 120.",
    ).optional(),
    singleProcessOomKill: z.boolean().describe(
      "Optional. Defines whether to enable single process OOM killer. If true, will prevent the memory.oom.group flag from being set for container cgroups in cgroups v2. This causes processes in the container to be OOM killed individually instead of as a group.",
    ).optional(),
    topologyManager: z.object({
      policy: z.string().describe(
        "Configures the strategy for resource alignment. Allowed values are: * none: the default policy, and does not perform any topology alignment. * restricted: the topology manager stores the preferred NUMA node affinity for the container, and will reject the pod if the affinity if not preferred. * best-effort: the topology manager stores the preferred NUMA node affinity for the container. If the affinity is not preferred, the topology manager will admit the pod to the node anyway. * single-numa-node: the topology manager determines if the single NUMA node affinity is possible. If it is, Topology Manager will store this and the Hint Providers can then use this information when making the resource allocation decision. If, however, this is not possible then the Topology Manager will reject the pod from the node. This will result in a pod in a Terminated state with a pod admission failure. The default policy value is 'none' if unspecified. Details about each strategy can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-policies).",
      ).optional(),
      scope: z.string().describe(
        "The Topology Manager aligns resources in following scopes: * container * pod The default scope is 'container' if unspecified. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-scopes",
      ).optional(),
    }).describe(
      "TopologyManager defines the configuration options for Topology Manager feature. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/",
    ).optional(),
  }).describe("Node kubelet configs.").optional(),
  labels: z.object({
    labels: z.record(z.string(), z.string()).describe(
      "Map of node label keys and node label values.",
    ).optional(),
  }).describe(
    "Collection of node-level [Kubernetes labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels).",
  ).optional(),
  linuxNodeConfig: z.object({
    accurateTimeConfig: z.object({
      enablePtpKvmTimeSync: z.boolean().describe(
        "Enables enhanced time synchronization using PTP-KVM.",
      ).optional(),
    }).describe(
      "AccurateTimeConfig contains configuration for the accurate time synchronization feature.",
    ).optional(),
    cgroupMode: z.enum([
      "CGROUP_MODE_UNSPECIFIED",
      "CGROUP_MODE_V1",
      "CGROUP_MODE_V2",
    ]).describe("cgroup_mode specifies the cgroup mode to be used on the node.")
      .optional(),
    customNodeInit: z.object({
      initScript: z.object({
        args: z.array(z.string()).describe(
          "Optional. The optional arguments line to be passed to the init script.",
        ).optional(),
        gcpSecretManagerSecretUri: z.string().describe(
          "The resource name of the secret manager secret hosting the init script. Both global and regional secrets are supported with format below: Global secret: projects/{project}/secrets/{secret}/versions/{version} Regional secret: projects/{project}/locations/{location}/secrets/{secret}/versions/{version} Example: projects/1234567890/secrets/script_1/versions/1. Accept version number only, not support version alias. User can't configure both gcp_secret_manager_secret_uri and gcs_uri.",
        ).optional(),
        gcsGeneration: z.string().describe(
          'The generation of the init script stored in Gloud Storage. This is the required field to identify the version of the init script. User can get the genetaion from `gcloud storage objects describe gs://BUCKET_NAME/OBJECT_NAME --format="value(generation)"` or from the "Version history" tab of the object in the Cloud Console UI.',
        ).optional(),
        gcsUri: z.string().describe(
          "The Cloud Storage URI for storing the init script. Format: gs://BUCKET_NAME/OBJECT_NAME The service account on the node pool must have read access to the object. User can't configure both gcs_uri and gcp_secret_manager_secret_uri.",
        ).optional(),
      }).describe(
        "InitScript provide a simply bash script to be executed on the node.",
      ).optional(),
    }).describe(
      "Support for running custom init code while bootstrapping nodes.",
    ).optional(),
    hugepages: z.object({
      hugepageSize1g: z.number().int().describe(
        "Optional. Amount of 1G hugepages",
      ).optional(),
      hugepageSize2m: z.number().int().describe(
        "Optional. Amount of 2M hugepages",
      ).optional(),
    }).describe("Hugepages amount in both 2m and 1g size").optional(),
    nodeKernelModuleLoading: z.object({
      policy: z.enum([
        "POLICY_UNSPECIFIED",
        "ENFORCE_SIGNED_MODULES",
        "DO_NOT_ENFORCE_SIGNED_MODULES",
      ]).describe(
        "Set the node module loading policy for nodes in the node pool.",
      ).optional(),
    }).describe("Configuration for kernel module loading on nodes.").optional(),
    swapConfig: z.object({
      bootDiskProfile: z.object({
        swapSizeGib: z.string().describe(
          "Specifies the size of the swap space in gibibytes (GiB).",
        ).optional(),
        swapSizePercent: z.number().int().describe(
          "Specifies the size of the swap space as a percentage of the boot disk size.",
        ).optional(),
      }).describe("Swap on the node's boot disk.").optional(),
      dedicatedLocalSsdProfile: z.object({
        diskCount: z.string().describe(
          "The number of physical local NVMe SSD disks to attach.",
        ).optional(),
      }).describe(
        "Provisions a new, separate local NVMe SSD exclusively for swap.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. Enables or disables swap for the node pool.",
      ).optional(),
      encryptionConfig: z.object({
        disabled: z.boolean().describe(
          "Optional. If true, swap space will not be encrypted. Defaults to false (encrypted).",
        ).optional(),
      }).describe("Defines encryption settings for the swap space.").optional(),
      ephemeralLocalSsdProfile: z.object({
        swapSizeGib: z.string().describe(
          "Specifies the size of the swap space in gibibytes (GiB).",
        ).optional(),
        swapSizePercent: z.number().int().describe(
          "Specifies the size of the swap space as a percentage of the ephemeral local SSD capacity.",
        ).optional(),
      }).describe("Swap on the local SSD shared with pod ephemeral storage.")
        .optional(),
    }).describe("Configuration for swap memory on a node pool.").optional(),
    sysctls: z.record(z.string(), z.string()).describe(
      "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
    ).optional(),
    transparentHugepageDefrag: z.enum([
      "TRANSPARENT_HUGEPAGE_DEFRAG_UNSPECIFIED",
      "TRANSPARENT_HUGEPAGE_DEFRAG_ALWAYS",
      "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER",
      "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER_WITH_MADVISE",
      "TRANSPARENT_HUGEPAGE_DEFRAG_MADVISE",
      "TRANSPARENT_HUGEPAGE_DEFRAG_NEVER",
    ]).describe(
      "Optional. Defines the transparent hugepage defrag configuration on the node. VM hugepage allocation can be managed by either limiting defragmentation for delayed allocation or skipping it entirely for immediate allocation only. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
    ).optional(),
    transparentHugepageEnabled: z.enum([
      "TRANSPARENT_HUGEPAGE_ENABLED_UNSPECIFIED",
      "TRANSPARENT_HUGEPAGE_ENABLED_ALWAYS",
      "TRANSPARENT_HUGEPAGE_ENABLED_MADVISE",
      "TRANSPARENT_HUGEPAGE_ENABLED_NEVER",
    ]).describe(
      "Optional. Transparent hugepage support for anonymous memory can be entirely disabled (mostly for debugging purposes) or only enabled inside MADV_HUGEPAGE regions (to avoid the risk of consuming more memory resources) or enabled system wide. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
    ).optional(),
  }).describe("Parameters that can be configured on Linux nodes.").optional(),
  locations: z.array(z.string()).describe(
    "The desired list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the node pool's nodes should be located. Changing the locations for a node pool will result in nodes being either created or removed from the node pool, depending on whether locations are being added or removed. Warning: It is recommended to update node pool locations in a standalone API call. Do not combine a location update with changes to other fields (such as `tags`, `labels`, `taints`, etc.) in the same request. Otherwise, the API performs a structural modification where changes to other fields will only apply to newly created nodes and will not be applied to existing nodes in the node pool. To ensure all nodes are updated consistently, use a separate API call for location changes.",
  ).optional(),
  loggingConfig: z.object({
    variantConfig: z.object({
      variant: z.enum(["VARIANT_UNSPECIFIED", "DEFAULT", "MAX_THROUGHPUT"])
        .describe("Logging variant deployed on nodes.").optional(),
    }).describe(
      "LoggingVariantConfig specifies the behaviour of the logging component.",
    ).optional(),
  }).describe(
    "NodePoolLoggingConfig specifies logging configuration for node pools.",
  ).optional(),
  machineType: z.string().describe(
    "Optional. The desired [Google Compute Engine machine type](https://cloud.google.com/compute/docs/machine-types) for nodes in the node pool. Initiates an upgrade operation that migrates the nodes in the node pool to the specified machine type.",
  ).optional(),
  maxRunDuration: z.string().describe(
    "The maximum duration for the nodes to exist. If unspecified, the nodes can exist indefinitely.",
  ).optional(),
  name: z.string().describe(
    "The name (project, location, cluster, node pool) of the node pool to update. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`.",
  ).optional(),
  nodeDrainConfig: z.object({
    respectPdbDuringNodePoolDeletion: z.boolean().describe(
      "Whether to respect PDB during node pool deletion.",
    ).optional(),
  }).describe(
    "NodeDrainConfig contains the node drain related configurations for this node pool.",
  ).optional(),
  nodeNetworkConfig: z.object({
    acceleratorNetworkProfile: z.string().describe(
      'Immutable. The accelerator network profile for the node pool. For now the only valid value is "auto". If specified, the network configuration of the nodes in this node pool will be managed by this profile for the supported machine types, zone, etc.',
    ).optional(),
    additionalNodeNetworkConfigs: z.array(z.object({
      network: z.string().describe(
        "Name of the VPC where the additional interface belongs",
      ).optional(),
      subnetwork: z.string().describe(
        "Name of the subnetwork where the additional interface belongs",
      ).optional(),
    })).describe(
      "We specify the additional node networks for this node pool using this list. Each node network corresponds to an additional interface",
    ).optional(),
    additionalPodNetworkConfigs: z.array(z.object({
      maxPodsPerNode: z.object({
        maxPodsPerNode: z.string().describe(
          "Constraint enforced on the max num of pods per node.",
        ).optional(),
      }).describe("Constraints applied to pods.").optional(),
      networkAttachment: z.string().describe(
        "The name of the network attachment for pods to communicate to; cannot be specified along with subnetwork or secondary_pod_range.",
      ).optional(),
      secondaryPodRange: z.string().describe(
        "The name of the secondary range on the subnet which provides IP address for this pod range.",
      ).optional(),
      subnetwork: z.string().describe(
        "Name of the subnetwork where the additional pod network belongs.",
      ).optional(),
    })).describe(
      "We specify the additional pod networks for this node pool using this list. Each pod network corresponds to an additional alias IP range for the node",
    ).optional(),
    createPodRange: z.boolean().describe(
      "Input only. Whether to create a new range for pod IPs in this node pool. Defaults are provided for `pod_range` and `pod_ipv4_cidr_block` if they are not specified. If neither `create_pod_range` or `pod_range` are specified, the cluster-level default (`ip_allocation_policy.cluster_ipv4_cidr_block`) is used. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
    ).optional(),
    enablePrivateNodes: z.boolean().describe(
      "Whether nodes have internal IP addresses only. If enable_private_nodes is not specified, then the value is derived from Cluster.NetworkConfig.default_enable_private_nodes",
    ).optional(),
    networkPerformanceConfig: z.object({
      totalEgressBandwidthTier: z.enum(["TIER_UNSPECIFIED", "TIER_1"]).describe(
        "Specifies the total network bandwidth tier for the NodePool.",
      ).optional(),
    }).describe("Configuration of all network bandwidth tiers").optional(),
    networkTierConfig: z.object({
      networkTier: z.enum([
        "NETWORK_TIER_UNSPECIFIED",
        "NETWORK_TIER_DEFAULT",
        "NETWORK_TIER_PREMIUM",
        "NETWORK_TIER_STANDARD",
      ]).describe("Network tier configuration.").optional(),
    }).describe("NetworkTierConfig contains network tier information.")
      .optional(),
    podCidrOverprovisionConfig: z.object({
      disable: z.boolean().describe(
        "Whether Pod CIDR overprovisioning is disabled. Note: Pod CIDR overprovisioning is enabled by default.",
      ).optional(),
    }).describe("[PRIVATE FIELD] Config for pod CIDR size overprovisioning.")
      .optional(),
    podIpv4CidrBlock: z.string().describe(
      "The IP address range for pod IPs in this node pool. Only applicable if `create_pod_range` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) to pick a specific range to use. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
    ).optional(),
    podIpv4RangeUtilization: z.number().describe(
      "Output only. The utilization of the IPv4 range for the pod. The ratio is Usage/[Total number of IPs in the secondary range], Usage=numNodes*numZones*podIPsPerNode.",
    ).optional(),
    podRange: z.string().describe(
      "The ID of the secondary range for pod IPs. If `create_pod_range` is true, this ID is used for the new range. If `create_pod_range` is false, uses an existing secondary range with this ID. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
    ).optional(),
    subnetwork: z.string().describe(
      "Optional. The subnetwork name/path for the node pool. Format: projects/{project}/regions/{region}/subnetworks/{subnetwork} If the cluster is associated with multiple subnetworks, the subnetwork can be either: - A user supplied subnetwork name during node pool creation (e.g., `my-subnet`). The name must be between 1 and 63 characters long, start with a letter, contain only letters, numbers, and hyphens, and end with a letter or a number. - A full subnetwork path during node pool creation, such as `projects/gke-project/regions/us-central1/subnetworks/my-subnet` - A subnetwork path picked based on the IP utilization during node pool creation and is immutable.",
    ).optional(),
  }).describe("Parameters for node pool-level network config.").optional(),
  nodeVersion: z.string().describe(
    'Required. The Kubernetes version to change the nodes to (typically an upgrade). Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the Kubernetes master version',
  ).optional(),
  queuedProvisioning: z.object({
    enabled: z.boolean().describe(
      "Denotes that this node pool is QRM specific, meaning nodes can be only obtained through queuing via the Cluster Autoscaler ProvisioningRequest API.",
    ).optional(),
  }).describe(
    "QueuedProvisioning defines the queued provisioning used by the node pool.",
  ).optional(),
  resourceLabels: z.object({
    labels: z.record(z.string(), z.string()).describe(
      "Map of node label keys and node label values.",
    ).optional(),
  }).describe(
    "Collection of [Resource Manager labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels).",
  ).optional(),
  resourceManagerTags: z.object({
    tags: z.record(z.string(), z.string()).describe(
      "TagKeyValue must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}`",
    ).optional(),
  }).describe(
    "A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.",
  ).optional(),
  storagePools: z.array(z.string()).describe(
    "List of Storage Pools where boot disks are provisioned. Existing Storage Pools will be replaced with storage-pools.",
  ).optional(),
  tags: z.object({
    tags: z.array(z.string()).describe("List of network tags.").optional(),
  }).describe(
    "Collection of Compute Engine network tags that can be applied to a node's underlying VM instance.",
  ).optional(),
  taintConfig: z.object({
    architectureTaintBehavior: z.enum([
      "ARCHITECTURE_TAINT_BEHAVIOR_UNSPECIFIED",
      "NONE",
      "ARM",
    ]).describe("Optional. Controls architecture tainting behavior.")
      .optional(),
  }).describe(
    "TaintConfig contains the configuration for the taints of the node pool.",
  ).optional(),
  taints: z.object({
    taints: z.array(z.object({
      effect: z.enum([
        "EFFECT_UNSPECIFIED",
        "NO_SCHEDULE",
        "PREFER_NO_SCHEDULE",
        "NO_EXECUTE",
      ]).describe("Effect for taint.").optional(),
      key: z.string().describe("Key for taint.").optional(),
      value: z.string().describe("Value for taint.").optional(),
    })).describe("List of node taints.").optional(),
  }).describe(
    "Collection of Kubernetes [node taints](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration).",
  ).optional(),
  upgradeSettings: z.object({
    blueGreenSettings: z.object({
      autoscaledRolloutPolicy: z.object({
        waitForDrainDuration: z.string().describe(
          "Optional. Time to wait after cordoning the blue pool before draining the nodes. Defaults to 3 days. The value can be set between 0 and 7 days, inclusive.",
        ).optional(),
      }).describe(
        "Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.",
      ).optional(),
      nodePoolSoakDuration: z.string().describe(
        "Time needed after draining entire blue pool. After this period, blue pool will be cleaned up.",
      ).optional(),
      standardRolloutPolicy: z.object({
        batchNodeCount: z.number().int().describe(
          "Number of blue nodes to drain in a batch.",
        ).optional(),
        batchPercentage: z.number().describe(
          "Percentage of the blue pool nodes to drain in a batch. The range of this field should be (0.0, 1.0].",
        ).optional(),
        batchSoakDuration: z.string().describe(
          "Soak time after each batch gets drained. Default to zero.",
        ).optional(),
      }).describe(
        "Standard rollout policy is the default policy for blue-green.",
      ).optional(),
    }).describe("Settings for blue-green upgrade.").optional(),
    maxSurge: z.number().int().describe(
      "The maximum number of nodes that can be created beyond the current size of the node pool during the upgrade process.",
    ).optional(),
    maxUnavailable: z.number().int().describe(
      "The maximum number of nodes that can be simultaneously unavailable during the upgrade process. A node is considered available if its status is Ready.",
    ).optional(),
    strategy: z.enum([
      "NODE_POOL_UPDATE_STRATEGY_UNSPECIFIED",
      "BLUE_GREEN",
      "SURGE",
      "SHORT_LIVED",
    ]).describe("Update strategy of the node pool.").optional(),
  }).describe(
    "These upgrade settings control the level of parallelism and the level of disruption caused by an upgrade. maxUnavailable controls the number of nodes that can be simultaneously unavailable. maxSurge controls the number of additional nodes that can be added to the node pool temporarily for the time of the upgrade to increase the number of available nodes. (maxUnavailable + maxSurge) determines the level of parallelism (how many nodes are being upgraded at the same time). Note: upgrades inevitably introduce some disruption since workloads need to be moved from old nodes to new, upgraded ones. Even if maxUnavailable=0, this holds true. (Disruption stays within the limits of PodDisruptionBudget, if it is configured.) Consider a hypothetical node pool with 5 nodes having maxSurge=2, maxUnavailable=1. This means the upgrade process upgrades 3 nodes simultaneously. It creates 2 additional (upgraded) nodes, then it brings down 3 old (not yet upgraded) nodes at the same time. This ensures that there are always at least 4 nodes available. These upgrade settings configure the upgrade strategy for the node pool. Use strategy to switch between the strategies applied to the node pool. If the strategy is ROLLING, use max_surge and max_unavailable to control the level of parallelism and the level of disruption caused by upgrade. 1. maxSurge controls the number of additional nodes that can be added to the node pool temporarily for the time of the upgrade to increase the number of available nodes. 2. maxUnavailable controls the number of nodes that can be simultaneously unavailable. 3. (maxUnavailable + maxSurge) determines the level of parallelism (how many nodes are being upgraded at the same time). If the strategy is BLUE_GREEN, use blue_green_settings to configure the blue-green upgrade related settings. 1. standard_rollout_policy is the default policy. The policy is used to control the way blue pool gets drained. The draining is executed in the batch mode. The batch size could be specified as either percentage of the node pool size or the number of nodes. batch_soak_duration is the soak time after each batch gets drained. 2. node_pool_soak_duration is the soak time after all blue nodes are drained. After this period, the blue pool nodes will be deleted.",
  ).optional(),
  windowsNodeConfig: z.object({
    osVersion: z.enum([
      "OS_VERSION_UNSPECIFIED",
      "OS_VERSION_LTSC2019",
      "OS_VERSION_LTSC2022",
    ]).describe(
      "OSVersion specifies the Windows node config to be used on the node.",
    ).optional(),
  }).describe(
    "Parameters that can be configured on Windows nodes. Windows Node Config that define the parameters that will be used to configure the Windows node pool settings.",
  ).optional(),
  workloadMetadataConfig: z.object({
    mode: z.enum(["MODE_UNSPECIFIED", "GCE_METADATA", "GKE_METADATA"]).describe(
      "Mode is the configuration for how to expose metadata to workloads running on the node pool.",
    ).optional(),
  }).describe(
    "WorkloadMetadataConfig defines the metadata configuration to expose to workloads on the node pool.",
  ).optional(),
});

const StateSchema = z.object({
  autopilotConfig: z.object({
    enabled: z.boolean(),
  }).optional(),
  autoscaling: z.object({
    autoprovisioned: z.boolean(),
    enabled: z.boolean(),
    locationPolicy: z.string(),
    maxNodeCount: z.number(),
    minNodeCount: z.number(),
    totalMaxNodeCount: z.number(),
    totalMinNodeCount: z.number(),
  }).optional(),
  bestEffortProvisioning: z.object({
    enabled: z.boolean(),
    minProvisionNodes: z.number(),
  }).optional(),
  conditions: z.array(z.object({
    canonicalCode: z.string(),
    code: z.string(),
    message: z.string(),
  })).optional(),
  config: z.object({
    accelerators: z.array(z.object({
      acceleratorCount: z.string(),
      acceleratorType: z.string(),
      gpuDriverInstallationConfig: z.object({
        gpuDriverVersion: z.string(),
      }),
      gpuPartitionSize: z.string(),
      gpuSharingConfig: z.object({
        gpuSharingStrategy: z.string(),
        maxSharedClientsPerGpu: z.string(),
      }),
    })),
    advancedMachineFeatures: z.object({
      enableNestedVirtualization: z.boolean(),
      performanceMonitoringUnit: z.string(),
      threadsPerCore: z.string(),
    }),
    bootDisk: z.object({
      diskType: z.string(),
      provisionedIops: z.string(),
      provisionedThroughput: z.string(),
      sizeGb: z.string(),
    }),
    bootDiskKmsKey: z.string(),
    confidentialNodes: z.object({
      confidentialInstanceType: z.string(),
      enabled: z.boolean(),
    }),
    consolidationDelay: z.string(),
    containerdConfig: z.object({
      privateRegistryAccessConfig: z.object({
        certificateAuthorityDomainConfig: z.array(z.object({
          fqdns: z.unknown(),
          gcpSecretManagerCertificateConfig: z.unknown(),
        })),
        enabled: z.boolean(),
      }),
      registryHosts: z.array(z.object({
        hosts: z.array(z.unknown()),
        server: z.string(),
      })),
      writableCgroups: z.object({
        enabled: z.boolean(),
      }),
    }),
    diskSizeGb: z.number(),
    diskType: z.string(),
    effectiveCgroupMode: z.string(),
    enableConfidentialStorage: z.boolean(),
    ephemeralStorageLocalSsdConfig: z.object({
      dataCacheCount: z.number(),
      localSsdCount: z.number(),
    }),
    fastSocket: z.object({
      enabled: z.boolean(),
    }),
    flexStart: z.boolean(),
    gcfsConfig: z.object({
      enabled: z.boolean(),
    }),
    gpuDirectConfig: z.object({
      gpuDirectStrategy: z.string(),
    }),
    gvnic: z.object({
      enabled: z.boolean(),
    }),
    imageType: z.string(),
    kubeletConfig: z.object({
      allowedUnsafeSysctls: z.array(z.string()),
      containerLogMaxFiles: z.number(),
      containerLogMaxSize: z.string(),
      cpuCfsQuota: z.boolean(),
      cpuCfsQuotaPeriod: z.string(),
      cpuManagerPolicy: z.string(),
      crashLoopBackOff: z.object({
        maxContainerRestartPeriod: z.string(),
      }),
      evictionMaxPodGracePeriodSeconds: z.number(),
      evictionMinimumReclaim: z.object({
        imagefsAvailable: z.string(),
        imagefsInodesFree: z.string(),
        memoryAvailable: z.string(),
        nodefsAvailable: z.string(),
        nodefsInodesFree: z.string(),
        pidAvailable: z.string(),
      }),
      evictionSoft: z.object({
        imagefsAvailable: z.string(),
        imagefsInodesFree: z.string(),
        memoryAvailable: z.string(),
        nodefsAvailable: z.string(),
        nodefsInodesFree: z.string(),
        pidAvailable: z.string(),
      }),
      evictionSoftGracePeriod: z.object({
        imagefsAvailable: z.string(),
        imagefsInodesFree: z.string(),
        memoryAvailable: z.string(),
        nodefsAvailable: z.string(),
        nodefsInodesFree: z.string(),
        pidAvailable: z.string(),
      }),
      imageGcHighThresholdPercent: z.number(),
      imageGcLowThresholdPercent: z.number(),
      imageMaximumGcAge: z.string(),
      imageMinimumGcAge: z.string(),
      insecureKubeletReadonlyPortEnabled: z.boolean(),
      maxParallelImagePulls: z.number(),
      memoryManager: z.object({
        policy: z.string(),
      }),
      podPidsLimit: z.string(),
      shutdownGracePeriodCriticalPodsSeconds: z.number(),
      shutdownGracePeriodSeconds: z.number(),
      singleProcessOomKill: z.boolean(),
      topologyManager: z.object({
        policy: z.string(),
        scope: z.string(),
      }),
    }),
    labels: z.record(z.string(), z.unknown()),
    linuxNodeConfig: z.object({
      accurateTimeConfig: z.object({
        enablePtpKvmTimeSync: z.boolean(),
      }),
      cgroupMode: z.string(),
      customNodeInit: z.object({
        initScript: z.object({
          args: z.array(z.unknown()),
          gcpSecretManagerSecretUri: z.string(),
          gcsGeneration: z.string(),
          gcsUri: z.string(),
        }),
      }),
      hugepages: z.object({
        hugepageSize1g: z.number(),
        hugepageSize2m: z.number(),
      }),
      nodeKernelModuleLoading: z.object({
        policy: z.string(),
      }),
      swapConfig: z.object({
        bootDiskProfile: z.object({
          swapSizeGib: z.string(),
          swapSizePercent: z.number(),
        }),
        dedicatedLocalSsdProfile: z.object({
          diskCount: z.string(),
        }),
        enabled: z.boolean(),
        encryptionConfig: z.object({
          disabled: z.boolean(),
        }),
        ephemeralLocalSsdProfile: z.object({
          swapSizeGib: z.string(),
          swapSizePercent: z.number(),
        }),
      }),
      sysctls: z.record(z.string(), z.unknown()),
      transparentHugepageDefrag: z.string(),
      transparentHugepageEnabled: z.string(),
    }),
    localNvmeSsdBlockConfig: z.object({
      localSsdCount: z.number(),
    }),
    localSsdCount: z.number(),
    localSsdEncryptionMode: z.string(),
    loggingConfig: z.object({
      variantConfig: z.object({
        variant: z.string(),
      }),
    }),
    machineType: z.string(),
    maxRunDuration: z.string(),
    metadata: z.record(z.string(), z.unknown()),
    minCpuPlatform: z.string(),
    nodeGroup: z.string(),
    oauthScopes: z.array(z.string()),
    preemptible: z.boolean(),
    reservationAffinity: z.object({
      consumeReservationType: z.string(),
      key: z.string(),
      values: z.array(z.string()),
    }),
    resourceLabels: z.record(z.string(), z.unknown()),
    resourceManagerTags: z.object({
      tags: z.record(z.string(), z.unknown()),
    }),
    sandboxConfig: z.object({
      type: z.string(),
    }),
    secondaryBootDiskUpdateStrategy: z.object({}),
    secondaryBootDisks: z.array(z.object({
      diskImage: z.string(),
      mode: z.string(),
    })),
    serviceAccount: z.string(),
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean(),
      enableSecureBoot: z.boolean(),
    }),
    soleTenantConfig: z.object({
      minNodeCpus: z.number(),
      nodeAffinities: z.array(z.object({
        key: z.string(),
        operator: z.string(),
        values: z.array(z.unknown()),
      })),
    }),
    spot: z.boolean(),
    storagePools: z.array(z.string()),
    tags: z.array(z.string()),
    taintConfig: z.object({
      architectureTaintBehavior: z.string(),
    }),
    taints: z.array(z.object({
      effect: z.string(),
      key: z.string(),
      value: z.string(),
    })),
    windowsNodeConfig: z.object({
      osVersion: z.string(),
    }),
    workloadMetadataConfig: z.object({
      mode: z.string(),
    }),
  }).optional(),
  etag: z.string().optional(),
  initialNodeCount: z.number().optional(),
  instanceGroupUrls: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
  management: z.object({
    autoRepair: z.boolean(),
    autoUpgrade: z.boolean(),
    upgradeOptions: z.object({
      autoUpgradeStartTime: z.string(),
      description: z.string(),
    }),
  }).optional(),
  maxPodsConstraint: z.object({
    maxPodsPerNode: z.string(),
  }).optional(),
  name: z.string(),
  networkConfig: z.object({
    acceleratorNetworkProfile: z.string(),
    additionalNodeNetworkConfigs: z.array(z.object({
      network: z.string(),
      subnetwork: z.string(),
    })),
    additionalPodNetworkConfigs: z.array(z.object({
      maxPodsPerNode: z.object({
        maxPodsPerNode: z.string(),
      }),
      networkAttachment: z.string(),
      secondaryPodRange: z.string(),
      subnetwork: z.string(),
    })),
    createPodRange: z.boolean(),
    enablePrivateNodes: z.boolean(),
    networkPerformanceConfig: z.object({
      totalEgressBandwidthTier: z.string(),
    }),
    networkTierConfig: z.object({
      networkTier: z.string(),
    }),
    podCidrOverprovisionConfig: z.object({
      disable: z.boolean(),
    }),
    podIpv4CidrBlock: z.string(),
    podIpv4RangeUtilization: z.number(),
    podRange: z.string(),
    subnetwork: z.string(),
  }).optional(),
  nodeDrainConfig: z.object({
    respectPdbDuringNodePoolDeletion: z.boolean(),
  }).optional(),
  placementPolicy: z.object({
    policyName: z.string(),
    tpuTopology: z.string(),
    type: z.string(),
  }).optional(),
  podIpv4CidrSize: z.number().optional(),
  queuedProvisioning: z.object({
    enabled: z.boolean(),
  }).optional(),
  selfLink: z.string().optional(),
  status: z.string().optional(),
  statusMessage: z.string().optional(),
  updateInfo: z.object({
    blueGreenInfo: z.object({
      blueInstanceGroupUrls: z.array(z.string()),
      bluePoolDeletionStartTime: z.string(),
      greenInstanceGroupUrls: z.array(z.string()),
      greenPoolVersion: z.string(),
      phase: z.string(),
    }),
  }).optional(),
  upgradeSettings: z.object({
    blueGreenSettings: z.object({
      autoscaledRolloutPolicy: z.object({
        waitForDrainDuration: z.string(),
      }),
      nodePoolSoakDuration: z.string(),
      standardRolloutPolicy: z.object({
        batchNodeCount: z.number(),
        batchPercentage: z.number(),
        batchSoakDuration: z.string(),
      }),
    }),
    maxSurge: z.number(),
    maxUnavailable: z.number(),
    strategy: z.string(),
  }).optional(),
  version: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  nodePool: z.object({
    autopilotConfig: z.object({
      enabled: z.boolean().describe(
        "Denotes that nodes belonging to this node pool are Autopilot nodes.",
      ).optional(),
    }).describe(
      "AutopilotConfig contains configuration of autopilot feature for this node pool.",
    ).optional(),
    autoscaling: z.object({
      autoprovisioned: z.boolean().describe(
        "Can this node pool be deleted automatically.",
      ).optional(),
      enabled: z.boolean().describe(
        "Is autoscaling enabled for this node pool.",
      ).optional(),
      locationPolicy: z.enum(["LOCATION_POLICY_UNSPECIFIED", "BALANCED", "ANY"])
        .describe("Location policy used when scaling up a node pool.")
        .optional(),
      maxNodeCount: z.number().int().describe(
        "Maximum number of nodes for one location in the node pool. Must be >= min_node_count. There has to be enough quota to scale up the cluster.",
      ).optional(),
      minNodeCount: z.number().int().describe(
        "Minimum number of nodes for one location in the node pool. Must be greater than or equal to 0 and less than or equal to max_node_count.",
      ).optional(),
      totalMaxNodeCount: z.number().int().describe(
        "Maximum number of nodes in the node pool. Must be greater than or equal to total_min_node_count. There has to be enough quota to scale up the cluster. The total_*_node_count fields are mutually exclusive with the *_node_count fields.",
      ).optional(),
      totalMinNodeCount: z.number().int().describe(
        "Minimum number of nodes in the node pool. Must be greater than or equal to 0 and less than or equal to total_max_node_count. The total_*_node_count fields are mutually exclusive with the *_node_count fields.",
      ).optional(),
    }).describe(
      "NodePoolAutoscaling contains information required by cluster autoscaler to adjust the size of the node pool to the current cluster usage.",
    ).optional(),
    bestEffortProvisioning: z.object({
      enabled: z.boolean().describe(
        "When this is enabled, cluster/node pool creations will ignore non-fatal errors like stockout to best provision as many nodes as possible right now and eventually bring up all target number of nodes",
      ).optional(),
      minProvisionNodes: z.number().int().describe(
        "Minimum number of nodes to be provisioned to be considered as succeeded, and the rest of nodes will be provisioned gradually and eventually when stockout issue has been resolved.",
      ).optional(),
    }).describe("Best effort provisioning.").optional(),
    conditions: z.array(z.object({
      canonicalCode: z.enum([
        "OK",
        "CANCELLED",
        "UNKNOWN",
        "INVALID_ARGUMENT",
        "DEADLINE_EXCEEDED",
        "NOT_FOUND",
        "ALREADY_EXISTS",
        "PERMISSION_DENIED",
        "UNAUTHENTICATED",
        "RESOURCE_EXHAUSTED",
        "FAILED_PRECONDITION",
        "ABORTED",
        "OUT_OF_RANGE",
        "UNIMPLEMENTED",
        "INTERNAL",
        "UNAVAILABLE",
        "DATA_LOSS",
      ]).describe("Canonical code of the condition.").optional(),
      code: z.enum([
        "UNKNOWN",
        "GCE_STOCKOUT",
        "GKE_SERVICE_ACCOUNT_DELETED",
        "GCE_QUOTA_EXCEEDED",
        "SET_BY_OPERATOR",
        "CLOUD_KMS_KEY_ERROR",
        "CA_EXPIRING",
        "NODE_SERVICE_ACCOUNT_MISSING_PERMISSIONS",
        "CLOUD_KMS_KEY_DESTROYED",
      ]).describe(
        "Machine-friendly representation of the condition Deprecated. Use canonical_code instead.",
      ).optional(),
      message: z.string().describe(
        "Human-friendly representation of the condition",
      ).optional(),
    })).describe("Which conditions caused the current node pool state.")
      .optional(),
    config: z.object({
      accelerators: z.array(z.object({
        acceleratorCount: z.string().describe(
          "The number of the accelerator cards exposed to an instance.",
        ).optional(),
        acceleratorType: z.string().describe(
          "The accelerator type resource name. List of supported accelerators [here](https://cloud.google.com/compute/docs/gpus)",
        ).optional(),
        gpuDriverInstallationConfig: z.object({
          gpuDriverVersion: z.unknown().describe(
            "Mode for how the GPU driver is installed.",
          ).optional(),
        }).describe(
          "GPUDriverInstallationConfig specifies the version of GPU driver to be auto installed.",
        ).optional(),
        gpuPartitionSize: z.string().describe(
          "Size of partitions to create on the GPU. Valid values are described in the NVIDIA [mig user guide](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning).",
        ).optional(),
        gpuSharingConfig: z.object({
          gpuSharingStrategy: z.unknown().describe(
            "The type of GPU sharing strategy to enable on the GPU node.",
          ).optional(),
          maxSharedClientsPerGpu: z.unknown().describe(
            "The max number of containers that can share a physical GPU.",
          ).optional(),
        }).describe(
          "GPUSharingConfig represents the GPU sharing configuration for Hardware Accelerators.",
        ).optional(),
      })).describe(
        "A list of hardware accelerators to be attached to each node. See https://cloud.google.com/compute/docs/gpus for more information about support for GPUs.",
      ).optional(),
      advancedMachineFeatures: z.object({
        enableNestedVirtualization: z.boolean().describe(
          "Whether or not to enable nested virtualization (defaults to false).",
        ).optional(),
        performanceMonitoringUnit: z.enum([
          "PERFORMANCE_MONITORING_UNIT_UNSPECIFIED",
          "ARCHITECTURAL",
          "STANDARD",
          "ENHANCED",
        ]).describe(
          "Type of Performance Monitoring Unit (PMU) requested on node pool instances. If unset, PMU will not be available to the node.",
        ).optional(),
        threadsPerCore: z.string().describe(
          "The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed.",
        ).optional(),
      }).describe(
        "Specifies options for controlling advanced machine features.",
      ).optional(),
      bootDisk: z.object({
        diskType: z.string().describe(
          "Disk type of the boot disk. (i.e. Hyperdisk-Balanced, PD-Balanced, etc.)",
        ).optional(),
        provisionedIops: z.string().describe(
          "For Hyperdisk-Balanced only, the provisioned IOPS config value.",
        ).optional(),
        provisionedThroughput: z.string().describe(
          "For Hyperdisk-Balanced only, the provisioned throughput config value.",
        ).optional(),
        sizeGb: z.string().describe(
          "Disk size in GB. Replaces NodeConfig.disk_size_gb",
        ).optional(),
      }).describe(
        "BootDisk specifies the boot disk configuration for node pools.",
      ).optional(),
      bootDiskKmsKey: z.string().describe(
        "The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption",
      ).optional(),
      confidentialNodes: z.object({
        confidentialInstanceType: z.enum([
          "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED",
          "SEV",
          "SEV_SNP",
          "TDX",
        ]).describe(
          "Defines the type of technology used by the confidential node.",
        ).optional(),
        enabled: z.boolean().describe(
          "Whether Confidential Nodes feature is enabled.",
        ).optional(),
      }).describe(
        "ConfidentialNodes is configuration for the confidential nodes feature, which makes nodes run on confidential VMs.",
      ).optional(),
      consolidationDelay: z.string().describe(
        "Consolidation delay defines duration after which the Cluster Autoscaler can scale down underutilized nodes. If not set, nodes are scaled down by default behavior, i.e. according to the chosen autoscaling profile.",
      ).optional(),
      containerdConfig: z.object({
        privateRegistryAccessConfig: z.object({
          certificateAuthorityDomainConfig: z.array(z.unknown()).describe(
            "Private registry access configuration.",
          ).optional(),
          enabled: z.boolean().describe("Private registry access is enabled.")
            .optional(),
        }).describe(
          "PrivateRegistryAccessConfig contains access configuration for private container registries.",
        ).optional(),
        registryHosts: z.array(z.object({
          hosts: z.unknown().describe(
            "HostConfig configures a list of host-specific configurations for the server. Each server can have at most 10 host configurations.",
          ).optional(),
          server: z.unknown().describe(
            "Defines the host name of the registry server, which will be used to create configuration file as /etc/containerd/hosts.d//hosts.toml. It supports fully qualified domain names (FQDN) and IP addresses: Specifying port is supported, while scheme and path are NOT supported. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `10.0.1.2:5000`",
          ).optional(),
        })).describe(
          "RegistryHostConfig configures containerd registry host configuration. Each registry_hosts represents a hosts.toml file. At most 25 registry_hosts are allowed.",
        ).optional(),
        writableCgroups: z.object({
          enabled: z.boolean().describe(
            "Optional. Whether writable cgroups is enabled.",
          ).optional(),
        }).describe("Defines writable cgroups configuration.").optional(),
      }).describe(
        "ContainerdConfig contains configuration to customize containerd.",
      ).optional(),
      diskSizeGb: z.number().int().describe(
        "Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 10GB. If unspecified, the default disk size is 100GB.",
      ).optional(),
      diskType: z.string().describe(
        "Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard'",
      ).optional(),
      effectiveCgroupMode: z.enum([
        "EFFECTIVE_CGROUP_MODE_UNSPECIFIED",
        "EFFECTIVE_CGROUP_MODE_V1",
        "EFFECTIVE_CGROUP_MODE_V2",
      ]).describe(
        "Output only. effective_cgroup_mode is the cgroup mode actually used by the node pool. It is determined by the cgroup mode specified in the LinuxNodeConfig or the default cgroup mode based on the cluster creation version.",
      ).optional(),
      enableConfidentialStorage: z.boolean().describe(
        "Optional. Reserved for future use.",
      ).optional(),
      ephemeralStorageLocalSsdConfig: z.object({
        dataCacheCount: z.number().int().describe(
          "Number of local SSDs to use for GKE Data Cache.",
        ).optional(),
        localSsdCount: z.number().int().describe(
          "Number of local SSDs to use to back ephemeral storage. Uses NVMe interfaces. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info.",
        ).optional(),
      }).describe(
        "EphemeralStorageLocalSsdConfig contains configuration for the node ephemeral storage using Local SSDs.",
      ).optional(),
      fastSocket: z.object({
        enabled: z.boolean().describe(
          "Whether Fast Socket features are enabled in the node pool.",
        ).optional(),
      }).describe("Configuration of Fast Socket feature.").optional(),
      flexStart: z.boolean().describe(
        "Flex Start flag for enabling Flex Start VM.",
      ).optional(),
      gcfsConfig: z.object({
        enabled: z.boolean().describe("Whether to use GCFS.").optional(),
      }).describe(
        "GcfsConfig contains configurations of Google Container File System (image streaming).",
      ).optional(),
      gpuDirectConfig: z.object({
        gpuDirectStrategy: z.enum(["GPU_DIRECT_STRATEGY_UNSPECIFIED", "RDMA"])
          .describe(
            "The type of GPU direct strategy to enable on the node pool.",
          ).optional(),
      }).describe(
        "GPUDirectConfig specifies the GPU direct strategy on the node pool.",
      ).optional(),
      gvnic: z.object({
        enabled: z.boolean().describe(
          "Whether gVNIC features are enabled in the node pool.",
        ).optional(),
      }).describe("Configuration of gVNIC feature.").optional(),
      imageType: z.string().describe(
        "The image type to use for this node. Note that for a given image type, the latest version of it will be used. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types.",
      ).optional(),
      kubeletConfig: z.object({
        allowedUnsafeSysctls: z.array(z.string()).describe(
          "Optional. Defines a comma-separated allowlist of unsafe sysctls or sysctl patterns (ending in `*`). The unsafe namespaced sysctl groups are `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`, and `net.*`. Leaving this allowlist empty means they cannot be set on Pods. To allow certain sysctls or sysctl patterns to be set on Pods, list them separated by commas. For example: `kernel.msg*,net.ipv4.route.min_pmtu`. See https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/ for more details.",
        ).optional(),
        containerLogMaxFiles: z.number().int().describe(
          "Optional. Defines the maximum number of container log files that can be present for a container. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation The value must be an integer between 2 and 10, inclusive. The default value is 5 if unspecified.",
        ).optional(),
        containerLogMaxSize: z.string().describe(
          "Optional. Defines the maximum size of the container log file before it is rotated. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation Valid format is positive number + unit, e.g. 100Ki, 10Mi. Valid units are Ki, Mi, Gi. The value must be between 10Mi and 500Mi, inclusive. Note that the total container log size (container_log_max_size * container_log_max_files) cannot exceed 1% of the total storage of the node, to avoid disk pressure caused by log files. The default value is 10Mi if unspecified.",
        ).optional(),
        cpuCfsQuota: z.boolean().describe(
          "Enable CPU CFS quota enforcement for containers that specify CPU limits. This option is enabled by default which makes kubelet use CFS quota (https://www.kernel.org/doc/Documentation/scheduler/sched-bwc.txt) to enforce container CPU limits. Otherwise, CPU limits will not be enforced at all. Disable this option to mitigate CPU throttling problems while still having your pods to be in Guaranteed QoS class by specifying the CPU limits. The default value is 'true' if unspecified.",
        ).optional(),
        cpuCfsQuotaPeriod: z.string().describe(
          'Set the CPU CFS quota period value \'cpu.cfs_period_us\'. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration between 1ms and 1 second, inclusive.',
        ).optional(),
        cpuManagerPolicy: z.string().describe(
          'Control the CPU management policy on the node. See https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/ The following values are allowed. * "none": the default, which represents the existing scheduling behavior. * "static": allows pods with certain resource characteristics to be granted increased CPU affinity and exclusivity on the node. The default value is \'none\' if unspecified.',
        ).optional(),
        crashLoopBackOff: z.object({
          maxContainerRestartPeriod: z.string().describe(
            'Optional. The maximum duration the backoff delay can accrue to for container restarts, minimum 1 second, maximum 300 seconds. If not set, defaults to the internal crashloopbackoff maximum. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". See https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#configurable-container-restart-delay for more details.',
          ).optional(),
        }).describe(
          "Contains config to modify node-level parameters for container restart behavior.",
        ).optional(),
        evictionMaxPodGracePeriodSeconds: z.number().int().describe(
          "Optional. eviction_max_pod_grace_period_seconds is the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met. This value effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions. Default: 0. Range: [0, 300].",
        ).optional(),
        evictionMinimumReclaim: z.object({
          imagefsAvailable: z.string().describe(
            'Optional. Minimum reclaim for eviction due to imagefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          imagefsInodesFree: z.string().describe(
            'Optional. Minimum reclaim for eviction due to imagefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          memoryAvailable: z.string().describe(
            'Optional. Minimum reclaim for eviction due to memory available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsAvailable: z.string().describe(
            'Optional. Minimum reclaim for eviction due to nodefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsInodesFree: z.string().describe(
            'Optional. Minimum reclaim for eviction due to nodefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          pidAvailable: z.string().describe(
            'Optional. Minimum reclaim for eviction due to pid available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
        }).describe(
          "Eviction minimum reclaims are the resource amounts of minimum reclaims for each eviction signal.",
        ).optional(),
        evictionSoft: z.object({
          imagefsAvailable: z.string().describe(
            'Optional. Amount of storage available on filesystem that container runtime uses for storing images layers. If the container filesystem and image filesystem are not separate, then imagefs can store both image layers and writeable layers. Defines the amount of "imagefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 15% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          imagefsInodesFree: z.string().describe(
            'Optional. Amount of inodes available on filesystem that container runtime uses for storing images layers. Defines the amount of "imagefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          memoryAvailable: z.string().describe(
            'Optional. Memory available (i.e. capacity - workingSet), in bytes. Defines the amount of "memory.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Format: positive number + unit, e.g. 100Ki, 10Mi, 5Gi. Valid units are Ki, Mi, Gi. Must be >= 100Mi and <= 50% of the node\'s memory. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsAvailable: z.string().describe(
            'Optional. Amount of storage available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsInodesFree: z.string().describe(
            'Optional. Amount of inodes available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          pidAvailable: z.string().describe(
            'Optional. Amount of PID available for pod allocation. Defines the amount of "pid.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
        }).describe(
          "Eviction signals are the current state of a particular resource at a specific point in time. The kubelet uses eviction signals to make eviction decisions by comparing the signals to eviction thresholds, which are the minimum amount of the resource that should be available on the node.",
        ).optional(),
        evictionSoftGracePeriod: z.object({
          imagefsAvailable: z.string().describe(
            'Optional. Grace period for eviction due to imagefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          imagefsInodesFree: z.string().describe(
            'Optional. Grace period for eviction due to imagefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          memoryAvailable: z.string().describe(
            'Optional. Grace period for eviction due to memory available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsAvailable: z.string().describe(
            'Optional. Grace period for eviction due to nodefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          nodefsInodesFree: z.string().describe(
            'Optional. Grace period for eviction due to nodefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
          pidAvailable: z.string().describe(
            'Optional. Grace period for eviction due to pid available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
          ).optional(),
        }).describe(
          "Eviction grace periods are grace periods for each eviction signal.",
        ).optional(),
        imageGcHighThresholdPercent: z.number().int().describe(
          "Optional. Defines the percent of disk usage after which image garbage collection is always run. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and greater than image_gc_low_threshold_percent. The default value is 85 if unspecified.",
        ).optional(),
        imageGcLowThresholdPercent: z.number().int().describe(
          "Optional. Defines the percent of disk usage before which image garbage collection is never run. Lowest disk usage to garbage collect to. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and smaller than image_gc_high_threshold_percent. The default value is 80 if unspecified.",
        ).optional(),
        imageMaximumGcAge: z.string().describe(
          'Optional. Defines the maximum age an image can be unused before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration greater than image_minimum_gc_age or "0s". The default value is "0s" if unspecified, which disables this field, meaning images won\'t be garbage collected based on being unused for too long.',
        ).optional(),
        imageMinimumGcAge: z.string().describe(
          'Optional. Defines the minimum age for an unused image before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration less than or equal to 2 minutes. The default value is "2m0s" if unspecified.',
        ).optional(),
        insecureKubeletReadonlyPortEnabled: z.boolean().describe(
          "Enable or disable Kubelet read only port.",
        ).optional(),
        maxParallelImagePulls: z.number().int().describe(
          "Optional. Defines the maximum number of image pulls in parallel. The range is 2 to 5, inclusive. The default value is 2 or 3 depending on the disk type. See https://kubernetes.io/docs/concepts/containers/images/#maximum-parallel-image-pulls for more details.",
        ).optional(),
        memoryManager: z.object({
          policy: z.string().describe(
            'Controls the memory management policy on the Node. See https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/#policies The following values are allowed. * "none" * "static" The default value is \'none\' if unspecified.',
          ).optional(),
        }).describe(
          "The option enables the Kubernetes NUMA-aware Memory Manager feature. Detailed description about the feature can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/).",
        ).optional(),
        podPidsLimit: z.string().describe(
          "Set the Pod PID limits. See https://kubernetes.io/docs/concepts/policy/pid-limiting/#pod-pid-limits Controls the maximum number of processes allowed to run in a pod. The value must be greater than or equal to 1024 and less than 4194304.",
        ).optional(),
        shutdownGracePeriodCriticalPodsSeconds: z.number().int().describe(
          "Optional. shutdown_grace_period_critical_pods_seconds is the maximum allowed grace period (in seconds) used to terminate critical pods during a node shutdown. This value should be <= shutdown_grace_period_seconds, and is only valid if shutdown_grace_period_seconds is set. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ Range: [0, 120].",
        ).optional(),
        shutdownGracePeriodSeconds: z.number().int().describe(
          "Optional. shutdown_grace_period_seconds is the maximum allowed grace period (in seconds) the total duration that the node should delay the shutdown during a graceful shutdown. This is the total grace period for pod termination for both regular and critical pods. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ If set to 0, node will not enable the graceful node shutdown functionality. This field is only valid for Spot VMs. Allowed values: 0, 30, 120.",
        ).optional(),
        singleProcessOomKill: z.boolean().describe(
          "Optional. Defines whether to enable single process OOM killer. If true, will prevent the memory.oom.group flag from being set for container cgroups in cgroups v2. This causes processes in the container to be OOM killed individually instead of as a group.",
        ).optional(),
        topologyManager: z.object({
          policy: z.string().describe(
            "Configures the strategy for resource alignment. Allowed values are: * none: the default policy, and does not perform any topology alignment. * restricted: the topology manager stores the preferred NUMA node affinity for the container, and will reject the pod if the affinity if not preferred. * best-effort: the topology manager stores the preferred NUMA node affinity for the container. If the affinity is not preferred, the topology manager will admit the pod to the node anyway. * single-numa-node: the topology manager determines if the single NUMA node affinity is possible. If it is, Topology Manager will store this and the Hint Providers can then use this information when making the resource allocation decision. If, however, this is not possible then the Topology Manager will reject the pod from the node. This will result in a pod in a Terminated state with a pod admission failure. The default policy value is 'none' if unspecified. Details about each strategy can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-policies).",
          ).optional(),
          scope: z.string().describe(
            "The Topology Manager aligns resources in following scopes: * container * pod The default scope is 'container' if unspecified. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-scopes",
          ).optional(),
        }).describe(
          "TopologyManager defines the configuration options for Topology Manager feature. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/",
        ).optional(),
      }).describe("Node kubelet configs.").optional(),
      labels: z.record(z.string(), z.string()).describe(
        "The Kubernetes labels (key/value pairs) to apply to each node. The values in this field are added to the set of default labels Kubernetes applies to nodes. This field has the following restrictions: * Labels must use a valid Kubernetes syntax and character set, as defined in https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set. * This field supports up to 1,024 total characters in a single request. Depending on the Kubernetes version, keys in this field might conflict with the keys of the default labels, which might change which of your labels are applied to the nodes. Assume that the behavior is unpredictable and avoid label key conflicts. For more information about the default labels, see: https://kubernetes.io/docs/reference/labels-annotations-taints/",
      ).optional(),
      linuxNodeConfig: z.object({
        accurateTimeConfig: z.object({
          enablePtpKvmTimeSync: z.boolean().describe(
            "Enables enhanced time synchronization using PTP-KVM.",
          ).optional(),
        }).describe(
          "AccurateTimeConfig contains configuration for the accurate time synchronization feature.",
        ).optional(),
        cgroupMode: z.enum([
          "CGROUP_MODE_UNSPECIFIED",
          "CGROUP_MODE_V1",
          "CGROUP_MODE_V2",
        ]).describe(
          "cgroup_mode specifies the cgroup mode to be used on the node.",
        ).optional(),
        customNodeInit: z.object({
          initScript: z.object({
            args: z.unknown().describe(
              "Optional. The optional arguments line to be passed to the init script.",
            ).optional(),
            gcpSecretManagerSecretUri: z.unknown().describe(
              "The resource name of the secret manager secret hosting the init script. Both global and regional secrets are supported with format below: Global secret: projects/{project}/secrets/{secret}/versions/{version} Regional secret: projects/{project}/locations/{location}/secrets/{secret}/versions/{version} Example: projects/1234567890/secrets/script_1/versions/1. Accept version number only, not support version alias. User can't configure both gcp_secret_manager_secret_uri and gcs_uri.",
            ).optional(),
            gcsGeneration: z.unknown().describe(
              'The generation of the init script stored in Gloud Storage. This is the required field to identify the version of the init script. User can get the genetaion from `gcloud storage objects describe gs://BUCKET_NAME/OBJECT_NAME --format="value(generation)"` or from the "Version history" tab of the object in the Cloud Console UI.',
            ).optional(),
            gcsUri: z.unknown().describe(
              "The Cloud Storage URI for storing the init script. Format: gs://BUCKET_NAME/OBJECT_NAME The service account on the node pool must have read access to the object. User can't configure both gcs_uri and gcp_secret_manager_secret_uri.",
            ).optional(),
          }).describe(
            "InitScript provide a simply bash script to be executed on the node.",
          ).optional(),
        }).describe(
          "Support for running custom init code while bootstrapping nodes.",
        ).optional(),
        hugepages: z.object({
          hugepageSize1g: z.number().int().describe(
            "Optional. Amount of 1G hugepages",
          ).optional(),
          hugepageSize2m: z.number().int().describe(
            "Optional. Amount of 2M hugepages",
          ).optional(),
        }).describe("Hugepages amount in both 2m and 1g size").optional(),
        nodeKernelModuleLoading: z.object({
          policy: z.enum([
            "POLICY_UNSPECIFIED",
            "ENFORCE_SIGNED_MODULES",
            "DO_NOT_ENFORCE_SIGNED_MODULES",
          ]).describe(
            "Set the node module loading policy for nodes in the node pool.",
          ).optional(),
        }).describe("Configuration for kernel module loading on nodes.")
          .optional(),
        swapConfig: z.object({
          bootDiskProfile: z.object({
            swapSizeGib: z.unknown().describe(
              "Specifies the size of the swap space in gibibytes (GiB).",
            ).optional(),
            swapSizePercent: z.unknown().describe(
              "Specifies the size of the swap space as a percentage of the boot disk size.",
            ).optional(),
          }).describe("Swap on the node's boot disk.").optional(),
          dedicatedLocalSsdProfile: z.object({
            diskCount: z.unknown().describe(
              "The number of physical local NVMe SSD disks to attach.",
            ).optional(),
          }).describe(
            "Provisions a new, separate local NVMe SSD exclusively for swap.",
          ).optional(),
          enabled: z.boolean().describe(
            "Optional. Enables or disables swap for the node pool.",
          ).optional(),
          encryptionConfig: z.object({
            disabled: z.unknown().describe(
              "Optional. If true, swap space will not be encrypted. Defaults to false (encrypted).",
            ).optional(),
          }).describe("Defines encryption settings for the swap space.")
            .optional(),
          ephemeralLocalSsdProfile: z.object({
            swapSizeGib: z.unknown().describe(
              "Specifies the size of the swap space in gibibytes (GiB).",
            ).optional(),
            swapSizePercent: z.unknown().describe(
              "Specifies the size of the swap space as a percentage of the ephemeral local SSD capacity.",
            ).optional(),
          }).describe(
            "Swap on the local SSD shared with pod ephemeral storage.",
          ).optional(),
        }).describe("Configuration for swap memory on a node pool.").optional(),
        sysctls: z.record(z.string(), z.string()).describe(
          "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
        ).optional(),
        transparentHugepageDefrag: z.enum([
          "TRANSPARENT_HUGEPAGE_DEFRAG_UNSPECIFIED",
          "TRANSPARENT_HUGEPAGE_DEFRAG_ALWAYS",
          "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER",
          "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER_WITH_MADVISE",
          "TRANSPARENT_HUGEPAGE_DEFRAG_MADVISE",
          "TRANSPARENT_HUGEPAGE_DEFRAG_NEVER",
        ]).describe(
          "Optional. Defines the transparent hugepage defrag configuration on the node. VM hugepage allocation can be managed by either limiting defragmentation for delayed allocation or skipping it entirely for immediate allocation only. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
        ).optional(),
        transparentHugepageEnabled: z.enum([
          "TRANSPARENT_HUGEPAGE_ENABLED_UNSPECIFIED",
          "TRANSPARENT_HUGEPAGE_ENABLED_ALWAYS",
          "TRANSPARENT_HUGEPAGE_ENABLED_MADVISE",
          "TRANSPARENT_HUGEPAGE_ENABLED_NEVER",
        ]).describe(
          "Optional. Transparent hugepage support for anonymous memory can be entirely disabled (mostly for debugging purposes) or only enabled inside MADV_HUGEPAGE regions (to avoid the risk of consuming more memory resources) or enabled system wide. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
        ).optional(),
      }).describe("Parameters that can be configured on Linux nodes.")
        .optional(),
      localNvmeSsdBlockConfig: z.object({
        localSsdCount: z.number().int().describe(
          "Number of local NVMe SSDs to use. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info.",
        ).optional(),
      }).describe(
        "LocalNvmeSsdBlockConfig contains configuration for using raw-block local NVMe SSDs",
      ).optional(),
      localSsdCount: z.number().int().describe(
        "The number of local SSD disks to be attached to the node. The limit for this value is dependent upon the maximum number of disks available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information.",
      ).optional(),
      localSsdEncryptionMode: z.enum([
        "LOCAL_SSD_ENCRYPTION_MODE_UNSPECIFIED",
        "STANDARD_ENCRYPTION",
        "EPHEMERAL_KEY_ENCRYPTION",
      ]).describe(
        "Specifies which method should be used for encrypting the Local SSDs attached to the node.",
      ).optional(),
      loggingConfig: z.object({
        variantConfig: z.object({
          variant: z.enum(["VARIANT_UNSPECIFIED", "DEFAULT", "MAX_THROUGHPUT"])
            .describe("Logging variant deployed on nodes.").optional(),
        }).describe(
          "LoggingVariantConfig specifies the behaviour of the logging component.",
        ).optional(),
      }).describe(
        "NodePoolLoggingConfig specifies logging configuration for node pools.",
      ).optional(),
      machineType: z.string().describe(
        "The name of a Google Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-types) If unspecified, the default machine type is `e2-medium`.",
      ).optional(),
      maxRunDuration: z.string().describe(
        "The maximum duration for the nodes to exist. If unspecified, the nodes can exist indefinitely.",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        'The metadata key/value pairs assigned to instances in the cluster. Keys must conform to the regexp `[a-zA-Z0-9-_]+` and be less than 128 bytes in length. These are reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project or be one of the reserved keys: - "cluster-location" - "cluster-name" - "cluster-uid" - "configure-sh" - "containerd-configure-sh" - "enable-os-login" - "gci-ensure-gke-docker" - "gci-metrics-enabled" - "gci-update-strategy" - "instance-template" - "kube-env" - "startup-script" - "user-data" - "disable-address-manager" - "windows-startup-script-ps1" - "common-psm1" - "k8s-node-setup-psm1" - "install-ssh-psm1" - "user-profile-psm1" Values are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on them is that each value\'s size must be less than or equal to 32 KB. The total size of all keys and values must be less than 512 KB.',
      ).optional(),
      minCpuPlatform: z.string().describe(
        'Minimum CPU platform to be used by this instance. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: "Intel Haswell"` or `minCpuPlatform: "Intel Sandy Bridge"`. For more information, read [how to specify min CPU platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform)',
      ).optional(),
      nodeGroup: z.string().describe(
        "Setting this field will assign instances of this pool to run on the specified node group. This is useful for running workloads on [sole tenant nodes](https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes).",
      ).optional(),
      oauthScopes: z.array(z.string()).describe(
        'The set of Google API scopes to be made available on all of the node VMs under the "default" service account. The following scopes are recommended, but not required, and by default are not included: * `https://www.googleapis.com/auth/compute` is required for mounting persistent storage on your nodes. * `https://www.googleapis.com/auth/devstorage.read_only` is required for communicating with **gcr.io** (the [Artifact Registry](https://cloud.google.com/artifact-registry/)). If unspecified, no scopes are added, unless Cloud Logging or Cloud Monitoring are enabled, in which case their required scopes will be added.',
      ).optional(),
      preemptible: z.boolean().describe(
        "Whether the nodes are created as preemptible VM instances. See: https://cloud.google.com/compute/docs/instances/preemptible for more information about preemptible VM instances.",
      ).optional(),
      reservationAffinity: z.object({
        consumeReservationType: z.enum([
          "UNSPECIFIED",
          "NO_RESERVATION",
          "ANY_RESERVATION",
          "SPECIFIC_RESERVATION",
        ]).describe("Corresponds to the type of reservation consumption.")
          .optional(),
        key: z.string().describe(
          'Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, specify "compute.googleapis.com/reservation-name" as the key and specify the name of your reservation as its value.',
        ).optional(),
        values: z.array(z.string()).describe(
          "Corresponds to the label value(s) of reservation resource(s).",
        ).optional(),
      }).describe(
        "[ReservationAffinity](https://cloud.google.com/compute/docs/instances/reserving-zonal-resources) is the configuration of desired reservation which instances could take capacity from.",
      ).optional(),
      resourceLabels: z.record(z.string(), z.string()).describe(
        "The resource labels for the node pool to use to annotate any related Google Compute Engine resources.",
      ).optional(),
      resourceManagerTags: z.object({
        tags: z.record(z.string(), z.string()).describe(
          "TagKeyValue must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}`",
        ).optional(),
      }).describe(
        "A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.",
      ).optional(),
      sandboxConfig: z.object({
        type: z.enum(["UNSPECIFIED", "GVISOR"]).describe(
          "Type of the sandbox to use for the node.",
        ).optional(),
      }).describe(
        "SandboxConfig contains configurations of the sandbox to use for the node.",
      ).optional(),
      secondaryBootDiskUpdateStrategy: z.object({}).describe(
        "SecondaryBootDiskUpdateStrategy is a placeholder which will be extended in the future to define different options for updating secondary boot disks.",
      ).optional(),
      secondaryBootDisks: z.array(z.object({
        diskImage: z.string().describe(
          "Fully-qualified resource ID for an existing disk image.",
        ).optional(),
        mode: z.enum(["MODE_UNSPECIFIED", "CONTAINER_IMAGE_CACHE"]).describe(
          "Disk mode (container image cache, etc.)",
        ).optional(),
      })).describe("List of secondary boot disks attached to the nodes.")
        .optional(),
      serviceAccount: z.string().describe(
        'The Google Cloud Platform Service Account to be used by the node VMs. Specify the email address of the Service Account; otherwise, if no Service Account is specified, the "default" service account is used.',
      ).optional(),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean().describe(
          "Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created.",
        ).optional(),
        enableSecureBoot: z.boolean().describe(
          "Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails.",
        ).optional(),
      }).describe("A set of Shielded Instance options.").optional(),
      soleTenantConfig: z.object({
        minNodeCpus: z.number().int().describe(
          "Optional. The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. This field can only be set if the node pool is created in a shared sole-tenant node group.",
        ).optional(),
        nodeAffinities: z.array(z.object({
          key: z.unknown().describe("Key for NodeAffinity.").optional(),
          operator: z.unknown().describe("Operator for NodeAffinity.")
            .optional(),
          values: z.unknown().describe("Values for NodeAffinity.").optional(),
        })).describe(
          "NodeAffinities used to match to a shared sole tenant node group.",
        ).optional(),
      }).describe(
        "SoleTenantConfig contains the NodeAffinities to specify what shared sole tenant node groups should back the node pool.",
      ).optional(),
      spot: z.boolean().describe(
        "Spot flag for enabling Spot VM, which is a rebrand of the existing preemptible flag.",
      ).optional(),
      storagePools: z.array(z.string()).describe(
        "List of Storage Pools where boot disks are provisioned.",
      ).optional(),
      tags: z.array(z.string()).describe(
        "The list of instance tags applied to all nodes. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during cluster or node pool creation. Each tag within the list must comply with RFC1035.",
      ).optional(),
      taintConfig: z.object({
        architectureTaintBehavior: z.enum([
          "ARCHITECTURE_TAINT_BEHAVIOR_UNSPECIFIED",
          "NONE",
          "ARM",
        ]).describe("Optional. Controls architecture tainting behavior.")
          .optional(),
      }).describe(
        "TaintConfig contains the configuration for the taints of the node pool.",
      ).optional(),
      taints: z.array(z.object({
        effect: z.enum([
          "EFFECT_UNSPECIFIED",
          "NO_SCHEDULE",
          "PREFER_NO_SCHEDULE",
          "NO_EXECUTE",
        ]).describe("Effect for taint.").optional(),
        key: z.string().describe("Key for taint.").optional(),
        value: z.string().describe("Value for taint.").optional(),
      })).describe(
        "List of kubernetes taints to be applied to each node. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/",
      ).optional(),
      windowsNodeConfig: z.object({
        osVersion: z.enum([
          "OS_VERSION_UNSPECIFIED",
          "OS_VERSION_LTSC2019",
          "OS_VERSION_LTSC2022",
        ]).describe(
          "OSVersion specifies the Windows node config to be used on the node.",
        ).optional(),
      }).describe(
        "Parameters that can be configured on Windows nodes. Windows Node Config that define the parameters that will be used to configure the Windows node pool settings.",
      ).optional(),
      workloadMetadataConfig: z.object({
        mode: z.enum(["MODE_UNSPECIFIED", "GCE_METADATA", "GKE_METADATA"])
          .describe(
            "Mode is the configuration for how to expose metadata to workloads running on the node pool.",
          ).optional(),
      }).describe(
        "WorkloadMetadataConfig defines the metadata configuration to expose to workloads on the node pool.",
      ).optional(),
    }).describe(
      "Parameters that describe the nodes in a cluster. GKE Autopilot clusters do not recognize parameters in `NodeConfig`. Use AutoprovisioningNodePoolDefaults instead.",
    ).optional(),
    etag: z.string().describe(
      "This checksum is computed by the server based on the value of node pool fields, and may be sent on update requests to ensure the client has an up-to-date value before proceeding.",
    ).optional(),
    initialNodeCount: z.number().int().describe(
      "The initial node count for the pool. You must ensure that your Compute Engine [resource quota](https://cloud.google.com/compute/quotas) is sufficient for this number of instances. You must also have available firewall and routes quota.",
    ).optional(),
    instanceGroupUrls: z.array(z.string()).describe(
      "Output only. The resource URLs of the [managed instance groups](https://cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with this node pool. During the node pool blue-green upgrade operation, the URLs contain both blue and green resources.",
    ).optional(),
    locations: z.array(z.string()).describe(
      "The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the NodePool's nodes should be located. If this value is unspecified during node pool creation, the [Cluster.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters#Cluster.FIELDS.locations) value will be used, instead. Warning: changing node pool locations will result in nodes being added and/or removed.",
    ).optional(),
    management: z.object({
      autoRepair: z.boolean().describe(
        "A flag that specifies whether the node auto-repair is enabled for the node pool. If enabled, the nodes in this node pool will be monitored and, if they fail health checks too many times, an automatic repair action will be triggered.",
      ).optional(),
      autoUpgrade: z.boolean().describe(
        "A flag that specifies whether node auto-upgrade is enabled for the node pool. If enabled, node auto-upgrade helps keep the nodes in your node pool up to date with the latest release version of Kubernetes.",
      ).optional(),
      upgradeOptions: z.object({
        autoUpgradeStartTime: z.string().describe(
          "Output only. This field is set when upgrades are about to commence with the approximate start time for the upgrades, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
        ).optional(),
        description: z.string().describe(
          "Output only. This field is set when upgrades are about to commence with the description of the upgrade.",
        ).optional(),
      }).describe(
        "AutoUpgradeOptions defines the set of options for the user to control how the Auto Upgrades will proceed.",
      ).optional(),
    }).describe(
      "NodeManagement defines the set of node management services turned on for the node pool.",
    ).optional(),
    maxPodsConstraint: z.object({
      maxPodsPerNode: z.string().describe(
        "Constraint enforced on the max num of pods per node.",
      ).optional(),
    }).describe("Constraints applied to pods.").optional(),
    name: z.string().describe("The name of the node pool.").optional(),
    networkConfig: z.object({
      acceleratorNetworkProfile: z.string().describe(
        'Immutable. The accelerator network profile for the node pool. For now the only valid value is "auto". If specified, the network configuration of the nodes in this node pool will be managed by this profile for the supported machine types, zone, etc.',
      ).optional(),
      additionalNodeNetworkConfigs: z.array(z.object({
        network: z.string().describe(
          "Name of the VPC where the additional interface belongs",
        ).optional(),
        subnetwork: z.string().describe(
          "Name of the subnetwork where the additional interface belongs",
        ).optional(),
      })).describe(
        "We specify the additional node networks for this node pool using this list. Each node network corresponds to an additional interface",
      ).optional(),
      additionalPodNetworkConfigs: z.array(z.object({
        maxPodsPerNode: z.object({
          maxPodsPerNode: z.unknown().describe(
            "Constraint enforced on the max num of pods per node.",
          ).optional(),
        }).describe("Constraints applied to pods.").optional(),
        networkAttachment: z.string().describe(
          "The name of the network attachment for pods to communicate to; cannot be specified along with subnetwork or secondary_pod_range.",
        ).optional(),
        secondaryPodRange: z.string().describe(
          "The name of the secondary range on the subnet which provides IP address for this pod range.",
        ).optional(),
        subnetwork: z.string().describe(
          "Name of the subnetwork where the additional pod network belongs.",
        ).optional(),
      })).describe(
        "We specify the additional pod networks for this node pool using this list. Each pod network corresponds to an additional alias IP range for the node",
      ).optional(),
      createPodRange: z.boolean().describe(
        "Input only. Whether to create a new range for pod IPs in this node pool. Defaults are provided for `pod_range` and `pod_ipv4_cidr_block` if they are not specified. If neither `create_pod_range` or `pod_range` are specified, the cluster-level default (`ip_allocation_policy.cluster_ipv4_cidr_block`) is used. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
      ).optional(),
      enablePrivateNodes: z.boolean().describe(
        "Whether nodes have internal IP addresses only. If enable_private_nodes is not specified, then the value is derived from Cluster.NetworkConfig.default_enable_private_nodes",
      ).optional(),
      networkPerformanceConfig: z.object({
        totalEgressBandwidthTier: z.enum(["TIER_UNSPECIFIED", "TIER_1"])
          .describe(
            "Specifies the total network bandwidth tier for the NodePool.",
          ).optional(),
      }).describe("Configuration of all network bandwidth tiers").optional(),
      networkTierConfig: z.object({
        networkTier: z.enum([
          "NETWORK_TIER_UNSPECIFIED",
          "NETWORK_TIER_DEFAULT",
          "NETWORK_TIER_PREMIUM",
          "NETWORK_TIER_STANDARD",
        ]).describe("Network tier configuration.").optional(),
      }).describe("NetworkTierConfig contains network tier information.")
        .optional(),
      podCidrOverprovisionConfig: z.object({
        disable: z.boolean().describe(
          "Whether Pod CIDR overprovisioning is disabled. Note: Pod CIDR overprovisioning is enabled by default.",
        ).optional(),
      }).describe("[PRIVATE FIELD] Config for pod CIDR size overprovisioning.")
        .optional(),
      podIpv4CidrBlock: z.string().describe(
        "The IP address range for pod IPs in this node pool. Only applicable if `create_pod_range` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) to pick a specific range to use. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
      ).optional(),
      podIpv4RangeUtilization: z.number().describe(
        "Output only. The utilization of the IPv4 range for the pod. The ratio is Usage/[Total number of IPs in the secondary range], Usage=numNodes*numZones*podIPsPerNode.",
      ).optional(),
      podRange: z.string().describe(
        "The ID of the secondary range for pod IPs. If `create_pod_range` is true, this ID is used for the new range. If `create_pod_range` is false, uses an existing secondary range with this ID. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
      ).optional(),
      subnetwork: z.string().describe(
        "Optional. The subnetwork name/path for the node pool. Format: projects/{project}/regions/{region}/subnetworks/{subnetwork} If the cluster is associated with multiple subnetworks, the subnetwork can be either: - A user supplied subnetwork name during node pool creation (e.g., `my-subnet`). The name must be between 1 and 63 characters long, start with a letter, contain only letters, numbers, and hyphens, and end with a letter or a number. - A full subnetwork path during node pool creation, such as `projects/gke-project/regions/us-central1/subnetworks/my-subnet` - A subnetwork path picked based on the IP utilization during node pool creation and is immutable.",
      ).optional(),
    }).describe("Parameters for node pool-level network config.").optional(),
    nodeDrainConfig: z.object({
      respectPdbDuringNodePoolDeletion: z.boolean().describe(
        "Whether to respect PDB during node pool deletion.",
      ).optional(),
    }).describe(
      "NodeDrainConfig contains the node drain related configurations for this node pool.",
    ).optional(),
    placementPolicy: z.object({
      policyName: z.string().describe(
        "If set, refers to the name of a custom resource policy supplied by the user. The resource policy must be in the same project and region as the node pool. If not found, InvalidArgument error is returned.",
      ).optional(),
      tpuTopology: z.string().describe(
        "Optional. TPU placement topology for pod slice node pool. https://cloud.google.com/tpu/docs/types-topologies#tpu_topologies",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "COMPACT"]).describe(
        "The type of placement.",
      ).optional(),
    }).describe(
      "PlacementPolicy defines the placement policy used by the node pool.",
    ).optional(),
    podIpv4CidrSize: z.number().int().describe(
      "Output only. The pod CIDR block size per node in this node pool.",
    ).optional(),
    queuedProvisioning: z.object({
      enabled: z.boolean().describe(
        "Denotes that this node pool is QRM specific, meaning nodes can be only obtained through queuing via the Cluster Autoscaler ProvisioningRequest API.",
      ).optional(),
    }).describe(
      "QueuedProvisioning defines the queued provisioning used by the node pool.",
    ).optional(),
    selfLink: z.string().describe(
      "Output only. Server-defined URL for the resource.",
    ).optional(),
    status: z.enum([
      "STATUS_UNSPECIFIED",
      "PROVISIONING",
      "RUNNING",
      "RUNNING_WITH_ERROR",
      "RECONCILING",
      "STOPPING",
      "ERROR",
    ]).describe("Output only. The status of the nodes in this pool instance.")
      .optional(),
    statusMessage: z.string().describe(
      "Output only. Deprecated. Use conditions instead. Additional information about the current status of this node pool instance, if available.",
    ).optional(),
    updateInfo: z.object({
      blueGreenInfo: z.object({
        blueInstanceGroupUrls: z.array(z.string()).describe(
          "The resource URLs of the [managed instance groups] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with blue pool.",
        ).optional(),
        bluePoolDeletionStartTime: z.string().describe(
          "Time to start deleting blue pool to complete blue-green upgrade, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
        ).optional(),
        greenInstanceGroupUrls: z.array(z.string()).describe(
          "The resource URLs of the [managed instance groups] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with green pool.",
        ).optional(),
        greenPoolVersion: z.string().describe("Version of green pool.")
          .optional(),
        phase: z.enum([
          "PHASE_UNSPECIFIED",
          "UPDATE_STARTED",
          "CREATING_GREEN_POOL",
          "CORDONING_BLUE_POOL",
          "DRAINING_BLUE_POOL",
          "NODE_POOL_SOAKING",
          "DELETING_BLUE_POOL",
          "ROLLBACK_STARTED",
        ]).describe("Current blue-green upgrade phase.").optional(),
      }).describe("Information relevant to blue-green upgrade.").optional(),
    }).describe(
      "UpdateInfo contains resource (instance groups, etc), status and other intermediate information relevant to a node pool upgrade.",
    ).optional(),
    upgradeSettings: z.object({
      blueGreenSettings: z.object({
        autoscaledRolloutPolicy: z.object({
          waitForDrainDuration: z.string().describe(
            "Optional. Time to wait after cordoning the blue pool before draining the nodes. Defaults to 3 days. The value can be set between 0 and 7 days, inclusive.",
          ).optional(),
        }).describe(
          "Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.",
        ).optional(),
        nodePoolSoakDuration: z.string().describe(
          "Time needed after draining entire blue pool. After this period, blue pool will be cleaned up.",
        ).optional(),
        standardRolloutPolicy: z.object({
          batchNodeCount: z.number().int().describe(
            "Number of blue nodes to drain in a batch.",
          ).optional(),
          batchPercentage: z.number().describe(
            "Percentage of the blue pool nodes to drain in a batch. The range of this field should be (0.0, 1.0].",
          ).optional(),
          batchSoakDuration: z.string().describe(
            "Soak time after each batch gets drained. Default to zero.",
          ).optional(),
        }).describe(
          "Standard rollout policy is the default policy for blue-green.",
        ).optional(),
      }).describe("Settings for blue-green upgrade.").optional(),
      maxSurge: z.number().int().describe(
        "The maximum number of nodes that can be created beyond the current size of the node pool during the upgrade process.",
      ).optional(),
      maxUnavailable: z.number().int().describe(
        "The maximum number of nodes that can be simultaneously unavailable during the upgrade process. A node is considered available if its status is Ready.",
      ).optional(),
      strategy: z.enum([
        "NODE_POOL_UPDATE_STRATEGY_UNSPECIFIED",
        "BLUE_GREEN",
        "SURGE",
        "SHORT_LIVED",
      ]).describe("Update strategy of the node pool.").optional(),
    }).describe(
      "These upgrade settings control the level of parallelism and the level of disruption caused by an upgrade. maxUnavailable controls the number of nodes that can be simultaneously unavailable. maxSurge controls the number of additional nodes that can be added to the node pool temporarily for the time of the upgrade to increase the number of available nodes. (maxUnavailable + maxSurge) determines the level of parallelism (how many nodes are being upgraded at the same time). Note: upgrades inevitably introduce some disruption since workloads need to be moved from old nodes to new, upgraded ones. Even if maxUnavailable=0, this holds true. (Disruption stays within the limits of PodDisruptionBudget, if it is configured.) Consider a hypothetical node pool with 5 nodes having maxSurge=2, maxUnavailable=1. This means the upgrade process upgrades 3 nodes simultaneously. It creates 2 additional (upgraded) nodes, then it brings down 3 old (not yet upgraded) nodes at the same time. This ensures that there are always at least 4 nodes available. These upgrade settings configure the upgrade strategy for the node pool. Use strategy to switch between the strategies applied to the node pool. If the strategy is ROLLING, use max_surge and max_unavailable to control the level of parallelism and the level of disruption caused by upgrade. 1. maxSurge controls the number of additional nodes that can be added to the node pool temporarily for the time of the upgrade to increase the number of available nodes. 2. maxUnavailable controls the number of nodes that can be simultaneously unavailable. 3. (maxUnavailable + maxSurge) determines the level of parallelism (how many nodes are being upgraded at the same time). If the strategy is BLUE_GREEN, use blue_green_settings to configure the blue-green upgrade related settings. 1. standard_rollout_policy is the default policy. The policy is used to control the way blue pool gets drained. The draining is executed in the batch mode. The batch size could be specified as either percentage of the node pool size or the number of nodes. batch_soak_duration is the soak time after each batch gets drained. 2. node_pool_soak_duration is the soak time after all blue nodes are drained. After this period, the blue pool nodes will be deleted.",
    ).optional(),
    version: z.string().describe(
      "The version of Kubernetes running on this NodePool's nodes. If unspecified, it defaults as described [here](https://cloud.google.com/kubernetes-engine/versioning#specifying_node_version).",
    ).optional(),
  }).describe(
    "NodePool contains the name and configuration for a cluster's node pool. Node pools are a set of nodes (i.e. VM's), with a common configuration and specification, under the control of the cluster master. They may have a set of Kubernetes labels applied to them, which may be used to reference them during pod scheduling. They may also be resized up or down, to accommodate the workload.",
  ).optional(),
  parent: z.string().describe(
    "The parent (project, location, cluster name) where the node pool will be created. Specified in the format `projects/*/locations/*/clusters/*`.",
  ).optional(),
  accelerators: z.array(z.object({
    acceleratorCount: z.string().describe(
      "The number of the accelerator cards exposed to an instance.",
    ).optional(),
    acceleratorType: z.string().describe(
      "The accelerator type resource name. List of supported accelerators [here](https://cloud.google.com/compute/docs/gpus)",
    ).optional(),
    gpuDriverInstallationConfig: z.object({
      gpuDriverVersion: z.enum([
        "GPU_DRIVER_VERSION_UNSPECIFIED",
        "INSTALLATION_DISABLED",
        "DEFAULT",
        "LATEST",
      ]).describe("Mode for how the GPU driver is installed.").optional(),
    }).describe(
      "GPUDriverInstallationConfig specifies the version of GPU driver to be auto installed.",
    ).optional(),
    gpuPartitionSize: z.string().describe(
      "Size of partitions to create on the GPU. Valid values are described in the NVIDIA [mig user guide](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning).",
    ).optional(),
    gpuSharingConfig: z.object({
      gpuSharingStrategy: z.enum([
        "GPU_SHARING_STRATEGY_UNSPECIFIED",
        "TIME_SHARING",
        "MPS",
      ]).describe("The type of GPU sharing strategy to enable on the GPU node.")
        .optional(),
      maxSharedClientsPerGpu: z.string().describe(
        "The max number of containers that can share a physical GPU.",
      ).optional(),
    }).describe(
      "GPUSharingConfig represents the GPU sharing configuration for Hardware Accelerators.",
    ).optional(),
  })).describe(
    "A list of hardware accelerators to be attached to each node. See https://cloud.google.com/compute/docs/gpus for more information about support for GPUs.",
  ).optional(),
  bootDisk: z.object({
    diskType: z.string().describe(
      "Disk type of the boot disk. (i.e. Hyperdisk-Balanced, PD-Balanced, etc.)",
    ).optional(),
    provisionedIops: z.string().describe(
      "For Hyperdisk-Balanced only, the provisioned IOPS config value.",
    ).optional(),
    provisionedThroughput: z.string().describe(
      "For Hyperdisk-Balanced only, the provisioned throughput config value.",
    ).optional(),
    sizeGb: z.string().describe(
      "Disk size in GB. Replaces NodeConfig.disk_size_gb",
    ).optional(),
  }).describe("BootDisk specifies the boot disk configuration for node pools.")
    .optional(),
  confidentialNodes: z.object({
    confidentialInstanceType: z.enum([
      "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED",
      "SEV",
      "SEV_SNP",
      "TDX",
    ]).describe("Defines the type of technology used by the confidential node.")
      .optional(),
    enabled: z.boolean().describe(
      "Whether Confidential Nodes feature is enabled.",
    ).optional(),
  }).describe(
    "ConfidentialNodes is configuration for the confidential nodes feature, which makes nodes run on confidential VMs.",
  ).optional(),
  consolidationDelay: z.string().describe(
    "Consolidation delay defines duration after which the Cluster Autoscaler can scale down underutilized nodes. If not set, nodes are scaled down by default behavior, i.e. according to the chosen autoscaling profile.",
  ).optional(),
  containerdConfig: z.object({
    privateRegistryAccessConfig: z.object({
      certificateAuthorityDomainConfig: z.array(z.object({
        fqdns: z.array(z.unknown()).describe(
          "List of fully qualified domain names (FQDN). Specifying port is supported. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `10.0.1.2:5000`",
        ).optional(),
        gcpSecretManagerCertificateConfig: z.object({
          secretUri: z.unknown().describe(
            'Secret URI, in the form "projects/$PROJECT_ID/secrets/$SECRET_NAME/versions/$VERSION". Version can be fixed (e.g. "2") or "latest"',
          ).optional(),
        }).describe(
          "GCPSecretManagerCertificateConfig configures a secret from [Secret Manager](https://cloud.google.com/secret-manager).",
        ).optional(),
      })).describe("Private registry access configuration.").optional(),
      enabled: z.boolean().describe("Private registry access is enabled.")
        .optional(),
    }).describe(
      "PrivateRegistryAccessConfig contains access configuration for private container registries.",
    ).optional(),
    registryHosts: z.array(z.object({
      hosts: z.array(z.object({
        ca: z.unknown().describe("CA configures the registry host certificate.")
          .optional(),
        capabilities: z.unknown().describe(
          "Capabilities represent the capabilities of the registry host, specifying what operations a host is capable of performing. If not set, containerd enables all capabilities by default.",
        ).optional(),
        client: z.unknown().describe(
          "Client configures the registry host client certificate and key.",
        ).optional(),
        dialTimeout: z.unknown().describe(
          "Specifies the maximum duration allowed for a connection attempt to complete. A shorter timeout helps reduce delays when falling back to the original registry if the mirror is unreachable. Maximum allowed value is 180s. If not set, containerd sets default 30s. The value should be a decimal number of seconds with an `s` suffix.",
        ).optional(),
        header: z.unknown().describe(
          "Header configures the registry host headers.",
        ).optional(),
        host: z.unknown().describe(
          "Host configures the registry host/mirror. It supports fully qualified domain names (FQDNs) and IP addresses. Specifying scheme, port or path is supported. Scheme can only be http or https. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `https://my.customdomain.com/path` - `10.0.1.2:5000`",
        ).optional(),
        overridePath: z.unknown().describe(
          "OverridePath is used to indicate the host's API root endpoint is defined in the URL path rather than by the API specification. This may be used with non-compliant OCI registries which are missing the /v2 prefix. If not set, containerd sets default false.",
        ).optional(),
      })).describe(
        "HostConfig configures a list of host-specific configurations for the server. Each server can have at most 10 host configurations.",
      ).optional(),
      server: z.string().describe(
        "Defines the host name of the registry server, which will be used to create configuration file as /etc/containerd/hosts.d//hosts.toml. It supports fully qualified domain names (FQDN) and IP addresses: Specifying port is supported, while scheme and path are NOT supported. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `10.0.1.2:5000`",
      ).optional(),
    })).describe(
      "RegistryHostConfig configures containerd registry host configuration. Each registry_hosts represents a hosts.toml file. At most 25 registry_hosts are allowed.",
    ).optional(),
    writableCgroups: z.object({
      enabled: z.boolean().describe(
        "Optional. Whether writable cgroups is enabled.",
      ).optional(),
    }).describe("Defines writable cgroups configuration.").optional(),
  }).describe(
    "ContainerdConfig contains configuration to customize containerd.",
  ).optional(),
  diskSizeGb: z.string().describe(
    "Optional. The desired disk size for nodes in the node pool specified in GB. The smallest allowed disk size is 10GB. Initiates an upgrade operation that migrates the nodes in the node pool to the specified disk size.",
  ).optional(),
  diskType: z.string().describe(
    "Optional. The desired disk type (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') for nodes in the node pool. Initiates an upgrade operation that migrates the nodes in the node pool to the specified disk type.",
  ).optional(),
  etag: z.string().describe(
    "The current etag of the node pool. If an etag is provided and does not match the current etag of the node pool, update will be blocked and an ABORTED error will be returned.",
  ).optional(),
  fastSocket: z.object({
    enabled: z.boolean().describe(
      "Whether Fast Socket features are enabled in the node pool.",
    ).optional(),
  }).describe("Configuration of Fast Socket feature.").optional(),
  flexStart: z.boolean().describe("Flex Start flag for enabling Flex Start VM.")
    .optional(),
  gcfsConfig: z.object({
    enabled: z.boolean().describe("Whether to use GCFS.").optional(),
  }).describe(
    "GcfsConfig contains configurations of Google Container File System (image streaming).",
  ).optional(),
  gvnic: z.object({
    enabled: z.boolean().describe(
      "Whether gVNIC features are enabled in the node pool.",
    ).optional(),
  }).describe("Configuration of gVNIC feature.").optional(),
  imageType: z.string().describe(
    "Required. The desired image type for the node pool. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types.",
  ).optional(),
  kubeletConfig: z.object({
    allowedUnsafeSysctls: z.array(z.string()).describe(
      "Optional. Defines a comma-separated allowlist of unsafe sysctls or sysctl patterns (ending in `*`). The unsafe namespaced sysctl groups are `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`, and `net.*`. Leaving this allowlist empty means they cannot be set on Pods. To allow certain sysctls or sysctl patterns to be set on Pods, list them separated by commas. For example: `kernel.msg*,net.ipv4.route.min_pmtu`. See https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/ for more details.",
    ).optional(),
    containerLogMaxFiles: z.number().int().describe(
      "Optional. Defines the maximum number of container log files that can be present for a container. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation The value must be an integer between 2 and 10, inclusive. The default value is 5 if unspecified.",
    ).optional(),
    containerLogMaxSize: z.string().describe(
      "Optional. Defines the maximum size of the container log file before it is rotated. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation Valid format is positive number + unit, e.g. 100Ki, 10Mi. Valid units are Ki, Mi, Gi. The value must be between 10Mi and 500Mi, inclusive. Note that the total container log size (container_log_max_size * container_log_max_files) cannot exceed 1% of the total storage of the node, to avoid disk pressure caused by log files. The default value is 10Mi if unspecified.",
    ).optional(),
    cpuCfsQuota: z.boolean().describe(
      "Enable CPU CFS quota enforcement for containers that specify CPU limits. This option is enabled by default which makes kubelet use CFS quota (https://www.kernel.org/doc/Documentation/scheduler/sched-bwc.txt) to enforce container CPU limits. Otherwise, CPU limits will not be enforced at all. Disable this option to mitigate CPU throttling problems while still having your pods to be in Guaranteed QoS class by specifying the CPU limits. The default value is 'true' if unspecified.",
    ).optional(),
    cpuCfsQuotaPeriod: z.string().describe(
      'Set the CPU CFS quota period value \'cpu.cfs_period_us\'. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration between 1ms and 1 second, inclusive.',
    ).optional(),
    cpuManagerPolicy: z.string().describe(
      'Control the CPU management policy on the node. See https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/ The following values are allowed. * "none": the default, which represents the existing scheduling behavior. * "static": allows pods with certain resource characteristics to be granted increased CPU affinity and exclusivity on the node. The default value is \'none\' if unspecified.',
    ).optional(),
    crashLoopBackOff: z.object({
      maxContainerRestartPeriod: z.string().describe(
        'Optional. The maximum duration the backoff delay can accrue to for container restarts, minimum 1 second, maximum 300 seconds. If not set, defaults to the internal crashloopbackoff maximum. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". See https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#configurable-container-restart-delay for more details.',
      ).optional(),
    }).describe(
      "Contains config to modify node-level parameters for container restart behavior.",
    ).optional(),
    evictionMaxPodGracePeriodSeconds: z.number().int().describe(
      "Optional. eviction_max_pod_grace_period_seconds is the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met. This value effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions. Default: 0. Range: [0, 300].",
    ).optional(),
    evictionMinimumReclaim: z.object({
      imagefsAvailable: z.string().describe(
        'Optional. Minimum reclaim for eviction due to imagefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      imagefsInodesFree: z.string().describe(
        'Optional. Minimum reclaim for eviction due to imagefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      memoryAvailable: z.string().describe(
        'Optional. Minimum reclaim for eviction due to memory available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsAvailable: z.string().describe(
        'Optional. Minimum reclaim for eviction due to nodefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsInodesFree: z.string().describe(
        'Optional. Minimum reclaim for eviction due to nodefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      pidAvailable: z.string().describe(
        'Optional. Minimum reclaim for eviction due to pid available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
    }).describe(
      "Eviction minimum reclaims are the resource amounts of minimum reclaims for each eviction signal.",
    ).optional(),
    evictionSoft: z.object({
      imagefsAvailable: z.string().describe(
        'Optional. Amount of storage available on filesystem that container runtime uses for storing images layers. If the container filesystem and image filesystem are not separate, then imagefs can store both image layers and writeable layers. Defines the amount of "imagefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 15% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      imagefsInodesFree: z.string().describe(
        'Optional. Amount of inodes available on filesystem that container runtime uses for storing images layers. Defines the amount of "imagefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      memoryAvailable: z.string().describe(
        'Optional. Memory available (i.e. capacity - workingSet), in bytes. Defines the amount of "memory.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Format: positive number + unit, e.g. 100Ki, 10Mi, 5Gi. Valid units are Ki, Mi, Gi. Must be >= 100Mi and <= 50% of the node\'s memory. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsAvailable: z.string().describe(
        'Optional. Amount of storage available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsInodesFree: z.string().describe(
        'Optional. Amount of inodes available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      pidAvailable: z.string().describe(
        'Optional. Amount of PID available for pod allocation. Defines the amount of "pid.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
    }).describe(
      "Eviction signals are the current state of a particular resource at a specific point in time. The kubelet uses eviction signals to make eviction decisions by comparing the signals to eviction thresholds, which are the minimum amount of the resource that should be available on the node.",
    ).optional(),
    evictionSoftGracePeriod: z.object({
      imagefsAvailable: z.string().describe(
        'Optional. Grace period for eviction due to imagefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      imagefsInodesFree: z.string().describe(
        'Optional. Grace period for eviction due to imagefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      memoryAvailable: z.string().describe(
        'Optional. Grace period for eviction due to memory available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsAvailable: z.string().describe(
        'Optional. Grace period for eviction due to nodefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      nodefsInodesFree: z.string().describe(
        'Optional. Grace period for eviction due to nodefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
      pidAvailable: z.string().describe(
        'Optional. Grace period for eviction due to pid available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
      ).optional(),
    }).describe(
      "Eviction grace periods are grace periods for each eviction signal.",
    ).optional(),
    imageGcHighThresholdPercent: z.number().int().describe(
      "Optional. Defines the percent of disk usage after which image garbage collection is always run. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and greater than image_gc_low_threshold_percent. The default value is 85 if unspecified.",
    ).optional(),
    imageGcLowThresholdPercent: z.number().int().describe(
      "Optional. Defines the percent of disk usage before which image garbage collection is never run. Lowest disk usage to garbage collect to. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and smaller than image_gc_high_threshold_percent. The default value is 80 if unspecified.",
    ).optional(),
    imageMaximumGcAge: z.string().describe(
      'Optional. Defines the maximum age an image can be unused before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration greater than image_minimum_gc_age or "0s". The default value is "0s" if unspecified, which disables this field, meaning images won\'t be garbage collected based on being unused for too long.',
    ).optional(),
    imageMinimumGcAge: z.string().describe(
      'Optional. Defines the minimum age for an unused image before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration less than or equal to 2 minutes. The default value is "2m0s" if unspecified.',
    ).optional(),
    insecureKubeletReadonlyPortEnabled: z.boolean().describe(
      "Enable or disable Kubelet read only port.",
    ).optional(),
    maxParallelImagePulls: z.number().int().describe(
      "Optional. Defines the maximum number of image pulls in parallel. The range is 2 to 5, inclusive. The default value is 2 or 3 depending on the disk type. See https://kubernetes.io/docs/concepts/containers/images/#maximum-parallel-image-pulls for more details.",
    ).optional(),
    memoryManager: z.object({
      policy: z.string().describe(
        'Controls the memory management policy on the Node. See https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/#policies The following values are allowed. * "none" * "static" The default value is \'none\' if unspecified.',
      ).optional(),
    }).describe(
      "The option enables the Kubernetes NUMA-aware Memory Manager feature. Detailed description about the feature can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/).",
    ).optional(),
    podPidsLimit: z.string().describe(
      "Set the Pod PID limits. See https://kubernetes.io/docs/concepts/policy/pid-limiting/#pod-pid-limits Controls the maximum number of processes allowed to run in a pod. The value must be greater than or equal to 1024 and less than 4194304.",
    ).optional(),
    shutdownGracePeriodCriticalPodsSeconds: z.number().int().describe(
      "Optional. shutdown_grace_period_critical_pods_seconds is the maximum allowed grace period (in seconds) used to terminate critical pods during a node shutdown. This value should be <= shutdown_grace_period_seconds, and is only valid if shutdown_grace_period_seconds is set. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ Range: [0, 120].",
    ).optional(),
    shutdownGracePeriodSeconds: z.number().int().describe(
      "Optional. shutdown_grace_period_seconds is the maximum allowed grace period (in seconds) the total duration that the node should delay the shutdown during a graceful shutdown. This is the total grace period for pod termination for both regular and critical pods. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ If set to 0, node will not enable the graceful node shutdown functionality. This field is only valid for Spot VMs. Allowed values: 0, 30, 120.",
    ).optional(),
    singleProcessOomKill: z.boolean().describe(
      "Optional. Defines whether to enable single process OOM killer. If true, will prevent the memory.oom.group flag from being set for container cgroups in cgroups v2. This causes processes in the container to be OOM killed individually instead of as a group.",
    ).optional(),
    topologyManager: z.object({
      policy: z.string().describe(
        "Configures the strategy for resource alignment. Allowed values are: * none: the default policy, and does not perform any topology alignment. * restricted: the topology manager stores the preferred NUMA node affinity for the container, and will reject the pod if the affinity if not preferred. * best-effort: the topology manager stores the preferred NUMA node affinity for the container. If the affinity is not preferred, the topology manager will admit the pod to the node anyway. * single-numa-node: the topology manager determines if the single NUMA node affinity is possible. If it is, Topology Manager will store this and the Hint Providers can then use this information when making the resource allocation decision. If, however, this is not possible then the Topology Manager will reject the pod from the node. This will result in a pod in a Terminated state with a pod admission failure. The default policy value is 'none' if unspecified. Details about each strategy can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-policies).",
      ).optional(),
      scope: z.string().describe(
        "The Topology Manager aligns resources in following scopes: * container * pod The default scope is 'container' if unspecified. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-scopes",
      ).optional(),
    }).describe(
      "TopologyManager defines the configuration options for Topology Manager feature. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/",
    ).optional(),
  }).describe("Node kubelet configs.").optional(),
  labels: z.object({
    labels: z.record(z.string(), z.string()).describe(
      "Map of node label keys and node label values.",
    ).optional(),
  }).describe(
    "Collection of node-level [Kubernetes labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels).",
  ).optional(),
  linuxNodeConfig: z.object({
    accurateTimeConfig: z.object({
      enablePtpKvmTimeSync: z.boolean().describe(
        "Enables enhanced time synchronization using PTP-KVM.",
      ).optional(),
    }).describe(
      "AccurateTimeConfig contains configuration for the accurate time synchronization feature.",
    ).optional(),
    cgroupMode: z.enum([
      "CGROUP_MODE_UNSPECIFIED",
      "CGROUP_MODE_V1",
      "CGROUP_MODE_V2",
    ]).describe("cgroup_mode specifies the cgroup mode to be used on the node.")
      .optional(),
    customNodeInit: z.object({
      initScript: z.object({
        args: z.array(z.string()).describe(
          "Optional. The optional arguments line to be passed to the init script.",
        ).optional(),
        gcpSecretManagerSecretUri: z.string().describe(
          "The resource name of the secret manager secret hosting the init script. Both global and regional secrets are supported with format below: Global secret: projects/{project}/secrets/{secret}/versions/{version} Regional secret: projects/{project}/locations/{location}/secrets/{secret}/versions/{version} Example: projects/1234567890/secrets/script_1/versions/1. Accept version number only, not support version alias. User can't configure both gcp_secret_manager_secret_uri and gcs_uri.",
        ).optional(),
        gcsGeneration: z.string().describe(
          'The generation of the init script stored in Gloud Storage. This is the required field to identify the version of the init script. User can get the genetaion from `gcloud storage objects describe gs://BUCKET_NAME/OBJECT_NAME --format="value(generation)"` or from the "Version history" tab of the object in the Cloud Console UI.',
        ).optional(),
        gcsUri: z.string().describe(
          "The Cloud Storage URI for storing the init script. Format: gs://BUCKET_NAME/OBJECT_NAME The service account on the node pool must have read access to the object. User can't configure both gcs_uri and gcp_secret_manager_secret_uri.",
        ).optional(),
      }).describe(
        "InitScript provide a simply bash script to be executed on the node.",
      ).optional(),
    }).describe(
      "Support for running custom init code while bootstrapping nodes.",
    ).optional(),
    hugepages: z.object({
      hugepageSize1g: z.number().int().describe(
        "Optional. Amount of 1G hugepages",
      ).optional(),
      hugepageSize2m: z.number().int().describe(
        "Optional. Amount of 2M hugepages",
      ).optional(),
    }).describe("Hugepages amount in both 2m and 1g size").optional(),
    nodeKernelModuleLoading: z.object({
      policy: z.enum([
        "POLICY_UNSPECIFIED",
        "ENFORCE_SIGNED_MODULES",
        "DO_NOT_ENFORCE_SIGNED_MODULES",
      ]).describe(
        "Set the node module loading policy for nodes in the node pool.",
      ).optional(),
    }).describe("Configuration for kernel module loading on nodes.").optional(),
    swapConfig: z.object({
      bootDiskProfile: z.object({
        swapSizeGib: z.string().describe(
          "Specifies the size of the swap space in gibibytes (GiB).",
        ).optional(),
        swapSizePercent: z.number().int().describe(
          "Specifies the size of the swap space as a percentage of the boot disk size.",
        ).optional(),
      }).describe("Swap on the node's boot disk.").optional(),
      dedicatedLocalSsdProfile: z.object({
        diskCount: z.string().describe(
          "The number of physical local NVMe SSD disks to attach.",
        ).optional(),
      }).describe(
        "Provisions a new, separate local NVMe SSD exclusively for swap.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. Enables or disables swap for the node pool.",
      ).optional(),
      encryptionConfig: z.object({
        disabled: z.boolean().describe(
          "Optional. If true, swap space will not be encrypted. Defaults to false (encrypted).",
        ).optional(),
      }).describe("Defines encryption settings for the swap space.").optional(),
      ephemeralLocalSsdProfile: z.object({
        swapSizeGib: z.string().describe(
          "Specifies the size of the swap space in gibibytes (GiB).",
        ).optional(),
        swapSizePercent: z.number().int().describe(
          "Specifies the size of the swap space as a percentage of the ephemeral local SSD capacity.",
        ).optional(),
      }).describe("Swap on the local SSD shared with pod ephemeral storage.")
        .optional(),
    }).describe("Configuration for swap memory on a node pool.").optional(),
    sysctls: z.record(z.string(), z.string()).describe(
      "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
    ).optional(),
    transparentHugepageDefrag: z.enum([
      "TRANSPARENT_HUGEPAGE_DEFRAG_UNSPECIFIED",
      "TRANSPARENT_HUGEPAGE_DEFRAG_ALWAYS",
      "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER",
      "TRANSPARENT_HUGEPAGE_DEFRAG_DEFER_WITH_MADVISE",
      "TRANSPARENT_HUGEPAGE_DEFRAG_MADVISE",
      "TRANSPARENT_HUGEPAGE_DEFRAG_NEVER",
    ]).describe(
      "Optional. Defines the transparent hugepage defrag configuration on the node. VM hugepage allocation can be managed by either limiting defragmentation for delayed allocation or skipping it entirely for immediate allocation only. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
    ).optional(),
    transparentHugepageEnabled: z.enum([
      "TRANSPARENT_HUGEPAGE_ENABLED_UNSPECIFIED",
      "TRANSPARENT_HUGEPAGE_ENABLED_ALWAYS",
      "TRANSPARENT_HUGEPAGE_ENABLED_MADVISE",
      "TRANSPARENT_HUGEPAGE_ENABLED_NEVER",
    ]).describe(
      "Optional. Transparent hugepage support for anonymous memory can be entirely disabled (mostly for debugging purposes) or only enabled inside MADV_HUGEPAGE regions (to avoid the risk of consuming more memory resources) or enabled system wide. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
    ).optional(),
  }).describe("Parameters that can be configured on Linux nodes.").optional(),
  locations: z.array(z.string()).describe(
    "The desired list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the node pool's nodes should be located. Changing the locations for a node pool will result in nodes being either created or removed from the node pool, depending on whether locations are being added or removed. Warning: It is recommended to update node pool locations in a standalone API call. Do not combine a location update with changes to other fields (such as `tags`, `labels`, `taints`, etc.) in the same request. Otherwise, the API performs a structural modification where changes to other fields will only apply to newly created nodes and will not be applied to existing nodes in the node pool. To ensure all nodes are updated consistently, use a separate API call for location changes.",
  ).optional(),
  loggingConfig: z.object({
    variantConfig: z.object({
      variant: z.enum(["VARIANT_UNSPECIFIED", "DEFAULT", "MAX_THROUGHPUT"])
        .describe("Logging variant deployed on nodes.").optional(),
    }).describe(
      "LoggingVariantConfig specifies the behaviour of the logging component.",
    ).optional(),
  }).describe(
    "NodePoolLoggingConfig specifies logging configuration for node pools.",
  ).optional(),
  machineType: z.string().describe(
    "Optional. The desired [Google Compute Engine machine type](https://cloud.google.com/compute/docs/machine-types) for nodes in the node pool. Initiates an upgrade operation that migrates the nodes in the node pool to the specified machine type.",
  ).optional(),
  maxRunDuration: z.string().describe(
    "The maximum duration for the nodes to exist. If unspecified, the nodes can exist indefinitely.",
  ).optional(),
  name: z.string().describe(
    "The name (project, location, cluster, node pool) of the node pool to update. Specified in the format `projects/*/locations/*/clusters/*/nodePools/*`.",
  ).optional(),
  nodeDrainConfig: z.object({
    respectPdbDuringNodePoolDeletion: z.boolean().describe(
      "Whether to respect PDB during node pool deletion.",
    ).optional(),
  }).describe(
    "NodeDrainConfig contains the node drain related configurations for this node pool.",
  ).optional(),
  nodeNetworkConfig: z.object({
    acceleratorNetworkProfile: z.string().describe(
      'Immutable. The accelerator network profile for the node pool. For now the only valid value is "auto". If specified, the network configuration of the nodes in this node pool will be managed by this profile for the supported machine types, zone, etc.',
    ).optional(),
    additionalNodeNetworkConfigs: z.array(z.object({
      network: z.string().describe(
        "Name of the VPC where the additional interface belongs",
      ).optional(),
      subnetwork: z.string().describe(
        "Name of the subnetwork where the additional interface belongs",
      ).optional(),
    })).describe(
      "We specify the additional node networks for this node pool using this list. Each node network corresponds to an additional interface",
    ).optional(),
    additionalPodNetworkConfigs: z.array(z.object({
      maxPodsPerNode: z.object({
        maxPodsPerNode: z.string().describe(
          "Constraint enforced on the max num of pods per node.",
        ).optional(),
      }).describe("Constraints applied to pods.").optional(),
      networkAttachment: z.string().describe(
        "The name of the network attachment for pods to communicate to; cannot be specified along with subnetwork or secondary_pod_range.",
      ).optional(),
      secondaryPodRange: z.string().describe(
        "The name of the secondary range on the subnet which provides IP address for this pod range.",
      ).optional(),
      subnetwork: z.string().describe(
        "Name of the subnetwork where the additional pod network belongs.",
      ).optional(),
    })).describe(
      "We specify the additional pod networks for this node pool using this list. Each pod network corresponds to an additional alias IP range for the node",
    ).optional(),
    createPodRange: z.boolean().describe(
      "Input only. Whether to create a new range for pod IPs in this node pool. Defaults are provided for `pod_range` and `pod_ipv4_cidr_block` if they are not specified. If neither `create_pod_range` or `pod_range` are specified, the cluster-level default (`ip_allocation_policy.cluster_ipv4_cidr_block`) is used. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
    ).optional(),
    enablePrivateNodes: z.boolean().describe(
      "Whether nodes have internal IP addresses only. If enable_private_nodes is not specified, then the value is derived from Cluster.NetworkConfig.default_enable_private_nodes",
    ).optional(),
    networkPerformanceConfig: z.object({
      totalEgressBandwidthTier: z.enum(["TIER_UNSPECIFIED", "TIER_1"]).describe(
        "Specifies the total network bandwidth tier for the NodePool.",
      ).optional(),
    }).describe("Configuration of all network bandwidth tiers").optional(),
    networkTierConfig: z.object({
      networkTier: z.enum([
        "NETWORK_TIER_UNSPECIFIED",
        "NETWORK_TIER_DEFAULT",
        "NETWORK_TIER_PREMIUM",
        "NETWORK_TIER_STANDARD",
      ]).describe("Network tier configuration.").optional(),
    }).describe("NetworkTierConfig contains network tier information.")
      .optional(),
    podCidrOverprovisionConfig: z.object({
      disable: z.boolean().describe(
        "Whether Pod CIDR overprovisioning is disabled. Note: Pod CIDR overprovisioning is enabled by default.",
      ).optional(),
    }).describe("[PRIVATE FIELD] Config for pod CIDR size overprovisioning.")
      .optional(),
    podIpv4CidrBlock: z.string().describe(
      "The IP address range for pod IPs in this node pool. Only applicable if `create_pod_range` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) to pick a specific range to use. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
    ).optional(),
    podIpv4RangeUtilization: z.number().describe(
      "Output only. The utilization of the IPv4 range for the pod. The ratio is Usage/[Total number of IPs in the secondary range], Usage=numNodes*numZones*podIPsPerNode.",
    ).optional(),
    podRange: z.string().describe(
      "The ID of the secondary range for pod IPs. If `create_pod_range` is true, this ID is used for the new range. If `create_pod_range` is false, uses an existing secondary range with this ID. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
    ).optional(),
    subnetwork: z.string().describe(
      "Optional. The subnetwork name/path for the node pool. Format: projects/{project}/regions/{region}/subnetworks/{subnetwork} If the cluster is associated with multiple subnetworks, the subnetwork can be either: - A user supplied subnetwork name during node pool creation (e.g., `my-subnet`). The name must be between 1 and 63 characters long, start with a letter, contain only letters, numbers, and hyphens, and end with a letter or a number. - A full subnetwork path during node pool creation, such as `projects/gke-project/regions/us-central1/subnetworks/my-subnet` - A subnetwork path picked based on the IP utilization during node pool creation and is immutable.",
    ).optional(),
  }).describe("Parameters for node pool-level network config.").optional(),
  nodeVersion: z.string().describe(
    'Required. The Kubernetes version to change the nodes to (typically an upgrade). Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the Kubernetes master version',
  ).optional(),
  queuedProvisioning: z.object({
    enabled: z.boolean().describe(
      "Denotes that this node pool is QRM specific, meaning nodes can be only obtained through queuing via the Cluster Autoscaler ProvisioningRequest API.",
    ).optional(),
  }).describe(
    "QueuedProvisioning defines the queued provisioning used by the node pool.",
  ).optional(),
  resourceLabels: z.object({
    labels: z.record(z.string(), z.string()).describe(
      "Map of node label keys and node label values.",
    ).optional(),
  }).describe(
    "Collection of [Resource Manager labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels).",
  ).optional(),
  resourceManagerTags: z.object({
    tags: z.record(z.string(), z.string()).describe(
      "TagKeyValue must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}`",
    ).optional(),
  }).describe(
    "A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.",
  ).optional(),
  storagePools: z.array(z.string()).describe(
    "List of Storage Pools where boot disks are provisioned. Existing Storage Pools will be replaced with storage-pools.",
  ).optional(),
  tags: z.object({
    tags: z.array(z.string()).describe("List of network tags.").optional(),
  }).describe(
    "Collection of Compute Engine network tags that can be applied to a node's underlying VM instance.",
  ).optional(),
  taintConfig: z.object({
    architectureTaintBehavior: z.enum([
      "ARCHITECTURE_TAINT_BEHAVIOR_UNSPECIFIED",
      "NONE",
      "ARM",
    ]).describe("Optional. Controls architecture tainting behavior.")
      .optional(),
  }).describe(
    "TaintConfig contains the configuration for the taints of the node pool.",
  ).optional(),
  taints: z.object({
    taints: z.array(z.object({
      effect: z.enum([
        "EFFECT_UNSPECIFIED",
        "NO_SCHEDULE",
        "PREFER_NO_SCHEDULE",
        "NO_EXECUTE",
      ]).describe("Effect for taint.").optional(),
      key: z.string().describe("Key for taint.").optional(),
      value: z.string().describe("Value for taint.").optional(),
    })).describe("List of node taints.").optional(),
  }).describe(
    "Collection of Kubernetes [node taints](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration).",
  ).optional(),
  upgradeSettings: z.object({
    blueGreenSettings: z.object({
      autoscaledRolloutPolicy: z.object({
        waitForDrainDuration: z.string().describe(
          "Optional. Time to wait after cordoning the blue pool before draining the nodes. Defaults to 3 days. The value can be set between 0 and 7 days, inclusive.",
        ).optional(),
      }).describe(
        "Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.",
      ).optional(),
      nodePoolSoakDuration: z.string().describe(
        "Time needed after draining entire blue pool. After this period, blue pool will be cleaned up.",
      ).optional(),
      standardRolloutPolicy: z.object({
        batchNodeCount: z.number().int().describe(
          "Number of blue nodes to drain in a batch.",
        ).optional(),
        batchPercentage: z.number().describe(
          "Percentage of the blue pool nodes to drain in a batch. The range of this field should be (0.0, 1.0].",
        ).optional(),
        batchSoakDuration: z.string().describe(
          "Soak time after each batch gets drained. Default to zero.",
        ).optional(),
      }).describe(
        "Standard rollout policy is the default policy for blue-green.",
      ).optional(),
    }).describe("Settings for blue-green upgrade.").optional(),
    maxSurge: z.number().int().describe(
      "The maximum number of nodes that can be created beyond the current size of the node pool during the upgrade process.",
    ).optional(),
    maxUnavailable: z.number().int().describe(
      "The maximum number of nodes that can be simultaneously unavailable during the upgrade process. A node is considered available if its status is Ready.",
    ).optional(),
    strategy: z.enum([
      "NODE_POOL_UPDATE_STRATEGY_UNSPECIFIED",
      "BLUE_GREEN",
      "SURGE",
      "SHORT_LIVED",
    ]).describe("Update strategy of the node pool.").optional(),
  }).describe(
    "These upgrade settings control the level of parallelism and the level of disruption caused by an upgrade. maxUnavailable controls the number of nodes that can be simultaneously unavailable. maxSurge controls the number of additional nodes that can be added to the node pool temporarily for the time of the upgrade to increase the number of available nodes. (maxUnavailable + maxSurge) determines the level of parallelism (how many nodes are being upgraded at the same time). Note: upgrades inevitably introduce some disruption since workloads need to be moved from old nodes to new, upgraded ones. Even if maxUnavailable=0, this holds true. (Disruption stays within the limits of PodDisruptionBudget, if it is configured.) Consider a hypothetical node pool with 5 nodes having maxSurge=2, maxUnavailable=1. This means the upgrade process upgrades 3 nodes simultaneously. It creates 2 additional (upgraded) nodes, then it brings down 3 old (not yet upgraded) nodes at the same time. This ensures that there are always at least 4 nodes available. These upgrade settings configure the upgrade strategy for the node pool. Use strategy to switch between the strategies applied to the node pool. If the strategy is ROLLING, use max_surge and max_unavailable to control the level of parallelism and the level of disruption caused by upgrade. 1. maxSurge controls the number of additional nodes that can be added to the node pool temporarily for the time of the upgrade to increase the number of available nodes. 2. maxUnavailable controls the number of nodes that can be simultaneously unavailable. 3. (maxUnavailable + maxSurge) determines the level of parallelism (how many nodes are being upgraded at the same time). If the strategy is BLUE_GREEN, use blue_green_settings to configure the blue-green upgrade related settings. 1. standard_rollout_policy is the default policy. The policy is used to control the way blue pool gets drained. The draining is executed in the batch mode. The batch size could be specified as either percentage of the node pool size or the number of nodes. batch_soak_duration is the soak time after each batch gets drained. 2. node_pool_soak_duration is the soak time after all blue nodes are drained. After this period, the blue pool nodes will be deleted.",
  ).optional(),
  windowsNodeConfig: z.object({
    osVersion: z.enum([
      "OS_VERSION_UNSPECIFIED",
      "OS_VERSION_LTSC2019",
      "OS_VERSION_LTSC2022",
    ]).describe(
      "OSVersion specifies the Windows node config to be used on the node.",
    ).optional(),
  }).describe(
    "Parameters that can be configured on Windows nodes. Windows Node Config that define the parameters that will be used to configure the Windows node pool settings.",
  ).optional(),
  workloadMetadataConfig: z.object({
    mode: z.enum(["MODE_UNSPECIFIED", "GCE_METADATA", "GKE_METADATA"]).describe(
      "Mode is the configuration for how to expose metadata to workloads running on the node pool.",
    ).optional(),
  }).describe(
    "WorkloadMetadataConfig defines the metadata configuration to expose to workloads on the node pool.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Kubernetes Engine Clusters.NodePools. Registered at `@swamp/gcp/container/clusters-nodepools`. */
export const model = {
  type: "@swamp/gcp/container/clusters-nodepools",
  version: "2026.05.01.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.04.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.01.1",
      description: "Added: taintConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "NodePool contains the name and configuration for a cluster's node pool. Node ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a nodePools",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["nodePool"] !== undefined) body["nodePool"] = g["nodePool"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "statusField": "status",
              "readyValues": ["RUNNING", "RECONCILING"],
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
      description: "Get a nodePools",
      arguments: z.object({
        identifier: z.string().describe("The name of the nodePools"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update nodePools attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["accelerators"] !== undefined) {
          body["accelerators"] = g["accelerators"];
        }
        if (g["bootDisk"] !== undefined) body["bootDisk"] = g["bootDisk"];
        if (g["confidentialNodes"] !== undefined) {
          body["confidentialNodes"] = g["confidentialNodes"];
        }
        if (g["consolidationDelay"] !== undefined) {
          body["consolidationDelay"] = g["consolidationDelay"];
        }
        if (g["containerdConfig"] !== undefined) {
          body["containerdConfig"] = g["containerdConfig"];
        }
        if (g["diskSizeGb"] !== undefined) body["diskSizeGb"] = g["diskSizeGb"];
        if (g["diskType"] !== undefined) body["diskType"] = g["diskType"];
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["fastSocket"] !== undefined) body["fastSocket"] = g["fastSocket"];
        if (g["flexStart"] !== undefined) body["flexStart"] = g["flexStart"];
        if (g["gcfsConfig"] !== undefined) body["gcfsConfig"] = g["gcfsConfig"];
        if (g["gvnic"] !== undefined) body["gvnic"] = g["gvnic"];
        if (g["imageType"] !== undefined) body["imageType"] = g["imageType"];
        if (g["kubeletConfig"] !== undefined) {
          body["kubeletConfig"] = g["kubeletConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["linuxNodeConfig"] !== undefined) {
          body["linuxNodeConfig"] = g["linuxNodeConfig"];
        }
        if (g["locations"] !== undefined) body["locations"] = g["locations"];
        if (g["loggingConfig"] !== undefined) {
          body["loggingConfig"] = g["loggingConfig"];
        }
        if (g["machineType"] !== undefined) {
          body["machineType"] = g["machineType"];
        }
        if (g["maxRunDuration"] !== undefined) {
          body["maxRunDuration"] = g["maxRunDuration"];
        }
        if (g["nodeDrainConfig"] !== undefined) {
          body["nodeDrainConfig"] = g["nodeDrainConfig"];
        }
        if (g["nodeNetworkConfig"] !== undefined) {
          body["nodeNetworkConfig"] = g["nodeNetworkConfig"];
        }
        if (g["nodeVersion"] !== undefined) {
          body["nodeVersion"] = g["nodeVersion"];
        }
        if (g["queuedProvisioning"] !== undefined) {
          body["queuedProvisioning"] = g["queuedProvisioning"];
        }
        if (g["resourceLabels"] !== undefined) {
          body["resourceLabels"] = g["resourceLabels"];
        }
        if (g["resourceManagerTags"] !== undefined) {
          body["resourceManagerTags"] = g["resourceManagerTags"];
        }
        if (g["storagePools"] !== undefined) {
          body["storagePools"] = g["storagePools"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["taintConfig"] !== undefined) {
          body["taintConfig"] = g["taintConfig"];
        }
        if (g["taints"] !== undefined) body["taints"] = g["taints"];
        if (g["upgradeSettings"] !== undefined) {
          body["upgradeSettings"] = g["upgradeSettings"];
        }
        if (g["windowsNodeConfig"] !== undefined) {
          body["windowsNodeConfig"] = g["windowsNodeConfig"];
        }
        if (g["workloadMetadataConfig"] !== undefined) {
          body["workloadMetadataConfig"] = g["workloadMetadataConfig"];
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
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["RUNNING", "RECONCILING"],
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
      description: "Delete the nodePools",
      arguments: z.object({
        identifier: z.string().describe("The name of the nodePools"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync nodePools state from GCP",
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
            String(g["parent"] ?? ""),
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
    complete_upgrade: {
      description: "complete upgrade",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "container.projects.locations.clusters.nodePools.completeUpgrade",
            "path": "v1/{+name}:completeUpgrade",
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
    fetch_node_pool_upgrade_info: {
      description: "fetch node pool upgrade info",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "container.projects.locations.clusters.nodePools.fetchNodePoolUpgradeInfo",
            "path": "v1/{+name}:fetchNodePoolUpgradeInfo",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "version": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    rollback: {
      description: "rollback",
      arguments: z.object({
        clusterId: z.any().optional(),
        name: z.any().optional(),
        nodePoolId: z.any().optional(),
        projectId: z.any().optional(),
        respectPdb: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["clusterId"] !== undefined) {
          body["clusterId"] = args["clusterId"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["nodePoolId"] !== undefined) {
          body["nodePoolId"] = args["nodePoolId"];
        }
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["respectPdb"] !== undefined) {
          body["respectPdb"] = args["respectPdb"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.nodePools.rollback",
            "path": "v1/{+name}:rollback",
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
    set_autoscaling: {
      description: "set autoscaling",
      arguments: z.object({
        autoscaling: z.any().optional(),
        clusterId: z.any().optional(),
        name: z.any().optional(),
        nodePoolId: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["autoscaling"] !== undefined) {
          body["autoscaling"] = args["autoscaling"];
        }
        if (args["clusterId"] !== undefined) {
          body["clusterId"] = args["clusterId"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["nodePoolId"] !== undefined) {
          body["nodePoolId"] = args["nodePoolId"];
        }
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "container.projects.locations.clusters.nodePools.setAutoscaling",
            "path": "v1/{+name}:setAutoscaling",
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
    set_management: {
      description: "set management",
      arguments: z.object({
        clusterId: z.any().optional(),
        management: z.any().optional(),
        name: z.any().optional(),
        nodePoolId: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["clusterId"] !== undefined) {
          body["clusterId"] = args["clusterId"];
        }
        if (args["management"] !== undefined) {
          body["management"] = args["management"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["nodePoolId"] !== undefined) {
          body["nodePoolId"] = args["nodePoolId"];
        }
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "container.projects.locations.clusters.nodePools.setManagement",
            "path": "v1/{+name}:setManagement",
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
    set_size: {
      description: "set size",
      arguments: z.object({
        clusterId: z.any().optional(),
        name: z.any().optional(),
        nodeCount: z.any().optional(),
        nodePoolId: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["clusterId"] !== undefined) {
          body["clusterId"] = args["clusterId"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["nodeCount"] !== undefined) {
          body["nodeCount"] = args["nodeCount"];
        }
        if (args["nodePoolId"] !== undefined) {
          body["nodePoolId"] = args["nodePoolId"];
        }
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.nodePools.setSize",
            "path": "v1/{+name}:setSize",
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
