// Auto-generated extension model for @swamp/gcp/dataproc/batches
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataproc Batches.
 *
 * A representation of a batch workload in the service.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/batches/${shortName}`;
}

const BASE_URL = "https://dataproc.googleapis.com/";

const GET_CONFIG = {
  "id": "dataproc.projects.locations.batches.get",
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
  "id": "dataproc.projects.locations.batches.create",
  "path": "v1/{+parent}/batches",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "batchId": {
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

const DELETE_CONFIG = {
  "id": "dataproc.projects.locations.batches.delete",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  environmentConfig: z.object({
    executionConfig: z.object({
      authenticationConfig: z.object({
        userWorkloadAuthenticationType: z.enum([
          "AUTHENTICATION_TYPE_UNSPECIFIED",
          "SERVICE_ACCOUNT",
          "END_USER_CREDENTIALS",
        ]).describe(
          "Optional. Authentication type for the user workload running in containers.",
        ).optional(),
      }).describe(
        "Authentication configuration for a workload is used to set the default identity for the workload execution. The config specifies the type of identity (service account or user) that will be used by workloads to access resources on the project(s).",
      ).optional(),
      idleTtl: z.string().describe(
        "Optional. Applies to sessions only. The duration to keep the session alive while it's idling. Exceeding this threshold causes the session to terminate. This field cannot be set on a batch workload. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). Defaults to 1 hour if not set. If both ttl and idle_ttl are specified for an interactive session, the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
      kmsKey: z.string().describe(
        "Optional. The Cloud KMS key to use for encryption.",
      ).optional(),
      networkTags: z.array(z.string()).describe(
        "Optional. Tags used for network traffic control.",
      ).optional(),
      networkUri: z.string().describe(
        "Optional. Network URI to connect workload to.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. Service account that used to execute workload.",
      ).optional(),
      stagingBucket: z.string().describe(
        "Optional. A Cloud Storage bucket used to stage workload dependencies, config files, and store workload output and other ephemeral data, such as Spark history files. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location according to the region where your workload is running, and then create and manage project-level, per-location staging and temporary buckets. This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
      ).optional(),
      subnetworkUri: z.string().describe(
        "Optional. Subnetwork URI to connect workload to.",
      ).optional(),
      ttl: z.string().describe(
        "Optional. The duration after which the workload will be terminated, specified as the JSON representation for Duration (https://protobuf.dev/programming-guides/proto3/#json). When the workload exceeds this duration, it will be unconditionally terminated without waiting for ongoing work to finish. If ttl is not specified for a batch workload, the workload will be allowed to run until it exits naturally (or run forever without exiting). If ttl is not specified for an interactive session, it defaults to 24 hours. If ttl is not specified for a batch that uses 2.1+ runtime version, it defaults to 4 hours. Minimum value is 10 minutes; maximum value is 14 days. If both ttl and idle_ttl are specified (for an interactive session), the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
    }).describe("Execution configuration for a workload.").optional(),
    peripheralsConfig: z.object({
      metastoreService: z.string().describe(
        "Optional. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[region]/services/[service_id]",
      ).optional(),
      sparkHistoryServerConfig: z.object({
        dataprocCluster: z.string().describe(
          "Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the workload.Example: projects/[project_id]/regions/[region]/clusters/[cluster_name]",
        ).optional(),
      }).describe("Spark History Server configuration for the workload.")
        .optional(),
    }).describe("Auxiliary services configuration for a workload.").optional(),
  }).describe("Environment configuration for a workload.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels to associate with this batch. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a batch.",
  ).optional(),
  pysparkBatch: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments that can be set as batch properties, such as --conf, since a collision can occur that causes an incorrect batch submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the classpath of the Spark driver and tasks.",
    ).optional(),
    mainPythonFileUri: z.string().describe(
      "Required. The HCFS URI of the main Python file to use as the Spark driver. Must be a.py file.",
    ).optional(),
    pythonFileUris: z.array(z.string()).describe(
      "Optional. HCFS file URIs of Python files to pass to the PySpark framework. Supported file types:.py,.egg, and.zip.",
    ).optional(),
  }).describe(
    "A configuration for running an Apache PySpark (https://spark.apache.org/docs/latest/api/python/getting_started/quickstart.html) batch workload.",
  ).optional(),
  runtimeConfig: z.object({
    autotuningConfig: z.object({
      scenarios: z.array(
        z.enum([
          "SCENARIO_UNSPECIFIED",
          "SCALING",
          "BROADCAST_HASH_JOIN",
          "MEMORY",
          "NONE",
          "AUTO",
        ]),
      ).describe("Optional. Scenarios for which tunings are applied.")
        .optional(),
    }).describe("Autotuning configuration of the workload.").optional(),
    cohort: z.string().describe(
      "Optional. Cohort identifier. Identifies families of the workloads that have the same shape, for example, daily ETL jobs.",
    ).optional(),
    containerImage: z.string().describe(
      "Optional. Optional custom container image for the job runtime environment. If not specified, a default container image will be used.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, which are used to configure workload execution.",
    ).optional(),
    repositoryConfig: z.object({
      pypiRepositoryConfig: z.object({
        pypiRepository: z.string().describe(
          "Optional. The PyPi repository address. Note: This field is not available for batch workloads.",
        ).optional(),
      }).describe("Configuration for PyPi repository").optional(),
    }).describe("Configuration for dependency repositories").optional(),
    version: z.string().describe("Optional. Version of the batch runtime.")
      .optional(),
  }).describe("Runtime configuration for a workload.").optional(),
  runtimeInfo: z.object({
    approximateUsage: z.object({
      acceleratorType: z.string().describe(
        "Optional. DEPRECATED Accelerator type being used, if any",
      ).optional(),
      milliAcceleratorSeconds: z.string().describe(
        "Optional. DEPRECATED Accelerator usage in (milliAccelerator x seconds) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).",
      ).optional(),
      milliDcuSeconds: z.string().describe(
        "Optional. DCU (Dataproc Compute Units) usage in (milliDCU x seconds) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).",
      ).optional(),
      shuffleStorageGbSeconds: z.string().describe(
        "Optional. Shuffle storage usage in (GB x seconds) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).",
      ).optional(),
      updateTime: z.string().describe(
        "Optional. The timestamp of the usage metrics.",
      ).optional(),
    }).describe(
      "Usage metrics represent approximate total resources consumed by a workload.",
    ).optional(),
    cohortInfo: z.object({
      cohort: z.string().describe(
        "Output only. Final cohort that was used to tune the workload.",
      ).optional(),
      cohortSource: z.enum([
        "COHORT_SOURCE_UNSPECIFIED",
        "USER_PROVIDED",
        "AIRFLOW",
      ]).describe("Output only. Source of the cohort.").optional(),
    }).describe("Information about the cohort that the workload belongs to.")
      .optional(),
    currentUsage: z.object({
      acceleratorType: z.string().describe(
        "Optional. Accelerator type being used, if any",
      ).optional(),
      milliAccelerator: z.string().describe(
        "Optional. Milli (one-thousandth) accelerator. (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing))",
      ).optional(),
      milliDcu: z.string().describe(
        "Optional. Milli (one-thousandth) Dataproc Compute Units (DCUs) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).",
      ).optional(),
      milliDcuPremium: z.string().describe(
        "Optional. Milli (one-thousandth) Dataproc Compute Units (DCUs) charged at premium tier (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).",
      ).optional(),
      shuffleStorageGb: z.string().describe(
        "Optional. Shuffle Storage in gigabytes (GB). (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing))",
      ).optional(),
      shuffleStorageGbPremium: z.string().describe(
        "Optional. Shuffle Storage in gigabytes (GB) charged at premium tier. (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing))",
      ).optional(),
      snapshotTime: z.string().describe(
        "Optional. The timestamp of the usage snapshot.",
      ).optional(),
    }).describe(
      "The usage snapshot represents the resources consumed by a workload at a specified time.",
    ).optional(),
    diagnosticOutputUri: z.string().describe(
      "Output only. A URI pointing to the location of the diagnostics tarball.",
    ).optional(),
    endpoints: z.record(z.string(), z.string()).describe(
      "Output only. Map of remote access endpoints (such as web interfaces and APIs) to their URIs.",
    ).optional(),
    outputUri: z.string().describe(
      "Output only. A URI pointing to the location of the stdout and stderr of the workload.",
    ).optional(),
    propertiesInfo: z.object({
      autotuningProperties: z.record(
        z.string(),
        z.object({
          annotation: z.string().describe(
            "Annotation, comment or explanation why the property was set.",
          ).optional(),
          overriddenValue: z.string().describe(
            "Optional. Value which was replaced by the corresponding component.",
          ).optional(),
          value: z.string().describe("Property value.").optional(),
        }),
      ).describe("Output only. Properties set by autotuning engine.")
        .optional(),
    }).describe("Properties of the workload organized by origin.").optional(),
  }).describe("Runtime information about workload execution.").optional(),
  sparkBatch: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments that can be set as batch properties, such as --conf, since a collision can occur that causes an incorrect batch submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the classpath of the Spark driver and tasks.",
    ).optional(),
    mainClass: z.string().describe(
      "Optional. The name of the driver main class. The jar file that contains the class must be in the classpath or specified in jar_file_uris.",
    ).optional(),
    mainJarFileUri: z.string().describe(
      "Optional. The HCFS URI of the jar file that contains the main class.",
    ).optional(),
  }).describe(
    "A configuration for running an Apache Spark (https://spark.apache.org/) batch workload.",
  ).optional(),
  sparkRBatch: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the Spark driver. Do not include arguments that can be set as batch properties, such as --conf, since a collision can occur that causes an incorrect batch submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor.",
    ).optional(),
    mainRFileUri: z.string().describe(
      "Required. The HCFS URI of the main R file to use as the driver. Must be a.R or.r file.",
    ).optional(),
  }).describe(
    "A configuration for running an Apache SparkR (https://spark.apache.org/docs/latest/sparkr.html) batch workload.",
  ).optional(),
  sparkSqlBatch: z.object({
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to be added to the Spark CLASSPATH.",
    ).optional(),
    queryFileUri: z.string().describe(
      "Required. The HCFS URI of the script that contains Spark SQL queries to execute.",
    ).optional(),
    queryVariables: z.record(z.string(), z.string()).describe(
      'Optional. Mapping of query variable names to values (equivalent to the Spark SQL command: SET name="value";).',
    ).optional(),
  }).describe(
    "A configuration for running Apache Spark SQL (https://spark.apache.org/sql/) queries as a batch workload.",
  ).optional(),
  batchId: z.string().describe(
    "Optional. The ID to use for the batch, which will become the final component of the batch's resource name.This value must be 4-63 characters. Valid characters are /[a-z][0-9]-/.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the service receives two CreateBatchRequests with the same request_id, the second request is ignored and the operation that corresponds to the first Batch created and stored in the backend is returned.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The value must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  creator: z.string().optional(),
  environmentConfig: z.object({
    executionConfig: z.object({
      authenticationConfig: z.object({
        userWorkloadAuthenticationType: z.string(),
      }),
      idleTtl: z.string(),
      kmsKey: z.string(),
      networkTags: z.array(z.string()),
      networkUri: z.string(),
      serviceAccount: z.string(),
      stagingBucket: z.string(),
      subnetworkUri: z.string(),
      ttl: z.string(),
    }),
    peripheralsConfig: z.object({
      metastoreService: z.string(),
      sparkHistoryServerConfig: z.object({
        dataprocCluster: z.string(),
      }),
    }),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  operation: z.string().optional(),
  pysparkBatch: z.object({
    archiveUris: z.array(z.string()),
    args: z.array(z.string()),
    fileUris: z.array(z.string()),
    jarFileUris: z.array(z.string()),
    mainPythonFileUri: z.string(),
    pythonFileUris: z.array(z.string()),
  }).optional(),
  runtimeConfig: z.object({
    autotuningConfig: z.object({
      scenarios: z.array(z.string()),
    }),
    cohort: z.string(),
    containerImage: z.string(),
    properties: z.record(z.string(), z.unknown()),
    repositoryConfig: z.object({
      pypiRepositoryConfig: z.object({
        pypiRepository: z.string(),
      }),
    }),
    version: z.string(),
  }).optional(),
  runtimeInfo: z.object({
    approximateUsage: z.object({
      acceleratorType: z.string(),
      milliAcceleratorSeconds: z.string(),
      milliDcuSeconds: z.string(),
      shuffleStorageGbSeconds: z.string(),
      updateTime: z.string(),
    }),
    cohortInfo: z.object({
      cohort: z.string(),
      cohortSource: z.string(),
    }),
    currentUsage: z.object({
      acceleratorType: z.string(),
      milliAccelerator: z.string(),
      milliDcu: z.string(),
      milliDcuPremium: z.string(),
      shuffleStorageGb: z.string(),
      shuffleStorageGbPremium: z.string(),
      snapshotTime: z.string(),
    }),
    diagnosticOutputUri: z.string(),
    endpoints: z.record(z.string(), z.unknown()),
    outputUri: z.string(),
    propertiesInfo: z.object({
      autotuningProperties: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  sparkBatch: z.object({
    archiveUris: z.array(z.string()),
    args: z.array(z.string()),
    fileUris: z.array(z.string()),
    jarFileUris: z.array(z.string()),
    mainClass: z.string(),
    mainJarFileUri: z.string(),
  }).optional(),
  sparkRBatch: z.object({
    archiveUris: z.array(z.string()),
    args: z.array(z.string()),
    fileUris: z.array(z.string()),
    mainRFileUri: z.string(),
  }).optional(),
  sparkSqlBatch: z.object({
    jarFileUris: z.array(z.string()),
    queryFileUri: z.string(),
    queryVariables: z.record(z.string(), z.unknown()),
  }).optional(),
  state: z.string().optional(),
  stateHistory: z.array(z.object({
    state: z.string(),
    stateMessage: z.string(),
    stateStartTime: z.string(),
  })).optional(),
  stateMessage: z.string().optional(),
  stateTime: z.string().optional(),
  uuid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  environmentConfig: z.object({
    executionConfig: z.object({
      authenticationConfig: z.object({
        userWorkloadAuthenticationType: z.enum([
          "AUTHENTICATION_TYPE_UNSPECIFIED",
          "SERVICE_ACCOUNT",
          "END_USER_CREDENTIALS",
        ]).describe(
          "Optional. Authentication type for the user workload running in containers.",
        ).optional(),
      }).describe(
        "Authentication configuration for a workload is used to set the default identity for the workload execution. The config specifies the type of identity (service account or user) that will be used by workloads to access resources on the project(s).",
      ).optional(),
      idleTtl: z.string().describe(
        "Optional. Applies to sessions only. The duration to keep the session alive while it's idling. Exceeding this threshold causes the session to terminate. This field cannot be set on a batch workload. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). Defaults to 1 hour if not set. If both ttl and idle_ttl are specified for an interactive session, the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
      kmsKey: z.string().describe(
        "Optional. The Cloud KMS key to use for encryption.",
      ).optional(),
      networkTags: z.array(z.string()).describe(
        "Optional. Tags used for network traffic control.",
      ).optional(),
      networkUri: z.string().describe(
        "Optional. Network URI to connect workload to.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. Service account that used to execute workload.",
      ).optional(),
      stagingBucket: z.string().describe(
        "Optional. A Cloud Storage bucket used to stage workload dependencies, config files, and store workload output and other ephemeral data, such as Spark history files. If you do not specify a staging bucket, Cloud Dataproc will determine a Cloud Storage location according to the region where your workload is running, and then create and manage project-level, per-location staging and temporary buckets. This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
      ).optional(),
      subnetworkUri: z.string().describe(
        "Optional. Subnetwork URI to connect workload to.",
      ).optional(),
      ttl: z.string().describe(
        "Optional. The duration after which the workload will be terminated, specified as the JSON representation for Duration (https://protobuf.dev/programming-guides/proto3/#json). When the workload exceeds this duration, it will be unconditionally terminated without waiting for ongoing work to finish. If ttl is not specified for a batch workload, the workload will be allowed to run until it exits naturally (or run forever without exiting). If ttl is not specified for an interactive session, it defaults to 24 hours. If ttl is not specified for a batch that uses 2.1+ runtime version, it defaults to 4 hours. Minimum value is 10 minutes; maximum value is 14 days. If both ttl and idle_ttl are specified (for an interactive session), the conditions are treated as OR conditions: the workload will be terminated when it has been idle for idle_ttl or when ttl has been exceeded, whichever occurs first.",
      ).optional(),
    }).describe("Execution configuration for a workload.").optional(),
    peripheralsConfig: z.object({
      metastoreService: z.string().describe(
        "Optional. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[region]/services/[service_id]",
      ).optional(),
      sparkHistoryServerConfig: z.object({
        dataprocCluster: z.string().describe(
          "Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the workload.Example: projects/[project_id]/regions/[region]/clusters/[cluster_name]",
        ).optional(),
      }).describe("Spark History Server configuration for the workload.")
        .optional(),
    }).describe("Auxiliary services configuration for a workload.").optional(),
  }).describe("Environment configuration for a workload.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels to associate with this batch. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a batch.",
  ).optional(),
  pysparkBatch: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments that can be set as batch properties, such as --conf, since a collision can occur that causes an incorrect batch submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the classpath of the Spark driver and tasks.",
    ).optional(),
    mainPythonFileUri: z.string().describe(
      "Required. The HCFS URI of the main Python file to use as the Spark driver. Must be a.py file.",
    ).optional(),
    pythonFileUris: z.array(z.string()).describe(
      "Optional. HCFS file URIs of Python files to pass to the PySpark framework. Supported file types:.py,.egg, and.zip.",
    ).optional(),
  }).describe(
    "A configuration for running an Apache PySpark (https://spark.apache.org/docs/latest/api/python/getting_started/quickstart.html) batch workload.",
  ).optional(),
  runtimeConfig: z.object({
    autotuningConfig: z.object({
      scenarios: z.array(
        z.enum([
          "SCENARIO_UNSPECIFIED",
          "SCALING",
          "BROADCAST_HASH_JOIN",
          "MEMORY",
          "NONE",
          "AUTO",
        ]),
      ).describe("Optional. Scenarios for which tunings are applied.")
        .optional(),
    }).describe("Autotuning configuration of the workload.").optional(),
    cohort: z.string().describe(
      "Optional. Cohort identifier. Identifies families of the workloads that have the same shape, for example, daily ETL jobs.",
    ).optional(),
    containerImage: z.string().describe(
      "Optional. Optional custom container image for the job runtime environment. If not specified, a default container image will be used.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, which are used to configure workload execution.",
    ).optional(),
    repositoryConfig: z.object({
      pypiRepositoryConfig: z.object({
        pypiRepository: z.string().describe(
          "Optional. The PyPi repository address. Note: This field is not available for batch workloads.",
        ).optional(),
      }).describe("Configuration for PyPi repository").optional(),
    }).describe("Configuration for dependency repositories").optional(),
    version: z.string().describe("Optional. Version of the batch runtime.")
      .optional(),
  }).describe("Runtime configuration for a workload.").optional(),
  runtimeInfo: z.object({
    approximateUsage: z.object({
      acceleratorType: z.string().describe(
        "Optional. DEPRECATED Accelerator type being used, if any",
      ).optional(),
      milliAcceleratorSeconds: z.string().describe(
        "Optional. DEPRECATED Accelerator usage in (milliAccelerator x seconds) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).",
      ).optional(),
      milliDcuSeconds: z.string().describe(
        "Optional. DCU (Dataproc Compute Units) usage in (milliDCU x seconds) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).",
      ).optional(),
      shuffleStorageGbSeconds: z.string().describe(
        "Optional. Shuffle storage usage in (GB x seconds) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).",
      ).optional(),
      updateTime: z.string().describe(
        "Optional. The timestamp of the usage metrics.",
      ).optional(),
    }).describe(
      "Usage metrics represent approximate total resources consumed by a workload.",
    ).optional(),
    cohortInfo: z.object({
      cohort: z.string().describe(
        "Output only. Final cohort that was used to tune the workload.",
      ).optional(),
      cohortSource: z.enum([
        "COHORT_SOURCE_UNSPECIFIED",
        "USER_PROVIDED",
        "AIRFLOW",
      ]).describe("Output only. Source of the cohort.").optional(),
    }).describe("Information about the cohort that the workload belongs to.")
      .optional(),
    currentUsage: z.object({
      acceleratorType: z.string().describe(
        "Optional. Accelerator type being used, if any",
      ).optional(),
      milliAccelerator: z.string().describe(
        "Optional. Milli (one-thousandth) accelerator. (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing))",
      ).optional(),
      milliDcu: z.string().describe(
        "Optional. Milli (one-thousandth) Dataproc Compute Units (DCUs) (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).",
      ).optional(),
      milliDcuPremium: z.string().describe(
        "Optional. Milli (one-thousandth) Dataproc Compute Units (DCUs) charged at premium tier (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing)).",
      ).optional(),
      shuffleStorageGb: z.string().describe(
        "Optional. Shuffle Storage in gigabytes (GB). (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing))",
      ).optional(),
      shuffleStorageGbPremium: z.string().describe(
        "Optional. Shuffle Storage in gigabytes (GB) charged at premium tier. (see Dataproc Serverless pricing (https://cloud.google.com/dataproc-serverless/pricing))",
      ).optional(),
      snapshotTime: z.string().describe(
        "Optional. The timestamp of the usage snapshot.",
      ).optional(),
    }).describe(
      "The usage snapshot represents the resources consumed by a workload at a specified time.",
    ).optional(),
    diagnosticOutputUri: z.string().describe(
      "Output only. A URI pointing to the location of the diagnostics tarball.",
    ).optional(),
    endpoints: z.record(z.string(), z.string()).describe(
      "Output only. Map of remote access endpoints (such as web interfaces and APIs) to their URIs.",
    ).optional(),
    outputUri: z.string().describe(
      "Output only. A URI pointing to the location of the stdout and stderr of the workload.",
    ).optional(),
    propertiesInfo: z.object({
      autotuningProperties: z.record(
        z.string(),
        z.object({
          annotation: z.string().describe(
            "Annotation, comment or explanation why the property was set.",
          ).optional(),
          overriddenValue: z.string().describe(
            "Optional. Value which was replaced by the corresponding component.",
          ).optional(),
          value: z.string().describe("Property value.").optional(),
        }),
      ).describe("Output only. Properties set by autotuning engine.")
        .optional(),
    }).describe("Properties of the workload organized by origin.").optional(),
  }).describe("Runtime information about workload execution.").optional(),
  sparkBatch: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments that can be set as batch properties, such as --conf, since a collision can occur that causes an incorrect batch submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the classpath of the Spark driver and tasks.",
    ).optional(),
    mainClass: z.string().describe(
      "Optional. The name of the driver main class. The jar file that contains the class must be in the classpath or specified in jar_file_uris.",
    ).optional(),
    mainJarFileUri: z.string().describe(
      "Optional. The HCFS URI of the jar file that contains the main class.",
    ).optional(),
  }).describe(
    "A configuration for running an Apache Spark (https://spark.apache.org/) batch workload.",
  ).optional(),
  sparkRBatch: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the Spark driver. Do not include arguments that can be set as batch properties, such as --conf, since a collision can occur that causes an incorrect batch submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor.",
    ).optional(),
    mainRFileUri: z.string().describe(
      "Required. The HCFS URI of the main R file to use as the driver. Must be a.R or.r file.",
    ).optional(),
  }).describe(
    "A configuration for running an Apache SparkR (https://spark.apache.org/docs/latest/sparkr.html) batch workload.",
  ).optional(),
  sparkSqlBatch: z.object({
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to be added to the Spark CLASSPATH.",
    ).optional(),
    queryFileUri: z.string().describe(
      "Required. The HCFS URI of the script that contains Spark SQL queries to execute.",
    ).optional(),
    queryVariables: z.record(z.string(), z.string()).describe(
      'Optional. Mapping of query variable names to values (equivalent to the Spark SQL command: SET name="value";).',
    ).optional(),
  }).describe(
    "A configuration for running Apache Spark SQL (https://spark.apache.org/sql/) queries as a batch workload.",
  ).optional(),
  batchId: z.string().describe(
    "Optional. The ID to use for the batch, which will become the final component of the batch's resource name.This value must be 4-63 characters. Valid characters are /[a-z][0-9]-/.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the service receives two CreateBatchRequests with the same request_id, the second request is ignored and the operation that corresponds to the first Batch created and stored in the backend is returned.Recommendation: Set this value to a UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier).The value must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataproc Batches. Registered at `@swamp/gcp/dataproc/batches`. */
export const model = {
  type: "@swamp/gcp/dataproc/batches",
  version: "2026.05.19.2",
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
      toVersion: "2026.04.11.1",
      description: "Added: pysparkNotebookBatch",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.13.1",
      description: "Removed: pysparkNotebookBatch",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { pysparkNotebookBatch: _pysparkNotebookBatch, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.14.1",
      description: "Added: pysparkNotebookBatch",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: pysparkNotebookBatch",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { pysparkNotebookBatch: _pysparkNotebookBatch, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: pysparkNotebookBatch",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: pysparkNotebookBatch",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { pysparkNotebookBatch: _pysparkNotebookBatch, ...rest } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A representation of a batch workload in the service.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a batches",
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
        if (g["environmentConfig"] !== undefined) {
          body["environmentConfig"] = g["environmentConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["pysparkBatch"] !== undefined) {
          body["pysparkBatch"] = g["pysparkBatch"];
        }
        if (g["runtimeConfig"] !== undefined) {
          body["runtimeConfig"] = g["runtimeConfig"];
        }
        if (g["runtimeInfo"] !== undefined) {
          body["runtimeInfo"] = g["runtimeInfo"];
        }
        if (g["sparkBatch"] !== undefined) body["sparkBatch"] = g["sparkBatch"];
        if (g["sparkRBatch"] !== undefined) {
          body["sparkRBatch"] = g["sparkRBatch"];
        }
        if (g["sparkSqlBatch"] !== undefined) {
          body["sparkSqlBatch"] = g["sparkSqlBatch"];
        }
        if (g["batchId"] !== undefined) body["batchId"] = g["batchId"];
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
              "readyValues": ["RUNNING", "SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Get a batches",
      arguments: z.object({
        identifier: z.string().describe("The name of the batches"),
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
    delete: {
      description: "Delete the batches",
      arguments: z.object({
        identifier: z.string().describe("The name of the batches"),
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
      description: "Sync batches state from GCP",
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
    analyze: {
      description: "analyze",
      arguments: z.object({
        requestId: z.any().optional(),
        requestorId: z.any().optional(),
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
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["requestorId"] !== undefined) {
          body["requestorId"] = args["requestorId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataproc.projects.locations.batches.analyze",
            "path": "v1/{+name}:analyze",
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
  },
};
