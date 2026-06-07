// Auto-generated extension model for @swamp/gcp/gkeonprem/baremetaladminclusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE On-Prem BareMetalAdminClusters.
 *
 * Resource that represents a bare metal admin cluster.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/bareMetalAdminClusters/${shortName}`;
}

const BASE_URL = "https://gkeonprem.googleapis.com/";

const GET_CONFIG = {
  "id": "gkeonprem.projects.locations.bareMetalAdminClusters.get",
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
  "id": "gkeonprem.projects.locations.bareMetalAdminClusters.create",
  "path": "v1/{+parent}/bareMetalAdminClusters",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "allowPreflightFailure": {
      "location": "query",
    },
    "bareMetalAdminClusterId": {
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
  "id": "gkeonprem.projects.locations.bareMetalAdminClusters.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "gkeonprem.projects.locations.bareMetalAdminClusters.list",
  "path": "v1/{+parent}/bareMetalAdminClusters",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "allowMissing": {
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
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the bare metal admin cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  bareMetalVersion: z.string().describe(
    "The Anthos clusters on bare metal version for the bare metal admin cluster.",
  ).optional(),
  binaryAuthorization: z.object({
    evaluationMode: z.enum([
      "EVALUATION_MODE_UNSPECIFIED",
      "DISABLED",
      "PROJECT_SINGLETON_POLICY_ENFORCE",
    ]).describe(
      "Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED.",
    ).optional(),
  }).describe("Configuration for Binary Authorization.").optional(),
  clusterOperations: z.object({
    enableApplicationLogs: z.boolean().describe(
      "Whether collection of application logs/metrics should be enabled (in addition to system logs/metrics).",
    ).optional(),
  }).describe(
    "BareMetalAdminClusterOperationsConfig specifies the admin cluster's observability infrastructure.",
  ).optional(),
  controlPlane: z.object({
    apiServerArgs: z.array(z.object({
      argument: z.string().describe(
        "Required. The argument name as it appears on the API Server command line please make sure to remove the leading dashes.",
      ).optional(),
      value: z.string().describe(
        "Required. The value of the arg as it will be passed to the API Server command line.",
      ).optional(),
    })).describe(
      "Customizes the default API server args. Only a subset of customized flags are supported. Please refer to the API server documentation below to know the exact format: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/",
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
          "KubeletConfig defines the modifiable kubelet configurations for bare metal machines. Note: this list includes fields supported in GKE (see https://cloud.google.com/kubernetes-engine/docs/how-to/node-system-config#kubelet-options).",
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
        "BareMetalNodePoolConfig describes the configuration of all nodes within a given bare metal node pool.",
      ).optional(),
    }).describe(
      "BareMetalAdminControlPlaneNodePoolConfig specifies the control plane node pool configuration. We have a control plane specific node pool config so that we can flexible about supporting control plane specific fields in the future.",
    ).optional(),
  }).describe(
    "BareMetalAdminControlPlaneConfig specifies the control plane configuration.",
  ).optional(),
  description: z.string().describe(
    "A human readable description of this bare metal admin cluster.",
  ).optional(),
  fleet: z.object({
    membership: z.string().describe(
      "Output only. The name of the managed fleet Membership resource associated to this cluster. Membership names are formatted as `projects//locations//memberships/`.",
    ).optional(),
  }).describe(
    "Fleet related configuration. Fleets are a Google Cloud concept for logically organizing clusters, letting you use and manage multi-cluster capabilities and apply consistent policies across your systems. See [Anthos Fleets](`https://cloud.google.com/anthos/multicluster-management/fleets`) for more details on Anthos multi-cluster capabilities using Fleets. ##",
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
            "KubeletConfig defines the modifiable kubelet configurations for bare metal machines. Note: this list includes fields supported in GKE (see https://cloud.google.com/kubernetes-engine/docs/how-to/node-system-config#kubelet-options).",
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
          "BareMetalNodePoolConfig describes the configuration of all nodes within a given bare metal node pool.",
        ).optional(),
      }).describe("Specifies the load balancer's node pool configuration.")
        .optional(),
    }).describe(
      "BareMetalAdminBgpLbConfig represents configuration parameters for a Border Gateway Protocol (BGP) load balancer.",
    ).optional(),
    manualLbConfig: z.object({
      enabled: z.boolean().describe("Whether manual load balancing is enabled.")
        .optional(),
    }).describe(
      "BareMetalAdminManualLbConfig represents configuration parameters for a manual load balancer.",
    ).optional(),
    portConfig: z.object({
      controlPlaneLoadBalancerPort: z.number().int().describe(
        "The port that control plane hosted load balancers will listen on.",
      ).optional(),
    }).describe(
      "BareMetalAdminPortConfig is the specification of load balancer ports.",
    ).optional(),
    vipConfig: z.object({
      controlPlaneVip: z.string().describe(
        "The VIP which you previously set aside for the Kubernetes API of this bare metal admin cluster.",
      ).optional(),
    }).describe(
      "BareMetalAdminVipConfig for bare metal load balancer configurations.",
    ).optional(),
  }).describe(
    "BareMetalAdminLoadBalancerConfig specifies the load balancer configuration.",
  ).optional(),
  maintenanceConfig: z.object({
    maintenanceAddressCidrBlocks: z.array(z.string()).describe(
      'Required. All IPv4 address from these ranges will be placed into maintenance mode. Nodes in maintenance mode will be cordoned and drained. When both of these are true, the "baremetal.cluster.gke.io/maintenance" annotation will be set on the node resource.',
    ).optional(),
  }).describe(
    "BareMetalAdminMaintenanceConfig specifies configurations to put bare metal Admin cluster CRs nodes in and out of maintenance.",
  ).optional(),
  maintenanceStatus: z.object({
    machineDrainStatus: z.object({
      drainedMachines: z.array(z.object({
        nodeIp: z.string().describe("Drained machine IP address.").optional(),
      })).describe("The list of drained machines.").optional(),
      drainingMachines: z.array(z.object({
        nodeIp: z.string().describe("Draining machine IP address.").optional(),
        podCount: z.number().int().describe("The count of pods yet to drain.")
          .optional(),
      })).describe("The list of draning machines.").optional(),
    }).describe(
      "BareMetalAdminMachineDrainStatus represents the status of bare metal node machines that are undergoing drain operations.",
    ).optional(),
  }).describe(
    "BareMetalAdminMaintenanceStatus represents the maintenance status for bare metal Admin cluster CR's nodes.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The bare metal admin cluster resource name.",
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
        "Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field cannot be changed after creation.",
      ).optional(),
    }).describe(
      "BareMetalAdminIslandModeCidrConfig specifies the cluster CIDR configuration while running in island mode.",
    ).optional(),
    multipleNetworkInterfacesConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable multiple network interfaces for your pods. When set network_config.advanced_networking is automatically set to true.",
      ).optional(),
    }).describe(
      "Specifies the multiple networking interfaces cluster configuration.",
    ).optional(),
  }).describe(
    "BareMetalAdminNetworkConfig specifies the cluster network configuration.",
  ).optional(),
  nodeAccessConfig: z.object({
    loginUser: z.string().describe(
      'Required. LoginUser is the user name used to access node machines. It defaults to "root" if not set.',
    ).optional(),
  }).describe(
    "Specifies the node access related settings for the bare metal admin cluster.",
  ).optional(),
  nodeConfig: z.object({
    maxPodsPerNode: z.string().describe(
      "The maximum number of pods a node can run. The size of the CIDR range assigned to the node will be derived from this parameter. By default 110 Pods are created per Node. Upper bound is 250 for both HA and non-HA admin cluster. Lower bound is 64 for non-HA admin cluster and 32 for HA admin cluster.",
    ).optional(),
  }).describe(
    "BareMetalAdminWorkloadNodeConfig specifies the workload node configurations.",
  ).optional(),
  osEnvironmentConfig: z.object({
    packageRepoExcluded: z.boolean().describe(
      "Whether the package repo should be added when initializing bare metal machines.",
    ).optional(),
  }).describe(
    "Specifies operating system operation settings for cluster provisioning.",
  ).optional(),
  proxy: z.object({
    noProxy: z.array(z.string()).describe(
      'A list of IPs, hostnames, and domains that should skip the proxy. Examples: ["127.0.0.1", "example.com", ".corp", "localhost"].',
    ).optional(),
    uri: z.string().describe(
      "Required. Specifies the address of your proxy server. Examples: `http://domain` WARNING: Do not provide credentials in the format `http://(username:password@)domain` these will be rejected by the server.",
    ).optional(),
  }).describe(
    "BareMetalAdminProxyConfig specifies the cluster proxy configuration.",
  ).optional(),
  securityConfig: z.object({
    authorization: z.object({
      adminUsers: z.array(z.object({
        username: z.string().describe(
          "Required. The name of the user, e.g. `my-gcp-id@gmail.com`.",
        ).optional(),
      })).describe(
        "For VMware and bare metal user clusters, users will be granted the cluster-admin role on the cluster, which provides full administrative access to the cluster. For bare metal admin clusters, users will be granted the cluster-view role, which limits users to read-only access.",
      ).optional(),
    }).describe(
      "Authorization defines the On-Prem cluster authorization configuration to bootstrap onto the admin cluster.",
    ).optional(),
  }).describe(
    "Specifies the security related settings for the bare metal admin cluster.",
  ).optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string().describe(
        "Last time the condition transit from one status to another.",
      ).optional(),
      message: z.string().describe(
        "Human-readable message indicating details about last transition.",
      ).optional(),
      reason: z.string().describe(
        "Machine-readable message indicating details about last transition.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "STATE_TRUE",
        "STATE_FALSE",
        "STATE_UNKNOWN",
      ]).describe("state of the condition.").optional(),
      type: z.string().describe(
        "Type of the condition. (e.g., ClusterRunning, NodePoolRunning or ServerSidePreflightReady)",
      ).optional(),
    })).describe(
      "ResourceCondition provide a standard mechanism for higher-level status reporting from controller.",
    ).optional(),
    errorMessage: z.string().describe(
      "Human-friendly representation of the error message from controller. The error message can be temporary as the controller controller creates a cluster or node pool. If the error message persists for a longer period of time, it can be used to surface error message to indicate real problems requiring user intervention.",
    ).optional(),
    version: z.string().describe("Reflect current version of the resource.")
      .optional(),
    versions: z.object({
      versions: z.array(z.object({
        count: z.string().describe(
          "Number of machines under the above version.",
        ).optional(),
        version: z.string().describe("Resource version.").optional(),
      })).describe(
        "Shows the mapping of a given version to the number of machines under this version.",
      ).optional(),
    }).describe(
      "Versions describes the mapping of a given version to the number of machines under this version.",
    ).optional(),
  }).describe(
    "ResourceStatus describes why a cluster or node pool has a certain status. (e.g., ERROR or DEGRADED).",
  ).optional(),
  storage: z.object({
    lvpNodeMountsConfig: z.object({
      path: z.string().describe("Required. The host machine path.").optional(),
      storageClass: z.string().describe(
        "Required. The StorageClass name that PVs will be created with.",
      ).optional(),
    }).describe("Specifies the configs for local persistent volumes (PVs).")
      .optional(),
    lvpShareConfig: z.object({
      lvpConfig: z.object({
        path: z.string().describe("Required. The host machine path.")
          .optional(),
        storageClass: z.string().describe(
          "Required. The StorageClass name that PVs will be created with.",
        ).optional(),
      }).describe("Specifies the configs for local persistent volumes (PVs).")
        .optional(),
      sharedPathPvCount: z.number().int().describe(
        "The number of subdirectories to create under path.",
      ).optional(),
    }).describe(
      "Specifies the configs for local persistent volumes under a shared file system.",
    ).optional(),
  }).describe(
    "BareMetalAdminStorageConfig specifies the cluster storage configuration.",
  ).optional(),
  validationCheck: z.object({
    option: z.enum([
      "OPTIONS_UNSPECIFIED",
      "SKIP_VALIDATION_CHECK_BLOCKING",
      "SKIP_VALIDATION_ALL",
    ]).describe("Options used for the validation check").optional(),
    scenario: z.enum(["SCENARIO_UNSPECIFIED", "CREATE", "UPDATE"]).describe(
      "Output only. The scenario when the preflight checks were run.",
    ).optional(),
    status: z.object({
      result: z.array(z.object({
        category: z.string().describe("The category of the validation.")
          .optional(),
        description: z.string().describe(
          "The description of the validation check.",
        ).optional(),
        details: z.string().describe(
          "Detailed failure information, which might be unformatted.",
        ).optional(),
        reason: z.string().describe(
          "A human-readable message of the check failure.",
        ).optional(),
        state: z.enum([
          "STATE_UNKNOWN",
          "STATE_FAILURE",
          "STATE_SKIPPED",
          "STATE_FATAL",
          "STATE_WARNING",
        ]).describe("The validation check state.").optional(),
      })).describe(
        "Individual checks which failed as part of the Preflight check execution.",
      ).optional(),
    }).describe(
      "ValidationCheckStatus defines the detailed validation check status.",
    ).optional(),
  }).describe("ValidationCheck represents the result of preflight check.")
    .optional(),
  allowPreflightFailure: z.string().describe(
    'Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster.',
  ).optional(),
  bareMetalAdminClusterId: z.string().describe(
    "Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
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
    portConfig: z.object({
      controlPlaneLoadBalancerPort: z.number(),
    }),
    vipConfig: z.object({
      controlPlaneVip: z.string(),
    }),
  }).optional(),
  localName: z.string().optional(),
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
  }).optional(),
  nodeAccessConfig: z.object({
    loginUser: z.string(),
  }).optional(),
  nodeConfig: z.object({
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
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the bare metal admin cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  bareMetalVersion: z.string().describe(
    "The Anthos clusters on bare metal version for the bare metal admin cluster.",
  ).optional(),
  binaryAuthorization: z.object({
    evaluationMode: z.enum([
      "EVALUATION_MODE_UNSPECIFIED",
      "DISABLED",
      "PROJECT_SINGLETON_POLICY_ENFORCE",
    ]).describe(
      "Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED.",
    ).optional(),
  }).describe("Configuration for Binary Authorization.").optional(),
  clusterOperations: z.object({
    enableApplicationLogs: z.boolean().describe(
      "Whether collection of application logs/metrics should be enabled (in addition to system logs/metrics).",
    ).optional(),
  }).describe(
    "BareMetalAdminClusterOperationsConfig specifies the admin cluster's observability infrastructure.",
  ).optional(),
  controlPlane: z.object({
    apiServerArgs: z.array(z.object({
      argument: z.string().describe(
        "Required. The argument name as it appears on the API Server command line please make sure to remove the leading dashes.",
      ).optional(),
      value: z.string().describe(
        "Required. The value of the arg as it will be passed to the API Server command line.",
      ).optional(),
    })).describe(
      "Customizes the default API server args. Only a subset of customized flags are supported. Please refer to the API server documentation below to know the exact format: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/",
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
          "KubeletConfig defines the modifiable kubelet configurations for bare metal machines. Note: this list includes fields supported in GKE (see https://cloud.google.com/kubernetes-engine/docs/how-to/node-system-config#kubelet-options).",
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
        "BareMetalNodePoolConfig describes the configuration of all nodes within a given bare metal node pool.",
      ).optional(),
    }).describe(
      "BareMetalAdminControlPlaneNodePoolConfig specifies the control plane node pool configuration. We have a control plane specific node pool config so that we can flexible about supporting control plane specific fields in the future.",
    ).optional(),
  }).describe(
    "BareMetalAdminControlPlaneConfig specifies the control plane configuration.",
  ).optional(),
  description: z.string().describe(
    "A human readable description of this bare metal admin cluster.",
  ).optional(),
  fleet: z.object({
    membership: z.string().describe(
      "Output only. The name of the managed fleet Membership resource associated to this cluster. Membership names are formatted as `projects//locations//memberships/`.",
    ).optional(),
  }).describe(
    "Fleet related configuration. Fleets are a Google Cloud concept for logically organizing clusters, letting you use and manage multi-cluster capabilities and apply consistent policies across your systems. See [Anthos Fleets](`https://cloud.google.com/anthos/multicluster-management/fleets`) for more details on Anthos multi-cluster capabilities using Fleets. ##",
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
            "KubeletConfig defines the modifiable kubelet configurations for bare metal machines. Note: this list includes fields supported in GKE (see https://cloud.google.com/kubernetes-engine/docs/how-to/node-system-config#kubelet-options).",
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
          "BareMetalNodePoolConfig describes the configuration of all nodes within a given bare metal node pool.",
        ).optional(),
      }).describe("Specifies the load balancer's node pool configuration.")
        .optional(),
    }).describe(
      "BareMetalAdminBgpLbConfig represents configuration parameters for a Border Gateway Protocol (BGP) load balancer.",
    ).optional(),
    manualLbConfig: z.object({
      enabled: z.boolean().describe("Whether manual load balancing is enabled.")
        .optional(),
    }).describe(
      "BareMetalAdminManualLbConfig represents configuration parameters for a manual load balancer.",
    ).optional(),
    portConfig: z.object({
      controlPlaneLoadBalancerPort: z.number().int().describe(
        "The port that control plane hosted load balancers will listen on.",
      ).optional(),
    }).describe(
      "BareMetalAdminPortConfig is the specification of load balancer ports.",
    ).optional(),
    vipConfig: z.object({
      controlPlaneVip: z.string().describe(
        "The VIP which you previously set aside for the Kubernetes API of this bare metal admin cluster.",
      ).optional(),
    }).describe(
      "BareMetalAdminVipConfig for bare metal load balancer configurations.",
    ).optional(),
  }).describe(
    "BareMetalAdminLoadBalancerConfig specifies the load balancer configuration.",
  ).optional(),
  maintenanceConfig: z.object({
    maintenanceAddressCidrBlocks: z.array(z.string()).describe(
      'Required. All IPv4 address from these ranges will be placed into maintenance mode. Nodes in maintenance mode will be cordoned and drained. When both of these are true, the "baremetal.cluster.gke.io/maintenance" annotation will be set on the node resource.',
    ).optional(),
  }).describe(
    "BareMetalAdminMaintenanceConfig specifies configurations to put bare metal Admin cluster CRs nodes in and out of maintenance.",
  ).optional(),
  maintenanceStatus: z.object({
    machineDrainStatus: z.object({
      drainedMachines: z.array(z.object({
        nodeIp: z.string().describe("Drained machine IP address.").optional(),
      })).describe("The list of drained machines.").optional(),
      drainingMachines: z.array(z.object({
        nodeIp: z.string().describe("Draining machine IP address.").optional(),
        podCount: z.number().int().describe("The count of pods yet to drain.")
          .optional(),
      })).describe("The list of draning machines.").optional(),
    }).describe(
      "BareMetalAdminMachineDrainStatus represents the status of bare metal node machines that are undergoing drain operations.",
    ).optional(),
  }).describe(
    "BareMetalAdminMaintenanceStatus represents the maintenance status for bare metal Admin cluster CR's nodes.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The bare metal admin cluster resource name.",
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
        "Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. This field cannot be changed after creation.",
      ).optional(),
    }).describe(
      "BareMetalAdminIslandModeCidrConfig specifies the cluster CIDR configuration while running in island mode.",
    ).optional(),
    multipleNetworkInterfacesConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable multiple network interfaces for your pods. When set network_config.advanced_networking is automatically set to true.",
      ).optional(),
    }).describe(
      "Specifies the multiple networking interfaces cluster configuration.",
    ).optional(),
  }).describe(
    "BareMetalAdminNetworkConfig specifies the cluster network configuration.",
  ).optional(),
  nodeAccessConfig: z.object({
    loginUser: z.string().describe(
      'Required. LoginUser is the user name used to access node machines. It defaults to "root" if not set.',
    ).optional(),
  }).describe(
    "Specifies the node access related settings for the bare metal admin cluster.",
  ).optional(),
  nodeConfig: z.object({
    maxPodsPerNode: z.string().describe(
      "The maximum number of pods a node can run. The size of the CIDR range assigned to the node will be derived from this parameter. By default 110 Pods are created per Node. Upper bound is 250 for both HA and non-HA admin cluster. Lower bound is 64 for non-HA admin cluster and 32 for HA admin cluster.",
    ).optional(),
  }).describe(
    "BareMetalAdminWorkloadNodeConfig specifies the workload node configurations.",
  ).optional(),
  osEnvironmentConfig: z.object({
    packageRepoExcluded: z.boolean().describe(
      "Whether the package repo should be added when initializing bare metal machines.",
    ).optional(),
  }).describe(
    "Specifies operating system operation settings for cluster provisioning.",
  ).optional(),
  proxy: z.object({
    noProxy: z.array(z.string()).describe(
      'A list of IPs, hostnames, and domains that should skip the proxy. Examples: ["127.0.0.1", "example.com", ".corp", "localhost"].',
    ).optional(),
    uri: z.string().describe(
      "Required. Specifies the address of your proxy server. Examples: `http://domain` WARNING: Do not provide credentials in the format `http://(username:password@)domain` these will be rejected by the server.",
    ).optional(),
  }).describe(
    "BareMetalAdminProxyConfig specifies the cluster proxy configuration.",
  ).optional(),
  securityConfig: z.object({
    authorization: z.object({
      adminUsers: z.array(z.object({
        username: z.string().describe(
          "Required. The name of the user, e.g. `my-gcp-id@gmail.com`.",
        ).optional(),
      })).describe(
        "For VMware and bare metal user clusters, users will be granted the cluster-admin role on the cluster, which provides full administrative access to the cluster. For bare metal admin clusters, users will be granted the cluster-view role, which limits users to read-only access.",
      ).optional(),
    }).describe(
      "Authorization defines the On-Prem cluster authorization configuration to bootstrap onto the admin cluster.",
    ).optional(),
  }).describe(
    "Specifies the security related settings for the bare metal admin cluster.",
  ).optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string().describe(
        "Last time the condition transit from one status to another.",
      ).optional(),
      message: z.string().describe(
        "Human-readable message indicating details about last transition.",
      ).optional(),
      reason: z.string().describe(
        "Machine-readable message indicating details about last transition.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "STATE_TRUE",
        "STATE_FALSE",
        "STATE_UNKNOWN",
      ]).describe("state of the condition.").optional(),
      type: z.string().describe(
        "Type of the condition. (e.g., ClusterRunning, NodePoolRunning or ServerSidePreflightReady)",
      ).optional(),
    })).describe(
      "ResourceCondition provide a standard mechanism for higher-level status reporting from controller.",
    ).optional(),
    errorMessage: z.string().describe(
      "Human-friendly representation of the error message from controller. The error message can be temporary as the controller controller creates a cluster or node pool. If the error message persists for a longer period of time, it can be used to surface error message to indicate real problems requiring user intervention.",
    ).optional(),
    version: z.string().describe("Reflect current version of the resource.")
      .optional(),
    versions: z.object({
      versions: z.array(z.object({
        count: z.string().describe(
          "Number of machines under the above version.",
        ).optional(),
        version: z.string().describe("Resource version.").optional(),
      })).describe(
        "Shows the mapping of a given version to the number of machines under this version.",
      ).optional(),
    }).describe(
      "Versions describes the mapping of a given version to the number of machines under this version.",
    ).optional(),
  }).describe(
    "ResourceStatus describes why a cluster or node pool has a certain status. (e.g., ERROR or DEGRADED).",
  ).optional(),
  storage: z.object({
    lvpNodeMountsConfig: z.object({
      path: z.string().describe("Required. The host machine path.").optional(),
      storageClass: z.string().describe(
        "Required. The StorageClass name that PVs will be created with.",
      ).optional(),
    }).describe("Specifies the configs for local persistent volumes (PVs).")
      .optional(),
    lvpShareConfig: z.object({
      lvpConfig: z.object({
        path: z.string().describe("Required. The host machine path.")
          .optional(),
        storageClass: z.string().describe(
          "Required. The StorageClass name that PVs will be created with.",
        ).optional(),
      }).describe("Specifies the configs for local persistent volumes (PVs).")
        .optional(),
      sharedPathPvCount: z.number().int().describe(
        "The number of subdirectories to create under path.",
      ).optional(),
    }).describe(
      "Specifies the configs for local persistent volumes under a shared file system.",
    ).optional(),
  }).describe(
    "BareMetalAdminStorageConfig specifies the cluster storage configuration.",
  ).optional(),
  validationCheck: z.object({
    option: z.enum([
      "OPTIONS_UNSPECIFIED",
      "SKIP_VALIDATION_CHECK_BLOCKING",
      "SKIP_VALIDATION_ALL",
    ]).describe("Options used for the validation check").optional(),
    scenario: z.enum(["SCENARIO_UNSPECIFIED", "CREATE", "UPDATE"]).describe(
      "Output only. The scenario when the preflight checks were run.",
    ).optional(),
    status: z.object({
      result: z.array(z.object({
        category: z.string().describe("The category of the validation.")
          .optional(),
        description: z.string().describe(
          "The description of the validation check.",
        ).optional(),
        details: z.string().describe(
          "Detailed failure information, which might be unformatted.",
        ).optional(),
        reason: z.string().describe(
          "A human-readable message of the check failure.",
        ).optional(),
        state: z.enum([
          "STATE_UNKNOWN",
          "STATE_FAILURE",
          "STATE_SKIPPED",
          "STATE_FATAL",
          "STATE_WARNING",
        ]).describe("The validation check state.").optional(),
      })).describe(
        "Individual checks which failed as part of the Preflight check execution.",
      ).optional(),
    }).describe(
      "ValidationCheckStatus defines the detailed validation check status.",
    ).optional(),
  }).describe("ValidationCheck represents the result of preflight check.")
    .optional(),
  allowPreflightFailure: z.string().describe(
    'Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster.',
  ).optional(),
  bareMetalAdminClusterId: z.string().describe(
    "Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/",
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

/** Swamp extension model for Google Cloud GKE On-Prem BareMetalAdminClusters. Registered at `@swamp/gcp/gkeonprem/baremetaladminclusters`. */
export const model = {
  type: "@swamp/gcp/gkeonprem/baremetaladminclusters",
  version: "2026.06.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Resource that represents a bare metal admin cluster.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a bareMetalAdminClusters",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
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
        if (g["fleet"] !== undefined) body["fleet"] = g["fleet"];
        if (g["loadBalancer"] !== undefined) {
          body["loadBalancer"] = g["loadBalancer"];
        }
        if (g["maintenanceConfig"] !== undefined) {
          body["maintenanceConfig"] = g["maintenanceConfig"];
        }
        if (g["maintenanceStatus"] !== undefined) {
          body["maintenanceStatus"] = g["maintenanceStatus"];
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
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["storage"] !== undefined) body["storage"] = g["storage"];
        if (g["validationCheck"] !== undefined) {
          body["validationCheck"] = g["validationCheck"];
        }
        if (g["allowPreflightFailure"] !== undefined) {
          body["allowPreflightFailure"] = g["allowPreflightFailure"];
        }
        if (g["bareMetalAdminClusterId"] !== undefined) {
          body["bareMetalAdminClusterId"] = g["bareMetalAdminClusterId"];
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
      description: "Get a bareMetalAdminClusters",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the bareMetalAdminClusters",
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
      description: "Update bareMetalAdminClusters attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
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
        if (g["fleet"] !== undefined) body["fleet"] = g["fleet"];
        if (g["loadBalancer"] !== undefined) {
          body["loadBalancer"] = g["loadBalancer"];
        }
        if (g["maintenanceConfig"] !== undefined) {
          body["maintenanceConfig"] = g["maintenanceConfig"];
        }
        if (g["maintenanceStatus"] !== undefined) {
          body["maintenanceStatus"] = g["maintenanceStatus"];
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
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["storage"] !== undefined) body["storage"] = g["storage"];
        if (g["validationCheck"] !== undefined) {
          body["validationCheck"] = g["validationCheck"];
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
    sync: {
      description: "Sync bareMetalAdminClusters state from GCP",
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
      description: "List bareMetalAdminClusters resources",
      arguments: z.object({
        allowMissing: z.boolean().describe(
          "Optional. If true, return list of BareMetal Admin Clusters including the ones that only exists in RMS.",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        view: z.string().describe(
          "View for bare metal admin clusters. When `BASIC` is specified, only the admin cluster resource name and membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete admin cluster configuration details.",
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
        if (args["allowMissing"] !== undefined) {
          params["allowMissing"] = String(args["allowMissing"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "bareMetalAdminClusters",
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
        bareMetalAdminClusterId: z.any().optional(),
        membership: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["bareMetalAdminClusterId"] !== undefined) {
          body["bareMetalAdminClusterId"] = args["bareMetalAdminClusterId"];
        }
        if (args["membership"] !== undefined) {
          body["membership"] = args["membership"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "gkeonprem.projects.locations.bareMetalAdminClusters.enroll",
            "path": "v1/{+parent}/bareMetalAdminClusters:enroll",
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
              "gkeonprem.projects.locations.bareMetalAdminClusters.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
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
    query_version_config: {
      description: "query version config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "gkeonprem.projects.locations.bareMetalAdminClusters.queryVersionConfig",
            "path": "v1/{+parent}/bareMetalAdminClusters:queryVersionConfig",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
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
              "gkeonprem.projects.locations.bareMetalAdminClusters.setIamPolicy",
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
          BASE_URL,
          {
            "id":
              "gkeonprem.projects.locations.bareMetalAdminClusters.testIamPermissions",
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
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
          BASE_URL,
          {
            "id":
              "gkeonprem.projects.locations.bareMetalAdminClusters.unenroll",
            "path": "v1/{+name}:unenroll",
            "httpMethod": "DELETE",
            "parameterOrder": ["name"],
            "parameters": {
              "allowMissing": { "location": "query" },
              "etag": { "location": "query" },
              "ignoreErrors": { "location": "query" },
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
