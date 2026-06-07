// Auto-generated extension model for @swamp/gcp/cloudbuild/triggers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Build Triggers.
 *
 * Configuration for an automated build in response to source repository changes.
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
  return `${parent}/triggers/${shortName}`;
}

const BASE_URL = "https://cloudbuild.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudbuild.projects.locations.triggers.get",
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
    "projectId": {
      "location": "query",
    },
    "triggerId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "cloudbuild.projects.locations.triggers.create",
  "path": "v1/{+parent}/triggers",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "cloudbuild.projects.locations.triggers.patch",
  "path": "v1/{+resourceName}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "resourceName",
  ],
  "parameters": {
    "projectId": {
      "location": "query",
    },
    "resourceName": {
      "location": "path",
      "required": true,
    },
    "triggerId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "cloudbuild.projects.locations.triggers.delete",
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
    "projectId": {
      "location": "query",
    },
    "triggerId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudbuild.projects.locations.triggers.list",
  "path": "v1/{+parent}/triggers",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
    "projectId": {
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
  approvalConfig: z.object({
    approvalRequired: z.boolean().describe(
      "Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start.",
    ).optional(),
  }).describe(
    "ApprovalConfig describes configuration for manual approval of a build.",
  ).optional(),
  autodetect: z.boolean().describe(
    "Autodetect build configuration. The following precedence is used (case insensitive): 1. cloudbuild.yaml 2. cloudbuild.yml 3. cloudbuild.json 4. Dockerfile Currently only available for GitHub App Triggers.",
  ).optional(),
  bitbucketServerTriggerConfig: z.object({
    bitbucketServerConfig: z.object({
      apiKey: z.string().describe(
        "Required. Immutable. API Key that will be attached to webhook. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig.",
      ).optional(),
      connectedRepositories: z.array(z.object({
        projectKey: z.string().describe(
          "Required. Identifier for the project storing the repository.",
        ).optional(),
        repoSlug: z.string().describe(
          "Required. Identifier for the repository.",
        ).optional(),
        webhookId: z.number().int().describe(
          "Output only. The ID of the webhook that was created for receiving events from this repo. We only create and manage a single webhook for each repo.",
        ).optional(),
      })).describe(
        "Output only. Connected Bitbucket Server repositories for this config.",
      ).optional(),
      createTime: z.string().describe("Time when the config was created.")
        .optional(),
      hostUri: z.string().describe(
        "Required. Immutable. The URI of the Bitbucket Server host. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig.",
      ).optional(),
      name: z.string().describe("The resource name for the config.").optional(),
      peeredNetwork: z.string().describe(
        "Optional. The network to be used when reaching out to the Bitbucket Server instance. The VPC network must be enabled for private service connection. This should be set if the Bitbucket Server instance is hosted on-premises and not reachable by public internet. If this field is left empty, no network peering will occur and calls to the Bitbucket Server instance will be made over the public internet. Must be in the format `projects/{project}/global/networks/{network}`, where {project} is a project number or id and {network} is the name of a VPC network in the project.",
      ).optional(),
      peeredNetworkIpRange: z.string().describe(
        "Immutable. IP range within the peered network. This is specified in CIDR notation with a slash and the subnet prefix size. You can optionally specify an IP address before the subnet prefix value. e.g. `192.168.0.0/29` would specify an IP range starting at 192.168.0.0 with a 29 bit prefix size. `/16` would specify a prefix size of 16 bits, with an automatically determined IP within the peered VPC. If unspecified, a value of `/24` will be used. The field only has an effect if peered_network is set.",
      ).optional(),
      secrets: z.object({
        adminAccessTokenVersionName: z.string().describe(
          "Required. The resource name for the admin access token's secret version.",
        ).optional(),
        readAccessTokenVersionName: z.string().describe(
          "Required. The resource name for the read access token's secret version.",
        ).optional(),
        webhookSecretVersionName: z.string().describe(
          "Required. Immutable. The resource name for the webhook secret's secret version. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig.",
        ).optional(),
      }).describe(
        "BitbucketServerSecrets represents the secrets in Secret Manager for a Bitbucket Server.",
      ).optional(),
      sslCa: z.string().describe(
        "Optional. SSL certificate to use for requests to Bitbucket Server. The format should be PEM format but the extension can be one of.pem,.cer, or.crt.",
      ).optional(),
      username: z.string().describe(
        "Username of the account Cloud Build will use on Bitbucket Server.",
      ).optional(),
      webhookKey: z.string().describe(
        "Output only. UUID included in webhook requests. The UUID is used to look up the corresponding config.",
      ).optional(),
    }).describe(
      "BitbucketServerConfig represents the configuration for a Bitbucket Server.",
    ).optional(),
    bitbucketServerConfigResource: z.string().describe(
      "Required. The Bitbucket server config resource that this trigger config maps to.",
    ).optional(),
    projectKey: z.string().describe(
      'Required. Key of the project that the repo is in. For example: The key for https://mybitbucket.server/projects/TEST/repos/test-repo is "TEST".',
    ).optional(),
    pullRequest: z.object({
      branch: z.string().describe(
        "Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      commentControl: z.enum([
        "COMMENTS_DISABLED",
        "COMMENTS_ENABLED",
        "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY",
      ]).describe(
        "If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run.",
      ).optional(),
      invertRegex: z.boolean().describe(
        "If true, branches that do NOT match the git_ref will trigger a build.",
      ).optional(),
    }).describe(
      "PullRequestFilter contains filter properties for matching GitHub Pull Requests.",
    ).optional(),
    push: z.object({
      branch: z.string().describe(
        "Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      invertRegex: z.boolean().describe(
        "When true, only trigger a build if the revision regex does NOT match the git_ref regex.",
      ).optional(),
      tag: z.string().describe(
        "Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
    }).describe(
      "Push contains filter properties for matching GitHub git pushes.",
    ).optional(),
    repoSlug: z.string().describe(
      "Required. Slug of the repository. A repository slug is a URL-friendly version of a repository name, automatically generated by Bitbucket for use in the URL. For example, if the repository name is 'test repo', in the URL it would become 'test-repo' as in https://mybitbucket.server/projects/TEST/repos/test-repo.",
    ).optional(),
  }).describe(
    "BitbucketServerTriggerConfig describes the configuration of a trigger that creates a build whenever a Bitbucket Server event is received.",
  ).optional(),
  build: z.object({
    approval: z.object({
      config: z.object({
        approvalRequired: z.boolean().describe(
          "Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start.",
        ).optional(),
      }).describe(
        "ApprovalConfig describes configuration for manual approval of a build.",
      ).optional(),
      result: z.object({
        approvalTime: z.string().describe(
          "Output only. The time when the approval decision was made.",
        ).optional(),
        approverAccount: z.string().describe(
          "Output only. Email of the user that called the ApproveBuild API to approve or reject a build at the time that the API was called.",
        ).optional(),
        comment: z.string().describe(
          "Optional. An optional comment for this manual approval result.",
        ).optional(),
        decision: z.enum(["DECISION_UNSPECIFIED", "APPROVED", "REJECTED"])
          .describe("Required. The decision of this manual approval.")
          .optional(),
        url: z.string().describe(
          "Optional. An optional URL tied to this manual approval result. This field is essentially the same as comment, except that it will be rendered by the UI differently. An example use case is a link to an external job that approved this Build.",
        ).optional(),
      }).describe(
        "ApprovalResult describes the decision and associated metadata of a manual approval of a build.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PENDING",
        "APPROVED",
        "REJECTED",
        "CANCELLED",
      ]).describe("Output only. The state of this build's approval.")
        .optional(),
    }).describe(
      "BuildApproval describes a build's approval configuration, state, and result.",
    ).optional(),
    artifacts: z.object({
      genericArtifacts: z.array(z.object({
        folder: z.string().describe(
          "Required. Path to the generic artifact in the build's workspace to be uploaded to Artifact Registry.",
        ).optional(),
        registryPath: z.string().describe(
          "Required. Registry path to upload the generic artifact to, in the form projects/$PROJECT/locations/$LOCATION/repositories/$REPO/packages/$PACKAGE/versions/$VERSION",
        ).optional(),
      })).describe(
        "Optional. A list of generic artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. If any artifacts fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      goModules: z.array(z.object({
        modulePath: z.string().describe(
          'Optional. The Go module\'s "module path". e.g. example.com/foo/v2',
        ).optional(),
        moduleVersion: z.string().describe(
          "Optional. The Go module's semantic version in the form vX.Y.Z. e.g. v0.1.1 Pre-release identifiers can also be added by appending a dash and dot separated ASCII alphanumeric characters and hyphens. e.g. v0.2.3-alpha.x.12m.5",
        ).optional(),
        repositoryLocation: z.string().describe(
          "Optional. Location of the Artifact Registry repository. i.e. us-east1 Defaults to the build’s location.",
        ).optional(),
        repositoryName: z.string().describe(
          "Optional. Artifact Registry repository name. Specified Go modules will be zipped and uploaded to Artifact Registry with this location as a prefix. e.g. my-go-repo",
        ).optional(),
        repositoryProjectId: z.string().describe(
          "Optional. Project ID of the Artifact Registry repository. Defaults to the build project.",
        ).optional(),
        sourcePath: z.string().describe(
          "Optional. Source path of the go.mod file in the build's workspace. If not specified, this will default to the current directory. e.g. ~/code/go/mypackage",
        ).optional(),
      })).describe(
        "Optional. A list of Go modules to be uploaded to Artifact Registry upon successful completion of all build steps. If any objects fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      images: z.array(z.string()).describe(
        "A list of images to be pushed upon the successful completion of all build steps. The images will be pushed using the builder service account's credentials. The digests of the pushed images will be stored in the Build resource's results field. If any of the images fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      mavenArtifacts: z.array(z.object({
        artifactId: z.string().describe(
          "Maven `artifactId` value used when uploading the artifact to Artifact Registry.",
        ).optional(),
        deployFolder: z.string().describe(
          "Optional. Path to a folder containing the files to upload to Artifact Registry. This can be either an absolute path, e.g. `/workspace/my-app/target/`, or a relative path from /workspace, e.g. `my-app/target/`. This field is mutually exclusive with the `path` field.",
        ).optional(),
        groupId: z.string().describe(
          "Maven `groupId` value used when uploading the artifact to Artifact Registry.",
        ).optional(),
        path: z.string().describe(
          "Optional. Path to an artifact in the build's workspace to be uploaded to Artifact Registry. This can be either an absolute path, e.g. /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar.",
        ).optional(),
        repository: z.string().describe(
          'Artifact Registry repository, in the form "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the workspace specified by path will be uploaded to Artifact Registry with this location as a prefix.',
        ).optional(),
        version: z.string().describe(
          "Maven `version` value used when uploading the artifact to Artifact Registry.",
        ).optional(),
      })).describe(
        "A list of Maven artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. Artifacts in the workspace matching specified paths globs will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any artifacts fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      npmPackages: z.array(z.object({
        packagePath: z.string().describe(
          "Optional. Path to the package.json. e.g. workspace/path/to/package Only one of `archive` or `package_path` can be specified.",
        ).optional(),
        repository: z.string().describe(
          'Artifact Registry repository, in the form "https://$REGION-npm.pkg.dev/$PROJECT/$REPOSITORY" Npm package in the workspace specified by path will be zipped and uploaded to Artifact Registry with this location as a prefix.',
        ).optional(),
      })).describe(
        "A list of npm packages to be uploaded to Artifact Registry upon successful completion of all build steps. Npm packages in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any packages fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      objects: z.object({
        location: z.string().describe(
          'Cloud Storage bucket and optional object path, in the form "gs://bucket/path/to/somewhere/". (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix.',
        ).optional(),
        paths: z.array(z.string()).describe(
          "Path globs used to match files in the build's workspace.",
        ).optional(),
        timing: z.object({
          endTime: z.string().describe("End of time span.").optional(),
          startTime: z.string().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
      }).describe(
        "Files in the workspace to upload to Cloud Storage upon successful completion of all build steps.",
      ).optional(),
      oci: z.array(z.object({
        file: z.string().describe(
          "Required. Path on the local file system where to find the container to upload. e.g. /workspace/my-image.tar",
        ).optional(),
        registryPath: z.string().describe(
          "Required. Registry path to upload the container to. e.g. us-east1-docker.pkg.dev/my-project/my-repo/my-image",
        ).optional(),
        tags: z.array(z.unknown()).describe(
          "Optional. Tags to apply to the uploaded image. e.g. latest, 1.0.0",
        ).optional(),
      })).describe(
        "Optional. A list of OCI images to be uploaded to Artifact Registry upon successful completion of all build steps. OCI images in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any images fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      pythonPackages: z.array(z.object({
        paths: z.array(z.unknown()).describe(
          "Path globs used to match files in the build's workspace. For Python/ Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file.",
        ).optional(),
        repository: z.string().describe(
          'Artifact Registry repository, in the form "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the workspace matching any path pattern will be uploaded to Artifact Registry with this location as a prefix.',
        ).optional(),
      })).describe(
        "A list of Python packages to be uploaded to Artifact Registry upon successful completion of all build steps. The build service account credentials will be used to perform the upload. If any objects fail to be pushed, the build is marked FAILURE.",
      ).optional(),
    }).describe(
      "Artifacts produced by a build that should be uploaded upon successful completion of all build steps.",
    ).optional(),
    availableSecrets: z.object({
      inline: z.array(z.object({
        envMap: z.record(z.string(), z.unknown()).describe(
          "Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets.",
        ).optional(),
        kmsKeyName: z.string().describe(
          "Resource name of Cloud KMS crypto key to decrypt the encrypted value. In format: projects/*/locations/*/keyRings/*/cryptoKeys/*",
        ).optional(),
      })).describe(
        "Secrets encrypted with KMS key and the associated secret environment variable.",
      ).optional(),
      secretManager: z.array(z.object({
        env: z.string().describe(
          "Environment variable name to associate with the secret. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step.",
        ).optional(),
        versionName: z.string().describe(
          "Resource name of the SecretVersion. In format: projects/*/secrets/*/versions/*",
        ).optional(),
      })).describe(
        "Secrets in Secret Manager and associated secret environment variable.",
      ).optional(),
    }).describe("Secrets and secret environment variables.").optional(),
    buildTriggerId: z.string().describe(
      "Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Time at which the request to create the build was received.",
    ).optional(),
    dependencies: z.array(z.object({
      empty: z.boolean().describe(
        "If set to true disable all dependency fetching (ignoring the default source as well).",
      ).optional(),
      genericArtifact: z.object({
        destPath: z.string().describe(
          "Required. Where the artifact files should be placed on the worker.",
        ).optional(),
        resource: z.string().describe(
          "Required. The location to download the artifact files from. Ex: projects/p1/locations/us/repositories/r1/packages/p1/versions/v1",
        ).optional(),
      }).describe("Represents a generic artifact as a build dependency.")
        .optional(),
      gitSource: z.object({
        depth: z.string().describe(
          "Optional. How much history should be fetched for the build (default 1, -1 for all history).",
        ).optional(),
        destPath: z.string().describe(
          "Required. Where should the files be placed on the worker.",
        ).optional(),
        recurseSubmodules: z.boolean().describe(
          "Optional. True if submodules should be fetched too (default false).",
        ).optional(),
        repository: z.object({
          developerConnect: z.unknown().describe(
            "The Developer Connect Git repository link formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*`",
          ).optional(),
          url: z.unknown().describe("Location of the Git repository.")
            .optional(),
        }).describe("A repository for a git source.").optional(),
        revision: z.string().describe(
          "Required. The revision that we will fetch the repo at.",
        ).optional(),
      }).describe("Represents a git repository as a build dependency.")
        .optional(),
    })).describe(
      "Optional. Dependencies that the Cloud Build worker will fetch before executing user steps.",
    ).optional(),
    failureInfo: z.object({
      detail: z.string().describe(
        "Explains the failure issue in more detail using hard-coded text.",
      ).optional(),
      type: z.enum([
        "FAILURE_TYPE_UNSPECIFIED",
        "PUSH_FAILED",
        "PUSH_IMAGE_NOT_FOUND",
        "PUSH_NOT_AUTHORIZED",
        "LOGGING_FAILURE",
        "USER_BUILD_STEP",
        "FETCH_SOURCE_FAILED",
      ]).describe("The name of the failure.").optional(),
    }).describe(
      "A fatal problem encountered during the execution of the build.",
    ).optional(),
    finishTime: z.string().describe(
      "Output only. Time at which execution of the build was finished. The difference between finish_time and start_time is the duration of the build's execution.",
    ).optional(),
    gitConfig: z.object({
      http: z.object({
        proxySecretVersionName: z.string().describe(
          "SecretVersion resource of the HTTP proxy URL. The Service Account used in the build (either the default Service Account or user-specified Service Account) should have `secretmanager.versions.access` permissions on this secret. The proxy URL should be in format `protocol://@]proxyhost[:port]`.",
        ).optional(),
      }).describe(
        "HttpConfig is a configuration for HTTP related git operations.",
      ).optional(),
    }).describe("GitConfig is a configuration for git operations.").optional(),
    id: z.string().describe("Output only. Unique identifier of the build.")
      .optional(),
    images: z.array(z.string()).describe(
      "A list of images to be pushed upon the successful completion of all build steps. The images are pushed using the builder service account's credentials. The digests of the pushed images will be stored in the `Build` resource's results field. If any of the images fail to be pushed, the build status is marked `FAILURE`.",
    ).optional(),
    logUrl: z.string().describe(
      "Output only. URL to logs for this build in Google Cloud Console.",
    ).optional(),
    logsBucket: z.string().describe(
      "Cloud Storage bucket where logs should be written (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`.",
    ).optional(),
    name: z.string().describe(
      "Output only. The 'Build' name with format: `projects/{project}/locations/{location}/builds/{build}`, where {build} is a unique identifier generated by the service.",
    ).optional(),
    options: z.object({
      automapSubstitutions: z.boolean().describe(
        "Option to include built-in and custom substitutions as env variables for all build steps.",
      ).optional(),
      defaultLogsBucketBehavior: z.enum([
        "DEFAULT_LOGS_BUCKET_BEHAVIOR_UNSPECIFIED",
        "REGIONAL_USER_OWNED_BUCKET",
        "LEGACY_BUCKET",
      ]).describe(
        "Optional. Option to specify how default logs buckets are setup.",
      ).optional(),
      diskSizeGb: z.string().describe(
        'Requested disk size for the VM that runs the build. Note that this is *NOT* "disk free"; some of the space will be used by the operating system and build utilities. Also note that this is the minimum disk size that will be allocated for the build -- the build may run with a larger disk than requested. At present, the maximum disk size is 4000GB; builds that request more than the maximum are rejected with an error.',
      ).optional(),
      dynamicSubstitutions: z.boolean().describe(
        "Option to specify whether or not to apply bash style string operations to the substitutions. NOTE: this is always enabled for triggered builds and cannot be overridden in the build configuration file.",
      ).optional(),
      enableStructuredLogging: z.boolean().describe(
        "Optional. Option to specify whether structured logging is enabled. If true, JSON-formatted logs are parsed as structured logs.",
      ).optional(),
      env: z.array(z.string()).describe(
        'A list of global environment variable definitions that will exist for all build steps in this build. If a variable is defined in both globally and in a build step, the variable will use the build step value. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE".',
      ).optional(),
      logStreamingOption: z.enum(["STREAM_DEFAULT", "STREAM_ON", "STREAM_OFF"])
        .describe(
          "Option to define build log streaming behavior to Cloud Storage.",
        ).optional(),
      logging: z.enum([
        "LOGGING_UNSPECIFIED",
        "LEGACY",
        "GCS_ONLY",
        "STACKDRIVER_ONLY",
        "CLOUD_LOGGING_ONLY",
        "NONE",
      ]).describe(
        "Option to specify the logging mode, which determines if and where build logs are stored.",
      ).optional(),
      machineType: z.enum([
        "UNSPECIFIED",
        "N1_HIGHCPU_8",
        "N1_HIGHCPU_32",
        "E2_HIGHCPU_8",
        "E2_HIGHCPU_32",
        "E2_MEDIUM",
      ]).describe("Compute Engine machine type on which to run the build.")
        .optional(),
      pool: z.object({
        name: z.string().describe(
          "The `WorkerPool` resource to execute the build on. You must have `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format projects/{project}/locations/{location}/workerPools/{workerPoolId}",
        ).optional(),
      }).describe(
        "Details about how a build should be executed on a `WorkerPool`. See [running builds in a private pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information.",
      ).optional(),
      pubsubTopic: z.string().describe(
        "Optional. Option to specify the Pub/Sub topic to receive build status updates.",
      ).optional(),
      requestedVerifyOption: z.enum(["NOT_VERIFIED", "VERIFIED"]).describe(
        "Requested verifiability options.",
      ).optional(),
      secretEnv: z.array(z.string()).describe(
        "A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. These variables will be available to all build steps in this build.",
      ).optional(),
      sourceProvenanceHash: z.array(
        z.enum([
          "NONE",
          "SHA256",
          "MD5",
          "GO_MODULE_H1",
          "SHA512",
          "DIRSUM_SHA256",
        ]),
      ).describe("Requested hash for SourceProvenance.").optional(),
      substitutionOption: z.enum(["MUST_MATCH", "ALLOW_LOOSE"]).describe(
        "Option to specify behavior when there is an error in the substitution checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file.",
      ).optional(),
      volumes: z.array(z.object({
        name: z.string().describe(
          "Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps.",
        ).optional(),
        path: z.string().describe(
          "Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths.",
        ).optional(),
      })).describe(
        "Global list of volumes to mount for ALL build steps Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step. Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration.",
      ).optional(),
      workerPool: z.string().describe(
        "This field deprecated; please use `pool.name` instead.",
      ).optional(),
    }).describe("Optional arguments to enable specific features of builds.")
      .optional(),
    projectId: z.string().describe("Output only. ID of the project.")
      .optional(),
    queueTtl: z.string().describe(
      "TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`. The TTL starts ticking from create_time.",
    ).optional(),
    results: z.object({
      artifactManifest: z.string().describe(
        "Path to the artifact manifest for non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage.",
      ).optional(),
      artifactTiming: z.object({
        endTime: z.string().describe("End of time span.").optional(),
        startTime: z.string().describe("Start of time span.").optional(),
      }).describe("Start and end times for a build execution phase.")
        .optional(),
      buildStepImages: z.array(z.string()).describe(
        "List of build step digests, in the order corresponding to build step indices.",
      ).optional(),
      buildStepOutputs: z.array(z.string()).describe(
        "List of build step outputs, produced by builder images, in the order corresponding to build step indices. [Cloud Builders](https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 50KB of data is stored. Note that the `$BUILDER_OUTPUT` variable is read-only and can't be substituted.",
      ).optional(),
      buildStepResults: z.record(
        z.string(),
        z.object({
          results: z.record(z.string(), z.unknown()).describe(
            "Results for a build step.",
          ).optional(),
        }),
      ).describe("Results for build steps. step_id ->").optional(),
      genericArtifacts: z.array(z.object({
        artifactFingerprint: z.object({
          fileHash: z.unknown().describe("Collection of file hashes.")
            .optional(),
        }).describe(
          "Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.",
        ).optional(),
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        fileHashes: z.record(z.string(), z.unknown()).describe(
          "Output only. The file hashes that make up the generic artifact.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
        uri: z.string().describe(
          "Output only. URI of the uploaded artifact. Ex: projects/p1/locations/us/repositories/r1/packages/p1/versions/v1",
        ).optional(),
      })).describe(
        "Output only. Generic artifacts uploaded to Artifact Registry at the end of the build.",
      ).optional(),
      goModules: z.array(z.object({
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        fileHashes: z.object({
          fileHash: z.unknown().describe("Collection of file hashes.")
            .optional(),
        }).describe(
          "Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
        uri: z.string().describe("URI of the uploaded artifact.").optional(),
      })).describe(
        "Optional. Go module artifacts uploaded to Artifact Registry at the end of the build.",
      ).optional(),
      images: z.array(z.object({
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        digest: z.string().describe("Docker Registry 2.0 digest.").optional(),
        name: z.string().describe(
          "Name used to push the container image to Google Container Registry, as presented to `docker push`.",
        ).optional(),
        ociMediaType: z.enum([
          "OCI_MEDIA_TYPE_UNSPECIFIED",
          "IMAGE_MANIFEST",
          "IMAGE_INDEX",
        ]).describe(
          "Output only. The OCI media type of the artifact. Non-OCI images, such as Docker images, will have an unspecified value.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
      })).describe("Container images that were built as a part of the build.")
        .optional(),
      mavenArtifacts: z.array(z.object({
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        fileHashes: z.object({
          fileHash: z.unknown().describe("Collection of file hashes.")
            .optional(),
        }).describe(
          "Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
        uri: z.string().describe("URI of the uploaded artifact.").optional(),
      })).describe(
        "Maven artifacts uploaded to Artifact Registry at the end of the build.",
      ).optional(),
      npmPackages: z.array(z.object({
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        fileHashes: z.object({
          fileHash: z.unknown().describe("Collection of file hashes.")
            .optional(),
        }).describe(
          "Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
        uri: z.string().describe("URI of the uploaded npm package.").optional(),
      })).describe(
        "Npm packages uploaded to Artifact Registry at the end of the build.",
      ).optional(),
      numArtifacts: z.string().describe(
        "Number of non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage.",
      ).optional(),
      pythonPackages: z.array(z.object({
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        fileHashes: z.object({
          fileHash: z.unknown().describe("Collection of file hashes.")
            .optional(),
        }).describe(
          "Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
        uri: z.string().describe("URI of the uploaded artifact.").optional(),
      })).describe(
        "Python artifacts uploaded to Artifact Registry at the end of the build.",
      ).optional(),
    }).describe("Artifacts created by the build pipeline.").optional(),
    secrets: z.array(z.object({
      kmsKeyName: z.string().describe(
        "Cloud KMS key name to use to decrypt these envs.",
      ).optional(),
      secretEnv: z.record(z.string(), z.string()).describe(
        "Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets.",
      ).optional(),
    })).describe(
      "Secrets to decrypt using Cloud Key Management Service. Note: Secret Manager is the recommended technique for managing sensitive data with Cloud Build. Use `available_secrets` to configure builds to access secrets from Secret Manager. For instructions, see: https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets",
    ).optional(),
    serviceAccount: z.string().describe(
      "IAM service account whose credentials will be used at build runtime. Must be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT can be email address or uniqueId of the service account.",
    ).optional(),
    source: z.object({
      connectedRepository: z.object({
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build.",
        ).optional(),
        repository: z.string().describe(
          "Required. Name of the Google Cloud Build repository, formatted as `projects/*/locations/*/connections/*/repositories/*`.",
        ).optional(),
        revision: z.string().describe(
          "Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref.",
        ).optional(),
      }).describe(
        "Location of the source in a 2nd-gen Google Cloud Build repository resource.",
      ).optional(),
      developerConnectConfig: z.object({
        dir: z.string().describe(
          "Required. Directory, relative to the source root, in which to run the build.",
        ).optional(),
        gitRepositoryLink: z.string().describe(
          "Required. The Developer Connect Git repository link, formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*`.",
        ).optional(),
        revision: z.string().describe(
          "Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref.",
        ).optional(),
      }).describe(
        "This config defines the location of a source through Developer Connect.",
      ).optional(),
      gitSource: z.object({
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution.",
        ).optional(),
        revision: z.string().describe(
          "Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch.",
        ).optional(),
        url: z.string().describe(
          "Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote.",
        ).optional(),
      }).describe("Location of the source in any accessible Git repository.")
        .optional(),
      repoSource: z.object({
        branchName: z.string().describe(
          "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
        commitSha: z.string().describe("Explicit commit SHA to build.")
          .optional(),
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution.",
        ).optional(),
        invertRegex: z.boolean().describe(
          "Optional. Only trigger a build if the revision regex does NOT match the revision regex.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
        ).optional(),
        repoName: z.string().describe(
          "Required. Name of the Cloud Source Repository.",
        ).optional(),
        substitutions: z.record(z.string(), z.string()).describe(
          "Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger",
        ).optional(),
        tagName: z.string().describe(
          "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
      }).describe("Location of the source in a Google Cloud Source Repository.")
        .optional(),
      storageSource: z.object({
        bucket: z.string().describe(
          "Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build.",
        ).optional(),
        sourceFetcher: z.enum([
          "SOURCE_FETCHER_UNSPECIFIED",
          "GSUTIL",
          "GCS_FETCHER",
        ]).describe(
          "Optional. Option to specify the tool to fetch the source file for the build.",
        ).optional(),
      }).describe("Location of the source in an archive file in Cloud Storage.")
        .optional(),
      storageSourceManifest: z.object({
        bucket: z.string().describe(
          "Required. Cloud Storage bucket containing the source manifest (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Required. Cloud Storage object containing the source manifest. This object must be a JSON file.",
        ).optional(),
      }).describe(
        "Location of the source manifest in Cloud Storage. This feature is in Preview; see description [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).",
      ).optional(),
    }).describe("Location of the source in a supported storage service.")
      .optional(),
    sourceProvenance: z.object({
      fileHashes: z.record(
        z.string(),
        z.object({
          fileHash: z.array(z.unknown()).describe("Collection of file hashes.")
            .optional(),
        }),
      ).describe(
        "Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file.",
      ).optional(),
      resolvedConnectedRepository: z.object({
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build.",
        ).optional(),
        repository: z.string().describe(
          "Required. Name of the Google Cloud Build repository, formatted as `projects/*/locations/*/connections/*/repositories/*`.",
        ).optional(),
        revision: z.string().describe(
          "Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref.",
        ).optional(),
      }).describe(
        "Location of the source in a 2nd-gen Google Cloud Build repository resource.",
      ).optional(),
      resolvedGitSource: z.object({
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution.",
        ).optional(),
        revision: z.string().describe(
          "Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch.",
        ).optional(),
        url: z.string().describe(
          "Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote.",
        ).optional(),
      }).describe("Location of the source in any accessible Git repository.")
        .optional(),
      resolvedRepoSource: z.object({
        branchName: z.string().describe(
          "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
        commitSha: z.string().describe("Explicit commit SHA to build.")
          .optional(),
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution.",
        ).optional(),
        invertRegex: z.boolean().describe(
          "Optional. Only trigger a build if the revision regex does NOT match the revision regex.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
        ).optional(),
        repoName: z.string().describe(
          "Required. Name of the Cloud Source Repository.",
        ).optional(),
        substitutions: z.record(z.string(), z.string()).describe(
          "Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger",
        ).optional(),
        tagName: z.string().describe(
          "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
      }).describe("Location of the source in a Google Cloud Source Repository.")
        .optional(),
      resolvedStorageSource: z.object({
        bucket: z.string().describe(
          "Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build.",
        ).optional(),
        sourceFetcher: z.enum([
          "SOURCE_FETCHER_UNSPECIFIED",
          "GSUTIL",
          "GCS_FETCHER",
        ]).describe(
          "Optional. Option to specify the tool to fetch the source file for the build.",
        ).optional(),
      }).describe("Location of the source in an archive file in Cloud Storage.")
        .optional(),
      resolvedStorageSourceManifest: z.object({
        bucket: z.string().describe(
          "Required. Cloud Storage bucket containing the source manifest (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Required. Cloud Storage object containing the source manifest. This object must be a JSON file.",
        ).optional(),
      }).describe(
        "Location of the source manifest in Cloud Storage. This feature is in Preview; see description [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).",
      ).optional(),
    }).describe(
      "Provenance of the source. Ways to find the original source, or verify that some source was used for this build.",
    ).optional(),
    startTime: z.string().describe(
      "Output only. Time at which execution of the build was started.",
    ).optional(),
    status: z.enum([
      "STATUS_UNKNOWN",
      "PENDING",
      "QUEUED",
      "WORKING",
      "SUCCESS",
      "FAILURE",
      "INTERNAL_ERROR",
      "TIMEOUT",
      "CANCELLED",
      "EXPIRED",
    ]).describe("Output only. Status of the build.").optional(),
    statusDetail: z.string().describe(
      "Output only. Customer-readable message about the current status.",
    ).optional(),
    steps: z.array(z.object({
      allowExitCodes: z.array(z.number().int()).describe(
        "Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence.",
      ).optional(),
      allowFailure: z.boolean().describe(
        "Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field.",
      ).optional(),
      args: z.array(z.string()).describe(
        "A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments.",
      ).optional(),
      automapSubstitutions: z.boolean().describe(
        "Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption.",
      ).optional(),
      dir: z.string().describe(
        "Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution.",
      ).optional(),
      entrypoint: z.string().describe(
        "Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used.",
      ).optional(),
      env: z.array(z.string()).describe(
        'A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE".',
      ).optional(),
      exitCode: z.number().int().describe(
        "Output only. Return code from running the step.",
      ).optional(),
      id: z.string().describe(
        "Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency.",
      ).optional(),
      name: z.string().describe(
        "Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like \"ubuntu\", \"debian\", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step.",
      ).optional(),
      pullTiming: z.object({
        endTime: z.string().describe("End of time span.").optional(),
        startTime: z.string().describe("Start of time span.").optional(),
      }).describe("Start and end times for a build execution phase.")
        .optional(),
      results: z.array(z.object({
        attestationContent: z.unknown().describe(
          "Optional. The content of the attestation to be generated.",
        ).optional(),
        attestationType: z.unknown().describe(
          "Optional. The type of attestation to be generated.",
        ).optional(),
        name: z.unknown().describe("Required. The name of the result.")
          .optional(),
      })).describe("Declaration of results for this build step.").optional(),
      script: z.string().describe(
        "A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args.",
      ).optional(),
      secretEnv: z.array(z.string()).describe(
        "A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`.",
      ).optional(),
      status: z.enum([
        "STATUS_UNKNOWN",
        "PENDING",
        "QUEUED",
        "WORKING",
        "SUCCESS",
        "FAILURE",
        "INTERNAL_ERROR",
        "TIMEOUT",
        "CANCELLED",
        "EXPIRED",
      ]).describe(
        "Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses.",
      ).optional(),
      timeout: z.string().describe(
        "Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out.",
      ).optional(),
      timing: z.object({
        endTime: z.string().describe("End of time span.").optional(),
        startTime: z.string().describe("Start of time span.").optional(),
      }).describe("Start and end times for a build execution phase.")
        .optional(),
      volumes: z.array(z.object({
        name: z.unknown().describe(
          "Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps.",
        ).optional(),
        path: z.unknown().describe(
          "Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths.",
        ).optional(),
      })).describe(
        "List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration.",
      ).optional(),
      waitFor: z.array(z.string()).describe(
        "The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully.",
      ).optional(),
    })).describe("Required. The operations to be performed on the workspace.")
      .optional(),
    substitutions: z.record(z.string(), z.string()).describe(
      "Substitutions data for `Build` resource.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "Tags for annotation of a `Build`. These are not docker tags.",
    ).optional(),
    timeout: z.string().describe(
      "Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`. `timeout` starts ticking from `startTime`. Default time is 60 minutes.",
    ).optional(),
    timing: z.record(
      z.string(),
      z.object({
        endTime: z.string().describe("End of time span.").optional(),
        startTime: z.string().describe("Start of time span.").optional(),
      }),
    ).describe(
      "Output only. Stores timing information for phases of the build. Valid keys are: * BUILD: time to execute all build steps. * PUSH: time to push all artifacts including docker images and non docker artifacts. * FETCHSOURCE: time to fetch source. * SETUPBUILD: time to set up build. If the build does not specify source or images, these keys will not be included.",
    ).optional(),
    warnings: z.array(z.object({
      priority: z.enum(["PRIORITY_UNSPECIFIED", "INFO", "WARNING", "ALERT"])
        .describe("The priority for this warning.").optional(),
      text: z.string().describe("Explanation of the warning generated.")
        .optional(),
    })).describe(
      "Output only. Non-fatal problems encountered during the execution of the build.",
    ).optional(),
  }).describe(
    "A build resource in the Cloud Build API. At a high level, a `Build` describes where to find source code, how to build it (for example, the builder image to run on the source), and where to store the built artifacts. Fields can include the following variables, which will be expanded when the build is created: - $PROJECT_ID: the project ID of the build. - $PROJECT_NUMBER: the project number of the build. - $LOCATION: the location/region of the build. - $BUILD_ID: the autogenerated ID of the build. - $REPO_NAME: the source repository name specified by RepoSource. - $BRANCH_NAME: the branch name specified by RepoSource. - $TAG_NAME: the tag name specified by RepoSource. - $REVISION_ID or $COMMIT_SHA: the commit SHA specified by RepoSource or resolved from the specified branch or tag. - $SHORT_SHA: first 7 characters of $REVISION_ID or $COMMIT_SHA.",
  ).optional(),
  description: z.string().describe(
    "Human-readable description of this trigger.",
  ).optional(),
  developerConnectEventConfig: z.object({
    gitRepositoryLink: z.string().describe(
      "Required. The Developer Connect Git repository link, formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*`.",
    ).optional(),
    gitRepositoryLinkType: z.enum([
      "GIT_REPOSITORY_LINK_TYPE_UNSPECIFIED",
      "GITHUB",
      "GITHUB_ENTERPRISE",
      "GITLAB",
      "GITLAB_ENTERPRISE",
      "BITBUCKET_DATA_CENTER",
      "BITBUCKET_CLOUD",
    ]).describe("Output only. The type of DeveloperConnect GitRepositoryLink.")
      .optional(),
    pullRequest: z.object({
      branch: z.string().describe(
        "Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      commentControl: z.enum([
        "COMMENTS_DISABLED",
        "COMMENTS_ENABLED",
        "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY",
      ]).describe(
        "If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run.",
      ).optional(),
      invertRegex: z.boolean().describe(
        "If true, branches that do NOT match the git_ref will trigger a build.",
      ).optional(),
    }).describe(
      "PullRequestFilter contains filter properties for matching GitHub Pull Requests.",
    ).optional(),
    push: z.object({
      branch: z.string().describe(
        "Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      invertRegex: z.boolean().describe(
        "When true, only trigger a build if the revision regex does NOT match the git_ref regex.",
      ).optional(),
      tag: z.string().describe(
        "Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
    }).describe(
      "Push contains filter properties for matching GitHub git pushes.",
    ).optional(),
  }).describe(
    "The configuration of a trigger that creates a build whenever an event from the DeveloperConnect API is received.",
  ).optional(),
  disabled: z.boolean().describe(
    "If true, the trigger will never automatically execute a build.",
  ).optional(),
  eventType: z.enum([
    "EVENT_TYPE_UNSPECIFIED",
    "REPO",
    "WEBHOOK",
    "PUBSUB",
    "MANUAL",
  ]).describe(
    "EventType allows the user to explicitly set the type of event to which this BuildTrigger should respond. This field will be validated against the rest of the configuration if it is set.",
  ).optional(),
  filename: z.string().describe(
    "Path, from the source root, to the build configuration file (i.e. cloudbuild.yaml).",
  ).optional(),
  filter: z.string().describe("A Common Expression Language string.")
    .optional(),
  gitFileSource: z.object({
    bitbucketServerConfig: z.string().describe(
      "The full resource name of the bitbucket server config. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`.",
    ).optional(),
    githubEnterpriseConfig: z.string().describe(
      "The full resource name of the github enterprise config. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. `projects/{project}/githubEnterpriseConfigs/{id}`.",
    ).optional(),
    path: z.string().describe(
      "The path of the file, with the repo root as the root of the path.",
    ).optional(),
    repoType: z.enum([
      "UNKNOWN",
      "CLOUD_SOURCE_REPOSITORIES",
      "GITHUB",
      "BITBUCKET_SERVER",
      "GITLAB",
      "BITBUCKET_CLOUD",
    ]).describe("See RepoType above.").optional(),
    repository: z.string().describe(
      "The fully qualified resource name of the Repos API repository. Either URI or repository can be specified. If unspecified, the repo from which the trigger invocation originated is assumed to be the repo from which to read the specified path.",
    ).optional(),
    revision: z.string().describe(
      "The branch, tag, arbitrary ref, or SHA version of the repo to use when resolving the filename (optional). This field respects the same syntax/resolution as described here: https://git-scm.com/docs/gitrevisions If unspecified, the revision from which the trigger invocation originated is assumed to be the revision from which to read the specified path.",
    ).optional(),
    uri: z.string().describe(
      "The URI of the repo. Either uri or repository can be specified. If unspecified, the repo from which the trigger invocation originated is assumed to be the repo from which to read the specified path.",
    ).optional(),
  }).describe(
    "GitFileSource describes a file within a (possibly remote) code repository.",
  ).optional(),
  github: z.object({
    enterpriseConfigResourceName: z.string().describe(
      'The resource name of the github enterprise config that should be applied to this installation. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"',
    ).optional(),
    installationId: z.string().describe(
      "The installationID that emits the GitHub event.",
    ).optional(),
    name: z.string().describe(
      'Name of the repository. For example: The name for https://github.com/googlecloudplatform/cloud-builders is "cloud-builders".',
    ).optional(),
    owner: z.string().describe(
      'Owner of the repository. For example: The owner for https://github.com/googlecloudplatform/cloud-builders is "googlecloudplatform".',
    ).optional(),
    pullRequest: z.object({
      branch: z.string().describe(
        "Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      commentControl: z.enum([
        "COMMENTS_DISABLED",
        "COMMENTS_ENABLED",
        "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY",
      ]).describe(
        "If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run.",
      ).optional(),
      invertRegex: z.boolean().describe(
        "If true, branches that do NOT match the git_ref will trigger a build.",
      ).optional(),
    }).describe(
      "PullRequestFilter contains filter properties for matching GitHub Pull Requests.",
    ).optional(),
    push: z.object({
      branch: z.string().describe(
        "Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      invertRegex: z.boolean().describe(
        "When true, only trigger a build if the revision regex does NOT match the git_ref regex.",
      ).optional(),
      tag: z.string().describe(
        "Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
    }).describe(
      "Push contains filter properties for matching GitHub git pushes.",
    ).optional(),
  }).describe(
    "GitHubEventsConfig describes the configuration of a trigger that creates a build whenever a GitHub event is received.",
  ).optional(),
  gitlabEnterpriseEventsConfig: z.object({
    gitlabConfig: z.object({
      connectedRepositories: z.array(z.object({
        id: z.string().describe(
          'Required. Identifier for the repository. example: "namespace/project-slug", namespace is usually the username or group ID',
        ).optional(),
        webhookId: z.number().int().describe(
          "Output only. The ID of the webhook that was created for receiving events from this repo. We only create and manage a single webhook for each repo.",
        ).optional(),
      })).describe(
        "Connected GitLab.com or GitLabEnterprise repositories for this config.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. Time when the config was created.",
      ).optional(),
      enterpriseConfig: z.object({
        hostUri: z.string().describe(
          "Immutable. The URI of the GitlabEnterprise host.",
        ).optional(),
        serviceDirectoryConfig: z.object({
          service: z.string().describe(
            "The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
          ).optional(),
        }).describe(
          "ServiceDirectoryConfig represents Service Directory configuration for a SCM host connection.",
        ).optional(),
        sslCa: z.string().describe(
          "The SSL certificate to use in requests to GitLab Enterprise instances.",
        ).optional(),
      }).describe(
        "GitLabEnterpriseConfig represents the configuration for a GitLabEnterprise integration.",
      ).optional(),
      name: z.string().describe("The resource name for the config.").optional(),
      secrets: z.object({
        apiAccessTokenVersion: z.string().describe(
          "Required. The resource name for the api access token’s secret version",
        ).optional(),
        apiKeyVersion: z.string().describe(
          "Required. Immutable. API Key that will be attached to webhook requests from GitLab to Cloud Build.",
        ).optional(),
        readAccessTokenVersion: z.string().describe(
          "Required. The resource name for the read access token’s secret version",
        ).optional(),
        webhookSecretVersion: z.string().describe(
          "Required. Immutable. The resource name for the webhook secret’s secret version. Once this field has been set, it cannot be changed. If you need to change it, please create another GitLabConfig.",
        ).optional(),
      }).describe(
        "GitLabSecrets represents the secrets in Secret Manager for a GitLab integration.",
      ).optional(),
      username: z.string().describe(
        "Username of the GitLab.com or GitLab Enterprise account Cloud Build will use.",
      ).optional(),
      webhookKey: z.string().describe(
        "Output only. UUID included in webhook requests. The UUID is used to look up the corresponding config.",
      ).optional(),
    }).describe(
      "GitLabConfig represents the configuration for a GitLab integration.",
    ).optional(),
    gitlabConfigResource: z.string().describe(
      "The GitLab config resource that this trigger config maps to.",
    ).optional(),
    projectNamespace: z.string().describe("Namespace of the GitLab project.")
      .optional(),
    pullRequest: z.object({
      branch: z.string().describe(
        "Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      commentControl: z.enum([
        "COMMENTS_DISABLED",
        "COMMENTS_ENABLED",
        "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY",
      ]).describe(
        "If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run.",
      ).optional(),
      invertRegex: z.boolean().describe(
        "If true, branches that do NOT match the git_ref will trigger a build.",
      ).optional(),
    }).describe(
      "PullRequestFilter contains filter properties for matching GitHub Pull Requests.",
    ).optional(),
    push: z.object({
      branch: z.string().describe(
        "Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      invertRegex: z.boolean().describe(
        "When true, only trigger a build if the revision regex does NOT match the git_ref regex.",
      ).optional(),
      tag: z.string().describe(
        "Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
    }).describe(
      "Push contains filter properties for matching GitHub git pushes.",
    ).optional(),
  }).describe(
    "GitLabEventsConfig describes the configuration of a trigger that creates a build whenever a GitLab event is received.",
  ).optional(),
  ignoredFiles: z.array(z.string()).describe(
    'ignored_files and included_files are file glob matches using https://golang.org/pkg/path/filepath/#Match extended with support for "**". If ignored_files and changed files are both empty, then they are not used to determine whether or not to trigger a build. If ignored_files is not empty, then we ignore any files that match any of the ignored_file globs. If the change has no files that are outside of the ignored_files globs, then we do not trigger a build.',
  ).optional(),
  includeBuildLogs: z.enum([
    "INCLUDE_BUILD_LOGS_UNSPECIFIED",
    "INCLUDE_BUILD_LOGS_WITH_STATUS",
  ]).describe(
    "If set to INCLUDE_BUILD_LOGS_WITH_STATUS, log url will be shown on GitHub page when build status is final. Setting this field to INCLUDE_BUILD_LOGS_WITH_STATUS for non GitHub triggers results in INVALID_ARGUMENT error.",
  ).optional(),
  includedFiles: z.array(z.string()).describe(
    "If any of the files altered in the commit pass the ignored_files filter and included_files is empty, then as far as this filter is concerned, we should trigger the build. If any of the files altered in the commit pass the ignored_files filter and included_files is not empty, then we make sure that at least one of those files matches a included_files glob. If not, then we do not trigger a build.",
  ).optional(),
  name: z.string().describe(
    "User-assigned name of the trigger. Must be unique within the project. Trigger names must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character.",
  ).optional(),
  pubsubConfig: z.object({
    serviceAccountEmail: z.string().describe(
      "Service account that will make the push request.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "OK",
      "SUBSCRIPTION_DELETED",
      "TOPIC_DELETED",
      "SUBSCRIPTION_MISCONFIGURED",
    ]).describe(
      "Potential issues with the underlying Pub/Sub subscription configuration. Only populated on get requests.",
    ).optional(),
    subscription: z.string().describe(
      "Output only. Name of the subscription. Format is `projects/{project}/subscriptions/{subscription}`.",
    ).optional(),
    topic: z.string().describe(
      "Optional. The name of the topic from which this subscription is receiving messages. Format is `projects/{project}/topics/{topic}`.",
    ).optional(),
  }).describe(
    "PubsubConfig describes the configuration of a trigger that creates a build whenever a Pub/Sub message is published.",
  ).optional(),
  repositoryEventConfig: z.object({
    pullRequest: z.object({
      branch: z.string().describe(
        "Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      commentControl: z.enum([
        "COMMENTS_DISABLED",
        "COMMENTS_ENABLED",
        "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY",
      ]).describe(
        "If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run.",
      ).optional(),
      invertRegex: z.boolean().describe(
        "If true, branches that do NOT match the git_ref will trigger a build.",
      ).optional(),
    }).describe(
      "PullRequestFilter contains filter properties for matching GitHub Pull Requests.",
    ).optional(),
    push: z.object({
      branch: z.string().describe(
        "Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      invertRegex: z.boolean().describe(
        "When true, only trigger a build if the revision regex does NOT match the git_ref regex.",
      ).optional(),
      tag: z.string().describe(
        "Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
    }).describe(
      "Push contains filter properties for matching GitHub git pushes.",
    ).optional(),
    repository: z.string().describe(
      "The resource name of the Repo API resource.",
    ).optional(),
    repositoryType: z.enum([
      "REPOSITORY_TYPE_UNSPECIFIED",
      "GITHUB",
      "GITHUB_ENTERPRISE",
      "GITLAB_ENTERPRISE",
      "BITBUCKET_DATA_CENTER",
      "BITBUCKET_CLOUD",
    ]).describe(
      "Output only. The type of the SCM vendor the repository points to.",
    ).optional(),
  }).describe(
    "The configuration of a trigger that creates a build whenever an event from Repo API is received.",
  ).optional(),
  resourceName: z.string().describe(
    "The `Trigger` name with format: `projects/{project}/locations/{location}/triggers/{trigger}`, where {trigger} is a unique identifier generated by the service.",
  ).optional(),
  serviceAccount: z.string().describe(
    "The service account used for all user-controlled operations including UpdateBuildTrigger, RunBuildTrigger, CreateBuild, and CancelBuild. If no service account is set and the legacy Cloud Build service account ([PROJECT_NUM]@cloudbuild.gserviceaccount.com) is the default for the project then it will be used instead. Format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_ID_OR_EMAIL}`",
  ).optional(),
  sourceToBuild: z.object({
    bitbucketServerConfig: z.string().describe(
      "The full resource name of the bitbucket server config. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`.",
    ).optional(),
    githubEnterpriseConfig: z.string().describe(
      "The full resource name of the github enterprise config. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. `projects/{project}/githubEnterpriseConfigs/{id}`.",
    ).optional(),
    ref: z.string().describe(
      'The branch or tag to use. Must start with "refs/" (required).',
    ).optional(),
    repoType: z.enum([
      "UNKNOWN",
      "CLOUD_SOURCE_REPOSITORIES",
      "GITHUB",
      "BITBUCKET_SERVER",
      "GITLAB",
      "BITBUCKET_CLOUD",
    ]).describe("See RepoType below.").optional(),
    repository: z.string().describe(
      "The connected repository resource name, in the format `projects/*/locations/*/connections/*/repositories/*`. Either `uri` or `repository` can be specified and is required.",
    ).optional(),
    uri: z.string().describe(
      "The URI of the repo (e.g. https://github.com/user/repo.git). Either `uri` or `repository` can be specified and is required.",
    ).optional(),
  }).describe("GitRepoSource describes a repo and ref of a code repository.")
    .optional(),
  substitutions: z.record(z.string(), z.string()).describe(
    "Substitutions for Build resource. The keys must match the following regular expression: `^_[A-Z0-9_]+$`.",
  ).optional(),
  tags: z.array(z.string()).describe("Tags for annotation of a `BuildTrigger`")
    .optional(),
  triggerTemplate: z.object({
    branchName: z.string().describe(
      "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
    ).optional(),
    commitSha: z.string().describe("Explicit commit SHA to build.").optional(),
    dir: z.string().describe(
      "Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution.",
    ).optional(),
    invertRegex: z.boolean().describe(
      "Optional. Only trigger a build if the revision regex does NOT match the revision regex.",
    ).optional(),
    projectId: z.string().describe(
      "Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
    ).optional(),
    repoName: z.string().describe(
      "Required. Name of the Cloud Source Repository.",
    ).optional(),
    substitutions: z.record(z.string(), z.string()).describe(
      "Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger",
    ).optional(),
    tagName: z.string().describe(
      "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
    ).optional(),
  }).describe("Location of the source in a Google Cloud Source Repository.")
    .optional(),
  webhookConfig: z.object({
    secret: z.string().describe(
      "Required. Resource name for the secret required as a URL parameter.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "OK", "SECRET_DELETED"]).describe(
      "Potential issues with the underlying Pub/Sub subscription configuration. Only populated on get requests.",
    ).optional(),
  }).describe(
    "WebhookConfig describes the configuration of a trigger that creates a build whenever a webhook is sent to a trigger's webhook URL.",
  ).optional(),
  projectId: z.string().describe(
    "Required. ID of the project for which to configure automatic builds.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  approvalConfig: z.object({
    approvalRequired: z.boolean(),
  }).optional(),
  autodetect: z.boolean().optional(),
  bitbucketServerTriggerConfig: z.object({
    bitbucketServerConfig: z.object({
      apiKey: z.string(),
      connectedRepositories: z.array(z.object({
        projectKey: z.string(),
        repoSlug: z.string(),
        webhookId: z.number(),
      })),
      createTime: z.string(),
      hostUri: z.string(),
      name: z.string(),
      peeredNetwork: z.string(),
      peeredNetworkIpRange: z.string(),
      secrets: z.object({
        adminAccessTokenVersionName: z.string(),
        readAccessTokenVersionName: z.string(),
        webhookSecretVersionName: z.string(),
      }),
      sslCa: z.string(),
      username: z.string(),
      webhookKey: z.string(),
    }),
    bitbucketServerConfigResource: z.string(),
    projectKey: z.string(),
    pullRequest: z.object({
      branch: z.string(),
      commentControl: z.string(),
      invertRegex: z.boolean(),
    }),
    push: z.object({
      branch: z.string(),
      invertRegex: z.boolean(),
      tag: z.string(),
    }),
    repoSlug: z.string(),
  }).optional(),
  build: z.object({
    approval: z.object({
      config: z.object({
        approvalRequired: z.boolean(),
      }),
      result: z.object({
        approvalTime: z.string(),
        approverAccount: z.string(),
        comment: z.string(),
        decision: z.string(),
        url: z.string(),
      }),
      state: z.string(),
    }),
    artifacts: z.object({
      genericArtifacts: z.array(z.object({
        folder: z.string(),
        registryPath: z.string(),
      })),
      goModules: z.array(z.object({
        modulePath: z.string(),
        moduleVersion: z.string(),
        repositoryLocation: z.string(),
        repositoryName: z.string(),
        repositoryProjectId: z.string(),
        sourcePath: z.string(),
      })),
      images: z.array(z.string()),
      mavenArtifacts: z.array(z.object({
        artifactId: z.string(),
        deployFolder: z.string(),
        groupId: z.string(),
        path: z.string(),
        repository: z.string(),
        version: z.string(),
      })),
      npmPackages: z.array(z.object({
        packagePath: z.string(),
        repository: z.string(),
      })),
      objects: z.object({
        location: z.string(),
        paths: z.array(z.string()),
        timing: z.object({
          endTime: z.string(),
          startTime: z.string(),
        }),
      }),
      oci: z.array(z.object({
        file: z.string(),
        registryPath: z.string(),
        tags: z.array(z.unknown()),
      })),
      pythonPackages: z.array(z.object({
        paths: z.array(z.unknown()),
        repository: z.string(),
      })),
    }),
    availableSecrets: z.object({
      inline: z.array(z.object({
        envMap: z.record(z.string(), z.unknown()),
        kmsKeyName: z.string(),
      })),
      secretManager: z.array(z.object({
        env: z.string(),
        versionName: z.string(),
      })),
    }),
    buildTriggerId: z.string(),
    createTime: z.string(),
    dependencies: z.array(z.object({
      empty: z.boolean(),
      genericArtifact: z.object({
        destPath: z.string(),
        resource: z.string(),
      }),
      gitSource: z.object({
        depth: z.string(),
        destPath: z.string(),
        recurseSubmodules: z.boolean(),
        repository: z.object({
          developerConnect: z.unknown(),
          url: z.unknown(),
        }),
        revision: z.string(),
      }),
    })),
    failureInfo: z.object({
      detail: z.string(),
      type: z.string(),
    }),
    finishTime: z.string(),
    gitConfig: z.object({
      http: z.object({
        proxySecretVersionName: z.string(),
      }),
    }),
    id: z.string(),
    images: z.array(z.string()),
    logUrl: z.string(),
    logsBucket: z.string(),
    name: z.string(),
    options: z.object({
      automapSubstitutions: z.boolean(),
      defaultLogsBucketBehavior: z.string(),
      diskSizeGb: z.string(),
      dynamicSubstitutions: z.boolean(),
      enableStructuredLogging: z.boolean(),
      env: z.array(z.string()),
      logStreamingOption: z.string(),
      logging: z.string(),
      machineType: z.string(),
      pool: z.object({
        name: z.string(),
      }),
      pubsubTopic: z.string(),
      requestedVerifyOption: z.string(),
      secretEnv: z.array(z.string()),
      sourceProvenanceHash: z.array(z.string()),
      substitutionOption: z.string(),
      volumes: z.array(z.object({
        name: z.string(),
        path: z.string(),
      })),
      workerPool: z.string(),
    }),
    projectId: z.string(),
    queueTtl: z.string(),
    results: z.object({
      artifactManifest: z.string(),
      artifactTiming: z.object({
        endTime: z.string(),
        startTime: z.string(),
      }),
      buildStepImages: z.array(z.string()),
      buildStepOutputs: z.array(z.string()),
      buildStepResults: z.record(z.string(), z.unknown()),
      genericArtifacts: z.array(z.object({
        artifactFingerprint: z.object({
          fileHash: z.unknown(),
        }),
        artifactRegistryPackage: z.string(),
        fileHashes: z.record(z.string(), z.unknown()),
        pushTiming: z.object({
          endTime: z.unknown(),
          startTime: z.unknown(),
        }),
        uri: z.string(),
      })),
      goModules: z.array(z.object({
        artifactRegistryPackage: z.string(),
        fileHashes: z.object({
          fileHash: z.unknown(),
        }),
        pushTiming: z.object({
          endTime: z.unknown(),
          startTime: z.unknown(),
        }),
        uri: z.string(),
      })),
      images: z.array(z.object({
        artifactRegistryPackage: z.string(),
        digest: z.string(),
        name: z.string(),
        ociMediaType: z.string(),
        pushTiming: z.object({
          endTime: z.unknown(),
          startTime: z.unknown(),
        }),
      })),
      mavenArtifacts: z.array(z.object({
        artifactRegistryPackage: z.string(),
        fileHashes: z.object({
          fileHash: z.unknown(),
        }),
        pushTiming: z.object({
          endTime: z.unknown(),
          startTime: z.unknown(),
        }),
        uri: z.string(),
      })),
      npmPackages: z.array(z.object({
        artifactRegistryPackage: z.string(),
        fileHashes: z.object({
          fileHash: z.unknown(),
        }),
        pushTiming: z.object({
          endTime: z.unknown(),
          startTime: z.unknown(),
        }),
        uri: z.string(),
      })),
      numArtifacts: z.string(),
      pythonPackages: z.array(z.object({
        artifactRegistryPackage: z.string(),
        fileHashes: z.object({
          fileHash: z.unknown(),
        }),
        pushTiming: z.object({
          endTime: z.unknown(),
          startTime: z.unknown(),
        }),
        uri: z.string(),
      })),
    }),
    secrets: z.array(z.object({
      kmsKeyName: z.string(),
      secretEnv: z.record(z.string(), z.unknown()),
    })),
    serviceAccount: z.string(),
    source: z.object({
      connectedRepository: z.object({
        dir: z.string(),
        repository: z.string(),
        revision: z.string(),
      }),
      developerConnectConfig: z.object({
        dir: z.string(),
        gitRepositoryLink: z.string(),
        revision: z.string(),
      }),
      gitSource: z.object({
        dir: z.string(),
        revision: z.string(),
        url: z.string(),
      }),
      repoSource: z.object({
        branchName: z.string(),
        commitSha: z.string(),
        dir: z.string(),
        invertRegex: z.boolean(),
        projectId: z.string(),
        repoName: z.string(),
        substitutions: z.record(z.string(), z.unknown()),
        tagName: z.string(),
      }),
      storageSource: z.object({
        bucket: z.string(),
        generation: z.string(),
        object: z.string(),
        sourceFetcher: z.string(),
      }),
      storageSourceManifest: z.object({
        bucket: z.string(),
        generation: z.string(),
        object: z.string(),
      }),
    }),
    sourceProvenance: z.object({
      fileHashes: z.record(z.string(), z.unknown()),
      resolvedConnectedRepository: z.object({
        dir: z.string(),
        repository: z.string(),
        revision: z.string(),
      }),
      resolvedGitSource: z.object({
        dir: z.string(),
        revision: z.string(),
        url: z.string(),
      }),
      resolvedRepoSource: z.object({
        branchName: z.string(),
        commitSha: z.string(),
        dir: z.string(),
        invertRegex: z.boolean(),
        projectId: z.string(),
        repoName: z.string(),
        substitutions: z.record(z.string(), z.unknown()),
        tagName: z.string(),
      }),
      resolvedStorageSource: z.object({
        bucket: z.string(),
        generation: z.string(),
        object: z.string(),
        sourceFetcher: z.string(),
      }),
      resolvedStorageSourceManifest: z.object({
        bucket: z.string(),
        generation: z.string(),
        object: z.string(),
      }),
    }),
    startTime: z.string(),
    status: z.string(),
    statusDetail: z.string(),
    steps: z.array(z.object({
      allowExitCodes: z.array(z.number()),
      allowFailure: z.boolean(),
      args: z.array(z.string()),
      automapSubstitutions: z.boolean(),
      dir: z.string(),
      entrypoint: z.string(),
      env: z.array(z.string()),
      exitCode: z.number(),
      id: z.string(),
      name: z.string(),
      pullTiming: z.object({
        endTime: z.string(),
        startTime: z.string(),
      }),
      results: z.array(z.object({
        attestationContent: z.unknown(),
        attestationType: z.unknown(),
        name: z.unknown(),
      })),
      script: z.string(),
      secretEnv: z.array(z.string()),
      status: z.string(),
      timeout: z.string(),
      timing: z.object({
        endTime: z.string(),
        startTime: z.string(),
      }),
      volumes: z.array(z.object({
        name: z.unknown(),
        path: z.unknown(),
      })),
      waitFor: z.array(z.string()),
    })),
    substitutions: z.record(z.string(), z.unknown()),
    tags: z.array(z.string()),
    timeout: z.string(),
    timing: z.record(z.string(), z.unknown()),
    warnings: z.array(z.object({
      priority: z.string(),
      text: z.string(),
    })),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  developerConnectEventConfig: z.object({
    gitRepositoryLink: z.string(),
    gitRepositoryLinkType: z.string(),
    pullRequest: z.object({
      branch: z.string(),
      commentControl: z.string(),
      invertRegex: z.boolean(),
    }),
    push: z.object({
      branch: z.string(),
      invertRegex: z.boolean(),
      tag: z.string(),
    }),
  }).optional(),
  disabled: z.boolean().optional(),
  eventType: z.string().optional(),
  filename: z.string().optional(),
  filter: z.string().optional(),
  gitFileSource: z.object({
    bitbucketServerConfig: z.string(),
    githubEnterpriseConfig: z.string(),
    path: z.string(),
    repoType: z.string(),
    repository: z.string(),
    revision: z.string(),
    uri: z.string(),
  }).optional(),
  github: z.object({
    enterpriseConfigResourceName: z.string(),
    installationId: z.string(),
    name: z.string(),
    owner: z.string(),
    pullRequest: z.object({
      branch: z.string(),
      commentControl: z.string(),
      invertRegex: z.boolean(),
    }),
    push: z.object({
      branch: z.string(),
      invertRegex: z.boolean(),
      tag: z.string(),
    }),
  }).optional(),
  gitlabEnterpriseEventsConfig: z.object({
    gitlabConfig: z.object({
      connectedRepositories: z.array(z.object({
        id: z.string(),
        webhookId: z.number(),
      })),
      createTime: z.string(),
      enterpriseConfig: z.object({
        hostUri: z.string(),
        serviceDirectoryConfig: z.object({
          service: z.string(),
        }),
        sslCa: z.string(),
      }),
      name: z.string(),
      secrets: z.object({
        apiAccessTokenVersion: z.string(),
        apiKeyVersion: z.string(),
        readAccessTokenVersion: z.string(),
        webhookSecretVersion: z.string(),
      }),
      username: z.string(),
      webhookKey: z.string(),
    }),
    gitlabConfigResource: z.string(),
    projectNamespace: z.string(),
    pullRequest: z.object({
      branch: z.string(),
      commentControl: z.string(),
      invertRegex: z.boolean(),
    }),
    push: z.object({
      branch: z.string(),
      invertRegex: z.boolean(),
      tag: z.string(),
    }),
  }).optional(),
  id: z.string().optional(),
  ignoredFiles: z.array(z.string()).optional(),
  includeBuildLogs: z.string().optional(),
  includedFiles: z.array(z.string()).optional(),
  name: z.string(),
  pubsubConfig: z.object({
    serviceAccountEmail: z.string(),
    state: z.string(),
    subscription: z.string(),
    topic: z.string(),
  }).optional(),
  repositoryEventConfig: z.object({
    pullRequest: z.object({
      branch: z.string(),
      commentControl: z.string(),
      invertRegex: z.boolean(),
    }),
    push: z.object({
      branch: z.string(),
      invertRegex: z.boolean(),
      tag: z.string(),
    }),
    repository: z.string(),
    repositoryType: z.string(),
  }).optional(),
  resourceName: z.string().optional(),
  serviceAccount: z.string().optional(),
  sourceToBuild: z.object({
    bitbucketServerConfig: z.string(),
    githubEnterpriseConfig: z.string(),
    ref: z.string(),
    repoType: z.string(),
    repository: z.string(),
    uri: z.string(),
  }).optional(),
  substitutions: z.record(z.string(), z.unknown()).optional(),
  tags: z.array(z.string()).optional(),
  triggerTemplate: z.object({
    branchName: z.string(),
    commitSha: z.string(),
    dir: z.string(),
    invertRegex: z.boolean(),
    projectId: z.string(),
    repoName: z.string(),
    substitutions: z.record(z.string(), z.unknown()),
    tagName: z.string(),
  }).optional(),
  webhookConfig: z.object({
    secret: z.string(),
    state: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  approvalConfig: z.object({
    approvalRequired: z.boolean().describe(
      "Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start.",
    ).optional(),
  }).describe(
    "ApprovalConfig describes configuration for manual approval of a build.",
  ).optional(),
  autodetect: z.boolean().describe(
    "Autodetect build configuration. The following precedence is used (case insensitive): 1. cloudbuild.yaml 2. cloudbuild.yml 3. cloudbuild.json 4. Dockerfile Currently only available for GitHub App Triggers.",
  ).optional(),
  bitbucketServerTriggerConfig: z.object({
    bitbucketServerConfig: z.object({
      apiKey: z.string().describe(
        "Required. Immutable. API Key that will be attached to webhook. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig.",
      ).optional(),
      connectedRepositories: z.array(z.object({
        projectKey: z.string().describe(
          "Required. Identifier for the project storing the repository.",
        ).optional(),
        repoSlug: z.string().describe(
          "Required. Identifier for the repository.",
        ).optional(),
        webhookId: z.number().int().describe(
          "Output only. The ID of the webhook that was created for receiving events from this repo. We only create and manage a single webhook for each repo.",
        ).optional(),
      })).describe(
        "Output only. Connected Bitbucket Server repositories for this config.",
      ).optional(),
      createTime: z.string().describe("Time when the config was created.")
        .optional(),
      hostUri: z.string().describe(
        "Required. Immutable. The URI of the Bitbucket Server host. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig.",
      ).optional(),
      name: z.string().describe("The resource name for the config.").optional(),
      peeredNetwork: z.string().describe(
        "Optional. The network to be used when reaching out to the Bitbucket Server instance. The VPC network must be enabled for private service connection. This should be set if the Bitbucket Server instance is hosted on-premises and not reachable by public internet. If this field is left empty, no network peering will occur and calls to the Bitbucket Server instance will be made over the public internet. Must be in the format `projects/{project}/global/networks/{network}`, where {project} is a project number or id and {network} is the name of a VPC network in the project.",
      ).optional(),
      peeredNetworkIpRange: z.string().describe(
        "Immutable. IP range within the peered network. This is specified in CIDR notation with a slash and the subnet prefix size. You can optionally specify an IP address before the subnet prefix value. e.g. `192.168.0.0/29` would specify an IP range starting at 192.168.0.0 with a 29 bit prefix size. `/16` would specify a prefix size of 16 bits, with an automatically determined IP within the peered VPC. If unspecified, a value of `/24` will be used. The field only has an effect if peered_network is set.",
      ).optional(),
      secrets: z.object({
        adminAccessTokenVersionName: z.string().describe(
          "Required. The resource name for the admin access token's secret version.",
        ).optional(),
        readAccessTokenVersionName: z.string().describe(
          "Required. The resource name for the read access token's secret version.",
        ).optional(),
        webhookSecretVersionName: z.string().describe(
          "Required. Immutable. The resource name for the webhook secret's secret version. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig.",
        ).optional(),
      }).describe(
        "BitbucketServerSecrets represents the secrets in Secret Manager for a Bitbucket Server.",
      ).optional(),
      sslCa: z.string().describe(
        "Optional. SSL certificate to use for requests to Bitbucket Server. The format should be PEM format but the extension can be one of.pem,.cer, or.crt.",
      ).optional(),
      username: z.string().describe(
        "Username of the account Cloud Build will use on Bitbucket Server.",
      ).optional(),
      webhookKey: z.string().describe(
        "Output only. UUID included in webhook requests. The UUID is used to look up the corresponding config.",
      ).optional(),
    }).describe(
      "BitbucketServerConfig represents the configuration for a Bitbucket Server.",
    ).optional(),
    bitbucketServerConfigResource: z.string().describe(
      "Required. The Bitbucket server config resource that this trigger config maps to.",
    ).optional(),
    projectKey: z.string().describe(
      'Required. Key of the project that the repo is in. For example: The key for https://mybitbucket.server/projects/TEST/repos/test-repo is "TEST".',
    ).optional(),
    pullRequest: z.object({
      branch: z.string().describe(
        "Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      commentControl: z.enum([
        "COMMENTS_DISABLED",
        "COMMENTS_ENABLED",
        "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY",
      ]).describe(
        "If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run.",
      ).optional(),
      invertRegex: z.boolean().describe(
        "If true, branches that do NOT match the git_ref will trigger a build.",
      ).optional(),
    }).describe(
      "PullRequestFilter contains filter properties for matching GitHub Pull Requests.",
    ).optional(),
    push: z.object({
      branch: z.string().describe(
        "Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      invertRegex: z.boolean().describe(
        "When true, only trigger a build if the revision regex does NOT match the git_ref regex.",
      ).optional(),
      tag: z.string().describe(
        "Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
    }).describe(
      "Push contains filter properties for matching GitHub git pushes.",
    ).optional(),
    repoSlug: z.string().describe(
      "Required. Slug of the repository. A repository slug is a URL-friendly version of a repository name, automatically generated by Bitbucket for use in the URL. For example, if the repository name is 'test repo', in the URL it would become 'test-repo' as in https://mybitbucket.server/projects/TEST/repos/test-repo.",
    ).optional(),
  }).describe(
    "BitbucketServerTriggerConfig describes the configuration of a trigger that creates a build whenever a Bitbucket Server event is received.",
  ).optional(),
  build: z.object({
    approval: z.object({
      config: z.object({
        approvalRequired: z.boolean().describe(
          "Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start.",
        ).optional(),
      }).describe(
        "ApprovalConfig describes configuration for manual approval of a build.",
      ).optional(),
      result: z.object({
        approvalTime: z.string().describe(
          "Output only. The time when the approval decision was made.",
        ).optional(),
        approverAccount: z.string().describe(
          "Output only. Email of the user that called the ApproveBuild API to approve or reject a build at the time that the API was called.",
        ).optional(),
        comment: z.string().describe(
          "Optional. An optional comment for this manual approval result.",
        ).optional(),
        decision: z.enum(["DECISION_UNSPECIFIED", "APPROVED", "REJECTED"])
          .describe("Required. The decision of this manual approval.")
          .optional(),
        url: z.string().describe(
          "Optional. An optional URL tied to this manual approval result. This field is essentially the same as comment, except that it will be rendered by the UI differently. An example use case is a link to an external job that approved this Build.",
        ).optional(),
      }).describe(
        "ApprovalResult describes the decision and associated metadata of a manual approval of a build.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PENDING",
        "APPROVED",
        "REJECTED",
        "CANCELLED",
      ]).describe("Output only. The state of this build's approval.")
        .optional(),
    }).describe(
      "BuildApproval describes a build's approval configuration, state, and result.",
    ).optional(),
    artifacts: z.object({
      genericArtifacts: z.array(z.object({
        folder: z.string().describe(
          "Required. Path to the generic artifact in the build's workspace to be uploaded to Artifact Registry.",
        ).optional(),
        registryPath: z.string().describe(
          "Required. Registry path to upload the generic artifact to, in the form projects/$PROJECT/locations/$LOCATION/repositories/$REPO/packages/$PACKAGE/versions/$VERSION",
        ).optional(),
      })).describe(
        "Optional. A list of generic artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. If any artifacts fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      goModules: z.array(z.object({
        modulePath: z.string().describe(
          'Optional. The Go module\'s "module path". e.g. example.com/foo/v2',
        ).optional(),
        moduleVersion: z.string().describe(
          "Optional. The Go module's semantic version in the form vX.Y.Z. e.g. v0.1.1 Pre-release identifiers can also be added by appending a dash and dot separated ASCII alphanumeric characters and hyphens. e.g. v0.2.3-alpha.x.12m.5",
        ).optional(),
        repositoryLocation: z.string().describe(
          "Optional. Location of the Artifact Registry repository. i.e. us-east1 Defaults to the build’s location.",
        ).optional(),
        repositoryName: z.string().describe(
          "Optional. Artifact Registry repository name. Specified Go modules will be zipped and uploaded to Artifact Registry with this location as a prefix. e.g. my-go-repo",
        ).optional(),
        repositoryProjectId: z.string().describe(
          "Optional. Project ID of the Artifact Registry repository. Defaults to the build project.",
        ).optional(),
        sourcePath: z.string().describe(
          "Optional. Source path of the go.mod file in the build's workspace. If not specified, this will default to the current directory. e.g. ~/code/go/mypackage",
        ).optional(),
      })).describe(
        "Optional. A list of Go modules to be uploaded to Artifact Registry upon successful completion of all build steps. If any objects fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      images: z.array(z.string()).describe(
        "A list of images to be pushed upon the successful completion of all build steps. The images will be pushed using the builder service account's credentials. The digests of the pushed images will be stored in the Build resource's results field. If any of the images fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      mavenArtifacts: z.array(z.object({
        artifactId: z.string().describe(
          "Maven `artifactId` value used when uploading the artifact to Artifact Registry.",
        ).optional(),
        deployFolder: z.string().describe(
          "Optional. Path to a folder containing the files to upload to Artifact Registry. This can be either an absolute path, e.g. `/workspace/my-app/target/`, or a relative path from /workspace, e.g. `my-app/target/`. This field is mutually exclusive with the `path` field.",
        ).optional(),
        groupId: z.string().describe(
          "Maven `groupId` value used when uploading the artifact to Artifact Registry.",
        ).optional(),
        path: z.string().describe(
          "Optional. Path to an artifact in the build's workspace to be uploaded to Artifact Registry. This can be either an absolute path, e.g. /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar.",
        ).optional(),
        repository: z.string().describe(
          'Artifact Registry repository, in the form "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the workspace specified by path will be uploaded to Artifact Registry with this location as a prefix.',
        ).optional(),
        version: z.string().describe(
          "Maven `version` value used when uploading the artifact to Artifact Registry.",
        ).optional(),
      })).describe(
        "A list of Maven artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. Artifacts in the workspace matching specified paths globs will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any artifacts fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      npmPackages: z.array(z.object({
        packagePath: z.string().describe(
          "Optional. Path to the package.json. e.g. workspace/path/to/package Only one of `archive` or `package_path` can be specified.",
        ).optional(),
        repository: z.string().describe(
          'Artifact Registry repository, in the form "https://$REGION-npm.pkg.dev/$PROJECT/$REPOSITORY" Npm package in the workspace specified by path will be zipped and uploaded to Artifact Registry with this location as a prefix.',
        ).optional(),
      })).describe(
        "A list of npm packages to be uploaded to Artifact Registry upon successful completion of all build steps. Npm packages in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any packages fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      objects: z.object({
        location: z.string().describe(
          'Cloud Storage bucket and optional object path, in the form "gs://bucket/path/to/somewhere/". (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix.',
        ).optional(),
        paths: z.array(z.string()).describe(
          "Path globs used to match files in the build's workspace.",
        ).optional(),
        timing: z.object({
          endTime: z.string().describe("End of time span.").optional(),
          startTime: z.string().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
      }).describe(
        "Files in the workspace to upload to Cloud Storage upon successful completion of all build steps.",
      ).optional(),
      oci: z.array(z.object({
        file: z.string().describe(
          "Required. Path on the local file system where to find the container to upload. e.g. /workspace/my-image.tar",
        ).optional(),
        registryPath: z.string().describe(
          "Required. Registry path to upload the container to. e.g. us-east1-docker.pkg.dev/my-project/my-repo/my-image",
        ).optional(),
        tags: z.array(z.unknown()).describe(
          "Optional. Tags to apply to the uploaded image. e.g. latest, 1.0.0",
        ).optional(),
      })).describe(
        "Optional. A list of OCI images to be uploaded to Artifact Registry upon successful completion of all build steps. OCI images in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any images fail to be pushed, the build is marked FAILURE.",
      ).optional(),
      pythonPackages: z.array(z.object({
        paths: z.array(z.unknown()).describe(
          "Path globs used to match files in the build's workspace. For Python/ Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file.",
        ).optional(),
        repository: z.string().describe(
          'Artifact Registry repository, in the form "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the workspace matching any path pattern will be uploaded to Artifact Registry with this location as a prefix.',
        ).optional(),
      })).describe(
        "A list of Python packages to be uploaded to Artifact Registry upon successful completion of all build steps. The build service account credentials will be used to perform the upload. If any objects fail to be pushed, the build is marked FAILURE.",
      ).optional(),
    }).describe(
      "Artifacts produced by a build that should be uploaded upon successful completion of all build steps.",
    ).optional(),
    availableSecrets: z.object({
      inline: z.array(z.object({
        envMap: z.record(z.string(), z.unknown()).describe(
          "Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets.",
        ).optional(),
        kmsKeyName: z.string().describe(
          "Resource name of Cloud KMS crypto key to decrypt the encrypted value. In format: projects/*/locations/*/keyRings/*/cryptoKeys/*",
        ).optional(),
      })).describe(
        "Secrets encrypted with KMS key and the associated secret environment variable.",
      ).optional(),
      secretManager: z.array(z.object({
        env: z.string().describe(
          "Environment variable name to associate with the secret. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step.",
        ).optional(),
        versionName: z.string().describe(
          "Resource name of the SecretVersion. In format: projects/*/secrets/*/versions/*",
        ).optional(),
      })).describe(
        "Secrets in Secret Manager and associated secret environment variable.",
      ).optional(),
    }).describe("Secrets and secret environment variables.").optional(),
    buildTriggerId: z.string().describe(
      "Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Time at which the request to create the build was received.",
    ).optional(),
    dependencies: z.array(z.object({
      empty: z.boolean().describe(
        "If set to true disable all dependency fetching (ignoring the default source as well).",
      ).optional(),
      genericArtifact: z.object({
        destPath: z.string().describe(
          "Required. Where the artifact files should be placed on the worker.",
        ).optional(),
        resource: z.string().describe(
          "Required. The location to download the artifact files from. Ex: projects/p1/locations/us/repositories/r1/packages/p1/versions/v1",
        ).optional(),
      }).describe("Represents a generic artifact as a build dependency.")
        .optional(),
      gitSource: z.object({
        depth: z.string().describe(
          "Optional. How much history should be fetched for the build (default 1, -1 for all history).",
        ).optional(),
        destPath: z.string().describe(
          "Required. Where should the files be placed on the worker.",
        ).optional(),
        recurseSubmodules: z.boolean().describe(
          "Optional. True if submodules should be fetched too (default false).",
        ).optional(),
        repository: z.object({
          developerConnect: z.unknown().describe(
            "The Developer Connect Git repository link formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*`",
          ).optional(),
          url: z.unknown().describe("Location of the Git repository.")
            .optional(),
        }).describe("A repository for a git source.").optional(),
        revision: z.string().describe(
          "Required. The revision that we will fetch the repo at.",
        ).optional(),
      }).describe("Represents a git repository as a build dependency.")
        .optional(),
    })).describe(
      "Optional. Dependencies that the Cloud Build worker will fetch before executing user steps.",
    ).optional(),
    failureInfo: z.object({
      detail: z.string().describe(
        "Explains the failure issue in more detail using hard-coded text.",
      ).optional(),
      type: z.enum([
        "FAILURE_TYPE_UNSPECIFIED",
        "PUSH_FAILED",
        "PUSH_IMAGE_NOT_FOUND",
        "PUSH_NOT_AUTHORIZED",
        "LOGGING_FAILURE",
        "USER_BUILD_STEP",
        "FETCH_SOURCE_FAILED",
      ]).describe("The name of the failure.").optional(),
    }).describe(
      "A fatal problem encountered during the execution of the build.",
    ).optional(),
    finishTime: z.string().describe(
      "Output only. Time at which execution of the build was finished. The difference between finish_time and start_time is the duration of the build's execution.",
    ).optional(),
    gitConfig: z.object({
      http: z.object({
        proxySecretVersionName: z.string().describe(
          "SecretVersion resource of the HTTP proxy URL. The Service Account used in the build (either the default Service Account or user-specified Service Account) should have `secretmanager.versions.access` permissions on this secret. The proxy URL should be in format `protocol://@]proxyhost[:port]`.",
        ).optional(),
      }).describe(
        "HttpConfig is a configuration for HTTP related git operations.",
      ).optional(),
    }).describe("GitConfig is a configuration for git operations.").optional(),
    id: z.string().describe("Output only. Unique identifier of the build.")
      .optional(),
    images: z.array(z.string()).describe(
      "A list of images to be pushed upon the successful completion of all build steps. The images are pushed using the builder service account's credentials. The digests of the pushed images will be stored in the `Build` resource's results field. If any of the images fail to be pushed, the build status is marked `FAILURE`.",
    ).optional(),
    logUrl: z.string().describe(
      "Output only. URL to logs for this build in Google Cloud Console.",
    ).optional(),
    logsBucket: z.string().describe(
      "Cloud Storage bucket where logs should be written (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`.",
    ).optional(),
    name: z.string().describe(
      "Output only. The 'Build' name with format: `projects/{project}/locations/{location}/builds/{build}`, where {build} is a unique identifier generated by the service.",
    ).optional(),
    options: z.object({
      automapSubstitutions: z.boolean().describe(
        "Option to include built-in and custom substitutions as env variables for all build steps.",
      ).optional(),
      defaultLogsBucketBehavior: z.enum([
        "DEFAULT_LOGS_BUCKET_BEHAVIOR_UNSPECIFIED",
        "REGIONAL_USER_OWNED_BUCKET",
        "LEGACY_BUCKET",
      ]).describe(
        "Optional. Option to specify how default logs buckets are setup.",
      ).optional(),
      diskSizeGb: z.string().describe(
        'Requested disk size for the VM that runs the build. Note that this is *NOT* "disk free"; some of the space will be used by the operating system and build utilities. Also note that this is the minimum disk size that will be allocated for the build -- the build may run with a larger disk than requested. At present, the maximum disk size is 4000GB; builds that request more than the maximum are rejected with an error.',
      ).optional(),
      dynamicSubstitutions: z.boolean().describe(
        "Option to specify whether or not to apply bash style string operations to the substitutions. NOTE: this is always enabled for triggered builds and cannot be overridden in the build configuration file.",
      ).optional(),
      enableStructuredLogging: z.boolean().describe(
        "Optional. Option to specify whether structured logging is enabled. If true, JSON-formatted logs are parsed as structured logs.",
      ).optional(),
      env: z.array(z.string()).describe(
        'A list of global environment variable definitions that will exist for all build steps in this build. If a variable is defined in both globally and in a build step, the variable will use the build step value. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE".',
      ).optional(),
      logStreamingOption: z.enum(["STREAM_DEFAULT", "STREAM_ON", "STREAM_OFF"])
        .describe(
          "Option to define build log streaming behavior to Cloud Storage.",
        ).optional(),
      logging: z.enum([
        "LOGGING_UNSPECIFIED",
        "LEGACY",
        "GCS_ONLY",
        "STACKDRIVER_ONLY",
        "CLOUD_LOGGING_ONLY",
        "NONE",
      ]).describe(
        "Option to specify the logging mode, which determines if and where build logs are stored.",
      ).optional(),
      machineType: z.enum([
        "UNSPECIFIED",
        "N1_HIGHCPU_8",
        "N1_HIGHCPU_32",
        "E2_HIGHCPU_8",
        "E2_HIGHCPU_32",
        "E2_MEDIUM",
      ]).describe("Compute Engine machine type on which to run the build.")
        .optional(),
      pool: z.object({
        name: z.string().describe(
          "The `WorkerPool` resource to execute the build on. You must have `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format projects/{project}/locations/{location}/workerPools/{workerPoolId}",
        ).optional(),
      }).describe(
        "Details about how a build should be executed on a `WorkerPool`. See [running builds in a private pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information.",
      ).optional(),
      pubsubTopic: z.string().describe(
        "Optional. Option to specify the Pub/Sub topic to receive build status updates.",
      ).optional(),
      requestedVerifyOption: z.enum(["NOT_VERIFIED", "VERIFIED"]).describe(
        "Requested verifiability options.",
      ).optional(),
      secretEnv: z.array(z.string()).describe(
        "A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. These variables will be available to all build steps in this build.",
      ).optional(),
      sourceProvenanceHash: z.array(
        z.enum([
          "NONE",
          "SHA256",
          "MD5",
          "GO_MODULE_H1",
          "SHA512",
          "DIRSUM_SHA256",
        ]),
      ).describe("Requested hash for SourceProvenance.").optional(),
      substitutionOption: z.enum(["MUST_MATCH", "ALLOW_LOOSE"]).describe(
        "Option to specify behavior when there is an error in the substitution checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file.",
      ).optional(),
      volumes: z.array(z.object({
        name: z.string().describe(
          "Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps.",
        ).optional(),
        path: z.string().describe(
          "Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths.",
        ).optional(),
      })).describe(
        "Global list of volumes to mount for ALL build steps Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step. Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration.",
      ).optional(),
      workerPool: z.string().describe(
        "This field deprecated; please use `pool.name` instead.",
      ).optional(),
    }).describe("Optional arguments to enable specific features of builds.")
      .optional(),
    projectId: z.string().describe("Output only. ID of the project.")
      .optional(),
    queueTtl: z.string().describe(
      "TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`. The TTL starts ticking from create_time.",
    ).optional(),
    results: z.object({
      artifactManifest: z.string().describe(
        "Path to the artifact manifest for non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage.",
      ).optional(),
      artifactTiming: z.object({
        endTime: z.string().describe("End of time span.").optional(),
        startTime: z.string().describe("Start of time span.").optional(),
      }).describe("Start and end times for a build execution phase.")
        .optional(),
      buildStepImages: z.array(z.string()).describe(
        "List of build step digests, in the order corresponding to build step indices.",
      ).optional(),
      buildStepOutputs: z.array(z.string()).describe(
        "List of build step outputs, produced by builder images, in the order corresponding to build step indices. [Cloud Builders](https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 50KB of data is stored. Note that the `$BUILDER_OUTPUT` variable is read-only and can't be substituted.",
      ).optional(),
      buildStepResults: z.record(
        z.string(),
        z.object({
          results: z.record(z.string(), z.unknown()).describe(
            "Results for a build step.",
          ).optional(),
        }),
      ).describe("Results for build steps. step_id ->").optional(),
      genericArtifacts: z.array(z.object({
        artifactFingerprint: z.object({
          fileHash: z.unknown().describe("Collection of file hashes.")
            .optional(),
        }).describe(
          "Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.",
        ).optional(),
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        fileHashes: z.record(z.string(), z.unknown()).describe(
          "Output only. The file hashes that make up the generic artifact.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
        uri: z.string().describe(
          "Output only. URI of the uploaded artifact. Ex: projects/p1/locations/us/repositories/r1/packages/p1/versions/v1",
        ).optional(),
      })).describe(
        "Output only. Generic artifacts uploaded to Artifact Registry at the end of the build.",
      ).optional(),
      goModules: z.array(z.object({
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        fileHashes: z.object({
          fileHash: z.unknown().describe("Collection of file hashes.")
            .optional(),
        }).describe(
          "Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
        uri: z.string().describe("URI of the uploaded artifact.").optional(),
      })).describe(
        "Optional. Go module artifacts uploaded to Artifact Registry at the end of the build.",
      ).optional(),
      images: z.array(z.object({
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        digest: z.string().describe("Docker Registry 2.0 digest.").optional(),
        name: z.string().describe(
          "Name used to push the container image to Google Container Registry, as presented to `docker push`.",
        ).optional(),
        ociMediaType: z.enum([
          "OCI_MEDIA_TYPE_UNSPECIFIED",
          "IMAGE_MANIFEST",
          "IMAGE_INDEX",
        ]).describe(
          "Output only. The OCI media type of the artifact. Non-OCI images, such as Docker images, will have an unspecified value.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
      })).describe("Container images that were built as a part of the build.")
        .optional(),
      mavenArtifacts: z.array(z.object({
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        fileHashes: z.object({
          fileHash: z.unknown().describe("Collection of file hashes.")
            .optional(),
        }).describe(
          "Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
        uri: z.string().describe("URI of the uploaded artifact.").optional(),
      })).describe(
        "Maven artifacts uploaded to Artifact Registry at the end of the build.",
      ).optional(),
      npmPackages: z.array(z.object({
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        fileHashes: z.object({
          fileHash: z.unknown().describe("Collection of file hashes.")
            .optional(),
        }).describe(
          "Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
        uri: z.string().describe("URI of the uploaded npm package.").optional(),
      })).describe(
        "Npm packages uploaded to Artifact Registry at the end of the build.",
      ).optional(),
      numArtifacts: z.string().describe(
        "Number of non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage.",
      ).optional(),
      pythonPackages: z.array(z.object({
        artifactRegistryPackage: z.string().describe(
          "Output only. Path to the artifact in Artifact Registry.",
        ).optional(),
        fileHashes: z.object({
          fileHash: z.unknown().describe("Collection of file hashes.")
            .optional(),
        }).describe(
          "Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.",
        ).optional(),
        pushTiming: z.object({
          endTime: z.unknown().describe("End of time span.").optional(),
          startTime: z.unknown().describe("Start of time span.").optional(),
        }).describe("Start and end times for a build execution phase.")
          .optional(),
        uri: z.string().describe("URI of the uploaded artifact.").optional(),
      })).describe(
        "Python artifacts uploaded to Artifact Registry at the end of the build.",
      ).optional(),
    }).describe("Artifacts created by the build pipeline.").optional(),
    secrets: z.array(z.object({
      kmsKeyName: z.string().describe(
        "Cloud KMS key name to use to decrypt these envs.",
      ).optional(),
      secretEnv: z.record(z.string(), z.string()).describe(
        "Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets.",
      ).optional(),
    })).describe(
      "Secrets to decrypt using Cloud Key Management Service. Note: Secret Manager is the recommended technique for managing sensitive data with Cloud Build. Use `available_secrets` to configure builds to access secrets from Secret Manager. For instructions, see: https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets",
    ).optional(),
    serviceAccount: z.string().describe(
      "IAM service account whose credentials will be used at build runtime. Must be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT can be email address or uniqueId of the service account.",
    ).optional(),
    source: z.object({
      connectedRepository: z.object({
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build.",
        ).optional(),
        repository: z.string().describe(
          "Required. Name of the Google Cloud Build repository, formatted as `projects/*/locations/*/connections/*/repositories/*`.",
        ).optional(),
        revision: z.string().describe(
          "Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref.",
        ).optional(),
      }).describe(
        "Location of the source in a 2nd-gen Google Cloud Build repository resource.",
      ).optional(),
      developerConnectConfig: z.object({
        dir: z.string().describe(
          "Required. Directory, relative to the source root, in which to run the build.",
        ).optional(),
        gitRepositoryLink: z.string().describe(
          "Required. The Developer Connect Git repository link, formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*`.",
        ).optional(),
        revision: z.string().describe(
          "Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref.",
        ).optional(),
      }).describe(
        "This config defines the location of a source through Developer Connect.",
      ).optional(),
      gitSource: z.object({
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution.",
        ).optional(),
        revision: z.string().describe(
          "Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch.",
        ).optional(),
        url: z.string().describe(
          "Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote.",
        ).optional(),
      }).describe("Location of the source in any accessible Git repository.")
        .optional(),
      repoSource: z.object({
        branchName: z.string().describe(
          "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
        commitSha: z.string().describe("Explicit commit SHA to build.")
          .optional(),
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution.",
        ).optional(),
        invertRegex: z.boolean().describe(
          "Optional. Only trigger a build if the revision regex does NOT match the revision regex.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
        ).optional(),
        repoName: z.string().describe(
          "Required. Name of the Cloud Source Repository.",
        ).optional(),
        substitutions: z.record(z.string(), z.string()).describe(
          "Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger",
        ).optional(),
        tagName: z.string().describe(
          "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
      }).describe("Location of the source in a Google Cloud Source Repository.")
        .optional(),
      storageSource: z.object({
        bucket: z.string().describe(
          "Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build.",
        ).optional(),
        sourceFetcher: z.enum([
          "SOURCE_FETCHER_UNSPECIFIED",
          "GSUTIL",
          "GCS_FETCHER",
        ]).describe(
          "Optional. Option to specify the tool to fetch the source file for the build.",
        ).optional(),
      }).describe("Location of the source in an archive file in Cloud Storage.")
        .optional(),
      storageSourceManifest: z.object({
        bucket: z.string().describe(
          "Required. Cloud Storage bucket containing the source manifest (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Required. Cloud Storage object containing the source manifest. This object must be a JSON file.",
        ).optional(),
      }).describe(
        "Location of the source manifest in Cloud Storage. This feature is in Preview; see description [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).",
      ).optional(),
    }).describe("Location of the source in a supported storage service.")
      .optional(),
    sourceProvenance: z.object({
      fileHashes: z.record(
        z.string(),
        z.object({
          fileHash: z.array(z.unknown()).describe("Collection of file hashes.")
            .optional(),
        }),
      ).describe(
        "Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file.",
      ).optional(),
      resolvedConnectedRepository: z.object({
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build.",
        ).optional(),
        repository: z.string().describe(
          "Required. Name of the Google Cloud Build repository, formatted as `projects/*/locations/*/connections/*/repositories/*`.",
        ).optional(),
        revision: z.string().describe(
          "Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref.",
        ).optional(),
      }).describe(
        "Location of the source in a 2nd-gen Google Cloud Build repository resource.",
      ).optional(),
      resolvedGitSource: z.object({
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution.",
        ).optional(),
        revision: z.string().describe(
          "Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch.",
        ).optional(),
        url: z.string().describe(
          "Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote.",
        ).optional(),
      }).describe("Location of the source in any accessible Git repository.")
        .optional(),
      resolvedRepoSource: z.object({
        branchName: z.string().describe(
          "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
        commitSha: z.string().describe("Explicit commit SHA to build.")
          .optional(),
        dir: z.string().describe(
          "Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution.",
        ).optional(),
        invertRegex: z.boolean().describe(
          "Optional. Only trigger a build if the revision regex does NOT match the revision regex.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
        ).optional(),
        repoName: z.string().describe(
          "Required. Name of the Cloud Source Repository.",
        ).optional(),
        substitutions: z.record(z.string(), z.string()).describe(
          "Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger",
        ).optional(),
        tagName: z.string().describe(
          "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
        ).optional(),
      }).describe("Location of the source in a Google Cloud Source Repository.")
        .optional(),
      resolvedStorageSource: z.object({
        bucket: z.string().describe(
          "Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build.",
        ).optional(),
        sourceFetcher: z.enum([
          "SOURCE_FETCHER_UNSPECIFIED",
          "GSUTIL",
          "GCS_FETCHER",
        ]).describe(
          "Optional. Option to specify the tool to fetch the source file for the build.",
        ).optional(),
      }).describe("Location of the source in an archive file in Cloud Storage.")
        .optional(),
      resolvedStorageSourceManifest: z.object({
        bucket: z.string().describe(
          "Required. Cloud Storage bucket containing the source manifest (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).",
        ).optional(),
        generation: z.string().describe(
          "Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used.",
        ).optional(),
        object: z.string().describe(
          "Required. Cloud Storage object containing the source manifest. This object must be a JSON file.",
        ).optional(),
      }).describe(
        "Location of the source manifest in Cloud Storage. This feature is in Preview; see description [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).",
      ).optional(),
    }).describe(
      "Provenance of the source. Ways to find the original source, or verify that some source was used for this build.",
    ).optional(),
    startTime: z.string().describe(
      "Output only. Time at which execution of the build was started.",
    ).optional(),
    status: z.enum([
      "STATUS_UNKNOWN",
      "PENDING",
      "QUEUED",
      "WORKING",
      "SUCCESS",
      "FAILURE",
      "INTERNAL_ERROR",
      "TIMEOUT",
      "CANCELLED",
      "EXPIRED",
    ]).describe("Output only. Status of the build.").optional(),
    statusDetail: z.string().describe(
      "Output only. Customer-readable message about the current status.",
    ).optional(),
    steps: z.array(z.object({
      allowExitCodes: z.array(z.number().int()).describe(
        "Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence.",
      ).optional(),
      allowFailure: z.boolean().describe(
        "Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field.",
      ).optional(),
      args: z.array(z.string()).describe(
        "A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments.",
      ).optional(),
      automapSubstitutions: z.boolean().describe(
        "Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption.",
      ).optional(),
      dir: z.string().describe(
        "Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution.",
      ).optional(),
      entrypoint: z.string().describe(
        "Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used.",
      ).optional(),
      env: z.array(z.string()).describe(
        'A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE".',
      ).optional(),
      exitCode: z.number().int().describe(
        "Output only. Return code from running the step.",
      ).optional(),
      id: z.string().describe(
        "Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency.",
      ).optional(),
      name: z.string().describe(
        "Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like \"ubuntu\", \"debian\", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step.",
      ).optional(),
      pullTiming: z.object({
        endTime: z.string().describe("End of time span.").optional(),
        startTime: z.string().describe("Start of time span.").optional(),
      }).describe("Start and end times for a build execution phase.")
        .optional(),
      results: z.array(z.object({
        attestationContent: z.unknown().describe(
          "Optional. The content of the attestation to be generated.",
        ).optional(),
        attestationType: z.unknown().describe(
          "Optional. The type of attestation to be generated.",
        ).optional(),
        name: z.unknown().describe("Required. The name of the result.")
          .optional(),
      })).describe("Declaration of results for this build step.").optional(),
      script: z.string().describe(
        "A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args.",
      ).optional(),
      secretEnv: z.array(z.string()).describe(
        "A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`.",
      ).optional(),
      status: z.enum([
        "STATUS_UNKNOWN",
        "PENDING",
        "QUEUED",
        "WORKING",
        "SUCCESS",
        "FAILURE",
        "INTERNAL_ERROR",
        "TIMEOUT",
        "CANCELLED",
        "EXPIRED",
      ]).describe(
        "Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses.",
      ).optional(),
      timeout: z.string().describe(
        "Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out.",
      ).optional(),
      timing: z.object({
        endTime: z.string().describe("End of time span.").optional(),
        startTime: z.string().describe("Start of time span.").optional(),
      }).describe("Start and end times for a build execution phase.")
        .optional(),
      volumes: z.array(z.object({
        name: z.unknown().describe(
          "Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps.",
        ).optional(),
        path: z.unknown().describe(
          "Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths.",
        ).optional(),
      })).describe(
        "List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration.",
      ).optional(),
      waitFor: z.array(z.string()).describe(
        "The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully.",
      ).optional(),
    })).describe("Required. The operations to be performed on the workspace.")
      .optional(),
    substitutions: z.record(z.string(), z.string()).describe(
      "Substitutions data for `Build` resource.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "Tags for annotation of a `Build`. These are not docker tags.",
    ).optional(),
    timeout: z.string().describe(
      "Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`. `timeout` starts ticking from `startTime`. Default time is 60 minutes.",
    ).optional(),
    timing: z.record(
      z.string(),
      z.object({
        endTime: z.string().describe("End of time span.").optional(),
        startTime: z.string().describe("Start of time span.").optional(),
      }),
    ).describe(
      "Output only. Stores timing information for phases of the build. Valid keys are: * BUILD: time to execute all build steps. * PUSH: time to push all artifacts including docker images and non docker artifacts. * FETCHSOURCE: time to fetch source. * SETUPBUILD: time to set up build. If the build does not specify source or images, these keys will not be included.",
    ).optional(),
    warnings: z.array(z.object({
      priority: z.enum(["PRIORITY_UNSPECIFIED", "INFO", "WARNING", "ALERT"])
        .describe("The priority for this warning.").optional(),
      text: z.string().describe("Explanation of the warning generated.")
        .optional(),
    })).describe(
      "Output only. Non-fatal problems encountered during the execution of the build.",
    ).optional(),
  }).describe(
    "A build resource in the Cloud Build API. At a high level, a `Build` describes where to find source code, how to build it (for example, the builder image to run on the source), and where to store the built artifacts. Fields can include the following variables, which will be expanded when the build is created: - $PROJECT_ID: the project ID of the build. - $PROJECT_NUMBER: the project number of the build. - $LOCATION: the location/region of the build. - $BUILD_ID: the autogenerated ID of the build. - $REPO_NAME: the source repository name specified by RepoSource. - $BRANCH_NAME: the branch name specified by RepoSource. - $TAG_NAME: the tag name specified by RepoSource. - $REVISION_ID or $COMMIT_SHA: the commit SHA specified by RepoSource or resolved from the specified branch or tag. - $SHORT_SHA: first 7 characters of $REVISION_ID or $COMMIT_SHA.",
  ).optional(),
  description: z.string().describe(
    "Human-readable description of this trigger.",
  ).optional(),
  developerConnectEventConfig: z.object({
    gitRepositoryLink: z.string().describe(
      "Required. The Developer Connect Git repository link, formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*`.",
    ).optional(),
    gitRepositoryLinkType: z.enum([
      "GIT_REPOSITORY_LINK_TYPE_UNSPECIFIED",
      "GITHUB",
      "GITHUB_ENTERPRISE",
      "GITLAB",
      "GITLAB_ENTERPRISE",
      "BITBUCKET_DATA_CENTER",
      "BITBUCKET_CLOUD",
    ]).describe("Output only. The type of DeveloperConnect GitRepositoryLink.")
      .optional(),
    pullRequest: z.object({
      branch: z.string().describe(
        "Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      commentControl: z.enum([
        "COMMENTS_DISABLED",
        "COMMENTS_ENABLED",
        "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY",
      ]).describe(
        "If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run.",
      ).optional(),
      invertRegex: z.boolean().describe(
        "If true, branches that do NOT match the git_ref will trigger a build.",
      ).optional(),
    }).describe(
      "PullRequestFilter contains filter properties for matching GitHub Pull Requests.",
    ).optional(),
    push: z.object({
      branch: z.string().describe(
        "Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      invertRegex: z.boolean().describe(
        "When true, only trigger a build if the revision regex does NOT match the git_ref regex.",
      ).optional(),
      tag: z.string().describe(
        "Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
    }).describe(
      "Push contains filter properties for matching GitHub git pushes.",
    ).optional(),
  }).describe(
    "The configuration of a trigger that creates a build whenever an event from the DeveloperConnect API is received.",
  ).optional(),
  disabled: z.boolean().describe(
    "If true, the trigger will never automatically execute a build.",
  ).optional(),
  eventType: z.enum([
    "EVENT_TYPE_UNSPECIFIED",
    "REPO",
    "WEBHOOK",
    "PUBSUB",
    "MANUAL",
  ]).describe(
    "EventType allows the user to explicitly set the type of event to which this BuildTrigger should respond. This field will be validated against the rest of the configuration if it is set.",
  ).optional(),
  filename: z.string().describe(
    "Path, from the source root, to the build configuration file (i.e. cloudbuild.yaml).",
  ).optional(),
  filter: z.string().describe("A Common Expression Language string.")
    .optional(),
  gitFileSource: z.object({
    bitbucketServerConfig: z.string().describe(
      "The full resource name of the bitbucket server config. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`.",
    ).optional(),
    githubEnterpriseConfig: z.string().describe(
      "The full resource name of the github enterprise config. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. `projects/{project}/githubEnterpriseConfigs/{id}`.",
    ).optional(),
    path: z.string().describe(
      "The path of the file, with the repo root as the root of the path.",
    ).optional(),
    repoType: z.enum([
      "UNKNOWN",
      "CLOUD_SOURCE_REPOSITORIES",
      "GITHUB",
      "BITBUCKET_SERVER",
      "GITLAB",
      "BITBUCKET_CLOUD",
    ]).describe("See RepoType above.").optional(),
    repository: z.string().describe(
      "The fully qualified resource name of the Repos API repository. Either URI or repository can be specified. If unspecified, the repo from which the trigger invocation originated is assumed to be the repo from which to read the specified path.",
    ).optional(),
    revision: z.string().describe(
      "The branch, tag, arbitrary ref, or SHA version of the repo to use when resolving the filename (optional). This field respects the same syntax/resolution as described here: https://git-scm.com/docs/gitrevisions If unspecified, the revision from which the trigger invocation originated is assumed to be the revision from which to read the specified path.",
    ).optional(),
    uri: z.string().describe(
      "The URI of the repo. Either uri or repository can be specified. If unspecified, the repo from which the trigger invocation originated is assumed to be the repo from which to read the specified path.",
    ).optional(),
  }).describe(
    "GitFileSource describes a file within a (possibly remote) code repository.",
  ).optional(),
  github: z.object({
    enterpriseConfigResourceName: z.string().describe(
      'The resource name of the github enterprise config that should be applied to this installation. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"',
    ).optional(),
    installationId: z.string().describe(
      "The installationID that emits the GitHub event.",
    ).optional(),
    name: z.string().describe(
      'Name of the repository. For example: The name for https://github.com/googlecloudplatform/cloud-builders is "cloud-builders".',
    ).optional(),
    owner: z.string().describe(
      'Owner of the repository. For example: The owner for https://github.com/googlecloudplatform/cloud-builders is "googlecloudplatform".',
    ).optional(),
    pullRequest: z.object({
      branch: z.string().describe(
        "Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      commentControl: z.enum([
        "COMMENTS_DISABLED",
        "COMMENTS_ENABLED",
        "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY",
      ]).describe(
        "If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run.",
      ).optional(),
      invertRegex: z.boolean().describe(
        "If true, branches that do NOT match the git_ref will trigger a build.",
      ).optional(),
    }).describe(
      "PullRequestFilter contains filter properties for matching GitHub Pull Requests.",
    ).optional(),
    push: z.object({
      branch: z.string().describe(
        "Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      invertRegex: z.boolean().describe(
        "When true, only trigger a build if the revision regex does NOT match the git_ref regex.",
      ).optional(),
      tag: z.string().describe(
        "Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
    }).describe(
      "Push contains filter properties for matching GitHub git pushes.",
    ).optional(),
  }).describe(
    "GitHubEventsConfig describes the configuration of a trigger that creates a build whenever a GitHub event is received.",
  ).optional(),
  gitlabEnterpriseEventsConfig: z.object({
    gitlabConfig: z.object({
      connectedRepositories: z.array(z.object({
        id: z.string().describe(
          'Required. Identifier for the repository. example: "namespace/project-slug", namespace is usually the username or group ID',
        ).optional(),
        webhookId: z.number().int().describe(
          "Output only. The ID of the webhook that was created for receiving events from this repo. We only create and manage a single webhook for each repo.",
        ).optional(),
      })).describe(
        "Connected GitLab.com or GitLabEnterprise repositories for this config.",
      ).optional(),
      createTime: z.string().describe(
        "Output only. Time when the config was created.",
      ).optional(),
      enterpriseConfig: z.object({
        hostUri: z.string().describe(
          "Immutable. The URI of the GitlabEnterprise host.",
        ).optional(),
        serviceDirectoryConfig: z.object({
          service: z.string().describe(
            "The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.",
          ).optional(),
        }).describe(
          "ServiceDirectoryConfig represents Service Directory configuration for a SCM host connection.",
        ).optional(),
        sslCa: z.string().describe(
          "The SSL certificate to use in requests to GitLab Enterprise instances.",
        ).optional(),
      }).describe(
        "GitLabEnterpriseConfig represents the configuration for a GitLabEnterprise integration.",
      ).optional(),
      name: z.string().describe("The resource name for the config.").optional(),
      secrets: z.object({
        apiAccessTokenVersion: z.string().describe(
          "Required. The resource name for the api access token’s secret version",
        ).optional(),
        apiKeyVersion: z.string().describe(
          "Required. Immutable. API Key that will be attached to webhook requests from GitLab to Cloud Build.",
        ).optional(),
        readAccessTokenVersion: z.string().describe(
          "Required. The resource name for the read access token’s secret version",
        ).optional(),
        webhookSecretVersion: z.string().describe(
          "Required. Immutable. The resource name for the webhook secret’s secret version. Once this field has been set, it cannot be changed. If you need to change it, please create another GitLabConfig.",
        ).optional(),
      }).describe(
        "GitLabSecrets represents the secrets in Secret Manager for a GitLab integration.",
      ).optional(),
      username: z.string().describe(
        "Username of the GitLab.com or GitLab Enterprise account Cloud Build will use.",
      ).optional(),
      webhookKey: z.string().describe(
        "Output only. UUID included in webhook requests. The UUID is used to look up the corresponding config.",
      ).optional(),
    }).describe(
      "GitLabConfig represents the configuration for a GitLab integration.",
    ).optional(),
    gitlabConfigResource: z.string().describe(
      "The GitLab config resource that this trigger config maps to.",
    ).optional(),
    projectNamespace: z.string().describe("Namespace of the GitLab project.")
      .optional(),
    pullRequest: z.object({
      branch: z.string().describe(
        "Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      commentControl: z.enum([
        "COMMENTS_DISABLED",
        "COMMENTS_ENABLED",
        "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY",
      ]).describe(
        "If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run.",
      ).optional(),
      invertRegex: z.boolean().describe(
        "If true, branches that do NOT match the git_ref will trigger a build.",
      ).optional(),
    }).describe(
      "PullRequestFilter contains filter properties for matching GitHub Pull Requests.",
    ).optional(),
    push: z.object({
      branch: z.string().describe(
        "Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      invertRegex: z.boolean().describe(
        "When true, only trigger a build if the revision regex does NOT match the git_ref regex.",
      ).optional(),
      tag: z.string().describe(
        "Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
    }).describe(
      "Push contains filter properties for matching GitHub git pushes.",
    ).optional(),
  }).describe(
    "GitLabEventsConfig describes the configuration of a trigger that creates a build whenever a GitLab event is received.",
  ).optional(),
  ignoredFiles: z.array(z.string()).describe(
    'ignored_files and included_files are file glob matches using https://golang.org/pkg/path/filepath/#Match extended with support for "**". If ignored_files and changed files are both empty, then they are not used to determine whether or not to trigger a build. If ignored_files is not empty, then we ignore any files that match any of the ignored_file globs. If the change has no files that are outside of the ignored_files globs, then we do not trigger a build.',
  ).optional(),
  includeBuildLogs: z.enum([
    "INCLUDE_BUILD_LOGS_UNSPECIFIED",
    "INCLUDE_BUILD_LOGS_WITH_STATUS",
  ]).describe(
    "If set to INCLUDE_BUILD_LOGS_WITH_STATUS, log url will be shown on GitHub page when build status is final. Setting this field to INCLUDE_BUILD_LOGS_WITH_STATUS for non GitHub triggers results in INVALID_ARGUMENT error.",
  ).optional(),
  includedFiles: z.array(z.string()).describe(
    "If any of the files altered in the commit pass the ignored_files filter and included_files is empty, then as far as this filter is concerned, we should trigger the build. If any of the files altered in the commit pass the ignored_files filter and included_files is not empty, then we make sure that at least one of those files matches a included_files glob. If not, then we do not trigger a build.",
  ).optional(),
  name: z.string().describe(
    "User-assigned name of the trigger. Must be unique within the project. Trigger names must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character.",
  ).optional(),
  pubsubConfig: z.object({
    serviceAccountEmail: z.string().describe(
      "Service account that will make the push request.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "OK",
      "SUBSCRIPTION_DELETED",
      "TOPIC_DELETED",
      "SUBSCRIPTION_MISCONFIGURED",
    ]).describe(
      "Potential issues with the underlying Pub/Sub subscription configuration. Only populated on get requests.",
    ).optional(),
    subscription: z.string().describe(
      "Output only. Name of the subscription. Format is `projects/{project}/subscriptions/{subscription}`.",
    ).optional(),
    topic: z.string().describe(
      "Optional. The name of the topic from which this subscription is receiving messages. Format is `projects/{project}/topics/{topic}`.",
    ).optional(),
  }).describe(
    "PubsubConfig describes the configuration of a trigger that creates a build whenever a Pub/Sub message is published.",
  ).optional(),
  repositoryEventConfig: z.object({
    pullRequest: z.object({
      branch: z.string().describe(
        "Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      commentControl: z.enum([
        "COMMENTS_DISABLED",
        "COMMENTS_ENABLED",
        "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY",
      ]).describe(
        "If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run.",
      ).optional(),
      invertRegex: z.boolean().describe(
        "If true, branches that do NOT match the git_ref will trigger a build.",
      ).optional(),
    }).describe(
      "PullRequestFilter contains filter properties for matching GitHub Pull Requests.",
    ).optional(),
    push: z.object({
      branch: z.string().describe(
        "Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
      invertRegex: z.boolean().describe(
        "When true, only trigger a build if the revision regex does NOT match the git_ref regex.",
      ).optional(),
      tag: z.string().describe(
        "Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
      ).optional(),
    }).describe(
      "Push contains filter properties for matching GitHub git pushes.",
    ).optional(),
    repository: z.string().describe(
      "The resource name of the Repo API resource.",
    ).optional(),
    repositoryType: z.enum([
      "REPOSITORY_TYPE_UNSPECIFIED",
      "GITHUB",
      "GITHUB_ENTERPRISE",
      "GITLAB_ENTERPRISE",
      "BITBUCKET_DATA_CENTER",
      "BITBUCKET_CLOUD",
    ]).describe(
      "Output only. The type of the SCM vendor the repository points to.",
    ).optional(),
  }).describe(
    "The configuration of a trigger that creates a build whenever an event from Repo API is received.",
  ).optional(),
  resourceName: z.string().describe(
    "The `Trigger` name with format: `projects/{project}/locations/{location}/triggers/{trigger}`, where {trigger} is a unique identifier generated by the service.",
  ).optional(),
  serviceAccount: z.string().describe(
    "The service account used for all user-controlled operations including UpdateBuildTrigger, RunBuildTrigger, CreateBuild, and CancelBuild. If no service account is set and the legacy Cloud Build service account ([PROJECT_NUM]@cloudbuild.gserviceaccount.com) is the default for the project then it will be used instead. Format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_ID_OR_EMAIL}`",
  ).optional(),
  sourceToBuild: z.object({
    bitbucketServerConfig: z.string().describe(
      "The full resource name of the bitbucket server config. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`.",
    ).optional(),
    githubEnterpriseConfig: z.string().describe(
      "The full resource name of the github enterprise config. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. `projects/{project}/githubEnterpriseConfigs/{id}`.",
    ).optional(),
    ref: z.string().describe(
      'The branch or tag to use. Must start with "refs/" (required).',
    ).optional(),
    repoType: z.enum([
      "UNKNOWN",
      "CLOUD_SOURCE_REPOSITORIES",
      "GITHUB",
      "BITBUCKET_SERVER",
      "GITLAB",
      "BITBUCKET_CLOUD",
    ]).describe("See RepoType below.").optional(),
    repository: z.string().describe(
      "The connected repository resource name, in the format `projects/*/locations/*/connections/*/repositories/*`. Either `uri` or `repository` can be specified and is required.",
    ).optional(),
    uri: z.string().describe(
      "The URI of the repo (e.g. https://github.com/user/repo.git). Either `uri` or `repository` can be specified and is required.",
    ).optional(),
  }).describe("GitRepoSource describes a repo and ref of a code repository.")
    .optional(),
  substitutions: z.record(z.string(), z.string()).describe(
    "Substitutions for Build resource. The keys must match the following regular expression: `^_[A-Z0-9_]+$`.",
  ).optional(),
  tags: z.array(z.string()).describe("Tags for annotation of a `BuildTrigger`")
    .optional(),
  triggerTemplate: z.object({
    branchName: z.string().describe(
      "Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
    ).optional(),
    commitSha: z.string().describe("Explicit commit SHA to build.").optional(),
    dir: z.string().describe(
      "Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution.",
    ).optional(),
    invertRegex: z.boolean().describe(
      "Optional. Only trigger a build if the revision regex does NOT match the revision regex.",
    ).optional(),
    projectId: z.string().describe(
      "Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed.",
    ).optional(),
    repoName: z.string().describe(
      "Required. Name of the Cloud Source Repository.",
    ).optional(),
    substitutions: z.record(z.string(), z.string()).describe(
      "Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger",
    ).optional(),
    tagName: z.string().describe(
      "Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax",
    ).optional(),
  }).describe("Location of the source in a Google Cloud Source Repository.")
    .optional(),
  webhookConfig: z.object({
    secret: z.string().describe(
      "Required. Resource name for the secret required as a URL parameter.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "OK", "SECRET_DELETED"]).describe(
      "Potential issues with the underlying Pub/Sub subscription configuration. Only populated on get requests.",
    ).optional(),
  }).describe(
    "WebhookConfig describes the configuration of a trigger that creates a build whenever a webhook is sent to a trigger's webhook URL.",
  ).optional(),
  projectId: z.string().describe(
    "Required. ID of the project for which to configure automatic builds.",
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

/** Swamp extension model for Google Cloud Build Triggers. Registered at `@swamp/gcp/cloudbuild/triggers`. */
export const model = {
  type: "@swamp/gcp/cloudbuild/triggers",
  version: "2026.06.07.1",
  upgrades: [
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
      description:
        "Configuration for an automated build in response to source repository changes.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a triggers",
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
        if (g["approvalConfig"] !== undefined) {
          body["approvalConfig"] = g["approvalConfig"];
        }
        if (g["autodetect"] !== undefined) body["autodetect"] = g["autodetect"];
        if (g["bitbucketServerTriggerConfig"] !== undefined) {
          body["bitbucketServerTriggerConfig"] =
            g["bitbucketServerTriggerConfig"];
        }
        if (g["build"] !== undefined) body["build"] = g["build"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["developerConnectEventConfig"] !== undefined) {
          body["developerConnectEventConfig"] =
            g["developerConnectEventConfig"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["eventType"] !== undefined) body["eventType"] = g["eventType"];
        if (g["filename"] !== undefined) body["filename"] = g["filename"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["gitFileSource"] !== undefined) {
          body["gitFileSource"] = g["gitFileSource"];
        }
        if (g["github"] !== undefined) body["github"] = g["github"];
        if (g["gitlabEnterpriseEventsConfig"] !== undefined) {
          body["gitlabEnterpriseEventsConfig"] =
            g["gitlabEnterpriseEventsConfig"];
        }
        if (g["ignoredFiles"] !== undefined) {
          body["ignoredFiles"] = g["ignoredFiles"];
        }
        if (g["includeBuildLogs"] !== undefined) {
          body["includeBuildLogs"] = g["includeBuildLogs"];
        }
        if (g["includedFiles"] !== undefined) {
          body["includedFiles"] = g["includedFiles"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pubsubConfig"] !== undefined) {
          body["pubsubConfig"] = g["pubsubConfig"];
        }
        if (g["repositoryEventConfig"] !== undefined) {
          body["repositoryEventConfig"] = g["repositoryEventConfig"];
        }
        if (g["resourceName"] !== undefined) {
          body["resourceName"] = g["resourceName"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["sourceToBuild"] !== undefined) {
          body["sourceToBuild"] = g["sourceToBuild"];
        }
        if (g["substitutions"] !== undefined) {
          body["substitutions"] = g["substitutions"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["triggerTemplate"] !== undefined) {
          body["triggerTemplate"] = g["triggerTemplate"];
        }
        if (g["webhookConfig"] !== undefined) {
          body["webhookConfig"] = g["webhookConfig"];
        }
        if (g["projectId"] !== undefined) body["projectId"] = g["projectId"];
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
      description: "Get a triggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the triggers"),
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
      description: "Update triggers attributes",
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
        params["resourceName"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["approvalConfig"] !== undefined) {
          body["approvalConfig"] = g["approvalConfig"];
        }
        if (g["autodetect"] !== undefined) body["autodetect"] = g["autodetect"];
        if (g["bitbucketServerTriggerConfig"] !== undefined) {
          body["bitbucketServerTriggerConfig"] =
            g["bitbucketServerTriggerConfig"];
        }
        if (g["build"] !== undefined) body["build"] = g["build"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["developerConnectEventConfig"] !== undefined) {
          body["developerConnectEventConfig"] =
            g["developerConnectEventConfig"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["eventType"] !== undefined) body["eventType"] = g["eventType"];
        if (g["filename"] !== undefined) body["filename"] = g["filename"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["gitFileSource"] !== undefined) {
          body["gitFileSource"] = g["gitFileSource"];
        }
        if (g["github"] !== undefined) body["github"] = g["github"];
        if (g["gitlabEnterpriseEventsConfig"] !== undefined) {
          body["gitlabEnterpriseEventsConfig"] =
            g["gitlabEnterpriseEventsConfig"];
        }
        if (g["ignoredFiles"] !== undefined) {
          body["ignoredFiles"] = g["ignoredFiles"];
        }
        if (g["includeBuildLogs"] !== undefined) {
          body["includeBuildLogs"] = g["includeBuildLogs"];
        }
        if (g["includedFiles"] !== undefined) {
          body["includedFiles"] = g["includedFiles"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pubsubConfig"] !== undefined) {
          body["pubsubConfig"] = g["pubsubConfig"];
        }
        if (g["repositoryEventConfig"] !== undefined) {
          body["repositoryEventConfig"] = g["repositoryEventConfig"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["sourceToBuild"] !== undefined) {
          body["sourceToBuild"] = g["sourceToBuild"];
        }
        if (g["substitutions"] !== undefined) {
          body["substitutions"] = g["substitutions"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["triggerTemplate"] !== undefined) {
          body["triggerTemplate"] = g["triggerTemplate"];
        }
        if (g["webhookConfig"] !== undefined) {
          body["webhookConfig"] = g["webhookConfig"];
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
      description: "Delete the triggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the triggers"),
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
      description: "Sync triggers state from GCP",
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
      description: "List triggers resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Number of results to return in the list.",
        ).optional(),
        projectId: z.string().describe(
          "Required. ID of the project for which to list BuildTriggers.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["projectId"] !== undefined) {
          params["projectId"] = String(args["projectId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "triggers",
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
    run: {
      description: "run",
      arguments: z.object({
        projectId: z.any().optional(),
        source: z.any().optional(),
        triggerId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        const body: Record<string, unknown> = {};
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        if (args["source"] !== undefined) body["source"] = args["source"];
        if (args["triggerId"] !== undefined) {
          body["triggerId"] = args["triggerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudbuild.projects.locations.triggers.run",
            "path": "v1/{+name}:run",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    webhook: {
      description: "webhook",
      arguments: z.object({
        contentType: z.any().optional(),
        data: z.any().optional(),
        extensions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        const body: Record<string, unknown> = {};
        if (args["contentType"] !== undefined) {
          body["contentType"] = args["contentType"];
        }
        if (args["data"] !== undefined) body["data"] = args["data"];
        if (args["extensions"] !== undefined) {
          body["extensions"] = args["extensions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudbuild.projects.locations.triggers.webhook",
            "path": "v1/{+name}:webhook",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "projectId": { "location": "query" },
              "secret": { "location": "query" },
              "trigger": { "location": "query" },
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
