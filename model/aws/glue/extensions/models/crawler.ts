// Auto-generated extension model for @swamp/aws/glue/crawler
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Crawler (AWS::Glue::Crawler).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const S3TargetSchema = z.object({
  ConnectionName: z.string().describe(
    "The name of a connection which allows a job or crawler to access data in Amazon S3 within an Amazon Virtual Private Cloud environment (Amazon VPC).",
  ).optional(),
  Path: z.string().describe("The path to the Amazon S3 target.").optional(),
  SampleSize: z.number().int().describe(
    "Sets the number of files in each leaf folder to be crawled when crawling sample files in a dataset. If not set, all the files are crawled. A valid value is an integer between 1 and 249.",
  ).optional(),
  Exclusions: z.array(z.string()).describe(
    "A list of glob patterns used to exclude from the crawl.",
  ).optional(),
  DlqEventQueueArn: z.string().describe(
    "A valid Amazon dead-letter SQS ARN. For example, arn:aws:sqs:region:account:deadLetterQueue.",
  ).optional(),
  EventQueueArn: z.string().describe(
    "A valid Amazon SQS ARN. For example, arn:aws:sqs:region:account:sqs.",
  ).optional(),
});

const CatalogTargetSchema = z.object({
  ConnectionName: z.string().describe(
    "The name of the connection for an Amazon S3-backed Data Catalog table to be a target of the crawl when using a Catalog connection type paired with a NETWORK Connection type.",
  ).optional(),
  DatabaseName: z.string().describe(
    "The name of the database to be synchronized.",
  ).optional(),
  DlqEventQueueArn: z.string().describe(
    "A valid Amazon dead-letter SQS ARN. For example, arn:aws:sqs:region:account:deadLetterQueue.",
  ).optional(),
  Tables: z.array(z.string()).describe(
    "A list of the tables to be synchronized.",
  ).optional(),
  EventQueueArn: z.string().describe(
    "A valid Amazon SQS ARN. For example, arn:aws:sqs:region:account:sqs.",
  ).optional(),
});

const DeltaTargetSchema = z.object({
  ConnectionName: z.string().describe(
    "The name of the connection to use to connect to the Delta table target.",
  ).optional(),
  CreateNativeDeltaTable: z.boolean().describe(
    "Specifies whether the crawler will create native tables, to allow integration with query engines that support querying of the Delta transaction log directly.",
  ).optional(),
  WriteManifest: z.boolean().describe(
    "Specifies whether to write the manifest files to the Delta table path.",
  ).optional(),
  DeltaTables: z.array(z.string()).optional(),
});

const MongoDBTargetSchema = z.object({
  ConnectionName: z.string().describe(
    "The name of the connection to use to connect to the Amazon DocumentDB or MongoDB target.",
  ).optional(),
  Path: z.string().describe(
    "The path of the Amazon DocumentDB or MongoDB target (database/collection).",
  ).optional(),
});

const JdbcTargetSchema = z.object({
  ConnectionName: z.string().describe(
    "The name of the connection to use to connect to the JDBC target.",
  ).optional(),
  Path: z.string().describe("The path of the JDBC target.").optional(),
  Exclusions: z.array(z.string()).describe(
    "A list of glob patterns used to exclude from the crawl. For more information, see Catalog Tables with a Crawler.",
  ).optional(),
  EnableAdditionalMetadata: z.array(z.string()).describe(
    "Specify a value of RAWTYPES or COMMENTS to enable additional metadata in table responses. RAWTYPES provides the native-level datatype. COMMENTS provides comments associated with a column or table in the database. If you do not need additional metadata, keep the field empty.",
  ).optional(),
});

const DynamoDBTargetSchema = z.object({
  Path: z.string().describe("The name of the DynamoDB table to crawl.")
    .optional(),
  ScanAll: z.boolean().describe(
    "Indicates whether to scan all the records, or to sample rows from the table. Scanning all the records can take a long time when the table is not a high throughput table. A value of true means to scan all records, while a value of false means to sample the records. If no value is specified, the value defaults to true.",
  ).optional(),
  ScanRate: z.number().describe(
    "The percentage of the configured read capacity units to use by the AWS Glue crawler. Read capacity units is a term defined by DynamoDB, and is a numeric value that acts as rate limiter for the number of reads that can be performed on that table per second. The valid values are null or a value between 0.1 to 1.5. A null value is used when user does not provide a value, and defaults to 0.5 of the configured Read Capacity Unit (for provisioned tables), or 0.25 of the max configured Read Capacity Unit (for tables using on-demand mode).",
  ).optional(),
});

