// Auto-generated extension model for @swamp/gcp/aiplatform/reasoningengines
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Vertex AI ReasoningEngines.
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
  contextSpec: z.object({
    memoryBankConfig: z.object({
      customizationConfigs: z.array(z.object({
        consolidationConfig: z.object({
          revisionsPerCandidateCount: z.unknown().describe(
            "Optional. The maximum number of revisions to consider for each candidate memory. If not set, then the default value (1) will be used, which means that only the latest revision will be considered.",
          ).optional(),
        }).describe(
          "Represents configuration for customizing how memories are consolidated.",
        ).optional(),
        enableThirdPersonMemories: z.boolean().describe(
          'Optional. If true, then the memories will be generated in the third person (i.e. "The user generates memories with Memory Bank."). By default, the memories will be generated in the first person (i.e. "I generate memories with Memory Bank.")',
        ).optional(),
        generateMemoriesExamples: z.array(z.unknown()).describe(
          "Optional. Examples of how to generate memories for a particular scope.",
        ).optional(),
        memoryTopics: z.array(z.unknown()).describe(
          "Optional. Topics of information that should be extracted from conversations and stored as memories. If not set, then Memory Bank's default topics will be used.",
        ).optional(),
        scopeKeys: z.array(z.unknown()).describe(
          "Optional. The scope keys (i.e. 'user_id') for which to use this config. A request's scope must include all of the provided keys for the config to be used (order does not matter). If empty, then the config will be used for all requests that do not have a more specific config. Only one default config is allowed per Memory Bank.",
        ).optional(),
      })).describe(
        "Optional. Configuration for how to customize Memory Bank behavior for a particular scope.",
      ).optional(),
      disableMemoryRevisions: z.boolean().describe(
        "If true, no memory revisions will be created for any requests to the Memory Bank.",
      ).optional(),
      generationConfig: z.object({
        model: z.string().describe(
          "Required. The model used to generate memories. Format: `projects/{project}/locations/{location}/publishers/google/models/{model}`.",
        ).optional(),
      }).describe("Configuration for how to generate memories.").optional(),
      similaritySearchConfig: z.object({
        embeddingModel: z.string().describe(
          "Required. The model used to generate embeddings to lookup similar memories. Format: `projects/{project}/locations/{location}/publishers/google/models/{model}`.",
        ).optional(),
      }).describe(
        "Configuration for how to perform similarity search on memories.",
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
          "Configuration for TTL of the memories in the Memory Bank based on the action that created or updated the memory.",
        ).optional(),
        memoryRevisionDefaultTtl: z.string().describe(
          "Optional. The default TTL duration of the memory revisions in the Memory Bank. This applies to all operations that create a memory revision. If not set, a default TTL of 365 days will be used.",
        ).optional(),
      }).describe(
        'Configuration for automatically setting the TTL ("time-to-live") of the memories in the Memory Bank.',
      ).optional(),
    }).describe("Specification for a Memory Bank.").optional(),
  }).describe(
    "Configuration for how Agent Engine sub-resources should manage context.",
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
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
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
    classMethods: z.array(z.record(z.string(), z.string())).describe(
      "Optional. Declarations for object class methods in OpenAPI specification format.",
    ).optional(),
    containerSpec: z.object({
      imageUri: z.string().describe(
        "Required. The Artifact Registry Docker image URI (e.g., us-central1-docker.pkg.dev/my-project/my-repo/my-image:tag) of the container image that is to be run on each worker replica.",
      ).optional(),
    }).describe("Specification for deploying from a container image.")
      .optional(),
    deploymentSpec: z.object({
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
        }).describe("Specifies the HTTP GET configuration for the probe.")
          .optional(),
        maxSeconds: z.number().int().describe(
          "Optional. Specifies the maximum duration (in seconds) to keep the instance alive via this probe. Can be a maximum of 3600 seconds (1 hour).",
        ).optional(),
      }).describe(
        "Represents the configuration for keep-alive probe. Contains configuration on a specified endpoint that a deployment host should use to keep the container alive based on the probe settings.",
      ).optional(),
      maxInstances: z.number().int().describe(
        "Optional. The maximum number of application instances that can be launched to handle increased traffic. Defaults to 100. Range: [1, 1000]. If VPC-SC or PSC-I is enabled, the acceptable range is [1, 100].",
      ).optional(),
      minInstances: z.number().int().describe(
        "Optional. The minimum number of application instances that will be kept running at all times. Defaults to 1. Range: [0, 10].",
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
      }).describe("Configuration for PSC-I.").optional(),
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
          "Reference to a secret stored in the Cloud Secret Manager that will provide the value for this environment variable.",
        ).optional(),
      })).describe(
        "Optional. Environment variables where the value is a secret in Cloud Secret Manager. To use this feature, add 'Secret Manager Secret Accessor' role (roles/secretmanager.secretAccessor) to AI Platform Reasoning Engine Service Agent.",
      ).optional(),
    }).describe("The specification of a Reasoning Engine deployment.")
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
        "Optional. The Python version. Supported values are 3.9, 3.10, 3.11, 3.12, 3.13, 3.14. If not specified, the default value is 3.10.",
      ).optional(),
      requirementsGcsUri: z.string().describe(
        "Optional. The Cloud Storage URI of the `requirements.txt` file",
      ).optional(),
    }).describe(
      "User-provided package specification, containing pickled object and package requirements.",
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
        }).describe("Configuration for the Agent Development Kit (ADK).")
          .optional(),
        inlineSource: z.object({
          sourceArchive: z.string().describe(
            "Required. Input only. The application source code archive. It must be a compressed tarball (.tar.gz) file.",
          ).optional(),
        }).describe("Specifies source code provided as a byte stream.")
          .optional(),
      }).describe("Specification for the deploying from agent config.")
        .optional(),
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
          "Specifies the configuration for fetching source code from a Git repository that is managed by Developer Connect. This includes the repository, revision, and directory to use.",
        ).optional(),
      }).describe(
        "Specifies source code to be fetched from a Git repository managed through the Developer Connect service.",
      ).optional(),
      imageSpec: z.object({
        buildArgs: z.record(z.string(), z.string()).describe(
          "Optional. Build arguments to be used. They will be passed through --build-arg flags.",
        ).optional(),
      }).describe(
        "The image spec for building an image (within a single build step), based on the config file (i.e. Dockerfile) in the source directory.",
      ).optional(),
      inlineSource: z.object({
        sourceArchive: z.string().describe(
          "Required. Input only. The application source code archive. It must be a compressed tarball (.tar.gz) file.",
        ).optional(),
      }).describe("Specifies source code provided as a byte stream.")
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
          "Optional. The version of Python to use. Support version includes 3.9, 3.10, 3.11, 3.12, 3.13, 3.14. If not specified, default value is 3.10.",
        ).optional(),
      }).describe("Specification for running a Python application from source.")
        .optional(),
    }).describe("Specification for deploying from source code.").optional(),
  }).describe("ReasoningEngine configurations").optional(),
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
        enableThirdPersonMemories: z.boolean(),
        generateMemoriesExamples: z.array(z.unknown()),
        memoryTopics: z.array(z.unknown()),
        scopeKeys: z.array(z.unknown()),
      })),
      disableMemoryRevisions: z.boolean(),
      generationConfig: z.object({
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
    classMethods: z.array(z.record(z.string(), z.unknown())),
    containerSpec: z.object({
      imageUri: z.string(),
    }),
    deploymentSpec: z.object({
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
  contextSpec: z.object({
    memoryBankConfig: z.object({
      customizationConfigs: z.array(z.object({
        consolidationConfig: z.object({
          revisionsPerCandidateCount: z.unknown().describe(
            "Optional. The maximum number of revisions to consider for each candidate memory. If not set, then the default value (1) will be used, which means that only the latest revision will be considered.",
          ).optional(),
        }).describe(
          "Represents configuration for customizing how memories are consolidated.",
        ).optional(),
        enableThirdPersonMemories: z.boolean().describe(
          'Optional. If true, then the memories will be generated in the third person (i.e. "The user generates memories with Memory Bank."). By default, the memories will be generated in the first person (i.e. "I generate memories with Memory Bank.")',
        ).optional(),
        generateMemoriesExamples: z.array(z.unknown()).describe(
          "Optional. Examples of how to generate memories for a particular scope.",
        ).optional(),
        memoryTopics: z.array(z.unknown()).describe(
          "Optional. Topics of information that should be extracted from conversations and stored as memories. If not set, then Memory Bank's default topics will be used.",
        ).optional(),
        scopeKeys: z.array(z.unknown()).describe(
          "Optional. The scope keys (i.e. 'user_id') for which to use this config. A request's scope must include all of the provided keys for the config to be used (order does not matter). If empty, then the config will be used for all requests that do not have a more specific config. Only one default config is allowed per Memory Bank.",
        ).optional(),
      })).describe(
        "Optional. Configuration for how to customize Memory Bank behavior for a particular scope.",
      ).optional(),
      disableMemoryRevisions: z.boolean().describe(
        "If true, no memory revisions will be created for any requests to the Memory Bank.",
      ).optional(),
      generationConfig: z.object({
        model: z.string().describe(
          "Required. The model used to generate memories. Format: `projects/{project}/locations/{location}/publishers/google/models/{model}`.",
        ).optional(),
      }).describe("Configuration for how to generate memories.").optional(),
      similaritySearchConfig: z.object({
        embeddingModel: z.string().describe(
          "Required. The model used to generate embeddings to lookup similar memories. Format: `projects/{project}/locations/{location}/publishers/google/models/{model}`.",
        ).optional(),
      }).describe(
        "Configuration for how to perform similarity search on memories.",
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
          "Configuration for TTL of the memories in the Memory Bank based on the action that created or updated the memory.",
        ).optional(),
        memoryRevisionDefaultTtl: z.string().describe(
          "Optional. The default TTL duration of the memory revisions in the Memory Bank. This applies to all operations that create a memory revision. If not set, a default TTL of 365 days will be used.",
        ).optional(),
      }).describe(
        'Configuration for automatically setting the TTL ("time-to-live") of the memories in the Memory Bank.',
      ).optional(),
    }).describe("Specification for a Memory Bank.").optional(),
  }).describe(
    "Configuration for how Agent Engine sub-resources should manage context.",
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
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
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
    classMethods: z.array(z.record(z.string(), z.string())).describe(
      "Optional. Declarations for object class methods in OpenAPI specification format.",
    ).optional(),
    containerSpec: z.object({
      imageUri: z.string().describe(
        "Required. The Artifact Registry Docker image URI (e.g., us-central1-docker.pkg.dev/my-project/my-repo/my-image:tag) of the container image that is to be run on each worker replica.",
      ).optional(),
    }).describe("Specification for deploying from a container image.")
      .optional(),
    deploymentSpec: z.object({
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
        }).describe("Specifies the HTTP GET configuration for the probe.")
          .optional(),
        maxSeconds: z.number().int().describe(
          "Optional. Specifies the maximum duration (in seconds) to keep the instance alive via this probe. Can be a maximum of 3600 seconds (1 hour).",
        ).optional(),
      }).describe(
        "Represents the configuration for keep-alive probe. Contains configuration on a specified endpoint that a deployment host should use to keep the container alive based on the probe settings.",
      ).optional(),
      maxInstances: z.number().int().describe(
        "Optional. The maximum number of application instances that can be launched to handle increased traffic. Defaults to 100. Range: [1, 1000]. If VPC-SC or PSC-I is enabled, the acceptable range is [1, 100].",
      ).optional(),
      minInstances: z.number().int().describe(
        "Optional. The minimum number of application instances that will be kept running at all times. Defaults to 1. Range: [0, 10].",
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
      }).describe("Configuration for PSC-I.").optional(),
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
          "Reference to a secret stored in the Cloud Secret Manager that will provide the value for this environment variable.",
        ).optional(),
      })).describe(
        "Optional. Environment variables where the value is a secret in Cloud Secret Manager. To use this feature, add 'Secret Manager Secret Accessor' role (roles/secretmanager.secretAccessor) to AI Platform Reasoning Engine Service Agent.",
      ).optional(),
    }).describe("The specification of a Reasoning Engine deployment.")
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
        "Optional. The Python version. Supported values are 3.9, 3.10, 3.11, 3.12, 3.13, 3.14. If not specified, the default value is 3.10.",
      ).optional(),
      requirementsGcsUri: z.string().describe(
        "Optional. The Cloud Storage URI of the `requirements.txt` file",
      ).optional(),
    }).describe(
      "User-provided package specification, containing pickled object and package requirements.",
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
        }).describe("Configuration for the Agent Development Kit (ADK).")
          .optional(),
        inlineSource: z.object({
          sourceArchive: z.string().describe(
            "Required. Input only. The application source code archive. It must be a compressed tarball (.tar.gz) file.",
          ).optional(),
        }).describe("Specifies source code provided as a byte stream.")
          .optional(),
      }).describe("Specification for the deploying from agent config.")
        .optional(),
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
          "Specifies the configuration for fetching source code from a Git repository that is managed by Developer Connect. This includes the repository, revision, and directory to use.",
        ).optional(),
      }).describe(
        "Specifies source code to be fetched from a Git repository managed through the Developer Connect service.",
      ).optional(),
      imageSpec: z.object({
        buildArgs: z.record(z.string(), z.string()).describe(
          "Optional. Build arguments to be used. They will be passed through --build-arg flags.",
        ).optional(),
      }).describe(
        "The image spec for building an image (within a single build step), based on the config file (i.e. Dockerfile) in the source directory.",
      ).optional(),
      inlineSource: z.object({
        sourceArchive: z.string().describe(
          "Required. Input only. The application source code archive. It must be a compressed tarball (.tar.gz) file.",
        ).optional(),
      }).describe("Specifies source code provided as a byte stream.")
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
          "Optional. The version of Python to use. Support version includes 3.9, 3.10, 3.11, 3.12, 3.13, 3.14. If not specified, default value is 3.10.",
        ).optional(),
      }).describe("Specification for running a Python application from source.")
        .optional(),
    }).describe("Specification for deploying from source code.").optional(),
  }).describe("ReasoningEngine configurations").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Vertex AI ReasoningEngines. Registered at `@swamp/gcp/aiplatform/reasoningengines`. */
