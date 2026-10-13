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

// Auto-generated extension model for @swamp/gcp/gkehub/memberships-features
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE Hub Memberships.Features.
 *
 * MembershipFeature represents the settings and status of a Fleet Feature enabled on a single Fleet Membership.
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
  return `${parent}/features/${shortName}`;
}

const BASE_URL = "https://gkehub.googleapis.com/";

const GET_CONFIG = {
  "id": "gkehub.projects.locations.memberships.features.get",
  "path": "v2/{+name}",
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
  "id": "gkehub.projects.locations.memberships.features.create",
  "path": "v2/{+parent}/features",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "featureId": {
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
  "id": "gkehub.projects.locations.memberships.features.patch",
  "path": "v2/{+name}",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "gkehub.projects.locations.memberships.features.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "gkehub.projects.locations.memberships.features.list",
  "path": "v2/{+parent}/features",
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
  labels: z.record(z.string(), z.string()).describe(
    "Google Cloud labels for this MembershipFeature.",
  ).optional(),
  spec: z.object({
    cloudbuild: z.object({
      securityPolicy: z.enum([
        "SECURITY_POLICY_UNSPECIFIED",
        "NON_PRIVILEGED",
        "PRIVILEGED",
      ]).describe(
        "Whether it is allowed to run the privileged builds on the cluster or not.",
      ).optional(),
      version: z.string().describe(
        "Version of the cloud build software on the cluster.",
      ).optional(),
    }).describe("Cloudbuild-specific FeatureSpec.").optional(),
    configmanagement: z.object({
      binauthz: z.object({
        enabled: z.boolean().describe(
          "Whether binauthz is enabled in this cluster.",
        ).optional(),
      }).describe(
        "Optional. Deprecated: Binauthz configuration will be ignored and should not be set.",
      ).optional(),
      cluster: z.string().describe(
        "Optional. User-specified cluster name used by the Config Sync cluster-name-selector annotation or ClusterSelector object, for applying configs to only a subset of clusters. Read more about the cluster-name-selector annotation and ClusterSelector object at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/cluster-scoped-objects#limiting-configs. Only set this field if a name different from the cluster's fleet membership name is used by the Config Sync cluster-name-selector annotation or ClusterSelector.",
      ).optional(),
      configSync: z.object({
        deploymentOverrides: z.array(z.object({
          containers: z.unknown().describe(
            "Optional. The containers of the deployment resource to be overridden.",
          ).optional(),
          deploymentName: z.unknown().describe(
            "Required. The name of the deployment resource to be overridden.",
          ).optional(),
          deploymentNamespace: z.unknown().describe(
            "Required. The namespace of the deployment resource to be overridden.",
          ).optional(),
        })).describe(
          "Optional. Configuration for deployment overrides. Applies only to Config Sync deployments with containers that are not a root or namespace reconciler: `reconciler-manager`, `otel-collector`, `resource-group-controller-manager`, `admission-webhook`. To override a root or namespace reconciler, use the rootsync or reposync fields at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/rootsync-reposync-fields#override-resources instead.",
        ).optional(),
        enabled: z.boolean().describe(
          "Optional. Enables the installation of Config Sync. If set to true, the Feature will manage Config Sync resources, and apply the other ConfigSync fields if they exist. If set to false, the Feature will ignore all other ConfigSync fields and delete the Config Sync resources. If omitted, ConfigSync is considered enabled if the git or oci field is present.",
        ).optional(),
        git: z.object({
          gcpServiceAccountEmail: z.string().describe(
            "Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`.",
          ).optional(),
          httpsProxy: z.string().describe(
            "Optional. URL for the HTTPS proxy to be used when communicating with the Git repo. Only specify when secret_type is `cookiefile`, `token`, or `none`.",
          ).optional(),
          policyDir: z.string().describe(
            "Optional. The path within the Git repository that represents the top level of the repo to sync. Default: the root directory of the repository.",
          ).optional(),
          secretType: z.string().describe(
            "Required. Type of secret configured for access to the Git repo. Must be one of `ssh`, `cookiefile`, `gcenode`, `token`, `gcpserviceaccount`, `githubapp` or `none`. The validation of this is case-sensitive.",
          ).optional(),
          syncBranch: z.string().describe(
            "Optional. The branch of the repository to sync from. Default: master.",
          ).optional(),
          syncRepo: z.string().describe(
            "Required. The URL of the Git repository to use as the source of truth.",
          ).optional(),
          syncRev: z.string().describe(
            "Optional. Git revision (tag or hash) to check out. Default HEAD.",
          ).optional(),
          syncWaitSecs: z.string().describe(
            "Optional. Period in seconds between consecutive syncs. Default: 15.",
          ).optional(),
        }).describe("Optional. Git repo configuration for the cluster.")
          .optional(),
        metricsGcpServiceAccountEmail: z.string().describe(
          "Optional. The Email of the Google Cloud Service Account (GSA) used for exporting Config Sync metrics to Cloud Monitoring and Cloud Monarch when Workload Identity is enabled. The GSA should have the Monitoring Metric Writer (roles/monitoring.metricWriter) IAM role. The Kubernetes ServiceAccount `default` in the namespace `config-management-monitoring` should be bound to the GSA. Deprecated: If Workload Identity Federation for GKE is enabled, Google Cloud Service Account is no longer needed for exporting Config Sync metrics: https://cloud.google.com/kubernetes-engine/enterprise/config-sync/docs/how-to/monitor-config-sync-cloud-monitoring#custom-monitoring.",
        ).optional(),
        oci: z.object({
          gcpServiceAccountEmail: z.string().describe(
            "Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`.",
          ).optional(),
          policyDir: z.string().describe(
            "Optional. The absolute path of the directory that contains the local resources. Default: the root directory of the image.",
          ).optional(),
          secretType: z.string().describe(
            "Required. Type of secret configured for access to the OCI repo. Must be one of `gcenode`, `gcpserviceaccount`, `k8sserviceaccount` or `none`. The validation of this is case-sensitive.",
          ).optional(),
          syncRepo: z.string().describe(
            "Required. The OCI image repository URL for the package to sync from. e.g. `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/PACKAGE_NAME`.",
          ).optional(),
          syncWaitSecs: z.string().describe(
            "Optional. Period in seconds between consecutive syncs. Default: 15.",
          ).optional(),
        }).describe("Optional. OCI repo configuration for the cluster.")
          .optional(),
        preventDrift: z.boolean().describe(
          "Optional. Set to true to enable the Config Sync admission webhook to prevent drifts. If set to false, disables the Config Sync admission webhook and does not prevent drifts. Defaults to false. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/prevent-config-drift for details.",
        ).optional(),
        sourceFormat: z.string().describe(
          "Optional. Specifies whether the Config Sync repo is in `hierarchical` or `unstructured` mode. Defaults to `hierarchical`. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs#organize-configs for an explanation.",
        ).optional(),
        stopSyncing: z.boolean().describe(
          "Optional. Set to true to stop syncing configs for a single cluster. Default to false.",
        ).optional(),
      }).describe("Optional. Config Sync configuration for the cluster.")
        .optional(),
      hierarchyController: z.object({
        enableHierarchicalResourceQuota: z.boolean().describe(
          "Whether hierarchical resource quota is enabled in this cluster.",
        ).optional(),
        enablePodTreeLabels: z.boolean().describe(
          "Whether pod tree labels are enabled in this cluster.",
        ).optional(),
        enabled: z.boolean().describe(
          "Whether Hierarchy Controller is enabled in this cluster.",
        ).optional(),
      }).describe(
        "Optional. Hierarchy Controller configuration for the cluster. Deprecated: Configuring Hierarchy Controller through the configmanagement feature is no longer recommended. Use https://github.com/kubernetes-sigs/hierarchical-namespaces instead.",
      ).optional(),
      management: z.enum([
        "MANAGEMENT_UNSPECIFIED",
        "MANAGEMENT_AUTOMATIC",
        "MANAGEMENT_MANUAL",
      ]).describe(
        "Optional. Deprecated: Automatic Feature management is in Preview and is unavailable in version 1.21.0 and later, after which Config Sync only supports manual upgrades. If set to manual upgrades, clear this field instead, which is behaviorally equivalent but helps prevent compatibility issues with newer fields.",
      ).optional(),
      policyController: z.object({
        auditIntervalSeconds: z.string().describe(
          "Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether.",
        ).optional(),
        enabled: z.boolean().describe(
          "Enables the installation of Policy Controller. If false, the rest of PolicyController fields take no effect.",
        ).optional(),
        exemptableNamespaces: z.array(z.string()).describe(
          "The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster.",
        ).optional(),
        logDeniesEnabled: z.boolean().describe(
          "Logs all denies and dry run failures.",
        ).optional(),
        monitoring: z.object({
          backends: z.array(z.unknown()).describe(
            "Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export.",
          ).optional(),
        }).describe("Monitoring specifies the configuration of monitoring.")
          .optional(),
        mutationEnabled: z.boolean().describe(
          "Enable or disable mutation in policy controller. If true, mutation CRDs, webhook and controller deployment will be deployed to the cluster.",
        ).optional(),
        referentialRulesEnabled: z.boolean().describe(
          "Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated.",
        ).optional(),
        templateLibraryInstalled: z.boolean().describe(
          "Installs the default template library along with Policy Controller.",
        ).optional(),
        updateTime: z.string().describe(
          "Output only. Last time this membership spec was updated.",
        ).optional(),
      }).describe(
        "Optional. Policy Controller configuration for the cluster. Deprecated: Configuring Policy Controller through the configmanagement feature is no longer recommended. Use the policycontroller feature instead.",
      ).optional(),
      version: z.string().describe(
        "Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy.",
      ).optional(),
    }).describe("Config Management FeatureSpec.").optional(),
    identityservice: z.object({
      authMethods: z.array(z.object({
        azureadConfig: z.object({
          clientId: z.unknown().describe(
            "ID for the registered client application that makes authentication requests to the Azure AD identity provider.",
          ).optional(),
          clientSecret: z.unknown().describe(
            "Input only. Unencrypted AzureAD client secret will be passed to the GKE Hub CLH.",
          ).optional(),
          encryptedClientSecret: z.unknown().describe(
            "Output only. Encrypted AzureAD client secret.",
          ).optional(),
          groupFormat: z.unknown().describe(
            "Optional. Format of the AzureAD groups that the client wants for auth.",
          ).optional(),
          kubectlRedirectUri: z.unknown().describe(
            "The redirect URL that kubectl uses for authorization.",
          ).optional(),
          tenant: z.unknown().describe(
            "Kind of Azure AD account to be authenticated. Supported values are or for accounts belonging to a specific tenant.",
          ).optional(),
          userClaim: z.unknown().describe(
            "Optional. Claim in the AzureAD ID Token that holds the user details.",
          ).optional(),
        }).describe("AzureAD specific Configuration.").optional(),
        googleConfig: z.object({
          disable: z.unknown().describe(
            "Disable automatic configuration of Google Plugin on supported platforms.",
          ).optional(),
        }).describe("GoogleConfig specific configuration").optional(),
        ldapConfig: z.object({
          group: z.unknown().describe(
            "Optional. Contains the properties for locating and authenticating groups in the directory.",
          ).optional(),
          server: z.unknown().describe(
            "Required. Server settings for the external LDAP server.",
          ).optional(),
          serviceAccount: z.unknown().describe(
            "Required. Contains the credentials of the service account which is authorized to perform the LDAP search in the directory. The credentials can be supplied by the combination of the DN and password or the client certificate.",
          ).optional(),
          user: z.unknown().describe(
            "Required. Defines where users exist in the LDAP directory.",
          ).optional(),
        }).describe("LDAP specific configuration.").optional(),
        name: z.string().describe("Identifier for auth config.").optional(),
        oidcConfig: z.object({
          certificateAuthorityData: z.unknown().describe(
            "PEM-encoded CA for OIDC provider.",
          ).optional(),
          clientId: z.unknown().describe("ID for OIDC client application.")
            .optional(),
          clientSecret: z.unknown().describe(
            "Input only. Unencrypted OIDC client secret will be passed to the GKE Hub CLH.",
          ).optional(),
          deployCloudConsoleProxy: z.unknown().describe(
            "Flag to denote if reverse proxy is used to connect to auth provider. This flag should be set to true when provider is not reachable by Google Cloud Console.",
          ).optional(),
          enableAccessToken: z.unknown().describe("Enable access token.")
            .optional(),
          encryptedClientSecret: z.unknown().describe(
            "Output only. Encrypted OIDC Client secret",
          ).optional(),
          extraParams: z.unknown().describe(
            "Comma-separated list of key-value pairs.",
          ).optional(),
          groupPrefix: z.unknown().describe("Prefix to prepend to group name.")
            .optional(),
          groupsClaim: z.unknown().describe(
            "Claim in OIDC ID token that holds group information.",
          ).optional(),
          issuerUri: z.unknown().describe(
            "URI for the OIDC provider. This should point to the level below.well-known/openid-configuration.",
          ).optional(),
          kubectlRedirectUri: z.unknown().describe(
            "Registered redirect uri to redirect users going through OAuth flow using kubectl plugin.",
          ).optional(),
          scopes: z.unknown().describe("Comma-separated list of identifiers.")
            .optional(),
          userClaim: z.unknown().describe(
            "Claim in OIDC ID token that holds username.",
          ).optional(),
          userPrefix: z.unknown().describe("Prefix to prepend to user name.")
            .optional(),
        }).describe("OIDC specific configuration.").optional(),
        proxy: z.string().describe(
          "Proxy server address to use for auth method.",
        ).optional(),
        samlConfig: z.object({
          attributeMapping: z.unknown().describe(
            'Optional. The mapping of additional user attributes like nickname, birthday and address etc.. `key` is the name of this additional attribute. `value` is a string presenting as CEL(common expression language, go/cel) used for getting the value from the resources. Take nickname as an example, in this case, `key` is "attribute.nickname" and `value` is "assertion.nickname".',
          ).optional(),
          groupPrefix: z.unknown().describe(
            "Optional. Prefix to prepend to group name.",
          ).optional(),
          groupsAttribute: z.unknown().describe(
            "Optional. The SAML attribute to read groups from. This value is expected to be a string and will be passed along as-is (with the option of being prefixed by the `group_prefix`).",
          ).optional(),
          identityProviderCertificates: z.unknown().describe(
            "Required. The list of IdP certificates to validate the SAML response against.",
          ).optional(),
          identityProviderId: z.unknown().describe(
            "Required. The entity ID of the SAML IdP.",
          ).optional(),
          identityProviderSsoUri: z.unknown().describe(
            "Required. The URI where the SAML IdP exposes the SSO service.",
          ).optional(),
          userAttribute: z.unknown().describe(
            "Optional. The SAML attribute to read username from. If unspecified, the username will be read from the NameID element of the assertion in SAML response. This value is expected to be a string and will be passed along as-is (with the option of being prefixed by the `user_prefix`).",
          ).optional(),
          userPrefix: z.unknown().describe(
            "Optional. Prefix to prepend to user name.",
          ).optional(),
        }).describe("SAML specific configuration.").optional(),
      })).describe("A member may support multiple auth methods.").optional(),
      identityServiceOptions: z.object({
        diagnosticInterface: z.object({
          enabled: z.boolean().describe(
            "Determines whether to enable the diagnostic interface.",
          ).optional(),
          expirationTime: z.string().describe(
            "Determines the expiration time of the diagnostic interface enablement. When reached, requests to the interface would be automatically rejected.",
          ).optional(),
        }).describe("Configuration options for the AIS diagnostic interface.")
          .optional(),
        sessionDuration: z.string().describe(
          "Determines the lifespan of STS tokens issued by Anthos Identity Service.",
        ).optional(),
      }).describe("Optional. non-protocol-related configuration options.")
        .optional(),
    }).describe("IdentityService FeatureSpec.").optional(),
    origin: z.object({
      type: z.enum(["TYPE_UNSPECIFIED", "FLEET", "FLEET_OUT_OF_SYNC", "USER"])
        .describe("Type specifies which type of origin is set.").optional(),
    }).describe(
      "Whether this per-Feature spec was inherited from a fleet-level default. This field can be updated by users by either overriding a Feature config (updated to USER implicitly) or setting to FLEET explicitly.",
    ).optional(),
    policycontroller: z.object({
      policyControllerHubConfig: z.object({
        auditIntervalSeconds: z.string().describe(
          "Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether.",
        ).optional(),
        constraintViolationLimit: z.string().describe(
          "The maximum number of audit violations to be stored in a constraint. If not set, the internal default (currently 20) will be used.",
        ).optional(),
        deploymentConfigs: z.record(
          z.string(),
          z.object({
            containerResources: z.unknown().describe(
              "Container resource requirements.",
            ).optional(),
            podAffinity: z.unknown().describe("Pod affinity configuration.")
              .optional(),
            podAntiAffinity: z.unknown().describe(
              "Pod anti-affinity enablement. Deprecated: use `pod_affinity` instead.",
            ).optional(),
            podTolerations: z.unknown().describe(
              "Pod tolerations of node taints.",
            ).optional(),
            replicaCount: z.unknown().describe("Pod replica count.").optional(),
          }),
        ).describe(
          "Map of deployment configs to deployments (“admission”, “audit”, “mutation”).",
        ).optional(),
        exemptableNamespaces: z.array(z.string()).describe(
          "The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster.",
        ).optional(),
        installSpec: z.enum([
          "INSTALL_SPEC_UNSPECIFIED",
          "INSTALL_SPEC_NOT_INSTALLED",
          "INSTALL_SPEC_ENABLED",
          "INSTALL_SPEC_SUSPENDED",
          "INSTALL_SPEC_DETACHED",
        ]).describe(
          "The install_spec represents the intended state specified by the latest request that mutated install_spec in the feature spec, not the lifecycle state of the feature observed by the Hub feature controller that is reported in the feature state.",
        ).optional(),
        logDeniesEnabled: z.boolean().describe(
          "Logs all denies and dry run failures.",
        ).optional(),
        monitoring: z.object({
          backends: z.array(z.unknown()).describe(
            "Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export.",
          ).optional(),
        }).describe("Monitoring specifies the configuration of monitoring.")
          .optional(),
        mutationEnabled: z.boolean().describe(
          "Enables the ability to mutate resources using Policy Controller.",
        ).optional(),
        policyContent: z.object({
          bundles: z.record(z.string(), z.unknown()).describe(
            "map of bundle name to BundleInstallSpec. The bundle name maps to the `bundleName` key in the `policycontroller.gke.io/constraintData` annotation on a constraint.",
          ).optional(),
          templateLibrary: z.object({
            installation: z.unknown().describe(
              "Configures the manner in which the template library is installed on the cluster.",
            ).optional(),
          }).describe("Configures the installation of the Template Library.")
            .optional(),
        }).describe("Specifies the desired policy content on the cluster")
          .optional(),
        referentialRulesEnabled: z.boolean().describe(
          "Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated.",
        ).optional(),
      }).describe("Policy Controller configuration for the cluster.")
        .optional(),
      version: z.string().describe("Version of Policy Controller installed.")
        .optional(),
    }).describe("Policycontroller-specific FeatureSpec.").optional(),
    rbacrolebindingactuation: z.object({}).describe(
      "Rbacrolebindingactuation-specific FeatureSpec.",
    ).optional(),
    servicemesh: z.object({
      configApi: z.enum([
        "CONFIG_API_UNSPECIFIED",
        "CONFIG_API_ISTIO",
        "CONFIG_API_GATEWAY",
      ]).describe(
        "Optional. Specifies the API that will be used for configuring the mesh workloads.",
      ).optional(),
      controlPlane: z.enum([
        "CONTROL_PLANE_MANAGEMENT_UNSPECIFIED",
        "AUTOMATIC",
        "MANUAL",
      ]).describe(
        "Deprecated: use `management` instead Enables automatic control plane management.",
      ).optional(),
      defaultChannel: z.enum([
        "CHANNEL_UNSPECIFIED",
        "RAPID",
        "REGULAR",
        "STABLE",
      ]).describe(
        "Determines which release channel to use for default injection and service mesh APIs.",
      ).optional(),
      management: z.enum([
        "MANAGEMENT_UNSPECIFIED",
        "MANAGEMENT_AUTOMATIC",
        "MANAGEMENT_MANUAL",
        "MANAGEMENT_NOT_INSTALLED",
      ]).describe("Optional. Enables automatic Service Mesh management.")
        .optional(),
    }).describe("ServiceMesh Feature Spec.").optional(),
    workloadcertificate: z.object({
      certificateManagement: z.enum([
        "CERTIFICATE_MANAGEMENT_UNSPECIFIED",
        "DISABLED",
        "ENABLED",
      ]).describe(
        "CertificateManagement specifies workload certificate management.",
      ).optional(),
    }).describe("Workloadcertificate-specific FeatureSpec.").optional(),
  }).describe("Optional. Spec of this membershipFeature.").optional(),
  featureId: z.string().describe(
    "Required. The ID of the membership_feature to create.",
  ).optional(),
  requestId: z.string().describe("Idempotent request UUID.").optional(),
  allowMissing: z.string().describe(
    "Optional. If set to true, and the MembershipFeature is not found, a new MembershipFeature will be created. In this situation, `update_mask` is ignored.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lifecycleState: z.object({
    state: z.string(),
  }).optional(),
  name: z.string(),
  spec: z.object({
    cloudbuild: z.object({
      securityPolicy: z.string(),
      version: z.string(),
    }),
    configmanagement: z.object({
      binauthz: z.object({
        enabled: z.boolean(),
      }),
      cluster: z.string(),
      configSync: z.object({
        deploymentOverrides: z.array(z.object({
          containers: z.unknown(),
          deploymentName: z.unknown(),
          deploymentNamespace: z.unknown(),
        })),
        enabled: z.boolean(),
        git: z.object({
          gcpServiceAccountEmail: z.string(),
          httpsProxy: z.string(),
          policyDir: z.string(),
          secretType: z.string(),
          syncBranch: z.string(),
          syncRepo: z.string(),
          syncRev: z.string(),
          syncWaitSecs: z.string(),
        }),
        metricsGcpServiceAccountEmail: z.string(),
        oci: z.object({
          gcpServiceAccountEmail: z.string(),
          policyDir: z.string(),
          secretType: z.string(),
          syncRepo: z.string(),
          syncWaitSecs: z.string(),
        }),
        preventDrift: z.boolean(),
        sourceFormat: z.string(),
        stopSyncing: z.boolean(),
      }),
      hierarchyController: z.object({
        enableHierarchicalResourceQuota: z.boolean(),
        enablePodTreeLabels: z.boolean(),
        enabled: z.boolean(),
      }),
      management: z.string(),
      policyController: z.object({
        auditIntervalSeconds: z.string(),
        enabled: z.boolean(),
        exemptableNamespaces: z.array(z.string()),
        logDeniesEnabled: z.boolean(),
        monitoring: z.object({
          backends: z.array(z.unknown()),
        }),
        mutationEnabled: z.boolean(),
        referentialRulesEnabled: z.boolean(),
        templateLibraryInstalled: z.boolean(),
        updateTime: z.string(),
      }),
      version: z.string(),
    }),
    identityservice: z.object({
      authMethods: z.array(z.object({
        azureadConfig: z.object({
          clientId: z.unknown(),
          clientSecret: z.unknown(),
          encryptedClientSecret: z.unknown(),
          groupFormat: z.unknown(),
          kubectlRedirectUri: z.unknown(),
          tenant: z.unknown(),
          userClaim: z.unknown(),
        }),
        googleConfig: z.object({
          disable: z.unknown(),
        }),
        ldapConfig: z.object({
          group: z.unknown(),
          server: z.unknown(),
          serviceAccount: z.unknown(),
          user: z.unknown(),
        }),
        name: z.string(),
        oidcConfig: z.object({
          certificateAuthorityData: z.unknown(),
          clientId: z.unknown(),
          clientSecret: z.unknown(),
          deployCloudConsoleProxy: z.unknown(),
          enableAccessToken: z.unknown(),
          encryptedClientSecret: z.unknown(),
          extraParams: z.unknown(),
          groupPrefix: z.unknown(),
          groupsClaim: z.unknown(),
          issuerUri: z.unknown(),
          kubectlRedirectUri: z.unknown(),
          scopes: z.unknown(),
          userClaim: z.unknown(),
          userPrefix: z.unknown(),
        }),
        proxy: z.string(),
        samlConfig: z.object({
          attributeMapping: z.unknown(),
          groupPrefix: z.unknown(),
          groupsAttribute: z.unknown(),
          identityProviderCertificates: z.unknown(),
          identityProviderId: z.unknown(),
          identityProviderSsoUri: z.unknown(),
          userAttribute: z.unknown(),
          userPrefix: z.unknown(),
        }),
      })),
      identityServiceOptions: z.object({
        diagnosticInterface: z.object({
          enabled: z.boolean(),
          expirationTime: z.string(),
        }),
        sessionDuration: z.string(),
      }),
    }),
    origin: z.object({
      type: z.string(),
    }),
    policycontroller: z.object({
      policyControllerHubConfig: z.object({
        auditIntervalSeconds: z.string(),
        constraintViolationLimit: z.string(),
        deploymentConfigs: z.record(z.string(), z.unknown()),
        exemptableNamespaces: z.array(z.string()),
        installSpec: z.string(),
        logDeniesEnabled: z.boolean(),
        monitoring: z.object({
          backends: z.array(z.unknown()),
        }),
        mutationEnabled: z.boolean(),
        policyContent: z.object({
          bundles: z.record(z.string(), z.unknown()),
          templateLibrary: z.object({
            installation: z.unknown(),
          }),
        }),
        referentialRulesEnabled: z.boolean(),
      }),
      version: z.string(),
    }),
    rbacrolebindingactuation: z.object({}),
    servicemesh: z.object({
      configApi: z.string(),
      controlPlane: z.string(),
      defaultChannel: z.string(),
      management: z.string(),
    }),
    workloadcertificate: z.object({
      certificateManagement: z.string(),
    }),
  }).optional(),
  state: z.object({
    appdevexperience: z.object({
      networkingInstallSucceeded: z.object({
        code: z.string(),
        description: z.string(),
      }),
    }),
    clusterupgrade: z.object({
      ignored: z.object({
        ignoredTime: z.string(),
        reason: z.string(),
      }),
      upgrades: z.array(z.object({
        status: z.object({
          code: z.unknown(),
          reason: z.unknown(),
          updateTime: z.unknown(),
        }),
        upgrade: z.object({
          name: z.unknown(),
          version: z.unknown(),
        }),
      })),
    }),
    configmanagement: z.object({
      binauthzState: z.object({
        version: z.object({
          webhookVersion: z.string(),
        }),
        webhook: z.string(),
      }),
      clusterName: z.string(),
      configSyncState: z.object({
        clusterLevelStopSyncingState: z.string(),
        crCount: z.number(),
        deploymentState: z.object({
          admissionWebhook: z.string(),
          gitSync: z.string(),
          importer: z.string(),
          monitor: z.string(),
          otelCollector: z.string(),
          reconcilerManager: z.string(),
          resourceGroupControllerManager: z.string(),
          rootReconciler: z.string(),
          syncer: z.string(),
        }),
        errors: z.array(z.object({
          errorMessage: z.unknown(),
        })),
        reposyncCrd: z.string(),
        rootsyncCrd: z.string(),
        state: z.string(),
        syncState: z.object({
          code: z.string(),
          errors: z.array(z.unknown()),
          importToken: z.string(),
          lastSync: z.string(),
          lastSyncTime: z.string(),
          sourceToken: z.string(),
          syncToken: z.string(),
        }),
        version: z.object({
          admissionWebhook: z.string(),
          gitSync: z.string(),
          importer: z.string(),
          monitor: z.string(),
          otelCollector: z.string(),
          reconcilerManager: z.string(),
          resourceGroupControllerManager: z.string(),
          rootReconciler: z.string(),
          syncer: z.string(),
        }),
      }),
      hierarchyControllerState: z.object({
        state: z.object({
          extension: z.string(),
          hnc: z.string(),
        }),
        version: z.object({
          extension: z.string(),
          hnc: z.string(),
        }),
      }),
      kubernetesApiServerVersion: z.string(),
      membershipSpec: z.object({
        binauthz: z.object({
          enabled: z.boolean(),
        }),
        cluster: z.string(),
        configSync: z.object({
          deploymentOverrides: z.array(z.unknown()),
          enabled: z.boolean(),
          git: z.object({
            gcpServiceAccountEmail: z.unknown(),
            httpsProxy: z.unknown(),
            policyDir: z.unknown(),
            secretType: z.unknown(),
            syncBranch: z.unknown(),
            syncRepo: z.unknown(),
            syncRev: z.unknown(),
            syncWaitSecs: z.unknown(),
          }),
          metricsGcpServiceAccountEmail: z.string(),
          oci: z.object({
            gcpServiceAccountEmail: z.unknown(),
            policyDir: z.unknown(),
            secretType: z.unknown(),
            syncRepo: z.unknown(),
            syncWaitSecs: z.unknown(),
          }),
          preventDrift: z.boolean(),
          sourceFormat: z.string(),
          stopSyncing: z.boolean(),
        }),
        hierarchyController: z.object({
          enableHierarchicalResourceQuota: z.boolean(),
          enablePodTreeLabels: z.boolean(),
          enabled: z.boolean(),
        }),
        management: z.string(),
        policyController: z.object({
          auditIntervalSeconds: z.string(),
          enabled: z.boolean(),
          exemptableNamespaces: z.array(z.unknown()),
          logDeniesEnabled: z.boolean(),
          monitoring: z.object({
            backends: z.unknown(),
          }),
          mutationEnabled: z.boolean(),
          referentialRulesEnabled: z.boolean(),
          templateLibraryInstalled: z.boolean(),
          updateTime: z.string(),
        }),
        version: z.string(),
      }),
      operatorState: z.object({
        deploymentState: z.string(),
        errors: z.array(z.object({
          errorMessage: z.unknown(),
        })),
        version: z.string(),
      }),
      policyControllerState: z.object({
        deploymentState: z.object({
          gatekeeperAudit: z.string(),
          gatekeeperControllerManagerState: z.string(),
          gatekeeperMutation: z.string(),
        }),
        migration: z.object({
          copyTime: z.string(),
          stage: z.string(),
        }),
        version: z.object({
          version: z.string(),
        }),
      }),
    }),
    identityservice: z.object({
      failureReason: z.string(),
      installedVersion: z.string(),
      memberConfig: z.object({
        authMethods: z.array(z.object({
          azureadConfig: z.unknown(),
          googleConfig: z.unknown(),
          ldapConfig: z.unknown(),
          name: z.unknown(),
          oidcConfig: z.unknown(),
          proxy: z.unknown(),
          samlConfig: z.unknown(),
        })),
        identityServiceOptions: z.object({
          diagnosticInterface: z.object({
            enabled: z.unknown(),
            expirationTime: z.unknown(),
          }),
          sessionDuration: z.string(),
        }),
      }),
      state: z.string(),
    }),
    metering: z.object({
      lastMeasurementTime: z.string(),
      preciseLastMeasuredClusterVcpuCapacity: z.number(),
    }),
    policycontroller: z.object({
      componentStates: z.record(z.string(), z.unknown()),
      policyContentState: z.object({
        bundleStates: z.record(z.string(), z.unknown()),
        referentialSyncConfigState: z.object({
          details: z.string(),
          state: z.string(),
        }),
        templateLibraryState: z.object({
          details: z.string(),
          state: z.string(),
        }),
      }),
      state: z.string(),
    }),
    rbacrolebindingactuation: z.object({
      rbacrolebindingStates: z.record(z.string(), z.unknown()),
    }),
    servicemesh: z.object({
      analysisMessages: z.array(z.object({
        args: z.record(z.string(), z.unknown()),
        description: z.string(),
        messageBase: z.object({
          documentationUrl: z.unknown(),
          level: z.unknown(),
          type: z.unknown(),
        }),
        resourcePaths: z.array(z.unknown()),
      })),
      conditions: z.array(z.object({
        code: z.string(),
        details: z.string(),
        documentationLink: z.string(),
        severity: z.string(),
      })),
      configApiVersion: z.string(),
      controlPlaneManagement: z.object({
        details: z.array(z.object({
          code: z.unknown(),
          details: z.unknown(),
        })),
        implementation: z.string(),
        state: z.string(),
      }),
      dataPlaneManagement: z.object({
        details: z.array(z.object({
          code: z.unknown(),
          details: z.unknown(),
        })),
        state: z.string(),
      }),
    }),
    state: z.object({
      code: z.string(),
      description: z.string(),
      updateTime: z.string(),
    }),
    workloadidentity: z.object({
      description: z.string(),
      identityProviderStateDetails: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
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
  labels: z.record(z.string(), z.string()).describe(
    "Google Cloud labels for this MembershipFeature.",
  ).optional(),
  spec: z.object({
    cloudbuild: z.object({
      securityPolicy: z.enum([
        "SECURITY_POLICY_UNSPECIFIED",
        "NON_PRIVILEGED",
        "PRIVILEGED",
      ]).describe(
        "Whether it is allowed to run the privileged builds on the cluster or not.",
      ).optional(),
      version: z.string().describe(
        "Version of the cloud build software on the cluster.",
      ).optional(),
    }).describe("Cloudbuild-specific FeatureSpec.").optional(),
    configmanagement: z.object({
      binauthz: z.object({
        enabled: z.boolean().describe(
          "Whether binauthz is enabled in this cluster.",
        ).optional(),
      }).describe(
        "Optional. Deprecated: Binauthz configuration will be ignored and should not be set.",
      ).optional(),
      cluster: z.string().describe(
        "Optional. User-specified cluster name used by the Config Sync cluster-name-selector annotation or ClusterSelector object, for applying configs to only a subset of clusters. Read more about the cluster-name-selector annotation and ClusterSelector object at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/cluster-scoped-objects#limiting-configs. Only set this field if a name different from the cluster's fleet membership name is used by the Config Sync cluster-name-selector annotation or ClusterSelector.",
      ).optional(),
      configSync: z.object({
        deploymentOverrides: z.array(z.object({
          containers: z.unknown().describe(
            "Optional. The containers of the deployment resource to be overridden.",
          ).optional(),
          deploymentName: z.unknown().describe(
            "Required. The name of the deployment resource to be overridden.",
          ).optional(),
          deploymentNamespace: z.unknown().describe(
            "Required. The namespace of the deployment resource to be overridden.",
          ).optional(),
        })).describe(
          "Optional. Configuration for deployment overrides. Applies only to Config Sync deployments with containers that are not a root or namespace reconciler: `reconciler-manager`, `otel-collector`, `resource-group-controller-manager`, `admission-webhook`. To override a root or namespace reconciler, use the rootsync or reposync fields at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/rootsync-reposync-fields#override-resources instead.",
        ).optional(),
        enabled: z.boolean().describe(
          "Optional. Enables the installation of Config Sync. If set to true, the Feature will manage Config Sync resources, and apply the other ConfigSync fields if they exist. If set to false, the Feature will ignore all other ConfigSync fields and delete the Config Sync resources. If omitted, ConfigSync is considered enabled if the git or oci field is present.",
        ).optional(),
        git: z.object({
          gcpServiceAccountEmail: z.string().describe(
            "Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`.",
          ).optional(),
          httpsProxy: z.string().describe(
            "Optional. URL for the HTTPS proxy to be used when communicating with the Git repo. Only specify when secret_type is `cookiefile`, `token`, or `none`.",
          ).optional(),
          policyDir: z.string().describe(
            "Optional. The path within the Git repository that represents the top level of the repo to sync. Default: the root directory of the repository.",
          ).optional(),
          secretType: z.string().describe(
            "Required. Type of secret configured for access to the Git repo. Must be one of `ssh`, `cookiefile`, `gcenode`, `token`, `gcpserviceaccount`, `githubapp` or `none`. The validation of this is case-sensitive.",
          ).optional(),
          syncBranch: z.string().describe(
            "Optional. The branch of the repository to sync from. Default: master.",
          ).optional(),
          syncRepo: z.string().describe(
            "Required. The URL of the Git repository to use as the source of truth.",
          ).optional(),
          syncRev: z.string().describe(
            "Optional. Git revision (tag or hash) to check out. Default HEAD.",
          ).optional(),
          syncWaitSecs: z.string().describe(
            "Optional. Period in seconds between consecutive syncs. Default: 15.",
          ).optional(),
        }).describe("Optional. Git repo configuration for the cluster.")
          .optional(),
        metricsGcpServiceAccountEmail: z.string().describe(
          "Optional. The Email of the Google Cloud Service Account (GSA) used for exporting Config Sync metrics to Cloud Monitoring and Cloud Monarch when Workload Identity is enabled. The GSA should have the Monitoring Metric Writer (roles/monitoring.metricWriter) IAM role. The Kubernetes ServiceAccount `default` in the namespace `config-management-monitoring` should be bound to the GSA. Deprecated: If Workload Identity Federation for GKE is enabled, Google Cloud Service Account is no longer needed for exporting Config Sync metrics: https://cloud.google.com/kubernetes-engine/enterprise/config-sync/docs/how-to/monitor-config-sync-cloud-monitoring#custom-monitoring.",
        ).optional(),
        oci: z.object({
          gcpServiceAccountEmail: z.string().describe(
            "Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`.",
          ).optional(),
          policyDir: z.string().describe(
            "Optional. The absolute path of the directory that contains the local resources. Default: the root directory of the image.",
          ).optional(),
          secretType: z.string().describe(
            "Required. Type of secret configured for access to the OCI repo. Must be one of `gcenode`, `gcpserviceaccount`, `k8sserviceaccount` or `none`. The validation of this is case-sensitive.",
          ).optional(),
          syncRepo: z.string().describe(
            "Required. The OCI image repository URL for the package to sync from. e.g. `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/PACKAGE_NAME`.",
          ).optional(),
          syncWaitSecs: z.string().describe(
            "Optional. Period in seconds between consecutive syncs. Default: 15.",
          ).optional(),
        }).describe("Optional. OCI repo configuration for the cluster.")
          .optional(),
        preventDrift: z.boolean().describe(
          "Optional. Set to true to enable the Config Sync admission webhook to prevent drifts. If set to false, disables the Config Sync admission webhook and does not prevent drifts. Defaults to false. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/prevent-config-drift for details.",
        ).optional(),
        sourceFormat: z.string().describe(
          "Optional. Specifies whether the Config Sync repo is in `hierarchical` or `unstructured` mode. Defaults to `hierarchical`. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs#organize-configs for an explanation.",
        ).optional(),
        stopSyncing: z.boolean().describe(
          "Optional. Set to true to stop syncing configs for a single cluster. Default to false.",
        ).optional(),
      }).describe("Optional. Config Sync configuration for the cluster.")
        .optional(),
      hierarchyController: z.object({
        enableHierarchicalResourceQuota: z.boolean().describe(
          "Whether hierarchical resource quota is enabled in this cluster.",
        ).optional(),
        enablePodTreeLabels: z.boolean().describe(
          "Whether pod tree labels are enabled in this cluster.",
        ).optional(),
        enabled: z.boolean().describe(
          "Whether Hierarchy Controller is enabled in this cluster.",
        ).optional(),
      }).describe(
        "Optional. Hierarchy Controller configuration for the cluster. Deprecated: Configuring Hierarchy Controller through the configmanagement feature is no longer recommended. Use https://github.com/kubernetes-sigs/hierarchical-namespaces instead.",
      ).optional(),
      management: z.enum([
        "MANAGEMENT_UNSPECIFIED",
        "MANAGEMENT_AUTOMATIC",
        "MANAGEMENT_MANUAL",
      ]).describe(
        "Optional. Deprecated: Automatic Feature management is in Preview and is unavailable in version 1.21.0 and later, after which Config Sync only supports manual upgrades. If set to manual upgrades, clear this field instead, which is behaviorally equivalent but helps prevent compatibility issues with newer fields.",
      ).optional(),
      policyController: z.object({
        auditIntervalSeconds: z.string().describe(
          "Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether.",
        ).optional(),
        enabled: z.boolean().describe(
          "Enables the installation of Policy Controller. If false, the rest of PolicyController fields take no effect.",
        ).optional(),
        exemptableNamespaces: z.array(z.string()).describe(
          "The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster.",
        ).optional(),
        logDeniesEnabled: z.boolean().describe(
          "Logs all denies and dry run failures.",
        ).optional(),
        monitoring: z.object({
          backends: z.array(z.unknown()).describe(
            "Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export.",
          ).optional(),
        }).describe("Monitoring specifies the configuration of monitoring.")
          .optional(),
        mutationEnabled: z.boolean().describe(
          "Enable or disable mutation in policy controller. If true, mutation CRDs, webhook and controller deployment will be deployed to the cluster.",
        ).optional(),
        referentialRulesEnabled: z.boolean().describe(
          "Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated.",
        ).optional(),
        templateLibraryInstalled: z.boolean().describe(
          "Installs the default template library along with Policy Controller.",
        ).optional(),
        updateTime: z.string().describe(
          "Output only. Last time this membership spec was updated.",
        ).optional(),
      }).describe(
        "Optional. Policy Controller configuration for the cluster. Deprecated: Configuring Policy Controller through the configmanagement feature is no longer recommended. Use the policycontroller feature instead.",
      ).optional(),
      version: z.string().describe(
        "Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy.",
      ).optional(),
    }).describe("Config Management FeatureSpec.").optional(),
    identityservice: z.object({
      authMethods: z.array(z.object({
        azureadConfig: z.object({
          clientId: z.unknown().describe(
            "ID for the registered client application that makes authentication requests to the Azure AD identity provider.",
          ).optional(),
          clientSecret: z.unknown().describe(
            "Input only. Unencrypted AzureAD client secret will be passed to the GKE Hub CLH.",
          ).optional(),
          encryptedClientSecret: z.unknown().describe(
            "Output only. Encrypted AzureAD client secret.",
          ).optional(),
          groupFormat: z.unknown().describe(
            "Optional. Format of the AzureAD groups that the client wants for auth.",
          ).optional(),
          kubectlRedirectUri: z.unknown().describe(
            "The redirect URL that kubectl uses for authorization.",
          ).optional(),
          tenant: z.unknown().describe(
            "Kind of Azure AD account to be authenticated. Supported values are or for accounts belonging to a specific tenant.",
          ).optional(),
          userClaim: z.unknown().describe(
            "Optional. Claim in the AzureAD ID Token that holds the user details.",
          ).optional(),
        }).describe("AzureAD specific Configuration.").optional(),
        googleConfig: z.object({
          disable: z.unknown().describe(
            "Disable automatic configuration of Google Plugin on supported platforms.",
          ).optional(),
        }).describe("GoogleConfig specific configuration").optional(),
        ldapConfig: z.object({
          group: z.unknown().describe(
            "Optional. Contains the properties for locating and authenticating groups in the directory.",
          ).optional(),
          server: z.unknown().describe(
            "Required. Server settings for the external LDAP server.",
          ).optional(),
          serviceAccount: z.unknown().describe(
            "Required. Contains the credentials of the service account which is authorized to perform the LDAP search in the directory. The credentials can be supplied by the combination of the DN and password or the client certificate.",
          ).optional(),
          user: z.unknown().describe(
            "Required. Defines where users exist in the LDAP directory.",
          ).optional(),
        }).describe("LDAP specific configuration.").optional(),
        name: z.string().describe("Identifier for auth config.").optional(),
        oidcConfig: z.object({
          certificateAuthorityData: z.unknown().describe(
            "PEM-encoded CA for OIDC provider.",
          ).optional(),
          clientId: z.unknown().describe("ID for OIDC client application.")
            .optional(),
          clientSecret: z.unknown().describe(
            "Input only. Unencrypted OIDC client secret will be passed to the GKE Hub CLH.",
          ).optional(),
          deployCloudConsoleProxy: z.unknown().describe(
            "Flag to denote if reverse proxy is used to connect to auth provider. This flag should be set to true when provider is not reachable by Google Cloud Console.",
          ).optional(),
          enableAccessToken: z.unknown().describe("Enable access token.")
            .optional(),
          encryptedClientSecret: z.unknown().describe(
            "Output only. Encrypted OIDC Client secret",
          ).optional(),
          extraParams: z.unknown().describe(
            "Comma-separated list of key-value pairs.",
          ).optional(),
          groupPrefix: z.unknown().describe("Prefix to prepend to group name.")
            .optional(),
          groupsClaim: z.unknown().describe(
            "Claim in OIDC ID token that holds group information.",
          ).optional(),
          issuerUri: z.unknown().describe(
            "URI for the OIDC provider. This should point to the level below.well-known/openid-configuration.",
          ).optional(),
          kubectlRedirectUri: z.unknown().describe(
            "Registered redirect uri to redirect users going through OAuth flow using kubectl plugin.",
          ).optional(),
          scopes: z.unknown().describe("Comma-separated list of identifiers.")
            .optional(),
          userClaim: z.unknown().describe(
            "Claim in OIDC ID token that holds username.",
          ).optional(),
          userPrefix: z.unknown().describe("Prefix to prepend to user name.")
            .optional(),
        }).describe("OIDC specific configuration.").optional(),
        proxy: z.string().describe(
          "Proxy server address to use for auth method.",
        ).optional(),
        samlConfig: z.object({
          attributeMapping: z.unknown().describe(
            'Optional. The mapping of additional user attributes like nickname, birthday and address etc.. `key` is the name of this additional attribute. `value` is a string presenting as CEL(common expression language, go/cel) used for getting the value from the resources. Take nickname as an example, in this case, `key` is "attribute.nickname" and `value` is "assertion.nickname".',
          ).optional(),
          groupPrefix: z.unknown().describe(
            "Optional. Prefix to prepend to group name.",
          ).optional(),
          groupsAttribute: z.unknown().describe(
            "Optional. The SAML attribute to read groups from. This value is expected to be a string and will be passed along as-is (with the option of being prefixed by the `group_prefix`).",
          ).optional(),
          identityProviderCertificates: z.unknown().describe(
            "Required. The list of IdP certificates to validate the SAML response against.",
          ).optional(),
          identityProviderId: z.unknown().describe(
            "Required. The entity ID of the SAML IdP.",
          ).optional(),
          identityProviderSsoUri: z.unknown().describe(
            "Required. The URI where the SAML IdP exposes the SSO service.",
          ).optional(),
          userAttribute: z.unknown().describe(
            "Optional. The SAML attribute to read username from. If unspecified, the username will be read from the NameID element of the assertion in SAML response. This value is expected to be a string and will be passed along as-is (with the option of being prefixed by the `user_prefix`).",
          ).optional(),
          userPrefix: z.unknown().describe(
            "Optional. Prefix to prepend to user name.",
          ).optional(),
        }).describe("SAML specific configuration.").optional(),
      })).describe("A member may support multiple auth methods.").optional(),
      identityServiceOptions: z.object({
        diagnosticInterface: z.object({
          enabled: z.boolean().describe(
            "Determines whether to enable the diagnostic interface.",
          ).optional(),
          expirationTime: z.string().describe(
            "Determines the expiration time of the diagnostic interface enablement. When reached, requests to the interface would be automatically rejected.",
          ).optional(),
        }).describe("Configuration options for the AIS diagnostic interface.")
          .optional(),
        sessionDuration: z.string().describe(
          "Determines the lifespan of STS tokens issued by Anthos Identity Service.",
        ).optional(),
      }).describe("Optional. non-protocol-related configuration options.")
        .optional(),
    }).describe("IdentityService FeatureSpec.").optional(),
    origin: z.object({
      type: z.enum(["TYPE_UNSPECIFIED", "FLEET", "FLEET_OUT_OF_SYNC", "USER"])
        .describe("Type specifies which type of origin is set.").optional(),
    }).describe(
      "Whether this per-Feature spec was inherited from a fleet-level default. This field can be updated by users by either overriding a Feature config (updated to USER implicitly) or setting to FLEET explicitly.",
    ).optional(),
    policycontroller: z.object({
      policyControllerHubConfig: z.object({
        auditIntervalSeconds: z.string().describe(
          "Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether.",
        ).optional(),
        constraintViolationLimit: z.string().describe(
          "The maximum number of audit violations to be stored in a constraint. If not set, the internal default (currently 20) will be used.",
        ).optional(),
        deploymentConfigs: z.record(
          z.string(),
          z.object({
            containerResources: z.unknown().describe(
              "Container resource requirements.",
            ).optional(),
            podAffinity: z.unknown().describe("Pod affinity configuration.")
              .optional(),
            podAntiAffinity: z.unknown().describe(
              "Pod anti-affinity enablement. Deprecated: use `pod_affinity` instead.",
            ).optional(),
            podTolerations: z.unknown().describe(
              "Pod tolerations of node taints.",
            ).optional(),
            replicaCount: z.unknown().describe("Pod replica count.").optional(),
          }),
        ).describe(
          "Map of deployment configs to deployments (“admission”, “audit”, “mutation”).",
        ).optional(),
        exemptableNamespaces: z.array(z.string()).describe(
          "The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster.",
        ).optional(),
        installSpec: z.enum([
          "INSTALL_SPEC_UNSPECIFIED",
          "INSTALL_SPEC_NOT_INSTALLED",
          "INSTALL_SPEC_ENABLED",
          "INSTALL_SPEC_SUSPENDED",
          "INSTALL_SPEC_DETACHED",
        ]).describe(
          "The install_spec represents the intended state specified by the latest request that mutated install_spec in the feature spec, not the lifecycle state of the feature observed by the Hub feature controller that is reported in the feature state.",
        ).optional(),
        logDeniesEnabled: z.boolean().describe(
          "Logs all denies and dry run failures.",
        ).optional(),
        monitoring: z.object({
          backends: z.array(z.unknown()).describe(
            "Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export.",
          ).optional(),
        }).describe("Monitoring specifies the configuration of monitoring.")
          .optional(),
        mutationEnabled: z.boolean().describe(
          "Enables the ability to mutate resources using Policy Controller.",
        ).optional(),
        policyContent: z.object({
          bundles: z.record(z.string(), z.unknown()).describe(
            "map of bundle name to BundleInstallSpec. The bundle name maps to the `bundleName` key in the `policycontroller.gke.io/constraintData` annotation on a constraint.",
          ).optional(),
          templateLibrary: z.object({
            installation: z.unknown().describe(
              "Configures the manner in which the template library is installed on the cluster.",
            ).optional(),
          }).describe("Configures the installation of the Template Library.")
            .optional(),
        }).describe("Specifies the desired policy content on the cluster")
          .optional(),
        referentialRulesEnabled: z.boolean().describe(
          "Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated.",
        ).optional(),
      }).describe("Policy Controller configuration for the cluster.")
        .optional(),
      version: z.string().describe("Version of Policy Controller installed.")
        .optional(),
    }).describe("Policycontroller-specific FeatureSpec.").optional(),
    rbacrolebindingactuation: z.object({}).describe(
      "Rbacrolebindingactuation-specific FeatureSpec.",
    ).optional(),
    servicemesh: z.object({
      configApi: z.enum([
        "CONFIG_API_UNSPECIFIED",
        "CONFIG_API_ISTIO",
        "CONFIG_API_GATEWAY",
      ]).describe(
        "Optional. Specifies the API that will be used for configuring the mesh workloads.",
      ).optional(),
      controlPlane: z.enum([
        "CONTROL_PLANE_MANAGEMENT_UNSPECIFIED",
        "AUTOMATIC",
        "MANUAL",
      ]).describe(
        "Deprecated: use `management` instead Enables automatic control plane management.",
      ).optional(),
      defaultChannel: z.enum([
        "CHANNEL_UNSPECIFIED",
        "RAPID",
        "REGULAR",
        "STABLE",
      ]).describe(
        "Determines which release channel to use for default injection and service mesh APIs.",
      ).optional(),
      management: z.enum([
        "MANAGEMENT_UNSPECIFIED",
        "MANAGEMENT_AUTOMATIC",
        "MANAGEMENT_MANUAL",
        "MANAGEMENT_NOT_INSTALLED",
      ]).describe("Optional. Enables automatic Service Mesh management.")
        .optional(),
    }).describe("ServiceMesh Feature Spec.").optional(),
    workloadcertificate: z.object({
      certificateManagement: z.enum([
        "CERTIFICATE_MANAGEMENT_UNSPECIFIED",
        "DISABLED",
        "ENABLED",
      ]).describe(
        "CertificateManagement specifies workload certificate management.",
      ).optional(),
    }).describe("Workloadcertificate-specific FeatureSpec.").optional(),
  }).describe("Optional. Spec of this membershipFeature.").optional(),
  featureId: z.string().describe(
    "Required. The ID of the membership_feature to create.",
  ).optional(),
  requestId: z.string().describe("Idempotent request UUID.").optional(),
  allowMissing: z.string().describe(
    "Optional. If set to true, and the MembershipFeature is not found, a new MembershipFeature will be created. In this situation, `update_mask` is ignored.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud GKE Hub Memberships.Features. Registered at `@swamp/gcp/gkehub/memberships-features`. */
export const model = {
  type: "@swamp/gcp/gkehub/memberships-features",
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
      toVersion: "2026.06.05.1",
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
      toVersion: "2026.06.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.3",
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
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: lifecycleState, state",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { lifecycleState: _lifecycleState, state: _state, ...rest } = old;
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
      toVersion: "2026.07.21.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.25.1",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "MembershipFeature represents the settings and status of a Fleet Feature enabl...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a features",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["featureId"] !== undefined) {
          params["featureId"] = String(g["featureId"]);
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
      description: "Get a features",
      arguments: z.object({
        identifier: z.string().describe("The name of the features"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update features attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific features by name (e.g. one discovered by list)",
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
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
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
      description: "Delete the features",
      arguments: z.object({
        identifier: z.string().describe("The name of the features"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync features state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific features by name (e.g. one discovered by list)",
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
              String(g["parent"] ?? ""),
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
      description: "List features resources",
      arguments: z.object({
        filter: z.string().describe(
          'Lists MembershipFeatures that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Examples: - Feature with the name "helloworld" in project "foo-proj" and membership "member-bar": name = "projects/foo-proj/locations/global/memberships/member-bar/features/helloworld" - Features that have a label called `foo`: labels.foo:* - Features that have a label called `foo` whose value is `bar`: labels.foo = bar',
        ).optional(),
        orderBy: z.string().describe(
          "One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering.",
        ).optional(),
        pageSize: z.number().describe(
          "When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
          "membershipFeatures",
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
  },
};
