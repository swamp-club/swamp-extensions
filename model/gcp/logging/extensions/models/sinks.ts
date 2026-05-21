// Auto-generated extension model for @swamp/gcp/logging/sinks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Logging Sinks.
 *
 * Describes a sink used to export log entries to one of the following destinations: a Cloud Logging log bucket, a Cloud Storage bucket, a BigQuery dataset, a Pub/Sub topic, a Cloud project.A logs filter controls which log entries are exported. The sink must be created within a project, organization, billing account, or folder.
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

const BASE_URL = "https://logging.googleapis.com/";

const GET_CONFIG = {
  "id": "logging.billingAccounts.sinks.get",
  "path": "v2/{+sinkName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "sinkName",
  ],
  "parameters": {
    "sinkName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "logging.billingAccounts.sinks.create",
  "path": "v2/{+parent}/sinks",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "customWriterIdentity": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "uniqueWriterIdentity": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "logging.billingAccounts.sinks.update",
  "path": "v2/{+sinkName}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "sinkName",
  ],
  "parameters": {
    "customWriterIdentity": {
      "location": "query",
    },
    "sinkName": {
      "location": "path",
      "required": true,
    },
    "uniqueWriterIdentity": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "logging.billingAccounts.sinks.delete",
  "path": "v2/{+sinkName}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "sinkName",
  ],
  "parameters": {
    "sinkName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "logging.billingAccounts.sinks.list",
  "path": "v2/{+parent}/sinks",
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
  bigqueryOptions: z.object({
    usePartitionedTables: z.boolean().describe(
      "Optional. Whether to use BigQuery's partition tables (https://docs.cloud.google.com/bigquery/docs/partitioned-tables). By default, Cloud Logging creates dated tables based on the log entries' timestamps, e.g. syslog_20170523. With partitioned tables the date suffix is no longer present and special query syntax (https://docs.cloud.google.com/bigquery/docs/querying-partitioned-tables) has to be used instead. In both cases, tables are sharded based on UTC timezone.",
    ).optional(),
    usesTimestampColumnPartitioning: z.boolean().describe(
      "Output only. True if new timestamp column based partitioning is in use, false if legacy ingress-time partitioning is in use.All new sinks will have this field set true and will use timestamp column based partitioning. If use_partitioned_tables is false, this value has no meaning and will be false. Legacy sinks using partitioned tables will have this field set to false.",
    ).optional(),
  }).describe(
    "Options that change functionality of a sink exporting data to BigQuery.",
  ).optional(),
  description: z.string().describe(
    "Optional. A description of this sink.The maximum length of the description is 8000 characters.",
  ).optional(),
  destination: z.string().describe(
    'Required. The export destination: "storage.googleapis.com/[GCS_BUCKET]" "bigquery.googleapis.com/projects/[PROJECT_ID]/datasets/[DATASET]" "pubsub.googleapis.com/projects/[PROJECT_ID]/topics/[TOPIC_ID]" "logging.googleapis.com/projects/[PROJECT_ID]" "logging.googleapis.com/projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" The sink\'s writer_identity, set when the sink is created, must have permission to write to the destination or else the log entries are not exported. For more information, see Route logs to supported destinations (https://docs.cloud.google.com/logging/docs/export/configure_export_v2).',
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. If set to true, then this sink is disabled and it does not export any log entries.",
  ).optional(),
  exclusions: z.array(z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of the exclusion.This field may not be present for older exclusions.",
    ).optional(),
    description: z.string().describe(
      "Optional. A description of this exclusion.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. If set to True, then this exclusion is disabled and it does not exclude any log entries. You can update an exclusion to change the value of this field.",
    ).optional(),
    filter: z.string().describe(
      "Required. An advanced logs filter (https://docs.cloud.google.com/logging/docs/view/building-queries#queries-by-expression) that matches the log entries to be excluded. By using the sample function (https://docs.cloud.google.com/logging/docs/view/logging-query-language#sample), you can exclude less than 100% of the matching log entries.For example, the following query matches 99% of low-severity log entries from Google Cloud Storage buckets:resource.type=gcs_bucket severity<ERROR sample(insertId, 0.99)",
    ).optional(),
    name: z.string().describe(
      'Optional. A client-assigned identifier, such as "load-balancer-exclusion". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. First character has to be alphanumeric.',
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of the exclusion.This field may not be present for older exclusions.",
    ).optional(),
  })).describe(
    "Optional. Log entries that match any of these exclusion filters will not be exported.If a log entry is matched by both filter and one of exclusions it will not be exported.",
  ).optional(),
  filter: z.string().describe(
    'Optional. An advanced logs filter (https://docs.cloud.google.com/logging/docs/view/building-queries#queries-by-expression). The only exported log entries are those that are in the resource owning the sink and that match the filter.For example:logName="projects/[PROJECT_ID]/logs/[LOG_ID]" AND severity>=ERROR',
  ).optional(),
  includeChildren: z.boolean().describe(
    "Optional. This field applies only to sinks owned by organizations and folders. If the field is false, the default, only the logs owned by the sink's parent resource are available for export. If the field is true, then log entries from all the projects, folders, and billing accounts contained in the sink's parent resource are also available for export. Whether a particular log entry from the children is exported depends on the sink's filter expression.For example, if this field is true, then the filter resource.type=gce_instance would export all Compute Engine VM instance log entries from all projects in the sink's parent.To only export entries from certain child projects, filter on the project part of the log name:logName:(\"projects/test-project1/\" OR \"projects/test-project2/\") AND resource.type=gce_instance",
  ).optional(),
  interceptChildren: z.boolean().describe(
    "Optional. This field applies only to sinks owned by organizations and folders.When the value of 'intercept_children' is true, the following restrictions apply: The sink must have the include_children flag set to true. The sink destination must be a Cloud project.Also, the following behaviors apply: Any logs matched by the sink won't be included by non-_Required sinks owned by child resources. The sink appears in the results of a ListSinks call from a child resource if the value of the filter field in its request is either 'in_scope(\"ALL\")' or 'in_scope(\"ANCESTOR\")'.",
  ).optional(),
  name: z.string().describe(
    'Optional. The client-assigned sink identifier, unique within the project.For example: "my-syslog-errors-to-pubsub".Sink identifiers are limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric.',
  ).optional(),
  customWriterIdentity: z.string().describe(
    "Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated.",
  ).optional(),
  uniqueWriterIdentity: z.string().describe(
    "Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Cloud Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) used by the sinks with the same parent. For more information, see writer_identity in LogSink.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  bigqueryOptions: z.object({
    usePartitionedTables: z.boolean(),
    usesTimestampColumnPartitioning: z.boolean(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  destination: z.string().optional(),
  disabled: z.boolean().optional(),
  exclusions: z.array(z.object({
    createTime: z.string(),
    description: z.string(),
    disabled: z.boolean(),
    filter: z.string(),
    name: z.string(),
    updateTime: z.string(),
  })).optional(),
  filter: z.string().optional(),
  includeChildren: z.boolean().optional(),
  interceptChildren: z.boolean().optional(),
  name: z.string(),
  outputVersionFormat: z.string().optional(),
  resourceName: z.string().optional(),
  updateTime: z.string().optional(),
  writerIdentity: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  bigqueryOptions: z.object({
    usePartitionedTables: z.boolean().describe(
      "Optional. Whether to use BigQuery's partition tables (https://docs.cloud.google.com/bigquery/docs/partitioned-tables). By default, Cloud Logging creates dated tables based on the log entries' timestamps, e.g. syslog_20170523. With partitioned tables the date suffix is no longer present and special query syntax (https://docs.cloud.google.com/bigquery/docs/querying-partitioned-tables) has to be used instead. In both cases, tables are sharded based on UTC timezone.",
    ).optional(),
    usesTimestampColumnPartitioning: z.boolean().describe(
      "Output only. True if new timestamp column based partitioning is in use, false if legacy ingress-time partitioning is in use.All new sinks will have this field set true and will use timestamp column based partitioning. If use_partitioned_tables is false, this value has no meaning and will be false. Legacy sinks using partitioned tables will have this field set to false.",
    ).optional(),
  }).describe(
    "Options that change functionality of a sink exporting data to BigQuery.",
  ).optional(),
  description: z.string().describe(
    "Optional. A description of this sink.The maximum length of the description is 8000 characters.",
  ).optional(),
  destination: z.string().describe(
    'Required. The export destination: "storage.googleapis.com/[GCS_BUCKET]" "bigquery.googleapis.com/projects/[PROJECT_ID]/datasets/[DATASET]" "pubsub.googleapis.com/projects/[PROJECT_ID]/topics/[TOPIC_ID]" "logging.googleapis.com/projects/[PROJECT_ID]" "logging.googleapis.com/projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" The sink\'s writer_identity, set when the sink is created, must have permission to write to the destination or else the log entries are not exported. For more information, see Route logs to supported destinations (https://docs.cloud.google.com/logging/docs/export/configure_export_v2).',
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. If set to true, then this sink is disabled and it does not export any log entries.",
  ).optional(),
  exclusions: z.array(z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of the exclusion.This field may not be present for older exclusions.",
    ).optional(),
    description: z.string().describe(
      "Optional. A description of this exclusion.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. If set to True, then this exclusion is disabled and it does not exclude any log entries. You can update an exclusion to change the value of this field.",
    ).optional(),
    filter: z.string().describe(
      "Required. An advanced logs filter (https://docs.cloud.google.com/logging/docs/view/building-queries#queries-by-expression) that matches the log entries to be excluded. By using the sample function (https://docs.cloud.google.com/logging/docs/view/logging-query-language#sample), you can exclude less than 100% of the matching log entries.For example, the following query matches 99% of low-severity log entries from Google Cloud Storage buckets:resource.type=gcs_bucket severity<ERROR sample(insertId, 0.99)",
    ).optional(),
    name: z.string().describe(
      'Optional. A client-assigned identifier, such as "load-balancer-exclusion". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. First character has to be alphanumeric.',
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of the exclusion.This field may not be present for older exclusions.",
    ).optional(),
  })).describe(
    "Optional. Log entries that match any of these exclusion filters will not be exported.If a log entry is matched by both filter and one of exclusions it will not be exported.",
  ).optional(),
  filter: z.string().describe(
    'Optional. An advanced logs filter (https://docs.cloud.google.com/logging/docs/view/building-queries#queries-by-expression). The only exported log entries are those that are in the resource owning the sink and that match the filter.For example:logName="projects/[PROJECT_ID]/logs/[LOG_ID]" AND severity>=ERROR',
  ).optional(),
  includeChildren: z.boolean().describe(
    "Optional. This field applies only to sinks owned by organizations and folders. If the field is false, the default, only the logs owned by the sink's parent resource are available for export. If the field is true, then log entries from all the projects, folders, and billing accounts contained in the sink's parent resource are also available for export. Whether a particular log entry from the children is exported depends on the sink's filter expression.For example, if this field is true, then the filter resource.type=gce_instance would export all Compute Engine VM instance log entries from all projects in the sink's parent.To only export entries from certain child projects, filter on the project part of the log name:logName:(\"projects/test-project1/\" OR \"projects/test-project2/\") AND resource.type=gce_instance",
  ).optional(),
  interceptChildren: z.boolean().describe(
    "Optional. This field applies only to sinks owned by organizations and folders.When the value of 'intercept_children' is true, the following restrictions apply: The sink must have the include_children flag set to true. The sink destination must be a Cloud project.Also, the following behaviors apply: Any logs matched by the sink won't be included by non-_Required sinks owned by child resources. The sink appears in the results of a ListSinks call from a child resource if the value of the filter field in its request is either 'in_scope(\"ALL\")' or 'in_scope(\"ANCESTOR\")'.",
  ).optional(),
  name: z.string().describe(
    'Optional. The client-assigned sink identifier, unique within the project.For example: "my-syslog-errors-to-pubsub".Sink identifiers are limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric.',
  ).optional(),
  customWriterIdentity: z.string().describe(
    "Optional. The service account provided by the caller that will be used to write the log entries. The format must be serviceAccount:some@email. This field can only be specified when you are routing logs to a log bucket that is in a different project than the sink. When not specified, a Logging service account will automatically be generated.",
  ).optional(),
  uniqueWriterIdentity: z.string().describe(
    "Optional. Determines the kind of IAM identity returned as writer_identity in the new sink. If this value is omitted or set to false, and if the sink's parent is a project, then the value returned as writer_identity is the same group or service account used by Cloud Logging before the addition of writer identities to this API. The sink's destination must be in the same project as the sink itself.If this field is set to true, or if the sink is owned by a non-project resource such as an organization, then the value of writer_identity will be a service agent (https://docs.cloud.google.com/iam/docs/service-account-types#service-agents) used by the sinks with the same parent. For more information, see writer_identity in LogSink.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Logging Sinks. Registered at `@swamp/gcp/logging/sinks`. */
export const model = {
  type: "@swamp/gcp/logging/sinks",
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
      description:
        "Describes a sink used to export log entries to one of the following destinati...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sinks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["bigqueryOptions"] !== undefined) {
          body["bigqueryOptions"] = g["bigqueryOptions"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["exclusions"] !== undefined) body["exclusions"] = g["exclusions"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["includeChildren"] !== undefined) {
          body["includeChildren"] = g["includeChildren"];
        }
        if (g["interceptChildren"] !== undefined) {
          body["interceptChildren"] = g["interceptChildren"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["customWriterIdentity"] !== undefined) {
          body["customWriterIdentity"] = g["customWriterIdentity"];
        }
        if (g["uniqueWriterIdentity"] !== undefined) {
          body["uniqueWriterIdentity"] = g["uniqueWriterIdentity"];
        }
        if (g["name"] !== undefined) params["sinkName"] = String(g["name"]);
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a sinks",
      arguments: z.object({
        identifier: z.string().describe("The name of the sinks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["sinkName"] = args.identifier;
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
      description: "Update sinks attributes",
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
        params["sinkName"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["bigqueryOptions"] !== undefined) {
          body["bigqueryOptions"] = g["bigqueryOptions"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["exclusions"] !== undefined) body["exclusions"] = g["exclusions"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["includeChildren"] !== undefined) {
          body["includeChildren"] = g["includeChildren"];
        }
        if (g["interceptChildren"] !== undefined) {
          body["interceptChildren"] = g["interceptChildren"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
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
      description: "Delete the sinks",
      arguments: z.object({
        identifier: z.string().describe("The name of the sinks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["sinkName"] = args.identifier;
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
      description: "Sync sinks state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["sinkName"] = identifier;
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
  },
};
