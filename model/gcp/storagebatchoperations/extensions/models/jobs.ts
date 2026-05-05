// Auto-generated extension model for @swamp/gcp/storagebatchoperations/jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage Batch Operations Jobs.
 *
 * The Storage Batch Operations Job description.
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

const GlobalArgsSchema = z.object({
  bucketList: z.object({
    buckets: z.array(z.object({
      bucket: z.string().describe(
        "Required. Bucket name for the objects to be transformed.",
      ).optional(),
      manifest: z.object({
        manifestLocation: z.string().describe(
          "Required. `manifest_location` must contain the manifest source file that is a CSV file in a Google Cloud Storage bucket. Each row in the file must include the object details i.e. BucketId and Name. Generation may optionally be specified. When it is not specified the live object is acted upon. `manifest_location` should either be 1) An absolute path to the object in the format of `gs://bucket_name/path/file_name.csv`. 2) An absolute path with a single wildcard character in the file name, for example `gs://bucket_name/path/file_name*.csv`. If manifest location is specified with a wildcard, objects in all manifest files matching the pattern will be acted upon.",
        ).optional(),
      }).describe("Describes list of objects to be transformed.").optional(),
      prefixList: z.object({
        includedObjectPrefixes: z.array(z.unknown()).describe(
          "Optional. Include prefixes of the objects to be transformed. * Supports full object name * Supports prefix of the object name * Wildcards are not supported * Supports empty string for all objects in a bucket.",
        ).optional(),
      }).describe("Describes prefixes of objects to be transformed.")
        .optional(),
    })).describe(
      "Required. List of buckets and their objects to be transformed. Currently, only one bucket configuration is supported. If multiple buckets are specified, an error will be returned.",
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
      "Required. Controls deletion behavior when versioning is enabled for the object's bucket. If true both live and noncurrent objects will be permanently deleted. Otherwise live objects in versioned buckets will become noncurrent and objects that were already noncurrent will be skipped. This setting doesn't have any impact on the Soft Delete feature. All objects deleted by this service can be be restored for the duration of the Soft Delete retention duration if enabled. If enabled and the manifest doesn't specify an object's generation, a GetObjectMetadata call (a Class B operation) will be made to determine the live object generation.",
    ).optional(),
  }).describe("Describes options to delete an object.").optional(),
  description: z.string().describe(
    "Optional. A description provided by the user for the job. Its max length is 1024 bytes when Unicode-encoded.",
  ).optional(),
  dryRun: z.boolean().describe(
    "Optional. If true, the job will run in dry run mode, returning the total object count and, if the object configuration is a prefix list, the bytes found from source. No transformations will be performed.",
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
    'Identifier. The resource name of the Job. job_id is unique within the project, that is either set by the customer or defined by the service. Format: projects/{project}/locations/global/jobs/{job_id}. For example: "projects/123456/locations/global/jobs/job01".',
  ).optional(),
  putMetadata: z.object({
    cacheControl: z.string().describe(
      "Optional. Updates objects Cache-Control fixed metadata. Unset values will be ignored. Set empty values to clear the metadata. Additionally, the value for Custom-Time cannot decrease. Refer to documentation in https://cloud.google.com/storage/docs/metadata#caching_data.",
    ).optional(),
    contentDisposition: z.string().describe(
      "Optional. Updates objects Content-Disposition fixed metadata. Unset values will be ignored. Set empty values to clear the metadata. Refer https://cloud.google.com/storage/docs/metadata#content-disposition for additional documentation.",
    ).optional(),
    contentEncoding: z.string().describe(
      "Optional. Updates objects Content-Encoding fixed metadata. Unset values will be ignored. Set empty values to clear the metadata. Refer to documentation in https://cloud.google.com/storage/docs/metadata#content-encoding.",
    ).optional(),
    contentLanguage: z.string().describe(
      "Optional. Updates objects Content-Language fixed metadata. Refer to ISO 639-1 language codes for typical values of this metadata. Max length 100 characters. Unset values will be ignored. Set empty values to clear the metadata. Refer to documentation in https://cloud.google.com/storage/docs/metadata#content-language.",
    ).optional(),
    contentType: z.string().describe(
      "Optional. Updates objects Content-Type fixed metadata. Unset values will be ignored. Set empty values to clear the metadata. Refer to documentation in https://cloud.google.com/storage/docs/metadata#content-type",
    ).optional(),
    customMetadata: z.record(z.string(), z.string()).describe(
      "Optional. Updates objects custom metadata. Adds or sets individual custom metadata key value pairs on objects. Keys that are set with empty custom metadata values will have its value cleared. Existing custom metadata not specified with this flag is not changed. Refer to documentation in https://cloud.google.com/storage/docs/metadata#custom-metadata",
    ).optional(),
    customTime: z.string().describe(
      "Optional. Updates objects Custom-Time fixed metadata. Unset values will be ignored. Set empty values to clear the metadata. Refer to documentation in https://cloud.google.com/storage/docs/metadata#custom-time.",
    ).optional(),
    objectRetention: z.object({
      retainUntilTime: z.string().describe(
        "Required. The time when the object will be retained until. UNSET will clear the retention. Must be specified in RFC 3339 format e.g. YYYY-MM-DD'T'HH:MM:SS.SS'Z' or YYYY-MM-DD'T'HH:MM:SS'Z'.",
      ).optional(),
      retentionMode: z.enum([
        "RETENTION_MODE_UNSPECIFIED",
        "LOCKED",
        "UNLOCKED",
      ]).describe("Required. The retention mode of the object.").optional(),
    }).describe("Describes options for object retention update.").optional(),
  }).describe("Describes options for object metadata update.").optional(),
  putObjectHold: z.object({
    eventBasedHold: z.enum(["HOLD_STATUS_UNSPECIFIED", "SET", "UNSET"])
      .describe(
        "Required. Updates object event based holds state. When object event based hold is set, object cannot be deleted or replaced. Resets object's time in the bucket for the purposes of the retention period.",
      ).optional(),
    temporaryHold: z.enum(["HOLD_STATUS_UNSPECIFIED", "SET", "UNSET"]).describe(
      "Required. Updates object temporary holds state. When object temporary hold is set, object cannot be deleted or replaced.",
    ).optional(),
  }).describe("Describes options to update object hold.").optional(),
  rewriteObject: z.object({
    kmsKey: z.string().describe(
      'Required. Resource name of the Cloud KMS key that will be used to encrypt the object. The Cloud KMS key must be located in same location as the object. Refer to https://cloud.google.com/storage/docs/encryption/using-customer-managed-keys#add-object-key for additional documentation. Format: projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key} For example: "projects/123456/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key". The object will be rewritten and set with the specified KMS key.',
    ).optional(),
  }).describe("Describes options for object rewrite.").optional(),
  updateObjectCustomContext: z.object({
    clearAll: z.boolean().describe(
      "If set, must be set to true and all existing object custom contexts will be deleted.",
    ).optional(),
    customContextUpdates: z.object({
      keysToClear: z.array(z.string()).describe(
        "Optional. Custom contexts to clear by key. A key cannot be present in both `updates` and `keys_to_clear`.",
      ).optional(),
      updates: z.record(
        z.string(),
        z.object({
          value: z.string().describe(
            "The value of the object custom context. If set, `value` must NOT be an empty string since it is a required field in custom context. If unset, `value` will be ignored and no changes will be made to the `value` field of the custom context payload.",
          ).optional(),
        }),
      ).describe("Optional. Insert or update the existing custom contexts.")
        .optional(),
    }).describe(
      "Describes a collection of updates to apply to custom contexts identified by key.",
    ).optional(),
  }).describe("Describes options to update object custom contexts.").optional(),
  jobId: z.string().describe(
    "Required. The optional `job_id` for this Job. If not specified, an id is generated. `job_id` should be no more than 128 characters and must include only characters available in DNS names, as defined by RFC-1123.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID in case you need to retry your request. Requests with same `request_id` will be ignored for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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
  }).optional(),
  scheduleTime: z.string().optional(),
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
          "Required. `manifest_location` must contain the manifest source file that is a CSV file in a Google Cloud Storage bucket. Each row in the file must include the object details i.e. BucketId and Name. Generation may optionally be specified. When it is not specified the live object is acted upon. `manifest_location` should either be 1) An absolute path to the object in the format of `gs://bucket_name/path/file_name.csv`. 2) An absolute path with a single wildcard character in the file name, for example `gs://bucket_name/path/file_name*.csv`. If manifest location is specified with a wildcard, objects in all manifest files matching the pattern will be acted upon.",
        ).optional(),
      }).describe("Describes list of objects to be transformed.").optional(),
      prefixList: z.object({
        includedObjectPrefixes: z.array(z.unknown()).describe(
          "Optional. Include prefixes of the objects to be transformed. * Supports full object name * Supports prefix of the object name * Wildcards are not supported * Supports empty string for all objects in a bucket.",
        ).optional(),
      }).describe("Describes prefixes of objects to be transformed.")
        .optional(),
    })).describe(
      "Required. List of buckets and their objects to be transformed. Currently, only one bucket configuration is supported. If multiple buckets are specified, an error will be returned.",
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
      "Required. Controls deletion behavior when versioning is enabled for the object's bucket. If true both live and noncurrent objects will be permanently deleted. Otherwise live objects in versioned buckets will become noncurrent and objects that were already noncurrent will be skipped. This setting doesn't have any impact on the Soft Delete feature. All objects deleted by this service can be be restored for the duration of the Soft Delete retention duration if enabled. If enabled and the manifest doesn't specify an object's generation, a GetObjectMetadata call (a Class B operation) will be made to determine the live object generation.",
    ).optional(),
  }).describe("Describes options to delete an object.").optional(),
  description: z.string().describe(
    "Optional. A description provided by the user for the job. Its max length is 1024 bytes when Unicode-encoded.",
  ).optional(),
  dryRun: z.boolean().describe(
    "Optional. If true, the job will run in dry run mode, returning the total object count and, if the object configuration is a prefix list, the bytes found from source. No transformations will be performed.",
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
    'Identifier. The resource name of the Job. job_id is unique within the project, that is either set by the customer or defined by the service. Format: projects/{project}/locations/global/jobs/{job_id}. For example: "projects/123456/locations/global/jobs/job01".',
  ).optional(),
  putMetadata: z.object({
    cacheControl: z.string().describe(
      "Optional. Updates objects Cache-Control fixed metadata. Unset values will be ignored. Set empty values to clear the metadata. Additionally, the value for Custom-Time cannot decrease. Refer to documentation in https://cloud.google.com/storage/docs/metadata#caching_data.",
    ).optional(),
    contentDisposition: z.string().describe(
      "Optional. Updates objects Content-Disposition fixed metadata. Unset values will be ignored. Set empty values to clear the metadata. Refer https://cloud.google.com/storage/docs/metadata#content-disposition for additional documentation.",
    ).optional(),
    contentEncoding: z.string().describe(
      "Optional. Updates objects Content-Encoding fixed metadata. Unset values will be ignored. Set empty values to clear the metadata. Refer to documentation in https://cloud.google.com/storage/docs/metadata#content-encoding.",
    ).optional(),
    contentLanguage: z.string().describe(
      "Optional. Updates objects Content-Language fixed metadata. Refer to ISO 639-1 language codes for typical values of this metadata. Max length 100 characters. Unset values will be ignored. Set empty values to clear the metadata. Refer to documentation in https://cloud.google.com/storage/docs/metadata#content-language.",
    ).optional(),
    contentType: z.string().describe(
      "Optional. Updates objects Content-Type fixed metadata. Unset values will be ignored. Set empty values to clear the metadata. Refer to documentation in https://cloud.google.com/storage/docs/metadata#content-type",
    ).optional(),
    customMetadata: z.record(z.string(), z.string()).describe(
      "Optional. Updates objects custom metadata. Adds or sets individual custom metadata key value pairs on objects. Keys that are set with empty custom metadata values will have its value cleared. Existing custom metadata not specified with this flag is not changed. Refer to documentation in https://cloud.google.com/storage/docs/metadata#custom-metadata",
    ).optional(),
    customTime: z.string().describe(
      "Optional. Updates objects Custom-Time fixed metadata. Unset values will be ignored. Set empty values to clear the metadata. Refer to documentation in https://cloud.google.com/storage/docs/metadata#custom-time.",
    ).optional(),
    objectRetention: z.object({
      retainUntilTime: z.string().describe(
        "Required. The time when the object will be retained until. UNSET will clear the retention. Must be specified in RFC 3339 format e.g. YYYY-MM-DD'T'HH:MM:SS.SS'Z' or YYYY-MM-DD'T'HH:MM:SS'Z'.",
      ).optional(),
      retentionMode: z.enum([
        "RETENTION_MODE_UNSPECIFIED",
        "LOCKED",
        "UNLOCKED",
      ]).describe("Required. The retention mode of the object.").optional(),
    }).describe("Describes options for object retention update.").optional(),
  }).describe("Describes options for object metadata update.").optional(),
  putObjectHold: z.object({
    eventBasedHold: z.enum(["HOLD_STATUS_UNSPECIFIED", "SET", "UNSET"])
      .describe(
        "Required. Updates object event based holds state. When object event based hold is set, object cannot be deleted or replaced. Resets object's time in the bucket for the purposes of the retention period.",
      ).optional(),
    temporaryHold: z.enum(["HOLD_STATUS_UNSPECIFIED", "SET", "UNSET"]).describe(
      "Required. Updates object temporary holds state. When object temporary hold is set, object cannot be deleted or replaced.",
    ).optional(),
  }).describe("Describes options to update object hold.").optional(),
  rewriteObject: z.object({
    kmsKey: z.string().describe(
      'Required. Resource name of the Cloud KMS key that will be used to encrypt the object. The Cloud KMS key must be located in same location as the object. Refer to https://cloud.google.com/storage/docs/encryption/using-customer-managed-keys#add-object-key for additional documentation. Format: projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key} For example: "projects/123456/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key". The object will be rewritten and set with the specified KMS key.',
    ).optional(),
  }).describe("Describes options for object rewrite.").optional(),
  updateObjectCustomContext: z.object({
    clearAll: z.boolean().describe(
      "If set, must be set to true and all existing object custom contexts will be deleted.",
    ).optional(),
    customContextUpdates: z.object({
      keysToClear: z.array(z.string()).describe(
        "Optional. Custom contexts to clear by key. A key cannot be present in both `updates` and `keys_to_clear`.",
      ).optional(),
      updates: z.record(
        z.string(),
        z.object({
          value: z.string().describe(
            "The value of the object custom context. If set, `value` must NOT be an empty string since it is a required field in custom context. If unset, `value` will be ignored and no changes will be made to the `value` field of the custom context payload.",
          ).optional(),
        }),
      ).describe("Optional. Insert or update the existing custom contexts.")
        .optional(),
    }).describe(
      "Describes a collection of updates to apply to custom contexts identified by key.",
    ).optional(),
  }).describe("Describes options to update object custom contexts.").optional(),
  jobId: z.string().describe(
    "Required. The optional `job_id` for this Job. If not specified, an id is generated. `job_id` should be no more than 128 characters and must include only characters available in DNS names, as defined by RFC-1123.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID in case you need to retry your request. Requests with same `request_id` will be ignored for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Storage Batch Operations Jobs. Registered at `@swamp/gcp/storagebatchoperations/jobs`. */
export const model = {
  type: "@swamp/gcp/storagebatchoperations/jobs",
  version: "2026.05.05.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The Storage Batch Operations Job description.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
        if (g["putMetadata"] !== undefined) {
          body["putMetadata"] = g["putMetadata"];
        }
        if (g["putObjectHold"] !== undefined) {
          body["putObjectHold"] = g["putObjectHold"];
        }
        if (g["rewriteObject"] !== undefined) {
          body["rewriteObject"] = g["rewriteObject"];
        }
        if (g["updateObjectCustomContext"] !== undefined) {
          body["updateObjectCustomContext"] = g["updateObjectCustomContext"];
        }
        if (g["jobId"] !== undefined) body["jobId"] = g["jobId"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
          String(g["parent"] ?? ""),
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
          String(g["parent"] ?? ""),
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
            String(g["parent"] ?? ""),
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
    cancel: {
      description: "cancel",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
