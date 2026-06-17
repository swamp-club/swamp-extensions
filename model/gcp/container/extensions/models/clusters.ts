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

// Auto-generated extension model for @swamp/gcp/container/clusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Kubernetes Engine Clusters.
 *
 * A Google Kubernetes Engine cluster.
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
  return `${parent}/clusters/${shortName}`;
}

const BASE_URL = "https://container.googleapis.com/";

const GET_CONFIG = {
  "id": "container.projects.locations.clusters.get",
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
    "projectId": {
      "location": "query",
    },
    "zone": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "container.projects.locations.clusters.create",
  "path": "v1/{+parent}/clusters",
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
  "id": "container.projects.locations.clusters.update",
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
  "id": "container.projects.locations.clusters.delete",
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
    "projectId": {
      "location": "query",
    },
    "zone": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "container.projects.locations.clusters.list",
  "path": "v1/{+parent}/clusters",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  cluster: z.object({
    addonsConfig: z.object({
      agentSandboxConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether AgentSandbox is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the AgentSandbox addon.").optional(),
      cloudRunConfig: z.object({
        disabled: z.boolean().describe(
          "Whether Cloud Run addon is enabled for this cluster.",
        ).optional(),
        loadBalancerType: z.enum([
          "LOAD_BALANCER_TYPE_UNSPECIFIED",
          "LOAD_BALANCER_TYPE_EXTERNAL",
          "LOAD_BALANCER_TYPE_INTERNAL",
        ]).describe("Which load balancer type is installed for Cloud Run.")
          .optional(),
      }).describe("Configuration options for the Cloud Run feature.")
        .optional(),
      configConnectorConfig: z.object({
        enabled: z.boolean().describe(
          "Whether Cloud Connector is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration options for the Config Connector add-on.")
        .optional(),
      dnsCacheConfig: z.object({
        enabled: z.boolean().describe(
          "Whether NodeLocal DNSCache is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for NodeLocal DNSCache").optional(),
      gcePersistentDiskCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Compute Engine PD CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Compute Engine PD CSI driver.")
        .optional(),
      gcpFilestoreCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Filestore CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Filestore CSI driver.").optional(),
      gcsFuseCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Cloud Storage Fuse CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Cloud Storage Fuse CSI driver.")
        .optional(),
      gkeBackupAgentConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Backup for GKE agent is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Backup for GKE Agent.").optional(),
      highScaleCheckpointingConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the High Scale Checkpointing is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the High Scale Checkpointing.").optional(),
      horizontalPodAutoscaling: z.object({
        disabled: z.boolean().describe(
          "Whether the Horizontal Pod Autoscaling feature is enabled in the cluster. When enabled, it ensures that metrics are collected into Stackdriver Monitoring.",
        ).optional(),
      }).describe(
        "Configuration options for the horizontal pod autoscaling feature, which increases or decreases the number of replica pods a replication controller has based on the resource usage of the existing pods.",
      ).optional(),
      httpLoadBalancing: z.object({
        disabled: z.boolean().describe(
          "Whether the HTTP Load Balancing controller is enabled in the cluster. When enabled, it runs a small pod in the cluster that manages the load balancers.",
        ).optional(),
      }).describe(
        "Configuration options for the HTTP (L7) load balancing controller addon, which makes it easy to set up HTTP load balancers for services in a cluster.",
      ).optional(),
      kubernetesDashboard: z.object({
        disabled: z.boolean().describe(
          "Whether the Kubernetes Dashboard is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Kubernetes Dashboard.").optional(),
      lustreCsiDriverConfig: z.object({
        disableMultiNic: z.boolean().describe(
          "When set to true, this disables multi-NIC support for the Lustre CSI driver. By default, GKE enables multi-NIC support, which allows the Lustre CSI driver to automatically detect and configure all suitable network interfaces on a node to maximize I/O performance for demanding workloads.",
        ).optional(),
        enableLegacyLustrePort: z.boolean().describe(
          "If set to true, the Lustre CSI driver will install Lustre kernel modules using port 6988. This serves as a workaround for a port conflict with the gke-metadata-server. This field is required ONLY under the following conditions: 1. The GKE node version is older than 1.33.2-gke.4655000. 2. You're connecting to a Lustre instance that has the 'gke-support-enabled' flag. Deprecated: This flag is no longer required as of GKE node version 1.33.2-gke.4655000, unless you are connecting to a Lustre instance that has the `gke-support-enabled` flag.",
        ).optional(),
        enabled: z.boolean().describe(
          "Whether the Lustre CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Lustre CSI driver.").optional(),
      networkPolicyConfig: z.object({
        disabled: z.boolean().describe(
          "Whether NetworkPolicy is enabled for this cluster.",
        ).optional(),
      }).describe(
        "Configuration for NetworkPolicy. This only tracks whether the addon is enabled or not on the Master, it does not track whether network policy is enabled for the nodes.",
      ).optional(),
      nodeReadinessConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether the GKE Node Readiness Controller is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the GKE Node Readiness Controller.")
        .optional(),
      parallelstoreCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Cloud Storage Parallelstore CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe(
        "Configuration for the Cloud Storage Parallelstore CSI driver.",
      ).optional(),
      podSnapshotConfig: z.object({
        enabled: z.boolean().describe(
          "Whether or not the Pod Snapshots feature is enabled.",
        ).optional(),
      }).describe(
        "PodSnapshotConfig is the configuration for GKE Pod Snapshots feature.",
      ).optional(),
      rayOperatorConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Ray Operator addon is enabled for this cluster.",
        ).optional(),
        rayClusterLoggingConfig: z.object({
          enabled: z.boolean().describe(
            "Enable log collection for Ray clusters.",
          ).optional(),
        }).describe(
          "RayClusterLoggingConfig specifies configuration of Ray logging.",
        ).optional(),
        rayClusterMonitoringConfig: z.object({
          enabled: z.boolean().describe(
            "Enable metrics collection for Ray clusters.",
          ).optional(),
        }).describe(
          "RayClusterMonitoringConfig specifies monitoring configuration for Ray clusters.",
        ).optional(),
      }).describe("Configuration options for the Ray Operator add-on.")
        .optional(),
      sliceControllerConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Indicates whether Slice Controller is enabled in the cluster.",
        ).optional(),
      }).describe("Configuration for the Slice Controller.").optional(),
      slurmOperatorConfig: z.object({
        enabled: z.boolean().describe(
          "When enabled, it runs a Slurm Operator that manages the set of compute pods for Slurm Cluster.",
        ).optional(),
      }).describe("Configuration for the Slurm Operator.").optional(),
      statefulHaConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Stateful HA add-on is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Stateful HA add-on.").optional(),
    }).describe(
      "Configuration for the addons that can be automatically spun up in the cluster, enabling additional functionality.",
    ).optional(),
    alphaClusterFeatureGates: z.array(z.string()).describe(
      'The list of user specified Kubernetes feature gates. Each string represents the activation status of a feature gate (e.g. "featureX=true" or "featureX=false")',
    ).optional(),
    anonymousAuthenticationConfig: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "ENABLED", "LIMITED"]).describe(
        "Defines the mode of limiting anonymous access in the cluster.",
      ).optional(),
    }).describe(
      "AnonymousAuthenticationConfig defines the settings needed to limit endpoints that allow anonymous authentication.",
    ).optional(),
    authenticatorGroupsConfig: z.object({
      enabled: z.boolean().describe(
        "Whether this cluster should return group membership lookups during authentication using a group of security groups.",
      ).optional(),
      securityGroup: z.string().describe(
        "The name of the security group-of-groups to be used. Only relevant if enabled = true.",
      ).optional(),
    }).describe(
      "Configuration for returning group information from authenticators.",
    ).optional(),
    autopilot: z.object({
      clusterPolicyConfig: z.object({
        noStandardNodePools: z.boolean().describe(
          "Denotes preventing standard node pools and requiring only autopilot node pools.",
        ).optional(),
        noSystemImpersonation: z.boolean().describe(
          "Denotes preventing impersonation and CSRs for GKE System users.",
        ).optional(),
        noSystemMutation: z.boolean().describe(
          "Denotes that preventing creation and mutation of resources in GKE managed namespaces and cluster-scoped GKE managed resources.",
        ).optional(),
        noUnsafeWebhooks: z.boolean().describe(
          "Denotes preventing unsafe webhooks.",
        ).optional(),
      }).describe(
        "ClusterPolicyConfig stores the configuration for cluster wide policies.",
      ).optional(),
      enabled: z.boolean().describe("Enable Autopilot").optional(),
      privilegedAdmissionConfig: z.object({
        allowlistPaths: z.array(z.string()).describe(
          "The customer allowlist Cloud Storage paths for the cluster. These paths are used with the `--autopilot-privileged-admission` flag to authorize privileged workloads in Autopilot clusters. Paths can be GKE-owned, in the format `gke:////`, or customer-owned, in the format `gs:///`. Wildcards (`*`) are supported to authorize all allowlists under specific paths or directories. Example: `gs://my-bucket/*` will authorize all allowlists under the `my-bucket` bucket.",
        ).optional(),
      }).describe(
        "PrivilegedAdmissionConfig stores the list of authorized allowlist paths for the cluster.",
      ).optional(),
      workloadPolicyConfig: z.object({
        allowNetAdmin: z.boolean().describe(
          "If true, workloads can use NET_ADMIN capability.",
        ).optional(),
        autopilotCompatibilityAuditingEnabled: z.boolean().describe(
          "If true, enables the GCW Auditor that audits workloads on standard clusters.",
        ).optional(),
      }).describe(
        "WorkloadPolicyConfig is the configuration related to GCW workload policy",
      ).optional(),
    }).describe(
      "Autopilot is the configuration for Autopilot settings on the cluster.",
    ).optional(),
    autoscaling: z.object({
      autopilotGeneralProfile: z.enum([
        "AUTOPILOT_GENERAL_PROFILE_UNSPECIFIED",
        "NO_PERFORMANCE",
        "NONE",
      ]).describe(
        "Autopilot general profile for the cluster, which defines the configuration for the cluster.",
      ).optional(),
      autoprovisioningLocations: z.array(z.string()).describe(
        "The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the NodePool's nodes can be created by NAP.",
      ).optional(),
      autoprovisioningNodePoolDefaults: z.object({
        bootDiskKmsKey: z.string().describe(
          "The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption",
        ).optional(),
        diskSizeGb: z.number().int().describe(
          "Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 10GB. If unspecified, the default disk size is 100GB.",
        ).optional(),
        diskType: z.string().describe(
          "Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard'",
        ).optional(),
        imageType: z.string().describe(
          "The image type to use for NAP created node. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types.",
        ).optional(),
        insecureKubeletReadonlyPortEnabled: z.boolean().describe(
          "DEPRECATED. Use NodePoolAutoConfig.NodeKubeletConfig instead.",
        ).optional(),
        management: z.object({
          autoRepair: z.boolean().describe(
            "A flag that specifies whether the node auto-repair is enabled for the node pool. If enabled, the nodes in this node pool will be monitored and, if they fail health checks too many times, an automatic repair action will be triggered.",
          ).optional(),
          autoUpgrade: z.boolean().describe(
            "A flag that specifies whether node auto-upgrade is enabled for the node pool. If enabled, node auto-upgrade helps keep the nodes in your node pool up to date with the latest release version of Kubernetes.",
          ).optional(),
          upgradeOptions: z.object({
            autoUpgradeStartTime: z.unknown().describe(
              "Output only. This field is set when upgrades are about to commence with the approximate start time for the upgrades, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
            ).optional(),
            description: z.unknown().describe(
              "Output only. This field is set when upgrades are about to commence with the description of the upgrade.",
            ).optional(),
          }).describe(
            "AutoUpgradeOptions defines the set of options for the user to control how the Auto Upgrades will proceed.",
          ).optional(),
        }).describe(
          "NodeManagement defines the set of node management services turned on for the node pool.",
        ).optional(),
        minCpuPlatform: z.string().describe(
          'Deprecated. Minimum CPU platform to be used for NAP created node pools. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: Intel Haswell or minCpuPlatform: Intel Sandy Bridge. For more information, read [how to specify min CPU platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform). This field is deprecated, min_cpu_platform should be specified using `cloud.google.com/requested-min-cpu-platform` label selector on the pod. To unset the min cpu platform field pass "automatic" as field value.',
        ).optional(),
        oauthScopes: z.array(z.string()).describe(
          "Scopes that are used by NAP when creating node pools.",
        ).optional(),
        serviceAccount: z.string().describe(
          "The Google Cloud Platform Service Account to be used by the node VMs.",
        ).optional(),
        shieldedInstanceConfig: z.object({
          enableIntegrityMonitoring: z.boolean().describe(
            "Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created.",
          ).optional(),
          enableSecureBoot: z.boolean().describe(
            "Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails.",
          ).optional(),
        }).describe("A set of Shielded Instance options.").optional(),
        upgradeSettings: z.object({
          blueGreenSettings: z.object({
            autoscaledRolloutPolicy: z.unknown().describe(
              "Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.",
            ).optional(),
            nodePoolSoakDuration: z.unknown().describe(
              "Time needed after draining entire blue pool. After this period, blue pool will be cleaned up.",
            ).optional(),
            standardRolloutPolicy: z.unknown().describe(
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
      }).describe(
        "AutoprovisioningNodePoolDefaults contains defaults for a node pool created by NAP.",
      ).optional(),
      autoscalingProfile: z.enum([
        "PROFILE_UNSPECIFIED",
        "OPTIMIZE_UTILIZATION",
        "BALANCED",
      ]).describe("Defines autoscaling behaviour.").optional(),
      defaultComputeClassConfig: z.object({
        enabled: z.boolean().describe("Enables default compute class.")
          .optional(),
      }).describe(
        "DefaultComputeClassConfig defines default compute class configuration.",
      ).optional(),
      enableNodeAutoprovisioning: z.boolean().describe(
        "Enables automatic node pool creation and deletion.",
      ).optional(),
      resourceLimits: z.array(z.object({
        maximum: z.string().describe(
          "Maximum amount of the resource in the cluster.",
        ).optional(),
        minimum: z.string().describe(
          "Minimum amount of the resource in the cluster.",
        ).optional(),
        resourceType: z.string().describe(
          'Resource name "cpu", "memory" or gpu-specific string.',
        ).optional(),
      })).describe(
        "Contains global constraints regarding minimum and maximum amount of resources in the cluster.",
      ).optional(),
    }).describe(
      "ClusterAutoscaling contains global, per-cluster information required by Cluster Autoscaler to automatically adjust the size of the cluster and create/delete node pools based on the current needs.",
    ).optional(),
    binaryAuthorization: z.object({
      enabled: z.boolean().describe(
        "This field is deprecated. Leave this unset and instead configure BinaryAuthorization using evaluation_mode. If evaluation_mode is set to anything other than EVALUATION_MODE_UNSPECIFIED, this field is ignored.",
      ).optional(),
      evaluationMode: z.enum([
        "EVALUATION_MODE_UNSPECIFIED",
        "DISABLED",
        "PROJECT_SINGLETON_POLICY_ENFORCE",
      ]).describe(
        "Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED.",
      ).optional(),
    }).describe("Configuration for Binary Authorization.").optional(),
    clusterIpv4Cidr: z.string().describe(
      "The IP address range of the container pods in this cluster, in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`). Leave blank to have one automatically chosen or specify a `/14` block in `10.0.0.0/8`.",
    ).optional(),
    compliancePostureConfig: z.object({
      complianceStandards: z.array(z.object({
        standard: z.string().describe("Name of the compliance standard.")
          .optional(),
      })).describe("List of enabled compliance standards.").optional(),
      mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "ENABLED"]).describe(
        "Defines the enablement mode for Compliance Posture.",
      ).optional(),
    }).describe(
      "Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. CompliancePostureConfig defines the settings needed to enable/disable features for the Compliance Posture.",
    ).optional(),
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
    })).describe("Which conditions caused the current cluster state.")
      .optional(),
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
    controlPlaneEgress: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "VIA_CONTROL_PLANE", "NONE"]).describe(
        "Defines the mode of control plane egress.",
      ).optional(),
    }).describe(
      "ControlPlaneEgress defines the settings needed to enable control plane egress control.",
    ).optional(),
    controlPlaneEndpointsConfig: z.object({
      dnsEndpointConfig: z.object({
        allowExternalTraffic: z.boolean().describe(
          "Controls whether user traffic is allowed over this endpoint. Note that Google-managed services may still use the endpoint even if this is false.",
        ).optional(),
        enableK8sCertsViaDns: z.boolean().describe(
          "Controls whether the k8s certs auth is allowed via DNS.",
        ).optional(),
        enableK8sTokensViaDns: z.boolean().describe(
          "Controls whether the k8s token auth is allowed via DNS.",
        ).optional(),
        endpoint: z.string().describe(
          "Output only. The cluster's DNS endpoint configuration. A DNS format address. This is accessible from the public internet. Ex: uid.us-central1.gke.goog. Always present, but the behavior may change according to the value of DNSEndpointConfig.allow_external_traffic.",
        ).optional(),
      }).describe("Describes the configuration of a DNS endpoint.").optional(),
      ipEndpointsConfig: z.object({
        authorizedNetworksConfig: z.object({
          cidrBlocks: z.array(z.unknown()).describe(
            "cidr_blocks define up to 50 external networks that could access Kubernetes master through HTTPS.",
          ).optional(),
          enabled: z.boolean().describe(
            "Whether or not master authorized networks is enabled.",
          ).optional(),
          gcpPublicCidrsAccessEnabled: z.boolean().describe(
            "Whether master is accessible via Google Compute Engine Public IP addresses.",
          ).optional(),
          privateEndpointEnforcementEnabled: z.boolean().describe(
            "Whether master authorized networks is enforced on private endpoint or not.",
          ).optional(),
        }).describe(
          "Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.",
        ).optional(),
        enablePublicEndpoint: z.boolean().describe(
          "Controls whether the control plane allows access through a public IP. It is invalid to specify both PrivateClusterConfig.enablePrivateEndpoint and this field at the same time.",
        ).optional(),
        enabled: z.boolean().describe(
          "Controls whether to allow direct IP access.",
        ).optional(),
        globalAccess: z.boolean().describe(
          "Controls whether the control plane's private endpoint is accessible from sources in other regions. It is invalid to specify both PrivateClusterMasterGlobalAccessConfig.enabled and this field at the same time.",
        ).optional(),
        privateEndpoint: z.string().describe(
          "Output only. The internal IP address of this cluster's control plane. Only populated if enabled.",
        ).optional(),
        privateEndpointSubnetwork: z.string().describe(
          "Subnet to provision the master's private endpoint during cluster creation. Specified in projects/*/regions/*/subnetworks/* format. It is invalid to specify both PrivateClusterConfig.privateEndpointSubnetwork and this field at the same time.",
        ).optional(),
        publicEndpoint: z.string().describe(
          "Output only. The external IP address of this cluster's control plane. Only populated if enabled.",
        ).optional(),
      }).describe("IP endpoints configuration.").optional(),
    }).describe(
      "Configuration for all of the cluster's control plane endpoints.",
    ).optional(),
    costManagementConfig: z.object({
      enabled: z.boolean().describe("Whether the feature is enabled or not.")
        .optional(),
    }).describe("Configuration for fine-grained cost management feature.")
      .optional(),
    createTime: z.string().describe(
      "Output only. The time the cluster was created, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
    ).optional(),
    currentMasterVersion: z.string().describe(
      "Output only. The current software version of the master endpoint.",
    ).optional(),
    currentNodeCount: z.number().int().describe(
      "Output only. The number of nodes currently in the cluster. Deprecated. Call Kubernetes API directly to retrieve node information.",
    ).optional(),
    currentNodeVersion: z.string().describe(
      "Output only. Deprecated, use [NodePools.version](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools) instead. The current version of the node software components. If they are currently at multiple versions because they're in the process of being upgraded, this reflects the minimum version of all nodes.",
    ).optional(),
    databaseEncryption: z.object({
      currentState: z.enum([
        "CURRENT_STATE_UNSPECIFIED",
        "CURRENT_STATE_ENCRYPTED",
        "CURRENT_STATE_DECRYPTED",
        "CURRENT_STATE_ENCRYPTION_PENDING",
        "CURRENT_STATE_ENCRYPTION_ERROR",
        "CURRENT_STATE_DECRYPTION_PENDING",
        "CURRENT_STATE_DECRYPTION_ERROR",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_ENABLED",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_PENDING",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_ERROR",
      ]).describe("Output only. The current state of etcd encryption.")
        .optional(),
      decryptionKeys: z.array(z.string()).describe(
        "Output only. Keys in use by the cluster for decrypting existing objects, in addition to the key in `key_name`. Each item is a CloudKMS key resource.",
      ).optional(),
      keyName: z.string().describe(
        "Name of CloudKMS key to use for the encryption of secrets in etcd. Ex. projects/my-project/locations/global/keyRings/my-ring/cryptoKeys/my-key",
      ).optional(),
      lastOperationErrors: z.array(z.object({
        errorMessage: z.string().describe(
          "Description of the error seen during the operation.",
        ).optional(),
        keyName: z.string().describe(
          "CloudKMS key resource that had the error.",
        ).optional(),
        timestamp: z.string().describe("Time when the CloudKMS error was seen.")
          .optional(),
      })).describe(
        "Output only. Records errors seen during DatabaseEncryption update operations.",
      ).optional(),
      state: z.enum([
        "UNKNOWN",
        "ENCRYPTED",
        "DECRYPTED",
        "ALL_OBJECTS_ENCRYPTION_ENABLED",
      ]).describe("The desired state of etcd encryption.").optional(),
    }).describe("Configuration of etcd encryption.").optional(),
    defaultMaxPodsConstraint: z.object({
      maxPodsPerNode: z.string().describe(
        "Constraint enforced on the max num of pods per node.",
      ).optional(),
    }).describe("Constraints applied to pods.").optional(),
    description: z.string().describe("An optional description of this cluster.")
      .optional(),
    enableK8sBetaApis: z.object({
      enabledApis: z.array(z.string()).describe("Enabled k8s beta APIs.")
        .optional(),
    }).describe("K8sBetaAPIConfig, configuration for beta APIs").optional(),
    enableKubernetesAlpha: z.boolean().describe(
      "Kubernetes alpha features are enabled on this cluster. This includes alpha API groups (e.g. v1alpha1) and features that may not be production ready in the kubernetes version of the master and nodes. The cluster has no SLA for uptime and master/node upgrades are disabled. Alpha enabled clusters are automatically deleted thirty days after creation.",
    ).optional(),
    enableTpu: z.boolean().describe(
      "Enable the ability to use Cloud TPUs in this cluster. This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25.",
    ).optional(),
    endpoint: z.string().describe(
      "Output only. The IP address of this cluster's master endpoint. The endpoint can be accessed from the internet at `https://username:password@endpoint/`. See the `masterAuth` property of this resource for username and password information.",
    ).optional(),
    enterpriseConfig: z.object({
      clusterTier: z.enum([
        "CLUSTER_TIER_UNSPECIFIED",
        "STANDARD",
        "ENTERPRISE",
      ]).describe(
        "Output only. cluster_tier indicates the effective tier of the cluster.",
      ).optional(),
      desiredTier: z.enum([
        "CLUSTER_TIER_UNSPECIFIED",
        "STANDARD",
        "ENTERPRISE",
      ]).describe("desired_tier specifies the desired tier of the cluster.")
        .optional(),
    }).describe(
      "EnterpriseConfig is the cluster enterprise configuration. Deprecated: GKE Enterprise features are now available without an Enterprise tier.",
    ).optional(),
    etag: z.string().describe(
      "This checksum is computed by the server based on the value of cluster fields, and may be sent on update requests to ensure the client has an up-to-date value before proceeding.",
    ).optional(),
    expireTime: z.string().describe(
      "Output only. The time the cluster will be automatically deleted in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
    ).optional(),
    fleet: z.object({
      membership: z.string().describe(
        "Output only. The full resource name of the registered fleet membership of the cluster, in the format `//gkehub.googleapis.com/projects/*/locations/*/memberships/*`.",
      ).optional(),
      membershipType: z.enum(["MEMBERSHIP_TYPE_UNSPECIFIED", "LIGHTWEIGHT"])
        .describe("The type of the cluster's fleet membership.").optional(),
      preRegistered: z.boolean().describe(
        "Output only. Whether the cluster has been registered through the fleet API.",
      ).optional(),
      project: z.string().describe(
        "The Fleet host project(project ID or project number) where this cluster will be registered to. This field cannot be changed after the cluster has been registered.",
      ).optional(),
    }).describe("Fleet is the fleet configuration for the cluster.").optional(),
    gkeAutoUpgradeConfig: z.object({
      patchMode: z.enum(["PATCH_MODE_UNSPECIFIED", "ACCELERATED"]).describe(
        "PatchMode specifies how auto upgrade patch builds should be selected.",
      ).optional(),
    }).describe(
      "GkeAutoUpgradeConfig is the configuration for GKE auto upgrades.",
    ).optional(),
    id: z.string().describe("Output only. Unique id for the cluster.")
      .optional(),
    identityServiceConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable the Identity Service component",
      ).optional(),
    }).describe(
      "IdentityServiceConfig is configuration for Identity Service which allows customers to use external identity providers with the K8S API",
    ).optional(),
    initialClusterVersion: z.string().describe(
      'The initial Kubernetes version for this cluster. Valid versions are those found in validMasterVersions returned by getServerConfig. The version can be upgraded over time; such upgrades are reflected in currentMasterVersion and currentNodeVersion. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "","-": picks the default Kubernetes version',
    ).optional(),
    initialNodeCount: z.number().int().describe(
      'The number of nodes to create in this cluster. You must ensure that your Compute Engine [resource quota](https://cloud.google.com/compute/quotas) is sufficient for this number of instances. You must also have available firewall and routes quota. For requests, this field should only be used in lieu of a "node_pool" object, since this configuration (along with the "node_config") will be used to create a "NodePool" object with an auto-generated name. Do not use this and a node_pool at the same time. This field is deprecated, use node_pool.initial_node_count instead.',
    ).optional(),
    instanceGroupUrls: z.array(z.string()).describe(
      "Output only. Deprecated. Use node_pools.instance_group_urls.",
    ).optional(),
    ipAllocationPolicy: z.object({
      additionalIpRangesConfigs: z.array(z.object({
        podIpv4RangeNames: z.array(z.unknown()).describe(
          "List of secondary ranges names within this subnetwork that can be used for pod IPs. Example1: gke-pod-range1 Example2: gke-pod-range1,gke-pod-range2",
        ).optional(),
        status: z.enum(["STATUS_UNSPECIFIED", "ACTIVE", "DRAINING"]).describe(
          "Draining status of the additional subnet.",
        ).optional(),
        subnetwork: z.string().describe(
          "Name of the subnetwork. This can be the full path of the subnetwork or just the name. Example1: my-subnet Example2: projects/gke-project/regions/us-central1/subnetworks/my-subnet",
        ).optional(),
      })).describe(
        "Output only. The additional IP ranges that are added to the cluster. These IP ranges can be used by new node pools to allocate node and pod IPs automatically. Each AdditionalIPRangesConfig corresponds to a single subnetwork. Once a range is removed it will not show up in IPAllocationPolicy.",
      ).optional(),
      additionalPodRangesConfig: z.object({
        podRangeInfo: z.array(z.object({
          rangeName: z.unknown().describe("Output only. Name of a range.")
            .optional(),
          utilization: z.unknown().describe(
            "Output only. The utilization of the range.",
          ).optional(),
        })).describe("Output only. Information for additional pod range.")
          .optional(),
        podRangeNames: z.array(z.string()).describe(
          "Name for pod secondary ipv4 range which has the actual range defined ahead.",
        ).optional(),
      }).describe(
        "AdditionalPodRangesConfig is the configuration for additional pod secondary ranges supporting the ClusterUpdate message.",
      ).optional(),
      autoIpamConfig: z.object({
        enabled: z.boolean().describe(
          "The flag that enables Auto IPAM on this cluster",
        ).optional(),
      }).describe(
        "AutoIpamConfig contains all information related to Auto IPAM",
      ).optional(),
      clusterIpv4Cidr: z.string().describe(
        "This field is deprecated, use cluster_ipv4_cidr_block.",
      ).optional(),
      clusterIpv4CidrBlock: z.string().describe(
        "The IP address range for the cluster pod IPs. If this field is set, then `cluster.cluster_ipv4_cidr` must be left blank. This field is only applicable when `use_ip_aliases` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.",
      ).optional(),
      clusterSecondaryRangeName: z.string().describe(
        "The name of the secondary range to be used for the cluster CIDR block. The secondary range will be used for pod IP addresses. This must be an existing secondary range associated with the cluster subnetwork. This field is only applicable with use_ip_aliases is true and create_subnetwork is false.",
      ).optional(),
      createSubnetwork: z.boolean().describe(
        "Whether a new subnetwork will be created automatically for the cluster. This field is only applicable when `use_ip_aliases` is true.",
      ).optional(),
      defaultPodIpv4RangeUtilization: z.number().describe(
        "Output only. The utilization of the cluster default IPv4 range for the pod. The ratio is Usage/[Total number of IPs in the secondary range], Usage=numNodes*numZones*podIPsPerNode.",
      ).optional(),
      ipv6AccessType: z.enum([
        "IPV6_ACCESS_TYPE_UNSPECIFIED",
        "INTERNAL",
        "EXTERNAL",
      ]).describe(
        "The ipv6 access type (internal or external) when create_subnetwork is true",
      ).optional(),
      networkTierConfig: z.object({
        networkTier: z.enum([
          "NETWORK_TIER_UNSPECIFIED",
          "NETWORK_TIER_DEFAULT",
          "NETWORK_TIER_PREMIUM",
          "NETWORK_TIER_STANDARD",
        ]).describe("Network tier configuration.").optional(),
      }).describe("NetworkTierConfig contains network tier information.")
        .optional(),
      nodeIpv4Cidr: z.string().describe(
        "This field is deprecated, use node_ipv4_cidr_block.",
      ).optional(),
      nodeIpv4CidrBlock: z.string().describe(
        "The IP address range of the instance IPs in this cluster. This is applicable only if `create_subnetwork` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.",
      ).optional(),
      podCidrOverprovisionConfig: z.object({
        disable: z.boolean().describe(
          "Whether Pod CIDR overprovisioning is disabled. Note: Pod CIDR overprovisioning is enabled by default.",
        ).optional(),
      }).describe("[PRIVATE FIELD] Config for pod CIDR size overprovisioning.")
        .optional(),
      servicesIpv4Cidr: z.string().describe(
        "This field is deprecated, use services_ipv4_cidr_block.",
      ).optional(),
      servicesIpv4CidrBlock: z.string().describe(
        "The IP address range of the services IPs in this cluster. If blank, a range will be automatically chosen with the default size. This field is only applicable when `use_ip_aliases` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.",
      ).optional(),
      servicesIpv6CidrBlock: z.string().describe(
        "Output only. The services IPv6 CIDR block for the cluster.",
      ).optional(),
      servicesSecondaryRangeName: z.string().describe(
        "The name of the secondary range to be used as for the services CIDR block. The secondary range will be used for service ClusterIPs. This must be an existing secondary range associated with the cluster subnetwork. This field is only applicable with use_ip_aliases is true and create_subnetwork is false.",
      ).optional(),
      stackType: z.enum(["STACK_TYPE_UNSPECIFIED", "IPV4", "IPV4_IPV6"])
        .describe("The IP stack type of the cluster").optional(),
      subnetIpv6CidrBlock: z.string().describe(
        "Output only. The subnet's IPv6 CIDR block used by nodes and pods.",
      ).optional(),
      subnetworkName: z.string().describe(
        "A custom subnetwork name to be used if `create_subnetwork` is true. If this field is empty, then an automatic name will be chosen for the new subnetwork.",
      ).optional(),
      tpuIpv4CidrBlock: z.string().describe(
        "The IP address range of the Cloud TPUs in this cluster. If unspecified, a range will be automatically chosen with the default size. This field is only applicable when `use_ip_aliases` is true. If unspecified, the range will use the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25.",
      ).optional(),
      useIpAliases: z.boolean().describe(
        "Whether alias IPs will be used for pod IPs in the cluster. This is used in conjunction with use_routes. It cannot be true if use_routes is true. If both use_ip_aliases and use_routes are false, then the server picks the default IP allocation mode",
      ).optional(),
      useRoutes: z.boolean().describe(
        "Whether routes will be used for pod IPs in the cluster. This is used in conjunction with use_ip_aliases. It cannot be true if use_ip_aliases is true. If both use_ip_aliases and use_routes are false, then the server picks the default IP allocation mode",
      ).optional(),
    }).describe(
      "Configuration for controlling how IPs are allocated in the cluster.",
    ).optional(),
    labelFingerprint: z.string().describe(
      "The fingerprint of the set of labels for this cluster.",
    ).optional(),
    legacyAbac: z.object({
      enabled: z.boolean().describe(
        "Whether the ABAC authorizer is enabled for this cluster. When enabled, identities in the system, including service accounts, nodes, and controllers, will have statically granted permissions beyond those provided by the RBAC configuration or IAM.",
      ).optional(),
    }).describe(
      "Configuration for the legacy Attribute Based Access Control authorization mode.",
    ).optional(),
    location: z.string().describe(
      "Output only. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) or [region](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) in which the cluster resides.",
    ).optional(),
    locations: z.array(z.string()).describe(
      "The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. This field provides a default value if [NodePool.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations) are not specified during node pool creation. Warning: changing cluster locations will update the [NodePool.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations) of all node pools and will result in nodes being added and/or removed.",
    ).optional(),
    loggingConfig: z.object({
      componentConfig: z.object({
        enableComponents: z.array(
          z.enum([
            "COMPONENT_UNSPECIFIED",
            "SYSTEM_COMPONENTS",
            "WORKLOADS",
            "APISERVER",
            "SCHEDULER",
            "CONTROLLER_MANAGER",
            "KCP_SSHD",
            "KCP_CONNECTION",
            "KCP_HPA",
          ]),
        ).describe(
          "Select components to collect logs. An empty set would disable all logging.",
        ).optional(),
      }).describe(
        "LoggingComponentConfig is cluster logging component configuration.",
      ).optional(),
    }).describe("LoggingConfig is cluster logging configuration.").optional(),
    loggingService: z.string().describe(
      "The logging service the cluster should use to write logs. Currently available options: * `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model * `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). * `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions.",
    ).optional(),
    maintenancePolicy: z.object({
      disruptionBudget: z.object({
        lastDisruptionTime: z.string().describe(
          "Output only. The last time a disruption was performed on the control plane.",
        ).optional(),
        lastMinorVersionDisruptionTime: z.string().describe(
          "Output only. The last time a minor version upgrade was performed on the control plane.",
        ).optional(),
        minorVersionDisruptionInterval: z.string().describe(
          "Optional. The minimum duration between two minor version upgrades of the control plane.",
        ).optional(),
        patchVersionDisruptionInterval: z.string().describe(
          "Optional. The minimum duration between two patch version upgrades of the control plane.",
        ).optional(),
      }).describe(
        "DisruptionBudget defines the upgrade disruption budget for the cluster control plane.",
      ).optional(),
      resourceVersion: z.string().describe(
        "A hash identifying the version of this policy, so that updates to fields of the policy won't accidentally undo intermediate changes (and so that users of the API unaware of some fields won't accidentally remove other fields). Make a `get()` request to the cluster to get the current resource version and include it with requests to set the policy.",
      ).optional(),
      window: z.object({
        dailyMaintenanceWindow: z.object({
          duration: z.string().describe(
            'Output only. Duration of the time window, automatically chosen to be smallest possible in the given scenario. Duration will be in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) format "PTnHnMnS".',
          ).optional(),
          startTime: z.string().describe(
            'Time within the maintenance window to start the maintenance operations. Time format should be in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) format "HH:MM", where HH: [00-23] and MM: [00-59] GMT.',
          ).optional(),
        }).describe("Time window specified for daily maintenance operations.")
          .optional(),
        maintenanceExclusions: z.record(
          z.string(),
          z.object({
            endTime: z.unknown().describe(
              "The time that the window ends. The end time should take place after the start time.",
            ).optional(),
            maintenanceExclusionOptions: z.unknown().describe(
              "Represents the Maintenance exclusion option.",
            ).optional(),
            startTime: z.unknown().describe(
              "The time that the window first starts.",
            ).optional(),
          }),
        ).describe(
          "Exceptions to maintenance window. Non-emergency maintenance should not occur in these windows.",
        ).optional(),
        recurringMaintenanceWindow: z.object({
          delayUntil: z.object({
            day: z.unknown().describe(
              "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
            ).optional(),
            month: z.unknown().describe(
              "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
            ).optional(),
            year: z.unknown().describe(
              "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
            ).optional(),
          }).describe(
            "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
          ).optional(),
          recurrence: z.string().describe(
            "Required. An RRULE (https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how this window recurs. For example, to have something repeat every weekday, you'd use: `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` To repeat some window daily (equivalent to the DailyMaintenanceWindow): `FREQ=DAILY` For the first weekend of every month: `FREQ=MONTHLY;BYSETPOS=1;BYDAY=SA,SU` The FREQ values of HOURLY, MINUTELY, and SECONDLY are not supported.",
          ).optional(),
          windowDuration: z.string().describe(
            "Required. Duration of the window.",
          ).optional(),
          windowStartTime: z.object({
            hours: z.unknown().describe(
              'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
            ).optional(),
            minutes: z.unknown().describe(
              "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
            ).optional(),
            nanos: z.unknown().describe(
              "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
            ).optional(),
            seconds: z.unknown().describe(
              "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
            ).optional(),
          }).describe(
            "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
          ).optional(),
        }).describe(
          "Represents an arbitrary window of time that recurs. Will replace RecurringTimeWindow.",
        ).optional(),
        recurringWindow: z.object({
          recurrence: z.string().describe(
            "An RRULE (https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how this window recurs. They go on for the span of time between the start and end time. For example, to have something repeat every weekday, you'd use: `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` To repeat some window daily (equivalent to the DailyMaintenanceWindow): `FREQ=DAILY` For the first weekend of every month: `FREQ=MONTHLY;BYSETPOS=1;BYDAY=SA,SU` This specifies how frequently the window starts. Eg, if you wanted to have a 9-5 UTC-4 window every weekday, you'd use something like: ` start time = 2019-01-01T09:00:00-0400 end time = 2019-01-01T17:00:00-0400 recurrence = FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR ` Windows can span multiple days. Eg, to make the window encompass every weekend from midnight Saturday till the last minute of Sunday UTC: ` start time = 2019-01-05T00:00:00Z end time = 2019-01-07T23:59:00Z recurrence = FREQ=WEEKLY;BYDAY=SA ` Note the start and end time's specific dates are largely arbitrary except to specify duration of the window and when it first starts. The FREQ values of HOURLY, MINUTELY, and SECONDLY are not supported.",
          ).optional(),
          window: z.object({
            endTime: z.unknown().describe(
              "The time that the window ends. The end time should take place after the start time.",
            ).optional(),
            maintenanceExclusionOptions: z.unknown().describe(
              "Represents the Maintenance exclusion option.",
            ).optional(),
            startTime: z.unknown().describe(
              "The time that the window first starts.",
            ).optional(),
          }).describe("Represents an arbitrary window of time.").optional(),
        }).describe("Represents an arbitrary window of time that recurs.")
          .optional(),
      }).describe(
        "MaintenanceWindow defines the maintenance window to be used for the cluster.",
      ).optional(),
    }).describe(
      "MaintenancePolicy defines the maintenance policy to be used for the cluster.",
    ).optional(),
    managedMachineLearningDiagnosticsConfig: z.object({
      enabled: z.boolean().describe(
        "Enable/Disable Managed Machine Learning Diagnostics.",
      ).optional(),
    }).describe(
      "ManagedMachineLearningDiagnosticsConfig is the configuration for the GKE Managed Machine Learning Diagnostics pipeline.",
    ).optional(),
    managedOpentelemetryConfig: z.object({
      scope: z.enum([
        "SCOPE_UNSPECIFIED",
        "NONE",
        "COLLECTION_AND_INSTRUMENTATION_COMPONENTS",
      ]).describe("Scope of the Managed OpenTelemetry pipeline.").optional(),
    }).describe(
      "ManagedOpenTelemetryConfig is the configuration for the GKE Managed OpenTelemetry pipeline.",
    ).optional(),
    masterAuth: z.object({
      clientCertificate: z.string().describe(
        "Output only. Base64-encoded public certificate used by clients to authenticate to the cluster endpoint. Issued only if client_certificate_config is set.",
      ).optional(),
      clientCertificateConfig: z.object({
        issueClientCertificate: z.boolean().describe(
          "Issue a client certificate.",
        ).optional(),
      }).describe("Configuration for client certificates on the cluster.")
        .optional(),
      clientKey: z.string().describe(
        "Output only. Base64-encoded private key used by clients to authenticate to the cluster endpoint.",
      ).optional(),
      clusterCaCertificate: z.string().describe(
        "Output only. Base64-encoded public certificate that is the root of trust for the cluster.",
      ).optional(),
      password: z.string().describe(
        "The password to use for HTTP basic authentication to the master endpoint. Because the master endpoint is open to the Internet, you should create a strong password. If a password is provided for cluster creation, username must be non-empty. Warning: basic authentication is deprecated, and will be removed in GKE control plane versions 1.19 and newer. For a list of recommended authentication methods, see: https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication",
      ).optional(),
      username: z.string().describe(
        "The username to use for HTTP basic authentication to the master endpoint. For clusters v1.6.0 and later, basic authentication can be disabled by leaving username unspecified (or setting it to the empty string). Warning: basic authentication is deprecated, and will be removed in GKE control plane versions 1.19 and newer. For a list of recommended authentication methods, see: https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication",
      ).optional(),
    }).describe(
      "The authentication information for accessing the master endpoint. Authentication can be done using HTTP basic auth or using client certificates.",
    ).optional(),
    masterAuthorizedNetworksConfig: z.object({
      cidrBlocks: z.array(z.object({
        cidrBlock: z.string().describe(
          "cidr_block must be specified in CIDR notation.",
        ).optional(),
        displayName: z.string().describe(
          "display_name is an optional field for users to identify CIDR blocks.",
        ).optional(),
      })).describe(
        "cidr_blocks define up to 50 external networks that could access Kubernetes master through HTTPS.",
      ).optional(),
      enabled: z.boolean().describe(
        "Whether or not master authorized networks is enabled.",
      ).optional(),
      gcpPublicCidrsAccessEnabled: z.boolean().describe(
        "Whether master is accessible via Google Compute Engine Public IP addresses.",
      ).optional(),
      privateEndpointEnforcementEnabled: z.boolean().describe(
        "Whether master authorized networks is enforced on private endpoint or not.",
      ).optional(),
    }).describe(
      "Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.",
    ).optional(),
    meshCertificates: z.object({
      enableCertificates: z.boolean().describe(
        "enable_certificates controls issuance of workload mTLS certificates. If set, the GKE Workload Identity Certificates controller and node agent will be deployed in the cluster, which can then be configured by creating a WorkloadCertificateConfig Custom Resource. Requires Workload Identity (workload_pool must be non-empty).",
      ).optional(),
    }).describe(
      "Configuration for issuance of mTLS keys and certificates to Kubernetes pods.",
    ).optional(),
    monitoringConfig: z.object({
      advancedDatapathObservabilityConfig: z.object({
        enableMetrics: z.boolean().describe("Expose flow metrics on nodes")
          .optional(),
        enableRelay: z.boolean().describe("Enable Relay component").optional(),
        relayMode: z.enum([
          "RELAY_MODE_UNSPECIFIED",
          "DISABLED",
          "INTERNAL_VPC_LB",
          "EXTERNAL_LB",
        ]).describe("Method used to make Relay available").optional(),
      }).describe(
        "AdvancedDatapathObservabilityConfig specifies configuration of observability features of advanced datapath.",
      ).optional(),
      componentConfig: z.object({
        enableComponents: z.array(
          z.enum([
            "COMPONENT_UNSPECIFIED",
            "SYSTEM_COMPONENTS",
            "APISERVER",
            "SCHEDULER",
            "CONTROLLER_MANAGER",
            "STORAGE",
            "HPA",
            "POD",
            "DAEMONSET",
            "DEPLOYMENT",
            "STATEFULSET",
            "CADVISOR",
            "KUBELET",
            "DCGM",
            "JOBSET",
          ]),
        ).describe(
          "Select components to collect metrics. An empty set would disable all monitoring.",
        ).optional(),
      }).describe(
        "MonitoringComponentConfig is cluster monitoring component configuration.",
      ).optional(),
      managedPrometheusConfig: z.object({
        autoMonitoringConfig: z.object({
          scope: z.enum(["SCOPE_UNSPECIFIED", "ALL", "NONE"]).describe(
            "Scope for GKE Workload Auto-Monitoring.",
          ).optional(),
        }).describe(
          "AutoMonitoringConfig defines the configuration for GKE Workload Auto-Monitoring.",
        ).optional(),
        enabled: z.boolean().describe("Enable Managed Collection.").optional(),
      }).describe(
        "ManagedPrometheusConfig defines the configuration for Google Cloud Managed Service for Prometheus.",
      ).optional(),
    }).describe("MonitoringConfig is cluster monitoring configuration.")
      .optional(),
    monitoringService: z.string().describe(
      "The monitoring service the cluster should use to write metrics. Currently available options: * `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model * `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). * `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions.",
    ).optional(),
    name: z.string().describe(
      "The name of this cluster. The name must be unique within this project and location (e.g. zone or region), and can be up to 40 characters with the following restrictions: * Lowercase letters, numbers, and hyphens only. * Must start with a letter. * Must end with a number or a letter.",
    ).optional(),
    network: z.string().describe(
      "The name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the cluster is connected. If left unspecified, the `default` network will be used.",
    ).optional(),
    networkConfig: z.object({
      datapathProvider: z.enum([
        "DATAPATH_PROVIDER_UNSPECIFIED",
        "LEGACY_DATAPATH",
        "ADVANCED_DATAPATH",
      ]).describe(
        "The desired datapath provider for this cluster. By default, uses the IPTables-based kube-proxy implementation.",
      ).optional(),
      dataplaneV2Config: z.object({
        scalabilityMode: z.enum([
          "SCALABILITY_MODE_UNSPECIFIED",
          "DISABLED",
          "SCALE_OPTIMIZED",
        ]).describe("Optional. Scalability mode for the cluster.").optional(),
      }).describe("DataplaneV2Config is the configuration for DPv2.")
        .optional(),
      defaultEnablePrivateNodes: z.boolean().describe(
        "Controls whether by default nodes have private IP addresses only. It is invalid to specify both PrivateClusterConfig.enablePrivateNodes and this field at the same time. To update the default setting, use ClusterUpdate.desired_default_enable_private_nodes",
      ).optional(),
      defaultSnatStatus: z.object({
        disabled: z.boolean().describe("Disables cluster default sNAT rules.")
          .optional(),
      }).describe(
        "DefaultSnatStatus contains the desired state of whether default sNAT should be disabled on the cluster.",
      ).optional(),
      disableL4LbFirewallReconciliation: z.boolean().describe(
        "Disable L4 load balancer VPC firewalls to enable firewall policies.",
      ).optional(),
      dnsConfig: z.object({
        additiveVpcScopeDnsDomain: z.string().describe(
          "Optional. The domain used in Additive VPC scope.",
        ).optional(),
        clusterDns: z.enum([
          "PROVIDER_UNSPECIFIED",
          "PLATFORM_DEFAULT",
          "CLOUD_DNS",
          "KUBE_DNS",
        ]).describe(
          "cluster_dns indicates which in-cluster DNS provider should be used.",
        ).optional(),
        clusterDnsDomain: z.string().describe(
          "cluster_dns_domain is the suffix used for all cluster service records.",
        ).optional(),
        clusterDnsScope: z.enum([
          "DNS_SCOPE_UNSPECIFIED",
          "CLUSTER_SCOPE",
          "VPC_SCOPE",
        ]).describe(
          "cluster_dns_scope indicates the scope of access to cluster DNS records.",
        ).optional(),
      }).describe(
        "DNSConfig contains the desired set of options for configuring clusterDNS.",
      ).optional(),
      enableCiliumClusterwideNetworkPolicy: z.boolean().describe(
        "Whether CiliumClusterwideNetworkPolicy is enabled on this cluster.",
      ).optional(),
      enableFqdnNetworkPolicy: z.boolean().describe(
        "Whether FQDN Network Policy is enabled on this cluster.",
      ).optional(),
      enableIntraNodeVisibility: z.boolean().describe(
        "Whether Intra-node visibility is enabled for this cluster. This makes same node pod to pod traffic visible for VPC network.",
      ).optional(),
      enableL4ilbSubsetting: z.boolean().describe(
        "Whether L4ILB Subsetting is enabled for this cluster.",
      ).optional(),
      enableMultiNetworking: z.boolean().describe(
        "Whether multi-networking is enabled for this cluster.",
      ).optional(),
      gatewayApiConfig: z.object({
        channel: z.enum([
          "CHANNEL_UNSPECIFIED",
          "CHANNEL_DISABLED",
          "CHANNEL_EXPERIMENTAL",
          "CHANNEL_STANDARD",
        ]).describe("The Gateway API release channel to use for Gateway API.")
          .optional(),
      }).describe(
        "GatewayAPIConfig contains the desired config of Gateway API on this cluster.",
      ).optional(),
      inTransitEncryptionConfig: z.enum([
        "IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED",
        "IN_TRANSIT_ENCRYPTION_DISABLED",
        "IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT",
      ]).describe(
        "Specify the details of in-transit encryption. Now named inter-node transparent encryption.",
      ).optional(),
      network: z.string().describe(
        "Output only. The relative name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the cluster is connected. Example: projects/my-project/global/networks/my-network",
      ).optional(),
      networkPerformanceConfig: z.object({
        totalEgressBandwidthTier: z.enum(["TIER_UNSPECIFIED", "TIER_1"])
          .describe(
            "Specifies the total network bandwidth tier for NodePools in the cluster.",
          ).optional(),
      }).describe("Configuration of network bandwidth tiers").optional(),
      privateIpv6GoogleAccess: z.enum([
        "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED",
        "PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED",
        "PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE",
        "PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL",
      ]).describe(
        "The desired state of IPv6 connectivity to Google Services. By default, no private IPv6 access to or from Google Services (all access will be via IPv4)",
      ).optional(),
      serviceExternalIpsConfig: z.object({
        enabled: z.boolean().describe(
          "Whether Services with ExternalIPs field are allowed or not.",
        ).optional(),
      }).describe("Config to block services with externalIPs field.")
        .optional(),
      subnetwork: z.string().describe(
        "Output only. The relative name of the Google Compute Engine [subnetwork](https://cloud.google.com/compute/docs/vpc) to which the cluster is connected. Example: projects/my-project/regions/us-central1/subnetworks/my-subnet",
      ).optional(),
    }).describe(
      "NetworkConfig reports the relative names of network & subnetwork.",
    ).optional(),
    networkPolicy: z.object({
      enabled: z.boolean().describe(
        "Whether network policy is enabled on the cluster.",
      ).optional(),
      provider: z.enum(["PROVIDER_UNSPECIFIED", "CALICO"]).describe(
        "The selected network policy provider.",
      ).optional(),
    }).describe(
      "Configuration options for the NetworkPolicy feature. https://kubernetes.io/docs/concepts/services-networking/networkpolicies/",
    ).optional(),
    nodeConfig: z.object({
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
          "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.neigh.default.gc_thresh1 net.ipv4.neigh.default.gc_thresh2 net.ipv4.neigh.default.gc_thresh3 net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.keys.maxkeys kernel.keys.maxbytes kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
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
      nodeImageConfig: z.object({
        image: z.string().describe(
          "The name of the image to use for this node.",
        ).optional(),
        imageProject: z.string().describe(
          "The project containing the image to use for this node.",
        ).optional(),
      }).describe("CustomImageConfig contains the information r").optional(),
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
    nodeCreationConfig: z.object({
      nodeCreationMode: z.enum([
        "MODE_UNSPECIFIED",
        "VIA_KUBELET",
        "VIA_CONTROL_PLANE",
      ]).describe("The mode of node creation.").optional(),
    }).describe(
      "NodeCreationConfig defines the settings of node creation mode.",
    ).optional(),
    nodeIpv4CidrSize: z.number().int().describe(
      "Output only. The size of the address space on each node for hosting containers. This is provisioned from within the `container_ipv4_cidr` range. This field will only be set when cluster is in route-based network mode.",
    ).optional(),
    nodePoolAutoConfig: z.object({
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
          "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.neigh.default.gc_thresh1 net.ipv4.neigh.default.gc_thresh2 net.ipv4.neigh.default.gc_thresh3 net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.keys.maxkeys kernel.keys.maxbytes kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
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
      networkTags: z.object({
        tags: z.array(z.string()).describe("List of network tags.").optional(),
      }).describe(
        "Collection of Compute Engine network tags that can be applied to a node's underlying VM instance.",
      ).optional(),
      nodeKubeletConfig: z.object({
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
      resourceManagerTags: z.object({
        tags: z.record(z.string(), z.string()).describe(
          "TagKeyValue must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}`",
        ).optional(),
      }).describe(
        "A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.",
      ).optional(),
    }).describe(
      "Node pool configs that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters.",
    ).optional(),
    nodePoolDefaults: z.object({
      nodeConfigDefaults: z.object({
        containerdConfig: z.object({
          privateRegistryAccessConfig: z.object({
            certificateAuthorityDomainConfig: z.unknown().describe(
              "Private registry access configuration.",
            ).optional(),
            enabled: z.unknown().describe("Private registry access is enabled.")
              .optional(),
          }).describe(
            "PrivateRegistryAccessConfig contains access configuration for private container registries.",
          ).optional(),
          registryHosts: z.array(z.unknown()).describe(
            "RegistryHostConfig configures containerd registry host configuration. Each registry_hosts represents a hosts.toml file. At most 25 registry_hosts are allowed.",
          ).optional(),
          writableCgroups: z.object({
            enabled: z.unknown().describe(
              "Optional. Whether writable cgroups is enabled.",
            ).optional(),
          }).describe("Defines writable cgroups configuration.").optional(),
        }).describe(
          "ContainerdConfig contains configuration to customize containerd.",
        ).optional(),
        gcfsConfig: z.object({
          enabled: z.boolean().describe("Whether to use GCFS.").optional(),
        }).describe(
          "GcfsConfig contains configurations of Google Container File System (image streaming).",
        ).optional(),
        loggingConfig: z.object({
          variantConfig: z.object({
            variant: z.unknown().describe("Logging variant deployed on nodes.")
              .optional(),
          }).describe(
            "LoggingVariantConfig specifies the behaviour of the logging component.",
          ).optional(),
        }).describe(
          "NodePoolLoggingConfig specifies logging configuration for node pools.",
        ).optional(),
        nodeKubeletConfig: z.object({
          allowedUnsafeSysctls: z.array(z.unknown()).describe(
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
            maxContainerRestartPeriod: z.unknown().describe(
              'Optional. The maximum duration the backoff delay can accrue to for container restarts, minimum 1 second, maximum 300 seconds. If not set, defaults to the internal crashloopbackoff maximum. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". See https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#configurable-container-restart-delay for more details.',
            ).optional(),
          }).describe(
            "Contains config to modify node-level parameters for container restart behavior.",
          ).optional(),
          evictionMaxPodGracePeriodSeconds: z.number().int().describe(
            "Optional. eviction_max_pod_grace_period_seconds is the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met. This value effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions. Default: 0. Range: [0, 300].",
          ).optional(),
          evictionMinimumReclaim: z.object({
            imagefsAvailable: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to imagefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            imagefsInodesFree: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to imagefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            memoryAvailable: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to memory available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsAvailable: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to nodefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsInodesFree: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to nodefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            pidAvailable: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to pid available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
          }).describe(
            "Eviction minimum reclaims are the resource amounts of minimum reclaims for each eviction signal.",
          ).optional(),
          evictionSoft: z.object({
            imagefsAvailable: z.unknown().describe(
              'Optional. Amount of storage available on filesystem that container runtime uses for storing images layers. If the container filesystem and image filesystem are not separate, then imagefs can store both image layers and writeable layers. Defines the amount of "imagefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 15% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            imagefsInodesFree: z.unknown().describe(
              'Optional. Amount of inodes available on filesystem that container runtime uses for storing images layers. Defines the amount of "imagefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            memoryAvailable: z.unknown().describe(
              'Optional. Memory available (i.e. capacity - workingSet), in bytes. Defines the amount of "memory.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Format: positive number + unit, e.g. 100Ki, 10Mi, 5Gi. Valid units are Ki, Mi, Gi. Must be >= 100Mi and <= 50% of the node\'s memory. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsAvailable: z.unknown().describe(
              'Optional. Amount of storage available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsInodesFree: z.unknown().describe(
              'Optional. Amount of inodes available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            pidAvailable: z.unknown().describe(
              'Optional. Amount of PID available for pod allocation. Defines the amount of "pid.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
          }).describe(
            "Eviction signals are the current state of a particular resource at a specific point in time. The kubelet uses eviction signals to make eviction decisions by comparing the signals to eviction thresholds, which are the minimum amount of the resource that should be available on the node.",
          ).optional(),
          evictionSoftGracePeriod: z.object({
            imagefsAvailable: z.unknown().describe(
              'Optional. Grace period for eviction due to imagefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            imagefsInodesFree: z.unknown().describe(
              'Optional. Grace period for eviction due to imagefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            memoryAvailable: z.unknown().describe(
              'Optional. Grace period for eviction due to memory available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsAvailable: z.unknown().describe(
              'Optional. Grace period for eviction due to nodefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsInodesFree: z.unknown().describe(
              'Optional. Grace period for eviction due to nodefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            pidAvailable: z.unknown().describe(
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
            policy: z.unknown().describe(
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
            policy: z.unknown().describe(
              "Configures the strategy for resource alignment. Allowed values are: * none: the default policy, and does not perform any topology alignment. * restricted: the topology manager stores the preferred NUMA node affinity for the container, and will reject the pod if the affinity if not preferred. * best-effort: the topology manager stores the preferred NUMA node affinity for the container. If the affinity is not preferred, the topology manager will admit the pod to the node anyway. * single-numa-node: the topology manager determines if the single NUMA node affinity is possible. If it is, Topology Manager will store this and the Hint Providers can then use this information when making the resource allocation decision. If, however, this is not possible then the Topology Manager will reject the pod from the node. This will result in a pod in a Terminated state with a pod admission failure. The default policy value is 'none' if unspecified. Details about each strategy can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-policies).",
            ).optional(),
            scope: z.unknown().describe(
              "The Topology Manager aligns resources in following scopes: * container * pod The default scope is 'container' if unspecified. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-scopes",
            ).optional(),
          }).describe(
            "TopologyManager defines the configuration options for Topology Manager feature. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/",
          ).optional(),
        }).describe("Node kubelet configs.").optional(),
      }).describe("Subset of NodeConfig message that has defaults.").optional(),
    }).describe("Subset of Nodepool message that has defaults.").optional(),
    nodePools: z.array(z.object({
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
        locationPolicy: z.enum([
          "LOCATION_POLICY_UNSPECIFIED",
          "BALANCED",
          "ANY",
        ]).describe("Location policy used when scaling up a node pool.")
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
        canonicalCode: z.unknown().describe("Canonical code of the condition.")
          .optional(),
        code: z.unknown().describe(
          "Machine-friendly representation of the condition Deprecated. Use canonical_code instead.",
        ).optional(),
        message: z.unknown().describe(
          "Human-friendly representation of the condition",
        ).optional(),
      })).describe("Which conditions caused the current node pool state.")
        .optional(),
      config: z.object({
        accelerators: z.array(z.unknown()).describe(
          "A list of hardware accelerators to be attached to each node. See https://cloud.google.com/compute/docs/gpus for more information about support for GPUs.",
        ).optional(),
        advancedMachineFeatures: z.object({
          enableNestedVirtualization: z.unknown().describe(
            "Whether or not to enable nested virtualization (defaults to false).",
          ).optional(),
          performanceMonitoringUnit: z.unknown().describe(
            "Type of Performance Monitoring Unit (PMU) requested on node pool instances. If unset, PMU will not be available to the node.",
          ).optional(),
          threadsPerCore: z.unknown().describe(
            "The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed.",
          ).optional(),
        }).describe(
          "Specifies options for controlling advanced machine features.",
        ).optional(),
        bootDisk: z.object({
          diskType: z.unknown().describe(
            "Disk type of the boot disk. (i.e. Hyperdisk-Balanced, PD-Balanced, etc.)",
          ).optional(),
          provisionedIops: z.unknown().describe(
            "For Hyperdisk-Balanced only, the provisioned IOPS config value.",
          ).optional(),
          provisionedThroughput: z.unknown().describe(
            "For Hyperdisk-Balanced only, the provisioned throughput config value.",
          ).optional(),
          sizeGb: z.unknown().describe(
            "Disk size in GB. Replaces NodeConfig.disk_size_gb",
          ).optional(),
        }).describe(
          "BootDisk specifies the boot disk configuration for node pools.",
        ).optional(),
        bootDiskKmsKey: z.string().describe(
          "The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption",
        ).optional(),
        confidentialNodes: z.object({
          confidentialInstanceType: z.unknown().describe(
            "Defines the type of technology used by the confidential node.",
          ).optional(),
          enabled: z.unknown().describe(
            "Whether Confidential Nodes feature is enabled.",
          ).optional(),
        }).describe(
          "ConfidentialNodes is configuration for the confidential nodes feature, which makes nodes run on confidential VMs.",
        ).optional(),
        consolidationDelay: z.string().describe(
          "Consolidation delay defines duration after which the Cluster Autoscaler can scale down underutilized nodes. If not set, nodes are scaled down by default behavior, i.e. according to the chosen autoscaling profile.",
        ).optional(),
        containerdConfig: z.object({
          privateRegistryAccessConfig: z.unknown().describe(
            "PrivateRegistryAccessConfig contains access configuration for private container registries.",
          ).optional(),
          registryHosts: z.unknown().describe(
            "RegistryHostConfig configures containerd registry host configuration. Each registry_hosts represents a hosts.toml file. At most 25 registry_hosts are allowed.",
          ).optional(),
          writableCgroups: z.unknown().describe(
            "Defines writable cgroups configuration.",
          ).optional(),
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
          dataCacheCount: z.unknown().describe(
            "Number of local SSDs to use for GKE Data Cache.",
          ).optional(),
          localSsdCount: z.unknown().describe(
            "Number of local SSDs to use to back ephemeral storage. Uses NVMe interfaces. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info.",
          ).optional(),
        }).describe(
          "EphemeralStorageLocalSsdConfig contains configuration for the node ephemeral storage using Local SSDs.",
        ).optional(),
        fastSocket: z.object({
          enabled: z.unknown().describe(
            "Whether Fast Socket features are enabled in the node pool.",
          ).optional(),
        }).describe("Configuration of Fast Socket feature.").optional(),
        flexStart: z.boolean().describe(
          "Flex Start flag for enabling Flex Start VM.",
        ).optional(),
        gcfsConfig: z.object({
          enabled: z.unknown().describe("Whether to use GCFS.").optional(),
        }).describe(
          "GcfsConfig contains configurations of Google Container File System (image streaming).",
        ).optional(),
        gpuDirectConfig: z.object({
          gpuDirectStrategy: z.unknown().describe(
            "The type of GPU direct strategy to enable on the node pool.",
          ).optional(),
        }).describe(
          "GPUDirectConfig specifies the GPU direct strategy on the node pool.",
        ).optional(),
        gvnic: z.object({
          enabled: z.unknown().describe(
            "Whether gVNIC features are enabled in the node pool.",
          ).optional(),
        }).describe("Configuration of gVNIC feature.").optional(),
        imageType: z.string().describe(
          "The image type to use for this node. Note that for a given image type, the latest version of it will be used. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types.",
        ).optional(),
        kubeletConfig: z.object({
          allowedUnsafeSysctls: z.unknown().describe(
            "Optional. Defines a comma-separated allowlist of unsafe sysctls or sysctl patterns (ending in `*`). The unsafe namespaced sysctl groups are `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`, and `net.*`. Leaving this allowlist empty means they cannot be set on Pods. To allow certain sysctls or sysctl patterns to be set on Pods, list them separated by commas. For example: `kernel.msg*,net.ipv4.route.min_pmtu`. See https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/ for more details.",
          ).optional(),
          containerLogMaxFiles: z.unknown().describe(
            "Optional. Defines the maximum number of container log files that can be present for a container. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation The value must be an integer between 2 and 10, inclusive. The default value is 5 if unspecified.",
          ).optional(),
          containerLogMaxSize: z.unknown().describe(
            "Optional. Defines the maximum size of the container log file before it is rotated. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation Valid format is positive number + unit, e.g. 100Ki, 10Mi. Valid units are Ki, Mi, Gi. The value must be between 10Mi and 500Mi, inclusive. Note that the total container log size (container_log_max_size * container_log_max_files) cannot exceed 1% of the total storage of the node, to avoid disk pressure caused by log files. The default value is 10Mi if unspecified.",
          ).optional(),
          cpuCfsQuota: z.unknown().describe(
            "Enable CPU CFS quota enforcement for containers that specify CPU limits. This option is enabled by default which makes kubelet use CFS quota (https://www.kernel.org/doc/Documentation/scheduler/sched-bwc.txt) to enforce container CPU limits. Otherwise, CPU limits will not be enforced at all. Disable this option to mitigate CPU throttling problems while still having your pods to be in Guaranteed QoS class by specifying the CPU limits. The default value is 'true' if unspecified.",
          ).optional(),
          cpuCfsQuotaPeriod: z.unknown().describe(
            'Set the CPU CFS quota period value \'cpu.cfs_period_us\'. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration between 1ms and 1 second, inclusive.',
          ).optional(),
          cpuManagerPolicy: z.unknown().describe(
            'Control the CPU management policy on the node. See https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/ The following values are allowed. * "none": the default, which represents the existing scheduling behavior. * "static": allows pods with certain resource characteristics to be granted increased CPU affinity and exclusivity on the node. The default value is \'none\' if unspecified.',
          ).optional(),
          crashLoopBackOff: z.unknown().describe(
            "Contains config to modify node-level parameters for container restart behavior.",
          ).optional(),
          evictionMaxPodGracePeriodSeconds: z.unknown().describe(
            "Optional. eviction_max_pod_grace_period_seconds is the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met. This value effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions. Default: 0. Range: [0, 300].",
          ).optional(),
          evictionMinimumReclaim: z.unknown().describe(
            "Eviction minimum reclaims are the resource amounts of minimum reclaims for each eviction signal.",
          ).optional(),
          evictionSoft: z.unknown().describe(
            "Eviction signals are the current state of a particular resource at a specific point in time. The kubelet uses eviction signals to make eviction decisions by comparing the signals to eviction thresholds, which are the minimum amount of the resource that should be available on the node.",
          ).optional(),
          evictionSoftGracePeriod: z.unknown().describe(
            "Eviction grace periods are grace periods for each eviction signal.",
          ).optional(),
          imageGcHighThresholdPercent: z.unknown().describe(
            "Optional. Defines the percent of disk usage after which image garbage collection is always run. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and greater than image_gc_low_threshold_percent. The default value is 85 if unspecified.",
          ).optional(),
          imageGcLowThresholdPercent: z.unknown().describe(
            "Optional. Defines the percent of disk usage before which image garbage collection is never run. Lowest disk usage to garbage collect to. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and smaller than image_gc_high_threshold_percent. The default value is 80 if unspecified.",
          ).optional(),
          imageMaximumGcAge: z.unknown().describe(
            'Optional. Defines the maximum age an image can be unused before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration greater than image_minimum_gc_age or "0s". The default value is "0s" if unspecified, which disables this field, meaning images won\'t be garbage collected based on being unused for too long.',
          ).optional(),
          imageMinimumGcAge: z.unknown().describe(
            'Optional. Defines the minimum age for an unused image before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration less than or equal to 2 minutes. The default value is "2m0s" if unspecified.',
          ).optional(),
          insecureKubeletReadonlyPortEnabled: z.unknown().describe(
            "Enable or disable Kubelet read only port.",
          ).optional(),
          maxParallelImagePulls: z.unknown().describe(
            "Optional. Defines the maximum number of image pulls in parallel. The range is 2 to 5, inclusive. The default value is 2 or 3 depending on the disk type. See https://kubernetes.io/docs/concepts/containers/images/#maximum-parallel-image-pulls for more details.",
          ).optional(),
          memoryManager: z.unknown().describe(
            "The option enables the Kubernetes NUMA-aware Memory Manager feature. Detailed description about the feature can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/).",
          ).optional(),
          podPidsLimit: z.unknown().describe(
            "Set the Pod PID limits. See https://kubernetes.io/docs/concepts/policy/pid-limiting/#pod-pid-limits Controls the maximum number of processes allowed to run in a pod. The value must be greater than or equal to 1024 and less than 4194304.",
          ).optional(),
          shutdownGracePeriodCriticalPodsSeconds: z.unknown().describe(
            "Optional. shutdown_grace_period_critical_pods_seconds is the maximum allowed grace period (in seconds) used to terminate critical pods during a node shutdown. This value should be <= shutdown_grace_period_seconds, and is only valid if shutdown_grace_period_seconds is set. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ Range: [0, 120].",
          ).optional(),
          shutdownGracePeriodSeconds: z.unknown().describe(
            "Optional. shutdown_grace_period_seconds is the maximum allowed grace period (in seconds) the total duration that the node should delay the shutdown during a graceful shutdown. This is the total grace period for pod termination for both regular and critical pods. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ If set to 0, node will not enable the graceful node shutdown functionality. This field is only valid for Spot VMs. Allowed values: 0, 30, 120.",
          ).optional(),
          singleProcessOomKill: z.unknown().describe(
            "Optional. Defines whether to enable single process OOM killer. If true, will prevent the memory.oom.group flag from being set for container cgroups in cgroups v2. This causes processes in the container to be OOM killed individually instead of as a group.",
          ).optional(),
          topologyManager: z.unknown().describe(
            "TopologyManager defines the configuration options for Topology Manager feature. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/",
          ).optional(),
        }).describe("Node kubelet configs.").optional(),
        labels: z.record(z.string(), z.unknown()).describe(
          "The Kubernetes labels (key/value pairs) to apply to each node. The values in this field are added to the set of default labels Kubernetes applies to nodes. This field has the following restrictions: * Labels must use a valid Kubernetes syntax and character set, as defined in https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set. * This field supports up to 1,024 total characters in a single request. Depending on the Kubernetes version, keys in this field might conflict with the keys of the default labels, which might change which of your labels are applied to the nodes. Assume that the behavior is unpredictable and avoid label key conflicts. For more information about the default labels, see: https://kubernetes.io/docs/reference/labels-annotations-taints/",
        ).optional(),
        linuxNodeConfig: z.object({
          accurateTimeConfig: z.unknown().describe(
            "AccurateTimeConfig contains configuration for the accurate time synchronization feature.",
          ).optional(),
          cgroupMode: z.unknown().describe(
            "cgroup_mode specifies the cgroup mode to be used on the node.",
          ).optional(),
          customNodeInit: z.unknown().describe(
            "Support for running custom init code while bootstrapping nodes.",
          ).optional(),
          hugepages: z.unknown().describe(
            "Hugepages amount in both 2m and 1g size",
          ).optional(),
          nodeKernelModuleLoading: z.unknown().describe(
            "Configuration for kernel module loading on nodes.",
          ).optional(),
          swapConfig: z.unknown().describe(
            "Configuration for swap memory on a node pool.",
          ).optional(),
          sysctls: z.unknown().describe(
            "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.neigh.default.gc_thresh1 net.ipv4.neigh.default.gc_thresh2 net.ipv4.neigh.default.gc_thresh3 net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.keys.maxkeys kernel.keys.maxbytes kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
          ).optional(),
          transparentHugepageDefrag: z.unknown().describe(
            "Optional. Defines the transparent hugepage defrag configuration on the node. VM hugepage allocation can be managed by either limiting defragmentation for delayed allocation or skipping it entirely for immediate allocation only. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
          ).optional(),
          transparentHugepageEnabled: z.unknown().describe(
            "Optional. Transparent hugepage support for anonymous memory can be entirely disabled (mostly for debugging purposes) or only enabled inside MADV_HUGEPAGE regions (to avoid the risk of consuming more memory resources) or enabled system wide. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
          ).optional(),
        }).describe("Parameters that can be configured on Linux nodes.")
          .optional(),
        localNvmeSsdBlockConfig: z.object({
          localSsdCount: z.unknown().describe(
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
          variantConfig: z.unknown().describe(
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
        metadata: z.record(z.string(), z.unknown()).describe(
          'The metadata key/value pairs assigned to instances in the cluster. Keys must conform to the regexp `[a-zA-Z0-9-_]+` and be less than 128 bytes in length. These are reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project or be one of the reserved keys: - "cluster-location" - "cluster-name" - "cluster-uid" - "configure-sh" - "containerd-configure-sh" - "enable-os-login" - "gci-ensure-gke-docker" - "gci-metrics-enabled" - "gci-update-strategy" - "instance-template" - "kube-env" - "startup-script" - "user-data" - "disable-address-manager" - "windows-startup-script-ps1" - "common-psm1" - "k8s-node-setup-psm1" - "install-ssh-psm1" - "user-profile-psm1" Values are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on them is that each value\'s size must be less than or equal to 32 KB. The total size of all keys and values must be less than 512 KB.',
        ).optional(),
        minCpuPlatform: z.string().describe(
          'Minimum CPU platform to be used by this instance. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: "Intel Haswell"` or `minCpuPlatform: "Intel Sandy Bridge"`. For more information, read [how to specify min CPU platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform)',
        ).optional(),
        nodeGroup: z.string().describe(
          "Setting this field will assign instances of this pool to run on the specified node group. This is useful for running workloads on [sole tenant nodes](https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes).",
        ).optional(),
        nodeImageConfig: z.object({
          image: z.unknown().describe(
            "The name of the image to use for this node.",
          ).optional(),
          imageProject: z.unknown().describe(
            "The project containing the image to use for this node.",
          ).optional(),
        }).describe("CustomImageConfig contains the information r").optional(),
        oauthScopes: z.array(z.unknown()).describe(
          'The set of Google API scopes to be made available on all of the node VMs under the "default" service account. The following scopes are recommended, but not required, and by default are not included: * `https://www.googleapis.com/auth/compute` is required for mounting persistent storage on your nodes. * `https://www.googleapis.com/auth/devstorage.read_only` is required for communicating with **gcr.io** (the [Artifact Registry](https://cloud.google.com/artifact-registry/)). If unspecified, no scopes are added, unless Cloud Logging or Cloud Monitoring are enabled, in which case their required scopes will be added.',
        ).optional(),
        preemptible: z.boolean().describe(
          "Whether the nodes are created as preemptible VM instances. See: https://cloud.google.com/compute/docs/instances/preemptible for more information about preemptible VM instances.",
        ).optional(),
        reservationAffinity: z.object({
          consumeReservationType: z.unknown().describe(
            "Corresponds to the type of reservation consumption.",
          ).optional(),
          key: z.unknown().describe(
            'Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, specify "compute.googleapis.com/reservation-name" as the key and specify the name of your reservation as its value.',
          ).optional(),
          values: z.unknown().describe(
            "Corresponds to the label value(s) of reservation resource(s).",
          ).optional(),
        }).describe(
          "[ReservationAffinity](https://cloud.google.com/compute/docs/instances/reserving-zonal-resources) is the configuration of desired reservation which instances could take capacity from.",
        ).optional(),
        resourceLabels: z.record(z.string(), z.unknown()).describe(
          "The resource labels for the node pool to use to annotate any related Google Compute Engine resources.",
        ).optional(),
        resourceManagerTags: z.object({
          tags: z.unknown().describe(
            "TagKeyValue must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}`",
          ).optional(),
        }).describe(
          "A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.",
        ).optional(),
        sandboxConfig: z.object({
          type: z.unknown().describe("Type of the sandbox to use for the node.")
            .optional(),
        }).describe(
          "SandboxConfig contains configurations of the sandbox to use for the node.",
        ).optional(),
        secondaryBootDiskUpdateStrategy: z.object({}).describe(
          "SecondaryBootDiskUpdateStrategy is a placeholder which will be extended in the future to define different options for updating secondary boot disks.",
        ).optional(),
        secondaryBootDisks: z.array(z.unknown()).describe(
          "List of secondary boot disks attached to the nodes.",
        ).optional(),
        serviceAccount: z.string().describe(
          'The Google Cloud Platform Service Account to be used by the node VMs. Specify the email address of the Service Account; otherwise, if no Service Account is specified, the "default" service account is used.',
        ).optional(),
        shieldedInstanceConfig: z.object({
          enableIntegrityMonitoring: z.unknown().describe(
            "Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created.",
          ).optional(),
          enableSecureBoot: z.unknown().describe(
            "Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails.",
          ).optional(),
        }).describe("A set of Shielded Instance options.").optional(),
        soleTenantConfig: z.object({
          minNodeCpus: z.unknown().describe(
            "Optional. The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. This field can only be set if the node pool is created in a shared sole-tenant node group.",
          ).optional(),
          nodeAffinities: z.unknown().describe(
            "NodeAffinities used to match to a shared sole tenant node group.",
          ).optional(),
        }).describe(
          "SoleTenantConfig contains the NodeAffinities to specify what shared sole tenant node groups should back the node pool.",
        ).optional(),
        spot: z.boolean().describe(
          "Spot flag for enabling Spot VM, which is a rebrand of the existing preemptible flag.",
        ).optional(),
        storagePools: z.array(z.unknown()).describe(
          "List of Storage Pools where boot disks are provisioned.",
        ).optional(),
        tags: z.array(z.unknown()).describe(
          "The list of instance tags applied to all nodes. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during cluster or node pool creation. Each tag within the list must comply with RFC1035.",
        ).optional(),
        taintConfig: z.object({
          architectureTaintBehavior: z.unknown().describe(
            "Optional. Controls architecture tainting behavior.",
          ).optional(),
        }).describe(
          "TaintConfig contains the configuration for the taints of the node pool.",
        ).optional(),
        taints: z.array(z.unknown()).describe(
          "List of kubernetes taints to be applied to each node. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/",
        ).optional(),
        windowsNodeConfig: z.object({
          osVersion: z.unknown().describe(
            "OSVersion specifies the Windows node config to be used on the node.",
          ).optional(),
        }).describe(
          "Parameters that can be configured on Windows nodes. Windows Node Config that define the parameters that will be used to configure the Windows node pool settings.",
        ).optional(),
        workloadMetadataConfig: z.object({
          mode: z.unknown().describe(
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
      maintenancePolicy: z.object({
        exclusionUntilEndOfSupport: z.object({
          enabled: z.unknown().describe(
            "Optional. Indicates whether the exclusion is enabled.",
          ).optional(),
          endTime: z.unknown().describe(
            "Output only. The end time of the maintenance exclusion. It is output only. It is the cluster control plane version's end of support time, or end of extended support time when the cluster is on extended support channel.",
          ).optional(),
          startTime: z.unknown().describe(
            "Output only. The start time of the maintenance exclusion. It is output only. It is the exclusion creation time.",
          ).optional(),
        }).describe("Defines the maintenance exclusion for the node pool.")
          .optional(),
      }).describe("Defines the maintenance policy for the node pool.")
        .optional(),
      management: z.object({
        autoRepair: z.boolean().describe(
          "A flag that specifies whether the node auto-repair is enabled for the node pool. If enabled, the nodes in this node pool will be monitored and, if they fail health checks too many times, an automatic repair action will be triggered.",
        ).optional(),
        autoUpgrade: z.boolean().describe(
          "A flag that specifies whether node auto-upgrade is enabled for the node pool. If enabled, node auto-upgrade helps keep the nodes in your node pool up to date with the latest release version of Kubernetes.",
        ).optional(),
        upgradeOptions: z.object({
          autoUpgradeStartTime: z.unknown().describe(
            "Output only. This field is set when upgrades are about to commence with the approximate start time for the upgrades, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
          ).optional(),
          description: z.unknown().describe(
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
        additionalNodeNetworkConfigs: z.array(z.unknown()).describe(
          "We specify the additional node networks for this node pool using this list. Each node network corresponds to an additional interface",
        ).optional(),
        additionalPodNetworkConfigs: z.array(z.unknown()).describe(
          "We specify the additional pod networks for this node pool using this list. Each pod network corresponds to an additional alias IP range for the node",
        ).optional(),
        createPodRange: z.boolean().describe(
          "Input only. Whether to create a new range for pod IPs in this node pool. Defaults are provided for `pod_range` and `pod_ipv4_cidr_block` if they are not specified. If neither `create_pod_range` or `pod_range` are specified, the cluster-level default (`ip_allocation_policy.cluster_ipv4_cidr_block`) is used. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
        ).optional(),
        enablePrivateNodes: z.boolean().describe(
          "Whether nodes have internal IP addresses only. If enable_private_nodes is not specified, then the value is derived from Cluster.NetworkConfig.default_enable_private_nodes",
        ).optional(),
        network: z.string().describe(
          "Optional. Immutable. The VPC network for the node pool.",
        ).optional(),
        networkPerformanceConfig: z.object({
          totalEgressBandwidthTier: z.unknown().describe(
            "Specifies the total network bandwidth tier for the NodePool.",
          ).optional(),
        }).describe("Configuration of all network bandwidth tiers").optional(),
        networkTierConfig: z.object({
          networkTier: z.unknown().describe("Network tier configuration.")
            .optional(),
        }).describe("NetworkTierConfig contains network tier information.")
          .optional(),
        podCidrOverprovisionConfig: z.object({
          disable: z.unknown().describe(
            "Whether Pod CIDR overprovisioning is disabled. Note: Pod CIDR overprovisioning is enabled by default.",
          ).optional(),
        }).describe(
          "[PRIVATE FIELD] Config for pod CIDR size overprovisioning.",
        ).optional(),
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
        graceTerminationDuration: z.string().describe(
          "The duration of the grace termination period for node drain.",
        ).optional(),
        pdbTimeoutDuration: z.string().describe(
          "The duration of the PDB timeout period for node drain.",
        ).optional(),
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
          blueInstanceGroupUrls: z.unknown().describe(
            "The resource URLs of the [managed instance groups] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with blue pool.",
          ).optional(),
          bluePoolDeletionStartTime: z.unknown().describe(
            "Time to start deleting blue pool to complete blue-green upgrade, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
          ).optional(),
          greenInstanceGroupUrls: z.unknown().describe(
            "The resource URLs of the [managed instance groups] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with green pool.",
          ).optional(),
          greenPoolVersion: z.unknown().describe("Version of green pool.")
            .optional(),
          phase: z.unknown().describe("Current blue-green upgrade phase.")
            .optional(),
        }).describe("Information relevant to blue-green upgrade.").optional(),
      }).describe(
        "UpdateInfo contains resource (instance groups, etc), status and other intermediate information relevant to a node pool upgrade.",
      ).optional(),
      upgradeSettings: z.object({
        blueGreenSettings: z.object({
          autoscaledRolloutPolicy: z.unknown().describe(
            "Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.",
          ).optional(),
          nodePoolSoakDuration: z.unknown().describe(
            "Time needed after draining entire blue pool. After this period, blue pool will be cleaned up.",
          ).optional(),
          standardRolloutPolicy: z.unknown().describe(
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
    })).describe(
      'The node pools associated with this cluster. This field should not be set if "node_config" or "initial_node_count" are specified.',
    ).optional(),
    notificationConfig: z.object({
      pubsub: z.object({
        enabled: z.boolean().describe("Enable notifications for Pub/Sub.")
          .optional(),
        filter: z.object({
          eventType: z.array(z.unknown()).describe("Event types to allowlist.")
            .optional(),
        }).describe(
          "Allows filtering to one or more specific event types. If event types are present, those and only those event types will be transmitted to the cluster. Other types will be skipped. If no filter is specified, or no event types are present, all event types will be sent",
        ).optional(),
        topic: z.string().describe(
          "The desired Pub/Sub topic to which notifications will be sent by GKE. Format is `projects/{project}/topics/{topic}`.",
        ).optional(),
      }).describe("Pub/Sub specific notification config.").optional(),
    }).describe("NotificationConfig is the configuration of notifications.")
      .optional(),
    parentProductConfig: z.object({
      labels: z.record(z.string(), z.string()).describe(
        "Labels contain the configuration of the parent product.",
      ).optional(),
      productName: z.string().describe(
        "Name of the parent product associated with the cluster.",
      ).optional(),
    }).describe(
      "ParentProductConfig is the configuration of the parent product of the cluster. This field is used by Google internal products that are built on top of a GKE cluster and take the ownership of the cluster.",
    ).optional(),
    podAutoscaling: z.object({
      hpaProfile: z.enum(["HPA_PROFILE_UNSPECIFIED", "NONE", "PERFORMANCE"])
        .describe("Selected Horizontal Pod Autoscaling profile.").optional(),
    }).describe(
      "PodAutoscaling is used for configuration of parameters for workload autoscaling.",
    ).optional(),
    privateClusterConfig: z.object({
      enablePrivateEndpoint: z.boolean().describe(
        "Whether the master's internal IP address is used as the cluster endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true.",
      ).optional(),
      enablePrivateNodes: z.boolean().describe(
        "Whether nodes have internal IP addresses only. If enabled, all nodes are given only RFC 1918 private addresses and communicate with the master via private networking. Deprecated: Use NetworkConfig.default_enable_private_nodes instead.",
      ).optional(),
      masterGlobalAccessConfig: z.object({
        enabled: z.boolean().describe(
          "Whenever master is accessible globally or not.",
        ).optional(),
      }).describe(
        "Configuration for controlling master global access settings.",
      ).optional(),
      masterIpv4CidrBlock: z.string().describe(
        "The IP range in CIDR notation to use for the hosted master network. This range will be used for assigning internal IP addresses to the master or set of masters, as well as the ILB VIP. This range must not overlap with any other ranges in use within the cluster's network.",
      ).optional(),
      peeringName: z.string().describe(
        "Output only. The peering name in the customer VPC used by this cluster.",
      ).optional(),
      privateEndpoint: z.string().describe(
        "Output only. The internal IP address of this cluster's master endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint instead.",
      ).optional(),
      privateEndpointSubnetwork: z.string().describe(
        "Subnet to provision the master's private endpoint during cluster creation. Specified in projects/*/regions/*/subnetworks/* format. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint_subnetwork instead.",
      ).optional(),
      publicEndpoint: z.string().describe(
        "Output only. The external IP address of this cluster's master endpoint. Deprecated:Use ControlPlaneEndpointsConfig.IPEndpointsConfig.public_endpoint instead.",
      ).optional(),
    }).describe("Configuration options for private clusters.").optional(),
    rbacBindingConfig: z.object({
      enableInsecureBindingSystemAuthenticated: z.boolean().describe(
        "Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjects system:authenticated.",
      ).optional(),
      enableInsecureBindingSystemUnauthenticated: z.boolean().describe(
        "Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjets system:anonymous or system:unauthenticated.",
      ).optional(),
    }).describe(
      "RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created.",
    ).optional(),
    releaseChannel: z.object({
      channel: z.enum(["UNSPECIFIED", "RAPID", "REGULAR", "STABLE", "EXTENDED"])
        .describe(
          "channel specifies which release channel the cluster is subscribed to.",
        ).optional(),
    }).describe(
      "ReleaseChannel indicates which release channel a cluster is subscribed to. Release channels are arranged in order of risk. When a cluster is subscribed to a release channel, Google maintains both the master version and the node version. Node auto-upgrade defaults to true and cannot be disabled.",
    ).optional(),
    resourceLabels: z.record(z.string(), z.string()).describe(
      "The resource labels for the cluster to use to annotate any related Google Compute Engine resources.",
    ).optional(),
    resourceUsageExportConfig: z.object({
      bigqueryDestination: z.object({
        datasetId: z.string().describe("The ID of a BigQuery Dataset.")
          .optional(),
      }).describe(
        "Parameters for using BigQuery as the destination of resource usage export.",
      ).optional(),
      consumptionMeteringConfig: z.object({
        enabled: z.boolean().describe(
          "Whether to enable consumption metering for this cluster. If enabled, a second BigQuery table will be created to hold resource consumption records.",
        ).optional(),
      }).describe("Parameters for controlling consumption metering.")
        .optional(),
      enableNetworkEgressMetering: z.boolean().describe(
        "Whether to enable network egress metering for this cluster. If enabled, a daemonset will be created in the cluster to meter network egress traffic.",
      ).optional(),
    }).describe("Configuration for exporting cluster resource usages.")
      .optional(),
    satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    scheduleUpgradeConfig: z.object({
      enabled: z.boolean().describe(
        "Optional. Whether or not scheduled upgrades are enabled.",
      ).optional(),
    }).describe("Configuration for scheduled upgrades on the cluster.")
      .optional(),
    secretManagerConfig: z.object({
      enabled: z.boolean().describe("Enable/Disable Secret Manager Config.")
        .optional(),
      rotationConfig: z.object({
        enabled: z.boolean().describe("Whether the rotation is enabled.")
          .optional(),
        rotationInterval: z.string().describe(
          "The interval between two consecutive rotations. Default rotation interval is 2 minutes.",
        ).optional(),
      }).describe("RotationConfig is config for secret manager auto rotation.")
        .optional(),
    }).describe("SecretManagerConfig is config for secret manager enablement.")
      .optional(),
    secretSyncConfig: z.object({
      enabled: z.boolean().describe("Enable/Disable Secret Sync Config.")
        .optional(),
      rotationConfig: z.object({
        enabled: z.boolean().describe("Whether the rotation is enabled.")
          .optional(),
        rotationInterval: z.string().describe(
          "The interval between two consecutive rotations. Default rotation interval is 2 minutes.",
        ).optional(),
      }).describe(
        "SyncRotationConfig is config for secret manager auto rotation.",
      ).optional(),
    }).describe("Configuration for sync Secret Manager secrets as k8s secrets.")
      .optional(),
    securityPostureConfig: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "BASIC", "ENTERPRISE"])
        .describe("Sets which mode to use for Security Posture features.")
        .optional(),
      vulnerabilityMode: z.enum([
        "VULNERABILITY_MODE_UNSPECIFIED",
        "VULNERABILITY_DISABLED",
        "VULNERABILITY_BASIC",
        "VULNERABILITY_ENTERPRISE",
      ]).describe("Sets which mode to use for vulnerability scanning.")
        .optional(),
    }).describe(
      "SecurityPostureConfig defines the flags needed to enable/disable features for the Security Posture API.",
    ).optional(),
    selfLink: z.string().describe(
      "Output only. Server-defined URL for the resource.",
    ).optional(),
    servicesIpv4Cidr: z.string().describe(
      "Output only. The IP address range of the Kubernetes services in this cluster, in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `1.2.3.4/29`). Service addresses are typically put in the last `/16` from the container CIDR.",
    ).optional(),
    shieldedNodes: z.object({
      enabled: z.boolean().describe(
        "Whether Shielded Nodes features are enabled on all nodes in this cluster.",
      ).optional(),
    }).describe("Configuration of Shielded Nodes feature.").optional(),
    status: z.enum([
      "STATUS_UNSPECIFIED",
      "PROVISIONING",
      "RUNNING",
      "RECONCILING",
      "STOPPING",
      "ERROR",
      "DEGRADED",
    ]).describe("Output only. The current status of this cluster.").optional(),
    statusMessage: z.string().describe(
      "Output only. Deprecated. Use conditions instead. Additional information about the current status of this cluster, if available.",
    ).optional(),
    subnetwork: z.string().describe(
      "The name of the Google Compute Engine [subnetwork](https://cloud.google.com/compute/docs/subnetworks) to which the cluster is connected.",
    ).optional(),
    tpuIpv4CidrBlock: z.string().describe(
      "Output only. The IP address range of the Cloud TPUs in this cluster, in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `1.2.3.4/29`). This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25.",
    ).optional(),
    userManagedKeysConfig: z.object({
      aggregationCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the aggregation CA in this cluster.",
      ).optional(),
      clusterCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the cluster CA in this cluster.",
      ).optional(),
      controlPlaneDiskEncryptionKey: z.string().describe(
        "The Cloud KMS cryptoKey to use for Confidential Hyperdisk on the control plane nodes.",
      ).optional(),
      controlPlaneDiskEncryptionKeyVersions: z.array(z.string()).describe(
        "Output only. All of the versions of the Cloud KMS cryptoKey that are used by Confidential Hyperdisks on the control plane nodes.",
      ).optional(),
      etcdApiCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd API CA in this cluster.",
      ).optional(),
      etcdPeerCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd peer CA in this cluster.",
      ).optional(),
      gkeopsEtcdBackupEncryptionKey: z.string().describe(
        "Resource path of the Cloud KMS cryptoKey to use for encryption of internal etcd backups.",
      ).optional(),
      serviceAccountSigningKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for signing service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
      serviceAccountVerificationKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for verifying service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
    }).describe(
      "UserManagedKeysConfig holds the resource address to Keys which are used for signing certs and token that are used for communication within cluster.",
    ).optional(),
    verticalPodAutoscaling: z.object({
      enabled: z.boolean().describe("Enables vertical pod autoscaling.")
        .optional(),
    }).describe(
      "VerticalPodAutoscaling contains global, per-cluster information required by Vertical Pod Autoscaler to automatically adjust the resources of pods controlled by it.",
    ).optional(),
    workloadIdentityConfig: z.object({
      workloadPool: z.string().describe(
        "The workload pool to attach all Kubernetes service accounts to.",
      ).optional(),
    }).describe(
      "Configuration for the use of Kubernetes Service Accounts in IAM policies.",
    ).optional(),
    zone: z.string().describe(
      "Output only. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field is deprecated, use location instead.",
    ).optional(),
  }).describe("A Google Kubernetes Engine cluster.").optional(),
  parent: z.string().describe(
    "The parent (project and location) where the cluster will be created. Specified in the format `projects/*/locations/*`.",
  ).optional(),
  name: z.string().describe(
    "The name (project, location, cluster) of the cluster to update. Specified in the format `projects/*/locations/*/clusters/*`.",
  ).optional(),
  update: z.object({
    additionalPodRangesConfig: z.object({
      podRangeInfo: z.array(z.object({
        rangeName: z.string().describe("Output only. Name of a range.")
          .optional(),
        utilization: z.number().describe(
          "Output only. The utilization of the range.",
        ).optional(),
      })).describe("Output only. Information for additional pod range.")
        .optional(),
      podRangeNames: z.array(z.string()).describe(
        "Name for pod secondary ipv4 range which has the actual range defined ahead.",
      ).optional(),
    }).describe(
      "AdditionalPodRangesConfig is the configuration for additional pod secondary ranges supporting the ClusterUpdate message.",
    ).optional(),
    desiredAdditionalIpRangesConfig: z.object({
      additionalIpRangesConfigs: z.array(z.object({
        podIpv4RangeNames: z.array(z.unknown()).describe(
          "List of secondary ranges names within this subnetwork that can be used for pod IPs. Example1: gke-pod-range1 Example2: gke-pod-range1,gke-pod-range2",
        ).optional(),
        status: z.enum(["STATUS_UNSPECIFIED", "ACTIVE", "DRAINING"]).describe(
          "Draining status of the additional subnet.",
        ).optional(),
        subnetwork: z.string().describe(
          "Name of the subnetwork. This can be the full path of the subnetwork or just the name. Example1: my-subnet Example2: projects/gke-project/regions/us-central1/subnetworks/my-subnet",
        ).optional(),
      })).describe(
        "List of additional IP ranges configs where each AdditionalIPRangesConfig corresponds to one subnetwork's IP ranges",
      ).optional(),
    }).describe(
      "DesiredAdditionalIPRangesConfig is a wrapper used for cluster update operation and contains multiple AdditionalIPRangesConfigs.",
    ).optional(),
    desiredAddonsConfig: z.object({
      agentSandboxConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether AgentSandbox is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the AgentSandbox addon.").optional(),
      cloudRunConfig: z.object({
        disabled: z.boolean().describe(
          "Whether Cloud Run addon is enabled for this cluster.",
        ).optional(),
        loadBalancerType: z.enum([
          "LOAD_BALANCER_TYPE_UNSPECIFIED",
          "LOAD_BALANCER_TYPE_EXTERNAL",
          "LOAD_BALANCER_TYPE_INTERNAL",
        ]).describe("Which load balancer type is installed for Cloud Run.")
          .optional(),
      }).describe("Configuration options for the Cloud Run feature.")
        .optional(),
      configConnectorConfig: z.object({
        enabled: z.boolean().describe(
          "Whether Cloud Connector is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration options for the Config Connector add-on.")
        .optional(),
      dnsCacheConfig: z.object({
        enabled: z.boolean().describe(
          "Whether NodeLocal DNSCache is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for NodeLocal DNSCache").optional(),
      gcePersistentDiskCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Compute Engine PD CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Compute Engine PD CSI driver.")
        .optional(),
      gcpFilestoreCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Filestore CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Filestore CSI driver.").optional(),
      gcsFuseCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Cloud Storage Fuse CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Cloud Storage Fuse CSI driver.")
        .optional(),
      gkeBackupAgentConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Backup for GKE agent is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Backup for GKE Agent.").optional(),
      highScaleCheckpointingConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the High Scale Checkpointing is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the High Scale Checkpointing.").optional(),
      horizontalPodAutoscaling: z.object({
        disabled: z.boolean().describe(
          "Whether the Horizontal Pod Autoscaling feature is enabled in the cluster. When enabled, it ensures that metrics are collected into Stackdriver Monitoring.",
        ).optional(),
      }).describe(
        "Configuration options for the horizontal pod autoscaling feature, which increases or decreases the number of replica pods a replication controller has based on the resource usage of the existing pods.",
      ).optional(),
      httpLoadBalancing: z.object({
        disabled: z.boolean().describe(
          "Whether the HTTP Load Balancing controller is enabled in the cluster. When enabled, it runs a small pod in the cluster that manages the load balancers.",
        ).optional(),
      }).describe(
        "Configuration options for the HTTP (L7) load balancing controller addon, which makes it easy to set up HTTP load balancers for services in a cluster.",
      ).optional(),
      kubernetesDashboard: z.object({
        disabled: z.boolean().describe(
          "Whether the Kubernetes Dashboard is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Kubernetes Dashboard.").optional(),
      lustreCsiDriverConfig: z.object({
        disableMultiNic: z.boolean().describe(
          "When set to true, this disables multi-NIC support for the Lustre CSI driver. By default, GKE enables multi-NIC support, which allows the Lustre CSI driver to automatically detect and configure all suitable network interfaces on a node to maximize I/O performance for demanding workloads.",
        ).optional(),
        enableLegacyLustrePort: z.boolean().describe(
          "If set to true, the Lustre CSI driver will install Lustre kernel modules using port 6988. This serves as a workaround for a port conflict with the gke-metadata-server. This field is required ONLY under the following conditions: 1. The GKE node version is older than 1.33.2-gke.4655000. 2. You're connecting to a Lustre instance that has the 'gke-support-enabled' flag. Deprecated: This flag is no longer required as of GKE node version 1.33.2-gke.4655000, unless you are connecting to a Lustre instance that has the `gke-support-enabled` flag.",
        ).optional(),
        enabled: z.boolean().describe(
          "Whether the Lustre CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Lustre CSI driver.").optional(),
      networkPolicyConfig: z.object({
        disabled: z.boolean().describe(
          "Whether NetworkPolicy is enabled for this cluster.",
        ).optional(),
      }).describe(
        "Configuration for NetworkPolicy. This only tracks whether the addon is enabled or not on the Master, it does not track whether network policy is enabled for the nodes.",
      ).optional(),
      nodeReadinessConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether the GKE Node Readiness Controller is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the GKE Node Readiness Controller.")
        .optional(),
      parallelstoreCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Cloud Storage Parallelstore CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe(
        "Configuration for the Cloud Storage Parallelstore CSI driver.",
      ).optional(),
      podSnapshotConfig: z.object({
        enabled: z.boolean().describe(
          "Whether or not the Pod Snapshots feature is enabled.",
        ).optional(),
      }).describe(
        "PodSnapshotConfig is the configuration for GKE Pod Snapshots feature.",
      ).optional(),
      rayOperatorConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Ray Operator addon is enabled for this cluster.",
        ).optional(),
        rayClusterLoggingConfig: z.object({
          enabled: z.boolean().describe(
            "Enable log collection for Ray clusters.",
          ).optional(),
        }).describe(
          "RayClusterLoggingConfig specifies configuration of Ray logging.",
        ).optional(),
        rayClusterMonitoringConfig: z.object({
          enabled: z.boolean().describe(
            "Enable metrics collection for Ray clusters.",
          ).optional(),
        }).describe(
          "RayClusterMonitoringConfig specifies monitoring configuration for Ray clusters.",
        ).optional(),
      }).describe("Configuration options for the Ray Operator add-on.")
        .optional(),
      sliceControllerConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Indicates whether Slice Controller is enabled in the cluster.",
        ).optional(),
      }).describe("Configuration for the Slice Controller.").optional(),
      slurmOperatorConfig: z.object({
        enabled: z.boolean().describe(
          "When enabled, it runs a Slurm Operator that manages the set of compute pods for Slurm Cluster.",
        ).optional(),
      }).describe("Configuration for the Slurm Operator.").optional(),
      statefulHaConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Stateful HA add-on is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Stateful HA add-on.").optional(),
    }).describe(
      "Configuration for the addons that can be automatically spun up in the cluster, enabling additional functionality.",
    ).optional(),
    desiredAnonymousAuthenticationConfig: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "ENABLED", "LIMITED"]).describe(
        "Defines the mode of limiting anonymous access in the cluster.",
      ).optional(),
    }).describe(
      "AnonymousAuthenticationConfig defines the settings needed to limit endpoints that allow anonymous authentication.",
    ).optional(),
    desiredAuthenticatorGroupsConfig: z.object({
      enabled: z.boolean().describe(
        "Whether this cluster should return group membership lookups during authentication using a group of security groups.",
      ).optional(),
      securityGroup: z.string().describe(
        "The name of the security group-of-groups to be used. Only relevant if enabled = true.",
      ).optional(),
    }).describe(
      "Configuration for returning group information from authenticators.",
    ).optional(),
    desiredAutoIpamConfig: z.object({
      enabled: z.boolean().describe(
        "The flag that enables Auto IPAM on this cluster",
      ).optional(),
    }).describe("AutoIpamConfig contains all information related to Auto IPAM")
      .optional(),
    desiredAutopilotClusterPolicyConfig: z.object({
      noStandardNodePools: z.boolean().describe(
        "Denotes preventing standard node pools and requiring only autopilot node pools.",
      ).optional(),
      noSystemImpersonation: z.boolean().describe(
        "Denotes preventing impersonation and CSRs for GKE System users.",
      ).optional(),
      noSystemMutation: z.boolean().describe(
        "Denotes that preventing creation and mutation of resources in GKE managed namespaces and cluster-scoped GKE managed resources.",
      ).optional(),
      noUnsafeWebhooks: z.boolean().describe(
        "Denotes preventing unsafe webhooks.",
      ).optional(),
    }).describe(
      "ClusterPolicyConfig stores the configuration for cluster wide policies.",
    ).optional(),
    desiredAutopilotWorkloadPolicyConfig: z.object({
      allowNetAdmin: z.boolean().describe(
        "If true, workloads can use NET_ADMIN capability.",
      ).optional(),
      autopilotCompatibilityAuditingEnabled: z.boolean().describe(
        "If true, enables the GCW Auditor that audits workloads on standard clusters.",
      ).optional(),
    }).describe(
      "WorkloadPolicyConfig is the configuration related to GCW workload policy",
    ).optional(),
    desiredBinaryAuthorization: z.object({
      enabled: z.boolean().describe(
        "This field is deprecated. Leave this unset and instead configure BinaryAuthorization using evaluation_mode. If evaluation_mode is set to anything other than EVALUATION_MODE_UNSPECIFIED, this field is ignored.",
      ).optional(),
      evaluationMode: z.enum([
        "EVALUATION_MODE_UNSPECIFIED",
        "DISABLED",
        "PROJECT_SINGLETON_POLICY_ENFORCE",
      ]).describe(
        "Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED.",
      ).optional(),
    }).describe("Configuration for Binary Authorization.").optional(),
    desiredClusterAutoscaling: z.object({
      autopilotGeneralProfile: z.enum([
        "AUTOPILOT_GENERAL_PROFILE_UNSPECIFIED",
        "NO_PERFORMANCE",
        "NONE",
      ]).describe(
        "Autopilot general profile for the cluster, which defines the configuration for the cluster.",
      ).optional(),
      autoprovisioningLocations: z.array(z.string()).describe(
        "The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the NodePool's nodes can be created by NAP.",
      ).optional(),
      autoprovisioningNodePoolDefaults: z.object({
        bootDiskKmsKey: z.string().describe(
          "The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption",
        ).optional(),
        diskSizeGb: z.number().int().describe(
          "Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 10GB. If unspecified, the default disk size is 100GB.",
        ).optional(),
        diskType: z.string().describe(
          "Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard'",
        ).optional(),
        imageType: z.string().describe(
          "The image type to use for NAP created node. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types.",
        ).optional(),
        insecureKubeletReadonlyPortEnabled: z.boolean().describe(
          "DEPRECATED. Use NodePoolAutoConfig.NodeKubeletConfig instead.",
        ).optional(),
        management: z.object({
          autoRepair: z.boolean().describe(
            "A flag that specifies whether the node auto-repair is enabled for the node pool. If enabled, the nodes in this node pool will be monitored and, if they fail health checks too many times, an automatic repair action will be triggered.",
          ).optional(),
          autoUpgrade: z.boolean().describe(
            "A flag that specifies whether node auto-upgrade is enabled for the node pool. If enabled, node auto-upgrade helps keep the nodes in your node pool up to date with the latest release version of Kubernetes.",
          ).optional(),
          upgradeOptions: z.object({
            autoUpgradeStartTime: z.unknown().describe(
              "Output only. This field is set when upgrades are about to commence with the approximate start time for the upgrades, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
            ).optional(),
            description: z.unknown().describe(
              "Output only. This field is set when upgrades are about to commence with the description of the upgrade.",
            ).optional(),
          }).describe(
            "AutoUpgradeOptions defines the set of options for the user to control how the Auto Upgrades will proceed.",
          ).optional(),
        }).describe(
          "NodeManagement defines the set of node management services turned on for the node pool.",
        ).optional(),
        minCpuPlatform: z.string().describe(
          'Deprecated. Minimum CPU platform to be used for NAP created node pools. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: Intel Haswell or minCpuPlatform: Intel Sandy Bridge. For more information, read [how to specify min CPU platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform). This field is deprecated, min_cpu_platform should be specified using `cloud.google.com/requested-min-cpu-platform` label selector on the pod. To unset the min cpu platform field pass "automatic" as field value.',
        ).optional(),
        oauthScopes: z.array(z.string()).describe(
          "Scopes that are used by NAP when creating node pools.",
        ).optional(),
        serviceAccount: z.string().describe(
          "The Google Cloud Platform Service Account to be used by the node VMs.",
        ).optional(),
        shieldedInstanceConfig: z.object({
          enableIntegrityMonitoring: z.boolean().describe(
            "Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created.",
          ).optional(),
          enableSecureBoot: z.boolean().describe(
            "Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails.",
          ).optional(),
        }).describe("A set of Shielded Instance options.").optional(),
        upgradeSettings: z.object({
          blueGreenSettings: z.object({
            autoscaledRolloutPolicy: z.unknown().describe(
              "Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.",
            ).optional(),
            nodePoolSoakDuration: z.unknown().describe(
              "Time needed after draining entire blue pool. After this period, blue pool will be cleaned up.",
            ).optional(),
            standardRolloutPolicy: z.unknown().describe(
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
      }).describe(
        "AutoprovisioningNodePoolDefaults contains defaults for a node pool created by NAP.",
      ).optional(),
      autoscalingProfile: z.enum([
        "PROFILE_UNSPECIFIED",
        "OPTIMIZE_UTILIZATION",
        "BALANCED",
      ]).describe("Defines autoscaling behaviour.").optional(),
      defaultComputeClassConfig: z.object({
        enabled: z.boolean().describe("Enables default compute class.")
          .optional(),
      }).describe(
        "DefaultComputeClassConfig defines default compute class configuration.",
      ).optional(),
      enableNodeAutoprovisioning: z.boolean().describe(
        "Enables automatic node pool creation and deletion.",
      ).optional(),
      resourceLimits: z.array(z.object({
        maximum: z.string().describe(
          "Maximum amount of the resource in the cluster.",
        ).optional(),
        minimum: z.string().describe(
          "Minimum amount of the resource in the cluster.",
        ).optional(),
        resourceType: z.string().describe(
          'Resource name "cpu", "memory" or gpu-specific string.',
        ).optional(),
      })).describe(
        "Contains global constraints regarding minimum and maximum amount of resources in the cluster.",
      ).optional(),
    }).describe(
      "ClusterAutoscaling contains global, per-cluster information required by Cluster Autoscaler to automatically adjust the size of the cluster and create/delete node pools based on the current needs.",
    ).optional(),
    desiredCompliancePostureConfig: z.object({
      complianceStandards: z.array(z.object({
        standard: z.string().describe("Name of the compliance standard.")
          .optional(),
      })).describe("List of enabled compliance standards.").optional(),
      mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "ENABLED"]).describe(
        "Defines the enablement mode for Compliance Posture.",
      ).optional(),
    }).describe(
      "Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. CompliancePostureConfig defines the settings needed to enable/disable features for the Compliance Posture.",
    ).optional(),
    desiredContainerdConfig: z.object({
      privateRegistryAccessConfig: z.object({
        certificateAuthorityDomainConfig: z.array(z.object({
          fqdns: z.unknown().describe(
            "List of fully qualified domain names (FQDN). Specifying port is supported. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `10.0.1.2:5000`",
          ).optional(),
          gcpSecretManagerCertificateConfig: z.unknown().describe(
            "GCPSecretManagerCertificateConfig configures a secret from [Secret Manager](https://cloud.google.com/secret-manager).",
          ).optional(),
        })).describe("Private registry access configuration.").optional(),
        enabled: z.boolean().describe("Private registry access is enabled.")
          .optional(),
      }).describe(
        "PrivateRegistryAccessConfig contains access configuration for private container registries.",
      ).optional(),
      registryHosts: z.array(z.object({
        hosts: z.array(z.unknown()).describe(
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
    desiredControlPlaneEgress: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "VIA_CONTROL_PLANE", "NONE"]).describe(
        "Defines the mode of control plane egress.",
      ).optional(),
    }).describe(
      "ControlPlaneEgress defines the settings needed to enable control plane egress control.",
    ).optional(),
    desiredControlPlaneEndpointsConfig: z.object({
      dnsEndpointConfig: z.object({
        allowExternalTraffic: z.boolean().describe(
          "Controls whether user traffic is allowed over this endpoint. Note that Google-managed services may still use the endpoint even if this is false.",
        ).optional(),
        enableK8sCertsViaDns: z.boolean().describe(
          "Controls whether the k8s certs auth is allowed via DNS.",
        ).optional(),
        enableK8sTokensViaDns: z.boolean().describe(
          "Controls whether the k8s token auth is allowed via DNS.",
        ).optional(),
        endpoint: z.string().describe(
          "Output only. The cluster's DNS endpoint configuration. A DNS format address. This is accessible from the public internet. Ex: uid.us-central1.gke.goog. Always present, but the behavior may change according to the value of DNSEndpointConfig.allow_external_traffic.",
        ).optional(),
      }).describe("Describes the configuration of a DNS endpoint.").optional(),
      ipEndpointsConfig: z.object({
        authorizedNetworksConfig: z.object({
          cidrBlocks: z.array(z.unknown()).describe(
            "cidr_blocks define up to 50 external networks that could access Kubernetes master through HTTPS.",
          ).optional(),
          enabled: z.boolean().describe(
            "Whether or not master authorized networks is enabled.",
          ).optional(),
          gcpPublicCidrsAccessEnabled: z.boolean().describe(
            "Whether master is accessible via Google Compute Engine Public IP addresses.",
          ).optional(),
          privateEndpointEnforcementEnabled: z.boolean().describe(
            "Whether master authorized networks is enforced on private endpoint or not.",
          ).optional(),
        }).describe(
          "Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.",
        ).optional(),
        enablePublicEndpoint: z.boolean().describe(
          "Controls whether the control plane allows access through a public IP. It is invalid to specify both PrivateClusterConfig.enablePrivateEndpoint and this field at the same time.",
        ).optional(),
        enabled: z.boolean().describe(
          "Controls whether to allow direct IP access.",
        ).optional(),
        globalAccess: z.boolean().describe(
          "Controls whether the control plane's private endpoint is accessible from sources in other regions. It is invalid to specify both PrivateClusterMasterGlobalAccessConfig.enabled and this field at the same time.",
        ).optional(),
        privateEndpoint: z.string().describe(
          "Output only. The internal IP address of this cluster's control plane. Only populated if enabled.",
        ).optional(),
        privateEndpointSubnetwork: z.string().describe(
          "Subnet to provision the master's private endpoint during cluster creation. Specified in projects/*/regions/*/subnetworks/* format. It is invalid to specify both PrivateClusterConfig.privateEndpointSubnetwork and this field at the same time.",
        ).optional(),
        publicEndpoint: z.string().describe(
          "Output only. The external IP address of this cluster's control plane. Only populated if enabled.",
        ).optional(),
      }).describe("IP endpoints configuration.").optional(),
    }).describe(
      "Configuration for all of the cluster's control plane endpoints.",
    ).optional(),
    desiredCostManagementConfig: z.object({
      enabled: z.boolean().describe("Whether the feature is enabled or not.")
        .optional(),
    }).describe("Configuration for fine-grained cost management feature.")
      .optional(),
    desiredDatabaseEncryption: z.object({
      currentState: z.enum([
        "CURRENT_STATE_UNSPECIFIED",
        "CURRENT_STATE_ENCRYPTED",
        "CURRENT_STATE_DECRYPTED",
        "CURRENT_STATE_ENCRYPTION_PENDING",
        "CURRENT_STATE_ENCRYPTION_ERROR",
        "CURRENT_STATE_DECRYPTION_PENDING",
        "CURRENT_STATE_DECRYPTION_ERROR",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_ENABLED",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_PENDING",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_ERROR",
      ]).describe("Output only. The current state of etcd encryption.")
        .optional(),
      decryptionKeys: z.array(z.string()).describe(
        "Output only. Keys in use by the cluster for decrypting existing objects, in addition to the key in `key_name`. Each item is a CloudKMS key resource.",
      ).optional(),
      keyName: z.string().describe(
        "Name of CloudKMS key to use for the encryption of secrets in etcd. Ex. projects/my-project/locations/global/keyRings/my-ring/cryptoKeys/my-key",
      ).optional(),
      lastOperationErrors: z.array(z.object({
        errorMessage: z.string().describe(
          "Description of the error seen during the operation.",
        ).optional(),
        keyName: z.string().describe(
          "CloudKMS key resource that had the error.",
        ).optional(),
        timestamp: z.string().describe("Time when the CloudKMS error was seen.")
          .optional(),
      })).describe(
        "Output only. Records errors seen during DatabaseEncryption update operations.",
      ).optional(),
      state: z.enum([
        "UNKNOWN",
        "ENCRYPTED",
        "DECRYPTED",
        "ALL_OBJECTS_ENCRYPTION_ENABLED",
      ]).describe("The desired state of etcd encryption.").optional(),
    }).describe("Configuration of etcd encryption.").optional(),
    desiredDatapathProvider: z.enum([
      "DATAPATH_PROVIDER_UNSPECIFIED",
      "LEGACY_DATAPATH",
      "ADVANCED_DATAPATH",
    ]).describe("The desired datapath provider for the cluster.").optional(),
    desiredDefaultEnablePrivateNodes: z.boolean().describe(
      "Override the default setting of whether future created nodes have private IP addresses only, namely NetworkConfig.default_enable_private_nodes",
    ).optional(),
    desiredDefaultSnatStatus: z.object({
      disabled: z.boolean().describe("Disables cluster default sNAT rules.")
        .optional(),
    }).describe(
      "DefaultSnatStatus contains the desired state of whether default sNAT should be disabled on the cluster.",
    ).optional(),
    desiredDisableL4LbFirewallReconciliation: z.boolean().describe(
      "Enable/Disable L4 LB VPC firewall reconciliation for the cluster.",
    ).optional(),
    desiredDnsConfig: z.object({
      additiveVpcScopeDnsDomain: z.string().describe(
        "Optional. The domain used in Additive VPC scope.",
      ).optional(),
      clusterDns: z.enum([
        "PROVIDER_UNSPECIFIED",
        "PLATFORM_DEFAULT",
        "CLOUD_DNS",
        "KUBE_DNS",
      ]).describe(
        "cluster_dns indicates which in-cluster DNS provider should be used.",
      ).optional(),
      clusterDnsDomain: z.string().describe(
        "cluster_dns_domain is the suffix used for all cluster service records.",
      ).optional(),
      clusterDnsScope: z.enum([
        "DNS_SCOPE_UNSPECIFIED",
        "CLUSTER_SCOPE",
        "VPC_SCOPE",
      ]).describe(
        "cluster_dns_scope indicates the scope of access to cluster DNS records.",
      ).optional(),
    }).describe(
      "DNSConfig contains the desired set of options for configuring clusterDNS.",
    ).optional(),
    desiredEnableCiliumClusterwideNetworkPolicy: z.boolean().describe(
      "Enable/Disable Cilium Clusterwide Network Policy for the cluster.",
    ).optional(),
    desiredEnableFqdnNetworkPolicy: z.boolean().describe(
      "Enable/Disable FQDN Network Policy for the cluster.",
    ).optional(),
    desiredEnableMultiNetworking: z.boolean().describe(
      "Enable/Disable Multi-Networking for the cluster",
    ).optional(),
    desiredEnablePrivateEndpoint: z.boolean().describe(
      "Enable/Disable private endpoint for the cluster's master. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true.",
    ).optional(),
    desiredEnterpriseConfig: z.object({
      desiredTier: z.enum([
        "CLUSTER_TIER_UNSPECIFIED",
        "STANDARD",
        "ENTERPRISE",
      ]).describe("desired_tier specifies the desired tier of the cluster.")
        .optional(),
    }).describe(
      "DesiredEnterpriseConfig is a wrapper used for updating enterprise_config. Deprecated: GKE Enterprise features are now available without an Enterprise tier.",
    ).optional(),
    desiredFleet: z.object({
      membership: z.string().describe(
        "Output only. The full resource name of the registered fleet membership of the cluster, in the format `//gkehub.googleapis.com/projects/*/locations/*/memberships/*`.",
      ).optional(),
      membershipType: z.enum(["MEMBERSHIP_TYPE_UNSPECIFIED", "LIGHTWEIGHT"])
        .describe("The type of the cluster's fleet membership.").optional(),
      preRegistered: z.boolean().describe(
        "Output only. Whether the cluster has been registered through the fleet API.",
      ).optional(),
      project: z.string().describe(
        "The Fleet host project(project ID or project number) where this cluster will be registered to. This field cannot be changed after the cluster has been registered.",
      ).optional(),
    }).describe("Fleet is the fleet configuration for the cluster.").optional(),
    desiredGatewayApiConfig: z.object({
      channel: z.enum([
        "CHANNEL_UNSPECIFIED",
        "CHANNEL_DISABLED",
        "CHANNEL_EXPERIMENTAL",
        "CHANNEL_STANDARD",
      ]).describe("The Gateway API release channel to use for Gateway API.")
        .optional(),
    }).describe(
      "GatewayAPIConfig contains the desired config of Gateway API on this cluster.",
    ).optional(),
    desiredGcfsConfig: z.object({
      enabled: z.boolean().describe("Whether to use GCFS.").optional(),
    }).describe(
      "GcfsConfig contains configurations of Google Container File System (image streaming).",
    ).optional(),
    desiredIdentityServiceConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable the Identity Service component",
      ).optional(),
    }).describe(
      "IdentityServiceConfig is configuration for Identity Service which allows customers to use external identity providers with the K8S API",
    ).optional(),
    desiredImage: z.string().describe(
      'The desired name of the image to use for this node. This is used to create clusters using a custom image. NOTE: Set the "desired_node_pool" field as well.',
    ).optional(),
    desiredImageProject: z.string().describe(
      'The project containing the desired image to use for this node. This is used to create clusters using a custom image. NOTE: Set the "desired_node_pool" field as well.',
    ).optional(),
    desiredImageType: z.string().describe(
      'The desired image type for the node pool. NOTE: Set the "desired_node_pool" field as well.',
    ).optional(),
    desiredInTransitEncryptionConfig: z.enum([
      "IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED",
      "IN_TRANSIT_ENCRYPTION_DISABLED",
      "IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT",
    ]).describe("Specify the details of in-transit encryption.").optional(),
    desiredIntraNodeVisibilityConfig: z.object({
      enabled: z.boolean().describe(
        "Enables intra node visibility for this cluster.",
      ).optional(),
    }).describe(
      "IntraNodeVisibilityConfig contains the desired config of the intra-node visibility on this cluster.",
    ).optional(),
    desiredK8sBetaApis: z.object({
      enabledApis: z.array(z.string()).describe("Enabled k8s beta APIs.")
        .optional(),
    }).describe("K8sBetaAPIConfig, configuration for beta APIs").optional(),
    desiredL4ilbSubsettingConfig: z.object({
      enabled: z.boolean().describe(
        "Enables l4 ILB subsetting for this cluster.",
      ).optional(),
    }).describe(
      "ILBSubsettingConfig contains the desired config of L4 Internal LoadBalancer subsetting on this cluster.",
    ).optional(),
    desiredLocations: z.array(z.string()).describe(
      "The desired list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. This list must always include the cluster's primary zone. Warning: changing cluster locations will update the locations of all node pools and will result in nodes being added and/or removed.",
    ).optional(),
    desiredLoggingConfig: z.object({
      componentConfig: z.object({
        enableComponents: z.array(
          z.enum([
            "COMPONENT_UNSPECIFIED",
            "SYSTEM_COMPONENTS",
            "WORKLOADS",
            "APISERVER",
            "SCHEDULER",
            "CONTROLLER_MANAGER",
            "KCP_SSHD",
            "KCP_CONNECTION",
            "KCP_HPA",
          ]),
        ).describe(
          "Select components to collect logs. An empty set would disable all logging.",
        ).optional(),
      }).describe(
        "LoggingComponentConfig is cluster logging component configuration.",
      ).optional(),
    }).describe("LoggingConfig is cluster logging configuration.").optional(),
    desiredLoggingService: z.string().describe(
      "The logging service the cluster should use to write logs. Currently available options: * `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model * `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). * `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions.",
    ).optional(),
    desiredManagedMachineLearningDiagnosticsConfig: z.object({
      enabled: z.boolean().describe(
        "Enable/Disable Managed Machine Learning Diagnostics.",
      ).optional(),
    }).describe(
      "ManagedMachineLearningDiagnosticsConfig is the configuration for the GKE Managed Machine Learning Diagnostics pipeline.",
    ).optional(),
    desiredManagedOpentelemetryConfig: z.object({
      scope: z.enum([
        "SCOPE_UNSPECIFIED",
        "NONE",
        "COLLECTION_AND_INSTRUMENTATION_COMPONENTS",
      ]).describe("Scope of the Managed OpenTelemetry pipeline.").optional(),
    }).describe(
      "ManagedOpenTelemetryConfig is the configuration for the GKE Managed OpenTelemetry pipeline.",
    ).optional(),
    desiredMasterAuthorizedNetworksConfig: z.object({
      cidrBlocks: z.array(z.object({
        cidrBlock: z.string().describe(
          "cidr_block must be specified in CIDR notation.",
        ).optional(),
        displayName: z.string().describe(
          "display_name is an optional field for users to identify CIDR blocks.",
        ).optional(),
      })).describe(
        "cidr_blocks define up to 50 external networks that could access Kubernetes master through HTTPS.",
      ).optional(),
      enabled: z.boolean().describe(
        "Whether or not master authorized networks is enabled.",
      ).optional(),
      gcpPublicCidrsAccessEnabled: z.boolean().describe(
        "Whether master is accessible via Google Compute Engine Public IP addresses.",
      ).optional(),
      privateEndpointEnforcementEnabled: z.boolean().describe(
        "Whether master authorized networks is enforced on private endpoint or not.",
      ).optional(),
    }).describe(
      "Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.",
    ).optional(),
    desiredMasterVersion: z.string().describe(
      'The Kubernetes version to change the master to. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the default Kubernetes version',
    ).optional(),
    desiredMeshCertificates: z.object({
      enableCertificates: z.boolean().describe(
        "enable_certificates controls issuance of workload mTLS certificates. If set, the GKE Workload Identity Certificates controller and node agent will be deployed in the cluster, which can then be configured by creating a WorkloadCertificateConfig Custom Resource. Requires Workload Identity (workload_pool must be non-empty).",
      ).optional(),
    }).describe(
      "Configuration for issuance of mTLS keys and certificates to Kubernetes pods.",
    ).optional(),
    desiredMonitoringConfig: z.object({
      advancedDatapathObservabilityConfig: z.object({
        enableMetrics: z.boolean().describe("Expose flow metrics on nodes")
          .optional(),
        enableRelay: z.boolean().describe("Enable Relay component").optional(),
        relayMode: z.enum([
          "RELAY_MODE_UNSPECIFIED",
          "DISABLED",
          "INTERNAL_VPC_LB",
          "EXTERNAL_LB",
        ]).describe("Method used to make Relay available").optional(),
      }).describe(
        "AdvancedDatapathObservabilityConfig specifies configuration of observability features of advanced datapath.",
      ).optional(),
      componentConfig: z.object({
        enableComponents: z.array(
          z.enum([
            "COMPONENT_UNSPECIFIED",
            "SYSTEM_COMPONENTS",
            "APISERVER",
            "SCHEDULER",
            "CONTROLLER_MANAGER",
            "STORAGE",
            "HPA",
            "POD",
            "DAEMONSET",
            "DEPLOYMENT",
            "STATEFULSET",
            "CADVISOR",
            "KUBELET",
            "DCGM",
            "JOBSET",
          ]),
        ).describe(
          "Select components to collect metrics. An empty set would disable all monitoring.",
        ).optional(),
      }).describe(
        "MonitoringComponentConfig is cluster monitoring component configuration.",
      ).optional(),
      managedPrometheusConfig: z.object({
        autoMonitoringConfig: z.object({
          scope: z.enum(["SCOPE_UNSPECIFIED", "ALL", "NONE"]).describe(
            "Scope for GKE Workload Auto-Monitoring.",
          ).optional(),
        }).describe(
          "AutoMonitoringConfig defines the configuration for GKE Workload Auto-Monitoring.",
        ).optional(),
        enabled: z.boolean().describe("Enable Managed Collection.").optional(),
      }).describe(
        "ManagedPrometheusConfig defines the configuration for Google Cloud Managed Service for Prometheus.",
      ).optional(),
    }).describe("MonitoringConfig is cluster monitoring configuration.")
      .optional(),
    desiredMonitoringService: z.string().describe(
      "The monitoring service the cluster should use to write metrics. Currently available options: * `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model * `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). * `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions.",
    ).optional(),
    desiredNetworkPerformanceConfig: z.object({
      totalEgressBandwidthTier: z.enum(["TIER_UNSPECIFIED", "TIER_1"]).describe(
        "Specifies the total network bandwidth tier for NodePools in the cluster.",
      ).optional(),
    }).describe("Configuration of network bandwidth tiers").optional(),
    desiredNetworkTierConfig: z.object({
      networkTier: z.enum([
        "NETWORK_TIER_UNSPECIFIED",
        "NETWORK_TIER_DEFAULT",
        "NETWORK_TIER_PREMIUM",
        "NETWORK_TIER_STANDARD",
      ]).describe("Network tier configuration.").optional(),
    }).describe("NetworkTierConfig contains network tier information.")
      .optional(),
    desiredNodeCreationConfig: z.object({
      nodeCreationMode: z.enum([
        "MODE_UNSPECIFIED",
        "VIA_KUBELET",
        "VIA_CONTROL_PLANE",
      ]).describe("The mode of node creation.").optional(),
    }).describe(
      "NodeCreationConfig defines the settings of node creation mode.",
    ).optional(),
    desiredNodeKubeletConfig: z.object({
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
    desiredNodePoolAutoConfigKubeletConfig: z.object({
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
    desiredNodePoolAutoConfigLinuxNodeConfig: z.object({
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
          args: z.array(z.unknown()).describe(
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
      }).describe("Configuration for kernel module loading on nodes.")
        .optional(),
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
        }).describe("Defines encryption settings for the swap space.")
          .optional(),
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
        "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.neigh.default.gc_thresh1 net.ipv4.neigh.default.gc_thresh2 net.ipv4.neigh.default.gc_thresh3 net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.keys.maxkeys kernel.keys.maxbytes kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
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
    desiredNodePoolAutoConfigNetworkTags: z.object({
      tags: z.array(z.string()).describe("List of network tags.").optional(),
    }).describe(
      "Collection of Compute Engine network tags that can be applied to a node's underlying VM instance.",
    ).optional(),
    desiredNodePoolAutoConfigResourceManagerTags: z.object({
      tags: z.record(z.string(), z.string()).describe(
        "TagKeyValue must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}`",
      ).optional(),
    }).describe(
      "A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.",
    ).optional(),
    desiredNodePoolAutoscaling: z.object({
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
    desiredNodePoolId: z.string().describe(
      'The node pool to be upgraded. This field is mandatory if "desired_node_version", "desired_image_family" or "desired_node_pool_autoscaling" is specified and there is more than one node pool on the cluster.',
    ).optional(),
    desiredNodePoolLoggingConfig: z.object({
      variantConfig: z.object({
        variant: z.enum(["VARIANT_UNSPECIFIED", "DEFAULT", "MAX_THROUGHPUT"])
          .describe("Logging variant deployed on nodes.").optional(),
      }).describe(
        "LoggingVariantConfig specifies the behaviour of the logging component.",
      ).optional(),
    }).describe(
      "NodePoolLoggingConfig specifies logging configuration for node pools.",
    ).optional(),
    desiredNodeVersion: z.string().describe(
      'The Kubernetes version to change the nodes to (typically an upgrade). Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the Kubernetes master version',
    ).optional(),
    desiredNotificationConfig: z.object({
      pubsub: z.object({
        enabled: z.boolean().describe("Enable notifications for Pub/Sub.")
          .optional(),
        filter: z.object({
          eventType: z.array(z.unknown()).describe("Event types to allowlist.")
            .optional(),
        }).describe(
          "Allows filtering to one or more specific event types. If event types are present, those and only those event types will be transmitted to the cluster. Other types will be skipped. If no filter is specified, or no event types are present, all event types will be sent",
        ).optional(),
        topic: z.string().describe(
          "The desired Pub/Sub topic to which notifications will be sent by GKE. Format is `projects/{project}/topics/{topic}`.",
        ).optional(),
      }).describe("Pub/Sub specific notification config.").optional(),
    }).describe("NotificationConfig is the configuration of notifications.")
      .optional(),
    desiredParentProductConfig: z.object({
      labels: z.record(z.string(), z.string()).describe(
        "Labels contain the configuration of the parent product.",
      ).optional(),
      productName: z.string().describe(
        "Name of the parent product associated with the cluster.",
      ).optional(),
    }).describe(
      "ParentProductConfig is the configuration of the parent product of the cluster. This field is used by Google internal products that are built on top of a GKE cluster and take the ownership of the cluster.",
    ).optional(),
    desiredPodAutoscaling: z.object({
      hpaProfile: z.enum(["HPA_PROFILE_UNSPECIFIED", "NONE", "PERFORMANCE"])
        .describe("Selected Horizontal Pod Autoscaling profile.").optional(),
    }).describe(
      "PodAutoscaling is used for configuration of parameters for workload autoscaling.",
    ).optional(),
    desiredPrivateClusterConfig: z.object({
      enablePrivateEndpoint: z.boolean().describe(
        "Whether the master's internal IP address is used as the cluster endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true.",
      ).optional(),
      enablePrivateNodes: z.boolean().describe(
        "Whether nodes have internal IP addresses only. If enabled, all nodes are given only RFC 1918 private addresses and communicate with the master via private networking. Deprecated: Use NetworkConfig.default_enable_private_nodes instead.",
      ).optional(),
      masterGlobalAccessConfig: z.object({
        enabled: z.boolean().describe(
          "Whenever master is accessible globally or not.",
        ).optional(),
      }).describe(
        "Configuration for controlling master global access settings.",
      ).optional(),
      masterIpv4CidrBlock: z.string().describe(
        "The IP range in CIDR notation to use for the hosted master network. This range will be used for assigning internal IP addresses to the master or set of masters, as well as the ILB VIP. This range must not overlap with any other ranges in use within the cluster's network.",
      ).optional(),
      peeringName: z.string().describe(
        "Output only. The peering name in the customer VPC used by this cluster.",
      ).optional(),
      privateEndpoint: z.string().describe(
        "Output only. The internal IP address of this cluster's master endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint instead.",
      ).optional(),
      privateEndpointSubnetwork: z.string().describe(
        "Subnet to provision the master's private endpoint during cluster creation. Specified in projects/*/regions/*/subnetworks/* format. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint_subnetwork instead.",
      ).optional(),
      publicEndpoint: z.string().describe(
        "Output only. The external IP address of this cluster's master endpoint. Deprecated:Use ControlPlaneEndpointsConfig.IPEndpointsConfig.public_endpoint instead.",
      ).optional(),
    }).describe("Configuration options for private clusters.").optional(),
    desiredPrivateIpv6GoogleAccess: z.enum([
      "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED",
      "PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED",
      "PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE",
      "PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL",
    ]).describe("The desired state of IPv6 connectivity to Google Services.")
      .optional(),
    desiredPrivilegedAdmissionConfig: z.object({
      allowlistPaths: z.array(z.string()).describe(
        "The customer allowlist Cloud Storage paths for the cluster. These paths are used with the `--autopilot-privileged-admission` flag to authorize privileged workloads in Autopilot clusters. Paths can be GKE-owned, in the format `gke:////`, or customer-owned, in the format `gs:///`. Wildcards (`*`) are supported to authorize all allowlists under specific paths or directories. Example: `gs://my-bucket/*` will authorize all allowlists under the `my-bucket` bucket.",
      ).optional(),
    }).describe(
      "PrivilegedAdmissionConfig stores the list of authorized allowlist paths for the cluster.",
    ).optional(),
    desiredRbacBindingConfig: z.object({
      enableInsecureBindingSystemAuthenticated: z.boolean().describe(
        "Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjects system:authenticated.",
      ).optional(),
      enableInsecureBindingSystemUnauthenticated: z.boolean().describe(
        "Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjets system:anonymous or system:unauthenticated.",
      ).optional(),
    }).describe(
      "RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created.",
    ).optional(),
    desiredReleaseChannel: z.object({
      channel: z.enum(["UNSPECIFIED", "RAPID", "REGULAR", "STABLE", "EXTENDED"])
        .describe(
          "channel specifies which release channel the cluster is subscribed to.",
        ).optional(),
    }).describe(
      "ReleaseChannel indicates which release channel a cluster is subscribed to. Release channels are arranged in order of risk. When a cluster is subscribed to a release channel, Google maintains both the master version and the node version. Node auto-upgrade defaults to true and cannot be disabled.",
    ).optional(),
    desiredResourceUsageExportConfig: z.object({
      bigqueryDestination: z.object({
        datasetId: z.string().describe("The ID of a BigQuery Dataset.")
          .optional(),
      }).describe(
        "Parameters for using BigQuery as the destination of resource usage export.",
      ).optional(),
      consumptionMeteringConfig: z.object({
        enabled: z.boolean().describe(
          "Whether to enable consumption metering for this cluster. If enabled, a second BigQuery table will be created to hold resource consumption records.",
        ).optional(),
      }).describe("Parameters for controlling consumption metering.")
        .optional(),
      enableNetworkEgressMetering: z.boolean().describe(
        "Whether to enable network egress metering for this cluster. If enabled, a daemonset will be created in the cluster to meter network egress traffic.",
      ).optional(),
    }).describe("Configuration for exporting cluster resource usages.")
      .optional(),
    desiredSecretManagerConfig: z.object({
      enabled: z.boolean().describe("Enable/Disable Secret Manager Config.")
        .optional(),
      rotationConfig: z.object({
        enabled: z.boolean().describe("Whether the rotation is enabled.")
          .optional(),
        rotationInterval: z.string().describe(
          "The interval between two consecutive rotations. Default rotation interval is 2 minutes.",
        ).optional(),
      }).describe("RotationConfig is config for secret manager auto rotation.")
        .optional(),
    }).describe("SecretManagerConfig is config for secret manager enablement.")
      .optional(),
    desiredSecretSyncConfig: z.object({
      enabled: z.boolean().describe("Enable/Disable Secret Sync Config.")
        .optional(),
      rotationConfig: z.object({
        enabled: z.boolean().describe("Whether the rotation is enabled.")
          .optional(),
        rotationInterval: z.string().describe(
          "The interval between two consecutive rotations. Default rotation interval is 2 minutes.",
        ).optional(),
      }).describe(
        "SyncRotationConfig is config for secret manager auto rotation.",
      ).optional(),
    }).describe("Configuration for sync Secret Manager secrets as k8s secrets.")
      .optional(),
    desiredSecurityPostureConfig: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "BASIC", "ENTERPRISE"])
        .describe("Sets which mode to use for Security Posture features.")
        .optional(),
      vulnerabilityMode: z.enum([
        "VULNERABILITY_MODE_UNSPECIFIED",
        "VULNERABILITY_DISABLED",
        "VULNERABILITY_BASIC",
        "VULNERABILITY_ENTERPRISE",
      ]).describe("Sets which mode to use for vulnerability scanning.")
        .optional(),
    }).describe(
      "SecurityPostureConfig defines the flags needed to enable/disable features for the Security Posture API.",
    ).optional(),
    desiredServiceExternalIpsConfig: z.object({
      enabled: z.boolean().describe(
        "Whether Services with ExternalIPs field are allowed or not.",
      ).optional(),
    }).describe("Config to block services with externalIPs field.").optional(),
    desiredShieldedNodes: z.object({
      enabled: z.boolean().describe(
        "Whether Shielded Nodes features are enabled on all nodes in this cluster.",
      ).optional(),
    }).describe("Configuration of Shielded Nodes feature.").optional(),
    desiredStackType: z.enum(["STACK_TYPE_UNSPECIFIED", "IPV4", "IPV4_IPV6"])
      .describe(
        "The desired stack type of the cluster. If a stack type is provided and does not match the current stack type of the cluster, update will attempt to change the stack type to the new type.",
      ).optional(),
    desiredUserManagedKeysConfig: z.object({
      aggregationCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the aggregation CA in this cluster.",
      ).optional(),
      clusterCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the cluster CA in this cluster.",
      ).optional(),
      controlPlaneDiskEncryptionKey: z.string().describe(
        "The Cloud KMS cryptoKey to use for Confidential Hyperdisk on the control plane nodes.",
      ).optional(),
      controlPlaneDiskEncryptionKeyVersions: z.array(z.string()).describe(
        "Output only. All of the versions of the Cloud KMS cryptoKey that are used by Confidential Hyperdisks on the control plane nodes.",
      ).optional(),
      etcdApiCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd API CA in this cluster.",
      ).optional(),
      etcdPeerCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd peer CA in this cluster.",
      ).optional(),
      gkeopsEtcdBackupEncryptionKey: z.string().describe(
        "Resource path of the Cloud KMS cryptoKey to use for encryption of internal etcd backups.",
      ).optional(),
      serviceAccountSigningKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for signing service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
      serviceAccountVerificationKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for verifying service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
    }).describe(
      "UserManagedKeysConfig holds the resource address to Keys which are used for signing certs and token that are used for communication within cluster.",
    ).optional(),
    desiredVerticalPodAutoscaling: z.object({
      enabled: z.boolean().describe("Enables vertical pod autoscaling.")
        .optional(),
    }).describe(
      "VerticalPodAutoscaling contains global, per-cluster information required by Vertical Pod Autoscaler to automatically adjust the resources of pods controlled by it.",
    ).optional(),
    desiredWorkloadIdentityConfig: z.object({
      workloadPool: z.string().describe(
        "The workload pool to attach all Kubernetes service accounts to.",
      ).optional(),
    }).describe(
      "Configuration for the use of Kubernetes Service Accounts in IAM policies.",
    ).optional(),
    enableK8sBetaApis: z.object({
      enabledApis: z.array(z.string()).describe("Enabled k8s beta APIs.")
        .optional(),
    }).describe("K8sBetaAPIConfig, configuration for beta APIs").optional(),
    etag: z.string().describe(
      "The current etag of the cluster. If an etag is provided and does not match the current etag of the cluster, update will be blocked and an ABORTED error will be returned.",
    ).optional(),
    gkeAutoUpgradeConfig: z.object({
      patchMode: z.enum(["PATCH_MODE_UNSPECIFIED", "ACCELERATED"]).describe(
        "PatchMode specifies how auto upgrade patch builds should be selected.",
      ).optional(),
    }).describe(
      "GkeAutoUpgradeConfig is the configuration for GKE auto upgrades.",
    ).optional(),
    removedAdditionalPodRangesConfig: z.object({
      podRangeInfo: z.array(z.object({
        rangeName: z.string().describe("Output only. Name of a range.")
          .optional(),
        utilization: z.number().describe(
          "Output only. The utilization of the range.",
        ).optional(),
      })).describe("Output only. Information for additional pod range.")
        .optional(),
      podRangeNames: z.array(z.string()).describe(
        "Name for pod secondary ipv4 range which has the actual range defined ahead.",
      ).optional(),
    }).describe(
      "AdditionalPodRangesConfig is the configuration for additional pod secondary ranges supporting the ClusterUpdate message.",
    ).optional(),
    userManagedKeysConfig: z.object({
      aggregationCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the aggregation CA in this cluster.",
      ).optional(),
      clusterCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the cluster CA in this cluster.",
      ).optional(),
      controlPlaneDiskEncryptionKey: z.string().describe(
        "The Cloud KMS cryptoKey to use for Confidential Hyperdisk on the control plane nodes.",
      ).optional(),
      controlPlaneDiskEncryptionKeyVersions: z.array(z.string()).describe(
        "Output only. All of the versions of the Cloud KMS cryptoKey that are used by Confidential Hyperdisks on the control plane nodes.",
      ).optional(),
      etcdApiCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd API CA in this cluster.",
      ).optional(),
      etcdPeerCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd peer CA in this cluster.",
      ).optional(),
      gkeopsEtcdBackupEncryptionKey: z.string().describe(
        "Resource path of the Cloud KMS cryptoKey to use for encryption of internal etcd backups.",
      ).optional(),
      serviceAccountSigningKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for signing service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
      serviceAccountVerificationKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for verifying service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
    }).describe(
      "UserManagedKeysConfig holds the resource address to Keys which are used for signing certs and token that are used for communication within cluster.",
    ).optional(),
  }).describe(
    "ClusterUpdate describes an update to the cluster. Exactly one update can be applied to a cluster with each request, so at most one field can be provided.",
  ).optional(),
});

const StateSchema = z.object({
  addonsConfig: z.object({
    agentSandboxConfig: z.object({
      enabled: z.boolean(),
    }),
    cloudRunConfig: z.object({
      disabled: z.boolean(),
      loadBalancerType: z.string(),
    }),
    configConnectorConfig: z.object({
      enabled: z.boolean(),
    }),
    dnsCacheConfig: z.object({
      enabled: z.boolean(),
    }),
    gcePersistentDiskCsiDriverConfig: z.object({
      enabled: z.boolean(),
    }),
    gcpFilestoreCsiDriverConfig: z.object({
      enabled: z.boolean(),
    }),
    gcsFuseCsiDriverConfig: z.object({
      enabled: z.boolean(),
    }),
    gkeBackupAgentConfig: z.object({
      enabled: z.boolean(),
    }),
    highScaleCheckpointingConfig: z.object({
      enabled: z.boolean(),
    }),
    horizontalPodAutoscaling: z.object({
      disabled: z.boolean(),
    }),
    httpLoadBalancing: z.object({
      disabled: z.boolean(),
    }),
    kubernetesDashboard: z.object({
      disabled: z.boolean(),
    }),
    lustreCsiDriverConfig: z.object({
      disableMultiNic: z.boolean(),
      enableLegacyLustrePort: z.boolean(),
      enabled: z.boolean(),
    }),
    networkPolicyConfig: z.object({
      disabled: z.boolean(),
    }),
    nodeReadinessConfig: z.object({
      enabled: z.boolean(),
    }),
    parallelstoreCsiDriverConfig: z.object({
      enabled: z.boolean(),
    }),
    podSnapshotConfig: z.object({
      enabled: z.boolean(),
    }),
    rayOperatorConfig: z.object({
      enabled: z.boolean(),
      rayClusterLoggingConfig: z.object({
        enabled: z.boolean(),
      }),
      rayClusterMonitoringConfig: z.object({
        enabled: z.boolean(),
      }),
    }),
    sliceControllerConfig: z.object({
      enabled: z.boolean(),
    }),
    slurmOperatorConfig: z.object({
      enabled: z.boolean(),
    }),
    statefulHaConfig: z.object({
      enabled: z.boolean(),
    }),
  }).optional(),
  alphaClusterFeatureGates: z.array(z.string()).optional(),
  anonymousAuthenticationConfig: z.object({
    mode: z.string(),
  }).optional(),
  authenticatorGroupsConfig: z.object({
    enabled: z.boolean(),
    securityGroup: z.string(),
  }).optional(),
  autopilot: z.object({
    clusterPolicyConfig: z.object({
      noStandardNodePools: z.boolean(),
      noSystemImpersonation: z.boolean(),
      noSystemMutation: z.boolean(),
      noUnsafeWebhooks: z.boolean(),
    }),
    enabled: z.boolean(),
    privilegedAdmissionConfig: z.object({
      allowlistPaths: z.array(z.string()),
    }),
    workloadPolicyConfig: z.object({
      allowNetAdmin: z.boolean(),
      autopilotCompatibilityAuditingEnabled: z.boolean(),
    }),
  }).optional(),
  autoscaling: z.object({
    autopilotGeneralProfile: z.string(),
    autoprovisioningLocations: z.array(z.string()),
    autoprovisioningNodePoolDefaults: z.object({
      bootDiskKmsKey: z.string(),
      diskSizeGb: z.number(),
      diskType: z.string(),
      imageType: z.string(),
      insecureKubeletReadonlyPortEnabled: z.boolean(),
      management: z.object({
        autoRepair: z.boolean(),
        autoUpgrade: z.boolean(),
        upgradeOptions: z.object({
          autoUpgradeStartTime: z.string(),
          description: z.string(),
        }),
      }),
      minCpuPlatform: z.string(),
      oauthScopes: z.array(z.string()),
      serviceAccount: z.string(),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean(),
        enableSecureBoot: z.boolean(),
      }),
      upgradeSettings: z.object({
        blueGreenSettings: z.object({
          autoscaledRolloutPolicy: z.object({
            waitForDrainDuration: z.unknown(),
          }),
          nodePoolSoakDuration: z.string(),
          standardRolloutPolicy: z.object({
            batchNodeCount: z.unknown(),
            batchPercentage: z.unknown(),
            batchSoakDuration: z.unknown(),
          }),
        }),
        maxSurge: z.number(),
        maxUnavailable: z.number(),
        strategy: z.string(),
      }),
    }),
    autoscalingProfile: z.string(),
    defaultComputeClassConfig: z.object({
      enabled: z.boolean(),
    }),
    enableNodeAutoprovisioning: z.boolean(),
    resourceLimits: z.array(z.object({
      maximum: z.string(),
      minimum: z.string(),
      resourceType: z.string(),
    })),
  }).optional(),
  binaryAuthorization: z.object({
    enabled: z.boolean(),
    evaluationMode: z.string(),
  }).optional(),
  clusterIpv4Cidr: z.string().optional(),
  compliancePostureConfig: z.object({
    complianceStandards: z.array(z.object({
      standard: z.string(),
    })),
    mode: z.string(),
  }).optional(),
  conditions: z.array(z.object({
    canonicalCode: z.string(),
    code: z.string(),
    message: z.string(),
  })).optional(),
  confidentialNodes: z.object({
    confidentialInstanceType: z.string(),
    enabled: z.boolean(),
  }).optional(),
  controlPlaneEgress: z.object({
    mode: z.string(),
  }).optional(),
  controlPlaneEndpointsConfig: z.object({
    dnsEndpointConfig: z.object({
      allowExternalTraffic: z.boolean(),
      enableK8sCertsViaDns: z.boolean(),
      enableK8sTokensViaDns: z.boolean(),
      endpoint: z.string(),
    }),
    ipEndpointsConfig: z.object({
      authorizedNetworksConfig: z.object({
        cidrBlocks: z.array(z.object({
          cidrBlock: z.unknown(),
          displayName: z.unknown(),
        })),
        enabled: z.boolean(),
        gcpPublicCidrsAccessEnabled: z.boolean(),
        privateEndpointEnforcementEnabled: z.boolean(),
      }),
      enablePublicEndpoint: z.boolean(),
      enabled: z.boolean(),
      globalAccess: z.boolean(),
      privateEndpoint: z.string(),
      privateEndpointSubnetwork: z.string(),
      publicEndpoint: z.string(),
    }),
  }).optional(),
  costManagementConfig: z.object({
    enabled: z.boolean(),
  }).optional(),
  createTime: z.string().optional(),
  currentMasterVersion: z.string().optional(),
  currentNodeCount: z.number().optional(),
  currentNodeVersion: z.string().optional(),
  databaseEncryption: z.object({
    currentState: z.string(),
    decryptionKeys: z.array(z.string()),
    keyName: z.string(),
    lastOperationErrors: z.array(z.object({
      errorMessage: z.string(),
      keyName: z.string(),
      timestamp: z.string(),
    })),
    state: z.string(),
  }).optional(),
  defaultMaxPodsConstraint: z.object({
    maxPodsPerNode: z.string(),
  }).optional(),
  description: z.string().optional(),
  enableK8sBetaApis: z.object({
    enabledApis: z.array(z.string()),
  }).optional(),
  enableKubernetesAlpha: z.boolean().optional(),
  enableTpu: z.boolean().optional(),
  endpoint: z.string().optional(),
  enterpriseConfig: z.object({
    clusterTier: z.string(),
    desiredTier: z.string(),
  }).optional(),
  etag: z.string().optional(),
  expireTime: z.string().optional(),
  fleet: z.object({
    membership: z.string(),
    membershipType: z.string(),
    preRegistered: z.boolean(),
    project: z.string(),
  }).optional(),
  gkeAutoUpgradeConfig: z.object({
    patchMode: z.string(),
  }).optional(),
  id: z.string().optional(),
  identityServiceConfig: z.object({
    enabled: z.boolean(),
  }).optional(),
  initialClusterVersion: z.string().optional(),
  initialNodeCount: z.number().optional(),
  instanceGroupUrls: z.array(z.string()).optional(),
  ipAllocationPolicy: z.object({
    additionalIpRangesConfigs: z.array(z.object({
      podIpv4RangeNames: z.array(z.string()),
      status: z.string(),
      subnetwork: z.string(),
    })),
    additionalPodRangesConfig: z.object({
      podRangeInfo: z.array(z.object({
        rangeName: z.string(),
        utilization: z.number(),
      })),
      podRangeNames: z.array(z.string()),
    }),
    autoIpamConfig: z.object({
      enabled: z.boolean(),
    }),
    clusterIpv4Cidr: z.string(),
    clusterIpv4CidrBlock: z.string(),
    clusterSecondaryRangeName: z.string(),
    createSubnetwork: z.boolean(),
    defaultPodIpv4RangeUtilization: z.number(),
    ipv6AccessType: z.string(),
    networkTierConfig: z.object({
      networkTier: z.string(),
    }),
    nodeIpv4Cidr: z.string(),
    nodeIpv4CidrBlock: z.string(),
    podCidrOverprovisionConfig: z.object({
      disable: z.boolean(),
    }),
    servicesIpv4Cidr: z.string(),
    servicesIpv4CidrBlock: z.string(),
    servicesIpv6CidrBlock: z.string(),
    servicesSecondaryRangeName: z.string(),
    stackType: z.string(),
    subnetIpv6CidrBlock: z.string(),
    subnetworkName: z.string(),
    tpuIpv4CidrBlock: z.string(),
    useIpAliases: z.boolean(),
    useRoutes: z.boolean(),
  }).optional(),
  labelFingerprint: z.string().optional(),
  legacyAbac: z.object({
    enabled: z.boolean(),
  }).optional(),
  location: z.string().optional(),
  locations: z.array(z.string()).optional(),
  loggingConfig: z.object({
    componentConfig: z.object({
      enableComponents: z.array(z.string()),
    }),
  }).optional(),
  loggingService: z.string().optional(),
  maintenancePolicy: z.object({
    disruptionBudget: z.object({
      lastDisruptionTime: z.string(),
      lastMinorVersionDisruptionTime: z.string(),
      minorVersionDisruptionInterval: z.string(),
      patchVersionDisruptionInterval: z.string(),
    }),
    resourceVersion: z.string(),
    window: z.object({
      dailyMaintenanceWindow: z.object({
        duration: z.string(),
        startTime: z.string(),
      }),
      maintenanceExclusions: z.record(z.string(), z.unknown()),
      recurringMaintenanceWindow: z.object({
        delayUntil: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        recurrence: z.string(),
        windowDuration: z.string(),
        windowStartTime: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
      }),
      recurringWindow: z.object({
        recurrence: z.string(),
        window: z.object({
          endTime: z.string(),
          maintenanceExclusionOptions: z.object({
            endTimeBehavior: z.unknown(),
            scope: z.unknown(),
          }),
          startTime: z.string(),
        }),
      }),
    }),
  }).optional(),
  managedMachineLearningDiagnosticsConfig: z.object({
    enabled: z.boolean(),
  }).optional(),
  managedOpentelemetryConfig: z.object({
    scope: z.string(),
  }).optional(),
  masterAuth: z.object({
    clientCertificate: z.string(),
    clientCertificateConfig: z.object({
      issueClientCertificate: z.boolean(),
    }),
    clientKey: z.string(),
    clusterCaCertificate: z.string(),
    password: z.string(),
    username: z.string(),
  }).optional(),
  masterAuthorizedNetworksConfig: z.object({
    cidrBlocks: z.array(z.object({
      cidrBlock: z.string(),
      displayName: z.string(),
    })),
    enabled: z.boolean(),
    gcpPublicCidrsAccessEnabled: z.boolean(),
    privateEndpointEnforcementEnabled: z.boolean(),
  }).optional(),
  meshCertificates: z.object({
    enableCertificates: z.boolean(),
  }).optional(),
  monitoringConfig: z.object({
    advancedDatapathObservabilityConfig: z.object({
      enableMetrics: z.boolean(),
      enableRelay: z.boolean(),
      relayMode: z.string(),
    }),
    componentConfig: z.object({
      enableComponents: z.array(z.string()),
    }),
    managedPrometheusConfig: z.object({
      autoMonitoringConfig: z.object({
        scope: z.string(),
      }),
      enabled: z.boolean(),
    }),
  }).optional(),
  monitoringService: z.string().optional(),
  name: z.string(),
  network: z.string().optional(),
  networkConfig: z.object({
    datapathProvider: z.string(),
    dataplaneV2Config: z.object({
      scalabilityMode: z.string(),
    }),
    defaultEnablePrivateNodes: z.boolean(),
    defaultSnatStatus: z.object({
      disabled: z.boolean(),
    }),
    disableL4LbFirewallReconciliation: z.boolean(),
    dnsConfig: z.object({
      additiveVpcScopeDnsDomain: z.string(),
      clusterDns: z.string(),
      clusterDnsDomain: z.string(),
      clusterDnsScope: z.string(),
    }),
    enableCiliumClusterwideNetworkPolicy: z.boolean(),
    enableFqdnNetworkPolicy: z.boolean(),
    enableIntraNodeVisibility: z.boolean(),
    enableL4ilbSubsetting: z.boolean(),
    enableMultiNetworking: z.boolean(),
    gatewayApiConfig: z.object({
      channel: z.string(),
    }),
    inTransitEncryptionConfig: z.string(),
    network: z.string(),
    networkPerformanceConfig: z.object({
      totalEgressBandwidthTier: z.string(),
    }),
    privateIpv6GoogleAccess: z.string(),
    serviceExternalIpsConfig: z.object({
      enabled: z.boolean(),
    }),
    subnetwork: z.string(),
  }).optional(),
  networkPolicy: z.object({
    enabled: z.boolean(),
    provider: z.string(),
  }).optional(),
  nodeConfig: z.object({
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
    nodeImageConfig: z.object({
      image: z.string(),
      imageProject: z.string(),
    }),
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
  nodeCreationConfig: z.object({
    nodeCreationMode: z.string(),
  }).optional(),
  nodeIpv4CidrSize: z.number().optional(),
  nodePoolAutoConfig: z.object({
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
    networkTags: z.object({
      tags: z.array(z.string()),
    }),
    nodeKubeletConfig: z.object({
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
    resourceManagerTags: z.object({
      tags: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  nodePoolDefaults: z.object({
    nodeConfigDefaults: z.object({
      containerdConfig: z.object({
        privateRegistryAccessConfig: z.object({
          certificateAuthorityDomainConfig: z.array(z.unknown()),
          enabled: z.boolean(),
        }),
        registryHosts: z.array(z.object({
          hosts: z.unknown(),
          server: z.unknown(),
        })),
        writableCgroups: z.object({
          enabled: z.boolean(),
        }),
      }),
      gcfsConfig: z.object({
        enabled: z.boolean(),
      }),
      loggingConfig: z.object({
        variantConfig: z.object({
          variant: z.string(),
        }),
      }),
      nodeKubeletConfig: z.object({
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
    }),
  }).optional(),
  nodePools: z.array(z.object({
    autopilotConfig: z.object({
      enabled: z.boolean(),
    }),
    autoscaling: z.object({
      autoprovisioned: z.boolean(),
      enabled: z.boolean(),
      locationPolicy: z.string(),
      maxNodeCount: z.number(),
      minNodeCount: z.number(),
      totalMaxNodeCount: z.number(),
      totalMinNodeCount: z.number(),
    }),
    bestEffortProvisioning: z.object({
      enabled: z.boolean(),
      minProvisionNodes: z.number(),
    }),
    conditions: z.array(z.object({
      canonicalCode: z.string(),
      code: z.string(),
      message: z.string(),
    })),
    config: z.object({
      accelerators: z.array(z.object({
        acceleratorCount: z.unknown(),
        acceleratorType: z.unknown(),
        gpuDriverInstallationConfig: z.unknown(),
        gpuPartitionSize: z.unknown(),
        gpuSharingConfig: z.unknown(),
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
          certificateAuthorityDomainConfig: z.unknown(),
          enabled: z.unknown(),
        }),
        registryHosts: z.array(z.unknown()),
        writableCgroups: z.object({
          enabled: z.unknown(),
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
        allowedUnsafeSysctls: z.array(z.unknown()),
        containerLogMaxFiles: z.number(),
        containerLogMaxSize: z.string(),
        cpuCfsQuota: z.boolean(),
        cpuCfsQuotaPeriod: z.string(),
        cpuManagerPolicy: z.string(),
        crashLoopBackOff: z.object({
          maxContainerRestartPeriod: z.unknown(),
        }),
        evictionMaxPodGracePeriodSeconds: z.number(),
        evictionMinimumReclaim: z.object({
          imagefsAvailable: z.unknown(),
          imagefsInodesFree: z.unknown(),
          memoryAvailable: z.unknown(),
          nodefsAvailable: z.unknown(),
          nodefsInodesFree: z.unknown(),
          pidAvailable: z.unknown(),
        }),
        evictionSoft: z.object({
          imagefsAvailable: z.unknown(),
          imagefsInodesFree: z.unknown(),
          memoryAvailable: z.unknown(),
          nodefsAvailable: z.unknown(),
          nodefsInodesFree: z.unknown(),
          pidAvailable: z.unknown(),
        }),
        evictionSoftGracePeriod: z.object({
          imagefsAvailable: z.unknown(),
          imagefsInodesFree: z.unknown(),
          memoryAvailable: z.unknown(),
          nodefsAvailable: z.unknown(),
          nodefsInodesFree: z.unknown(),
          pidAvailable: z.unknown(),
        }),
        imageGcHighThresholdPercent: z.number(),
        imageGcLowThresholdPercent: z.number(),
        imageMaximumGcAge: z.string(),
        imageMinimumGcAge: z.string(),
        insecureKubeletReadonlyPortEnabled: z.boolean(),
        maxParallelImagePulls: z.number(),
        memoryManager: z.object({
          policy: z.unknown(),
        }),
        podPidsLimit: z.string(),
        shutdownGracePeriodCriticalPodsSeconds: z.number(),
        shutdownGracePeriodSeconds: z.number(),
        singleProcessOomKill: z.boolean(),
        topologyManager: z.object({
          policy: z.unknown(),
          scope: z.unknown(),
        }),
      }),
      labels: z.record(z.string(), z.unknown()),
      linuxNodeConfig: z.object({
        accurateTimeConfig: z.object({
          enablePtpKvmTimeSync: z.unknown(),
        }),
        cgroupMode: z.string(),
        customNodeInit: z.object({
          initScript: z.unknown(),
        }),
        hugepages: z.object({
          hugepageSize1g: z.unknown(),
          hugepageSize2m: z.unknown(),
        }),
        nodeKernelModuleLoading: z.object({
          policy: z.unknown(),
        }),
        swapConfig: z.object({
          bootDiskProfile: z.unknown(),
          dedicatedLocalSsdProfile: z.unknown(),
          enabled: z.unknown(),
          encryptionConfig: z.unknown(),
          ephemeralLocalSsdProfile: z.unknown(),
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
          variant: z.unknown(),
        }),
      }),
      machineType: z.string(),
      maxRunDuration: z.string(),
      metadata: z.record(z.string(), z.unknown()),
      minCpuPlatform: z.string(),
      nodeGroup: z.string(),
      nodeImageConfig: z.object({
        image: z.string(),
        imageProject: z.string(),
      }),
      oauthScopes: z.array(z.string()),
      preemptible: z.boolean(),
      reservationAffinity: z.object({
        consumeReservationType: z.string(),
        key: z.string(),
        values: z.array(z.unknown()),
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
        diskImage: z.unknown(),
        mode: z.unknown(),
      })),
      serviceAccount: z.string(),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean(),
        enableSecureBoot: z.boolean(),
      }),
      soleTenantConfig: z.object({
        minNodeCpus: z.number(),
        nodeAffinities: z.array(z.unknown()),
      }),
      spot: z.boolean(),
      storagePools: z.array(z.string()),
      tags: z.array(z.string()),
      taintConfig: z.object({
        architectureTaintBehavior: z.string(),
      }),
      taints: z.array(z.object({
        effect: z.unknown(),
        key: z.unknown(),
        value: z.unknown(),
      })),
      windowsNodeConfig: z.object({
        osVersion: z.string(),
      }),
      workloadMetadataConfig: z.object({
        mode: z.string(),
      }),
    }),
    etag: z.string(),
    initialNodeCount: z.number(),
    instanceGroupUrls: z.array(z.string()),
    locations: z.array(z.string()),
    maintenancePolicy: z.object({
      exclusionUntilEndOfSupport: z.object({
        enabled: z.boolean(),
        endTime: z.string(),
        startTime: z.string(),
      }),
    }),
    management: z.object({
      autoRepair: z.boolean(),
      autoUpgrade: z.boolean(),
      upgradeOptions: z.object({
        autoUpgradeStartTime: z.string(),
        description: z.string(),
      }),
    }),
    maxPodsConstraint: z.object({
      maxPodsPerNode: z.string(),
    }),
    name: z.string(),
    networkConfig: z.object({
      acceleratorNetworkProfile: z.string(),
      additionalNodeNetworkConfigs: z.array(z.object({
        network: z.unknown(),
        subnetwork: z.unknown(),
      })),
      additionalPodNetworkConfigs: z.array(z.object({
        maxPodsPerNode: z.unknown(),
        networkAttachment: z.unknown(),
        secondaryPodRange: z.unknown(),
        subnetwork: z.unknown(),
      })),
      createPodRange: z.boolean(),
      enablePrivateNodes: z.boolean(),
      network: z.string(),
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
    }),
    nodeDrainConfig: z.object({
      graceTerminationDuration: z.string(),
      pdbTimeoutDuration: z.string(),
      respectPdbDuringNodePoolDeletion: z.boolean(),
    }),
    placementPolicy: z.object({
      policyName: z.string(),
      tpuTopology: z.string(),
      type: z.string(),
    }),
    podIpv4CidrSize: z.number(),
    queuedProvisioning: z.object({
      enabled: z.boolean(),
    }),
    selfLink: z.string(),
    status: z.string(),
    statusMessage: z.string(),
    updateInfo: z.object({
      blueGreenInfo: z.object({
        blueInstanceGroupUrls: z.array(z.unknown()),
        bluePoolDeletionStartTime: z.string(),
        greenInstanceGroupUrls: z.array(z.unknown()),
        greenPoolVersion: z.string(),
        phase: z.string(),
      }),
    }),
    upgradeSettings: z.object({
      blueGreenSettings: z.object({
        autoscaledRolloutPolicy: z.object({
          waitForDrainDuration: z.unknown(),
        }),
        nodePoolSoakDuration: z.string(),
        standardRolloutPolicy: z.object({
          batchNodeCount: z.unknown(),
          batchPercentage: z.unknown(),
          batchSoakDuration: z.unknown(),
        }),
      }),
      maxSurge: z.number(),
      maxUnavailable: z.number(),
      strategy: z.string(),
    }),
    version: z.string(),
  })).optional(),
  notificationConfig: z.object({
    pubsub: z.object({
      enabled: z.boolean(),
      filter: z.object({
        eventType: z.array(z.string()),
      }),
      topic: z.string(),
    }),
  }).optional(),
  parentProductConfig: z.object({
    labels: z.record(z.string(), z.unknown()),
    productName: z.string(),
  }).optional(),
  podAutoscaling: z.object({
    hpaProfile: z.string(),
  }).optional(),
  privateClusterConfig: z.object({
    enablePrivateEndpoint: z.boolean(),
    enablePrivateNodes: z.boolean(),
    masterGlobalAccessConfig: z.object({
      enabled: z.boolean(),
    }),
    masterIpv4CidrBlock: z.string(),
    peeringName: z.string(),
    privateEndpoint: z.string(),
    privateEndpointSubnetwork: z.string(),
    publicEndpoint: z.string(),
  }).optional(),
  rbacBindingConfig: z.object({
    enableInsecureBindingSystemAuthenticated: z.boolean(),
    enableInsecureBindingSystemUnauthenticated: z.boolean(),
  }).optional(),
  releaseChannel: z.object({
    channel: z.string(),
  }).optional(),
  resourceLabels: z.record(z.string(), z.unknown()).optional(),
  resourceUsageExportConfig: z.object({
    bigqueryDestination: z.object({
      datasetId: z.string(),
    }),
    consumptionMeteringConfig: z.object({
      enabled: z.boolean(),
    }),
    enableNetworkEgressMetering: z.boolean(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  scheduleUpgradeConfig: z.object({
    enabled: z.boolean(),
  }).optional(),
  secretManagerConfig: z.object({
    enabled: z.boolean(),
    rotationConfig: z.object({
      enabled: z.boolean(),
      rotationInterval: z.string(),
    }),
  }).optional(),
  secretSyncConfig: z.object({
    enabled: z.boolean(),
    rotationConfig: z.object({
      enabled: z.boolean(),
      rotationInterval: z.string(),
    }),
  }).optional(),
  securityPostureConfig: z.object({
    mode: z.string(),
    vulnerabilityMode: z.string(),
  }).optional(),
  selfLink: z.string().optional(),
  servicesIpv4Cidr: z.string().optional(),
  shieldedNodes: z.object({
    enabled: z.boolean(),
  }).optional(),
  status: z.string().optional(),
  statusMessage: z.string().optional(),
  subnetwork: z.string().optional(),
  tpuIpv4CidrBlock: z.string().optional(),
  userManagedKeysConfig: z.object({
    aggregationCa: z.string(),
    clusterCa: z.string(),
    controlPlaneDiskEncryptionKey: z.string(),
    controlPlaneDiskEncryptionKeyVersions: z.array(z.string()),
    etcdApiCa: z.string(),
    etcdPeerCa: z.string(),
    gkeopsEtcdBackupEncryptionKey: z.string(),
    serviceAccountSigningKeys: z.array(z.string()),
    serviceAccountVerificationKeys: z.array(z.string()),
  }).optional(),
  verticalPodAutoscaling: z.object({
    enabled: z.boolean(),
  }).optional(),
  workloadIdentityConfig: z.object({
    workloadPool: z.string(),
  }).optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  cluster: z.object({
    addonsConfig: z.object({
      agentSandboxConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether AgentSandbox is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the AgentSandbox addon.").optional(),
      cloudRunConfig: z.object({
        disabled: z.boolean().describe(
          "Whether Cloud Run addon is enabled for this cluster.",
        ).optional(),
        loadBalancerType: z.enum([
          "LOAD_BALANCER_TYPE_UNSPECIFIED",
          "LOAD_BALANCER_TYPE_EXTERNAL",
          "LOAD_BALANCER_TYPE_INTERNAL",
        ]).describe("Which load balancer type is installed for Cloud Run.")
          .optional(),
      }).describe("Configuration options for the Cloud Run feature.")
        .optional(),
      configConnectorConfig: z.object({
        enabled: z.boolean().describe(
          "Whether Cloud Connector is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration options for the Config Connector add-on.")
        .optional(),
      dnsCacheConfig: z.object({
        enabled: z.boolean().describe(
          "Whether NodeLocal DNSCache is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for NodeLocal DNSCache").optional(),
      gcePersistentDiskCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Compute Engine PD CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Compute Engine PD CSI driver.")
        .optional(),
      gcpFilestoreCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Filestore CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Filestore CSI driver.").optional(),
      gcsFuseCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Cloud Storage Fuse CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Cloud Storage Fuse CSI driver.")
        .optional(),
      gkeBackupAgentConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Backup for GKE agent is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Backup for GKE Agent.").optional(),
      highScaleCheckpointingConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the High Scale Checkpointing is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the High Scale Checkpointing.").optional(),
      horizontalPodAutoscaling: z.object({
        disabled: z.boolean().describe(
          "Whether the Horizontal Pod Autoscaling feature is enabled in the cluster. When enabled, it ensures that metrics are collected into Stackdriver Monitoring.",
        ).optional(),
      }).describe(
        "Configuration options for the horizontal pod autoscaling feature, which increases or decreases the number of replica pods a replication controller has based on the resource usage of the existing pods.",
      ).optional(),
      httpLoadBalancing: z.object({
        disabled: z.boolean().describe(
          "Whether the HTTP Load Balancing controller is enabled in the cluster. When enabled, it runs a small pod in the cluster that manages the load balancers.",
        ).optional(),
      }).describe(
        "Configuration options for the HTTP (L7) load balancing controller addon, which makes it easy to set up HTTP load balancers for services in a cluster.",
      ).optional(),
      kubernetesDashboard: z.object({
        disabled: z.boolean().describe(
          "Whether the Kubernetes Dashboard is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Kubernetes Dashboard.").optional(),
      lustreCsiDriverConfig: z.object({
        disableMultiNic: z.boolean().describe(
          "When set to true, this disables multi-NIC support for the Lustre CSI driver. By default, GKE enables multi-NIC support, which allows the Lustre CSI driver to automatically detect and configure all suitable network interfaces on a node to maximize I/O performance for demanding workloads.",
        ).optional(),
        enableLegacyLustrePort: z.boolean().describe(
          "If set to true, the Lustre CSI driver will install Lustre kernel modules using port 6988. This serves as a workaround for a port conflict with the gke-metadata-server. This field is required ONLY under the following conditions: 1. The GKE node version is older than 1.33.2-gke.4655000. 2. You're connecting to a Lustre instance that has the 'gke-support-enabled' flag. Deprecated: This flag is no longer required as of GKE node version 1.33.2-gke.4655000, unless you are connecting to a Lustre instance that has the `gke-support-enabled` flag.",
        ).optional(),
        enabled: z.boolean().describe(
          "Whether the Lustre CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Lustre CSI driver.").optional(),
      networkPolicyConfig: z.object({
        disabled: z.boolean().describe(
          "Whether NetworkPolicy is enabled for this cluster.",
        ).optional(),
      }).describe(
        "Configuration for NetworkPolicy. This only tracks whether the addon is enabled or not on the Master, it does not track whether network policy is enabled for the nodes.",
      ).optional(),
      nodeReadinessConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether the GKE Node Readiness Controller is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the GKE Node Readiness Controller.")
        .optional(),
      parallelstoreCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Cloud Storage Parallelstore CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe(
        "Configuration for the Cloud Storage Parallelstore CSI driver.",
      ).optional(),
      podSnapshotConfig: z.object({
        enabled: z.boolean().describe(
          "Whether or not the Pod Snapshots feature is enabled.",
        ).optional(),
      }).describe(
        "PodSnapshotConfig is the configuration for GKE Pod Snapshots feature.",
      ).optional(),
      rayOperatorConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Ray Operator addon is enabled for this cluster.",
        ).optional(),
        rayClusterLoggingConfig: z.object({
          enabled: z.boolean().describe(
            "Enable log collection for Ray clusters.",
          ).optional(),
        }).describe(
          "RayClusterLoggingConfig specifies configuration of Ray logging.",
        ).optional(),
        rayClusterMonitoringConfig: z.object({
          enabled: z.boolean().describe(
            "Enable metrics collection for Ray clusters.",
          ).optional(),
        }).describe(
          "RayClusterMonitoringConfig specifies monitoring configuration for Ray clusters.",
        ).optional(),
      }).describe("Configuration options for the Ray Operator add-on.")
        .optional(),
      sliceControllerConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Indicates whether Slice Controller is enabled in the cluster.",
        ).optional(),
      }).describe("Configuration for the Slice Controller.").optional(),
      slurmOperatorConfig: z.object({
        enabled: z.boolean().describe(
          "When enabled, it runs a Slurm Operator that manages the set of compute pods for Slurm Cluster.",
        ).optional(),
      }).describe("Configuration for the Slurm Operator.").optional(),
      statefulHaConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Stateful HA add-on is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Stateful HA add-on.").optional(),
    }).describe(
      "Configuration for the addons that can be automatically spun up in the cluster, enabling additional functionality.",
    ).optional(),
    alphaClusterFeatureGates: z.array(z.string()).describe(
      'The list of user specified Kubernetes feature gates. Each string represents the activation status of a feature gate (e.g. "featureX=true" or "featureX=false")',
    ).optional(),
    anonymousAuthenticationConfig: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "ENABLED", "LIMITED"]).describe(
        "Defines the mode of limiting anonymous access in the cluster.",
      ).optional(),
    }).describe(
      "AnonymousAuthenticationConfig defines the settings needed to limit endpoints that allow anonymous authentication.",
    ).optional(),
    authenticatorGroupsConfig: z.object({
      enabled: z.boolean().describe(
        "Whether this cluster should return group membership lookups during authentication using a group of security groups.",
      ).optional(),
      securityGroup: z.string().describe(
        "The name of the security group-of-groups to be used. Only relevant if enabled = true.",
      ).optional(),
    }).describe(
      "Configuration for returning group information from authenticators.",
    ).optional(),
    autopilot: z.object({
      clusterPolicyConfig: z.object({
        noStandardNodePools: z.boolean().describe(
          "Denotes preventing standard node pools and requiring only autopilot node pools.",
        ).optional(),
        noSystemImpersonation: z.boolean().describe(
          "Denotes preventing impersonation and CSRs for GKE System users.",
        ).optional(),
        noSystemMutation: z.boolean().describe(
          "Denotes that preventing creation and mutation of resources in GKE managed namespaces and cluster-scoped GKE managed resources.",
        ).optional(),
        noUnsafeWebhooks: z.boolean().describe(
          "Denotes preventing unsafe webhooks.",
        ).optional(),
      }).describe(
        "ClusterPolicyConfig stores the configuration for cluster wide policies.",
      ).optional(),
      enabled: z.boolean().describe("Enable Autopilot").optional(),
      privilegedAdmissionConfig: z.object({
        allowlistPaths: z.array(z.string()).describe(
          "The customer allowlist Cloud Storage paths for the cluster. These paths are used with the `--autopilot-privileged-admission` flag to authorize privileged workloads in Autopilot clusters. Paths can be GKE-owned, in the format `gke:////`, or customer-owned, in the format `gs:///`. Wildcards (`*`) are supported to authorize all allowlists under specific paths or directories. Example: `gs://my-bucket/*` will authorize all allowlists under the `my-bucket` bucket.",
        ).optional(),
      }).describe(
        "PrivilegedAdmissionConfig stores the list of authorized allowlist paths for the cluster.",
      ).optional(),
      workloadPolicyConfig: z.object({
        allowNetAdmin: z.boolean().describe(
          "If true, workloads can use NET_ADMIN capability.",
        ).optional(),
        autopilotCompatibilityAuditingEnabled: z.boolean().describe(
          "If true, enables the GCW Auditor that audits workloads on standard clusters.",
        ).optional(),
      }).describe(
        "WorkloadPolicyConfig is the configuration related to GCW workload policy",
      ).optional(),
    }).describe(
      "Autopilot is the configuration for Autopilot settings on the cluster.",
    ).optional(),
    autoscaling: z.object({
      autopilotGeneralProfile: z.enum([
        "AUTOPILOT_GENERAL_PROFILE_UNSPECIFIED",
        "NO_PERFORMANCE",
        "NONE",
      ]).describe(
        "Autopilot general profile for the cluster, which defines the configuration for the cluster.",
      ).optional(),
      autoprovisioningLocations: z.array(z.string()).describe(
        "The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the NodePool's nodes can be created by NAP.",
      ).optional(),
      autoprovisioningNodePoolDefaults: z.object({
        bootDiskKmsKey: z.string().describe(
          "The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption",
        ).optional(),
        diskSizeGb: z.number().int().describe(
          "Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 10GB. If unspecified, the default disk size is 100GB.",
        ).optional(),
        diskType: z.string().describe(
          "Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard'",
        ).optional(),
        imageType: z.string().describe(
          "The image type to use for NAP created node. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types.",
        ).optional(),
        insecureKubeletReadonlyPortEnabled: z.boolean().describe(
          "DEPRECATED. Use NodePoolAutoConfig.NodeKubeletConfig instead.",
        ).optional(),
        management: z.object({
          autoRepair: z.boolean().describe(
            "A flag that specifies whether the node auto-repair is enabled for the node pool. If enabled, the nodes in this node pool will be monitored and, if they fail health checks too many times, an automatic repair action will be triggered.",
          ).optional(),
          autoUpgrade: z.boolean().describe(
            "A flag that specifies whether node auto-upgrade is enabled for the node pool. If enabled, node auto-upgrade helps keep the nodes in your node pool up to date with the latest release version of Kubernetes.",
          ).optional(),
          upgradeOptions: z.object({
            autoUpgradeStartTime: z.unknown().describe(
              "Output only. This field is set when upgrades are about to commence with the approximate start time for the upgrades, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
            ).optional(),
            description: z.unknown().describe(
              "Output only. This field is set when upgrades are about to commence with the description of the upgrade.",
            ).optional(),
          }).describe(
            "AutoUpgradeOptions defines the set of options for the user to control how the Auto Upgrades will proceed.",
          ).optional(),
        }).describe(
          "NodeManagement defines the set of node management services turned on for the node pool.",
        ).optional(),
        minCpuPlatform: z.string().describe(
          'Deprecated. Minimum CPU platform to be used for NAP created node pools. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: Intel Haswell or minCpuPlatform: Intel Sandy Bridge. For more information, read [how to specify min CPU platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform). This field is deprecated, min_cpu_platform should be specified using `cloud.google.com/requested-min-cpu-platform` label selector on the pod. To unset the min cpu platform field pass "automatic" as field value.',
        ).optional(),
        oauthScopes: z.array(z.string()).describe(
          "Scopes that are used by NAP when creating node pools.",
        ).optional(),
        serviceAccount: z.string().describe(
          "The Google Cloud Platform Service Account to be used by the node VMs.",
        ).optional(),
        shieldedInstanceConfig: z.object({
          enableIntegrityMonitoring: z.boolean().describe(
            "Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created.",
          ).optional(),
          enableSecureBoot: z.boolean().describe(
            "Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails.",
          ).optional(),
        }).describe("A set of Shielded Instance options.").optional(),
        upgradeSettings: z.object({
          blueGreenSettings: z.object({
            autoscaledRolloutPolicy: z.unknown().describe(
              "Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.",
            ).optional(),
            nodePoolSoakDuration: z.unknown().describe(
              "Time needed after draining entire blue pool. After this period, blue pool will be cleaned up.",
            ).optional(),
            standardRolloutPolicy: z.unknown().describe(
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
      }).describe(
        "AutoprovisioningNodePoolDefaults contains defaults for a node pool created by NAP.",
      ).optional(),
      autoscalingProfile: z.enum([
        "PROFILE_UNSPECIFIED",
        "OPTIMIZE_UTILIZATION",
        "BALANCED",
      ]).describe("Defines autoscaling behaviour.").optional(),
      defaultComputeClassConfig: z.object({
        enabled: z.boolean().describe("Enables default compute class.")
          .optional(),
      }).describe(
        "DefaultComputeClassConfig defines default compute class configuration.",
      ).optional(),
      enableNodeAutoprovisioning: z.boolean().describe(
        "Enables automatic node pool creation and deletion.",
      ).optional(),
      resourceLimits: z.array(z.object({
        maximum: z.string().describe(
          "Maximum amount of the resource in the cluster.",
        ).optional(),
        minimum: z.string().describe(
          "Minimum amount of the resource in the cluster.",
        ).optional(),
        resourceType: z.string().describe(
          'Resource name "cpu", "memory" or gpu-specific string.',
        ).optional(),
      })).describe(
        "Contains global constraints regarding minimum and maximum amount of resources in the cluster.",
      ).optional(),
    }).describe(
      "ClusterAutoscaling contains global, per-cluster information required by Cluster Autoscaler to automatically adjust the size of the cluster and create/delete node pools based on the current needs.",
    ).optional(),
    binaryAuthorization: z.object({
      enabled: z.boolean().describe(
        "This field is deprecated. Leave this unset and instead configure BinaryAuthorization using evaluation_mode. If evaluation_mode is set to anything other than EVALUATION_MODE_UNSPECIFIED, this field is ignored.",
      ).optional(),
      evaluationMode: z.enum([
        "EVALUATION_MODE_UNSPECIFIED",
        "DISABLED",
        "PROJECT_SINGLETON_POLICY_ENFORCE",
      ]).describe(
        "Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED.",
      ).optional(),
    }).describe("Configuration for Binary Authorization.").optional(),
    clusterIpv4Cidr: z.string().describe(
      "The IP address range of the container pods in this cluster, in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`). Leave blank to have one automatically chosen or specify a `/14` block in `10.0.0.0/8`.",
    ).optional(),
    compliancePostureConfig: z.object({
      complianceStandards: z.array(z.object({
        standard: z.string().describe("Name of the compliance standard.")
          .optional(),
      })).describe("List of enabled compliance standards.").optional(),
      mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "ENABLED"]).describe(
        "Defines the enablement mode for Compliance Posture.",
      ).optional(),
    }).describe(
      "Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. CompliancePostureConfig defines the settings needed to enable/disable features for the Compliance Posture.",
    ).optional(),
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
    })).describe("Which conditions caused the current cluster state.")
      .optional(),
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
    controlPlaneEgress: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "VIA_CONTROL_PLANE", "NONE"]).describe(
        "Defines the mode of control plane egress.",
      ).optional(),
    }).describe(
      "ControlPlaneEgress defines the settings needed to enable control plane egress control.",
    ).optional(),
    controlPlaneEndpointsConfig: z.object({
      dnsEndpointConfig: z.object({
        allowExternalTraffic: z.boolean().describe(
          "Controls whether user traffic is allowed over this endpoint. Note that Google-managed services may still use the endpoint even if this is false.",
        ).optional(),
        enableK8sCertsViaDns: z.boolean().describe(
          "Controls whether the k8s certs auth is allowed via DNS.",
        ).optional(),
        enableK8sTokensViaDns: z.boolean().describe(
          "Controls whether the k8s token auth is allowed via DNS.",
        ).optional(),
        endpoint: z.string().describe(
          "Output only. The cluster's DNS endpoint configuration. A DNS format address. This is accessible from the public internet. Ex: uid.us-central1.gke.goog. Always present, but the behavior may change according to the value of DNSEndpointConfig.allow_external_traffic.",
        ).optional(),
      }).describe("Describes the configuration of a DNS endpoint.").optional(),
      ipEndpointsConfig: z.object({
        authorizedNetworksConfig: z.object({
          cidrBlocks: z.array(z.unknown()).describe(
            "cidr_blocks define up to 50 external networks that could access Kubernetes master through HTTPS.",
          ).optional(),
          enabled: z.boolean().describe(
            "Whether or not master authorized networks is enabled.",
          ).optional(),
          gcpPublicCidrsAccessEnabled: z.boolean().describe(
            "Whether master is accessible via Google Compute Engine Public IP addresses.",
          ).optional(),
          privateEndpointEnforcementEnabled: z.boolean().describe(
            "Whether master authorized networks is enforced on private endpoint or not.",
          ).optional(),
        }).describe(
          "Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.",
        ).optional(),
        enablePublicEndpoint: z.boolean().describe(
          "Controls whether the control plane allows access through a public IP. It is invalid to specify both PrivateClusterConfig.enablePrivateEndpoint and this field at the same time.",
        ).optional(),
        enabled: z.boolean().describe(
          "Controls whether to allow direct IP access.",
        ).optional(),
        globalAccess: z.boolean().describe(
          "Controls whether the control plane's private endpoint is accessible from sources in other regions. It is invalid to specify both PrivateClusterMasterGlobalAccessConfig.enabled and this field at the same time.",
        ).optional(),
        privateEndpoint: z.string().describe(
          "Output only. The internal IP address of this cluster's control plane. Only populated if enabled.",
        ).optional(),
        privateEndpointSubnetwork: z.string().describe(
          "Subnet to provision the master's private endpoint during cluster creation. Specified in projects/*/regions/*/subnetworks/* format. It is invalid to specify both PrivateClusterConfig.privateEndpointSubnetwork and this field at the same time.",
        ).optional(),
        publicEndpoint: z.string().describe(
          "Output only. The external IP address of this cluster's control plane. Only populated if enabled.",
        ).optional(),
      }).describe("IP endpoints configuration.").optional(),
    }).describe(
      "Configuration for all of the cluster's control plane endpoints.",
    ).optional(),
    costManagementConfig: z.object({
      enabled: z.boolean().describe("Whether the feature is enabled or not.")
        .optional(),
    }).describe("Configuration for fine-grained cost management feature.")
      .optional(),
    createTime: z.string().describe(
      "Output only. The time the cluster was created, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
    ).optional(),
    currentMasterVersion: z.string().describe(
      "Output only. The current software version of the master endpoint.",
    ).optional(),
    currentNodeCount: z.number().int().describe(
      "Output only. The number of nodes currently in the cluster. Deprecated. Call Kubernetes API directly to retrieve node information.",
    ).optional(),
    currentNodeVersion: z.string().describe(
      "Output only. Deprecated, use [NodePools.version](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools) instead. The current version of the node software components. If they are currently at multiple versions because they're in the process of being upgraded, this reflects the minimum version of all nodes.",
    ).optional(),
    databaseEncryption: z.object({
      currentState: z.enum([
        "CURRENT_STATE_UNSPECIFIED",
        "CURRENT_STATE_ENCRYPTED",
        "CURRENT_STATE_DECRYPTED",
        "CURRENT_STATE_ENCRYPTION_PENDING",
        "CURRENT_STATE_ENCRYPTION_ERROR",
        "CURRENT_STATE_DECRYPTION_PENDING",
        "CURRENT_STATE_DECRYPTION_ERROR",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_ENABLED",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_PENDING",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_ERROR",
      ]).describe("Output only. The current state of etcd encryption.")
        .optional(),
      decryptionKeys: z.array(z.string()).describe(
        "Output only. Keys in use by the cluster for decrypting existing objects, in addition to the key in `key_name`. Each item is a CloudKMS key resource.",
      ).optional(),
      keyName: z.string().describe(
        "Name of CloudKMS key to use for the encryption of secrets in etcd. Ex. projects/my-project/locations/global/keyRings/my-ring/cryptoKeys/my-key",
      ).optional(),
      lastOperationErrors: z.array(z.object({
        errorMessage: z.string().describe(
          "Description of the error seen during the operation.",
        ).optional(),
        keyName: z.string().describe(
          "CloudKMS key resource that had the error.",
        ).optional(),
        timestamp: z.string().describe("Time when the CloudKMS error was seen.")
          .optional(),
      })).describe(
        "Output only. Records errors seen during DatabaseEncryption update operations.",
      ).optional(),
      state: z.enum([
        "UNKNOWN",
        "ENCRYPTED",
        "DECRYPTED",
        "ALL_OBJECTS_ENCRYPTION_ENABLED",
      ]).describe("The desired state of etcd encryption.").optional(),
    }).describe("Configuration of etcd encryption.").optional(),
    defaultMaxPodsConstraint: z.object({
      maxPodsPerNode: z.string().describe(
        "Constraint enforced on the max num of pods per node.",
      ).optional(),
    }).describe("Constraints applied to pods.").optional(),
    description: z.string().describe("An optional description of this cluster.")
      .optional(),
    enableK8sBetaApis: z.object({
      enabledApis: z.array(z.string()).describe("Enabled k8s beta APIs.")
        .optional(),
    }).describe("K8sBetaAPIConfig, configuration for beta APIs").optional(),
    enableKubernetesAlpha: z.boolean().describe(
      "Kubernetes alpha features are enabled on this cluster. This includes alpha API groups (e.g. v1alpha1) and features that may not be production ready in the kubernetes version of the master and nodes. The cluster has no SLA for uptime and master/node upgrades are disabled. Alpha enabled clusters are automatically deleted thirty days after creation.",
    ).optional(),
    enableTpu: z.boolean().describe(
      "Enable the ability to use Cloud TPUs in this cluster. This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25.",
    ).optional(),
    endpoint: z.string().describe(
      "Output only. The IP address of this cluster's master endpoint. The endpoint can be accessed from the internet at `https://username:password@endpoint/`. See the `masterAuth` property of this resource for username and password information.",
    ).optional(),
    enterpriseConfig: z.object({
      clusterTier: z.enum([
        "CLUSTER_TIER_UNSPECIFIED",
        "STANDARD",
        "ENTERPRISE",
      ]).describe(
        "Output only. cluster_tier indicates the effective tier of the cluster.",
      ).optional(),
      desiredTier: z.enum([
        "CLUSTER_TIER_UNSPECIFIED",
        "STANDARD",
        "ENTERPRISE",
      ]).describe("desired_tier specifies the desired tier of the cluster.")
        .optional(),
    }).describe(
      "EnterpriseConfig is the cluster enterprise configuration. Deprecated: GKE Enterprise features are now available without an Enterprise tier.",
    ).optional(),
    etag: z.string().describe(
      "This checksum is computed by the server based on the value of cluster fields, and may be sent on update requests to ensure the client has an up-to-date value before proceeding.",
    ).optional(),
    expireTime: z.string().describe(
      "Output only. The time the cluster will be automatically deleted in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
    ).optional(),
    fleet: z.object({
      membership: z.string().describe(
        "Output only. The full resource name of the registered fleet membership of the cluster, in the format `//gkehub.googleapis.com/projects/*/locations/*/memberships/*`.",
      ).optional(),
      membershipType: z.enum(["MEMBERSHIP_TYPE_UNSPECIFIED", "LIGHTWEIGHT"])
        .describe("The type of the cluster's fleet membership.").optional(),
      preRegistered: z.boolean().describe(
        "Output only. Whether the cluster has been registered through the fleet API.",
      ).optional(),
      project: z.string().describe(
        "The Fleet host project(project ID or project number) where this cluster will be registered to. This field cannot be changed after the cluster has been registered.",
      ).optional(),
    }).describe("Fleet is the fleet configuration for the cluster.").optional(),
    gkeAutoUpgradeConfig: z.object({
      patchMode: z.enum(["PATCH_MODE_UNSPECIFIED", "ACCELERATED"]).describe(
        "PatchMode specifies how auto upgrade patch builds should be selected.",
      ).optional(),
    }).describe(
      "GkeAutoUpgradeConfig is the configuration for GKE auto upgrades.",
    ).optional(),
    id: z.string().describe("Output only. Unique id for the cluster.")
      .optional(),
    identityServiceConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable the Identity Service component",
      ).optional(),
    }).describe(
      "IdentityServiceConfig is configuration for Identity Service which allows customers to use external identity providers with the K8S API",
    ).optional(),
    initialClusterVersion: z.string().describe(
      'The initial Kubernetes version for this cluster. Valid versions are those found in validMasterVersions returned by getServerConfig. The version can be upgraded over time; such upgrades are reflected in currentMasterVersion and currentNodeVersion. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "","-": picks the default Kubernetes version',
    ).optional(),
    initialNodeCount: z.number().int().describe(
      'The number of nodes to create in this cluster. You must ensure that your Compute Engine [resource quota](https://cloud.google.com/compute/quotas) is sufficient for this number of instances. You must also have available firewall and routes quota. For requests, this field should only be used in lieu of a "node_pool" object, since this configuration (along with the "node_config") will be used to create a "NodePool" object with an auto-generated name. Do not use this and a node_pool at the same time. This field is deprecated, use node_pool.initial_node_count instead.',
    ).optional(),
    instanceGroupUrls: z.array(z.string()).describe(
      "Output only. Deprecated. Use node_pools.instance_group_urls.",
    ).optional(),
    ipAllocationPolicy: z.object({
      additionalIpRangesConfigs: z.array(z.object({
        podIpv4RangeNames: z.array(z.unknown()).describe(
          "List of secondary ranges names within this subnetwork that can be used for pod IPs. Example1: gke-pod-range1 Example2: gke-pod-range1,gke-pod-range2",
        ).optional(),
        status: z.enum(["STATUS_UNSPECIFIED", "ACTIVE", "DRAINING"]).describe(
          "Draining status of the additional subnet.",
        ).optional(),
        subnetwork: z.string().describe(
          "Name of the subnetwork. This can be the full path of the subnetwork or just the name. Example1: my-subnet Example2: projects/gke-project/regions/us-central1/subnetworks/my-subnet",
        ).optional(),
      })).describe(
        "Output only. The additional IP ranges that are added to the cluster. These IP ranges can be used by new node pools to allocate node and pod IPs automatically. Each AdditionalIPRangesConfig corresponds to a single subnetwork. Once a range is removed it will not show up in IPAllocationPolicy.",
      ).optional(),
      additionalPodRangesConfig: z.object({
        podRangeInfo: z.array(z.object({
          rangeName: z.unknown().describe("Output only. Name of a range.")
            .optional(),
          utilization: z.unknown().describe(
            "Output only. The utilization of the range.",
          ).optional(),
        })).describe("Output only. Information for additional pod range.")
          .optional(),
        podRangeNames: z.array(z.string()).describe(
          "Name for pod secondary ipv4 range which has the actual range defined ahead.",
        ).optional(),
      }).describe(
        "AdditionalPodRangesConfig is the configuration for additional pod secondary ranges supporting the ClusterUpdate message.",
      ).optional(),
      autoIpamConfig: z.object({
        enabled: z.boolean().describe(
          "The flag that enables Auto IPAM on this cluster",
        ).optional(),
      }).describe(
        "AutoIpamConfig contains all information related to Auto IPAM",
      ).optional(),
      clusterIpv4Cidr: z.string().describe(
        "This field is deprecated, use cluster_ipv4_cidr_block.",
      ).optional(),
      clusterIpv4CidrBlock: z.string().describe(
        "The IP address range for the cluster pod IPs. If this field is set, then `cluster.cluster_ipv4_cidr` must be left blank. This field is only applicable when `use_ip_aliases` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.",
      ).optional(),
      clusterSecondaryRangeName: z.string().describe(
        "The name of the secondary range to be used for the cluster CIDR block. The secondary range will be used for pod IP addresses. This must be an existing secondary range associated with the cluster subnetwork. This field is only applicable with use_ip_aliases is true and create_subnetwork is false.",
      ).optional(),
      createSubnetwork: z.boolean().describe(
        "Whether a new subnetwork will be created automatically for the cluster. This field is only applicable when `use_ip_aliases` is true.",
      ).optional(),
      defaultPodIpv4RangeUtilization: z.number().describe(
        "Output only. The utilization of the cluster default IPv4 range for the pod. The ratio is Usage/[Total number of IPs in the secondary range], Usage=numNodes*numZones*podIPsPerNode.",
      ).optional(),
      ipv6AccessType: z.enum([
        "IPV6_ACCESS_TYPE_UNSPECIFIED",
        "INTERNAL",
        "EXTERNAL",
      ]).describe(
        "The ipv6 access type (internal or external) when create_subnetwork is true",
      ).optional(),
      networkTierConfig: z.object({
        networkTier: z.enum([
          "NETWORK_TIER_UNSPECIFIED",
          "NETWORK_TIER_DEFAULT",
          "NETWORK_TIER_PREMIUM",
          "NETWORK_TIER_STANDARD",
        ]).describe("Network tier configuration.").optional(),
      }).describe("NetworkTierConfig contains network tier information.")
        .optional(),
      nodeIpv4Cidr: z.string().describe(
        "This field is deprecated, use node_ipv4_cidr_block.",
      ).optional(),
      nodeIpv4CidrBlock: z.string().describe(
        "The IP address range of the instance IPs in this cluster. This is applicable only if `create_subnetwork` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.",
      ).optional(),
      podCidrOverprovisionConfig: z.object({
        disable: z.boolean().describe(
          "Whether Pod CIDR overprovisioning is disabled. Note: Pod CIDR overprovisioning is enabled by default.",
        ).optional(),
      }).describe("[PRIVATE FIELD] Config for pod CIDR size overprovisioning.")
        .optional(),
      servicesIpv4Cidr: z.string().describe(
        "This field is deprecated, use services_ipv4_cidr_block.",
      ).optional(),
      servicesIpv4CidrBlock: z.string().describe(
        "The IP address range of the services IPs in this cluster. If blank, a range will be automatically chosen with the default size. This field is only applicable when `use_ip_aliases` is true. Set to blank to have a range chosen with the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.",
      ).optional(),
      servicesIpv6CidrBlock: z.string().describe(
        "Output only. The services IPv6 CIDR block for the cluster.",
      ).optional(),
      servicesSecondaryRangeName: z.string().describe(
        "The name of the secondary range to be used as for the services CIDR block. The secondary range will be used for service ClusterIPs. This must be an existing secondary range associated with the cluster subnetwork. This field is only applicable with use_ip_aliases is true and create_subnetwork is false.",
      ).optional(),
      stackType: z.enum(["STACK_TYPE_UNSPECIFIED", "IPV4", "IPV4_IPV6"])
        .describe("The IP stack type of the cluster").optional(),
      subnetIpv6CidrBlock: z.string().describe(
        "Output only. The subnet's IPv6 CIDR block used by nodes and pods.",
      ).optional(),
      subnetworkName: z.string().describe(
        "A custom subnetwork name to be used if `create_subnetwork` is true. If this field is empty, then an automatic name will be chosen for the new subnetwork.",
      ).optional(),
      tpuIpv4CidrBlock: z.string().describe(
        "The IP address range of the Cloud TPUs in this cluster. If unspecified, a range will be automatically chosen with the default size. This field is only applicable when `use_ip_aliases` is true. If unspecified, the range will use the default size. Set to /netmask (e.g. `/14`) to have a range chosen with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25.",
      ).optional(),
      useIpAliases: z.boolean().describe(
        "Whether alias IPs will be used for pod IPs in the cluster. This is used in conjunction with use_routes. It cannot be true if use_routes is true. If both use_ip_aliases and use_routes are false, then the server picks the default IP allocation mode",
      ).optional(),
      useRoutes: z.boolean().describe(
        "Whether routes will be used for pod IPs in the cluster. This is used in conjunction with use_ip_aliases. It cannot be true if use_ip_aliases is true. If both use_ip_aliases and use_routes are false, then the server picks the default IP allocation mode",
      ).optional(),
    }).describe(
      "Configuration for controlling how IPs are allocated in the cluster.",
    ).optional(),
    labelFingerprint: z.string().describe(
      "The fingerprint of the set of labels for this cluster.",
    ).optional(),
    legacyAbac: z.object({
      enabled: z.boolean().describe(
        "Whether the ABAC authorizer is enabled for this cluster. When enabled, identities in the system, including service accounts, nodes, and controllers, will have statically granted permissions beyond those provided by the RBAC configuration or IAM.",
      ).optional(),
    }).describe(
      "Configuration for the legacy Attribute Based Access Control authorization mode.",
    ).optional(),
    location: z.string().describe(
      "Output only. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) or [region](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available) in which the cluster resides.",
    ).optional(),
    locations: z.array(z.string()).describe(
      "The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. This field provides a default value if [NodePool.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations) are not specified during node pool creation. Warning: changing cluster locations will update the [NodePool.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations) of all node pools and will result in nodes being added and/or removed.",
    ).optional(),
    loggingConfig: z.object({
      componentConfig: z.object({
        enableComponents: z.array(
          z.enum([
            "COMPONENT_UNSPECIFIED",
            "SYSTEM_COMPONENTS",
            "WORKLOADS",
            "APISERVER",
            "SCHEDULER",
            "CONTROLLER_MANAGER",
            "KCP_SSHD",
            "KCP_CONNECTION",
            "KCP_HPA",
          ]),
        ).describe(
          "Select components to collect logs. An empty set would disable all logging.",
        ).optional(),
      }).describe(
        "LoggingComponentConfig is cluster logging component configuration.",
      ).optional(),
    }).describe("LoggingConfig is cluster logging configuration.").optional(),
    loggingService: z.string().describe(
      "The logging service the cluster should use to write logs. Currently available options: * `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model * `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). * `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions.",
    ).optional(),
    maintenancePolicy: z.object({
      disruptionBudget: z.object({
        lastDisruptionTime: z.string().describe(
          "Output only. The last time a disruption was performed on the control plane.",
        ).optional(),
        lastMinorVersionDisruptionTime: z.string().describe(
          "Output only. The last time a minor version upgrade was performed on the control plane.",
        ).optional(),
        minorVersionDisruptionInterval: z.string().describe(
          "Optional. The minimum duration between two minor version upgrades of the control plane.",
        ).optional(),
        patchVersionDisruptionInterval: z.string().describe(
          "Optional. The minimum duration between two patch version upgrades of the control plane.",
        ).optional(),
      }).describe(
        "DisruptionBudget defines the upgrade disruption budget for the cluster control plane.",
      ).optional(),
      resourceVersion: z.string().describe(
        "A hash identifying the version of this policy, so that updates to fields of the policy won't accidentally undo intermediate changes (and so that users of the API unaware of some fields won't accidentally remove other fields). Make a `get()` request to the cluster to get the current resource version and include it with requests to set the policy.",
      ).optional(),
      window: z.object({
        dailyMaintenanceWindow: z.object({
          duration: z.string().describe(
            'Output only. Duration of the time window, automatically chosen to be smallest possible in the given scenario. Duration will be in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) format "PTnHnMnS".',
          ).optional(),
          startTime: z.string().describe(
            'Time within the maintenance window to start the maintenance operations. Time format should be in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) format "HH:MM", where HH: [00-23] and MM: [00-59] GMT.',
          ).optional(),
        }).describe("Time window specified for daily maintenance operations.")
          .optional(),
        maintenanceExclusions: z.record(
          z.string(),
          z.object({
            endTime: z.unknown().describe(
              "The time that the window ends. The end time should take place after the start time.",
            ).optional(),
            maintenanceExclusionOptions: z.unknown().describe(
              "Represents the Maintenance exclusion option.",
            ).optional(),
            startTime: z.unknown().describe(
              "The time that the window first starts.",
            ).optional(),
          }),
        ).describe(
          "Exceptions to maintenance window. Non-emergency maintenance should not occur in these windows.",
        ).optional(),
        recurringMaintenanceWindow: z.object({
          delayUntil: z.object({
            day: z.unknown().describe(
              "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
            ).optional(),
            month: z.unknown().describe(
              "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
            ).optional(),
            year: z.unknown().describe(
              "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
            ).optional(),
          }).describe(
            "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
          ).optional(),
          recurrence: z.string().describe(
            "Required. An RRULE (https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how this window recurs. For example, to have something repeat every weekday, you'd use: `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` To repeat some window daily (equivalent to the DailyMaintenanceWindow): `FREQ=DAILY` For the first weekend of every month: `FREQ=MONTHLY;BYSETPOS=1;BYDAY=SA,SU` The FREQ values of HOURLY, MINUTELY, and SECONDLY are not supported.",
          ).optional(),
          windowDuration: z.string().describe(
            "Required. Duration of the window.",
          ).optional(),
          windowStartTime: z.object({
            hours: z.unknown().describe(
              'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
            ).optional(),
            minutes: z.unknown().describe(
              "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
            ).optional(),
            nanos: z.unknown().describe(
              "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
            ).optional(),
            seconds: z.unknown().describe(
              "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
            ).optional(),
          }).describe(
            "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
          ).optional(),
        }).describe(
          "Represents an arbitrary window of time that recurs. Will replace RecurringTimeWindow.",
        ).optional(),
        recurringWindow: z.object({
          recurrence: z.string().describe(
            "An RRULE (https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how this window recurs. They go on for the span of time between the start and end time. For example, to have something repeat every weekday, you'd use: `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` To repeat some window daily (equivalent to the DailyMaintenanceWindow): `FREQ=DAILY` For the first weekend of every month: `FREQ=MONTHLY;BYSETPOS=1;BYDAY=SA,SU` This specifies how frequently the window starts. Eg, if you wanted to have a 9-5 UTC-4 window every weekday, you'd use something like: ` start time = 2019-01-01T09:00:00-0400 end time = 2019-01-01T17:00:00-0400 recurrence = FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR ` Windows can span multiple days. Eg, to make the window encompass every weekend from midnight Saturday till the last minute of Sunday UTC: ` start time = 2019-01-05T00:00:00Z end time = 2019-01-07T23:59:00Z recurrence = FREQ=WEEKLY;BYDAY=SA ` Note the start and end time's specific dates are largely arbitrary except to specify duration of the window and when it first starts. The FREQ values of HOURLY, MINUTELY, and SECONDLY are not supported.",
          ).optional(),
          window: z.object({
            endTime: z.unknown().describe(
              "The time that the window ends. The end time should take place after the start time.",
            ).optional(),
            maintenanceExclusionOptions: z.unknown().describe(
              "Represents the Maintenance exclusion option.",
            ).optional(),
            startTime: z.unknown().describe(
              "The time that the window first starts.",
            ).optional(),
          }).describe("Represents an arbitrary window of time.").optional(),
        }).describe("Represents an arbitrary window of time that recurs.")
          .optional(),
      }).describe(
        "MaintenanceWindow defines the maintenance window to be used for the cluster.",
      ).optional(),
    }).describe(
      "MaintenancePolicy defines the maintenance policy to be used for the cluster.",
    ).optional(),
    managedMachineLearningDiagnosticsConfig: z.object({
      enabled: z.boolean().describe(
        "Enable/Disable Managed Machine Learning Diagnostics.",
      ).optional(),
    }).describe(
      "ManagedMachineLearningDiagnosticsConfig is the configuration for the GKE Managed Machine Learning Diagnostics pipeline.",
    ).optional(),
    managedOpentelemetryConfig: z.object({
      scope: z.enum([
        "SCOPE_UNSPECIFIED",
        "NONE",
        "COLLECTION_AND_INSTRUMENTATION_COMPONENTS",
      ]).describe("Scope of the Managed OpenTelemetry pipeline.").optional(),
    }).describe(
      "ManagedOpenTelemetryConfig is the configuration for the GKE Managed OpenTelemetry pipeline.",
    ).optional(),
    masterAuth: z.object({
      clientCertificate: z.string().describe(
        "Output only. Base64-encoded public certificate used by clients to authenticate to the cluster endpoint. Issued only if client_certificate_config is set.",
      ).optional(),
      clientCertificateConfig: z.object({
        issueClientCertificate: z.boolean().describe(
          "Issue a client certificate.",
        ).optional(),
      }).describe("Configuration for client certificates on the cluster.")
        .optional(),
      clientKey: z.string().describe(
        "Output only. Base64-encoded private key used by clients to authenticate to the cluster endpoint.",
      ).optional(),
      clusterCaCertificate: z.string().describe(
        "Output only. Base64-encoded public certificate that is the root of trust for the cluster.",
      ).optional(),
      password: z.string().describe(
        "The password to use for HTTP basic authentication to the master endpoint. Because the master endpoint is open to the Internet, you should create a strong password. If a password is provided for cluster creation, username must be non-empty. Warning: basic authentication is deprecated, and will be removed in GKE control plane versions 1.19 and newer. For a list of recommended authentication methods, see: https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication",
      ).optional(),
      username: z.string().describe(
        "The username to use for HTTP basic authentication to the master endpoint. For clusters v1.6.0 and later, basic authentication can be disabled by leaving username unspecified (or setting it to the empty string). Warning: basic authentication is deprecated, and will be removed in GKE control plane versions 1.19 and newer. For a list of recommended authentication methods, see: https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication",
      ).optional(),
    }).describe(
      "The authentication information for accessing the master endpoint. Authentication can be done using HTTP basic auth or using client certificates.",
    ).optional(),
    masterAuthorizedNetworksConfig: z.object({
      cidrBlocks: z.array(z.object({
        cidrBlock: z.string().describe(
          "cidr_block must be specified in CIDR notation.",
        ).optional(),
        displayName: z.string().describe(
          "display_name is an optional field for users to identify CIDR blocks.",
        ).optional(),
      })).describe(
        "cidr_blocks define up to 50 external networks that could access Kubernetes master through HTTPS.",
      ).optional(),
      enabled: z.boolean().describe(
        "Whether or not master authorized networks is enabled.",
      ).optional(),
      gcpPublicCidrsAccessEnabled: z.boolean().describe(
        "Whether master is accessible via Google Compute Engine Public IP addresses.",
      ).optional(),
      privateEndpointEnforcementEnabled: z.boolean().describe(
        "Whether master authorized networks is enforced on private endpoint or not.",
      ).optional(),
    }).describe(
      "Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.",
    ).optional(),
    meshCertificates: z.object({
      enableCertificates: z.boolean().describe(
        "enable_certificates controls issuance of workload mTLS certificates. If set, the GKE Workload Identity Certificates controller and node agent will be deployed in the cluster, which can then be configured by creating a WorkloadCertificateConfig Custom Resource. Requires Workload Identity (workload_pool must be non-empty).",
      ).optional(),
    }).describe(
      "Configuration for issuance of mTLS keys and certificates to Kubernetes pods.",
    ).optional(),
    monitoringConfig: z.object({
      advancedDatapathObservabilityConfig: z.object({
        enableMetrics: z.boolean().describe("Expose flow metrics on nodes")
          .optional(),
        enableRelay: z.boolean().describe("Enable Relay component").optional(),
        relayMode: z.enum([
          "RELAY_MODE_UNSPECIFIED",
          "DISABLED",
          "INTERNAL_VPC_LB",
          "EXTERNAL_LB",
        ]).describe("Method used to make Relay available").optional(),
      }).describe(
        "AdvancedDatapathObservabilityConfig specifies configuration of observability features of advanced datapath.",
      ).optional(),
      componentConfig: z.object({
        enableComponents: z.array(
          z.enum([
            "COMPONENT_UNSPECIFIED",
            "SYSTEM_COMPONENTS",
            "APISERVER",
            "SCHEDULER",
            "CONTROLLER_MANAGER",
            "STORAGE",
            "HPA",
            "POD",
            "DAEMONSET",
            "DEPLOYMENT",
            "STATEFULSET",
            "CADVISOR",
            "KUBELET",
            "DCGM",
            "JOBSET",
          ]),
        ).describe(
          "Select components to collect metrics. An empty set would disable all monitoring.",
        ).optional(),
      }).describe(
        "MonitoringComponentConfig is cluster monitoring component configuration.",
      ).optional(),
      managedPrometheusConfig: z.object({
        autoMonitoringConfig: z.object({
          scope: z.enum(["SCOPE_UNSPECIFIED", "ALL", "NONE"]).describe(
            "Scope for GKE Workload Auto-Monitoring.",
          ).optional(),
        }).describe(
          "AutoMonitoringConfig defines the configuration for GKE Workload Auto-Monitoring.",
        ).optional(),
        enabled: z.boolean().describe("Enable Managed Collection.").optional(),
      }).describe(
        "ManagedPrometheusConfig defines the configuration for Google Cloud Managed Service for Prometheus.",
      ).optional(),
    }).describe("MonitoringConfig is cluster monitoring configuration.")
      .optional(),
    monitoringService: z.string().describe(
      "The monitoring service the cluster should use to write metrics. Currently available options: * `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model * `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). * `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions.",
    ).optional(),
    name: z.string().describe(
      "The name of this cluster. The name must be unique within this project and location (e.g. zone or region), and can be up to 40 characters with the following restrictions: * Lowercase letters, numbers, and hyphens only. * Must start with a letter. * Must end with a number or a letter.",
    ).optional(),
    network: z.string().describe(
      "The name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the cluster is connected. If left unspecified, the `default` network will be used.",
    ).optional(),
    networkConfig: z.object({
      datapathProvider: z.enum([
        "DATAPATH_PROVIDER_UNSPECIFIED",
        "LEGACY_DATAPATH",
        "ADVANCED_DATAPATH",
      ]).describe(
        "The desired datapath provider for this cluster. By default, uses the IPTables-based kube-proxy implementation.",
      ).optional(),
      dataplaneV2Config: z.object({
        scalabilityMode: z.enum([
          "SCALABILITY_MODE_UNSPECIFIED",
          "DISABLED",
          "SCALE_OPTIMIZED",
        ]).describe("Optional. Scalability mode for the cluster.").optional(),
      }).describe("DataplaneV2Config is the configuration for DPv2.")
        .optional(),
      defaultEnablePrivateNodes: z.boolean().describe(
        "Controls whether by default nodes have private IP addresses only. It is invalid to specify both PrivateClusterConfig.enablePrivateNodes and this field at the same time. To update the default setting, use ClusterUpdate.desired_default_enable_private_nodes",
      ).optional(),
      defaultSnatStatus: z.object({
        disabled: z.boolean().describe("Disables cluster default sNAT rules.")
          .optional(),
      }).describe(
        "DefaultSnatStatus contains the desired state of whether default sNAT should be disabled on the cluster.",
      ).optional(),
      disableL4LbFirewallReconciliation: z.boolean().describe(
        "Disable L4 load balancer VPC firewalls to enable firewall policies.",
      ).optional(),
      dnsConfig: z.object({
        additiveVpcScopeDnsDomain: z.string().describe(
          "Optional. The domain used in Additive VPC scope.",
        ).optional(),
        clusterDns: z.enum([
          "PROVIDER_UNSPECIFIED",
          "PLATFORM_DEFAULT",
          "CLOUD_DNS",
          "KUBE_DNS",
        ]).describe(
          "cluster_dns indicates which in-cluster DNS provider should be used.",
        ).optional(),
        clusterDnsDomain: z.string().describe(
          "cluster_dns_domain is the suffix used for all cluster service records.",
        ).optional(),
        clusterDnsScope: z.enum([
          "DNS_SCOPE_UNSPECIFIED",
          "CLUSTER_SCOPE",
          "VPC_SCOPE",
        ]).describe(
          "cluster_dns_scope indicates the scope of access to cluster DNS records.",
        ).optional(),
      }).describe(
        "DNSConfig contains the desired set of options for configuring clusterDNS.",
      ).optional(),
      enableCiliumClusterwideNetworkPolicy: z.boolean().describe(
        "Whether CiliumClusterwideNetworkPolicy is enabled on this cluster.",
      ).optional(),
      enableFqdnNetworkPolicy: z.boolean().describe(
        "Whether FQDN Network Policy is enabled on this cluster.",
      ).optional(),
      enableIntraNodeVisibility: z.boolean().describe(
        "Whether Intra-node visibility is enabled for this cluster. This makes same node pod to pod traffic visible for VPC network.",
      ).optional(),
      enableL4ilbSubsetting: z.boolean().describe(
        "Whether L4ILB Subsetting is enabled for this cluster.",
      ).optional(),
      enableMultiNetworking: z.boolean().describe(
        "Whether multi-networking is enabled for this cluster.",
      ).optional(),
      gatewayApiConfig: z.object({
        channel: z.enum([
          "CHANNEL_UNSPECIFIED",
          "CHANNEL_DISABLED",
          "CHANNEL_EXPERIMENTAL",
          "CHANNEL_STANDARD",
        ]).describe("The Gateway API release channel to use for Gateway API.")
          .optional(),
      }).describe(
        "GatewayAPIConfig contains the desired config of Gateway API on this cluster.",
      ).optional(),
      inTransitEncryptionConfig: z.enum([
        "IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED",
        "IN_TRANSIT_ENCRYPTION_DISABLED",
        "IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT",
      ]).describe(
        "Specify the details of in-transit encryption. Now named inter-node transparent encryption.",
      ).optional(),
      network: z.string().describe(
        "Output only. The relative name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks) to which the cluster is connected. Example: projects/my-project/global/networks/my-network",
      ).optional(),
      networkPerformanceConfig: z.object({
        totalEgressBandwidthTier: z.enum(["TIER_UNSPECIFIED", "TIER_1"])
          .describe(
            "Specifies the total network bandwidth tier for NodePools in the cluster.",
          ).optional(),
      }).describe("Configuration of network bandwidth tiers").optional(),
      privateIpv6GoogleAccess: z.enum([
        "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED",
        "PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED",
        "PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE",
        "PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL",
      ]).describe(
        "The desired state of IPv6 connectivity to Google Services. By default, no private IPv6 access to or from Google Services (all access will be via IPv4)",
      ).optional(),
      serviceExternalIpsConfig: z.object({
        enabled: z.boolean().describe(
          "Whether Services with ExternalIPs field are allowed or not.",
        ).optional(),
      }).describe("Config to block services with externalIPs field.")
        .optional(),
      subnetwork: z.string().describe(
        "Output only. The relative name of the Google Compute Engine [subnetwork](https://cloud.google.com/compute/docs/vpc) to which the cluster is connected. Example: projects/my-project/regions/us-central1/subnetworks/my-subnet",
      ).optional(),
    }).describe(
      "NetworkConfig reports the relative names of network & subnetwork.",
    ).optional(),
    networkPolicy: z.object({
      enabled: z.boolean().describe(
        "Whether network policy is enabled on the cluster.",
      ).optional(),
      provider: z.enum(["PROVIDER_UNSPECIFIED", "CALICO"]).describe(
        "The selected network policy provider.",
      ).optional(),
    }).describe(
      "Configuration options for the NetworkPolicy feature. https://kubernetes.io/docs/concepts/services-networking/networkpolicies/",
    ).optional(),
    nodeConfig: z.object({
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
          "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.neigh.default.gc_thresh1 net.ipv4.neigh.default.gc_thresh2 net.ipv4.neigh.default.gc_thresh3 net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.keys.maxkeys kernel.keys.maxbytes kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
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
      nodeImageConfig: z.object({
        image: z.string().describe(
          "The name of the image to use for this node.",
        ).optional(),
        imageProject: z.string().describe(
          "The project containing the image to use for this node.",
        ).optional(),
      }).describe("CustomImageConfig contains the information r").optional(),
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
    nodeCreationConfig: z.object({
      nodeCreationMode: z.enum([
        "MODE_UNSPECIFIED",
        "VIA_KUBELET",
        "VIA_CONTROL_PLANE",
      ]).describe("The mode of node creation.").optional(),
    }).describe(
      "NodeCreationConfig defines the settings of node creation mode.",
    ).optional(),
    nodeIpv4CidrSize: z.number().int().describe(
      "Output only. The size of the address space on each node for hosting containers. This is provisioned from within the `container_ipv4_cidr` range. This field will only be set when cluster is in route-based network mode.",
    ).optional(),
    nodePoolAutoConfig: z.object({
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
          "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.neigh.default.gc_thresh1 net.ipv4.neigh.default.gc_thresh2 net.ipv4.neigh.default.gc_thresh3 net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.keys.maxkeys kernel.keys.maxbytes kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
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
      networkTags: z.object({
        tags: z.array(z.string()).describe("List of network tags.").optional(),
      }).describe(
        "Collection of Compute Engine network tags that can be applied to a node's underlying VM instance.",
      ).optional(),
      nodeKubeletConfig: z.object({
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
      resourceManagerTags: z.object({
        tags: z.record(z.string(), z.string()).describe(
          "TagKeyValue must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}`",
        ).optional(),
      }).describe(
        "A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.",
      ).optional(),
    }).describe(
      "Node pool configs that apply to all auto-provisioned node pools in autopilot clusters and node auto-provisioning enabled clusters.",
    ).optional(),
    nodePoolDefaults: z.object({
      nodeConfigDefaults: z.object({
        containerdConfig: z.object({
          privateRegistryAccessConfig: z.object({
            certificateAuthorityDomainConfig: z.unknown().describe(
              "Private registry access configuration.",
            ).optional(),
            enabled: z.unknown().describe("Private registry access is enabled.")
              .optional(),
          }).describe(
            "PrivateRegistryAccessConfig contains access configuration for private container registries.",
          ).optional(),
          registryHosts: z.array(z.unknown()).describe(
            "RegistryHostConfig configures containerd registry host configuration. Each registry_hosts represents a hosts.toml file. At most 25 registry_hosts are allowed.",
          ).optional(),
          writableCgroups: z.object({
            enabled: z.unknown().describe(
              "Optional. Whether writable cgroups is enabled.",
            ).optional(),
          }).describe("Defines writable cgroups configuration.").optional(),
        }).describe(
          "ContainerdConfig contains configuration to customize containerd.",
        ).optional(),
        gcfsConfig: z.object({
          enabled: z.boolean().describe("Whether to use GCFS.").optional(),
        }).describe(
          "GcfsConfig contains configurations of Google Container File System (image streaming).",
        ).optional(),
        loggingConfig: z.object({
          variantConfig: z.object({
            variant: z.unknown().describe("Logging variant deployed on nodes.")
              .optional(),
          }).describe(
            "LoggingVariantConfig specifies the behaviour of the logging component.",
          ).optional(),
        }).describe(
          "NodePoolLoggingConfig specifies logging configuration for node pools.",
        ).optional(),
        nodeKubeletConfig: z.object({
          allowedUnsafeSysctls: z.array(z.unknown()).describe(
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
            maxContainerRestartPeriod: z.unknown().describe(
              'Optional. The maximum duration the backoff delay can accrue to for container restarts, minimum 1 second, maximum 300 seconds. If not set, defaults to the internal crashloopbackoff maximum. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". See https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#configurable-container-restart-delay for more details.',
            ).optional(),
          }).describe(
            "Contains config to modify node-level parameters for container restart behavior.",
          ).optional(),
          evictionMaxPodGracePeriodSeconds: z.number().int().describe(
            "Optional. eviction_max_pod_grace_period_seconds is the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met. This value effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions. Default: 0. Range: [0, 300].",
          ).optional(),
          evictionMinimumReclaim: z.object({
            imagefsAvailable: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to imagefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            imagefsInodesFree: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to imagefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            memoryAvailable: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to memory available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsAvailable: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to nodefs available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsInodesFree: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to nodefs inodes free signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            pidAvailable: z.unknown().describe(
              'Optional. Minimum reclaim for eviction due to pid available signal. Only take percentage value for now. Sample format: "10%". Must be <=10%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
          }).describe(
            "Eviction minimum reclaims are the resource amounts of minimum reclaims for each eviction signal.",
          ).optional(),
          evictionSoft: z.object({
            imagefsAvailable: z.unknown().describe(
              'Optional. Amount of storage available on filesystem that container runtime uses for storing images layers. If the container filesystem and image filesystem are not separate, then imagefs can store both image layers and writeable layers. Defines the amount of "imagefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 15% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            imagefsInodesFree: z.unknown().describe(
              'Optional. Amount of inodes available on filesystem that container runtime uses for storing images layers. Defines the amount of "imagefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            memoryAvailable: z.unknown().describe(
              'Optional. Memory available (i.e. capacity - workingSet), in bytes. Defines the amount of "memory.available" signal in kubelet. Default is unset, if not specified in the kubelet config. Format: positive number + unit, e.g. 100Ki, 10Mi, 5Gi. Valid units are Ki, Mi, Gi. Must be >= 100Mi and <= 50% of the node\'s memory. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsAvailable: z.unknown().describe(
              'Optional. Amount of storage available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsInodesFree: z.unknown().describe(
              'Optional. Amount of inodes available on filesystem that kubelet uses for volumes, daemon logs, etc. Defines the amount of "nodefs.inodesFree" signal in kubelet. Default is unset, if not specified in the kubelet config. Linux only. It takses percentage value for now. Sample format: "30%". Must be >= 5% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            pidAvailable: z.unknown().describe(
              'Optional. Amount of PID available for pod allocation. Defines the amount of "pid.available" signal in kubelet. Default is unset, if not specified in the kubelet config. It takses percentage value for now. Sample format: "30%". Must be >= 10% and <= 50%. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
          }).describe(
            "Eviction signals are the current state of a particular resource at a specific point in time. The kubelet uses eviction signals to make eviction decisions by comparing the signals to eviction thresholds, which are the minimum amount of the resource that should be available on the node.",
          ).optional(),
          evictionSoftGracePeriod: z.object({
            imagefsAvailable: z.unknown().describe(
              'Optional. Grace period for eviction due to imagefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            imagefsInodesFree: z.unknown().describe(
              'Optional. Grace period for eviction due to imagefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            memoryAvailable: z.unknown().describe(
              'Optional. Grace period for eviction due to memory available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsAvailable: z.unknown().describe(
              'Optional. Grace period for eviction due to nodefs available signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            nodefsInodesFree: z.unknown().describe(
              'Optional. Grace period for eviction due to nodefs inodes free signal. Sample format: "10s". Must be >= 0. See https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-signals',
            ).optional(),
            pidAvailable: z.unknown().describe(
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
            policy: z.unknown().describe(
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
            policy: z.unknown().describe(
              "Configures the strategy for resource alignment. Allowed values are: * none: the default policy, and does not perform any topology alignment. * restricted: the topology manager stores the preferred NUMA node affinity for the container, and will reject the pod if the affinity if not preferred. * best-effort: the topology manager stores the preferred NUMA node affinity for the container. If the affinity is not preferred, the topology manager will admit the pod to the node anyway. * single-numa-node: the topology manager determines if the single NUMA node affinity is possible. If it is, Topology Manager will store this and the Hint Providers can then use this information when making the resource allocation decision. If, however, this is not possible then the Topology Manager will reject the pod from the node. This will result in a pod in a Terminated state with a pod admission failure. The default policy value is 'none' if unspecified. Details about each strategy can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-policies).",
            ).optional(),
            scope: z.unknown().describe(
              "The Topology Manager aligns resources in following scopes: * container * pod The default scope is 'container' if unspecified. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/#topology-manager-scopes",
            ).optional(),
          }).describe(
            "TopologyManager defines the configuration options for Topology Manager feature. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/",
          ).optional(),
        }).describe("Node kubelet configs.").optional(),
      }).describe("Subset of NodeConfig message that has defaults.").optional(),
    }).describe("Subset of Nodepool message that has defaults.").optional(),
    nodePools: z.array(z.object({
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
        locationPolicy: z.enum([
          "LOCATION_POLICY_UNSPECIFIED",
          "BALANCED",
          "ANY",
        ]).describe("Location policy used when scaling up a node pool.")
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
        canonicalCode: z.unknown().describe("Canonical code of the condition.")
          .optional(),
        code: z.unknown().describe(
          "Machine-friendly representation of the condition Deprecated. Use canonical_code instead.",
        ).optional(),
        message: z.unknown().describe(
          "Human-friendly representation of the condition",
        ).optional(),
      })).describe("Which conditions caused the current node pool state.")
        .optional(),
      config: z.object({
        accelerators: z.array(z.unknown()).describe(
          "A list of hardware accelerators to be attached to each node. See https://cloud.google.com/compute/docs/gpus for more information about support for GPUs.",
        ).optional(),
        advancedMachineFeatures: z.object({
          enableNestedVirtualization: z.unknown().describe(
            "Whether or not to enable nested virtualization (defaults to false).",
          ).optional(),
          performanceMonitoringUnit: z.unknown().describe(
            "Type of Performance Monitoring Unit (PMU) requested on node pool instances. If unset, PMU will not be available to the node.",
          ).optional(),
          threadsPerCore: z.unknown().describe(
            "The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed.",
          ).optional(),
        }).describe(
          "Specifies options for controlling advanced machine features.",
        ).optional(),
        bootDisk: z.object({
          diskType: z.unknown().describe(
            "Disk type of the boot disk. (i.e. Hyperdisk-Balanced, PD-Balanced, etc.)",
          ).optional(),
          provisionedIops: z.unknown().describe(
            "For Hyperdisk-Balanced only, the provisioned IOPS config value.",
          ).optional(),
          provisionedThroughput: z.unknown().describe(
            "For Hyperdisk-Balanced only, the provisioned throughput config value.",
          ).optional(),
          sizeGb: z.unknown().describe(
            "Disk size in GB. Replaces NodeConfig.disk_size_gb",
          ).optional(),
        }).describe(
          "BootDisk specifies the boot disk configuration for node pools.",
        ).optional(),
        bootDiskKmsKey: z.string().describe(
          "The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption",
        ).optional(),
        confidentialNodes: z.object({
          confidentialInstanceType: z.unknown().describe(
            "Defines the type of technology used by the confidential node.",
          ).optional(),
          enabled: z.unknown().describe(
            "Whether Confidential Nodes feature is enabled.",
          ).optional(),
        }).describe(
          "ConfidentialNodes is configuration for the confidential nodes feature, which makes nodes run on confidential VMs.",
        ).optional(),
        consolidationDelay: z.string().describe(
          "Consolidation delay defines duration after which the Cluster Autoscaler can scale down underutilized nodes. If not set, nodes are scaled down by default behavior, i.e. according to the chosen autoscaling profile.",
        ).optional(),
        containerdConfig: z.object({
          privateRegistryAccessConfig: z.unknown().describe(
            "PrivateRegistryAccessConfig contains access configuration for private container registries.",
          ).optional(),
          registryHosts: z.unknown().describe(
            "RegistryHostConfig configures containerd registry host configuration. Each registry_hosts represents a hosts.toml file. At most 25 registry_hosts are allowed.",
          ).optional(),
          writableCgroups: z.unknown().describe(
            "Defines writable cgroups configuration.",
          ).optional(),
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
          dataCacheCount: z.unknown().describe(
            "Number of local SSDs to use for GKE Data Cache.",
          ).optional(),
          localSsdCount: z.unknown().describe(
            "Number of local SSDs to use to back ephemeral storage. Uses NVMe interfaces. A zero (or unset) value has different meanings depending on machine type being used: 1. For pre-Gen3 machines, which support flexible numbers of local ssds, zero (or unset) means to disable using local SSDs as ephemeral storage. The limit for this value is dependent upon the maximum number of disk available on a machine per zone. See: https://cloud.google.com/compute/docs/disks/local-ssd for more information. 2. For Gen3 machines which dictate a specific number of local ssds, zero (or unset) means to use the default number of local ssds that goes with that machine type. For example, for a c3-standard-8-lssd machine, 2 local ssds would be provisioned. For c3-standard-8 (which doesn't support local ssds), 0 will be provisioned. See https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds for more info.",
          ).optional(),
        }).describe(
          "EphemeralStorageLocalSsdConfig contains configuration for the node ephemeral storage using Local SSDs.",
        ).optional(),
        fastSocket: z.object({
          enabled: z.unknown().describe(
            "Whether Fast Socket features are enabled in the node pool.",
          ).optional(),
        }).describe("Configuration of Fast Socket feature.").optional(),
        flexStart: z.boolean().describe(
          "Flex Start flag for enabling Flex Start VM.",
        ).optional(),
        gcfsConfig: z.object({
          enabled: z.unknown().describe("Whether to use GCFS.").optional(),
        }).describe(
          "GcfsConfig contains configurations of Google Container File System (image streaming).",
        ).optional(),
        gpuDirectConfig: z.object({
          gpuDirectStrategy: z.unknown().describe(
            "The type of GPU direct strategy to enable on the node pool.",
          ).optional(),
        }).describe(
          "GPUDirectConfig specifies the GPU direct strategy on the node pool.",
        ).optional(),
        gvnic: z.object({
          enabled: z.unknown().describe(
            "Whether gVNIC features are enabled in the node pool.",
          ).optional(),
        }).describe("Configuration of gVNIC feature.").optional(),
        imageType: z.string().describe(
          "The image type to use for this node. Note that for a given image type, the latest version of it will be used. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types.",
        ).optional(),
        kubeletConfig: z.object({
          allowedUnsafeSysctls: z.unknown().describe(
            "Optional. Defines a comma-separated allowlist of unsafe sysctls or sysctl patterns (ending in `*`). The unsafe namespaced sysctl groups are `kernel.shm*`, `kernel.msg*`, `kernel.sem`, `fs.mqueue.*`, and `net.*`. Leaving this allowlist empty means they cannot be set on Pods. To allow certain sysctls or sysctl patterns to be set on Pods, list them separated by commas. For example: `kernel.msg*,net.ipv4.route.min_pmtu`. See https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/ for more details.",
          ).optional(),
          containerLogMaxFiles: z.unknown().describe(
            "Optional. Defines the maximum number of container log files that can be present for a container. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation The value must be an integer between 2 and 10, inclusive. The default value is 5 if unspecified.",
          ).optional(),
          containerLogMaxSize: z.unknown().describe(
            "Optional. Defines the maximum size of the container log file before it is rotated. See https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation Valid format is positive number + unit, e.g. 100Ki, 10Mi. Valid units are Ki, Mi, Gi. The value must be between 10Mi and 500Mi, inclusive. Note that the total container log size (container_log_max_size * container_log_max_files) cannot exceed 1% of the total storage of the node, to avoid disk pressure caused by log files. The default value is 10Mi if unspecified.",
          ).optional(),
          cpuCfsQuota: z.unknown().describe(
            "Enable CPU CFS quota enforcement for containers that specify CPU limits. This option is enabled by default which makes kubelet use CFS quota (https://www.kernel.org/doc/Documentation/scheduler/sched-bwc.txt) to enforce container CPU limits. Otherwise, CPU limits will not be enforced at all. Disable this option to mitigate CPU throttling problems while still having your pods to be in Guaranteed QoS class by specifying the CPU limits. The default value is 'true' if unspecified.",
          ).optional(),
          cpuCfsQuotaPeriod: z.unknown().describe(
            'Set the CPU CFS quota period value \'cpu.cfs_period_us\'. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration between 1ms and 1 second, inclusive.',
          ).optional(),
          cpuManagerPolicy: z.unknown().describe(
            'Control the CPU management policy on the node. See https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/ The following values are allowed. * "none": the default, which represents the existing scheduling behavior. * "static": allows pods with certain resource characteristics to be granted increased CPU affinity and exclusivity on the node. The default value is \'none\' if unspecified.',
          ).optional(),
          crashLoopBackOff: z.unknown().describe(
            "Contains config to modify node-level parameters for container restart behavior.",
          ).optional(),
          evictionMaxPodGracePeriodSeconds: z.unknown().describe(
            "Optional. eviction_max_pod_grace_period_seconds is the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met. This value effectively caps the Pod's terminationGracePeriodSeconds value during soft evictions. Default: 0. Range: [0, 300].",
          ).optional(),
          evictionMinimumReclaim: z.unknown().describe(
            "Eviction minimum reclaims are the resource amounts of minimum reclaims for each eviction signal.",
          ).optional(),
          evictionSoft: z.unknown().describe(
            "Eviction signals are the current state of a particular resource at a specific point in time. The kubelet uses eviction signals to make eviction decisions by comparing the signals to eviction thresholds, which are the minimum amount of the resource that should be available on the node.",
          ).optional(),
          evictionSoftGracePeriod: z.unknown().describe(
            "Eviction grace periods are grace periods for each eviction signal.",
          ).optional(),
          imageGcHighThresholdPercent: z.unknown().describe(
            "Optional. Defines the percent of disk usage after which image garbage collection is always run. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and greater than image_gc_low_threshold_percent. The default value is 85 if unspecified.",
          ).optional(),
          imageGcLowThresholdPercent: z.unknown().describe(
            "Optional. Defines the percent of disk usage before which image garbage collection is never run. Lowest disk usage to garbage collect to. The percent is calculated as this field value out of 100. The value must be between 10 and 85, inclusive and smaller than image_gc_high_threshold_percent. The default value is 80 if unspecified.",
          ).optional(),
          imageMaximumGcAge: z.unknown().describe(
            'Optional. Defines the maximum age an image can be unused before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration greater than image_minimum_gc_age or "0s". The default value is "0s" if unspecified, which disables this field, meaning images won\'t be garbage collected based on being unused for too long.',
          ).optional(),
          imageMinimumGcAge: z.unknown().describe(
            'Optional. Defines the minimum age for an unused image before it is garbage collected. The string must be a sequence of decimal numbers, each with optional fraction and a unit suffix, such as "300s", "1.5h", and "2h45m". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". The value must be a positive duration less than or equal to 2 minutes. The default value is "2m0s" if unspecified.',
          ).optional(),
          insecureKubeletReadonlyPortEnabled: z.unknown().describe(
            "Enable or disable Kubelet read only port.",
          ).optional(),
          maxParallelImagePulls: z.unknown().describe(
            "Optional. Defines the maximum number of image pulls in parallel. The range is 2 to 5, inclusive. The default value is 2 or 3 depending on the disk type. See https://kubernetes.io/docs/concepts/containers/images/#maximum-parallel-image-pulls for more details.",
          ).optional(),
          memoryManager: z.unknown().describe(
            "The option enables the Kubernetes NUMA-aware Memory Manager feature. Detailed description about the feature can be found [here](https://kubernetes.io/docs/tasks/administer-cluster/memory-manager/).",
          ).optional(),
          podPidsLimit: z.unknown().describe(
            "Set the Pod PID limits. See https://kubernetes.io/docs/concepts/policy/pid-limiting/#pod-pid-limits Controls the maximum number of processes allowed to run in a pod. The value must be greater than or equal to 1024 and less than 4194304.",
          ).optional(),
          shutdownGracePeriodCriticalPodsSeconds: z.unknown().describe(
            "Optional. shutdown_grace_period_critical_pods_seconds is the maximum allowed grace period (in seconds) used to terminate critical pods during a node shutdown. This value should be <= shutdown_grace_period_seconds, and is only valid if shutdown_grace_period_seconds is set. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ Range: [0, 120].",
          ).optional(),
          shutdownGracePeriodSeconds: z.unknown().describe(
            "Optional. shutdown_grace_period_seconds is the maximum allowed grace period (in seconds) the total duration that the node should delay the shutdown during a graceful shutdown. This is the total grace period for pod termination for both regular and critical pods. https://kubernetes.io/docs/concepts/cluster-administration/node-shutdown/ If set to 0, node will not enable the graceful node shutdown functionality. This field is only valid for Spot VMs. Allowed values: 0, 30, 120.",
          ).optional(),
          singleProcessOomKill: z.unknown().describe(
            "Optional. Defines whether to enable single process OOM killer. If true, will prevent the memory.oom.group flag from being set for container cgroups in cgroups v2. This causes processes in the container to be OOM killed individually instead of as a group.",
          ).optional(),
          topologyManager: z.unknown().describe(
            "TopologyManager defines the configuration options for Topology Manager feature. See https://kubernetes.io/docs/tasks/administer-cluster/topology-manager/",
          ).optional(),
        }).describe("Node kubelet configs.").optional(),
        labels: z.record(z.string(), z.unknown()).describe(
          "The Kubernetes labels (key/value pairs) to apply to each node. The values in this field are added to the set of default labels Kubernetes applies to nodes. This field has the following restrictions: * Labels must use a valid Kubernetes syntax and character set, as defined in https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set. * This field supports up to 1,024 total characters in a single request. Depending on the Kubernetes version, keys in this field might conflict with the keys of the default labels, which might change which of your labels are applied to the nodes. Assume that the behavior is unpredictable and avoid label key conflicts. For more information about the default labels, see: https://kubernetes.io/docs/reference/labels-annotations-taints/",
        ).optional(),
        linuxNodeConfig: z.object({
          accurateTimeConfig: z.unknown().describe(
            "AccurateTimeConfig contains configuration for the accurate time synchronization feature.",
          ).optional(),
          cgroupMode: z.unknown().describe(
            "cgroup_mode specifies the cgroup mode to be used on the node.",
          ).optional(),
          customNodeInit: z.unknown().describe(
            "Support for running custom init code while bootstrapping nodes.",
          ).optional(),
          hugepages: z.unknown().describe(
            "Hugepages amount in both 2m and 1g size",
          ).optional(),
          nodeKernelModuleLoading: z.unknown().describe(
            "Configuration for kernel module loading on nodes.",
          ).optional(),
          swapConfig: z.unknown().describe(
            "Configuration for swap memory on a node pool.",
          ).optional(),
          sysctls: z.unknown().describe(
            "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.neigh.default.gc_thresh1 net.ipv4.neigh.default.gc_thresh2 net.ipv4.neigh.default.gc_thresh3 net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.keys.maxkeys kernel.keys.maxbytes kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
          ).optional(),
          transparentHugepageDefrag: z.unknown().describe(
            "Optional. Defines the transparent hugepage defrag configuration on the node. VM hugepage allocation can be managed by either limiting defragmentation for delayed allocation or skipping it entirely for immediate allocation only. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
          ).optional(),
          transparentHugepageEnabled: z.unknown().describe(
            "Optional. Transparent hugepage support for anonymous memory can be entirely disabled (mostly for debugging purposes) or only enabled inside MADV_HUGEPAGE regions (to avoid the risk of consuming more memory resources) or enabled system wide. See https://docs.kernel.org/admin-guide/mm/transhuge.html for more details.",
          ).optional(),
        }).describe("Parameters that can be configured on Linux nodes.")
          .optional(),
        localNvmeSsdBlockConfig: z.object({
          localSsdCount: z.unknown().describe(
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
          variantConfig: z.unknown().describe(
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
        metadata: z.record(z.string(), z.unknown()).describe(
          'The metadata key/value pairs assigned to instances in the cluster. Keys must conform to the regexp `[a-zA-Z0-9-_]+` and be less than 128 bytes in length. These are reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project or be one of the reserved keys: - "cluster-location" - "cluster-name" - "cluster-uid" - "configure-sh" - "containerd-configure-sh" - "enable-os-login" - "gci-ensure-gke-docker" - "gci-metrics-enabled" - "gci-update-strategy" - "instance-template" - "kube-env" - "startup-script" - "user-data" - "disable-address-manager" - "windows-startup-script-ps1" - "common-psm1" - "k8s-node-setup-psm1" - "install-ssh-psm1" - "user-profile-psm1" Values are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on them is that each value\'s size must be less than or equal to 32 KB. The total size of all keys and values must be less than 512 KB.',
        ).optional(),
        minCpuPlatform: z.string().describe(
          'Minimum CPU platform to be used by this instance. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: "Intel Haswell"` or `minCpuPlatform: "Intel Sandy Bridge"`. For more information, read [how to specify min CPU platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform)',
        ).optional(),
        nodeGroup: z.string().describe(
          "Setting this field will assign instances of this pool to run on the specified node group. This is useful for running workloads on [sole tenant nodes](https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes).",
        ).optional(),
        nodeImageConfig: z.object({
          image: z.unknown().describe(
            "The name of the image to use for this node.",
          ).optional(),
          imageProject: z.unknown().describe(
            "The project containing the image to use for this node.",
          ).optional(),
        }).describe("CustomImageConfig contains the information r").optional(),
        oauthScopes: z.array(z.unknown()).describe(
          'The set of Google API scopes to be made available on all of the node VMs under the "default" service account. The following scopes are recommended, but not required, and by default are not included: * `https://www.googleapis.com/auth/compute` is required for mounting persistent storage on your nodes. * `https://www.googleapis.com/auth/devstorage.read_only` is required for communicating with **gcr.io** (the [Artifact Registry](https://cloud.google.com/artifact-registry/)). If unspecified, no scopes are added, unless Cloud Logging or Cloud Monitoring are enabled, in which case their required scopes will be added.',
        ).optional(),
        preemptible: z.boolean().describe(
          "Whether the nodes are created as preemptible VM instances. See: https://cloud.google.com/compute/docs/instances/preemptible for more information about preemptible VM instances.",
        ).optional(),
        reservationAffinity: z.object({
          consumeReservationType: z.unknown().describe(
            "Corresponds to the type of reservation consumption.",
          ).optional(),
          key: z.unknown().describe(
            'Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, specify "compute.googleapis.com/reservation-name" as the key and specify the name of your reservation as its value.',
          ).optional(),
          values: z.unknown().describe(
            "Corresponds to the label value(s) of reservation resource(s).",
          ).optional(),
        }).describe(
          "[ReservationAffinity](https://cloud.google.com/compute/docs/instances/reserving-zonal-resources) is the configuration of desired reservation which instances could take capacity from.",
        ).optional(),
        resourceLabels: z.record(z.string(), z.unknown()).describe(
          "The resource labels for the node pool to use to annotate any related Google Compute Engine resources.",
        ).optional(),
        resourceManagerTags: z.object({
          tags: z.unknown().describe(
            "TagKeyValue must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}`",
          ).optional(),
        }).describe(
          "A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.",
        ).optional(),
        sandboxConfig: z.object({
          type: z.unknown().describe("Type of the sandbox to use for the node.")
            .optional(),
        }).describe(
          "SandboxConfig contains configurations of the sandbox to use for the node.",
        ).optional(),
        secondaryBootDiskUpdateStrategy: z.object({}).describe(
          "SecondaryBootDiskUpdateStrategy is a placeholder which will be extended in the future to define different options for updating secondary boot disks.",
        ).optional(),
        secondaryBootDisks: z.array(z.unknown()).describe(
          "List of secondary boot disks attached to the nodes.",
        ).optional(),
        serviceAccount: z.string().describe(
          'The Google Cloud Platform Service Account to be used by the node VMs. Specify the email address of the Service Account; otherwise, if no Service Account is specified, the "default" service account is used.',
        ).optional(),
        shieldedInstanceConfig: z.object({
          enableIntegrityMonitoring: z.unknown().describe(
            "Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created.",
          ).optional(),
          enableSecureBoot: z.unknown().describe(
            "Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails.",
          ).optional(),
        }).describe("A set of Shielded Instance options.").optional(),
        soleTenantConfig: z.object({
          minNodeCpus: z.unknown().describe(
            "Optional. The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. This field can only be set if the node pool is created in a shared sole-tenant node group.",
          ).optional(),
          nodeAffinities: z.unknown().describe(
            "NodeAffinities used to match to a shared sole tenant node group.",
          ).optional(),
        }).describe(
          "SoleTenantConfig contains the NodeAffinities to specify what shared sole tenant node groups should back the node pool.",
        ).optional(),
        spot: z.boolean().describe(
          "Spot flag for enabling Spot VM, which is a rebrand of the existing preemptible flag.",
        ).optional(),
        storagePools: z.array(z.unknown()).describe(
          "List of Storage Pools where boot disks are provisioned.",
        ).optional(),
        tags: z.array(z.unknown()).describe(
          "The list of instance tags applied to all nodes. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during cluster or node pool creation. Each tag within the list must comply with RFC1035.",
        ).optional(),
        taintConfig: z.object({
          architectureTaintBehavior: z.unknown().describe(
            "Optional. Controls architecture tainting behavior.",
          ).optional(),
        }).describe(
          "TaintConfig contains the configuration for the taints of the node pool.",
        ).optional(),
        taints: z.array(z.unknown()).describe(
          "List of kubernetes taints to be applied to each node. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/",
        ).optional(),
        windowsNodeConfig: z.object({
          osVersion: z.unknown().describe(
            "OSVersion specifies the Windows node config to be used on the node.",
          ).optional(),
        }).describe(
          "Parameters that can be configured on Windows nodes. Windows Node Config that define the parameters that will be used to configure the Windows node pool settings.",
        ).optional(),
        workloadMetadataConfig: z.object({
          mode: z.unknown().describe(
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
      maintenancePolicy: z.object({
        exclusionUntilEndOfSupport: z.object({
          enabled: z.unknown().describe(
            "Optional. Indicates whether the exclusion is enabled.",
          ).optional(),
          endTime: z.unknown().describe(
            "Output only. The end time of the maintenance exclusion. It is output only. It is the cluster control plane version's end of support time, or end of extended support time when the cluster is on extended support channel.",
          ).optional(),
          startTime: z.unknown().describe(
            "Output only. The start time of the maintenance exclusion. It is output only. It is the exclusion creation time.",
          ).optional(),
        }).describe("Defines the maintenance exclusion for the node pool.")
          .optional(),
      }).describe("Defines the maintenance policy for the node pool.")
        .optional(),
      management: z.object({
        autoRepair: z.boolean().describe(
          "A flag that specifies whether the node auto-repair is enabled for the node pool. If enabled, the nodes in this node pool will be monitored and, if they fail health checks too many times, an automatic repair action will be triggered.",
        ).optional(),
        autoUpgrade: z.boolean().describe(
          "A flag that specifies whether node auto-upgrade is enabled for the node pool. If enabled, node auto-upgrade helps keep the nodes in your node pool up to date with the latest release version of Kubernetes.",
        ).optional(),
        upgradeOptions: z.object({
          autoUpgradeStartTime: z.unknown().describe(
            "Output only. This field is set when upgrades are about to commence with the approximate start time for the upgrades, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
          ).optional(),
          description: z.unknown().describe(
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
        additionalNodeNetworkConfigs: z.array(z.unknown()).describe(
          "We specify the additional node networks for this node pool using this list. Each node network corresponds to an additional interface",
        ).optional(),
        additionalPodNetworkConfigs: z.array(z.unknown()).describe(
          "We specify the additional pod networks for this node pool using this list. Each pod network corresponds to an additional alias IP range for the node",
        ).optional(),
        createPodRange: z.boolean().describe(
          "Input only. Whether to create a new range for pod IPs in this node pool. Defaults are provided for `pod_range` and `pod_ipv4_cidr_block` if they are not specified. If neither `create_pod_range` or `pod_range` are specified, the cluster-level default (`ip_allocation_policy.cluster_ipv4_cidr_block`) is used. Only applicable if `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed after the node pool has been created.",
        ).optional(),
        enablePrivateNodes: z.boolean().describe(
          "Whether nodes have internal IP addresses only. If enable_private_nodes is not specified, then the value is derived from Cluster.NetworkConfig.default_enable_private_nodes",
        ).optional(),
        network: z.string().describe(
          "Optional. Immutable. The VPC network for the node pool.",
        ).optional(),
        networkPerformanceConfig: z.object({
          totalEgressBandwidthTier: z.unknown().describe(
            "Specifies the total network bandwidth tier for the NodePool.",
          ).optional(),
        }).describe("Configuration of all network bandwidth tiers").optional(),
        networkTierConfig: z.object({
          networkTier: z.unknown().describe("Network tier configuration.")
            .optional(),
        }).describe("NetworkTierConfig contains network tier information.")
          .optional(),
        podCidrOverprovisionConfig: z.object({
          disable: z.unknown().describe(
            "Whether Pod CIDR overprovisioning is disabled. Note: Pod CIDR overprovisioning is enabled by default.",
          ).optional(),
        }).describe(
          "[PRIVATE FIELD] Config for pod CIDR size overprovisioning.",
        ).optional(),
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
        graceTerminationDuration: z.string().describe(
          "The duration of the grace termination period for node drain.",
        ).optional(),
        pdbTimeoutDuration: z.string().describe(
          "The duration of the PDB timeout period for node drain.",
        ).optional(),
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
          blueInstanceGroupUrls: z.unknown().describe(
            "The resource URLs of the [managed instance groups] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with blue pool.",
          ).optional(),
          bluePoolDeletionStartTime: z.unknown().describe(
            "Time to start deleting blue pool to complete blue-green upgrade, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
          ).optional(),
          greenInstanceGroupUrls: z.unknown().describe(
            "The resource URLs of the [managed instance groups] (/compute/docs/instance-groups/creating-groups-of-managed-instances) associated with green pool.",
          ).optional(),
          greenPoolVersion: z.unknown().describe("Version of green pool.")
            .optional(),
          phase: z.unknown().describe("Current blue-green upgrade phase.")
            .optional(),
        }).describe("Information relevant to blue-green upgrade.").optional(),
      }).describe(
        "UpdateInfo contains resource (instance groups, etc), status and other intermediate information relevant to a node pool upgrade.",
      ).optional(),
      upgradeSettings: z.object({
        blueGreenSettings: z.object({
          autoscaledRolloutPolicy: z.unknown().describe(
            "Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.",
          ).optional(),
          nodePoolSoakDuration: z.unknown().describe(
            "Time needed after draining entire blue pool. After this period, blue pool will be cleaned up.",
          ).optional(),
          standardRolloutPolicy: z.unknown().describe(
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
    })).describe(
      'The node pools associated with this cluster. This field should not be set if "node_config" or "initial_node_count" are specified.',
    ).optional(),
    notificationConfig: z.object({
      pubsub: z.object({
        enabled: z.boolean().describe("Enable notifications for Pub/Sub.")
          .optional(),
        filter: z.object({
          eventType: z.array(z.unknown()).describe("Event types to allowlist.")
            .optional(),
        }).describe(
          "Allows filtering to one or more specific event types. If event types are present, those and only those event types will be transmitted to the cluster. Other types will be skipped. If no filter is specified, or no event types are present, all event types will be sent",
        ).optional(),
        topic: z.string().describe(
          "The desired Pub/Sub topic to which notifications will be sent by GKE. Format is `projects/{project}/topics/{topic}`.",
        ).optional(),
      }).describe("Pub/Sub specific notification config.").optional(),
    }).describe("NotificationConfig is the configuration of notifications.")
      .optional(),
    parentProductConfig: z.object({
      labels: z.record(z.string(), z.string()).describe(
        "Labels contain the configuration of the parent product.",
      ).optional(),
      productName: z.string().describe(
        "Name of the parent product associated with the cluster.",
      ).optional(),
    }).describe(
      "ParentProductConfig is the configuration of the parent product of the cluster. This field is used by Google internal products that are built on top of a GKE cluster and take the ownership of the cluster.",
    ).optional(),
    podAutoscaling: z.object({
      hpaProfile: z.enum(["HPA_PROFILE_UNSPECIFIED", "NONE", "PERFORMANCE"])
        .describe("Selected Horizontal Pod Autoscaling profile.").optional(),
    }).describe(
      "PodAutoscaling is used for configuration of parameters for workload autoscaling.",
    ).optional(),
    privateClusterConfig: z.object({
      enablePrivateEndpoint: z.boolean().describe(
        "Whether the master's internal IP address is used as the cluster endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true.",
      ).optional(),
      enablePrivateNodes: z.boolean().describe(
        "Whether nodes have internal IP addresses only. If enabled, all nodes are given only RFC 1918 private addresses and communicate with the master via private networking. Deprecated: Use NetworkConfig.default_enable_private_nodes instead.",
      ).optional(),
      masterGlobalAccessConfig: z.object({
        enabled: z.boolean().describe(
          "Whenever master is accessible globally or not.",
        ).optional(),
      }).describe(
        "Configuration for controlling master global access settings.",
      ).optional(),
      masterIpv4CidrBlock: z.string().describe(
        "The IP range in CIDR notation to use for the hosted master network. This range will be used for assigning internal IP addresses to the master or set of masters, as well as the ILB VIP. This range must not overlap with any other ranges in use within the cluster's network.",
      ).optional(),
      peeringName: z.string().describe(
        "Output only. The peering name in the customer VPC used by this cluster.",
      ).optional(),
      privateEndpoint: z.string().describe(
        "Output only. The internal IP address of this cluster's master endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint instead.",
      ).optional(),
      privateEndpointSubnetwork: z.string().describe(
        "Subnet to provision the master's private endpoint during cluster creation. Specified in projects/*/regions/*/subnetworks/* format. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint_subnetwork instead.",
      ).optional(),
      publicEndpoint: z.string().describe(
        "Output only. The external IP address of this cluster's master endpoint. Deprecated:Use ControlPlaneEndpointsConfig.IPEndpointsConfig.public_endpoint instead.",
      ).optional(),
    }).describe("Configuration options for private clusters.").optional(),
    rbacBindingConfig: z.object({
      enableInsecureBindingSystemAuthenticated: z.boolean().describe(
        "Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjects system:authenticated.",
      ).optional(),
      enableInsecureBindingSystemUnauthenticated: z.boolean().describe(
        "Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjets system:anonymous or system:unauthenticated.",
      ).optional(),
    }).describe(
      "RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created.",
    ).optional(),
    releaseChannel: z.object({
      channel: z.enum(["UNSPECIFIED", "RAPID", "REGULAR", "STABLE", "EXTENDED"])
        .describe(
          "channel specifies which release channel the cluster is subscribed to.",
        ).optional(),
    }).describe(
      "ReleaseChannel indicates which release channel a cluster is subscribed to. Release channels are arranged in order of risk. When a cluster is subscribed to a release channel, Google maintains both the master version and the node version. Node auto-upgrade defaults to true and cannot be disabled.",
    ).optional(),
    resourceLabels: z.record(z.string(), z.string()).describe(
      "The resource labels for the cluster to use to annotate any related Google Compute Engine resources.",
    ).optional(),
    resourceUsageExportConfig: z.object({
      bigqueryDestination: z.object({
        datasetId: z.string().describe("The ID of a BigQuery Dataset.")
          .optional(),
      }).describe(
        "Parameters for using BigQuery as the destination of resource usage export.",
      ).optional(),
      consumptionMeteringConfig: z.object({
        enabled: z.boolean().describe(
          "Whether to enable consumption metering for this cluster. If enabled, a second BigQuery table will be created to hold resource consumption records.",
        ).optional(),
      }).describe("Parameters for controlling consumption metering.")
        .optional(),
      enableNetworkEgressMetering: z.boolean().describe(
        "Whether to enable network egress metering for this cluster. If enabled, a daemonset will be created in the cluster to meter network egress traffic.",
      ).optional(),
    }).describe("Configuration for exporting cluster resource usages.")
      .optional(),
    satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    scheduleUpgradeConfig: z.object({
      enabled: z.boolean().describe(
        "Optional. Whether or not scheduled upgrades are enabled.",
      ).optional(),
    }).describe("Configuration for scheduled upgrades on the cluster.")
      .optional(),
    secretManagerConfig: z.object({
      enabled: z.boolean().describe("Enable/Disable Secret Manager Config.")
        .optional(),
      rotationConfig: z.object({
        enabled: z.boolean().describe("Whether the rotation is enabled.")
          .optional(),
        rotationInterval: z.string().describe(
          "The interval between two consecutive rotations. Default rotation interval is 2 minutes.",
        ).optional(),
      }).describe("RotationConfig is config for secret manager auto rotation.")
        .optional(),
    }).describe("SecretManagerConfig is config for secret manager enablement.")
      .optional(),
    secretSyncConfig: z.object({
      enabled: z.boolean().describe("Enable/Disable Secret Sync Config.")
        .optional(),
      rotationConfig: z.object({
        enabled: z.boolean().describe("Whether the rotation is enabled.")
          .optional(),
        rotationInterval: z.string().describe(
          "The interval between two consecutive rotations. Default rotation interval is 2 minutes.",
        ).optional(),
      }).describe(
        "SyncRotationConfig is config for secret manager auto rotation.",
      ).optional(),
    }).describe("Configuration for sync Secret Manager secrets as k8s secrets.")
      .optional(),
    securityPostureConfig: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "BASIC", "ENTERPRISE"])
        .describe("Sets which mode to use for Security Posture features.")
        .optional(),
      vulnerabilityMode: z.enum([
        "VULNERABILITY_MODE_UNSPECIFIED",
        "VULNERABILITY_DISABLED",
        "VULNERABILITY_BASIC",
        "VULNERABILITY_ENTERPRISE",
      ]).describe("Sets which mode to use for vulnerability scanning.")
        .optional(),
    }).describe(
      "SecurityPostureConfig defines the flags needed to enable/disable features for the Security Posture API.",
    ).optional(),
    selfLink: z.string().describe(
      "Output only. Server-defined URL for the resource.",
    ).optional(),
    servicesIpv4Cidr: z.string().describe(
      "Output only. The IP address range of the Kubernetes services in this cluster, in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `1.2.3.4/29`). Service addresses are typically put in the last `/16` from the container CIDR.",
    ).optional(),
    shieldedNodes: z.object({
      enabled: z.boolean().describe(
        "Whether Shielded Nodes features are enabled on all nodes in this cluster.",
      ).optional(),
    }).describe("Configuration of Shielded Nodes feature.").optional(),
    status: z.enum([
      "STATUS_UNSPECIFIED",
      "PROVISIONING",
      "RUNNING",
      "RECONCILING",
      "STOPPING",
      "ERROR",
      "DEGRADED",
    ]).describe("Output only. The current status of this cluster.").optional(),
    statusMessage: z.string().describe(
      "Output only. Deprecated. Use conditions instead. Additional information about the current status of this cluster, if available.",
    ).optional(),
    subnetwork: z.string().describe(
      "The name of the Google Compute Engine [subnetwork](https://cloud.google.com/compute/docs/subnetworks) to which the cluster is connected.",
    ).optional(),
    tpuIpv4CidrBlock: z.string().describe(
      "Output only. The IP address range of the Cloud TPUs in this cluster, in [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `1.2.3.4/29`). This field is deprecated due to the deprecation of 2VM TPU. The end of life date for 2VM TPU is 2025-04-25.",
    ).optional(),
    userManagedKeysConfig: z.object({
      aggregationCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the aggregation CA in this cluster.",
      ).optional(),
      clusterCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the cluster CA in this cluster.",
      ).optional(),
      controlPlaneDiskEncryptionKey: z.string().describe(
        "The Cloud KMS cryptoKey to use for Confidential Hyperdisk on the control plane nodes.",
      ).optional(),
      controlPlaneDiskEncryptionKeyVersions: z.array(z.string()).describe(
        "Output only. All of the versions of the Cloud KMS cryptoKey that are used by Confidential Hyperdisks on the control plane nodes.",
      ).optional(),
      etcdApiCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd API CA in this cluster.",
      ).optional(),
      etcdPeerCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd peer CA in this cluster.",
      ).optional(),
      gkeopsEtcdBackupEncryptionKey: z.string().describe(
        "Resource path of the Cloud KMS cryptoKey to use for encryption of internal etcd backups.",
      ).optional(),
      serviceAccountSigningKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for signing service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
      serviceAccountVerificationKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for verifying service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
    }).describe(
      "UserManagedKeysConfig holds the resource address to Keys which are used for signing certs and token that are used for communication within cluster.",
    ).optional(),
    verticalPodAutoscaling: z.object({
      enabled: z.boolean().describe("Enables vertical pod autoscaling.")
        .optional(),
    }).describe(
      "VerticalPodAutoscaling contains global, per-cluster information required by Vertical Pod Autoscaler to automatically adjust the resources of pods controlled by it.",
    ).optional(),
    workloadIdentityConfig: z.object({
      workloadPool: z.string().describe(
        "The workload pool to attach all Kubernetes service accounts to.",
      ).optional(),
    }).describe(
      "Configuration for the use of Kubernetes Service Accounts in IAM policies.",
    ).optional(),
    zone: z.string().describe(
      "Output only. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field is deprecated, use location instead.",
    ).optional(),
  }).describe("A Google Kubernetes Engine cluster.").optional(),
  parent: z.string().describe(
    "The parent (project and location) where the cluster will be created. Specified in the format `projects/*/locations/*`.",
  ).optional(),
  name: z.string().describe(
    "The name (project, location, cluster) of the cluster to update. Specified in the format `projects/*/locations/*/clusters/*`.",
  ).optional(),
  update: z.object({
    additionalPodRangesConfig: z.object({
      podRangeInfo: z.array(z.object({
        rangeName: z.string().describe("Output only. Name of a range.")
          .optional(),
        utilization: z.number().describe(
          "Output only. The utilization of the range.",
        ).optional(),
      })).describe("Output only. Information for additional pod range.")
        .optional(),
      podRangeNames: z.array(z.string()).describe(
        "Name for pod secondary ipv4 range which has the actual range defined ahead.",
      ).optional(),
    }).describe(
      "AdditionalPodRangesConfig is the configuration for additional pod secondary ranges supporting the ClusterUpdate message.",
    ).optional(),
    desiredAdditionalIpRangesConfig: z.object({
      additionalIpRangesConfigs: z.array(z.object({
        podIpv4RangeNames: z.array(z.unknown()).describe(
          "List of secondary ranges names within this subnetwork that can be used for pod IPs. Example1: gke-pod-range1 Example2: gke-pod-range1,gke-pod-range2",
        ).optional(),
        status: z.enum(["STATUS_UNSPECIFIED", "ACTIVE", "DRAINING"]).describe(
          "Draining status of the additional subnet.",
        ).optional(),
        subnetwork: z.string().describe(
          "Name of the subnetwork. This can be the full path of the subnetwork or just the name. Example1: my-subnet Example2: projects/gke-project/regions/us-central1/subnetworks/my-subnet",
        ).optional(),
      })).describe(
        "List of additional IP ranges configs where each AdditionalIPRangesConfig corresponds to one subnetwork's IP ranges",
      ).optional(),
    }).describe(
      "DesiredAdditionalIPRangesConfig is a wrapper used for cluster update operation and contains multiple AdditionalIPRangesConfigs.",
    ).optional(),
    desiredAddonsConfig: z.object({
      agentSandboxConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether AgentSandbox is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the AgentSandbox addon.").optional(),
      cloudRunConfig: z.object({
        disabled: z.boolean().describe(
          "Whether Cloud Run addon is enabled for this cluster.",
        ).optional(),
        loadBalancerType: z.enum([
          "LOAD_BALANCER_TYPE_UNSPECIFIED",
          "LOAD_BALANCER_TYPE_EXTERNAL",
          "LOAD_BALANCER_TYPE_INTERNAL",
        ]).describe("Which load balancer type is installed for Cloud Run.")
          .optional(),
      }).describe("Configuration options for the Cloud Run feature.")
        .optional(),
      configConnectorConfig: z.object({
        enabled: z.boolean().describe(
          "Whether Cloud Connector is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration options for the Config Connector add-on.")
        .optional(),
      dnsCacheConfig: z.object({
        enabled: z.boolean().describe(
          "Whether NodeLocal DNSCache is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for NodeLocal DNSCache").optional(),
      gcePersistentDiskCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Compute Engine PD CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Compute Engine PD CSI driver.")
        .optional(),
      gcpFilestoreCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Filestore CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Filestore CSI driver.").optional(),
      gcsFuseCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Cloud Storage Fuse CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Cloud Storage Fuse CSI driver.")
        .optional(),
      gkeBackupAgentConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Backup for GKE agent is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Backup for GKE Agent.").optional(),
      highScaleCheckpointingConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the High Scale Checkpointing is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the High Scale Checkpointing.").optional(),
      horizontalPodAutoscaling: z.object({
        disabled: z.boolean().describe(
          "Whether the Horizontal Pod Autoscaling feature is enabled in the cluster. When enabled, it ensures that metrics are collected into Stackdriver Monitoring.",
        ).optional(),
      }).describe(
        "Configuration options for the horizontal pod autoscaling feature, which increases or decreases the number of replica pods a replication controller has based on the resource usage of the existing pods.",
      ).optional(),
      httpLoadBalancing: z.object({
        disabled: z.boolean().describe(
          "Whether the HTTP Load Balancing controller is enabled in the cluster. When enabled, it runs a small pod in the cluster that manages the load balancers.",
        ).optional(),
      }).describe(
        "Configuration options for the HTTP (L7) load balancing controller addon, which makes it easy to set up HTTP load balancers for services in a cluster.",
      ).optional(),
      kubernetesDashboard: z.object({
        disabled: z.boolean().describe(
          "Whether the Kubernetes Dashboard is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Kubernetes Dashboard.").optional(),
      lustreCsiDriverConfig: z.object({
        disableMultiNic: z.boolean().describe(
          "When set to true, this disables multi-NIC support for the Lustre CSI driver. By default, GKE enables multi-NIC support, which allows the Lustre CSI driver to automatically detect and configure all suitable network interfaces on a node to maximize I/O performance for demanding workloads.",
        ).optional(),
        enableLegacyLustrePort: z.boolean().describe(
          "If set to true, the Lustre CSI driver will install Lustre kernel modules using port 6988. This serves as a workaround for a port conflict with the gke-metadata-server. This field is required ONLY under the following conditions: 1. The GKE node version is older than 1.33.2-gke.4655000. 2. You're connecting to a Lustre instance that has the 'gke-support-enabled' flag. Deprecated: This flag is no longer required as of GKE node version 1.33.2-gke.4655000, unless you are connecting to a Lustre instance that has the `gke-support-enabled` flag.",
        ).optional(),
        enabled: z.boolean().describe(
          "Whether the Lustre CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Lustre CSI driver.").optional(),
      networkPolicyConfig: z.object({
        disabled: z.boolean().describe(
          "Whether NetworkPolicy is enabled for this cluster.",
        ).optional(),
      }).describe(
        "Configuration for NetworkPolicy. This only tracks whether the addon is enabled or not on the Master, it does not track whether network policy is enabled for the nodes.",
      ).optional(),
      nodeReadinessConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether the GKE Node Readiness Controller is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the GKE Node Readiness Controller.")
        .optional(),
      parallelstoreCsiDriverConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Cloud Storage Parallelstore CSI driver is enabled for this cluster.",
        ).optional(),
      }).describe(
        "Configuration for the Cloud Storage Parallelstore CSI driver.",
      ).optional(),
      podSnapshotConfig: z.object({
        enabled: z.boolean().describe(
          "Whether or not the Pod Snapshots feature is enabled.",
        ).optional(),
      }).describe(
        "PodSnapshotConfig is the configuration for GKE Pod Snapshots feature.",
      ).optional(),
      rayOperatorConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Ray Operator addon is enabled for this cluster.",
        ).optional(),
        rayClusterLoggingConfig: z.object({
          enabled: z.boolean().describe(
            "Enable log collection for Ray clusters.",
          ).optional(),
        }).describe(
          "RayClusterLoggingConfig specifies configuration of Ray logging.",
        ).optional(),
        rayClusterMonitoringConfig: z.object({
          enabled: z.boolean().describe(
            "Enable metrics collection for Ray clusters.",
          ).optional(),
        }).describe(
          "RayClusterMonitoringConfig specifies monitoring configuration for Ray clusters.",
        ).optional(),
      }).describe("Configuration options for the Ray Operator add-on.")
        .optional(),
      sliceControllerConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Indicates whether Slice Controller is enabled in the cluster.",
        ).optional(),
      }).describe("Configuration for the Slice Controller.").optional(),
      slurmOperatorConfig: z.object({
        enabled: z.boolean().describe(
          "When enabled, it runs a Slurm Operator that manages the set of compute pods for Slurm Cluster.",
        ).optional(),
      }).describe("Configuration for the Slurm Operator.").optional(),
      statefulHaConfig: z.object({
        enabled: z.boolean().describe(
          "Whether the Stateful HA add-on is enabled for this cluster.",
        ).optional(),
      }).describe("Configuration for the Stateful HA add-on.").optional(),
    }).describe(
      "Configuration for the addons that can be automatically spun up in the cluster, enabling additional functionality.",
    ).optional(),
    desiredAnonymousAuthenticationConfig: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "ENABLED", "LIMITED"]).describe(
        "Defines the mode of limiting anonymous access in the cluster.",
      ).optional(),
    }).describe(
      "AnonymousAuthenticationConfig defines the settings needed to limit endpoints that allow anonymous authentication.",
    ).optional(),
    desiredAuthenticatorGroupsConfig: z.object({
      enabled: z.boolean().describe(
        "Whether this cluster should return group membership lookups during authentication using a group of security groups.",
      ).optional(),
      securityGroup: z.string().describe(
        "The name of the security group-of-groups to be used. Only relevant if enabled = true.",
      ).optional(),
    }).describe(
      "Configuration for returning group information from authenticators.",
    ).optional(),
    desiredAutoIpamConfig: z.object({
      enabled: z.boolean().describe(
        "The flag that enables Auto IPAM on this cluster",
      ).optional(),
    }).describe("AutoIpamConfig contains all information related to Auto IPAM")
      .optional(),
    desiredAutopilotClusterPolicyConfig: z.object({
      noStandardNodePools: z.boolean().describe(
        "Denotes preventing standard node pools and requiring only autopilot node pools.",
      ).optional(),
      noSystemImpersonation: z.boolean().describe(
        "Denotes preventing impersonation and CSRs for GKE System users.",
      ).optional(),
      noSystemMutation: z.boolean().describe(
        "Denotes that preventing creation and mutation of resources in GKE managed namespaces and cluster-scoped GKE managed resources.",
      ).optional(),
      noUnsafeWebhooks: z.boolean().describe(
        "Denotes preventing unsafe webhooks.",
      ).optional(),
    }).describe(
      "ClusterPolicyConfig stores the configuration for cluster wide policies.",
    ).optional(),
    desiredAutopilotWorkloadPolicyConfig: z.object({
      allowNetAdmin: z.boolean().describe(
        "If true, workloads can use NET_ADMIN capability.",
      ).optional(),
      autopilotCompatibilityAuditingEnabled: z.boolean().describe(
        "If true, enables the GCW Auditor that audits workloads on standard clusters.",
      ).optional(),
    }).describe(
      "WorkloadPolicyConfig is the configuration related to GCW workload policy",
    ).optional(),
    desiredBinaryAuthorization: z.object({
      enabled: z.boolean().describe(
        "This field is deprecated. Leave this unset and instead configure BinaryAuthorization using evaluation_mode. If evaluation_mode is set to anything other than EVALUATION_MODE_UNSPECIFIED, this field is ignored.",
      ).optional(),
      evaluationMode: z.enum([
        "EVALUATION_MODE_UNSPECIFIED",
        "DISABLED",
        "PROJECT_SINGLETON_POLICY_ENFORCE",
      ]).describe(
        "Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED.",
      ).optional(),
    }).describe("Configuration for Binary Authorization.").optional(),
    desiredClusterAutoscaling: z.object({
      autopilotGeneralProfile: z.enum([
        "AUTOPILOT_GENERAL_PROFILE_UNSPECIFIED",
        "NO_PERFORMANCE",
        "NONE",
      ]).describe(
        "Autopilot general profile for the cluster, which defines the configuration for the cluster.",
      ).optional(),
      autoprovisioningLocations: z.array(z.string()).describe(
        "The list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the NodePool's nodes can be created by NAP.",
      ).optional(),
      autoprovisioningNodePoolDefaults: z.object({
        bootDiskKmsKey: z.string().describe(
          "The Customer Managed Encryption Key used to encrypt the boot disk attached to each node in the node pool. This should be of the form projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME]. For more information about protecting resources with Cloud KMS Keys please see: https://cloud.google.com/compute/docs/disks/customer-managed-encryption",
        ).optional(),
        diskSizeGb: z.number().int().describe(
          "Size of the disk attached to each node, specified in GB. The smallest allowed disk size is 10GB. If unspecified, the default disk size is 100GB.",
        ).optional(),
        diskType: z.string().describe(
          "Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or 'pd-balanced') If unspecified, the default disk type is 'pd-standard'",
        ).optional(),
        imageType: z.string().describe(
          "The image type to use for NAP created node. Please see https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for available image types.",
        ).optional(),
        insecureKubeletReadonlyPortEnabled: z.boolean().describe(
          "DEPRECATED. Use NodePoolAutoConfig.NodeKubeletConfig instead.",
        ).optional(),
        management: z.object({
          autoRepair: z.boolean().describe(
            "A flag that specifies whether the node auto-repair is enabled for the node pool. If enabled, the nodes in this node pool will be monitored and, if they fail health checks too many times, an automatic repair action will be triggered.",
          ).optional(),
          autoUpgrade: z.boolean().describe(
            "A flag that specifies whether node auto-upgrade is enabled for the node pool. If enabled, node auto-upgrade helps keep the nodes in your node pool up to date with the latest release version of Kubernetes.",
          ).optional(),
          upgradeOptions: z.object({
            autoUpgradeStartTime: z.unknown().describe(
              "Output only. This field is set when upgrades are about to commence with the approximate start time for the upgrades, in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.",
            ).optional(),
            description: z.unknown().describe(
              "Output only. This field is set when upgrades are about to commence with the description of the upgrade.",
            ).optional(),
          }).describe(
            "AutoUpgradeOptions defines the set of options for the user to control how the Auto Upgrades will proceed.",
          ).optional(),
        }).describe(
          "NodeManagement defines the set of node management services turned on for the node pool.",
        ).optional(),
        minCpuPlatform: z.string().describe(
          'Deprecated. Minimum CPU platform to be used for NAP created node pools. The instance may be scheduled on the specified or newer CPU platform. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: Intel Haswell or minCpuPlatform: Intel Sandy Bridge. For more information, read [how to specify min CPU platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform). This field is deprecated, min_cpu_platform should be specified using `cloud.google.com/requested-min-cpu-platform` label selector on the pod. To unset the min cpu platform field pass "automatic" as field value.',
        ).optional(),
        oauthScopes: z.array(z.string()).describe(
          "Scopes that are used by NAP when creating node pools.",
        ).optional(),
        serviceAccount: z.string().describe(
          "The Google Cloud Platform Service Account to be used by the node VMs.",
        ).optional(),
        shieldedInstanceConfig: z.object({
          enableIntegrityMonitoring: z.boolean().describe(
            "Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created.",
          ).optional(),
          enableSecureBoot: z.boolean().describe(
            "Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails.",
          ).optional(),
        }).describe("A set of Shielded Instance options.").optional(),
        upgradeSettings: z.object({
          blueGreenSettings: z.object({
            autoscaledRolloutPolicy: z.unknown().describe(
              "Autoscaled rollout policy utilizes the cluster autoscaler during blue-green upgrade to scale both the blue and green pools.",
            ).optional(),
            nodePoolSoakDuration: z.unknown().describe(
              "Time needed after draining entire blue pool. After this period, blue pool will be cleaned up.",
            ).optional(),
            standardRolloutPolicy: z.unknown().describe(
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
      }).describe(
        "AutoprovisioningNodePoolDefaults contains defaults for a node pool created by NAP.",
      ).optional(),
      autoscalingProfile: z.enum([
        "PROFILE_UNSPECIFIED",
        "OPTIMIZE_UTILIZATION",
        "BALANCED",
      ]).describe("Defines autoscaling behaviour.").optional(),
      defaultComputeClassConfig: z.object({
        enabled: z.boolean().describe("Enables default compute class.")
          .optional(),
      }).describe(
        "DefaultComputeClassConfig defines default compute class configuration.",
      ).optional(),
      enableNodeAutoprovisioning: z.boolean().describe(
        "Enables automatic node pool creation and deletion.",
      ).optional(),
      resourceLimits: z.array(z.object({
        maximum: z.string().describe(
          "Maximum amount of the resource in the cluster.",
        ).optional(),
        minimum: z.string().describe(
          "Minimum amount of the resource in the cluster.",
        ).optional(),
        resourceType: z.string().describe(
          'Resource name "cpu", "memory" or gpu-specific string.',
        ).optional(),
      })).describe(
        "Contains global constraints regarding minimum and maximum amount of resources in the cluster.",
      ).optional(),
    }).describe(
      "ClusterAutoscaling contains global, per-cluster information required by Cluster Autoscaler to automatically adjust the size of the cluster and create/delete node pools based on the current needs.",
    ).optional(),
    desiredCompliancePostureConfig: z.object({
      complianceStandards: z.array(z.object({
        standard: z.string().describe("Name of the compliance standard.")
          .optional(),
      })).describe("List of enabled compliance standards.").optional(),
      mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "ENABLED"]).describe(
        "Defines the enablement mode for Compliance Posture.",
      ).optional(),
    }).describe(
      "Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. CompliancePostureConfig defines the settings needed to enable/disable features for the Compliance Posture.",
    ).optional(),
    desiredContainerdConfig: z.object({
      privateRegistryAccessConfig: z.object({
        certificateAuthorityDomainConfig: z.array(z.object({
          fqdns: z.unknown().describe(
            "List of fully qualified domain names (FQDN). Specifying port is supported. Wildcards are NOT supported. Examples: - `my.customdomain.com` - `10.0.1.2:5000`",
          ).optional(),
          gcpSecretManagerCertificateConfig: z.unknown().describe(
            "GCPSecretManagerCertificateConfig configures a secret from [Secret Manager](https://cloud.google.com/secret-manager).",
          ).optional(),
        })).describe("Private registry access configuration.").optional(),
        enabled: z.boolean().describe("Private registry access is enabled.")
          .optional(),
      }).describe(
        "PrivateRegistryAccessConfig contains access configuration for private container registries.",
      ).optional(),
      registryHosts: z.array(z.object({
        hosts: z.array(z.unknown()).describe(
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
    desiredControlPlaneEgress: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "VIA_CONTROL_PLANE", "NONE"]).describe(
        "Defines the mode of control plane egress.",
      ).optional(),
    }).describe(
      "ControlPlaneEgress defines the settings needed to enable control plane egress control.",
    ).optional(),
    desiredControlPlaneEndpointsConfig: z.object({
      dnsEndpointConfig: z.object({
        allowExternalTraffic: z.boolean().describe(
          "Controls whether user traffic is allowed over this endpoint. Note that Google-managed services may still use the endpoint even if this is false.",
        ).optional(),
        enableK8sCertsViaDns: z.boolean().describe(
          "Controls whether the k8s certs auth is allowed via DNS.",
        ).optional(),
        enableK8sTokensViaDns: z.boolean().describe(
          "Controls whether the k8s token auth is allowed via DNS.",
        ).optional(),
        endpoint: z.string().describe(
          "Output only. The cluster's DNS endpoint configuration. A DNS format address. This is accessible from the public internet. Ex: uid.us-central1.gke.goog. Always present, but the behavior may change according to the value of DNSEndpointConfig.allow_external_traffic.",
        ).optional(),
      }).describe("Describes the configuration of a DNS endpoint.").optional(),
      ipEndpointsConfig: z.object({
        authorizedNetworksConfig: z.object({
          cidrBlocks: z.array(z.unknown()).describe(
            "cidr_blocks define up to 50 external networks that could access Kubernetes master through HTTPS.",
          ).optional(),
          enabled: z.boolean().describe(
            "Whether or not master authorized networks is enabled.",
          ).optional(),
          gcpPublicCidrsAccessEnabled: z.boolean().describe(
            "Whether master is accessible via Google Compute Engine Public IP addresses.",
          ).optional(),
          privateEndpointEnforcementEnabled: z.boolean().describe(
            "Whether master authorized networks is enforced on private endpoint or not.",
          ).optional(),
        }).describe(
          "Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.",
        ).optional(),
        enablePublicEndpoint: z.boolean().describe(
          "Controls whether the control plane allows access through a public IP. It is invalid to specify both PrivateClusterConfig.enablePrivateEndpoint and this field at the same time.",
        ).optional(),
        enabled: z.boolean().describe(
          "Controls whether to allow direct IP access.",
        ).optional(),
        globalAccess: z.boolean().describe(
          "Controls whether the control plane's private endpoint is accessible from sources in other regions. It is invalid to specify both PrivateClusterMasterGlobalAccessConfig.enabled and this field at the same time.",
        ).optional(),
        privateEndpoint: z.string().describe(
          "Output only. The internal IP address of this cluster's control plane. Only populated if enabled.",
        ).optional(),
        privateEndpointSubnetwork: z.string().describe(
          "Subnet to provision the master's private endpoint during cluster creation. Specified in projects/*/regions/*/subnetworks/* format. It is invalid to specify both PrivateClusterConfig.privateEndpointSubnetwork and this field at the same time.",
        ).optional(),
        publicEndpoint: z.string().describe(
          "Output only. The external IP address of this cluster's control plane. Only populated if enabled.",
        ).optional(),
      }).describe("IP endpoints configuration.").optional(),
    }).describe(
      "Configuration for all of the cluster's control plane endpoints.",
    ).optional(),
    desiredCostManagementConfig: z.object({
      enabled: z.boolean().describe("Whether the feature is enabled or not.")
        .optional(),
    }).describe("Configuration for fine-grained cost management feature.")
      .optional(),
    desiredDatabaseEncryption: z.object({
      currentState: z.enum([
        "CURRENT_STATE_UNSPECIFIED",
        "CURRENT_STATE_ENCRYPTED",
        "CURRENT_STATE_DECRYPTED",
        "CURRENT_STATE_ENCRYPTION_PENDING",
        "CURRENT_STATE_ENCRYPTION_ERROR",
        "CURRENT_STATE_DECRYPTION_PENDING",
        "CURRENT_STATE_DECRYPTION_ERROR",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_ENABLED",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_PENDING",
        "CURRENT_STATE_ALL_OBJECTS_ENCRYPTION_ERROR",
      ]).describe("Output only. The current state of etcd encryption.")
        .optional(),
      decryptionKeys: z.array(z.string()).describe(
        "Output only. Keys in use by the cluster for decrypting existing objects, in addition to the key in `key_name`. Each item is a CloudKMS key resource.",
      ).optional(),
      keyName: z.string().describe(
        "Name of CloudKMS key to use for the encryption of secrets in etcd. Ex. projects/my-project/locations/global/keyRings/my-ring/cryptoKeys/my-key",
      ).optional(),
      lastOperationErrors: z.array(z.object({
        errorMessage: z.string().describe(
          "Description of the error seen during the operation.",
        ).optional(),
        keyName: z.string().describe(
          "CloudKMS key resource that had the error.",
        ).optional(),
        timestamp: z.string().describe("Time when the CloudKMS error was seen.")
          .optional(),
      })).describe(
        "Output only. Records errors seen during DatabaseEncryption update operations.",
      ).optional(),
      state: z.enum([
        "UNKNOWN",
        "ENCRYPTED",
        "DECRYPTED",
        "ALL_OBJECTS_ENCRYPTION_ENABLED",
      ]).describe("The desired state of etcd encryption.").optional(),
    }).describe("Configuration of etcd encryption.").optional(),
    desiredDatapathProvider: z.enum([
      "DATAPATH_PROVIDER_UNSPECIFIED",
      "LEGACY_DATAPATH",
      "ADVANCED_DATAPATH",
    ]).describe("The desired datapath provider for the cluster.").optional(),
    desiredDefaultEnablePrivateNodes: z.boolean().describe(
      "Override the default setting of whether future created nodes have private IP addresses only, namely NetworkConfig.default_enable_private_nodes",
    ).optional(),
    desiredDefaultSnatStatus: z.object({
      disabled: z.boolean().describe("Disables cluster default sNAT rules.")
        .optional(),
    }).describe(
      "DefaultSnatStatus contains the desired state of whether default sNAT should be disabled on the cluster.",
    ).optional(),
    desiredDisableL4LbFirewallReconciliation: z.boolean().describe(
      "Enable/Disable L4 LB VPC firewall reconciliation for the cluster.",
    ).optional(),
    desiredDnsConfig: z.object({
      additiveVpcScopeDnsDomain: z.string().describe(
        "Optional. The domain used in Additive VPC scope.",
      ).optional(),
      clusterDns: z.enum([
        "PROVIDER_UNSPECIFIED",
        "PLATFORM_DEFAULT",
        "CLOUD_DNS",
        "KUBE_DNS",
      ]).describe(
        "cluster_dns indicates which in-cluster DNS provider should be used.",
      ).optional(),
      clusterDnsDomain: z.string().describe(
        "cluster_dns_domain is the suffix used for all cluster service records.",
      ).optional(),
      clusterDnsScope: z.enum([
        "DNS_SCOPE_UNSPECIFIED",
        "CLUSTER_SCOPE",
        "VPC_SCOPE",
      ]).describe(
        "cluster_dns_scope indicates the scope of access to cluster DNS records.",
      ).optional(),
    }).describe(
      "DNSConfig contains the desired set of options for configuring clusterDNS.",
    ).optional(),
    desiredEnableCiliumClusterwideNetworkPolicy: z.boolean().describe(
      "Enable/Disable Cilium Clusterwide Network Policy for the cluster.",
    ).optional(),
    desiredEnableFqdnNetworkPolicy: z.boolean().describe(
      "Enable/Disable FQDN Network Policy for the cluster.",
    ).optional(),
    desiredEnableMultiNetworking: z.boolean().describe(
      "Enable/Disable Multi-Networking for the cluster",
    ).optional(),
    desiredEnablePrivateEndpoint: z.boolean().describe(
      "Enable/Disable private endpoint for the cluster's master. Deprecated: Use desired_control_plane_endpoints_config.ip_endpoints_config.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true.",
    ).optional(),
    desiredEnterpriseConfig: z.object({
      desiredTier: z.enum([
        "CLUSTER_TIER_UNSPECIFIED",
        "STANDARD",
        "ENTERPRISE",
      ]).describe("desired_tier specifies the desired tier of the cluster.")
        .optional(),
    }).describe(
      "DesiredEnterpriseConfig is a wrapper used for updating enterprise_config. Deprecated: GKE Enterprise features are now available without an Enterprise tier.",
    ).optional(),
    desiredFleet: z.object({
      membership: z.string().describe(
        "Output only. The full resource name of the registered fleet membership of the cluster, in the format `//gkehub.googleapis.com/projects/*/locations/*/memberships/*`.",
      ).optional(),
      membershipType: z.enum(["MEMBERSHIP_TYPE_UNSPECIFIED", "LIGHTWEIGHT"])
        .describe("The type of the cluster's fleet membership.").optional(),
      preRegistered: z.boolean().describe(
        "Output only. Whether the cluster has been registered through the fleet API.",
      ).optional(),
      project: z.string().describe(
        "The Fleet host project(project ID or project number) where this cluster will be registered to. This field cannot be changed after the cluster has been registered.",
      ).optional(),
    }).describe("Fleet is the fleet configuration for the cluster.").optional(),
    desiredGatewayApiConfig: z.object({
      channel: z.enum([
        "CHANNEL_UNSPECIFIED",
        "CHANNEL_DISABLED",
        "CHANNEL_EXPERIMENTAL",
        "CHANNEL_STANDARD",
      ]).describe("The Gateway API release channel to use for Gateway API.")
        .optional(),
    }).describe(
      "GatewayAPIConfig contains the desired config of Gateway API on this cluster.",
    ).optional(),
    desiredGcfsConfig: z.object({
      enabled: z.boolean().describe("Whether to use GCFS.").optional(),
    }).describe(
      "GcfsConfig contains configurations of Google Container File System (image streaming).",
    ).optional(),
    desiredIdentityServiceConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable the Identity Service component",
      ).optional(),
    }).describe(
      "IdentityServiceConfig is configuration for Identity Service which allows customers to use external identity providers with the K8S API",
    ).optional(),
    desiredImage: z.string().describe(
      'The desired name of the image to use for this node. This is used to create clusters using a custom image. NOTE: Set the "desired_node_pool" field as well.',
    ).optional(),
    desiredImageProject: z.string().describe(
      'The project containing the desired image to use for this node. This is used to create clusters using a custom image. NOTE: Set the "desired_node_pool" field as well.',
    ).optional(),
    desiredImageType: z.string().describe(
      'The desired image type for the node pool. NOTE: Set the "desired_node_pool" field as well.',
    ).optional(),
    desiredInTransitEncryptionConfig: z.enum([
      "IN_TRANSIT_ENCRYPTION_CONFIG_UNSPECIFIED",
      "IN_TRANSIT_ENCRYPTION_DISABLED",
      "IN_TRANSIT_ENCRYPTION_INTER_NODE_TRANSPARENT",
    ]).describe("Specify the details of in-transit encryption.").optional(),
    desiredIntraNodeVisibilityConfig: z.object({
      enabled: z.boolean().describe(
        "Enables intra node visibility for this cluster.",
      ).optional(),
    }).describe(
      "IntraNodeVisibilityConfig contains the desired config of the intra-node visibility on this cluster.",
    ).optional(),
    desiredK8sBetaApis: z.object({
      enabledApis: z.array(z.string()).describe("Enabled k8s beta APIs.")
        .optional(),
    }).describe("K8sBetaAPIConfig, configuration for beta APIs").optional(),
    desiredL4ilbSubsettingConfig: z.object({
      enabled: z.boolean().describe(
        "Enables l4 ILB subsetting for this cluster.",
      ).optional(),
    }).describe(
      "ILBSubsettingConfig contains the desired config of L4 Internal LoadBalancer subsetting on this cluster.",
    ).optional(),
    desiredLocations: z.array(z.string()).describe(
      "The desired list of Google Compute Engine [zones](https://cloud.google.com/compute/docs/zones#available) in which the cluster's nodes should be located. This list must always include the cluster's primary zone. Warning: changing cluster locations will update the locations of all node pools and will result in nodes being added and/or removed.",
    ).optional(),
    desiredLoggingConfig: z.object({
      componentConfig: z.object({
        enableComponents: z.array(
          z.enum([
            "COMPONENT_UNSPECIFIED",
            "SYSTEM_COMPONENTS",
            "WORKLOADS",
            "APISERVER",
            "SCHEDULER",
            "CONTROLLER_MANAGER",
            "KCP_SSHD",
            "KCP_CONNECTION",
            "KCP_HPA",
          ]),
        ).describe(
          "Select components to collect logs. An empty set would disable all logging.",
        ).optional(),
      }).describe(
        "LoggingComponentConfig is cluster logging component configuration.",
      ).optional(),
    }).describe("LoggingConfig is cluster logging configuration.").optional(),
    desiredLoggingService: z.string().describe(
      "The logging service the cluster should use to write logs. Currently available options: * `logging.googleapis.com/kubernetes` - The Cloud Logging service with a Kubernetes-native resource model * `logging.googleapis.com` - The legacy Cloud Logging service (no longer available as of GKE 1.15). * `none` - no logs will be exported from the cluster. If left as an empty string,`logging.googleapis.com/kubernetes` will be used for GKE 1.14+ or `logging.googleapis.com` for earlier versions.",
    ).optional(),
    desiredManagedMachineLearningDiagnosticsConfig: z.object({
      enabled: z.boolean().describe(
        "Enable/Disable Managed Machine Learning Diagnostics.",
      ).optional(),
    }).describe(
      "ManagedMachineLearningDiagnosticsConfig is the configuration for the GKE Managed Machine Learning Diagnostics pipeline.",
    ).optional(),
    desiredManagedOpentelemetryConfig: z.object({
      scope: z.enum([
        "SCOPE_UNSPECIFIED",
        "NONE",
        "COLLECTION_AND_INSTRUMENTATION_COMPONENTS",
      ]).describe("Scope of the Managed OpenTelemetry pipeline.").optional(),
    }).describe(
      "ManagedOpenTelemetryConfig is the configuration for the GKE Managed OpenTelemetry pipeline.",
    ).optional(),
    desiredMasterAuthorizedNetworksConfig: z.object({
      cidrBlocks: z.array(z.object({
        cidrBlock: z.string().describe(
          "cidr_block must be specified in CIDR notation.",
        ).optional(),
        displayName: z.string().describe(
          "display_name is an optional field for users to identify CIDR blocks.",
        ).optional(),
      })).describe(
        "cidr_blocks define up to 50 external networks that could access Kubernetes master through HTTPS.",
      ).optional(),
      enabled: z.boolean().describe(
        "Whether or not master authorized networks is enabled.",
      ).optional(),
      gcpPublicCidrsAccessEnabled: z.boolean().describe(
        "Whether master is accessible via Google Compute Engine Public IP addresses.",
      ).optional(),
      privateEndpointEnforcementEnabled: z.boolean().describe(
        "Whether master authorized networks is enforced on private endpoint or not.",
      ).optional(),
    }).describe(
      "Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.",
    ).optional(),
    desiredMasterVersion: z.string().describe(
      'The Kubernetes version to change the master to. Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the default Kubernetes version',
    ).optional(),
    desiredMeshCertificates: z.object({
      enableCertificates: z.boolean().describe(
        "enable_certificates controls issuance of workload mTLS certificates. If set, the GKE Workload Identity Certificates controller and node agent will be deployed in the cluster, which can then be configured by creating a WorkloadCertificateConfig Custom Resource. Requires Workload Identity (workload_pool must be non-empty).",
      ).optional(),
    }).describe(
      "Configuration for issuance of mTLS keys and certificates to Kubernetes pods.",
    ).optional(),
    desiredMonitoringConfig: z.object({
      advancedDatapathObservabilityConfig: z.object({
        enableMetrics: z.boolean().describe("Expose flow metrics on nodes")
          .optional(),
        enableRelay: z.boolean().describe("Enable Relay component").optional(),
        relayMode: z.enum([
          "RELAY_MODE_UNSPECIFIED",
          "DISABLED",
          "INTERNAL_VPC_LB",
          "EXTERNAL_LB",
        ]).describe("Method used to make Relay available").optional(),
      }).describe(
        "AdvancedDatapathObservabilityConfig specifies configuration of observability features of advanced datapath.",
      ).optional(),
      componentConfig: z.object({
        enableComponents: z.array(
          z.enum([
            "COMPONENT_UNSPECIFIED",
            "SYSTEM_COMPONENTS",
            "APISERVER",
            "SCHEDULER",
            "CONTROLLER_MANAGER",
            "STORAGE",
            "HPA",
            "POD",
            "DAEMONSET",
            "DEPLOYMENT",
            "STATEFULSET",
            "CADVISOR",
            "KUBELET",
            "DCGM",
            "JOBSET",
          ]),
        ).describe(
          "Select components to collect metrics. An empty set would disable all monitoring.",
        ).optional(),
      }).describe(
        "MonitoringComponentConfig is cluster monitoring component configuration.",
      ).optional(),
      managedPrometheusConfig: z.object({
        autoMonitoringConfig: z.object({
          scope: z.enum(["SCOPE_UNSPECIFIED", "ALL", "NONE"]).describe(
            "Scope for GKE Workload Auto-Monitoring.",
          ).optional(),
        }).describe(
          "AutoMonitoringConfig defines the configuration for GKE Workload Auto-Monitoring.",
        ).optional(),
        enabled: z.boolean().describe("Enable Managed Collection.").optional(),
      }).describe(
        "ManagedPrometheusConfig defines the configuration for Google Cloud Managed Service for Prometheus.",
      ).optional(),
    }).describe("MonitoringConfig is cluster monitoring configuration.")
      .optional(),
    desiredMonitoringService: z.string().describe(
      "The monitoring service the cluster should use to write metrics. Currently available options: * `monitoring.googleapis.com/kubernetes` - The Cloud Monitoring service with a Kubernetes-native resource model * `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no longer available as of GKE 1.15). * `none` - No metrics will be exported from the cluster. If left as an empty string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or `monitoring.googleapis.com` for earlier versions.",
    ).optional(),
    desiredNetworkPerformanceConfig: z.object({
      totalEgressBandwidthTier: z.enum(["TIER_UNSPECIFIED", "TIER_1"]).describe(
        "Specifies the total network bandwidth tier for NodePools in the cluster.",
      ).optional(),
    }).describe("Configuration of network bandwidth tiers").optional(),
    desiredNetworkTierConfig: z.object({
      networkTier: z.enum([
        "NETWORK_TIER_UNSPECIFIED",
        "NETWORK_TIER_DEFAULT",
        "NETWORK_TIER_PREMIUM",
        "NETWORK_TIER_STANDARD",
      ]).describe("Network tier configuration.").optional(),
    }).describe("NetworkTierConfig contains network tier information.")
      .optional(),
    desiredNodeCreationConfig: z.object({
      nodeCreationMode: z.enum([
        "MODE_UNSPECIFIED",
        "VIA_KUBELET",
        "VIA_CONTROL_PLANE",
      ]).describe("The mode of node creation.").optional(),
    }).describe(
      "NodeCreationConfig defines the settings of node creation mode.",
    ).optional(),
    desiredNodeKubeletConfig: z.object({
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
    desiredNodePoolAutoConfigKubeletConfig: z.object({
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
    desiredNodePoolAutoConfigLinuxNodeConfig: z.object({
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
          args: z.array(z.unknown()).describe(
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
      }).describe("Configuration for kernel module loading on nodes.")
        .optional(),
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
        }).describe("Defines encryption settings for the swap space.")
          .optional(),
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
        "The Linux kernel parameters to be applied to the nodes and all pods running on the nodes. The following parameters are supported. net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog net.core.rmem_max net.core.rmem_default net.core.wmem_default net.core.wmem_max net.core.optmem_max net.core.somaxconn net.ipv4.neigh.default.gc_thresh1 net.ipv4.neigh.default.gc_thresh2 net.ipv4.neigh.default.gc_thresh3 net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.ipv4.tcp_tw_reuse net.ipv4.tcp_mtu_probing net.ipv4.tcp_max_orphans net.ipv4.tcp_max_tw_buckets net.ipv4.tcp_syn_retries net.ipv4.tcp_ecn net.ipv4.tcp_congestion_control net.netfilter.nf_conntrack_max net.netfilter.nf_conntrack_buckets net.netfilter.nf_conntrack_tcp_timeout_close_wait net.netfilter.nf_conntrack_tcp_timeout_time_wait net.netfilter.nf_conntrack_tcp_timeout_established net.netfilter.nf_conntrack_acct kernel.keys.maxkeys kernel.keys.maxbytes kernel.shmmni kernel.shmmax kernel.shmall kernel.perf_event_paranoid kernel.sched_rt_runtime_us kernel.softlockup_panic kernel.yama.ptrace_scope kernel.kptr_restrict kernel.dmesg_restrict kernel.sysrq fs.aio-max-nr fs.file-max fs.inotify.max_user_instances fs.inotify.max_user_watches fs.nr_open vm.dirty_background_ratio vm.dirty_background_bytes vm.dirty_expire_centisecs vm.dirty_ratio vm.dirty_bytes vm.dirty_writeback_centisecs vm.max_map_count vm.overcommit_memory vm.overcommit_ratio vm.vfs_cache_pressure vm.swappiness vm.watermark_scale_factor vm.min_free_kbytes",
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
    desiredNodePoolAutoConfigNetworkTags: z.object({
      tags: z.array(z.string()).describe("List of network tags.").optional(),
    }).describe(
      "Collection of Compute Engine network tags that can be applied to a node's underlying VM instance.",
    ).optional(),
    desiredNodePoolAutoConfigResourceManagerTags: z.object({
      tags: z.record(z.string(), z.string()).describe(
        "TagKeyValue must be in one of the following formats ([KEY]=[VALUE]) 1. `tagKeys/{tag_key_id}=tagValues/{tag_value_id}` 2. `{org_id}/{tag_key_name}={tag_value_name}` 3. `{project_id}/{tag_key_name}={tag_value_name}`",
      ).optional(),
    }).describe(
      "A map of resource manager tag keys and values to be attached to the nodes for managing Compute Engine firewalls using Network Firewall Policies. Tags must be according to specifications in https://cloud.google.com/vpc/docs/tags-firewalls-overview#specifications. A maximum of 5 tag key-value pairs can be specified. Existing tags will be replaced with new values.",
    ).optional(),
    desiredNodePoolAutoscaling: z.object({
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
    desiredNodePoolId: z.string().describe(
      'The node pool to be upgraded. This field is mandatory if "desired_node_version", "desired_image_family" or "desired_node_pool_autoscaling" is specified and there is more than one node pool on the cluster.',
    ).optional(),
    desiredNodePoolLoggingConfig: z.object({
      variantConfig: z.object({
        variant: z.enum(["VARIANT_UNSPECIFIED", "DEFAULT", "MAX_THROUGHPUT"])
          .describe("Logging variant deployed on nodes.").optional(),
      }).describe(
        "LoggingVariantConfig specifies the behaviour of the logging component.",
      ).optional(),
    }).describe(
      "NodePoolLoggingConfig specifies logging configuration for node pools.",
    ).optional(),
    desiredNodeVersion: z.string().describe(
      'The Kubernetes version to change the nodes to (typically an upgrade). Users may specify either explicit versions offered by Kubernetes Engine or version aliases, which have the following behavior: - "latest": picks the highest valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the Kubernetes master version',
    ).optional(),
    desiredNotificationConfig: z.object({
      pubsub: z.object({
        enabled: z.boolean().describe("Enable notifications for Pub/Sub.")
          .optional(),
        filter: z.object({
          eventType: z.array(z.unknown()).describe("Event types to allowlist.")
            .optional(),
        }).describe(
          "Allows filtering to one or more specific event types. If event types are present, those and only those event types will be transmitted to the cluster. Other types will be skipped. If no filter is specified, or no event types are present, all event types will be sent",
        ).optional(),
        topic: z.string().describe(
          "The desired Pub/Sub topic to which notifications will be sent by GKE. Format is `projects/{project}/topics/{topic}`.",
        ).optional(),
      }).describe("Pub/Sub specific notification config.").optional(),
    }).describe("NotificationConfig is the configuration of notifications.")
      .optional(),
    desiredParentProductConfig: z.object({
      labels: z.record(z.string(), z.string()).describe(
        "Labels contain the configuration of the parent product.",
      ).optional(),
      productName: z.string().describe(
        "Name of the parent product associated with the cluster.",
      ).optional(),
    }).describe(
      "ParentProductConfig is the configuration of the parent product of the cluster. This field is used by Google internal products that are built on top of a GKE cluster and take the ownership of the cluster.",
    ).optional(),
    desiredPodAutoscaling: z.object({
      hpaProfile: z.enum(["HPA_PROFILE_UNSPECIFIED", "NONE", "PERFORMANCE"])
        .describe("Selected Horizontal Pod Autoscaling profile.").optional(),
    }).describe(
      "PodAutoscaling is used for configuration of parameters for workload autoscaling.",
    ).optional(),
    desiredPrivateClusterConfig: z.object({
      enablePrivateEndpoint: z.boolean().describe(
        "Whether the master's internal IP address is used as the cluster endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.enable_public_endpoint instead. Note that the value of enable_public_endpoint is reversed: if enable_private_endpoint is false, then enable_public_endpoint will be true.",
      ).optional(),
      enablePrivateNodes: z.boolean().describe(
        "Whether nodes have internal IP addresses only. If enabled, all nodes are given only RFC 1918 private addresses and communicate with the master via private networking. Deprecated: Use NetworkConfig.default_enable_private_nodes instead.",
      ).optional(),
      masterGlobalAccessConfig: z.object({
        enabled: z.boolean().describe(
          "Whenever master is accessible globally or not.",
        ).optional(),
      }).describe(
        "Configuration for controlling master global access settings.",
      ).optional(),
      masterIpv4CidrBlock: z.string().describe(
        "The IP range in CIDR notation to use for the hosted master network. This range will be used for assigning internal IP addresses to the master or set of masters, as well as the ILB VIP. This range must not overlap with any other ranges in use within the cluster's network.",
      ).optional(),
      peeringName: z.string().describe(
        "Output only. The peering name in the customer VPC used by this cluster.",
      ).optional(),
      privateEndpoint: z.string().describe(
        "Output only. The internal IP address of this cluster's master endpoint. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint instead.",
      ).optional(),
      privateEndpointSubnetwork: z.string().describe(
        "Subnet to provision the master's private endpoint during cluster creation. Specified in projects/*/regions/*/subnetworks/* format. Deprecated: Use ControlPlaneEndpointsConfig.IPEndpointsConfig.private_endpoint_subnetwork instead.",
      ).optional(),
      publicEndpoint: z.string().describe(
        "Output only. The external IP address of this cluster's master endpoint. Deprecated:Use ControlPlaneEndpointsConfig.IPEndpointsConfig.public_endpoint instead.",
      ).optional(),
    }).describe("Configuration options for private clusters.").optional(),
    desiredPrivateIpv6GoogleAccess: z.enum([
      "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED",
      "PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED",
      "PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE",
      "PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL",
    ]).describe("The desired state of IPv6 connectivity to Google Services.")
      .optional(),
    desiredPrivilegedAdmissionConfig: z.object({
      allowlistPaths: z.array(z.string()).describe(
        "The customer allowlist Cloud Storage paths for the cluster. These paths are used with the `--autopilot-privileged-admission` flag to authorize privileged workloads in Autopilot clusters. Paths can be GKE-owned, in the format `gke:////`, or customer-owned, in the format `gs:///`. Wildcards (`*`) are supported to authorize all allowlists under specific paths or directories. Example: `gs://my-bucket/*` will authorize all allowlists under the `my-bucket` bucket.",
      ).optional(),
    }).describe(
      "PrivilegedAdmissionConfig stores the list of authorized allowlist paths for the cluster.",
    ).optional(),
    desiredRbacBindingConfig: z.object({
      enableInsecureBindingSystemAuthenticated: z.boolean().describe(
        "Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjects system:authenticated.",
      ).optional(),
      enableInsecureBindingSystemUnauthenticated: z.boolean().describe(
        "Setting this to true will allow any ClusterRoleBinding and RoleBinding with subjets system:anonymous or system:unauthenticated.",
      ).optional(),
    }).describe(
      "RBACBindingConfig allows user to restrict ClusterRoleBindings an RoleBindings that can be created.",
    ).optional(),
    desiredReleaseChannel: z.object({
      channel: z.enum(["UNSPECIFIED", "RAPID", "REGULAR", "STABLE", "EXTENDED"])
        .describe(
          "channel specifies which release channel the cluster is subscribed to.",
        ).optional(),
    }).describe(
      "ReleaseChannel indicates which release channel a cluster is subscribed to. Release channels are arranged in order of risk. When a cluster is subscribed to a release channel, Google maintains both the master version and the node version. Node auto-upgrade defaults to true and cannot be disabled.",
    ).optional(),
    desiredResourceUsageExportConfig: z.object({
      bigqueryDestination: z.object({
        datasetId: z.string().describe("The ID of a BigQuery Dataset.")
          .optional(),
      }).describe(
        "Parameters for using BigQuery as the destination of resource usage export.",
      ).optional(),
      consumptionMeteringConfig: z.object({
        enabled: z.boolean().describe(
          "Whether to enable consumption metering for this cluster. If enabled, a second BigQuery table will be created to hold resource consumption records.",
        ).optional(),
      }).describe("Parameters for controlling consumption metering.")
        .optional(),
      enableNetworkEgressMetering: z.boolean().describe(
        "Whether to enable network egress metering for this cluster. If enabled, a daemonset will be created in the cluster to meter network egress traffic.",
      ).optional(),
    }).describe("Configuration for exporting cluster resource usages.")
      .optional(),
    desiredSecretManagerConfig: z.object({
      enabled: z.boolean().describe("Enable/Disable Secret Manager Config.")
        .optional(),
      rotationConfig: z.object({
        enabled: z.boolean().describe("Whether the rotation is enabled.")
          .optional(),
        rotationInterval: z.string().describe(
          "The interval between two consecutive rotations. Default rotation interval is 2 minutes.",
        ).optional(),
      }).describe("RotationConfig is config for secret manager auto rotation.")
        .optional(),
    }).describe("SecretManagerConfig is config for secret manager enablement.")
      .optional(),
    desiredSecretSyncConfig: z.object({
      enabled: z.boolean().describe("Enable/Disable Secret Sync Config.")
        .optional(),
      rotationConfig: z.object({
        enabled: z.boolean().describe("Whether the rotation is enabled.")
          .optional(),
        rotationInterval: z.string().describe(
          "The interval between two consecutive rotations. Default rotation interval is 2 minutes.",
        ).optional(),
      }).describe(
        "SyncRotationConfig is config for secret manager auto rotation.",
      ).optional(),
    }).describe("Configuration for sync Secret Manager secrets as k8s secrets.")
      .optional(),
    desiredSecurityPostureConfig: z.object({
      mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "BASIC", "ENTERPRISE"])
        .describe("Sets which mode to use for Security Posture features.")
        .optional(),
      vulnerabilityMode: z.enum([
        "VULNERABILITY_MODE_UNSPECIFIED",
        "VULNERABILITY_DISABLED",
        "VULNERABILITY_BASIC",
        "VULNERABILITY_ENTERPRISE",
      ]).describe("Sets which mode to use for vulnerability scanning.")
        .optional(),
    }).describe(
      "SecurityPostureConfig defines the flags needed to enable/disable features for the Security Posture API.",
    ).optional(),
    desiredServiceExternalIpsConfig: z.object({
      enabled: z.boolean().describe(
        "Whether Services with ExternalIPs field are allowed or not.",
      ).optional(),
    }).describe("Config to block services with externalIPs field.").optional(),
    desiredShieldedNodes: z.object({
      enabled: z.boolean().describe(
        "Whether Shielded Nodes features are enabled on all nodes in this cluster.",
      ).optional(),
    }).describe("Configuration of Shielded Nodes feature.").optional(),
    desiredStackType: z.enum(["STACK_TYPE_UNSPECIFIED", "IPV4", "IPV4_IPV6"])
      .describe(
        "The desired stack type of the cluster. If a stack type is provided and does not match the current stack type of the cluster, update will attempt to change the stack type to the new type.",
      ).optional(),
    desiredUserManagedKeysConfig: z.object({
      aggregationCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the aggregation CA in this cluster.",
      ).optional(),
      clusterCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the cluster CA in this cluster.",
      ).optional(),
      controlPlaneDiskEncryptionKey: z.string().describe(
        "The Cloud KMS cryptoKey to use for Confidential Hyperdisk on the control plane nodes.",
      ).optional(),
      controlPlaneDiskEncryptionKeyVersions: z.array(z.string()).describe(
        "Output only. All of the versions of the Cloud KMS cryptoKey that are used by Confidential Hyperdisks on the control plane nodes.",
      ).optional(),
      etcdApiCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd API CA in this cluster.",
      ).optional(),
      etcdPeerCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd peer CA in this cluster.",
      ).optional(),
      gkeopsEtcdBackupEncryptionKey: z.string().describe(
        "Resource path of the Cloud KMS cryptoKey to use for encryption of internal etcd backups.",
      ).optional(),
      serviceAccountSigningKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for signing service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
      serviceAccountVerificationKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for verifying service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
    }).describe(
      "UserManagedKeysConfig holds the resource address to Keys which are used for signing certs and token that are used for communication within cluster.",
    ).optional(),
    desiredVerticalPodAutoscaling: z.object({
      enabled: z.boolean().describe("Enables vertical pod autoscaling.")
        .optional(),
    }).describe(
      "VerticalPodAutoscaling contains global, per-cluster information required by Vertical Pod Autoscaler to automatically adjust the resources of pods controlled by it.",
    ).optional(),
    desiredWorkloadIdentityConfig: z.object({
      workloadPool: z.string().describe(
        "The workload pool to attach all Kubernetes service accounts to.",
      ).optional(),
    }).describe(
      "Configuration for the use of Kubernetes Service Accounts in IAM policies.",
    ).optional(),
    enableK8sBetaApis: z.object({
      enabledApis: z.array(z.string()).describe("Enabled k8s beta APIs.")
        .optional(),
    }).describe("K8sBetaAPIConfig, configuration for beta APIs").optional(),
    etag: z.string().describe(
      "The current etag of the cluster. If an etag is provided and does not match the current etag of the cluster, update will be blocked and an ABORTED error will be returned.",
    ).optional(),
    gkeAutoUpgradeConfig: z.object({
      patchMode: z.enum(["PATCH_MODE_UNSPECIFIED", "ACCELERATED"]).describe(
        "PatchMode specifies how auto upgrade patch builds should be selected.",
      ).optional(),
    }).describe(
      "GkeAutoUpgradeConfig is the configuration for GKE auto upgrades.",
    ).optional(),
    removedAdditionalPodRangesConfig: z.object({
      podRangeInfo: z.array(z.object({
        rangeName: z.string().describe("Output only. Name of a range.")
          .optional(),
        utilization: z.number().describe(
          "Output only. The utilization of the range.",
        ).optional(),
      })).describe("Output only. Information for additional pod range.")
        .optional(),
      podRangeNames: z.array(z.string()).describe(
        "Name for pod secondary ipv4 range which has the actual range defined ahead.",
      ).optional(),
    }).describe(
      "AdditionalPodRangesConfig is the configuration for additional pod secondary ranges supporting the ClusterUpdate message.",
    ).optional(),
    userManagedKeysConfig: z.object({
      aggregationCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the aggregation CA in this cluster.",
      ).optional(),
      clusterCa: z.string().describe(
        "The Certificate Authority Service caPool to use for the cluster CA in this cluster.",
      ).optional(),
      controlPlaneDiskEncryptionKey: z.string().describe(
        "The Cloud KMS cryptoKey to use for Confidential Hyperdisk on the control plane nodes.",
      ).optional(),
      controlPlaneDiskEncryptionKeyVersions: z.array(z.string()).describe(
        "Output only. All of the versions of the Cloud KMS cryptoKey that are used by Confidential Hyperdisks on the control plane nodes.",
      ).optional(),
      etcdApiCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd API CA in this cluster.",
      ).optional(),
      etcdPeerCa: z.string().describe(
        "Resource path of the Certificate Authority Service caPool to use for the etcd peer CA in this cluster.",
      ).optional(),
      gkeopsEtcdBackupEncryptionKey: z.string().describe(
        "Resource path of the Cloud KMS cryptoKey to use for encryption of internal etcd backups.",
      ).optional(),
      serviceAccountSigningKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for signing service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
      serviceAccountVerificationKeys: z.array(z.string()).describe(
        "The Cloud KMS cryptoKeyVersions to use for verifying service account JWTs issued by this cluster. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion}`",
      ).optional(),
    }).describe(
      "UserManagedKeysConfig holds the resource address to Keys which are used for signing certs and token that are used for communication within cluster.",
    ).optional(),
  }).describe(
    "ClusterUpdate describes an update to the cluster. Exactly one update can be applied to a cluster with each request, so at most one field can be provided.",
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

/** Swamp extension model for Google Cloud Kubernetes Engine Clusters. Registered at `@swamp/gcp/container/clusters`. */
export const model = {
  type: "@swamp/gcp/container/clusters",
  version: "2026.06.17.1",
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
      toVersion: "2026.04.19.1",
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
      toVersion: "2026.05.18.3",
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
      toVersion: "2026.05.19.3",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.2",
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
      toVersion: "2026.06.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Google Kubernetes Engine cluster.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a clusters",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["cluster"] !== undefined) body["cluster"] = g["cluster"];
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
              "failedValues": ["ERROR", "DEGRADED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a clusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the clusters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update clusters attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["update"] !== undefined) body["update"] = g["update"];
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
              "failedValues": ["ERROR", "DEGRADED"],
            }
            : undefined,
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
      description: "Delete the clusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the clusters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync clusters state from GCP",
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
            String(g["parent"] ?? ""),
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
      description: "List clusters resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "clusters",
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
    check_autopilot_compatibility: {
      description: "check autopilot compatibility",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
              "container.projects.locations.clusters.checkAutopilotCompatibility",
            "path": "v1/{+name}:checkAutopilotCompatibility",
            "httpMethod": "GET",
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
    complete_ip_rotation: {
      description: "complete ip rotation",
      arguments: z.object({
        clusterId: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.completeIpRotation",
            "path": "v1/{+name}:completeIpRotation",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    fetch_cluster_upgrade_info: {
      description: "fetch cluster upgrade info",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
              "container.projects.locations.clusters.fetchClusterUpgradeInfo",
            "path": "v1/{+name}:fetchClusterUpgradeInfo",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "version": { "location": "query" },
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
    get_jwks: {
      description: "get jwks",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.getJwks",
            "path": "v1/{+parent}/jwks",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
    set_addons: {
      description: "set addons",
      arguments: z.object({
        addonsConfig: z.any().optional(),
        clusterId: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["addonsConfig"] !== undefined) {
          body["addonsConfig"] = args["addonsConfig"];
        }
        if (args["clusterId"] !== undefined) {
          body["clusterId"] = args["clusterId"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.setAddons",
            "path": "v1/{+name}:setAddons",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    set_legacy_abac: {
      description: "set legacy abac",
      arguments: z.object({
        clusterId: z.any().optional(),
        enabled: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["enabled"] !== undefined) body["enabled"] = args["enabled"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.setLegacyAbac",
            "path": "v1/{+name}:setLegacyAbac",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    set_locations: {
      description: "set locations",
      arguments: z.object({
        clusterId: z.any().optional(),
        locations: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["locations"] !== undefined) {
          body["locations"] = args["locations"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.setLocations",
            "path": "v1/{+name}:setLocations",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    set_logging: {
      description: "set logging",
      arguments: z.object({
        clusterId: z.any().optional(),
        loggingService: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["loggingService"] !== undefined) {
          body["loggingService"] = args["loggingService"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.setLogging",
            "path": "v1/{+name}:setLogging",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    set_maintenance_policy: {
      description: "set maintenance policy",
      arguments: z.object({
        clusterId: z.any().optional(),
        maintenancePolicy: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["maintenancePolicy"] !== undefined) {
          body["maintenancePolicy"] = args["maintenancePolicy"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.setMaintenancePolicy",
            "path": "v1/{+name}:setMaintenancePolicy",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    set_master_auth: {
      description: "set master auth",
      arguments: z.object({
        action: z.any().optional(),
        clusterId: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        update: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["action"] !== undefined) body["action"] = args["action"];
        if (args["clusterId"] !== undefined) {
          body["clusterId"] = args["clusterId"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["update"] !== undefined) body["update"] = args["update"];
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.setMasterAuth",
            "path": "v1/{+name}:setMasterAuth",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    set_monitoring: {
      description: "set monitoring",
      arguments: z.object({
        clusterId: z.any().optional(),
        monitoringService: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["monitoringService"] !== undefined) {
          body["monitoringService"] = args["monitoringService"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.setMonitoring",
            "path": "v1/{+name}:setMonitoring",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    set_network_policy: {
      description: "set network policy",
      arguments: z.object({
        clusterId: z.any().optional(),
        name: z.any().optional(),
        networkPolicy: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["networkPolicy"] !== undefined) {
          body["networkPolicy"] = args["networkPolicy"];
        }
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.setNetworkPolicy",
            "path": "v1/{+name}:setNetworkPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    set_resource_labels: {
      description: "set resource labels",
      arguments: z.object({
        clusterId: z.any().optional(),
        labelFingerprint: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        resourceLabels: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = args["labelFingerprint"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["resourceLabels"] !== undefined) {
          body["resourceLabels"] = args["resourceLabels"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.setResourceLabels",
            "path": "v1/{+name}:setResourceLabels",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    start_ip_rotation: {
      description: "start ip rotation",
      arguments: z.object({
        clusterId: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        rotateCredentials: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["rotateCredentials"] !== undefined) {
          body["rotateCredentials"] = args["rotateCredentials"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.startIpRotation",
            "path": "v1/{+name}:startIpRotation",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    update_master: {
      description: "update master",
      arguments: z.object({
        clusterId: z.any().optional(),
        masterVersion: z.any().optional(),
        name: z.any().optional(),
        projectId: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["masterVersion"] !== undefined) {
          body["masterVersion"] = args["masterVersion"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "container.projects.locations.clusters.updateMaster",
            "path": "v1/{+name}:updateMaster",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
  },
};
