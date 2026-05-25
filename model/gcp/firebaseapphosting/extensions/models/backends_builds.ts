// Auto-generated extension model for @swamp/gcp/firebaseapphosting/backends-builds
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase App Hosting Backends.Builds.
 *
 * A single build for a backend, at a specific point codebase reference tag and point in time. Encapsulates several resources, including an Artifact Registry container image, a Cloud Build invocation that built the image, and the Cloud Run revision that uses that image.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/builds/${shortName}`;
}

const BASE_URL = "https://firebaseapphosting.googleapis.com/";

const GET_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.builds.get",
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
  "id": "firebaseapphosting.projects.locations.backends.builds.create",
  "path": "v1/{+parent}/builds",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "buildId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.builds.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.builds.list",
  "path": "v1/{+parent}/builds",
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
    "showDeleted": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects.",
  ).optional(),
  config: z.object({
    effectiveEnv: z.array(z.object({
      availability: z.array(
        z.enum(["AVAILABILITY_UNSPECIFIED", "BUILD", "RUNTIME"]),
      ).describe(
        "Optional. Where this variable should be made available. If left unspecified, will be available in both BUILD and BACKEND.",
      ).optional(),
      origin: z.enum([
        "ORIGIN_UNSPECIFIED",
        "BACKEND_OVERRIDES",
        "BUILD_CONFIG",
        "APPHOSTING_YAML",
        "FIREBASE_SYSTEM",
      ]).describe(
        "Output only. The high-level origin category of the environment variable.",
      ).optional(),
      originFileName: z.string().describe(
        'Output only. Specific detail about the source. For APPHOSTING_YAML origins, this will contain the exact filename, such as "apphosting.yaml" or "apphosting.staging.yaml".',
      ).optional(),
      secret: z.string().describe(
        "A fully qualified secret version. The value of the secret will be accessed once while building the application and once per cold start of the container at runtime. The service account used by Cloud Build and by Cloud Run must each have the `secretmanager.versions.access` permission on the secret.",
      ).optional(),
      value: z.string().describe(
        "A plaintext value. This value is encrypted at rest, but all project readers can view the value when reading your backend configuration.",
      ).optional(),
      variable: z.string().describe(
        'Required. The name of the environment variable. The environment variables reserved by [Cloud Run](https://docs.cloud.google.com/run/docs/configuring/services/environment-variables#reserved) should not be set. Additionally, variable names cannot start with "X_FIREBASE_".',
      ).optional(),
    })).describe(
      "Output only. [OUTPUT_ONLY] This field represents all environment variables employed during both the build and runtime. This list reflects the result of merging variables from all sources (Backend.override_env, Build.Config.env, YAML, defaults, system). Each variable includes its `origin`",
    ).optional(),
    env: z.array(z.object({
      availability: z.array(
        z.enum(["AVAILABILITY_UNSPECIFIED", "BUILD", "RUNTIME"]),
      ).describe(
        "Optional. Where this variable should be made available. If left unspecified, will be available in both BUILD and BACKEND.",
      ).optional(),
      origin: z.enum([
        "ORIGIN_UNSPECIFIED",
        "BACKEND_OVERRIDES",
        "BUILD_CONFIG",
        "APPHOSTING_YAML",
        "FIREBASE_SYSTEM",
      ]).describe(
        "Output only. The high-level origin category of the environment variable.",
      ).optional(),
      originFileName: z.string().describe(
        'Output only. Specific detail about the source. For APPHOSTING_YAML origins, this will contain the exact filename, such as "apphosting.yaml" or "apphosting.staging.yaml".',
      ).optional(),
      secret: z.string().describe(
        "A fully qualified secret version. The value of the secret will be accessed once while building the application and once per cold start of the container at runtime. The service account used by Cloud Build and by Cloud Run must each have the `secretmanager.versions.access` permission on the secret.",
      ).optional(),
      value: z.string().describe(
        "A plaintext value. This value is encrypted at rest, but all project readers can view the value when reading your backend configuration.",
      ).optional(),
      variable: z.string().describe(
        'Required. The name of the environment variable. The environment variables reserved by [Cloud Run](https://docs.cloud.google.com/run/docs/configuring/services/environment-variables#reserved) should not be set. Additionally, variable names cannot start with "X_FIREBASE_".',
      ).optional(),
    })).describe(
      "Optional. Supplied environment variables for a specific build. Provided at Build creation time and immutable afterwards. This field is only applicable for Builds using a build image - (e.g., ContainerSource or ArchiveSource with locally_built_source) Attempts to set this for other build types will result in an error",
    ).optional(),
    runConfig: z.object({
      concurrency: z.number().int().describe(
        "Optional. Maximum number of requests that each Cloud Run instance can receive. By default, each instance can receive Cloud Run's default of up to 80 requests at the same time. Concurrency can be set to any integer value up to 1000.",
      ).optional(),
      cpu: z.number().describe(
        "Optional. Number of CPUs used for each serving instance. By default, cpu defaults to the Cloud Run's default of 1.0. CPU can be set to value 1, 2, 4, 6, or 8 CPUs, and for less than 1 CPU, a value from 0.08 to less than 1.00, in increments of 0.01. If you set a value of less than 1 CPU, you must set concurrency to 1, and CPU will only be allocated during request processing. Increasing CPUs limit may require increase in memory limits: - 4 CPUs: at least 2 GiB - 6 CPUs: at least 4 GiB - 8 CPUs: at least 4 GiB",
      ).optional(),
      maxInstances: z.number().int().describe(
        "Optional. Number of Cloud Run instances to maintain at maximum for each revision. By default, each Cloud Run [`service`](https://cloud.google.com/run/docs/reference/rest/v2/projects.locations.services#resource:-service) scales out to Cloud Run's default of a maximum of 100 instances. The maximum max_instances limit is based on your quota. See https://cloud.google.com/run/docs/configuring/max-instances#limits.",
      ).optional(),
      memoryMib: z.number().int().describe(
        "Optional. Amount of memory allocated for each serving instance in MiB. By default, memory defaults to the Cloud Run's default where each instance is allocated 512 MiB of memory. Memory can be set to any integer value between 128 to 32768. Increasing memory limit may require increase in CPUs limits: - Over 4 GiB: at least 2 CPUs - Over 8 GiB: at least 4 CPUs - Over 16 GiB: at least 6 CPUs - Over 24 GiB: at least 8 CPUs",
      ).optional(),
      minInstances: z.number().int().describe(
        "Optional. Number of Cloud Run instances to maintain at minimum for each Cloud Run Service. By default, there are no minimum. Even if the service splits traffic across multiple revisions, the total number of instances for a service will be capped at this value.",
      ).optional(),
    }).describe(
      "Configuration applied to the Cloud Run [`service`](https://cloud.google.com/run/docs/reference/rest/v2/projects.locations.services#resource:-service).",
    ).optional(),
  }).describe("Additional configuration of the backend for this build.")
    .optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name. 63 character limit.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that can be used to organize and categorize objects.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the build. Format: `projects/{project}/locations/{locationId}/backends/{backendId}/builds/{buildId}`.",
  ).optional(),
  source: z.object({
    archive: z.object({
      author: z.object({
        displayName: z.string().describe(
          "Output only. Deprecated: Not used. The user-chosen displayname. May be empty.",
        ).optional(),
        email: z.string().describe(
          "Output only. Deprecated: Not used. The account email linked to the EUC that created the build. May be a service account or other robot account.",
        ).optional(),
        imageUri: z.string().describe(
          "Output only. Deprecated: Not used. The URI of a profile photo associated with the user who created the build.",
        ).optional(),
      }).describe(
        "Deprecated: Not used. Metadata for the user who started the build.",
      ).optional(),
      description: z.string().describe(
        "Optional. An optional message that describes the uploaded version of the source code.",
      ).optional(),
      externalSignedUri: z.string().describe(
        "Signed URL to an archive in a storage bucket.",
      ).optional(),
      rootDirectory: z.string().describe(
        "Optional. The directory relative to the root of the archive to use as the root for the deployed web app. Defaults to use the root of the repository if not provided. If deploying a [monorepo](https://firebase.google.com/docs/app-hosting/monorepos), this should be the directory that contains the `package.json` or `apphosting.yaml` file.",
      ).optional(),
      userStorageUri: z.string().describe(
        "URI to an archive in Cloud Storage. The object must be a zipped (.zip) or gzipped archive file (.tar.gz) containing source to deploy.",
      ).optional(),
    }).describe(
      "The URI of an storage archive or a signed URL to use as the build source.",
    ).optional(),
    codebase: z.object({
      author: z.object({
        displayName: z.string().describe(
          "Output only. The 'name' field in a Git user's git.config. Required by Git.",
        ).optional(),
        email: z.string().describe(
          "Output only. The 'email' field in a Git user's git.config, if available.",
        ).optional(),
        imageUri: z.string().describe(
          "Output only. The URI of an image file associated with the user's account in an external source control provider, if available.",
        ).optional(),
      }).describe(
        "Version control metadata for a user associated with a resolved codebase. Currently assumes a Git user.",
      ).optional(),
      branch: z.string().describe(
        "The branch in the codebase to build from, using the latest commit.",
      ).optional(),
      commit: z.string().describe("The commit in the codebase to build from.")
        .optional(),
      commitMessage: z.string().describe(
        "Output only. The message of a codebase change.",
      ).optional(),
      commitTime: z.string().describe(
        "Output only. The time the change was made.",
      ).optional(),
      displayName: z.string().describe(
        "Output only. The human-friendly name to use for this Codebase when displaying a build. We use the first eight characters of the SHA-1 hash for GitHub.com.",
      ).optional(),
      hash: z.string().describe(
        "Output only. The full SHA-1 hash of a Git commit, if available.",
      ).optional(),
      repository: z.string().describe(
        "Output only. The resource name for the Developer Connect [`gitRepositoryLink`](https://cloud.google.com/developer-connect/docs/api/reference/rest/v1/projects.locations.connections.gitRepositoryLinks) used for this build, in the format: `projects/{project}/locations/{location}/connections/{connection}/gitRepositoryLinks/{repositoryLink}`",
      ).optional(),
      uri: z.string().describe(
        "Output only. A URI linking to the codebase on an hosting provider's website. May not be valid if the commit has been rebased or force-pushed out of existence in the linked repository.",
      ).optional(),
    }).describe(
      "A codebase source, representing the state of the codebase that the build will be created at.",
    ).optional(),
    container: z.object({
      image: z.string().describe(
        "Required. A URI representing a container for the backend to use.",
      ).optional(),
    }).describe(
      "The URI of an Artifact Registry [container image](https://cloud.google.com/artifact-registry/docs/reference/rest/v1/projects.locations.repositories.dockerImages) to use as the build source.",
    ).optional(),
  }).describe("The source for the build.").optional(),
  buildId: z.string().describe(
    "Required. Desired ID of the build being created.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  buildLogsUri: z.string().optional(),
  config: z.object({
    effectiveEnv: z.array(z.object({
      availability: z.array(z.string()),
      origin: z.string(),
      originFileName: z.string(),
      secret: z.string(),
      value: z.string(),
      variable: z.string(),
    })),
    env: z.array(z.object({
      availability: z.array(z.string()),
      origin: z.string(),
      originFileName: z.string(),
      secret: z.string(),
      value: z.string(),
      variable: z.string(),
    })),
    runConfig: z.object({
      concurrency: z.number(),
      cpu: z.number(),
      maxInstances: z.number(),
      memoryMib: z.number(),
      minInstances: z.number(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  environment: z.string().optional(),
  errors: z.array(z.object({
    cloudResource: z.string(),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    errorSource: z.string(),
  })).optional(),
  etag: z.string().optional(),
  image: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  source: z.object({
    archive: z.object({
      author: z.object({
        displayName: z.string(),
        email: z.string(),
        imageUri: z.string(),
      }),
      description: z.string(),
      externalSignedUri: z.string(),
      rootDirectory: z.string(),
      userStorageUri: z.string(),
    }),
    codebase: z.object({
      author: z.object({
        displayName: z.string(),
        email: z.string(),
        imageUri: z.string(),
      }),
      branch: z.string(),
      commit: z.string(),
      commitMessage: z.string(),
      commitTime: z.string(),
      displayName: z.string(),
      hash: z.string(),
      repository: z.string(),
      uri: z.string(),
    }),
    container: z.object({
      image: z.string(),
    }),
  }).optional(),
  state: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects.",
  ).optional(),
  config: z.object({
    effectiveEnv: z.array(z.object({
      availability: z.array(
        z.enum(["AVAILABILITY_UNSPECIFIED", "BUILD", "RUNTIME"]),
      ).describe(
        "Optional. Where this variable should be made available. If left unspecified, will be available in both BUILD and BACKEND.",
      ).optional(),
      origin: z.enum([
        "ORIGIN_UNSPECIFIED",
        "BACKEND_OVERRIDES",
        "BUILD_CONFIG",
        "APPHOSTING_YAML",
        "FIREBASE_SYSTEM",
      ]).describe(
        "Output only. The high-level origin category of the environment variable.",
      ).optional(),
      originFileName: z.string().describe(
        'Output only. Specific detail about the source. For APPHOSTING_YAML origins, this will contain the exact filename, such as "apphosting.yaml" or "apphosting.staging.yaml".',
      ).optional(),
      secret: z.string().describe(
        "A fully qualified secret version. The value of the secret will be accessed once while building the application and once per cold start of the container at runtime. The service account used by Cloud Build and by Cloud Run must each have the `secretmanager.versions.access` permission on the secret.",
      ).optional(),
      value: z.string().describe(
        "A plaintext value. This value is encrypted at rest, but all project readers can view the value when reading your backend configuration.",
      ).optional(),
      variable: z.string().describe(
        'Required. The name of the environment variable. The environment variables reserved by [Cloud Run](https://docs.cloud.google.com/run/docs/configuring/services/environment-variables#reserved) should not be set. Additionally, variable names cannot start with "X_FIREBASE_".',
      ).optional(),
    })).describe(
      "Output only. [OUTPUT_ONLY] This field represents all environment variables employed during both the build and runtime. This list reflects the result of merging variables from all sources (Backend.override_env, Build.Config.env, YAML, defaults, system). Each variable includes its `origin`",
    ).optional(),
    env: z.array(z.object({
      availability: z.array(
        z.enum(["AVAILABILITY_UNSPECIFIED", "BUILD", "RUNTIME"]),
      ).describe(
        "Optional. Where this variable should be made available. If left unspecified, will be available in both BUILD and BACKEND.",
      ).optional(),
      origin: z.enum([
        "ORIGIN_UNSPECIFIED",
        "BACKEND_OVERRIDES",
        "BUILD_CONFIG",
        "APPHOSTING_YAML",
        "FIREBASE_SYSTEM",
      ]).describe(
        "Output only. The high-level origin category of the environment variable.",
      ).optional(),
      originFileName: z.string().describe(
        'Output only. Specific detail about the source. For APPHOSTING_YAML origins, this will contain the exact filename, such as "apphosting.yaml" or "apphosting.staging.yaml".',
      ).optional(),
      secret: z.string().describe(
        "A fully qualified secret version. The value of the secret will be accessed once while building the application and once per cold start of the container at runtime. The service account used by Cloud Build and by Cloud Run must each have the `secretmanager.versions.access` permission on the secret.",
      ).optional(),
      value: z.string().describe(
        "A plaintext value. This value is encrypted at rest, but all project readers can view the value when reading your backend configuration.",
      ).optional(),
      variable: z.string().describe(
        'Required. The name of the environment variable. The environment variables reserved by [Cloud Run](https://docs.cloud.google.com/run/docs/configuring/services/environment-variables#reserved) should not be set. Additionally, variable names cannot start with "X_FIREBASE_".',
      ).optional(),
    })).describe(
      "Optional. Supplied environment variables for a specific build. Provided at Build creation time and immutable afterwards. This field is only applicable for Builds using a build image - (e.g., ContainerSource or ArchiveSource with locally_built_source) Attempts to set this for other build types will result in an error",
    ).optional(),
    runConfig: z.object({
      concurrency: z.number().int().describe(
        "Optional. Maximum number of requests that each Cloud Run instance can receive. By default, each instance can receive Cloud Run's default of up to 80 requests at the same time. Concurrency can be set to any integer value up to 1000.",
      ).optional(),
      cpu: z.number().describe(
        "Optional. Number of CPUs used for each serving instance. By default, cpu defaults to the Cloud Run's default of 1.0. CPU can be set to value 1, 2, 4, 6, or 8 CPUs, and for less than 1 CPU, a value from 0.08 to less than 1.00, in increments of 0.01. If you set a value of less than 1 CPU, you must set concurrency to 1, and CPU will only be allocated during request processing. Increasing CPUs limit may require increase in memory limits: - 4 CPUs: at least 2 GiB - 6 CPUs: at least 4 GiB - 8 CPUs: at least 4 GiB",
      ).optional(),
      maxInstances: z.number().int().describe(
        "Optional. Number of Cloud Run instances to maintain at maximum for each revision. By default, each Cloud Run [`service`](https://cloud.google.com/run/docs/reference/rest/v2/projects.locations.services#resource:-service) scales out to Cloud Run's default of a maximum of 100 instances. The maximum max_instances limit is based on your quota. See https://cloud.google.com/run/docs/configuring/max-instances#limits.",
      ).optional(),
      memoryMib: z.number().int().describe(
        "Optional. Amount of memory allocated for each serving instance in MiB. By default, memory defaults to the Cloud Run's default where each instance is allocated 512 MiB of memory. Memory can be set to any integer value between 128 to 32768. Increasing memory limit may require increase in CPUs limits: - Over 4 GiB: at least 2 CPUs - Over 8 GiB: at least 4 CPUs - Over 16 GiB: at least 6 CPUs - Over 24 GiB: at least 8 CPUs",
      ).optional(),
      minInstances: z.number().int().describe(
        "Optional. Number of Cloud Run instances to maintain at minimum for each Cloud Run Service. By default, there are no minimum. Even if the service splits traffic across multiple revisions, the total number of instances for a service will be capped at this value.",
      ).optional(),
    }).describe(
      "Configuration applied to the Cloud Run [`service`](https://cloud.google.com/run/docs/reference/rest/v2/projects.locations.services#resource:-service).",
    ).optional(),
  }).describe("Additional configuration of the backend for this build.")
    .optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name. 63 character limit.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that can be used to organize and categorize objects.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the build. Format: `projects/{project}/locations/{locationId}/backends/{backendId}/builds/{buildId}`.",
  ).optional(),
  source: z.object({
    archive: z.object({
      author: z.object({
        displayName: z.string().describe(
          "Output only. Deprecated: Not used. The user-chosen displayname. May be empty.",
        ).optional(),
        email: z.string().describe(
          "Output only. Deprecated: Not used. The account email linked to the EUC that created the build. May be a service account or other robot account.",
        ).optional(),
        imageUri: z.string().describe(
          "Output only. Deprecated: Not used. The URI of a profile photo associated with the user who created the build.",
        ).optional(),
      }).describe(
        "Deprecated: Not used. Metadata for the user who started the build.",
      ).optional(),
      description: z.string().describe(
        "Optional. An optional message that describes the uploaded version of the source code.",
      ).optional(),
      externalSignedUri: z.string().describe(
        "Signed URL to an archive in a storage bucket.",
      ).optional(),
      rootDirectory: z.string().describe(
        "Optional. The directory relative to the root of the archive to use as the root for the deployed web app. Defaults to use the root of the repository if not provided. If deploying a [monorepo](https://firebase.google.com/docs/app-hosting/monorepos), this should be the directory that contains the `package.json` or `apphosting.yaml` file.",
      ).optional(),
      userStorageUri: z.string().describe(
        "URI to an archive in Cloud Storage. The object must be a zipped (.zip) or gzipped archive file (.tar.gz) containing source to deploy.",
      ).optional(),
    }).describe(
      "The URI of an storage archive or a signed URL to use as the build source.",
    ).optional(),
    codebase: z.object({
      author: z.object({
        displayName: z.string().describe(
          "Output only. The 'name' field in a Git user's git.config. Required by Git.",
        ).optional(),
        email: z.string().describe(
          "Output only. The 'email' field in a Git user's git.config, if available.",
        ).optional(),
        imageUri: z.string().describe(
          "Output only. The URI of an image file associated with the user's account in an external source control provider, if available.",
        ).optional(),
      }).describe(
        "Version control metadata for a user associated with a resolved codebase. Currently assumes a Git user.",
      ).optional(),
      branch: z.string().describe(
        "The branch in the codebase to build from, using the latest commit.",
      ).optional(),
      commit: z.string().describe("The commit in the codebase to build from.")
        .optional(),
      commitMessage: z.string().describe(
        "Output only. The message of a codebase change.",
      ).optional(),
      commitTime: z.string().describe(
        "Output only. The time the change was made.",
      ).optional(),
      displayName: z.string().describe(
        "Output only. The human-friendly name to use for this Codebase when displaying a build. We use the first eight characters of the SHA-1 hash for GitHub.com.",
      ).optional(),
      hash: z.string().describe(
        "Output only. The full SHA-1 hash of a Git commit, if available.",
      ).optional(),
      repository: z.string().describe(
        "Output only. The resource name for the Developer Connect [`gitRepositoryLink`](https://cloud.google.com/developer-connect/docs/api/reference/rest/v1/projects.locations.connections.gitRepositoryLinks) used for this build, in the format: `projects/{project}/locations/{location}/connections/{connection}/gitRepositoryLinks/{repositoryLink}`",
      ).optional(),
      uri: z.string().describe(
        "Output only. A URI linking to the codebase on an hosting provider's website. May not be valid if the commit has been rebased or force-pushed out of existence in the linked repository.",
      ).optional(),
    }).describe(
      "A codebase source, representing the state of the codebase that the build will be created at.",
    ).optional(),
    container: z.object({
      image: z.string().describe(
        "Required. A URI representing a container for the backend to use.",
      ).optional(),
    }).describe(
      "The URI of an Artifact Registry [container image](https://cloud.google.com/artifact-registry/docs/reference/rest/v1/projects.locations.repositories.dockerImages) to use as the build source.",
    ).optional(),
  }).describe("The source for the build.").optional(),
  buildId: z.string().describe(
    "Required. Desired ID of the build being created.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firebase App Hosting Backends.Builds. Registered at `@swamp/gcp/firebaseapphosting/backends-builds`. */
export const model = {
  type: "@swamp/gcp/firebaseapphosting/backends-builds",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A single build for a backend, at a specific point codebase reference tag and ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a builds",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["buildId"] !== undefined) body["buildId"] = g["buildId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a builds",
      arguments: z.object({
        identifier: z.string().describe("The name of the builds"),
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
    delete: {
      description: "Delete the builds",
      arguments: z.object({
        identifier: z.string().describe("The name of the builds"),
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
      description: "Sync builds state from GCP",
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
    list: {
      description: "List builds resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. A filter to narrow down results to a preferred subset. Learn more about filtering in Google's [AIP 160 standard](https://google.aip.dev/160).",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Hint for how to order the results. Supported fields are `name` and `createTime`. To specify descending order, append a `desc` suffix.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of results to return. If not set, the service selects a default.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Optional. If true, the request returns soft-deleted resources that haven't been fully-deleted yet.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "builds",
          (args.maxPages as number | undefined) ?? 10,
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
