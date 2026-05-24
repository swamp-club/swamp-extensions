// Auto-generated extension model for @swamp/gcp/cloudfunctions/functions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Functions Functions.
 *
 * Describes a Cloud Function that contains user computation executed in response to an event. It encapsulates function and trigger configurations.
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
  return `${parent}/functions/${shortName}`;
}

const BASE_URL = "https://cloudfunctions.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudfunctions.projects.locations.functions.get",
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
    "revision": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "cloudfunctions.projects.locations.functions.create",
  "path": "v2/{+parent}/functions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "functionId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "cloudfunctions.projects.locations.functions.patch",
  "path": "v2/{+name}",
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
  "id": "cloudfunctions.projects.locations.functions.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudfunctions.projects.locations.functions.list",
  "path": "v2/{+parent}/functions",
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
  buildConfig: z.object({
    automaticUpdatePolicy: z.object({}).describe(
      "Security patches are applied automatically to the runtime without requiring the function to be redeployed.",
    ).optional(),
    build: z.string().describe(
      "Output only. The Cloud Build name of the latest successful deployment of the function.",
    ).optional(),
    dockerRegistry: z.enum([
      "DOCKER_REGISTRY_UNSPECIFIED",
      "CONTAINER_REGISTRY",
      "ARTIFACT_REGISTRY",
    ]).describe(
      "Docker Registry to use for this deployment. This configuration is only applicable to 1st Gen functions, 2nd Gen functions can only use Artifact Registry. Deprecated: as of March 2025, `CONTAINER_REGISTRY` option is no longer available in response to Container Registry's deprecation: https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr Please use Artifact Registry instead, which is the default choice. If unspecified, it defaults to `ARTIFACT_REGISTRY`. If `docker_repository` field is specified, this field should either be left unspecified or set to `ARTIFACT_REGISTRY`.",
    ).optional(),
    dockerRepository: z.string().describe(
      "Repository in Artifact Registry to which the function docker image will be pushed after it is built by Cloud Build. If specified by user, it is created and managed by user with a customer managed encryption key. Otherwise, GCF will create and use a repository named 'gcf-artifacts' for every deployed region. It must match the pattern `projects/{project}/locations/{location}/repositories/{repository}`. Repository format must be 'DOCKER'.",
    ).optional(),
    entryPoint: z.string().describe(
      'The name of the function (as defined in source code) that will be executed. Defaults to the resource name suffix, if not specified. For backward compatibility, if function with given name is not found, then the system will try to use function named "function". For Node.js this is name of a function exported by the module specified in `source_location`.',
    ).optional(),
    environmentVariables: z.record(z.string(), z.string()).describe(
      "User-provided build-time environment variables for the function",
    ).optional(),
    onDeployUpdatePolicy: z.object({
      runtimeVersion: z.string().describe(
        "Output only. contains the runtime version which was used during latest function deployment.",
      ).optional(),
    }).describe(
      "Security patches are only applied when a function is redeployed.",
    ).optional(),
    runtime: z.string().describe(
      "The runtime in which to run the function. Required when deploying a new function, optional when updating an existing function. For a complete list of possible choices, see the [`gcloud` command reference](https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--runtime).",
    ).optional(),
    serviceAccount: z.string().describe(
      "Service account to be used for building the container. The format of this field is `projects/{projectId}/serviceAccounts/{serviceAccountEmail}`.",
    ).optional(),
    source: z.object({
      gitUri: z.string().describe(
        "If provided, get the source from GitHub repository. This option is valid only for GCF 1st Gen function. Example: https://github.com///blob//",
      ).optional(),
      repoSource: z.object({
        branchName: z.string().describe(
          "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
        commitSha: z.string().describe("Explicit commit SHA to build.")
          .optional(),
        dir: z.string().describe(
          "Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. eg. helloworld (no leading slash allowed)",
        ).optional(),
        projectId: z.string().describe(
          "ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
        ).optional(),
        repoName: z.string().describe("Name of the Cloud Source Repository.")
          .optional(),
        tagName: z.string().describe(
          "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
      }).describe("Location of the source in a Google Cloud Source Repository.")
        .optional(),
      storageSource: z.object({
        bucket: z.string().describe(
          "Google Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build.",
        ).optional(),
        sourceUploadUrl: z.string().describe(
          "When the specified storage bucket is a 1st gen function uploard url bucket, this field should be set as the generated upload url for 1st gen deployment.",
        ).optional(),
      }).describe(
        "Location of the source in an archive file in Google Cloud Storage.",
      ).optional(),
    }).describe("The location of the function source code.").optional(),
    sourceProvenance: z.object({
      gitUri: z.string().describe(
        "A copy of the build's `source.git_uri`, if exists, with any commits resolved.",
      ).optional(),
      resolvedRepoSource: z.object({
        branchName: z.string().describe(
          "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
        commitSha: z.string().describe("Explicit commit SHA to build.")
          .optional(),
        dir: z.string().describe(
          "Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. eg. helloworld (no leading slash allowed)",
        ).optional(),
        projectId: z.string().describe(
          "ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
        ).optional(),
        repoName: z.string().describe("Name of the Cloud Source Repository.")
          .optional(),
        tagName: z.string().describe(
          "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
      }).describe("Location of the source in a Google Cloud Source Repository.")
        .optional(),
      resolvedStorageSource: z.object({
        bucket: z.string().describe(
          "Google Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build.",
        ).optional(),
        sourceUploadUrl: z.string().describe(
          "When the specified storage bucket is a 1st gen function uploard url bucket, this field should be set as the generated upload url for 1st gen deployment.",
        ).optional(),
      }).describe(
        "Location of the source in an archive file in Google Cloud Storage.",
      ).optional(),
    }).describe(
      "Provenance of the source. Ways to find the original source, or verify that some source was used for this build.",
    ).optional(),
    sourceToken: z.string().describe(
      "An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments.",
    ).optional(),
    workerPool: z.string().describe(
      "Name of the Cloud Build Custom Worker Pool that should be used to build the function. The format of this field is `projects/{project}/locations/{region}/workerPools/{workerPool}` where {project} and {region} are the project id and region respectively where the worker pool is defined and {workerPool} is the short name of the worker pool. If the project id is not the same as the function, then the Cloud Functions Service Agent (service-@gcf-admin-robot.iam.gserviceaccount.com) must be granted the role Cloud Build Custom Workers Builder (roles/cloudbuild.customworkers.builder) in the project.",
    ).optional(),
  }).describe(
    "Describes the Build step of the function that builds a container from the given source.",
  ).optional(),
  description: z.string().describe("User-provided description of a function.")
    .optional(),
  environment: z.enum(["ENVIRONMENT_UNSPECIFIED", "GEN_1", "GEN_2"]).describe(
    "Describe whether the function is 1st Gen or 2nd Gen.",
  ).optional(),
  eventTrigger: z.object({
    channel: z.string().describe(
      "Optional. The name of the channel associated with the trigger in `projects/{project}/locations/{location}/channels/{channel}` format. You must provide a channel to receive events from Eventarc SaaS partners.",
    ).optional(),
    eventFilters: z.array(z.object({
      attribute: z.string().describe(
        "Required. The name of a CloudEvents attribute.",
      ).optional(),
      operator: z.string().describe(
        "Optional. The operator used for matching the events with the value of the filter. If not specified, only events that have an exact key-value pair specified in the filter are matched. The only allowed value is `match-path-pattern`.",
      ).optional(),
      value: z.string().describe("Required. The value for the attribute.")
        .optional(),
    })).describe("Criteria used to filter events.").optional(),
    eventType: z.string().describe(
      "Required. The type of event to observe. For example: `google.cloud.audit.log.v1.written` or `google.cloud.pubsub.topic.v1.messagePublished`.",
    ).optional(),
    pubsubTopic: z.string().describe(
      "Optional. The name of a Pub/Sub topic in the same project that will be used as the transport topic for the event delivery. Format: `projects/{project}/topics/{topic}`. This is only valid for events of type `google.cloud.pubsub.topic.v1.messagePublished`. The topic provided here will not be deleted at function deletion.",
    ).optional(),
    retryPolicy: z.enum([
      "RETRY_POLICY_UNSPECIFIED",
      "RETRY_POLICY_DO_NOT_RETRY",
      "RETRY_POLICY_RETRY",
    ]).describe(
      "Optional. If unset, then defaults to ignoring failures (i.e. not retrying them).",
    ).optional(),
    service: z.string().describe(
      "Optional. The hostname of the service that 1st Gen function should be observed. If no string is provided, the default service implementing the API will be used. For example, `storage.googleapis.com` is the default for all event types in the `google.storage` namespace. The field is only applicable to 1st Gen functions.",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. The email of the trigger's service account. The service account must have permission to invoke Cloud Run services, the permission is `run.routes.invoke`. If empty, defaults to the Compute Engine default service account: `{project_number}-compute@developer.gserviceaccount.com`.",
    ).optional(),
    trigger: z.string().describe(
      "Output only. The resource name of the Eventarc trigger. The format of this field is `projects/{project}/locations/{region}/triggers/{trigger}`.",
    ).optional(),
    triggerRegion: z.string().describe(
      "The region that the trigger will be in. The trigger will only receive events originating in this region. It can be the same region as the function, a different region or multi-region, or the global region. If not provided, defaults to the same region as the function.",
    ).optional(),
  }).describe(
    "Describes EventTrigger, used to request events to be sent from another service.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function resources. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels associated with this Cloud Function.",
  ).optional(),
  name: z.string().describe(
    "A user-defined name of the function. Function names must be unique globally and match pattern `projects/*/locations/*/functions/*`",
  ).optional(),
  serviceConfig: z.object({
    allTrafficOnLatestRevision: z.boolean().describe(
      "Whether 100% of traffic is routed to the latest revision. On CreateFunction and UpdateFunction, when set to true, the revision being deployed will serve 100% of traffic, ignoring any traffic split settings, if any. On GetFunction, true will be returned if the latest revision is serving 100% of traffic.",
    ).optional(),
    availableCpu: z.string().describe(
      'The number of CPUs used in a single container instance. Default value is calculated from available memory. Supports the same values as Cloud Run, see https://cloud.google.com/run/docs/reference/rest/v1/Container#resourcerequirements Example: "1" indicates 1 vCPU',
    ).optional(),
    availableMemory: z.string().describe(
      "The amount of memory available for a function. Defaults to 256M. Supported units are k, M, G, Mi, Gi. If no unit is supplied the value is interpreted as bytes. See https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apimachinery/pkg/api/resource/quantity.go a full description.",
    ).optional(),
    binaryAuthorizationPolicy: z.string().describe(
      "Optional. The binary authorization policy to be checked when deploying the Cloud Run service.",
    ).optional(),
    directVpcEgress: z.enum([
      "DIRECT_VPC_EGRESS_UNSPECIFIED",
      "VPC_EGRESS_PRIVATE_RANGES_ONLY",
      "VPC_EGRESS_ALL_TRAFFIC",
    ]).describe(
      "Optional. Egress settings for direct VPC. If not provided, it defaults to VPC_EGRESS_PRIVATE_RANGES_ONLY.",
    ).optional(),
    directVpcNetworkInterface: z.array(z.object({
      network: z.string().describe(
        "Optional. The name of the VPC network to which the function will be connected. Specify either a VPC network or a subnet, or both. If you specify only a network, the subnet uses the same name as the network.",
      ).optional(),
      subnetwork: z.string().describe(
        "Optional. The name of the VPC subnetwork that the Cloud Function resource will get IPs from. Specify either a VPC network or a subnet, or both. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used.",
      ).optional(),
      tags: z.array(z.string()).describe(
        "Optional. Network tags applied to this Cloud Function resource.",
      ).optional(),
    })).describe(
      "Optional. The Direct VPC network interface for the Cloud Function. Currently only a single Direct VPC is supported.",
    ).optional(),
    environmentVariables: z.record(z.string(), z.string()).describe(
      "Environment variables that shall be available during function execution.",
    ).optional(),
    ingressSettings: z.enum([
      "INGRESS_SETTINGS_UNSPECIFIED",
      "ALLOW_ALL",
      "ALLOW_INTERNAL_ONLY",
      "ALLOW_INTERNAL_AND_GCLB",
    ]).describe(
      "The ingress settings for the function, controlling what traffic can reach it.",
    ).optional(),
    maxInstanceCount: z.number().int().describe(
      "The limit on the maximum number of function instances that may coexist at a given time. In some cases, such as rapid traffic surges, Cloud Functions may, for a short period of time, create more instances than the specified max instances limit. If your function cannot tolerate this temporary behavior, you may want to factor in a safety margin and set a lower max instances value than your function can tolerate. See the [Max Instances](https://cloud.google.com/functions/docs/max-instances) Guide for more details.",
    ).optional(),
    maxInstanceRequestConcurrency: z.number().int().describe(
      "Sets the maximum number of concurrent requests that each instance can receive. Defaults to 1.",
    ).optional(),
    minInstanceCount: z.number().int().describe(
      "The limit on the minimum number of function instances that may coexist at a given time. Function instances are kept in idle state for a short period after they finished executing the request to reduce cold start time for subsequent requests. Setting a minimum instance count will ensure that the given number of instances are kept running in idle state always. This can help with cold start times when jump in incoming request count occurs after the idle instance would have been stopped in the default case.",
    ).optional(),
    revision: z.string().describe("Output only. The name of service revision.")
      .optional(),
    secretEnvironmentVariables: z.array(z.object({
      key: z.string().describe("Name of the environment variable.").optional(),
      projectId: z.string().describe(
        "Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function.",
      ).optional(),
      secret: z.string().describe(
        "Name of the secret in secret manager (not the full resource name).",
      ).optional(),
      version: z.string().describe(
        "Version of the secret (version number or the string 'latest'). It is recommended to use a numeric version for secret environment variables as any updates to the secret value is not reflected until new instances start.",
      ).optional(),
    })).describe("Secret environment variables configuration.").optional(),
    secretVolumes: z.array(z.object({
      mountPath: z.string().describe(
        "The path within the container to mount the secret volume. For example, setting the mount_path as `/etc/secrets` would mount the secret value files under the `/etc/secrets` directory. This directory will also be completely shadowed and unavailable to mount any other secrets. Recommended mount path: /etc/secrets",
      ).optional(),
      projectId: z.string().describe(
        "Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function.",
      ).optional(),
      secret: z.string().describe(
        "Name of the secret in secret manager (not the full resource name).",
      ).optional(),
      versions: z.array(z.object({
        path: z.unknown().describe(
          "Relative path of the file under the mount path where the secret value for this version will be fetched and made available. For example, setting the mount_path as '/etc/secrets' and path as `secret_foo` would mount the secret value file at `/etc/secrets/secret_foo`.",
        ).optional(),
        version: z.unknown().describe(
          "Version of the secret (version number or the string 'latest'). It is preferable to use `latest` version with secret volumes as secret value changes are reflected immediately.",
        ).optional(),
      })).describe(
        "List of secret versions to mount for this secret. If empty, the `latest` version of the secret will be made available in a file named after the secret under the mount point.",
      ).optional(),
    })).describe("Secret volumes configuration.").optional(),
    securityLevel: z.enum([
      "SECURITY_LEVEL_UNSPECIFIED",
      "SECURE_ALWAYS",
      "SECURE_OPTIONAL",
    ]).describe(
      "Security level configure whether the function only accepts https. This configuration is only applicable to 1st Gen functions with Http trigger. By default https is optional for 1st Gen functions; 2nd Gen functions are https ONLY.",
    ).optional(),
    service: z.string().describe(
      "Output only. Name of the service associated with a Function. The format of this field is `projects/{project}/locations/{region}/services/{service}`",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "The email of the service's service account. If empty, defaults to `{project_number}-compute@developer.gserviceaccount.com`.",
    ).optional(),
    timeoutSeconds: z.number().int().describe(
      "The function execution timeout. Execution is considered failed and can be terminated if the function is not completed at the end of the timeout period. Defaults to 60 seconds.",
    ).optional(),
    uri: z.string().describe("Output only. URI of the Service deployed.")
      .optional(),
    vpcConnector: z.string().describe(
      "The Serverless VPC Access connector that this cloud function can connect to. The format of this field is `projects/*/locations/*/connectors/*`.",
    ).optional(),
    vpcConnectorEgressSettings: z.enum([
      "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED",
      "PRIVATE_RANGES_ONLY",
      "ALL_TRAFFIC",
    ]).describe(
      "The egress settings for the connector, controlling what traffic is diverted through it.",
    ).optional(),
  }).describe(
    "Describes the Service being deployed. Currently Supported: Cloud Run (fully managed).",
  ).optional(),
  upgradeInfo: z.object({
    buildConfig: z.object({
      automaticUpdatePolicy: z.object({}).describe(
        "Security patches are applied automatically to the runtime without requiring the function to be redeployed.",
      ).optional(),
      build: z.string().describe(
        "Output only. The Cloud Build name of the latest successful deployment of the function.",
      ).optional(),
      dockerRegistry: z.enum([
        "DOCKER_REGISTRY_UNSPECIFIED",
        "CONTAINER_REGISTRY",
        "ARTIFACT_REGISTRY",
      ]).describe(
        "Docker Registry to use for this deployment. This configuration is only applicable to 1st Gen functions, 2nd Gen functions can only use Artifact Registry. Deprecated: as of March 2025, `CONTAINER_REGISTRY` option is no longer available in response to Container Registry's deprecation: https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr Please use Artifact Registry instead, which is the default choice. If unspecified, it defaults to `ARTIFACT_REGISTRY`. If `docker_repository` field is specified, this field should either be left unspecified or set to `ARTIFACT_REGISTRY`.",
      ).optional(),
      dockerRepository: z.string().describe(
        "Repository in Artifact Registry to which the function docker image will be pushed after it is built by Cloud Build. If specified by user, it is created and managed by user with a customer managed encryption key. Otherwise, GCF will create and use a repository named 'gcf-artifacts' for every deployed region. It must match the pattern `projects/{project}/locations/{location}/repositories/{repository}`. Repository format must be 'DOCKER'.",
      ).optional(),
      entryPoint: z.string().describe(
        'The name of the function (as defined in source code) that will be executed. Defaults to the resource name suffix, if not specified. For backward compatibility, if function with given name is not found, then the system will try to use function named "function". For Node.js this is name of a function exported by the module specified in `source_location`.',
      ).optional(),
      environmentVariables: z.record(z.string(), z.string()).describe(
        "User-provided build-time environment variables for the function",
      ).optional(),
      onDeployUpdatePolicy: z.object({
        runtimeVersion: z.string().describe(
          "Output only. contains the runtime version which was used during latest function deployment.",
        ).optional(),
      }).describe(
        "Security patches are only applied when a function is redeployed.",
      ).optional(),
      runtime: z.string().describe(
        "The runtime in which to run the function. Required when deploying a new function, optional when updating an existing function. For a complete list of possible choices, see the [`gcloud` command reference](https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--runtime).",
      ).optional(),
      serviceAccount: z.string().describe(
        "Service account to be used for building the container. The format of this field is `projects/{projectId}/serviceAccounts/{serviceAccountEmail}`.",
      ).optional(),
      source: z.object({
        gitUri: z.string().describe(
          "If provided, get the source from GitHub repository. This option is valid only for GCF 1st Gen function. Example: https://github.com///blob//",
        ).optional(),
        repoSource: z.object({
          branchName: z.string().describe(
            "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
          ).optional(),
          commitSha: z.string().describe("Explicit commit SHA to build.")
            .optional(),
          dir: z.string().describe(
            "Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. eg. helloworld (no leading slash allowed)",
          ).optional(),
          projectId: z.string().describe(
            "ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
          ).optional(),
          repoName: z.string().describe("Name of the Cloud Source Repository.")
            .optional(),
          tagName: z.string().describe(
            "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
          ).optional(),
        }).describe(
          "Location of the source in a Google Cloud Source Repository.",
        ).optional(),
        storageSource: z.object({
          bucket: z.string().describe(
            "Google Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
          ).optional(),
          generation: z.string().describe(
            "Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
          ).optional(),
          object: z.string().describe(
            "Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build.",
          ).optional(),
          sourceUploadUrl: z.string().describe(
            "When the specified storage bucket is a 1st gen function uploard url bucket, this field should be set as the generated upload url for 1st gen deployment.",
          ).optional(),
        }).describe(
          "Location of the source in an archive file in Google Cloud Storage.",
        ).optional(),
      }).describe("The location of the function source code.").optional(),
      sourceProvenance: z.object({
        gitUri: z.string().describe(
          "A copy of the build's `source.git_uri`, if exists, with any commits resolved.",
        ).optional(),
        resolvedRepoSource: z.object({
          branchName: z.string().describe(
            "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
          ).optional(),
          commitSha: z.string().describe("Explicit commit SHA to build.")
            .optional(),
          dir: z.string().describe(
            "Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. eg. helloworld (no leading slash allowed)",
          ).optional(),
          projectId: z.string().describe(
            "ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
          ).optional(),
          repoName: z.string().describe("Name of the Cloud Source Repository.")
            .optional(),
          tagName: z.string().describe(
            "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
          ).optional(),
        }).describe(
          "Location of the source in a Google Cloud Source Repository.",
        ).optional(),
        resolvedStorageSource: z.object({
          bucket: z.string().describe(
            "Google Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
          ).optional(),
          generation: z.string().describe(
            "Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
          ).optional(),
          object: z.string().describe(
            "Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build.",
          ).optional(),
          sourceUploadUrl: z.string().describe(
            "When the specified storage bucket is a 1st gen function uploard url bucket, this field should be set as the generated upload url for 1st gen deployment.",
          ).optional(),
        }).describe(
          "Location of the source in an archive file in Google Cloud Storage.",
        ).optional(),
      }).describe(
        "Provenance of the source. Ways to find the original source, or verify that some source was used for this build.",
      ).optional(),
      sourceToken: z.string().describe(
        "An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments.",
      ).optional(),
      workerPool: z.string().describe(
        "Name of the Cloud Build Custom Worker Pool that should be used to build the function. The format of this field is `projects/{project}/locations/{region}/workerPools/{workerPool}` where {project} and {region} are the project id and region respectively where the worker pool is defined and {workerPool} is the short name of the worker pool. If the project id is not the same as the function, then the Cloud Functions Service Agent (service-@gcf-admin-robot.iam.gserviceaccount.com) must be granted the role Cloud Build Custom Workers Builder (roles/cloudbuild.customworkers.builder) in the project.",
      ).optional(),
    }).describe(
      "Describes the Build step of the function that builds a container from the given source.",
    ).optional(),
    eventTrigger: z.object({
      channel: z.string().describe(
        "Optional. The name of the channel associated with the trigger in `projects/{project}/locations/{location}/channels/{channel}` format. You must provide a channel to receive events from Eventarc SaaS partners.",
      ).optional(),
      eventFilters: z.array(z.object({
        attribute: z.string().describe(
          "Required. The name of a CloudEvents attribute.",
        ).optional(),
        operator: z.string().describe(
          "Optional. The operator used for matching the events with the value of the filter. If not specified, only events that have an exact key-value pair specified in the filter are matched. The only allowed value is `match-path-pattern`.",
        ).optional(),
        value: z.string().describe("Required. The value for the attribute.")
          .optional(),
      })).describe("Criteria used to filter events.").optional(),
      eventType: z.string().describe(
        "Required. The type of event to observe. For example: `google.cloud.audit.log.v1.written` or `google.cloud.pubsub.topic.v1.messagePublished`.",
      ).optional(),
      pubsubTopic: z.string().describe(
        "Optional. The name of a Pub/Sub topic in the same project that will be used as the transport topic for the event delivery. Format: `projects/{project}/topics/{topic}`. This is only valid for events of type `google.cloud.pubsub.topic.v1.messagePublished`. The topic provided here will not be deleted at function deletion.",
      ).optional(),
      retryPolicy: z.enum([
        "RETRY_POLICY_UNSPECIFIED",
        "RETRY_POLICY_DO_NOT_RETRY",
        "RETRY_POLICY_RETRY",
      ]).describe(
        "Optional. If unset, then defaults to ignoring failures (i.e. not retrying them).",
      ).optional(),
      service: z.string().describe(
        "Optional. The hostname of the service that 1st Gen function should be observed. If no string is provided, the default service implementing the API will be used. For example, `storage.googleapis.com` is the default for all event types in the `google.storage` namespace. The field is only applicable to 1st Gen functions.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. The email of the trigger's service account. The service account must have permission to invoke Cloud Run services, the permission is `run.routes.invoke`. If empty, defaults to the Compute Engine default service account: `{project_number}-compute@developer.gserviceaccount.com`.",
      ).optional(),
      trigger: z.string().describe(
        "Output only. The resource name of the Eventarc trigger. The format of this field is `projects/{project}/locations/{region}/triggers/{trigger}`.",
      ).optional(),
      triggerRegion: z.string().describe(
        "The region that the trigger will be in. The trigger will only receive events originating in this region. It can be the same region as the function, a different region or multi-region, or the global region. If not provided, defaults to the same region as the function.",
      ).optional(),
    }).describe(
      "Describes EventTrigger, used to request events to be sent from another service.",
    ).optional(),
    serviceConfig: z.object({
      allTrafficOnLatestRevision: z.boolean().describe(
        "Whether 100% of traffic is routed to the latest revision. On CreateFunction and UpdateFunction, when set to true, the revision being deployed will serve 100% of traffic, ignoring any traffic split settings, if any. On GetFunction, true will be returned if the latest revision is serving 100% of traffic.",
      ).optional(),
      availableCpu: z.string().describe(
        'The number of CPUs used in a single container instance. Default value is calculated from available memory. Supports the same values as Cloud Run, see https://cloud.google.com/run/docs/reference/rest/v1/Container#resourcerequirements Example: "1" indicates 1 vCPU',
      ).optional(),
      availableMemory: z.string().describe(
        "The amount of memory available for a function. Defaults to 256M. Supported units are k, M, G, Mi, Gi. If no unit is supplied the value is interpreted as bytes. See https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apimachinery/pkg/api/resource/quantity.go a full description.",
      ).optional(),
      binaryAuthorizationPolicy: z.string().describe(
        "Optional. The binary authorization policy to be checked when deploying the Cloud Run service.",
      ).optional(),
      directVpcEgress: z.enum([
        "DIRECT_VPC_EGRESS_UNSPECIFIED",
        "VPC_EGRESS_PRIVATE_RANGES_ONLY",
        "VPC_EGRESS_ALL_TRAFFIC",
      ]).describe(
        "Optional. Egress settings for direct VPC. If not provided, it defaults to VPC_EGRESS_PRIVATE_RANGES_ONLY.",
      ).optional(),
      directVpcNetworkInterface: z.array(z.object({
        network: z.string().describe(
          "Optional. The name of the VPC network to which the function will be connected. Specify either a VPC network or a subnet, or both. If you specify only a network, the subnet uses the same name as the network.",
        ).optional(),
        subnetwork: z.string().describe(
          "Optional. The name of the VPC subnetwork that the Cloud Function resource will get IPs from. Specify either a VPC network or a subnet, or both. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used.",
        ).optional(),
        tags: z.array(z.unknown()).describe(
          "Optional. Network tags applied to this Cloud Function resource.",
        ).optional(),
      })).describe(
        "Optional. The Direct VPC network interface for the Cloud Function. Currently only a single Direct VPC is supported.",
      ).optional(),
      environmentVariables: z.record(z.string(), z.string()).describe(
        "Environment variables that shall be available during function execution.",
      ).optional(),
      ingressSettings: z.enum([
        "INGRESS_SETTINGS_UNSPECIFIED",
        "ALLOW_ALL",
        "ALLOW_INTERNAL_ONLY",
        "ALLOW_INTERNAL_AND_GCLB",
      ]).describe(
        "The ingress settings for the function, controlling what traffic can reach it.",
      ).optional(),
      maxInstanceCount: z.number().int().describe(
        "The limit on the maximum number of function instances that may coexist at a given time. In some cases, such as rapid traffic surges, Cloud Functions may, for a short period of time, create more instances than the specified max instances limit. If your function cannot tolerate this temporary behavior, you may want to factor in a safety margin and set a lower max instances value than your function can tolerate. See the [Max Instances](https://cloud.google.com/functions/docs/max-instances) Guide for more details.",
      ).optional(),
      maxInstanceRequestConcurrency: z.number().int().describe(
        "Sets the maximum number of concurrent requests that each instance can receive. Defaults to 1.",
      ).optional(),
      minInstanceCount: z.number().int().describe(
        "The limit on the minimum number of function instances that may coexist at a given time. Function instances are kept in idle state for a short period after they finished executing the request to reduce cold start time for subsequent requests. Setting a minimum instance count will ensure that the given number of instances are kept running in idle state always. This can help with cold start times when jump in incoming request count occurs after the idle instance would have been stopped in the default case.",
      ).optional(),
      revision: z.string().describe(
        "Output only. The name of service revision.",
      ).optional(),
      secretEnvironmentVariables: z.array(z.object({
        key: z.string().describe("Name of the environment variable.")
          .optional(),
        projectId: z.string().describe(
          "Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function.",
        ).optional(),
        secret: z.string().describe(
          "Name of the secret in secret manager (not the full resource name).",
        ).optional(),
        version: z.string().describe(
          "Version of the secret (version number or the string 'latest'). It is recommended to use a numeric version for secret environment variables as any updates to the secret value is not reflected until new instances start.",
        ).optional(),
      })).describe("Secret environment variables configuration.").optional(),
      secretVolumes: z.array(z.object({
        mountPath: z.string().describe(
          "The path within the container to mount the secret volume. For example, setting the mount_path as `/etc/secrets` would mount the secret value files under the `/etc/secrets` directory. This directory will also be completely shadowed and unavailable to mount any other secrets. Recommended mount path: /etc/secrets",
        ).optional(),
        projectId: z.string().describe(
          "Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function.",
        ).optional(),
        secret: z.string().describe(
          "Name of the secret in secret manager (not the full resource name).",
        ).optional(),
        versions: z.array(z.unknown()).describe(
          "List of secret versions to mount for this secret. If empty, the `latest` version of the secret will be made available in a file named after the secret under the mount point.",
        ).optional(),
      })).describe("Secret volumes configuration.").optional(),
      securityLevel: z.enum([
        "SECURITY_LEVEL_UNSPECIFIED",
        "SECURE_ALWAYS",
        "SECURE_OPTIONAL",
      ]).describe(
        "Security level configure whether the function only accepts https. This configuration is only applicable to 1st Gen functions with Http trigger. By default https is optional for 1st Gen functions; 2nd Gen functions are https ONLY.",
      ).optional(),
      service: z.string().describe(
        "Output only. Name of the service associated with a Function. The format of this field is `projects/{project}/locations/{region}/services/{service}`",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "The email of the service's service account. If empty, defaults to `{project_number}-compute@developer.gserviceaccount.com`.",
      ).optional(),
      timeoutSeconds: z.number().int().describe(
        "The function execution timeout. Execution is considered failed and can be terminated if the function is not completed at the end of the timeout period. Defaults to 60 seconds.",
      ).optional(),
      uri: z.string().describe("Output only. URI of the Service deployed.")
        .optional(),
      vpcConnector: z.string().describe(
        "The Serverless VPC Access connector that this cloud function can connect to. The format of this field is `projects/*/locations/*/connectors/*`.",
      ).optional(),
      vpcConnectorEgressSettings: z.enum([
        "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED",
        "PRIVATE_RANGES_ONLY",
        "ALL_TRAFFIC",
      ]).describe(
        "The egress settings for the connector, controlling what traffic is diverted through it.",
      ).optional(),
    }).describe(
      "Describes the Service being deployed. Currently Supported: Cloud Run (fully managed).",
    ).optional(),
    upgradeState: z.enum([
      "UPGRADE_STATE_UNSPECIFIED",
      "ELIGIBLE_FOR_2ND_GEN_UPGRADE",
      "INELIGIBLE_FOR_UPGRADE_UNTIL_REDEPLOYMENT",
      "UPGRADE_OPERATION_IN_PROGRESS",
      "SETUP_FUNCTION_UPGRADE_CONFIG_SUCCESSFUL",
      "SETUP_FUNCTION_UPGRADE_CONFIG_ERROR",
      "ABORT_FUNCTION_UPGRADE_ERROR",
      "REDIRECT_FUNCTION_UPGRADE_TRAFFIC_SUCCESSFUL",
      "REDIRECT_FUNCTION_UPGRADE_TRAFFIC_ERROR",
      "ROLLBACK_FUNCTION_UPGRADE_TRAFFIC_ERROR",
      "COMMIT_FUNCTION_UPGRADE_ERROR",
      "COMMIT_FUNCTION_UPGRADE_ERROR_ROLLBACK_SAFE",
      "COMMIT_FUNCTION_UPGRADE_AS_GEN2_SUCCESSFUL",
      "COMMIT_FUNCTION_UPGRADE_AS_GEN2_ERROR",
    ]).describe("UpgradeState of the function").optional(),
  }).describe(
    "Information related to: * A function's eligibility for 1st Gen to 2nd Gen migration. * Current state of migration for function undergoing migration.",
  ).optional(),
  functionId: z.string().describe(
    "The ID to use for the function, which will become the final component of the function's resource name. This value should be 4-63 characters, and valid characters are /a-z-/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  buildConfig: z.object({
    automaticUpdatePolicy: z.object({}),
    build: z.string(),
    dockerRegistry: z.string(),
    dockerRepository: z.string(),
    entryPoint: z.string(),
    environmentVariables: z.record(z.string(), z.unknown()),
    onDeployUpdatePolicy: z.object({
      runtimeVersion: z.string(),
    }),
    runtime: z.string(),
    serviceAccount: z.string(),
    source: z.object({
      gitUri: z.string(),
      repoSource: z.object({
        branchName: z.string(),
        commitSha: z.string(),
        dir: z.string(),
        projectId: z.string(),
        repoName: z.string(),
        tagName: z.string(),
      }),
      storageSource: z.object({
        bucket: z.string(),
        generation: z.string(),
        object: z.string(),
        sourceUploadUrl: z.string(),
      }),
    }),
    sourceProvenance: z.object({
      gitUri: z.string(),
      resolvedRepoSource: z.object({
        branchName: z.string(),
        commitSha: z.string(),
        dir: z.string(),
        projectId: z.string(),
        repoName: z.string(),
        tagName: z.string(),
      }),
      resolvedStorageSource: z.object({
        bucket: z.string(),
        generation: z.string(),
        object: z.string(),
        sourceUploadUrl: z.string(),
      }),
    }),
    sourceToken: z.string(),
    workerPool: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  environment: z.string().optional(),
  eventTrigger: z.object({
    channel: z.string(),
    eventFilters: z.array(z.object({
      attribute: z.string(),
      operator: z.string(),
      value: z.string(),
    })),
    eventType: z.string(),
    pubsubTopic: z.string(),
    retryPolicy: z.string(),
    service: z.string(),
    serviceAccountEmail: z.string(),
    trigger: z.string(),
    triggerRegion: z.string(),
  }).optional(),
  kmsKeyName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  serviceConfig: z.object({
    allTrafficOnLatestRevision: z.boolean(),
    availableCpu: z.string(),
    availableMemory: z.string(),
    binaryAuthorizationPolicy: z.string(),
    directVpcEgress: z.string(),
    directVpcNetworkInterface: z.array(z.object({
      network: z.string(),
      subnetwork: z.string(),
      tags: z.array(z.string()),
    })),
    environmentVariables: z.record(z.string(), z.unknown()),
    ingressSettings: z.string(),
    maxInstanceCount: z.number(),
    maxInstanceRequestConcurrency: z.number(),
    minInstanceCount: z.number(),
    revision: z.string(),
    secretEnvironmentVariables: z.array(z.object({
      key: z.string(),
      projectId: z.string(),
      secret: z.string(),
      version: z.string(),
    })),
    secretVolumes: z.array(z.object({
      mountPath: z.string(),
      projectId: z.string(),
      secret: z.string(),
      versions: z.array(z.object({
        path: z.unknown(),
        version: z.unknown(),
      })),
    })),
    securityLevel: z.string(),
    service: z.string(),
    serviceAccountEmail: z.string(),
    timeoutSeconds: z.number(),
    uri: z.string(),
    vpcConnector: z.string(),
    vpcConnectorEgressSettings: z.string(),
  }).optional(),
  state: z.string().optional(),
  stateMessages: z.array(z.object({
    message: z.string(),
    severity: z.string(),
    type: z.string(),
  })).optional(),
  updateTime: z.string().optional(),
  upgradeInfo: z.object({
    buildConfig: z.object({
      automaticUpdatePolicy: z.object({}),
      build: z.string(),
      dockerRegistry: z.string(),
      dockerRepository: z.string(),
      entryPoint: z.string(),
      environmentVariables: z.record(z.string(), z.unknown()),
      onDeployUpdatePolicy: z.object({
        runtimeVersion: z.string(),
      }),
      runtime: z.string(),
      serviceAccount: z.string(),
      source: z.object({
        gitUri: z.string(),
        repoSource: z.object({
          branchName: z.string(),
          commitSha: z.string(),
          dir: z.string(),
          projectId: z.string(),
          repoName: z.string(),
          tagName: z.string(),
        }),
        storageSource: z.object({
          bucket: z.string(),
          generation: z.string(),
          object: z.string(),
          sourceUploadUrl: z.string(),
        }),
      }),
      sourceProvenance: z.object({
        gitUri: z.string(),
        resolvedRepoSource: z.object({
          branchName: z.string(),
          commitSha: z.string(),
          dir: z.string(),
          projectId: z.string(),
          repoName: z.string(),
          tagName: z.string(),
        }),
        resolvedStorageSource: z.object({
          bucket: z.string(),
          generation: z.string(),
          object: z.string(),
          sourceUploadUrl: z.string(),
        }),
      }),
      sourceToken: z.string(),
      workerPool: z.string(),
    }),
    eventTrigger: z.object({
      channel: z.string(),
      eventFilters: z.array(z.object({
        attribute: z.string(),
        operator: z.string(),
        value: z.string(),
      })),
      eventType: z.string(),
      pubsubTopic: z.string(),
      retryPolicy: z.string(),
      service: z.string(),
      serviceAccountEmail: z.string(),
      trigger: z.string(),
      triggerRegion: z.string(),
    }),
    serviceConfig: z.object({
      allTrafficOnLatestRevision: z.boolean(),
      availableCpu: z.string(),
      availableMemory: z.string(),
      binaryAuthorizationPolicy: z.string(),
      directVpcEgress: z.string(),
      directVpcNetworkInterface: z.array(z.object({
        network: z.string(),
        subnetwork: z.string(),
        tags: z.array(z.unknown()),
      })),
      environmentVariables: z.record(z.string(), z.unknown()),
      ingressSettings: z.string(),
      maxInstanceCount: z.number(),
      maxInstanceRequestConcurrency: z.number(),
      minInstanceCount: z.number(),
      revision: z.string(),
      secretEnvironmentVariables: z.array(z.object({
        key: z.string(),
        projectId: z.string(),
        secret: z.string(),
        version: z.string(),
      })),
      secretVolumes: z.array(z.object({
        mountPath: z.string(),
        projectId: z.string(),
        secret: z.string(),
        versions: z.array(z.unknown()),
      })),
      securityLevel: z.string(),
      service: z.string(),
      serviceAccountEmail: z.string(),
      timeoutSeconds: z.number(),
      uri: z.string(),
      vpcConnector: z.string(),
      vpcConnectorEgressSettings: z.string(),
    }),
    upgradeState: z.string(),
  }).optional(),
  url: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  buildConfig: z.object({
    automaticUpdatePolicy: z.object({}).describe(
      "Security patches are applied automatically to the runtime without requiring the function to be redeployed.",
    ).optional(),
    build: z.string().describe(
      "Output only. The Cloud Build name of the latest successful deployment of the function.",
    ).optional(),
    dockerRegistry: z.enum([
      "DOCKER_REGISTRY_UNSPECIFIED",
      "CONTAINER_REGISTRY",
      "ARTIFACT_REGISTRY",
    ]).describe(
      "Docker Registry to use for this deployment. This configuration is only applicable to 1st Gen functions, 2nd Gen functions can only use Artifact Registry. Deprecated: as of March 2025, `CONTAINER_REGISTRY` option is no longer available in response to Container Registry's deprecation: https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr Please use Artifact Registry instead, which is the default choice. If unspecified, it defaults to `ARTIFACT_REGISTRY`. If `docker_repository` field is specified, this field should either be left unspecified or set to `ARTIFACT_REGISTRY`.",
    ).optional(),
    dockerRepository: z.string().describe(
      "Repository in Artifact Registry to which the function docker image will be pushed after it is built by Cloud Build. If specified by user, it is created and managed by user with a customer managed encryption key. Otherwise, GCF will create and use a repository named 'gcf-artifacts' for every deployed region. It must match the pattern `projects/{project}/locations/{location}/repositories/{repository}`. Repository format must be 'DOCKER'.",
    ).optional(),
    entryPoint: z.string().describe(
      'The name of the function (as defined in source code) that will be executed. Defaults to the resource name suffix, if not specified. For backward compatibility, if function with given name is not found, then the system will try to use function named "function". For Node.js this is name of a function exported by the module specified in `source_location`.',
    ).optional(),
    environmentVariables: z.record(z.string(), z.string()).describe(
      "User-provided build-time environment variables for the function",
    ).optional(),
    onDeployUpdatePolicy: z.object({
      runtimeVersion: z.string().describe(
        "Output only. contains the runtime version which was used during latest function deployment.",
      ).optional(),
    }).describe(
      "Security patches are only applied when a function is redeployed.",
    ).optional(),
    runtime: z.string().describe(
      "The runtime in which to run the function. Required when deploying a new function, optional when updating an existing function. For a complete list of possible choices, see the [`gcloud` command reference](https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--runtime).",
    ).optional(),
    serviceAccount: z.string().describe(
      "Service account to be used for building the container. The format of this field is `projects/{projectId}/serviceAccounts/{serviceAccountEmail}`.",
    ).optional(),
    source: z.object({
      gitUri: z.string().describe(
        "If provided, get the source from GitHub repository. This option is valid only for GCF 1st Gen function. Example: https://github.com///blob//",
      ).optional(),
      repoSource: z.object({
        branchName: z.string().describe(
          "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
        commitSha: z.string().describe("Explicit commit SHA to build.")
          .optional(),
        dir: z.string().describe(
          "Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. eg. helloworld (no leading slash allowed)",
        ).optional(),
        projectId: z.string().describe(
          "ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
        ).optional(),
        repoName: z.string().describe("Name of the Cloud Source Repository.")
          .optional(),
        tagName: z.string().describe(
          "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
      }).describe("Location of the source in a Google Cloud Source Repository.")
        .optional(),
      storageSource: z.object({
        bucket: z.string().describe(
          "Google Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build.",
        ).optional(),
        sourceUploadUrl: z.string().describe(
          "When the specified storage bucket is a 1st gen function uploard url bucket, this field should be set as the generated upload url for 1st gen deployment.",
        ).optional(),
      }).describe(
        "Location of the source in an archive file in Google Cloud Storage.",
      ).optional(),
    }).describe("The location of the function source code.").optional(),
    sourceProvenance: z.object({
      gitUri: z.string().describe(
        "A copy of the build's `source.git_uri`, if exists, with any commits resolved.",
      ).optional(),
      resolvedRepoSource: z.object({
        branchName: z.string().describe(
          "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
        commitSha: z.string().describe("Explicit commit SHA to build.")
          .optional(),
        dir: z.string().describe(
          "Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. eg. helloworld (no leading slash allowed)",
        ).optional(),
        projectId: z.string().describe(
          "ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
        ).optional(),
        repoName: z.string().describe("Name of the Cloud Source Repository.")
          .optional(),
        tagName: z.string().describe(
          "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
      }).describe("Location of the source in a Google Cloud Source Repository.")
        .optional(),
      resolvedStorageSource: z.object({
        bucket: z.string().describe(
          "Google Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build.",
        ).optional(),
        sourceUploadUrl: z.string().describe(
          "When the specified storage bucket is a 1st gen function uploard url bucket, this field should be set as the generated upload url for 1st gen deployment.",
        ).optional(),
      }).describe(
        "Location of the source in an archive file in Google Cloud Storage.",
      ).optional(),
    }).describe(
      "Provenance of the source. Ways to find the original source, or verify that some source was used for this build.",
    ).optional(),
    sourceToken: z.string().describe(
      "An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments.",
    ).optional(),
    workerPool: z.string().describe(
      "Name of the Cloud Build Custom Worker Pool that should be used to build the function. The format of this field is `projects/{project}/locations/{region}/workerPools/{workerPool}` where {project} and {region} are the project id and region respectively where the worker pool is defined and {workerPool} is the short name of the worker pool. If the project id is not the same as the function, then the Cloud Functions Service Agent (service-@gcf-admin-robot.iam.gserviceaccount.com) must be granted the role Cloud Build Custom Workers Builder (roles/cloudbuild.customworkers.builder) in the project.",
    ).optional(),
  }).describe(
    "Describes the Build step of the function that builds a container from the given source.",
  ).optional(),
  description: z.string().describe("User-provided description of a function.")
    .optional(),
  environment: z.enum(["ENVIRONMENT_UNSPECIFIED", "GEN_1", "GEN_2"]).describe(
    "Describe whether the function is 1st Gen or 2nd Gen.",
  ).optional(),
  eventTrigger: z.object({
    channel: z.string().describe(
      "Optional. The name of the channel associated with the trigger in `projects/{project}/locations/{location}/channels/{channel}` format. You must provide a channel to receive events from Eventarc SaaS partners.",
    ).optional(),
    eventFilters: z.array(z.object({
      attribute: z.string().describe(
        "Required. The name of a CloudEvents attribute.",
      ).optional(),
      operator: z.string().describe(
        "Optional. The operator used for matching the events with the value of the filter. If not specified, only events that have an exact key-value pair specified in the filter are matched. The only allowed value is `match-path-pattern`.",
      ).optional(),
      value: z.string().describe("Required. The value for the attribute.")
        .optional(),
    })).describe("Criteria used to filter events.").optional(),
    eventType: z.string().describe(
      "Required. The type of event to observe. For example: `google.cloud.audit.log.v1.written` or `google.cloud.pubsub.topic.v1.messagePublished`.",
    ).optional(),
    pubsubTopic: z.string().describe(
      "Optional. The name of a Pub/Sub topic in the same project that will be used as the transport topic for the event delivery. Format: `projects/{project}/topics/{topic}`. This is only valid for events of type `google.cloud.pubsub.topic.v1.messagePublished`. The topic provided here will not be deleted at function deletion.",
    ).optional(),
    retryPolicy: z.enum([
      "RETRY_POLICY_UNSPECIFIED",
      "RETRY_POLICY_DO_NOT_RETRY",
      "RETRY_POLICY_RETRY",
    ]).describe(
      "Optional. If unset, then defaults to ignoring failures (i.e. not retrying them).",
    ).optional(),
    service: z.string().describe(
      "Optional. The hostname of the service that 1st Gen function should be observed. If no string is provided, the default service implementing the API will be used. For example, `storage.googleapis.com` is the default for all event types in the `google.storage` namespace. The field is only applicable to 1st Gen functions.",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. The email of the trigger's service account. The service account must have permission to invoke Cloud Run services, the permission is `run.routes.invoke`. If empty, defaults to the Compute Engine default service account: `{project_number}-compute@developer.gserviceaccount.com`.",
    ).optional(),
    trigger: z.string().describe(
      "Output only. The resource name of the Eventarc trigger. The format of this field is `projects/{project}/locations/{region}/triggers/{trigger}`.",
    ).optional(),
    triggerRegion: z.string().describe(
      "The region that the trigger will be in. The trigger will only receive events originating in this region. It can be the same region as the function, a different region or multi-region, or the global region. If not provided, defaults to the same region as the function.",
    ).optional(),
  }).describe(
    "Describes EventTrigger, used to request events to be sent from another service.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function resources. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels associated with this Cloud Function.",
  ).optional(),
  name: z.string().describe(
    "A user-defined name of the function. Function names must be unique globally and match pattern `projects/*/locations/*/functions/*`",
  ).optional(),
  serviceConfig: z.object({
    allTrafficOnLatestRevision: z.boolean().describe(
      "Whether 100% of traffic is routed to the latest revision. On CreateFunction and UpdateFunction, when set to true, the revision being deployed will serve 100% of traffic, ignoring any traffic split settings, if any. On GetFunction, true will be returned if the latest revision is serving 100% of traffic.",
    ).optional(),
    availableCpu: z.string().describe(
      'The number of CPUs used in a single container instance. Default value is calculated from available memory. Supports the same values as Cloud Run, see https://cloud.google.com/run/docs/reference/rest/v1/Container#resourcerequirements Example: "1" indicates 1 vCPU',
    ).optional(),
    availableMemory: z.string().describe(
      "The amount of memory available for a function. Defaults to 256M. Supported units are k, M, G, Mi, Gi. If no unit is supplied the value is interpreted as bytes. See https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apimachinery/pkg/api/resource/quantity.go a full description.",
    ).optional(),
    binaryAuthorizationPolicy: z.string().describe(
      "Optional. The binary authorization policy to be checked when deploying the Cloud Run service.",
    ).optional(),
    directVpcEgress: z.enum([
      "DIRECT_VPC_EGRESS_UNSPECIFIED",
      "VPC_EGRESS_PRIVATE_RANGES_ONLY",
      "VPC_EGRESS_ALL_TRAFFIC",
    ]).describe(
      "Optional. Egress settings for direct VPC. If not provided, it defaults to VPC_EGRESS_PRIVATE_RANGES_ONLY.",
    ).optional(),
    directVpcNetworkInterface: z.array(z.object({
      network: z.string().describe(
        "Optional. The name of the VPC network to which the function will be connected. Specify either a VPC network or a subnet, or both. If you specify only a network, the subnet uses the same name as the network.",
      ).optional(),
      subnetwork: z.string().describe(
        "Optional. The name of the VPC subnetwork that the Cloud Function resource will get IPs from. Specify either a VPC network or a subnet, or both. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used.",
      ).optional(),
      tags: z.array(z.string()).describe(
        "Optional. Network tags applied to this Cloud Function resource.",
      ).optional(),
    })).describe(
      "Optional. The Direct VPC network interface for the Cloud Function. Currently only a single Direct VPC is supported.",
    ).optional(),
    environmentVariables: z.record(z.string(), z.string()).describe(
      "Environment variables that shall be available during function execution.",
    ).optional(),
    ingressSettings: z.enum([
      "INGRESS_SETTINGS_UNSPECIFIED",
      "ALLOW_ALL",
      "ALLOW_INTERNAL_ONLY",
      "ALLOW_INTERNAL_AND_GCLB",
    ]).describe(
      "The ingress settings for the function, controlling what traffic can reach it.",
    ).optional(),
    maxInstanceCount: z.number().int().describe(
      "The limit on the maximum number of function instances that may coexist at a given time. In some cases, such as rapid traffic surges, Cloud Functions may, for a short period of time, create more instances than the specified max instances limit. If your function cannot tolerate this temporary behavior, you may want to factor in a safety margin and set a lower max instances value than your function can tolerate. See the [Max Instances](https://cloud.google.com/functions/docs/max-instances) Guide for more details.",
    ).optional(),
    maxInstanceRequestConcurrency: z.number().int().describe(
      "Sets the maximum number of concurrent requests that each instance can receive. Defaults to 1.",
    ).optional(),
    minInstanceCount: z.number().int().describe(
      "The limit on the minimum number of function instances that may coexist at a given time. Function instances are kept in idle state for a short period after they finished executing the request to reduce cold start time for subsequent requests. Setting a minimum instance count will ensure that the given number of instances are kept running in idle state always. This can help with cold start times when jump in incoming request count occurs after the idle instance would have been stopped in the default case.",
    ).optional(),
    revision: z.string().describe("Output only. The name of service revision.")
      .optional(),
    secretEnvironmentVariables: z.array(z.object({
      key: z.string().describe("Name of the environment variable.").optional(),
      projectId: z.string().describe(
        "Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function.",
      ).optional(),
      secret: z.string().describe(
        "Name of the secret in secret manager (not the full resource name).",
      ).optional(),
      version: z.string().describe(
        "Version of the secret (version number or the string 'latest'). It is recommended to use a numeric version for secret environment variables as any updates to the secret value is not reflected until new instances start.",
      ).optional(),
    })).describe("Secret environment variables configuration.").optional(),
    secretVolumes: z.array(z.object({
      mountPath: z.string().describe(
        "The path within the container to mount the secret volume. For example, setting the mount_path as `/etc/secrets` would mount the secret value files under the `/etc/secrets` directory. This directory will also be completely shadowed and unavailable to mount any other secrets. Recommended mount path: /etc/secrets",
      ).optional(),
      projectId: z.string().describe(
        "Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function.",
      ).optional(),
      secret: z.string().describe(
        "Name of the secret in secret manager (not the full resource name).",
      ).optional(),
      versions: z.array(z.object({
        path: z.unknown().describe(
          "Relative path of the file under the mount path where the secret value for this version will be fetched and made available. For example, setting the mount_path as '/etc/secrets' and path as `secret_foo` would mount the secret value file at `/etc/secrets/secret_foo`.",
        ).optional(),
        version: z.unknown().describe(
          "Version of the secret (version number or the string 'latest'). It is preferable to use `latest` version with secret volumes as secret value changes are reflected immediately.",
        ).optional(),
      })).describe(
        "List of secret versions to mount for this secret. If empty, the `latest` version of the secret will be made available in a file named after the secret under the mount point.",
      ).optional(),
    })).describe("Secret volumes configuration.").optional(),
    securityLevel: z.enum([
      "SECURITY_LEVEL_UNSPECIFIED",
      "SECURE_ALWAYS",
      "SECURE_OPTIONAL",
    ]).describe(
      "Security level configure whether the function only accepts https. This configuration is only applicable to 1st Gen functions with Http trigger. By default https is optional for 1st Gen functions; 2nd Gen functions are https ONLY.",
    ).optional(),
    service: z.string().describe(
      "Output only. Name of the service associated with a Function. The format of this field is `projects/{project}/locations/{region}/services/{service}`",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "The email of the service's service account. If empty, defaults to `{project_number}-compute@developer.gserviceaccount.com`.",
    ).optional(),
    timeoutSeconds: z.number().int().describe(
      "The function execution timeout. Execution is considered failed and can be terminated if the function is not completed at the end of the timeout period. Defaults to 60 seconds.",
    ).optional(),
    uri: z.string().describe("Output only. URI of the Service deployed.")
      .optional(),
    vpcConnector: z.string().describe(
      "The Serverless VPC Access connector that this cloud function can connect to. The format of this field is `projects/*/locations/*/connectors/*`.",
    ).optional(),
    vpcConnectorEgressSettings: z.enum([
      "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED",
      "PRIVATE_RANGES_ONLY",
      "ALL_TRAFFIC",
    ]).describe(
      "The egress settings for the connector, controlling what traffic is diverted through it.",
    ).optional(),
  }).describe(
    "Describes the Service being deployed. Currently Supported: Cloud Run (fully managed).",
  ).optional(),
  upgradeInfo: z.object({
    buildConfig: z.object({
      automaticUpdatePolicy: z.object({}).describe(
        "Security patches are applied automatically to the runtime without requiring the function to be redeployed.",
      ).optional(),
      build: z.string().describe(
        "Output only. The Cloud Build name of the latest successful deployment of the function.",
      ).optional(),
      dockerRegistry: z.enum([
        "DOCKER_REGISTRY_UNSPECIFIED",
        "CONTAINER_REGISTRY",
        "ARTIFACT_REGISTRY",
      ]).describe(
        "Docker Registry to use for this deployment. This configuration is only applicable to 1st Gen functions, 2nd Gen functions can only use Artifact Registry. Deprecated: as of March 2025, `CONTAINER_REGISTRY` option is no longer available in response to Container Registry's deprecation: https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr Please use Artifact Registry instead, which is the default choice. If unspecified, it defaults to `ARTIFACT_REGISTRY`. If `docker_repository` field is specified, this field should either be left unspecified or set to `ARTIFACT_REGISTRY`.",
      ).optional(),
      dockerRepository: z.string().describe(
        "Repository in Artifact Registry to which the function docker image will be pushed after it is built by Cloud Build. If specified by user, it is created and managed by user with a customer managed encryption key. Otherwise, GCF will create and use a repository named 'gcf-artifacts' for every deployed region. It must match the pattern `projects/{project}/locations/{location}/repositories/{repository}`. Repository format must be 'DOCKER'.",
      ).optional(),
      entryPoint: z.string().describe(
        'The name of the function (as defined in source code) that will be executed. Defaults to the resource name suffix, if not specified. For backward compatibility, if function with given name is not found, then the system will try to use function named "function". For Node.js this is name of a function exported by the module specified in `source_location`.',
      ).optional(),
      environmentVariables: z.record(z.string(), z.string()).describe(
        "User-provided build-time environment variables for the function",
      ).optional(),
      onDeployUpdatePolicy: z.object({
        runtimeVersion: z.string().describe(
          "Output only. contains the runtime version which was used during latest function deployment.",
        ).optional(),
      }).describe(
        "Security patches are only applied when a function is redeployed.",
      ).optional(),
      runtime: z.string().describe(
        "The runtime in which to run the function. Required when deploying a new function, optional when updating an existing function. For a complete list of possible choices, see the [`gcloud` command reference](https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--runtime).",
      ).optional(),
      serviceAccount: z.string().describe(
        "Service account to be used for building the container. The format of this field is `projects/{projectId}/serviceAccounts/{serviceAccountEmail}`.",
      ).optional(),
      source: z.object({
        gitUri: z.string().describe(
          "If provided, get the source from GitHub repository. This option is valid only for GCF 1st Gen function. Example: https://github.com///blob//",
        ).optional(),
        repoSource: z.object({
          branchName: z.string().describe(
            "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
          ).optional(),
          commitSha: z.string().describe("Explicit commit SHA to build.")
            .optional(),
          dir: z.string().describe(
            "Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. eg. helloworld (no leading slash allowed)",
          ).optional(),
          projectId: z.string().describe(
            "ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
          ).optional(),
          repoName: z.string().describe("Name of the Cloud Source Repository.")
            .optional(),
          tagName: z.string().describe(
            "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
          ).optional(),
        }).describe(
          "Location of the source in a Google Cloud Source Repository.",
        ).optional(),
        storageSource: z.object({
          bucket: z.string().describe(
            "Google Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
          ).optional(),
          generation: z.string().describe(
            "Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
          ).optional(),
          object: z.string().describe(
            "Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build.",
          ).optional(),
          sourceUploadUrl: z.string().describe(
            "When the specified storage bucket is a 1st gen function uploard url bucket, this field should be set as the generated upload url for 1st gen deployment.",
          ).optional(),
        }).describe(
          "Location of the source in an archive file in Google Cloud Storage.",
        ).optional(),
      }).describe("The location of the function source code.").optional(),
      sourceProvenance: z.object({
        gitUri: z.string().describe(
          "A copy of the build's `source.git_uri`, if exists, with any commits resolved.",
        ).optional(),
        resolvedRepoSource: z.object({
          branchName: z.string().describe(
            "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
          ).optional(),
          commitSha: z.string().describe("Explicit commit SHA to build.")
            .optional(),
          dir: z.string().describe(
            "Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. eg. helloworld (no leading slash allowed)",
          ).optional(),
          projectId: z.string().describe(
            "ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
          ).optional(),
          repoName: z.string().describe("Name of the Cloud Source Repository.")
            .optional(),
          tagName: z.string().describe(
            "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
          ).optional(),
        }).describe(
          "Location of the source in a Google Cloud Source Repository.",
        ).optional(),
        resolvedStorageSource: z.object({
          bucket: z.string().describe(
            "Google Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
          ).optional(),
          generation: z.string().describe(
            "Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
          ).optional(),
          object: z.string().describe(
            "Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build.",
          ).optional(),
          sourceUploadUrl: z.string().describe(
            "When the specified storage bucket is a 1st gen function uploard url bucket, this field should be set as the generated upload url for 1st gen deployment.",
          ).optional(),
        }).describe(
          "Location of the source in an archive file in Google Cloud Storage.",
        ).optional(),
      }).describe(
        "Provenance of the source. Ways to find the original source, or verify that some source was used for this build.",
      ).optional(),
      sourceToken: z.string().describe(
        "An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments.",
      ).optional(),
      workerPool: z.string().describe(
        "Name of the Cloud Build Custom Worker Pool that should be used to build the function. The format of this field is `projects/{project}/locations/{region}/workerPools/{workerPool}` where {project} and {region} are the project id and region respectively where the worker pool is defined and {workerPool} is the short name of the worker pool. If the project id is not the same as the function, then the Cloud Functions Service Agent (service-@gcf-admin-robot.iam.gserviceaccount.com) must be granted the role Cloud Build Custom Workers Builder (roles/cloudbuild.customworkers.builder) in the project.",
      ).optional(),
    }).describe(
      "Describes the Build step of the function that builds a container from the given source.",
    ).optional(),
    eventTrigger: z.object({
      channel: z.string().describe(
        "Optional. The name of the channel associated with the trigger in `projects/{project}/locations/{location}/channels/{channel}` format. You must provide a channel to receive events from Eventarc SaaS partners.",
      ).optional(),
      eventFilters: z.array(z.object({
        attribute: z.string().describe(
          "Required. The name of a CloudEvents attribute.",
        ).optional(),
        operator: z.string().describe(
          "Optional. The operator used for matching the events with the value of the filter. If not specified, only events that have an exact key-value pair specified in the filter are matched. The only allowed value is `match-path-pattern`.",
        ).optional(),
        value: z.string().describe("Required. The value for the attribute.")
          .optional(),
      })).describe("Criteria used to filter events.").optional(),
      eventType: z.string().describe(
        "Required. The type of event to observe. For example: `google.cloud.audit.log.v1.written` or `google.cloud.pubsub.topic.v1.messagePublished`.",
      ).optional(),
      pubsubTopic: z.string().describe(
        "Optional. The name of a Pub/Sub topic in the same project that will be used as the transport topic for the event delivery. Format: `projects/{project}/topics/{topic}`. This is only valid for events of type `google.cloud.pubsub.topic.v1.messagePublished`. The topic provided here will not be deleted at function deletion.",
      ).optional(),
      retryPolicy: z.enum([
        "RETRY_POLICY_UNSPECIFIED",
        "RETRY_POLICY_DO_NOT_RETRY",
        "RETRY_POLICY_RETRY",
      ]).describe(
        "Optional. If unset, then defaults to ignoring failures (i.e. not retrying them).",
      ).optional(),
      service: z.string().describe(
        "Optional. The hostname of the service that 1st Gen function should be observed. If no string is provided, the default service implementing the API will be used. For example, `storage.googleapis.com` is the default for all event types in the `google.storage` namespace. The field is only applicable to 1st Gen functions.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. The email of the trigger's service account. The service account must have permission to invoke Cloud Run services, the permission is `run.routes.invoke`. If empty, defaults to the Compute Engine default service account: `{project_number}-compute@developer.gserviceaccount.com`.",
      ).optional(),
      trigger: z.string().describe(
        "Output only. The resource name of the Eventarc trigger. The format of this field is `projects/{project}/locations/{region}/triggers/{trigger}`.",
      ).optional(),
      triggerRegion: z.string().describe(
        "The region that the trigger will be in. The trigger will only receive events originating in this region. It can be the same region as the function, a different region or multi-region, or the global region. If not provided, defaults to the same region as the function.",
      ).optional(),
    }).describe(
      "Describes EventTrigger, used to request events to be sent from another service.",
    ).optional(),
    serviceConfig: z.object({
      allTrafficOnLatestRevision: z.boolean().describe(
        "Whether 100% of traffic is routed to the latest revision. On CreateFunction and UpdateFunction, when set to true, the revision being deployed will serve 100% of traffic, ignoring any traffic split settings, if any. On GetFunction, true will be returned if the latest revision is serving 100% of traffic.",
      ).optional(),
      availableCpu: z.string().describe(
        'The number of CPUs used in a single container instance. Default value is calculated from available memory. Supports the same values as Cloud Run, see https://cloud.google.com/run/docs/reference/rest/v1/Container#resourcerequirements Example: "1" indicates 1 vCPU',
      ).optional(),
      availableMemory: z.string().describe(
        "The amount of memory available for a function. Defaults to 256M. Supported units are k, M, G, Mi, Gi. If no unit is supplied the value is interpreted as bytes. See https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apimachinery/pkg/api/resource/quantity.go a full description.",
      ).optional(),
      binaryAuthorizationPolicy: z.string().describe(
        "Optional. The binary authorization policy to be checked when deploying the Cloud Run service.",
      ).optional(),
      directVpcEgress: z.enum([
        "DIRECT_VPC_EGRESS_UNSPECIFIED",
        "VPC_EGRESS_PRIVATE_RANGES_ONLY",
        "VPC_EGRESS_ALL_TRAFFIC",
      ]).describe(
        "Optional. Egress settings for direct VPC. If not provided, it defaults to VPC_EGRESS_PRIVATE_RANGES_ONLY.",
      ).optional(),
      directVpcNetworkInterface: z.array(z.object({
        network: z.string().describe(
          "Optional. The name of the VPC network to which the function will be connected. Specify either a VPC network or a subnet, or both. If you specify only a network, the subnet uses the same name as the network.",
        ).optional(),
        subnetwork: z.string().describe(
          "Optional. The name of the VPC subnetwork that the Cloud Function resource will get IPs from. Specify either a VPC network or a subnet, or both. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used.",
        ).optional(),
        tags: z.array(z.unknown()).describe(
          "Optional. Network tags applied to this Cloud Function resource.",
        ).optional(),
      })).describe(
        "Optional. The Direct VPC network interface for the Cloud Function. Currently only a single Direct VPC is supported.",
      ).optional(),
      environmentVariables: z.record(z.string(), z.string()).describe(
        "Environment variables that shall be available during function execution.",
      ).optional(),
      ingressSettings: z.enum([
        "INGRESS_SETTINGS_UNSPECIFIED",
        "ALLOW_ALL",
        "ALLOW_INTERNAL_ONLY",
        "ALLOW_INTERNAL_AND_GCLB",
      ]).describe(
        "The ingress settings for the function, controlling what traffic can reach it.",
      ).optional(),
      maxInstanceCount: z.number().int().describe(
        "The limit on the maximum number of function instances that may coexist at a given time. In some cases, such as rapid traffic surges, Cloud Functions may, for a short period of time, create more instances than the specified max instances limit. If your function cannot tolerate this temporary behavior, you may want to factor in a safety margin and set a lower max instances value than your function can tolerate. See the [Max Instances](https://cloud.google.com/functions/docs/max-instances) Guide for more details.",
      ).optional(),
      maxInstanceRequestConcurrency: z.number().int().describe(
        "Sets the maximum number of concurrent requests that each instance can receive. Defaults to 1.",
      ).optional(),
      minInstanceCount: z.number().int().describe(
        "The limit on the minimum number of function instances that may coexist at a given time. Function instances are kept in idle state for a short period after they finished executing the request to reduce cold start time for subsequent requests. Setting a minimum instance count will ensure that the given number of instances are kept running in idle state always. This can help with cold start times when jump in incoming request count occurs after the idle instance would have been stopped in the default case.",
      ).optional(),
      revision: z.string().describe(
        "Output only. The name of service revision.",
      ).optional(),
      secretEnvironmentVariables: z.array(z.object({
        key: z.string().describe("Name of the environment variable.")
          .optional(),
        projectId: z.string().describe(
          "Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function.",
        ).optional(),
        secret: z.string().describe(
          "Name of the secret in secret manager (not the full resource name).",
        ).optional(),
        version: z.string().describe(
          "Version of the secret (version number or the string 'latest'). It is recommended to use a numeric version for secret environment variables as any updates to the secret value is not reflected until new instances start.",
        ).optional(),
      })).describe("Secret environment variables configuration.").optional(),
      secretVolumes: z.array(z.object({
        mountPath: z.string().describe(
          "The path within the container to mount the secret volume. For example, setting the mount_path as `/etc/secrets` would mount the secret value files under the `/etc/secrets` directory. This directory will also be completely shadowed and unavailable to mount any other secrets. Recommended mount path: /etc/secrets",
        ).optional(),
        projectId: z.string().describe(
          "Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it is assumed that the secret is in the same project as the function.",
        ).optional(),
        secret: z.string().describe(
          "Name of the secret in secret manager (not the full resource name).",
        ).optional(),
        versions: z.array(z.unknown()).describe(
          "List of secret versions to mount for this secret. If empty, the `latest` version of the secret will be made available in a file named after the secret under the mount point.",
        ).optional(),
      })).describe("Secret volumes configuration.").optional(),
      securityLevel: z.enum([
        "SECURITY_LEVEL_UNSPECIFIED",
        "SECURE_ALWAYS",
        "SECURE_OPTIONAL",
      ]).describe(
        "Security level configure whether the function only accepts https. This configuration is only applicable to 1st Gen functions with Http trigger. By default https is optional for 1st Gen functions; 2nd Gen functions are https ONLY.",
      ).optional(),
      service: z.string().describe(
        "Output only. Name of the service associated with a Function. The format of this field is `projects/{project}/locations/{region}/services/{service}`",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "The email of the service's service account. If empty, defaults to `{project_number}-compute@developer.gserviceaccount.com`.",
      ).optional(),
      timeoutSeconds: z.number().int().describe(
        "The function execution timeout. Execution is considered failed and can be terminated if the function is not completed at the end of the timeout period. Defaults to 60 seconds.",
      ).optional(),
      uri: z.string().describe("Output only. URI of the Service deployed.")
        .optional(),
      vpcConnector: z.string().describe(
        "The Serverless VPC Access connector that this cloud function can connect to. The format of this field is `projects/*/locations/*/connectors/*`.",
      ).optional(),
      vpcConnectorEgressSettings: z.enum([
        "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED",
        "PRIVATE_RANGES_ONLY",
        "ALL_TRAFFIC",
      ]).describe(
        "The egress settings for the connector, controlling what traffic is diverted through it.",
      ).optional(),
    }).describe(
      "Describes the Service being deployed. Currently Supported: Cloud Run (fully managed).",
    ).optional(),
    upgradeState: z.enum([
      "UPGRADE_STATE_UNSPECIFIED",
      "ELIGIBLE_FOR_2ND_GEN_UPGRADE",
      "INELIGIBLE_FOR_UPGRADE_UNTIL_REDEPLOYMENT",
      "UPGRADE_OPERATION_IN_PROGRESS",
      "SETUP_FUNCTION_UPGRADE_CONFIG_SUCCESSFUL",
      "SETUP_FUNCTION_UPGRADE_CONFIG_ERROR",
      "ABORT_FUNCTION_UPGRADE_ERROR",
      "REDIRECT_FUNCTION_UPGRADE_TRAFFIC_SUCCESSFUL",
      "REDIRECT_FUNCTION_UPGRADE_TRAFFIC_ERROR",
      "ROLLBACK_FUNCTION_UPGRADE_TRAFFIC_ERROR",
      "COMMIT_FUNCTION_UPGRADE_ERROR",
      "COMMIT_FUNCTION_UPGRADE_ERROR_ROLLBACK_SAFE",
      "COMMIT_FUNCTION_UPGRADE_AS_GEN2_SUCCESSFUL",
      "COMMIT_FUNCTION_UPGRADE_AS_GEN2_ERROR",
    ]).describe("UpgradeState of the function").optional(),
  }).describe(
    "Information related to: * A function's eligibility for 1st Gen to 2nd Gen migration. * Current state of migration for function undergoing migration.",
  ).optional(),
  functionId: z.string().describe(
    "The ID to use for the function, which will become the final component of the function's resource name. This value should be 4-63 characters, and valid characters are /a-z-/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Functions Functions. Registered at `@swamp/gcp/cloudfunctions/functions`. */
export const model = {
  type: "@swamp/gcp/cloudfunctions/functions",
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
        "Describes a Cloud Function that contains user computation executed in respons...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a functions",
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
        if (g["buildConfig"] !== undefined) {
          body["buildConfig"] = g["buildConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["environment"] !== undefined) {
          body["environment"] = g["environment"];
        }
        if (g["eventTrigger"] !== undefined) {
          body["eventTrigger"] = g["eventTrigger"];
        }
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["serviceConfig"] !== undefined) {
          body["serviceConfig"] = g["serviceConfig"];
        }
        if (g["upgradeInfo"] !== undefined) {
          body["upgradeInfo"] = g["upgradeInfo"];
        }
        if (g["functionId"] !== undefined) body["functionId"] = g["functionId"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
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
      description: "Get a functions",
      arguments: z.object({
        identifier: z.string().describe("The name of the functions"),
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
      description: "Update functions attributes",
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
        if (g["buildConfig"] !== undefined) {
          body["buildConfig"] = g["buildConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["environment"] !== undefined) {
          body["environment"] = g["environment"];
        }
        if (g["eventTrigger"] !== undefined) {
          body["eventTrigger"] = g["eventTrigger"];
        }
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["serviceConfig"] !== undefined) {
          body["serviceConfig"] = g["serviceConfig"];
        }
        if (g["upgradeInfo"] !== undefined) {
          body["upgradeInfo"] = g["upgradeInfo"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
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
      description: "Delete the functions",
      arguments: z.object({
        identifier: z.string().describe("The name of the functions"),
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
      description: "Sync functions state from GCP",
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
    abort_function_upgrade: {
      description: "abort function upgrade",
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
            "id":
              "cloudfunctions.projects.locations.functions.abortFunctionUpgrade",
            "path": "v2/{+name}:abortFunctionUpgrade",
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
    commit_function_upgrade: {
      description: "commit function upgrade",
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
            "id":
              "cloudfunctions.projects.locations.functions.commitFunctionUpgrade",
            "path": "v2/{+name}:commitFunctionUpgrade",
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
    commit_function_upgrade_as_gen2: {
      description: "commit function upgrade as gen2",
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
            "id":
              "cloudfunctions.projects.locations.functions.commitFunctionUpgradeAsGen2",
            "path": "v2/{+name}:commitFunctionUpgradeAsGen2",
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
    detach_function: {
      description: "detach function",
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
            "id": "cloudfunctions.projects.locations.functions.detachFunction",
            "path": "v2/{+name}:detachFunction",
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
    generate_download_url: {
      description: "generate download url",
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
            "id":
              "cloudfunctions.projects.locations.functions.generateDownloadUrl",
            "path": "v2/{+name}:generateDownloadUrl",
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
    generate_upload_url: {
      description: "generate upload url",
      arguments: z.object({
        environment: z.any().optional(),
        kmsKeyName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["environment"] !== undefined) {
          body["environment"] = args["environment"];
        }
        if (args["kmsKeyName"] !== undefined) {
          body["kmsKeyName"] = args["kmsKeyName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudfunctions.projects.locations.functions.generateUploadUrl",
            "path": "v2/{+parent}/functions:generateUploadUrl",
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
    get_iam_policy: {
      description: "get iam policy",
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudfunctions.projects.locations.functions.getIamPolicy",
            "path": "v2/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    redirect_function_upgrade_traffic: {
      description: "redirect function upgrade traffic",
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
            "id":
              "cloudfunctions.projects.locations.functions.redirectFunctionUpgradeTraffic",
            "path": "v2/{+name}:redirectFunctionUpgradeTraffic",
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
    rollback_function_upgrade_traffic: {
      description: "rollback function upgrade traffic",
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
            "id":
              "cloudfunctions.projects.locations.functions.rollbackFunctionUpgradeTraffic",
            "path": "v2/{+name}:rollbackFunctionUpgradeTraffic",
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
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
            "id": "cloudfunctions.projects.locations.functions.setIamPolicy",
            "path": "v2/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    setup_function_upgrade_config: {
      description: "setup function upgrade config",
      arguments: z.object({
        buildConfigOverrides: z.any().optional(),
        serviceConfigOverrides: z.any().optional(),
        triggerServiceAccount: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["buildConfigOverrides"] !== undefined) {
          body["buildConfigOverrides"] = args["buildConfigOverrides"];
        }
        if (args["serviceConfigOverrides"] !== undefined) {
          body["serviceConfigOverrides"] = args["serviceConfigOverrides"];
        }
        if (args["triggerServiceAccount"] !== undefined) {
          body["triggerServiceAccount"] = args["triggerServiceAccount"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudfunctions.projects.locations.functions.setupFunctionUpgradeConfig",
            "path": "v2/{+name}:setupFunctionUpgradeConfig",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
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
              "cloudfunctions.projects.locations.functions.testIamPermissions",
            "path": "v2/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
