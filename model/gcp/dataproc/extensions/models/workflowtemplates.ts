// Auto-generated extension model for @swamp/gcp/dataproc/workflowtemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataproc WorkflowTemplates.
 *
 * A Dataproc workflow template resource.
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
  return `${parent}/workflowTemplates/${shortName}`;
}

const BASE_URL = "https://dataproc.googleapis.com/";

const GET_CONFIG = {
  "id": "dataproc.projects.locations.workflowTemplates.get",
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
    "version": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dataproc.projects.locations.workflowTemplates.create",
  "path": "v1/{+parent}/workflowTemplates",
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

const UPDATE_CONFIG = {
  "id": "dataproc.projects.locations.workflowTemplates.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "dataproc.projects.locations.workflowTemplates.delete",
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
    "version": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dataproc.projects.locations.workflowTemplates.list",
  "path": "v1/{+parent}/workflowTemplates",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  dagTimeout: z.string().describe(
    'Optional. Timeout duration for the DAG of jobs, expressed in seconds (see JSON representation of duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). The timeout duration must be from 10 minutes ("600s") to 24 hours ("86400s"). The timer begins when the first job is submitted. If the workflow is running at the end of the timeout period, any remaining jobs are cancelled, the workflow is ended, and if the workflow was running on a managed cluster, the cluster is deleted.',
  ).optional(),
  encryptionConfig: z.object({
    kmsKey: z.string().describe(
      "Optional. The Cloud KMS key name to use for encrypting workflow template job arguments.When this this key is provided, the following workflow template job arguments (https://cloud.google.com/dataproc/docs/concepts/workflows/use-workflows#adding_jobs_to_a_template), if present, are CMEK encrypted (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/customer-managed-encryption#use_cmek_with_workflow_template_data): FlinkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/FlinkJob) HadoopJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/HadoopJob) SparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkJob) SparkRJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkRJob) PySparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/PySparkJob) SparkSqlJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkSqlJob) scriptVariables and queryList.queries HiveJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/HiveJob) scriptVariables and queryList.queries PigJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PigJob) scriptVariables and queryList.queries PrestoJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PrestoJob) scriptVariables and queryList.queries",
    ).optional(),
  }).describe(
    "Encryption settings for encrypting workflow template job arguments.",
  ).optional(),
  id: z.string().optional(),
  jobs: z.array(z.object({
    flinkJob: z.object({
      args: z.array(z.string()).describe(
        "Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision might occur that causes an incorrect job submission.",
      ).optional(),
      jarFileUris: z.array(z.string()).describe(
        "Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Flink driver and tasks.",
      ).optional(),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        queries: z.array(z.unknown()).describe(
          'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
        ).optional(),
      }).describe("A list of queries to run on a cluster.").optional(),
      scriptVariables: z.record(z.string(), z.string()).describe(
        'Optional. Mapping of query variable names to values (equivalent to the Hive command: SET name="value";).',
      ).optional(),
    }).describe(
      "A Dataproc job for running Apache Hive (https://hive.apache.org/) queries on YARN.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. The labels to associate with this job.Label keys must be between 1 and 63 characters long, and must conform to the following regular expression: \\p{Ll}\\p{Lo}{0,62}Label values must be between 1 and 63 characters long, and must conform to the following regular expression: \\p{Ll}\\p{Lo}\\p{N}_-{0,63}No more than 32 labels can be associated with a given job.",
    ).optional(),
    pigJob: z.object({
      continueOnFailure: z.boolean().describe(
        "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
      ).optional(),
      jarFileUris: z.array(z.string()).describe(
        "Optional. HCFS URIs of jar files to add to the CLASSPATH of the Pig Client and Hadoop MapReduce (MR) tasks. Can contain Pig UDFs.",
      ).optional(),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        queries: z.array(z.unknown()).describe(
          'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
        ).optional(),
      }).describe("A list of queries to run on a cluster.").optional(),
      scriptVariables: z.record(z.string(), z.string()).describe(
        "Optional. Mapping of query variable names to values (equivalent to the Pig command: name=[value]).",
      ).optional(),
    }).describe(
      "A Dataproc job for running Apache Pig (https://pig.apache.org/) queries on YARN.",
    ).optional(),
    prerequisiteStepIds: z.array(z.string()).describe(
      "Optional. The optional list of prerequisite job step_ids. If not specified, the job will start at the beginning of workflow.",
    ).optional(),
    prestoJob: z.object({
      clientTags: z.array(z.string()).describe(
        "Optional. Presto client tags to attach to this query",
      ).optional(),
      continueOnFailure: z.boolean().describe(
        "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
      ).optional(),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        queries: z.array(z.unknown()).describe(
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
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        queries: z.array(z.unknown()).describe(
          'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
        ).optional(),
      }).describe("A list of queries to run on a cluster.").optional(),
      scriptVariables: z.record(z.string(), z.string()).describe(
        'Optional. Mapping of query variable names to values (equivalent to the Spark SQL command: SET name="value";).',
      ).optional(),
    }).describe(
      "A Dataproc job for running Apache Spark SQL (https://spark.apache.org/sql/) queries.",
    ).optional(),
    stepId: z.string().describe(
      "Required. The step id. The id must be unique among all jobs within the template.The step id is used as prefix for job id, as job goog-dataproc-workflow-step-id label, and in prerequisiteStepIds field from other steps.The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of between 3 and 50 characters.",
    ).optional(),
    trinoJob: z.object({
      clientTags: z.array(z.string()).describe(
        "Optional. Trino client tags to attach to this query",
      ).optional(),
      continueOnFailure: z.boolean().describe(
        "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
      ).optional(),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        queries: z.array(z.unknown()).describe(
          'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
        ).optional(),
      }).describe("A list of queries to run on a cluster.").optional(),
    }).describe(
      "A Dataproc job for running Trino (https://trino.io/) queries. IMPORTANT: The Dataproc Trino Optional Component (https://cloud.google.com/dataproc/docs/concepts/components/trino) must be enabled when the cluster is created to submit a Trino job to the cluster.",
    ).optional(),
  })).describe("Required. The Directed Acyclic Graph of Jobs to submit.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels to associate with this template. These labels will be propagated to all jobs and clusters created by the workflow instance.Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt).Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt).No more than 32 labels can be associated with a template.",
  ).optional(),
  parameters: z.array(z.object({
    description: z.string().describe(
      "Optional. Brief description of the parameter. Must not exceed 1024 characters.",
    ).optional(),
    fields: z.array(z.string()).describe(
      "Required. Paths to all fields that the parameter replaces. A field is allowed to appear in at most one parameter's list of field paths.A field path is similar in syntax to a google.protobuf.FieldMask. For example, a field path that references the zone field of a workflow template's cluster selector would be specified as placement.clusterSelector.zone.Also, field paths can reference fields using the following syntax: Values in maps can be referenced by key: labels'key' placement.clusterSelector.clusterLabels'key' placement.managedCluster.labels'key' placement.clusterSelector.clusterLabels'key' jobs'step-id'.labels'key' Jobs in the jobs list can be referenced by step-id: jobs'step-id'.hadoopJob.mainJarFileUri jobs'step-id'.hiveJob.queryFileUri jobs'step-id'.pySparkJob.mainPythonFileUri jobs'step-id'.hadoopJob.jarFileUris0 jobs'step-id'.hadoopJob.archiveUris0 jobs'step-id'.hadoopJob.fileUris0 jobs'step-id'.pySparkJob.pythonFileUris0 Items in repeated fields can be referenced by a zero-based index: jobs'step-id'.sparkJob.args0 Other examples: jobs'step-id'.hadoopJob.properties'key' jobs'step-id'.hadoopJob.args0 jobs'step-id'.hiveJob.scriptVariables'key' jobs'step-id'.hadoopJob.mainJarFileUri placement.clusterSelector.zoneIt may not be possible to parameterize maps and repeated fields in their entirety since only individual map values and individual items in repeated fields can be referenced. For example, the following field paths are invalid: placement.clusterSelector.clusterLabels jobs'step-id'.sparkJob.args",
    ).optional(),
    name: z.string().describe(
      "Required. Parameter name. The parameter name is used as the key, and paired with the parameter value, which are passed to the template when the template is instantiated. The name must contain only capital letters (A-Z), numbers (0-9), and underscores (_), and must not start with a number. The maximum length is 40 characters.",
    ).optional(),
    validation: z.object({
      regex: z.object({
        regexes: z.array(z.unknown()).describe(
          "Required. RE2 regular expressions used to validate the parameter's value. The value must match the regex in its entirety (substring matches are not sufficient).",
        ).optional(),
      }).describe("Validation based on regular expressions.").optional(),
      values: z.object({
        values: z.array(z.unknown()).describe(
          "Required. List of allowed values for the parameter.",
        ).optional(),
      }).describe("Validation based on a list of allowed values.").optional(),
    }).describe("Configuration for parameter validation.").optional(),
  })).describe(
    "Optional. Template parameters whose values are substituted into the template. Values for parameters must be provided when the template is instantiated.",
  ).optional(),
  placement: z.object({
    clusterSelector: z.object({
      clusterLabels: z.record(z.string(), z.string()).describe(
        "Required. The cluster labels. Cluster must have all labels to match.",
      ).optional(),
      zone: z.string().describe(
        "Optional. The zone where workflow process executes. This parameter does not affect the selection of the cluster.If unspecified, the zone of the first cluster matching the selector is used.",
      ).optional(),
    }).describe(
      "A selector that chooses target cluster for jobs based on metadata.",
    ).optional(),
    managedCluster: z.object({
      clusterName: z.string().describe(
        "Required. The cluster name prefix. A unique cluster name will be formed by appending a random suffix.The name must contain only lower-case letters (a-z), numbers (0-9), and hyphens (-). Must begin with a letter. Cannot begin or end with hyphen. Must consist of between 2 and 35 characters.",
      ).optional(),
      config: z.object({
        autoscalingConfig: z.object({
          policyUri: z.string().describe(
            "Optional. The autoscaling policy used by the cluster.Only resource names including projectid and location (region) are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id] projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]Note that the policy must be in the same project and Dataproc region.",
          ).optional(),
        }).describe("Autoscaling Policy config associated with the cluster.")
          .optional(),
        auxiliaryNodeGroups: z.array(z.object({
          nodeGroup: z.unknown().describe(
            "Dataproc Node Group. The Dataproc NodeGroup resource is not related to the Dataproc NodeGroupAffinity resource.",
          ).optional(),
          nodeGroupId: z.unknown().describe(
            "Optional. A node group ID. Generated if not specified.The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of from 3 to 33 characters.",
          ).optional(),
        })).describe("Optional. The node group settings.").optional(),
        clusterTier: z.enum([
          "CLUSTER_TIER_UNSPECIFIED",
          "CLUSTER_TIER_STANDARD",
          "CLUSTER_TIER_PREMIUM",
        ]).describe("Optional. The cluster tier.").optional(),
        clusterType: z.enum([
          "CLUSTER_TYPE_UNSPECIFIED",
          "STANDARD",
          "SINGLE_NODE",
          "ZERO_SCALE",
        ]).describe("Optional. The type of the cluster.").optional(),
        configBucket: z.string().describe(
          "Optional. A Cloud Storage bucket used to stage job dependencies, config files, and job driver console output. If you do not specify a staging bucket, Dataproc determines a Cloud Storage location (US, ASIA, or EU) for the cluster staging bucket according to the Compute Engine zone where the cluster is deployed, and then creates and manages this project-level, per-location bucket (see Dataproc staging and temp buckets (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)). This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
        ).optional(),
        dataprocMetricConfig: z.object({
          metrics: z.array(z.unknown()).describe(
            "Required. Metrics sources to enable.",
          ).optional(),
        }).describe("Dataproc metric config.").optional(),
        diagnosticBucket: z.string().describe(
          "Optional. A Cloud Storage bucket used to collect checkpoint diagnostic data (https://cloud.google.com/dataproc/docs/support/diagnose-clusters#checkpoint_diagnostic_data). If you do not specify a diagnostic bucket, Cloud Dataproc will use the Dataproc temp bucket to collect the checkpoint diagnostic data. This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
        ).optional(),
        encryptionConfig: z.object({
          gcePdKmsKeyName: z.string().describe(
            "Optional. The Cloud KMS key resource name to use for persistent disk encryption for all instances in the cluster. See Use CMEK with cluster data (https://cloud.google.com//dataproc/docs/concepts/configuring-clusters/customer-managed-encryption#use_cmek_with_cluster_data) for more information.",
          ).optional(),
          kmsKey: z.string().describe(
            "Optional. The Cloud KMS key resource name to use for cluster persistent disk and job argument encryption. See Use CMEK with cluster data (https://cloud.google.com//dataproc/docs/concepts/configuring-clusters/customer-managed-encryption#use_cmek_with_cluster_data) for more information.When this key resource name is provided, the following job arguments of the following job types submitted to the cluster are encrypted using CMEK: FlinkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/FlinkJob) HadoopJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/HadoopJob) SparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkJob) SparkRJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkRJob) PySparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/PySparkJob) SparkSqlJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkSqlJob) scriptVariables and queryList.queries HiveJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/HiveJob) scriptVariables and queryList.queries PigJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PigJob) scriptVariables and queryList.queries PrestoJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PrestoJob) scriptVariables and queryList.queries",
          ).optional(),
        }).describe("Encryption settings for the cluster.").optional(),
        endpointConfig: z.object({
          enableHttpPortAccess: z.boolean().describe(
            "Optional. If true, enable http access to specific ports on the cluster from external sources. Defaults to false.",
          ).optional(),
          httpPorts: z.record(z.string(), z.unknown()).describe(
            "Output only. The map of port descriptions to URLs. Will only be populated if enable_http_port_access is true.",
          ).optional(),
        }).describe("Endpoint config for this cluster").optional(),
        engine: z.enum(["ENGINE_UNSPECIFIED", "DEFAULT", "LIGHTNING"]).describe(
          "Optional. The cluster engine.",
        ).optional(),
        gceClusterConfig: z.object({
          autoZoneExcludeZoneUris: z.array(z.unknown()).describe(
            "Optional. An optional list of Compute Engine zones where the Dataproc cluster will not be located when Auto Zone is enabled. Only one of zone_uri or auto_zone_exclude_zone_uris can be set. If both are omitted, the service will pick a zone in the cluster Compute Engine region. If auto_zone_exclude_zone_uris is set and there is more than one non-excluded zone, the service will pick one of the non-excluded zones. Otherwise, cluster creation will fail with INVALID_ARGUMENT error.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone] projects/[project_id]/zones/[zone] [zone]",
          ).optional(),
          confidentialInstanceConfig: z.object({
            enableConfidentialCompute: z.unknown().describe(
              "Optional. Deprecated: Use 'confidential_instance_type' instead. Defines whether the instance should have confidential compute enabled.",
            ).optional(),
          }).describe(
            "Confidential Instance Config for clusters using Confidential VMs (https://cloud.google.com/compute/confidential-vm/docs)",
          ).optional(),
          internalIpOnly: z.boolean().describe(
            "Optional. This setting applies to subnetwork-enabled networks. It is set to true by default in clusters created with image versions 2.2.x.When set to true: All cluster VMs have internal IP addresses. Google Private Access (https://cloud.google.com/vpc/docs/private-google-access) must be enabled to access Dataproc and other Google Cloud APIs. Off-cluster dependencies must be configured to be accessible without external IP addresses.When set to false: Cluster VMs are not restricted to internal IP addresses. Ephemeral external IP addresses are assigned to each cluster VM.",
          ).optional(),
          metadata: z.record(z.string(), z.unknown()).describe(
            "Optional. The Compute Engine metadata entries to add to all instances (see Project and instance metadata (https://cloud.google.com/compute/docs/storing-retrieving-metadata#project_and_instance_metadata)).",
          ).optional(),
          networkUri: z.string().describe(
            'Optional. The Compute Engine network to be used for machine communications. Cannot be specified with subnetwork_uri. If neither network_uri nor subnetwork_uri is specified, the "default" network of the project is used, if it exists. Cannot be a Custom Subnet Network (see Using Subnetworks (https://cloud.google.com/compute/docs/subnetworks) for more information).A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/global/networks/default projects/[project_id]/global/networks/default default',
          ).optional(),
          nodeGroupAffinity: z.object({
            nodeGroupUri: z.unknown().describe(
              "Required. The URI of a sole-tenant node group resource (https://cloud.google.com/compute/docs/reference/rest/v1/nodeGroups) that the cluster will be created on.A full URL, partial URI, or node group name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/nodeGroups/node-group-1 projects/[project_id]/zones/[zone]/nodeGroups/node-group-1 node-group-1",
            ).optional(),
          }).describe(
            "Node Group Affinity for clusters using sole-tenant node groups. The Dataproc NodeGroupAffinity resource is not related to the Dataproc NodeGroup resource.",
          ).optional(),
          privateIpv6GoogleAccess: z.enum([
            "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED",
            "INHERIT_FROM_SUBNETWORK",
            "OUTBOUND",
            "BIDIRECTIONAL",
          ]).describe("Optional. The type of IPv6 access for a cluster.")
            .optional(),
          reservationAffinity: z.object({
            consumeReservationType: z.unknown().describe(
              "Optional. Type of reservation to consume",
            ).optional(),
            key: z.unknown().describe(
              "Optional. Corresponds to the label key of reservation resource.",
            ).optional(),
            values: z.unknown().describe(
              "Optional. Corresponds to the label values of reservation resource.",
            ).optional(),
          }).describe("Reservation Affinity for consuming Zonal reservation.")
            .optional(),
          resourceManagerTags: z.record(z.string(), z.unknown()).describe(
            "Optional. Resource manager tags (https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing) to add to all instances (see Use secure tags in Dataproc (https://cloud.google.com/dataproc/docs/guides/use-secure-tags)).",
          ).optional(),
          serviceAccount: z.string().describe(
            "Optional. The Dataproc service account (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/service-accounts#service_accounts_in_dataproc) (also see VM Data Plane identity (https://cloud.google.com/dataproc/docs/concepts/iam/dataproc-principals#vm_service_account_data_plane_identity)) used by Dataproc cluster VM instances to access Google Cloud Platform services.If not specified, the Compute Engine default service account (https://cloud.google.com/compute/docs/access/service-accounts#default_service_account) is used.",
          ).optional(),
          serviceAccountScopes: z.array(z.unknown()).describe(
            "Optional. The URIs of service account scopes to be included in Compute Engine instances. The following base set of scopes is always included: https://www.googleapis.com/auth/cloud.useraccounts.readonly https://www.googleapis.com/auth/devstorage.read_write https://www.googleapis.com/auth/logging.writeIf no scopes are specified, the following defaults are also provided: https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/bigtable.admin.table https://www.googleapis.com/auth/bigtable.data https://www.googleapis.com/auth/devstorage.full_control",
          ).optional(),
          shieldedInstanceConfig: z.object({
            enableIntegrityMonitoring: z.unknown().describe(
              "Optional. Defines whether instances have integrity monitoring enabled.",
            ).optional(),
            enableSecureBoot: z.unknown().describe(
              "Optional. Defines whether instances have Secure Boot enabled.",
            ).optional(),
            enableVtpm: z.unknown().describe(
              "Optional. Defines whether instances have the vTPM enabled.",
            ).optional(),
          }).describe(
            "Shielded Instance Config for clusters using Compute Engine Shielded VMs (https://cloud.google.com/security/shielded-cloud/shielded-vm).",
          ).optional(),
          subnetworkUri: z.string().describe(
            "Optional. The Compute Engine subnetwork to be used for machine communications. Cannot be specified with network_uri.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/regions/[region]/subnetworks/sub0 projects/[project_id]/regions/[region]/subnetworks/sub0 sub0",
          ).optional(),
          tags: z.array(z.unknown()).describe(
            "The Compute Engine network tags to add to all instances (see Tagging instances (https://cloud.google.com/vpc/docs/add-remove-network-tags)).",
          ).optional(),
          zoneUri: z.string().describe(
            "Optional. The Compute Engine zone where the Dataproc cluster will be located. If omitted, the service will pick a zone in the cluster's Compute Engine region. On a get request, zone will always be present.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone] projects/[project_id]/zones/[zone] [zone]",
          ).optional(),
        }).describe(
          "Common config settings for resources of Compute Engine cluster instances, applicable to all instances in the cluster.",
        ).optional(),
        gkeClusterConfig: z.object({
          gkeClusterTarget: z.string().describe(
            "Optional. A target GKE cluster to deploy to. It must be in the same project and region as the Dataproc cluster (the GKE cluster can be zonal or regional). Format: 'projects/{project}/locations/{location}/clusters/{cluster_id}'",
          ).optional(),
          namespacedGkeDeploymentTarget: z.object({
            clusterNamespace: z.unknown().describe(
              "Optional. A namespace within the GKE cluster to deploy into.",
            ).optional(),
            targetGkeCluster: z.unknown().describe(
              "Optional. The target GKE cluster to deploy to. Format: 'projects/{project}/locations/{location}/clusters/{cluster_id}'",
            ).optional(),
          }).describe(
            "Deprecated. Used only for the deprecated beta. A full, namespace-isolated deployment target for an existing GKE cluster.",
          ).optional(),
          nodePoolTarget: z.array(z.unknown()).describe(
            "Optional. GKE node pools where workloads will be scheduled. At least one node pool must be assigned the DEFAULT GkeNodePoolTarget.Role. If a GkeNodePoolTarget is not specified, Dataproc constructs a DEFAULT GkeNodePoolTarget. Each role can be given to only one GkeNodePoolTarget. All node pools must have the same location settings.",
          ).optional(),
        }).describe("The cluster's GKE config.").optional(),
        initializationActions: z.array(z.object({
          executableFile: z.unknown().describe(
            "Required. Cloud Storage URI of executable file.",
          ).optional(),
          executionTimeout: z.unknown().describe(
            "Optional. Amount of time executable has to complete. Default is 10 minutes (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).Cluster creation fails with an explanatory error message (the name of the executable that caused the error and the exceeded timeout period) if the executable is not completed at end of the timeout period.",
          ).optional(),
        })).describe(
          "Optional. Commands to execute on each node after config is completed. By default, executables are run on master and all worker nodes. You can test a node's role metadata to run an executable on a master or worker node, as shown below using curl (you can also use wget): ROLE=$(curl -H Metadata-Flavor:Google http://metadata/computeMetadata/v1/instance/attributes/dataproc-role) if [[ \"${ROLE}\" == 'Master' ]]; then... master specific actions... else... worker specific actions... fi",
        ).optional(),
        lifecycleConfig: z.object({
          autoDeleteTime: z.string().describe(
            "Optional. The time when cluster will be auto-deleted (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          autoDeleteTtl: z.string().describe(
            "Optional. The lifetime duration of cluster. The cluster will be auto-deleted at the end of this period. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          autoStopTime: z.string().describe(
            "Optional. The time when cluster will be auto-stopped (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          autoStopTtl: z.string().describe(
            "Optional. The lifetime duration of the cluster. The cluster will be auto-stopped at the end of this period, calculated from the time of submission of the create or update cluster request. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          idleDeleteTtl: z.string().describe(
            "Optional. The duration to keep the cluster alive while idling (when no jobs are running). Passing this threshold will cause the cluster to be deleted. Minimum value is 5 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          idleStartTime: z.string().describe(
            "Output only. The time when cluster became idle (most recent job finished) and became eligible for deletion due to idleness (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          idleStopTtl: z.string().describe(
            "Optional. The duration to keep the cluster started while idling (when no jobs are running). Passing this threshold will cause the cluster to be stopped. Minimum value is 5 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
        }).describe("Specifies the cluster auto-delete schedule configuration.")
          .optional(),
        masterConfig: z.object({
          accelerators: z.array(z.unknown()).describe(
            "Optional. The Compute Engine accelerator configuration for these instances.",
          ).optional(),
          diskConfig: z.object({
            attachedDiskConfigs: z.unknown().describe(
              "Optional. A list of attached disk configs for a group of VM instances.",
            ).optional(),
            bootDiskProvisionedIops: z.unknown().describe(
              "Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskProvisionedThroughput: z.unknown().describe(
              "Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskSizeGb: z.unknown().describe(
              "Optional. Size in GB of the boot disk (default is 500GB).",
            ).optional(),
            bootDiskType: z.unknown().describe(
              "Optional. Type of the boot disk (default is pd-standard). Valid values: pd-balanced (Persistent Disk Balanced Solid State Drive), pd-ssd (Persistent Disk Solid State Drive), or pd-standard (Persistent Disk Hard Disk Drive). See Disk types (https://cloud.google.com/compute/docs/disks#disk-types).",
            ).optional(),
            localSsdInterface: z.unknown().describe(
              "Optional. Interface type of local SSDs (default is scsi). Valid values: scsi (Small Computer System Interface), nvme (Non-Volatile Memory Express). See local SSD performance (https://cloud.google.com/compute/docs/disks/local-ssd#performance).",
            ).optional(),
            numLocalSsds: z.unknown().describe(
              "Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and HDFS (https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html) data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries.Note: Local SSD options may vary by machine type and number of vCPUs selected.",
            ).optional(),
          }).describe(
            "Specifies the config of boot disk and attached disk options for a group of VM instances.",
          ).optional(),
          imageUri: z.string().describe(
            "Optional. The Compute Engine image resource used for cluster instances.The URI can represent an image or image family.Image examples: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/[image-id] projects/[project_id]/global/images/[image-id] image-idImage family examples. Dataproc will use the most recent image from the family: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/family/[custom-image-family-name] projects/[project_id]/global/images/family/[custom-image-family-name]If the URI is unspecified, it will be inferred from SoftwareConfig.image_version or the system default.",
          ).optional(),
          instanceFlexibilityPolicy: z.object({
            instanceMachineTypes: z.unknown().describe(
              "Output only. A map of instance short name to machine type. The key is the short name of the Compute Engine instance, and the value is the full machine-type name (e.g., 'n1-standard-16'). See Machine types for more information on valid machine type strings.",
            ).optional(),
            instanceSelectionList: z.unknown().describe(
              "Optional. List of instance selection options that the group will use when creating new VMs.",
            ).optional(),
            instanceSelectionResults: z.unknown().describe(
              "Output only. A list of instance selection results in the group.",
            ).optional(),
            provisioningModelMix: z.unknown().describe(
              "Defines how Dataproc should create VMs with a mixture of provisioning models.",
            ).optional(),
          }).describe(
            "Instance flexibility Policy allowing a mixture of VM shapes and provisioning models.",
          ).optional(),
          instanceNames: z.array(z.unknown()).describe(
            "Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.",
          ).optional(),
          instanceReferences: z.array(z.unknown()).describe(
            "Output only. List of references to Compute Engine instances.",
          ).optional(),
          isPreemptible: z.boolean().describe(
            "Output only. Specifies that this instance group contains preemptible instances.",
          ).optional(),
          machineTypeUri: z.string().describe(
            "Optional. The Compute Engine machine type used for cluster instances.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 n1-standard-2Auto Zone Exception: If you are using the Dataproc Auto Zone Placement (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement) feature, you must use the short name of the machine type resource, for example, n1-standard-2.",
          ).optional(),
          managedGroupConfig: z.object({
            instanceGroupManagerName: z.unknown().describe(
              "Output only. The name of the Instance Group Manager for this group.",
            ).optional(),
            instanceGroupManagerUri: z.unknown().describe(
              "Output only. The partial URI to the instance group manager for this group. E.g. projects/my-project/regions/us-central1/instanceGroupManagers/my-igm.",
            ).optional(),
            instanceTemplateName: z.unknown().describe(
              "Output only. The name of the Instance Template used for the Managed Instance Group.",
            ).optional(),
          }).describe(
            "Specifies the resources used to actively manage an instance group.",
          ).optional(),
          minCpuPlatform: z.string().describe(
            "Optional. Specifies the minimum cpu platform for the Instance Group. See Dataproc -> Minimum CPU Platform (https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu).",
          ).optional(),
          minNumInstances: z.number().int().describe(
            "Optional. The minimum number of primary worker instances to create. If min_num_instances is set, cluster creation will succeed if the number of primary workers created is at least equal to the min_num_instances number.Example: Cluster creation request with num_instances = 5 and min_num_instances = 3: If 4 VMs are created and 1 instance fails, the failed VM is deleted. The cluster is resized to 4 instances and placed in a RUNNING state. If 2 instances are created and 3 instances fail, the cluster in placed in an ERROR state. The failed VMs are not deleted.",
          ).optional(),
          numInstances: z.number().int().describe(
            "Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1.",
          ).optional(),
          preemptibility: z.enum([
            "PREEMPTIBILITY_UNSPECIFIED",
            "NON_PREEMPTIBLE",
            "PREEMPTIBLE",
            "SPOT",
          ]).describe(
            "Optional. Specifies the preemptibility of the instance group.The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed.The default value for secondary instances is PREEMPTIBLE.",
          ).optional(),
          startupConfig: z.object({
            requiredRegistrationFraction: z.unknown().describe(
              "Optional. The config setting to enable cluster creation/ updation to be successful only after required_registration_fraction of instances are up and running. This configuration is applicable to only secondary workers for now. The cluster will fail if required_registration_fraction of instances are not available. This will include instance creation, agent registration, and service registration (if enabled).",
            ).optional(),
          }).describe(
            "Configuration to handle the startup of instances during cluster create and update process.",
          ).optional(),
        }).describe(
          "The config settings for Compute Engine resources in an instance group, such as a master or worker group.",
        ).optional(),
        metastoreConfig: z.object({
          dataprocMetastoreService: z.string().describe(
            "Required. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[dataproc_region]/services/[service-name]",
          ).optional(),
        }).describe("Specifies a Metastore configuration.").optional(),
        secondaryWorkerConfig: z.object({
          accelerators: z.array(z.unknown()).describe(
            "Optional. The Compute Engine accelerator configuration for these instances.",
          ).optional(),
          diskConfig: z.object({
            attachedDiskConfigs: z.unknown().describe(
              "Optional. A list of attached disk configs for a group of VM instances.",
            ).optional(),
            bootDiskProvisionedIops: z.unknown().describe(
              "Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskProvisionedThroughput: z.unknown().describe(
              "Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskSizeGb: z.unknown().describe(
              "Optional. Size in GB of the boot disk (default is 500GB).",
            ).optional(),
            bootDiskType: z.unknown().describe(
              "Optional. Type of the boot disk (default is pd-standard). Valid values: pd-balanced (Persistent Disk Balanced Solid State Drive), pd-ssd (Persistent Disk Solid State Drive), or pd-standard (Persistent Disk Hard Disk Drive). See Disk types (https://cloud.google.com/compute/docs/disks#disk-types).",
            ).optional(),
            localSsdInterface: z.unknown().describe(
              "Optional. Interface type of local SSDs (default is scsi). Valid values: scsi (Small Computer System Interface), nvme (Non-Volatile Memory Express). See local SSD performance (https://cloud.google.com/compute/docs/disks/local-ssd#performance).",
            ).optional(),
            numLocalSsds: z.unknown().describe(
              "Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and HDFS (https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html) data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries.Note: Local SSD options may vary by machine type and number of vCPUs selected.",
            ).optional(),
          }).describe(
            "Specifies the config of boot disk and attached disk options for a group of VM instances.",
          ).optional(),
          imageUri: z.string().describe(
            "Optional. The Compute Engine image resource used for cluster instances.The URI can represent an image or image family.Image examples: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/[image-id] projects/[project_id]/global/images/[image-id] image-idImage family examples. Dataproc will use the most recent image from the family: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/family/[custom-image-family-name] projects/[project_id]/global/images/family/[custom-image-family-name]If the URI is unspecified, it will be inferred from SoftwareConfig.image_version or the system default.",
          ).optional(),
          instanceFlexibilityPolicy: z.object({
            instanceMachineTypes: z.unknown().describe(
              "Output only. A map of instance short name to machine type. The key is the short name of the Compute Engine instance, and the value is the full machine-type name (e.g., 'n1-standard-16'). See Machine types for more information on valid machine type strings.",
            ).optional(),
            instanceSelectionList: z.unknown().describe(
              "Optional. List of instance selection options that the group will use when creating new VMs.",
            ).optional(),
            instanceSelectionResults: z.unknown().describe(
              "Output only. A list of instance selection results in the group.",
            ).optional(),
            provisioningModelMix: z.unknown().describe(
              "Defines how Dataproc should create VMs with a mixture of provisioning models.",
            ).optional(),
          }).describe(
            "Instance flexibility Policy allowing a mixture of VM shapes and provisioning models.",
          ).optional(),
          instanceNames: z.array(z.unknown()).describe(
            "Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.",
          ).optional(),
          instanceReferences: z.array(z.unknown()).describe(
            "Output only. List of references to Compute Engine instances.",
          ).optional(),
          isPreemptible: z.boolean().describe(
            "Output only. Specifies that this instance group contains preemptible instances.",
          ).optional(),
          machineTypeUri: z.string().describe(
            "Optional. The Compute Engine machine type used for cluster instances.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 n1-standard-2Auto Zone Exception: If you are using the Dataproc Auto Zone Placement (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement) feature, you must use the short name of the machine type resource, for example, n1-standard-2.",
          ).optional(),
          managedGroupConfig: z.object({
            instanceGroupManagerName: z.unknown().describe(
              "Output only. The name of the Instance Group Manager for this group.",
            ).optional(),
            instanceGroupManagerUri: z.unknown().describe(
              "Output only. The partial URI to the instance group manager for this group. E.g. projects/my-project/regions/us-central1/instanceGroupManagers/my-igm.",
            ).optional(),
            instanceTemplateName: z.unknown().describe(
              "Output only. The name of the Instance Template used for the Managed Instance Group.",
            ).optional(),
          }).describe(
            "Specifies the resources used to actively manage an instance group.",
          ).optional(),
          minCpuPlatform: z.string().describe(
            "Optional. Specifies the minimum cpu platform for the Instance Group. See Dataproc -> Minimum CPU Platform (https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu).",
          ).optional(),
          minNumInstances: z.number().int().describe(
            "Optional. The minimum number of primary worker instances to create. If min_num_instances is set, cluster creation will succeed if the number of primary workers created is at least equal to the min_num_instances number.Example: Cluster creation request with num_instances = 5 and min_num_instances = 3: If 4 VMs are created and 1 instance fails, the failed VM is deleted. The cluster is resized to 4 instances and placed in a RUNNING state. If 2 instances are created and 3 instances fail, the cluster in placed in an ERROR state. The failed VMs are not deleted.",
          ).optional(),
          numInstances: z.number().int().describe(
            "Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1.",
          ).optional(),
          preemptibility: z.enum([
            "PREEMPTIBILITY_UNSPECIFIED",
            "NON_PREEMPTIBLE",
            "PREEMPTIBLE",
            "SPOT",
          ]).describe(
            "Optional. Specifies the preemptibility of the instance group.The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed.The default value for secondary instances is PREEMPTIBLE.",
          ).optional(),
          startupConfig: z.object({
            requiredRegistrationFraction: z.unknown().describe(
              "Optional. The config setting to enable cluster creation/ updation to be successful only after required_registration_fraction of instances are up and running. This configuration is applicable to only secondary workers for now. The cluster will fail if required_registration_fraction of instances are not available. This will include instance creation, agent registration, and service registration (if enabled).",
            ).optional(),
          }).describe(
            "Configuration to handle the startup of instances during cluster create and update process.",
          ).optional(),
        }).describe(
          "The config settings for Compute Engine resources in an instance group, such as a master or worker group.",
        ).optional(),
        securityConfig: z.object({
          identityConfig: z.object({
            userServiceAccountMapping: z.unknown().describe(
              "Required. Map of user to service account.",
            ).optional(),
          }).describe(
            "Identity related configuration, including service account based secure multi-tenancy user mappings.",
          ).optional(),
          kerberosConfig: z.object({
            crossRealmTrustAdminServer: z.unknown().describe(
              "Optional. The admin server (IP or hostname) for the remote trusted realm in a cross realm trust relationship.",
            ).optional(),
            crossRealmTrustKdc: z.unknown().describe(
              "Optional. The KDC (IP or hostname) for the remote trusted realm in a cross realm trust relationship.",
            ).optional(),
            crossRealmTrustRealm: z.unknown().describe(
              "Optional. The remote realm the Dataproc on-cluster KDC will trust, should the user enable cross realm trust.",
            ).optional(),
            crossRealmTrustSharedPasswordUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the shared password between the on-cluster Kerberos realm and the remote trusted realm, in a cross realm trust relationship.",
            ).optional(),
            enableKerberos: z.unknown().describe(
              "Optional. Flag to indicate whether to Kerberize the cluster (default: false). Set this field to true to enable Kerberos on a cluster.",
            ).optional(),
            kdcDbKeyUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the master key of the KDC database.",
            ).optional(),
            keyPasswordUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided key. For the self-signed certificate, this password is generated by Dataproc.",
            ).optional(),
            keystorePasswordUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided keystore. For the self-signed certificate, this password is generated by Dataproc.",
            ).optional(),
            keystoreUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of the keystore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate.",
            ).optional(),
            kmsKeyUri: z.unknown().describe(
              "Optional. The URI of the KMS key used to encrypt sensitive files.",
            ).optional(),
            realm: z.unknown().describe(
              "Optional. The name of the on-cluster Kerberos realm. If not specified, the uppercased domain of hostnames will be the realm.",
            ).optional(),
            rootPrincipalPasswordUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the root principal password.",
            ).optional(),
            tgtLifetimeHours: z.unknown().describe(
              "Optional. The lifetime of the ticket granting ticket, in hours. If not specified, or user specifies 0, then default value 10 will be used.",
            ).optional(),
            truststorePasswordUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided truststore. For the self-signed certificate, this password is generated by Dataproc.",
            ).optional(),
            truststoreUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of the truststore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate.",
            ).optional(),
          }).describe("Specifies Kerberos related configuration.").optional(),
        }).describe(
          "Security related configuration, including encryption, Kerberos, etc.",
        ).optional(),
        softwareConfig: z.object({
          imageVersion: z.string().describe(
            'Optional. The version of software inside the cluster. It must be one of the supported Dataproc Versions (https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#supported-dataproc-image-versions), such as "1.2" (including a subminor version, such as "1.2.29"), or the "preview" version (https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#other_versions). If unspecified, it defaults to the latest Debian version.',
          ).optional(),
          optionalComponents: z.array(z.unknown()).describe(
            "Optional. The set of components to activate on the cluster.",
          ).optional(),
          properties: z.record(z.string(), z.unknown()).describe(
            "Optional. The properties to set on daemon config files.Property keys are specified in prefix:property format, for example core:hadoop.tmp.dir. The following are supported prefixes and their mappings: capacity-scheduler: capacity-scheduler.xml core: core-site.xml distcp: distcp-default.xml hdfs: hdfs-site.xml hive: hive-site.xml mapred: mapred-site.xml pig: pig.properties spark: spark-defaults.conf yarn: yarn-site.xmlFor more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties).",
          ).optional(),
        }).describe(
          "Specifies the selection and config of software inside the cluster.",
        ).optional(),
        tempBucket: z.string().describe(
          "Optional. A Cloud Storage bucket used to store ephemeral cluster and jobs data, such as Spark and MapReduce history files. If you do not specify a temp bucket, Dataproc determines a Cloud Storage location (US, ASIA, or EU) for the cluster temp bucket according to the Compute Engine zone where the cluster is deployed, and then creates and manages this project-level, per-location bucket. The default bucket has a TTL of 90 days, but you can use any TTL (or none) if you specify a bucket (see Dataproc staging and temp buckets (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)). This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
        ).optional(),
        workerConfig: z.object({
          accelerators: z.array(z.unknown()).describe(
            "Optional. The Compute Engine accelerator configuration for these instances.",
          ).optional(),
          diskConfig: z.object({
            attachedDiskConfigs: z.unknown().describe(
              "Optional. A list of attached disk configs for a group of VM instances.",
            ).optional(),
            bootDiskProvisionedIops: z.unknown().describe(
              "Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskProvisionedThroughput: z.unknown().describe(
              "Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskSizeGb: z.unknown().describe(
              "Optional. Size in GB of the boot disk (default is 500GB).",
            ).optional(),
            bootDiskType: z.unknown().describe(
              "Optional. Type of the boot disk (default is pd-standard). Valid values: pd-balanced (Persistent Disk Balanced Solid State Drive), pd-ssd (Persistent Disk Solid State Drive), or pd-standard (Persistent Disk Hard Disk Drive). See Disk types (https://cloud.google.com/compute/docs/disks#disk-types).",
            ).optional(),
            localSsdInterface: z.unknown().describe(
              "Optional. Interface type of local SSDs (default is scsi). Valid values: scsi (Small Computer System Interface), nvme (Non-Volatile Memory Express). See local SSD performance (https://cloud.google.com/compute/docs/disks/local-ssd#performance).",
            ).optional(),
            numLocalSsds: z.unknown().describe(
              "Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and HDFS (https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html) data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries.Note: Local SSD options may vary by machine type and number of vCPUs selected.",
            ).optional(),
          }).describe(
            "Specifies the config of boot disk and attached disk options for a group of VM instances.",
          ).optional(),
          imageUri: z.string().describe(
            "Optional. The Compute Engine image resource used for cluster instances.The URI can represent an image or image family.Image examples: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/[image-id] projects/[project_id]/global/images/[image-id] image-idImage family examples. Dataproc will use the most recent image from the family: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/family/[custom-image-family-name] projects/[project_id]/global/images/family/[custom-image-family-name]If the URI is unspecified, it will be inferred from SoftwareConfig.image_version or the system default.",
          ).optional(),
          instanceFlexibilityPolicy: z.object({
            instanceMachineTypes: z.unknown().describe(
              "Output only. A map of instance short name to machine type. The key is the short name of the Compute Engine instance, and the value is the full machine-type name (e.g., 'n1-standard-16'). See Machine types for more information on valid machine type strings.",
            ).optional(),
            instanceSelectionList: z.unknown().describe(
              "Optional. List of instance selection options that the group will use when creating new VMs.",
            ).optional(),
            instanceSelectionResults: z.unknown().describe(
              "Output only. A list of instance selection results in the group.",
            ).optional(),
            provisioningModelMix: z.unknown().describe(
              "Defines how Dataproc should create VMs with a mixture of provisioning models.",
            ).optional(),
          }).describe(
            "Instance flexibility Policy allowing a mixture of VM shapes and provisioning models.",
          ).optional(),
          instanceNames: z.array(z.unknown()).describe(
            "Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.",
          ).optional(),
          instanceReferences: z.array(z.unknown()).describe(
            "Output only. List of references to Compute Engine instances.",
          ).optional(),
          isPreemptible: z.boolean().describe(
            "Output only. Specifies that this instance group contains preemptible instances.",
          ).optional(),
          machineTypeUri: z.string().describe(
            "Optional. The Compute Engine machine type used for cluster instances.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 n1-standard-2Auto Zone Exception: If you are using the Dataproc Auto Zone Placement (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement) feature, you must use the short name of the machine type resource, for example, n1-standard-2.",
          ).optional(),
          managedGroupConfig: z.object({
            instanceGroupManagerName: z.unknown().describe(
              "Output only. The name of the Instance Group Manager for this group.",
            ).optional(),
            instanceGroupManagerUri: z.unknown().describe(
              "Output only. The partial URI to the instance group manager for this group. E.g. projects/my-project/regions/us-central1/instanceGroupManagers/my-igm.",
            ).optional(),
            instanceTemplateName: z.unknown().describe(
              "Output only. The name of the Instance Template used for the Managed Instance Group.",
            ).optional(),
          }).describe(
            "Specifies the resources used to actively manage an instance group.",
          ).optional(),
          minCpuPlatform: z.string().describe(
            "Optional. Specifies the minimum cpu platform for the Instance Group. See Dataproc -> Minimum CPU Platform (https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu).",
          ).optional(),
          minNumInstances: z.number().int().describe(
            "Optional. The minimum number of primary worker instances to create. If min_num_instances is set, cluster creation will succeed if the number of primary workers created is at least equal to the min_num_instances number.Example: Cluster creation request with num_instances = 5 and min_num_instances = 3: If 4 VMs are created and 1 instance fails, the failed VM is deleted. The cluster is resized to 4 instances and placed in a RUNNING state. If 2 instances are created and 3 instances fail, the cluster in placed in an ERROR state. The failed VMs are not deleted.",
          ).optional(),
          numInstances: z.number().int().describe(
            "Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1.",
          ).optional(),
          preemptibility: z.enum([
            "PREEMPTIBILITY_UNSPECIFIED",
            "NON_PREEMPTIBLE",
            "PREEMPTIBLE",
            "SPOT",
          ]).describe(
            "Optional. Specifies the preemptibility of the instance group.The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed.The default value for secondary instances is PREEMPTIBLE.",
          ).optional(),
          startupConfig: z.object({
            requiredRegistrationFraction: z.unknown().describe(
              "Optional. The config setting to enable cluster creation/ updation to be successful only after required_registration_fraction of instances are up and running. This configuration is applicable to only secondary workers for now. The cluster will fail if required_registration_fraction of instances are not available. This will include instance creation, agent registration, and service registration (if enabled).",
            ).optional(),
          }).describe(
            "Configuration to handle the startup of instances during cluster create and update process.",
          ).optional(),
        }).describe(
          "The config settings for Compute Engine resources in an instance group, such as a master or worker group.",
        ).optional(),
      }).describe("The cluster config.").optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. The labels to associate with this cluster.Label keys must be between 1 and 63 characters long, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62}Label values must be between 1 and 63 characters long, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}\\p{N}_-{0,63}No more than 32 labels can be associated with a given cluster.",
      ).optional(),
    }).describe("Cluster that is managed by the workflow.").optional(),
  }).describe(
    "Specifies workflow execution target.Either managed_cluster or cluster_selector is required.",
  ).optional(),
  version: z.number().int().describe(
    "Optional. Used to perform a consistent read-modify-write.This field should be left blank for a CreateWorkflowTemplate request. It is required for an UpdateWorkflowTemplate request, and must match the current server version. A typical update template flow would fetch the current template with a GetWorkflowTemplate request, which will return the current template with the version field filled in with the current server version. The user updates other fields in the template, then returns it as part of the UpdateWorkflowTemplate request.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  dagTimeout: z.string().optional(),
  encryptionConfig: z.object({
    kmsKey: z.string(),
  }).optional(),
  id: z.string().optional(),
  jobs: z.array(z.object({
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
    }),
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
    }),
    hiveJob: z.object({
      continueOnFailure: z.boolean(),
      jarFileUris: z.array(z.string()),
      properties: z.record(z.string(), z.unknown()),
      queryFileUri: z.string(),
      queryList: z.object({
        queries: z.array(z.unknown()),
      }),
      scriptVariables: z.record(z.string(), z.unknown()),
    }),
    labels: z.record(z.string(), z.unknown()),
    pigJob: z.object({
      continueOnFailure: z.boolean(),
      jarFileUris: z.array(z.string()),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()),
      }),
      properties: z.record(z.string(), z.unknown()),
      queryFileUri: z.string(),
      queryList: z.object({
        queries: z.array(z.unknown()),
      }),
      scriptVariables: z.record(z.string(), z.unknown()),
    }),
    prerequisiteStepIds: z.array(z.string()),
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
        queries: z.array(z.unknown()),
      }),
    }),
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
    }),
    scheduling: z.object({
      maxFailuresPerHour: z.number(),
      maxFailuresTotal: z.number(),
    }),
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
    }),
    sparkRJob: z.object({
      archiveUris: z.array(z.string()),
      args: z.array(z.string()),
      fileUris: z.array(z.string()),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()),
      }),
      mainRFileUri: z.string(),
      properties: z.record(z.string(), z.unknown()),
    }),
    sparkSqlJob: z.object({
      jarFileUris: z.array(z.string()),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()),
      }),
      properties: z.record(z.string(), z.unknown()),
      queryFileUri: z.string(),
      queryList: z.object({
        queries: z.array(z.unknown()),
      }),
      scriptVariables: z.record(z.string(), z.unknown()),
    }),
    stepId: z.string(),
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
        queries: z.array(z.unknown()),
      }),
    }),
  })).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  parameters: z.array(z.object({
    description: z.string(),
    fields: z.array(z.string()),
    name: z.string(),
    validation: z.object({
      regex: z.object({
        regexes: z.array(z.unknown()),
      }),
      values: z.object({
        values: z.array(z.unknown()),
      }),
    }),
  })).optional(),
  placement: z.object({
    clusterSelector: z.object({
      clusterLabels: z.record(z.string(), z.unknown()),
      zone: z.string(),
    }),
    managedCluster: z.object({
      clusterName: z.string(),
      config: z.object({
        autoscalingConfig: z.object({
          policyUri: z.string(),
        }),
        auxiliaryNodeGroups: z.array(z.object({
          nodeGroup: z.unknown(),
          nodeGroupId: z.unknown(),
        })),
        clusterTier: z.string(),
        clusterType: z.string(),
        configBucket: z.string(),
        dataprocMetricConfig: z.object({
          metrics: z.array(z.unknown()),
        }),
        diagnosticBucket: z.string(),
        encryptionConfig: z.object({
          gcePdKmsKeyName: z.string(),
          kmsKey: z.string(),
        }),
        endpointConfig: z.object({
          enableHttpPortAccess: z.boolean(),
          httpPorts: z.record(z.string(), z.unknown()),
        }),
        engine: z.string(),
        gceClusterConfig: z.object({
          autoZoneExcludeZoneUris: z.array(z.unknown()),
          confidentialInstanceConfig: z.object({
            enableConfidentialCompute: z.unknown(),
          }),
          internalIpOnly: z.boolean(),
          metadata: z.record(z.string(), z.unknown()),
          networkUri: z.string(),
          nodeGroupAffinity: z.object({
            nodeGroupUri: z.unknown(),
          }),
          privateIpv6GoogleAccess: z.string(),
          reservationAffinity: z.object({
            consumeReservationType: z.unknown(),
            key: z.unknown(),
            values: z.unknown(),
          }),
          resourceManagerTags: z.record(z.string(), z.unknown()),
          serviceAccount: z.string(),
          serviceAccountScopes: z.array(z.unknown()),
          shieldedInstanceConfig: z.object({
            enableIntegrityMonitoring: z.unknown(),
            enableSecureBoot: z.unknown(),
            enableVtpm: z.unknown(),
          }),
          subnetworkUri: z.string(),
          tags: z.array(z.unknown()),
          zoneUri: z.string(),
        }),
        gkeClusterConfig: z.object({
          gkeClusterTarget: z.string(),
          namespacedGkeDeploymentTarget: z.object({
            clusterNamespace: z.unknown(),
            targetGkeCluster: z.unknown(),
          }),
          nodePoolTarget: z.array(z.unknown()),
        }),
        initializationActions: z.array(z.object({
          executableFile: z.unknown(),
          executionTimeout: z.unknown(),
        })),
        lifecycleConfig: z.object({
          autoDeleteTime: z.string(),
          autoDeleteTtl: z.string(),
          autoStopTime: z.string(),
          autoStopTtl: z.string(),
          idleDeleteTtl: z.string(),
          idleStartTime: z.string(),
          idleStopTtl: z.string(),
        }),
        masterConfig: z.object({
          accelerators: z.array(z.unknown()),
          diskConfig: z.object({
            attachedDiskConfigs: z.unknown(),
            bootDiskProvisionedIops: z.unknown(),
            bootDiskProvisionedThroughput: z.unknown(),
            bootDiskSizeGb: z.unknown(),
            bootDiskType: z.unknown(),
            localSsdInterface: z.unknown(),
            numLocalSsds: z.unknown(),
          }),
          imageUri: z.string(),
          instanceFlexibilityPolicy: z.object({
            instanceMachineTypes: z.unknown(),
            instanceSelectionList: z.unknown(),
            instanceSelectionResults: z.unknown(),
            provisioningModelMix: z.unknown(),
          }),
          instanceNames: z.array(z.unknown()),
          instanceReferences: z.array(z.unknown()),
          isPreemptible: z.boolean(),
          machineTypeUri: z.string(),
          managedGroupConfig: z.object({
            instanceGroupManagerName: z.unknown(),
            instanceGroupManagerUri: z.unknown(),
            instanceTemplateName: z.unknown(),
          }),
          minCpuPlatform: z.string(),
          minNumInstances: z.number(),
          numInstances: z.number(),
          preemptibility: z.string(),
          startupConfig: z.object({
            requiredRegistrationFraction: z.unknown(),
          }),
        }),
        metastoreConfig: z.object({
          dataprocMetastoreService: z.string(),
        }),
        secondaryWorkerConfig: z.object({
          accelerators: z.array(z.unknown()),
          diskConfig: z.object({
            attachedDiskConfigs: z.unknown(),
            bootDiskProvisionedIops: z.unknown(),
            bootDiskProvisionedThroughput: z.unknown(),
            bootDiskSizeGb: z.unknown(),
            bootDiskType: z.unknown(),
            localSsdInterface: z.unknown(),
            numLocalSsds: z.unknown(),
          }),
          imageUri: z.string(),
          instanceFlexibilityPolicy: z.object({
            instanceMachineTypes: z.unknown(),
            instanceSelectionList: z.unknown(),
            instanceSelectionResults: z.unknown(),
            provisioningModelMix: z.unknown(),
          }),
          instanceNames: z.array(z.unknown()),
          instanceReferences: z.array(z.unknown()),
          isPreemptible: z.boolean(),
          machineTypeUri: z.string(),
          managedGroupConfig: z.object({
            instanceGroupManagerName: z.unknown(),
            instanceGroupManagerUri: z.unknown(),
            instanceTemplateName: z.unknown(),
          }),
          minCpuPlatform: z.string(),
          minNumInstances: z.number(),
          numInstances: z.number(),
          preemptibility: z.string(),
          startupConfig: z.object({
            requiredRegistrationFraction: z.unknown(),
          }),
        }),
        securityConfig: z.object({
          identityConfig: z.object({
            userServiceAccountMapping: z.unknown(),
          }),
          kerberosConfig: z.object({
            crossRealmTrustAdminServer: z.unknown(),
            crossRealmTrustKdc: z.unknown(),
            crossRealmTrustRealm: z.unknown(),
            crossRealmTrustSharedPasswordUri: z.unknown(),
            enableKerberos: z.unknown(),
            kdcDbKeyUri: z.unknown(),
            keyPasswordUri: z.unknown(),
            keystorePasswordUri: z.unknown(),
            keystoreUri: z.unknown(),
            kmsKeyUri: z.unknown(),
            realm: z.unknown(),
            rootPrincipalPasswordUri: z.unknown(),
            tgtLifetimeHours: z.unknown(),
            truststorePasswordUri: z.unknown(),
            truststoreUri: z.unknown(),
          }),
        }),
        softwareConfig: z.object({
          imageVersion: z.string(),
          optionalComponents: z.array(z.unknown()),
          properties: z.record(z.string(), z.unknown()),
        }),
        tempBucket: z.string(),
        workerConfig: z.object({
          accelerators: z.array(z.unknown()),
          diskConfig: z.object({
            attachedDiskConfigs: z.unknown(),
            bootDiskProvisionedIops: z.unknown(),
            bootDiskProvisionedThroughput: z.unknown(),
            bootDiskSizeGb: z.unknown(),
            bootDiskType: z.unknown(),
            localSsdInterface: z.unknown(),
            numLocalSsds: z.unknown(),
          }),
          imageUri: z.string(),
          instanceFlexibilityPolicy: z.object({
            instanceMachineTypes: z.unknown(),
            instanceSelectionList: z.unknown(),
            instanceSelectionResults: z.unknown(),
            provisioningModelMix: z.unknown(),
          }),
          instanceNames: z.array(z.unknown()),
          instanceReferences: z.array(z.unknown()),
          isPreemptible: z.boolean(),
          machineTypeUri: z.string(),
          managedGroupConfig: z.object({
            instanceGroupManagerName: z.unknown(),
            instanceGroupManagerUri: z.unknown(),
            instanceTemplateName: z.unknown(),
          }),
          minCpuPlatform: z.string(),
          minNumInstances: z.number(),
          numInstances: z.number(),
          preemptibility: z.string(),
          startupConfig: z.object({
            requiredRegistrationFraction: z.unknown(),
          }),
        }),
      }),
      labels: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  updateTime: z.string().optional(),
  version: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  dagTimeout: z.string().describe(
    'Optional. Timeout duration for the DAG of jobs, expressed in seconds (see JSON representation of duration (https://developers.google.com/protocol-buffers/docs/proto3#json)). The timeout duration must be from 10 minutes ("600s") to 24 hours ("86400s"). The timer begins when the first job is submitted. If the workflow is running at the end of the timeout period, any remaining jobs are cancelled, the workflow is ended, and if the workflow was running on a managed cluster, the cluster is deleted.',
  ).optional(),
  encryptionConfig: z.object({
    kmsKey: z.string().describe(
      "Optional. The Cloud KMS key name to use for encrypting workflow template job arguments.When this this key is provided, the following workflow template job arguments (https://cloud.google.com/dataproc/docs/concepts/workflows/use-workflows#adding_jobs_to_a_template), if present, are CMEK encrypted (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/customer-managed-encryption#use_cmek_with_workflow_template_data): FlinkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/FlinkJob) HadoopJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/HadoopJob) SparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkJob) SparkRJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkRJob) PySparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/PySparkJob) SparkSqlJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkSqlJob) scriptVariables and queryList.queries HiveJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/HiveJob) scriptVariables and queryList.queries PigJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PigJob) scriptVariables and queryList.queries PrestoJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PrestoJob) scriptVariables and queryList.queries",
    ).optional(),
  }).describe(
    "Encryption settings for encrypting workflow template job arguments.",
  ).optional(),
  id: z.string().optional(),
  jobs: z.array(z.object({
    flinkJob: z.object({
      args: z.array(z.string()).describe(
        "Optional. The arguments to pass to the driver. Do not include arguments, such as --conf, that can be set as job properties, since a collision might occur that causes an incorrect job submission.",
      ).optional(),
      jarFileUris: z.array(z.string()).describe(
        "Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Flink driver and tasks.",
      ).optional(),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        queries: z.array(z.unknown()).describe(
          'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
        ).optional(),
      }).describe("A list of queries to run on a cluster.").optional(),
      scriptVariables: z.record(z.string(), z.string()).describe(
        'Optional. Mapping of query variable names to values (equivalent to the Hive command: SET name="value";).',
      ).optional(),
    }).describe(
      "A Dataproc job for running Apache Hive (https://hive.apache.org/) queries on YARN.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. The labels to associate with this job.Label keys must be between 1 and 63 characters long, and must conform to the following regular expression: \\p{Ll}\\p{Lo}{0,62}Label values must be between 1 and 63 characters long, and must conform to the following regular expression: \\p{Ll}\\p{Lo}\\p{N}_-{0,63}No more than 32 labels can be associated with a given job.",
    ).optional(),
    pigJob: z.object({
      continueOnFailure: z.boolean().describe(
        "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
      ).optional(),
      jarFileUris: z.array(z.string()).describe(
        "Optional. HCFS URIs of jar files to add to the CLASSPATH of the Pig Client and Hadoop MapReduce (MR) tasks. Can contain Pig UDFs.",
      ).optional(),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        queries: z.array(z.unknown()).describe(
          'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
        ).optional(),
      }).describe("A list of queries to run on a cluster.").optional(),
      scriptVariables: z.record(z.string(), z.string()).describe(
        "Optional. Mapping of query variable names to values (equivalent to the Pig command: name=[value]).",
      ).optional(),
    }).describe(
      "A Dataproc job for running Apache Pig (https://pig.apache.org/) queries on YARN.",
    ).optional(),
    prerequisiteStepIds: z.array(z.string()).describe(
      "Optional. The optional list of prerequisite job step_ids. If not specified, the job will start at the beginning of workflow.",
    ).optional(),
    prestoJob: z.object({
      clientTags: z.array(z.string()).describe(
        "Optional. Presto client tags to attach to this query",
      ).optional(),
      continueOnFailure: z.boolean().describe(
        "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
      ).optional(),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        queries: z.array(z.unknown()).describe(
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
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        queries: z.array(z.unknown()).describe(
          'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
        ).optional(),
      }).describe("A list of queries to run on a cluster.").optional(),
      scriptVariables: z.record(z.string(), z.string()).describe(
        'Optional. Mapping of query variable names to values (equivalent to the Spark SQL command: SET name="value";).',
      ).optional(),
    }).describe(
      "A Dataproc job for running Apache Spark SQL (https://spark.apache.org/sql/) queries.",
    ).optional(),
    stepId: z.string().describe(
      "Required. The step id. The id must be unique among all jobs within the template.The step id is used as prefix for job id, as job goog-dataproc-workflow-step-id label, and in prerequisiteStepIds field from other steps.The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of between 3 and 50 characters.",
    ).optional(),
    trinoJob: z.object({
      clientTags: z.array(z.string()).describe(
        "Optional. Trino client tags to attach to this query",
      ).optional(),
      continueOnFailure: z.boolean().describe(
        "Optional. Whether to continue executing queries if a query fails. The default value is false. Setting to true can be useful when executing independent parallel queries.",
      ).optional(),
      loggingConfig: z.object({
        driverLogLevels: z.record(z.string(), z.unknown()).describe(
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
        queries: z.array(z.unknown()).describe(
          'Required. The queries to execute. You do not need to end a query expression with a semicolon. Multiple queries can be specified in one string by separating each with a semicolon. Here is an example of a Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob": { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }',
        ).optional(),
      }).describe("A list of queries to run on a cluster.").optional(),
    }).describe(
      "A Dataproc job for running Trino (https://trino.io/) queries. IMPORTANT: The Dataproc Trino Optional Component (https://cloud.google.com/dataproc/docs/concepts/components/trino) must be enabled when the cluster is created to submit a Trino job to the cluster.",
    ).optional(),
  })).describe("Required. The Directed Acyclic Graph of Jobs to submit.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels to associate with this template. These labels will be propagated to all jobs and clusters created by the workflow instance.Label keys must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt).Label values may be empty, but, if present, must contain 1 to 63 characters, and must conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt).No more than 32 labels can be associated with a template.",
  ).optional(),
  parameters: z.array(z.object({
    description: z.string().describe(
      "Optional. Brief description of the parameter. Must not exceed 1024 characters.",
    ).optional(),
    fields: z.array(z.string()).describe(
      "Required. Paths to all fields that the parameter replaces. A field is allowed to appear in at most one parameter's list of field paths.A field path is similar in syntax to a google.protobuf.FieldMask. For example, a field path that references the zone field of a workflow template's cluster selector would be specified as placement.clusterSelector.zone.Also, field paths can reference fields using the following syntax: Values in maps can be referenced by key: labels'key' placement.clusterSelector.clusterLabels'key' placement.managedCluster.labels'key' placement.clusterSelector.clusterLabels'key' jobs'step-id'.labels'key' Jobs in the jobs list can be referenced by step-id: jobs'step-id'.hadoopJob.mainJarFileUri jobs'step-id'.hiveJob.queryFileUri jobs'step-id'.pySparkJob.mainPythonFileUri jobs'step-id'.hadoopJob.jarFileUris0 jobs'step-id'.hadoopJob.archiveUris0 jobs'step-id'.hadoopJob.fileUris0 jobs'step-id'.pySparkJob.pythonFileUris0 Items in repeated fields can be referenced by a zero-based index: jobs'step-id'.sparkJob.args0 Other examples: jobs'step-id'.hadoopJob.properties'key' jobs'step-id'.hadoopJob.args0 jobs'step-id'.hiveJob.scriptVariables'key' jobs'step-id'.hadoopJob.mainJarFileUri placement.clusterSelector.zoneIt may not be possible to parameterize maps and repeated fields in their entirety since only individual map values and individual items in repeated fields can be referenced. For example, the following field paths are invalid: placement.clusterSelector.clusterLabels jobs'step-id'.sparkJob.args",
    ).optional(),
    name: z.string().describe(
      "Required. Parameter name. The parameter name is used as the key, and paired with the parameter value, which are passed to the template when the template is instantiated. The name must contain only capital letters (A-Z), numbers (0-9), and underscores (_), and must not start with a number. The maximum length is 40 characters.",
    ).optional(),
    validation: z.object({
      regex: z.object({
        regexes: z.array(z.unknown()).describe(
          "Required. RE2 regular expressions used to validate the parameter's value. The value must match the regex in its entirety (substring matches are not sufficient).",
        ).optional(),
      }).describe("Validation based on regular expressions.").optional(),
      values: z.object({
        values: z.array(z.unknown()).describe(
          "Required. List of allowed values for the parameter.",
        ).optional(),
      }).describe("Validation based on a list of allowed values.").optional(),
    }).describe("Configuration for parameter validation.").optional(),
  })).describe(
    "Optional. Template parameters whose values are substituted into the template. Values for parameters must be provided when the template is instantiated.",
  ).optional(),
  placement: z.object({
    clusterSelector: z.object({
      clusterLabels: z.record(z.string(), z.string()).describe(
        "Required. The cluster labels. Cluster must have all labels to match.",
      ).optional(),
      zone: z.string().describe(
        "Optional. The zone where workflow process executes. This parameter does not affect the selection of the cluster.If unspecified, the zone of the first cluster matching the selector is used.",
      ).optional(),
    }).describe(
      "A selector that chooses target cluster for jobs based on metadata.",
    ).optional(),
    managedCluster: z.object({
      clusterName: z.string().describe(
        "Required. The cluster name prefix. A unique cluster name will be formed by appending a random suffix.The name must contain only lower-case letters (a-z), numbers (0-9), and hyphens (-). Must begin with a letter. Cannot begin or end with hyphen. Must consist of between 2 and 35 characters.",
      ).optional(),
      config: z.object({
        autoscalingConfig: z.object({
          policyUri: z.string().describe(
            "Optional. The autoscaling policy used by the cluster.Only resource names including projectid and location (region) are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id] projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]Note that the policy must be in the same project and Dataproc region.",
          ).optional(),
        }).describe("Autoscaling Policy config associated with the cluster.")
          .optional(),
        auxiliaryNodeGroups: z.array(z.object({
          nodeGroup: z.unknown().describe(
            "Dataproc Node Group. The Dataproc NodeGroup resource is not related to the Dataproc NodeGroupAffinity resource.",
          ).optional(),
          nodeGroupId: z.unknown().describe(
            "Optional. A node group ID. Generated if not specified.The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of from 3 to 33 characters.",
          ).optional(),
        })).describe("Optional. The node group settings.").optional(),
        clusterTier: z.enum([
          "CLUSTER_TIER_UNSPECIFIED",
          "CLUSTER_TIER_STANDARD",
          "CLUSTER_TIER_PREMIUM",
        ]).describe("Optional. The cluster tier.").optional(),
        clusterType: z.enum([
          "CLUSTER_TYPE_UNSPECIFIED",
          "STANDARD",
          "SINGLE_NODE",
          "ZERO_SCALE",
        ]).describe("Optional. The type of the cluster.").optional(),
        configBucket: z.string().describe(
          "Optional. A Cloud Storage bucket used to stage job dependencies, config files, and job driver console output. If you do not specify a staging bucket, Dataproc determines a Cloud Storage location (US, ASIA, or EU) for the cluster staging bucket according to the Compute Engine zone where the cluster is deployed, and then creates and manages this project-level, per-location bucket (see Dataproc staging and temp buckets (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)). This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
        ).optional(),
        dataprocMetricConfig: z.object({
          metrics: z.array(z.unknown()).describe(
            "Required. Metrics sources to enable.",
          ).optional(),
        }).describe("Dataproc metric config.").optional(),
        diagnosticBucket: z.string().describe(
          "Optional. A Cloud Storage bucket used to collect checkpoint diagnostic data (https://cloud.google.com/dataproc/docs/support/diagnose-clusters#checkpoint_diagnostic_data). If you do not specify a diagnostic bucket, Cloud Dataproc will use the Dataproc temp bucket to collect the checkpoint diagnostic data. This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
        ).optional(),
        encryptionConfig: z.object({
          gcePdKmsKeyName: z.string().describe(
            "Optional. The Cloud KMS key resource name to use for persistent disk encryption for all instances in the cluster. See Use CMEK with cluster data (https://cloud.google.com//dataproc/docs/concepts/configuring-clusters/customer-managed-encryption#use_cmek_with_cluster_data) for more information.",
          ).optional(),
          kmsKey: z.string().describe(
            "Optional. The Cloud KMS key resource name to use for cluster persistent disk and job argument encryption. See Use CMEK with cluster data (https://cloud.google.com//dataproc/docs/concepts/configuring-clusters/customer-managed-encryption#use_cmek_with_cluster_data) for more information.When this key resource name is provided, the following job arguments of the following job types submitted to the cluster are encrypted using CMEK: FlinkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/FlinkJob) HadoopJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/HadoopJob) SparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkJob) SparkRJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkRJob) PySparkJob args (https://cloud.google.com/dataproc/docs/reference/rest/v1/PySparkJob) SparkSqlJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/SparkSqlJob) scriptVariables and queryList.queries HiveJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/HiveJob) scriptVariables and queryList.queries PigJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PigJob) scriptVariables and queryList.queries PrestoJob (https://cloud.google.com/dataproc/docs/reference/rest/v1/PrestoJob) scriptVariables and queryList.queries",
          ).optional(),
        }).describe("Encryption settings for the cluster.").optional(),
        endpointConfig: z.object({
          enableHttpPortAccess: z.boolean().describe(
            "Optional. If true, enable http access to specific ports on the cluster from external sources. Defaults to false.",
          ).optional(),
          httpPorts: z.record(z.string(), z.unknown()).describe(
            "Output only. The map of port descriptions to URLs. Will only be populated if enable_http_port_access is true.",
          ).optional(),
        }).describe("Endpoint config for this cluster").optional(),
        engine: z.enum(["ENGINE_UNSPECIFIED", "DEFAULT", "LIGHTNING"]).describe(
          "Optional. The cluster engine.",
        ).optional(),
        gceClusterConfig: z.object({
          autoZoneExcludeZoneUris: z.array(z.unknown()).describe(
            "Optional. An optional list of Compute Engine zones where the Dataproc cluster will not be located when Auto Zone is enabled. Only one of zone_uri or auto_zone_exclude_zone_uris can be set. If both are omitted, the service will pick a zone in the cluster Compute Engine region. If auto_zone_exclude_zone_uris is set and there is more than one non-excluded zone, the service will pick one of the non-excluded zones. Otherwise, cluster creation will fail with INVALID_ARGUMENT error.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone] projects/[project_id]/zones/[zone] [zone]",
          ).optional(),
          confidentialInstanceConfig: z.object({
            enableConfidentialCompute: z.unknown().describe(
              "Optional. Deprecated: Use 'confidential_instance_type' instead. Defines whether the instance should have confidential compute enabled.",
            ).optional(),
          }).describe(
            "Confidential Instance Config for clusters using Confidential VMs (https://cloud.google.com/compute/confidential-vm/docs)",
          ).optional(),
          internalIpOnly: z.boolean().describe(
            "Optional. This setting applies to subnetwork-enabled networks. It is set to true by default in clusters created with image versions 2.2.x.When set to true: All cluster VMs have internal IP addresses. Google Private Access (https://cloud.google.com/vpc/docs/private-google-access) must be enabled to access Dataproc and other Google Cloud APIs. Off-cluster dependencies must be configured to be accessible without external IP addresses.When set to false: Cluster VMs are not restricted to internal IP addresses. Ephemeral external IP addresses are assigned to each cluster VM.",
          ).optional(),
          metadata: z.record(z.string(), z.unknown()).describe(
            "Optional. The Compute Engine metadata entries to add to all instances (see Project and instance metadata (https://cloud.google.com/compute/docs/storing-retrieving-metadata#project_and_instance_metadata)).",
          ).optional(),
          networkUri: z.string().describe(
            'Optional. The Compute Engine network to be used for machine communications. Cannot be specified with subnetwork_uri. If neither network_uri nor subnetwork_uri is specified, the "default" network of the project is used, if it exists. Cannot be a Custom Subnet Network (see Using Subnetworks (https://cloud.google.com/compute/docs/subnetworks) for more information).A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/global/networks/default projects/[project_id]/global/networks/default default',
          ).optional(),
          nodeGroupAffinity: z.object({
            nodeGroupUri: z.unknown().describe(
              "Required. The URI of a sole-tenant node group resource (https://cloud.google.com/compute/docs/reference/rest/v1/nodeGroups) that the cluster will be created on.A full URL, partial URI, or node group name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/nodeGroups/node-group-1 projects/[project_id]/zones/[zone]/nodeGroups/node-group-1 node-group-1",
            ).optional(),
          }).describe(
            "Node Group Affinity for clusters using sole-tenant node groups. The Dataproc NodeGroupAffinity resource is not related to the Dataproc NodeGroup resource.",
          ).optional(),
          privateIpv6GoogleAccess: z.enum([
            "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED",
            "INHERIT_FROM_SUBNETWORK",
            "OUTBOUND",
            "BIDIRECTIONAL",
          ]).describe("Optional. The type of IPv6 access for a cluster.")
            .optional(),
          reservationAffinity: z.object({
            consumeReservationType: z.unknown().describe(
              "Optional. Type of reservation to consume",
            ).optional(),
            key: z.unknown().describe(
              "Optional. Corresponds to the label key of reservation resource.",
            ).optional(),
            values: z.unknown().describe(
              "Optional. Corresponds to the label values of reservation resource.",
            ).optional(),
          }).describe("Reservation Affinity for consuming Zonal reservation.")
            .optional(),
          resourceManagerTags: z.record(z.string(), z.unknown()).describe(
            "Optional. Resource manager tags (https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing) to add to all instances (see Use secure tags in Dataproc (https://cloud.google.com/dataproc/docs/guides/use-secure-tags)).",
          ).optional(),
          serviceAccount: z.string().describe(
            "Optional. The Dataproc service account (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/service-accounts#service_accounts_in_dataproc) (also see VM Data Plane identity (https://cloud.google.com/dataproc/docs/concepts/iam/dataproc-principals#vm_service_account_data_plane_identity)) used by Dataproc cluster VM instances to access Google Cloud Platform services.If not specified, the Compute Engine default service account (https://cloud.google.com/compute/docs/access/service-accounts#default_service_account) is used.",
          ).optional(),
          serviceAccountScopes: z.array(z.unknown()).describe(
            "Optional. The URIs of service account scopes to be included in Compute Engine instances. The following base set of scopes is always included: https://www.googleapis.com/auth/cloud.useraccounts.readonly https://www.googleapis.com/auth/devstorage.read_write https://www.googleapis.com/auth/logging.writeIf no scopes are specified, the following defaults are also provided: https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/bigtable.admin.table https://www.googleapis.com/auth/bigtable.data https://www.googleapis.com/auth/devstorage.full_control",
          ).optional(),
          shieldedInstanceConfig: z.object({
            enableIntegrityMonitoring: z.unknown().describe(
              "Optional. Defines whether instances have integrity monitoring enabled.",
            ).optional(),
            enableSecureBoot: z.unknown().describe(
              "Optional. Defines whether instances have Secure Boot enabled.",
            ).optional(),
            enableVtpm: z.unknown().describe(
              "Optional. Defines whether instances have the vTPM enabled.",
            ).optional(),
          }).describe(
            "Shielded Instance Config for clusters using Compute Engine Shielded VMs (https://cloud.google.com/security/shielded-cloud/shielded-vm).",
          ).optional(),
          subnetworkUri: z.string().describe(
            "Optional. The Compute Engine subnetwork to be used for machine communications. Cannot be specified with network_uri.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/regions/[region]/subnetworks/sub0 projects/[project_id]/regions/[region]/subnetworks/sub0 sub0",
          ).optional(),
          tags: z.array(z.unknown()).describe(
            "The Compute Engine network tags to add to all instances (see Tagging instances (https://cloud.google.com/vpc/docs/add-remove-network-tags)).",
          ).optional(),
          zoneUri: z.string().describe(
            "Optional. The Compute Engine zone where the Dataproc cluster will be located. If omitted, the service will pick a zone in the cluster's Compute Engine region. On a get request, zone will always be present.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone] projects/[project_id]/zones/[zone] [zone]",
          ).optional(),
        }).describe(
          "Common config settings for resources of Compute Engine cluster instances, applicable to all instances in the cluster.",
        ).optional(),
        gkeClusterConfig: z.object({
          gkeClusterTarget: z.string().describe(
            "Optional. A target GKE cluster to deploy to. It must be in the same project and region as the Dataproc cluster (the GKE cluster can be zonal or regional). Format: 'projects/{project}/locations/{location}/clusters/{cluster_id}'",
          ).optional(),
          namespacedGkeDeploymentTarget: z.object({
            clusterNamespace: z.unknown().describe(
              "Optional. A namespace within the GKE cluster to deploy into.",
            ).optional(),
            targetGkeCluster: z.unknown().describe(
              "Optional. The target GKE cluster to deploy to. Format: 'projects/{project}/locations/{location}/clusters/{cluster_id}'",
            ).optional(),
          }).describe(
            "Deprecated. Used only for the deprecated beta. A full, namespace-isolated deployment target for an existing GKE cluster.",
          ).optional(),
          nodePoolTarget: z.array(z.unknown()).describe(
            "Optional. GKE node pools where workloads will be scheduled. At least one node pool must be assigned the DEFAULT GkeNodePoolTarget.Role. If a GkeNodePoolTarget is not specified, Dataproc constructs a DEFAULT GkeNodePoolTarget. Each role can be given to only one GkeNodePoolTarget. All node pools must have the same location settings.",
          ).optional(),
        }).describe("The cluster's GKE config.").optional(),
        initializationActions: z.array(z.object({
          executableFile: z.unknown().describe(
            "Required. Cloud Storage URI of executable file.",
          ).optional(),
          executionTimeout: z.unknown().describe(
            "Optional. Amount of time executable has to complete. Default is 10 minutes (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).Cluster creation fails with an explanatory error message (the name of the executable that caused the error and the exceeded timeout period) if the executable is not completed at end of the timeout period.",
          ).optional(),
        })).describe(
          "Optional. Commands to execute on each node after config is completed. By default, executables are run on master and all worker nodes. You can test a node's role metadata to run an executable on a master or worker node, as shown below using curl (you can also use wget): ROLE=$(curl -H Metadata-Flavor:Google http://metadata/computeMetadata/v1/instance/attributes/dataproc-role) if [[ \"${ROLE}\" == 'Master' ]]; then... master specific actions... else... worker specific actions... fi",
        ).optional(),
        lifecycleConfig: z.object({
          autoDeleteTime: z.string().describe(
            "Optional. The time when cluster will be auto-deleted (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          autoDeleteTtl: z.string().describe(
            "Optional. The lifetime duration of cluster. The cluster will be auto-deleted at the end of this period. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          autoStopTime: z.string().describe(
            "Optional. The time when cluster will be auto-stopped (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          autoStopTtl: z.string().describe(
            "Optional. The lifetime duration of the cluster. The cluster will be auto-stopped at the end of this period, calculated from the time of submission of the create or update cluster request. Minimum value is 10 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          idleDeleteTtl: z.string().describe(
            "Optional. The duration to keep the cluster alive while idling (when no jobs are running). Passing this threshold will cause the cluster to be deleted. Minimum value is 5 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          idleStartTime: z.string().describe(
            "Output only. The time when cluster became idle (most recent job finished) and became eligible for deletion due to idleness (see JSON representation of Timestamp (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
          idleStopTtl: z.string().describe(
            "Optional. The duration to keep the cluster started while idling (when no jobs are running). Passing this threshold will cause the cluster to be stopped. Minimum value is 5 minutes; maximum value is 14 days (see JSON representation of Duration (https://developers.google.com/protocol-buffers/docs/proto3#json)).",
          ).optional(),
        }).describe("Specifies the cluster auto-delete schedule configuration.")
          .optional(),
        masterConfig: z.object({
          accelerators: z.array(z.unknown()).describe(
            "Optional. The Compute Engine accelerator configuration for these instances.",
          ).optional(),
          diskConfig: z.object({
            attachedDiskConfigs: z.unknown().describe(
              "Optional. A list of attached disk configs for a group of VM instances.",
            ).optional(),
            bootDiskProvisionedIops: z.unknown().describe(
              "Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskProvisionedThroughput: z.unknown().describe(
              "Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskSizeGb: z.unknown().describe(
              "Optional. Size in GB of the boot disk (default is 500GB).",
            ).optional(),
            bootDiskType: z.unknown().describe(
              "Optional. Type of the boot disk (default is pd-standard). Valid values: pd-balanced (Persistent Disk Balanced Solid State Drive), pd-ssd (Persistent Disk Solid State Drive), or pd-standard (Persistent Disk Hard Disk Drive). See Disk types (https://cloud.google.com/compute/docs/disks#disk-types).",
            ).optional(),
            localSsdInterface: z.unknown().describe(
              "Optional. Interface type of local SSDs (default is scsi). Valid values: scsi (Small Computer System Interface), nvme (Non-Volatile Memory Express). See local SSD performance (https://cloud.google.com/compute/docs/disks/local-ssd#performance).",
            ).optional(),
            numLocalSsds: z.unknown().describe(
              "Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and HDFS (https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html) data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries.Note: Local SSD options may vary by machine type and number of vCPUs selected.",
            ).optional(),
          }).describe(
            "Specifies the config of boot disk and attached disk options for a group of VM instances.",
          ).optional(),
          imageUri: z.string().describe(
            "Optional. The Compute Engine image resource used for cluster instances.The URI can represent an image or image family.Image examples: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/[image-id] projects/[project_id]/global/images/[image-id] image-idImage family examples. Dataproc will use the most recent image from the family: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/family/[custom-image-family-name] projects/[project_id]/global/images/family/[custom-image-family-name]If the URI is unspecified, it will be inferred from SoftwareConfig.image_version or the system default.",
          ).optional(),
          instanceFlexibilityPolicy: z.object({
            instanceMachineTypes: z.unknown().describe(
              "Output only. A map of instance short name to machine type. The key is the short name of the Compute Engine instance, and the value is the full machine-type name (e.g., 'n1-standard-16'). See Machine types for more information on valid machine type strings.",
            ).optional(),
            instanceSelectionList: z.unknown().describe(
              "Optional. List of instance selection options that the group will use when creating new VMs.",
            ).optional(),
            instanceSelectionResults: z.unknown().describe(
              "Output only. A list of instance selection results in the group.",
            ).optional(),
            provisioningModelMix: z.unknown().describe(
              "Defines how Dataproc should create VMs with a mixture of provisioning models.",
            ).optional(),
          }).describe(
            "Instance flexibility Policy allowing a mixture of VM shapes and provisioning models.",
          ).optional(),
          instanceNames: z.array(z.unknown()).describe(
            "Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.",
          ).optional(),
          instanceReferences: z.array(z.unknown()).describe(
            "Output only. List of references to Compute Engine instances.",
          ).optional(),
          isPreemptible: z.boolean().describe(
            "Output only. Specifies that this instance group contains preemptible instances.",
          ).optional(),
          machineTypeUri: z.string().describe(
            "Optional. The Compute Engine machine type used for cluster instances.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 n1-standard-2Auto Zone Exception: If you are using the Dataproc Auto Zone Placement (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement) feature, you must use the short name of the machine type resource, for example, n1-standard-2.",
          ).optional(),
          managedGroupConfig: z.object({
            instanceGroupManagerName: z.unknown().describe(
              "Output only. The name of the Instance Group Manager for this group.",
            ).optional(),
            instanceGroupManagerUri: z.unknown().describe(
              "Output only. The partial URI to the instance group manager for this group. E.g. projects/my-project/regions/us-central1/instanceGroupManagers/my-igm.",
            ).optional(),
            instanceTemplateName: z.unknown().describe(
              "Output only. The name of the Instance Template used for the Managed Instance Group.",
            ).optional(),
          }).describe(
            "Specifies the resources used to actively manage an instance group.",
          ).optional(),
          minCpuPlatform: z.string().describe(
            "Optional. Specifies the minimum cpu platform for the Instance Group. See Dataproc -> Minimum CPU Platform (https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu).",
          ).optional(),
          minNumInstances: z.number().int().describe(
            "Optional. The minimum number of primary worker instances to create. If min_num_instances is set, cluster creation will succeed if the number of primary workers created is at least equal to the min_num_instances number.Example: Cluster creation request with num_instances = 5 and min_num_instances = 3: If 4 VMs are created and 1 instance fails, the failed VM is deleted. The cluster is resized to 4 instances and placed in a RUNNING state. If 2 instances are created and 3 instances fail, the cluster in placed in an ERROR state. The failed VMs are not deleted.",
          ).optional(),
          numInstances: z.number().int().describe(
            "Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1.",
          ).optional(),
          preemptibility: z.enum([
            "PREEMPTIBILITY_UNSPECIFIED",
            "NON_PREEMPTIBLE",
            "PREEMPTIBLE",
            "SPOT",
          ]).describe(
            "Optional. Specifies the preemptibility of the instance group.The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed.The default value for secondary instances is PREEMPTIBLE.",
          ).optional(),
          startupConfig: z.object({
            requiredRegistrationFraction: z.unknown().describe(
              "Optional. The config setting to enable cluster creation/ updation to be successful only after required_registration_fraction of instances are up and running. This configuration is applicable to only secondary workers for now. The cluster will fail if required_registration_fraction of instances are not available. This will include instance creation, agent registration, and service registration (if enabled).",
            ).optional(),
          }).describe(
            "Configuration to handle the startup of instances during cluster create and update process.",
          ).optional(),
        }).describe(
          "The config settings for Compute Engine resources in an instance group, such as a master or worker group.",
        ).optional(),
        metastoreConfig: z.object({
          dataprocMetastoreService: z.string().describe(
            "Required. Resource name of an existing Dataproc Metastore service.Example: projects/[project_id]/locations/[dataproc_region]/services/[service-name]",
          ).optional(),
        }).describe("Specifies a Metastore configuration.").optional(),
        secondaryWorkerConfig: z.object({
          accelerators: z.array(z.unknown()).describe(
            "Optional. The Compute Engine accelerator configuration for these instances.",
          ).optional(),
          diskConfig: z.object({
            attachedDiskConfigs: z.unknown().describe(
              "Optional. A list of attached disk configs for a group of VM instances.",
            ).optional(),
            bootDiskProvisionedIops: z.unknown().describe(
              "Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskProvisionedThroughput: z.unknown().describe(
              "Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskSizeGb: z.unknown().describe(
              "Optional. Size in GB of the boot disk (default is 500GB).",
            ).optional(),
            bootDiskType: z.unknown().describe(
              "Optional. Type of the boot disk (default is pd-standard). Valid values: pd-balanced (Persistent Disk Balanced Solid State Drive), pd-ssd (Persistent Disk Solid State Drive), or pd-standard (Persistent Disk Hard Disk Drive). See Disk types (https://cloud.google.com/compute/docs/disks#disk-types).",
            ).optional(),
            localSsdInterface: z.unknown().describe(
              "Optional. Interface type of local SSDs (default is scsi). Valid values: scsi (Small Computer System Interface), nvme (Non-Volatile Memory Express). See local SSD performance (https://cloud.google.com/compute/docs/disks/local-ssd#performance).",
            ).optional(),
            numLocalSsds: z.unknown().describe(
              "Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and HDFS (https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html) data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries.Note: Local SSD options may vary by machine type and number of vCPUs selected.",
            ).optional(),
          }).describe(
            "Specifies the config of boot disk and attached disk options for a group of VM instances.",
          ).optional(),
          imageUri: z.string().describe(
            "Optional. The Compute Engine image resource used for cluster instances.The URI can represent an image or image family.Image examples: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/[image-id] projects/[project_id]/global/images/[image-id] image-idImage family examples. Dataproc will use the most recent image from the family: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/family/[custom-image-family-name] projects/[project_id]/global/images/family/[custom-image-family-name]If the URI is unspecified, it will be inferred from SoftwareConfig.image_version or the system default.",
          ).optional(),
          instanceFlexibilityPolicy: z.object({
            instanceMachineTypes: z.unknown().describe(
              "Output only. A map of instance short name to machine type. The key is the short name of the Compute Engine instance, and the value is the full machine-type name (e.g., 'n1-standard-16'). See Machine types for more information on valid machine type strings.",
            ).optional(),
            instanceSelectionList: z.unknown().describe(
              "Optional. List of instance selection options that the group will use when creating new VMs.",
            ).optional(),
            instanceSelectionResults: z.unknown().describe(
              "Output only. A list of instance selection results in the group.",
            ).optional(),
            provisioningModelMix: z.unknown().describe(
              "Defines how Dataproc should create VMs with a mixture of provisioning models.",
            ).optional(),
          }).describe(
            "Instance flexibility Policy allowing a mixture of VM shapes and provisioning models.",
          ).optional(),
          instanceNames: z.array(z.unknown()).describe(
            "Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.",
          ).optional(),
          instanceReferences: z.array(z.unknown()).describe(
            "Output only. List of references to Compute Engine instances.",
          ).optional(),
          isPreemptible: z.boolean().describe(
            "Output only. Specifies that this instance group contains preemptible instances.",
          ).optional(),
          machineTypeUri: z.string().describe(
            "Optional. The Compute Engine machine type used for cluster instances.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 n1-standard-2Auto Zone Exception: If you are using the Dataproc Auto Zone Placement (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement) feature, you must use the short name of the machine type resource, for example, n1-standard-2.",
          ).optional(),
          managedGroupConfig: z.object({
            instanceGroupManagerName: z.unknown().describe(
              "Output only. The name of the Instance Group Manager for this group.",
            ).optional(),
            instanceGroupManagerUri: z.unknown().describe(
              "Output only. The partial URI to the instance group manager for this group. E.g. projects/my-project/regions/us-central1/instanceGroupManagers/my-igm.",
            ).optional(),
            instanceTemplateName: z.unknown().describe(
              "Output only. The name of the Instance Template used for the Managed Instance Group.",
            ).optional(),
          }).describe(
            "Specifies the resources used to actively manage an instance group.",
          ).optional(),
          minCpuPlatform: z.string().describe(
            "Optional. Specifies the minimum cpu platform for the Instance Group. See Dataproc -> Minimum CPU Platform (https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu).",
          ).optional(),
          minNumInstances: z.number().int().describe(
            "Optional. The minimum number of primary worker instances to create. If min_num_instances is set, cluster creation will succeed if the number of primary workers created is at least equal to the min_num_instances number.Example: Cluster creation request with num_instances = 5 and min_num_instances = 3: If 4 VMs are created and 1 instance fails, the failed VM is deleted. The cluster is resized to 4 instances and placed in a RUNNING state. If 2 instances are created and 3 instances fail, the cluster in placed in an ERROR state. The failed VMs are not deleted.",
          ).optional(),
          numInstances: z.number().int().describe(
            "Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1.",
          ).optional(),
          preemptibility: z.enum([
            "PREEMPTIBILITY_UNSPECIFIED",
            "NON_PREEMPTIBLE",
            "PREEMPTIBLE",
            "SPOT",
          ]).describe(
            "Optional. Specifies the preemptibility of the instance group.The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed.The default value for secondary instances is PREEMPTIBLE.",
          ).optional(),
          startupConfig: z.object({
            requiredRegistrationFraction: z.unknown().describe(
              "Optional. The config setting to enable cluster creation/ updation to be successful only after required_registration_fraction of instances are up and running. This configuration is applicable to only secondary workers for now. The cluster will fail if required_registration_fraction of instances are not available. This will include instance creation, agent registration, and service registration (if enabled).",
            ).optional(),
          }).describe(
            "Configuration to handle the startup of instances during cluster create and update process.",
          ).optional(),
        }).describe(
          "The config settings for Compute Engine resources in an instance group, such as a master or worker group.",
        ).optional(),
        securityConfig: z.object({
          identityConfig: z.object({
            userServiceAccountMapping: z.unknown().describe(
              "Required. Map of user to service account.",
            ).optional(),
          }).describe(
            "Identity related configuration, including service account based secure multi-tenancy user mappings.",
          ).optional(),
          kerberosConfig: z.object({
            crossRealmTrustAdminServer: z.unknown().describe(
              "Optional. The admin server (IP or hostname) for the remote trusted realm in a cross realm trust relationship.",
            ).optional(),
            crossRealmTrustKdc: z.unknown().describe(
              "Optional. The KDC (IP or hostname) for the remote trusted realm in a cross realm trust relationship.",
            ).optional(),
            crossRealmTrustRealm: z.unknown().describe(
              "Optional. The remote realm the Dataproc on-cluster KDC will trust, should the user enable cross realm trust.",
            ).optional(),
            crossRealmTrustSharedPasswordUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the shared password between the on-cluster Kerberos realm and the remote trusted realm, in a cross realm trust relationship.",
            ).optional(),
            enableKerberos: z.unknown().describe(
              "Optional. Flag to indicate whether to Kerberize the cluster (default: false). Set this field to true to enable Kerberos on a cluster.",
            ).optional(),
            kdcDbKeyUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the master key of the KDC database.",
            ).optional(),
            keyPasswordUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided key. For the self-signed certificate, this password is generated by Dataproc.",
            ).optional(),
            keystorePasswordUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided keystore. For the self-signed certificate, this password is generated by Dataproc.",
            ).optional(),
            keystoreUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of the keystore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate.",
            ).optional(),
            kmsKeyUri: z.unknown().describe(
              "Optional. The URI of the KMS key used to encrypt sensitive files.",
            ).optional(),
            realm: z.unknown().describe(
              "Optional. The name of the on-cluster Kerberos realm. If not specified, the uppercased domain of hostnames will be the realm.",
            ).optional(),
            rootPrincipalPasswordUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the root principal password.",
            ).optional(),
            tgtLifetimeHours: z.unknown().describe(
              "Optional. The lifetime of the ticket granting ticket, in hours. If not specified, or user specifies 0, then default value 10 will be used.",
            ).optional(),
            truststorePasswordUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of a KMS encrypted file containing the password to the user provided truststore. For the self-signed certificate, this password is generated by Dataproc.",
            ).optional(),
            truststoreUri: z.unknown().describe(
              "Optional. The Cloud Storage URI of the truststore file used for SSL encryption. If not provided, Dataproc will provide a self-signed certificate.",
            ).optional(),
          }).describe("Specifies Kerberos related configuration.").optional(),
        }).describe(
          "Security related configuration, including encryption, Kerberos, etc.",
        ).optional(),
        softwareConfig: z.object({
          imageVersion: z.string().describe(
            'Optional. The version of software inside the cluster. It must be one of the supported Dataproc Versions (https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#supported-dataproc-image-versions), such as "1.2" (including a subminor version, such as "1.2.29"), or the "preview" version (https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#other_versions). If unspecified, it defaults to the latest Debian version.',
          ).optional(),
          optionalComponents: z.array(z.unknown()).describe(
            "Optional. The set of components to activate on the cluster.",
          ).optional(),
          properties: z.record(z.string(), z.unknown()).describe(
            "Optional. The properties to set on daemon config files.Property keys are specified in prefix:property format, for example core:hadoop.tmp.dir. The following are supported prefixes and their mappings: capacity-scheduler: capacity-scheduler.xml core: core-site.xml distcp: distcp-default.xml hdfs: hdfs-site.xml hive: hive-site.xml mapred: mapred-site.xml pig: pig.properties spark: spark-defaults.conf yarn: yarn-site.xmlFor more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties).",
          ).optional(),
        }).describe(
          "Specifies the selection and config of software inside the cluster.",
        ).optional(),
        tempBucket: z.string().describe(
          "Optional. A Cloud Storage bucket used to store ephemeral cluster and jobs data, such as Spark and MapReduce history files. If you do not specify a temp bucket, Dataproc determines a Cloud Storage location (US, ASIA, or EU) for the cluster temp bucket according to the Compute Engine zone where the cluster is deployed, and then creates and manages this project-level, per-location bucket. The default bucket has a TTL of 90 days, but you can use any TTL (or none) if you specify a bucket (see Dataproc staging and temp buckets (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)). This field requires a Cloud Storage bucket name, not a gs://... URI to a Cloud Storage bucket.",
        ).optional(),
        workerConfig: z.object({
          accelerators: z.array(z.unknown()).describe(
            "Optional. The Compute Engine accelerator configuration for these instances.",
          ).optional(),
          diskConfig: z.object({
            attachedDiskConfigs: z.unknown().describe(
              "Optional. A list of attached disk configs for a group of VM instances.",
            ).optional(),
            bootDiskProvisionedIops: z.unknown().describe(
              "Optional. Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskProvisionedThroughput: z.unknown().describe(
              "Optional. Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1. This field is supported only if boot_disk_type is hyperdisk-balanced.",
            ).optional(),
            bootDiskSizeGb: z.unknown().describe(
              "Optional. Size in GB of the boot disk (default is 500GB).",
            ).optional(),
            bootDiskType: z.unknown().describe(
              "Optional. Type of the boot disk (default is pd-standard). Valid values: pd-balanced (Persistent Disk Balanced Solid State Drive), pd-ssd (Persistent Disk Solid State Drive), or pd-standard (Persistent Disk Hard Disk Drive). See Disk types (https://cloud.google.com/compute/docs/disks#disk-types).",
            ).optional(),
            localSsdInterface: z.unknown().describe(
              "Optional. Interface type of local SSDs (default is scsi). Valid values: scsi (Small Computer System Interface), nvme (Non-Volatile Memory Express). See local SSD performance (https://cloud.google.com/compute/docs/disks/local-ssd#performance).",
            ).optional(),
            numLocalSsds: z.unknown().describe(
              "Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are not attached, the boot disk is used to store runtime logs and HDFS (https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html) data. If one or more SSDs are attached, this runtime bulk data is spread across them, and the boot disk contains only basic config and installed binaries.Note: Local SSD options may vary by machine type and number of vCPUs selected.",
            ).optional(),
          }).describe(
            "Specifies the config of boot disk and attached disk options for a group of VM instances.",
          ).optional(),
          imageUri: z.string().describe(
            "Optional. The Compute Engine image resource used for cluster instances.The URI can represent an image or image family.Image examples: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/[image-id] projects/[project_id]/global/images/[image-id] image-idImage family examples. Dataproc will use the most recent image from the family: https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/family/[custom-image-family-name] projects/[project_id]/global/images/family/[custom-image-family-name]If the URI is unspecified, it will be inferred from SoftwareConfig.image_version or the system default.",
          ).optional(),
          instanceFlexibilityPolicy: z.object({
            instanceMachineTypes: z.unknown().describe(
              "Output only. A map of instance short name to machine type. The key is the short name of the Compute Engine instance, and the value is the full machine-type name (e.g., 'n1-standard-16'). See Machine types for more information on valid machine type strings.",
            ).optional(),
            instanceSelectionList: z.unknown().describe(
              "Optional. List of instance selection options that the group will use when creating new VMs.",
            ).optional(),
            instanceSelectionResults: z.unknown().describe(
              "Output only. A list of instance selection results in the group.",
            ).optional(),
            provisioningModelMix: z.unknown().describe(
              "Defines how Dataproc should create VMs with a mixture of provisioning models.",
            ).optional(),
          }).describe(
            "Instance flexibility Policy allowing a mixture of VM shapes and provisioning models.",
          ).optional(),
          instanceNames: z.array(z.unknown()).describe(
            "Output only. The list of instance names. Dataproc derives the names from cluster_name, num_instances, and the instance group.",
          ).optional(),
          instanceReferences: z.array(z.unknown()).describe(
            "Output only. List of references to Compute Engine instances.",
          ).optional(),
          isPreemptible: z.boolean().describe(
            "Output only. Specifies that this instance group contains preemptible instances.",
          ).optional(),
          machineTypeUri: z.string().describe(
            "Optional. The Compute Engine machine type used for cluster instances.A full URL, partial URI, or short name are valid. Examples: https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2 n1-standard-2Auto Zone Exception: If you are using the Dataproc Auto Zone Placement (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement) feature, you must use the short name of the machine type resource, for example, n1-standard-2.",
          ).optional(),
          managedGroupConfig: z.object({
            instanceGroupManagerName: z.unknown().describe(
              "Output only. The name of the Instance Group Manager for this group.",
            ).optional(),
            instanceGroupManagerUri: z.unknown().describe(
              "Output only. The partial URI to the instance group manager for this group. E.g. projects/my-project/regions/us-central1/instanceGroupManagers/my-igm.",
            ).optional(),
            instanceTemplateName: z.unknown().describe(
              "Output only. The name of the Instance Template used for the Managed Instance Group.",
            ).optional(),
          }).describe(
            "Specifies the resources used to actively manage an instance group.",
          ).optional(),
          minCpuPlatform: z.string().describe(
            "Optional. Specifies the minimum cpu platform for the Instance Group. See Dataproc -> Minimum CPU Platform (https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu).",
          ).optional(),
          minNumInstances: z.number().int().describe(
            "Optional. The minimum number of primary worker instances to create. If min_num_instances is set, cluster creation will succeed if the number of primary workers created is at least equal to the min_num_instances number.Example: Cluster creation request with num_instances = 5 and min_num_instances = 3: If 4 VMs are created and 1 instance fails, the failed VM is deleted. The cluster is resized to 4 instances and placed in a RUNNING state. If 2 instances are created and 3 instances fail, the cluster in placed in an ERROR state. The failed VMs are not deleted.",
          ).optional(),
          numInstances: z.number().int().describe(
            "Optional. The number of VM instances in the instance group. For HA cluster master_config groups, must be set to 3. For standard cluster master_config groups, must be set to 1.",
          ).optional(),
          preemptibility: z.enum([
            "PREEMPTIBILITY_UNSPECIFIED",
            "NON_PREEMPTIBLE",
            "PREEMPTIBLE",
            "SPOT",
          ]).describe(
            "Optional. Specifies the preemptibility of the instance group.The default value for master and worker groups is NON_PREEMPTIBLE. This default cannot be changed.The default value for secondary instances is PREEMPTIBLE.",
          ).optional(),
          startupConfig: z.object({
            requiredRegistrationFraction: z.unknown().describe(
              "Optional. The config setting to enable cluster creation/ updation to be successful only after required_registration_fraction of instances are up and running. This configuration is applicable to only secondary workers for now. The cluster will fail if required_registration_fraction of instances are not available. This will include instance creation, agent registration, and service registration (if enabled).",
            ).optional(),
          }).describe(
            "Configuration to handle the startup of instances during cluster create and update process.",
          ).optional(),
        }).describe(
          "The config settings for Compute Engine resources in an instance group, such as a master or worker group.",
        ).optional(),
      }).describe("The cluster config.").optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. The labels to associate with this cluster.Label keys must be between 1 and 63 characters long, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62}Label values must be between 1 and 63 characters long, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}\\p{N}_-{0,63}No more than 32 labels can be associated with a given cluster.",
      ).optional(),
    }).describe("Cluster that is managed by the workflow.").optional(),
  }).describe(
    "Specifies workflow execution target.Either managed_cluster or cluster_selector is required.",
  ).optional(),
  version: z.number().int().describe(
    "Optional. Used to perform a consistent read-modify-write.This field should be left blank for a CreateWorkflowTemplate request. It is required for an UpdateWorkflowTemplate request, and must match the current server version. A typical update template flow would fetch the current template with a GetWorkflowTemplate request, which will return the current template with the version field filled in with the current server version. The user updates other fields in the template, then returns it as part of the UpdateWorkflowTemplate request.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataproc WorkflowTemplates. Registered at `@swamp/gcp/dataproc/workflowtemplates`. */
export const model = {
  type: "@swamp/gcp/dataproc/workflowtemplates",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
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
      toVersion: "2026.05.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Dataproc workflow template resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a workflowTemplates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["dagTimeout"] !== undefined) body["dagTimeout"] = g["dagTimeout"];
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["jobs"] !== undefined) body["jobs"] = g["jobs"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["parameters"] !== undefined) body["parameters"] = g["parameters"];
        if (g["placement"] !== undefined) body["placement"] = g["placement"];
        if (g["version"] !== undefined) body["version"] = g["version"];
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
      description: "Get a workflowTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the workflowTemplates"),
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
    update: {
      description: "Update workflowTemplates attributes",
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
        if (g["dagTimeout"] !== undefined) body["dagTimeout"] = g["dagTimeout"];
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["jobs"] !== undefined) body["jobs"] = g["jobs"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["parameters"] !== undefined) body["parameters"] = g["parameters"];
        if (g["placement"] !== undefined) body["placement"] = g["placement"];
        if (g["version"] !== undefined) body["version"] = g["version"];
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
          UPDATE_CONFIG,
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
      description: "Delete the workflowTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the workflowTemplates"),
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
      description: "Sync workflowTemplates state from GCP",
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
            "id": "dataproc.projects.locations.workflowTemplates.getIamPolicy",
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
    instantiate: {
      description: "instantiate",
      arguments: z.object({
        parameters: z.any().optional(),
        requestId: z.any().optional(),
        version: z.any().optional(),
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
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["version"] !== undefined) body["version"] = args["version"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataproc.projects.locations.workflowTemplates.instantiate",
            "path": "v1/{+name}:instantiate",
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
    instantiate_inline: {
      description: "instantiate inline",
      arguments: z.object({
        createTime: z.any().optional(),
        dagTimeout: z.any().optional(),
        encryptionConfig: z.any().optional(),
        id: z.any().optional(),
        jobs: z.any().optional(),
        labels: z.any().optional(),
        name: z.any().optional(),
        parameters: z.any().optional(),
        placement: z.any().optional(),
        updateTime: z.any().optional(),
        version: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["dagTimeout"] !== undefined) {
          body["dagTimeout"] = args["dagTimeout"];
        }
        if (args["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = args["encryptionConfig"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["jobs"] !== undefined) body["jobs"] = args["jobs"];
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        if (args["placement"] !== undefined) {
          body["placement"] = args["placement"];
        }
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        if (args["version"] !== undefined) body["version"] = args["version"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataproc.projects.locations.workflowTemplates.instantiateInline",
            "path": "v1/{+parent}/workflowTemplates:instantiateInline",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "requestId": { "location": "query" },
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
            "id": "dataproc.projects.locations.workflowTemplates.setIamPolicy",
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
              "dataproc.projects.locations.workflowTemplates.testIamPermissions",
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