const IcebergTargetSchema = z.object({
  ConnectionName: z.string().describe(
    "The name of the connection to use to connect to the Iceberg target.",
  ).optional(),
  Paths: z.array(z.string()).describe(
    "One or more Amazon S3 paths that contains Iceberg metadata folders as s3://bucket/prefix.",
  ).optional(),
  Exclusions: z.array(z.string()).describe(
    "A list of global patterns used to exclude from the crawl.",
  ).optional(),
  MaximumTraversalDepth: z.number().int().describe(
    "The maximum depth of Amazon S3 paths that the crawler can traverse to discover the Iceberg metadata folder in your Amazon S3 path. Used to limit the crawler run time.",
  ).optional(),
});

const HudiTargetSchema = z.object({
  ConnectionName: z.string().describe(
    "The name of the connection to use to connect to the Hudi target.",
  ).optional(),
  Paths: z.array(z.string()).describe(
    "One or more Amazon S3 paths that contains Hudi metadata folders as s3://bucket/prefix.",
  ).optional(),
  Exclusions: z.array(z.string()).describe(
    "A list of global patterns used to exclude from the crawl.",
  ).optional(),
  MaximumTraversalDepth: z.number().int().describe(
    "The maximum depth of Amazon S3 paths that the crawler can traverse to discover the Hudi metadata folder in your Amazon S3 path. Used to limit the crawler run time.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Classifiers: z.array(z.string()).describe(
    "A list of UTF-8 strings that specify the names of custom classifiers that are associated with the crawler.",
  ).optional(),
  Description: z.string().describe("A description of the crawler.").optional(),
  SchemaChangePolicy: z.object({
    UpdateBehavior: z.string().describe(
      "The update behavior when the crawler finds a changed schema. A value of LOG specifies that if a table or a partition already exists, and a change is detected, do not update it, only log that a change was detected. Add new tables and new partitions (including on existing tables). A value of UPDATE_IN_DATABASE specifies that if a table or partition already exists, and a change is detected, update it. Add new tables and partitions.",
    ).optional(),
    DeleteBehavior: z.string().describe(
      "The deletion behavior when the crawler finds a deleted object. A value of LOG specifies that if a table or partition is found to no longer exist, do not delete it, only log that it was found to no longer exist. A value of DELETE_FROM_DATABASE specifies that if a table or partition is found to have been removed, delete it from the database. A value of DEPRECATE_IN_DATABASE specifies that if a table has been found to no longer exist, to add a property to the table that says 'DEPRECATED' and includes a timestamp with the time of deprecation.",
    ).optional(),
  }).describe(
    "The policy that specifies update and delete behaviors for the crawler. The policy tells the crawler what to do in the event that it detects a change in a table that already exists in the customer's database at the time of the crawl. The SchemaChangePolicy does not affect whether or how new tables and partitions are added. New tables and partitions are always created regardless of the SchemaChangePolicy on a crawler. The SchemaChangePolicy consists of two components, UpdateBehavior and DeleteBehavior.",
  ).optional(),
  Configuration: z.string().describe(
    "Crawler configuration information. This versioned JSON string allows users to specify aspects of a crawler's behavior.",
  ).optional(),
  RecrawlPolicy: z.object({
    RecrawlBehavior: z.string().describe(
      "Specifies whether to crawl the entire dataset again or to crawl only folders that were added since the last crawler run. A value of CRAWL_EVERYTHING specifies crawling the entire dataset again. A value of CRAWL_NEW_FOLDERS_ONLY specifies crawling only folders that were added since the last crawler run. A value of CRAWL_EVENT_MODE specifies crawling only the changes identified by Amazon S3 events.",
    ).optional(),
  }).describe(
    "When crawling an Amazon S3 data source after the first crawl is complete, specifies whether to crawl the entire dataset again or to crawl only folders that were added since the last crawler run. For more information, see Incremental Crawls in AWS Glue in the developer guide.",
  ).optional(),
  DatabaseName: z.string().describe(
    "The name of the database in which the crawler's output is stored.",
  ).optional(),
  Targets: z.object({
    S3Targets: z.array(S3TargetSchema).describe(
      "Specifies Amazon Simple Storage Service (Amazon S3) targets.",
    ).optional(),
    CatalogTargets: z.array(CatalogTargetSchema).describe(
      "Specifies AWS Glue Data Catalog targets.",
    ).optional(),
    DeltaTargets: z.array(DeltaTargetSchema).describe(
      "Specifies an array of Delta data store targets.",
    ).optional(),
    MongoDBTargets: z.array(MongoDBTargetSchema).describe(
      "A list of Mongo DB targets.",
    ).optional(),
    JdbcTargets: z.array(JdbcTargetSchema).describe("Specifies JDBC targets.")
      .optional(),
    DynamoDBTargets: z.array(DynamoDBTargetSchema).describe(
      "Specifies Amazon DynamoDB targets.",
    ).optional(),
    IcebergTargets: z.array(IcebergTargetSchema).describe(
      "Specifies Apache Iceberg data store targets.",
    ).optional(),
    HudiTargets: z.array(HudiTargetSchema).describe(
      "Specifies Apache Hudi data store targets.",
    ).optional(),
  }).describe("Specifies data stores to crawl."),
  CrawlerSecurityConfiguration: z.string().describe(
    "The name of the SecurityConfiguration structure to be used by this crawler.",
  ).optional(),
  Name: z.string().describe("The name of the crawler.").optional(),
  Role: z.string().describe(
    "The Amazon Resource Name (ARN) of an IAM role that's used to access customer resources, such as Amazon Simple Storage Service (Amazon S3) data.",
  ),
  LakeFormationConfiguration: z.object({
    UseLakeFormationCredentials: z.boolean().describe(
      "Specifies whether to use AWS Lake Formation credentials for the crawler instead of the IAM role credentials.",
    ).optional(),
    AccountId: z.string().describe(
      "Required for cross account crawls. For same account crawls as the target data, this can be left as null.",
    ).optional(),
  }).describe(
    "Specifies AWS Lake Formation configuration settings for the crawler",
  ).optional(),
  Schedule: z.object({
    ScheduleExpression: z.string().describe(
      "A cron expression used to specify the schedule. For more information, see Time-Based Schedules for Jobs and Crawlers. For example, to run something every day at 12:15 UTC, specify cron(15 12 * *? *).",
    ).optional(),
  }).describe(
    "A scheduling object using a cron statement to schedule an event.",
  ).optional(),
  TablePrefix: z.string().describe(
    "The prefix added to the names of tables that are created.",
  ).optional(),
  Tags: z.record(z.string(), z.unknown()).describe(
    "The tags to use with this crawler.",
  ).optional(),
});

