// Auto-generated extension model for @swamp/gcp/healthcare/datasets-dicomstores
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Healthcare Datasets.DicomStores.
 *
 * Represents a DICOM store.
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
  return `${parent}/dicomStores/${shortName}`;
}

const BASE_URL = "https://healthcare.googleapis.com/";

const GET_CONFIG = {
  "id": "healthcare.projects.locations.datasets.dicomStores.get",
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
  "id": "healthcare.projects.locations.datasets.dicomStores.create",
  "path": "v1/{+parent}/dicomStores",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "dicomStoreId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "healthcare.projects.locations.datasets.dicomStores.patch",
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
  "id": "healthcare.projects.locations.datasets.dicomStores.delete",
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
  labels: z.record(z.string(), z.string()).describe(
    "User-supplied key-value pairs used to organize DICOM stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} No more than 64 labels can be associated with a given store.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the DICOM store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.",
  ).optional(),
  notificationConfig: z.object({
    pubsubTopic: z.string().describe(
      "The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. PubsubMessage.Data contains the resource name. PubsubMessage.MessageId is the ID of this message. It is guaranteed to be unique within the topic. PubsubMessage.PublishTime is the time at which the message was published. Notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. Cloud Healthcare API service account must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail. If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). If the number of errors exceeds a certain rate, some aren't submitted. Note that not all operations trigger notifications, see [Configuring Pub/Sub notifications](https://cloud.google.com/healthcare/docs/how-tos/pubsub) for specific details.",
    ).optional(),
    sendForBulkImport: z.boolean().describe(
      "Indicates whether or not to send Pub/Sub notifications on bulk import. Only supported for DICOM imports.",
    ).optional(),
  }).describe(
    "Specifies where to send notifications upon changes to a data store.",
  ).optional(),
  notificationConfigs: z.array(z.object({
    pubsubTopic: z.string().describe(
      "Required. The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. The notification is a `PubsubMessage` with the following fields: * `PubsubMessage.Data` contains the resource name. * `PubsubMessage.MessageId` is the ID of this notification. It is guaranteed to be unique within the topic. * `PubsubMessage.PublishTime` is the time when the message was published. * `PubsubMessage.Attributes` contains the following attributes: * `action`: The name of the endpoint that generated the notification. Possible values are `StoreInstances`, `SetBlobSettings`, `ImportDicomData`, etc. * `lastUpdatedTime`: The latest timestamp when the DICOM instance was updated. * `storeName`: The resource name of the DICOM store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. * `studyInstanceUID`: The study UID of the DICOM instance that was changed. * `seriesInstanceUID`: The series UID of the DICOM instance that was changed. * `sopInstanceUID`: The instance UID of the DICOM instance that was changed. * `versionId`: The version ID of the DICOM instance that was changed. * `modality`: The modality tag of the DICOM instance that was changed. * `previousStorageClass`: The storage class where the DICOM instance was previously stored if the storage class was changed. * `storageClass`: The storage class where the DICOM instance is currently stored. Note that notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. The Cloud Healthcare API service account, service-@gcp-sa-healthcare.iam.gserviceaccount.com, must have the `pubsub.topics.publish` permission (which is typically included in `roles/pubsub.publisher` role) on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail (https://cloud.google.com/healthcare-api/docs/permissions-healthcare-api-gcp-products#dicom_fhir_and_hl7v2_store_cloud_pubsub_permissions). If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare-api/docs/how-tos/logging).",
    ).optional(),
  })).describe(
    "Optional. Specifies where and whether to send notifications upon changes to a DICOM store.",
  ).optional(),
  streamConfigs: z.array(z.object({
    bigqueryDestination: z.object({
      force: z.boolean().describe(
        "Optional. Use `write_disposition` instead. If `write_disposition` is specified, this parameter is ignored. force=false is equivalent to write_disposition=WRITE_EMPTY and force=true is equivalent to write_disposition=WRITE_TRUNCATE.",
      ).optional(),
      includeSourceStore: z.boolean().describe(
        "Optional. If true, the source store name will be included as a column in the BigQuery schema.",
      ).optional(),
      schemaFlattened: z.object({}).describe(
        "Using this field will flatten the DICOM instances into a BigQuery table. The table will have one column for each DICOM tag. The column name will be the DICOM tag's textual representation.",
      ).optional(),
      schemaJson: z.object({}).describe(
        "Using this field will set the schema such that all DICOM tags will be included in the BigQuery table as a single JSON type column. The BigQuery table schema will include the following columns: * `StudyInstanceUID` (Type: STRING): DICOM Tag 0020000D. * `SeriesInstanceUID` (Type: STRING): DICOM Tag 0020000E. * `SOPInstanceUID` (Type: STRING): DICOM Tag 00080018. * `SourceDicomStore` (Type: STRING): The name of the source DICOM store. This field is only included if the `include_source_store` option is set to true. * `Metadata` (Type: JSON): All DICOM tags for the instance, stored in a single JSON object. * `StructuredStorageSize` (Type: INTEGER): Size of the structured storage in bytes. * `DroppedTags` (Type: STRING, Repeated: Yes): List of tags that were dropped during the conversion. * `StorageClass` (Type: STRING): The storage class of the instance. * `LastUpdated` (Type: TIMESTAMP): Timestamp of the last update to the instance. * `BlobStorageSize` (Type: INTEGER): Size of the blob storage in bytes. * `Type` (Type: STRING): Indicates the type of operation (e.g., INSERT, DELETE).",
      ).optional(),
      tableUri: z.string().describe(
        "Optional. BigQuery URI to a table, up to 2000 characters long, in the format `bq://projectId.bqDatasetId.tableId`",
      ).optional(),
      writeDisposition: z.enum([
        "WRITE_DISPOSITION_UNSPECIFIED",
        "WRITE_EMPTY",
        "WRITE_TRUNCATE",
        "WRITE_APPEND",
      ]).describe(
        "Optional. Determines whether the existing table in the destination is to be overwritten or appended to. If a write_disposition is specified, the `force` parameter is ignored.",
      ).optional(),
    }).describe("The BigQuery table where the server writes the output.")
      .optional(),
  })).describe(
    "Optional. A list of streaming configs used to configure the destination of streaming exports for every DICOM instance insertion in this DICOM store. After a new config is added to `stream_configs`, DICOM instance insertions are streamed to the new destination. When a config is removed from `stream_configs`, the server stops streaming to that destination. Each config must contain a unique destination.",
  ).optional(),
  dicomStoreId: z.string().describe(
    "Required. The ID of the DICOM store that is being created. Any string value up to 256 characters in length.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  notificationConfig: z.object({
    pubsubTopic: z.string(),
    sendForBulkImport: z.boolean(),
  }).optional(),
  notificationConfigs: z.array(z.object({
    pubsubTopic: z.string(),
  })).optional(),
  streamConfigs: z.array(z.object({
    bigqueryDestination: z.object({
      force: z.boolean(),
      includeSourceStore: z.boolean(),
      schemaFlattened: z.object({}),
      schemaJson: z.object({}),
      tableUri: z.string(),
      writeDisposition: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  labels: z.record(z.string(), z.string()).describe(
    "User-supplied key-value pairs used to organize DICOM stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} No more than 64 labels can be associated with a given store.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the DICOM store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.",
  ).optional(),
  notificationConfig: z.object({
    pubsubTopic: z.string().describe(
      "The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. PubsubMessage.Data contains the resource name. PubsubMessage.MessageId is the ID of this message. It is guaranteed to be unique within the topic. PubsubMessage.PublishTime is the time at which the message was published. Notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. Cloud Healthcare API service account must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail. If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). If the number of errors exceeds a certain rate, some aren't submitted. Note that not all operations trigger notifications, see [Configuring Pub/Sub notifications](https://cloud.google.com/healthcare/docs/how-tos/pubsub) for specific details.",
    ).optional(),
    sendForBulkImport: z.boolean().describe(
      "Indicates whether or not to send Pub/Sub notifications on bulk import. Only supported for DICOM imports.",
    ).optional(),
  }).describe(
    "Specifies where to send notifications upon changes to a data store.",
  ).optional(),
  notificationConfigs: z.array(z.object({
    pubsubTopic: z.string().describe(
      "Required. The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. The notification is a `PubsubMessage` with the following fields: * `PubsubMessage.Data` contains the resource name. * `PubsubMessage.MessageId` is the ID of this notification. It is guaranteed to be unique within the topic. * `PubsubMessage.PublishTime` is the time when the message was published. * `PubsubMessage.Attributes` contains the following attributes: * `action`: The name of the endpoint that generated the notification. Possible values are `StoreInstances`, `SetBlobSettings`, `ImportDicomData`, etc. * `lastUpdatedTime`: The latest timestamp when the DICOM instance was updated. * `storeName`: The resource name of the DICOM store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. * `studyInstanceUID`: The study UID of the DICOM instance that was changed. * `seriesInstanceUID`: The series UID of the DICOM instance that was changed. * `sopInstanceUID`: The instance UID of the DICOM instance that was changed. * `versionId`: The version ID of the DICOM instance that was changed. * `modality`: The modality tag of the DICOM instance that was changed. * `previousStorageClass`: The storage class where the DICOM instance was previously stored if the storage class was changed. * `storageClass`: The storage class where the DICOM instance is currently stored. Note that notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. The Cloud Healthcare API service account, service-@gcp-sa-healthcare.iam.gserviceaccount.com, must have the `pubsub.topics.publish` permission (which is typically included in `roles/pubsub.publisher` role) on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail (https://cloud.google.com/healthcare-api/docs/permissions-healthcare-api-gcp-products#dicom_fhir_and_hl7v2_store_cloud_pubsub_permissions). If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare-api/docs/how-tos/logging).",
    ).optional(),
  })).describe(
    "Optional. Specifies where and whether to send notifications upon changes to a DICOM store.",
  ).optional(),
  streamConfigs: z.array(z.object({
    bigqueryDestination: z.object({
      force: z.boolean().describe(
        "Optional. Use `write_disposition` instead. If `write_disposition` is specified, this parameter is ignored. force=false is equivalent to write_disposition=WRITE_EMPTY and force=true is equivalent to write_disposition=WRITE_TRUNCATE.",
      ).optional(),
      includeSourceStore: z.boolean().describe(
        "Optional. If true, the source store name will be included as a column in the BigQuery schema.",
      ).optional(),
      schemaFlattened: z.object({}).describe(
        "Using this field will flatten the DICOM instances into a BigQuery table. The table will have one column for each DICOM tag. The column name will be the DICOM tag's textual representation.",
      ).optional(),
      schemaJson: z.object({}).describe(
        "Using this field will set the schema such that all DICOM tags will be included in the BigQuery table as a single JSON type column. The BigQuery table schema will include the following columns: * `StudyInstanceUID` (Type: STRING): DICOM Tag 0020000D. * `SeriesInstanceUID` (Type: STRING): DICOM Tag 0020000E. * `SOPInstanceUID` (Type: STRING): DICOM Tag 00080018. * `SourceDicomStore` (Type: STRING): The name of the source DICOM store. This field is only included if the `include_source_store` option is set to true. * `Metadata` (Type: JSON): All DICOM tags for the instance, stored in a single JSON object. * `StructuredStorageSize` (Type: INTEGER): Size of the structured storage in bytes. * `DroppedTags` (Type: STRING, Repeated: Yes): List of tags that were dropped during the conversion. * `StorageClass` (Type: STRING): The storage class of the instance. * `LastUpdated` (Type: TIMESTAMP): Timestamp of the last update to the instance. * `BlobStorageSize` (Type: INTEGER): Size of the blob storage in bytes. * `Type` (Type: STRING): Indicates the type of operation (e.g., INSERT, DELETE).",
      ).optional(),
      tableUri: z.string().describe(
        "Optional. BigQuery URI to a table, up to 2000 characters long, in the format `bq://projectId.bqDatasetId.tableId`",
      ).optional(),
      writeDisposition: z.enum([
        "WRITE_DISPOSITION_UNSPECIFIED",
        "WRITE_EMPTY",
        "WRITE_TRUNCATE",
        "WRITE_APPEND",
      ]).describe(
        "Optional. Determines whether the existing table in the destination is to be overwritten or appended to. If a write_disposition is specified, the `force` parameter is ignored.",
      ).optional(),
    }).describe("The BigQuery table where the server writes the output.")
      .optional(),
  })).describe(
    "Optional. A list of streaming configs used to configure the destination of streaming exports for every DICOM instance insertion in this DICOM store. After a new config is added to `stream_configs`, DICOM instance insertions are streamed to the new destination. When a config is removed from `stream_configs`, the server stops streaming to that destination. Each config must contain a unique destination.",
  ).optional(),
  dicomStoreId: z.string().describe(
    "Required. The ID of the DICOM store that is being created. Any string value up to 256 characters in length.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Healthcare Datasets.DicomStores. Registered at `@swamp/gcp/healthcare/datasets-dicomstores`. */
export const model = {
  type: "@swamp/gcp/healthcare/datasets-dicomstores",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a DICOM store.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dicomStores",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notificationConfig"] !== undefined) {
          body["notificationConfig"] = g["notificationConfig"];
        }
        if (g["notificationConfigs"] !== undefined) {
          body["notificationConfigs"] = g["notificationConfigs"];
        }
        if (g["streamConfigs"] !== undefined) {
          body["streamConfigs"] = g["streamConfigs"];
        }
        if (g["dicomStoreId"] !== undefined) {
          body["dicomStoreId"] = g["dicomStoreId"];
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
      description: "Get a dicomStores",
      arguments: z.object({
        identifier: z.string().describe("The name of the dicomStores"),
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
      description: "Update dicomStores attributes",
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
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["notificationConfig"] !== undefined) {
          body["notificationConfig"] = g["notificationConfig"];
        }
        if (g["notificationConfigs"] !== undefined) {
          body["notificationConfigs"] = g["notificationConfigs"];
        }
        if (g["streamConfigs"] !== undefined) {
          body["streamConfigs"] = g["streamConfigs"];
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
      description: "Delete the dicomStores",
      arguments: z.object({
        identifier: z.string().describe("The name of the dicomStores"),
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
      description: "Sync dicomStores state from GCP",
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
    deidentify: {
      description: "deidentify",
      arguments: z.object({
        config: z.any().optional(),
        destinationStore: z.any().optional(),
        filterConfig: z.any().optional(),
        gcsConfigUri: z.any().optional(),
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
        params["sourceStore"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["config"] !== undefined) body["config"] = args["config"];
        if (args["destinationStore"] !== undefined) {
          body["destinationStore"] = args["destinationStore"];
        }
        if (args["filterConfig"] !== undefined) {
          body["filterConfig"] = args["filterConfig"];
        }
        if (args["gcsConfigUri"] !== undefined) {
          body["gcsConfigUri"] = args["gcsConfigUri"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "healthcare.projects.locations.datasets.dicomStores.deidentify",
            "path": "v1/{+sourceStore}:deidentify",
            "httpMethod": "POST",
            "parameterOrder": ["sourceStore"],
            "parameters": {
              "sourceStore": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    export: {
      description: "export",
      arguments: z.object({
        bigqueryDestination: z.any().optional(),
        gcsDestination: z.any().optional(),
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
        if (args["bigqueryDestination"] !== undefined) {
          body["bigqueryDestination"] = args["bigqueryDestination"];
        }
        if (args["gcsDestination"] !== undefined) {
          body["gcsDestination"] = args["gcsDestination"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "healthcare.projects.locations.datasets.dicomStores.export",
            "path": "v1/{+name}:export",
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
    get_dicomstore_metrics: {
      description: "get dicomstore metrics",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "healthcare.projects.locations.datasets.dicomStores.getDICOMStoreMetrics",
            "path": "v1/{+name}:getDICOMStoreMetrics",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    import: {
      description: "import",
      arguments: z.object({
        blobStorageSettings: z.any().optional(),
        gcsSource: z.any().optional(),
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
        if (args["blobStorageSettings"] !== undefined) {
          body["blobStorageSettings"] = args["blobStorageSettings"];
        }
        if (args["gcsSource"] !== undefined) {
          body["gcsSource"] = args["gcsSource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "healthcare.projects.locations.datasets.dicomStores.import",
            "path": "v1/{+name}:import",
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
    search_for_instances: {
      description: "search for instances",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        params["dicomWebPath"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "healthcare.projects.locations.datasets.dicomStores.searchForInstances",
            "path": "v1/{+parent}/dicomWeb/{+dicomWebPath}",
            "httpMethod": "GET",
            "parameterOrder": ["parent", "dicomWebPath"],
            "parameters": {
              "dicomWebPath": { "location": "path", "required": true },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    search_for_series: {
      description: "search for series",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        params["dicomWebPath"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "healthcare.projects.locations.datasets.dicomStores.searchForSeries",
            "path": "v1/{+parent}/dicomWeb/{+dicomWebPath}",
            "httpMethod": "GET",
            "parameterOrder": ["parent", "dicomWebPath"],
            "parameters": {
              "dicomWebPath": { "location": "path", "required": true },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    search_for_studies: {
      description: "search for studies",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        params["dicomWebPath"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "healthcare.projects.locations.datasets.dicomStores.searchForStudies",
            "path": "v1/{+parent}/dicomWeb/{+dicomWebPath}",
            "httpMethod": "GET",
            "parameterOrder": ["parent", "dicomWebPath"],
            "parameters": {
              "dicomWebPath": { "location": "path", "required": true },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_blob_storage_settings: {
      description: "set blob storage settings",
      arguments: z.object({
        blobStorageSettings: z.any().optional(),
        filterConfig: z.any().optional(),
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
        if (args["blobStorageSettings"] !== undefined) {
          body["blobStorageSettings"] = args["blobStorageSettings"];
        }
        if (args["filterConfig"] !== undefined) {
          body["filterConfig"] = args["filterConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "healthcare.projects.locations.datasets.dicomStores.setBlobStorageSettings",
            "path": "v1/{+resource}:setBlobStorageSettings",
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
    store_instances: {
      description: "store instances",
      arguments: z.object({
        contentType: z.any().optional(),
        data: z.any().optional(),
        extensions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        params["dicomWebPath"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["contentType"] !== undefined) {
          body["contentType"] = args["contentType"];
        }
        if (args["data"] !== undefined) body["data"] = args["data"];
        if (args["extensions"] !== undefined) {
          body["extensions"] = args["extensions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "healthcare.projects.locations.datasets.dicomStores.storeInstances",
            "path": "v1/{+parent}/dicomWeb/{+dicomWebPath}",
            "httpMethod": "POST",
            "parameterOrder": ["parent", "dicomWebPath"],
            "parameters": {
              "dicomWebPath": { "location": "path", "required": true },
              "parent": { "location": "path", "required": true },
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
