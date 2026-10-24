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

// Auto-generated extension model for @swamp/gcp/gkehub/memberships
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE Hub Memberships.
 *
 * Membership contains information about a member cluster.
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
  return `${parent}/memberships/${shortName}`;
}

const BASE_URL = "https://gkehub.googleapis.com/";

const GET_CONFIG = {
  "id": "gkehub.projects.locations.memberships.get",
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
  "id": "gkehub.projects.locations.memberships.create",
  "path": "v1/{+parent}/memberships",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "membershipId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "gkehub.projects.locations.memberships.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "gkehub.projects.locations.memberships.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "gkehub.projects.locations.memberships.list",
  "path": "v1/{+parent}/memberships",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  authority: z.object({
    identityProvider: z.string().describe(
      "Output only. An identity provider that reflects the `issuer` in the workload identity pool.",
    ).optional(),
    issuer: z.string().describe(
      "Optional. A JSON Web Token (JWT) issuer URI. `issuer` must start with `https://` and be a valid URL with length <2000 characters, it must use `location` rather than `zone` for GKE clusters. If set, then Google will allow valid OIDC tokens from this issuer to authenticate within the workload_identity_pool. OIDC discovery will be performed on this URI to validate tokens from the issuer. Clearing `issuer` disables Workload Identity. `issuer` cannot be directly modified; it must be cleared (and Workload Identity disabled) before using a new issuer (and re-enabling Workload Identity).",
    ).optional(),
    oidcJwks: z.string().describe(
      "Optional. OIDC verification keys for this Membership in JWKS format (RFC 7517). When this field is set, OIDC discovery will NOT be performed on `issuer`, and instead OIDC tokens will be validated using this field.",
    ).optional(),
    scopeTenancyIdentityProvider: z.string().describe(
      "Optional. Output only. The identity provider for the scope-tenancy workload identity pool.",
    ).optional(),
    scopeTenancyWorkloadIdentityPool: z.string().describe(
      "Optional. Output only. The name of the scope-tenancy workload identity pool. This pool is set in the fleet-level feature.",
    ).optional(),
    workloadIdentityPool: z.string().describe(
      "Output only. The name of the workload identity pool in which `issuer` will be recognized. There is a single Workload Identity Pool per Hub that is shared between all Memberships that belong to that Hub. For a Hub hosted in {PROJECT_ID}, the workload pool format is `{PROJECT_ID}.hub.id.goog`, although this is subject to change in newer versions of this API.",
    ).optional(),
  }).describe(
    "Optional. How to identify workloads from this Membership. See the documentation on Workload Identity for more details: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity",
  ).optional(),
  endpoint: z.object({
    applianceCluster: z.object({
      resourceLink: z.string().describe(
        "Immutable. Self-link of the Google Cloud resource for the Appliance Cluster. For example: //transferappliance.googleapis.com/projects/my-project/locations/us-west1-a/appliances/my-appliance",
      ).optional(),
    }).describe(
      "Optional. Specific information for a GDC Edge Appliance cluster.",
    ).optional(),
    edgeCluster: z.object({
      resourceLink: z.string().describe(
        "Immutable. Self-link of the Google Cloud resource for the Edge Cluster. For example: //edgecontainer.googleapis.com/projects/my-project/locations/us-west1-a/clusters/my-cluster",
      ).optional(),
    }).describe("Optional. Specific information for a Google Edge cluster.")
      .optional(),
    gkeCluster: z.object({
      clusterMissing: z.boolean().describe(
        "Output only. If cluster_missing is set then it denotes that the GKE cluster no longer exists in the GKE Control Plane.",
      ).optional(),
      resourceLink: z.string().describe(
        "Immutable. Self-link of the Google Cloud resource for the GKE cluster. For example: //container.googleapis.com/projects/my-project/locations/us-west1-a/clusters/my-cluster Zonal clusters are also supported.",
      ).optional(),
    }).describe(
      "Optional. Specific information for a GKE on Google Cloud cluster.",
    ).optional(),
    googleManaged: z.boolean().describe(
      "Output only. Whether the lifecycle of this membership is managed by a google cluster platform service.",
    ).optional(),
    kubernetesMetadata: z.object({
      kubernetesApiServerVersion: z.string().describe(
        "Output only. Kubernetes API server version string as reported by `/version`.",
      ).optional(),
      memoryMb: z.number().int().describe(
        "Output only. The total memory capacity as reported by the sum of all Kubernetes nodes resources, defined in MB.",
      ).optional(),
      nodeCount: z.number().int().describe(
        "Output only. Node count as reported by Kubernetes nodes resources.",
      ).optional(),
      nodeProviderId: z.string().describe(
        "Output only. Node providerID as reported by the first node in the list of nodes on the Kubernetes endpoint. On Kubernetes platforms that support zero-node clusters (like GKE on Google Cloud), the node_count will be zero and the node_provider_id will be empty.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which these details were last updated. This update_time is different from the Membership-level update_time since EndpointDetails are updated internally for API consumers.",
      ).optional(),
      vcpuCount: z.number().int().describe(
        "Output only. vCPU count as reported by Kubernetes nodes resources.",
      ).optional(),
    }).describe("Output only. Useful Kubernetes-specific metadata.").optional(),
    kubernetesResource: z.object({
      connectResources: z.array(z.object({
        clusterScoped: z.boolean().describe(
          "Output only. Whether the resource provided in the manifest is `cluster_scoped`. If unset, the manifest is assumed to be namespace scoped. This field is used for REST mapping when applying the resource in a cluster.",
        ).optional(),
        manifest: z.string().describe(
          "Output only. YAML manifest of the resource.",
        ).optional(),
      })).describe(
        "Output only. The Kubernetes resources for installing the GKE Connect agent This field is only populated in the Membership returned from a successful long-running operation from CreateMembership or UpdateMembership. It is not populated during normal GetMembership or ListMemberships requests. To get the resource manifest after the initial registration, the caller should make a UpdateMembership call with an empty field mask.",
      ).optional(),
      membershipCrManifest: z.string().describe(
        "Input only. The YAML representation of the Membership CR. This field is ignored for GKE clusters where Hub can read the CR directly. Callers should provide the CR that is currently present in the cluster during CreateMembership or UpdateMembership, or leave this field empty if none exists. The CR manifest is used to validate the cluster has not been registered with another Membership.",
      ).optional(),
      membershipResources: z.array(z.object({
        clusterScoped: z.boolean().describe(
          "Output only. Whether the resource provided in the manifest is `cluster_scoped`. If unset, the manifest is assumed to be namespace scoped. This field is used for REST mapping when applying the resource in a cluster.",
        ).optional(),
        manifest: z.string().describe(
          "Output only. YAML manifest of the resource.",
        ).optional(),
      })).describe(
        "Output only. Additional Kubernetes resources that need to be applied to the cluster after Membership creation, and after every update. This field is only populated in the Membership returned from a successful long-running operation from CreateMembership or UpdateMembership. It is not populated during normal GetMembership or ListMemberships requests. To get the resource manifest after the initial registration, the caller should make a UpdateMembership call with an empty field mask.",
      ).optional(),
      resourceOptions: z.object({
        connectVersion: z.string().describe(
          "Optional. The Connect agent version to use for connect_resources. Defaults to the latest GKE Connect version. The version must be a currently supported version, obsolete versions will be rejected.",
        ).optional(),
        k8sGitVersion: z.string().describe(
          "Optional. Git version of the Kubernetes cluster. This is only used to gate the Connect Agent migration to svc.id.goog on GDC-SO 1.33.100 patch and above.",
        ).optional(),
        k8sVersion: z.string().describe(
          "Optional. Major and minor version of the Kubernetes cluster. This is only used to determine which version to use for the CustomResourceDefinition resources, `apiextensions/v1beta1` or`apiextensions/v1`.",
        ).optional(),
        v1beta1Crd: z.boolean().describe(
          "Optional. Use `apiextensions/v1beta1` instead of `apiextensions/v1` for CustomResourceDefinition resources. This option should be set for clusters with Kubernetes apiserver versions <1.16.",
        ).optional(),
      }).describe("Optional. Options for Kubernetes resource generation.")
        .optional(),
    }).describe(
      "Optional. The in-cluster Kubernetes Resources that should be applied for a correctly registered cluster, in the steady state. These resources: * Ensure that the cluster is exclusively registered to one and only one Hub Membership. * Propagate Workload Pool Information available in the Membership Authority field. * Ensure proper initial configuration of default Hub Features.",
    ).optional(),
    multiCloudCluster: z.object({
      clusterMissing: z.boolean().describe(
        "Output only. If cluster_missing is set then it denotes that API(gkemulticloud.googleapis.com) resource for this GKE Multi-Cloud cluster no longer exists.",
      ).optional(),
      resourceLink: z.string().describe(
        "Immutable. Self-link of the Google Cloud resource for the GKE Multi-Cloud cluster. For example: //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/awsClusters/my-cluster //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/azureClusters/my-cluster //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/attachedClusters/my-cluster",
      ).optional(),
    }).describe("Optional. Specific information for a GKE Multi-Cloud cluster.")
      .optional(),
    onPremCluster: z.object({
      adminCluster: z.boolean().describe(
        "Immutable. Whether the cluster is an admin cluster.",
      ).optional(),
      clusterMissing: z.boolean().describe(
        "Output only. If cluster_missing is set then it denotes that API(gkeonprem.googleapis.com) resource for this GKE On-Prem cluster no longer exists.",
      ).optional(),
      clusterType: z.enum([
        "CLUSTERTYPE_UNSPECIFIED",
        "BOOTSTRAP",
        "HYBRID",
        "STANDALONE",
        "USER",
      ]).describe("Immutable. The on prem cluster's type.").optional(),
      resourceLink: z.string().describe(
        "Immutable. Self-link of the Google Cloud resource for the GKE On-Prem cluster. For example: //gkeonprem.googleapis.com/projects/my-project/locations/us-west1-a/vmwareClusters/my-cluster //gkeonprem.googleapis.com/projects/my-project/locations/us-west1-a/bareMetalClusters/my-cluster",
      ).optional(),
    }).describe(
      'Optional. Specific information for a GKE On-Prem cluster. An onprem user-cluster who has no resourceLink is not allowed to use this field, it should have a nil "type" instead.',
    ).optional(),
  }).describe("Optional. Endpoint information to reach this member.")
    .optional(),
  externalId: z.string().describe(
    "Optional. An externally-generated and managed ID for this Membership. This ID may be modified after creation, but this is not recommended. The ID must match the regex: `a-zA-Z0-9*` If this Membership represents a Kubernetes cluster, this value should be set to the UID of the `kube-system` namespace object.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for this membership. These labels are not leveraged by multi-cluster features, instead, we prefer cluster labels, which can be set on GKE cluster or other cluster types.",
  ).optional(),
  monitoringConfig: z.object({
    cluster: z.string().describe(
      'Optional. Cluster name used to report metrics. For Anthos on VMWare/Baremetal/MultiCloud clusters, it would be in format {cluster_type}/{cluster_name}, e.g., "awsClusters/cluster_1".',
    ).optional(),
    clusterHash: z.string().describe(
      "Optional. For GKE and Multicloud clusters, this is the UUID of the cluster resource. For VMWare and Baremetal clusters, this is the kube-system UID.",
    ).optional(),
    kubernetesMetricsPrefix: z.string().describe(
      "Optional. Kubernetes system metrics, if available, are written to this prefix. This defaults to kubernetes.io for GKE, and kubernetes.io/anthos for Anthos eventually. Noted: Anthos MultiCloud will have kubernetes.io prefix today but will migration to be under kubernetes.io/anthos.",
    ).optional(),
    location: z.string().describe("Optional. Location used to report Metrics")
      .optional(),
    projectId: z.string().describe("Optional. Project used to report Metrics")
      .optional(),
  }).describe(
    "Optional. The monitoring config information for this membership.",
  ).optional(),
  membershipId: z.string().describe(
    "Required. Client chosen ID for the membership. `membership_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  authority: z.object({
    identityProvider: z.string(),
    issuer: z.string(),
    oidcJwks: z.string(),
    scopeTenancyIdentityProvider: z.string(),
    scopeTenancyWorkloadIdentityPool: z.string(),
    workloadIdentityPool: z.string(),
  }).optional(),
  clusterTier: z.string().optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  description: z.string().optional(),
  endpoint: z.object({
    applianceCluster: z.object({
      resourceLink: z.string(),
    }),
    edgeCluster: z.object({
      resourceLink: z.string(),
    }),
    gkeCluster: z.object({
      clusterMissing: z.boolean(),
      resourceLink: z.string(),
    }),
    googleManaged: z.boolean(),
    kubernetesMetadata: z.object({
      kubernetesApiServerVersion: z.string(),
      memoryMb: z.number(),
      nodeCount: z.number(),
      nodeProviderId: z.string(),
      updateTime: z.string(),
      vcpuCount: z.number(),
    }),
    kubernetesResource: z.object({
      connectResources: z.array(z.object({
        clusterScoped: z.boolean(),
        manifest: z.string(),
      })),
      membershipCrManifest: z.string(),
      membershipResources: z.array(z.object({
        clusterScoped: z.boolean(),
        manifest: z.string(),
      })),
      resourceOptions: z.object({
        connectVersion: z.string(),
        k8sGitVersion: z.string(),
        k8sVersion: z.string(),
        v1beta1Crd: z.boolean(),
      }),
    }),
    multiCloudCluster: z.object({
      clusterMissing: z.boolean(),
      resourceLink: z.string(),
    }),
    onPremCluster: z.object({
      adminCluster: z.boolean(),
      clusterMissing: z.boolean(),
      clusterType: z.string(),
      resourceLink: z.string(),
    }),
  }).optional(),
  externalId: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastConnectionTime: z.string().optional(),
  membershipType: z.string().optional(),
  monitoringConfig: z.object({
    cluster: z.string(),
    clusterHash: z.string(),
    kubernetesMetricsPrefix: z.string(),
    location: z.string(),
    projectId: z.string(),
  }).optional(),
  name: z.string(),
  state: z.object({
    code: z.string(),
  }).optional(),
  uniqueId: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  authority: z.object({
    identityProvider: z.string().describe(
      "Output only. An identity provider that reflects the `issuer` in the workload identity pool.",
    ).optional(),
    issuer: z.string().describe(
      "Optional. A JSON Web Token (JWT) issuer URI. `issuer` must start with `https://` and be a valid URL with length <2000 characters, it must use `location` rather than `zone` for GKE clusters. If set, then Google will allow valid OIDC tokens from this issuer to authenticate within the workload_identity_pool. OIDC discovery will be performed on this URI to validate tokens from the issuer. Clearing `issuer` disables Workload Identity. `issuer` cannot be directly modified; it must be cleared (and Workload Identity disabled) before using a new issuer (and re-enabling Workload Identity).",
    ).optional(),
    oidcJwks: z.string().describe(
      "Optional. OIDC verification keys for this Membership in JWKS format (RFC 7517). When this field is set, OIDC discovery will NOT be performed on `issuer`, and instead OIDC tokens will be validated using this field.",
    ).optional(),
    scopeTenancyIdentityProvider: z.string().describe(
      "Optional. Output only. The identity provider for the scope-tenancy workload identity pool.",
    ).optional(),
    scopeTenancyWorkloadIdentityPool: z.string().describe(
      "Optional. Output only. The name of the scope-tenancy workload identity pool. This pool is set in the fleet-level feature.",
    ).optional(),
    workloadIdentityPool: z.string().describe(
      "Output only. The name of the workload identity pool in which `issuer` will be recognized. There is a single Workload Identity Pool per Hub that is shared between all Memberships that belong to that Hub. For a Hub hosted in {PROJECT_ID}, the workload pool format is `{PROJECT_ID}.hub.id.goog`, although this is subject to change in newer versions of this API.",
    ).optional(),
  }).describe(
    "Optional. How to identify workloads from this Membership. See the documentation on Workload Identity for more details: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity",
  ).optional(),
  endpoint: z.object({
    applianceCluster: z.object({
      resourceLink: z.string().describe(
        "Immutable. Self-link of the Google Cloud resource for the Appliance Cluster. For example: //transferappliance.googleapis.com/projects/my-project/locations/us-west1-a/appliances/my-appliance",
      ).optional(),
    }).describe(
      "Optional. Specific information for a GDC Edge Appliance cluster.",
    ).optional(),
    edgeCluster: z.object({
      resourceLink: z.string().describe(
        "Immutable. Self-link of the Google Cloud resource for the Edge Cluster. For example: //edgecontainer.googleapis.com/projects/my-project/locations/us-west1-a/clusters/my-cluster",
      ).optional(),
    }).describe("Optional. Specific information for a Google Edge cluster.")
      .optional(),
    gkeCluster: z.object({
      clusterMissing: z.boolean().describe(
        "Output only. If cluster_missing is set then it denotes that the GKE cluster no longer exists in the GKE Control Plane.",
      ).optional(),
      resourceLink: z.string().describe(
        "Immutable. Self-link of the Google Cloud resource for the GKE cluster. For example: //container.googleapis.com/projects/my-project/locations/us-west1-a/clusters/my-cluster Zonal clusters are also supported.",
      ).optional(),
    }).describe(
      "Optional. Specific information for a GKE on Google Cloud cluster.",
    ).optional(),
    googleManaged: z.boolean().describe(
      "Output only. Whether the lifecycle of this membership is managed by a google cluster platform service.",
    ).optional(),
    kubernetesMetadata: z.object({
      kubernetesApiServerVersion: z.string().describe(
        "Output only. Kubernetes API server version string as reported by `/version`.",
      ).optional(),
      memoryMb: z.number().int().describe(
        "Output only. The total memory capacity as reported by the sum of all Kubernetes nodes resources, defined in MB.",
      ).optional(),
      nodeCount: z.number().int().describe(
        "Output only. Node count as reported by Kubernetes nodes resources.",
      ).optional(),
      nodeProviderId: z.string().describe(
        "Output only. Node providerID as reported by the first node in the list of nodes on the Kubernetes endpoint. On Kubernetes platforms that support zero-node clusters (like GKE on Google Cloud), the node_count will be zero and the node_provider_id will be empty.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time at which these details were last updated. This update_time is different from the Membership-level update_time since EndpointDetails are updated internally for API consumers.",
      ).optional(),
      vcpuCount: z.number().int().describe(
        "Output only. vCPU count as reported by Kubernetes nodes resources.",
      ).optional(),
    }).describe("Output only. Useful Kubernetes-specific metadata.").optional(),
    kubernetesResource: z.object({
      connectResources: z.array(z.object({
        clusterScoped: z.boolean().describe(
          "Output only. Whether the resource provided in the manifest is `cluster_scoped`. If unset, the manifest is assumed to be namespace scoped. This field is used for REST mapping when applying the resource in a cluster.",
        ).optional(),
        manifest: z.string().describe(
          "Output only. YAML manifest of the resource.",
        ).optional(),
      })).describe(
        "Output only. The Kubernetes resources for installing the GKE Connect agent This field is only populated in the Membership returned from a successful long-running operation from CreateMembership or UpdateMembership. It is not populated during normal GetMembership or ListMemberships requests. To get the resource manifest after the initial registration, the caller should make a UpdateMembership call with an empty field mask.",
      ).optional(),
      membershipCrManifest: z.string().describe(
        "Input only. The YAML representation of the Membership CR. This field is ignored for GKE clusters where Hub can read the CR directly. Callers should provide the CR that is currently present in the cluster during CreateMembership or UpdateMembership, or leave this field empty if none exists. The CR manifest is used to validate the cluster has not been registered with another Membership.",
      ).optional(),
      membershipResources: z.array(z.object({
        clusterScoped: z.boolean().describe(
          "Output only. Whether the resource provided in the manifest is `cluster_scoped`. If unset, the manifest is assumed to be namespace scoped. This field is used for REST mapping when applying the resource in a cluster.",
        ).optional(),
        manifest: z.string().describe(
          "Output only. YAML manifest of the resource.",
        ).optional(),
      })).describe(
        "Output only. Additional Kubernetes resources that need to be applied to the cluster after Membership creation, and after every update. This field is only populated in the Membership returned from a successful long-running operation from CreateMembership or UpdateMembership. It is not populated during normal GetMembership or ListMemberships requests. To get the resource manifest after the initial registration, the caller should make a UpdateMembership call with an empty field mask.",
      ).optional(),
      resourceOptions: z.object({
        connectVersion: z.string().describe(
          "Optional. The Connect agent version to use for connect_resources. Defaults to the latest GKE Connect version. The version must be a currently supported version, obsolete versions will be rejected.",
        ).optional(),
        k8sGitVersion: z.string().describe(
          "Optional. Git version of the Kubernetes cluster. This is only used to gate the Connect Agent migration to svc.id.goog on GDC-SO 1.33.100 patch and above.",
        ).optional(),
        k8sVersion: z.string().describe(
          "Optional. Major and minor version of the Kubernetes cluster. This is only used to determine which version to use for the CustomResourceDefinition resources, `apiextensions/v1beta1` or`apiextensions/v1`.",
        ).optional(),
        v1beta1Crd: z.boolean().describe(
          "Optional. Use `apiextensions/v1beta1` instead of `apiextensions/v1` for CustomResourceDefinition resources. This option should be set for clusters with Kubernetes apiserver versions <1.16.",
        ).optional(),
      }).describe("Optional. Options for Kubernetes resource generation.")
        .optional(),
    }).describe(
      "Optional. The in-cluster Kubernetes Resources that should be applied for a correctly registered cluster, in the steady state. These resources: * Ensure that the cluster is exclusively registered to one and only one Hub Membership. * Propagate Workload Pool Information available in the Membership Authority field. * Ensure proper initial configuration of default Hub Features.",
    ).optional(),
    multiCloudCluster: z.object({
      clusterMissing: z.boolean().describe(
        "Output only. If cluster_missing is set then it denotes that API(gkemulticloud.googleapis.com) resource for this GKE Multi-Cloud cluster no longer exists.",
      ).optional(),
      resourceLink: z.string().describe(
        "Immutable. Self-link of the Google Cloud resource for the GKE Multi-Cloud cluster. For example: //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/awsClusters/my-cluster //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/azureClusters/my-cluster //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/attachedClusters/my-cluster",
      ).optional(),
    }).describe("Optional. Specific information for a GKE Multi-Cloud cluster.")
      .optional(),
    onPremCluster: z.object({
      adminCluster: z.boolean().describe(
        "Immutable. Whether the cluster is an admin cluster.",
      ).optional(),
      clusterMissing: z.boolean().describe(
        "Output only. If cluster_missing is set then it denotes that API(gkeonprem.googleapis.com) resource for this GKE On-Prem cluster no longer exists.",
      ).optional(),
      clusterType: z.enum([
        "CLUSTERTYPE_UNSPECIFIED",
        "BOOTSTRAP",
        "HYBRID",
        "STANDALONE",
        "USER",
      ]).describe("Immutable. The on prem cluster's type.").optional(),
      resourceLink: z.string().describe(
        "Immutable. Self-link of the Google Cloud resource for the GKE On-Prem cluster. For example: //gkeonprem.googleapis.com/projects/my-project/locations/us-west1-a/vmwareClusters/my-cluster //gkeonprem.googleapis.com/projects/my-project/locations/us-west1-a/bareMetalClusters/my-cluster",
      ).optional(),
    }).describe(
      'Optional. Specific information for a GKE On-Prem cluster. An onprem user-cluster who has no resourceLink is not allowed to use this field, it should have a nil "type" instead.',
    ).optional(),
  }).describe("Optional. Endpoint information to reach this member.")
    .optional(),
  externalId: z.string().describe(
    "Optional. An externally-generated and managed ID for this Membership. This ID may be modified after creation, but this is not recommended. The ID must match the regex: `a-zA-Z0-9*` If this Membership represents a Kubernetes cluster, this value should be set to the UID of the `kube-system` namespace object.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for this membership. These labels are not leveraged by multi-cluster features, instead, we prefer cluster labels, which can be set on GKE cluster or other cluster types.",
  ).optional(),
  monitoringConfig: z.object({
    cluster: z.string().describe(
      'Optional. Cluster name used to report metrics. For Anthos on VMWare/Baremetal/MultiCloud clusters, it would be in format {cluster_type}/{cluster_name}, e.g., "awsClusters/cluster_1".',
    ).optional(),
    clusterHash: z.string().describe(
      "Optional. For GKE and Multicloud clusters, this is the UUID of the cluster resource. For VMWare and Baremetal clusters, this is the kube-system UID.",
    ).optional(),
    kubernetesMetricsPrefix: z.string().describe(
      "Optional. Kubernetes system metrics, if available, are written to this prefix. This defaults to kubernetes.io for GKE, and kubernetes.io/anthos for Anthos eventually. Noted: Anthos MultiCloud will have kubernetes.io prefix today but will migration to be under kubernetes.io/anthos.",
    ).optional(),
    location: z.string().describe("Optional. Location used to report Metrics")
      .optional(),
    projectId: z.string().describe("Optional. Project used to report Metrics")
      .optional(),
  }).describe(
    "Optional. The monitoring config information for this membership.",
  ).optional(),
  membershipId: z.string().describe(
    "Required. Client chosen ID for the membership. `membership_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud GKE Hub Memberships. Registered at `@swamp/gcp/gkehub/memberships`. */
export const model = {
  type: "@swamp/gcp/gkehub/memberships",
  version: "2026.10.23.1",
  upgrades: [
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
        "Removed: identityProvider, issuer, oidcJwks, scopeTenancyIdentityProvider, scopeTenancyWorkloadIdentityPool, workloadIdentityPool, applianceCluster, resourceLink, edgeCluster, resourceLink, gkeCluster, clusterMissing, resourceLink, googleManaged, kubernetesMetadata, kubernetesApiServerVersion, memoryMb, nodeCount, nodeProviderId, updateTime, vcpuCount, kubernetesResource, connectResources, clusterScoped, manifest, membershipCrManifest, membershipResources, clusterScoped, manifest, resourceOptions, connectVersion, k8sGitVersion, k8sVersion, v1beta1Crd, multiCloudCluster, clusterMissing, resourceLink, onPremCluster, adminCluster, clusterMissing, clusterType, resourceLink, cluster, clusterHash, kubernetesMetricsPrefix, projectId",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          identityProvider: _identityProvider,
          issuer: _issuer,
          oidcJwks: _oidcJwks,
          scopeTenancyIdentityProvider: _scopeTenancyIdentityProvider,
          scopeTenancyWorkloadIdentityPool: _scopeTenancyWorkloadIdentityPool,
          workloadIdentityPool: _workloadIdentityPool,
          applianceCluster: _applianceCluster,
          resourceLink: _resourceLink,
          edgeCluster: _edgeCluster,
          gkeCluster: _gkeCluster,
          clusterMissing: _clusterMissing,
          googleManaged: _googleManaged,
          kubernetesMetadata: _kubernetesMetadata,
          kubernetesApiServerVersion: _kubernetesApiServerVersion,
          memoryMb: _memoryMb,
          nodeCount: _nodeCount,
          nodeProviderId: _nodeProviderId,
          updateTime: _updateTime,
          vcpuCount: _vcpuCount,
          kubernetesResource: _kubernetesResource,
          connectResources: _connectResources,
          clusterScoped: _clusterScoped,
          manifest: _manifest,
          membershipCrManifest: _membershipCrManifest,
          membershipResources: _membershipResources,
          resourceOptions: _resourceOptions,
          connectVersion: _connectVersion,
          k8sGitVersion: _k8sGitVersion,
          k8sVersion: _k8sVersion,
          v1beta1Crd: _v1beta1Crd,
          multiCloudCluster: _multiCloudCluster,
          onPremCluster: _onPremCluster,
          adminCluster: _adminCluster,
          clusterType: _clusterType,
          cluster: _cluster,
          clusterHash: _clusterHash,
          kubernetesMetricsPrefix: _kubernetesMetricsPrefix,
          projectId: _projectId,
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
      description: "Membership contains information about a member cluster.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a memberships",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
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
        if (g["authority"] !== undefined) body["authority"] = g["authority"];
        if (g["endpoint"] !== undefined) body["endpoint"] = g["endpoint"];
        if (g["externalId"] !== undefined) body["externalId"] = g["externalId"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["monitoringConfig"] !== undefined) {
          body["monitoringConfig"] = g["monitoringConfig"];
        }
        if (g["membershipId"] !== undefined) {
          params["membershipId"] = String(g["membershipId"]);
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
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
          undefined,
          undefined,
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a memberships",
      arguments: z.object({
        identifier: z.string().describe("The name of the memberships"),
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
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update memberships attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific memberships by name (e.g. one discovered by list)",
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
        if (g["authority"] !== undefined) body["authority"] = g["authority"];
        if (g["endpoint"] !== undefined) body["endpoint"] = g["endpoint"];
        if (g["externalId"] !== undefined) body["externalId"] = g["externalId"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["monitoringConfig"] !== undefined) {
          body["monitoringConfig"] = g["monitoringConfig"];
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
      description: "Delete the memberships",
      arguments: z.object({
        identifier: z.string().describe("The name of the memberships"),
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
      description: "Sync memberships state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific memberships by name (e.g. one discovered by list)",
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
      description: "List memberships resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. Lists Memberships that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Examples: - Name is `bar` in project `foo-proj` and location `global`: name = "projects/foo-proj/locations/global/membership/bar" - Memberships that have a label called `foo`: labels.foo:* - Memberships that have a label called `foo` whose value is `bar`: labels.foo = bar - Memberships in the CREATING state: state = CREATING',
        ).optional(),
        orderBy: z.string().describe(
          "Optional. One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "resources",
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
    generate_connect_manifest: {
      description: "generate connect manifest",
      arguments: z.object({
        imagePullSecretContent: z.any().optional(),
        isUpgrade: z.any().optional(),
        namespace: z.any().optional(),
        proxy: z.any().optional(),
        registry: z.any().optional(),
        version: z.any().optional(),
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
        if (args["imagePullSecretContent"] !== undefined) {
          params["imagePullSecretContent"] = String(
            args["imagePullSecretContent"],
          );
        }
        if (args["isUpgrade"] !== undefined) {
          params["isUpgrade"] = String(args["isUpgrade"]);
        }
        if (args["namespace"] !== undefined) {
          params["namespace"] = String(args["namespace"]);
        }
        if (args["proxy"] !== undefined) {
          params["proxy"] = String(args["proxy"]);
        }
        if (args["registry"] !== undefined) {
          params["registry"] = String(args["registry"]);
        }
        if (args["version"] !== undefined) {
          params["version"] = String(args["version"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "gkehub.projects.locations.memberships.generateConnectManifest",
            "path": "v1/{+name}:generateConnectManifest",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "imagePullSecretContent": { "location": "query" },
              "isUpgrade": { "location": "query" },
              "name": { "location": "path", "required": true },
              "namespace": { "location": "query" },
              "proxy": { "location": "query" },
              "registry": { "location": "query" },
              "version": { "location": "query" },
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
            "id": "gkehub.projects.locations.memberships.getIamPolicy",
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
        updateMask: z.any().optional(),
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
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "gkehub.projects.locations.memberships.setIamPolicy",
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
            "id": "gkehub.projects.locations.memberships.testIamPermissions",
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
  },
};
