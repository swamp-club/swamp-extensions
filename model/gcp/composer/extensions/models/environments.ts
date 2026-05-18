// Auto-generated extension model for @swamp/gcp/composer/environments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Composer Environments.
 *
 * An environment for running orchestration tasks.
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
  return `${parent}/environments/${shortName}`;
}

const BASE_URL = "https://composer.googleapis.com/";

const GET_CONFIG = {
  "id": "composer.projects.locations.environments.get",
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
  "id": "composer.projects.locations.environments.create",
  "path": "v1/{+parent}/environments",
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

const PATCH_CONFIG = {
  "id": "composer.projects.locations.environments.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "composer.projects.locations.environments.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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

const GlobalArgsSchema = z.object({
  config: z.object({
    airflowByoidUri: z.string().describe(
      "Output only. The 'bring your own identity' variant of the URI of the Apache Airflow Web UI hosted within this environment, to be accessed with external identities using workforce identity federation (see [Access environments with workforce identity federation](/composer/docs/composer-2/access-environments-with-workforce-identity-federation)).",
    ).optional(),
    airflowUri: z.string().describe(
      "Output only. The URI of the Apache Airflow Web UI hosted within this environment (see [Airflow web interface](/composer/docs/how-to/accessing/airflow-web-interface)).",
    ).optional(),
    dagGcsPrefix: z.string().describe(
      'Output only. The Cloud Storage prefix of the DAGs for this environment. Although Cloud Storage objects reside in a flat namespace, a hierarchical file tree can be simulated using "/"-delimited object name prefixes. DAG objects for this environment reside in a simulated directory with the given prefix.',
    ).optional(),
    dataRetentionConfig: z.object({
      airflowMetadataRetentionConfig: z.object({
        retentionDays: z.number().int().describe(
          "Optional. How many days data should be retained for.",
        ).optional(),
        retentionMode: z.enum([
          "RETENTION_MODE_UNSPECIFIED",
          "RETENTION_MODE_ENABLED",
          "RETENTION_MODE_DISABLED",
        ]).describe("Optional. Retention can be either enabled or disabled.")
          .optional(),
      }).describe("The policy for airflow metadata database retention.")
        .optional(),
      taskLogsRetentionConfig: z.object({
        storageMode: z.enum([
          "TASK_LOGS_STORAGE_MODE_UNSPECIFIED",
          "CLOUD_LOGGING_AND_CLOUD_STORAGE",
          "CLOUD_LOGGING_ONLY",
        ]).describe(
          "Optional. The mode of storage for Airflow workers task logs.",
        ).optional(),
      }).describe("The configuration setting for Task Logs.").optional(),
    }).describe(
      "The configuration setting for Airflow database data retention mechanism.",
    ).optional(),
    databaseConfig: z.object({
      machineType: z.string().describe(
        "Optional. Cloud SQL machine type used by Airflow database. It has to be one of: db-n1-standard-2, db-n1-standard-4, db-n1-standard-8 or db-n1-standard-16. If not specified, db-n1-standard-2 will be used. Supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
      ).optional(),
      zone: z.string().describe(
        "Optional. The Compute Engine zone where the Airflow database is created. If zone is provided, it must be in the region selected for the environment. If zone is not provided, a zone is automatically selected. The zone can only be set during environment creation. Supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.*.",
      ).optional(),
    }).describe(
      "The configuration of Cloud SQL instance that is used by the Apache Airflow software.",
    ).optional(),
    encryptionConfig: z.object({
      kmsKeyName: z.string().describe(
        "Optional. Customer-managed Encryption Key available through Google's Key Management Service. Cannot be updated. If not specified, Google-managed key will be used.",
      ).optional(),
    }).describe(
      "The encryption options for the Cloud Composer environment and its dependencies.Supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
    ).optional(),
    environmentSize: z.enum([
      "ENVIRONMENT_SIZE_UNSPECIFIED",
      "ENVIRONMENT_SIZE_SMALL",
      "ENVIRONMENT_SIZE_MEDIUM",
      "ENVIRONMENT_SIZE_LARGE",
      "ENVIRONMENT_SIZE_EXTRA_LARGE",
    ]).describe(
      "Optional. The size of the Cloud Composer environment. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer.",
    ).optional(),
    gkeCluster: z.string().describe(
      "Output only. The Kubernetes Engine cluster used to run this environment.",
    ).optional(),
    maintenanceWindow: z.object({
      endTime: z.string().describe(
        "Required. Maintenance window end time. It is used only to calculate the duration of the maintenance window. The value for end-time must be in the future, relative to `start_time`.",
      ).optional(),
      recurrence: z.string().describe(
        "Required. Maintenance window recurrence. Format is a subset of [RFC-5545](https://tools.ietf.org/html/rfc5545) `RRULE`. The only allowed values for `FREQ` field are `FREQ=DAILY` and `FREQ=WEEKLY;BYDAY=...` Example values: `FREQ=WEEKLY;BYDAY=TU,WE`, `FREQ=DAILY`.",
      ).optional(),
      startTime: z.string().describe(
        "Required. Start time of the first recurrence of the maintenance window.",
      ).optional(),
    }).describe(
      'The configuration settings for Cloud Composer maintenance window. The following example: ` { "startTime":"2019-08-01T01:00:00Z" "endTime":"2019-08-01T07:00:00Z" "recurrence":"FREQ=WEEKLY;BYDAY=TU,WE" } ` would define a maintenance window between 01 and 07 hours UTC during each Tuesday and Wednesday.',
    ).optional(),
    masterAuthorizedNetworksConfig: z.object({
      cidrBlocks: z.array(z.object({
        cidrBlock: z.string().describe(
          "CIDR block that must be specified in CIDR notation.",
        ).optional(),
        displayName: z.string().describe(
          "User-defined name that identifies the CIDR block.",
        ).optional(),
      })).describe(
        "Up to 50 external networks that could access Kubernetes master through HTTPS.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. Whether or not master authorized networks feature is enabled.",
      ).optional(),
    }).describe(
      "Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.",
    ).optional(),
    nodeConfig: z.object({
      composerInternalIpv4CidrBlock: z.string().describe(
        "Optional. The IP range in CIDR notation to use internally by Cloud Composer. IP addresses are not reserved - and the same range can be used by multiple Cloud Composer environments. In case of overlap, IPs from this range will not be accessible in the user's VPC network. Cannot be updated. If not specified, the default value of '100.64.128.0/20' is used. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer.",
      ).optional(),
      composerNetworkAttachment: z.string().describe(
        "Optional. Network Attachment that Cloud Composer environment is connected to, which provides connectivity with a user's VPC network. Takes precedence over network and subnetwork settings. If not provided, but network and subnetwork are defined during environment, it will be provisioned. If not provided and network and subnetwork are also empty, then connectivity to user's VPC network is disabled. Network attachment must be provided in format projects/{project}/regions/{region}/networkAttachments/{networkAttachment}. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer.",
      ).optional(),
      diskSizeGb: z.number().int().describe(
        "Optional. The disk size in GB used for node VMs. Minimum size is 30GB. If unspecified, defaults to 100GB. Cannot be updated. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
      ).optional(),
      enableIpMasqAgent: z.boolean().describe(
        "Optional. Deploys 'ip-masq-agent' daemon set in the GKE cluster and defines nonMasqueradeCIDRs equals to pod IP range so IP masquerading is used for all destination addresses, except between pods traffic. See: https://cloud.google.com/kubernetes-engine/docs/how-to/ip-masquerade-agent",
      ).optional(),
      ipAllocationPolicy: z.object({
        clusterIpv4CidrBlock: z.string().describe(
          "Optional. The IP address range used to allocate IP addresses to pods in the GKE cluster. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true. Set to blank to have GKE choose a range with the default size. Set to /netmask (e.g. `/14`) to have GKE choose a range with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.",
        ).optional(),
        clusterSecondaryRangeName: z.string().describe(
          "Optional. The name of the GKE cluster's secondary range used to allocate IP addresses to pods. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true.",
        ).optional(),
        servicesIpv4CidrBlock: z.string().describe(
          "Optional. The IP address range of the services IP addresses in this GKE cluster. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true. Set to blank to have GKE choose a range with the default size. Set to /netmask (e.g. `/14`) to have GKE choose a range with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.",
        ).optional(),
        servicesSecondaryRangeName: z.string().describe(
          "Optional. The name of the services' secondary range used to allocate IP addresses to the GKE cluster. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true.",
        ).optional(),
        useIpAliases: z.boolean().describe(
          "Optional. Whether or not to enable Alias IPs in the GKE cluster. If `true`, a VPC-native cluster is created. This field is only supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. Environments in newer versions always use VPC-native GKE clusters.",
        ).optional(),
      }).describe(
        "Configuration for controlling how IPs are allocated in the GKE cluster running the Apache Airflow software.",
      ).optional(),
      location: z.string().describe(
        'Optional. The Compute Engine [zone](/compute/docs/regions-zones) in which to deploy the VMs used to run the Apache Airflow software, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/zones/{zoneId}". This `location` must belong to the enclosing environment\'s project and location. If both this field and `nodeConfig.machineType` are specified, `nodeConfig.machineType` must belong to this `location`; if both are unspecified, the service will pick a zone in the Compute Engine region corresponding to the Cloud Composer location, and propagate that choice to both fields. If only one field (`location` or `nodeConfig.machineType`) is specified, the location information from the specified field will be propagated to the unspecified field. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.',
      ).optional(),
      machineType: z.string().describe(
        'Optional. The Compute Engine [machine type](/compute/docs/machine-types) used for cluster instances, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/zones/{zoneId}/machineTypes/{machineTypeId}". The `machineType` must belong to the enclosing environment\'s project and location. If both this field and `nodeConfig.location` are specified, this `machineType` must belong to the `nodeConfig.location`; if both are unspecified, the service will pick a zone in the Compute Engine region corresponding to the Cloud Composer location, and propagate that choice to both fields. If exactly one of this field and `nodeConfig.location` is specified, the location information from the specified field will be propagated to the unspecified field. The `machineTypeId` must not be a [shared-core machine type](/compute/docs/machine-types#sharedcore). If this field is unspecified, the `machineTypeId` defaults to "n1-standard-1". This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.',
      ).optional(),
      network: z.string().describe(
        'Optional. The Compute Engine network to be used for machine communications, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/global/networks/{networkId}". If unspecified, the "default" network ID in the environment\'s project is used. If a [Custom Subnet Network](/vpc/docs/vpc#vpc_networks_and_subnets) is provided, `nodeConfig.subnetwork` must also be provided. For [Shared VPC](/vpc/docs/shared-vpc) subnetwork requirements, see `nodeConfig.subnetwork`.',
      ).optional(),
      oauthScopes: z.array(z.string()).describe(
        'Optional. The set of Google API scopes to be made available on all node VMs. If `oauth_scopes` is empty, defaults to ["https://www.googleapis.com/auth/cloud-platform"]. Cannot be updated. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.',
      ).optional(),
      serviceAccount: z.string().describe(
        'Optional. The Google Cloud Platform Service Account to be used by the node VMs. If a service account is not specified, the "default" Compute Engine service account is used. Cannot be updated.',
      ).optional(),
      subnetwork: z.string().describe(
        'Optional. The Compute Engine subnetwork to be used for machine communications, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/regions/{regionId}/subnetworks/{subnetworkId}" If a subnetwork is provided, `nodeConfig.network` must also be provided, and the subnetwork must belong to the enclosing environment\'s project and location.',
      ).optional(),
      tags: z.array(z.string()).describe(
        "Optional. The list of instance tags applied to all node VMs. Tags are used to identify valid sources or targets for network firewalls. Each tag within the list must comply with [RFC1035](https://www.ietf.org/rfc/rfc1035.txt). Cannot be updated.",
      ).optional(),
    }).describe(
      "The configuration information for the Kubernetes Engine nodes running the Apache Airflow software.",
    ).optional(),
    nodeCount: z.number().int().describe(
      "The number of nodes in the Kubernetes Engine cluster that will be used to run this environment. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
    ).optional(),
    privateEnvironmentConfig: z.object({
      cloudComposerConnectionSubnetwork: z.string().describe(
        "Optional. When specified, the environment will use Private Service Connect instead of VPC peerings to connect to Cloud SQL in the Tenant Project, and the PSC endpoint in the Customer Project will use an IP address from this subnetwork.",
      ).optional(),
      cloudComposerNetworkIpv4CidrBlock: z.string().describe(
        "Optional. The CIDR block from which IP range for Cloud Composer Network in tenant project will be reserved. Needs to be disjoint from private_cluster_config.master_ipv4_cidr_block and cloud_sql_ipv4_cidr_block. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer.",
      ).optional(),
      cloudComposerNetworkIpv4ReservedRange: z.string().describe(
        "Output only. The IP range reserved for the tenant project's Cloud Composer network. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer.",
      ).optional(),
      cloudSqlIpv4CidrBlock: z.string().describe(
        "Optional. The CIDR block from which IP range in tenant project will be reserved for Cloud SQL. Needs to be disjoint from `web_server_ipv4_cidr_block`.",
      ).optional(),
      enablePrivateBuildsOnly: z.boolean().describe(
        "Optional. If `true`, builds performed during operations that install Python packages have only private connectivity to Google services (including Artifact Registry) and VPC network (if either `NodeConfig.network` and `NodeConfig.subnetwork` fields or `NodeConfig.composer_network_attachment` field are specified). If `false`, the builds also have access to the internet. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer.",
      ).optional(),
      enablePrivateEnvironment: z.boolean().describe(
        "Optional. If `true`, a Private IP Cloud Composer environment is created. If this field is set to true, `IPAllocationPolicy.use_ip_aliases` must be set to true for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. This field is going to be deprecated. Use `networking_type` instead.",
      ).optional(),
      enablePrivatelyUsedPublicIps: z.boolean().describe(
        "Optional. When enabled, IPs from public (non-RFC1918) ranges can be used for `IPAllocationPolicy.cluster_ipv4_cidr_block` and `IPAllocationPolicy.service_ipv4_cidr_block`.",
      ).optional(),
      networkingConfig: z.object({
        connectionType: z.enum([
          "CONNECTION_TYPE_UNSPECIFIED",
          "VPC_PEERING",
          "PRIVATE_SERVICE_CONNECT",
        ]).describe(
          "Optional. Indicates the user requested specific connection type between Tenant and Customer projects. You cannot set networking connection type in public IP environment.",
        ).optional(),
      }).describe(
        "Configuration options for networking connections in the Composer 2 environment.",
      ).optional(),
      networkingType: z.enum([
        "NETWORKING_TYPE_UNSPECIFIED",
        "PRIVATE",
        "PUBLIC",
      ]).describe(
        "Optional. Networking type for the environment, either private or public.",
      ).optional(),
      privateClusterConfig: z.object({
        enablePrivateEndpoint: z.boolean().describe(
          "Optional. If `true`, access to the public endpoint of the GKE cluster is denied.",
        ).optional(),
        masterIpv4CidrBlock: z.string().describe(
          "Optional. The CIDR block from which IPv4 range for GKE master will be reserved. If left blank, the default value of '172.16.0.0/23' is used.",
        ).optional(),
        masterIpv4ReservedRange: z.string().describe(
          "Output only. The IP range in CIDR notation to use for the hosted master network. This range is used for assigning internal IP addresses to the GKE cluster master or set of masters and to the internal load balancer virtual IP. This range must not overlap with any other ranges in use within the cluster's network.",
        ).optional(),
      }).describe(
        "Configuration options for the private GKE cluster in a Cloud Composer environment.",
      ).optional(),
      webServerIpv4CidrBlock: z.string().describe(
        "Optional. The CIDR block from which IP range for web server will be reserved. Needs to be disjoint from `private_cluster_config.master_ipv4_cidr_block` and `cloud_sql_ipv4_cidr_block`. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
      ).optional(),
      webServerIpv4ReservedRange: z.string().describe(
        "Output only. The IP range reserved for the tenant project's App Engine VMs. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
      ).optional(),
    }).describe(
      "The configuration information for configuring a Private IP Cloud Composer environment.",
    ).optional(),
    recoveryConfig: z.object({
      scheduledSnapshotsConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether scheduled snapshots creation is enabled.",
        ).optional(),
        snapshotCreationSchedule: z.string().describe(
          "Optional. The cron expression representing the time when snapshots creation mechanism runs. This field is subject to additional validation around frequency of execution.",
        ).optional(),
        snapshotLocation: z.string().describe(
          "Optional. The Cloud Storage location for storing automatically created snapshots.",
        ).optional(),
        timeZone: z.string().describe(
          "Optional. Time zone that sets the context to interpret snapshot_creation_schedule.",
        ).optional(),
      }).describe(
        "The configuration for scheduled snapshot creation mechanism.",
      ).optional(),
    }).describe("The Recovery settings of an environment.").optional(),
    resilienceMode: z.enum(["RESILIENCE_MODE_UNSPECIFIED", "HIGH_RESILIENCE"])
      .describe(
        "Optional. Resilience mode of the Cloud Composer Environment. This field is supported for Cloud Composer environments in versions composer-2.2.0-airflow-*.*.* and newer.",
      ).optional(),
    softwareConfig: z.object({
      airflowConfigOverrides: z.record(z.string(), z.string()).describe(
        'Optional. Apache Airflow configuration properties to override. Property keys contain the section and property names, separated by a hyphen, for example "core-dags_are_paused_at_creation". Section names must not contain hyphens ("-"), opening square brackets ("["), or closing square brackets ("]"). The property name must not be empty and must not contain an equals sign ("=") or semicolon (";"). Section and property names must not contain a period ("."). Apache Airflow configuration property names must be written in [snake_case](https://en.wikipedia.org/wiki/Snake_case). Property values can contain any character, and can be written in any lower/upper case format. Certain Apache Airflow configuration property values are [blocked](/composer/docs/concepts/airflow-configurations), and cannot be overridden.',
      ).optional(),
      cloudDataLineageIntegration: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether or not Cloud Data Lineage integration is enabled.",
        ).optional(),
      }).describe("Configuration for Cloud Data Lineage integration.")
        .optional(),
      envVariables: z.record(z.string(), z.string()).describe(
        "Optional. Additional environment variables to provide to the Apache Airflow scheduler, worker, and webserver processes. Environment variable names must match the regular expression `a-zA-Z_*`. They cannot specify Apache Airflow software configuration overrides (they cannot match the regular expression `AIRFLOW__[A-Z0-9_]+__[A-Z0-9_]+`), and they cannot match any of the following reserved names: * `AIRFLOW_HOME` * `C_FORCE_ROOT` * `CONTAINER_NAME` * `DAGS_FOLDER` * `GCP_PROJECT` * `GCS_BUCKET` * `GKE_CLUSTER_NAME` * `SQL_DATABASE` * `SQL_INSTANCE` * `SQL_PASSWORD` * `SQL_PROJECT` * `SQL_REGION` * `SQL_USER`",
      ).optional(),
      imageVersion: z.string().describe(
        "Optional. The version of the software running in the environment. This encapsulates both the version of Cloud Composer functionality and the version of Apache Airflow. It must match the regular expression `composer-([0-9]+(\\.[0-9]+\\.[0-9]+(-preview\\.[0-9]+)?)?|latest)-airflow-([0-9]+(\\.[0-9]+(\\.[0-9]+)?)?)`. When used as input, the server also checks if the provided version is supported and denies the request for an unsupported version. The Cloud Composer portion of the image version is a full [semantic version](https://semver.org), or an alias in the form of major version number or `latest`. When an alias is provided, the server replaces it with the current Cloud Composer version that satisfies the alias. The Apache Airflow portion of the image version is a full semantic version that points to one of the supported Apache Airflow versions, or an alias in the form of only major or major.minor versions specified. When an alias is provided, the server replaces it with the latest Apache Airflow version that satisfies the alias and is supported in the given Cloud Composer version. In all cases, the resolved image version is stored in the same field. See also [version list](/composer/docs/concepts/versioning/composer-versions) and [versioning overview](/composer/docs/concepts/versioning/composer-versioning-overview).",
      ).optional(),
      pypiPackages: z.record(z.string(), z.string()).describe(
        'Optional. Custom Python Package Index (PyPI) packages to be installed in the environment. Keys refer to the lowercase package name such as "numpy" and values are the lowercase extras and version specifier such as "==1.12.0", "[devel,gcp_api]", or "[devel]>=1.8.2, <1.9.2". To specify a package without pinning it to a version specifier, use the empty string as the value.',
      ).optional(),
      pythonVersion: z.string().describe(
        "Optional. The major version of Python used to run the Apache Airflow scheduler, worker, and webserver processes. Can be set to '2' or '3'. If not specified, the default is '3'. Cannot be updated. This field is only supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. Environments in newer versions always use Python major version 3.",
      ).optional(),
      schedulerCount: z.number().int().describe(
        "Optional. The number of schedulers for Airflow. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-2.*.*.",
      ).optional(),
      webServerPluginsMode: z.enum([
        "WEB_SERVER_PLUGINS_MODE_UNSPECIFIED",
        "PLUGINS_DISABLED",
        "PLUGINS_ENABLED",
      ]).describe(
        "Optional. Whether or not the web server uses custom plugins. If unspecified, the field defaults to `PLUGINS_ENABLED`. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer.",
      ).optional(),
    }).describe(
      "Specifies the selection and configuration of software inside the environment.",
    ).optional(),
    webServerConfig: z.object({
      machineType: z.string().describe(
        "Optional. Machine type on which Airflow web server is running. It has to be one of: composer-n1-webserver-2, composer-n1-webserver-4 or composer-n1-webserver-8. If not specified, composer-n1-webserver-2 will be used. Value custom is returned only in response, if Airflow web server parameters were manually changed to a non-standard values.",
      ).optional(),
    }).describe(
      "The configuration settings for the Airflow web server App Engine instance. Supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*",
    ).optional(),
    webServerNetworkAccessControl: z.object({
      allowedIpRanges: z.array(z.object({
        description: z.string().describe(
          "Optional. User-provided description. It must contain at most 300 characters.",
        ).optional(),
        value: z.string().describe(
          "IP address or range, defined using CIDR notation, of requests that this rule applies to. Examples: `192.168.1.1` or `192.168.0.0/16` or `2001:db8::/32` or `2001:0db8:0000:0042:0000:8a2e:0370:7334`. IP range prefixes should be properly truncated. For example, `1.2.3.4/24` should be truncated to `1.2.3.0/24`. Similarly, for IPv6, `2001:db8::1/32` should be truncated to `2001:db8::/32`.",
        ).optional(),
      })).describe("A collection of allowed IP ranges with descriptions.")
        .optional(),
    }).describe(
      "Network-level access control policy for the Airflow web server.",
    ).optional(),
    workloadsConfig: z.object({
      dagProcessor: z.object({
        count: z.number().int().describe(
          "Optional. The number of DAG processors. If not provided or set to 0, a single DAG processor instance will be created.",
        ).optional(),
        cpu: z.number().describe(
          "Optional. CPU request and limit for a single Airflow DAG processor replica.",
        ).optional(),
        memoryGb: z.number().describe(
          "Optional. Memory (GB) request and limit for a single Airflow DAG processor replica.",
        ).optional(),
        storageGb: z.number().describe(
          "Optional. Storage (GB) request and limit for a single Airflow DAG processor replica.",
        ).optional(),
      }).describe(
        "Configuration for resources used by Airflow DAG processors. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer.",
      ).optional(),
      scheduler: z.object({
        count: z.number().int().describe("Optional. The number of schedulers.")
          .optional(),
        cpu: z.number().describe(
          "Optional. CPU request and limit for a single Airflow scheduler replica.",
        ).optional(),
        memoryGb: z.number().describe(
          "Optional. Memory (GB) request and limit for a single Airflow scheduler replica.",
        ).optional(),
        storageGb: z.number().describe(
          "Optional. Storage (GB) request and limit for a single Airflow scheduler replica.",
        ).optional(),
      }).describe("Configuration for resources used by Airflow schedulers.")
        .optional(),
      triggerer: z.object({
        count: z.number().int().describe("Optional. The number of triggerers.")
          .optional(),
        cpu: z.number().describe(
          "Optional. CPU request and limit for a single Airflow triggerer replica.",
        ).optional(),
        memoryGb: z.number().describe(
          "Optional. Memory (GB) request and limit for a single Airflow triggerer replica.",
        ).optional(),
      }).describe("Configuration for resources used by Airflow triggerers.")
        .optional(),
      webServer: z.object({
        cpu: z.number().describe(
          "Optional. CPU request and limit for Airflow web server.",
        ).optional(),
        memoryGb: z.number().describe(
          "Optional. Memory (GB) request and limit for Airflow web server.",
        ).optional(),
        storageGb: z.number().describe(
          "Optional. Storage (GB) request and limit for Airflow web server.",
        ).optional(),
      }).describe("Configuration for resources used by Airflow web server.")
        .optional(),
      worker: z.object({
        cpu: z.number().describe(
          "Optional. CPU request and limit for a single Airflow worker replica.",
        ).optional(),
        maxCount: z.number().int().describe(
          "Optional. Maximum number of workers for autoscaling.",
        ).optional(),
        memoryGb: z.number().describe(
          "Optional. Memory (GB) request and limit for a single Airflow worker replica.",
        ).optional(),
        minCount: z.number().int().describe(
          "Optional. Minimum number of workers for autoscaling.",
        ).optional(),
        storageGb: z.number().describe(
          "Optional. Storage (GB) request and limit for a single Airflow worker replica.",
        ).optional(),
      }).describe("Configuration for resources used by Airflow workers.")
        .optional(),
    }).describe(
      "The Kubernetes workloads configuration for GKE cluster associated with the Cloud Composer environment. Supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer.",
    ).optional(),
  }).describe("Configuration information for an environment.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for this environment. The labels map can contain no more than 64 entries. Entries of the labels map are UTF8 strings that comply with the following restrictions: * Keys must conform to regexp: \\p{Ll}\\p{Lo}{0,62} * Values must conform to regexp: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} * Both keys and values are additionally constrained to be <= 128 bytes in size.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The resource name of the environment, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" EnvironmentId must start with a lowercase letter followed by up to 63 lowercase letters, numbers, or hyphens, and cannot end with a hyphen.',
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "RUNNING",
    "UPDATING",
    "DELETING",
    "ERROR",
  ]).describe("The current state of the environment.").optional(),
  storageConfig: z.object({
    bucket: z.string().describe(
      "Optional. The name of the Cloud Storage bucket used by the environment. No `gs://` prefix.",
    ).optional(),
  }).describe("The configuration for data storage in the environment.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  config: z.object({
    airflowByoidUri: z.string(),
    airflowUri: z.string(),
    dagGcsPrefix: z.string(),
    dataRetentionConfig: z.object({
      airflowMetadataRetentionConfig: z.object({
        retentionDays: z.number(),
        retentionMode: z.string(),
      }),
      taskLogsRetentionConfig: z.object({
        storageMode: z.string(),
      }),
    }),
    databaseConfig: z.object({
      machineType: z.string(),
      zone: z.string(),
    }),
    encryptionConfig: z.object({
      kmsKeyName: z.string(),
    }),
    environmentSize: z.string(),
    gkeCluster: z.string(),
    maintenanceWindow: z.object({
      endTime: z.string(),
      recurrence: z.string(),
      startTime: z.string(),
    }),
    masterAuthorizedNetworksConfig: z.object({
      cidrBlocks: z.array(z.object({
        cidrBlock: z.string(),
        displayName: z.string(),
      })),
      enabled: z.boolean(),
    }),
    nodeConfig: z.object({
      composerInternalIpv4CidrBlock: z.string(),
      composerNetworkAttachment: z.string(),
      diskSizeGb: z.number(),
      enableIpMasqAgent: z.boolean(),
      ipAllocationPolicy: z.object({
        clusterIpv4CidrBlock: z.string(),
        clusterSecondaryRangeName: z.string(),
        servicesIpv4CidrBlock: z.string(),
        servicesSecondaryRangeName: z.string(),
        useIpAliases: z.boolean(),
      }),
      location: z.string(),
      machineType: z.string(),
      network: z.string(),
      oauthScopes: z.array(z.string()),
      serviceAccount: z.string(),
      subnetwork: z.string(),
      tags: z.array(z.string()),
    }),
    nodeCount: z.number(),
    privateEnvironmentConfig: z.object({
      cloudComposerConnectionSubnetwork: z.string(),
      cloudComposerNetworkIpv4CidrBlock: z.string(),
      cloudComposerNetworkIpv4ReservedRange: z.string(),
      cloudSqlIpv4CidrBlock: z.string(),
      enablePrivateBuildsOnly: z.boolean(),
      enablePrivateEnvironment: z.boolean(),
      enablePrivatelyUsedPublicIps: z.boolean(),
      networkingConfig: z.object({
        connectionType: z.string(),
      }),
      networkingType: z.string(),
      privateClusterConfig: z.object({
        enablePrivateEndpoint: z.boolean(),
        masterIpv4CidrBlock: z.string(),
        masterIpv4ReservedRange: z.string(),
      }),
      webServerIpv4CidrBlock: z.string(),
      webServerIpv4ReservedRange: z.string(),
    }),
    recoveryConfig: z.object({
      scheduledSnapshotsConfig: z.object({
        enabled: z.boolean(),
        snapshotCreationSchedule: z.string(),
        snapshotLocation: z.string(),
        timeZone: z.string(),
      }),
    }),
    resilienceMode: z.string(),
    softwareConfig: z.object({
      airflowConfigOverrides: z.record(z.string(), z.unknown()),
      cloudDataLineageIntegration: z.object({
        enabled: z.boolean(),
      }),
      envVariables: z.record(z.string(), z.unknown()),
      imageVersion: z.string(),
      pypiPackages: z.record(z.string(), z.unknown()),
      pythonVersion: z.string(),
      schedulerCount: z.number(),
      webServerPluginsMode: z.string(),
    }),
    webServerConfig: z.object({
      machineType: z.string(),
    }),
    webServerNetworkAccessControl: z.object({
      allowedIpRanges: z.array(z.object({
        description: z.string(),
        value: z.string(),
      })),
    }),
    workloadsConfig: z.object({
      dagProcessor: z.object({
        count: z.number(),
        cpu: z.number(),
        memoryGb: z.number(),
        storageGb: z.number(),
      }),
      scheduler: z.object({
        count: z.number(),
        cpu: z.number(),
        memoryGb: z.number(),
        storageGb: z.number(),
      }),
      triggerer: z.object({
        count: z.number(),
        cpu: z.number(),
        memoryGb: z.number(),
      }),
      webServer: z.object({
        cpu: z.number(),
        memoryGb: z.number(),
        storageGb: z.number(),
      }),
      worker: z.object({
        cpu: z.number(),
        maxCount: z.number(),
        memoryGb: z.number(),
        minCount: z.number(),
        storageGb: z.number(),
      }),
    }),
  }).optional(),
  createTime: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  storageConfig: z.object({
    bucket: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
  uuid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  config: z.object({
    airflowByoidUri: z.string().describe(
      "Output only. The 'bring your own identity' variant of the URI of the Apache Airflow Web UI hosted within this environment, to be accessed with external identities using workforce identity federation (see [Access environments with workforce identity federation](/composer/docs/composer-2/access-environments-with-workforce-identity-federation)).",
    ).optional(),
    airflowUri: z.string().describe(
      "Output only. The URI of the Apache Airflow Web UI hosted within this environment (see [Airflow web interface](/composer/docs/how-to/accessing/airflow-web-interface)).",
    ).optional(),
    dagGcsPrefix: z.string().describe(
      'Output only. The Cloud Storage prefix of the DAGs for this environment. Although Cloud Storage objects reside in a flat namespace, a hierarchical file tree can be simulated using "/"-delimited object name prefixes. DAG objects for this environment reside in a simulated directory with the given prefix.',
    ).optional(),
    dataRetentionConfig: z.object({
      airflowMetadataRetentionConfig: z.object({
        retentionDays: z.number().int().describe(
          "Optional. How many days data should be retained for.",
        ).optional(),
        retentionMode: z.enum([
          "RETENTION_MODE_UNSPECIFIED",
          "RETENTION_MODE_ENABLED",
          "RETENTION_MODE_DISABLED",
        ]).describe("Optional. Retention can be either enabled or disabled.")
          .optional(),
      }).describe("The policy for airflow metadata database retention.")
        .optional(),
      taskLogsRetentionConfig: z.object({
        storageMode: z.enum([
          "TASK_LOGS_STORAGE_MODE_UNSPECIFIED",
          "CLOUD_LOGGING_AND_CLOUD_STORAGE",
          "CLOUD_LOGGING_ONLY",
        ]).describe(
          "Optional. The mode of storage for Airflow workers task logs.",
        ).optional(),
      }).describe("The configuration setting for Task Logs.").optional(),
    }).describe(
      "The configuration setting for Airflow database data retention mechanism.",
    ).optional(),
    databaseConfig: z.object({
      machineType: z.string().describe(
        "Optional. Cloud SQL machine type used by Airflow database. It has to be one of: db-n1-standard-2, db-n1-standard-4, db-n1-standard-8 or db-n1-standard-16. If not specified, db-n1-standard-2 will be used. Supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
      ).optional(),
      zone: z.string().describe(
        "Optional. The Compute Engine zone where the Airflow database is created. If zone is provided, it must be in the region selected for the environment. If zone is not provided, a zone is automatically selected. The zone can only be set during environment creation. Supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.*.",
      ).optional(),
    }).describe(
      "The configuration of Cloud SQL instance that is used by the Apache Airflow software.",
    ).optional(),
    encryptionConfig: z.object({
      kmsKeyName: z.string().describe(
        "Optional. Customer-managed Encryption Key available through Google's Key Management Service. Cannot be updated. If not specified, Google-managed key will be used.",
      ).optional(),
    }).describe(
      "The encryption options for the Cloud Composer environment and its dependencies.Supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
    ).optional(),
    environmentSize: z.enum([
      "ENVIRONMENT_SIZE_UNSPECIFIED",
      "ENVIRONMENT_SIZE_SMALL",
      "ENVIRONMENT_SIZE_MEDIUM",
      "ENVIRONMENT_SIZE_LARGE",
      "ENVIRONMENT_SIZE_EXTRA_LARGE",
    ]).describe(
      "Optional. The size of the Cloud Composer environment. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer.",
    ).optional(),
    gkeCluster: z.string().describe(
      "Output only. The Kubernetes Engine cluster used to run this environment.",
    ).optional(),
    maintenanceWindow: z.object({
      endTime: z.string().describe(
        "Required. Maintenance window end time. It is used only to calculate the duration of the maintenance window. The value for end-time must be in the future, relative to `start_time`.",
      ).optional(),
      recurrence: z.string().describe(
        "Required. Maintenance window recurrence. Format is a subset of [RFC-5545](https://tools.ietf.org/html/rfc5545) `RRULE`. The only allowed values for `FREQ` field are `FREQ=DAILY` and `FREQ=WEEKLY;BYDAY=...` Example values: `FREQ=WEEKLY;BYDAY=TU,WE`, `FREQ=DAILY`.",
      ).optional(),
      startTime: z.string().describe(
        "Required. Start time of the first recurrence of the maintenance window.",
      ).optional(),
    }).describe(
      'The configuration settings for Cloud Composer maintenance window. The following example: ` { "startTime":"2019-08-01T01:00:00Z" "endTime":"2019-08-01T07:00:00Z" "recurrence":"FREQ=WEEKLY;BYDAY=TU,WE" } ` would define a maintenance window between 01 and 07 hours UTC during each Tuesday and Wednesday.',
    ).optional(),
    masterAuthorizedNetworksConfig: z.object({
      cidrBlocks: z.array(z.object({
        cidrBlock: z.string().describe(
          "CIDR block that must be specified in CIDR notation.",
        ).optional(),
        displayName: z.string().describe(
          "User-defined name that identifies the CIDR block.",
        ).optional(),
      })).describe(
        "Up to 50 external networks that could access Kubernetes master through HTTPS.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. Whether or not master authorized networks feature is enabled.",
      ).optional(),
    }).describe(
      "Configuration options for the master authorized networks feature. Enabled master authorized networks will disallow all external traffic to access Kubernetes master through HTTPS except traffic from the given CIDR blocks, Google Compute Engine Public IPs and Google Prod IPs.",
    ).optional(),
    nodeConfig: z.object({
      composerInternalIpv4CidrBlock: z.string().describe(
        "Optional. The IP range in CIDR notation to use internally by Cloud Composer. IP addresses are not reserved - and the same range can be used by multiple Cloud Composer environments. In case of overlap, IPs from this range will not be accessible in the user's VPC network. Cannot be updated. If not specified, the default value of '100.64.128.0/20' is used. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer.",
      ).optional(),
      composerNetworkAttachment: z.string().describe(
        "Optional. Network Attachment that Cloud Composer environment is connected to, which provides connectivity with a user's VPC network. Takes precedence over network and subnetwork settings. If not provided, but network and subnetwork are defined during environment, it will be provisioned. If not provided and network and subnetwork are also empty, then connectivity to user's VPC network is disabled. Network attachment must be provided in format projects/{project}/regions/{region}/networkAttachments/{networkAttachment}. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer.",
      ).optional(),
      diskSizeGb: z.number().int().describe(
        "Optional. The disk size in GB used for node VMs. Minimum size is 30GB. If unspecified, defaults to 100GB. Cannot be updated. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
      ).optional(),
      enableIpMasqAgent: z.boolean().describe(
        "Optional. Deploys 'ip-masq-agent' daemon set in the GKE cluster and defines nonMasqueradeCIDRs equals to pod IP range so IP masquerading is used for all destination addresses, except between pods traffic. See: https://cloud.google.com/kubernetes-engine/docs/how-to/ip-masquerade-agent",
      ).optional(),
      ipAllocationPolicy: z.object({
        clusterIpv4CidrBlock: z.string().describe(
          "Optional. The IP address range used to allocate IP addresses to pods in the GKE cluster. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true. Set to blank to have GKE choose a range with the default size. Set to /netmask (e.g. `/14`) to have GKE choose a range with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.",
        ).optional(),
        clusterSecondaryRangeName: z.string().describe(
          "Optional. The name of the GKE cluster's secondary range used to allocate IP addresses to pods. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true.",
        ).optional(),
        servicesIpv4CidrBlock: z.string().describe(
          "Optional. The IP address range of the services IP addresses in this GKE cluster. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true. Set to blank to have GKE choose a range with the default size. Set to /netmask (e.g. `/14`) to have GKE choose a range with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use.",
        ).optional(),
        servicesSecondaryRangeName: z.string().describe(
          "Optional. The name of the services' secondary range used to allocate IP addresses to the GKE cluster. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true.",
        ).optional(),
        useIpAliases: z.boolean().describe(
          "Optional. Whether or not to enable Alias IPs in the GKE cluster. If `true`, a VPC-native cluster is created. This field is only supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. Environments in newer versions always use VPC-native GKE clusters.",
        ).optional(),
      }).describe(
        "Configuration for controlling how IPs are allocated in the GKE cluster running the Apache Airflow software.",
      ).optional(),
      location: z.string().describe(
        'Optional. The Compute Engine [zone](/compute/docs/regions-zones) in which to deploy the VMs used to run the Apache Airflow software, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/zones/{zoneId}". This `location` must belong to the enclosing environment\'s project and location. If both this field and `nodeConfig.machineType` are specified, `nodeConfig.machineType` must belong to this `location`; if both are unspecified, the service will pick a zone in the Compute Engine region corresponding to the Cloud Composer location, and propagate that choice to both fields. If only one field (`location` or `nodeConfig.machineType`) is specified, the location information from the specified field will be propagated to the unspecified field. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.',
      ).optional(),
      machineType: z.string().describe(
        'Optional. The Compute Engine [machine type](/compute/docs/machine-types) used for cluster instances, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/zones/{zoneId}/machineTypes/{machineTypeId}". The `machineType` must belong to the enclosing environment\'s project and location. If both this field and `nodeConfig.location` are specified, this `machineType` must belong to the `nodeConfig.location`; if both are unspecified, the service will pick a zone in the Compute Engine region corresponding to the Cloud Composer location, and propagate that choice to both fields. If exactly one of this field and `nodeConfig.location` is specified, the location information from the specified field will be propagated to the unspecified field. The `machineTypeId` must not be a [shared-core machine type](/compute/docs/machine-types#sharedcore). If this field is unspecified, the `machineTypeId` defaults to "n1-standard-1". This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.',
      ).optional(),
      network: z.string().describe(
        'Optional. The Compute Engine network to be used for machine communications, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/global/networks/{networkId}". If unspecified, the "default" network ID in the environment\'s project is used. If a [Custom Subnet Network](/vpc/docs/vpc#vpc_networks_and_subnets) is provided, `nodeConfig.subnetwork` must also be provided. For [Shared VPC](/vpc/docs/shared-vpc) subnetwork requirements, see `nodeConfig.subnetwork`.',
      ).optional(),
      oauthScopes: z.array(z.string()).describe(
        'Optional. The set of Google API scopes to be made available on all node VMs. If `oauth_scopes` is empty, defaults to ["https://www.googleapis.com/auth/cloud-platform"]. Cannot be updated. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.',
      ).optional(),
      serviceAccount: z.string().describe(
        'Optional. The Google Cloud Platform Service Account to be used by the node VMs. If a service account is not specified, the "default" Compute Engine service account is used. Cannot be updated.',
      ).optional(),
      subnetwork: z.string().describe(
        'Optional. The Compute Engine subnetwork to be used for machine communications, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/regions/{regionId}/subnetworks/{subnetworkId}" If a subnetwork is provided, `nodeConfig.network` must also be provided, and the subnetwork must belong to the enclosing environment\'s project and location.',
      ).optional(),
      tags: z.array(z.string()).describe(
        "Optional. The list of instance tags applied to all node VMs. Tags are used to identify valid sources or targets for network firewalls. Each tag within the list must comply with [RFC1035](https://www.ietf.org/rfc/rfc1035.txt). Cannot be updated.",
      ).optional(),
    }).describe(
      "The configuration information for the Kubernetes Engine nodes running the Apache Airflow software.",
    ).optional(),
    nodeCount: z.number().int().describe(
      "The number of nodes in the Kubernetes Engine cluster that will be used to run this environment. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
    ).optional(),
    privateEnvironmentConfig: z.object({
      cloudComposerConnectionSubnetwork: z.string().describe(
        "Optional. When specified, the environment will use Private Service Connect instead of VPC peerings to connect to Cloud SQL in the Tenant Project, and the PSC endpoint in the Customer Project will use an IP address from this subnetwork.",
      ).optional(),
      cloudComposerNetworkIpv4CidrBlock: z.string().describe(
        "Optional. The CIDR block from which IP range for Cloud Composer Network in tenant project will be reserved. Needs to be disjoint from private_cluster_config.master_ipv4_cidr_block and cloud_sql_ipv4_cidr_block. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer.",
      ).optional(),
      cloudComposerNetworkIpv4ReservedRange: z.string().describe(
        "Output only. The IP range reserved for the tenant project's Cloud Composer network. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer.",
      ).optional(),
      cloudSqlIpv4CidrBlock: z.string().describe(
        "Optional. The CIDR block from which IP range in tenant project will be reserved for Cloud SQL. Needs to be disjoint from `web_server_ipv4_cidr_block`.",
      ).optional(),
      enablePrivateBuildsOnly: z.boolean().describe(
        "Optional. If `true`, builds performed during operations that install Python packages have only private connectivity to Google services (including Artifact Registry) and VPC network (if either `NodeConfig.network` and `NodeConfig.subnetwork` fields or `NodeConfig.composer_network_attachment` field are specified). If `false`, the builds also have access to the internet. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer.",
      ).optional(),
      enablePrivateEnvironment: z.boolean().describe(
        "Optional. If `true`, a Private IP Cloud Composer environment is created. If this field is set to true, `IPAllocationPolicy.use_ip_aliases` must be set to true for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. This field is going to be deprecated. Use `networking_type` instead.",
      ).optional(),
      enablePrivatelyUsedPublicIps: z.boolean().describe(
        "Optional. When enabled, IPs from public (non-RFC1918) ranges can be used for `IPAllocationPolicy.cluster_ipv4_cidr_block` and `IPAllocationPolicy.service_ipv4_cidr_block`.",
      ).optional(),
      networkingConfig: z.object({
        connectionType: z.enum([
          "CONNECTION_TYPE_UNSPECIFIED",
          "VPC_PEERING",
          "PRIVATE_SERVICE_CONNECT",
        ]).describe(
          "Optional. Indicates the user requested specific connection type between Tenant and Customer projects. You cannot set networking connection type in public IP environment.",
        ).optional(),
      }).describe(
        "Configuration options for networking connections in the Composer 2 environment.",
      ).optional(),
      networkingType: z.enum([
        "NETWORKING_TYPE_UNSPECIFIED",
        "PRIVATE",
        "PUBLIC",
      ]).describe(
        "Optional. Networking type for the environment, either private or public.",
      ).optional(),
      privateClusterConfig: z.object({
        enablePrivateEndpoint: z.boolean().describe(
          "Optional. If `true`, access to the public endpoint of the GKE cluster is denied.",
        ).optional(),
        masterIpv4CidrBlock: z.string().describe(
          "Optional. The CIDR block from which IPv4 range for GKE master will be reserved. If left blank, the default value of '172.16.0.0/23' is used.",
        ).optional(),
        masterIpv4ReservedRange: z.string().describe(
          "Output only. The IP range in CIDR notation to use for the hosted master network. This range is used for assigning internal IP addresses to the GKE cluster master or set of masters and to the internal load balancer virtual IP. This range must not overlap with any other ranges in use within the cluster's network.",
        ).optional(),
      }).describe(
        "Configuration options for the private GKE cluster in a Cloud Composer environment.",
      ).optional(),
      webServerIpv4CidrBlock: z.string().describe(
        "Optional. The CIDR block from which IP range for web server will be reserved. Needs to be disjoint from `private_cluster_config.master_ipv4_cidr_block` and `cloud_sql_ipv4_cidr_block`. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
      ).optional(),
      webServerIpv4ReservedRange: z.string().describe(
        "Output only. The IP range reserved for the tenant project's App Engine VMs. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.",
      ).optional(),
    }).describe(
      "The configuration information for configuring a Private IP Cloud Composer environment.",
    ).optional(),
    recoveryConfig: z.object({
      scheduledSnapshotsConfig: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether scheduled snapshots creation is enabled.",
        ).optional(),
        snapshotCreationSchedule: z.string().describe(
          "Optional. The cron expression representing the time when snapshots creation mechanism runs. This field is subject to additional validation around frequency of execution.",
        ).optional(),
        snapshotLocation: z.string().describe(
          "Optional. The Cloud Storage location for storing automatically created snapshots.",
        ).optional(),
        timeZone: z.string().describe(
          "Optional. Time zone that sets the context to interpret snapshot_creation_schedule.",
        ).optional(),
      }).describe(
        "The configuration for scheduled snapshot creation mechanism.",
      ).optional(),
    }).describe("The Recovery settings of an environment.").optional(),
    resilienceMode: z.enum(["RESILIENCE_MODE_UNSPECIFIED", "HIGH_RESILIENCE"])
      .describe(
        "Optional. Resilience mode of the Cloud Composer Environment. This field is supported for Cloud Composer environments in versions composer-2.2.0-airflow-*.*.* and newer.",
      ).optional(),
    softwareConfig: z.object({
      airflowConfigOverrides: z.record(z.string(), z.string()).describe(
        'Optional. Apache Airflow configuration properties to override. Property keys contain the section and property names, separated by a hyphen, for example "core-dags_are_paused_at_creation". Section names must not contain hyphens ("-"), opening square brackets ("["), or closing square brackets ("]"). The property name must not be empty and must not contain an equals sign ("=") or semicolon (";"). Section and property names must not contain a period ("."). Apache Airflow configuration property names must be written in [snake_case](https://en.wikipedia.org/wiki/Snake_case). Property values can contain any character, and can be written in any lower/upper case format. Certain Apache Airflow configuration property values are [blocked](/composer/docs/concepts/airflow-configurations), and cannot be overridden.',
      ).optional(),
      cloudDataLineageIntegration: z.object({
        enabled: z.boolean().describe(
          "Optional. Whether or not Cloud Data Lineage integration is enabled.",
        ).optional(),
      }).describe("Configuration for Cloud Data Lineage integration.")
        .optional(),
      envVariables: z.record(z.string(), z.string()).describe(
        "Optional. Additional environment variables to provide to the Apache Airflow scheduler, worker, and webserver processes. Environment variable names must match the regular expression `a-zA-Z_*`. They cannot specify Apache Airflow software configuration overrides (they cannot match the regular expression `AIRFLOW__[A-Z0-9_]+__[A-Z0-9_]+`), and they cannot match any of the following reserved names: * `AIRFLOW_HOME` * `C_FORCE_ROOT` * `CONTAINER_NAME` * `DAGS_FOLDER` * `GCP_PROJECT` * `GCS_BUCKET` * `GKE_CLUSTER_NAME` * `SQL_DATABASE` * `SQL_INSTANCE` * `SQL_PASSWORD` * `SQL_PROJECT` * `SQL_REGION` * `SQL_USER`",
      ).optional(),
      imageVersion: z.string().describe(
        "Optional. The version of the software running in the environment. This encapsulates both the version of Cloud Composer functionality and the version of Apache Airflow. It must match the regular expression `composer-([0-9]+(\\.[0-9]+\\.[0-9]+(-preview\\.[0-9]+)?)?|latest)-airflow-([0-9]+(\\.[0-9]+(\\.[0-9]+)?)?)`. When used as input, the server also checks if the provided version is supported and denies the request for an unsupported version. The Cloud Composer portion of the image version is a full [semantic version](https://semver.org), or an alias in the form of major version number or `latest`. When an alias is provided, the server replaces it with the current Cloud Composer version that satisfies the alias. The Apache Airflow portion of the image version is a full semantic version that points to one of the supported Apache Airflow versions, or an alias in the form of only major or major.minor versions specified. When an alias is provided, the server replaces it with the latest Apache Airflow version that satisfies the alias and is supported in the given Cloud Composer version. In all cases, the resolved image version is stored in the same field. See also [version list](/composer/docs/concepts/versioning/composer-versions) and [versioning overview](/composer/docs/concepts/versioning/composer-versioning-overview).",
      ).optional(),
      pypiPackages: z.record(z.string(), z.string()).describe(
        'Optional. Custom Python Package Index (PyPI) packages to be installed in the environment. Keys refer to the lowercase package name such as "numpy" and values are the lowercase extras and version specifier such as "==1.12.0", "[devel,gcp_api]", or "[devel]>=1.8.2, <1.9.2". To specify a package without pinning it to a version specifier, use the empty string as the value.',
      ).optional(),
      pythonVersion: z.string().describe(
        "Optional. The major version of Python used to run the Apache Airflow scheduler, worker, and webserver processes. Can be set to '2' or '3'. If not specified, the default is '3'. Cannot be updated. This field is only supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. Environments in newer versions always use Python major version 3.",
      ).optional(),
      schedulerCount: z.number().int().describe(
        "Optional. The number of schedulers for Airflow. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-2.*.*.",
      ).optional(),
      webServerPluginsMode: z.enum([
        "WEB_SERVER_PLUGINS_MODE_UNSPECIFIED",
        "PLUGINS_DISABLED",
        "PLUGINS_ENABLED",
      ]).describe(
        "Optional. Whether or not the web server uses custom plugins. If unspecified, the field defaults to `PLUGINS_ENABLED`. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer.",
      ).optional(),
    }).describe(
      "Specifies the selection and configuration of software inside the environment.",
    ).optional(),
    webServerConfig: z.object({
      machineType: z.string().describe(
        "Optional. Machine type on which Airflow web server is running. It has to be one of: composer-n1-webserver-2, composer-n1-webserver-4 or composer-n1-webserver-8. If not specified, composer-n1-webserver-2 will be used. Value custom is returned only in response, if Airflow web server parameters were manually changed to a non-standard values.",
      ).optional(),
    }).describe(
      "The configuration settings for the Airflow web server App Engine instance. Supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*",
    ).optional(),
    webServerNetworkAccessControl: z.object({
      allowedIpRanges: z.array(z.object({
        description: z.string().describe(
          "Optional. User-provided description. It must contain at most 300 characters.",
        ).optional(),
        value: z.string().describe(
          "IP address or range, defined using CIDR notation, of requests that this rule applies to. Examples: `192.168.1.1` or `192.168.0.0/16` or `2001:db8::/32` or `2001:0db8:0000:0042:0000:8a2e:0370:7334`. IP range prefixes should be properly truncated. For example, `1.2.3.4/24` should be truncated to `1.2.3.0/24`. Similarly, for IPv6, `2001:db8::1/32` should be truncated to `2001:db8::/32`.",
        ).optional(),
      })).describe("A collection of allowed IP ranges with descriptions.")
        .optional(),
    }).describe(
      "Network-level access control policy for the Airflow web server.",
    ).optional(),
    workloadsConfig: z.object({
      dagProcessor: z.object({
        count: z.number().int().describe(
          "Optional. The number of DAG processors. If not provided or set to 0, a single DAG processor instance will be created.",
        ).optional(),
        cpu: z.number().describe(
          "Optional. CPU request and limit for a single Airflow DAG processor replica.",
        ).optional(),
        memoryGb: z.number().describe(
          "Optional. Memory (GB) request and limit for a single Airflow DAG processor replica.",
        ).optional(),
        storageGb: z.number().describe(
          "Optional. Storage (GB) request and limit for a single Airflow DAG processor replica.",
        ).optional(),
      }).describe(
        "Configuration for resources used by Airflow DAG processors. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer.",
      ).optional(),
      scheduler: z.object({
        count: z.number().int().describe("Optional. The number of schedulers.")
          .optional(),
        cpu: z.number().describe(
          "Optional. CPU request and limit for a single Airflow scheduler replica.",
        ).optional(),
        memoryGb: z.number().describe(
          "Optional. Memory (GB) request and limit for a single Airflow scheduler replica.",
        ).optional(),
        storageGb: z.number().describe(
          "Optional. Storage (GB) request and limit for a single Airflow scheduler replica.",
        ).optional(),
      }).describe("Configuration for resources used by Airflow schedulers.")
        .optional(),
      triggerer: z.object({
        count: z.number().int().describe("Optional. The number of triggerers.")
          .optional(),
        cpu: z.number().describe(
          "Optional. CPU request and limit for a single Airflow triggerer replica.",
        ).optional(),
        memoryGb: z.number().describe(
          "Optional. Memory (GB) request and limit for a single Airflow triggerer replica.",
        ).optional(),
      }).describe("Configuration for resources used by Airflow triggerers.")
        .optional(),
      webServer: z.object({
        cpu: z.number().describe(
          "Optional. CPU request and limit for Airflow web server.",
        ).optional(),
        memoryGb: z.number().describe(
          "Optional. Memory (GB) request and limit for Airflow web server.",
        ).optional(),
        storageGb: z.number().describe(
          "Optional. Storage (GB) request and limit for Airflow web server.",
        ).optional(),
      }).describe("Configuration for resources used by Airflow web server.")
        .optional(),
      worker: z.object({
        cpu: z.number().describe(
          "Optional. CPU request and limit for a single Airflow worker replica.",
        ).optional(),
        maxCount: z.number().int().describe(
          "Optional. Maximum number of workers for autoscaling.",
        ).optional(),
        memoryGb: z.number().describe(
          "Optional. Memory (GB) request and limit for a single Airflow worker replica.",
        ).optional(),
        minCount: z.number().int().describe(
          "Optional. Minimum number of workers for autoscaling.",
        ).optional(),
        storageGb: z.number().describe(
          "Optional. Storage (GB) request and limit for a single Airflow worker replica.",
        ).optional(),
      }).describe("Configuration for resources used by Airflow workers.")
        .optional(),
    }).describe(
      "The Kubernetes workloads configuration for GKE cluster associated with the Cloud Composer environment. Supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer.",
    ).optional(),
  }).describe("Configuration information for an environment.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for this environment. The labels map can contain no more than 64 entries. Entries of the labels map are UTF8 strings that comply with the following restrictions: * Keys must conform to regexp: \\p{Ll}\\p{Lo}{0,62} * Values must conform to regexp: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} * Both keys and values are additionally constrained to be <= 128 bytes in size.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The resource name of the environment, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" EnvironmentId must start with a lowercase letter followed by up to 63 lowercase letters, numbers, or hyphens, and cannot end with a hyphen.',
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "RUNNING",
    "UPDATING",
    "DELETING",
    "ERROR",
  ]).describe("The current state of the environment.").optional(),
  storageConfig: z.object({
    bucket: z.string().describe(
      "Optional. The name of the Cloud Storage bucket used by the environment. No `gs://` prefix.",
    ).optional(),
  }).describe("The configuration for data storage in the environment.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Composer Environments. Registered at `@swamp/gcp/composer/environments`. */
export const model = {
  type: "@swamp/gcp/composer/environments",
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
      description: "An environment for running orchestration tasks.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a environments",
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
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["storageConfig"] !== undefined) {
          body["storageConfig"] = g["storageConfig"];
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
              "readyValues": ["RUNNING"],
              "failedValues": ["ERROR"],
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
      description: "Get a environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
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
      description: "Update environments attributes",
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
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["storageConfig"] !== undefined) {
          body["storageConfig"] = g["storageConfig"];
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
              "readyValues": ["RUNNING"],
              "failedValues": ["ERROR"],
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
    delete: {
      description: "Delete the environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
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
      description: "Sync environments state from GCP",
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
    check_upgrade: {
      description: "check upgrade",
      arguments: z.object({
        imageVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["environment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["imageVersion"] !== undefined) {
          body["imageVersion"] = args["imageVersion"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "composer.projects.locations.environments.checkUpgrade",
            "path": "v1/{+environment}:checkUpgrade",
            "httpMethod": "POST",
            "parameterOrder": ["environment"],
            "parameters": {
              "environment": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    database_failover: {
      description: "database failover",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["environment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "composer.projects.locations.environments.databaseFailover",
            "path": "v1/{+environment}:databaseFailover",
            "httpMethod": "POST",
            "parameterOrder": ["environment"],
            "parameters": {
              "environment": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    execute_airflow_command: {
      description: "execute airflow command",
      arguments: z.object({
        command: z.any().optional(),
        parameters: z.any().optional(),
        subcommand: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["environment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["command"] !== undefined) body["command"] = args["command"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["subcommand"] !== undefined) {
          body["subcommand"] = args["subcommand"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "composer.projects.locations.environments.executeAirflowCommand",
            "path": "v1/{+environment}:executeAirflowCommand",
            "httpMethod": "POST",
            "parameterOrder": ["environment"],
            "parameters": {
              "environment": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    fetch_database_properties: {
      description: "fetch database properties",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["environment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "composer.projects.locations.environments.fetchDatabaseProperties",
            "path": "v1/{+environment}:fetchDatabaseProperties",
            "httpMethod": "GET",
            "parameterOrder": ["environment"],
            "parameters": {
              "environment": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    load_snapshot: {
      description: "load snapshot",
      arguments: z.object({
        skipAirflowOverridesSetting: z.any().optional(),
        skipEnvironmentVariablesSetting: z.any().optional(),
        skipGcsDataCopying: z.any().optional(),
        skipPypiPackagesInstallation: z.any().optional(),
        snapshotPath: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["environment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["skipAirflowOverridesSetting"] !== undefined) {
          body["skipAirflowOverridesSetting"] =
            args["skipAirflowOverridesSetting"];
        }
        if (args["skipEnvironmentVariablesSetting"] !== undefined) {
          body["skipEnvironmentVariablesSetting"] =
            args["skipEnvironmentVariablesSetting"];
        }
        if (args["skipGcsDataCopying"] !== undefined) {
          body["skipGcsDataCopying"] = args["skipGcsDataCopying"];
        }
        if (args["skipPypiPackagesInstallation"] !== undefined) {
          body["skipPypiPackagesInstallation"] =
            args["skipPypiPackagesInstallation"];
        }
        if (args["snapshotPath"] !== undefined) {
          body["snapshotPath"] = args["snapshotPath"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "composer.projects.locations.environments.loadSnapshot",
            "path": "v1/{+environment}:loadSnapshot",
            "httpMethod": "POST",
            "parameterOrder": ["environment"],
            "parameters": {
              "environment": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    poll_airflow_command: {
      description: "poll airflow command",
      arguments: z.object({
        executionId: z.any().optional(),
        nextLineNumber: z.any().optional(),
        pod: z.any().optional(),
        podNamespace: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["environment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["executionId"] !== undefined) {
          body["executionId"] = args["executionId"];
        }
        if (args["nextLineNumber"] !== undefined) {
          body["nextLineNumber"] = args["nextLineNumber"];
        }
        if (args["pod"] !== undefined) body["pod"] = args["pod"];
        if (args["podNamespace"] !== undefined) {
          body["podNamespace"] = args["podNamespace"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "composer.projects.locations.environments.pollAirflowCommand",
            "path": "v1/{+environment}:pollAirflowCommand",
            "httpMethod": "POST",
            "parameterOrder": ["environment"],
            "parameters": {
              "environment": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    restart_web_server: {
      description: "restart web server",
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
            "id": "composer.projects.locations.environments.restartWebServer",
            "path": "v1/{+name}:restartWebServer",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    save_snapshot: {
      description: "save snapshot",
      arguments: z.object({
        snapshotLocation: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["environment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["snapshotLocation"] !== undefined) {
          body["snapshotLocation"] = args["snapshotLocation"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "composer.projects.locations.environments.saveSnapshot",
            "path": "v1/{+environment}:saveSnapshot",
            "httpMethod": "POST",
            "parameterOrder": ["environment"],
            "parameters": {
              "environment": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    stop_airflow_command: {
      description: "stop airflow command",
      arguments: z.object({
        executionId: z.any().optional(),
        force: z.any().optional(),
        pod: z.any().optional(),
        podNamespace: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["environment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["executionId"] !== undefined) {
          body["executionId"] = args["executionId"];
        }
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["pod"] !== undefined) body["pod"] = args["pod"];
        if (args["podNamespace"] !== undefined) {
          body["podNamespace"] = args["podNamespace"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "composer.projects.locations.environments.stopAirflowCommand",
            "path": "v1/{+environment}:stopAirflowCommand",
            "httpMethod": "POST",
            "parameterOrder": ["environment"],
            "parameters": {
              "environment": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
