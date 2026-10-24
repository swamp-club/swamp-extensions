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

import { z } from "npm:zod@4.6.7";
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

const LIST_CONFIG = {
  "id": "gkeonprem.projects.locations.vmwareAdminClusters.list",
  "path": "v1/{+parent}/vmwareAdminClusters",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  addonNode: z.object({
    autoResizeConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable controle plane node auto resizing.",
      ).optional(),
    }).describe("VmwareAutoResizeConfig config specifies auto resize config.")
      .optional(),
  }).describe("The VMware admin cluster addon node configuration.").optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the VMware admin cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  antiAffinityGroups: z.object({
    aagConfigDisabled: z.boolean().describe(
      "Spread nodes across at least three physical hosts (requires at least three hosts). Enabled by default.",
    ).optional(),
  }).describe("The VMware admin cluster anti affinity group configuration.")
    .optional(),
  authorization: z.object({
    viewerUsers: z.array(z.object({
      username: z.string().describe(
        "Required. The name of the user, e.g. `my-gcp-id@gmail.com`.",
      ).optional(),
    })).describe(
      "For VMware admin clusters, users will be granted the cluster-viewer role on the cluster.",
    ).optional(),
  }).describe("The VMware admin cluster authorization configuration.")
    .optional(),
  autoRepairConfig: z.object({
    enabled: z.boolean().describe("Whether auto repair is enabled.").optional(),
  }).describe("The VMware admin cluster auto repair configuration.").optional(),
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
  }).describe("The VMware admin cluster control plane node configuration.")
    .optional(),
  description: z.string().describe(
    "A human readable description of this VMware admin cluster.",
  ).optional(),
  enableAdvancedCluster: z.boolean().describe("Enable advanced cluster.")
    .optional(),
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
    }).describe("Configuration for F5 Big IP typed load balancers.").optional(),
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
    }).describe("Manually configured load balancers.").optional(),
    metalLbConfig: z.object({
      enabled: z.boolean().describe("Whether MetalLB is enabled.").optional(),
    }).describe("MetalLB load balancers.").optional(),
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
    }).describe("Output only. Configuration for Seesaw typed load balancers.")
      .optional(),
    vipConfig: z.object({
      addonsVip: z.string().describe(
        "The VIP to configure the load balancer for add-ons.",
      ).optional(),
      controlPlaneVip: z.string().describe(
        "The VIP which you previously set aside for the Kubernetes API of the admin cluster.",
      ).optional(),
    }).describe("The VIPs used by the load balancer.").optional(),
  }).describe("The VMware admin cluster load balancer configuration.")
    .optional(),
  name: z.string().describe(
    "Immutable. The VMware admin cluster resource name.",
  ).optional(),
  networkConfig: z.object({
    dhcpIpConfig: z.object({
      enabled: z.boolean().describe(
        "enabled is a flag to mark if DHCP IP allocation is used for VMware user clusters.",
      ).optional(),
    }).describe("Configuration settings for a DHCP IP configuration.")
      .optional(),
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
      }).describe("Static IP addresses for the admin control plane nodes.")
        .optional(),
    }).describe("Configuration for HA admin cluster control plane.").optional(),
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
      "vcenter_network specifies vCenter network name.",
    ).optional(),
  }).describe("The VMware admin cluster network configuration.").optional(),
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
          "Shows the mapping of a given version to the number of machines under this version.",
        ).optional(),
      }).describe("Output only. Resource status for the bundle.").optional(),
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
        "Shows the mapping of a given version to the number of machines under this version.",
      ).optional(),
    }).describe("Output only. Resource status for the platform.").optional(),
  }).describe("The VMware platform configuration.").optional(),
  privateRegistryConfig: z.object({
    address: z.string().describe("The registry address.").optional(),
    caCert: z.string().describe(
      "When the container runtime pulls an image from private registry, the registry must prove its identity by presenting a certificate. The registry's certificate is signed by a certificate authority (CA). The container runtime uses the CA's certificate to validate the registry's certificate.",
    ).optional(),
  }).describe("Configuration for registry.").optional(),
  proxy: z.object({
    noProxy: z.string().describe(
      "A comma-separated list of IP addresses, IP address ranges, host names, and domain names that should not go through the proxy server. When Google Distributed Cloud sends a request to one of these addresses, hosts, or domains, the request is sent directly.",
    ).optional(),
    url: z.string().describe("The HTTP address of proxy server.").optional(),
  }).describe("Configuration for proxy.").optional(),
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
  }).describe("The VMware admin cluster VCenter configuration.").optional(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  addonNode: z.object({
    autoResizeConfig: z.object({
      enabled: z.boolean().describe(
        "Whether to enable controle plane node auto resizing.",
      ).optional(),
    }).describe("VmwareAutoResizeConfig config specifies auto resize config.")
      .optional(),
  }).describe("The VMware admin cluster addon node configuration.").optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the VMware admin cluster. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  antiAffinityGroups: z.object({
    aagConfigDisabled: z.boolean().describe(
      "Spread nodes across at least three physical hosts (requires at least three hosts). Enabled by default.",
    ).optional(),
  }).describe("The VMware admin cluster anti affinity group configuration.")
    .optional(),
  authorization: z.object({
    viewerUsers: z.array(z.object({
      username: z.string().describe(
        "Required. The name of the user, e.g. `my-gcp-id@gmail.com`.",
      ).optional(),
    })).describe(
      "For VMware admin clusters, users will be granted the cluster-viewer role on the cluster.",
    ).optional(),
  }).describe("The VMware admin cluster authorization configuration.")
    .optional(),
  autoRepairConfig: z.object({
    enabled: z.boolean().describe("Whether auto repair is enabled.").optional(),
  }).describe("The VMware admin cluster auto repair configuration.").optional(),
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
  }).describe("The VMware admin cluster control plane node configuration.")
    .optional(),
  description: z.string().describe(
    "A human readable description of this VMware admin cluster.",
  ).optional(),
  enableAdvancedCluster: z.boolean().describe("Enable advanced cluster.")
    .optional(),
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
    }).describe("Configuration for F5 Big IP typed load balancers.").optional(),
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
    }).describe("Manually configured load balancers.").optional(),
    metalLbConfig: z.object({
      enabled: z.boolean().describe("Whether MetalLB is enabled.").optional(),
    }).describe("MetalLB load balancers.").optional(),
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
    }).describe("Output only. Configuration for Seesaw typed load balancers.")
      .optional(),
    vipConfig: z.object({
      addonsVip: z.string().describe(
        "The VIP to configure the load balancer for add-ons.",
      ).optional(),
      controlPlaneVip: z.string().describe(
        "The VIP which you previously set aside for the Kubernetes API of the admin cluster.",
      ).optional(),
    }).describe("The VIPs used by the load balancer.").optional(),
  }).describe("The VMware admin cluster load balancer configuration.")
    .optional(),
  name: z.string().describe(
    "Immutable. The VMware admin cluster resource name.",
  ).optional(),
  networkConfig: z.object({
    dhcpIpConfig: z.object({
      enabled: z.boolean().describe(
        "enabled is a flag to mark if DHCP IP allocation is used for VMware user clusters.",
      ).optional(),
    }).describe("Configuration settings for a DHCP IP configuration.")
      .optional(),
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
      }).describe("Static IP addresses for the admin control plane nodes.")
        .optional(),
    }).describe("Configuration for HA admin cluster control plane.").optional(),
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
      "vcenter_network specifies vCenter network name.",
    ).optional(),
  }).describe("The VMware admin cluster network configuration.").optional(),
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
          "Shows the mapping of a given version to the number of machines under this version.",
        ).optional(),
      }).describe("Output only. Resource status for the bundle.").optional(),
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
        "Shows the mapping of a given version to the number of machines under this version.",
      ).optional(),
    }).describe("Output only. Resource status for the platform.").optional(),
  }).describe("The VMware platform configuration.").optional(),
  privateRegistryConfig: z.object({
    address: z.string().describe("The registry address.").optional(),
    caCert: z.string().describe(
      "When the container runtime pulls an image from private registry, the registry must prove its identity by presenting a certificate. The registry's certificate is signed by a certificate authority (CA). The container runtime uses the CA's certificate to validate the registry's certificate.",
    ).optional(),
  }).describe("Configuration for registry.").optional(),
  proxy: z.object({
    noProxy: z.string().describe(
      "A comma-separated list of IP addresses, IP address ranges, host names, and domain names that should not go through the proxy server. When Google Distributed Cloud sends a request to one of these addresses, hosts, or domains, the request is sent directly.",
    ).optional(),
    url: z.string().describe("The HTTP address of proxy server.").optional(),
  }).describe("Configuration for proxy.").optional(),
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
  }).describe("The VMware admin cluster VCenter configuration.").optional(),
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

