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

// Auto-generated extension model for @swamp/gcp/gkehub/features
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE Hub Features.
 *
 * Feature represents the settings and status of any Fleet Feature.
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
  "id": "gkehub.projects.locations.features.get",
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
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "gkehub.projects.locations.features.create",
  "path": "v1/{+parent}/features",
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
  "id": "gkehub.projects.locations.features.patch",
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
  "id": "gkehub.projects.locations.features.delete",
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
  "id": "gkehub.projects.locations.features.list",
  "path": "v1/{+parent}/features",
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
    "returnPartialSuccess": {
      "location": "query",
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
  fleetDefaultMemberConfig: z.object({
    configmanagement: z.object({
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
        }).describe("Git repo configuration for a single cluster.").optional(),
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
        }).describe("OCI repo configuration for a single cluster").optional(),
        preventDrift: z.boolean().describe(
          "Optional. Set to true to enable the Config Sync admission webhook to prevent drifts. If set to false, disables the Config Sync admission webhook and does not prevent drifts. Defaults to false. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/prevent-config-drift for details.",
        ).optional(),
        sourceFormat: z.string().describe(
          "Optional. Specifies whether the Config Sync repo is in `hierarchical` or `unstructured` mode. Defaults to `hierarchical`. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs#organize-configs for an explanation.",
        ).optional(),
        stopSyncing: z.boolean().describe(
          "Optional. Set to true to stop syncing configs for a single cluster. Default to false.",
        ).optional(),
      }).describe("Configuration for Config Sync").optional(),
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
      }).describe("Configuration for Hierarchy Controller").optional(),
      management: z.enum([
        "MANAGEMENT_UNSPECIFIED",
        "MANAGEMENT_AUTOMATIC",
        "MANAGEMENT_MANUAL",
      ]).describe(
        "Optional. Deprecated: From version 1.21.0, automatic Feature management is unavailable, and Config Sync only supports manual upgrades.",
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
        }).describe(
          'PolicyControllerMonitoring specifies the backends Policy Controller should export metrics to. For example, to specify metrics should be exported to Cloud Monitoring and Prometheus, specify backends: ["cloudmonitoring", "prometheus"]',
        ).optional(),
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
      }).describe("Configuration for Policy Controller").optional(),
      version: z.string().describe(
        "Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy.",
      ).optional(),
    }).describe(
      "**Anthos Config Management**: Configuration for a single cluster. Intended to parallel the ConfigManagement CR.",
    ).optional(),
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
        }).describe("Configuration for the AzureAD Auth flow.").optional(),
        googleConfig: z.object({
          disable: z.unknown().describe(
            "Disable automatic configuration of Google Plugin on supported platforms.",
          ).optional(),
        }).describe("Configuration for the Google Plugin Auth flow.")
          .optional(),
        ldapConfig: z.object({
          group: z.unknown().describe(
            "Contains the properties for locating and authenticating groups in the directory.",
          ).optional(),
          server: z.unknown().describe(
            "Server settings for the external LDAP server.",
          ).optional(),
          serviceAccount: z.unknown().describe(
            "Contains the credentials of the service account which is authorized to perform the LDAP search in the directory. The credentials can be supplied by the combination of the DN and password or the client certificate.",
          ).optional(),
          user: z.unknown().describe(
            "Defines where users exist in the LDAP directory.",
          ).optional(),
        }).describe("Configuration for the LDAP Auth flow.").optional(),
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
        }).describe("Configuration for OIDC Auth flow.").optional(),
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
        }).describe("Configuration for the SAML Auth flow.").optional(),
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
      }).describe("Holds non-protocol-related configuration options.")
        .optional(),
    }).describe(
      "**Anthos Identity Service**: Configuration for a single Membership.",
    ).optional(),
    mesh: z.object({
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
      management: z.enum([
        "MANAGEMENT_UNSPECIFIED",
        "MANAGEMENT_AUTOMATIC",
        "MANAGEMENT_MANUAL",
        "MANAGEMENT_NOT_INSTALLED",
      ]).describe("Optional. Enables automatic Service Mesh management.")
        .optional(),
    }).describe(
      "**Service Mesh**: Spec for a single Membership for the servicemesh feature",
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
              "ResourceRequirements describes the compute resource requirements.",
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
          'Map of deployment configs to deployments ("admission", "audit", "mutation\').',
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
        }).describe(
          'MonitoringConfig specifies the backends Policy Controller should export metrics to. For example, to specify metrics should be exported to Cloud Monitoring and Prometheus, specify backends: ["cloudmonitoring", "prometheus"]',
        ).optional(),
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
          }).describe(
            "The config specifying which default library templates to install.",
          ).optional(),
        }).describe(
          "PolicyContentSpec defines the user's desired content configuration on the cluster.",
        ).optional(),
        referentialRulesEnabled: z.boolean().describe(
          "Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated.",
        ).optional(),
      }).describe("Configuration for Policy Controller").optional(),
      version: z.string().describe("Version of Policy Controller installed.")
        .optional(),
    }).describe(
      "**Policy Controller**: Configuration for a single cluster. Intended to parallel the PolicyController CR.",
    ).optional(),
  }).describe(
    "CommonFleetDefaultMemberConfigSpec contains default configuration information for memberships of a fleet",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("Labels for this Feature.")
    .optional(),
  membershipSpecs: z.record(
    z.string(),
    z.object({
      configmanagement: z.object({
        cluster: z.string().describe(
          "Optional. User-specified cluster name used by the Config Sync cluster-name-selector annotation or ClusterSelector object, for applying configs to only a subset of clusters. Read more about the cluster-name-selector annotation and ClusterSelector object at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/cluster-scoped-objects#limiting-configs. Only set this field if a name different from the cluster's fleet membership name is used by the Config Sync cluster-name-selector annotation or ClusterSelector.",
        ).optional(),
        configSync: z.object({
          deploymentOverrides: z.array(z.unknown()).describe(
            "Optional. Configuration for deployment overrides. Applies only to Config Sync deployments with containers that are not a root or namespace reconciler: `reconciler-manager`, `otel-collector`, `resource-group-controller-manager`, `admission-webhook`. To override a root or namespace reconciler, use the rootsync or reposync fields at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/rootsync-reposync-fields#override-resources instead.",
          ).optional(),
          enabled: z.boolean().describe(
            "Optional. Enables the installation of Config Sync. If set to true, the Feature will manage Config Sync resources, and apply the other ConfigSync fields if they exist. If set to false, the Feature will ignore all other ConfigSync fields and delete the Config Sync resources. If omitted, ConfigSync is considered enabled if the git or oci field is present.",
          ).optional(),
          git: z.object({
            gcpServiceAccountEmail: z.unknown().describe(
              "Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`.",
            ).optional(),
            httpsProxy: z.unknown().describe(
              "Optional. URL for the HTTPS proxy to be used when communicating with the Git repo. Only specify when secret_type is `cookiefile`, `token`, or `none`.",
            ).optional(),
            policyDir: z.unknown().describe(
              "Optional. The path within the Git repository that represents the top level of the repo to sync. Default: the root directory of the repository.",
            ).optional(),
            secretType: z.unknown().describe(
              "Required. Type of secret configured for access to the Git repo. Must be one of `ssh`, `cookiefile`, `gcenode`, `token`, `gcpserviceaccount`, `githubapp` or `none`. The validation of this is case-sensitive.",
            ).optional(),
            syncBranch: z.unknown().describe(
              "Optional. The branch of the repository to sync from. Default: master.",
            ).optional(),
            syncRepo: z.unknown().describe(
              "Required. The URL of the Git repository to use as the source of truth.",
            ).optional(),
            syncRev: z.unknown().describe(
              "Optional. Git revision (tag or hash) to check out. Default HEAD.",
            ).optional(),
            syncWaitSecs: z.unknown().describe(
              "Optional. Period in seconds between consecutive syncs. Default: 15.",
            ).optional(),
          }).describe("Git repo configuration for a single cluster.")
            .optional(),
          metricsGcpServiceAccountEmail: z.string().describe(
            "Optional. The Email of the Google Cloud Service Account (GSA) used for exporting Config Sync metrics to Cloud Monitoring and Cloud Monarch when Workload Identity is enabled. The GSA should have the Monitoring Metric Writer (roles/monitoring.metricWriter) IAM role. The Kubernetes ServiceAccount `default` in the namespace `config-management-monitoring` should be bound to the GSA. Deprecated: If Workload Identity Federation for GKE is enabled, Google Cloud Service Account is no longer needed for exporting Config Sync metrics: https://cloud.google.com/kubernetes-engine/enterprise/config-sync/docs/how-to/monitor-config-sync-cloud-monitoring#custom-monitoring.",
          ).optional(),
          oci: z.object({
            gcpServiceAccountEmail: z.unknown().describe(
              "Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`.",
            ).optional(),
            policyDir: z.unknown().describe(
              "Optional. The absolute path of the directory that contains the local resources. Default: the root directory of the image.",
            ).optional(),
            secretType: z.unknown().describe(
              "Required. Type of secret configured for access to the OCI repo. Must be one of `gcenode`, `gcpserviceaccount`, `k8sserviceaccount` or `none`. The validation of this is case-sensitive.",
            ).optional(),
            syncRepo: z.unknown().describe(
              "Required. The OCI image repository URL for the package to sync from. e.g. `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/PACKAGE_NAME`.",
            ).optional(),
            syncWaitSecs: z.unknown().describe(
              "Optional. Period in seconds between consecutive syncs. Default: 15.",
            ).optional(),
          }).describe("OCI repo configuration for a single cluster").optional(),
          preventDrift: z.boolean().describe(
            "Optional. Set to true to enable the Config Sync admission webhook to prevent drifts. If set to false, disables the Config Sync admission webhook and does not prevent drifts. Defaults to false. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/prevent-config-drift for details.",
          ).optional(),
          sourceFormat: z.string().describe(
            "Optional. Specifies whether the Config Sync repo is in `hierarchical` or `unstructured` mode. Defaults to `hierarchical`. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs#organize-configs for an explanation.",
          ).optional(),
          stopSyncing: z.boolean().describe(
            "Optional. Set to true to stop syncing configs for a single cluster. Default to false.",
          ).optional(),
        }).describe("Configuration for Config Sync").optional(),
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
        }).describe("Configuration for Hierarchy Controller").optional(),
        management: z.enum([
          "MANAGEMENT_UNSPECIFIED",
          "MANAGEMENT_AUTOMATIC",
          "MANAGEMENT_MANUAL",
        ]).describe(
          "Optional. Deprecated: From version 1.21.0, automatic Feature management is unavailable, and Config Sync only supports manual upgrades.",
        ).optional(),
        policyController: z.object({
          auditIntervalSeconds: z.string().describe(
            "Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether.",
          ).optional(),
          enabled: z.boolean().describe(
            "Enables the installation of Policy Controller. If false, the rest of PolicyController fields take no effect.",
          ).optional(),
          exemptableNamespaces: z.array(z.unknown()).describe(
            "The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster.",
          ).optional(),
          logDeniesEnabled: z.boolean().describe(
            "Logs all denies and dry run failures.",
          ).optional(),
          monitoring: z.object({
            backends: z.unknown().describe(
              "Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export.",
            ).optional(),
          }).describe(
            'PolicyControllerMonitoring specifies the backends Policy Controller should export metrics to. For example, to specify metrics should be exported to Cloud Monitoring and Prometheus, specify backends: ["cloudmonitoring", "prometheus"]',
          ).optional(),
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
        }).describe("Configuration for Policy Controller").optional(),
        version: z.string().describe(
          "Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy.",
        ).optional(),
      }).describe(
        "**Anthos Config Management**: Configuration for a single cluster. Intended to parallel the ConfigManagement CR.",
      ).optional(),
      fleetobservability: z.object({}).describe(
        "**FleetObservability**: The membership-specific input for FleetObservability feature.",
      ).optional(),
      identityservice: z.object({
        authMethods: z.array(z.object({
          azureadConfig: z.unknown().describe(
            "Configuration for the AzureAD Auth flow.",
          ).optional(),
          googleConfig: z.unknown().describe(
            "Configuration for the Google Plugin Auth flow.",
          ).optional(),
          ldapConfig: z.unknown().describe(
            "Configuration for the LDAP Auth flow.",
          ).optional(),
          name: z.unknown().describe("Identifier for auth config.").optional(),
          oidcConfig: z.unknown().describe("Configuration for OIDC Auth flow.")
            .optional(),
          proxy: z.unknown().describe(
            "Proxy server address to use for auth method.",
          ).optional(),
          samlConfig: z.unknown().describe(
            "Configuration for the SAML Auth flow.",
          ).optional(),
        })).describe("A member may support multiple auth methods.").optional(),
        identityServiceOptions: z.object({
          diagnosticInterface: z.object({
            enabled: z.unknown().describe(
              "Determines whether to enable the diagnostic interface.",
            ).optional(),
            expirationTime: z.unknown().describe(
              "Determines the expiration time of the diagnostic interface enablement. When reached, requests to the interface would be automatically rejected.",
            ).optional(),
          }).describe("Configuration options for the AIS diagnostic interface.")
            .optional(),
          sessionDuration: z.string().describe(
            "Determines the lifespan of STS tokens issued by Anthos Identity Service.",
          ).optional(),
        }).describe("Holds non-protocol-related configuration options.")
          .optional(),
      }).describe(
        "**Anthos Identity Service**: Configuration for a single Membership.",
      ).optional(),
      mesh: z.object({
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
        management: z.enum([
          "MANAGEMENT_UNSPECIFIED",
          "MANAGEMENT_AUTOMATIC",
          "MANAGEMENT_MANUAL",
          "MANAGEMENT_NOT_INSTALLED",
        ]).describe("Optional. Enables automatic Service Mesh management.")
          .optional(),
      }).describe(
        "**Service Mesh**: Spec for a single Membership for the servicemesh feature",
      ).optional(),
      origin: z.object({
        type: z.enum(["TYPE_UNSPECIFIED", "FLEET", "FLEET_OUT_OF_SYNC", "USER"])
          .describe("Type specifies which type of origin is set.").optional(),
      }).describe(
        "Origin defines where this MembershipFeatureSpec originated from.",
      ).optional(),
      policycontroller: z.object({
        policyControllerHubConfig: z.object({
          auditIntervalSeconds: z.string().describe(
            "Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether.",
          ).optional(),
          constraintViolationLimit: z.string().describe(
            "The maximum number of audit violations to be stored in a constraint. If not set, the internal default (currently 20) will be used.",
          ).optional(),
          deploymentConfigs: z.record(z.string(), z.unknown()).describe(
            'Map of deployment configs to deployments ("admission", "audit", "mutation\').',
          ).optional(),
          exemptableNamespaces: z.array(z.unknown()).describe(
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
            backends: z.unknown().describe(
              "Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export.",
            ).optional(),
          }).describe(
            'MonitoringConfig specifies the backends Policy Controller should export metrics to. For example, to specify metrics should be exported to Cloud Monitoring and Prometheus, specify backends: ["cloudmonitoring", "prometheus"]',
          ).optional(),
          mutationEnabled: z.boolean().describe(
            "Enables the ability to mutate resources using Policy Controller.",
          ).optional(),
          policyContent: z.object({
            bundles: z.unknown().describe(
              "map of bundle name to BundleInstallSpec. The bundle name maps to the `bundleName` key in the `policycontroller.gke.io/constraintData` annotation on a constraint.",
            ).optional(),
            templateLibrary: z.unknown().describe(
              "The config specifying which default library templates to install.",
            ).optional(),
          }).describe(
            "PolicyContentSpec defines the user's desired content configuration on the cluster.",
          ).optional(),
          referentialRulesEnabled: z.boolean().describe(
            "Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated.",
          ).optional(),
        }).describe("Configuration for Policy Controller").optional(),
        version: z.string().describe("Version of Policy Controller installed.")
          .optional(),
      }).describe(
        "**Policy Controller**: Configuration for a single cluster. Intended to parallel the PolicyController CR.",
      ).optional(),
    }),
  ).describe(
    "Optional. Membership-specific configuration for this Feature. If this Feature does not support any per-Membership configuration, this field may be unused. The keys indicate which Membership the configuration is for, in the form: `projects/{p}/locations/{l}/memberships/{m}` Where {p} is the project, {l} is a valid location and {m} is a valid Membership in this project at that location. {p} WILL match the Feature's project. {p} will always be returned as the project number, but the project ID is also accepted during input. If the same Membership is specified in the map twice (using the project ID form, and the project number form), exactly ONE of the entries will be saved, with no guarantees as to which. For this reason, it is recommended the same format be used for all entries when mutating a Feature.",
  ).optional(),
  resourceState: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ENABLING",
      "ACTIVE",
      "DISABLING",
      "UPDATING",
      "SERVICE_UPDATING",
    ]).describe("The current state of the Feature resource in the Hub API.")
      .optional(),
  }).describe(
    'FeatureResourceState describes the state of a Feature *resource* in the GkeHub API. See `FeatureState` for the "running state" of the Feature in the Fleet and across Memberships.',
  ).optional(),
  scopeSpecs: z.record(z.string(), z.object({})).describe(
    "Optional. Scope-specific configuration for this Feature. If this Feature does not support any per-Scope configuration, this field may be unused. The keys indicate which Scope the configuration is for, in the form: `projects/{p}/locations/global/scopes/{s}` Where {p} is the project, {s} is a valid Scope in this project. {p} WILL match the Feature's project. {p} will always be returned as the project number, but the project ID is also accepted during input. If the same Scope is specified in the map twice (using the project ID form, and the project number form), exactly ONE of the entries will be saved, with no guarantees as to which. For this reason, it is recommended the same format be used for all entries when mutating a Feature.",
  ).optional(),
  spec: z.object({
    appdevexperience: z.object({}).describe(
      "Spec for App Dev Experience Feature.",
    ).optional(),
    clusterupgrade: z.object({
      gkeUpgradeOverrides: z.array(z.object({
        postConditions: z.object({
          soaking: z.unknown().describe(
            'Required. Amount of time to "soak" after a rollout has been finished before marking it COMPLETE. Cannot exceed 30 days. Required.',
          ).optional(),
        }).describe(
          "Post conditional checks after an upgrade has been applied on all eligible clusters.",
        ).optional(),
        upgrade: z.object({
          name: z.unknown().describe(
            'Name of the upgrade, e.g., "k8s_control_plane". It should be a valid upgrade name. It must not exceet 99 characters.',
          ).optional(),
          version: z.unknown().describe(
            'Version of the upgrade, e.g., "1.22.1-gke.100". It should be a valid version. It must not exceet 99 characters.',
          ).optional(),
        }).describe(
          "GKEUpgrade represents a GKE provided upgrade, e.g., control plane upgrade.",
        ).optional(),
      })).describe(
        "Allow users to override some properties of each GKE upgrade.",
      ).optional(),
      postConditions: z.object({
        soaking: z.string().describe(
          'Required. Amount of time to "soak" after a rollout has been finished before marking it COMPLETE. Cannot exceed 30 days. Required.',
        ).optional(),
      }).describe(
        "Post conditional checks after an upgrade has been applied on all eligible clusters.",
      ).optional(),
      upstreamFleets: z.array(z.string()).describe(
        "This fleet consumes upgrades that have COMPLETE status code in the upstream fleets. See UpgradeStatus.Code for code definitions. The fleet name should be either fleet project number or id. This is defined as repeated for future proof reasons. Initial implementation will enforce at most one upstream fleet.",
      ).optional(),
    }).describe(
      "**ClusterUpgrade**: The configuration for the fleet-level ClusterUpgrade feature.",
    ).optional(),
    dataplanev2: z.object({
      enableEncryption: z.boolean().describe(
        "Enable dataplane-v2 based encryption for multiple clusters.",
      ).optional(),
    }).describe("**Dataplane V2**: Spec").optional(),
    fleetobservability: z.object({
      loggingConfig: z.object({
        defaultConfig: z.object({
          mode: z.enum(["MODE_UNSPECIFIED", "COPY", "MOVE"]).describe(
            "mode configures the logs routing mode.",
          ).optional(),
        }).describe(
          "RoutingConfig configures the behaviour of fleet logging feature.",
        ).optional(),
        fleetScopeLogsConfig: z.object({
          mode: z.enum(["MODE_UNSPECIFIED", "COPY", "MOVE"]).describe(
            "mode configures the logs routing mode.",
          ).optional(),
        }).describe(
          "RoutingConfig configures the behaviour of fleet logging feature.",
        ).optional(),
      }).describe(
        "LoggingConfig defines the configuration for different types of logs.",
      ).optional(),
    }).describe(
      "**Fleet Observability**: The Hub-wide input for the FleetObservability feature.",
    ).optional(),
    mesh: z.object({
      modernizationCompatibility: z.enum([
        "MODERNIZATION_COMPATIBILITY_UNSPECIFIED",
        "VALIDATION_ENABLED",
        "VALIDATION_DISABLED",
      ]).describe(
        "Optional. Specifies modernization compatibility for the fleet.",
      ).optional(),
    }).describe(
      "**Service Mesh**: Spec for the fleet for the servicemesh feature",
    ).optional(),
    multiclusteringress: z.object({
      configMembership: z.string().describe(
        "Fully-qualified Membership name which hosts the MultiClusterIngress CRD. Example: `projects/foo-proj/locations/global/memberships/bar`",
      ).optional(),
    }).describe(
      "**Multi-cluster Ingress**: The configuration for the MultiClusterIngress feature.",
    ).optional(),
    rbacrolebindingactuation: z.object({
      allowedCustomRoles: z.array(z.string()).describe(
        "The list of allowed custom roles (ClusterRoles). If a ClusterRole is not part of this list, it cannot be used in a Scope RBACRoleBinding. If a ClusterRole in this list is in use, it cannot be removed from the list.",
      ).optional(),
    }).describe(
      "**RBAC RoleBinding Actuation**: The Hub-wide input for the RBACRoleBindingActuation feature.",
    ).optional(),
    workloadidentity: z.object({
      scopeTenancyPool: z.string().describe(
        "Pool to be used for Workload Identity. This pool in trust-domain mode is used with Fleet Tenancy, so that sameness can be enforced. ex: projects/example/locations/global/workloadidentitypools/custompool",
      ).optional(),
    }).describe("**WorkloadIdentity**: Global feature specification.")
      .optional(),
  }).describe("CommonFeatureSpec contains Fleet-wide configuration information")
    .optional(),
  state: z.object({
    appdevexperience: z.object({
      networkingInstallSucceeded: z.object({
        code: z.enum(["CODE_UNSPECIFIED", "OK", "FAILED", "UNKNOWN"]).describe(
          "Code specifies AppDevExperienceFeature's subcomponent ready state.",
        ).optional(),
        description: z.string().describe(
          "Description is populated if Code is Failed, explaining why it has failed.",
        ).optional(),
      }).describe("Status specifies state for the subcomponent.").optional(),
    }).describe("State for App Dev Exp Feature.").optional(),
    clusterupgrade: z.object({
      downstreamFleets: z.array(z.string()).describe(
        "This fleets whose upstream_fleets contain the current fleet. The fleet name should be either fleet project number or id.",
      ).optional(),
      gkeState: z.object({
        conditions: z.array(z.object({
          reason: z.unknown().describe(
            "Reason why the feature is in this status.",
          ).optional(),
          status: z.unknown().describe(
            "Status of the condition, one of True, False, Unknown.",
          ).optional(),
          type: z.unknown().describe(
            'Type of the condition, for example, "ready".',
          ).optional(),
          updateTime: z.unknown().describe(
            "Last timestamp the condition was updated.",
          ).optional(),
        })).describe("Current conditions of the feature.").optional(),
        upgradeState: z.array(z.object({
          stats: z.unknown().describe(
            "Number of GKE clusters in each status code.",
          ).optional(),
          status: z.unknown().describe(
            "UpgradeStatus provides status information for each upgrade.",
          ).optional(),
          upgrade: z.unknown().describe(
            "GKEUpgrade represents a GKE provided upgrade, e.g., control plane upgrade.",
          ).optional(),
        })).describe("Upgrade state. It will eventually replace `state`.")
          .optional(),
      }).describe(
        "GKEUpgradeFeatureState contains feature states for GKE clusters in the scope.",
      ).optional(),
      ignored: z.record(
        z.string(),
        z.object({
          ignoredTime: z.string().describe(
            "Time when the membership was first set to ignored.",
          ).optional(),
          reason: z.string().describe("Reason why the membership is ignored.")
            .optional(),
        }),
      ).describe(
        "A list of memberships ignored by the feature. For example, manually upgraded clusters can be ignored if they are newer than the default versions of its release channel. The membership resource is in the format: `projects/{p}/locations/{l}/membership/{m}`.",
      ).optional(),
    }).describe(
      "**ClusterUpgrade**: The state for the fleet-level ClusterUpgrade feature.",
    ).optional(),
    fleetobservability: z.object({
      logging: z.object({
        defaultLog: z.object({
          code: z.enum(["CODE_UNSPECIFIED", "OK", "ERROR"]).describe(
            "The high-level, machine-readable status of this Feature.",
          ).optional(),
          errors: z.array(z.unknown()).describe(
            "Errors after reconciling the monitoring and logging feature if the code is not OK.",
          ).optional(),
        }).describe("Base state for fleet observability feature.").optional(),
        scopeLog: z.object({
          code: z.enum(["CODE_UNSPECIFIED", "OK", "ERROR"]).describe(
            "The high-level, machine-readable status of this Feature.",
          ).optional(),
          errors: z.array(z.unknown()).describe(
            "Errors after reconciling the monitoring and logging feature if the code is not OK.",
          ).optional(),
        }).describe("Base state for fleet observability feature.").optional(),
      }).describe("Feature state for logging feature.").optional(),
      monitoring: z.object({
        state: z.object({
          code: z.enum(["CODE_UNSPECIFIED", "OK", "ERROR"]).describe(
            "The high-level, machine-readable status of this Feature.",
          ).optional(),
          errors: z.array(z.unknown()).describe(
            "Errors after reconciling the monitoring and logging feature if the code is not OK.",
          ).optional(),
        }).describe("Base state for fleet observability feature.").optional(),
      }).describe("Feature state for monitoring feature.").optional(),
    }).describe(
      "**FleetObservability**: Hub-wide Feature for FleetObservability feature. state.",
    ).optional(),
    rbacrolebindingactuation: z.object({}).describe(
      "**RBAC RoleBinding Actuation**: An empty state left as an example Hub-wide Feature state.",
    ).optional(),
    state: z.object({
      code: z.enum(["CODE_UNSPECIFIED", "OK", "WARNING", "ERROR"]).describe(
        "The high-level, machine-readable status of this Feature.",
      ).optional(),
      description: z.string().describe(
        "A human-readable description of the current status.",
      ).optional(),
      updateTime: z.string().describe(
        "The time this status and any related Feature-specific details were updated.",
      ).optional(),
    }).describe(
      "FeatureState describes the high-level state of a Feature. It may be used to describe a Feature's state at the environ-level, or per-membershop, depending on the context.",
    ).optional(),
    workloadidentity: z.object({
      namespaceStateDetails: z.record(
        z.string(),
        z.object({
          code: z.enum([
            "NAMESPACE_STATE_UNSPECIFIED",
            "NAMESPACE_STATE_OK",
            "NAMESPACE_STATE_ERROR",
          ]).describe("The state of the IAM namespace.").optional(),
          description: z.string().describe(
            "A human-readable description of the current state or returned error.",
          ).optional(),
        }),
      ).describe("The state of the IAM namespaces for the fleet.").optional(),
      namespaceStates: z.record(
        z.string(),
        z.enum([
          "NAMESPACE_STATE_UNSPECIFIED",
          "NAMESPACE_STATE_OK",
          "NAMESPACE_STATE_ERROR",
        ]),
      ).describe(
        "Deprecated, this field will be erased after code is changed to use the new field.",
      ).optional(),
      scopeTenancyWorkloadIdentityPool: z.string().describe(
        "The full name of the scope-tenancy pool for the fleet.",
      ).optional(),
      workloadIdentityPool: z.string().describe(
        "The full name of the svc.id.goog pool for the fleet.",
      ).optional(),
      workloadIdentityPoolStateDetails: z.record(
        z.string(),
        z.object({
          code: z.enum([
            "WORKLOAD_IDENTITY_POOL_STATE_UNSPECIFIED",
            "WORKLOAD_IDENTITY_POOL_STATE_OK",
            "WORKLOAD_IDENTITY_POOL_STATE_ERROR",
          ]).describe("The state of the Workload Identity Pool.").optional(),
          description: z.string().describe(
            "A human-readable description of the current state or returned error.",
          ).optional(),
        }),
      ).describe("The state of the Workload Identity Pools for the fleet.")
        .optional(),
    }).describe("**WorkloadIdentity**: Global feature state.").optional(),
  }).describe(
    "CommonFeatureState contains Fleet-wide Feature status information.",
  ).optional(),
  featureId: z.string().describe("The ID of the feature to create.").optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  fleetDefaultMemberConfig: z.object({
    configmanagement: z.object({
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
    mesh: z.object({
      configApi: z.string(),
      controlPlane: z.string(),
      management: z.string(),
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
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  membershipSpecs: z.record(z.string(), z.unknown()).optional(),
  membershipStates: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  resourceState: z.object({
    state: z.string(),
  }).optional(),
  scopeSpecs: z.record(z.string(), z.unknown()).optional(),
  scopeStates: z.record(z.string(), z.unknown()).optional(),
  spec: z.object({
    appdevexperience: z.object({}),
    clusterupgrade: z.object({
      gkeUpgradeOverrides: z.array(z.object({
        postConditions: z.object({
          soaking: z.unknown(),
        }),
        upgrade: z.object({
          name: z.unknown(),
          version: z.unknown(),
        }),
      })),
      postConditions: z.object({
        soaking: z.string(),
      }),
      upstreamFleets: z.array(z.string()),
    }),
    dataplanev2: z.object({
      enableEncryption: z.boolean(),
    }),
    fleetobservability: z.object({
      loggingConfig: z.object({
        defaultConfig: z.object({
          mode: z.string(),
        }),
        fleetScopeLogsConfig: z.object({
          mode: z.string(),
        }),
      }),
    }),
    mesh: z.object({
      modernizationCompatibility: z.string(),
    }),
    multiclusteringress: z.object({
      configMembership: z.string(),
    }),
    rbacrolebindingactuation: z.object({
      allowedCustomRoles: z.array(z.string()),
    }),
    workloadidentity: z.object({
      scopeTenancyPool: z.string(),
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
      downstreamFleets: z.array(z.string()),
      gkeState: z.object({
        conditions: z.array(z.object({
          reason: z.unknown(),
          status: z.unknown(),
          type: z.unknown(),
          updateTime: z.unknown(),
        })),
        upgradeState: z.array(z.object({
          stats: z.unknown(),
          status: z.unknown(),
          upgrade: z.unknown(),
        })),
      }),
      ignored: z.record(z.string(), z.unknown()),
    }),
    fleetobservability: z.object({
      logging: z.object({
        defaultLog: z.object({
          code: z.string(),
          errors: z.array(z.unknown()),
        }),
        scopeLog: z.object({
          code: z.string(),
          errors: z.array(z.unknown()),
        }),
      }),
      monitoring: z.object({
        state: z.object({
          code: z.string(),
          errors: z.array(z.unknown()),
        }),
      }),
    }),
    rbacrolebindingactuation: z.object({}),
    state: z.object({
      code: z.string(),
      description: z.string(),
      updateTime: z.string(),
    }),
    workloadidentity: z.object({
      namespaceStateDetails: z.record(z.string(), z.unknown()),
      namespaceStates: z.record(z.string(), z.unknown()),
      scopeTenancyWorkloadIdentityPool: z.string(),
      workloadIdentityPool: z.string(),
      workloadIdentityPoolStateDetails: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  unreachable: z.array(z.string()).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  fleetDefaultMemberConfig: z.object({
    configmanagement: z.object({
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
        }).describe("Git repo configuration for a single cluster.").optional(),
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
        }).describe("OCI repo configuration for a single cluster").optional(),
        preventDrift: z.boolean().describe(
          "Optional. Set to true to enable the Config Sync admission webhook to prevent drifts. If set to false, disables the Config Sync admission webhook and does not prevent drifts. Defaults to false. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/prevent-config-drift for details.",
        ).optional(),
        sourceFormat: z.string().describe(
          "Optional. Specifies whether the Config Sync repo is in `hierarchical` or `unstructured` mode. Defaults to `hierarchical`. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs#organize-configs for an explanation.",
        ).optional(),
        stopSyncing: z.boolean().describe(
          "Optional. Set to true to stop syncing configs for a single cluster. Default to false.",
        ).optional(),
      }).describe("Configuration for Config Sync").optional(),
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
      }).describe("Configuration for Hierarchy Controller").optional(),
      management: z.enum([
        "MANAGEMENT_UNSPECIFIED",
        "MANAGEMENT_AUTOMATIC",
        "MANAGEMENT_MANUAL",
      ]).describe(
        "Optional. Deprecated: From version 1.21.0, automatic Feature management is unavailable, and Config Sync only supports manual upgrades.",
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
        }).describe(
          'PolicyControllerMonitoring specifies the backends Policy Controller should export metrics to. For example, to specify metrics should be exported to Cloud Monitoring and Prometheus, specify backends: ["cloudmonitoring", "prometheus"]',
        ).optional(),
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
      }).describe("Configuration for Policy Controller").optional(),
      version: z.string().describe(
        "Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy.",
      ).optional(),
    }).describe(
      "**Anthos Config Management**: Configuration for a single cluster. Intended to parallel the ConfigManagement CR.",
    ).optional(),
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
        }).describe("Configuration for the AzureAD Auth flow.").optional(),
        googleConfig: z.object({
          disable: z.unknown().describe(
            "Disable automatic configuration of Google Plugin on supported platforms.",
          ).optional(),
        }).describe("Configuration for the Google Plugin Auth flow.")
          .optional(),
        ldapConfig: z.object({
          group: z.unknown().describe(
            "Contains the properties for locating and authenticating groups in the directory.",
          ).optional(),
          server: z.unknown().describe(
            "Server settings for the external LDAP server.",
          ).optional(),
          serviceAccount: z.unknown().describe(
            "Contains the credentials of the service account which is authorized to perform the LDAP search in the directory. The credentials can be supplied by the combination of the DN and password or the client certificate.",
          ).optional(),
          user: z.unknown().describe(
            "Defines where users exist in the LDAP directory.",
          ).optional(),
        }).describe("Configuration for the LDAP Auth flow.").optional(),
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
        }).describe("Configuration for OIDC Auth flow.").optional(),
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
        }).describe("Configuration for the SAML Auth flow.").optional(),
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
      }).describe("Holds non-protocol-related configuration options.")
        .optional(),
    }).describe(
      "**Anthos Identity Service**: Configuration for a single Membership.",
    ).optional(),
    mesh: z.object({
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
      management: z.enum([
        "MANAGEMENT_UNSPECIFIED",
        "MANAGEMENT_AUTOMATIC",
        "MANAGEMENT_MANUAL",
        "MANAGEMENT_NOT_INSTALLED",
      ]).describe("Optional. Enables automatic Service Mesh management.")
        .optional(),
    }).describe(
      "**Service Mesh**: Spec for a single Membership for the servicemesh feature",
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
              "ResourceRequirements describes the compute resource requirements.",
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
          'Map of deployment configs to deployments ("admission", "audit", "mutation\').',
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
        }).describe(
          'MonitoringConfig specifies the backends Policy Controller should export metrics to. For example, to specify metrics should be exported to Cloud Monitoring and Prometheus, specify backends: ["cloudmonitoring", "prometheus"]',
        ).optional(),
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
          }).describe(
            "The config specifying which default library templates to install.",
          ).optional(),
        }).describe(
          "PolicyContentSpec defines the user's desired content configuration on the cluster.",
        ).optional(),
        referentialRulesEnabled: z.boolean().describe(
          "Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated.",
        ).optional(),
      }).describe("Configuration for Policy Controller").optional(),
      version: z.string().describe("Version of Policy Controller installed.")
        .optional(),
    }).describe(
      "**Policy Controller**: Configuration for a single cluster. Intended to parallel the PolicyController CR.",
    ).optional(),
  }).describe(
    "CommonFleetDefaultMemberConfigSpec contains default configuration information for memberships of a fleet",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("Labels for this Feature.")
    .optional(),
  membershipSpecs: z.record(
    z.string(),
    z.object({
      configmanagement: z.object({
        cluster: z.string().describe(
          "Optional. User-specified cluster name used by the Config Sync cluster-name-selector annotation or ClusterSelector object, for applying configs to only a subset of clusters. Read more about the cluster-name-selector annotation and ClusterSelector object at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/cluster-scoped-objects#limiting-configs. Only set this field if a name different from the cluster's fleet membership name is used by the Config Sync cluster-name-selector annotation or ClusterSelector.",
        ).optional(),
        configSync: z.object({
          deploymentOverrides: z.array(z.unknown()).describe(
            "Optional. Configuration for deployment overrides. Applies only to Config Sync deployments with containers that are not a root or namespace reconciler: `reconciler-manager`, `otel-collector`, `resource-group-controller-manager`, `admission-webhook`. To override a root or namespace reconciler, use the rootsync or reposync fields at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/rootsync-reposync-fields#override-resources instead.",
          ).optional(),
          enabled: z.boolean().describe(
            "Optional. Enables the installation of Config Sync. If set to true, the Feature will manage Config Sync resources, and apply the other ConfigSync fields if they exist. If set to false, the Feature will ignore all other ConfigSync fields and delete the Config Sync resources. If omitted, ConfigSync is considered enabled if the git or oci field is present.",
          ).optional(),
          git: z.object({
            gcpServiceAccountEmail: z.unknown().describe(
              "Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`.",
            ).optional(),
            httpsProxy: z.unknown().describe(
              "Optional. URL for the HTTPS proxy to be used when communicating with the Git repo. Only specify when secret_type is `cookiefile`, `token`, or `none`.",
            ).optional(),
            policyDir: z.unknown().describe(
              "Optional. The path within the Git repository that represents the top level of the repo to sync. Default: the root directory of the repository.",
            ).optional(),
            secretType: z.unknown().describe(
              "Required. Type of secret configured for access to the Git repo. Must be one of `ssh`, `cookiefile`, `gcenode`, `token`, `gcpserviceaccount`, `githubapp` or `none`. The validation of this is case-sensitive.",
            ).optional(),
            syncBranch: z.unknown().describe(
              "Optional. The branch of the repository to sync from. Default: master.",
            ).optional(),
            syncRepo: z.unknown().describe(
              "Required. The URL of the Git repository to use as the source of truth.",
            ).optional(),
            syncRev: z.unknown().describe(
              "Optional. Git revision (tag or hash) to check out. Default HEAD.",
            ).optional(),
            syncWaitSecs: z.unknown().describe(
              "Optional. Period in seconds between consecutive syncs. Default: 15.",
            ).optional(),
          }).describe("Git repo configuration for a single cluster.")
            .optional(),
          metricsGcpServiceAccountEmail: z.string().describe(
            "Optional. The Email of the Google Cloud Service Account (GSA) used for exporting Config Sync metrics to Cloud Monitoring and Cloud Monarch when Workload Identity is enabled. The GSA should have the Monitoring Metric Writer (roles/monitoring.metricWriter) IAM role. The Kubernetes ServiceAccount `default` in the namespace `config-management-monitoring` should be bound to the GSA. Deprecated: If Workload Identity Federation for GKE is enabled, Google Cloud Service Account is no longer needed for exporting Config Sync metrics: https://cloud.google.com/kubernetes-engine/enterprise/config-sync/docs/how-to/monitor-config-sync-cloud-monitoring#custom-monitoring.",
          ).optional(),
          oci: z.object({
            gcpServiceAccountEmail: z.unknown().describe(
              "Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`.",
            ).optional(),
            policyDir: z.unknown().describe(
              "Optional. The absolute path of the directory that contains the local resources. Default: the root directory of the image.",
            ).optional(),
            secretType: z.unknown().describe(
              "Required. Type of secret configured for access to the OCI repo. Must be one of `gcenode`, `gcpserviceaccount`, `k8sserviceaccount` or `none`. The validation of this is case-sensitive.",
            ).optional(),
            syncRepo: z.unknown().describe(
              "Required. The OCI image repository URL for the package to sync from. e.g. `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/PACKAGE_NAME`.",
            ).optional(),
            syncWaitSecs: z.unknown().describe(
              "Optional. Period in seconds between consecutive syncs. Default: 15.",
            ).optional(),
          }).describe("OCI repo configuration for a single cluster").optional(),
          preventDrift: z.boolean().describe(
            "Optional. Set to true to enable the Config Sync admission webhook to prevent drifts. If set to false, disables the Config Sync admission webhook and does not prevent drifts. Defaults to false. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/prevent-config-drift for details.",
          ).optional(),
          sourceFormat: z.string().describe(
            "Optional. Specifies whether the Config Sync repo is in `hierarchical` or `unstructured` mode. Defaults to `hierarchical`. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs#organize-configs for an explanation.",
          ).optional(),
          stopSyncing: z.boolean().describe(
            "Optional. Set to true to stop syncing configs for a single cluster. Default to false.",
          ).optional(),
        }).describe("Configuration for Config Sync").optional(),
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
        }).describe("Configuration for Hierarchy Controller").optional(),
        management: z.enum([
          "MANAGEMENT_UNSPECIFIED",
          "MANAGEMENT_AUTOMATIC",
          "MANAGEMENT_MANUAL",
        ]).describe(
          "Optional. Deprecated: From version 1.21.0, automatic Feature management is unavailable, and Config Sync only supports manual upgrades.",
        ).optional(),
        policyController: z.object({
          auditIntervalSeconds: z.string().describe(
            "Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether.",
          ).optional(),
          enabled: z.boolean().describe(
            "Enables the installation of Policy Controller. If false, the rest of PolicyController fields take no effect.",
          ).optional(),
          exemptableNamespaces: z.array(z.unknown()).describe(
            "The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster.",
          ).optional(),
          logDeniesEnabled: z.boolean().describe(
            "Logs all denies and dry run failures.",
          ).optional(),
          monitoring: z.object({
            backends: z.unknown().describe(
              "Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export.",
            ).optional(),
          }).describe(
            'PolicyControllerMonitoring specifies the backends Policy Controller should export metrics to. For example, to specify metrics should be exported to Cloud Monitoring and Prometheus, specify backends: ["cloudmonitoring", "prometheus"]',
          ).optional(),
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
        }).describe("Configuration for Policy Controller").optional(),
        version: z.string().describe(
          "Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy.",
        ).optional(),
      }).describe(
        "**Anthos Config Management**: Configuration for a single cluster. Intended to parallel the ConfigManagement CR.",
      ).optional(),
      fleetobservability: z.object({}).describe(
        "**FleetObservability**: The membership-specific input for FleetObservability feature.",
      ).optional(),
      identityservice: z.object({
        authMethods: z.array(z.object({
          azureadConfig: z.unknown().describe(
            "Configuration for the AzureAD Auth flow.",
          ).optional(),
          googleConfig: z.unknown().describe(
            "Configuration for the Google Plugin Auth flow.",
          ).optional(),
          ldapConfig: z.unknown().describe(
            "Configuration for the LDAP Auth flow.",
          ).optional(),
          name: z.unknown().describe("Identifier for auth config.").optional(),
          oidcConfig: z.unknown().describe("Configuration for OIDC Auth flow.")
            .optional(),
          proxy: z.unknown().describe(
            "Proxy server address to use for auth method.",
          ).optional(),
          samlConfig: z.unknown().describe(
            "Configuration for the SAML Auth flow.",
          ).optional(),
        })).describe("A member may support multiple auth methods.").optional(),
        identityServiceOptions: z.object({
          diagnosticInterface: z.object({
            enabled: z.unknown().describe(
              "Determines whether to enable the diagnostic interface.",
            ).optional(),
            expirationTime: z.unknown().describe(
              "Determines the expiration time of the diagnostic interface enablement. When reached, requests to the interface would be automatically rejected.",
            ).optional(),
          }).describe("Configuration options for the AIS diagnostic interface.")
            .optional(),
          sessionDuration: z.string().describe(
            "Determines the lifespan of STS tokens issued by Anthos Identity Service.",
          ).optional(),
        }).describe("Holds non-protocol-related configuration options.")
          .optional(),
      }).describe(
        "**Anthos Identity Service**: Configuration for a single Membership.",
      ).optional(),
      mesh: z.object({
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
        management: z.enum([
          "MANAGEMENT_UNSPECIFIED",
          "MANAGEMENT_AUTOMATIC",
          "MANAGEMENT_MANUAL",
          "MANAGEMENT_NOT_INSTALLED",
        ]).describe("Optional. Enables automatic Service Mesh management.")
          .optional(),
      }).describe(
        "**Service Mesh**: Spec for a single Membership for the servicemesh feature",
      ).optional(),
      origin: z.object({
        type: z.enum(["TYPE_UNSPECIFIED", "FLEET", "FLEET_OUT_OF_SYNC", "USER"])
          .describe("Type specifies which type of origin is set.").optional(),
      }).describe(
        "Origin defines where this MembershipFeatureSpec originated from.",
      ).optional(),
      policycontroller: z.object({
        policyControllerHubConfig: z.object({
          auditIntervalSeconds: z.string().describe(
            "Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether.",
          ).optional(),
          constraintViolationLimit: z.string().describe(
            "The maximum number of audit violations to be stored in a constraint. If not set, the internal default (currently 20) will be used.",
          ).optional(),
          deploymentConfigs: z.record(z.string(), z.unknown()).describe(
            'Map of deployment configs to deployments ("admission", "audit", "mutation\').',
          ).optional(),
          exemptableNamespaces: z.array(z.unknown()).describe(
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
            backends: z.unknown().describe(
              "Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export.",
            ).optional(),
          }).describe(
            'MonitoringConfig specifies the backends Policy Controller should export metrics to. For example, to specify metrics should be exported to Cloud Monitoring and Prometheus, specify backends: ["cloudmonitoring", "prometheus"]',
          ).optional(),
          mutationEnabled: z.boolean().describe(
            "Enables the ability to mutate resources using Policy Controller.",
          ).optional(),
          policyContent: z.object({
            bundles: z.unknown().describe(
              "map of bundle name to BundleInstallSpec. The bundle name maps to the `bundleName` key in the `policycontroller.gke.io/constraintData` annotation on a constraint.",
            ).optional(),
            templateLibrary: z.unknown().describe(
              "The config specifying which default library templates to install.",
            ).optional(),
          }).describe(
            "PolicyContentSpec defines the user's desired content configuration on the cluster.",
          ).optional(),
          referentialRulesEnabled: z.boolean().describe(
            "Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated.",
          ).optional(),
        }).describe("Configuration for Policy Controller").optional(),
        version: z.string().describe("Version of Policy Controller installed.")
          .optional(),
      }).describe(
        "**Policy Controller**: Configuration for a single cluster. Intended to parallel the PolicyController CR.",
      ).optional(),
    }),
  ).describe(
    "Optional. Membership-specific configuration for this Feature. If this Feature does not support any per-Membership configuration, this field may be unused. The keys indicate which Membership the configuration is for, in the form: `projects/{p}/locations/{l}/memberships/{m}` Where {p} is the project, {l} is a valid location and {m} is a valid Membership in this project at that location. {p} WILL match the Feature's project. {p} will always be returned as the project number, but the project ID is also accepted during input. If the same Membership is specified in the map twice (using the project ID form, and the project number form), exactly ONE of the entries will be saved, with no guarantees as to which. For this reason, it is recommended the same format be used for all entries when mutating a Feature.",
  ).optional(),
  resourceState: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ENABLING",
      "ACTIVE",
      "DISABLING",
      "UPDATING",
      "SERVICE_UPDATING",
    ]).describe("The current state of the Feature resource in the Hub API.")
      .optional(),
  }).describe(
    'FeatureResourceState describes the state of a Feature *resource* in the GkeHub API. See `FeatureState` for the "running state" of the Feature in the Fleet and across Memberships.',
  ).optional(),
  scopeSpecs: z.record(z.string(), z.object({})).describe(
    "Optional. Scope-specific configuration for this Feature. If this Feature does not support any per-Scope configuration, this field may be unused. The keys indicate which Scope the configuration is for, in the form: `projects/{p}/locations/global/scopes/{s}` Where {p} is the project, {s} is a valid Scope in this project. {p} WILL match the Feature's project. {p} will always be returned as the project number, but the project ID is also accepted during input. If the same Scope is specified in the map twice (using the project ID form, and the project number form), exactly ONE of the entries will be saved, with no guarantees as to which. For this reason, it is recommended the same format be used for all entries when mutating a Feature.",
  ).optional(),
  spec: z.object({
    appdevexperience: z.object({}).describe(
      "Spec for App Dev Experience Feature.",
    ).optional(),
    clusterupgrade: z.object({
      gkeUpgradeOverrides: z.array(z.object({
        postConditions: z.object({
          soaking: z.unknown().describe(
            'Required. Amount of time to "soak" after a rollout has been finished before marking it COMPLETE. Cannot exceed 30 days. Required.',
          ).optional(),
        }).describe(
          "Post conditional checks after an upgrade has been applied on all eligible clusters.",
        ).optional(),
        upgrade: z.object({
          name: z.unknown().describe(
            'Name of the upgrade, e.g., "k8s_control_plane". It should be a valid upgrade name. It must not exceet 99 characters.',
          ).optional(),
          version: z.unknown().describe(
            'Version of the upgrade, e.g., "1.22.1-gke.100". It should be a valid version. It must not exceet 99 characters.',
          ).optional(),
        }).describe(
          "GKEUpgrade represents a GKE provided upgrade, e.g., control plane upgrade.",
        ).optional(),
      })).describe(
        "Allow users to override some properties of each GKE upgrade.",
      ).optional(),
      postConditions: z.object({
        soaking: z.string().describe(
          'Required. Amount of time to "soak" after a rollout has been finished before marking it COMPLETE. Cannot exceed 30 days. Required.',
        ).optional(),
      }).describe(
        "Post conditional checks after an upgrade has been applied on all eligible clusters.",
      ).optional(),
      upstreamFleets: z.array(z.string()).describe(
        "This fleet consumes upgrades that have COMPLETE status code in the upstream fleets. See UpgradeStatus.Code for code definitions. The fleet name should be either fleet project number or id. This is defined as repeated for future proof reasons. Initial implementation will enforce at most one upstream fleet.",
      ).optional(),
    }).describe(
      "**ClusterUpgrade**: The configuration for the fleet-level ClusterUpgrade feature.",
    ).optional(),
    dataplanev2: z.object({
      enableEncryption: z.boolean().describe(
        "Enable dataplane-v2 based encryption for multiple clusters.",
      ).optional(),
    }).describe("**Dataplane V2**: Spec").optional(),
    fleetobservability: z.object({
      loggingConfig: z.object({
        defaultConfig: z.object({
          mode: z.enum(["MODE_UNSPECIFIED", "COPY", "MOVE"]).describe(
            "mode configures the logs routing mode.",
          ).optional(),
        }).describe(
          "RoutingConfig configures the behaviour of fleet logging feature.",
        ).optional(),
        fleetScopeLogsConfig: z.object({
          mode: z.enum(["MODE_UNSPECIFIED", "COPY", "MOVE"]).describe(
            "mode configures the logs routing mode.",
          ).optional(),
        }).describe(
          "RoutingConfig configures the behaviour of fleet logging feature.",
        ).optional(),
      }).describe(
        "LoggingConfig defines the configuration for different types of logs.",
      ).optional(),
    }).describe(
      "**Fleet Observability**: The Hub-wide input for the FleetObservability feature.",
    ).optional(),
    mesh: z.object({
      modernizationCompatibility: z.enum([
        "MODERNIZATION_COMPATIBILITY_UNSPECIFIED",
        "VALIDATION_ENABLED",
        "VALIDATION_DISABLED",
      ]).describe(
        "Optional. Specifies modernization compatibility for the fleet.",
      ).optional(),
    }).describe(
      "**Service Mesh**: Spec for the fleet for the servicemesh feature",
    ).optional(),
    multiclusteringress: z.object({
      configMembership: z.string().describe(
        "Fully-qualified Membership name which hosts the MultiClusterIngress CRD. Example: `projects/foo-proj/locations/global/memberships/bar`",
      ).optional(),
    }).describe(
      "**Multi-cluster Ingress**: The configuration for the MultiClusterIngress feature.",
    ).optional(),
    rbacrolebindingactuation: z.object({
      allowedCustomRoles: z.array(z.string()).describe(
        "The list of allowed custom roles (ClusterRoles). If a ClusterRole is not part of this list, it cannot be used in a Scope RBACRoleBinding. If a ClusterRole in this list is in use, it cannot be removed from the list.",
      ).optional(),
    }).describe(
      "**RBAC RoleBinding Actuation**: The Hub-wide input for the RBACRoleBindingActuation feature.",
    ).optional(),
    workloadidentity: z.object({
      scopeTenancyPool: z.string().describe(
        "Pool to be used for Workload Identity. This pool in trust-domain mode is used with Fleet Tenancy, so that sameness can be enforced. ex: projects/example/locations/global/workloadidentitypools/custompool",
      ).optional(),
    }).describe("**WorkloadIdentity**: Global feature specification.")
      .optional(),
  }).describe("CommonFeatureSpec contains Fleet-wide configuration information")
    .optional(),
  state: z.object({
    appdevexperience: z.object({
      networkingInstallSucceeded: z.object({
        code: z.enum(["CODE_UNSPECIFIED", "OK", "FAILED", "UNKNOWN"]).describe(
          "Code specifies AppDevExperienceFeature's subcomponent ready state.",
        ).optional(),
        description: z.string().describe(
          "Description is populated if Code is Failed, explaining why it has failed.",
        ).optional(),
      }).describe("Status specifies state for the subcomponent.").optional(),
    }).describe("State for App Dev Exp Feature.").optional(),
    clusterupgrade: z.object({
      downstreamFleets: z.array(z.string()).describe(
        "This fleets whose upstream_fleets contain the current fleet. The fleet name should be either fleet project number or id.",
      ).optional(),
      gkeState: z.object({
        conditions: z.array(z.object({
          reason: z.unknown().describe(
            "Reason why the feature is in this status.",
          ).optional(),
          status: z.unknown().describe(
            "Status of the condition, one of True, False, Unknown.",
          ).optional(),
          type: z.unknown().describe(
            'Type of the condition, for example, "ready".',
          ).optional(),
          updateTime: z.unknown().describe(
            "Last timestamp the condition was updated.",
          ).optional(),
        })).describe("Current conditions of the feature.").optional(),
        upgradeState: z.array(z.object({
          stats: z.unknown().describe(
            "Number of GKE clusters in each status code.",
          ).optional(),
          status: z.unknown().describe(
            "UpgradeStatus provides status information for each upgrade.",
          ).optional(),
          upgrade: z.unknown().describe(
            "GKEUpgrade represents a GKE provided upgrade, e.g., control plane upgrade.",
          ).optional(),
        })).describe("Upgrade state. It will eventually replace `state`.")
          .optional(),
      }).describe(
        "GKEUpgradeFeatureState contains feature states for GKE clusters in the scope.",
      ).optional(),
      ignored: z.record(
        z.string(),
        z.object({
          ignoredTime: z.string().describe(
            "Time when the membership was first set to ignored.",
          ).optional(),
          reason: z.string().describe("Reason why the membership is ignored.")
            .optional(),
        }),
      ).describe(
        "A list of memberships ignored by the feature. For example, manually upgraded clusters can be ignored if they are newer than the default versions of its release channel. The membership resource is in the format: `projects/{p}/locations/{l}/membership/{m}`.",
      ).optional(),
    }).describe(
      "**ClusterUpgrade**: The state for the fleet-level ClusterUpgrade feature.",
    ).optional(),
    fleetobservability: z.object({
      logging: z.object({
        defaultLog: z.object({
          code: z.enum(["CODE_UNSPECIFIED", "OK", "ERROR"]).describe(
            "The high-level, machine-readable status of this Feature.",
          ).optional(),
          errors: z.array(z.unknown()).describe(
            "Errors after reconciling the monitoring and logging feature if the code is not OK.",
          ).optional(),
        }).describe("Base state for fleet observability feature.").optional(),
        scopeLog: z.object({
          code: z.enum(["CODE_UNSPECIFIED", "OK", "ERROR"]).describe(
            "The high-level, machine-readable status of this Feature.",
          ).optional(),
          errors: z.array(z.unknown()).describe(
            "Errors after reconciling the monitoring and logging feature if the code is not OK.",
          ).optional(),
        }).describe("Base state for fleet observability feature.").optional(),
      }).describe("Feature state for logging feature.").optional(),
      monitoring: z.object({
        state: z.object({
          code: z.enum(["CODE_UNSPECIFIED", "OK", "ERROR"]).describe(
            "The high-level, machine-readable status of this Feature.",
          ).optional(),
          errors: z.array(z.unknown()).describe(
            "Errors after reconciling the monitoring and logging feature if the code is not OK.",
          ).optional(),
        }).describe("Base state for fleet observability feature.").optional(),
      }).describe("Feature state for monitoring feature.").optional(),
    }).describe(
      "**FleetObservability**: Hub-wide Feature for FleetObservability feature. state.",
    ).optional(),
    rbacrolebindingactuation: z.object({}).describe(
      "**RBAC RoleBinding Actuation**: An empty state left as an example Hub-wide Feature state.",
    ).optional(),
    state: z.object({
      code: z.enum(["CODE_UNSPECIFIED", "OK", "WARNING", "ERROR"]).describe(
        "The high-level, machine-readable status of this Feature.",
      ).optional(),
      description: z.string().describe(
        "A human-readable description of the current status.",
      ).optional(),
      updateTime: z.string().describe(
        "The time this status and any related Feature-specific details were updated.",
      ).optional(),
    }).describe(
      "FeatureState describes the high-level state of a Feature. It may be used to describe a Feature's state at the environ-level, or per-membershop, depending on the context.",
    ).optional(),
    workloadidentity: z.object({
      namespaceStateDetails: z.record(
        z.string(),
        z.object({
          code: z.enum([
            "NAMESPACE_STATE_UNSPECIFIED",
            "NAMESPACE_STATE_OK",
            "NAMESPACE_STATE_ERROR",
          ]).describe("The state of the IAM namespace.").optional(),
          description: z.string().describe(
            "A human-readable description of the current state or returned error.",
          ).optional(),
        }),
      ).describe("The state of the IAM namespaces for the fleet.").optional(),
      namespaceStates: z.record(
        z.string(),
        z.enum([
          "NAMESPACE_STATE_UNSPECIFIED",
          "NAMESPACE_STATE_OK",
          "NAMESPACE_STATE_ERROR",
        ]),
      ).describe(
        "Deprecated, this field will be erased after code is changed to use the new field.",
      ).optional(),
      scopeTenancyWorkloadIdentityPool: z.string().describe(
        "The full name of the scope-tenancy pool for the fleet.",
      ).optional(),
      workloadIdentityPool: z.string().describe(
        "The full name of the svc.id.goog pool for the fleet.",
      ).optional(),
      workloadIdentityPoolStateDetails: z.record(
        z.string(),
        z.object({
          code: z.enum([
            "WORKLOAD_IDENTITY_POOL_STATE_UNSPECIFIED",
            "WORKLOAD_IDENTITY_POOL_STATE_OK",
            "WORKLOAD_IDENTITY_POOL_STATE_ERROR",
          ]).describe("The state of the Workload Identity Pool.").optional(),
          description: z.string().describe(
            "A human-readable description of the current state or returned error.",
          ).optional(),
        }),
      ).describe("The state of the Workload Identity Pools for the fleet.")
        .optional(),
    }).describe("**WorkloadIdentity**: Global feature state.").optional(),
  }).describe(
    "CommonFeatureState contains Fleet-wide Feature status information.",
  ).optional(),
  featureId: z.string().describe("The ID of the feature to create.").optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud GKE Hub Features. Registered at `@swamp/gcp/gkehub/features`. */
