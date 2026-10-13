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

// Auto-generated extension model for @swamp/gcp/aiplatform/reasoningengines
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform ReasoningEngines.
 *
 * ReasoningEngine provides a customizable runtime for models to determine which actions to take and in which order.
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
  return `${parent}/reasoningEngines/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.reasoningEngines.get",
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
  "id": "aiplatform.projects.locations.reasoningEngines.create",
  "path": "v1/{+parent}/reasoningEngines",
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
  "id": "aiplatform.projects.locations.reasoningEngines.patch",
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
  "id": "aiplatform.projects.locations.reasoningEngines.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "aiplatform.projects.locations.reasoningEngines.list",
  "path": "v1/{+parent}/reasoningEngines",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  contextSpec: z.object({
    memoryBankConfig: z.object({
      customizationConfigs: z.array(z.object({
        consolidationConfig: z.object({
          revisionsPerCandidateCount: z.unknown().describe(
            "Optional. Represents the maximum number of revisions to consider for each candidate memory. If not set, then the default value (1) will be used, which means that only the latest revision will be considered.",
          ).optional(),
        }).describe(
          "Optional. Represents configuration for customizing how memories are consolidated together.",
        ).optional(),
        disableNaturalLanguageMemories: z.boolean().describe(
          "Optional. Indicates whether natural language memory generation should be disabled for all requests. By default, natural language memory generation is enabled. Set this to `true` when you only want to generate structured memories.",
        ).optional(),
        enableThirdPersonMemories: z.boolean().describe(
          'Optional. Indicates whether the memories will be generated in the third person (i.e. "The user generates memories with Memory Bank."). By default, the memories will be generated in the first person (i.e. "I generate memories with Memory Bank.")',
        ).optional(),
        generateMemoriesExamples: z.array(z.unknown()).describe(
          "Optional. Provides examples of how to generate memories for a particular scope.",
        ).optional(),
        memoryTopics: z.array(z.unknown()).describe(
          "Optional. Represents topics of information that should be extracted from conversations and stored as memories. If not set, then Memory Bank's default topics will be used.",
        ).optional(),
        scopeKeys: z.array(z.unknown()).describe(
          "Optional. Represents the scope keys (i.e. 'user_id') for which to use this config. A request's scope must include all of the provided keys for the config to be used (order does not matter). If empty, then the config will be used for all requests that do not have a more specific config. Only one default config is allowed per Memory Bank.",
        ).optional(),
      })).describe(
        "Optional. Configuration for how to customize Memory Bank behavior for a particular scope.",
      ).optional(),
      disableMemoryRevisions: z.boolean().describe(
        "If true, no memory revisions will be created for any requests to the Memory Bank.",
      ).optional(),
      generationConfig: z.object({
        generationTriggerConfig: z.object({
          generationRule: z.object({
            eventCount: z.unknown().describe(
              "Optional. Specifies to trigger generation when the event count reaches this limit.",
            ).optional(),
            fixedInterval: z.unknown().describe(
              "Optional. Specifies to trigger generation at a fixed interval. The duration must have a minute-level granularity.",
            ).optional(),
            idleDuration: z.unknown().describe(
              "Optional. Specifies to trigger generation if the stream is inactive for the specified duration after the most recent event. The duration must have a minute-level granularity.",
            ).optional(),
            overlapEventCount: z.unknown().describe(
              "Optional. Re-include the last N already-processed events in the next window.",
            ).optional(),
          }).describe(
            "Optional. Represents the active rule that determines when to flush the buffer. If not set, then the stream will be force flushed immediately.",
          ).optional(),
        }).describe(
          "Optional. Specifies the default trigger configuration for generating memories using `IngestEvents`.",
        ).optional(),
        model: z.string().describe(
          "Optional. The model used to generate memories. Format: `projects/{project}/locations/{location}/publishers/google/models/{model}`.",
        ).optional(),
      }).describe(
        "Optional. Configuration for how to generate memories for the Memory Bank.",
      ).optional(),
      similaritySearchConfig: z.object({
        embeddingModel: z.string().describe(
          "Required. The model used to generate embeddings to lookup similar memories. Format: `projects/{project}/locations/{location}/publishers/google/models/{model}`.",
        ).optional(),
      }).describe(
        "Optional. Configuration for how to perform similarity search on memories. If not set, the Memory Bank will use the default embedding model `text-embedding-005`.",
      ).optional(),
      ttlConfig: z.object({
        defaultTtl: z.string().describe(
          "Optional. The default TTL duration of the memories in the Memory Bank. This applies to all operations that create or update a memory.",
        ).optional(),
        granularTtlConfig: z.object({
          createTtl: z.string().describe(
            "Optional. The TTL duration for memories uploaded via CreateMemory.",
          ).optional(),
          generateCreatedTtl: z.string().describe(
            "Optional. The TTL duration for memories newly generated via GenerateMemories (GenerateMemoriesResponse.GeneratedMemory.Action.CREATED).",
          ).optional(),
          generateUpdatedTtl: z.string().describe(
            "Optional. The TTL duration for memories updated via GenerateMemories (GenerateMemoriesResponse.GeneratedMemory.Action.UPDATED). In the case of an UPDATE action, the `expire_time` of the existing memory will be updated to the new value (now + TTL).",
          ).optional(),
        }).describe(
          "Optional. The granular TTL configuration of the memories in the Memory Bank.",
        ).optional(),
        memoryRevisionDefaultTtl: z.string().describe(
          "Optional. The default TTL duration of the memory revisions in the Memory Bank. This applies to all operations that create a memory revision. If not set, a default TTL of 365 days will be used.",
        ).optional(),
      }).describe(
        'Optional. Configuration for automatic TTL ("time-to-live") of the memories in the Memory Bank. If not set, TTL will not be applied automatically. The TTL can be explicitly set by modifying the `expire_time` of each Memory resource.',
      ).optional(),
    }).describe(
      "Optional. Specification for a Memory Bank, which manages memories for the Agent Engine.",
    ).optional(),
  }).describe(
    "Optional. Configuration for how Agent Engine sub-resources should manage context.",
  ).optional(),
  description: z.string().describe(
    "Optional. The description of the ReasoningEngine.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the ReasoningEngine.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Customer-managed encryption key spec for a ReasoningEngine. If set, this ReasoningEngine and all sub-resources of this ReasoningEngine will be secured by this key.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for the ReasoningEngine.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the ReasoningEngine. Format: `projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine}`",
  ).optional(),
  spec: z.object({
    agentFramework: z.string().describe(
      'Optional. The OSS agent framework used to develop the agent. Currently supported values: "google-adk", "langchain", "langgraph", "ag2", "llama-index", "custom".',
    ).optional(),
    buildSpec: z.object({
      serviceAccount: z.string().describe(
        "Optional. The service account that Cloud Build uses to run the build. This field is only applicable when `worker_pool` is specified (i.e., for custom worker pools). If `worker_pool` is not specified, this field is ignored and the build runs using the Google-managed service agent. Format: `projects/{project}/serviceAccounts/{service_account}` or `{service_account}@{project}.iam.gserviceaccount.com`",
      ).optional(),
      workerPool: z.string().describe(
        "Optional. Identifier. The resource name of the Cloud Build WorkerPool to use for the build. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`",
      ).optional(),
    }).describe("Optional. Configuration for building container image.")
      .optional(),
    classMethods: z.array(z.record(z.string(), z.string())).describe(
      "Optional. Declarations for object class methods in OpenAPI specification format.",
    ).optional(),
    containerSpec: z.object({
      imageUri: z.string().describe(
        "Required. The Artifact Registry Docker image URI (e.g., us-central1-docker.pkg.dev/my-project/my-repo/my-image:tag) of the container image that is to be run on each worker replica.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port the container listens on. Defaults to 8080 if unset.",
      ).optional(),
    }).describe(
      "Deploy from a container image with a defined entrypoint and commands.",
    ).optional(),
    deploymentSpec: z.object({
      agentGatewayConfig: z.object({
        agentToAnywhereConfig: z.object({
          agentGateway: z.string().describe(
            "Required. The resource name of the Agent Gateway for outbound traffic. It must be set to a Google-managed gateway whose `governed_access_path` is `AGENT_TO_ANYWHERE`. Format: `projects/{project}/locations/{location}/agentGateways/{agent_gateway}`",
          ).optional(),
        }).describe(
          "Optional. Configuration for traffic originating from the Reasoning Engine. When unset, outgoing traffic is not routed through an Agent Gateway.",
        ).optional(),
        clientToAgentConfig: z.object({
          agentGateway: z.string().describe(
            "Required. The resource name of the Agent Gateway to use for inbound traffic. It must be set to a Google-managed gateway whose `governed_access_path` is `CLIENT_TO_AGENT`. Format: `projects/{project}/locations/{location}/agentGateways/{agent_gateway}`",
          ).optional(),
        }).describe(
          "Optional. Configuration for traffic targeting the Reasoning Engine. When unset, incoming traffic is not routed through an Agent Gateway.",
        ).optional(),
      }).describe(
        "Optional. Agent Gateway configuration for the Reasoning Engine deployment.",
      ).optional(),
      containerConcurrency: z.number().int().describe(
        "Optional. Concurrency for each container and agent server. Recommended value: 2 * cpu + 1. Defaults to 9.",
      ).optional(),
      env: z.array(z.object({
        name: z.string().describe(
          "Required. Name of the environment variable. Must be a valid C identifier.",
        ).optional(),
        value: z.string().describe(
          "Required. Variables that reference a $(VAR_NAME) are expanded using the previous defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not.",
        ).optional(),
      })).describe(
        "Optional. Environment variables to be set with the Reasoning Engine deployment. The environment variables can be updated through the UpdateReasoningEngine API.",
      ).optional(),
      keepAliveProbe: z.object({
        httpGet: z.object({
          path: z.string().describe(
            'Required. Specifies the path of the HTTP GET request (e.g., `"/is_busy"`).',
          ).optional(),
          port: z.number().int().describe(
            "Optional. Specifies the port number on the container to which the request is sent.",
          ).optional(),
        }).describe(
          "Optional. Specifies the HTTP GET configuration for the probe.",
        ).optional(),
        maxSeconds: z.number().int().describe(
          "Optional. Specifies the maximum duration (in seconds) to keep the instance alive via this probe. Can be a maximum of 3600 seconds (1 hour).",
        ).optional(),
      }).describe(
        "Optional. Specifies the configuration for keep-alive probe. Contains configuration on a specified endpoint that a deployment host should use to keep the container alive based on the probe settings.",
      ).optional(),
      maxInstances: z.number().int().describe(
        "Optional. The maximum number of application instances that can be launched to handle increased traffic. Defaults to 100. Range: [1, 1000]. If VPC-SC or PSC-I is enabled, the acceptable range is [1, 100].",
      ).optional(),
      minInstances: z.number().int().describe(
        "Optional. The minimum number of application instances that will be kept running at all times. Defaults to 1. Range: [0, 75].",
      ).optional(),
      pscInterfaceConfig: z.object({
        dnsPeeringConfigs: z.array(z.object({
          domain: z.unknown().describe(
            'Required. The DNS name suffix of the zone being peered to, e.g., "my-internal-domain.corp.". Must end with a dot.',
          ).optional(),
          targetNetwork: z.unknown().describe(
            "Required. The VPC network name in the target_project where the DNS zone specified by 'domain' is visible.",
          ).optional(),
          targetProject: z.unknown().describe(
            "Required. The project ID hosting the Cloud DNS managed zone that contains the 'domain'. The Vertex AI Service Agent requires the dns.peer role on this project.",
          ).optional(),
        })).describe(
          "Optional. DNS peering configurations. When specified, Vertex AI will attempt to configure DNS peering zones in the tenant project VPC to resolve the specified domains using the target network's Cloud DNS. The user must grant the dns.peer role to the Vertex AI Service Agent on the target project.",
        ).optional(),
        networkAttachment: z.string().describe(
          "Optional. The name of the Compute Engine [network attachment](https://cloud.google.com/vpc/docs/about-network-attachments) to attach to the resource within the region and user project. To specify this field, you must have already [created a network attachment] (https://cloud.google.com/vpc/docs/create-manage-network-attachments#create-network-attachments). This field is only used for resources using PSC-I.",
        ).optional(),
      }).describe("Optional. Configuration for PSC-I.").optional(),
      resourceLimits: z.record(z.string(), z.string()).describe(
        "Optional. Resource limits for each container. Only 'cpu' and 'memory' keys are supported. Defaults to {\"cpu\": \"4\", \"memory\": \"4Gi\"}. * The only supported values for CPU are '1', '2', '4', '6' and '8'. For more information, go to https://cloud.google.com/run/docs/configuring/cpu. * The only supported values for memory are '1Gi', '2Gi',... '32 Gi'. * For required cpu on different memory values, go to https://cloud.google.com/run/docs/configuring/memory-limits",
      ).optional(),
      secretEnv: z.array(z.object({
        name: z.string().describe(
          "Required. Name of the secret environment variable.",
        ).optional(),
        secretRef: z.object({
          secret: z.unknown().describe(
            "Required. The name of the secret in Cloud Secret Manager. Format: {secret_name}.",
          ).optional(),
          version: z.unknown().describe(
            "The Cloud Secret Manager secret version. Can be 'latest' for the latest version, an integer for a specific version, or a version alias.",
          ).optional(),
        }).describe(
          "Required. Reference to a secret stored in the Cloud Secret Manager that will provide the value for this environment variable.",
        ).optional(),
      })).describe(
        "Optional. Environment variables where the value is a secret in Cloud Secret Manager. To use this feature, add 'Secret Manager Secret Accessor' role (roles/secretmanager.secretAccessor) to AI Platform Reasoning Engine Service Agent.",
      ).optional(),
    }).describe("Optional. The specification of a Reasoning Engine deployment.")
      .optional(),
    effectiveIdentity: z.string().describe(
      "Output only. The identity to use for the Reasoning Engine. It can contain one of the following values: * service-{project}@gcp-sa-aiplatform-re.googleapis.com (for SERVICE_AGENT identity type) * {name}@{project}.gserviceaccount.com (for SERVICE_ACCOUNT identity type) * agents.global.{org}.system.id.goog/resources/aiplatform/projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine} (for AGENT_IDENTITY identity type)",
    ).optional(),
    identityType: z.enum([
      "IDENTITY_TYPE_UNSPECIFIED",
      "SERVICE_ACCOUNT",
      "AGENT_IDENTITY",
    ]).describe(
      "Optional. The identity type to use for the Reasoning Engine. If not specified, the `service_account` field will be used if set, otherwise the default Vertex AI Reasoning Engine Service Agent in the project will be used.",
    ).optional(),
    packageSpec: z.object({
      dependencyFilesGcsUri: z.string().describe(
        "Optional. The Cloud Storage URI of the dependency files in tar.gz format.",
      ).optional(),
      pickleObjectGcsUri: z.string().describe(
        "Optional. The Cloud Storage URI of the pickled python object.",
      ).optional(),
      pythonVersion: z.string().describe(
        "Optional. The Python version. Supported values are 3.10, 3.11, 3.12, 3.13, 3.14. If not specified, the default value is 3.10.",
      ).optional(),
      requirementsGcsUri: z.string().describe(
        "Optional. The Cloud Storage URI of the `requirements.txt` file",
      ).optional(),
    }).describe(
      "Optional. User provided package spec of the ReasoningEngine. Ignored when users directly specify a deployment image through `deployment_spec.first_party_image_override`, but keeping the field_behavior to avoid introducing breaking changes. The `deployment_source` field should not be set if `package_spec` is specified.",
    ).optional(),
    serviceAccount: z.string().describe(
      'Optional. The service account that the Reasoning Engine artifact runs as. It should have "roles/storage.objectViewer" for reading the user project\'s Cloud Storage and "roles/aiplatform.user" for using Vertex extensions. If not specified, the Vertex AI Reasoning Engine Service Agent in the project will be used.',
    ).optional(),
    sourceCodeSpec: z.object({
      agentConfigSource: z.object({
        adkConfig: z.object({
          jsonConfig: z.record(z.string(), z.unknown()).describe(
            "Required. The value of the ADK config in JSON format.",
          ).optional(),
        }).describe("Required. The ADK configuration.").optional(),
        inlineSource: z.object({
          sourceArchive: z.string().describe(
            "Required. Input only. The application source code archive. It must be a compressed tarball (.tar.gz) file.",
          ).optional(),
        }).describe(
          "Optional. Any additional files needed to interpret the config. If a `requirements.txt` file is present in the `inline_source`, the corresponding packages will be installed. If no `requirements.txt` file is present in `inline_source`, then the latest version of `google-adk` will be installed for interpreting the ADK config.",
        ).optional(),
      }).describe("Source code is generated from the agent config.").optional(),
      developerConnectSource: z.object({
        config: z.object({
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
          "Required. The Developer Connect configuration that defines the specific repository, revision, and directory to use as the source code root.",
        ).optional(),
      }).describe(
        "Source code is in a Git repository managed by Developer Connect.",
      ).optional(),
      imageSpec: z.object({
        buildArgs: z.record(z.string(), z.string()).describe(
          "Optional. Build arguments to be used. They will be passed through --build-arg flags.",
        ).optional(),
      }).describe(
        "Optional. Configuration for building an image with custom config file.",
      ).optional(),
      inlineSource: z.object({
        sourceArchive: z.string().describe(
          "Required. Input only. The application source code archive. It must be a compressed tarball (.tar.gz) file.",
        ).optional(),
      }).describe("Source code is provided directly in the request.")
        .optional(),
      pythonSpec: z.object({
        entrypointModule: z.string().describe(
          'Optional. The Python module to load as the entrypoint, specified as a fully qualified module name. For example: path.to.agent. If not specified, defaults to "agent". The project root will be added to Python sys.path, allowing imports to be specified relative to the root. This field should not be set if the source is `agent_config_source`.',
        ).optional(),
        entrypointObject: z.string().describe(
          'Optional. The name of the callable object within the `entrypoint_module` to use as the application If not specified, defaults to "root_agent". This field should not be set if the source is `agent_config_source`.',
        ).optional(),
        requirementsFile: z.string().describe(
          'Optional. The path to the requirements file, relative to the source root. If not specified, defaults to "requirements.txt".',
        ).optional(),
        version: z.string().describe(
          "Optional. The version of Python to use. Supported versions include 3.10, 3.11, 3.12, 3.13, 3.14. If not specified, default value is 3.10.",
        ).optional(),
      }).describe("Configuration for a Python application.").optional(),
    }).describe("Deploy from source code files with a defined entrypoint.")
      .optional(),
  }).describe("Optional. Configurations of the ReasoningEngine").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  contextSpec: z.object({
    memoryBankConfig: z.object({
      customizationConfigs: z.array(z.object({
        consolidationConfig: z.object({
          revisionsPerCandidateCount: z.unknown(),
        }),
        disableNaturalLanguageMemories: z.boolean(),
        enableThirdPersonMemories: z.boolean(),
        generateMemoriesExamples: z.array(z.unknown()),
        memoryTopics: z.array(z.unknown()),
        scopeKeys: z.array(z.unknown()),
      })),
      disableMemoryRevisions: z.boolean(),
      generationConfig: z.object({
        generationTriggerConfig: z.object({
          generationRule: z.object({
            eventCount: z.unknown(),
            fixedInterval: z.unknown(),
            idleDuration: z.unknown(),
            overlapEventCount: z.unknown(),
          }),
        }),
        model: z.string(),
      }),
      similaritySearchConfig: z.object({
        embeddingModel: z.string(),
      }),
      ttlConfig: z.object({
        defaultTtl: z.string(),
        granularTtlConfig: z.object({
          createTtl: z.string(),
          generateCreatedTtl: z.string(),
          generateUpdatedTtl: z.string(),
        }),
        memoryRevisionDefaultTtl: z.string(),
      }),
    }),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  spec: z.object({
    agentFramework: z.string(),
    buildSpec: z.object({
      serviceAccount: z.string(),
      workerPool: z.string(),
    }),
    classMethods: z.array(z.record(z.string(), z.unknown())),
    containerSpec: z.object({
      imageUri: z.string(),
      port: z.number(),
    }),
    deploymentSpec: z.object({
      agentGatewayConfig: z.object({
        agentToAnywhereConfig: z.object({
          agentGateway: z.string(),
        }),
        clientToAgentConfig: z.object({
          agentGateway: z.string(),
        }),
      }),
      containerConcurrency: z.number(),
      env: z.array(z.object({
        name: z.string(),
        value: z.string(),
      })),
      keepAliveProbe: z.object({
        httpGet: z.object({
          path: z.string(),
          port: z.number(),
        }),
        maxSeconds: z.number(),
      }),
      maxInstances: z.number(),
      minInstances: z.number(),
      pscInterfaceConfig: z.object({
        dnsPeeringConfigs: z.array(z.object({
          domain: z.unknown(),
          targetNetwork: z.unknown(),
          targetProject: z.unknown(),
        })),
        networkAttachment: z.string(),
      }),
      resourceLimits: z.record(z.string(), z.unknown()),
      secretEnv: z.array(z.object({
        name: z.string(),
        secretRef: z.object({
          secret: z.unknown(),
          version: z.unknown(),
        }),
      })),
    }),
    effectiveIdentity: z.string(),
    identityType: z.string(),
    packageSpec: z.object({
      dependencyFilesGcsUri: z.string(),
      pickleObjectGcsUri: z.string(),
      pythonVersion: z.string(),
      requirementsGcsUri: z.string(),
    }),
    serviceAccount: z.string(),
    sourceCodeSpec: z.object({
      agentConfigSource: z.object({
        adkConfig: z.object({
          jsonConfig: z.record(z.string(), z.unknown()),
        }),
        inlineSource: z.object({
          sourceArchive: z.string(),
        }),
      }),
      developerConnectSource: z.object({
        config: z.object({
          dir: z.string(),
          gitRepositoryLink: z.string(),
          revision: z.string(),
        }),
      }),
      imageSpec: z.object({
        buildArgs: z.record(z.string(), z.unknown()),
      }),
      inlineSource: z.object({
        sourceArchive: z.string(),
      }),
      pythonSpec: z.object({
        entrypointModule: z.string(),
        entrypointObject: z.string(),
        requirementsFile: z.string(),
        version: z.string(),
      }),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  contextSpec: z.object({
    memoryBankConfig: z.object({
      customizationConfigs: z.array(z.object({
        consolidationConfig: z.object({
          revisionsPerCandidateCount: z.unknown().describe(
            "Optional. Represents the maximum number of revisions to consider for each candidate memory. If not set, then the default value (1) will be used, which means that only the latest revision will be considered.",
          ).optional(),
        }).describe(
          "Optional. Represents configuration for customizing how memories are consolidated together.",
        ).optional(),
        disableNaturalLanguageMemories: z.boolean().describe(
          "Optional. Indicates whether natural language memory generation should be disabled for all requests. By default, natural language memory generation is enabled. Set this to `true` when you only want to generate structured memories.",
        ).optional(),
        enableThirdPersonMemories: z.boolean().describe(
          'Optional. Indicates whether the memories will be generated in the third person (i.e. "The user generates memories with Memory Bank."). By default, the memories will be generated in the first person (i.e. "I generate memories with Memory Bank.")',
        ).optional(),
        generateMemoriesExamples: z.array(z.unknown()).describe(
          "Optional. Provides examples of how to generate memories for a particular scope.",
        ).optional(),
        memoryTopics: z.array(z.unknown()).describe(
          "Optional. Represents topics of information that should be extracted from conversations and stored as memories. If not set, then Memory Bank's default topics will be used.",
        ).optional(),
        scopeKeys: z.array(z.unknown()).describe(
          "Optional. Represents the scope keys (i.e. 'user_id') for which to use this config. A request's scope must include all of the provided keys for the config to be used (order does not matter). If empty, then the config will be used for all requests that do not have a more specific config. Only one default config is allowed per Memory Bank.",
        ).optional(),
      })).describe(
        "Optional. Configuration for how to customize Memory Bank behavior for a particular scope.",
      ).optional(),
      disableMemoryRevisions: z.boolean().describe(
        "If true, no memory revisions will be created for any requests to the Memory Bank.",
      ).optional(),
      generationConfig: z.object({
        generationTriggerConfig: z.object({
          generationRule: z.object({
            eventCount: z.unknown().describe(
              "Optional. Specifies to trigger generation when the event count reaches this limit.",
            ).optional(),
            fixedInterval: z.unknown().describe(
              "Optional. Specifies to trigger generation at a fixed interval. The duration must have a minute-level granularity.",
            ).optional(),
            idleDuration: z.unknown().describe(
              "Optional. Specifies to trigger generation if the stream is inactive for the specified duration after the most recent event. The duration must have a minute-level granularity.",
            ).optional(),
            overlapEventCount: z.unknown().describe(
              "Optional. Re-include the last N already-processed events in the next window.",
            ).optional(),
          }).describe(
            "Optional. Represents the active rule that determines when to flush the buffer. If not set, then the stream will be force flushed immediately.",
          ).optional(),
        }).describe(
          "Optional. Specifies the default trigger configuration for generating memories using `IngestEvents`.",
        ).optional(),
        model: z.string().describe(
          "Optional. The model used to generate memories. Format: `projects/{project}/locations/{location}/publishers/google/models/{model}`.",
        ).optional(),
      }).describe(
        "Optional. Configuration for how to generate memories for the Memory Bank.",
      ).optional(),
      similaritySearchConfig: z.object({
        embeddingModel: z.string().describe(
          "Required. The model used to generate embeddings to lookup similar memories. Format: `projects/{project}/locations/{location}/publishers/google/models/{model}`.",
        ).optional(),
      }).describe(
        "Optional. Configuration for how to perform similarity search on memories. If not set, the Memory Bank will use the default embedding model `text-embedding-005`.",
      ).optional(),
      ttlConfig: z.object({
        defaultTtl: z.string().describe(
          "Optional. The default TTL duration of the memories in the Memory Bank. This applies to all operations that create or update a memory.",
        ).optional(),
        granularTtlConfig: z.object({
          createTtl: z.string().describe(
            "Optional. The TTL duration for memories uploaded via CreateMemory.",
          ).optional(),
          generateCreatedTtl: z.string().describe(
            "Optional. The TTL duration for memories newly generated via GenerateMemories (GenerateMemoriesResponse.GeneratedMemory.Action.CREATED).",
          ).optional(),
          generateUpdatedTtl: z.string().describe(
            "Optional. The TTL duration for memories updated via GenerateMemories (GenerateMemoriesResponse.GeneratedMemory.Action.UPDATED). In the case of an UPDATE action, the `expire_time` of the existing memory will be updated to the new value (now + TTL).",
          ).optional(),
        }).describe(
          "Optional. The granular TTL configuration of the memories in the Memory Bank.",
        ).optional(),
        memoryRevisionDefaultTtl: z.string().describe(
          "Optional. The default TTL duration of the memory revisions in the Memory Bank. This applies to all operations that create a memory revision. If not set, a default TTL of 365 days will be used.",
        ).optional(),
      }).describe(
        'Optional. Configuration for automatic TTL ("time-to-live") of the memories in the Memory Bank. If not set, TTL will not be applied automatically. The TTL can be explicitly set by modifying the `expire_time` of each Memory resource.',
      ).optional(),
    }).describe(
      "Optional. Specification for a Memory Bank, which manages memories for the Agent Engine.",
    ).optional(),
  }).describe(
    "Optional. Configuration for how Agent Engine sub-resources should manage context.",
  ).optional(),
  description: z.string().describe(
    "Optional. The description of the ReasoningEngine.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the ReasoningEngine.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Customer-managed encryption key spec for a ReasoningEngine. If set, this ReasoningEngine and all sub-resources of this ReasoningEngine will be secured by this key.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for the ReasoningEngine.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the ReasoningEngine. Format: `projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine}`",
  ).optional(),
  spec: z.object({
    agentFramework: z.string().describe(
      'Optional. The OSS agent framework used to develop the agent. Currently supported values: "google-adk", "langchain", "langgraph", "ag2", "llama-index", "custom".',
    ).optional(),
    buildSpec: z.object({
      serviceAccount: z.string().describe(
        "Optional. The service account that Cloud Build uses to run the build. This field is only applicable when `worker_pool` is specified (i.e., for custom worker pools). If `worker_pool` is not specified, this field is ignored and the build runs using the Google-managed service agent. Format: `projects/{project}/serviceAccounts/{service_account}` or `{service_account}@{project}.iam.gserviceaccount.com`",
      ).optional(),
      workerPool: z.string().describe(
        "Optional. Identifier. The resource name of the Cloud Build WorkerPool to use for the build. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`",
      ).optional(),
    }).describe("Optional. Configuration for building container image.")
      .optional(),
    classMethods: z.array(z.record(z.string(), z.string())).describe(
      "Optional. Declarations for object class methods in OpenAPI specification format.",
    ).optional(),
    containerSpec: z.object({
      imageUri: z.string().describe(
        "Required. The Artifact Registry Docker image URI (e.g., us-central1-docker.pkg.dev/my-project/my-repo/my-image:tag) of the container image that is to be run on each worker replica.",
      ).optional(),
      port: z.number().int().describe(
        "Optional. The port the container listens on. Defaults to 8080 if unset.",
      ).optional(),
    }).describe(
      "Deploy from a container image with a defined entrypoint and commands.",
    ).optional(),
    deploymentSpec: z.object({
      agentGatewayConfig: z.object({
        agentToAnywhereConfig: z.object({
          agentGateway: z.string().describe(
            "Required. The resource name of the Agent Gateway for outbound traffic. It must be set to a Google-managed gateway whose `governed_access_path` is `AGENT_TO_ANYWHERE`. Format: `projects/{project}/locations/{location}/agentGateways/{agent_gateway}`",
          ).optional(),
        }).describe(
          "Optional. Configuration for traffic originating from the Reasoning Engine. When unset, outgoing traffic is not routed through an Agent Gateway.",
        ).optional(),
        clientToAgentConfig: z.object({
          agentGateway: z.string().describe(
            "Required. The resource name of the Agent Gateway to use for inbound traffic. It must be set to a Google-managed gateway whose `governed_access_path` is `CLIENT_TO_AGENT`. Format: `projects/{project}/locations/{location}/agentGateways/{agent_gateway}`",
          ).optional(),
        }).describe(
          "Optional. Configuration for traffic targeting the Reasoning Engine. When unset, incoming traffic is not routed through an Agent Gateway.",
        ).optional(),
      }).describe(
        "Optional. Agent Gateway configuration for the Reasoning Engine deployment.",
      ).optional(),
      containerConcurrency: z.number().int().describe(
        "Optional. Concurrency for each container and agent server. Recommended value: 2 * cpu + 1. Defaults to 9.",
      ).optional(),
      env: z.array(z.object({
        name: z.string().describe(
          "Required. Name of the environment variable. Must be a valid C identifier.",
        ).optional(),
        value: z.string().describe(
          "Required. Variables that reference a $(VAR_NAME) are expanded using the previous defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not.",
        ).optional(),
      })).describe(
        "Optional. Environment variables to be set with the Reasoning Engine deployment. The environment variables can be updated through the UpdateReasoningEngine API.",
      ).optional(),
      keepAliveProbe: z.object({
        httpGet: z.object({
          path: z.string().describe(
            'Required. Specifies the path of the HTTP GET request (e.g., `"/is_busy"`).',
          ).optional(),
          port: z.number().int().describe(
            "Optional. Specifies the port number on the container to which the request is sent.",
          ).optional(),
        }).describe(
          "Optional. Specifies the HTTP GET configuration for the probe.",
        ).optional(),
        maxSeconds: z.number().int().describe(
          "Optional. Specifies the maximum duration (in seconds) to keep the instance alive via this probe. Can be a maximum of 3600 seconds (1 hour).",
        ).optional(),
      }).describe(
        "Optional. Specifies the configuration for keep-alive probe. Contains configuration on a specified endpoint that a deployment host should use to keep the container alive based on the probe settings.",
      ).optional(),
      maxInstances: z.number().int().describe(
        "Optional. The maximum number of application instances that can be launched to handle increased traffic. Defaults to 100. Range: [1, 1000]. If VPC-SC or PSC-I is enabled, the acceptable range is [1, 100].",
      ).optional(),
      minInstances: z.number().int().describe(
        "Optional. The minimum number of application instances that will be kept running at all times. Defaults to 1. Range: [0, 75].",
      ).optional(),
      pscInterfaceConfig: z.object({
        dnsPeeringConfigs: z.array(z.object({
          domain: z.unknown().describe(
            'Required. The DNS name suffix of the zone being peered to, e.g., "my-internal-domain.corp.". Must end with a dot.',
          ).optional(),
          targetNetwork: z.unknown().describe(
            "Required. The VPC network name in the target_project where the DNS zone specified by 'domain' is visible.",
          ).optional(),
          targetProject: z.unknown().describe(
            "Required. The project ID hosting the Cloud DNS managed zone that contains the 'domain'. The Vertex AI Service Agent requires the dns.peer role on this project.",
          ).optional(),
        })).describe(
          "Optional. DNS peering configurations. When specified, Vertex AI will attempt to configure DNS peering zones in the tenant project VPC to resolve the specified domains using the target network's Cloud DNS. The user must grant the dns.peer role to the Vertex AI Service Agent on the target project.",
        ).optional(),
        networkAttachment: z.string().describe(
          "Optional. The name of the Compute Engine [network attachment](https://cloud.google.com/vpc/docs/about-network-attachments) to attach to the resource within the region and user project. To specify this field, you must have already [created a network attachment] (https://cloud.google.com/vpc/docs/create-manage-network-attachments#create-network-attachments). This field is only used for resources using PSC-I.",
        ).optional(),
      }).describe("Optional. Configuration for PSC-I.").optional(),
      resourceLimits: z.record(z.string(), z.string()).describe(
        "Optional. Resource limits for each container. Only 'cpu' and 'memory' keys are supported. Defaults to {\"cpu\": \"4\", \"memory\": \"4Gi\"}. * The only supported values for CPU are '1', '2', '4', '6' and '8'. For more information, go to https://cloud.google.com/run/docs/configuring/cpu. * The only supported values for memory are '1Gi', '2Gi',... '32 Gi'. * For required cpu on different memory values, go to https://cloud.google.com/run/docs/configuring/memory-limits",
      ).optional(),
      secretEnv: z.array(z.object({
        name: z.string().describe(
          "Required. Name of the secret environment variable.",
        ).optional(),
        secretRef: z.object({
          secret: z.unknown().describe(
            "Required. The name of the secret in Cloud Secret Manager. Format: {secret_name}.",
          ).optional(),
          version: z.unknown().describe(
            "The Cloud Secret Manager secret version. Can be 'latest' for the latest version, an integer for a specific version, or a version alias.",
          ).optional(),
        }).describe(
          "Required. Reference to a secret stored in the Cloud Secret Manager that will provide the value for this environment variable.",
        ).optional(),
      })).describe(
        "Optional. Environment variables where the value is a secret in Cloud Secret Manager. To use this feature, add 'Secret Manager Secret Accessor' role (roles/secretmanager.secretAccessor) to AI Platform Reasoning Engine Service Agent.",
      ).optional(),
    }).describe("Optional. The specification of a Reasoning Engine deployment.")
      .optional(),
    effectiveIdentity: z.string().describe(
      "Output only. The identity to use for the Reasoning Engine. It can contain one of the following values: * service-{project}@gcp-sa-aiplatform-re.googleapis.com (for SERVICE_AGENT identity type) * {name}@{project}.gserviceaccount.com (for SERVICE_ACCOUNT identity type) * agents.global.{org}.system.id.goog/resources/aiplatform/projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine} (for AGENT_IDENTITY identity type)",
    ).optional(),
    identityType: z.enum([
      "IDENTITY_TYPE_UNSPECIFIED",
      "SERVICE_ACCOUNT",
      "AGENT_IDENTITY",
    ]).describe(
      "Optional. The identity type to use for the Reasoning Engine. If not specified, the `service_account` field will be used if set, otherwise the default Vertex AI Reasoning Engine Service Agent in the project will be used.",
    ).optional(),
    packageSpec: z.object({
      dependencyFilesGcsUri: z.string().describe(
        "Optional. The Cloud Storage URI of the dependency files in tar.gz format.",
      ).optional(),
      pickleObjectGcsUri: z.string().describe(
        "Optional. The Cloud Storage URI of the pickled python object.",
      ).optional(),
      pythonVersion: z.string().describe(
        "Optional. The Python version. Supported values are 3.10, 3.11, 3.12, 3.13, 3.14. If not specified, the default value is 3.10.",
      ).optional(),
      requirementsGcsUri: z.string().describe(
        "Optional. The Cloud Storage URI of the `requirements.txt` file",
      ).optional(),
    }).describe(
      "Optional. User provided package spec of the ReasoningEngine. Ignored when users directly specify a deployment image through `deployment_spec.first_party_image_override`, but keeping the field_behavior to avoid introducing breaking changes. The `deployment_source` field should not be set if `package_spec` is specified.",
    ).optional(),
    serviceAccount: z.string().describe(
      'Optional. The service account that the Reasoning Engine artifact runs as. It should have "roles/storage.objectViewer" for reading the user project\'s Cloud Storage and "roles/aiplatform.user" for using Vertex extensions. If not specified, the Vertex AI Reasoning Engine Service Agent in the project will be used.',
    ).optional(),
    sourceCodeSpec: z.object({
      agentConfigSource: z.object({
        adkConfig: z.object({
          jsonConfig: z.record(z.string(), z.unknown()).describe(
            "Required. The value of the ADK config in JSON format.",
          ).optional(),
        }).describe("Required. The ADK configuration.").optional(),
        inlineSource: z.object({
          sourceArchive: z.string().describe(
            "Required. Input only. The application source code archive. It must be a compressed tarball (.tar.gz) file.",
          ).optional(),
        }).describe(
          "Optional. Any additional files needed to interpret the config. If a `requirements.txt` file is present in the `inline_source`, the corresponding packages will be installed. If no `requirements.txt` file is present in `inline_source`, then the latest version of `google-adk` will be installed for interpreting the ADK config.",
        ).optional(),
      }).describe("Source code is generated from the agent config.").optional(),
      developerConnectSource: z.object({
        config: z.object({
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
          "Required. The Developer Connect configuration that defines the specific repository, revision, and directory to use as the source code root.",
        ).optional(),
      }).describe(
        "Source code is in a Git repository managed by Developer Connect.",
      ).optional(),
      imageSpec: z.object({
        buildArgs: z.record(z.string(), z.string()).describe(
          "Optional. Build arguments to be used. They will be passed through --build-arg flags.",
        ).optional(),
      }).describe(
        "Optional. Configuration for building an image with custom config file.",
      ).optional(),
      inlineSource: z.object({
        sourceArchive: z.string().describe(
          "Required. Input only. The application source code archive. It must be a compressed tarball (.tar.gz) file.",
        ).optional(),
      }).describe("Source code is provided directly in the request.")
        .optional(),
      pythonSpec: z.object({
        entrypointModule: z.string().describe(
          'Optional. The Python module to load as the entrypoint, specified as a fully qualified module name. For example: path.to.agent. If not specified, defaults to "agent". The project root will be added to Python sys.path, allowing imports to be specified relative to the root. This field should not be set if the source is `agent_config_source`.',
        ).optional(),
        entrypointObject: z.string().describe(
          'Optional. The name of the callable object within the `entrypoint_module` to use as the application If not specified, defaults to "root_agent". This field should not be set if the source is `agent_config_source`.',
        ).optional(),
        requirementsFile: z.string().describe(
          'Optional. The path to the requirements file, relative to the source root. If not specified, defaults to "requirements.txt".',
        ).optional(),
        version: z.string().describe(
          "Optional. The version of Python to use. Supported versions include 3.10, 3.11, 3.12, 3.13, 3.14. If not specified, default value is 3.10.",
        ).optional(),
      }).describe("Configuration for a Python application.").optional(),
    }).describe("Deploy from source code files with a defined entrypoint.")
      .optional(),
  }).describe("Optional. Configurations of the ReasoningEngine").optional(),
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

/** Swamp extension model for Google Cloud Agent Platform ReasoningEngines. Registered at `@swamp/gcp/aiplatform/reasoningengines`. */
export const model = {
  type: "@swamp/gcp/aiplatform/reasoningengines",
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
      toVersion: "2026.04.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
      toVersion: "2026.05.26.1",
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
      toVersion: "2026.06.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.04.1",
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
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
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
      toVersion: "2026.07.27.1",
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
      toVersion: "2026.08.18.1",
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
        "Removed: memoryBankConfig, customizationConfigs, consolidationConfig, revisionsPerCandidateCount, disableNaturalLanguageMemories, enableThirdPersonMemories, generateMemoriesExamples, memoryTopics, scopeKeys, disableMemoryRevisions, generationConfig, generationTriggerConfig, generationRule, eventCount, fixedInterval, idleDuration, overlapEventCount, model, similaritySearchConfig, embeddingModel, ttlConfig, defaultTtl, granularTtlConfig, createTtl, generateCreatedTtl, generateUpdatedTtl, memoryRevisionDefaultTtl, kmsKeyName, agentFramework, buildSpec, serviceAccount, workerPool, classMethods, containerSpec, imageUri, port, deploymentSpec, agentGatewayConfig, agentToAnywhereConfig, agentGateway, clientToAgentConfig, agentGateway, containerConcurrency, env, value, keepAliveProbe, httpGet, path, port, maxSeconds, maxInstances, minInstances, pscInterfaceConfig, dnsPeeringConfigs, domain, targetNetwork, targetProject, networkAttachment, resourceLimits, secretEnv, secretRef, secret, version, effectiveIdentity, identityType, packageSpec, dependencyFilesGcsUri, pickleObjectGcsUri, pythonVersion, requirementsGcsUri, serviceAccount, sourceCodeSpec, agentConfigSource, adkConfig, jsonConfig, inlineSource, sourceArchive, developerConnectSource, config, dir, gitRepositoryLink, revision, imageSpec, buildArgs, inlineSource, sourceArchive, pythonSpec, entrypointModule, entrypointObject, requirementsFile, version",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          memoryBankConfig: _memoryBankConfig,
          customizationConfigs: _customizationConfigs,
          consolidationConfig: _consolidationConfig,
          revisionsPerCandidateCount: _revisionsPerCandidateCount,
          disableNaturalLanguageMemories: _disableNaturalLanguageMemories,
          enableThirdPersonMemories: _enableThirdPersonMemories,
          generateMemoriesExamples: _generateMemoriesExamples,
          memoryTopics: _memoryTopics,
          scopeKeys: _scopeKeys,
          disableMemoryRevisions: _disableMemoryRevisions,
          generationConfig: _generationConfig,
          generationTriggerConfig: _generationTriggerConfig,
          generationRule: _generationRule,
          eventCount: _eventCount,
          fixedInterval: _fixedInterval,
          idleDuration: _idleDuration,
          overlapEventCount: _overlapEventCount,
          model: _model,
          similaritySearchConfig: _similaritySearchConfig,
          embeddingModel: _embeddingModel,
          ttlConfig: _ttlConfig,
          defaultTtl: _defaultTtl,
          granularTtlConfig: _granularTtlConfig,
          createTtl: _createTtl,
          generateCreatedTtl: _generateCreatedTtl,
          generateUpdatedTtl: _generateUpdatedTtl,
          memoryRevisionDefaultTtl: _memoryRevisionDefaultTtl,
          kmsKeyName: _kmsKeyName,
          agentFramework: _agentFramework,
          buildSpec: _buildSpec,
          serviceAccount: _serviceAccount,
          workerPool: _workerPool,
          classMethods: _classMethods,
          containerSpec: _containerSpec,
          imageUri: _imageUri,
          port: _port,
          deploymentSpec: _deploymentSpec,
          agentGatewayConfig: _agentGatewayConfig,
          agentToAnywhereConfig: _agentToAnywhereConfig,
          agentGateway: _agentGateway,
          clientToAgentConfig: _clientToAgentConfig,
          containerConcurrency: _containerConcurrency,
          env: _env,
          value: _value,
          keepAliveProbe: _keepAliveProbe,
          httpGet: _httpGet,
          path: _path,
          maxSeconds: _maxSeconds,
          maxInstances: _maxInstances,
          minInstances: _minInstances,
          pscInterfaceConfig: _pscInterfaceConfig,
          dnsPeeringConfigs: _dnsPeeringConfigs,
          domain: _domain,
          targetNetwork: _targetNetwork,
          targetProject: _targetProject,
          networkAttachment: _networkAttachment,
          resourceLimits: _resourceLimits,
          secretEnv: _secretEnv,
          secretRef: _secretRef,
          secret: _secret,
          version: _version,
          effectiveIdentity: _effectiveIdentity,
          identityType: _identityType,
          packageSpec: _packageSpec,
          dependencyFilesGcsUri: _dependencyFilesGcsUri,
          pickleObjectGcsUri: _pickleObjectGcsUri,
          pythonVersion: _pythonVersion,
          requirementsGcsUri: _requirementsGcsUri,
          sourceCodeSpec: _sourceCodeSpec,
          agentConfigSource: _agentConfigSource,
          adkConfig: _adkConfig,
          jsonConfig: _jsonConfig,
          inlineSource: _inlineSource,
          sourceArchive: _sourceArchive,
          developerConnectSource: _developerConnectSource,
          config: _config,
          dir: _dir,
          gitRepositoryLink: _gitRepositoryLink,
          revision: _revision,
          imageSpec: _imageSpec,
          buildArgs: _buildArgs,
          pythonSpec: _pythonSpec,
          entrypointModule: _entrypointModule,
          entrypointObject: _entrypointObject,
          requirementsFile: _requirementsFile,
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "ReasoningEngine provides a customizable runtime for models to determine which...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a reasoningEngines",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] =
          String(g["location"] ?? "") === "global" || !g["location"]
            ? `projects/${projectId}`
            : `projects/${projectId}/locations/${String(g["location"])}`;
        const body: Record<string, unknown> = {};
        if (g["contextSpec"] !== undefined) {
          body["contextSpec"] = g["contextSpec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["location"] ?? "") === "global" || !g["location"]
              ? `projects/${projectId}`
              : `projects/${projectId}/locations/${String(g["location"])}`,
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
              "parent":
                String(g["location"] ?? "") === "global" || !g["location"]
                  ? `projects/${projectId}`
                  : `projects/${projectId}/locations/${String(g["location"])}`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a reasoningEngines",
      arguments: z.object({
        identifier: z.string().describe("The name of the reasoningEngines"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["location"] ?? "") === "global" || !g["location"]
            ? `projects/${projectId}`
            : `projects/${projectId}/locations/${String(g["location"])}`,
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
      description: "Update reasoningEngines attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific reasoningEngines by name (e.g. one discovered by list)",
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
            String(g["location"] ?? "") === "global" || !g["location"]
              ? `projects/${projectId}`
              : `projects/${projectId}/locations/${String(g["location"])}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["contextSpec"] !== undefined) {
          body["contextSpec"] = g["contextSpec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
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
      description: "Delete the reasoningEngines",
      arguments: z.object({
        identifier: z.string().describe("The name of the reasoningEngines"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["location"] ?? "") === "global" || !g["location"]
            ? `projects/${projectId}`
            : `projects/${projectId}/locations/${String(g["location"])}`,
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
      description: "Sync reasoningEngines state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific reasoningEngines by name (e.g. one discovered by list)",
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
              String(g["location"] ?? "") === "global" || !g["location"]
                ? `projects/${projectId}`
                : `projects/${projectId}/locations/${String(g["location"])}`,
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
      description: "List reasoningEngines resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. The standard list filter. More detail in [AIP-160](https://google.aip.dev/160).",
        ).optional(),
        pageSize: z.number().describe("Optional. The standard list page size.")
          .optional(),
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
        params["parent"] =
          String(g["location"] ?? "") === "global" || !g["location"]
            ? `projects/${projectId}`
            : `projects/${projectId}/locations/${String(g["location"])}`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "reasoningEngines",
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
    async_query: {
      description: "async query",
      arguments: z.object({
        inputGcsUri: z.any().optional(),
        outputGcsUri: z.any().optional(),
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
            String(g["location"] ?? "") === "global" || !g["location"]
              ? `projects/${projectId}`
              : `projects/${projectId}/locations/${String(g["location"])}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["inputGcsUri"] !== undefined) {
          body["inputGcsUri"] = args["inputGcsUri"];
        }
        if (args["outputGcsUri"] !== undefined) {
          body["outputGcsUri"] = args["outputGcsUri"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "aiplatform.projects.locations.reasoningEngines.asyncQuery",
            "path": "v1/{+name}:asyncQuery",
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
    cancel_async_query: {
      description: "cancel async query",
      arguments: z.object({
        operationName: z.any().optional(),
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
            String(g["location"] ?? "") === "global" || !g["location"]
              ? `projects/${projectId}`
              : `projects/${projectId}/locations/${String(g["location"])}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["operationName"] !== undefined) {
          body["operationName"] = args["operationName"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "aiplatform.projects.locations.reasoningEngines.cancelAsyncQuery",
            "path": "v1/{+name}:cancelAsyncQuery",
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
    execute_code: {
      description: "execute code",
      arguments: z.object({
        inputs: z.any().optional(),
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
            String(g["location"] ?? "") === "global" || !g["location"]
              ? `projects/${projectId}`
              : `projects/${projectId}/locations/${String(g["location"])}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["inputs"] !== undefined) body["inputs"] = args["inputs"];
        const result = await createResource(
          baseUrl,
          {
            "id": "aiplatform.projects.locations.reasoningEngines.executeCode",
            "path": "v1/{+name}:executeCode",
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
            "id": "aiplatform.projects.locations.reasoningEngines.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "POST",
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
    query: {
      description: "query",
      arguments: z.object({
        classMethod: z.any().optional(),
        input: z.any().optional(),
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
            String(g["location"] ?? "") === "global" || !g["location"]
              ? `projects/${projectId}`
              : `projects/${projectId}/locations/${String(g["location"])}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["classMethod"] !== undefined) {
          body["classMethod"] = args["classMethod"];
        }
        if (args["input"] !== undefined) body["input"] = args["input"];
        const result = await createResource(
          baseUrl,
          {
            "id": "aiplatform.projects.locations.reasoningEngines.query",
            "path": "v1/{+name}:query",
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
            "id": "aiplatform.projects.locations.reasoningEngines.setIamPolicy",
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
    stream_query: {
      description: "stream query",
      arguments: z.object({
        classMethod: z.any().optional(),
        input: z.any().optional(),
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
            String(g["location"] ?? "") === "global" || !g["location"]
              ? `projects/${projectId}`
              : `projects/${projectId}/locations/${String(g["location"])}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["classMethod"] !== undefined) {
          body["classMethod"] = args["classMethod"];
        }
        if (args["input"] !== undefined) body["input"] = args["input"];
        const result = await createResource(
          baseUrl,
          {
            "id": "aiplatform.projects.locations.reasoningEngines.streamQuery",
            "path": "v1/{+name}:streamQuery",
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
        if (args["permissions"] !== undefined) {
          params["permissions"] = String(args["permissions"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "aiplatform.projects.locations.reasoningEngines.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "permissions": { "location": "query" },
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
  },
};