export const model = {
  type: "@swamp/gcp/aiplatform/reasoningengines",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
      description: "Get a reasoningEngines",
      arguments: z.object({
        identifier: z.string().describe("The name of the reasoningEngines"),
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
      description: "Update reasoningEngines attributes",
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
      description: "Delete the reasoningEngines",
      arguments: z.object({
        identifier: z.string().describe("The name of the reasoningEngines"),
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
      description: "Sync reasoningEngines state from GCP",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "reasoningEngines",
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
    execute_code: {
      description: "execute code",
      arguments: z.object({
        inputs: z.any().optional(),
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
        if (args["inputs"] !== undefined) body["inputs"] = args["inputs"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.reasoningEngines.executeCode",
            "path": "v1/{+name}:executeCode",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["classMethod"] !== undefined) {
          body["classMethod"] = args["classMethod"];
        }
        if (args["input"] !== undefined) body["input"] = args["input"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.reasoningEngines.query",
            "path": "v1/{+name}:query",
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
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
        const result = await createResource(
          BASE_URL,
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["classMethod"] !== undefined) {
          body["classMethod"] = args["classMethod"];
        }
        if (args["input"] !== undefined) body["input"] = args["input"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.reasoningEngines.streamQuery",
            "path": "v1/{+name}:streamQuery",
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
        );
        return { result };
      },
    },
  },
};
