// Auto-generated extension model for @swamp/gcp/artifactregistry/repositories
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Artifact Registry Repositories.
 *
 * A Repository for storing artifacts with a specific format.
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
  return `${parent}/repositories/${shortName}`;
}

const BASE_URL = "https://artifactregistry.googleapis.com/";

const GET_CONFIG = {
  "id": "artifactregistry.projects.locations.repositories.get",
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
  "id": "artifactregistry.projects.locations.repositories.create",
  "path": "v1/{+parent}/repositories",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "repositoryId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "artifactregistry.projects.locations.repositories.patch",
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
  "id": "artifactregistry.projects.locations.repositories.delete",
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

const LIST_CONFIG = {
  "id": "artifactregistry.projects.locations.repositories.list",
  "path": "v1/{+parent}/repositories",
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
  cleanupPolicies: z.record(
    z.string(),
    z.object({
      action: z.enum(["ACTION_UNSPECIFIED", "DELETE", "KEEP"]).describe(
        "Policy action.",
      ).optional(),
      condition: z.object({
        newerThan: z.string().describe("Match versions newer than a duration.")
          .optional(),
        olderThan: z.string().describe("Match versions older than a duration.")
          .optional(),
        packageNamePrefixes: z.array(z.string()).describe(
          "Match versions by package prefix. Applied on any prefix match.",
        ).optional(),
        tagPrefixes: z.array(z.string()).describe(
          "Match versions by tag prefix. Applied on any prefix match.",
        ).optional(),
        tagState: z.enum(["TAG_STATE_UNSPECIFIED", "TAGGED", "UNTAGGED", "ANY"])
          .describe("Match versions by tag status.").optional(),
        versionNamePrefixes: z.array(z.string()).describe(
          "Match versions by version name prefix. Applied on any prefix match.",
        ).optional(),
      }).describe(
        "CleanupPolicyCondition is a set of conditions attached to a CleanupPolicy. If multiple entries are set, all must be satisfied for the condition to be satisfied.",
      ).optional(),
      id: z.string().describe("The user-provided ID of the cleanup policy.")
        .optional(),
      mostRecentVersions: z.object({
        keepCount: z.number().int().describe(
          "Minimum number of versions to keep.",
        ).optional(),
        packageNamePrefixes: z.array(z.string()).describe(
          "List of package name prefixes that will apply this rule.",
        ).optional(),
      }).describe(
        "CleanupPolicyMostRecentVersions is an alternate condition of a CleanupPolicy for retaining a minimum number of versions.",
      ).optional(),
    }),
  ).describe(
    "Optional. Cleanup policies for this repository. Cleanup policies indicate when certain package versions can be automatically deleted. Map keys are policy IDs supplied by users during policy creation. They must unique within a repository and be under 128 characters in length.",
  ).optional(),
  cleanupPolicyDryRun: z.boolean().describe(
    "Optional. If true, the cleanup pipeline is prevented from deleting versions in this repository.",
  ).optional(),
  description: z.string().describe(
    "The user-provided description of the repository.",
  ).optional(),
  disallowUnspecifiedMode: z.boolean().describe(
    "Optional. If this is true, an unspecified repo type will be treated as error rather than defaulting to standard.",
  ).optional(),
  dockerConfig: z.object({
    immutableTags: z.boolean().describe(
      "The repository which enabled this flag prevents all tags from being modified, moved or deleted. This does not prevent tags from being created.",
    ).optional(),
  }).describe(
    "DockerRepositoryConfig is docker related repository details. Provides additional configuration details for repositories of the docker format type.",
  ).optional(),
  format: z.enum([
    "FORMAT_UNSPECIFIED",
    "DOCKER",
    "MAVEN",
    "NPM",
    "APT",
    "YUM",
    "GOOGET",
    "PYTHON",
    "KFP",
    "GO",
    "GENERIC",
    "RUBY",
  ]).describe(
    "Optional. The format of packages that are stored in the repository.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "The Cloud KMS resource name of the customer managed encryption key that's used to encrypt the contents of the Repository. Has the form: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. This value may not be changed after the Repository has been created.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels with user-defined metadata. This field may contain up to 64 entries. Label keys and values may be no longer than 63 characters. Label keys must begin with a lowercase letter and may only contain lowercase letters, numeric characters, underscores, and dashes.",
  ).optional(),
  mavenConfig: z.object({
    allowSnapshotOverwrites: z.boolean().describe(
      "The repository with this flag will allow publishing the same snapshot versions.",
    ).optional(),
    versionPolicy: z.enum(["VERSION_POLICY_UNSPECIFIED", "RELEASE", "SNAPSHOT"])
      .describe(
        "Version policy defines the versions that the registry will accept.",
      ).optional(),
  }).describe(
    "MavenRepositoryConfig is maven related repository details. Provides additional configuration details for repositories of the maven format type.",
  ).optional(),
  mode: z.enum([
    "MODE_UNSPECIFIED",
    "STANDARD_REPOSITORY",
    "VIRTUAL_REPOSITORY",
    "REMOTE_REPOSITORY",
    "AOSS_REPOSITORY",
    "ASSURED_OSS_REPOSITORY",
  ]).describe("Optional. The mode of the repository.").optional(),
  name: z.string().describe(
    "The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique.",
  ).optional(),
  platformLogsConfig: z.object({
    loggingState: z.enum(["LOGGING_STATE_UNSPECIFIED", "ENABLED", "DISABLED"])
      .describe(
        "Optional. The state of the platform logs: enabled or disabled.",
      ).optional(),
    severityLevel: z.enum([
      "SEVERITY_LEVEL_UNSPECIFIED",
      "DEBUG",
      "INFO",
      "NOTICE",
      "WARNING",
      "ERROR",
      "CRITICAL",
      "ALERT",
      "EMERGENCY",
    ]).describe(
      "Optional. The severity level for the logs. Logs will be generated if their severity level is >= than the value of the severity level mentioned here.",
    ).optional(),
  }).describe("The platform logs config for a project or a repository.")
    .optional(),
  remoteRepositoryConfig: z.object({
    aptRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the upstream remote repository, for ex: "https://my.apt.registry/".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.object({
        repositoryBase: z.enum([
          "REPOSITORY_BASE_UNSPECIFIED",
          "DEBIAN",
          "UBUNTU",
          "DEBIAN_SNAPSHOT",
        ]).describe("A common public repository base for Apt.").optional(),
        repositoryPath: z.string().describe(
          "A custom field to define a path to a specific repository from the base.",
        ).optional(),
      }).describe(
        "Publicly available Apt repositories constructed from a common repository base and a custom repository path.",
      ).optional(),
    }).describe("Configuration for an Apt remote repository.").optional(),
    commonRepository: z.object({
      uri: z.string().describe(
        "Required. A common public repository base for remote repository.",
      ).optional(),
    }).describe("Common remote repository settings type.").optional(),
    description: z.string().describe("The description of the remote source.")
      .optional(),
    disableUpstreamValidation: z.boolean().describe(
      "Input only. A create/update remote repo option to avoid making a HEAD/GET request to validate a remote repo and any supplied upstream credentials.",
    ).optional(),
    dockerRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the custom remote repository, for ex: "https://registry-1.docker.io".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.enum(["PUBLIC_REPOSITORY_UNSPECIFIED", "DOCKER_HUB"])
        .describe(
          "One of the publicly available Docker repositories supported by Artifact Registry.",
        ).optional(),
    }).describe("Configuration for a Docker remote repository.").optional(),
    mavenRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the upstream remote repository, for ex: "https://my.maven.registry/".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.enum([
        "PUBLIC_REPOSITORY_UNSPECIFIED",
        "MAVEN_CENTRAL",
      ]).describe(
        "One of the publicly available Maven repositories supported by Artifact Registry.",
      ).optional(),
    }).describe("Configuration for a Maven remote repository.").optional(),
    npmRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the upstream remote repository, for ex: "https://my.npm.registry/".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.enum(["PUBLIC_REPOSITORY_UNSPECIFIED", "NPMJS"])
        .describe(
          "One of the publicly available Npm repositories supported by Artifact Registry.",
        ).optional(),
    }).describe("Configuration for a Npm remote repository.").optional(),
    pythonRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the upstream remote repository, for ex: "https://my.python.registry/".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.enum(["PUBLIC_REPOSITORY_UNSPECIFIED", "PYPI"])
        .describe(
          "One of the publicly available Python repositories supported by Artifact Registry.",
        ).optional(),
    }).describe("Configuration for a Python remote repository.").optional(),
    upstreamCredentials: z.object({
      usernamePasswordCredentials: z.object({
        passwordSecretVersion: z.string().describe(
          "The Secret Manager key version that holds the password to access the remote repository. Must be in the format of `projects/{project}/secrets/{secret}/versions/{version}`.",
        ).optional(),
        username: z.string().describe(
          "The username to access the remote repository.",
        ).optional(),
      }).describe("Username and password credentials.").optional(),
    }).describe("The credentials to access the remote repository.").optional(),
    yumRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the upstream remote repository, for ex: "https://my.yum.registry/".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.object({
        repositoryBase: z.enum([
          "REPOSITORY_BASE_UNSPECIFIED",
          "CENTOS",
          "CENTOS_DEBUG",
          "CENTOS_VAULT",
          "CENTOS_STREAM",
          "ROCKY",
          "EPEL",
        ]).describe("A common public repository base for Yum.").optional(),
        repositoryPath: z.string().describe(
          "A custom field to define a path to a specific repository from the base.",
        ).optional(),
      }).describe(
        "Publicly available Yum repositories constructed from a common repository base and a custom repository path.",
      ).optional(),
    }).describe("Configuration for a Yum remote repository.").optional(),
  }).describe("Remote repository configuration.").optional(),
  virtualRepositoryConfig: z.object({
    upstreamPolicies: z.array(z.object({
      id: z.string().describe("The user-provided ID of the upstream policy.")
        .optional(),
      priority: z.number().int().describe(
        "Entries with a greater priority value take precedence in the pull order.",
      ).optional(),
      repository: z.string().describe(
        "A reference to the repository resource, for example: `projects/p1/locations/us-central1/repositories/repo1`.",
      ).optional(),
    })).describe(
      "Policies that configure the upstream artifacts distributed by the Virtual Repository. Upstream policies cannot be set on a standard repository.",
    ).optional(),
  }).describe("Virtual repository configuration.").optional(),
  vulnerabilityScanningConfig: z.object({
    enablementConfig: z.enum([
      "ENABLEMENT_CONFIG_UNSPECIFIED",
      "INHERITED",
      "DISABLED",
    ]).describe(
      "Optional. Config for whether this repository has vulnerability scanning disabled.",
    ).optional(),
    enablementState: z.enum([
      "ENABLEMENT_STATE_UNSPECIFIED",
      "SCANNING_UNSUPPORTED",
      "SCANNING_DISABLED",
      "SCANNING_ACTIVE",
    ]).describe(
      "Output only. State of feature enablement, combining repository enablement config and API enablement state.",
    ).optional(),
    enablementStateReason: z.string().describe(
      "Output only. Reason for the repository state.",
    ).optional(),
    lastEnableTime: z.string().describe(
      "Output only. The last time this repository config was enabled.",
    ).optional(),
  }).describe(
    "Config on whether to perform vulnerability scanning for resources in this repository, as well as output fields describing current state.",
  ).optional(),
  repositoryId: z.string().describe(
    "Required. The repository id to use for this repository.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  cleanupPolicies: z.record(z.string(), z.unknown()).optional(),
  cleanupPolicyDryRun: z.boolean().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  disallowUnspecifiedMode: z.boolean().optional(),
  dockerConfig: z.object({
    immutableTags: z.boolean(),
  }).optional(),
  format: z.string().optional(),
  kmsKeyName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  mavenConfig: z.object({
    allowSnapshotOverwrites: z.boolean(),
    versionPolicy: z.string(),
  }).optional(),
  mode: z.string().optional(),
  name: z.string(),
  platformLogsConfig: z.object({
    loggingState: z.string(),
    severityLevel: z.string(),
  }).optional(),
  registryUri: z.string().optional(),
  remoteRepositoryConfig: z.object({
    aptRepository: z.object({
      customRepository: z.object({
        uri: z.string(),
      }),
      publicRepository: z.object({
        repositoryBase: z.string(),
        repositoryPath: z.string(),
      }),
    }),
    commonRepository: z.object({
      uri: z.string(),
    }),
    description: z.string(),
    disableUpstreamValidation: z.boolean(),
    dockerRepository: z.object({
      customRepository: z.object({
        uri: z.string(),
      }),
      publicRepository: z.string(),
    }),
    mavenRepository: z.object({
      customRepository: z.object({
        uri: z.string(),
      }),
      publicRepository: z.string(),
    }),
    npmRepository: z.object({
      customRepository: z.object({
        uri: z.string(),
      }),
      publicRepository: z.string(),
    }),
    pythonRepository: z.object({
      customRepository: z.object({
        uri: z.string(),
      }),
      publicRepository: z.string(),
    }),
    upstreamCredentials: z.object({
      usernamePasswordCredentials: z.object({
        passwordSecretVersion: z.string(),
        username: z.string(),
      }),
    }),
    yumRepository: z.object({
      customRepository: z.object({
        uri: z.string(),
      }),
      publicRepository: z.object({
        repositoryBase: z.string(),
        repositoryPath: z.string(),
      }),
    }),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  sizeBytes: z.string().optional(),
  updateTime: z.string().optional(),
  virtualRepositoryConfig: z.object({
    upstreamPolicies: z.array(z.object({
      id: z.string(),
      priority: z.number(),
      repository: z.string(),
    })),
  }).optional(),
  vulnerabilityScanningConfig: z.object({
    enablementConfig: z.string(),
    enablementState: z.string(),
    enablementStateReason: z.string(),
    lastEnableTime: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  cleanupPolicies: z.record(
    z.string(),
    z.object({
      action: z.enum(["ACTION_UNSPECIFIED", "DELETE", "KEEP"]).describe(
        "Policy action.",
      ).optional(),
      condition: z.object({
        newerThan: z.string().describe("Match versions newer than a duration.")
          .optional(),
        olderThan: z.string().describe("Match versions older than a duration.")
          .optional(),
        packageNamePrefixes: z.array(z.string()).describe(
          "Match versions by package prefix. Applied on any prefix match.",
        ).optional(),
        tagPrefixes: z.array(z.string()).describe(
          "Match versions by tag prefix. Applied on any prefix match.",
        ).optional(),
        tagState: z.enum(["TAG_STATE_UNSPECIFIED", "TAGGED", "UNTAGGED", "ANY"])
          .describe("Match versions by tag status.").optional(),
        versionNamePrefixes: z.array(z.string()).describe(
          "Match versions by version name prefix. Applied on any prefix match.",
        ).optional(),
      }).describe(
        "CleanupPolicyCondition is a set of conditions attached to a CleanupPolicy. If multiple entries are set, all must be satisfied for the condition to be satisfied.",
      ).optional(),
      id: z.string().describe("The user-provided ID of the cleanup policy.")
        .optional(),
      mostRecentVersions: z.object({
        keepCount: z.number().int().describe(
          "Minimum number of versions to keep.",
        ).optional(),
        packageNamePrefixes: z.array(z.string()).describe(
          "List of package name prefixes that will apply this rule.",
        ).optional(),
      }).describe(
        "CleanupPolicyMostRecentVersions is an alternate condition of a CleanupPolicy for retaining a minimum number of versions.",
      ).optional(),
    }),
  ).describe(
    "Optional. Cleanup policies for this repository. Cleanup policies indicate when certain package versions can be automatically deleted. Map keys are policy IDs supplied by users during policy creation. They must unique within a repository and be under 128 characters in length.",
  ).optional(),
  cleanupPolicyDryRun: z.boolean().describe(
    "Optional. If true, the cleanup pipeline is prevented from deleting versions in this repository.",
  ).optional(),
  description: z.string().describe(
    "The user-provided description of the repository.",
  ).optional(),
  disallowUnspecifiedMode: z.boolean().describe(
    "Optional. If this is true, an unspecified repo type will be treated as error rather than defaulting to standard.",
  ).optional(),
  dockerConfig: z.object({
    immutableTags: z.boolean().describe(
      "The repository which enabled this flag prevents all tags from being modified, moved or deleted. This does not prevent tags from being created.",
    ).optional(),
  }).describe(
    "DockerRepositoryConfig is docker related repository details. Provides additional configuration details for repositories of the docker format type.",
  ).optional(),
  format: z.enum([
    "FORMAT_UNSPECIFIED",
    "DOCKER",
    "MAVEN",
    "NPM",
    "APT",
    "YUM",
    "GOOGET",
    "PYTHON",
    "KFP",
    "GO",
    "GENERIC",
    "RUBY",
  ]).describe(
    "Optional. The format of packages that are stored in the repository.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "The Cloud KMS resource name of the customer managed encryption key that's used to encrypt the contents of the Repository. Has the form: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. This value may not be changed after the Repository has been created.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels with user-defined metadata. This field may contain up to 64 entries. Label keys and values may be no longer than 63 characters. Label keys must begin with a lowercase letter and may only contain lowercase letters, numeric characters, underscores, and dashes.",
  ).optional(),
  mavenConfig: z.object({
    allowSnapshotOverwrites: z.boolean().describe(
      "The repository with this flag will allow publishing the same snapshot versions.",
    ).optional(),
    versionPolicy: z.enum(["VERSION_POLICY_UNSPECIFIED", "RELEASE", "SNAPSHOT"])
      .describe(
        "Version policy defines the versions that the registry will accept.",
      ).optional(),
  }).describe(
    "MavenRepositoryConfig is maven related repository details. Provides additional configuration details for repositories of the maven format type.",
  ).optional(),
  mode: z.enum([
    "MODE_UNSPECIFIED",
    "STANDARD_REPOSITORY",
    "VIRTUAL_REPOSITORY",
    "REMOTE_REPOSITORY",
    "AOSS_REPOSITORY",
    "ASSURED_OSS_REPOSITORY",
  ]).describe("Optional. The mode of the repository.").optional(),
  name: z.string().describe(
    "The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique.",
  ).optional(),
  platformLogsConfig: z.object({
    loggingState: z.enum(["LOGGING_STATE_UNSPECIFIED", "ENABLED", "DISABLED"])
      .describe(
        "Optional. The state of the platform logs: enabled or disabled.",
      ).optional(),
    severityLevel: z.enum([
      "SEVERITY_LEVEL_UNSPECIFIED",
      "DEBUG",
      "INFO",
      "NOTICE",
      "WARNING",
      "ERROR",
      "CRITICAL",
      "ALERT",
      "EMERGENCY",
    ]).describe(
      "Optional. The severity level for the logs. Logs will be generated if their severity level is >= than the value of the severity level mentioned here.",
    ).optional(),
  }).describe("The platform logs config for a project or a repository.")
    .optional(),
  remoteRepositoryConfig: z.object({
    aptRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the upstream remote repository, for ex: "https://my.apt.registry/".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.object({
        repositoryBase: z.enum([
          "REPOSITORY_BASE_UNSPECIFIED",
          "DEBIAN",
          "UBUNTU",
          "DEBIAN_SNAPSHOT",
        ]).describe("A common public repository base for Apt.").optional(),
        repositoryPath: z.string().describe(
          "A custom field to define a path to a specific repository from the base.",
        ).optional(),
      }).describe(
        "Publicly available Apt repositories constructed from a common repository base and a custom repository path.",
      ).optional(),
    }).describe("Configuration for an Apt remote repository.").optional(),
    commonRepository: z.object({
      uri: z.string().describe(
        "Required. A common public repository base for remote repository.",
      ).optional(),
    }).describe("Common remote repository settings type.").optional(),
    description: z.string().describe("The description of the remote source.")
      .optional(),
    disableUpstreamValidation: z.boolean().describe(
      "Input only. A create/update remote repo option to avoid making a HEAD/GET request to validate a remote repo and any supplied upstream credentials.",
    ).optional(),
    dockerRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the custom remote repository, for ex: "https://registry-1.docker.io".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.enum(["PUBLIC_REPOSITORY_UNSPECIFIED", "DOCKER_HUB"])
        .describe(
          "One of the publicly available Docker repositories supported by Artifact Registry.",
        ).optional(),
    }).describe("Configuration for a Docker remote repository.").optional(),
    mavenRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the upstream remote repository, for ex: "https://my.maven.registry/".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.enum([
        "PUBLIC_REPOSITORY_UNSPECIFIED",
        "MAVEN_CENTRAL",
      ]).describe(
        "One of the publicly available Maven repositories supported by Artifact Registry.",
      ).optional(),
    }).describe("Configuration for a Maven remote repository.").optional(),
    npmRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the upstream remote repository, for ex: "https://my.npm.registry/".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.enum(["PUBLIC_REPOSITORY_UNSPECIFIED", "NPMJS"])
        .describe(
          "One of the publicly available Npm repositories supported by Artifact Registry.",
        ).optional(),
    }).describe("Configuration for a Npm remote repository.").optional(),
    pythonRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the upstream remote repository, for ex: "https://my.python.registry/".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.enum(["PUBLIC_REPOSITORY_UNSPECIFIED", "PYPI"])
        .describe(
          "One of the publicly available Python repositories supported by Artifact Registry.",
        ).optional(),
    }).describe("Configuration for a Python remote repository.").optional(),
    upstreamCredentials: z.object({
      usernamePasswordCredentials: z.object({
        passwordSecretVersion: z.string().describe(
          "The Secret Manager key version that holds the password to access the remote repository. Must be in the format of `projects/{project}/secrets/{secret}/versions/{version}`.",
        ).optional(),
        username: z.string().describe(
          "The username to access the remote repository.",
        ).optional(),
      }).describe("Username and password credentials.").optional(),
    }).describe("The credentials to access the remote repository.").optional(),
    yumRepository: z.object({
      customRepository: z.object({
        uri: z.string().describe(
          'An http/https uri reference to the upstream remote repository, for ex: "https://my.yum.registry/".',
        ).optional(),
      }).describe("Customer-specified publicly available remote repository.")
        .optional(),
      publicRepository: z.object({
        repositoryBase: z.enum([
          "REPOSITORY_BASE_UNSPECIFIED",
          "CENTOS",
          "CENTOS_DEBUG",
          "CENTOS_VAULT",
          "CENTOS_STREAM",
          "ROCKY",
          "EPEL",
        ]).describe("A common public repository base for Yum.").optional(),
        repositoryPath: z.string().describe(
          "A custom field to define a path to a specific repository from the base.",
        ).optional(),
      }).describe(
        "Publicly available Yum repositories constructed from a common repository base and a custom repository path.",
      ).optional(),
    }).describe("Configuration for a Yum remote repository.").optional(),
  }).describe("Remote repository configuration.").optional(),
  virtualRepositoryConfig: z.object({
    upstreamPolicies: z.array(z.object({
      id: z.string().describe("The user-provided ID of the upstream policy.")
        .optional(),
      priority: z.number().int().describe(
        "Entries with a greater priority value take precedence in the pull order.",
      ).optional(),
      repository: z.string().describe(
        "A reference to the repository resource, for example: `projects/p1/locations/us-central1/repositories/repo1`.",
      ).optional(),
    })).describe(
      "Policies that configure the upstream artifacts distributed by the Virtual Repository. Upstream policies cannot be set on a standard repository.",
    ).optional(),
  }).describe("Virtual repository configuration.").optional(),
  vulnerabilityScanningConfig: z.object({
    enablementConfig: z.enum([
      "ENABLEMENT_CONFIG_UNSPECIFIED",
      "INHERITED",
      "DISABLED",
    ]).describe(
      "Optional. Config for whether this repository has vulnerability scanning disabled.",
    ).optional(),
    enablementState: z.enum([
      "ENABLEMENT_STATE_UNSPECIFIED",
      "SCANNING_UNSUPPORTED",
      "SCANNING_DISABLED",
      "SCANNING_ACTIVE",
    ]).describe(
      "Output only. State of feature enablement, combining repository enablement config and API enablement state.",
    ).optional(),
    enablementStateReason: z.string().describe(
      "Output only. Reason for the repository state.",
    ).optional(),
    lastEnableTime: z.string().describe(
      "Output only. The last time this repository config was enabled.",
    ).optional(),
  }).describe(
    "Config on whether to perform vulnerability scanning for resources in this repository, as well as output fields describing current state.",
  ).optional(),
  repositoryId: z.string().describe(
    "Required. The repository id to use for this repository.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Artifact Registry Repositories. Registered at `@swamp/gcp/artifactregistry/repositories`. */
export const model = {
  type: "@swamp/gcp/artifactregistry/repositories",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Repository for storing artifacts with a specific format.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a repositories",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["cleanupPolicies"] !== undefined) {
          body["cleanupPolicies"] = g["cleanupPolicies"];
        }
        if (g["cleanupPolicyDryRun"] !== undefined) {
          body["cleanupPolicyDryRun"] = g["cleanupPolicyDryRun"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disallowUnspecifiedMode"] !== undefined) {
          body["disallowUnspecifiedMode"] = g["disallowUnspecifiedMode"];
        }
        if (g["dockerConfig"] !== undefined) {
          body["dockerConfig"] = g["dockerConfig"];
        }
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["mavenConfig"] !== undefined) {
          body["mavenConfig"] = g["mavenConfig"];
        }
        if (g["mode"] !== undefined) body["mode"] = g["mode"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["platformLogsConfig"] !== undefined) {
          body["platformLogsConfig"] = g["platformLogsConfig"];
        }
        if (g["remoteRepositoryConfig"] !== undefined) {
          body["remoteRepositoryConfig"] = g["remoteRepositoryConfig"];
        }
        if (g["virtualRepositoryConfig"] !== undefined) {
          body["virtualRepositoryConfig"] = g["virtualRepositoryConfig"];
        }
        if (g["vulnerabilityScanningConfig"] !== undefined) {
          body["vulnerabilityScanningConfig"] =
            g["vulnerabilityScanningConfig"];
        }
        if (g["repositoryId"] !== undefined) {
          body["repositoryId"] = g["repositoryId"];
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
      description: "Get a repositories",
      arguments: z.object({
        identifier: z.string().describe("The name of the repositories"),
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
      description: "Update repositories attributes",
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
        if (g["cleanupPolicies"] !== undefined) {
          body["cleanupPolicies"] = g["cleanupPolicies"];
        }
        if (g["cleanupPolicyDryRun"] !== undefined) {
          body["cleanupPolicyDryRun"] = g["cleanupPolicyDryRun"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disallowUnspecifiedMode"] !== undefined) {
          body["disallowUnspecifiedMode"] = g["disallowUnspecifiedMode"];
        }
        if (g["dockerConfig"] !== undefined) {
          body["dockerConfig"] = g["dockerConfig"];
        }
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["mavenConfig"] !== undefined) {
          body["mavenConfig"] = g["mavenConfig"];
        }
        if (g["mode"] !== undefined) body["mode"] = g["mode"];
        if (g["platformLogsConfig"] !== undefined) {
          body["platformLogsConfig"] = g["platformLogsConfig"];
        }
        if (g["remoteRepositoryConfig"] !== undefined) {
          body["remoteRepositoryConfig"] = g["remoteRepositoryConfig"];
        }
        if (g["virtualRepositoryConfig"] !== undefined) {
          body["virtualRepositoryConfig"] = g["virtualRepositoryConfig"];
        }
        if (g["vulnerabilityScanningConfig"] !== undefined) {
          body["vulnerabilityScanningConfig"] =
            g["vulnerabilityScanningConfig"];
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
      description: "Delete the repositories",
      arguments: z.object({
        identifier: z.string().describe("The name of the repositories"),
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
      description: "Sync repositories state from GCP",
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
    export_artifact: {
      description: "export artifact",
      arguments: z.object({
        gcsPath: z.any().optional(),
        sourceTag: z.any().optional(),
        sourceVersion: z.any().optional(),
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
        params["repository"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["gcsPath"] !== undefined) body["gcsPath"] = args["gcsPath"];
        if (args["sourceTag"] !== undefined) {
          body["sourceTag"] = args["sourceTag"];
        }
        if (args["sourceVersion"] !== undefined) {
          body["sourceVersion"] = args["sourceVersion"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "artifactregistry.projects.locations.repositories.exportArtifact",
            "path": "v1/{+repository}:exportArtifact",
            "httpMethod": "POST",
            "parameterOrder": ["repository"],
            "parameters": {
              "repository": { "location": "path", "required": true },
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
            "id":
              "artifactregistry.projects.locations.repositories.getIamPolicy",
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
            "id":
              "artifactregistry.projects.locations.repositories.setIamPolicy",
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
              "artifactregistry.projects.locations.repositories.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
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
