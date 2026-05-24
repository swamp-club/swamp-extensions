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
  getProjectId,
  isResourceNotFoundError,
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
  labels: z.record(z.string(), z.string()).describe(
    "Google Cloud labels for this MembershipFeature.",
  ).optional(),
  lifecycleState: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ENABLING",
      "ACTIVE",
      "DISABLING",
      "UPDATING",
      "SERVICE_UPDATING",
    ]).describe(
      "Output only. The current state of the Feature resource in the Hub API.",
    ).optional(),
  }).describe(
    'LifecycleState describes the state of a MembershipFeature *resource* in the GkeHub API. See `FeatureState` for the "running state" of the MembershipFeature.',
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
    }).describe(
      "**Cloud Build**: Configurations for each Cloud Build enabled cluster.",
    ).optional(),
    configmanagement: z.object({
      binauthz: z.object({
        enabled: z.boolean().describe(
          "Whether binauthz is enabled in this cluster.",
        ).optional(),
      }).describe("Configuration for Binauthz.").optional(),
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
        }).describe("OCI repo configuration for a single cluster.").optional(),
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
      }).describe("Configuration for Hierarchy Controller.").optional(),
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
    }).describe("**IdentityService**: Configuration for a single membership.")
      .optional(),
    origin: z.object({
      type: z.enum(["TYPE_UNSPECIFIED", "FLEET", "FLEET_OUT_OF_SYNC", "USER"])
        .describe("Type specifies which type of origin is set.").optional(),
    }).describe("Origin defines where this FeatureSpec originated from.")
      .optional(),
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
    rbacrolebindingactuation: z.object({}).describe(
      "**RBAC RoleBinding Actuation**: The membership-specific input for RBACRoleBindingActuation feature.",
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
    }).describe(
      "**Service Mesh**: Spec for a single Membership for the servicemesh feature",
    ).optional(),
    workloadcertificate: z.object({
      certificateManagement: z.enum([
        "CERTIFICATE_MANAGEMENT_UNSPECIFIED",
        "DISABLED",
        "ENABLED",
      ]).describe(
        "CertificateManagement specifies workload certificate management.",
      ).optional(),
    }).describe(
      "**WorkloadCertificate**: The membership-specific input for WorkloadCertificate feature.",
    ).optional(),
  }).describe("FeatureSpec contains user input per-feature spec information.")
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
      ignored: z.object({
        ignoredTime: z.string().describe(
          "Time when the membership was first set to ignored.",
        ).optional(),
        reason: z.string().describe("Reason why the membership is ignored.")
          .optional(),
      }).describe(
        "IgnoredMembership represents a membership ignored by the feature. A membership can be ignored because it was manually upgraded to a newer version than RC default.",
      ).optional(),
      upgrades: z.array(z.object({
        status: z.object({
          code: z.unknown().describe("Status code of the upgrade.").optional(),
          reason: z.unknown().describe("Reason for this status.").optional(),
          updateTime: z.unknown().describe(
            "Last timestamp the status was updated.",
          ).optional(),
        }).describe(
          "UpgradeStatus provides status information for each upgrade.",
        ).optional(),
        upgrade: z.object({
          name: z.unknown().describe(
            'Name of the upgrade, e.g., "k8s_control_plane".',
          ).optional(),
          version: z.unknown().describe(
            'Version of the upgrade, e.g., "1.22.1-gke.100".',
          ).optional(),
        }).describe(
          "GKEUpgrade represents a GKE provided upgrade, e.g., control plane upgrade.",
        ).optional(),
      })).describe("Actual upgrade state against desired.").optional(),
    }).describe("Per-membership state for this feature.").optional(),
    configmanagement: z.object({
      binauthzState: z.object({
        version: z.object({
          webhookVersion: z.string().describe(
            "The version of the binauthz webhook.",
          ).optional(),
        }).describe("The version of binauthz.").optional(),
        webhook: z.enum([
          "DEPLOYMENT_STATE_UNSPECIFIED",
          "NOT_INSTALLED",
          "INSTALLED",
          "ERROR",
          "PENDING",
        ]).describe("The state of the binauthz webhook.").optional(),
      }).describe("State for Binauthz.").optional(),
      clusterName: z.string().describe(
        "Output only. This field is set to the `cluster_name` field of the Membership Spec if it is not empty. Otherwise, it is set to the cluster's fleet membership name.",
      ).optional(),
      configSyncState: z.object({
        clusterLevelStopSyncingState: z.enum([
          "STOP_SYNCING_STATE_UNSPECIFIED",
          "NOT_STOPPED",
          "PENDING",
          "STOPPED",
        ]).describe(
          "Output only. Whether syncing resources to the cluster is stopped at the cluster level.",
        ).optional(),
        crCount: z.number().int().describe(
          "Output only. The number of RootSync and RepoSync CRs in the cluster.",
        ).optional(),
        deploymentState: z.object({
          admissionWebhook: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of admission-webhook.").optional(),
          gitSync: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of the git-sync pod.").optional(),
          importer: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of the importer pod.").optional(),
          monitor: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of the monitor pod.").optional(),
          otelCollector: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of otel-collector").optional(),
          reconcilerManager: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of reconciler-manager pod.").optional(),
          resourceGroupControllerManager: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of resource-group-controller-manager")
            .optional(),
          rootReconciler: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of root-reconciler.").optional(),
          syncer: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of the syncer pod.").optional(),
        }).describe("The state of ConfigSync's deployment on a cluster.")
          .optional(),
        errors: z.array(z.object({
          errorMessage: z.unknown().describe(
            "A string representing the user facing error message",
          ).optional(),
        })).describe(
          "Output only. Errors pertaining to the installation of Config Sync.",
        ).optional(),
        reposyncCrd: z.enum([
          "CRD_STATE_UNSPECIFIED",
          "NOT_INSTALLED",
          "INSTALLED",
          "TERMINATING",
          "INSTALLING",
        ]).describe("Output only. The state of the Reposync CRD").optional(),
        rootsyncCrd: z.enum([
          "CRD_STATE_UNSPECIFIED",
          "NOT_INSTALLED",
          "INSTALLED",
          "TERMINATING",
          "INSTALLING",
        ]).describe("Output only. The state of the RootSync CRD").optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "CONFIG_SYNC_NOT_INSTALLED",
          "CONFIG_SYNC_INSTALLED",
          "CONFIG_SYNC_ERROR",
          "CONFIG_SYNC_PENDING",
        ]).describe(
          "Output only. The state of CS This field summarizes the other fields in this message.",
        ).optional(),
        syncState: z.object({
          code: z.enum([
            "SYNC_CODE_UNSPECIFIED",
            "SYNCED",
            "PENDING",
            "ERROR",
            "NOT_CONFIGURED",
            "NOT_INSTALLED",
            "UNAUTHORIZED",
            "UNREACHABLE",
          ]).describe("Sync status code.").optional(),
          errors: z.array(z.unknown()).describe(
            "A list of errors resulting from problematic configs. This list will be truncated after 100 errors, although it is unlikely for that many errors to simultaneously exist.",
          ).optional(),
          importToken: z.string().describe(
            "Token indicating the state of the importer.",
          ).optional(),
          lastSync: z.string().describe(
            "Deprecated: use last_sync_time instead. Timestamp of when ACM last successfully synced the repo. The time format is specified in https://golang.org/pkg/time/#Time.String",
          ).optional(),
          lastSyncTime: z.string().describe(
            "Timestamp type of when ACM last successfully synced the repo.",
          ).optional(),
          sourceToken: z.string().describe(
            "Token indicating the state of the repo.",
          ).optional(),
          syncToken: z.string().describe(
            "Token indicating the state of the syncer.",
          ).optional(),
        }).describe(
          "State indicating an ACM's progress syncing configurations to a cluster.",
        ).optional(),
        version: z.object({
          admissionWebhook: z.string().describe(
            "Version of the deployed admission-webhook pod.",
          ).optional(),
          gitSync: z.string().describe("Version of the deployed git-sync pod.")
            .optional(),
          importer: z.string().describe("Version of the deployed importer pod.")
            .optional(),
          monitor: z.string().describe("Version of the deployed monitor pod.")
            .optional(),
          otelCollector: z.string().describe(
            "Version of the deployed otel-collector pod",
          ).optional(),
          reconcilerManager: z.string().describe(
            "Version of the deployed reconciler-manager pod.",
          ).optional(),
          resourceGroupControllerManager: z.string().describe(
            "Version of the deployed resource-group-controller-manager pod",
          ).optional(),
          rootReconciler: z.string().describe(
            "Version of the deployed reconciler container in root-reconciler pod.",
          ).optional(),
          syncer: z.string().describe("Version of the deployed syncer pod.")
            .optional(),
        }).describe(
          "Specific versioning information pertaining to ConfigSync's Pods.",
        ).optional(),
      }).describe("State information for ConfigSync.").optional(),
      hierarchyControllerState: z.object({
        state: z.object({
          extension: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe(
            "The deployment state for Hierarchy Controller extension (e.g. v0.7.0-hc.1).",
          ).optional(),
          hnc: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe(
            "The deployment state for open source HNC (e.g. v0.7.0-hc.0).",
          ).optional(),
        }).describe("Deployment state for Hierarchy Controller").optional(),
        version: z.object({
          extension: z.string().describe(
            "Version for Hierarchy Controller extension.",
          ).optional(),
          hnc: z.string().describe("Version for open source HNC.").optional(),
        }).describe("Version for Hierarchy Controller.").optional(),
      }).describe("State for Hierarchy Controller.").optional(),
      kubernetesApiServerVersion: z.string().describe(
        "Output only. The Kubernetes API server version of the cluster.",
      ).optional(),
      membershipSpec: z.object({
        binauthz: z.object({
          enabled: z.boolean().describe(
            "Whether binauthz is enabled in this cluster.",
          ).optional(),
        }).describe("Configuration for Binauthz.").optional(),
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
          }).describe("OCI repo configuration for a single cluster.")
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
        }).describe("Configuration for Hierarchy Controller.").optional(),
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
      operatorState: z.object({
        deploymentState: z.enum([
          "DEPLOYMENT_STATE_UNSPECIFIED",
          "NOT_INSTALLED",
          "INSTALLED",
          "ERROR",
          "PENDING",
        ]).describe("The state of the Operator's deployment.").optional(),
        errors: z.array(z.object({
          errorMessage: z.unknown().describe(
            "A string representing the user facing error message.",
          ).optional(),
        })).describe("Install errors.").optional(),
        version: z.string().describe(
          "The semenatic version number of the operator.",
        ).optional(),
      }).describe("State information for an ACM's Operator.").optional(),
      policyControllerState: z.object({
        deploymentState: z.object({
          gatekeeperAudit: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Status of gatekeeper-audit deployment.").optional(),
          gatekeeperControllerManagerState: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Status of gatekeeper-controller-manager pod.")
            .optional(),
          gatekeeperMutation: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Status of the pod serving the mutation webhook.")
            .optional(),
        }).describe("State of Policy Controller installation.").optional(),
        migration: z.object({
          copyTime: z.string().describe(
            "Last time this membership spec was copied to PoCo feature.",
          ).optional(),
          stage: z.enum(["STAGE_UNSPECIFIED", "ACM_MANAGED", "POCO_MANAGED"])
            .describe("Stage of the migration.").optional(),
        }).describe(
          "State for the migration of PolicyController from ACM -> PoCo Hub.",
        ).optional(),
        version: z.object({
          version: z.string().describe(
            "The gatekeeper image tag that is composed of ACM version, git tag, build number.",
          ).optional(),
        }).describe(
          "The build version of Gatekeeper Policy Controller is using.",
        ).optional(),
      }).describe("State for PolicyControllerState.").optional(),
    }).describe("**Anthos Config Management**: State for a single cluster.")
      .optional(),
    identityservice: z.object({
      failureReason: z.string().describe("The reason of the failure.")
        .optional(),
      installedVersion: z.string().describe(
        "Installed AIS version. This is the AIS version installed on this member. The values makes sense iff state is OK.",
      ).optional(),
      memberConfig: z.object({
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
      }).describe("**IdentityService**: Configuration for a single membership.")
        .optional(),
      state: z.enum(["DEPLOYMENT_STATE_UNSPECIFIED", "OK", "ERROR"]).describe(
        "Deployment state on this member",
      ).optional(),
    }).describe(
      "**IdentityService**: State for a single membership, analyzed and reported by feature controller.",
    ).optional(),
    metering: z.object({
      lastMeasurementTime: z.string().describe(
        "The time stamp of the most recent measurement of the number of vCPUs in the cluster.",
      ).optional(),
      preciseLastMeasuredClusterVcpuCapacity: z.number().describe(
        "The vCPUs capacity in the cluster according to the most recent measurement (1/1000 precision).",
      ).optional(),
    }).describe(
      "**Metering**: State for a single membership, analyzed and reported by feature controller.",
    ).optional(),
    policycontroller: z.object({
      componentStates: z.record(
        z.string(),
        z.object({
          details: z.string().describe(
            "Surface potential errors or information logs.",
          ).optional(),
          state: z.enum([
            "LIFECYCLE_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLING",
            "ACTIVE",
            "UPDATING",
            "DECOMMISSIONING",
            "CLUSTER_ERROR",
            "HUB_ERROR",
            "SUSPENDED",
            "DETACHED",
          ]).describe("The lifecycle state of this component.").optional(),
        }),
      ).describe(
        'Currently these include (also serving as map keys): 1. "admission" 2. "audit" 3. "mutation"',
      ).optional(),
      policyContentState: z.object({
        bundleStates: z.record(
          z.string(),
          z.object({
            details: z.unknown().describe(
              "Surface potential errors or information logs.",
            ).optional(),
            state: z.unknown().describe(
              "The lifecycle state of this component.",
            ).optional(),
          }),
        ).describe(
          "The state of the any bundles included in the chosen version of the manifest",
        ).optional(),
        referentialSyncConfigState: z.object({
          details: z.string().describe(
            "Surface potential errors or information logs.",
          ).optional(),
          state: z.enum([
            "LIFECYCLE_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLING",
            "ACTIVE",
            "UPDATING",
            "DECOMMISSIONING",
            "CLUSTER_ERROR",
            "HUB_ERROR",
            "SUSPENDED",
            "DETACHED",
          ]).describe("The lifecycle state of this component.").optional(),
        }).describe(
          "OnClusterState represents the state of a sub-component of Policy Controller.",
        ).optional(),
        templateLibraryState: z.object({
          details: z.string().describe(
            "Surface potential errors or information logs.",
          ).optional(),
          state: z.enum([
            "LIFECYCLE_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLING",
            "ACTIVE",
            "UPDATING",
            "DECOMMISSIONING",
            "CLUSTER_ERROR",
            "HUB_ERROR",
            "SUSPENDED",
            "DETACHED",
          ]).describe("The lifecycle state of this component.").optional(),
        }).describe(
          "OnClusterState represents the state of a sub-component of Policy Controller.",
        ).optional(),
      }).describe("The state of the policy controller policy content")
        .optional(),
      state: z.enum([
        "LIFECYCLE_STATE_UNSPECIFIED",
        "NOT_INSTALLED",
        "INSTALLING",
        "ACTIVE",
        "UPDATING",
        "DECOMMISSIONING",
        "CLUSTER_ERROR",
        "HUB_ERROR",
        "SUSPENDED",
        "DETACHED",
      ]).describe(
        "The overall Policy Controller lifecycle state observed by the Hub Feature controller.",
      ).optional(),
    }).describe("**Policy Controller**: State for a single cluster.")
      .optional(),
    rbacrolebindingactuation: z.object({
      rbacrolebindingStates: z.record(
        z.string(),
        z.object({
          description: z.string().describe("The reason for the failure.")
            .optional(),
          state: z.enum([
            "ROLE_BINDING_STATE_UNSPECIFIED",
            "OK",
            "CUSTOM_ROLE_MISSING_FROM_CLUSTER",
          ]).describe("Output only. The state of the RBACRoleBinding.")
            .optional(),
          updateTime: z.string().describe(
            "The time the RBACRoleBinding status was last updated.",
          ).optional(),
        }),
      ).describe(
        "Output only. The state of RBACRoleBindings using custom roles that exist on the cluster, keyed by RBACRoleBinding resource name with format: projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}.",
      ).optional(),
    }).describe(
      "**RBAC RoleBinding Actuation**: A membership-specific Feature state for the RBACRoleBindingActuation fleet feature.",
    ).optional(),
    servicemesh: z.object({
      analysisMessages: z.array(z.object({
        args: z.record(z.string(), z.unknown()).describe(
          "A UI can combine these args with a template (based on message_base.type) to produce an internationalized message.",
        ).optional(),
        description: z.string().describe(
          "A human readable description of what the error means. It is suitable for non-internationalize display purposes.",
        ).optional(),
        messageBase: z.object({
          documentationUrl: z.unknown().describe(
            "A url pointing to the Service Mesh or Istio documentation for this specific error type.",
          ).optional(),
          level: z.unknown().describe("Represents how severe a message is.")
            .optional(),
          type: z.unknown().describe(
            "A unique identifier for the type of message. Display_name is intended to be human-readable, code is intended to be machine readable. There should be a one-to-one mapping between display_name and code. (i.e. do not re-use display_names or codes between message types.) See istio.analysis.v1alpha1.AnalysisMessageBase.Type",
          ).optional(),
        }).describe(
          "AnalysisMessageBase describes some common information that is needed for all messages.",
        ).optional(),
        resourcePaths: z.array(z.unknown()).describe(
          'A list of strings specifying the resource identifiers that were the cause of message generation. A "path" here may be: * MEMBERSHIP_ID if the cause is a specific member cluster * MEMBERSHIP_ID/(NAMESPACE\\/)?RESOURCETYPE/NAME if the cause is a resource in a cluster',
        ).optional(),
      })).describe("Output only. Results of running Service Mesh analyzers.")
        .optional(),
      conditions: z.array(z.object({
        code: z.enum([
          "CODE_UNSPECIFIED",
          "MESH_IAM_PERMISSION_DENIED",
          "MESH_IAM_CROSS_PROJECT_PERMISSION_DENIED",
          "CNI_CONFIG_UNSUPPORTED",
          "GKE_SANDBOX_UNSUPPORTED",
          "NODEPOOL_WORKLOAD_IDENTITY_FEDERATION_REQUIRED",
          "CNI_INSTALLATION_FAILED",
          "CNI_POD_UNSCHEDULABLE",
          "CLUSTER_HAS_ZERO_NODES",
          "CANONICAL_SERVICE_ERROR",
          "UNSUPPORTED_MULTIPLE_CONTROL_PLANES",
          "VPCSC_GA_SUPPORTED",
          "DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT",
          "DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT_SAFE",
          "CONFIG_APPLY_INTERNAL_ERROR",
          "CONFIG_VALIDATION_ERROR",
          "CONFIG_VALIDATION_WARNING",
          "QUOTA_EXCEEDED_BACKEND_SERVICES",
          "QUOTA_EXCEEDED_HEALTH_CHECKS",
          "QUOTA_EXCEEDED_HTTP_ROUTES",
          "QUOTA_EXCEEDED_TCP_ROUTES",
          "QUOTA_EXCEEDED_TLS_ROUTES",
          "QUOTA_EXCEEDED_TRAFFIC_POLICIES",
          "QUOTA_EXCEEDED_ENDPOINT_POLICIES",
          "QUOTA_EXCEEDED_GATEWAYS",
          "QUOTA_EXCEEDED_MESHES",
          "QUOTA_EXCEEDED_SERVER_TLS_POLICIES",
          "QUOTA_EXCEEDED_CLIENT_TLS_POLICIES",
          "QUOTA_EXCEEDED_SERVICE_LB_POLICIES",
          "QUOTA_EXCEEDED_HTTP_FILTERS",
          "QUOTA_EXCEEDED_TCP_FILTERS",
          "QUOTA_EXCEEDED_NETWORK_ENDPOINT_GROUPS",
          "CONFIG_APPLY_BLOCKED",
          "LEGACY_MC_SECRETS",
          "WORKLOAD_IDENTITY_REQUIRED",
          "NON_STANDARD_BINARY_USAGE",
          "UNSUPPORTED_GATEWAY_CLASS",
          "MANAGED_CNI_NOT_ENABLED",
          "MODERNIZATION_SCHEDULED",
          "MODERNIZATION_IN_PROGRESS",
          "MODERNIZATION_COMPLETED",
          "MODERNIZATION_ABORTED",
          "MODERNIZATION_PREPARING",
          "MODERNIZATION_STALLED",
          "MODERNIZATION_PREPARED",
          "MODERNIZATION_MIGRATING_WORKLOADS",
          "MODERNIZATION_ROLLING_BACK_CLUSTER",
          "MODERNIZATION_WILL_BE_SCHEDULED",
          "MODERNIZATION_MANUAL",
          "MODERNIZATION_ELIGIBLE",
          "MODERNIZATION_MODERNIZING",
          "MODERNIZATION_MODERNIZED_SOAKING",
          "MODERNIZATION_FINALIZED",
          "MODERNIZATION_ROLLING_BACK_FLEET",
        ]).describe(
          "Unique identifier of the condition which describes the condition recognizable to the user.",
        ).optional(),
        details: z.string().describe("A short summary about the issue.")
          .optional(),
        documentationLink: z.string().describe(
          "Links contains actionable information.",
        ).optional(),
        severity: z.enum(["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"])
          .describe("Severity level of the condition.").optional(),
      })).describe(
        "Output only. List of conditions reported for this membership.",
      ).optional(),
      configApiVersion: z.string().describe(
        "The API version (i.e. Istio CRD version) for configuring service mesh in this cluster. This version is influenced by the `default_channel` field.",
      ).optional(),
      controlPlaneManagement: z.object({
        details: z.array(z.object({
          code: z.unknown().describe(
            "A machine-readable code that further describes a broad status.",
          ).optional(),
          details: z.unknown().describe("Human-readable explanation of code.")
            .optional(),
        })).describe("Explanation of state.").optional(),
        implementation: z.enum([
          "IMPLEMENTATION_UNSPECIFIED",
          "ISTIOD",
          "TRAFFIC_DIRECTOR",
          "UPDATING",
        ]).describe("Output only. Implementation of managed control plane.")
          .optional(),
        state: z.enum([
          "LIFECYCLE_STATE_UNSPECIFIED",
          "DISABLED",
          "FAILED_PRECONDITION",
          "PROVISIONING",
          "ACTIVE",
          "STALLED",
          "NEEDS_ATTENTION",
          "DEGRADED",
          "DEPROVISIONING",
        ]).describe("LifecycleState of control plane management.").optional(),
      }).describe("Status of control plane management.").optional(),
      dataPlaneManagement: z.object({
        details: z.array(z.object({
          code: z.unknown().describe(
            "A machine-readable code that further describes a broad status.",
          ).optional(),
          details: z.unknown().describe("Human-readable explanation of code.")
            .optional(),
        })).describe("Explanation of the status.").optional(),
        state: z.enum([
          "LIFECYCLE_STATE_UNSPECIFIED",
          "DISABLED",
          "FAILED_PRECONDITION",
          "PROVISIONING",
          "ACTIVE",
          "STALLED",
          "NEEDS_ATTENTION",
          "DEGRADED",
          "DEPROVISIONING",
        ]).describe("Lifecycle status of data plane management.").optional(),
      }).describe("Status of data plane management. Only reported per-member.")
        .optional(),
    }).describe(
      "**Service Mesh**: State for a single Membership, as analyzed by the Service Mesh Hub Controller.",
    ).optional(),
    state: z.object({
      code: z.enum(["CODE_UNSPECIFIED", "OK", "WARNING", "ERROR"]).describe(
        "The high-level, machine-readable status of this MembershipFeature.",
      ).optional(),
      description: z.string().describe(
        "A human-readable description of the current status.",
      ).optional(),
      updateTime: z.string().describe(
        "The time this status and any related Feature-specific details were updated.",
      ).optional(),
    }).describe("High-level state of a MembershipFeature.").optional(),
    workloadidentity: z.object({
      description: z.string().describe(
        "Deprecated, this field will be erased after code is changed to use the new field.",
      ).optional(),
      identityProviderStateDetails: z.record(
        z.string(),
        z.object({
          code: z.enum([
            "IDENTITY_PROVIDER_STATE_UNSPECIFIED",
            "IDENTITY_PROVIDER_STATE_OK",
            "IDENTITY_PROVIDER_STATE_ERROR",
          ]).describe("The state of the Identity Provider.").optional(),
          description: z.string().describe(
            "A human-readable description of the current state or returned error.",
          ).optional(),
        }),
      ).describe(
        "The state of the Identity Providers corresponding to the membership.",
      ).optional(),
    }).describe(
      "**WorkloadIdentity**: The membership-specific state for WorkloadIdentity feature.",
    ).optional(),
  }).describe(
    "FeatureState contains high-level state information and per-feature state information for this MembershipFeature.",
  ).optional(),
  featureId: z.string().describe(
    "Required. The ID of the membership_feature to create.",
  ).optional(),
  requestId: z.string().describe("Idempotent request UUID.").optional(),
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
  labels: z.record(z.string(), z.string()).describe(
    "Google Cloud labels for this MembershipFeature.",
  ).optional(),
  lifecycleState: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ENABLING",
      "ACTIVE",
      "DISABLING",
      "UPDATING",
      "SERVICE_UPDATING",
    ]).describe(
      "Output only. The current state of the Feature resource in the Hub API.",
    ).optional(),
  }).describe(
    'LifecycleState describes the state of a MembershipFeature *resource* in the GkeHub API. See `FeatureState` for the "running state" of the MembershipFeature.',
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
    }).describe(
      "**Cloud Build**: Configurations for each Cloud Build enabled cluster.",
    ).optional(),
    configmanagement: z.object({
      binauthz: z.object({
        enabled: z.boolean().describe(
          "Whether binauthz is enabled in this cluster.",
        ).optional(),
      }).describe("Configuration for Binauthz.").optional(),
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
        }).describe("OCI repo configuration for a single cluster.").optional(),
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
      }).describe("Configuration for Hierarchy Controller.").optional(),
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
    }).describe("**IdentityService**: Configuration for a single membership.")
      .optional(),
    origin: z.object({
      type: z.enum(["TYPE_UNSPECIFIED", "FLEET", "FLEET_OUT_OF_SYNC", "USER"])
        .describe("Type specifies which type of origin is set.").optional(),
    }).describe("Origin defines where this FeatureSpec originated from.")
      .optional(),
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
    rbacrolebindingactuation: z.object({}).describe(
      "**RBAC RoleBinding Actuation**: The membership-specific input for RBACRoleBindingActuation feature.",
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
    }).describe(
      "**Service Mesh**: Spec for a single Membership for the servicemesh feature",
    ).optional(),
    workloadcertificate: z.object({
      certificateManagement: z.enum([
        "CERTIFICATE_MANAGEMENT_UNSPECIFIED",
        "DISABLED",
        "ENABLED",
      ]).describe(
        "CertificateManagement specifies workload certificate management.",
      ).optional(),
    }).describe(
      "**WorkloadCertificate**: The membership-specific input for WorkloadCertificate feature.",
    ).optional(),
  }).describe("FeatureSpec contains user input per-feature spec information.")
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
      ignored: z.object({
        ignoredTime: z.string().describe(
          "Time when the membership was first set to ignored.",
        ).optional(),
        reason: z.string().describe("Reason why the membership is ignored.")
          .optional(),
      }).describe(
        "IgnoredMembership represents a membership ignored by the feature. A membership can be ignored because it was manually upgraded to a newer version than RC default.",
      ).optional(),
      upgrades: z.array(z.object({
        status: z.object({
          code: z.unknown().describe("Status code of the upgrade.").optional(),
          reason: z.unknown().describe("Reason for this status.").optional(),
          updateTime: z.unknown().describe(
            "Last timestamp the status was updated.",
          ).optional(),
        }).describe(
          "UpgradeStatus provides status information for each upgrade.",
        ).optional(),
        upgrade: z.object({
          name: z.unknown().describe(
            'Name of the upgrade, e.g., "k8s_control_plane".',
          ).optional(),
          version: z.unknown().describe(
            'Version of the upgrade, e.g., "1.22.1-gke.100".',
          ).optional(),
        }).describe(
          "GKEUpgrade represents a GKE provided upgrade, e.g., control plane upgrade.",
        ).optional(),
      })).describe("Actual upgrade state against desired.").optional(),
    }).describe("Per-membership state for this feature.").optional(),
    configmanagement: z.object({
      binauthzState: z.object({
        version: z.object({
          webhookVersion: z.string().describe(
            "The version of the binauthz webhook.",
          ).optional(),
        }).describe("The version of binauthz.").optional(),
        webhook: z.enum([
          "DEPLOYMENT_STATE_UNSPECIFIED",
          "NOT_INSTALLED",
          "INSTALLED",
          "ERROR",
          "PENDING",
        ]).describe("The state of the binauthz webhook.").optional(),
      }).describe("State for Binauthz.").optional(),
      clusterName: z.string().describe(
        "Output only. This field is set to the `cluster_name` field of the Membership Spec if it is not empty. Otherwise, it is set to the cluster's fleet membership name.",
      ).optional(),
      configSyncState: z.object({
        clusterLevelStopSyncingState: z.enum([
          "STOP_SYNCING_STATE_UNSPECIFIED",
          "NOT_STOPPED",
          "PENDING",
          "STOPPED",
        ]).describe(
          "Output only. Whether syncing resources to the cluster is stopped at the cluster level.",
        ).optional(),
        crCount: z.number().int().describe(
          "Output only. The number of RootSync and RepoSync CRs in the cluster.",
        ).optional(),
        deploymentState: z.object({
          admissionWebhook: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of admission-webhook.").optional(),
          gitSync: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of the git-sync pod.").optional(),
          importer: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of the importer pod.").optional(),
          monitor: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of the monitor pod.").optional(),
          otelCollector: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of otel-collector").optional(),
          reconcilerManager: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of reconciler-manager pod.").optional(),
          resourceGroupControllerManager: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of resource-group-controller-manager")
            .optional(),
          rootReconciler: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of root-reconciler.").optional(),
          syncer: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Deployment state of the syncer pod.").optional(),
        }).describe("The state of ConfigSync's deployment on a cluster.")
          .optional(),
        errors: z.array(z.object({
          errorMessage: z.unknown().describe(
            "A string representing the user facing error message",
          ).optional(),
        })).describe(
          "Output only. Errors pertaining to the installation of Config Sync.",
        ).optional(),
        reposyncCrd: z.enum([
          "CRD_STATE_UNSPECIFIED",
          "NOT_INSTALLED",
          "INSTALLED",
          "TERMINATING",
          "INSTALLING",
        ]).describe("Output only. The state of the Reposync CRD").optional(),
        rootsyncCrd: z.enum([
          "CRD_STATE_UNSPECIFIED",
          "NOT_INSTALLED",
          "INSTALLED",
          "TERMINATING",
          "INSTALLING",
        ]).describe("Output only. The state of the RootSync CRD").optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "CONFIG_SYNC_NOT_INSTALLED",
          "CONFIG_SYNC_INSTALLED",
          "CONFIG_SYNC_ERROR",
          "CONFIG_SYNC_PENDING",
        ]).describe(
          "Output only. The state of CS This field summarizes the other fields in this message.",
        ).optional(),
        syncState: z.object({
          code: z.enum([
            "SYNC_CODE_UNSPECIFIED",
            "SYNCED",
            "PENDING",
            "ERROR",
            "NOT_CONFIGURED",
            "NOT_INSTALLED",
            "UNAUTHORIZED",
            "UNREACHABLE",
          ]).describe("Sync status code.").optional(),
          errors: z.array(z.unknown()).describe(
            "A list of errors resulting from problematic configs. This list will be truncated after 100 errors, although it is unlikely for that many errors to simultaneously exist.",
          ).optional(),
          importToken: z.string().describe(
            "Token indicating the state of the importer.",
          ).optional(),
          lastSync: z.string().describe(
            "Deprecated: use last_sync_time instead. Timestamp of when ACM last successfully synced the repo. The time format is specified in https://golang.org/pkg/time/#Time.String",
          ).optional(),
          lastSyncTime: z.string().describe(
            "Timestamp type of when ACM last successfully synced the repo.",
          ).optional(),
          sourceToken: z.string().describe(
            "Token indicating the state of the repo.",
          ).optional(),
          syncToken: z.string().describe(
            "Token indicating the state of the syncer.",
          ).optional(),
        }).describe(
          "State indicating an ACM's progress syncing configurations to a cluster.",
        ).optional(),
        version: z.object({
          admissionWebhook: z.string().describe(
            "Version of the deployed admission-webhook pod.",
          ).optional(),
          gitSync: z.string().describe("Version of the deployed git-sync pod.")
            .optional(),
          importer: z.string().describe("Version of the deployed importer pod.")
            .optional(),
          monitor: z.string().describe("Version of the deployed monitor pod.")
            .optional(),
          otelCollector: z.string().describe(
            "Version of the deployed otel-collector pod",
          ).optional(),
          reconcilerManager: z.string().describe(
            "Version of the deployed reconciler-manager pod.",
          ).optional(),
          resourceGroupControllerManager: z.string().describe(
            "Version of the deployed resource-group-controller-manager pod",
          ).optional(),
          rootReconciler: z.string().describe(
            "Version of the deployed reconciler container in root-reconciler pod.",
          ).optional(),
          syncer: z.string().describe("Version of the deployed syncer pod.")
            .optional(),
        }).describe(
          "Specific versioning information pertaining to ConfigSync's Pods.",
        ).optional(),
      }).describe("State information for ConfigSync.").optional(),
      hierarchyControllerState: z.object({
        state: z.object({
          extension: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe(
            "The deployment state for Hierarchy Controller extension (e.g. v0.7.0-hc.1).",
          ).optional(),
          hnc: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe(
            "The deployment state for open source HNC (e.g. v0.7.0-hc.0).",
          ).optional(),
        }).describe("Deployment state for Hierarchy Controller").optional(),
        version: z.object({
          extension: z.string().describe(
            "Version for Hierarchy Controller extension.",
          ).optional(),
          hnc: z.string().describe("Version for open source HNC.").optional(),
        }).describe("Version for Hierarchy Controller.").optional(),
      }).describe("State for Hierarchy Controller.").optional(),
      kubernetesApiServerVersion: z.string().describe(
        "Output only. The Kubernetes API server version of the cluster.",
      ).optional(),
      membershipSpec: z.object({
        binauthz: z.object({
          enabled: z.boolean().describe(
            "Whether binauthz is enabled in this cluster.",
          ).optional(),
        }).describe("Configuration for Binauthz.").optional(),
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
          }).describe("OCI repo configuration for a single cluster.")
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
        }).describe("Configuration for Hierarchy Controller.").optional(),
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
      operatorState: z.object({
        deploymentState: z.enum([
          "DEPLOYMENT_STATE_UNSPECIFIED",
          "NOT_INSTALLED",
          "INSTALLED",
          "ERROR",
          "PENDING",
        ]).describe("The state of the Operator's deployment.").optional(),
        errors: z.array(z.object({
          errorMessage: z.unknown().describe(
            "A string representing the user facing error message.",
          ).optional(),
        })).describe("Install errors.").optional(),
        version: z.string().describe(
          "The semenatic version number of the operator.",
        ).optional(),
      }).describe("State information for an ACM's Operator.").optional(),
      policyControllerState: z.object({
        deploymentState: z.object({
          gatekeeperAudit: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Status of gatekeeper-audit deployment.").optional(),
          gatekeeperControllerManagerState: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Status of gatekeeper-controller-manager pod.")
            .optional(),
          gatekeeperMutation: z.enum([
            "DEPLOYMENT_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLED",
            "ERROR",
            "PENDING",
          ]).describe("Status of the pod serving the mutation webhook.")
            .optional(),
        }).describe("State of Policy Controller installation.").optional(),
        migration: z.object({
          copyTime: z.string().describe(
            "Last time this membership spec was copied to PoCo feature.",
          ).optional(),
          stage: z.enum(["STAGE_UNSPECIFIED", "ACM_MANAGED", "POCO_MANAGED"])
            .describe("Stage of the migration.").optional(),
        }).describe(
          "State for the migration of PolicyController from ACM -> PoCo Hub.",
        ).optional(),
        version: z.object({
          version: z.string().describe(
            "The gatekeeper image tag that is composed of ACM version, git tag, build number.",
          ).optional(),
        }).describe(
          "The build version of Gatekeeper Policy Controller is using.",
        ).optional(),
      }).describe("State for PolicyControllerState.").optional(),
    }).describe("**Anthos Config Management**: State for a single cluster.")
      .optional(),
    identityservice: z.object({
      failureReason: z.string().describe("The reason of the failure.")
        .optional(),
      installedVersion: z.string().describe(
        "Installed AIS version. This is the AIS version installed on this member. The values makes sense iff state is OK.",
      ).optional(),
      memberConfig: z.object({
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
      }).describe("**IdentityService**: Configuration for a single membership.")
        .optional(),
      state: z.enum(["DEPLOYMENT_STATE_UNSPECIFIED", "OK", "ERROR"]).describe(
        "Deployment state on this member",
      ).optional(),
    }).describe(
      "**IdentityService**: State for a single membership, analyzed and reported by feature controller.",
    ).optional(),
    metering: z.object({
      lastMeasurementTime: z.string().describe(
        "The time stamp of the most recent measurement of the number of vCPUs in the cluster.",
      ).optional(),
      preciseLastMeasuredClusterVcpuCapacity: z.number().describe(
        "The vCPUs capacity in the cluster according to the most recent measurement (1/1000 precision).",
      ).optional(),
    }).describe(
      "**Metering**: State for a single membership, analyzed and reported by feature controller.",
    ).optional(),
    policycontroller: z.object({
      componentStates: z.record(
        z.string(),
        z.object({
          details: z.string().describe(
            "Surface potential errors or information logs.",
          ).optional(),
          state: z.enum([
            "LIFECYCLE_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLING",
            "ACTIVE",
            "UPDATING",
            "DECOMMISSIONING",
            "CLUSTER_ERROR",
            "HUB_ERROR",
            "SUSPENDED",
            "DETACHED",
          ]).describe("The lifecycle state of this component.").optional(),
        }),
      ).describe(
        'Currently these include (also serving as map keys): 1. "admission" 2. "audit" 3. "mutation"',
      ).optional(),
      policyContentState: z.object({
        bundleStates: z.record(
          z.string(),
          z.object({
            details: z.unknown().describe(
              "Surface potential errors or information logs.",
            ).optional(),
            state: z.unknown().describe(
              "The lifecycle state of this component.",
            ).optional(),
          }),
        ).describe(
          "The state of the any bundles included in the chosen version of the manifest",
        ).optional(),
        referentialSyncConfigState: z.object({
          details: z.string().describe(
            "Surface potential errors or information logs.",
          ).optional(),
          state: z.enum([
            "LIFECYCLE_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLING",
            "ACTIVE",
            "UPDATING",
            "DECOMMISSIONING",
            "CLUSTER_ERROR",
            "HUB_ERROR",
            "SUSPENDED",
            "DETACHED",
          ]).describe("The lifecycle state of this component.").optional(),
        }).describe(
          "OnClusterState represents the state of a sub-component of Policy Controller.",
        ).optional(),
        templateLibraryState: z.object({
          details: z.string().describe(
            "Surface potential errors or information logs.",
          ).optional(),
          state: z.enum([
            "LIFECYCLE_STATE_UNSPECIFIED",
            "NOT_INSTALLED",
            "INSTALLING",
            "ACTIVE",
            "UPDATING",
            "DECOMMISSIONING",
            "CLUSTER_ERROR",
            "HUB_ERROR",
            "SUSPENDED",
            "DETACHED",
          ]).describe("The lifecycle state of this component.").optional(),
        }).describe(
          "OnClusterState represents the state of a sub-component of Policy Controller.",
        ).optional(),
      }).describe("The state of the policy controller policy content")
        .optional(),
      state: z.enum([
        "LIFECYCLE_STATE_UNSPECIFIED",
        "NOT_INSTALLED",
        "INSTALLING",
        "ACTIVE",
        "UPDATING",
        "DECOMMISSIONING",
        "CLUSTER_ERROR",
        "HUB_ERROR",
        "SUSPENDED",
        "DETACHED",
      ]).describe(
        "The overall Policy Controller lifecycle state observed by the Hub Feature controller.",
      ).optional(),
    }).describe("**Policy Controller**: State for a single cluster.")
      .optional(),
    rbacrolebindingactuation: z.object({
      rbacrolebindingStates: z.record(
        z.string(),
        z.object({
          description: z.string().describe("The reason for the failure.")
            .optional(),
          state: z.enum([
            "ROLE_BINDING_STATE_UNSPECIFIED",
            "OK",
            "CUSTOM_ROLE_MISSING_FROM_CLUSTER",
          ]).describe("Output only. The state of the RBACRoleBinding.")
            .optional(),
          updateTime: z.string().describe(
            "The time the RBACRoleBinding status was last updated.",
          ).optional(),
        }),
      ).describe(
        "Output only. The state of RBACRoleBindings using custom roles that exist on the cluster, keyed by RBACRoleBinding resource name with format: projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}.",
      ).optional(),
    }).describe(
      "**RBAC RoleBinding Actuation**: A membership-specific Feature state for the RBACRoleBindingActuation fleet feature.",
    ).optional(),
    servicemesh: z.object({
      analysisMessages: z.array(z.object({
        args: z.record(z.string(), z.unknown()).describe(
          "A UI can combine these args with a template (based on message_base.type) to produce an internationalized message.",
        ).optional(),
        description: z.string().describe(
          "A human readable description of what the error means. It is suitable for non-internationalize display purposes.",
        ).optional(),
        messageBase: z.object({
          documentationUrl: z.unknown().describe(
            "A url pointing to the Service Mesh or Istio documentation for this specific error type.",
          ).optional(),
          level: z.unknown().describe("Represents how severe a message is.")
            .optional(),
          type: z.unknown().describe(
            "A unique identifier for the type of message. Display_name is intended to be human-readable, code is intended to be machine readable. There should be a one-to-one mapping between display_name and code. (i.e. do not re-use display_names or codes between message types.) See istio.analysis.v1alpha1.AnalysisMessageBase.Type",
          ).optional(),
        }).describe(
          "AnalysisMessageBase describes some common information that is needed for all messages.",
        ).optional(),
        resourcePaths: z.array(z.unknown()).describe(
          'A list of strings specifying the resource identifiers that were the cause of message generation. A "path" here may be: * MEMBERSHIP_ID if the cause is a specific member cluster * MEMBERSHIP_ID/(NAMESPACE\\/)?RESOURCETYPE/NAME if the cause is a resource in a cluster',
        ).optional(),
      })).describe("Output only. Results of running Service Mesh analyzers.")
        .optional(),
      conditions: z.array(z.object({
        code: z.enum([
          "CODE_UNSPECIFIED",
          "MESH_IAM_PERMISSION_DENIED",
          "MESH_IAM_CROSS_PROJECT_PERMISSION_DENIED",
          "CNI_CONFIG_UNSUPPORTED",
          "GKE_SANDBOX_UNSUPPORTED",
          "NODEPOOL_WORKLOAD_IDENTITY_FEDERATION_REQUIRED",
          "CNI_INSTALLATION_FAILED",
          "CNI_POD_UNSCHEDULABLE",
          "CLUSTER_HAS_ZERO_NODES",
          "CANONICAL_SERVICE_ERROR",
          "UNSUPPORTED_MULTIPLE_CONTROL_PLANES",
          "VPCSC_GA_SUPPORTED",
          "DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT",
          "DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT_SAFE",
          "CONFIG_APPLY_INTERNAL_ERROR",
          "CONFIG_VALIDATION_ERROR",
          "CONFIG_VALIDATION_WARNING",
          "QUOTA_EXCEEDED_BACKEND_SERVICES",
          "QUOTA_EXCEEDED_HEALTH_CHECKS",
          "QUOTA_EXCEEDED_HTTP_ROUTES",
          "QUOTA_EXCEEDED_TCP_ROUTES",
          "QUOTA_EXCEEDED_TLS_ROUTES",
          "QUOTA_EXCEEDED_TRAFFIC_POLICIES",
          "QUOTA_EXCEEDED_ENDPOINT_POLICIES",
          "QUOTA_EXCEEDED_GATEWAYS",
          "QUOTA_EXCEEDED_MESHES",
          "QUOTA_EXCEEDED_SERVER_TLS_POLICIES",
          "QUOTA_EXCEEDED_CLIENT_TLS_POLICIES",
          "QUOTA_EXCEEDED_SERVICE_LB_POLICIES",
          "QUOTA_EXCEEDED_HTTP_FILTERS",
          "QUOTA_EXCEEDED_TCP_FILTERS",
          "QUOTA_EXCEEDED_NETWORK_ENDPOINT_GROUPS",
          "CONFIG_APPLY_BLOCKED",
          "LEGACY_MC_SECRETS",
          "WORKLOAD_IDENTITY_REQUIRED",
          "NON_STANDARD_BINARY_USAGE",
          "UNSUPPORTED_GATEWAY_CLASS",
          "MANAGED_CNI_NOT_ENABLED",
          "MODERNIZATION_SCHEDULED",
          "MODERNIZATION_IN_PROGRESS",
          "MODERNIZATION_COMPLETED",
          "MODERNIZATION_ABORTED",
          "MODERNIZATION_PREPARING",
          "MODERNIZATION_STALLED",
          "MODERNIZATION_PREPARED",
          "MODERNIZATION_MIGRATING_WORKLOADS",
          "MODERNIZATION_ROLLING_BACK_CLUSTER",
          "MODERNIZATION_WILL_BE_SCHEDULED",
          "MODERNIZATION_MANUAL",
          "MODERNIZATION_ELIGIBLE",
          "MODERNIZATION_MODERNIZING",
          "MODERNIZATION_MODERNIZED_SOAKING",
          "MODERNIZATION_FINALIZED",
          "MODERNIZATION_ROLLING_BACK_FLEET",
        ]).describe(
          "Unique identifier of the condition which describes the condition recognizable to the user.",
        ).optional(),
        details: z.string().describe("A short summary about the issue.")
          .optional(),
        documentationLink: z.string().describe(
          "Links contains actionable information.",
        ).optional(),
        severity: z.enum(["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"])
          .describe("Severity level of the condition.").optional(),
      })).describe(
        "Output only. List of conditions reported for this membership.",
      ).optional(),
      configApiVersion: z.string().describe(
        "The API version (i.e. Istio CRD version) for configuring service mesh in this cluster. This version is influenced by the `default_channel` field.",
      ).optional(),
      controlPlaneManagement: z.object({
        details: z.array(z.object({
          code: z.unknown().describe(
            "A machine-readable code that further describes a broad status.",
          ).optional(),
          details: z.unknown().describe("Human-readable explanation of code.")
            .optional(),
        })).describe("Explanation of state.").optional(),
        implementation: z.enum([
          "IMPLEMENTATION_UNSPECIFIED",
          "ISTIOD",
          "TRAFFIC_DIRECTOR",
          "UPDATING",
        ]).describe("Output only. Implementation of managed control plane.")
          .optional(),
        state: z.enum([
          "LIFECYCLE_STATE_UNSPECIFIED",
          "DISABLED",
          "FAILED_PRECONDITION",
          "PROVISIONING",
          "ACTIVE",
          "STALLED",
          "NEEDS_ATTENTION",
          "DEGRADED",
          "DEPROVISIONING",
        ]).describe("LifecycleState of control plane management.").optional(),
      }).describe("Status of control plane management.").optional(),
      dataPlaneManagement: z.object({
        details: z.array(z.object({
          code: z.unknown().describe(
            "A machine-readable code that further describes a broad status.",
          ).optional(),
          details: z.unknown().describe("Human-readable explanation of code.")
            .optional(),
        })).describe("Explanation of the status.").optional(),
        state: z.enum([
          "LIFECYCLE_STATE_UNSPECIFIED",
          "DISABLED",
          "FAILED_PRECONDITION",
          "PROVISIONING",
          "ACTIVE",
          "STALLED",
          "NEEDS_ATTENTION",
          "DEGRADED",
          "DEPROVISIONING",
        ]).describe("Lifecycle status of data plane management.").optional(),
      }).describe("Status of data plane management. Only reported per-member.")
        .optional(),
    }).describe(
      "**Service Mesh**: State for a single Membership, as analyzed by the Service Mesh Hub Controller.",
    ).optional(),
    state: z.object({
      code: z.enum(["CODE_UNSPECIFIED", "OK", "WARNING", "ERROR"]).describe(
        "The high-level, machine-readable status of this MembershipFeature.",
      ).optional(),
      description: z.string().describe(
        "A human-readable description of the current status.",
      ).optional(),
      updateTime: z.string().describe(
        "The time this status and any related Feature-specific details were updated.",
      ).optional(),
    }).describe("High-level state of a MembershipFeature.").optional(),
    workloadidentity: z.object({
      description: z.string().describe(
        "Deprecated, this field will be erased after code is changed to use the new field.",
      ).optional(),
      identityProviderStateDetails: z.record(
        z.string(),
        z.object({
          code: z.enum([
            "IDENTITY_PROVIDER_STATE_UNSPECIFIED",
            "IDENTITY_PROVIDER_STATE_OK",
            "IDENTITY_PROVIDER_STATE_ERROR",
          ]).describe("The state of the Identity Provider.").optional(),
          description: z.string().describe(
            "A human-readable description of the current state or returned error.",
          ).optional(),
        }),
      ).describe(
        "The state of the Identity Providers corresponding to the membership.",
      ).optional(),
    }).describe(
      "**WorkloadIdentity**: The membership-specific state for WorkloadIdentity feature.",
    ).optional(),
  }).describe(
    "FeatureState contains high-level state information and per-feature state information for this MembershipFeature.",
  ).optional(),
  featureId: z.string().describe(
    "Required. The ID of the membership_feature to create.",
  ).optional(),
  requestId: z.string().describe("Idempotent request UUID.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud GKE Hub Memberships.Features. Registered at `@swamp/gcp/gkehub/memberships-features`. */
export const model = {
  type: "@swamp/gcp/gkehub/memberships-features",
  version: "2026.05.24.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lifecycleState"] !== undefined) {
          body["lifecycleState"] = g["lifecycleState"];
        }
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
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lifecycleState"] !== undefined) {
          body["lifecycleState"] = g["lifecycleState"];
        }
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync features state from GCP",
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
  },
};
