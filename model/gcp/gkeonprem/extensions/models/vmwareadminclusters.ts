// Auto-generated extension model for @swamp/gcp/gkeonprem/vmwareadminclusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE On-Prem VmwareAdminClusters.
 *
 * Resource that represents a VMware admin cluster.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/vmwareAdminClusters/${shortName}`;
}

const BASE_URL = "https://gkeonprem.googleapis.com/";

const GET_CONFIG = {
  "id": "gkeonprem.projects.locations.vmwareAdminClusters.get",
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
  "id": "gkeonprem.projects.locations.vmwareAdminClusters.create",
  "path": "v1/{+parent}/vmwareAdminClusters",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "allowPreflightFailure": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "skipValidations": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
    "vmwareAdminClusterId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "gkeonprem.projects.locations.vmwareAdminClusters.patch",
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
    "skipValidations": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  addonNode: z.object({
    autoResizeConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable controle plane node auto resizing.",
      ).optional(),
    }).describe(
      "Represents auto resizing configurations for the VMware user cluster.",
    ).optional(),
  }).describe(
    "VmwareAdminAddonNodeConfig contains add-on node configurations for VMware admin cluster.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the VMware admin cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  antiAffinityGroups: z.object({
    aagConfigDisabled: z.boolean().describe(
      "Spread nodes across at least three physical hosts (requires at least three hosts). Enabled by default.",
    ).optional(),
  }).describe(
    "Specifies anti affinity group config for the VMware user cluster.",
  ).optional(),
  authorization: z.object({
    viewerUsers: z.array(z.object({
      username: z.string().describe(
        "Required. The name of the user, e.g. `my-gcp-id@gmail.com`.",
      ).optional(),
    })).describe(
      "For VMware admin clusters, users will be granted the cluster-viewer role on the cluster.",
    ).optional(),
  }).describe(
    "VmwareAdminAuthorizationConfig represents configuration for admin cluster authorization.",
  ).optional(),
  autoRepairConfig: z.object({
    enabled: z.boolean().describe("Whether auto repair is enabled.").optional(),
  }).describe(
    "Specifies config to enable/disable auto repair. The cluster-health-controller is deployed only if Enabled is true.",
  ).optional(),
  bootstrapClusterMembership: z.string().describe(
    "The bootstrap cluster this VMware admin cluster belongs to.",
  ).optional(),
  controlPlaneNode: z.object({
    cpus: z.string().describe(
      "The number of vCPUs for the control-plane node of the admin cluster.",
    ).optional(),
    memory: z.string().describe(
      "The number of mebibytes of memory for the control-plane node of the admin cluster.",
    ).optional(),
    replicas: z.string().describe(
      "The number of control plane nodes for this VMware admin cluster. (default: 1 replica).",
    ).optional(),
  }).describe(
    "VmwareAdminControlPlaneNodeConfig contains control plane node configuration for VMware admin cluster.",
  ).optional(),
  description: z.string().describe(
    "A human readable description of this VMware admin cluster.",
  ).optional(),
  enableAdvancedCluster: z.boolean().describe("Enable advanced cluster.")
    .optional(),
  fleet: z.object({
    membership: z.string().describe(
      "Output only. The name of the managed fleet Membership resource associated to this cluster. Membership names are formatted as `projects//locations//memberships/`.",
    ).optional(),
  }).describe(
    "Fleet related configuration. Fleets are a Google Cloud concept for logically organizing clusters, letting you use and manage multi-cluster capabilities and apply consistent policies across your systems. See [Anthos Fleets](`https://cloud.google.com/anthos/multicluster-management/fleets`) for more details on Anthos multi-cluster capabilities using Fleets. ##",
  ).optional(),
  imageType: z.string().describe(
    "The OS image type for the VMware admin cluster.",
  ).optional(),
  loadBalancer: z.object({
    f5Config: z.object({
      address: z.string().describe("The load balancer's IP address.")
        .optional(),
      partition: z.string().describe(
        "The preexisting partition to be used by the load balancer. This partition is usually created for the admin cluster for example: 'my-f5-admin-partition'.",
      ).optional(),
      snatPool: z.string().describe(
        "The pool name. Only necessary, if using SNAT.",
      ).optional(),
    }).describe(
      "VmwareAdminF5BigIpConfig represents configuration parameters for an F5 BIG-IP load balancer.",
    ).optional(),
    manualLbConfig: z.object({
      addonsNodePort: z.number().int().describe(
        "NodePort for add-ons server in the admin cluster.",
      ).optional(),
      controlPlaneNodePort: z.number().int().describe(
        "NodePort for control plane service. The Kubernetes API server in the admin cluster is implemented as a Service of type NodePort (ex. 30968).",
      ).optional(),
      ingressHttpNodePort: z.number().int().describe(
        "NodePort for ingress service's http. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 32527).",
      ).optional(),
      ingressHttpsNodePort: z.number().int().describe(
        "NodePort for ingress service's https. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 30139).",
      ).optional(),
      konnectivityServerNodePort: z.number().int().describe(
        "NodePort for konnectivity server service running as a sidecar in each kube-apiserver pod (ex. 30564).",
      ).optional(),
    }).optional(),
    metalLbConfig: z.object({
      enabled: z.boolean().describe("Whether MetalLB is enabled.").optional(),
    }).describe(
      "VmwareAdminMetalLbConfig represents configuration parameters for a MetalLB load balancer. For admin clusters, currently no configurations is needed.",
    ).optional(),
    seesawConfig: z.object({
      enableHa: z.boolean().describe(
        "Enable two load balancer VMs to achieve a highly-available Seesaw load balancer.",
      ).optional(),
      group: z.string().describe(
        "In general the following format should be used for the Seesaw group name: seesaw-for-[cluster_name].",
      ).optional(),
      ipBlocks: z.array(z.object({
        gateway: z.string().describe(
          "The network gateway used by the VMware user cluster.",
        ).optional(),
        ips: z.array(z.unknown()).describe(
          "The node's network configurations used by the VMware user cluster.",
        ).optional(),
        netmask: z.string().describe(
          "The netmask used by the VMware user cluster.",
        ).optional(),
      })).describe("The IP Blocks to be used by the Seesaw load balancer")
        .optional(),
      masterIp: z.string().describe(
        "MasterIP is the IP announced by the master of Seesaw group.",
      ).optional(),
      stackdriverName: z.string().describe("Name to be used by Stackdriver.")
        .optional(),
      vms: z.array(z.string()).describe(
        "Names of the VMs created for this Seesaw group.",
      ).optional(),
    }).describe(
      "VmwareSeesawConfig represents configuration parameters for an already existing Seesaw load balancer. IMPORTANT: Please note that the Anthos On-Prem API will not generate or update Seesaw configurations it can only bind a pre-existing configuration to a new user cluster. IMPORTANT: When attempting to create a user cluster with a pre-existing Seesaw load balancer you will need to follow some preparation steps before calling the 'CreateVmwareCluster' API method. First you will need to create the user cluster's namespace via kubectl. The namespace will need to use the following naming convention: -gke-onprem-mgmt or -gke-onprem-mgmt depending on whether you used the 'VmwareCluster.local_name' to disambiguate collisions; for more context see the documentation of 'VmwareCluster.local_name'. Once the namespace is created you will need to create a secret resource via kubectl. This secret will contain copies of your Seesaw credentials. The Secret must be called 'user-cluster-creds' and contain Seesaw's SSH and Cert credentials. The credentials must be keyed with the following names: 'seesaw-ssh-private-key', 'seesaw-ssh-public-key', 'seesaw-ssh-ca-key', 'seesaw-ssh-ca-cert'.",
    ).optional(),
    vipConfig: z.object({
      addonsVip: z.string().describe(
        "The VIP to configure the load balancer for add-ons.",
      ).optional(),
      controlPlaneVip: z.string().describe(
        "The VIP which you previously set aside for the Kubernetes API of the admin cluster.",
      ).optional(),
    }).describe("VmwareAdminVipConfig for VMware load balancer configurations.")
      .optional(),
  }).describe(
    "VmwareAdminLoadBalancerConfig contains load balancer configuration for VMware admin cluster.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The VMware admin cluster resource name.",
  ).optional(),
  networkConfig: z.object({
    dhcpIpConfig: z.object({
      enabled: z.boolean().describe(
        "enabled is a flag to mark if DHCP IP allocation is used for VMware user clusters.",
      ).optional(),
    }).describe(
      "Represents the network configuration required for the VMware user clusters with DHCP IP configurations.",
    ).optional(),
    haControlPlaneConfig: z.object({
      controlPlaneIpBlock: z.object({
        gateway: z.string().describe(
          "The network gateway used by the VMware user cluster.",
        ).optional(),
        ips: z.array(z.object({
          hostname: z.unknown().describe(
            "Hostname of the machine. VM's name will be used if this field is empty.",
          ).optional(),
          ip: z.unknown().describe(
            "IP could be an IP address (like 1.2.3.4) or a CIDR (like 1.2.3.0/24).",
          ).optional(),
        })).describe(
          "The node's network configurations used by the VMware user cluster.",
        ).optional(),
        netmask: z.string().describe(
          "The netmask used by the VMware user cluster.",
        ).optional(),
      }).describe("Represents a collection of IP addresses to assign to nodes.")
        .optional(),
    }).describe("Specifies HA admin control plane config.").optional(),
    hostConfig: z.object({
      dnsSearchDomains: z.array(z.string()).describe("DNS search domains.")
        .optional(),
      dnsServers: z.array(z.string()).describe("DNS servers.").optional(),
      ntpServers: z.array(z.string()).describe("NTP servers.").optional(),
    }).describe(
      "Represents the common parameters for all the hosts irrespective of their IP address.",
    ).optional(),
    podAddressCidrBlocks: z.array(z.string()).describe(
      "Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation.",
    ).optional(),
    serviceAddressCidrBlocks: z.array(z.string()).describe(
      "Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation.",
    ).optional(),
    staticIpConfig: z.object({
      ipBlocks: z.array(z.object({
        gateway: z.string().describe(
          "The network gateway used by the VMware user cluster.",
        ).optional(),
        ips: z.array(z.unknown()).describe(
          "The node's network configurations used by the VMware user cluster.",
        ).optional(),
        netmask: z.string().describe(
          "The netmask used by the VMware user cluster.",
        ).optional(),
      })).describe(
        "Represents the configuration values for static IP allocation to nodes.",
      ).optional(),
    }).describe(
      "Represents the network configuration required for the VMware user clusters with Static IP configurations.",
    ).optional(),
    vcenterNetwork: z.string().describe(
      "vcenter_network specifies vCenter network name.",
    ).optional(),
  }).describe(
    "VmwareAdminNetworkConfig contains network configuration for VMware admin cluster.",
  ).optional(),
  onPremVersion: z.string().describe(
    "The Anthos clusters on the VMware version for the admin cluster.",
  ).optional(),
  platformConfig: z.object({
    bundles: z.array(z.object({
      status: z.object({
        conditions: z.array(z.unknown()).describe(
          "ResourceCondition provide a standard mechanism for higher-level status reporting from controller.",
        ).optional(),
        errorMessage: z.string().describe(
          "Human-friendly representation of the error message from controller. The error message can be temporary as the controller controller creates a cluster or node pool. If the error message persists for a longer period of time, it can be used to surface error message to indicate real problems requiring user intervention.",
        ).optional(),
        version: z.string().describe("Reflect current version of the resource.")
          .optional(),
        versions: z.object({
          versions: z.unknown().describe(
            "Shows the mapping of a given version to the number of machines under this version.",
          ).optional(),
        }).describe(
          "Versions describes the mapping of a given version to the number of machines under this version.",
        ).optional(),
      }).describe(
        "ResourceStatus describes why a cluster or node pool has a certain status. (e.g., ERROR or DEGRADED).",
      ).optional(),
      version: z.string().describe("The version of the bundle.").optional(),
    })).describe(
      "Output only. The list of bundles installed in the admin cluster.",
    ).optional(),
    platformVersion: z.string().describe(
      "Output only. The platform version e.g. 1.13.2.",
    ).optional(),
    requiredPlatformVersion: z.string().describe(
      "Input only. The required platform version e.g. 1.13.1. If the current platform version is lower than the target version, the platform version will be updated to the target version. If the target version is not installed in the platform (bundle versions), download the target version bundle.",
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
          count: z.unknown().describe(
            "Number of machines under the above version.",
          ).optional(),
          version: z.unknown().describe("Resource version.").optional(),
        })).describe(
          "Shows the mapping of a given version to the number of machines under this version.",
        ).optional(),
      }).describe(
        "Versions describes the mapping of a given version to the number of machines under this version.",
      ).optional(),
    }).describe(
      "ResourceStatus describes why a cluster or node pool has a certain status. (e.g., ERROR or DEGRADED).",
    ).optional(),
  }).describe(
    "VmwarePlatformConfig represents configuration for the VMware platform.",
  ).optional(),
  preparedSecrets: z.object({
    enabled: z.boolean().describe("Whether prepared secrets is enabled.")
      .optional(),
  }).describe(
    "VmwareAdminPreparedSecretsConfig represents configuration for admin cluster prepared secrets.",
  ).optional(),
  privateRegistryConfig: z.object({
    address: z.string().describe("The registry address.").optional(),
    caCert: z.string().describe(
      "When the container runtime pulls an image from private registry, the registry must prove its identity by presenting a certificate. The registry's certificate is signed by a certificate authority (CA). The container runtime uses the CA's certificate to validate the registry's certificate.",
    ).optional(),
  }).describe(
    "VmwareAdminPrivateRegistryConfig represents configuration for admin cluster registry.",
  ).optional(),
  proxy: z.object({
    noProxy: z.string().describe(
      "A comma-separated list of IP addresses, IP address ranges, host names, and domain names that should not go through the proxy server. When Google Distributed Cloud sends a request to one of these addresses, hosts, or domains, the request is sent directly.",
    ).optional(),
    url: z.string().describe("The HTTP address of proxy server.").optional(),
  }).describe(
    "VmwareAdminProxy represents configuration for admin cluster proxy.",
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
  vcenter: z.object({
    address: z.string().describe("The vCenter IP address.").optional(),
    caCertData: z.string().describe(
      "Contains the vCenter CA certificate public key for SSL verification.",
    ).optional(),
    cluster: z.string().describe(
      "The name of the vCenter cluster for the admin cluster.",
    ).optional(),
    dataDisk: z.string().describe(
      "The name of the virtual machine disk (VMDK) for the admin cluster.",
    ).optional(),
    datacenter: z.string().describe(
      "The name of the vCenter datacenter for the admin cluster.",
    ).optional(),
    datastore: z.string().describe(
      "The name of the vCenter datastore for the admin cluster.",
    ).optional(),
    folder: z.string().describe(
      "The name of the vCenter folder for the admin cluster.",
    ).optional(),
    resourcePool: z.string().describe(
      "The name of the vCenter resource pool for the admin cluster.",
    ).optional(),
    storagePolicyName: z.string().describe(
      "The name of the vCenter storage policy for the user cluster.",
    ).optional(),
  }).describe(
    "VmwareAdminVCenterConfig contains VCenter configuration for VMware admin cluster.",
  ).optional(),
  allowPreflightFailure: z.string().describe(
    'Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster.',
  ).optional(),
  skipValidations: z.string().describe(
    "Optional. If set, skip the specified validations.",
  ).optional(),
  vmwareAdminClusterId: z.string().describe(
    "Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  addonNode: z.object({
    autoResizeConfig: z.object({
      enabled: z.boolean(),
    }),
  }).optional(),
  annotations: z.record(z.string(), z.unknown()).optional(),
  antiAffinityGroups: z.object({
    aagConfigDisabled: z.boolean(),
  }).optional(),
  authorization: z.object({
    viewerUsers: z.array(z.object({
      username: z.string(),
    })),
  }).optional(),
  autoRepairConfig: z.object({
    enabled: z.boolean(),
  }).optional(),
  bootstrapClusterMembership: z.string().optional(),
  controlPlaneNode: z.object({
    cpus: z.string(),
    memory: z.string(),
    replicas: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  enableAdvancedCluster: z.boolean().optional(),
  endpoint: z.string().optional(),
  etag: z.string().optional(),
  fleet: z.object({
    membership: z.string(),
  }).optional(),
  imageType: z.string().optional(),
  loadBalancer: z.object({
    f5Config: z.object({
      address: z.string(),
      partition: z.string(),
      snatPool: z.string(),
    }),
    manualLbConfig: z.object({
      addonsNodePort: z.number(),
      controlPlaneNodePort: z.number(),
      ingressHttpNodePort: z.number(),
      ingressHttpsNodePort: z.number(),
      konnectivityServerNodePort: z.number(),
    }),
    metalLbConfig: z.object({
      enabled: z.boolean(),
    }),
    seesawConfig: z.object({
      enableHa: z.boolean(),
      group: z.string(),
      ipBlocks: z.array(z.object({
        gateway: z.string(),
        ips: z.array(z.unknown()),
        netmask: z.string(),
      })),
      masterIp: z.string(),
      stackdriverName: z.string(),
      vms: z.array(z.string()),
    }),
    vipConfig: z.object({
      addonsVip: z.string(),
      controlPlaneVip: z.string(),
    }),
  }).optional(),
  localName: z.string().optional(),
  name: z.string(),
  networkConfig: z.object({
    dhcpIpConfig: z.object({
      enabled: z.boolean(),
    }),
    haControlPlaneConfig: z.object({
      controlPlaneIpBlock: z.object({
        gateway: z.string(),
        ips: z.array(z.object({
          hostname: z.unknown(),
          ip: z.unknown(),
        })),
        netmask: z.string(),
      }),
    }),
    hostConfig: z.object({
      dnsSearchDomains: z.array(z.string()),
      dnsServers: z.array(z.string()),
      ntpServers: z.array(z.string()),
    }),
    podAddressCidrBlocks: z.array(z.string()),
    serviceAddressCidrBlocks: z.array(z.string()),
    staticIpConfig: z.object({
      ipBlocks: z.array(z.object({
        gateway: z.string(),
        ips: z.array(z.unknown()),
        netmask: z.string(),
      })),
    }),
    vcenterNetwork: z.string(),
  }).optional(),
  onPremVersion: z.string().optional(),
  platformConfig: z.object({
    bundles: z.array(z.object({
      status: z.object({
        conditions: z.array(z.unknown()),
        errorMessage: z.string(),
        version: z.string(),
        versions: z.object({
          versions: z.unknown(),
        }),
      }),
      version: z.string(),
    })),
    platformVersion: z.string(),
    requiredPlatformVersion: z.string(),
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
          count: z.unknown(),
          version: z.unknown(),
        })),
      }),
    }),
  }).optional(),
  preparedSecrets: z.object({
    enabled: z.boolean(),
  }).optional(),
  privateRegistryConfig: z.object({
    address: z.string(),
    caCert: z.string(),
  }).optional(),
  proxy: z.object({
    noProxy: z.string(),
    url: z.string(),
  }).optional(),
  reconciling: z.boolean().optional(),
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
  vcenter: z.object({
    address: z.string(),
    caCertData: z.string(),
    cluster: z.string(),
    dataDisk: z.string(),
    datacenter: z.string(),
    datastore: z.string(),
    folder: z.string(),
    resourcePool: z.string(),
    storagePolicyName: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  addonNode: z.object({
    autoResizeConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable controle plane node auto resizing.",
      ).optional(),
    }).describe(
      "Represents auto resizing configurations for the VMware user cluster.",
    ).optional(),
  }).describe(
    "VmwareAdminAddonNodeConfig contains add-on node configurations for VMware admin cluster.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the VMware admin cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  antiAffinityGroups: z.object({
    aagConfigDisabled: z.boolean().describe(
      "Spread nodes across at least three physical hosts (requires at least three hosts). Enabled by default.",
    ).optional(),
  }).describe(
    "Specifies anti affinity group config for the VMware user cluster.",
  ).optional(),
  authorization: z.object({
    viewerUsers: z.array(z.object({
      username: z.string().describe(
        "Required. The name of the user, e.g. `my-gcp-id@gmail.com`.",
      ).optional(),
    })).describe(
      "For VMware admin clusters, users will be granted the cluster-viewer role on the cluster.",
    ).optional(),
  }).describe(
    "VmwareAdminAuthorizationConfig represents configuration for admin cluster authorization.",
  ).optional(),
  autoRepairConfig: z.object({
    enabled: z.boolean().describe("Whether auto repair is enabled.").optional(),
  }).describe(
    "Specifies config to enable/disable auto repair. The cluster-health-controller is deployed only if Enabled is true.",
  ).optional(),
  bootstrapClusterMembership: z.string().describe(
    "The bootstrap cluster this VMware admin cluster belongs to.",
  ).optional(),
  controlPlaneNode: z.object({
    cpus: z.string().describe(
      "The number of vCPUs for the control-plane node of the admin cluster.",
    ).optional(),
    memory: z.string().describe(
      "The number of mebibytes of memory for the control-plane node of the admin cluster.",
    ).optional(),
    replicas: z.string().describe(
      "The number of control plane nodes for this VMware admin cluster. (default: 1 replica).",
    ).optional(),
  }).describe(
    "VmwareAdminControlPlaneNodeConfig contains control plane node configuration for VMware admin cluster.",
  ).optional(),
  description: z.string().describe(
    "A human readable description of this VMware admin cluster.",
  ).optional(),
  enableAdvancedCluster: z.boolean().describe("Enable advanced cluster.")
    .optional(),
  fleet: z.object({
    membership: z.string().describe(
      "Output only. The name of the managed fleet Membership resource associated to this cluster. Membership names are formatted as `projects//locations//memberships/`.",
    ).optional(),
  }).describe(
    "Fleet related configuration. Fleets are a Google Cloud concept for logically organizing clusters, letting you use and manage multi-cluster capabilities and apply consistent policies across your systems. See [Anthos Fleets](`https://cloud.google.com/anthos/multicluster-management/fleets`) for more details on Anthos multi-cluster capabilities using Fleets. ##",
  ).optional(),
  imageType: z.string().describe(
    "The OS image type for the VMware admin cluster.",
  ).optional(),
  loadBalancer: z.object({
    f5Config: z.object({
      address: z.string().describe("The load balancer's IP address.")
        .optional(),
      partition: z.string().describe(
        "The preexisting partition to be used by the load balancer. This partition is usually created for the admin cluster for example: 'my-f5-admin-partition'.",
      ).optional(),
      snatPool: z.string().describe(
        "The pool name. Only necessary, if using SNAT.",
      ).optional(),
    }).describe(
      "VmwareAdminF5BigIpConfig represents configuration parameters for an F5 BIG-IP load balancer.",
    ).optional(),
    manualLbConfig: z.object({
      addonsNodePort: z.number().int().describe(
        "NodePort for add-ons server in the admin cluster.",
      ).optional(),
      controlPlaneNodePort: z.number().int().describe(
        "NodePort for control plane service. The Kubernetes API server in the admin cluster is implemented as a Service of type NodePort (ex. 30968).",
      ).optional(),
      ingressHttpNodePort: z.number().int().describe(
        "NodePort for ingress service's http. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 32527).",
      ).optional(),
      ingressHttpsNodePort: z.number().int().describe(
        "NodePort for ingress service's https. The ingress service in the admin cluster is implemented as a Service of type NodePort (ex. 30139).",
      ).optional(),
      konnectivityServerNodePort: z.number().int().describe(
        "NodePort for konnectivity server service running as a sidecar in each kube-apiserver pod (ex. 30564).",
      ).optional(),
    }).optional(),
    metalLbConfig: z.object({
      enabled: z.boolean().describe("Whether MetalLB is enabled.").optional(),
    }).describe(
      "VmwareAdminMetalLbConfig represents configuration parameters for a MetalLB load balancer. For admin clusters, currently no configurations is needed.",
    ).optional(),
    seesawConfig: z.object({
      enableHa: z.boolean().describe(
        "Enable two load balancer VMs to achieve a highly-available Seesaw load balancer.",
      ).optional(),
      group: z.string().describe(
        "In general the following format should be used for the Seesaw group name: seesaw-for-[cluster_name].",
      ).optional(),
      ipBlocks: z.array(z.object({
        gateway: z.string().describe(
          "The network gateway used by the VMware user cluster.",
        ).optional(),
        ips: z.array(z.unknown()).describe(
          "The node's network configurations used by the VMware user cluster.",
        ).optional(),
        netmask: z.string().describe(
          "The netmask used by the VMware user cluster.",
        ).optional(),
      })).describe("The IP Blocks to be used by the Seesaw load balancer")
        .optional(),
      masterIp: z.string().describe(
        "MasterIP is the IP announced by the master of Seesaw group.",
      ).optional(),
      stackdriverName: z.string().describe("Name to be used by Stackdriver.")
        .optional(),
      vms: z.array(z.string()).describe(
        "Names of the VMs created for this Seesaw group.",
      ).optional(),
    }).describe(
      "VmwareSeesawConfig represents configuration parameters for an already existing Seesaw load balancer. IMPORTANT: Please note that the Anthos On-Prem API will not generate or update Seesaw configurations it can only bind a pre-existing configuration to a new user cluster. IMPORTANT: When attempting to create a user cluster with a pre-existing Seesaw load balancer you will need to follow some preparation steps before calling the 'CreateVmwareCluster' API method. First you will need to create the user cluster's namespace via kubectl. The namespace will need to use the following naming convention: -gke-onprem-mgmt or -gke-onprem-mgmt depending on whether you used the 'VmwareCluster.local_name' to disambiguate collisions; for more context see the documentation of 'VmwareCluster.local_name'. Once the namespace is created you will need to create a secret resource via kubectl. This secret will contain copies of your Seesaw credentials. The Secret must be called 'user-cluster-creds' and contain Seesaw's SSH and Cert credentials. The credentials must be keyed with the following names: 'seesaw-ssh-private-key', 'seesaw-ssh-public-key', 'seesaw-ssh-ca-key', 'seesaw-ssh-ca-cert'.",
    ).optional(),
    vipConfig: z.object({
      addonsVip: z.string().describe(
        "The VIP to configure the load balancer for add-ons.",
      ).optional(),
      controlPlaneVip: z.string().describe(
        "The VIP which you previously set aside for the Kubernetes API of the admin cluster.",
      ).optional(),
    }).describe("VmwareAdminVipConfig for VMware load balancer configurations.")
      .optional(),
  }).describe(
    "VmwareAdminLoadBalancerConfig contains load balancer configuration for VMware admin cluster.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The VMware admin cluster resource name.",
  ).optional(),
  networkConfig: z.object({
    dhcpIpConfig: z.object({
      enabled: z.boolean().describe(
        "enabled is a flag to mark if DHCP IP allocation is used for VMware user clusters.",
      ).optional(),
    }).describe(
      "Represents the network configuration required for the VMware user clusters with DHCP IP configurations.",
    ).optional(),
    haControlPlaneConfig: z.object({
      controlPlaneIpBlock: z.object({
        gateway: z.string().describe(
          "The network gateway used by the VMware user cluster.",
        ).optional(),
        ips: z.array(z.object({
          hostname: z.unknown().describe(
            "Hostname of the machine. VM's name will be used if this field is empty.",
          ).optional(),
          ip: z.unknown().describe(
            "IP could be an IP address (like 1.2.3.4) or a CIDR (like 1.2.3.0/24).",
          ).optional(),
        })).describe(
          "The node's network configurations used by the VMware user cluster.",
        ).optional(),
        netmask: z.string().describe(
          "The netmask used by the VMware user cluster.",
        ).optional(),
      }).describe("Represents a collection of IP addresses to assign to nodes.")
        .optional(),
    }).describe("Specifies HA admin control plane config.").optional(),
    hostConfig: z.object({
      dnsSearchDomains: z.array(z.string()).describe("DNS search domains.")
        .optional(),
      dnsServers: z.array(z.string()).describe("DNS servers.").optional(),
      ntpServers: z.array(z.string()).describe("NTP servers.").optional(),
    }).describe(
      "Represents the common parameters for all the hosts irrespective of their IP address.",
    ).optional(),
    podAddressCidrBlocks: z.array(z.string()).describe(
      "Required. All pods in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation.",
    ).optional(),
    serviceAddressCidrBlocks: z.array(z.string()).describe(
      "Required. All services in the cluster are assigned an RFC1918 IPv4 address from these ranges. Only a single range is supported. This field cannot be changed after creation.",
    ).optional(),
    staticIpConfig: z.object({
      ipBlocks: z.array(z.object({
        gateway: z.string().describe(
          "The network gateway used by the VMware user cluster.",
        ).optional(),
        ips: z.array(z.unknown()).describe(
          "The node's network configurations used by the VMware user cluster.",
        ).optional(),
        netmask: z.string().describe(
          "The netmask used by the VMware user cluster.",
        ).optional(),
      })).describe(
        "Represents the configuration values for static IP allocation to nodes.",
      ).optional(),
    }).describe(
      "Represents the network configuration required for the VMware user clusters with Static IP configurations.",
    ).optional(),
    vcenterNetwork: z.string().describe(
      "vcenter_network specifies vCenter network name.",
    ).optional(),
  }).describe(
    "VmwareAdminNetworkConfig contains network configuration for VMware admin cluster.",
  ).optional(),
  onPremVersion: z.string().describe(
    "The Anthos clusters on the VMware version for the admin cluster.",
  ).optional(),
  platformConfig: z.object({
    bundles: z.array(z.object({
      status: z.object({
        conditions: z.array(z.unknown()).describe(
          "ResourceCondition provide a standard mechanism for higher-level status reporting from controller.",
        ).optional(),
        errorMessage: z.string().describe(
          "Human-friendly representation of the error message from controller. The error message can be temporary as the controller controller creates a cluster or node pool. If the error message persists for a longer period of time, it can be used to surface error message to indicate real problems requiring user intervention.",
        ).optional(),
        version: z.string().describe("Reflect current version of the resource.")
          .optional(),
        versions: z.object({
          versions: z.unknown().describe(
            "Shows the mapping of a given version to the number of machines under this version.",
          ).optional(),
        }).describe(
          "Versions describes the mapping of a given version to the number of machines under this version.",
        ).optional(),
      }).describe(
        "ResourceStatus describes why a cluster or node pool has a certain status. (e.g., ERROR or DEGRADED).",
      ).optional(),
      version: z.string().describe("The version of the bundle.").optional(),
    })).describe(
      "Output only. The list of bundles installed in the admin cluster.",
    ).optional(),
    platformVersion: z.string().describe(
      "Output only. The platform version e.g. 1.13.2.",
    ).optional(),
    requiredPlatformVersion: z.string().describe(
      "Input only. The required platform version e.g. 1.13.1. If the current platform version is lower than the target version, the platform version will be updated to the target version. If the target version is not installed in the platform (bundle versions), download the target version bundle.",
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
          count: z.unknown().describe(
            "Number of machines under the above version.",
          ).optional(),
          version: z.unknown().describe("Resource version.").optional(),
        })).describe(
          "Shows the mapping of a given version to the number of machines under this version.",
        ).optional(),
      }).describe(
        "Versions describes the mapping of a given version to the number of machines under this version.",
      ).optional(),
    }).describe(
      "ResourceStatus describes why a cluster or node pool has a certain status. (e.g., ERROR or DEGRADED).",
    ).optional(),
  }).describe(
    "VmwarePlatformConfig represents configuration for the VMware platform.",
  ).optional(),
  preparedSecrets: z.object({
    enabled: z.boolean().describe("Whether prepared secrets is enabled.")
      .optional(),
  }).describe(
    "VmwareAdminPreparedSecretsConfig represents configuration for admin cluster prepared secrets.",
  ).optional(),
  privateRegistryConfig: z.object({
    address: z.string().describe("The registry address.").optional(),
    caCert: z.string().describe(
      "When the container runtime pulls an image from private registry, the registry must prove its identity by presenting a certificate. The registry's certificate is signed by a certificate authority (CA). The container runtime uses the CA's certificate to validate the registry's certificate.",
    ).optional(),
  }).describe(
    "VmwareAdminPrivateRegistryConfig represents configuration for admin cluster registry.",
  ).optional(),
  proxy: z.object({
    noProxy: z.string().describe(
      "A comma-separated list of IP addresses, IP address ranges, host names, and domain names that should not go through the proxy server. When Google Distributed Cloud sends a request to one of these addresses, hosts, or domains, the request is sent directly.",
    ).optional(),
    url: z.string().describe("The HTTP address of proxy server.").optional(),
  }).describe(
    "VmwareAdminProxy represents configuration for admin cluster proxy.",
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
  vcenter: z.object({
    address: z.string().describe("The vCenter IP address.").optional(),
    caCertData: z.string().describe(
      "Contains the vCenter CA certificate public key for SSL verification.",
    ).optional(),
    cluster: z.string().describe(
      "The name of the vCenter cluster for the admin cluster.",
    ).optional(),
    dataDisk: z.string().describe(
      "The name of the virtual machine disk (VMDK) for the admin cluster.",
    ).optional(),
    datacenter: z.string().describe(
      "The name of the vCenter datacenter for the admin cluster.",
    ).optional(),
    datastore: z.string().describe(
      "The name of the vCenter datastore for the admin cluster.",
    ).optional(),
    folder: z.string().describe(
      "The name of the vCenter folder for the admin cluster.",
    ).optional(),
    resourcePool: z.string().describe(
      "The name of the vCenter resource pool for the admin cluster.",
    ).optional(),
    storagePolicyName: z.string().describe(
      "The name of the vCenter storage policy for the user cluster.",
    ).optional(),
  }).describe(
    "VmwareAdminVCenterConfig contains VCenter configuration for VMware admin cluster.",
  ).optional(),
  allowPreflightFailure: z.string().describe(
    'Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster.',
  ).optional(),
  skipValidations: z.string().describe(
    "Optional. If set, skip the specified validations.",
  ).optional(),
  vmwareAdminClusterId: z.string().describe(
    "Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+[a-z0-9]$/",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud GKE On-Prem VmwareAdminClusters. Registered at `@swamp/gcp/gkeonprem/vmwareadminclusters`. */
export const model = {
  type: "@swamp/gcp/gkeonprem/vmwareadminclusters",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Resource that represents a VMware admin cluster.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a vmwareAdminClusters",
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
        if (g["addonNode"] !== undefined) body["addonNode"] = g["addonNode"];
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["antiAffinityGroups"] !== undefined) {
          body["antiAffinityGroups"] = g["antiAffinityGroups"];
        }
        if (g["authorization"] !== undefined) {
          body["authorization"] = g["authorization"];
        }
        if (g["autoRepairConfig"] !== undefined) {
          body["autoRepairConfig"] = g["autoRepairConfig"];
        }
        if (g["bootstrapClusterMembership"] !== undefined) {
          body["bootstrapClusterMembership"] = g["bootstrapClusterMembership"];
        }
        if (g["controlPlaneNode"] !== undefined) {
          body["controlPlaneNode"] = g["controlPlaneNode"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableAdvancedCluster"] !== undefined) {
          body["enableAdvancedCluster"] = g["enableAdvancedCluster"];
        }
        if (g["fleet"] !== undefined) body["fleet"] = g["fleet"];
        if (g["imageType"] !== undefined) body["imageType"] = g["imageType"];
        if (g["loadBalancer"] !== undefined) {
          body["loadBalancer"] = g["loadBalancer"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["onPremVersion"] !== undefined) {
          body["onPremVersion"] = g["onPremVersion"];
        }
        if (g["platformConfig"] !== undefined) {
          body["platformConfig"] = g["platformConfig"];
        }
        if (g["preparedSecrets"] !== undefined) {
          body["preparedSecrets"] = g["preparedSecrets"];
        }
        if (g["privateRegistryConfig"] !== undefined) {
          body["privateRegistryConfig"] = g["privateRegistryConfig"];
        }
        if (g["proxy"] !== undefined) body["proxy"] = g["proxy"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["validationCheck"] !== undefined) {
          body["validationCheck"] = g["validationCheck"];
        }
        if (g["vcenter"] !== undefined) body["vcenter"] = g["vcenter"];
        if (g["allowPreflightFailure"] !== undefined) {
          body["allowPreflightFailure"] = g["allowPreflightFailure"];
        }
        if (g["skipValidations"] !== undefined) {
          body["skipValidations"] = g["skipValidations"];
        }
        if (g["vmwareAdminClusterId"] !== undefined) {
          body["vmwareAdminClusterId"] = g["vmwareAdminClusterId"];
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
      description: "Get a vmwareAdminClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the vmwareAdminClusters"),
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
      description: "Update vmwareAdminClusters attributes",
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
        if (g["addonNode"] !== undefined) body["addonNode"] = g["addonNode"];
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["antiAffinityGroups"] !== undefined) {
          body["antiAffinityGroups"] = g["antiAffinityGroups"];
        }
        if (g["authorization"] !== undefined) {
          body["authorization"] = g["authorization"];
        }
        if (g["autoRepairConfig"] !== undefined) {
          body["autoRepairConfig"] = g["autoRepairConfig"];
        }
        if (g["bootstrapClusterMembership"] !== undefined) {
          body["bootstrapClusterMembership"] = g["bootstrapClusterMembership"];
        }
        if (g["controlPlaneNode"] !== undefined) {
          body["controlPlaneNode"] = g["controlPlaneNode"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableAdvancedCluster"] !== undefined) {
          body["enableAdvancedCluster"] = g["enableAdvancedCluster"];
        }
        if (g["fleet"] !== undefined) body["fleet"] = g["fleet"];
        if (g["imageType"] !== undefined) body["imageType"] = g["imageType"];
        if (g["loadBalancer"] !== undefined) {
          body["loadBalancer"] = g["loadBalancer"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["onPremVersion"] !== undefined) {
          body["onPremVersion"] = g["onPremVersion"];
        }
        if (g["platformConfig"] !== undefined) {
          body["platformConfig"] = g["platformConfig"];
        }
        if (g["preparedSecrets"] !== undefined) {
          body["preparedSecrets"] = g["preparedSecrets"];
        }
        if (g["privateRegistryConfig"] !== undefined) {
          body["privateRegistryConfig"] = g["privateRegistryConfig"];
        }
        if (g["proxy"] !== undefined) body["proxy"] = g["proxy"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["validationCheck"] !== undefined) {
          body["validationCheck"] = g["validationCheck"];
        }
        if (g["vcenter"] !== undefined) body["vcenter"] = g["vcenter"];
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
      description: "Sync vmwareAdminClusters state from GCP",
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
    enroll: {
      description: "enroll",
      arguments: z.object({
        membership: z.any().optional(),
        vmwareAdminClusterId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["membership"] !== undefined) {
          body["membership"] = args["membership"];
        }
        if (args["vmwareAdminClusterId"] !== undefined) {
          body["vmwareAdminClusterId"] = args["vmwareAdminClusterId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "gkeonprem.projects.locations.vmwareAdminClusters.enroll",
            "path": "v1/{+parent}/vmwareAdminClusters:enroll",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    unenroll: {
      description: "unenroll",
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
            "id": "gkeonprem.projects.locations.vmwareAdminClusters.unenroll",
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
        );
        return { result };
      },
    },
  },
};
