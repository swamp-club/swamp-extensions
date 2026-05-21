// Auto-generated extension model for @swamp/gcp/dataproc/jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataproc Jobs.
 *
 * A Dataproc job resource.
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

const BASE_URL = "https://dataproc.googleapis.com/";

const GET_CONFIG = {
  "id": "dataproc.projects.regions.jobs.get",
  "path": "v1/projects/{projectId}/regions/{region}/jobs/{jobId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "region",
    "jobId",
  ],
  "parameters": {
    "jobId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataproc.projects.regions.jobs.patch",
  "path": "v1/projects/{projectId}/regions/{region}/jobs/{jobId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "projectId",
    "region",
    "jobId",
  ],
  "parameters": {
    "jobId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataproc.projects.regions.jobs.delete",
  "path": "v1/projects/{projectId}/regions/{region}/jobs/{jobId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "projectId",
    "region",
    "jobId",
  ],
  "parameters": {
    "jobId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  done: z.boolean().describe(
    "Output only. Indicates whether the job is completed. If the value is false, the job is still in progress. If true, the job is completed, and status.state field will indicate if it was successful, failed, or cancelled.",
  ).optional(),
  driverControlFilesUri: z.string().describe(
    "Output only. If present, the location of miscellaneous control files which can be used as part of job setup and handling. If not present, control files might be placed in the same location as driver_output_uri.",
  ).optional(),
  driverOutputResourceUri: z.string().describe(
    "Output only. A URI pointing to the location of the stdout of the job's driver program.",
  ).optional(),
  driverSchedulingConfig: z.object({
    memoryMb: z.number().int().describe(
      "Required. The amount of memory in MB the driver is requesting.",
    ).optional(),
    vcores: z.number().int().describe(
      "Required. The number of vCPUs the driver is requesting.",
    ).optional(),
  }).describe("Driver scheduling configuration.").optional(),
  flinkJob: z.object({
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision might occur that causes an incorrect job submission.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Flink driver and tasks.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    mainClass: z.string().describe(
      "The name of the driver's main class. The jar file that contains the class must be in the default CLASSPATH or specified in jarFileUris.",
    ).optional(),
    mainJarFileUri: z.string().describe(
      "The HCFS URI of the jar file that contains the main class.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure Flink. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/flink/conf/flink-defaults.conf and classes in user code.",
    ).optional(),
    savepointUri: z.string().describe(
      "Optional. HCFS URI of the savepoint, which contains the last saved progress for starting the current job.",
    ).optional(),
  }).describe("A Dataproc job for running Apache Flink applications on YARN.")
    .optional(),
  hadoopJob: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted in the working directory of Hadoop drivers and tasks. Supported file types:.jar,.tar,.tar.gz,.tgz, or.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments, such as -libjars or -Dfoo=bar, that can be set as job properties, since a collision might occur that causes an incorrect job submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS (Hadoop Compatible Filesystem) URIs of files to be copied to the working directory of Hadoop drivers and distributed tasks. Useful for naively parallel tasks.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. Jar file URIs to add to the CLASSPATHs of the Hadoop driver and tasks.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    mainClass: z.string().describe(
      "The name of the driver's main class. The jar file containing the class must be in the default CLASSPATH or specified in jar_file_uris.",
    ).optional(),
    mainJarFileUri: z.string().describe(
      "The HCFS URI of the jar file containing the main class. Examples: 'gs://foo-bucket/analytics-binaries/extract-useful-metrics-mr.jar' 'hdfs:/tmp/test-samples/custom-wordcount.jar' 'file:///home/usr/lib/hadoop-mapreduce/hadoop-mapreduce-examples.jar'",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure Hadoop. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/hadoop/conf/*-site and classes in user code.",
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache Hadoop MapReduce (https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html) jobs on Apache Hadoop YARN (https://hadoop.apache.org/docs/r2.7.1/hadoop-yarn/hadoop-yarn-site/YARN.html).",
  ).optional(),
  hiveJob: z.object({
    continueOnFailure: z.boolean().describe(
      "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the CLASSPATH of the Hive server and Hadoop MapReduce (MR) tasks. Can contain Hive SerDes and UDFs.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names and values, used to configure Hive. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/hadoop/conf/*-site.xml, /etc/hive/conf/hive-site.xml, and classes in user code.",
    ).optional(),
    queryFileUri: z.string().describe(
      "The HCFS URI of the script that contains Hive queries.",
    ).optional(),
    queryList: z.object({
      queries: z.array(z.string()).describe(
        'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
      ).optional(),
    }).describe("A list of queries to run on a cluster.").optional(),
    scriptVariables: z.record(z.string(), z.string()).describe(
      'Optional. Mapping of query variable names to values (equivalent to the Hive command: SET name="value";).',
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache Hive (https://hive.apache.org/) queries on YARN.",
  ).optional(),
  jobUuid: z.string().describe(
    "Output only. A UUID that uniquely identifies a job within the project over time. This is in contrast to a user-settable reference.job_id that might be reused over time.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels to associate with this job. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values can be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a job.",
  ).optional(),
  pigJob: z.object({
    continueOnFailure: z.boolean().describe(
      "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the CLASSPATH of the Pig Client and Hadoop MapReduce (MR) tasks. Can contain Pig UDFs.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure Pig. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/hadoop/conf/*-site.xml, /etc/pig/conf/pig.properties, and classes in user code.",
    ).optional(),
    queryFileUri: z.string().describe(
      "The HCFS URI of the script that contains the Pig queries.",
    ).optional(),
    queryList: z.object({
      queries: z.array(z.string()).describe(
        'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
      ).optional(),
    }).describe("A list of queries to run on a cluster.").optional(),
    scriptVariables: z.record(z.string(), z.string()).describe(
      "Optional. Mapping of query variable names to values (equivalent to the Pig command: name=[value]).",
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache Pig (https://pig.apache.org/) queries on YARN.",
  ).optional(),
  placement: z.object({
    clusterLabels: z.record(z.string(), z.string()).describe(
      "Optional. Cluster labels to identify a cluster where the job will be submitted.",
    ).optional(),
    clusterName: z.string().describe(
      "Required. The name of the cluster where the job will be submitted.",
    ).optional(),
    clusterUuid: z.string().describe(
      "Output only. A cluster UUID generated by the Dataproc service when the job is submitted.",
    ).optional(),
  }).describe("Dataproc job config.").optional(),
  prestoJob: z.object({
    clientTags: z.array(z.string()).describe(
      "Optional. Presto client tags to attach to this query",
    ).optional(),
    continueOnFailure: z.boolean().describe(
      "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    outputFormat: z.string().describe(
      "Optional. The format in which query output will be displayed. See the Presto documentation for supported output formats",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values. Used to set Presto session properties (https://prestodb.io/docs/current/sql/set-session.html) Equivalent to using the --session flag in the Presto CLI",
    ).optional(),
    queryFileUri: z.string().describe(
      "The HCFS URI of the script that contains SQL queries.",
    ).optional(),
    queryList: z.object({
      queries: z.array(z.string()).describe(
        'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
      ).optional(),
    }).describe("A list of queries to run on a cluster.").optional(),
  }).describe(
    "A Dataproc job for running Presto (https://prestosql.io/) queries. IMPORTANT: The Dataproc Presto Optional Component (https://cloud.google.com/dataproc/docs/concepts/components/presto) must be enabled when the cluster is created to submit a Presto job to the cluster.",
  ).optional(),
  pysparkJob: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.Note: Spark applications must be deployed in cluster mode (https://spark.apache.org/docs/latest/cluster-overview.html) for correct environment propagation.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor. Useful for naively parallel tasks.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Python driver and tasks.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    mainPythonFileUri: z.string().describe(
      "Required. The HCFS URI of the main Python file to use as the driver. Must be a.py file.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure PySpark. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code.",
    ).optional(),
    pythonFileUris: z.array(z.string()).describe(
      "Optional. HCFS file URIs of Python files to pass to the PySpark framework. Supported file types:.py,.egg, and.zip.",
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache PySpark (https://spark.apache.org/docs/latest/api/python/index.html#pyspark-overview) applications on YARN.",
  ).optional(),
  reference: z.object({
    jobId: z.string().describe(
      "Optional. The job ID, which must be unique within the project.The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), or hyphens (-). The maximum length is 100 characters.If not specified by the caller, the job ID will be provided by the server.",
    ).optional(),
    projectId: z.string().describe(
      "Optional. The ID of the Google Cloud Platform project that the job belongs to. If specified, must match the request project ID.",
    ).optional(),
  }).describe("Encapsulates the full scoping used to reference a job.")
    .optional(),
  scheduling: z.object({
    maxFailuresPerHour: z.number().int().describe(
      "Optional. Maximum number of times per hour a driver can be restarted as a result of driver exiting with non-zero code before job is reported failed.A job might be reported as thrashing if the driver exits with a non-zero code four times within a 10-minute window.Maximum value is 10.Note: This restartable job option is not supported in Dataproc workflow templates (https://cloud.google.com/dataproc/docs/concepts/workflows/using-workflows#adding_jobs_to_a_template).",
    ).optional(),
    maxFailuresTotal: z.number().int().describe(
      "Optional. Maximum total number of times a driver can be restarted as a result of the driver exiting with a non-zero code. After the maximum number is reached, the job will be reported as failed.Maximum value is 240.Note: Currently, this restartable job option is not supported in Dataproc workflow templates (https://cloud.google.com/dataproc/docs/concepts/workflows/using-workflows#adding_jobs_to_a_template).",
    ).optional(),
  }).describe("Job scheduling options.").optional(),
  sparkJob: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor. Useful for naively parallel tasks.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Spark driver and tasks.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    mainClass: z.string().describe(
      "The name of the driver's main class. The jar file that contains the class must be in the default CLASSPATH or specified in SparkJob.jar_file_uris.",
    ).optional(),
    mainJarFileUri: z.string().describe(
      "The HCFS URI of the jar file that contains the main class.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure Spark. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code.",
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache Spark (https://spark.apache.org/) applications on YARN.",
  ).optional(),
  sparkRJob: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor. Useful for naively parallel tasks.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    mainRFileUri: z.string().describe(
      "Required. The HCFS URI of the main R file to use as the driver. Must be a.R file.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure SparkR. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code.",
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache SparkR (https://spark.apache.org/docs/latest/sparkr.html) applications on YARN.",
  ).optional(),
  sparkSqlJob: z.object({
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to be added to the Spark CLASSPATH.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure Spark SQL's SparkConf. Properties that conflict with values set by the Dataproc API might be overwritten.",
    ).optional(),
    queryFileUri: z.string().describe(
      "The HCFS URI of the script that contains SQL queries.",
    ).optional(),
    queryList: z.object({
      queries: z.array(z.string()).describe(
        'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
      ).optional(),
    }).describe("A list of queries to run on a cluster.").optional(),
    scriptVariables: z.record(z.string(), z.string()).describe(
      'Optional. Mapping of query variable names to values (equivalent to the Spark SQL command: SET name="value";).',
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache Spark SQL (https://spark.apache.org/sql/) queries.",
  ).optional(),
  status: z.object({
    details: z.string().describe(
      "Optional. Output only. Job state details, such as an error description if the state is ERROR.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PENDING",
      "SETUP_DONE",
      "RUNNING",
      "CANCEL_PENDING",
      "CANCEL_STARTED",
      "CANCELLED",
      "DONE",
      "ERROR",
      "ATTEMPT_FAILURE",
    ]).describe(
      "Output only. A state message specifying the overall job state.",
    ).optional(),
    stateStartTime: z.string().describe(
      "Output only. The time when this state was entered.",
    ).optional(),
    substate: z.enum(["UNSPECIFIED", "SUBMITTED", "QUEUED", "STALE_STATUS"])
      .describe(
        "Output only. Additional state information, which includes status reported by the agent.",
      ).optional(),
  }).describe("Dataproc job status.").optional(),
  statusHistory: z.array(z.object({
    details: z.string().describe(
      "Optional. Output only. Job state details, such as an error description if the state is ERROR.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PENDING",
      "SETUP_DONE",
      "RUNNING",
      "CANCEL_PENDING",
      "CANCEL_STARTED",
      "CANCELLED",
      "DONE",
      "ERROR",
      "ATTEMPT_FAILURE",
    ]).describe(
      "Output only. A state message specifying the overall job state.",
    ).optional(),
    stateStartTime: z.string().describe(
      "Output only. The time when this state was entered.",
    ).optional(),
    substate: z.enum(["UNSPECIFIED", "SUBMITTED", "QUEUED", "STALE_STATUS"])
      .describe(
        "Output only. Additional state information, which includes status reported by the agent.",
      ).optional(),
  })).describe("Output only. The previous job status.").optional(),
  trinoJob: z.object({
    clientTags: z.array(z.string()).describe(
      "Optional. Trino client tags to attach to this query",
    ).optional(),
    continueOnFailure: z.boolean().describe(
      "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    outputFormat: z.string().describe(
      "Optional. The format in which query output will be displayed. See the Trino documentation for supported output formats",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values. Used to set Trino session properties (https://trino.io/docs/current/sql/set-session.html) Equivalent to using the --session flag in the Trino CLI",
    ).optional(),
    queryFileUri: z.string().describe(
      "The HCFS URI of the script that contains SQL queries.",
    ).optional(),
    queryList: z.object({
      queries: z.array(z.string()).describe(
        'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
      ).optional(),
    }).describe("A list of queries to run on a cluster.").optional(),
  }).describe(
    "A Dataproc job for running Trino (https://trino.io/) queries. IMPORTANT: The Dataproc Trino Optional Component (https://cloud.google.com/dataproc/docs/concepts/components/trino) must be enabled when the cluster is created to submit a Trino job to the cluster.",
  ).optional(),
  yarnApplications: z.array(z.object({
    memoryMbSeconds: z.string().describe(
      "Optional. The cumulative memory usage of the application for a job, measured in mb-seconds.",
    ).optional(),
    name: z.string().describe("Required. The application name.").optional(),
    progress: z.number().describe(
      "Required. The numerical progress of the application, from 1 to 100.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "NEW",
      "NEW_SAVING",
      "SUBMITTED",
      "ACCEPTED",
      "RUNNING",
      "FINISHED",
      "FAILED",
      "KILLED",
    ]).describe("Required. The application state.").optional(),
    trackingUrl: z.string().describe(
      "Optional. The HTTP URL of the ApplicationMaster, HistoryServer, or TimelineServer that provides application-specific information. The URL uses the internal hostname, and requires a proxy server for resolution and, possibly, access.",
    ).optional(),
    vcoreSeconds: z.string().describe(
      "Optional. The cumulative CPU time consumed by the application for a job, measured in vcore-seconds.",
    ).optional(),
  })).describe(
    "Output only. The collection of YARN applications spun up by this job.Beta Feature: This report is available for testing purposes only. It might be changed before final release.",
  ).optional(),
});

const StateSchema = z.object({
  done: z.boolean().optional(),
  driverControlFilesUri: z.string().optional(),
  driverOutputResourceUri: z.string().optional(),
  driverSchedulingConfig: z.object({
    memoryMb: z.number(),
    vcores: z.number(),
  }).optional(),
  flinkJob: z.object({
    args: z.array(z.string()),
    jarFileUris: z.array(z.string()),
    loggingConfig: z.object({
      driverLogLevels: z.record(z.string(), z.unknown()),
    }),
    mainClass: z.string(),
    mainJarFileUri: z.string(),
    properties: z.record(z.string(), z.unknown()),
    savepointUri: z.string(),
  }).optional(),
  hadoopJob: z.object({
    archiveUris: z.array(z.string()),
    args: z.array(z.string()),
    fileUris: z.array(z.string()),
    jarFileUris: z.array(z.string()),
    loggingConfig: z.object({
      driverLogLevels: z.record(z.string(), z.unknown()),
    }),
    mainClass: z.string(),
    mainJarFileUri: z.string(),
    properties: z.record(z.string(), z.unknown()),
  }).optional(),
  hiveJob: z.object({
    continueOnFailure: z.boolean(),
    jarFileUris: z.array(z.string()),
    properties: z.record(z.string(), z.unknown()),
    queryFileUri: z.string(),
    queryList: z.object({
      queries: z.array(z.string()),
    }),
    scriptVariables: z.record(z.string(), z.unknown()),
  }).optional(),
  jobUuid: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  pigJob: z.object({
    continueOnFailure: z.boolean(),
    jarFileUris: z.array(z.string()),
    loggingConfig: z.object({
      driverLogLevels: z.record(z.string(), z.unknown()),
    }),
    properties: z.record(z.string(), z.unknown()),
    queryFileUri: z.string(),
    queryList: z.object({
      queries: z.array(z.string()),
    }),
    scriptVariables: z.record(z.string(), z.unknown()),
  }).optional(),
  placement: z.object({
    clusterLabels: z.record(z.string(), z.unknown()),
    clusterName: z.string(),
    clusterUuid: z.string(),
  }).optional(),
  prestoJob: z.object({
    clientTags: z.array(z.string()),
    continueOnFailure: z.boolean(),
    loggingConfig: z.object({
      driverLogLevels: z.record(z.string(), z.unknown()),
    }),
    outputFormat: z.string(),
    properties: z.record(z.string(), z.unknown()),
    queryFileUri: z.string(),
    queryList: z.object({
      queries: z.array(z.string()),
    }),
  }).optional(),
  pysparkJob: z.object({
    archiveUris: z.array(z.string()),
    args: z.array(z.string()),
    fileUris: z.array(z.string()),
    jarFileUris: z.array(z.string()),
    loggingConfig: z.object({
      driverLogLevels: z.record(z.string(), z.unknown()),
    }),
    mainPythonFileUri: z.string(),
    properties: z.record(z.string(), z.unknown()),
    pythonFileUris: z.array(z.string()),
  }).optional(),
  reference: z.object({
    jobId: z.string(),
    projectId: z.string(),
  }).optional(),
  scheduling: z.object({
    maxFailuresPerHour: z.number(),
    maxFailuresTotal: z.number(),
  }).optional(),
  sparkJob: z.object({
    archiveUris: z.array(z.string()),
    args: z.array(z.string()),
    fileUris: z.array(z.string()),
    jarFileUris: z.array(z.string()),
    loggingConfig: z.object({
      driverLogLevels: z.record(z.string(), z.unknown()),
    }),
    mainClass: z.string(),
    mainJarFileUri: z.string(),
    properties: z.record(z.string(), z.unknown()),
  }).optional(),
  sparkRJob: z.object({
    archiveUris: z.array(z.string()),
    args: z.array(z.string()),
    fileUris: z.array(z.string()),
    loggingConfig: z.object({
      driverLogLevels: z.record(z.string(), z.unknown()),
    }),
    mainRFileUri: z.string(),
    properties: z.record(z.string(), z.unknown()),
  }).optional(),
  sparkSqlJob: z.object({
    jarFileUris: z.array(z.string()),
    loggingConfig: z.object({
      driverLogLevels: z.record(z.string(), z.unknown()),
    }),
    properties: z.record(z.string(), z.unknown()),
    queryFileUri: z.string(),
    queryList: z.object({
      queries: z.array(z.string()),
    }),
    scriptVariables: z.record(z.string(), z.unknown()),
  }).optional(),
  status: z.object({
    details: z.string(),
    state: z.string(),
    stateStartTime: z.string(),
    substate: z.string(),
  }).optional(),
  statusHistory: z.array(z.object({
    details: z.string(),
    state: z.string(),
    stateStartTime: z.string(),
    substate: z.string(),
  })).optional(),
  trinoJob: z.object({
    clientTags: z.array(z.string()),
    continueOnFailure: z.boolean(),
    loggingConfig: z.object({
      driverLogLevels: z.record(z.string(), z.unknown()),
    }),
    outputFormat: z.string(),
    properties: z.record(z.string(), z.unknown()),
    queryFileUri: z.string(),
    queryList: z.object({
      queries: z.array(z.string()),
    }),
  }).optional(),
  yarnApplications: z.array(z.object({
    memoryMbSeconds: z.string(),
    name: z.string(),
    progress: z.number(),
    state: z.string(),
    trackingUrl: z.string(),
    vcoreSeconds: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  done: z.boolean().describe(
    "Output only. Indicates whether the job is completed. If the value is false, the job is still in progress. If true, the job is completed, and status.state field will indicate if it was successful, failed, or cancelled.",
  ).optional(),
  driverControlFilesUri: z.string().describe(
    "Output only. If present, the location of miscellaneous control files which can be used as part of job setup and handling. If not present, control files might be placed in the same location as driver_output_uri.",
  ).optional(),
  driverOutputResourceUri: z.string().describe(
    "Output only. A URI pointing to the location of the stdout of the job's driver program.",
  ).optional(),
  driverSchedulingConfig: z.object({
    memoryMb: z.number().int().describe(
      "Required. The amount of memory in MB the driver is requesting.",
    ).optional(),
    vcores: z.number().int().describe(
      "Required. The number of vCPUs the driver is requesting.",
    ).optional(),
  }).describe("Driver scheduling configuration.").optional(),
  flinkJob: z.object({
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision might occur that causes an incorrect job submission.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Flink driver and tasks.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    mainClass: z.string().describe(
      "The name of the driver's main class. The jar file that contains the class must be in the default CLASSPATH or specified in jarFileUris.",
    ).optional(),
    mainJarFileUri: z.string().describe(
      "The HCFS URI of the jar file that contains the main class.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure Flink. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/flink/conf/flink-defaults.conf and classes in user code.",
    ).optional(),
    savepointUri: z.string().describe(
      "Optional. HCFS URI of the savepoint, which contains the last saved progress for starting the current job.",
    ).optional(),
  }).describe("A Dataproc job for running Apache Flink applications on YARN.")
    .optional(),
  hadoopJob: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted in the working directory of Hadoop drivers and tasks. Supported file types:.jar,.tar,.tar.gz,.tgz, or.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments, such as -libjars or -Dfoo=bar, that can be set as job properties, since a collision might occur that causes an incorrect job submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS (Hadoop Compatible Filesystem) URIs of files to be copied to the working directory of Hadoop drivers and distributed tasks. Useful for naively parallel tasks.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. Jar file URIs to add to the CLASSPATHs of the Hadoop driver and tasks.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    mainClass: z.string().describe(
      "The name of the driver's main class. The jar file containing the class must be in the default CLASSPATH or specified in jar_file_uris.",
    ).optional(),
    mainJarFileUri: z.string().describe(
      "The HCFS URI of the jar file containing the main class. Examples: 'gs://foo-bucket/analytics-binaries/extract-useful-metrics-mr.jar' 'hdfs:/tmp/test-samples/custom-wordcount.jar' 'file:///home/usr/lib/hadoop-mapreduce/hadoop-mapreduce-examples.jar'",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure Hadoop. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/hadoop/conf/*-site and classes in user code.",
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache Hadoop MapReduce (https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html) jobs on Apache Hadoop YARN (https://hadoop.apache.org/docs/r2.7.1/hadoop-yarn/hadoop-yarn-site/YARN.html).",
  ).optional(),
  hiveJob: z.object({
    continueOnFailure: z.boolean().describe(
      "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the CLASSPATH of the Hive server and Hadoop MapReduce (MR) tasks. Can contain Hive SerDes and UDFs.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names and values, used to configure Hive. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/hadoop/conf/*-site.xml, /etc/hive/conf/hive-site.xml, and classes in user code.",
    ).optional(),
    queryFileUri: z.string().describe(
      "The HCFS URI of the script that contains Hive queries.",
    ).optional(),
    queryList: z.object({
      queries: z.array(z.string()).describe(
        'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
      ).optional(),
    }).describe("A list of queries to run on a cluster.").optional(),
    scriptVariables: z.record(z.string(), z.string()).describe(
      'Optional. Mapping of query variable names to values (equivalent to the Hive command: SET name="value";).',
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache Hive (https://hive.apache.org/) queries on YARN.",
  ).optional(),
  jobUuid: z.string().describe(
    "Output only. A UUID that uniquely identifies a job within the project over time. This is in contrast to a user-settable reference.job_id that might be reused over time.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels to associate with this job. Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). Label values can be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a job.",
  ).optional(),
  pigJob: z.object({
    continueOnFailure: z.boolean().describe(
      "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the CLASSPATH of the Pig Client and Hadoop MapReduce (MR) tasks. Can contain Pig UDFs.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure Pig. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/hadoop/conf/*-site.xml, /etc/pig/conf/pig.properties, and classes in user code.",
    ).optional(),
    queryFileUri: z.string().describe(
      "The HCFS URI of the script that contains the Pig queries.",
    ).optional(),
    queryList: z.object({
      queries: z.array(z.string()).describe(
        'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
      ).optional(),
    }).describe("A list of queries to run on a cluster.").optional(),
    scriptVariables: z.record(z.string(), z.string()).describe(
      "Optional. Mapping of query variable names to values (equivalent to the Pig command: name=[value]).",
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache Pig (https://pig.apache.org/) queries on YARN.",
  ).optional(),
  placement: z.object({
    clusterLabels: z.record(z.string(), z.string()).describe(
      "Optional. Cluster labels to identify a cluster where the job will be submitted.",
    ).optional(),
    clusterName: z.string().describe(
      "Required. The name of the cluster where the job will be submitted.",
    ).optional(),
    clusterUuid: z.string().describe(
      "Output only. A cluster UUID generated by the Dataproc service when the job is submitted.",
    ).optional(),
  }).describe("Dataproc job config.").optional(),
  prestoJob: z.object({
    clientTags: z.array(z.string()).describe(
      "Optional. Presto client tags to attach to this query",
    ).optional(),
    continueOnFailure: z.boolean().describe(
      "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    outputFormat: z.string().describe(
      "Optional. The format in which query output will be displayed. See the Presto documentation for supported output formats",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values. Used to set Presto session properties (https://prestodb.io/docs/current/sql/set-session.html) Equivalent to using the --session flag in the Presto CLI",
    ).optional(),
    queryFileUri: z.string().describe(
      "The HCFS URI of the script that contains SQL queries.",
    ).optional(),
    queryList: z.object({
      queries: z.array(z.string()).describe(
        'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
      ).optional(),
    }).describe("A list of queries to run on a cluster.").optional(),
  }).describe(
    "A Dataproc job for running Presto (https://prestosql.io/) queries. IMPORTANT: The Dataproc Presto Optional Component (https://cloud.google.com/dataproc/docs/concepts/components/presto) must be enabled when the cluster is created to submit a Presto job to the cluster.",
  ).optional(),
  pysparkJob: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.Note: Spark applications must be deployed in cluster mode (https://spark.apache.org/docs/latest/cluster-overview.html) for correct environment propagation.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor. Useful for naively parallel tasks.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Python driver and tasks.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    mainPythonFileUri: z.string().describe(
      "Required. The HCFS URI of the main Python file to use as the driver. Must be a.py file.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure PySpark. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code.",
    ).optional(),
    pythonFileUris: z.array(z.string()).describe(
      "Optional. HCFS file URIs of Python files to pass to the PySpark framework. Supported file types:.py,.egg, and.zip.",
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache PySpark (https://spark.apache.org/docs/latest/api/python/index.html#pyspark-overview) applications on YARN.",
  ).optional(),
  reference: z.object({
    jobId: z.string().describe(
      "Optional. The job ID, which must be unique within the project.The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), or hyphens (-). The maximum length is 100 characters.If not specified by the caller, the job ID will be provided by the server.",
    ).optional(),
    projectId: z.string().describe(
      "Optional. The ID of the Google Cloud Platform project that the job belongs to. If specified, must match the request project ID.",
    ).optional(),
  }).describe("Encapsulates the full scoping used to reference a job.")
    .optional(),
  scheduling: z.object({
    maxFailuresPerHour: z.number().int().describe(
      "Optional. Maximum number of times per hour a driver can be restarted as a result of driver exiting with non-zero code before job is reported failed.A job might be reported as thrashing if the driver exits with a non-zero code four times within a 10-minute window.Maximum value is 10.Note: This restartable job option is not supported in Dataproc workflow templates (https://cloud.google.com/dataproc/docs/concepts/workflows/using-workflows#adding_jobs_to_a_template).",
    ).optional(),
    maxFailuresTotal: z.number().int().describe(
      "Optional. Maximum total number of times a driver can be restarted as a result of the driver exiting with a non-zero code. After the maximum number is reached, the job will be reported as failed.Maximum value is 240.Note: Currently, this restartable job option is not supported in Dataproc workflow templates (https://cloud.google.com/dataproc/docs/concepts/workflows/using-workflows#adding_jobs_to_a_template).",
    ).optional(),
  }).describe("Job scheduling options.").optional(),
  sparkJob: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor. Useful for naively parallel tasks.",
    ).optional(),
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Spark driver and tasks.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    mainClass: z.string().describe(
      "The name of the driver's main class. The jar file that contains the class must be in the default CLASSPATH or specified in SparkJob.jar_file_uris.",
    ).optional(),
    mainJarFileUri: z.string().describe(
      "The HCFS URI of the jar file that contains the main class.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure Spark. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code.",
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache Spark (https://spark.apache.org/) applications on YARN.",
  ).optional(),
  sparkRJob: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    args: z.array(z.string()).describe(
      "Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision may occur that causes an incorrect job submission.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of files to be placed in the working directory of each executor. Useful for naively parallel tasks.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    mainRFileUri: z.string().describe(
      "Required. The HCFS URI of the main R file to use as the driver. Must be a.R file.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure SparkR. Properties that conflict with values set by the Dataproc API might be overwritten. Can include properties set in /etc/spark/conf/spark-defaults.conf and classes in user code.",
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache SparkR (https://spark.apache.org/docs/latest/sparkr.html) applications on YARN.",
  ).optional(),
  sparkSqlJob: z.object({
    jarFileUris: z.array(z.string()).describe(
      "Optional. HCFS URIs of jar files to be added to the Spark CLASSPATH.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values, used to configure Spark SQL's SparkConf. Properties that conflict with values set by the Dataproc API might be overwritten.",
    ).optional(),
    queryFileUri: z.string().describe(
      "The HCFS URI of the script that contains SQL queries.",
    ).optional(),
    queryList: z.object({
      queries: z.array(z.string()).describe(
        'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
      ).optional(),
    }).describe("A list of queries to run on a cluster.").optional(),
    scriptVariables: z.record(z.string(), z.string()).describe(
      'Optional. Mapping of query variable names to values (equivalent to the Spark SQL command: SET name="value";).',
    ).optional(),
  }).describe(
    "A Dataproc job for running Apache Spark SQL (https://spark.apache.org/sql/) queries.",
  ).optional(),
  status: z.object({
    details: z.string().describe(
      "Optional. Output only. Job state details, such as an error description if the state is ERROR.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PENDING",
      "SETUP_DONE",
      "RUNNING",
      "CANCEL_PENDING",
      "CANCEL_STARTED",
      "CANCELLED",
      "DONE",
      "ERROR",
      "ATTEMPT_FAILURE",
    ]).describe(
      "Output only. A state message specifying the overall job state.",
    ).optional(),
    stateStartTime: z.string().describe(
      "Output only. The time when this state was entered.",
    ).optional(),
    substate: z.enum(["UNSPECIFIED", "SUBMITTED", "QUEUED", "STALE_STATUS"])
      .describe(
        "Output only. Additional state information, which includes status reported by the agent.",
      ).optional(),
  }).describe("Dataproc job status.").optional(),
  statusHistory: z.array(z.object({
    details: z.string().describe(
      "Optional. Output only. Job state details, such as an error description if the state is ERROR.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "PENDING",
      "SETUP_DONE",
      "RUNNING",
      "CANCEL_PENDING",
      "CANCEL_STARTED",
      "CANCELLED",
      "DONE",
      "ERROR",
      "ATTEMPT_FAILURE",
    ]).describe(
      "Output only. A state message specifying the overall job state.",
    ).optional(),
    stateStartTime: z.string().describe(
      "Output only. The time when this state was entered.",
    ).optional(),
    substate: z.enum(["UNSPECIFIED", "SUBMITTED", "QUEUED", "STALE_STATUS"])
      .describe(
        "Output only. Additional state information, which includes status reported by the agent.",
      ).optional(),
  })).describe("Output only. The previous job status.").optional(),
  trinoJob: z.object({
    clientTags: z.array(z.string()).describe(
      "Optional. Trino client tags to attach to this query",
    ).optional(),
    continueOnFailure: z.boolean().describe(
      "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
    ).optional(),
    loggingConfig: z.object({
      driverLogLevels: z.record(
        z.string(),
        z.enum([
          "LEVEL_UNSPECIFIED",
          "ALL",
          "TRACE",
          "DEBUG",
          "INFO",
          "WARN",
          "ERROR",
          "FATAL",
          "OFF",
        ]),
      ).describe(
        "The per-package log levels for the driver. This can include \"root\" package name to configure rootLogger. Examples: - 'com.google = FATAL' - 'root = INFO' - 'org.apache = DEBUG'",
      ).optional(),
    }).describe("The runtime logging config of the job.").optional(),
    outputFormat: z.string().describe(
      "Optional. The format in which query output will be displayed. See the Trino documentation for supported output formats",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of property names to values. Used to set Trino session properties (https://trino.io/docs/current/sql/set-session.html) Equivalent to using the --session flag in the Trino CLI",
    ).optional(),
    queryFileUri: z.string().describe(
      "The HCFS URI of the script that contains SQL queries.",
    ).optional(),
    queryList: z.object({
      queries: z.array(z.string()).describe(
        'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
      ).optional(),
    }).describe("A list of queries to run on a cluster.").optional(),
  }).describe(
    "A Dataproc job for running Trino (https://trino.io/) queries. IMPORTANT: The Dataproc Trino Optional Component (https://cloud.google.com/dataproc/docs/concepts/components/trino) must be enabled when the cluster is created to submit a Trino job to the cluster.",
  ).optional(),
  yarnApplications: z.array(z.object({
    memoryMbSeconds: z.string().describe(
      "Optional. The cumulative memory usage of the application for a job, measured in mb-seconds.",
    ).optional(),
    name: z.string().describe("Required. The application name.").optional(),
    progress: z.number().describe(
      "Required. The numerical progress of the application, from 1 to 100.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "NEW",
      "NEW_SAVING",
      "SUBMITTED",
      "ACCEPTED",
      "RUNNING",
      "FINISHED",
      "FAILED",
      "KILLED",
    ]).describe("Required. The application state.").optional(),
    trackingUrl: z.string().describe(
      "Optional. The HTTP URL of the ApplicationMaster, HistoryServer, or TimelineServer that provides application-specific information. The URL uses the internal hostname, and requires a proxy server for resolution and, possibly, access.",
    ).optional(),
    vcoreSeconds: z.string().describe(
      "Optional. The cumulative CPU time consumed by the application for a job, measured in vcore-seconds.",
    ).optional(),
  })).describe(
    "Output only. The collection of YARN applications spun up by this job.Beta Feature: This report is available for testing purposes only. It might be changed before final release.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataproc Jobs. Registered at `@swamp/gcp/dataproc/jobs`. */
export const model = {
  type: "@swamp/gcp/dataproc/jobs",
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
      description: "A Dataproc job resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["jobId"] = args.identifier;
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
      description: "Update jobs attributes",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
        params["jobId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["done"] !== undefined) body["done"] = g["done"];
        if (g["driverControlFilesUri"] !== undefined) {
          body["driverControlFilesUri"] = g["driverControlFilesUri"];
        }
        if (g["driverOutputResourceUri"] !== undefined) {
          body["driverOutputResourceUri"] = g["driverOutputResourceUri"];
        }
        if (g["driverSchedulingConfig"] !== undefined) {
          body["driverSchedulingConfig"] = g["driverSchedulingConfig"];
        }
        if (g["flinkJob"] !== undefined) body["flinkJob"] = g["flinkJob"];
        if (g["hadoopJob"] !== undefined) body["hadoopJob"] = g["hadoopJob"];
        if (g["hiveJob"] !== undefined) body["hiveJob"] = g["hiveJob"];
        if (g["jobUuid"] !== undefined) body["jobUuid"] = g["jobUuid"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["pigJob"] !== undefined) body["pigJob"] = g["pigJob"];
        if (g["placement"] !== undefined) body["placement"] = g["placement"];
        if (g["prestoJob"] !== undefined) body["prestoJob"] = g["prestoJob"];
        if (g["pysparkJob"] !== undefined) body["pysparkJob"] = g["pysparkJob"];
        if (g["reference"] !== undefined) body["reference"] = g["reference"];
        if (g["scheduling"] !== undefined) body["scheduling"] = g["scheduling"];
        if (g["sparkJob"] !== undefined) body["sparkJob"] = g["sparkJob"];
        if (g["sparkRJob"] !== undefined) body["sparkRJob"] = g["sparkRJob"];
        if (g["sparkSqlJob"] !== undefined) {
          body["sparkSqlJob"] = g["sparkSqlJob"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["statusHistory"] !== undefined) {
          body["statusHistory"] = g["statusHistory"];
        }
        if (g["trinoJob"] !== undefined) body["trinoJob"] = g["trinoJob"];
        if (g["yarnApplications"] !== undefined) {
          body["yarnApplications"] = g["yarnApplications"];
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
      description: "Delete the jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["jobId"] = args.identifier;
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
      description: "Sync jobs state from GCP",
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
          if (g["region"] !== undefined) params["region"] = String(g["region"]);
          else if (existing["region"]) {
            params["region"] = String(existing["region"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["jobId"] = identifier;
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
    cancel: {
      description: "cancel",
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
        params["region"] = existing["region"]?.toString() ??
          g["region"]?.toString() ?? "";
        params["jobId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataproc.projects.regions.jobs.cancel",
            "path":
              "v1/projects/{projectId}/regions/{region}/jobs/{jobId}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["projectId", "region", "jobId"],
            "parameters": {
              "jobId": { "location": "path", "required": true },
              "projectId": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options: z.any().optional(),
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
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataproc.projects.regions.jobs.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
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
            "id": "dataproc.projects.regions.jobs.setIamPolicy",
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
    submit: {
      description: "submit",
      arguments: z.object({
        job: z.any().optional(),
        requestId: z.any().optional(),
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
        params["region"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["job"] !== undefined) body["job"] = args["job"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataproc.projects.regions.jobs.submit",
            "path": "v1/projects/{projectId}/regions/{region}/jobs:submit",
            "httpMethod": "POST",
            "parameterOrder": ["projectId", "region"],
            "parameters": {
              "projectId": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    submit_as_operation: {
      description: "submit as operation",
      arguments: z.object({
        job: z.any().optional(),
        requestId: z.any().optional(),
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
        params["region"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["job"] !== undefined) body["job"] = args["job"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataproc.projects.regions.jobs.submitAsOperation",
            "path":
              "v1/projects/{projectId}/regions/{region}/jobs:submitAsOperation",
            "httpMethod": "POST",
            "parameterOrder": ["projectId", "region"],
            "parameters": {
              "projectId": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
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
            "id": "dataproc.projects.regions.jobs.testIamPermissions",
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