/** Swamp extension model for Google Cloud GKE On-Prem VmwareAdminClusters. Registered at `@swamp/gcp/gkeonprem/vmwareadminclusters`. */
export const model = {
  type: "@swamp/gcp/gkeonprem/vmwareadminclusters",
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
      description: "Removed: fleet, preparedSecrets, status, validationCheck",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          fleet: _fleet,
          preparedSecrets: _preparedSecrets,
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
        "Removed: autoResizeConfig, enabled, aagConfigDisabled, viewerUsers, username, enabled, cpus, memory, replicas, f5Config, address, partition, snatPool, manualLbConfig, addonsNodePort, controlPlaneNodePort, ingressHttpNodePort, ingressHttpsNodePort, konnectivityServerNodePort, metalLbConfig, enabled, seesawConfig, enableHa, group, ipBlocks, gateway, ips, netmask, masterIp, stackdriverName, vms, vipConfig, addonsVip, controlPlaneVip, dhcpIpConfig, enabled, haControlPlaneConfig, controlPlaneIpBlock, gateway, ips, hostname, ip, netmask, hostConfig, dnsSearchDomains, dnsServers, ntpServers, podAddressCidrBlocks, serviceAddressCidrBlocks, staticIpConfig, ipBlocks, gateway, ips, netmask, vcenterNetwork, bundles, status, conditions, errorMessage, version, versions, versions, version, platformVersion, requiredPlatformVersion, status, conditions, lastTransitionTime, message, reason, state, type, errorMessage, version, versions, versions, count, version, address, caCert, noProxy, url, address, caCertData, cluster, dataDisk, datacenter, datastore, folder, resourcePool, storagePolicyName",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          autoResizeConfig: _autoResizeConfig,
          enabled: _enabled,
          aagConfigDisabled: _aagConfigDisabled,
          viewerUsers: _viewerUsers,
          username: _username,
          cpus: _cpus,
          memory: _memory,
          replicas: _replicas,
          f5Config: _f5Config,
          address: _address,
          partition: _partition,
          snatPool: _snatPool,
          manualLbConfig: _manualLbConfig,
          addonsNodePort: _addonsNodePort,
          controlPlaneNodePort: _controlPlaneNodePort,
          ingressHttpNodePort: _ingressHttpNodePort,
          ingressHttpsNodePort: _ingressHttpsNodePort,
          konnectivityServerNodePort: _konnectivityServerNodePort,
          metalLbConfig: _metalLbConfig,
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
          addonsVip: _addonsVip,
          controlPlaneVip: _controlPlaneVip,
          dhcpIpConfig: _dhcpIpConfig,
          haControlPlaneConfig: _haControlPlaneConfig,
          controlPlaneIpBlock: _controlPlaneIpBlock,
          hostname: _hostname,
          ip: _ip,
          hostConfig: _hostConfig,
          dnsSearchDomains: _dnsSearchDomains,
          dnsServers: _dnsServers,
          ntpServers: _ntpServers,
          podAddressCidrBlocks: _podAddressCidrBlocks,
          serviceAddressCidrBlocks: _serviceAddressCidrBlocks,
          staticIpConfig: _staticIpConfig,
          vcenterNetwork: _vcenterNetwork,
          bundles: _bundles,
          status: _status,
          conditions: _conditions,
          errorMessage: _errorMessage,
          version: _version,
          versions: _versions,
          platformVersion: _platformVersion,
          requiredPlatformVersion: _requiredPlatformVersion,
          lastTransitionTime: _lastTransitionTime,
          message: _message,
          reason: _reason,
          state: _state,
          type: _type,
          count: _count,
          caCert: _caCert,
          noProxy: _noProxy,
          url: _url,
          caCertData: _caCertData,
          cluster: _cluster,
          dataDisk: _dataDisk,
          datacenter: _datacenter,
          datastore: _datastore,
          folder: _folder,
          resourcePool: _resourcePool,
          storagePolicyName: _storagePolicyName,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["privateRegistryConfig"] !== undefined) {
          body["privateRegistryConfig"] = g["privateRegistryConfig"];
        }
        if (g["proxy"] !== undefined) body["proxy"] = g["proxy"];
        if (g["vcenter"] !== undefined) body["vcenter"] = g["vcenter"];
        if (g["allowPreflightFailure"] !== undefined) {
          params["allowPreflightFailure"] = String(g["allowPreflightFailure"]);
        }
        if (g["skipValidations"] !== undefined) {
          params["skipValidations"] = String(g["skipValidations"]);
        }
        if (g["vmwareAdminClusterId"] !== undefined) {
          params["vmwareAdminClusterId"] = String(g["vmwareAdminClusterId"]);
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
      description: "Get a vmwareAdminClusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the vmwareAdminClusters"),
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
      description: "Update vmwareAdminClusters attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific vmwareAdminClusters by name (e.g. one discovered by list)",
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
        if (g["privateRegistryConfig"] !== undefined) {
          body["privateRegistryConfig"] = g["privateRegistryConfig"];
        }
        if (g["proxy"] !== undefined) body["proxy"] = g["proxy"];
        if (g["vcenter"] !== undefined) body["vcenter"] = g["vcenter"];
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
    sync: {
      description: "Sync vmwareAdminClusters state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific vmwareAdminClusters by name (e.g. one discovered by list)",
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
      description: "List vmwareAdminClusters resources",
      arguments: z.object({
        allowMissing: z.boolean().describe(
          "Optional. If true, return list of Vmware Admin Clusters including the ones that only exists in RMS.",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Server may return fewer items than requested. If unspecified, at most 50 clusters will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        view: z.string().describe(
          "View for VMware admin clusters. When `BASIC` is specified, only the admin cluster resource name and membership are returned. The default/unset value `CLUSTER_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete admin cluster configuration details.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "vmwareAdminClusters",
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
        membership: z.any().optional(),
        vmwareAdminClusterId: z.any().optional(),
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
        if (args["membership"] !== undefined) {
          body["membership"] = args["membership"];
        }
        if (args["vmwareAdminClusterId"] !== undefined) {
          body["vmwareAdminClusterId"] = args["vmwareAdminClusterId"];
        }
        const result = await createResource(
          baseUrl,
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
            "id":
              "gkeonprem.projects.locations.vmwareAdminClusters.getIamPolicy",
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
            "id":
              "gkeonprem.projects.locations.vmwareAdminClusters.setIamPolicy",
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
              "gkeonprem.projects.locations.vmwareAdminClusters.testIamPermissions",
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
        ignoreErrors: z.any().optional(),
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
        if (args["ignoreErrors"] !== undefined) {
          params["ignoreErrors"] = String(args["ignoreErrors"]);
        }
        if (args["validateOnly"] !== undefined) {
          params["validateOnly"] = String(args["validateOnly"]);
        }
        const result = await createResource(
          baseUrl,
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