const StateSchema = z.object({
  Classifiers: z.array(z.string()).optional(),
  Description: z.string().optional(),
  SchemaChangePolicy: z.object({
    UpdateBehavior: z.string(),
    DeleteBehavior: z.string(),
  }).optional(),
  Configuration: z.string().optional(),
  RecrawlPolicy: z.object({
    RecrawlBehavior: z.string(),
  }).optional(),
  DatabaseName: z.string().optional(),
  Targets: z.object({
    S3Targets: z.array(S3TargetSchema),
    CatalogTargets: z.array(CatalogTargetSchema),
    DeltaTargets: z.array(DeltaTargetSchema),
    MongoDBTargets: z.array(MongoDBTargetSchema),
    JdbcTargets: z.array(JdbcTargetSchema),
    DynamoDBTargets: z.array(DynamoDBTargetSchema),
    IcebergTargets: z.array(IcebergTargetSchema),
    HudiTargets: z.array(HudiTargetSchema),
  }).optional(),
  CrawlerSecurityConfiguration: z.string().optional(),
  Name: z.string(),
  Role: z.string().optional(),
  LakeFormationConfiguration: z.object({
    UseLakeFormationCredentials: z.boolean(),
    AccountId: z.string(),
  }).optional(),
  Schedule: z.object({
    ScheduleExpression: z.string(),
  }).optional(),
  TablePrefix: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Classifiers: z.array(z.string()).describe(
    "A list of UTF-8 strings that specify the names of custom classifiers that are associated with the crawler.",
  ).optional(),
  Description: z.string().describe("A description of the crawler.").optional(),
  SchemaChangePolicy: z.object({
    UpdateBehavior: z.string().describe(
      "The update behavior when the crawler finds a changed schema. A value of LOG specifies that if a table or a partition already exists, and a change is detected, do not update it, only log that a change was detected. Add new tables and new partitions (including on existing tables). A value of UPDATE_IN_DATABASE specifies that if a table or partition already exists, and a change is detected, update it. Add new tables and partitions.",
    ).optional(),
    DeleteBehavior: z.string().describe(
      "The deletion behavior when the crawler finds a deleted object. A value of LOG specifies that if a table or partition is found to no longer exist, do not delete it, only log that it was found to no longer exist. A value of DELETE_FROM_DATABASE specifies that if a table or partition is found to have been removed, delete it from the database. A value of DEPRECATE_IN_DATABASE specifies that if a table has been found to no longer exist, to add a property to the table that says 'DEPRECATED' and includes a timestamp with the time of deprecation.",
    ).optional(),
  }).describe(
    "The policy that specifies update and delete behaviors for the crawler. The policy tells the crawler what to do in the event that it detects a change in a table that already exists in the customer's database at the time of the crawl. The SchemaChangePolicy does not affect whether or how new tables and partitions are added. New tables and partitions are always created regardless of the SchemaChangePolicy on a crawler. The SchemaChangePolicy consists of two components, UpdateBehavior and DeleteBehavior.",
  ).optional(),
  Configuration: z.string().describe(
    "Crawler configuration information. This versioned JSON string allows users to specify aspects of a crawler's behavior.",
  ).optional(),
  RecrawlPolicy: z.object({
    RecrawlBehavior: z.string().describe(
      "Specifies whether to crawl the entire dataset again or to crawl only folders that were added since the last crawler run. A value of CRAWL_EVERYTHING specifies crawling the entire dataset again. A value of CRAWL_NEW_FOLDERS_ONLY specifies crawling only folders that were added since the last crawler run. A value of CRAWL_EVENT_MODE specifies crawling only the changes identified by Amazon S3 events.",
    ).optional(),
  }).describe(
    "When crawling an Amazon S3 data source after the first crawl is complete, specifies whether to crawl the entire dataset again or to crawl only folders that were added since the last crawler run. For more information, see Incremental Crawls in AWS Glue in the developer guide.",
  ).optional(),
  DatabaseName: z.string().describe(
    "The name of the database in which the crawler's output is stored.",
  ).optional(),
  Targets: z.object({
    S3Targets: z.array(S3TargetSchema).describe(
      "Specifies Amazon Simple Storage Service (Amazon S3) targets.",
    ).optional(),
    CatalogTargets: z.array(CatalogTargetSchema).describe(
      "Specifies AWS Glue Data Catalog targets.",
    ).optional(),
    DeltaTargets: z.array(DeltaTargetSchema).describe(
      "Specifies an array of Delta data store targets.",
    ).optional(),
    MongoDBTargets: z.array(MongoDBTargetSchema).describe(
      "A list of Mongo DB targets.",
    ).optional(),
    JdbcTargets: z.array(JdbcTargetSchema).describe("Specifies JDBC targets.")
      .optional(),
    DynamoDBTargets: z.array(DynamoDBTargetSchema).describe(
      "Specifies Amazon DynamoDB targets.",
    ).optional(),
    IcebergTargets: z.array(IcebergTargetSchema).describe(
      "Specifies Apache Iceberg data store targets.",
    ).optional(),
    HudiTargets: z.array(HudiTargetSchema).describe(
      "Specifies Apache Hudi data store targets.",
    ).optional(),
  }).describe("Specifies data stores to crawl.").optional(),
  CrawlerSecurityConfiguration: z.string().describe(
    "The name of the SecurityConfiguration structure to be used by this crawler.",
  ).optional(),
  Name: z.string().describe("The name of the crawler.").optional(),
  Role: z.string().describe(
    "The Amazon Resource Name (ARN) of an IAM role that's used to access customer resources, such as Amazon Simple Storage Service (Amazon S3) data.",
  ).optional(),
  LakeFormationConfiguration: z.object({
    UseLakeFormationCredentials: z.boolean().describe(
      "Specifies whether to use AWS Lake Formation credentials for the crawler instead of the IAM role credentials.",
    ).optional(),
    AccountId: z.string().describe(
      "Required for cross account crawls. For same account crawls as the target data, this can be left as null.",
    ).optional(),
  }).describe(
    "Specifies AWS Lake Formation configuration settings for the crawler",
  ).optional(),
  Schedule: z.object({
    ScheduleExpression: z.string().describe(
      "A cron expression used to specify the schedule. For more information, see Time-Based Schedules for Jobs and Crawlers. For example, to run something every day at 12:15 UTC, specify cron(15 12 * *? *).",
    ).optional(),
  }).describe(
    "A scheduling object using a cron statement to schedule an event.",
  ).optional(),
  TablePrefix: z.string().describe(
    "The prefix added to the names of tables that are created.",
  ).optional(),
  Tags: z.record(z.string(), z.unknown()).describe(
    "The tags to use with this crawler.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for Glue Crawler. Registered at `@swamp/aws/glue/crawler`. */
export const model = {
  type: "@swamp/aws/glue/crawler",
  version: "2026.06.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Glue Crawler resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Crawler",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Glue::Crawler",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a Glue Crawler",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Crawler",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Crawler",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Glue Crawler",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Glue::Crawler",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Glue::Crawler",
          identifier,
          currentState,
          desiredState,
          ["Name"],
          credentials,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a Glue Crawler",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Crawler",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Crawler",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync Glue Crawler state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Glue::Crawler",
            identifier,
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
              identifier,
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
  },
};
