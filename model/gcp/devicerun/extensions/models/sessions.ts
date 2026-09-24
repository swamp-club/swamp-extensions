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

// Auto-generated extension model for @swamp/gcp/devicerun/sessions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Device Run Sessions.
 *
 * A session resource in the AutomationSession API. At a high level, `Session` describes the configuration of one or multiple jobs, the state transitions it goes through, and the results.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/sessions/${shortName}`;
}

const BASE_URL = "https://devicerun.googleapis.com/";

const GET_CONFIG = {
  "id": "devicerun.projects.locations.sessions.get",
  "path": "v1alpha/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
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
  "id": "devicerun.projects.locations.sessions.create",
  "path": "v1alpha/{+parent}/sessions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "sessionId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "devicerun.projects.locations.sessions.delete",
  "path": "v1alpha/{+name}",
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
  "id": "devicerun.projects.locations.sessions.list",
  "path": "v1alpha/{+parent}/sessions",
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
  name: z.string().describe(
    "Identifier. The resource name of the session. Format: `projects/{project}/locations/{location}/sessions/{session}`.",
  ).optional(),
  sessionConfig: z.object({
    displayName: z.string().describe(
      "Optional. User-settable, human-readable name for the session. Maximum size is 63 bytes when encoded as UTF-8. If set, must match regex: `^A-Za-z0-9*$`.",
    ).optional(),
    jobConfigs: z.array(z.object({
      action: z.object({
        androidInstrumentationTest: z.object({
          additionalTestOptions: z.unknown().describe(
            "Optional. Additional test options to pass to the test runner. Passed to `am instrument` command as `-e` options, which will be passed to the instrumentation test runner using its `onCreate()` method. Formats supported in test_targets are not allowed to be used here. Limits: - Maximum number of entries: 32. - Maximum key size: 64 bytes (UTF-8). - Maximum value size: 1024 bytes (UTF-8).",
          ).optional(),
          enableCodeCoverage: z.unknown().describe(
            "Optional. Whether to enable code coverage collection for the test. A coverage file `coverage.ec` will be uploaded to the results folder. For this to work, your classes have to be instrumented offline (build time) by EMMA/JaCoCo.",
          ).optional(),
          instrumentationTimeout: z.unknown().describe(
            "Optional. The timeout of the instrumentation test. Default value: 5 min. Range: [1 min, 3 hours].",
          ).optional(),
          orchestratorVersion: z.unknown().describe(
            'Optional. The version of the Android Test Orchestrator to use for the test. The available orchestrator versions can be retrieved from the catalog service. If set to "auto", the default orchestrator is used. If not set, no orchestrator is used.',
          ).optional(),
          smartSharding: z.unknown().describe(
            "Optional. Smart sharding strategy to split the job into multiple shards based on the test methods and their execution time.",
          ).optional(),
          testInstallable: z.unknown().describe(
            "Required. The test package to install and run the test.",
          ).optional(),
          testRunnerClass: z.unknown().describe(
            "Optional. Full class name of the test runner class. The class must be `androidx.test.runner.AndroidJUnitRunner` or a subclass of it. The default value is determined by examining the application's manifest. If multiple instrumentations are found, the first one in the manifest will be used.",
          ).optional(),
          testTargets: z.unknown().describe(
            "Optional. A list of test targets or target filters to run. Each target must be fully qualified with the package name or class name, in one of these formats: - `package package_name` - `notPackage com.package.to.skip` - `class package_name.class_name` - `class package_name.class_name#method_name` - `notClass com.foo.ClassToSkip` - `notClass com.foo.ClassName#testMethodToSkip` - `annotation com.foo.AnnotationToRun` - `notAnnotation com.foo.AnnotationToSkip` - `size [small|medium|large]` Formats like `testfile` or `notTestfile` won't be supported. If empty, all targets in the module will be run. Limits: - Maximum number of entries: 1024.",
          ).optional(),
          uniformSharding: z.unknown().describe(
            "Optional. Uniform sharding strategy to split the job into multiple shards with equal number of test methods.",
          ).optional(),
        }).describe("Android instrumentation test.").optional(),
        androidNativeBinary: z.object({
          androidNativeBinary: z.unknown().describe(
            "Required. The file path of the Android native binary.",
          ).optional(),
          args: z.unknown().describe(
            "Optional. Arguments for running the binary file. The flags will be appended to the command line that invokes the binary. The number of options is limited to 100.",
          ).optional(),
          envVars: z.unknown().describe(
            "Optional. A map of environment variables to set for the binary process. The keys are the variable names and the values are the variable values. The maximum number of entries is 100. Each key is limited to 128 characters and must conform to POSIX standards. Each value is limited to 2048 characters. The total size of all environment variables must not exceed 16 KiB.",
          ).optional(),
          executionTimeout: z.unknown().describe(
            "Optional. The timeout of the execution. Default value: 5 min. Range: [1 min, 3 hours].",
          ).optional(),
        }).describe("Android native binary execution.").optional(),
        iosXcTest: z.object({
          testsZip: z.unknown().describe(
            "Required. The.zip containing the.xctestrun file and the contents of the DerivedData/Build/Products directory.",
          ).optional(),
          xcTestTimeout: z.unknown().describe(
            "Optional. The timeout of the test. Default value: 5 min. Range: [1 min, 3 hours].",
          ).optional(),
          xcodeVersion: z.unknown().describe(
            "Optional. The Xcode version that should be used for the test. If not set, a system-default Xcode version is used. The available Xcode versions can be retrieved from the catalog service.",
          ).optional(),
          xctestrun: z.unknown().describe(
            "Optional. An.xctestrun file that will override the.xctestrun file in the tests zip.",
          ).optional(),
        }).describe("iOS XCTest.").optional(),
      }).describe("Required. Job action.").optional(),
      allocationConfig: z.object({
        deviceConfigs: z.array(z.unknown()).describe(
          "Required. At least one device config is required. If more than one device config is required, the multiple devices are allocated to each shard of the OmniLab job to run multi-device-interaction tests.",
        ).optional(),
      }).describe("Required. Allocation config.").optional(),
      displayName: z.string().describe(
        "Optional. User-settable, human-readable name for the job. If set, it must be unique within the session. If not set, the display name will default to `job-`, where `` is the 0-based index of the job in the session formatted as three digits (e.g., job-000, job-001,...). Maximum size is 63 bytes when encoded as UTF-8. If set, must match regex: `^A-Za-z0-9*$`.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined metadata for tracking or categorization. These labels do not affect job execution and are surfaced in the JobReport. Limits: - Maximum number of entries: 16. - Maximum key size: 32 bytes (UTF-8). - Maximum value size: 1024 bytes (UTF-8).",
      ).optional(),
      settings: z.object({
        retrySettings: z.object({
          flakyTestRetryStrategy: z.unknown().describe(
            "Optional. The default retry strategy. Allows an Execution to retry on test failures and infrastructure errors.",
          ).optional(),
        }).describe("Optional. The retry settings of the job.").optional(),
      }).describe("Optional. Job settings.").optional(),
    })).describe("Required. Configs of the jobs in the session.").optional(),
    notificationConfig: z.object({
      pubsubTopic: z.array(z.string()).describe(
        "Optional. The Pub/Sub topics to which session events are published. Format: `projects/{project}/topics/{topic}`. See https://cloud.google.com/pubsub/docs/admin#topic_and_subscription_name_restrictions",
      ).optional(),
    }).describe("Optional. Notification config for the session.").optional(),
    outputDirectoryConfig: z.object({
      flatDirectoryStructure: z.boolean().describe(
        "Optional. Whether to write output files directly under the output directory instead of nesting them under service-generated subdirectories. By default (`false`), output files are stored under `////`. When `true`, the session ID subdirectory is never appended, and the job display name subdirectory is appended only when the session has more than one job. Output files are therefore stored under: - `//` for a single-job session. - `///` for a multi-job session. Set this to `true` when the output directory is already unique per session (for example, when a CI system generates it), to avoid redundant nesting.",
      ).optional(),
      gcsOutputDirectory: z.object({
        path: z.string().describe(
          "Required. The Google Cloud Storage path of the file or directory. Format: `gs:///`.",
        ).optional(),
      }).describe(
        "The Google Cloud Storage path of the output directory (e.g. `gs://my-bucket/output`). The bucket must exist. If the bucket is located in another project or uses fine-grained access controls, ensure the Device Run Service Agent of the project (`service-@gcp-sa-devicerun.iam.gserviceaccount.com`) is granted access to the bucket (such as `roles/storage.objectUser`).",
      ).optional(),
    }).describe("Required. Output file directory config for the session.")
      .optional(),
  }).describe("Required. Configuration used to create the session.").optional(),
  requestId: z.string().describe(
    "Optional. A unique identifier for this request. This request is only idempotent if a `request_id` is provided, i.e. if a request with the same `request_id` is received, then the previous result will be returned. The server will guarantee that for at least 60 minutes after the first request. The value must be a UUID (e.g., 123e4567-e89b-12d3-a456-426655440000). See github.com/google/uuid for more details.",
  ).optional(),
  sessionId: z.string().describe(
    "Optional. The ID to use for the session, which will become the final component of the resource name. If not provided, the server will generate a value for this field. When provided, this value must be between 4 and 63 characters, and match the following regex: ^a-z{2,61}[a-z0-9]$.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  name: z.string(),
  sessionConfig: z.object({
    displayName: z.string(),
    jobConfigs: z.array(z.object({
      action: z.object({
        androidInstrumentationTest: z.object({
          additionalTestOptions: z.unknown(),
          enableCodeCoverage: z.unknown(),
          instrumentationTimeout: z.unknown(),
          orchestratorVersion: z.unknown(),
          smartSharding: z.unknown(),
          testInstallable: z.unknown(),
          testRunnerClass: z.unknown(),
          testTargets: z.unknown(),
          uniformSharding: z.unknown(),
        }),
        androidNativeBinary: z.object({
          androidNativeBinary: z.unknown(),
          args: z.unknown(),
          envVars: z.unknown(),
          executionTimeout: z.unknown(),
        }),
        iosXcTest: z.object({
          testsZip: z.unknown(),
          xcTestTimeout: z.unknown(),
          xcodeVersion: z.unknown(),
          xctestrun: z.unknown(),
        }),
      }),
      allocationConfig: z.object({
        deviceConfigs: z.array(z.unknown()),
      }),
      displayName: z.string(),
      labels: z.record(z.string(), z.unknown()),
      settings: z.object({
        retrySettings: z.object({
          flakyTestRetryStrategy: z.unknown(),
        }),
      }),
    })),
    notificationConfig: z.object({
      pubsubTopic: z.array(z.string()),
    }),
    outputDirectoryConfig: z.object({
      flatDirectoryStructure: z.boolean(),
      gcsOutputDirectory: z.object({
        path: z.string(),
      }),
    }),
  }).optional(),
  sessionReport: z.object({
    endTime: z.string(),
    id: z.string(),
    jobReports: z.array(z.object({
      displayName: z.string(),
      endTime: z.string(),
      executionReports: z.array(z.object({
        displayName: z.unknown(),
        endTime: z.unknown(),
        id: z.unknown(),
        outputFiles: z.unknown(),
        result: z.unknown(),
        startTime: z.unknown(),
        status: z.unknown(),
        warnings: z.unknown(),
      })),
      id: z.string(),
      labels: z.record(z.string(), z.unknown()),
      outputFiles: z.array(z.object({
        gcsOutputFile: z.unknown(),
      })),
      result: z.object({
        cause: z.object({
          summary: z.unknown(),
        }),
        resultType: z.string(),
      }),
      startTime: z.string(),
      status: z.object({
        progressMessages: z.array(z.unknown()),
        statusType: z.string(),
      }),
      warnings: z.array(z.object({
        summary: z.unknown(),
      })),
    })),
    result: z.object({
      cause: z.object({
        summary: z.object({
          message: z.string(),
          reason: z.string(),
          type: z.string(),
        }),
      }),
      resultType: z.string(),
    }),
    startTime: z.string(),
    status: z.object({
      progressMessages: z.array(z.string()),
      statusType: z.string(),
    }),
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
  name: z.string().describe(
    "Identifier. The resource name of the session. Format: `projects/{project}/locations/{location}/sessions/{session}`.",
  ).optional(),
  sessionConfig: z.object({
    displayName: z.string().describe(
      "Optional. User-settable, human-readable name for the session. Maximum size is 63 bytes when encoded as UTF-8. If set, must match regex: `^A-Za-z0-9*$`.",
    ).optional(),
    jobConfigs: z.array(z.object({
      action: z.object({
        androidInstrumentationTest: z.object({
          additionalTestOptions: z.unknown().describe(
            "Optional. Additional test options to pass to the test runner. Passed to `am instrument` command as `-e` options, which will be passed to the instrumentation test runner using its `onCreate()` method. Formats supported in test_targets are not allowed to be used here. Limits: - Maximum number of entries: 32. - Maximum key size: 64 bytes (UTF-8). - Maximum value size: 1024 bytes (UTF-8).",
          ).optional(),
          enableCodeCoverage: z.unknown().describe(
            "Optional. Whether to enable code coverage collection for the test. A coverage file `coverage.ec` will be uploaded to the results folder. For this to work, your classes have to be instrumented offline (build time) by EMMA/JaCoCo.",
          ).optional(),
          instrumentationTimeout: z.unknown().describe(
            "Optional. The timeout of the instrumentation test. Default value: 5 min. Range: [1 min, 3 hours].",
          ).optional(),
          orchestratorVersion: z.unknown().describe(
            'Optional. The version of the Android Test Orchestrator to use for the test. The available orchestrator versions can be retrieved from the catalog service. If set to "auto", the default orchestrator is used. If not set, no orchestrator is used.',
          ).optional(),
          smartSharding: z.unknown().describe(
            "Optional. Smart sharding strategy to split the job into multiple shards based on the test methods and their execution time.",
          ).optional(),
          testInstallable: z.unknown().describe(
            "Required. The test package to install and run the test.",
          ).optional(),
          testRunnerClass: z.unknown().describe(
            "Optional. Full class name of the test runner class. The class must be `androidx.test.runner.AndroidJUnitRunner` or a subclass of it. The default value is determined by examining the application's manifest. If multiple instrumentations are found, the first one in the manifest will be used.",
          ).optional(),
          testTargets: z.unknown().describe(
            "Optional. A list of test targets or target filters to run. Each target must be fully qualified with the package name or class name, in one of these formats: - `package package_name` - `notPackage com.package.to.skip` - `class package_name.class_name` - `class package_name.class_name#method_name` - `notClass com.foo.ClassToSkip` - `notClass com.foo.ClassName#testMethodToSkip` - `annotation com.foo.AnnotationToRun` - `notAnnotation com.foo.AnnotationToSkip` - `size [small|medium|large]` Formats like `testfile` or `notTestfile` won't be supported. If empty, all targets in the module will be run. Limits: - Maximum number of entries: 1024.",
          ).optional(),
          uniformSharding: z.unknown().describe(
            "Optional. Uniform sharding strategy to split the job into multiple shards with equal number of test methods.",
          ).optional(),
        }).describe("Android instrumentation test.").optional(),
        androidNativeBinary: z.object({
          androidNativeBinary: z.unknown().describe(
            "Required. The file path of the Android native binary.",
          ).optional(),
          args: z.unknown().describe(
            "Optional. Arguments for running the binary file. The flags will be appended to the command line that invokes the binary. The number of options is limited to 100.",
          ).optional(),
          envVars: z.unknown().describe(
            "Optional. A map of environment variables to set for the binary process. The keys are the variable names and the values are the variable values. The maximum number of entries is 100. Each key is limited to 128 characters and must conform to POSIX standards. Each value is limited to 2048 characters. The total size of all environment variables must not exceed 16 KiB.",
          ).optional(),
          executionTimeout: z.unknown().describe(
            "Optional. The timeout of the execution. Default value: 5 min. Range: [1 min, 3 hours].",
          ).optional(),
        }).describe("Android native binary execution.").optional(),
        iosXcTest: z.object({
          testsZip: z.unknown().describe(
            "Required. The.zip containing the.xctestrun file and the contents of the DerivedData/Build/Products directory.",
          ).optional(),
          xcTestTimeout: z.unknown().describe(
            "Optional. The timeout of the test. Default value: 5 min. Range: [1 min, 3 hours].",
          ).optional(),
          xcodeVersion: z.unknown().describe(
            "Optional. The Xcode version that should be used for the test. If not set, a system-default Xcode version is used. The available Xcode versions can be retrieved from the catalog service.",
          ).optional(),
          xctestrun: z.unknown().describe(
            "Optional. An.xctestrun file that will override the.xctestrun file in the tests zip.",
          ).optional(),
        }).describe("iOS XCTest.").optional(),
      }).describe("Required. Job action.").optional(),
      allocationConfig: z.object({
        deviceConfigs: z.array(z.unknown()).describe(
          "Required. At least one device config is required. If more than one device config is required, the multiple devices are allocated to each shard of the OmniLab job to run multi-device-interaction tests.",
        ).optional(),
      }).describe("Required. Allocation config.").optional(),
      displayName: z.string().describe(
        "Optional. User-settable, human-readable name for the job. If set, it must be unique within the session. If not set, the display name will default to `job-`, where `` is the 0-based index of the job in the session formatted as three digits (e.g., job-000, job-001,...). Maximum size is 63 bytes when encoded as UTF-8. If set, must match regex: `^A-Za-z0-9*$`.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. User-defined metadata for tracking or categorization. These labels do not affect job execution and are surfaced in the JobReport. Limits: - Maximum number of entries: 16. - Maximum key size: 32 bytes (UTF-8). - Maximum value size: 1024 bytes (UTF-8).",
      ).optional(),
      settings: z.object({
        retrySettings: z.object({
          flakyTestRetryStrategy: z.unknown().describe(
            "Optional. The default retry strategy. Allows an Execution to retry on test failures and infrastructure errors.",
          ).optional(),
        }).describe("Optional. The retry settings of the job.").optional(),
      }).describe("Optional. Job settings.").optional(),
    })).describe("Required. Configs of the jobs in the session.").optional(),
    notificationConfig: z.object({
      pubsubTopic: z.array(z.string()).describe(
        "Optional. The Pub/Sub topics to which session events are published. Format: `projects/{project}/topics/{topic}`. See https://cloud.google.com/pubsub/docs/admin#topic_and_subscription_name_restrictions",
      ).optional(),
    }).describe("Optional. Notification config for the session.").optional(),
    outputDirectoryConfig: z.object({
      flatDirectoryStructure: z.boolean().describe(
        "Optional. Whether to write output files directly under the output directory instead of nesting them under service-generated subdirectories. By default (`false`), output files are stored under `////`. When `true`, the session ID subdirectory is never appended, and the job display name subdirectory is appended only when the session has more than one job. Output files are therefore stored under: - `//` for a single-job session. - `///` for a multi-job session. Set this to `true` when the output directory is already unique per session (for example, when a CI system generates it), to avoid redundant nesting.",
      ).optional(),
      gcsOutputDirectory: z.object({
        path: z.string().describe(
          "Required. The Google Cloud Storage path of the file or directory. Format: `gs:///`.",
        ).optional(),
      }).describe(
        "The Google Cloud Storage path of the output directory (e.g. `gs://my-bucket/output`). The bucket must exist. If the bucket is located in another project or uses fine-grained access controls, ensure the Device Run Service Agent of the project (`service-@gcp-sa-devicerun.iam.gserviceaccount.com`) is granted access to the bucket (such as `roles/storage.objectUser`).",
      ).optional(),
    }).describe("Required. Output file directory config for the session.")
      .optional(),
  }).describe("Required. Configuration used to create the session.").optional(),
  requestId: z.string().describe(
    "Optional. A unique identifier for this request. This request is only idempotent if a `request_id` is provided, i.e. if a request with the same `request_id` is received, then the previous result will be returned. The server will guarantee that for at least 60 minutes after the first request. The value must be a UUID (e.g., 123e4567-e89b-12d3-a456-426655440000). See github.com/google/uuid for more details.",
  ).optional(),
  sessionId: z.string().describe(
    "Optional. The ID to use for the session, which will become the final component of the resource name. If not provided, the server will generate a value for this field. When provided, this value must be between 4 and 63 characters, and match the following regex: ^a-z{2,61}[a-z0-9]$.",
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

/** Swamp extension model for Google Cloud Device Run Sessions. Registered at `@swamp/gcp/devicerun/sessions`. */
export const model = {
  type: "@swamp/gcp/devicerun/sessions",
  version: "2026.09.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A session resource in the AutomationSession API. At a high level, `Session` d...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sessions",
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
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sessionConfig"] !== undefined) {
          body["sessionConfig"] = g["sessionConfig"];
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["sessionId"] !== undefined) {
          params["sessionId"] = String(g["sessionId"]);
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
      description: "Get a sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
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
    delete: {
      description: "Delete the sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
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
      description: "Sync sessions state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific sessions by name (e.g. one discovered by list)",
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
      description: "List sessions resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. The raw filter text to constrain the results.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. The order to sort results by. Supported values: `name`, `name desc`, `create_time`, `create_time desc`. Values must use the snake_case field name; `createTime` is not accepted. Ordering by `create_time` is not supported when listing across all locations (`locations/-`). If unspecified, results are returned in an unspecified order.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of sessions to return. The server may return fewer items than this value. If unspecified, at most 500 sessions will be returned. The maximum value is 1000, values above will be coerced to 1000.",
        ).optional(),
        view: z.string().describe(
          "Optional. The view of the sessions to return. If not set, the `BASIC` view will be returned.",
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
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "sessions",
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
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          baseUrl,
          {
            "id": "devicerun.projects.locations.sessions.cancel",
            "path": "v1alpha/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
