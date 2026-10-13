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

// Auto-generated extension model for @swamp/gcp/gkeonprem/baremetalclusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE On-Prem BareMetalClusters.
 *
 * Resource that represents a bare metal user cluster.
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
  return `${parent}/bareMetalClusters/${shortName}`;
}

const BASE_URL = "https://gkeonprem.googleapis.com/";

const GET_CONFIG = {
  "id": "gkeonprem.projects.locations.bareMetalClusters.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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
  "id": "gkeonprem.projects.locations.bareMetalClusters.create",
  "path": "v1/{+parent}/bareMetalClusters",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "allowPreflightFailure": {
      "location": "query",
    },
    "bareMetalClusterId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "gkeonprem.projects.locations.bareMetalClusters.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "gkeonprem.projects.locations.bareMetalClusters.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "etag": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "ignoreErrors": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "gkeonprem.projects.locations.bareMetalClusters.list",
  "path": "v1/{+parent}/bareMetalClusters",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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
    "view": {
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  adminClusterMembership: z.string().describe(
    "Required. The admin cluster this bare metal user cluster belongs to. This is the full resource name of the admin cluster's fleet membership.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the bare metal user cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  bareMetalVersion: z.string().describe(
    "Required. The Anthos clusters on bare metal version for your user cluster.",
  ).optional(),
  binaryAuthorization: z.object({
    evaluationMode: z.enum([
      "EVALUATION_MODE_UNSPECIFIED",
      "DISABLED",
      "PROJECT_SINGLETON_POLICY_ENFORCE",
    ]).describe(
      "Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED.",
    ).optional(),
  }).describe("Binary Authorization related configurations.").optional(),
  clusterOperations: z.object({
    enableApplicationLogs: z.boolean().describe(
      "Whether collection of application logs/metrics should be enabled (in addition to system logs/metrics).",
    ).optional(),
  }).describe("Cluster operations configuration.").optional(),
  controlPlane: z.object({
    apiServerArgs: z.array(z.object({
      argument: z.string().describe(
        "Required. The argument name as it appears on the API Server command line, make sure to remove the leading dashes.",
      ).optional(),
      value: z.string().describe(
        "Required. The value of the arg as it will be passed to the API Server command line.",
      ).optional(),
    })).describe(
      "Customizes the default API server args. Only a subset of customized flags are supported. For the exact format, refer to the [API server documentation](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/).",
    ).optional(),
    controlPlaneNodePoolConfig: z.object({
      nodePoolConfig: z.object({
        kubeletConfig: z.object({
          registryBurst: z.number().int().describe(
            "The maximum size of bursty pulls, temporarily allows pulls to burst to this number, while still not exceeding registry_pull_qps. The value must not be a negative number. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 10.",
          ).optional(),
          registryPullQps: z.number().int().describe(
            "The limit of registry pulls per second. Setting this value to 0 means no limit. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 5.",
          ).optional(),
          serializeImagePullsDisabled: z.boolean().describe(
            "Prevents the Kubelet from pulling multiple images at a time. We recommend *not* changing the default value on nodes that run docker daemon with version < 1.9 or an Another Union File System (Aufs) storage backend. Issue https://github.com/kubernetes/kubernetes/issues/10959 has more details.",
          ).optional(),
        }).describe(
          "The modifiable kubelet configurations for the bare metal machines.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          'The labels assigned to nodes of this node pool. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
        ).optional(),
        nodeConfigs: z.array(z.object({
          labels: z.unknown().describe(
            'The labels assigned to this node. An object containing a list of key/value pairs. The labels here, unioned with the labels set on BareMetalNodePoolConfig are the set of labels that will be applied to the node. If there are any conflicts, the BareMetalNodeConfig labels take precedence. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
          ).optional(),
          nodeIp: z.unknown().describe(
            "The default IPv4 address for SSH access and Kubernetes node. Example: 192.168.0.1",
          ).optional(),
        })).describe(
          "Required. The list of machine addresses in the bare metal node pool.",
        ).optional(),
        operatingSystem: z.enum(["OPERATING_SYSTEM_UNSPECIFIED", "LINUX"])
          .describe("Specifies the nodes operating system (default: LINUX).")
          .optional(),
        taints: z.array(z.object({
          effect: z.unknown().describe("The taint effect.").optional(),
          key: z.unknown().describe("Key associated with the effect.")
            .optional(),
          value: z.unknown().describe("Value associated with the effect.")
            .optional(),
        })).describe("The initial taints assigned to nodes of this node pool.")
          .optional(),
      }).describe(
        "Required. The generic configuration for a node pool running the control plane.",
      ).optional(),
    }).describe("Required. Configures the node pool running the control plane.")
      .optional(),
  }).describe("Required. Control plane configuration.").optional(),
  description: z.string().describe(
    "A human readable description of this bare metal user cluster.",
  ).optional(),
  loadBalancer: z.object({
    bgpLbConfig: z.object({
      addressPools: z.array(z.object({
        addresses: z.array(z.unknown()).describe(
          "Required. The addresses that are part of this pool. Each address must be either in the CIDR form (1.2.3.0/24) or range form (1.2.3.1-1.2.3.5).",
        ).optional(),
        avoidBuggyIps: z.boolean().describe(
          "If true, avoid using IPs ending in.0 or.255. This avoids buggy consumer devices mistakenly dropping IPv4 traffic for those special IP addresses.",
        ).optional(),
        manualAssign: z.boolean().describe(
          "If true, prevent IP addresses from being automatically assigned.",
        ).optional(),
        pool: z.string().describe("Required. The name of the address pool.")
          .optional(),
      })).describe(
        "Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools.",
      ).optional(),
      asn: z.string().describe(
        "Required. BGP autonomous system number (ASN) of the cluster. This field can be updated after cluster creation.",
      ).optional(),
      bgpPeerConfigs: z.array(z.object({
        asn: z.string().describe(
          "Required. BGP autonomous system number (ASN) for the network that contains the external peer device.",
        ).optional(),
        controlPlaneNodes: z.array(z.unknown()).describe(
          "The IP address of the control plane node that connects to the external peer. If you don't specify any control plane nodes, all control plane nodes can connect to the external peer. If you specify one or more IP addresses, only the nodes specified participate in peering sessions.",
        ).optional(),
        ipAddress: z.string().describe(
          "Required. The IP address of the external peer device.",
        ).optional(),
      })).describe(
        "Required. The list of BGP peers that the cluster will connect to. At least one peer must be configured for each control plane node. Control plane nodes will connect to these peers to advertise the control plane VIP. The Services load balancer also uses these peers by default. This field can be updated after cluster creation.",
      ).optional(),
      loadBalancerNodePoolConfig: z.object({
        nodePoolConfig: z.object({
          kubeletConfig: z.object({
            registryBurst: z.unknown().describe(
              "The maximum size of bursty pulls, temporarily allows pulls to burst to this number, while still not exceeding registry_pull_qps. The value must not be a negative number. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 10.",
            ).optional(),
            registryPullQps: z.unknown().describe(
              "The limit of registry pulls per second. Setting this value to 0 means no limit. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 5.",
            ).optional(),
            serializeImagePullsDisabled: z.unknown().describe(
              "Prevents the Kubelet from pulling multiple images at a time. We recommend *not* changing the default value on nodes that run docker daemon with version < 1.9 or an Another Union File System (Aufs) storage backend. Issue https://github.com/kubernetes/kubernetes/issues/10959 has more details.",
            ).optional(),
          }).describe(
            "The modifiable kubelet configurations for the bare metal machines.",
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            'The labels assigned to nodes of this node pool. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
          ).optional(),
          nodeConfigs: z.array(z.unknown()).describe(
            "Required. The list of machine addresses in the bare metal node pool.",
          ).optional(),
          operatingSystem: z.enum(["OPERATING_SYSTEM_UNSPECIFIED", "LINUX"])
            .describe("Specifies the nodes operating system (default: LINUX).")
            .optional(),
          taints: z.array(z.unknown()).describe(
            "The initial taints assigned to nodes of this node pool.",
          ).optional(),
        }).describe(
          "The generic configuration for a node pool running a load balancer.",
        ).optional(),
      }).describe(
        "Specifies the node pool running data plane load balancing. L2 connectivity is required among nodes in this pool. If missing, the control plane node pool is used for data plane load balancing.",
      ).optional(),
    }).describe(
      "Configuration for BGP typed load balancers. When set network_config.advanced_networking is automatically set to true.",
    ).optional(),
    manualLbConfig: z.object({
      enabled: z.boolean().describe("Whether manual load balancing is enabled.")
        .optional(),
    }).describe("Manually configured load balancers.").optional(),
    metalLbConfig: z.object({
      addressPools: z.array(z.object({
        addresses: z.array(z.unknown()).describe(
          "Required. The addresses that are part of this pool. Each address must be either in the CIDR form (1.2.3.0/24) or range form (1.2.3.1-1.2.3.5).",
        ).optional(),
        avoidBuggyIps: z.boolean().describe(
          "If true, avoid using IPs ending in.0 or.255. This avoids buggy consumer devices mistakenly dropping IPv4 traffic for those special IP addresses.",
        ).optional(),
        manualAssign: z.boolean().describe(
          "If true, prevent IP addresses from being automatically assigned.",
        ).optional(),
        pool: z.string().describe("Required. The name of the address pool.")
          .optional(),
      })).describe(
        "Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools.",
      ).optional(),
      loadBalancerNodePoolConfig: z.object({
        nodePoolConfig: z.object({
          kubeletConfig: z.object({
            registryBurst: z.unknown().describe(
              "The maximum size of bursty pulls, temporarily allows pulls to burst to this number, while still not exceeding registry_pull_qps. The value must not be a negative number. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 10.",
            ).optional(),
            registryPullQps: z.unknown().describe(
              "The limit of registry pulls per second. Setting this value to 0 means no limit. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 5.",
            ).optional(),
            serializeImagePullsDisabled: z.unknown().describe(
              "Prevents the Kubelet from pulling multiple images at a time. We recommend *not* changing the default value on nodes that run docker daemon with version < 1.9 or an Another Union File System (Aufs) storage backend. Issue https://github.com/kubernetes/kubernetes/issues/10959 has more details.",
            ).optional(),
          }).describe(
            "The modifiable kubelet configurations for the bare metal machines.",
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            'The labels assigned to nodes of this node pool. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
          ).optional(),
          nodeConfigs: z.array(z.unknown()).describe(
            "Required. The list of machine addresses in the bare metal node pool.",
          ).optional(),
          operatingSystem: z.enum(["OPERATING_SYSTEM_UNSPECIFIED", "LINUX"])
            .describe("Specifies the nodes operating system (default: LINUX).")
            .optional(),
          taints: z.array(z.unknown()).describe(
            "The initial taints assigned to nodes of this node pool.",
          ).optional(),
        }).describe(
          "The generic configuration for a node pool running a load balancer.",
        ).optional(),
      }).describe(
        "Specifies the node pool running the load balancer. L2 connectivity is required among nodes in this pool. If missing, the control plane node pool is used as the load balancer pool.",
      ).optional(),
    }).describe("Configuration for MetalLB load balancers.").optional(),
    portConfig: z.object({
      controlPlaneLoadBalancerPort: z.number().int().describe(
        "The port that control plane hosted load balancers will listen on.",
      ).optional(),
    }).describe("Configures the ports that the load balancer will listen on.")
      .optional(),
    vipConfig: z.object({
      controlPlaneVip: z.string().describe(
        "The VIP which you previously set aside for the Kubernetes API of this bare metal user cluster.",
      ).optional(),
      ingressVip: z.string().describe(
        "The VIP which you previously set aside for ingress traffic into this bare metal user cluster.",
      ).optional(),
    }).describe("The VIPs used by the load balancer.").optional(),
  }).describe("Required. Load balancer configuration.").optional(),
  maintenanceConfig: z.object({
    maintenanceAddressCidrBlocks: z.array(z.string()).describe(
      'Required. All IPv4 address from these ranges will be placed into maintenance mode. Nodes in maintenance mode will be cordoned and drained. When both of these are true, the "baremetal.cluster.gke.io/maintenance" annotation will be set on the node resource.',
    ).optional(),
  }).describe("Maintenance configuration.").optional(),
  name: z.string().describe(
    "Immutable. The bare metal user cluster resource name.",
  ).optional(),
  networkConfig: z.object({
    advancedNetworking: z.boolean().describe(
      "Enables the use of advanced Anthos networking features, such as Bundled Load Balancing with BGP or the egress NAT gateway. Setting configuration for advanced networking features will automatically set this flag.",
    ).optional(),
    islandModeCidr: z.object({
      podAddressCidrBlocks: z.array(z.string()).describe(
        "Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field cannot be changed after creation.",
      ).optional(),
      serviceAddressCidrBlocks: z.array(z.string()).describe(
        "Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field is mutable after creation starting with version 1.15.",
      ).optional(),
    }).describe(
      "Configuration for island mode CIDR. In an island-mode network, nodes have unique IP addresses, but pods don't have unique addresses across clusters. This doesn't cause problems because pods in one cluster never directly communicate with pods in another cluster. Instead, there are gateways that mediate between a pod in one cluster and a pod in another cluster.",
    ).optional(),
    multipleNetworkInterfacesConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable multiple network interfaces for your pods. When set network_config.advanced_networking is automatically set to true.",
      ).optional(),
    }).describe("Configuration for multiple network interfaces.").optional(),
    srIovConfig: z.object({
      enabled: z.boolean().describe("Whether to install the SR-IOV operator.")
        .optional(),
    }).describe("Configuration for SR-IOV.").optional(),
  }).describe("Required. Network configuration.").optional(),
  nodeAccessConfig: z.object({
    loginUser: z.string().describe(
      'LoginUser is the user name used to access node machines. It defaults to "root" if not set.',
    ).optional(),
  }).describe("Node access related configurations.").optional(),
  nodeConfig: z.object({
    containerRuntime: z.enum(["CONTAINER_RUNTIME_UNSPECIFIED", "CONTAINERD"])
      .describe("Specifies which container runtime will be used.").optional(),
    maxPodsPerNode: z.string().describe(
      "The maximum number of pods a node can run. The size of the CIDR range assigned to the node will be derived from this parameter.",
    ).optional(),
  }).describe("Workload node configuration.").optional(),
  osEnvironmentConfig: z.object({
    packageRepoExcluded: z.boolean().describe(
      "Whether the package repo should not be included when initializing bare metal machines.",
    ).optional(),
  }).describe("OS environment related configurations.").optional(),
  proxy: z.object({
    noProxy: z.array(z.string()).describe(
      'A list of IPs, hostnames, and domains that should skip the proxy. Examples: ["127.0.0.1", "example.com", ".corp", "localhost"].',
    ).optional(),
    uri: z.string().describe(
      "Required. Specifies the address of your proxy server. Examples: `http://domain` Do not provide credentials in the format `http://(username:password@)domain` these will be rejected by the server.",
    ).optional(),
  }).describe("Proxy configuration.").optional(),
  securityConfig: z.object({
    authorization: z.object({
      adminUsers: z.array(z.object({
        username: z.string().describe(
          "Required. The name of the user, e.g. `my-gcp-id@gmail.com`.",
        ).optional(),
      })).describe(
        "For VMware and bare metal user clusters, users will be granted the cluster-admin role on the cluster, which provides full administrative access to the cluster. For bare metal admin clusters, users will be granted the cluster-view role, which limits users to read-only access.",
      ).optional(),
    }).describe("Configures user access to the user cluster.").optional(),
  }).describe("Security related setting configuration.").optional(),
  storage: z.object({
    lvpNodeMountsConfig: z.object({
      path: z.string().describe("Required. The host machine path.").optional(),
      storageClass: z.string().describe(
        "Required. The StorageClass name that PVs will be created with.",
      ).optional(),
    }).describe(
      "Required. Specifies the config for local PersistentVolumes backed by mounted node disks. These disks need to be formatted and mounted by the user, which can be done before or after cluster creation.",
    ).optional(),
    lvpShareConfig: z.object({
      lvpConfig: z.object({
        path: z.string().describe("Required. The host machine path.")
          .optional(),
        storageClass: z.string().describe(
          "Required. The StorageClass name that PVs will be created with.",
        ).optional(),
      }).describe(
        "Required. Defines the machine path and storage class for the LVP Share.",
      ).optional(),
      sharedPathPvCount: z.number().int().describe(
        "The number of subdirectories to create under path.",
      ).optional(),
    }).describe(
      "Required. Specifies the config for local PersistentVolumes backed by subdirectories in a shared filesystem. These subdirectores are automatically created during cluster creation.",
    ).optional(),
  }).describe("Required. Storage configuration.").optional(),
  upgradePolicy: z.object({
    pause: z.boolean().describe(
      "Output only. Pause is used to show the upgrade pause status. It's view only for now.",
    ).optional(),
    policy: z.enum(["NODE_POOL_POLICY_UNSPECIFIED", "SERIAL", "CONCURRENT"])
      .describe("Specifies which upgrade policy to use.").optional(),
  }).describe("The cluster upgrade policy.").optional(),
  allowPreflightFailure: z.string().describe(
    'Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster.',
  ).optional(),
  bareMetalClusterId: z.string().describe(
    "Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/",
  ).optional(),
  allowMissing: z.string().describe(
    "If set to true, and the bare metal cluster is not found, the request will create a new bare metal cluster with the provided configuration. The user must have both create and update permission to call Update with allow_missing set to true.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  adminClusterMembership: z.string().optional(),
  adminClusterName: z.string().optional(),
  annotations: z.record(z.string(), z.unknown()).optional(),
  bareMetalVersion: z.string().optional(),
  binaryAuthorization: z.object({
    evaluationMode: z.string(),
  }).optional(),
  clusterOperations: z.object({
    enableApplicationLogs: z.boolean(),
  }).optional(),
  controlPlane: z.object({
    apiServerArgs: z.array(z.object({
      argument: z.string(),
      value: z.string(),
    })),
    controlPlaneNodePoolConfig: z.object({
      nodePoolConfig: z.object({
        kubeletConfig: z.object({
          registryBurst: z.number(),
          registryPullQps: z.number(),
          serializeImagePullsDisabled: z.boolean(),
        }),
        labels: z.record(z.string(), z.unknown()),
        nodeConfigs: z.array(z.object({
          labels: z.unknown(),
          nodeIp: z.unknown(),
        })),
        operatingSystem: z.string(),
        taints: z.array(z.object({
          effect: z.unknown(),
          key: z.unknown(),
          value: z.unknown(),
        })),
      }),
    }),
  }).optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  description: z.string().optional(),
  endpoint: z.string().optional(),
  etag: z.string().optional(),
  fleet: z.object({
    membership: z.string(),
  }).optional(),
  loadBalancer: z.object({
    bgpLbConfig: z.object({
      addressPools: z.array(z.object({
        addresses: z.array(z.unknown()),
        avoidBuggyIps: z.boolean(),
        manualAssign: z.boolean(),
        pool: z.string(),
      })),
      asn: z.string(),
      bgpPeerConfigs: z.array(z.object({
        asn: z.string(),
        controlPlaneNodes: z.array(z.unknown()),
        ipAddress: z.string(),
      })),
      loadBalancerNodePoolConfig: z.object({
        nodePoolConfig: z.object({
          kubeletConfig: z.object({
            registryBurst: z.unknown(),
            registryPullQps: z.unknown(),
            serializeImagePullsDisabled: z.unknown(),
          }),
          labels: z.record(z.string(), z.unknown()),
          nodeConfigs: z.array(z.unknown()),
          operatingSystem: z.string(),
          taints: z.array(z.unknown()),
        }),
      }),
    }),
    manualLbConfig: z.object({
      enabled: z.boolean(),
    }),
    metalLbConfig: z.object({
      addressPools: z.array(z.object({
        addresses: z.array(z.unknown()),
        avoidBuggyIps: z.boolean(),
        manualAssign: z.boolean(),
        pool: z.string(),
      })),
      loadBalancerNodePoolConfig: z.object({
        nodePoolConfig: z.object({
          kubeletConfig: z.object({
            registryBurst: z.unknown(),
            registryPullQps: z.unknown(),
            serializeImagePullsDisabled: z.unknown(),
          }),
          labels: z.record(z.string(), z.unknown()),
          nodeConfigs: z.array(z.unknown()),
          operatingSystem: z.string(),
          taints: z.array(z.unknown()),
        }),
      }),
    }),
    portConfig: z.object({
      controlPlaneLoadBalancerPort: z.number(),
    }),
    vipConfig: z.object({
      controlPlaneVip: z.string(),
      ingressVip: z.string(),
    }),
  }).optional(),
  localName: z.string().optional(),
  localNamespace: z.string().optional(),
  maintenanceConfig: z.object({
    maintenanceAddressCidrBlocks: z.array(z.string()),
  }).optional(),
  maintenanceStatus: z.object({
    machineDrainStatus: z.object({
      drainedMachines: z.array(z.object({
        nodeIp: z.string(),
      })),
      drainingMachines: z.array(z.object({
        nodeIp: z.string(),
        podCount: z.number(),
      })),
    }),
  }).optional(),
  name: z.string(),
  networkConfig: z.object({
    advancedNetworking: z.boolean(),
    islandModeCidr: z.object({
      podAddressCidrBlocks: z.array(z.string()),
      serviceAddressCidrBlocks: z.array(z.string()),
    }),
    multipleNetworkInterfacesConfig: z.object({
      enabled: z.boolean(),
    }),
    srIovConfig: z.object({
      enabled: z.boolean(),
    }),
  }).optional(),
  nodeAccessConfig: z.object({
    loginUser: z.string(),
  }).optional(),
  nodeConfig: z.object({
    containerRuntime: z.string(),
    maxPodsPerNode: z.string(),
  }).optional(),
  osEnvironmentConfig: z.object({
    packageRepoExcluded: z.boolean(),
  }).optional(),
  proxy: z.object({
    noProxy: z.array(z.string()),
    uri: z.string(),
  }).optional(),
  reconciling: z.boolean().optional(),
  securityConfig: z.object({
    authorization: z.object({
      adminUsers: z.array(z.object({
        username: z.string(),
      })),
    }),
  }).optional(),
  state: z.string().optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string(),
      message: z.string(),
      reason: z.string(),
      state: z.string(),
      type: z.string(),
    })),
    errorMessage: z.string(),
    version: z.string(),
    versions: z.object({
      versions: z.array(z.object({
        count: z.string(),
        version: z.string(),
      })),
    }),
  }).optional(),
  storage: z.object({
    lvpNodeMountsConfig: z.object({
      path: z.string(),
      storageClass: z.string(),
    }),
    lvpShareConfig: z.object({
      lvpConfig: z.object({
        path: z.string(),
        storageClass: z.string(),
      }),
      sharedPathPvCount: z.number(),
    }),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  upgradePolicy: z.object({
    pause: z.boolean(),
    policy: z.string(),
  }).optional(),
  validationCheck: z.object({
    option: z.string(),
    scenario: z.string(),
    status: z.object({
      result: z.array(z.object({
        category: z.string(),
        description: z.string(),
        details: z.string(),
        reason: z.string(),
        state: z.string(),
      })),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  adminClusterMembership: z.string().describe(
    "Required. The admin cluster this bare metal user cluster belongs to. This is the full resource name of the admin cluster's fleet membership.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the bare metal user cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  bareMetalVersion: z.string().describe(
    "Required. The Anthos clusters on bare metal version for your user cluster.",
  ).optional(),
  binaryAuthorization: z.object({
    evaluationMode: z.enum([
      "EVALUATION_MODE_UNSPECIFIED",
      "DISABLED",
      "PROJECT_SINGLETON_POLICY_ENFORCE",
    ]).describe(
      "Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED.",
    ).optional(),
  }).describe("Binary Authorization related configurations.").optional(),
  clusterOperations: z.object({
    enableApplicationLogs: z.boolean().describe(
      "Whether collection of application logs/metrics should be enabled (in addition to system logs/metrics).",
    ).optional(),
  }).describe("Cluster operations configuration.").optional(),
  controlPlane: z.object({
    apiServerArgs: z.array(z.object({
      argument: z.string().describe(
        "Required. The argument name as it appears on the API Server command line, make sure to remove the leading dashes.",
      ).optional(),
      value: z.string().describe(
        "Required. The value of the arg as it will be passed to the API Server command line.",
      ).optional(),
    })).describe(
      "Customizes the default API server args. Only a subset of customized flags are supported. For the exact format, refer to the [API server documentation](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/).",
    ).optional(),
    controlPlaneNodePoolConfig: z.object({
      nodePoolConfig: z.object({
        kubeletConfig: z.object({
          registryBurst: z.number().int().describe(
            "The maximum size of bursty pulls, temporarily allows pulls to burst to this number, while still not exceeding registry_pull_qps. The value must not be a negative number. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 10.",
          ).optional(),
          registryPullQps: z.number().int().describe(
            "The limit of registry pulls per second. Setting this value to 0 means no limit. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 5.",
          ).optional(),
          serializeImagePullsDisabled: z.boolean().describe(
            "Prevents the Kubelet from pulling multiple images at a time. We recommend *not* changing the default value on nodes that run docker daemon with version < 1.9 or an Another Union File System (Aufs) storage backend. Issue https://github.com/kubernetes/kubernetes/issues/10959 has more details.",
          ).optional(),
        }).describe(
          "The modifiable kubelet configurations for the bare metal machines.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          'The labels assigned to nodes of this node pool. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
        ).optional(),
        nodeConfigs: z.array(z.object({
          labels: z.unknown().describe(
            'The labels assigned to this node. An object containing a list of key/value pairs. The labels here, unioned with the labels set on BareMetalNodePoolConfig are the set of labels that will be applied to the node. If there are any conflicts, the BareMetalNodeConfig labels take precedence. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
          ).optional(),
          nodeIp: z.unknown().describe(
            "The default IPv4 address for SSH access and Kubernetes node. Example: 192.168.0.1",
          ).optional(),
        })).describe(
          "Required. The list of machine addresses in the bare metal node pool.",
        ).optional(),
        operatingSystem: z.enum(["OPERATING_SYSTEM_UNSPECIFIED", "LINUX"])
          .describe("Specifies the nodes operating system (default: LINUX).")
          .optional(),
        taints: z.array(z.object({
          effect: z.unknown().describe("The taint effect.").optional(),
          key: z.unknown().describe("Key associated with the effect.")
            .optional(),
          value: z.unknown().describe("Value associated with the effect.")
            .optional(),
        })).describe("The initial taints assigned to nodes of this node pool.")
          .optional(),
      }).describe(
        "Required. The generic configuration for a node pool running the control plane.",
      ).optional(),
    }).describe("Required. Configures the node pool running the control plane.")
      .optional(),
  }).describe("Required. Control plane configuration.").optional(),
  description: z.string().describe(
    "A human readable description of this bare metal user cluster.",
  ).optional(),
  loadBalancer: z.object({
    bgpLbConfig: z.object({
      addressPools: z.array(z.object({
        addresses: z.array(z.unknown()).describe(
          "Required. The addresses that are part of this pool. Each address must be either in the CIDR form (1.2.3.0/24) or range form (1.2.3.1-1.2.3.5).",
        ).optional(),
        avoidBuggyIps: z.boolean().describe(
          "If true, avoid using IPs ending in.0 or.255. This avoids buggy consumer devices mistakenly dropping IPv4 traffic for those special IP addresses.",
        ).optional(),
        manualAssign: z.boolean().describe(
          "If true, prevent IP addresses from being automatically assigned.",
        ).optional(),
        pool: z.string().describe("Required. The name of the address pool.")
          .optional(),
      })).describe(
        "Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools.",
      ).optional(),
      asn: z.string().describe(
        "Required. BGP autonomous system number (ASN) of the cluster. This field can be updated after cluster creation.",
      ).optional(),
      bgpPeerConfigs: z.array(z.object({
        asn: z.string().describe(
          "Required. BGP autonomous system number (ASN) for the network that contains the external peer device.",
        ).optional(),
        controlPlaneNodes: z.array(z.unknown()).describe(
          "The IP address of the control plane node that connects to the external peer. If you don't specify any control plane nodes, all control plane nodes can connect to the external peer. If you specify one or more IP addresses, only the nodes specified participate in peering sessions.",
        ).optional(),
        ipAddress: z.string().describe(
          "Required. The IP address of the external peer device.",
        ).optional(),
      })).describe(
        "Required. The list of BGP peers that the cluster will connect to. At least one peer must be configured for each control plane node. Control plane nodes will connect to these peers to advertise the control plane VIP. The Services load balancer also uses these peers by default. This field can be updated after cluster creation.",
      ).optional(),
      loadBalancerNodePoolConfig: z.object({
        nodePoolConfig: z.object({
          kubeletConfig: z.object({
            registryBurst: z.unknown().describe(
              "The maximum size of bursty pulls, temporarily allows pulls to burst to this number, while still not exceeding registry_pull_qps. The value must not be a negative number. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 10.",
            ).optional(),
            registryPullQps: z.unknown().describe(
              "The limit of registry pulls per second. Setting this value to 0 means no limit. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 5.",
            ).optional(),
            serializeImagePullsDisabled: z.unknown().describe(
              "Prevents the Kubelet from pulling multiple images at a time. We recommend *not* changing the default value on nodes that run docker daemon with version < 1.9 or an Another Union File System (Aufs) storage backend. Issue https://github.com/kubernetes/kubernetes/issues/10959 has more details.",
            ).optional(),
          }).describe(
            "The modifiable kubelet configurations for the bare metal machines.",
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            'The labels assigned to nodes of this node pool. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
          ).optional(),
          nodeConfigs: z.array(z.unknown()).describe(
            "Required. The list of machine addresses in the bare metal node pool.",
          ).optional(),
          operatingSystem: z.enum(["OPERATING_SYSTEM_UNSPECIFIED", "LINUX"])
            .describe("Specifies the nodes operating system (default: LINUX).")
            .optional(),
          taints: z.array(z.unknown()).describe(
            "The initial taints assigned to nodes of this node pool.",
          ).optional(),
        }).describe(
          "The generic configuration for a node pool running a load balancer.",
        ).optional(),
      }).describe(
        "Specifies the node pool running data plane load balancing. L2 connectivity is required among nodes in this pool. If missing, the control plane node pool is used for data plane load balancing.",
      ).optional(),
    }).describe(
      "Configuration for BGP typed load balancers. When set network_config.advanced_networking is automatically set to true.",
    ).optional(),
    manualLbConfig: z.object({
      enabled: z.boolean().describe("Whether manual load balancing is enabled.")
        .optional(),
    }).describe("Manually configured load balancers.").optional(),
    metalLbConfig: z.object({
      addressPools: z.array(z.object({
        addresses: z.array(z.unknown()).describe(
          "Required. The addresses that are part of this pool. Each address must be either in the CIDR form (1.2.3.0/24) or range form (1.2.3.1-1.2.3.5).",
        ).optional(),
        avoidBuggyIps: z.boolean().describe(
          "If true, avoid using IPs ending in.0 or.255. This avoids buggy consumer devices mistakenly dropping IPv4 traffic for those special IP addresses.",
        ).optional(),
        manualAssign: z.boolean().describe(
          "If true, prevent IP addresses from being automatically assigned.",
        ).optional(),
        pool: z.string().describe("Required. The name of the address pool.")
          .optional(),
      })).describe(
        "Required. AddressPools is a list of non-overlapping IP pools used by load balancer typed services. All addresses must be routable to load balancer nodes. IngressVIP must be included in the pools.",
      ).optional(),
      loadBalancerNodePoolConfig: z.object({
        nodePoolConfig: z.object({
          kubeletConfig: z.object({
            registryBurst: z.unknown().describe(
              "The maximum size of bursty pulls, temporarily allows pulls to burst to this number, while still not exceeding registry_pull_qps. The value must not be a negative number. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 10.",
            ).optional(),
            registryPullQps: z.unknown().describe(
              "The limit of registry pulls per second. Setting this value to 0 means no limit. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 5.",
            ).optional(),
            serializeImagePullsDisabled: z.unknown().describe(
              "Prevents the Kubelet from pulling multiple images at a time. We recommend *not* changing the default value on nodes that run docker daemon with version < 1.9 or an Another Union File System (Aufs) storage backend. Issue https://github.com/kubernetes/kubernetes/issues/10959 has more details.",
            ).optional(),
          }).describe(
            "The modifiable kubelet configurations for the bare metal machines.",
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            'The labels assigned to nodes of this node pool. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
          ).optional(),
          nodeConfigs: z.array(z.unknown()).describe(
            "Required. The list of machine addresses in the bare metal node pool.",
          ).optional(),
          operatingSystem: z.enum(["OPERATING_SYSTEM_UNSPECIFIED", "LINUX"])
            .describe("Specifies the nodes operating system (default: LINUX).")
            .optional(),
          taints: z.array(z.unknown()).describe(
            "The initial taints assigned to nodes of this node pool.",
          ).optional(),
        }).describe(
          "The generic configuration for a node pool running a load balancer.",
        ).optional(),
      }).describe(
        "Specifies the node pool running the load balancer. L2 connectivity is required among nodes in this pool. If missing, the control plane node pool is used as the load balancer pool.",
      ).optional(),
    }).describe("Configuration for MetalLB load balancers.").optional(),
    portConfig: z.object({
      controlPlaneLoadBalancerPort: z.number().int().describe(
        "The port that control plane hosted load balancers will listen on.",
      ).optional(),
    }).describe("Configures the ports that the load balancer will listen on.")
      .optional(),
    vipConfig: z.object({
      controlPlaneVip: z.string().describe(
        "The VIP which you previously set aside for the Kubernetes API of this bare metal user cluster.",
      ).optional(),
      ingressVip: z.string().describe(
        "The VIP which you previously set aside for ingress traffic into this bare metal user cluster.",
      ).optional(),
    }).describe("The VIPs used by the load balancer.").optional(),
  }).describe("Required. Load balancer configuration.").optional(),
  maintenanceConfig: z.object({
    maintenanceAddressCidrBlocks: z.array(z.string()).describe(
      'Required. All IPv4 address from these ranges will be placed into maintenance mode. Nodes in maintenance mode will be cordoned and drained. When both of these are true, the "baremetal.cluster.gke.io/maintenance" annotation will be set on the node resource.',
    ).optional(),
  }).describe("Maintenance configuration.").optional(),
  name: z.string().describe(
    "Immutable. The bare metal user cluster resource name.",
  ).optional(),
  networkConfig: z.object({
    advancedNetworking: z.boolean().describe(
      "Enables the use of advanced Anthos networking features, such as Bundled Load Balancing with BGP or the egress NAT gateway. Setting configuration for advanced networking features will automatically set this flag.",
    ).optional(),
    islandModeCidr: z.object({
      podAddressCidrBlocks: z.array(z.string()).describe(
        "Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field cannot be changed after creation.",
      ).optional(),
      serviceAddressCidrBlocks: z.array(z.string()).describe(
        "Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field is mutable after creation starting with version 1.15.",
      ).optional(),
    }).describe(
      "Configuration for island mode CIDR. In an island-mode network, nodes have unique IP addresses, but pods don't have unique addresses across clusters. This doesn't cause problems because pods in one cluster never directly communicate with pods in another cluster. Instead, there are gateways that mediate between a pod in one cluster and a pod in another cluster.",
    ).optional(),
    multipleNetworkInterfacesConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable multiple network interfaces for your pods. When set network_config.advanced_networking is automatically set to true.",
      ).optional(),
    }).describe("Configuration for multiple network interfaces.").optional(),
    srIovConfig: z.object({
      enabled: z.boolean().describe("Whether to install the SR-IOV operator.")
        .optional(),
    }).describe("Configuration for SR-IOV.").optional(),
  }).describe("Required. Network configuration.").optional(),
  nodeAccessConfig: z.object({
    loginUser: z.string().describe(
      'LoginUser is the user name used to access node machines. It defaults to "root" if not set.',
    ).optional(),
  }).describe("Node access related configurations.").optional(),
  nodeConfig: z.object({
    containerRuntime: z.enum(["CONTAINER_RUNTIME_UNSPECIFIED", "CONTAINERD"])
      .describe("Specifies which container runtime will be used.").optional(),
    maxPodsPerNode: z.string().describe(
      "The maximum number of pods a node can run. The size of the CIDR range assigned to the node will be derived from this parameter.",
    ).optional(),
  }).describe("Workload node configuration.").optional(),
  osEnvironmentConfig: z.object({
    packageRepoExcluded: z.boolean().describe(
      "Whether the package repo should not be included when initializing bare metal machines.",
    ).optional(),
  }).describe("OS environment related configurations.").optional(),
  proxy: z.object({
    noProxy: z.array(z.string()).describe(
      'A list of IPs, hostnames, and domains that should skip the proxy. Examples: ["127.0.0.1", "example.com", ".corp", "localhost"].',
    ).optional(),
    uri: z.string().describe(
      "Required. Specifies the address of your proxy server. Examples: `http://domain` Do not provide credentials in the format `http://(username:password@)domain` these will be rejected by the server.",
    ).optional(),
  }).describe("Proxy configuration.").optional(),
  securityConfig: z.object({
    authorization: z.object({
      adminUsers: z.array(z.object({
        username: z.string().describe(
          "Required. The name of the user, e.g. `my-gcp-id@gmail.com`.",
        ).optional(),
      })).describe(
        "For VMware and bare metal user clusters, users will be granted the cluster-admin role on the cluster, which provides full administrative access to the cluster. For bare metal admin clusters, users will be granted the cluster-view role, which limits users to read-only access.",
      ).optional(),
    }).describe("Configures user access to the user cluster.").optional(),
  }).describe("Security related setting configuration.").optional(),
  storage: z.object({
    lvpNodeMountsConfig: z.object({
      path: z.string().describe("Required. The host machine path.").optional(),
      storageClass: z.string().describe(
        "Required. The StorageClass name that PVs will be created with.",
      ).optional(),
    }).describe(
      "Required. Specifies the config for local PersistentVolumes backed by mounted node disks. These disks need to be formatted and mounted by the user, which can be done before or after cluster creation.",
    ).optional(),
    lvpShareConfig: z.object({
      lvpConfig: z.object({
        path: z.string().describe("Required. The host machine path.")
          .optional(),
        storageClass: z.string().describe(
          "Required. The StorageClass name that PVs will be created with.",
        ).optional(),
      }).describe(
        "Required. Defines the machine path and storage class for the LVP Share.",
      ).optional(),
      sharedPathPvCount: z.number().int().describe(
        "The number of subdirectories to create under path.",
      ).optional(),
    }).describe(
      "Required. Specifies the config for local PersistentVolumes backed by subdirectories in a shared filesystem. These subdirectores are automatically created during cluster creation.",
    ).optional(),
  }).describe("Required. Storage configuration.").optional(),
  upgradePolicy: z.object({
    pause: z.boolean().describe(
      "Output only. Pause is used to show the upgrade pause status. It's view only for now.",
    ).optional(),
    policy: z.enum(["NODE_POOL_POLICY_UNSPECIFIED", "SERIAL", "CONCURRENT"])
      .describe("Specifies which upgrade policy to use.").optional(),
  }).describe("The cluster upgrade policy.").optional(),
  allowPreflightFailure: z.string().describe(
    'Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster.',
  ).optional(),
  bareMetalClusterId: z.string().describe(
    "Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/",
  ).optional(),
  allowMissing: z.string().describe(
    "If set to true, and the bare metal cluster is not found, the request will create a new bare metal cluster with the provided configuration. The user must have both create and update permission to call Update with allow_missing set to true.",
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

/** Swamp extension model for Google Cloud GKE On-Prem BareMetalClusters. Registered at `@swamp/gcp/gkeonprem/baremetalclusters`. */
export const model = {
  type: "@swamp/gcp/gkeonprem/baremetalclusters",
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
      toVersion: "2026.05.18.1",
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
      toVersion: "2026.07.17.2",
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
      toVersion: "2026.07.21.1",
      description: "Removed: fleet, maintenanceStatus, status, validationCheck",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          fleet: _fleet,
          maintenanceStatus: _maintenanceStatus,
          status: _status,
          validationCheck: _validationCheck,
          ...rest
        } = old;
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
      toVersion: "2026.09.07.1",
      description: "Added: allowMissing",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: evaluationMode, enableApplicationLogs, apiServerArgs, argument, value, controlPlaneNodePoolConfig, nodePoolConfig, kubeletConfig, registryBurst, registryPullQps, serializeImagePullsDisabled, labels, nodeConfigs, labels, nodeIp, operatingSystem, taints, effect, key, value, bgpLbConfig, addressPools, addresses, avoidBuggyIps, manualAssign, pool, asn, bgpPeerConfigs, asn, controlPlaneNodes, ipAddress, loadBalancerNodePoolConfig, nodePoolConfig, kubeletConfig, registryBurst, registryPullQps, serializeImagePullsDisabled, labels, nodeConfigs, operatingSystem, taints, manualLbConfig, enabled, metalLbConfig, addressPools, addresses, avoidBuggyIps, manualAssign, pool, loadBalancerNodePoolConfig, nodePoolConfig, kubeletConfig, registryBurst, registryPullQps, serializeImagePullsDisabled, labels, nodeConfigs, operatingSystem, taints, portConfig, controlPlaneLoadBalancerPort, vipConfig, controlPlaneVip, ingressVip, maintenanceAddressCidrBlocks, advancedNetworking, islandModeCidr, podAddressCidrBlocks, serviceAddressCidrBlocks, multipleNetworkInterfacesConfig, enabled, srIovConfig, enabled, loginUser, containerRuntime, maxPodsPerNode, packageRepoExcluded, noProxy, uri, authorization, adminUsers, username, lvpNodeMountsConfig, path, storageClass, lvpShareConfig, lvpConfig, path, storageClass, sharedPathPvCount, pause, policy",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          evaluationMode: _evaluationMode,
          enableApplicationLogs: _enableApplicationLogs,
          apiServerArgs: _apiServerArgs,
          argument: _argument,
          value: _value,
          controlPlaneNodePoolConfig: _controlPlaneNodePoolConfig,
          nodePoolConfig: _nodePoolConfig,
          kubeletConfig: _kubeletConfig,
          registryBurst: _registryBurst,
          registryPullQps: _registryPullQps,
          serializeImagePullsDisabled: _serializeImagePullsDisabled,
          labels: _labels,
          nodeConfigs: _nodeConfigs,
          nodeIp: _nodeIp,
          operatingSystem: _operatingSystem,
          taints: _taints,
          effect: _effect,
          key: _key,
          bgpLbConfig: _bgpLbConfig,
          addressPools: _addressPools,
          addresses: _addresses,
          avoidBuggyIps: _avoidBuggyIps,
          manualAssign: _manualAssign,
          pool: _pool,
          asn: _asn,
          bgpPeerConfigs: _bgpPeerConfigs,
          controlPlaneNodes: _controlPlaneNodes,
          ipAddress: _ipAddress,
          loadBalancerNodePoolConfig: _loadBalancerNodePoolConfig,
          manualLbConfig: _manualLbConfig,
          enabled: _enabled,
          metalLbConfig: _metalLbConfig,
          portConfig: _portConfig,
          controlPlaneLoadBalancerPort: _controlPlaneLoadBalancerPort,
          vipConfig: _vipConfig,
          controlPlaneVip: _controlPlaneVip,
          ingressVip: _ingressVip,
          maintenanceAddressCidrBlocks: _maintenanceAddressCidrBlocks,
          advancedNetworking: _advancedNetworking,
          islandModeCidr: _islandModeCidr,
          podAddressCidrBlocks: _podAddressCidrBlocks,
          serviceAddressCidrBlocks: _serviceAddressCidrBlocks,
          multipleNetworkInterfacesConfig: _multipleNetworkInterfacesConfig,
          srIovConfig: _srIovConfig,
          loginUser: _loginUser,
          containerRuntime: _containerRuntime,
          maxPodsPerNode: _maxPodsPerNode,
          packageRepoExcluded: _packageRepoExcluded,
          noProxy: _noProxy,
          uri: _uri,
          authorization: _authorization,
          adminUsers: _adminUsers,
          username: _username,
          lvpNodeMountsConfig: _lvpNodeMountsConfig,
          path: _path,
          storageClass: _storageClass,
          lvpShareConfig: _lvpShareConfig,
          lvpConfig: _lvpConfig,
          sharedPathPvCount: _sharedPathPvCount,
          pause: _pause,
          policy: _policy,
          ...rest
        } = old;
        return rest;
      },
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
      description: "Resource that represents a bare metal user cluster.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a bareMetalClusters",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["adminClusterMembership"] !== undefined) {
          body["adminClusterMembership"] = g["adminClusterMembership"];
        }
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["bareMetalVersion"] !== undefined) {
          body["bareMetalVersion"] = g["bareMetalVersion"];
        }
        if (g["binaryAuthorization"] !== undefined) {
          body["binaryAuthorization"] = g["binaryAuthorization"];
        }
        if (g["clusterOperations"] !== undefined) {
          body["clusterOperations"] = g["clusterOperations"];
        }
        if (g["controlPlane"] !== undefined) {
          body["controlPlane"] = g["controlPlane"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["loadBalancer"] !== undefined) {
          body["loadBalancer"] = g["loadBalancer"];
        }
        if (g["maintenanceConfig"] !== undefined) {
          body["maintenanceConfig"] = g["maintenanceConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["nodeAccessConfig"] !== undefined) {
          body["nodeAccessConfig"] = g["nodeAccessConfig"];
        }
        if (g["nodeConfig"] !== undefined) body["nodeConfig"] = g["nodeConfig"];
        if (g["osEnvironmentConfig"] !== undefined) {
          body["osEnvironmentConfig"] = g["osEnvironmentConfig"];
        }
        if (g["proxy"] !== undefined) body["proxy"] = g["proxy"];
        if (g["securityConfig"] !== undefined) {
          body["securityConfig"] = g["securityConfig"];
        }
        if (g["storage"] !== undefined) body["storage"] = g["storage"];
        if (g["upgradePolicy"] !== undefined) {
          body["upgradePolicy"] = g["upgradePolicy"];
        }
        if (g["allowPreflightFailure"] !== undefined) {
          params["allowPreflightFailure"] = String(g["allowPreflightFailure"]);
        }
        if (g["bareMetalClusterId"] !== undefined) {
          params["bareMetalClusterId"] = String(g["bareMetalClusterId"]);
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING", "RECONCILING"],
              "failedValues": ["ERROR", "DEGRADED"],
            }
            : undefined,
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
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a bareMetalClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the bareMetalClusters"),
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
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update bareMetalClusters attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific bareMetalClusters by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
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
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["adminClusterMembership"] !== undefined) {
          body["adminClusterMembership"] = g["adminClusterMembership"];
        }
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["bareMetalVersion"] !== undefined) {
          body["bareMetalVersion"] = g["bareMetalVersion"];
        }
        if (g["binaryAuthorization"] !== undefined) {
          body["binaryAuthorization"] = g["binaryAuthorization"];
        }
        if (g["clusterOperations"] !== undefined) {
          body["clusterOperations"] = g["clusterOperations"];
        }
        if (g["controlPlane"] !== undefined) {
          body["controlPlane"] = g["controlPlane"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["loadBalancer"] !== undefined) {
          body["loadBalancer"] = g["loadBalancer"];
        }
        if (g["maintenanceConfig"] !== undefined) {
          body["maintenanceConfig"] = g["maintenanceConfig"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["nodeAccessConfig"] !== undefined) {
          body["nodeAccessConfig"] = g["nodeAccessConfig"];
        }
        if (g["nodeConfig"] !== undefined) body["nodeConfig"] = g["nodeConfig"];
        if (g["osEnvironmentConfig"] !== undefined) {
          body["osEnvironmentConfig"] = g["osEnvironmentConfig"];
        }
        if (g["proxy"] !== undefined) body["proxy"] = g["proxy"];
        if (g["securityConfig"] !== undefined) {
          body["securityConfig"] = g["securityConfig"];
        }
        if (g["storage"] !== undefined) body["storage"] = g["storage"];
        if (g["upgradePolicy"] !== undefined) {
          body["upgradePolicy"] = g["upgradePolicy"];
        }
        if (g["allowMissing"] !== undefined) {
          params["allowMissing"] = String(g["allowMissing"]);
        } else if (existing["allowMissing"] !== undefined) {
          params["allowMissing"] = String(existing["allowMissing"]);
        }
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
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
      description: "Delete the bareMetalClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the bareMetalClusters"),
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
      description: "Sync bareMetalClusters state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific bareMetalClusters by name (e.g. one discovered by list)",
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
      description: "List bareMetalClusters resources",
      arguments: z.object({
        allowMissing: z.boolean().describe(
          "Optional. If true, return list of BareMetal Clusters including the ones that only exists in RMS.",
        ).optional(),
        filter: z.string().describe(
          "A resource filtering expression following https://google.aip.dev/160. When non-empty, only resource's whose attributes field matches the filter are returned.",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        view: z.string().describe(
          "View for bare metal Clusters. When `BASIC` is specified, only the cluster resource name and admin cluster membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete cluster configuration details.",
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
        if (args["allowMissing"] !== undefined) {
          params["allowMissing"] = String(args["allowMissing"]);
        }
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "bareMetalClusters",
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
    enroll: {
      description: "enroll",
      arguments: z.object({
        adminClusterMembership: z.any().optional(),
        bareMetalClusterId: z.any().optional(),
        localName: z.any().optional(),
        localNamespace: z.any().optional(),
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
        const body: Record<string, unknown> = {};
        if (args["adminClusterMembership"] !== undefined) {
          body["adminClusterMembership"] = args["adminClusterMembership"];
        }
        if (args["bareMetalClusterId"] !== undefined) {
          body["bareMetalClusterId"] = args["bareMetalClusterId"];
        }
        if (args["localName"] !== undefined) {
          body["localName"] = args["localName"];
        }
        if (args["localNamespace"] !== undefined) {
          body["localNamespace"] = args["localNamespace"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "gkeonprem.projects.locations.bareMetalClusters.enroll",
            "path": "v1/{+parent}/bareMetalClusters:enroll",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options_requestedPolicyVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "gkeonprem.projects.locations.bareMetalClusters.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    query_version_config: {
      description: "query version config",
      arguments: z.object({
        createConfig_adminClusterMembership: z.any().optional(),
        createConfig_adminClusterName: z.any().optional(),
        upgradeConfig_clusterName: z.any().optional(),
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
        if (args["createConfig_adminClusterMembership"] !== undefined) {
          params["createConfig.adminClusterMembership"] = String(
            args["createConfig_adminClusterMembership"],
          );
        }
        if (args["createConfig_adminClusterName"] !== undefined) {
          params["createConfig.adminClusterName"] = String(
            args["createConfig_adminClusterName"],
          );
        }
        if (args["upgradeConfig_clusterName"] !== undefined) {
          params["upgradeConfig.clusterName"] = String(
            args["upgradeConfig_clusterName"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "gkeonprem.projects.locations.bareMetalClusters.queryVersionConfig",
            "path": "v1/{+parent}/bareMetalClusters:queryVersionConfig",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "createConfig.adminClusterMembership": { "location": "query" },
              "createConfig.adminClusterName": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "upgradeConfig.clusterName": { "location": "query" },
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
          {
            "id": "gkeonprem.projects.locations.bareMetalClusters.setIamPolicy",
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
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "gkeonprem.projects.locations.bareMetalClusters.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
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
    unenroll: {
      description: "unenroll",
      arguments: z.object({
        allowMissing: z.any().optional(),
        etag: z.any().optional(),
        force: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        if (args["allowMissing"] !== undefined) {
          params["allowMissing"] = String(args["allowMissing"]);
        }
        if (args["etag"] !== undefined) params["etag"] = String(args["etag"]);
        if (args["force"] !== undefined) {
          params["force"] = String(args["force"]);
        }
        if (args["validateOnly"] !== undefined) {
          params["validateOnly"] = String(args["validateOnly"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "gkeonprem.projects.locations.bareMetalClusters.unenroll",
            "path": "v1/{+name}:unenroll",
            "httpMethod": "DELETE",
            "parameterOrder": ["name"],
            "parameters": {
              "allowMissing": { "location": "query" },
              "etag": { "location": "query" },
              "force": { "location": "query" },
              "name": { "location": "path", "required": true },
              "validateOnly": { "location": "query" },
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
