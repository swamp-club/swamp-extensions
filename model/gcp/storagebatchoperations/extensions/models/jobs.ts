// Auto-generated extension model for @swamp/gcp/storagebatchoperations/jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage Batch Operations Jobs.
 *
 * The storage batch operations job description.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/jobs/${shortName}`;
}

const BASE_URL = "https://storagebatchoperations.googleapis.com/";

const GET_CONFIG = {
  "id": "storagebatchoperations.projects.locations.jobs.get",
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
  "id": "storagebatchoperations.projects.locations.jobs.create",
  "path": "v1/{+parent}/jobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "jobId": {
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
  "id": "storagebatchoperations.projects.locations.jobs.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "storagebatchoperations.projects.locations.jobs.list",
  "path": "v1/{+parent}/jobs",
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
  bucketList: z.object({
    buckets: z.array(z.object({
      bucket: z.string().describe(
        "Required. Bucket name for the objects to be transformed.",
      ).optional(),
      manifest: z.object({
        manifestLocation: z.string().describe(
          "Required. Specify the manifest file location. The format of manifest location can be an absolute path to the object in the format of `gs://bucket_name/path/object_name`. For example, `gs://bucket_name/path/object_name.csv`. Alternatively, you can specify an absolute path with a single wildcard character in the file name, for example `gs://bucket_name/path/file_name*.csv`. If the manifest location is specified with a wildcard, objects in all manifest files matching the pattern will be acted upon. The manifest is a CSV file, uploaded to Cloud Storage, that contains one object or a list of objects that you want to process. Each row in the manifest must include the `bucket` and `name` of the object. You can optionally specify the `generation` of the object. If you don't specify the `generation`, the current version of the object is used. You can optionally include a header row with the following format: `bucket,name,generation`. For example, bucket,name,generation bucket_1,object_1,generation_1 bucket_1,object_2,generation_2 bucket_1,object_3,generation_3 Note: The manifest file must specify only objects within the bucket provided to the job. Rows referencing objects in other buckets are ignored.",
        ).optional(),
      }).describe("Describes list of objects to be transformed.").optional(),
      prefixList: z.object({
        includedObjectPrefixes: z.array(z.unknown()).describe(
          "Optional. Specify one or more object prefixes. For example: * To match one object, use a single prefix, `prefix1`. * To match multiple objects, use comma-separated prefixes, `prefix1, prefix2`. * To match all objects, use an empty prefix, `''`",
        ).optional(),
      }).describe("Describes prefixes of objects to be transformed.")
        .optional(),
    })).describe(
      "Required. List of buckets and their objects to be transformed. You can specify only one bucket per job. If multiple buckets are specified, an error occurs.",
    ).optional(),
  }).describe("Describes list of buckets and their objects to be transformed.")
    .optional(),
  counters: z.object({
    failedObjectCount: z.string().describe(
      "Output only. The number of objects that failed due to user errors or service errors.",
    ).optional(),
    objectCustomContextsCreated: z.string().describe(
      "Output only. Number of object custom contexts created. This field is only populated for jobs with the UpdateObjectCustomContext transformation.",
    ).optional(),
    objectCustomContextsDeleted: z.string().describe(
      "Output only. Number of object custom contexts deleted. This field is only populated for jobs with the UpdateObjectCustomContext transformation.",
    ).optional(),
    objectCustomContextsUpdated: z.string().describe(
      "Output only. Number of object custom contexts updated. This counter tracks custom contexts where the key already existed, but the payload was modified. This field is only populated for jobs with the UpdateObjectCustomContext transformation.",
    ).optional(),
    succeededObjectCount: z.string().describe(
      "Output only. Number of objects completed.",
    ).optional(),
    totalBytesFound: z.string().describe(
      "Output only. Number of bytes found from source. This field is only populated for jobs with a prefix list object configuration.",
    ).optional(),
    totalBytesTransformed: z.string().describe(
      "Output only. The total number of bytes affected by the transformation. For example, this counts bytes deleted for `DeleteObject` operations and bytes rewritten for `RewriteObject` operations.",
    ).optional(),
    totalObjectCount: z.string().describe(
      "Output only. Number of objects listed.",
    ).optional(),
  }).describe("Describes details about the progress of the job.").optional(),
  deleteObject: z.object({
    permanentObjectDeletionEnabled: z.boolean().describe(
      "Required. Controls deletion behavior when versioning is enabled for the object's bucket. If true, both live and noncurrent objects will be permanently deleted. Otherwise live objects in versioned buckets will become noncurrent and objects that were already noncurrent will be skipped. This setting doesn't have any impact on the Soft Delete feature. All objects deleted by this service can be be restored for the duration of the Soft Delete retention duration if enabled. If enabled and the manifest doesn't specify an object's generation, a `GetObjectMetadata` call is made to determine the live object generation.",
    ).optional(),
  }).describe("Describes options to delete an object.").optional(),
  description: z.string().describe(
    "Optional. A user-provided description for the job. Maximum length: 1024 bytes when unicode-encoded.",
  ).optional(),
  dryRun: z.boolean().describe(
    "Optional. If true, the job runs in dry run mode, returning the total object count and, if the object configuration is a prefix list, the bytes found from source. No transformations are performed.",
  ).optional(),
  loggingConfig: z.object({
    logActionStates: z.array(
      z.enum(["LOGGABLE_ACTION_STATE_UNSPECIFIED", "SUCCEEDED", "FAILED"]),
    ).describe(
      "Required. States in which Action are logged.If empty, no logs are generated.",
    ).optional(),
    logActions: z.array(z.enum(["LOGGABLE_ACTION_UNSPECIFIED", "TRANSFORM"]))
      .describe("Required. Specifies the actions to be logged.").optional(),
  }).describe("Specifies the Cloud Logging behavior.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the job. Format: `projects/{project_id}/locations/global/jobs/{job_id}`. For example: `projects/123456/locations/global/jobs/job01`. `job_id` is unique in a given project.",
  ).optional(),
  projectSource: z.object({
    bucketFilters: z.object({
      description: z.string().describe(
        "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
      ).optional(),
      expression: z.string().describe(
        "Textual representation of an expression in Common Expression Language syntax.",
      ).optional(),
      location: z.string().describe(
        "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
      ).optional(),
      title: z.string().describe(
        "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
      ).optional(),
    }).describe(
      'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
    ).optional(),
    dryRunJobId: z.string().describe(
      "Optional. The unique identifier of a dry run job to use as the baseline for the current job. Specifying this ID ensures the job is executed against the same set of objects validated during the dry run. The value corresponds to the {job_id} segment of the resource name: `projects/{project_id}/locations/{location}/jobs/{job_id}`.",
    ).optional(),
    insightsDatasetConfig: z.string().describe(
      "Required. The resource identifier of the Storage Insights dataset configuration. Storage batch operations uses the latest snapshot from this dataset as the source to list and filter target objects. Format: `projects/{project_id}/locations/{location}/datasetConfigs/{dataset_config}`.",
    ).optional(),
    objectFilters: z.object({
      description: z.string().describe(
        "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
      ).optional(),
      expression: z.string().describe(
        "Textual representation of an expression in Common Expression Language syntax.",
      ).optional(),
      location: z.string().describe(
        "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
      ).optional(),
      title: z.string().describe(
        "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
      ).optional(),
    }).describe(
      'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
    ).optional(),
    project: z.string().describe(
      "Required. Project name of the objects to be transformed. e.g. projects/my-project or projects/123456.",
    ).optional(),
    snapshotTime: z.string().describe(
      "Output only. The snapshot time used by the job to read the Storage Insights dataset for bucket and object discovery. This field is populated by the service and reflects the exact timestamp of the dataset snapshot used.",
    ).optional(),
    targetLocations: z.object({
      locations: z.array(z.string()).describe(
        "Required. REQUIRED. A list of Cloud Storage locations (e.g., `us-central1`) to include in the job. If `snapshot_time` is omitted, the job automatically defaults to the most recent snapshot timestamp that is successfully populated in BOTH the `object_attributes_view` and `bucket_attributes_view` across ALL specified locations. For details on Storage Insights dataset snapshots and views, see: https://docs.cloud.google.com/storage/docs/insights/dataset-tables-and-schemas#schema",
      ).optional(),
      snapshotTime: z.string().describe(
        "Optional. OPTIONAL. The exact Storage Insights snapshot timestamp to use for the job compatible with the RFC 3339 format (e.g., `2024-01-02T03:04:05Z`). If specified, this exact snapshot must exist in BOTH the `object_attributes_view` and `bucket_attributes_view` for every location listed in `locations`. If the snapshot is missing from either view in any of the locations, the job fails.",
      ).optional(),
    }).describe(
      "Describes the Cloud Storage locations to include in a ProjectSource job.",
    ).optional(),
  }).describe(
    "Describes the project source where the objects satisfying the filters will be transformed.",
  ).optional(),
  putMetadata: z.object({
    cacheControl: z.string().describe(
      "Optional. Updates the objects `Cache-Control` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. Additionally, the value for `Custom-Time` can't decrease. For details, see [Cache-Control](https://cloud.google.com/storage/docs/metadata#caching_data).",
    ).optional(),
    contentDisposition: z.string().describe(
      "Optional. Updates objects `Content-Disposition` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see [Content-Disposition](https://cloud.google.com/storage/docs/metadata#content-disposition).",
    ).optional(),
    contentEncoding: z.string().describe(
      "Optional. Updates the objects `Content-Encoding` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see [Content-Encoding](https://cloud.google.com/storage/docs/metadata#content-encoding).",
    ).optional(),
    contentLanguage: z.string().describe(
      "Optional. Updates the objects `Content-Language` fixed metadata. Metadata values must use ISO 639-1 language codes. The maximum length for metadata values is 100 characters. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see [Content-Language](https://cloud.google.com/storage/docs/metadata#content-language).",
    ).optional(),
    contentType: z.string().describe(
      "Optional. Updates objects `Content-Type` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see [Content-Type](https://cloud.google.com/storage/docs/metadata#content-type).",
    ).optional(),
    customMetadata: z.record(z.string(), z.string()).describe(
      "Optional. Updates the object's custom metadata. This operation adds or sets individual custom metadata key-value pairs. Keys specified with empty values have their values cleared. Existing custom metadata keys not included in the request remain unchanged. For details, see [Custom metadata](https://cloud.google.com/storage/docs/metadata#custom-metadata).",
    ).optional(),
    customTime: z.string().describe(
      "Optional. Updates the objects `Custom-Time` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. The time must be specified in RFC 3339 format, for example `YYYY-MM-DD'T'HH:MM:SS'Z'` or `YYYY-MM-DD'T'HH:MM:SS.SS'Z'`. For details, see [Custom-Time](https://cloud.google.com/storage/docs/metadata#custom-time).",
    ).optional(),
    objectRetention: z.object({
      retainUntilTime: z.string().describe(
        "Required. The object's retention expiration time, during which, the object is protected from being deleted or overwritten. The time must be specified in RFC 3339 format, for example `YYYY-MM-DD'T'HH:MM:SS'Z'` or `YYYY-MM-DD'T'HH:MM:SS.SS'Z'`. To clear an object's retention, both `retentionMode` and `retainUntilTime` must be left unset (omitted). Setting `retentionMode` to `RETENTION_MODE_UNSPECIFIED` is treated as a no-op. Unlike an unset field, it doesn't modify or clear the retention settings.",
      ).optional(),
      retentionMode: z.enum([
        "RETENTION_MODE_UNSPECIFIED",
        "LOCKED",
        "UNLOCKED",
      ]).describe("Required. The retention mode.").optional(),
    }).describe("Describes options for object retention update.").optional(),
  }).describe("Describes options for object metadata update.").optional(),
  putObjectHold: z.object({
    eventBasedHold: z.enum(["HOLD_STATUS_UNSPECIFIED", "SET", "UNSET"])
      .describe(
        "Required. Updates object event based holds state. When object event based hold is set, object can't be deleted or replaced. Resets object's time in the bucket for the purposes of the retention period.",
      ).optional(),
    temporaryHold: z.enum(["HOLD_STATUS_UNSPECIFIED", "SET", "UNSET"]).describe(
      "Required. Updates object temporary holds state. When object temporary hold is set, object can't be deleted or replaced.",
    ).optional(),
  }).describe("Describes options to update object hold.").optional(),
  rewriteObject: z.object({
    kmsKey: z.string().describe(
      "Optional. Resource name of the Cloud KMS key that is used to encrypt the object. The Cloud KMS key must be located in same location as the object. For details, see https://cloud.google.com/storage/docs/encryption/using-customer-managed-keys#add-object-key Format: `projects/{project_id}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}` For example: `projects/123456/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key`. The object will be rewritten and set with the specified KMS key.",
    ).optional(),
    storageClass: z.enum([
      "STORAGE_CLASS_UNSPECIFIED",
      "STANDARD",
      "NEARLINE",
      "COLDLINE",
      "ARCHIVE",
    ]).describe(
      "Optional. Rewrites the object to the specified storage class. Setting this field will perform a full byte copy of the object if the storage class is different from the object's current storage class. If Autoclass is enabled on the bucket, storage class changes are ignored by Cloud Storage.",
    ).optional(),
  }).describe("Describes options for object rewrite.").optional(),
  setObjectAcls: z.object({
    accessControlsUpdates: z.object({
      grants: z.array(z.object({
        entity: z.string().describe(
          "Required. The entity holding the permission, in one of the following forms: * `allUsers` * `allAuthenticatedUsers`",
        ).optional(),
        role: z.string().describe(
          "Required. The role to grant. Acceptable values are: * `READER` - gives read access to the object. * `OWNER` - gives owner access to the object.",
        ).optional(),
      })).describe(
        "Optional. Grants to add or update. If a grant for same entity exists, its role is updated.",
      ).optional(),
      removeEntities: z.array(z.string()).describe(
        "Optional. Entities for which all grants should be removed. An entity can't be in both `grants` and `remove_entities`.",
      ).optional(),
    }).describe(
      "Represents updates to existing access-control entries on an object.",
    ).optional(),
  }).describe("Describes options for setting object ACLs.").optional(),
  updateObjectCustomContext: z.object({
    clearAll: z.boolean().describe(
      "If set, must be set to true and all existing object custom contexts are deleted.",
    ).optional(),
    customContextUpdates: z.object({
      keysToClear: z.array(z.string()).describe(
        "Optional. Custom contexts to clear by key. A key can't be present in both `updates` and `keys_to_clear`.",
      ).optional(),
      updates: z.record(
        z.string(),
        z.object({
          value: z.string().describe(
            "The value of the object custom context. If set, `value` can't be an empty string because it is a required field in custom context. If unset, `value` is ignored and no changes are made to the `value` field of the custom context payload.",
          ).optional(),
        }),
      ).describe("Optional. Insert or update the existing custom contexts.")
        .optional(),
    }).describe(
      "Describes a collection of updates to apply to custom contexts identified by key.",
    ).optional(),
  }).describe("Describes options to update object custom contexts.").optional(),
  jobId: z.string().describe(
    "Required. A unique identifier for the job. `job_id` must be up to 128 characters and must include only characters available in DNS names, as defined by RFC-1123.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID in case you need to retry your request. Requests with same `request_id` are ignored for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID isn't supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  bucketList: z.object({
    buckets: z.array(z.object({
      bucket: z.string(),
      manifest: z.object({
        manifestLocation: z.string(),
      }),
      prefixList: z.object({
        includedObjectPrefixes: z.array(z.unknown()),
      }),
    })),
  }).optional(),
  completeTime: z.string().optional(),
  counters: z.object({
    failedObjectCount: z.string(),
    objectCustomContextsCreated: z.string(),
    objectCustomContextsDeleted: z.string(),
    objectCustomContextsUpdated: z.string(),
    succeededObjectCount: z.string(),
    totalBytesFound: z.string(),
    totalBytesTransformed: z.string(),
    totalObjectCount: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  deleteObject: z.object({
    permanentObjectDeletionEnabled: z.boolean(),
  }).optional(),
  description: z.string().optional(),
  dryRun: z.boolean().optional(),
  errorSummaries: z.array(z.object({
    errorCode: z.string(),
    errorCount: z.string(),
    errorLogEntries: z.array(z.object({
      errorDetails: z.array(z.unknown()),
      objectUri: z.string(),
    })),
  })).optional(),
  isMultiBucketJob: z.boolean().optional(),
  loggingConfig: z.object({
    logActionStates: z.array(z.string()),
    logActions: z.array(z.string()),
  }).optional(),
  name: z.string(),
  projectSource: z.object({
    bucketFilters: z.object({
      description: z.string(),
      expression: z.string(),
      location: z.string(),
      title: z.string(),
    }),
    dryRunJobId: z.string(),
    insightsDatasetConfig: z.string(),
    objectFilters: z.object({
      description: z.string(),
      expression: z.string(),
      location: z.string(),
      title: z.string(),
    }),
    project: z.string(),
    snapshotTime: z.string(),
    targetLocations: z.object({
      locations: z.array(z.string()),
      snapshotTime: z.string(),
    }),
  }).optional(),
  putMetadata: z.object({
    cacheControl: z.string(),
    contentDisposition: z.string(),
    contentEncoding: z.string(),
    contentLanguage: z.string(),
    contentType: z.string(),
    customMetadata: z.record(z.string(), z.unknown()),
    customTime: z.string(),
    objectRetention: z.object({
      retainUntilTime: z.string(),
      retentionMode: z.string(),
    }),
  }).optional(),
  putObjectHold: z.object({
    eventBasedHold: z.string(),
    temporaryHold: z.string(),
  }).optional(),
  rewriteObject: z.object({
    kmsKey: z.string(),
    storageClass: z.string(),
  }).optional(),
  scheduleTime: z.string().optional(),
  setObjectAcls: z.object({
    accessControlsUpdates: z.object({
      grants: z.array(z.object({
        entity: z.string(),
        role: z.string(),
      })),
      removeEntities: z.array(z.string()),
    }),
  }).optional(),
  state: z.string().optional(),
  updateObjectCustomContext: z.object({
    clearAll: z.boolean(),
    customContextUpdates: z.object({
      keysToClear: z.array(z.string()),
      updates: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  bucketList: z.object({
    buckets: z.array(z.object({
      bucket: z.string().describe(
        "Required. Bucket name for the objects to be transformed.",
      ).optional(),
      manifest: z.object({
        manifestLocation: z.string().describe(
          "Required. Specify the manifest file location. The format of manifest location can be an absolute path to the object in the format of `gs://bucket_name/path/object_name`. For example, `gs://bucket_name/path/object_name.csv`. Alternatively, you can specify an absolute path with a single wildcard character in the file name, for example `gs://bucket_name/path/file_name*.csv`. If the manifest location is specified with a wildcard, objects in all manifest files matching the pattern will be acted upon. The manifest is a CSV file, uploaded to Cloud Storage, that contains one object or a list of objects that you want to process. Each row in the manifest must include the `bucket` and `name` of the object. You can optionally specify the `generation` of the object. If you don't specify the `generation`, the current version of the object is used. You can optionally include a header row with the following format: `bucket,name,generation`. For example, bucket,name,generation bucket_1,object_1,generation_1 bucket_1,object_2,generation_2 bucket_1,object_3,generation_3 Note: The manifest file must specify only objects within the bucket provided to the job. Rows referencing objects in other buckets are ignored.",
        ).optional(),
      }).describe("Describes list of objects to be transformed.").optional(),
      prefixList: z.object({
        includedObjectPrefixes: z.array(z.unknown()).describe(
          "Optional. Specify one or more object prefixes. For example: * To match one object, use a single prefix, `prefix1`. * To match multiple objects, use comma-separated prefixes, `prefix1, prefix2`. * To match all objects, use an empty prefix, `''`",
        ).optional(),
      }).describe("Describes prefixes of objects to be transformed.")
        .optional(),
    })).describe(
      "Required. List of buckets and their objects to be transformed. You can specify only one bucket per job. If multiple buckets are specified, an error occurs.",
    ).optional(),
  }).describe("Describes list of buckets and their objects to be transformed.")
    .optional(),
  counters: z.object({
    failedObjectCount: z.string().describe(
      "Output only. The number of objects that failed due to user errors or service errors.",
    ).optional(),
    objectCustomContextsCreated: z.string().describe(
      "Output only. Number of object custom contexts created. This field is only populated for jobs with the UpdateObjectCustomContext transformation.",
    ).optional(),
    objectCustomContextsDeleted: z.string().describe(
      "Output only. Number of object custom contexts deleted. This field is only populated for jobs with the UpdateObjectCustomContext transformation.",
    ).optional(),
    objectCustomContextsUpdated: z.string().describe(
      "Output only. Number of object custom contexts updated. This counter tracks custom contexts where the key already existed, but the payload was modified. This field is only populated for jobs with the UpdateObjectCustomContext transformation.",
    ).optional(),
    succeededObjectCount: z.string().describe(
      "Output only. Number of objects completed.",
    ).optional(),
    totalBytesFound: z.string().describe(
      "Output only. Number of bytes found from source. This field is only populated for jobs with a prefix list object configuration.",
    ).optional(),
    totalBytesTransformed: z.string().describe(
      "Output only. The total number of bytes affected by the transformation. For example, this counts bytes deleted for `DeleteObject` operations and bytes rewritten for `RewriteObject` operations.",
    ).optional(),
    totalObjectCount: z.string().describe(
      "Output only. Number of objects listed.",
    ).optional(),
  }).describe("Describes details about the progress of the job.").optional(),
  deleteObject: z.object({
    permanentObjectDeletionEnabled: z.boolean().describe(
      "Required. Controls deletion behavior when versioning is enabled for the object's bucket. If true, both live and noncurrent objects will be permanently deleted. Otherwise live objects in versioned buckets will become noncurrent and objects that were already noncurrent will be skipped. This setting doesn't have any impact on the Soft Delete feature. All objects deleted by this service can be be restored for the duration of the Soft Delete retention duration if enabled. If enabled and the manifest doesn't specify an object's generation, a `GetObjectMetadata` call is made to determine the live object generation.",
    ).optional(),
  }).describe("Describes options to delete an object.").optional(),
  description: z.string().describe(
    "Optional. A user-provided description for the job. Maximum length: 1024 bytes when unicode-encoded.",
  ).optional(),
  dryRun: z.boolean().describe(
    "Optional. If true, the job runs in dry run mode, returning the total object count and, if the object configuration is a prefix list, the bytes found from source. No transformations are performed.",
  ).optional(),
  loggingConfig: z.object({
    logActionStates: z.array(
      z.enum(["LOGGABLE_ACTION_STATE_UNSPECIFIED", "SUCCEEDED", "FAILED"]),
    ).describe(
      "Required. States in which Action are logged.If empty, no logs are generated.",
    ).optional(),
    logActions: z.array(z.enum(["LOGGABLE_ACTION_UNSPECIFIED", "TRANSFORM"]))
      .describe("Required. Specifies the actions to be logged.").optional(),
  }).describe("Specifies the Cloud Logging behavior.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the job. Format: `projects/{project_id}/locations/global/jobs/{job_id}`. For example: `projects/123456/locations/global/jobs/job01`. `job_id` is unique in a given project.",
  ).optional(),
  projectSource: z.object({
    bucketFilters: z.object({
      description: z.string().describe(
        "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
      ).optional(),
      expression: z.string().describe(
        "Textual representation of an expression in Common Expression Language syntax.",
      ).optional(),
      location: z.string().describe(
        "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
      ).optional(),
      title: z.string().describe(
        "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
      ).optional(),
    }).describe(
      'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
    ).optional(),
    dryRunJobId: z.string().describe(
      "Optional. The unique identifier of a dry run job to use as the baseline for the current job. Specifying this ID ensures the job is executed against the same set of objects validated during the dry run. The value corresponds to the {job_id} segment of the resource name: `projects/{project_id}/locations/{location}/jobs/{job_id}`.",
    ).optional(),
    insightsDatasetConfig: z.string().describe(
      "Required. The resource identifier of the Storage Insights dataset configuration. Storage batch operations uses the latest snapshot from this dataset as the source to list and filter target objects. Format: `projects/{project_id}/locations/{location}/datasetConfigs/{dataset_config}`.",
    ).optional(),
    objectFilters: z.object({
      description: z.string().describe(
        "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
      ).optional(),
      expression: z.string().describe(
        "Textual representation of an expression in Common Expression Language syntax.",
      ).optional(),
      location: z.string().describe(
        "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
      ).optional(),
      title: z.string().describe(
        "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
      ).optional(),
    }).describe(
      'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
    ).optional(),
    project: z.string().describe(
      "Required. Project name of the objects to be transformed. e.g. projects/my-project or projects/123456.",
    ).optional(),
    snapshotTime: z.string().describe(
      "Output only. The snapshot time used by the job to read the Storage Insights dataset for bucket and object discovery. This field is populated by the service and reflects the exact timestamp of the dataset snapshot used.",
    ).optional(),
    targetLocations: z.object({
      locations: z.array(z.string()).describe(
        "Required. REQUIRED. A list of Cloud Storage locations (e.g., `us-central1`) to include in the job. If `snapshot_time` is omitted, the job automatically defaults to the most recent snapshot timestamp that is successfully populated in BOTH the `object_attributes_view` and `bucket_attributes_view` across ALL specified locations. For details on Storage Insights dataset snapshots and views, see: https://docs.cloud.google.com/storage/docs/insights/dataset-tables-and-schemas#schema",
      ).optional(),
      snapshotTime: z.string().describe(
        "Optional. OPTIONAL. The exact Storage Insights snapshot timestamp to use for the job compatible with the RFC 3339 format (e.g., `2024-01-02T03:04:05Z`). If specified, this exact snapshot must exist in BOTH the `object_attributes_view` and `bucket_attributes_view` for every location listed in `locations`. If the snapshot is missing from either view in any of the locations, the job fails.",
      ).optional(),
    }).describe(
      "Describes the Cloud Storage locations to include in a ProjectSource job.",
    ).optional(),
  }).describe(
    "Describes the project source where the objects satisfying the filters will be transformed.",
  ).optional(),
  putMetadata: z.object({
    cacheControl: z.string().describe(
      "Optional. Updates the objects `Cache-Control` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. Additionally, the value for `Custom-Time` can't decrease. For details, see [Cache-Control](https://cloud.google.com/storage/docs/metadata#caching_data).",
    ).optional(),
    contentDisposition: z.string().describe(
      "Optional. Updates objects `Content-Disposition` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see [Content-Disposition](https://cloud.google.com/storage/docs/metadata#content-disposition).",
    ).optional(),
    contentEncoding: z.string().describe(
      "Optional. Updates the objects `Content-Encoding` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see [Content-Encoding](https://cloud.google.com/storage/docs/metadata#content-encoding).",
    ).optional(),
    contentLanguage: z.string().describe(
      "Optional. Updates the objects `Content-Language` fixed metadata. Metadata values must use ISO 639-1 language codes. The maximum length for metadata values is 100 characters. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see [Content-Language](https://cloud.google.com/storage/docs/metadata#content-language).",
    ).optional(),
    contentType: z.string().describe(
      "Optional. Updates objects `Content-Type` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see [Content-Type](https://cloud.google.com/storage/docs/metadata#content-type).",
    ).optional(),
    customMetadata: z.record(z.string(), z.string()).describe(
      "Optional. Updates the object's custom metadata. This operation adds or sets individual custom metadata key-value pairs. Keys specified with empty values have their values cleared. Existing custom metadata keys not included in the request remain unchanged. For details, see [Custom metadata](https://cloud.google.com/storage/docs/metadata#custom-metadata).",
    ).optional(),
    customTime: z.string().describe(
      "Optional. Updates the objects `Custom-Time` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. The time must be specified in RFC 3339 format, for example `YYYY-MM-DD'T'HH:MM:SS'Z'` or `YYYY-MM-DD'T'HH:MM:SS.SS'Z'`. For details, see [Custom-Time](https://cloud.google.com/storage/docs/metadata#custom-time).",
    ).optional(),
    objectRetention: z.object({
      retainUntilTime: z.string().describe(
        "Required. The object's retention expiration time, during which, the object is protected from being deleted or overwritten. The time must be specified in RFC 3339 format, for example `YYYY-MM-DD'T'HH:MM:SS'Z'` or `YYYY-MM-DD'T'HH:MM:SS.SS'Z'`. To clear an object's retention, both `retentionMode` and `retainUntilTime` must be left unset (omitted). Setting `retentionMode` to `RETENTION_MODE_UNSPECIFIED` is treated as a no-op. Unlike an unset field, it doesn't modify or clear the retention settings.",
      ).optional(),
      retentionMode: z.enum([
        "RETENTION_MODE_UNSPECIFIED",
        "LOCKED",
        "UNLOCKED",
      ]).describe("Required. The retention mode.").optional(),
    }).describe("Describes options for object retention update.").optional(),
  }).describe("Describes options for object metadata update.").optional(),
  putObjectHold: z.object({
    eventBasedHold: z.enum(["HOLD_STATUS_UNSPECIFIED", "SET", "UNSET"])
      .describe(
        "Required. Updates object event based holds state. When object event based hold is set, object can't be deleted or replaced. Resets object's time in the bucket for the purposes of the retention period.",
      ).optional(),
    temporaryHold: z.enum(["HOLD_STATUS_UNSPECIFIED", "SET", "UNSET"]).describe(
      "Required. Updates object temporary holds state. When object temporary hold is set, object can't be deleted or replaced.",
    ).optional(),
  }).describe("Describes options to update object hold.").optional(),
  rewriteObject: z.object({
    kmsKey: z.string().describe(
      "Optional. Resource name of the Cloud KMS key that is used to encrypt the object. The Cloud KMS key must be located in same location as the object. For details, see https://cloud.google.com/storage/docs/encryption/using-customer-managed-keys#add-object-key Format: `projects/{project_id}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}` For example: `projects/123456/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key`. The object will be rewritten and set with the specified KMS key.",
    ).optional(),
    storageClass: z.enum([
      "STORAGE_CLASS_UNSPECIFIED",
      "STANDARD",
      "NEARLINE",
      "COLDLINE",
      "ARCHIVE",
    ]).describe(
      "Optional. Rewrites the object to the specified storage class. Setting this field will perform a full byte copy of the object if the storage class is different from the object's current storage class. If Autoclass is enabled on the bucket, storage class changes are ignored by Cloud Storage.",
    ).optional(),
  }).describe("Describes options for object rewrite.").optional(),
  setObjectAcls: z.object({
    accessControlsUpdates: z.object({
      grants: z.array(z.object({
        entity: z.string().describe(
          "Required. The entity holding the permission, in one of the following forms: * `allUsers` * `allAuthenticatedUsers`",
        ).optional(),
        role: z.string().describe(
          "Required. The role to grant. Acceptable values are: * `READER` - gives read access to the object. * `OWNER` - gives owner access to the object.",
        ).optional(),
      })).describe(
        "Optional. Grants to add or update. If a grant for same entity exists, its role is updated.",
      ).optional(),
      removeEntities: z.array(z.string()).describe(
        "Optional. Entities for which all grants should be removed. An entity can't be in both `grants` and `remove_entities`.",
      ).optional(),
    }).describe(
      "Represents updates to existing access-control entries on an object.",
    ).optional(),
  }).describe("Describes options for setting object ACLs.").optional(),
  updateObjectCustomContext: z.object({
    clearAll: z.boolean().describe(
      "If set, must be set to true and all existing object custom contexts are deleted.",
    ).optional(),
    customContextUpdates: z.object({
      keysToClear: z.array(z.string()).describe(
        "Optional. Custom contexts to clear by key. A key can't be present in both `updates` and `keys_to_clear`.",
      ).optional(),
      updates: z.record(
        z.string(),
        z.object({
          value: z.string().describe(
            "The value of the object custom context. If set, `value` can't be an empty string because it is a required field in custom context. If unset, `value` is ignored and no changes are made to the `value` field of the custom context payload.",
          ).optional(),
        }),
      ).describe("Optional. Insert or update the existing custom contexts.")
        .optional(),
    }).describe(
      "Describes a collection of updates to apply to custom contexts identified by key.",
    ).optional(),
  }).describe("Describes options to update object custom contexts.").optional(),
  jobId: z.string().describe(
    "Required. A unique identifier for the job. `job_id` must be up to 128 characters and must include only characters available in DNS names, as defined by RFC-1123.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID in case you need to retry your request. Requests with same `request_id` are ignored for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID isn't supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Storage Batch Operations Jobs. Registered at `@swamp/gcp/storagebatchoperations/jobs`. */
export const model = {
  type: "@swamp/gcp/storagebatchoperations/jobs",
  version: "2026.06.03.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      toVersion: "2026.05.05.1",
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
      toVersion: "2026.06.03.1",
      description: "Added: projectSource, setObjectAcls",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The storage batch operations job description.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobs",
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
        if (g["bucketList"] !== undefined) body["bucketList"] = g["bucketList"];
        if (g["counters"] !== undefined) body["counters"] = g["counters"];
        if (g["deleteObject"] !== undefined) {
          body["deleteObject"] = g["deleteObject"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dryRun"] !== undefined) body["dryRun"] = g["dryRun"];
        if (g["loggingConfig"] !== undefined) {
          body["loggingConfig"] = g["loggingConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["projectSource"] !== undefined) {
          body["projectSource"] = g["projectSource"];
        }
        if (g["putMetadata"] !== undefined) {
          body["putMetadata"] = g["putMetadata"];
        }
        if (g["putObjectHold"] !== undefined) {
          body["putObjectHold"] = g["putObjectHold"];
        }
        if (g["rewriteObject"] !== undefined) {
          body["rewriteObject"] = g["rewriteObject"];
        }
        if (g["setObjectAcls"] !== undefined) {
          body["setObjectAcls"] = g["setObjectAcls"];
        }
        if (g["updateObjectCustomContext"] !== undefined) {
          body["updateObjectCustomContext"] = g["updateObjectCustomContext"];
        }
        if (g["jobId"] !== undefined) body["jobId"] = g["jobId"];
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
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
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
    delete: {
      description: "Delete the jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
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
      description: "List jobs resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filters results as defined by https://google.aip.dev/160.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Field to sort by. Supported fields are `name` and `create_time`.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The list page size. The default page size is 100.",
        ).optional(),
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
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "jobs",
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
    cancel: {
      description: "cancel",
      arguments: z.object({
        requestId: z.any().optional(),
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
        const result = await createResource(
          BASE_URL,
          {
            "id": "storagebatchoperations.projects.locations.jobs.cancel",
            "path": "v1/{+name}:cancel",
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