export const model = {
  type: "@swamp/gcp/gkehub/features",
  version: "2026.06.12.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Feature represents the settings and status of any Fleet Feature.",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["fleetDefaultMemberConfig"] !== undefined) {
          body["fleetDefaultMemberConfig"] = g["fleetDefaultMemberConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["membershipSpecs"] !== undefined) {
          body["membershipSpecs"] = g["membershipSpecs"];
        }
        if (g["resourceState"] !== undefined) {
          body["resourceState"] = g["resourceState"];
        }
        if (g["scopeSpecs"] !== undefined) body["scopeSpecs"] = g["scopeSpecs"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["featureId"] !== undefined) body["featureId"] = g["featureId"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["fleetDefaultMemberConfig"] !== undefined) {
          body["fleetDefaultMemberConfig"] = g["fleetDefaultMemberConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["membershipSpecs"] !== undefined) {
          body["membershipSpecs"] = g["membershipSpecs"];
        }
        if (g["resourceState"] !== undefined) {
          body["resourceState"] = g["resourceState"];
        }
        if (g["scopeSpecs"] !== undefined) body["scopeSpecs"] = g["scopeSpecs"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["state"] !== undefined) body["state"] = g["state"];
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync features state from GCP",
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
      description: "List features resources",
      arguments: z.object({
        filter: z.string().describe(
          'Lists Features that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Examples: - Feature with the name "servicemesh" in project "foo-proj": name = "projects/foo-proj/locations/global/features/servicemesh" - Features that have a label called `foo`: labels.foo:* - Features that have a label called `foo` whose value is `bar`: labels.foo = bar',
        ).optional(),
        orderBy: z.string().describe(
          "One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering.",
        ).optional(),
        pageSize: z.number().describe(
          "When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned.",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Optional. If set to true, the response will return partial results when some regions are unreachable and the unreachable field in Feature proto will be populated. If set to false, the request will fail when some regions are unreachable.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
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
            "id": "gkehub.projects.locations.features.getIamPolicy",
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
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
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "gkehub.projects.locations.features.setIamPolicy",
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
            "id": "gkehub.projects.locations.features.testIamPermissions",
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
