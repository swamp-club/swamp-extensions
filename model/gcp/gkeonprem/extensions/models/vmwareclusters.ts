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

// Auto-generated extension model for @swamp/gcp/gkeonprem/vmwareclusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE On-Prem VmwareClusters.
 *
 * Resource that represents a VMware user cluster. ##
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  return `${parent}/vmwareClusters/${shortName}`;
}

const BASE_URL = "https://gkeonprem.googleapis.com/";

const GET_CONFIG = {
  "id": "gkeonprem.projects.locations.vmwareClusters.get",
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
  "id": "gkeonprem.projects.locations.vmwareClusters.create",
  "path": "v1/{+parent}/vmwareClusters",
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
    "vmwareClusterId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "gkeonprem.projects.locations.vmwareClusters.patch",
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

const DELETE_CONFIG = {
  "id": "gkeonprem.projects.locations.vmwareClusters.delete",
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
  "id": "gkeonprem.projects.locations.vmwareClusters.list",
  "path": "v1/{+parent}/vmwareClusters",
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
    "Required. The admin cluster this VMware user cluster belongs to. This is the full resource name of the admin cluster's fleet membership. In the future, references to other resource types might be allowed if admin clusters are modeled as their own resources.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the VMware user cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  antiAffinityGroups: z.object({
    aagConfigDisabled: z.boolean().describe(
      "Spread nodes across at least three physical hosts (requires at least three hosts). Enabled by default.",
    ).optional(),
  }).describe(
    "AAGConfig specifies whether to spread VMware user cluster nodes across at least three physical hosts in the datacenter.",
  ).optional(),
  authorization: z.object({
    adminUsers: z.array(z.object({
      username: z.string().describe(
        "Required. The name of the user, e.g. `my-gcp-id@gmail.com`.",
      ).optional(),
    })).describe(
      "For VMware and bare metal user clusters, users will be granted the cluster-admin role on the cluster, which provides full administrative access to the cluster. For bare metal admin clusters, users will be granted the cluster-view role, which limits users to read-only access.",
    ).optional(),
  }).describe(
    "RBAC policy that will be applied and managed by the Anthos On-Prem API.",
  ).optional(),
  autoRepairConfig: z.object({
    enabled: z.boolean().describe("Whether auto repair is enabled.").optional(),
  }).describe("Configuration for auto repairing.").optional(),
  binaryAuthorization: z.object({
    evaluationMode: z.enum([
      "EVALUATION_MODE_UNSPECIFIED",
      "DISABLED",
      "PROJECT_SINGLETON_POLICY_ENFORCE",
    ]).describe(
      "Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED.",
    ).optional(),
  }).describe("Binary Authorization related configurations.").optional(),
  controlPlaneNode: z.object({
    autoResizeConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable controle plane node auto resizing.",
      ).optional(),
    }).describe("AutoResizeConfig provides auto resizing configurations.")
      .optional(),
    cpus: z.string().describe(
      "The number of CPUs for each admin cluster node that serve as control planes for this VMware user cluster. (default: 4 CPUs)",
    ).optional(),
    memory: z.string().describe(
      "The megabytes of memory for each admin cluster node that serves as a control plane for this VMware user cluster (default: 8192 MB memory).",
    ).optional(),
    replicas: z.string().describe(
      "The number of control plane nodes for this VMware user cluster. (default: 1 replica).",
    ).optional(),
    vsphereConfig: z.object({
      datastore: z.string().describe(
        "The Vsphere datastore used by the control plane Node.",
      ).optional(),
      storagePolicyName: z.string().describe(
        "The Vsphere storage policy used by the control plane Node.",
      ).optional(),
    }).describe("Vsphere-specific config.").optional(),
  }).describe(
    "VMware user cluster control plane nodes must have either 1 or 3 replicas.",
  ).optional(),
  dataplaneV2: z.object({
    advancedNetworking: z.boolean().describe(
      "Enable advanced networking which requires dataplane_v2_enabled to be set true.",
    ).optional(),
    dataplaneV2Enabled: z.boolean().describe("Enables Dataplane V2.")
      .optional(),
    forwardMode: z.string().describe("Configure ForwardMode for Dataplane v2.")
      .optional(),
    windowsDataplaneV2Enabled: z.boolean().describe(
      "Enable Dataplane V2 for clusters with Windows nodes.",
    ).optional(),
  }).describe(
    "VmwareDataplaneV2Config specifies configuration for Dataplane V2.",
  ).optional(),
  description: z.string().describe(
    "A human readable description of this VMware user cluster.",
  ).optional(),
  disableBundledIngress: z.boolean().describe("Disable bundled ingress.")
    .optional(),
  enableAdvancedCluster: z.boolean().describe("Enable advanced cluster.")
    .optional(),
  enableControlPlaneV2: z.boolean().describe(
    "Enable control plane V2. Default to false.",
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
    }).describe("Configuration for F5 Big IP typed load balancers.").optional(),
    manualLbConfig: z.object({
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
    }).describe("Configuration for MetalLB typed load balancers.").optional(),
    seesawConfig: z.object({
      enableHa: z.boolean().describe(
        "Enable two load balancer VMs to achieve a highly-available Seesaw load balancer.",
      ).optional(),
      group: z.string().describe(
        "Required. In general the following format should be used for the Seesaw group name: seesaw-for-[cluster_name].",
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
      })).describe(
        "Required. The IP Blocks to be used by the Seesaw load balancer",
      ).optional(),
      masterIp: z.string().describe(
        "Required. MasterIP is the IP announced by the master of Seesaw group.",
      ).optional(),
      stackdriverName: z.string().describe("Name to be used by Stackdriver.")
        .optional(),
      vms: z.array(z.string()).describe(
        "Names of the VMs created for this Seesaw group.",
      ).optional(),
    }).describe("Output only. Configuration for Seesaw typed load balancers.")
      .optional(),
    vipConfig: z.object({
      controlPlaneVip: z.string().describe(
        "The VIP which you previously set aside for the Kubernetes API of this cluster.",
      ).optional(),
      ingressVip: z.string().describe(
        "The VIP which you previously set aside for ingress traffic into this cluster.",
      ).optional(),
    }).describe("The VIPs used by the load balancer.").optional(),
  }).describe("Load balancer configuration.").optional(),
  name: z.string().describe("Immutable. The VMware user cluster resource name.")
    .optional(),
  networkConfig: z.object({
    controlPlaneV2Config: z.object({
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
      }).describe("Static IP addresses for the control plane nodes.")
        .optional(),
    }).describe("Configuration for control plane V2 mode.").optional(),
    dhcpIpConfig: z.object({
      enabled: z.boolean().describe(
        "enabled is a flag to mark if DHCP IP allocation is used for VMware user clusters.",
      ).optional(),
    }).describe("Configuration settings for a DHCP IP configuration.")
      .optional(),
    hostConfig: z.object({
      dnsSearchDomains: z.array(z.string()).describe("DNS search domains.")
        .optional(),
      dnsServers: z.array(z.string()).describe("DNS servers.").optional(),
      ntpServers: z.array(z.string()).describe("NTP servers.").optional(),
    }).describe(
      "Represents common network settings irrespective of the host's IP address.",
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
    }).describe("Configuration settings for a static IP configuration.")
      .optional(),
    vcenterNetwork: z.string().describe(
      "vcenter_network specifies vCenter network name. Inherited from the admin cluster.",
    ).optional(),
  }).describe("The VMware user cluster network configuration.").optional(),
  onPremVersion: z.string().describe(
    "Required. The Anthos clusters on the VMware version for your user cluster.",
  ).optional(),
  storage: z.object({
    vsphereCsiDisabled: z.boolean().describe(
      "Whether or not to deploy vSphere CSI components in the VMware user cluster. Enabled by default.",
    ).optional(),
  }).describe("Storage configuration.").optional(),
  upgradePolicy: z.object({
    controlPlaneOnly: z.boolean().describe(
      "Controls whether the upgrade applies to the control plane only.",
    ).optional(),
  }).describe("Specifies upgrade policy for the cluster.").optional(),
  vcenter: z.object({
    address: z.string().describe("Output only. The vCenter IP address.")
      .optional(),
    caCertData: z.string().describe(
      "Contains the vCenter CA certificate public key for SSL verification.",
    ).optional(),
    cluster: z.string().describe(
      "The name of the vCenter cluster for the user cluster.",
    ).optional(),
    datacenter: z.string().describe(
      "The name of the vCenter datacenter for the user cluster.",
    ).optional(),
    datastore: z.string().describe(
      "The name of the vCenter datastore for the user cluster.",
    ).optional(),
    folder: z.string().describe(
      "The name of the vCenter folder for the user cluster.",
    ).optional(),
    resourcePool: z.string().describe(
      "The name of the vCenter resource pool for the user cluster.",
    ).optional(),
    storagePolicyName: z.string().describe(
      "The name of the vCenter storage policy for the user cluster.",
    ).optional(),
  }).describe(
    "VmwareVCenterConfig specifies vCenter config for the user cluster. If unspecified, it is inherited from the admin cluster.",
  ).optional(),
  vmTrackingEnabled: z.boolean().describe("Enable VM tracking.").optional(),
  allowPreflightFailure: z.string().describe(
    'Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster.',
  ).optional(),
  skipValidations: z.string().describe(
    "Optional. List of validations to skip during cluster creation.",
  ).optional(),
  vmwareClusterId: z.string().describe(
    "User provided identifier that is used as part of the resource name; This value must be up to 40 characters and follow RFC-1123 (https://tools.ietf.org/html/rfc1123) format.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  adminClusterMembership: z.string().optional(),
  adminClusterName: z.string().optional(),
  annotations: z.record(z.string(), z.unknown()).optional(),
  antiAffinityGroups: z.object({
    aagConfigDisabled: z.boolean(),
  }).optional(),
  authorization: z.object({
    adminUsers: z.array(z.object({
      username: z.string(),
    })),
  }).optional(),
  autoRepairConfig: z.object({
    enabled: z.boolean(),
  }).optional(),
  binaryAuthorization: z.object({
    evaluationMode: z.string(),
  }).optional(),
  controlPlaneNode: z.object({
    autoResizeConfig: z.object({
      enabled: z.boolean(),
    }),
    cpus: z.string(),
    memory: z.string(),
    replicas: z.string(),
    vsphereConfig: z.object({
      datastore: z.string(),
      storagePolicyName: z.string(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  dataplaneV2: z.object({
    advancedNetworking: z.boolean(),
    dataplaneV2Enabled: z.boolean(),
    forwardMode: z.string(),
    windowsDataplaneV2Enabled: z.boolean(),
  }).optional(),
  deleteTime: z.string().optional(),
  description: z.string().optional(),
  disableBundledIngress: z.boolean().optional(),
  enableAdvancedCluster: z.boolean().optional(),
  enableControlPlaneV2: z.boolean().optional(),
  endpoint: z.string().optional(),
  etag: z.string().optional(),
  fleet: z.object({
    membership: z.string(),
  }).optional(),
  loadBalancer: z.object({
    f5Config: z.object({
      address: z.string(),
      partition: z.string(),
      snatPool: z.string(),
    }),
    manualLbConfig: z.object({
      controlPlaneNodePort: z.number(),
      ingressHttpNodePort: z.number(),
      ingressHttpsNodePort: z.number(),
      konnectivityServerNodePort: z.number(),
    }),
    metalLbConfig: z.object({
      addressPools: z.array(z.object({
        addresses: z.array(z.unknown()),
        avoidBuggyIps: z.boolean(),
        manualAssign: z.boolean(),
        pool: z.string(),
      })),
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
      controlPlaneVip: z.string(),
      ingressVip: z.string(),
    }),
  }).optional(),
  localName: z.string().optional(),
  name: z.string(),
  networkConfig: z.object({
    controlPlaneV2Config: z.object({
      controlPlaneIpBlock: z.object({
        gateway: z.string(),
        ips: z.array(z.object({
          hostname: z.unknown(),
          ip: z.unknown(),
        })),
        netmask: z.string(),
      }),
    }),
    dhcpIpConfig: z.object({
      enabled: z.boolean(),
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
  storage: z.object({
    vsphereCsiDisabled: z.boolean(),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  upgradePolicy: z.object({
    controlPlaneOnly: z.boolean(),
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
  vcenter: z.object({
    address: z.string(),
    caCertData: z.string(),
    cluster: z.string(),
    datacenter: z.string(),
    datastore: z.string(),
    folder: z.string(),
    resourcePool: z.string(),
    storagePolicyName: z.string(),
  }).optional(),
  vmTrackingEnabled: z.boolean().optional(),
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
    "Required. The admin cluster this VMware user cluster belongs to. This is the full resource name of the admin cluster's fleet membership. In the future, references to other resource types might be allowed if admin clusters are modeled as their own resources.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the VMware user cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  antiAffinityGroups: z.object({
    aagConfigDisabled: z.boolean().describe(
      "Spread nodes across at least three physical hosts (requires at least three hosts). Enabled by default.",
    ).optional(),
  }).describe(
    "AAGConfig specifies whether to spread VMware user cluster nodes across at least three physical hosts in the datacenter.",
  ).optional(),
  authorization: z.object({
    adminUsers: z.array(z.object({
      username: z.string().describe(
        "Required. The name of the user, e.g. `my-gcp-id@gmail.com`.",
      ).optional(),
    })).describe(
      "For VMware and bare metal user clusters, users will be granted the cluster-admin role on the cluster, which provides full administrative access to the cluster. For bare metal admin clusters, users will be granted the cluster-view role, which limits users to read-only access.",
    ).optional(),
  }).describe(
    "RBAC policy that will be applied and managed by the Anthos On-Prem API.",
  ).optional(),
  autoRepairConfig: z.object({
    enabled: z.boolean().describe("Whether auto repair is enabled.").optional(),
  }).describe("Configuration for auto repairing.").optional(),
  binaryAuthorization: z.object({
    evaluationMode: z.enum([
      "EVALUATION_MODE_UNSPECIFIED",
      "DISABLED",
      "PROJECT_SINGLETON_POLICY_ENFORCE",
    ]).describe(
      "Mode of operation for binauthz policy evaluation. If unspecified, defaults to DISABLED.",
    ).optional(),
  }).describe("Binary Authorization related configurations.").optional(),
  controlPlaneNode: z.object({
    autoResizeConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable controle plane node auto resizing.",
      ).optional(),
    }).describe("AutoResizeConfig provides auto resizing configurations.")
      .optional(),
    cpus: z.string().describe(
      "The number of CPUs for each admin cluster node that serve as control planes for this VMware user cluster. (default: 4 CPUs)",
    ).optional(),
    memory: z.string().describe(
      "The megabytes of memory for each admin cluster node that serves as a control plane for this VMware user cluster (default: 8192 MB memory).",
    ).optional(),
    replicas: z.string().describe(
      "The number of control plane nodes for this VMware user cluster. (default: 1 replica).",
    ).optional(),
    vsphereConfig: z.object({
      datastore: z.string().describe(
        "The Vsphere datastore used by the control plane Node.",
      ).optional(),
      storagePolicyName: z.string().describe(
        "The Vsphere storage policy used by the control plane Node.",
      ).optional(),
    }).describe("Vsphere-specific config.").optional(),
  }).describe(
    "VMware user cluster control plane nodes must have either 1 or 3 replicas.",
  ).optional(),
  dataplaneV2: z.object({
    advancedNetworking: z.boolean().describe(
      "Enable advanced networking which requires dataplane_v2_enabled to be set true.",
    ).optional(),
    dataplaneV2Enabled: z.boolean().describe("Enables Dataplane V2.")
      .optional(),
    forwardMode: z.string().describe("Configure ForwardMode for Dataplane v2.")
      .optional(),
    windowsDataplaneV2Enabled: z.boolean().describe(
      "Enable Dataplane V2 for clusters with Windows nodes.",
    ).optional(),
  }).describe(
    "VmwareDataplaneV2Config specifies configuration for Dataplane V2.",
  ).optional(),
  description: z.string().describe(
    "A human readable description of this VMware user cluster.",
  ).optional(),
  disableBundledIngress: z.boolean().describe("Disable bundled ingress.")
    .optional(),
  enableAdvancedCluster: z.boolean().describe("Enable advanced cluster.")
    .optional(),
  enableControlPlaneV2: z.boolean().describe(
    "Enable control plane V2. Default to false.",
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
    }).describe("Configuration for F5 Big IP typed load balancers.").optional(),
    manualLbConfig: z.object({
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
    }).describe("Configuration for MetalLB typed load balancers.").optional(),
    seesawConfig: z.object({
      enableHa: z.boolean().describe(
        "Enable two load balancer VMs to achieve a highly-available Seesaw load balancer.",
      ).optional(),
      group: z.string().describe(
        "Required. In general the following format should be used for the Seesaw group name: seesaw-for-[cluster_name].",
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
      })).describe(
        "Required. The IP Blocks to be used by the Seesaw load balancer",
      ).optional(),
      masterIp: z.string().describe(
        "Required. MasterIP is the IP announced by the master of Seesaw group.",
      ).optional(),
      stackdriverName: z.string().describe("Name to be used by Stackdriver.")
        .optional(),
      vms: z.array(z.string()).describe(
        "Names of the VMs created for this Seesaw group.",
      ).optional(),
    }).describe("Output only. Configuration for Seesaw typed load balancers.")
      .optional(),
    vipConfig: z.object({
      controlPlaneVip: z.string().describe(
        "The VIP which you previously set aside for the Kubernetes API of this cluster.",
      ).optional(),
      ingressVip: z.string().describe(
        "The VIP which you previously set aside for ingress traffic into this cluster.",
      ).optional(),
    }).describe("The VIPs used by the load balancer.").optional(),
  }).describe("Load balancer configuration.").optional(),
  name: z.string().describe("Immutable. The VMware user cluster resource name.")
    .optional(),
  networkConfig: z.object({
    controlPlaneV2Config: z.object({
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
      }).describe("Static IP addresses for the control plane nodes.")
        .optional(),
    }).describe("Configuration for control plane V2 mode.").optional(),
    dhcpIpConfig: z.object({
      enabled: z.boolean().describe(
        "enabled is a flag to mark if DHCP IP allocation is used for VMware user clusters.",
      ).optional(),
    }).describe("Configuration settings for a DHCP IP configuration.")
      .optional(),
    hostConfig: z.object({
      dnsSearchDomains: z.array(z.string()).describe("DNS search domains.")
        .optional(),
      dnsServers: z.array(z.string()).describe("DNS servers.").optional(),
      ntpServers: z.array(z.string()).describe("NTP servers.").optional(),
    }).describe(
      "Represents common network settings irrespective of the host's IP address.",
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
    }).describe("Configuration settings for a static IP configuration.")
      .optional(),
    vcenterNetwork: z.string().describe(
      "vcenter_network specifies vCenter network name. Inherited from the admin cluster.",
    ).optional(),
  }).describe("The VMware user cluster network configuration.").optional(),
  onPremVersion: z.string().describe(
    "Required. The Anthos clusters on the VMware version for your user cluster.",
  ).optional(),
  storage: z.object({
    vsphereCsiDisabled: z.boolean().describe(
      "Whether or not to deploy vSphere CSI components in the VMware user cluster. Enabled by default.",
    ).optional(),
  }).describe("Storage configuration.").optional(),
  upgradePolicy: z.object({
    controlPlaneOnly: z.boolean().describe(
      "Controls whether the upgrade applies to the control plane only.",
    ).optional(),
  }).describe("Specifies upgrade policy for the cluster.").optional(),
  vcenter: z.object({
    address: z.string().describe("Output only. The vCenter IP address.")
      .optional(),
    caCertData: z.string().describe(
      "Contains the vCenter CA certificate public key for SSL verification.",
    ).optional(),
    cluster: z.string().describe(
      "The name of the vCenter cluster for the user cluster.",
    ).optional(),
    datacenter: z.string().describe(
      "The name of the vCenter datacenter for the user cluster.",
    ).optional(),
    datastore: z.string().describe(
      "The name of the vCenter datastore for the user cluster.",
    ).optional(),
    folder: z.string().describe(
      "The name of the vCenter folder for the user cluster.",
    ).optional(),
    resourcePool: z.string().describe(
      "The name of the vCenter resource pool for the user cluster.",
    ).optional(),
    storagePolicyName: z.string().describe(
      "The name of the vCenter storage policy for the user cluster.",
    ).optional(),
  }).describe(
    "VmwareVCenterConfig specifies vCenter config for the user cluster. If unspecified, it is inherited from the admin cluster.",
  ).optional(),
  vmTrackingEnabled: z.boolean().describe("Enable VM tracking.").optional(),
  allowPreflightFailure: z.string().describe(
    'Optional. If set to true, CLM will force CCFE to persist the cluster resource in RMS when the creation fails during standalone preflight checks. In that case the subsequent create call will fail with "cluster already exists" error and hence a update cluster is required to fix the cluster.',
  ).optional(),
  skipValidations: z.string().describe(
    "Optional. List of validations to skip during cluster creation.",
  ).optional(),
  vmwareClusterId: z.string().describe(
    "User provided identifier that is used as part of the resource name; This value must be up to 40 characters and follow RFC-1123 (https://tools.ietf.org/html/rfc1123) format.",
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

/** Swamp extension model for Google Cloud GKE On-Prem VmwareClusters. Registered at `@swamp/gcp/gkeonprem/vmwareclusters`. */
export const model = {
  type: "@swamp/gcp/gkeonprem/vmwareclusters",
  version: "2026.10.23.1",
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
      description: "Removed: fleet, status, validationCheck",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          fleet: _fleet,
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: aagConfigDisabled, adminUsers, username, enabled, evaluationMode, autoResizeConfig, enabled, cpus, memory, replicas, vsphereConfig, datastore, storagePolicyName, advancedNetworking, dataplaneV2Enabled, forwardMode, windowsDataplaneV2Enabled, f5Config, address, partition, snatPool, manualLbConfig, controlPlaneNodePort, ingressHttpNodePort, ingressHttpsNodePort, konnectivityServerNodePort, metalLbConfig, addressPools, addresses, avoidBuggyIps, manualAssign, pool, seesawConfig, enableHa, group, ipBlocks, gateway, ips, netmask, masterIp, stackdriverName, vms, vipConfig, controlPlaneVip, ingressVip, controlPlaneV2Config, controlPlaneIpBlock, gateway, ips, hostname, ip, netmask, dhcpIpConfig, enabled, hostConfig, dnsSearchDomains, dnsServers, ntpServers, podAddressCidrBlocks, serviceAddressCidrBlocks, staticIpConfig, ipBlocks, gateway, ips, netmask, vcenterNetwork, vsphereCsiDisabled, controlPlaneOnly, address, caCertData, cluster, datacenter, datastore, folder, resourcePool, storagePolicyName",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          aagConfigDisabled: _aagConfigDisabled,
          adminUsers: _adminUsers,
          username: _username,
          enabled: _enabled,
          evaluationMode: _evaluationMode,
          autoResizeConfig: _autoResizeConfig,
          cpus: _cpus,
          memory: _memory,
          replicas: _replicas,
          vsphereConfig: _vsphereConfig,
          datastore: _datastore,
          storagePolicyName: _storagePolicyName,
          advancedNetworking: _advancedNetworking,
          dataplaneV2Enabled: _dataplaneV2Enabled,
          forwardMode: _forwardMode,
          windowsDataplaneV2Enabled: _windowsDataplaneV2Enabled,
          f5Config: _f5Config,
          address: _address,
          partition: _partition,
          snatPool: _snatPool,
          manualLbConfig: _manualLbConfig,
          controlPlaneNodePort: _controlPlaneNodePort,
          ingressHttpNodePort: _ingressHttpNodePort,
          ingressHttpsNodePort: _ingressHttpsNodePort,
          konnectivityServerNodePort: _konnectivityServerNodePort,
          metalLbConfig: _metalLbConfig,
          addressPools: _addressPools,
          addresses: _addresses,
          avoidBuggyIps: _avoidBuggyIps,
          manualAssign: _manualAssign,
          pool: _pool,
          seesawConfig: _seesawConfig,
          enableHa: _enableHa,
          group: _group,
          ipBlocks: _ipBlocks,
          gateway: _gateway,
          ips: _ips,
          netmask: _netmask,
          masterIp: _masterIp,
          stackdriverName: _stackdriverName,
          vms: _vms,
          vipConfig: _vipConfig,
          controlPlaneVip: _controlPlaneVip,
          ingressVip: _ingressVip,
          controlPlaneV2Config: _controlPlaneV2Config,
          controlPlaneIpBlock: _controlPlaneIpBlock,
          hostname: _hostname,
          ip: _ip,
          dhcpIpConfig: _dhcpIpConfig,
          hostConfig: _hostConfig,
          dnsSearchDomains: _dnsSearchDomains,
          dnsServers: _dnsServers,
          ntpServers: _ntpServers,
          podAddressCidrBlocks: _podAddressCidrBlocks,
          serviceAddressCidrBlocks: _serviceAddressCidrBlocks,
          staticIpConfig: _staticIpConfig,
          vcenterNetwork: _vcenterNetwork,
          vsphereCsiDisabled: _vsphereCsiDisabled,
          controlPlaneOnly: _controlPlaneOnly,
          caCertData: _caCertData,
          cluster: _cluster,
          datacenter: _datacenter,
          folder: _folder,
          resourcePool: _resourcePool,
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
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Resource that represents a VMware user cluster. ##",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a vmwareClusters",
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
        if (g["antiAffinityGroups"] !== undefined) {
          body["antiAffinityGroups"] = g["antiAffinityGroups"];
        }
        if (g["authorization"] !== undefined) {
          body["authorization"] = g["authorization"];
        }
        if (g["autoRepairConfig"] !== undefined) {
          body["autoRepairConfig"] = g["autoRepairConfig"];
        }
        if (g["binaryAuthorization"] !== undefined) {
          body["binaryAuthorization"] = g["binaryAuthorization"];
        }
        if (g["controlPlaneNode"] !== undefined) {
          body["controlPlaneNode"] = g["controlPlaneNode"];
        }
        if (g["dataplaneV2"] !== undefined) {
          body["dataplaneV2"] = g["dataplaneV2"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disableBundledIngress"] !== undefined) {
          body["disableBundledIngress"] = g["disableBundledIngress"];
        }
        if (g["enableAdvancedCluster"] !== undefined) {
          body["enableAdvancedCluster"] = g["enableAdvancedCluster"];
        }
        if (g["enableControlPlaneV2"] !== undefined) {
          body["enableControlPlaneV2"] = g["enableControlPlaneV2"];
        }
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
        if (g["storage"] !== undefined) body["storage"] = g["storage"];
        if (g["upgradePolicy"] !== undefined) {
          body["upgradePolicy"] = g["upgradePolicy"];
        }
        if (g["vcenter"] !== undefined) body["vcenter"] = g["vcenter"];
        if (g["vmTrackingEnabled"] !== undefined) {
          body["vmTrackingEnabled"] = g["vmTrackingEnabled"];
        }
        if (g["allowPreflightFailure"] !== undefined) {
          params["allowPreflightFailure"] = String(g["allowPreflightFailure"]);
        }
        if (g["skipValidations"] !== undefined) {
          params["skipValidations"] = String(g["skipValidations"]);
        }
        if (g["vmwareClusterId"] !== undefined) {
          params["vmwareClusterId"] = String(g["vmwareClusterId"]);
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
      description: "Get a vmwareClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the vmwareClusters"),
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
      description: "Update vmwareClusters attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific vmwareClusters by name (e.g. one discovered by list)",
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
        if (g["antiAffinityGroups"] !== undefined) {
          body["antiAffinityGroups"] = g["antiAffinityGroups"];
        }
        if (g["authorization"] !== undefined) {
          body["authorization"] = g["authorization"];
        }
        if (g["autoRepairConfig"] !== undefined) {
          body["autoRepairConfig"] = g["autoRepairConfig"];
        }
        if (g["binaryAuthorization"] !== undefined) {
          body["binaryAuthorization"] = g["binaryAuthorization"];
        }
        if (g["controlPlaneNode"] !== undefined) {
          body["controlPlaneNode"] = g["controlPlaneNode"];
        }
        if (g["dataplaneV2"] !== undefined) {
          body["dataplaneV2"] = g["dataplaneV2"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disableBundledIngress"] !== undefined) {
          body["disableBundledIngress"] = g["disableBundledIngress"];
        }
        if (g["enableAdvancedCluster"] !== undefined) {
          body["enableAdvancedCluster"] = g["enableAdvancedCluster"];
        }
        if (g["enableControlPlaneV2"] !== undefined) {
          body["enableControlPlaneV2"] = g["enableControlPlaneV2"];
        }
        if (g["loadBalancer"] !== undefined) {
          body["loadBalancer"] = g["loadBalancer"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["onPremVersion"] !== undefined) {
          body["onPremVersion"] = g["onPremVersion"];
        }
        if (g["storage"] !== undefined) body["storage"] = g["storage"];
        if (g["upgradePolicy"] !== undefined) {
          body["upgradePolicy"] = g["upgradePolicy"];
        }
        if (g["vcenter"] !== undefined) body["vcenter"] = g["vcenter"];
        if (g["vmTrackingEnabled"] !== undefined) {
          body["vmTrackingEnabled"] = g["vmTrackingEnabled"];
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
      description: "Delete the vmwareClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the vmwareClusters"),
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
      description: "Sync vmwareClusters state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific vmwareClusters by name (e.g. one discovered by list)",
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
      description: "List vmwareClusters resources",
      arguments: z.object({
        allowMissing: z.boolean().describe(
          "Optional. If true, return list of Vmware Clusters including the ones that only exists in RMS.",
        ).optional(),
        filter: z.string().describe(
          "A resource filtering expression following https://google.aip.dev/160. When non-empty, only resource's whose attributes field matches the filter are returned.",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        view: z.string().describe(
          "View for VMware clusters. When `BASIC` is specified, only the cluster resource name and admin cluster membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete cluster configuration details.",
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
          "vmwareClusters",
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
        localName: z.any().optional(),
        validateOnly: z.any().optional(),
        vmwareClusterId: z.any().optional(),
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
        if (args["localName"] !== undefined) {
          body["localName"] = args["localName"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        if (args["vmwareClusterId"] !== undefined) {
          body["vmwareClusterId"] = args["vmwareClusterId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "gkeonprem.projects.locations.vmwareClusters.enroll",
            "path": "v1/{+parent}/vmwareClusters:enroll",
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
            "id": "gkeonprem.projects.locations.vmwareClusters.getIamPolicy",
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
              "gkeonprem.projects.locations.vmwareClusters.queryVersionConfig",
            "path": "v1/{+parent}/vmwareClusters:queryVersionConfig",
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
            "id": "gkeonprem.projects.locations.vmwareClusters.setIamPolicy",
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
              "gkeonprem.projects.locations.vmwareClusters.testIamPermissions",
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
            "id": "gkeonprem.projects.locations.vmwareClusters.unenroll",
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
