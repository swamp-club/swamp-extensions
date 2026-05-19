// Auto-generated extension model for @swamp/gcp/storagetransfer/transferjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage Transfer TransferJobs.
 *
 * This resource represents the configuration of a transfer job that runs periodically.
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

const BASE_URL = "https://storagetransfer.googleapis.com/";

const GET_CONFIG = {
  "id": "storagetransfer.transferJobs.get",
  "path": "v1/{+jobName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "jobName",
    "projectId",
  ],
  "parameters": {
    "jobName": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "storagetransfer.transferJobs.create",
  "path": "v1/transferJobs",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const PATCH_CONFIG = {
  "id": "storagetransfer.transferJobs.patch",
  "path": "v1/{+jobName}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "jobName",
  ],
  "parameters": {
    "jobName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "storagetransfer.transferJobs.delete",
  "path": "v1/{+jobName}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "jobName",
    "projectId",
  ],
  "parameters": {
    "jobName": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "A description provided by the user for the job. Its max length is 1024 bytes when Unicode-encoded.",
  ).optional(),
  eventStream: z.object({
    eventStreamExpirationTime: z.string().describe(
      "Specifies the data and time at which Storage Transfer Service stops listening for events from this stream. After this time, any transfers in progress will complete, but no new transfers are initiated.",
    ).optional(),
    eventStreamStartTime: z.string().describe(
      "Specifies the date and time that Storage Transfer Service starts listening for events from this stream. If no start time is specified or start time is in the past, Storage Transfer Service starts listening immediately.",
    ).optional(),
    name: z.string().describe(
      "Required. Specifies a unique name of the resource such as AWS SQS ARN in the form 'arn:aws:sqs:region:account_id:queue_name', or Pub/Sub subscription resource name in the form 'projects/{project}/subscriptions/{sub}'.",
    ).optional(),
  }).describe(
    "Specifies the Event-driven transfer options. Event-driven transfers listen to an event stream to transfer updated files.",
  ).optional(),
  latestOperationName: z.string().describe(
    "The name of the most recently started TransferOperation of this JobConfig. Present if a TransferOperation has been created for this JobConfig.",
  ).optional(),
  loggingConfig: z.object({
    enableOnpremGcsTransferLogs: z.boolean().describe(
      "For PosixFilesystem transfers, enables [file system transfer logs](https://cloud.google.com/storage-transfer/docs/on-prem-transfer-log-format) instead of, or in addition to, Cloud Logging. This option ignores [LoggableAction] and [LoggableActionState]. If these are set, Cloud Logging will also be enabled for this transfer.",
    ).optional(),
    logActionStates: z.array(
      z.enum([
        "LOGGABLE_ACTION_STATE_UNSPECIFIED",
        "SUCCEEDED",
        "FAILED",
        "SKIPPED",
      ]),
    ).describe(
      "States in which `log_actions` are logged. If empty, no logs are generated.",
    ).optional(),
    logActions: z.array(
      z.enum(["LOGGABLE_ACTION_UNSPECIFIED", "FIND", "DELETE", "COPY"]),
    ).describe(
      "Specifies the actions to be logged. If empty, no logs are generated.",
    ).optional(),
  }).describe(
    "Specifies the logging behavior for transfer operations. Logs can be sent to Cloud Logging for all transfer types. See [Read transfer logs](https://cloud.google.com/storage-transfer/docs/read-transfer-logs) for details.",
  ).optional(),
  name: z.string().describe(
    'A unique name (within the transfer project) assigned when the job is created. If this field is empty in a CreateTransferJobRequest, Storage Transfer Service assigns a unique name. Otherwise, the specified name is used as the unique name for this job. If the specified name is in use by a job, the creation request fails with an ALREADY_EXISTS error. This name must start with `"transferJobs/"` prefix and end with a letter or a number, and should be no more than 128 characters. For transfers involving PosixFilesystem, this name must start with `transferJobs/OPI` specifically. For all other transfer types, this name must not start with `transferJobs/OPI`. Non-PosixFilesystem example: `"transferJobs/^(?!OPI)[A-Za-z0-9-._~]*[A-Za-z0-9]$"` PosixFilesystem example: `"transferJobs/OPI^[A-Za-z0-9-._~]*[A-Za-z0-9]$"` Applications must not rely on the enforcement of naming requirements involving OPI. Invalid job names fail with an INVALID_ARGUMENT error.',
  ).optional(),
  notificationConfig: z.object({
    eventTypes: z.array(
      z.enum([
        "EVENT_TYPE_UNSPECIFIED",
        "TRANSFER_OPERATION_SUCCESS",
        "TRANSFER_OPERATION_FAILED",
        "TRANSFER_OPERATION_ABORTED",
      ]),
    ).describe(
      "Event types for which a notification is desired. If empty, send notifications for all event types.",
    ).optional(),
    payloadFormat: z.enum(["PAYLOAD_FORMAT_UNSPECIFIED", "NONE", "JSON"])
      .describe(
        "Required. The desired format of the notification message payloads.",
      ).optional(),
    pubsubTopic: z.string().describe(
      "Required. The `Topic.name` of the Pub/Sub topic to which to publish notifications. Must be of the format: `projects/{project}/topics/{topic}`. Not matching this format results in an INVALID_ARGUMENT error.",
    ).optional(),
  }).describe(
    'Specification to configure notifications published to Pub/Sub. Notifications are published to the customer-provided topic using the following `PubsubMessage.attributes`: * `"eventType"`: one of the EventType values * `"payloadFormat"`: one of the PayloadFormat values * `"projectId"`: the project_id of the `TransferOperation` * `"transferJobName"`: the transfer_job_name of the `TransferOperation` * `"transferOperationName"`: the name of the `TransferOperation` The `PubsubMessage.data` contains a TransferOperation resource formatted according to the specified `PayloadFormat`.',
  ).optional(),
  projectId: z.string().describe(
    "Required. The ID of the Google Cloud project that owns the job.",
  ).optional(),
  replicationSpec: z.object({
    gcsDataSink: z.object({
      bucketName: z.string().describe(
        "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
      ).optional(),
      managedFolderTransferEnabled: z.boolean().describe(
        "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
      ).optional(),
    }).describe(
      "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
    ).optional(),
    gcsDataSource: z.object({
      bucketName: z.string().describe(
        "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
      ).optional(),
      managedFolderTransferEnabled: z.boolean().describe(
        "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
      ).optional(),
    }).describe(
      "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
    ).optional(),
    objectConditions: z.object({
      excludePrefixes: z.array(z.string()).describe(
        "If you specify `exclude_prefixes`, Storage Transfer Service uses the items in the `exclude_prefixes` array to determine which objects to exclude from a transfer. Objects must not start with one of the matching `exclude_prefixes` for inclusion in a transfer. The following are requirements of `exclude_prefixes`: * Each exclude-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each exclude-prefix must omit the leading slash. For example, to exclude the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the exclude-prefix as `logs/y=2015/requests.gz`. * None of the exclude-prefix values can be empty, if specified. * Each exclude-prefix must exclude a distinct portion of the object namespace. No exclude-prefix may be a prefix of another exclude-prefix. * If include_prefixes is specified, then each exclude-prefix must start with the value of a path explicitly included by `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
      ).optional(),
      includePrefixes: z.array(z.string()).describe(
        "If you specify `include_prefixes`, Storage Transfer Service uses the items in the `include_prefixes` array to determine which objects to include in a transfer. Objects must start with one of the matching `include_prefixes` for inclusion in the transfer. If exclude_prefixes is specified, objects must not start with any of the `exclude_prefixes` specified for inclusion in the transfer. The following are requirements of `include_prefixes`: * Each include-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each include-prefix must omit the leading slash. For example, to include the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as `logs/y=2015/requests.gz`. * None of the include-prefix values can be empty, if specified. * Each include-prefix must include a distinct portion of the object namespace. No include-prefix may be a prefix of another include-prefix. The max size of `include_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
      ).optional(),
      lastModifiedBefore: z.string().describe(
        'If specified, only objects with a "last modification time" before this timestamp and objects that don\'t have a "last modification time" are transferred.',
      ).optional(),
      lastModifiedSince: z.string().describe(
        'If specified, only objects with a "last modification time" on or after this timestamp and objects that don\'t have a "last modification time" are transferred. The `last_modified_since` and `last_modified_before` fields can be used together for chunked data processing. For example, consider a script that processes each day\'s worth of data at a time. For that you\'d set each of the fields as follows: * `last_modified_since` to the start of the day * `last_modified_before` to the end of the day',
      ).optional(),
      matchGlob: z.string().describe(
        "Optional. If specified, only objects matching this glob are transferred.",
      ).optional(),
      maxTimeElapsedSinceLastModification: z.string().describe(
        'Ensures that objects are not transferred if a specific maximum time has elapsed since the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation`and the "last modification time" of the object is less than the value of max_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
      ).optional(),
      minTimeElapsedSinceLastModification: z.string().describe(
        'Ensures that objects are not transferred until a specific minimum time has elapsed after the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation` and the "last modification time" of the object is equal to or greater than the value of min_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
      ).optional(),
    }).describe(
      'Conditions that determine which objects are transferred. Applies only to Cloud Data Sources such as S3, Azure, and Cloud Storage. The "last modification time" refers to the time of the last change to the object\'s content or metadata — specifically, this is the `updated` property of Cloud Storage objects, the `LastModified` field of S3 objects, and the `Last-Modified` header of Azure blobs. For S3 objects, the `LastModified` value is the time the object begins uploading. If the object meets your "last modification time" criteria, but has not finished uploading, the object is not transferred. See [Transfer from Amazon S3 to Cloud Storage](https://cloud.google.com/storage-transfer/docs/create-transfers/agentless/s3#transfer_options) for more information. Transfers with a PosixFilesystem source or destination don\'t support `ObjectConditions`.',
    ).optional(),
    transferOptions: z.object({
      deleteObjectsFromSourceAfterTransfer: z.boolean().describe(
        "Whether objects should be deleted from the source after they are transferred to the sink. **Note:** This option and delete_objects_unique_in_sink are mutually exclusive.",
      ).optional(),
      deleteObjectsUniqueInSink: z.boolean().describe(
        "Whether objects that exist only in the sink should be deleted. **Note:** This option and delete_objects_from_source_after_transfer are mutually exclusive.",
      ).optional(),
      metadataOptions: z.object({
        acl: z.enum([
          "ACL_UNSPECIFIED",
          "ACL_DESTINATION_BUCKET_DEFAULT",
          "ACL_PRESERVE",
        ]).describe(
          "Specifies how each object's ACLs should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as ACL_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        gid: z.enum(["GID_UNSPECIFIED", "GID_SKIP", "GID_NUMBER"]).describe(
          "Specifies how each file's POSIX group ID (GID) attribute should be handled by the transfer. By default, GID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
        kmsKey: z.enum([
          "KMS_KEY_UNSPECIFIED",
          "KMS_KEY_DESTINATION_BUCKET_DEFAULT",
          "KMS_KEY_PRESERVE",
        ]).describe(
          "Specifies how each object's Cloud KMS customer-managed encryption key (CMEK) is preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as KMS_KEY_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        mode: z.enum(["MODE_UNSPECIFIED", "MODE_SKIP", "MODE_PRESERVE"])
          .describe(
            "Specifies how each file's mode attribute should be handled by the transfer. By default, mode is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
        storageClass: z.enum([
          "STORAGE_CLASS_UNSPECIFIED",
          "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT",
          "STORAGE_CLASS_PRESERVE",
          "STORAGE_CLASS_STANDARD",
          "STORAGE_CLASS_NEARLINE",
          "STORAGE_CLASS_COLDLINE",
          "STORAGE_CLASS_ARCHIVE",
        ]).describe(
          "Specifies the storage class to set on objects being transferred to Google Cloud Storage buckets. If unspecified, the default behavior is the same as STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        symlink: z.enum([
          "SYMLINK_UNSPECIFIED",
          "SYMLINK_SKIP",
          "SYMLINK_PRESERVE",
        ]).describe(
          "Specifies how symlinks should be handled by the transfer. By default, symlinks are not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
        temporaryHold: z.enum([
          "TEMPORARY_HOLD_UNSPECIFIED",
          "TEMPORARY_HOLD_SKIP",
          "TEMPORARY_HOLD_PRESERVE",
        ]).describe(
          "Specifies how each object's temporary hold status should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as TEMPORARY_HOLD_PRESERVE.",
        ).optional(),
        timeCreated: z.enum([
          "TIME_CREATED_UNSPECIFIED",
          "TIME_CREATED_SKIP",
          "TIME_CREATED_PRESERVE_AS_CUSTOM_TIME",
        ]).describe(
          "Specifies how each object's `timeCreated` metadata is preserved for transfers. If unspecified, the default behavior is the same as TIME_CREATED_SKIP. This behavior is supported for transfers to Cloud Storage buckets from Cloud Storage, Amazon S3, S3-compatible storage, and Azure sources.",
        ).optional(),
        uid: z.enum(["UID_UNSPECIFIED", "UID_SKIP", "UID_NUMBER"]).describe(
          "Specifies how each file's POSIX user ID (UID) attribute should be handled by the transfer. By default, UID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
      }).describe("Specifies the metadata options for running a transfer.")
        .optional(),
      overwriteObjectsAlreadyExistingInSink: z.boolean().describe(
        "When to overwrite objects that already exist in the sink. The default is that only objects that are different from the source are overwritten. If true, all objects in the sink whose name matches an object in the source are overwritten with the source object.",
      ).optional(),
      overwriteWhen: z.enum([
        "OVERWRITE_WHEN_UNSPECIFIED",
        "DIFFERENT",
        "NEVER",
        "ALWAYS",
      ]).describe(
        "When to overwrite objects that already exist in the sink. If not set, overwrite behavior is determined by overwrite_objects_already_existing_in_sink.",
      ).optional(),
    }).describe(
      "TransferOptions define the actions to be performed on objects in a transfer.",
    ).optional(),
  }).describe(
    "Specifies the configuration for a cross-bucket replication job. Cross-bucket replication copies new or updated objects from a source Cloud Storage bucket to a destination Cloud Storage bucket. Existing objects in the source bucket are not copied by a new cross-bucket replication job.",
  ).optional(),
  schedule: z.object({
    endTimeOfDay: z.object({
      hours: z.number().int().describe(
        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
      ).optional(),
      minutes: z.number().int().describe(
        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
      ).optional(),
      nanos: z.number().int().describe(
        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
      ).optional(),
      seconds: z.number().int().describe(
        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
      ).optional(),
    }).describe(
      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
    ).optional(),
    repeatInterval: z.string().describe(
      "Interval between the start of each scheduled TransferOperation. If unspecified, the default value is 24 hours. This value may not be less than 1 hour.",
    ).optional(),
    scheduleEndDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    scheduleStartDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    startTimeOfDay: z.object({
      hours: z.number().int().describe(
        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
      ).optional(),
      minutes: z.number().int().describe(
        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
      ).optional(),
      nanos: z.number().int().describe(
        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
      ).optional(),
      seconds: z.number().int().describe(
        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
      ).optional(),
    }).describe(
      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
    ).optional(),
  }).describe("Transfers can be scheduled to recur or to run just once.")
    .optional(),
  serviceAccount: z.string().describe(
    "Optional. The user-managed service account to which to delegate service agent permissions. You can grant Cloud Storage bucket permissions to this service account instead of to the Transfer Service service agent. Either the service account email (`SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`) or the unique ID (`123456789012345678901`) are accepted. See https://docs.cloud.google.com/storage-transfer/docs/delegate-service-agent-permissions for required permissions.",
  ).optional(),
  status: z.enum(["STATUS_UNSPECIFIED", "ENABLED", "DISABLED", "DELETED"])
    .describe(
      "Status of the job. This value MUST be specified for `CreateTransferJobRequests`. **Note:** The effect of the new job status takes place during a subsequent job run. For example, if you change the job status from ENABLED to DISABLED, and an operation spawned by the transfer is running, the status change would not affect the current operation.",
    ).optional(),
  transferSpec: z.object({
    awsS3CompatibleDataSource: z.object({
      bucketName: z.string().describe(
        "Required. Specifies the name of the bucket.",
      ).optional(),
      endpoint: z.string().describe(
        "Required. Specifies the endpoint of the storage service.",
      ).optional(),
      path: z.string().describe(
        "Specifies the root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
      ).optional(),
      region: z.string().describe(
        "Specifies the region to sign requests with. This can be left blank if requests should be signed with an empty region.",
      ).optional(),
      s3Metadata: z.object({
        authMethod: z.enum([
          "AUTH_METHOD_UNSPECIFIED",
          "AUTH_METHOD_AWS_SIGNATURE_V4",
          "AUTH_METHOD_AWS_SIGNATURE_V2",
        ]).describe(
          "Specifies the authentication and authorization method used by the storage service. When not specified, Transfer Service will attempt to determine right auth method to use.",
        ).optional(),
        listApi: z.enum([
          "LIST_API_UNSPECIFIED",
          "LIST_OBJECTS_V2",
          "LIST_OBJECTS",
        ]).describe(
          "The Listing API to use for discovering objects. When not specified, Transfer Service will attempt to determine the right API to use.",
        ).optional(),
        protocol: z.enum([
          "NETWORK_PROTOCOL_UNSPECIFIED",
          "NETWORK_PROTOCOL_HTTPS",
          "NETWORK_PROTOCOL_HTTP",
        ]).describe(
          "Specifies the network protocol of the agent. When not specified, the default value of NetworkProtocol NETWORK_PROTOCOL_HTTPS is used.",
        ).optional(),
        requestModel: z.enum([
          "REQUEST_MODEL_UNSPECIFIED",
          "REQUEST_MODEL_VIRTUAL_HOSTED_STYLE",
          "REQUEST_MODEL_PATH_STYLE",
        ]).describe(
          "Specifies the API request model used to call the storage service. When not specified, the default value of RequestModel REQUEST_MODEL_VIRTUAL_HOSTED_STYLE is used.",
        ).optional(),
      }).describe(
        "S3CompatibleMetadata contains the metadata fields that apply to the basic types of S3-compatible data providers.",
      ).optional(),
    }).describe("An AwsS3CompatibleData resource.").optional(),
    awsS3DataSource: z.object({
      awsAccessKey: z.object({
        accessKeyId: z.string().describe("Required. AWS access key ID.")
          .optional(),
        secretAccessKey: z.string().describe(
          "Required. AWS secret access key. This field is not returned in RPC responses.",
        ).optional(),
      }).describe(
        "AWS access key (see [AWS Security Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)). For information on our data retention policy for user credentials, see [User credentials](/storage-transfer/docs/data-retention#user-credentials).",
      ).optional(),
      bucketName: z.string().describe(
        "Required. S3 Bucket name (see [Creating a bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/create-bucket-get-location-example.html)).",
      ).optional(),
      cloudfrontDomain: z.string().describe(
        "Optional. The CloudFront distribution domain name pointing to this bucket, to use when fetching. See [Transfer from S3 via CloudFront](https://cloud.google.com/storage-transfer/docs/s3-cloudfront) for more information. Format: `https://{id}.cloudfront.net` or any valid custom domain. Must begin with `https://`.",
      ).optional(),
      credentialsSecret: z.string().describe(
        'Optional. The Resource name of a secret in Secret Manager. AWS credentials must be stored in Secret Manager in JSON format: { "access_key_id": "ACCESS_KEY_ID", "secret_access_key": "SECRET_ACCESS_KEY" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See [Configure access to a source: Amazon S3] (https://cloud.google.com/storage-transfer/docs/source-amazon-s3#secret_manager) for more information. If `credentials_secret` is specified, do not specify role_arn or aws_access_key. Format: `projects/{project_number}/secrets/{secret_name}`',
      ).optional(),
      managedPrivateNetwork: z.boolean().describe(
        "Egress bytes over a Google-managed private network. This network is shared between other users of Storage Transfer Service.",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
      ).optional(),
      privateNetworkService: z.string().describe(
        "Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}`",
      ).optional(),
      roleArn: z.string().describe(
        "The Amazon Resource Name (ARN) of the role to support temporary credentials via `AssumeRoleWithWebIdentity`. For more information about ARNs, see [IAM ARNs](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns). When a role ARN is provided, Transfer Service fetches temporary credentials for the session using a `AssumeRoleWithWebIdentity` call for the provided role using the GoogleServiceAccount for this project.",
      ).optional(),
    }).describe(
      "An AwsS3Data resource can be a data source, but not a data sink. In an AwsS3Data resource, an object's name is the S3 object's key name.",
    ).optional(),
    azureBlobStorageDataSource: z.object({
      azureCredentials: z.object({
        sasToken: z.string().describe(
          "Required. Azure shared access signature (SAS). For more information about SAS, see [Grant limited access to Azure Storage resources using shared access signatures (SAS)](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview).",
        ).optional(),
      }).describe(
        "Azure credentials For information on our data retention policy for user credentials, see [User credentials](/storage-transfer/docs/data-retention#user-credentials).",
      ).optional(),
      container: z.string().describe(
        "Required. The container to transfer from the Azure Storage account.",
      ).optional(),
      credentialsSecret: z.string().describe(
        'Optional. The Resource name of a secret in Secret Manager. The Azure SAS token must be stored in Secret Manager in JSON format: { "sas_token": "SAS_TOKEN" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See [Configure access to a source: Microsoft Azure Blob Storage] (https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#secret_manager) for more information. If `credentials_secret` is specified, do not specify azure_credentials. Format: `projects/{project_number}/secrets/{secret_name}`',
      ).optional(),
      federatedIdentityConfig: z.object({
        clientId: z.string().describe(
          "Required. The client (application) ID of the application with federated credentials.",
        ).optional(),
        tenantId: z.string().describe(
          "Required. The tenant (directory) ID of the application with federated credentials.",
        ).optional(),
      }).describe(
        "The identity of an Azure application through which Storage Transfer Service can authenticate requests using Azure workload identity federation. Storage Transfer Service can issue requests to Azure Storage through registered Azure applications, eliminating the need to pass credentials to Storage Transfer Service directly. To configure federated identity, see [Configure access to Microsoft Azure Storage](https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#option_3_authenticate_using_federated_identity).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
      ).optional(),
      privateNetworkService: z.string().describe(
        "Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}`",
      ).optional(),
      storageAccount: z.string().describe(
        "Required. The name of the Azure Storage account.",
      ).optional(),
    }).describe(
      "An AzureBlobStorageData resource can be a data source, but not a data sink. An AzureBlobStorageData resource represents one Azure container. The storage account determines the [Azure endpoint](https://docs.microsoft.com/en-us/azure/storage/common/storage-create-storage-account#storage-account-endpoints). In an AzureBlobStorageData resource, a blobs's name is the [Azure Blob Storage blob's key name](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#blob-names).",
    ).optional(),
    gcsDataSink: z.object({
      bucketName: z.string().describe(
        "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
      ).optional(),
      managedFolderTransferEnabled: z.boolean().describe(
        "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
      ).optional(),
    }).describe(
      "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
    ).optional(),
    gcsDataSource: z.object({
      bucketName: z.string().describe(
        "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
      ).optional(),
      managedFolderTransferEnabled: z.boolean().describe(
        "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
      ).optional(),
    }).describe(
      "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
    ).optional(),
    gcsIntermediateDataLocation: z.object({
      bucketName: z.string().describe(
        "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
      ).optional(),
      managedFolderTransferEnabled: z.boolean().describe(
        "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
      ).optional(),
    }).describe(
      "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
    ).optional(),
    hdfsDataSource: z.object({
      path: z.string().describe("Root path to transfer files.").optional(),
    }).describe(
      "An HdfsData resource specifies a path within an HDFS entity (e.g. a cluster). All cluster-specific settings, such as namenodes and ports, are configured on the transfer agents servicing requests, so HdfsData only contains the root path to the data in our transfer.",
    ).optional(),
    httpDataSource: z.object({
      listUrl: z.string().describe(
        "Required. The URL that points to the file that stores the object list entries. This file must allow public access. The URL is either an HTTP/HTTPS address (e.g. `https://example.com/urllist.tsv`) or a Cloud Storage path (e.g. `gs://my-bucket/urllist.tsv`).",
      ).optional(),
    }).describe(
      'An HttpData resource specifies a list of objects on the web to be transferred over HTTP. The information of the objects to be transferred is contained in a file referenced by a URL. The first line in the file must be `"TsvHttpData-1.0"`, which specifies the format of the file. Subsequent lines specify the information of the list of objects, one object per list entry. Each entry has the following tab-delimited fields: * **HTTP URL** — The location of the object. * **Length** — The size of the object in bytes. * **MD5** — The base64-encoded MD5 hash of the object. For an example of a valid TSV file, see [Transferring data from URLs](https://cloud.google.com/storage-transfer/docs/create-url-list). When transferring data based on a URL list, keep the following in mind: * When an object located at `http(s)://hostname:port/` is transferred to a data sink, the name of the object at the data sink is `/`. * If the specified size of an object does not match the actual size of the object fetched, the object is not transferred. * If the specified MD5 does not match the MD5 computed from the transferred bytes, the object transfer fails. * Ensure that each URL you specify is publicly accessible. For example, in Cloud Storage you can [share an object publicly] (/storage/docs/cloud-console#_sharingdata) and get a link to it. * Storage Transfer Service obeys `robots.txt` rules and requires the source HTTP server to support `Range` requests and to return a `Content-Length` header in each response. * ObjectConditions have no effect when filtering objects to transfer.',
    ).optional(),
    objectConditions: z.object({
      excludePrefixes: z.array(z.string()).describe(
        "If you specify `exclude_prefixes`, Storage Transfer Service uses the items in the `exclude_prefixes` array to determine which objects to exclude from a transfer. Objects must not start with one of the matching `exclude_prefixes` for inclusion in a transfer. The following are requirements of `exclude_prefixes`: * Each exclude-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each exclude-prefix must omit the leading slash. For example, to exclude the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the exclude-prefix as `logs/y=2015/requests.gz`. * None of the exclude-prefix values can be empty, if specified. * Each exclude-prefix must exclude a distinct portion of the object namespace. No exclude-prefix may be a prefix of another exclude-prefix. * If include_prefixes is specified, then each exclude-prefix must start with the value of a path explicitly included by `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
      ).optional(),
      includePrefixes: z.array(z.string()).describe(
        "If you specify `include_prefixes`, Storage Transfer Service uses the items in the `include_prefixes` array to determine which objects to include in a transfer. Objects must start with one of the matching `include_prefixes` for inclusion in the transfer. If exclude_prefixes is specified, objects must not start with any of the `exclude_prefixes` specified for inclusion in the transfer. The following are requirements of `include_prefixes`: * Each include-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each include-prefix must omit the leading slash. For example, to include the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as `logs/y=2015/requests.gz`. * None of the include-prefix values can be empty, if specified. * Each include-prefix must include a distinct portion of the object namespace. No include-prefix may be a prefix of another include-prefix. The max size of `include_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
      ).optional(),
      lastModifiedBefore: z.string().describe(
        'If specified, only objects with a "last modification time" before this timestamp and objects that don\'t have a "last modification time" are transferred.',
      ).optional(),
      lastModifiedSince: z.string().describe(
        'If specified, only objects with a "last modification time" on or after this timestamp and objects that don\'t have a "last modification time" are transferred. The `last_modified_since` and `last_modified_before` fields can be used together for chunked data processing. For example, consider a script that processes each day\'s worth of data at a time. For that you\'d set each of the fields as follows: * `last_modified_since` to the start of the day * `last_modified_before` to the end of the day',
      ).optional(),
      matchGlob: z.string().describe(
        "Optional. If specified, only objects matching this glob are transferred.",
      ).optional(),
      maxTimeElapsedSinceLastModification: z.string().describe(
        'Ensures that objects are not transferred if a specific maximum time has elapsed since the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation`and the "last modification time" of the object is less than the value of max_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
      ).optional(),
      minTimeElapsedSinceLastModification: z.string().describe(
        'Ensures that objects are not transferred until a specific minimum time has elapsed after the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation` and the "last modification time" of the object is equal to or greater than the value of min_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
      ).optional(),
    }).describe(
      'Conditions that determine which objects are transferred. Applies only to Cloud Data Sources such as S3, Azure, and Cloud Storage. The "last modification time" refers to the time of the last change to the object\'s content or metadata — specifically, this is the `updated` property of Cloud Storage objects, the `LastModified` field of S3 objects, and the `Last-Modified` header of Azure blobs. For S3 objects, the `LastModified` value is the time the object begins uploading. If the object meets your "last modification time" criteria, but has not finished uploading, the object is not transferred. See [Transfer from Amazon S3 to Cloud Storage](https://cloud.google.com/storage-transfer/docs/create-transfers/agentless/s3#transfer_options) for more information. Transfers with a PosixFilesystem source or destination don\'t support `ObjectConditions`.',
    ).optional(),
    posixDataSink: z.object({
      rootDirectory: z.string().describe(
        "Root directory path to the filesystem.",
      ).optional(),
    }).describe("A POSIX filesystem resource.").optional(),
    posixDataSource: z.object({
      rootDirectory: z.string().describe(
        "Root directory path to the filesystem.",
      ).optional(),
    }).describe("A POSIX filesystem resource.").optional(),
    sinkAgentPoolName: z.string().describe(
      "Specifies the agent pool name associated with the posix data sink. When unspecified, the default name is used.",
    ).optional(),
    sourceAgentPoolName: z.string().describe(
      "Specifies the agent pool name associated with the posix data source. When unspecified, the default name is used.",
    ).optional(),
    transferManifest: z.object({
      location: z.string().describe(
        "Specifies the path to the manifest in Cloud Storage. The Google-managed service account for the transfer must have `storage.objects.get` permission for this object. An example path is `gs://bucket_name/path/manifest.csv`.",
      ).optional(),
    }).describe("Specifies where the manifest is located.").optional(),
    transferOptions: z.object({
      deleteObjectsFromSourceAfterTransfer: z.boolean().describe(
        "Whether objects should be deleted from the source after they are transferred to the sink. **Note:** This option and delete_objects_unique_in_sink are mutually exclusive.",
      ).optional(),
      deleteObjectsUniqueInSink: z.boolean().describe(
        "Whether objects that exist only in the sink should be deleted. **Note:** This option and delete_objects_from_source_after_transfer are mutually exclusive.",
      ).optional(),
      metadataOptions: z.object({
        acl: z.enum([
          "ACL_UNSPECIFIED",
          "ACL_DESTINATION_BUCKET_DEFAULT",
          "ACL_PRESERVE",
        ]).describe(
          "Specifies how each object's ACLs should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as ACL_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        gid: z.enum(["GID_UNSPECIFIED", "GID_SKIP", "GID_NUMBER"]).describe(
          "Specifies how each file's POSIX group ID (GID) attribute should be handled by the transfer. By default, GID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
        kmsKey: z.enum([
          "KMS_KEY_UNSPECIFIED",
          "KMS_KEY_DESTINATION_BUCKET_DEFAULT",
          "KMS_KEY_PRESERVE",
        ]).describe(
          "Specifies how each object's Cloud KMS customer-managed encryption key (CMEK) is preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as KMS_KEY_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        mode: z.enum(["MODE_UNSPECIFIED", "MODE_SKIP", "MODE_PRESERVE"])
          .describe(
            "Specifies how each file's mode attribute should be handled by the transfer. By default, mode is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
        storageClass: z.enum([
          "STORAGE_CLASS_UNSPECIFIED",
          "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT",
          "STORAGE_CLASS_PRESERVE",
          "STORAGE_CLASS_STANDARD",
          "STORAGE_CLASS_NEARLINE",
          "STORAGE_CLASS_COLDLINE",
          "STORAGE_CLASS_ARCHIVE",
        ]).describe(
          "Specifies the storage class to set on objects being transferred to Google Cloud Storage buckets. If unspecified, the default behavior is the same as STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        symlink: z.enum([
          "SYMLINK_UNSPECIFIED",
          "SYMLINK_SKIP",
          "SYMLINK_PRESERVE",
        ]).describe(
          "Specifies how symlinks should be handled by the transfer. By default, symlinks are not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
        temporaryHold: z.enum([
          "TEMPORARY_HOLD_UNSPECIFIED",
          "TEMPORARY_HOLD_SKIP",
          "TEMPORARY_HOLD_PRESERVE",
        ]).describe(
          "Specifies how each object's temporary hold status should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as TEMPORARY_HOLD_PRESERVE.",
        ).optional(),
        timeCreated: z.enum([
          "TIME_CREATED_UNSPECIFIED",
          "TIME_CREATED_SKIP",
          "TIME_CREATED_PRESERVE_AS_CUSTOM_TIME",
        ]).describe(
          "Specifies how each object's `timeCreated` metadata is preserved for transfers. If unspecified, the default behavior is the same as TIME_CREATED_SKIP. This behavior is supported for transfers to Cloud Storage buckets from Cloud Storage, Amazon S3, S3-compatible storage, and Azure sources.",
        ).optional(),
        uid: z.enum(["UID_UNSPECIFIED", "UID_SKIP", "UID_NUMBER"]).describe(
          "Specifies how each file's POSIX user ID (UID) attribute should be handled by the transfer. By default, UID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
      }).describe("Specifies the metadata options for running a transfer.")
        .optional(),
      overwriteObjectsAlreadyExistingInSink: z.boolean().describe(
        "When to overwrite objects that already exist in the sink. The default is that only objects that are different from the source are overwritten. If true, all objects in the sink whose name matches an object in the source are overwritten with the source object.",
      ).optional(),
      overwriteWhen: z.enum([
        "OVERWRITE_WHEN_UNSPECIFIED",
        "DIFFERENT",
        "NEVER",
        "ALWAYS",
      ]).describe(
        "When to overwrite objects that already exist in the sink. If not set, overwrite behavior is determined by overwrite_objects_already_existing_in_sink.",
      ).optional(),
    }).describe(
      "TransferOptions define the actions to be performed on objects in a transfer.",
    ).optional(),
  }).describe("Configuration for running a transfer.").optional(),
  transferJob: z.object({
    creationTime: z.string().describe(
      "Output only. The time that the transfer job was created.",
    ).optional(),
    deletionTime: z.string().describe(
      "Output only. The time that the transfer job was deleted.",
    ).optional(),
    description: z.string().describe(
      "A description provided by the user for the job. Its max length is 1024 bytes when Unicode-encoded.",
    ).optional(),
    eventStream: z.object({
      eventStreamExpirationTime: z.string().describe(
        "Specifies the data and time at which Storage Transfer Service stops listening for events from this stream. After this time, any transfers in progress will complete, but no new transfers are initiated.",
      ).optional(),
      eventStreamStartTime: z.string().describe(
        "Specifies the date and time that Storage Transfer Service starts listening for events from this stream. If no start time is specified or start time is in the past, Storage Transfer Service starts listening immediately.",
      ).optional(),
      name: z.string().describe(
        "Required. Specifies a unique name of the resource such as AWS SQS ARN in the form 'arn:aws:sqs:region:account_id:queue_name', or Pub/Sub subscription resource name in the form 'projects/{project}/subscriptions/{sub}'.",
      ).optional(),
    }).describe(
      "Specifies the Event-driven transfer options. Event-driven transfers listen to an event stream to transfer updated files.",
    ).optional(),
    lastModificationTime: z.string().describe(
      "Output only. The time that the transfer job was last modified.",
    ).optional(),
    latestOperationName: z.string().describe(
      "The name of the most recently started TransferOperation of this JobConfig. Present if a TransferOperation has been created for this JobConfig.",
    ).optional(),
    loggingConfig: z.object({
      enableOnpremGcsTransferLogs: z.boolean().describe(
        "For PosixFilesystem transfers, enables [file system transfer logs](https://cloud.google.com/storage-transfer/docs/on-prem-transfer-log-format) instead of, or in addition to, Cloud Logging. This option ignores [LoggableAction] and [LoggableActionState]. If these are set, Cloud Logging will also be enabled for this transfer.",
      ).optional(),
      logActionStates: z.array(
        z.enum([
          "LOGGABLE_ACTION_STATE_UNSPECIFIED",
          "SUCCEEDED",
          "FAILED",
          "SKIPPED",
        ]),
      ).describe(
        "States in which `log_actions` are logged. If empty, no logs are generated.",
      ).optional(),
      logActions: z.array(
        z.enum(["LOGGABLE_ACTION_UNSPECIFIED", "FIND", "DELETE", "COPY"]),
      ).describe(
        "Specifies the actions to be logged. If empty, no logs are generated.",
      ).optional(),
    }).describe(
      "Specifies the logging behavior for transfer operations. Logs can be sent to Cloud Logging for all transfer types. See [Read transfer logs](https://cloud.google.com/storage-transfer/docs/read-transfer-logs) for details.",
    ).optional(),
    name: z.string().describe(
      'A unique name (within the transfer project) assigned when the job is created. If this field is empty in a CreateTransferJobRequest, Storage Transfer Service assigns a unique name. Otherwise, the specified name is used as the unique name for this job. If the specified name is in use by a job, the creation request fails with an ALREADY_EXISTS error. This name must start with `"transferJobs/"` prefix and end with a letter or a number, and should be no more than 128 characters. For transfers involving PosixFilesystem, this name must start with `transferJobs/OPI` specifically. For all other transfer types, this name must not start with `transferJobs/OPI`. Non-PosixFilesystem example: `"transferJobs/^(?!OPI)[A-Za-z0-9-._~]*[A-Za-z0-9]$"` PosixFilesystem example: `"transferJobs/OPI^[A-Za-z0-9-._~]*[A-Za-z0-9]$"` Applications must not rely on the enforcement of naming requirements involving OPI. Invalid job names fail with an INVALID_ARGUMENT error.',
    ).optional(),
    notificationConfig: z.object({
      eventTypes: z.array(
        z.enum([
          "EVENT_TYPE_UNSPECIFIED",
          "TRANSFER_OPERATION_SUCCESS",
          "TRANSFER_OPERATION_FAILED",
          "TRANSFER_OPERATION_ABORTED",
        ]),
      ).describe(
        "Event types for which a notification is desired. If empty, send notifications for all event types.",
      ).optional(),
      payloadFormat: z.enum(["PAYLOAD_FORMAT_UNSPECIFIED", "NONE", "JSON"])
        .describe(
          "Required. The desired format of the notification message payloads.",
        ).optional(),
      pubsubTopic: z.string().describe(
        "Required. The `Topic.name` of the Pub/Sub topic to which to publish notifications. Must be of the format: `projects/{project}/topics/{topic}`. Not matching this format results in an INVALID_ARGUMENT error.",
      ).optional(),
    }).describe(
      'Specification to configure notifications published to Pub/Sub. Notifications are published to the customer-provided topic using the following `PubsubMessage.attributes`: * `"eventType"`: one of the EventType values * `"payloadFormat"`: one of the PayloadFormat values * `"projectId"`: the project_id of the `TransferOperation` * `"transferJobName"`: the transfer_job_name of the `TransferOperation` * `"transferOperationName"`: the name of the `TransferOperation` The `PubsubMessage.data` contains a TransferOperation resource formatted according to the specified `PayloadFormat`.',
    ).optional(),
    projectId: z.string().describe(
      "The ID of the Google Cloud project that owns the job.",
    ).optional(),
    replicationSpec: z.object({
      gcsDataSink: z.object({
        bucketName: z.string().describe(
          "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
        ).optional(),
        managedFolderTransferEnabled: z.boolean().describe(
          "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
        ).optional(),
      }).describe(
        "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
      ).optional(),
      gcsDataSource: z.object({
        bucketName: z.string().describe(
          "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
        ).optional(),
        managedFolderTransferEnabled: z.boolean().describe(
          "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
        ).optional(),
      }).describe(
        "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
      ).optional(),
      objectConditions: z.object({
        excludePrefixes: z.array(z.string()).describe(
          "If you specify `exclude_prefixes`, Storage Transfer Service uses the items in the `exclude_prefixes` array to determine which objects to exclude from a transfer. Objects must not start with one of the matching `exclude_prefixes` for inclusion in a transfer. The following are requirements of `exclude_prefixes`: * Each exclude-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each exclude-prefix must omit the leading slash. For example, to exclude the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the exclude-prefix as `logs/y=2015/requests.gz`. * None of the exclude-prefix values can be empty, if specified. * Each exclude-prefix must exclude a distinct portion of the object namespace. No exclude-prefix may be a prefix of another exclude-prefix. * If include_prefixes is specified, then each exclude-prefix must start with the value of a path explicitly included by `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
        ).optional(),
        includePrefixes: z.array(z.string()).describe(
          "If you specify `include_prefixes`, Storage Transfer Service uses the items in the `include_prefixes` array to determine which objects to include in a transfer. Objects must start with one of the matching `include_prefixes` for inclusion in the transfer. If exclude_prefixes is specified, objects must not start with any of the `exclude_prefixes` specified for inclusion in the transfer. The following are requirements of `include_prefixes`: * Each include-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each include-prefix must omit the leading slash. For example, to include the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as `logs/y=2015/requests.gz`. * None of the include-prefix values can be empty, if specified. * Each include-prefix must include a distinct portion of the object namespace. No include-prefix may be a prefix of another include-prefix. The max size of `include_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
        ).optional(),
        lastModifiedBefore: z.string().describe(
          'If specified, only objects with a "last modification time" before this timestamp and objects that don\'t have a "last modification time" are transferred.',
        ).optional(),
        lastModifiedSince: z.string().describe(
          'If specified, only objects with a "last modification time" on or after this timestamp and objects that don\'t have a "last modification time" are transferred. The `last_modified_since` and `last_modified_before` fields can be used together for chunked data processing. For example, consider a script that processes each day\'s worth of data at a time. For that you\'d set each of the fields as follows: * `last_modified_since` to the start of the day * `last_modified_before` to the end of the day',
        ).optional(),
        matchGlob: z.string().describe(
          "Optional. If specified, only objects matching this glob are transferred.",
        ).optional(),
        maxTimeElapsedSinceLastModification: z.string().describe(
          'Ensures that objects are not transferred if a specific maximum time has elapsed since the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation`and the "last modification time" of the object is less than the value of max_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
        ).optional(),
        minTimeElapsedSinceLastModification: z.string().describe(
          'Ensures that objects are not transferred until a specific minimum time has elapsed after the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation` and the "last modification time" of the object is equal to or greater than the value of min_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
        ).optional(),
      }).describe(
        'Conditions that determine which objects are transferred. Applies only to Cloud Data Sources such as S3, Azure, and Cloud Storage. The "last modification time" refers to the time of the last change to the object\'s content or metadata — specifically, this is the `updated` property of Cloud Storage objects, the `LastModified` field of S3 objects, and the `Last-Modified` header of Azure blobs. For S3 objects, the `LastModified` value is the time the object begins uploading. If the object meets your "last modification time" criteria, but has not finished uploading, the object is not transferred. See [Transfer from Amazon S3 to Cloud Storage](https://cloud.google.com/storage-transfer/docs/create-transfers/agentless/s3#transfer_options) for more information. Transfers with a PosixFilesystem source or destination don\'t support `ObjectConditions`.',
      ).optional(),
      transferOptions: z.object({
        deleteObjectsFromSourceAfterTransfer: z.boolean().describe(
          "Whether objects should be deleted from the source after they are transferred to the sink. **Note:** This option and delete_objects_unique_in_sink are mutually exclusive.",
        ).optional(),
        deleteObjectsUniqueInSink: z.boolean().describe(
          "Whether objects that exist only in the sink should be deleted. **Note:** This option and delete_objects_from_source_after_transfer are mutually exclusive.",
        ).optional(),
        metadataOptions: z.object({
          acl: z.enum([
            "ACL_UNSPECIFIED",
            "ACL_DESTINATION_BUCKET_DEFAULT",
            "ACL_PRESERVE",
          ]).describe(
            "Specifies how each object's ACLs should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as ACL_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          gid: z.enum(["GID_UNSPECIFIED", "GID_SKIP", "GID_NUMBER"]).describe(
            "Specifies how each file's POSIX group ID (GID) attribute should be handled by the transfer. By default, GID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
          kmsKey: z.enum([
            "KMS_KEY_UNSPECIFIED",
            "KMS_KEY_DESTINATION_BUCKET_DEFAULT",
            "KMS_KEY_PRESERVE",
          ]).describe(
            "Specifies how each object's Cloud KMS customer-managed encryption key (CMEK) is preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as KMS_KEY_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          mode: z.enum(["MODE_UNSPECIFIED", "MODE_SKIP", "MODE_PRESERVE"])
            .describe(
              "Specifies how each file's mode attribute should be handled by the transfer. By default, mode is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
            ).optional(),
          storageClass: z.enum([
            "STORAGE_CLASS_UNSPECIFIED",
            "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT",
            "STORAGE_CLASS_PRESERVE",
            "STORAGE_CLASS_STANDARD",
            "STORAGE_CLASS_NEARLINE",
            "STORAGE_CLASS_COLDLINE",
            "STORAGE_CLASS_ARCHIVE",
          ]).describe(
            "Specifies the storage class to set on objects being transferred to Google Cloud Storage buckets. If unspecified, the default behavior is the same as STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          symlink: z.enum([
            "SYMLINK_UNSPECIFIED",
            "SYMLINK_SKIP",
            "SYMLINK_PRESERVE",
          ]).describe(
            "Specifies how symlinks should be handled by the transfer. By default, symlinks are not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
          temporaryHold: z.enum([
            "TEMPORARY_HOLD_UNSPECIFIED",
            "TEMPORARY_HOLD_SKIP",
            "TEMPORARY_HOLD_PRESERVE",
          ]).describe(
            "Specifies how each object's temporary hold status should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as TEMPORARY_HOLD_PRESERVE.",
          ).optional(),
          timeCreated: z.enum([
            "TIME_CREATED_UNSPECIFIED",
            "TIME_CREATED_SKIP",
            "TIME_CREATED_PRESERVE_AS_CUSTOM_TIME",
          ]).describe(
            "Specifies how each object's `timeCreated` metadata is preserved for transfers. If unspecified, the default behavior is the same as TIME_CREATED_SKIP. This behavior is supported for transfers to Cloud Storage buckets from Cloud Storage, Amazon S3, S3-compatible storage, and Azure sources.",
          ).optional(),
          uid: z.enum(["UID_UNSPECIFIED", "UID_SKIP", "UID_NUMBER"]).describe(
            "Specifies how each file's POSIX user ID (UID) attribute should be handled by the transfer. By default, UID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
        }).describe("Specifies the metadata options for running a transfer.")
          .optional(),
        overwriteObjectsAlreadyExistingInSink: z.boolean().describe(
          "When to overwrite objects that already exist in the sink. The default is that only objects that are different from the source are overwritten. If true, all objects in the sink whose name matches an object in the source are overwritten with the source object.",
        ).optional(),
        overwriteWhen: z.enum([
          "OVERWRITE_WHEN_UNSPECIFIED",
          "DIFFERENT",
          "NEVER",
          "ALWAYS",
        ]).describe(
          "When to overwrite objects that already exist in the sink. If not set, overwrite behavior is determined by overwrite_objects_already_existing_in_sink.",
        ).optional(),
      }).describe(
        "TransferOptions define the actions to be performed on objects in a transfer.",
      ).optional(),
    }).describe(
      "Specifies the configuration for a cross-bucket replication job. Cross-bucket replication copies new or updated objects from a source Cloud Storage bucket to a destination Cloud Storage bucket. Existing objects in the source bucket are not copied by a new cross-bucket replication job.",
    ).optional(),
    schedule: z.object({
      endTimeOfDay: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
      repeatInterval: z.string().describe(
        "Interval between the start of each scheduled TransferOperation. If unspecified, the default value is 24 hours. This value may not be less than 1 hour.",
      ).optional(),
      scheduleEndDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      scheduleStartDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      startTimeOfDay: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    }).describe("Transfers can be scheduled to recur or to run just once.")
      .optional(),
    serviceAccount: z.string().describe(
      "Optional. The user-managed service account to which to delegate service agent permissions. You can grant Cloud Storage bucket permissions to this service account instead of to the Transfer Service service agent. Either the service account email (`SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`) or the unique ID (`123456789012345678901`) are accepted. See https://docs.cloud.google.com/storage-transfer/docs/delegate-service-agent-permissions for required permissions.",
    ).optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "ENABLED", "DISABLED", "DELETED"])
      .describe(
        "Status of the job. This value MUST be specified for `CreateTransferJobRequests`. **Note:** The effect of the new job status takes place during a subsequent job run. For example, if you change the job status from ENABLED to DISABLED, and an operation spawned by the transfer is running, the status change would not affect the current operation.",
      ).optional(),
    transferSpec: z.object({
      awsS3CompatibleDataSource: z.object({
        bucketName: z.string().describe(
          "Required. Specifies the name of the bucket.",
        ).optional(),
        endpoint: z.string().describe(
          "Required. Specifies the endpoint of the storage service.",
        ).optional(),
        path: z.string().describe(
          "Specifies the root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
        ).optional(),
        region: z.string().describe(
          "Specifies the region to sign requests with. This can be left blank if requests should be signed with an empty region.",
        ).optional(),
        s3Metadata: z.object({
          authMethod: z.enum([
            "AUTH_METHOD_UNSPECIFIED",
            "AUTH_METHOD_AWS_SIGNATURE_V4",
            "AUTH_METHOD_AWS_SIGNATURE_V2",
          ]).describe(
            "Specifies the authentication and authorization method used by the storage service. When not specified, Transfer Service will attempt to determine right auth method to use.",
          ).optional(),
          listApi: z.enum([
            "LIST_API_UNSPECIFIED",
            "LIST_OBJECTS_V2",
            "LIST_OBJECTS",
          ]).describe(
            "The Listing API to use for discovering objects. When not specified, Transfer Service will attempt to determine the right API to use.",
          ).optional(),
          protocol: z.enum([
            "NETWORK_PROTOCOL_UNSPECIFIED",
            "NETWORK_PROTOCOL_HTTPS",
            "NETWORK_PROTOCOL_HTTP",
          ]).describe(
            "Specifies the network protocol of the agent. When not specified, the default value of NetworkProtocol NETWORK_PROTOCOL_HTTPS is used.",
          ).optional(),
          requestModel: z.enum([
            "REQUEST_MODEL_UNSPECIFIED",
            "REQUEST_MODEL_VIRTUAL_HOSTED_STYLE",
            "REQUEST_MODEL_PATH_STYLE",
          ]).describe(
            "Specifies the API request model used to call the storage service. When not specified, the default value of RequestModel REQUEST_MODEL_VIRTUAL_HOSTED_STYLE is used.",
          ).optional(),
        }).describe(
          "S3CompatibleMetadata contains the metadata fields that apply to the basic types of S3-compatible data providers.",
        ).optional(),
      }).describe("An AwsS3CompatibleData resource.").optional(),
      awsS3DataSource: z.object({
        awsAccessKey: z.object({
          accessKeyId: z.string().describe("Required. AWS access key ID.")
            .optional(),
          secretAccessKey: z.string().describe(
            "Required. AWS secret access key. This field is not returned in RPC responses.",
          ).optional(),
        }).describe(
          "AWS access key (see [AWS Security Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)). For information on our data retention policy for user credentials, see [User credentials](/storage-transfer/docs/data-retention#user-credentials).",
        ).optional(),
        bucketName: z.string().describe(
          "Required. S3 Bucket name (see [Creating a bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/create-bucket-get-location-example.html)).",
        ).optional(),
        cloudfrontDomain: z.string().describe(
          "Optional. The CloudFront distribution domain name pointing to this bucket, to use when fetching. See [Transfer from S3 via CloudFront](https://cloud.google.com/storage-transfer/docs/s3-cloudfront) for more information. Format: `https://{id}.cloudfront.net` or any valid custom domain. Must begin with `https://`.",
        ).optional(),
        credentialsSecret: z.string().describe(
          'Optional. The Resource name of a secret in Secret Manager. AWS credentials must be stored in Secret Manager in JSON format: { "access_key_id": "ACCESS_KEY_ID", "secret_access_key": "SECRET_ACCESS_KEY" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See [Configure access to a source: Amazon S3] (https://cloud.google.com/storage-transfer/docs/source-amazon-s3#secret_manager) for more information. If `credentials_secret` is specified, do not specify role_arn or aws_access_key. Format: `projects/{project_number}/secrets/{secret_name}`',
        ).optional(),
        managedPrivateNetwork: z.boolean().describe(
          "Egress bytes over a Google-managed private network. This network is shared between other users of Storage Transfer Service.",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
        ).optional(),
        privateNetworkService: z.string().describe(
          "Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}`",
        ).optional(),
        roleArn: z.string().describe(
          "The Amazon Resource Name (ARN) of the role to support temporary credentials via `AssumeRoleWithWebIdentity`. For more information about ARNs, see [IAM ARNs](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns). When a role ARN is provided, Transfer Service fetches temporary credentials for the session using a `AssumeRoleWithWebIdentity` call for the provided role using the GoogleServiceAccount for this project.",
        ).optional(),
      }).describe(
        "An AwsS3Data resource can be a data source, but not a data sink. In an AwsS3Data resource, an object's name is the S3 object's key name.",
      ).optional(),
      azureBlobStorageDataSource: z.object({
        azureCredentials: z.object({
          sasToken: z.string().describe(
            "Required. Azure shared access signature (SAS). For more information about SAS, see [Grant limited access to Azure Storage resources using shared access signatures (SAS)](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview).",
          ).optional(),
        }).describe(
          "Azure credentials For information on our data retention policy for user credentials, see [User credentials](/storage-transfer/docs/data-retention#user-credentials).",
        ).optional(),
        container: z.string().describe(
          "Required. The container to transfer from the Azure Storage account.",
        ).optional(),
        credentialsSecret: z.string().describe(
          'Optional. The Resource name of a secret in Secret Manager. The Azure SAS token must be stored in Secret Manager in JSON format: { "sas_token": "SAS_TOKEN" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See [Configure access to a source: Microsoft Azure Blob Storage] (https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#secret_manager) for more information. If `credentials_secret` is specified, do not specify azure_credentials. Format: `projects/{project_number}/secrets/{secret_name}`',
        ).optional(),
        federatedIdentityConfig: z.object({
          clientId: z.string().describe(
            "Required. The client (application) ID of the application with federated credentials.",
          ).optional(),
          tenantId: z.string().describe(
            "Required. The tenant (directory) ID of the application with federated credentials.",
          ).optional(),
        }).describe(
          "The identity of an Azure application through which Storage Transfer Service can authenticate requests using Azure workload identity federation. Storage Transfer Service can issue requests to Azure Storage through registered Azure applications, eliminating the need to pass credentials to Storage Transfer Service directly. To configure federated identity, see [Configure access to Microsoft Azure Storage](https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#option_3_authenticate_using_federated_identity).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
        ).optional(),
        privateNetworkService: z.string().describe(
          "Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}`",
        ).optional(),
        storageAccount: z.string().describe(
          "Required. The name of the Azure Storage account.",
        ).optional(),
      }).describe(
        "An AzureBlobStorageData resource can be a data source, but not a data sink. An AzureBlobStorageData resource represents one Azure container. The storage account determines the [Azure endpoint](https://docs.microsoft.com/en-us/azure/storage/common/storage-create-storage-account#storage-account-endpoints). In an AzureBlobStorageData resource, a blobs's name is the [Azure Blob Storage blob's key name](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#blob-names).",
      ).optional(),
      gcsDataSink: z.object({
        bucketName: z.string().describe(
          "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
        ).optional(),
        managedFolderTransferEnabled: z.boolean().describe(
          "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
        ).optional(),
      }).describe(
        "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
      ).optional(),
      gcsDataSource: z.object({
        bucketName: z.string().describe(
          "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
        ).optional(),
        managedFolderTransferEnabled: z.boolean().describe(
          "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
        ).optional(),
      }).describe(
        "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
      ).optional(),
      gcsIntermediateDataLocation: z.object({
        bucketName: z.string().describe(
          "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
        ).optional(),
        managedFolderTransferEnabled: z.boolean().describe(
          "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
        ).optional(),
      }).describe(
        "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
      ).optional(),
      hdfsDataSource: z.object({
        path: z.string().describe("Root path to transfer files.").optional(),
      }).describe(
        "An HdfsData resource specifies a path within an HDFS entity (e.g. a cluster). All cluster-specific settings, such as namenodes and ports, are configured on the transfer agents servicing requests, so HdfsData only contains the root path to the data in our transfer.",
      ).optional(),
      httpDataSource: z.object({
        listUrl: z.string().describe(
          "Required. The URL that points to the file that stores the object list entries. This file must allow public access. The URL is either an HTTP/HTTPS address (e.g. `https://example.com/urllist.tsv`) or a Cloud Storage path (e.g. `gs://my-bucket/urllist.tsv`).",
        ).optional(),
      }).describe(
        'An HttpData resource specifies a list of objects on the web to be transferred over HTTP. The information of the objects to be transferred is contained in a file referenced by a URL. The first line in the file must be `"TsvHttpData-1.0"`, which specifies the format of the file. Subsequent lines specify the information of the list of objects, one object per list entry. Each entry has the following tab-delimited fields: * **HTTP URL** — The location of the object. * **Length** — The size of the object in bytes. * **MD5** — The base64-encoded MD5 hash of the object. For an example of a valid TSV file, see [Transferring data from URLs](https://cloud.google.com/storage-transfer/docs/create-url-list). When transferring data based on a URL list, keep the following in mind: * When an object located at `http(s)://hostname:port/` is transferred to a data sink, the name of the object at the data sink is `/`. * If the specified size of an object does not match the actual size of the object fetched, the object is not transferred. * If the specified MD5 does not match the MD5 computed from the transferred bytes, the object transfer fails. * Ensure that each URL you specify is publicly accessible. For example, in Cloud Storage you can [share an object publicly] (/storage/docs/cloud-console#_sharingdata) and get a link to it. * Storage Transfer Service obeys `robots.txt` rules and requires the source HTTP server to support `Range` requests and to return a `Content-Length` header in each response. * ObjectConditions have no effect when filtering objects to transfer.',
      ).optional(),
      objectConditions: z.object({
        excludePrefixes: z.array(z.string()).describe(
          "If you specify `exclude_prefixes`, Storage Transfer Service uses the items in the `exclude_prefixes` array to determine which objects to exclude from a transfer. Objects must not start with one of the matching `exclude_prefixes` for inclusion in a transfer. The following are requirements of `exclude_prefixes`: * Each exclude-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each exclude-prefix must omit the leading slash. For example, to exclude the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the exclude-prefix as `logs/y=2015/requests.gz`. * None of the exclude-prefix values can be empty, if specified. * Each exclude-prefix must exclude a distinct portion of the object namespace. No exclude-prefix may be a prefix of another exclude-prefix. * If include_prefixes is specified, then each exclude-prefix must start with the value of a path explicitly included by `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
        ).optional(),
        includePrefixes: z.array(z.string()).describe(
          "If you specify `include_prefixes`, Storage Transfer Service uses the items in the `include_prefixes` array to determine which objects to include in a transfer. Objects must start with one of the matching `include_prefixes` for inclusion in the transfer. If exclude_prefixes is specified, objects must not start with any of the `exclude_prefixes` specified for inclusion in the transfer. The following are requirements of `include_prefixes`: * Each include-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each include-prefix must omit the leading slash. For example, to include the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as `logs/y=2015/requests.gz`. * None of the include-prefix values can be empty, if specified. * Each include-prefix must include a distinct portion of the object namespace. No include-prefix may be a prefix of another include-prefix. The max size of `include_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
        ).optional(),
        lastModifiedBefore: z.string().describe(
          'If specified, only objects with a "last modification time" before this timestamp and objects that don\'t have a "last modification time" are transferred.',
        ).optional(),
        lastModifiedSince: z.string().describe(
          'If specified, only objects with a "last modification time" on or after this timestamp and objects that don\'t have a "last modification time" are transferred. The `last_modified_since` and `last_modified_before` fields can be used together for chunked data processing. For example, consider a script that processes each day\'s worth of data at a time. For that you\'d set each of the fields as follows: * `last_modified_since` to the start of the day * `last_modified_before` to the end of the day',
        ).optional(),
        matchGlob: z.string().describe(
          "Optional. If specified, only objects matching this glob are transferred.",
        ).optional(),
        maxTimeElapsedSinceLastModification: z.string().describe(
          'Ensures that objects are not transferred if a specific maximum time has elapsed since the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation`and the "last modification time" of the object is less than the value of max_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
        ).optional(),
        minTimeElapsedSinceLastModification: z.string().describe(
          'Ensures that objects are not transferred until a specific minimum time has elapsed after the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation` and the "last modification time" of the object is equal to or greater than the value of min_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
        ).optional(),
      }).describe(
        'Conditions that determine which objects are transferred. Applies only to Cloud Data Sources such as S3, Azure, and Cloud Storage. The "last modification time" refers to the time of the last change to the object\'s content or metadata — specifically, this is the `updated` property of Cloud Storage objects, the `LastModified` field of S3 objects, and the `Last-Modified` header of Azure blobs. For S3 objects, the `LastModified` value is the time the object begins uploading. If the object meets your "last modification time" criteria, but has not finished uploading, the object is not transferred. See [Transfer from Amazon S3 to Cloud Storage](https://cloud.google.com/storage-transfer/docs/create-transfers/agentless/s3#transfer_options) for more information. Transfers with a PosixFilesystem source or destination don\'t support `ObjectConditions`.',
      ).optional(),
      posixDataSink: z.object({
        rootDirectory: z.string().describe(
          "Root directory path to the filesystem.",
        ).optional(),
      }).describe("A POSIX filesystem resource.").optional(),
      posixDataSource: z.object({
        rootDirectory: z.string().describe(
          "Root directory path to the filesystem.",
        ).optional(),
      }).describe("A POSIX filesystem resource.").optional(),
      sinkAgentPoolName: z.string().describe(
        "Specifies the agent pool name associated with the posix data sink. When unspecified, the default name is used.",
      ).optional(),
      sourceAgentPoolName: z.string().describe(
        "Specifies the agent pool name associated with the posix data source. When unspecified, the default name is used.",
      ).optional(),
      transferManifest: z.object({
        location: z.string().describe(
          "Specifies the path to the manifest in Cloud Storage. The Google-managed service account for the transfer must have `storage.objects.get` permission for this object. An example path is `gs://bucket_name/path/manifest.csv`.",
        ).optional(),
      }).describe("Specifies where the manifest is located.").optional(),
      transferOptions: z.object({
        deleteObjectsFromSourceAfterTransfer: z.boolean().describe(
          "Whether objects should be deleted from the source after they are transferred to the sink. **Note:** This option and delete_objects_unique_in_sink are mutually exclusive.",
        ).optional(),
        deleteObjectsUniqueInSink: z.boolean().describe(
          "Whether objects that exist only in the sink should be deleted. **Note:** This option and delete_objects_from_source_after_transfer are mutually exclusive.",
        ).optional(),
        metadataOptions: z.object({
          acl: z.enum([
            "ACL_UNSPECIFIED",
            "ACL_DESTINATION_BUCKET_DEFAULT",
            "ACL_PRESERVE",
          ]).describe(
            "Specifies how each object's ACLs should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as ACL_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          gid: z.enum(["GID_UNSPECIFIED", "GID_SKIP", "GID_NUMBER"]).describe(
            "Specifies how each file's POSIX group ID (GID) attribute should be handled by the transfer. By default, GID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
          kmsKey: z.enum([
            "KMS_KEY_UNSPECIFIED",
            "KMS_KEY_DESTINATION_BUCKET_DEFAULT",
            "KMS_KEY_PRESERVE",
          ]).describe(
            "Specifies how each object's Cloud KMS customer-managed encryption key (CMEK) is preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as KMS_KEY_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          mode: z.enum(["MODE_UNSPECIFIED", "MODE_SKIP", "MODE_PRESERVE"])
            .describe(
              "Specifies how each file's mode attribute should be handled by the transfer. By default, mode is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
            ).optional(),
          storageClass: z.enum([
            "STORAGE_CLASS_UNSPECIFIED",
            "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT",
            "STORAGE_CLASS_PRESERVE",
            "STORAGE_CLASS_STANDARD",
            "STORAGE_CLASS_NEARLINE",
            "STORAGE_CLASS_COLDLINE",
            "STORAGE_CLASS_ARCHIVE",
          ]).describe(
            "Specifies the storage class to set on objects being transferred to Google Cloud Storage buckets. If unspecified, the default behavior is the same as STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          symlink: z.enum([
            "SYMLINK_UNSPECIFIED",
            "SYMLINK_SKIP",
            "SYMLINK_PRESERVE",
          ]).describe(
            "Specifies how symlinks should be handled by the transfer. By default, symlinks are not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
          temporaryHold: z.enum([
            "TEMPORARY_HOLD_UNSPECIFIED",
            "TEMPORARY_HOLD_SKIP",
            "TEMPORARY_HOLD_PRESERVE",
          ]).describe(
            "Specifies how each object's temporary hold status should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as TEMPORARY_HOLD_PRESERVE.",
          ).optional(),
          timeCreated: z.enum([
            "TIME_CREATED_UNSPECIFIED",
            "TIME_CREATED_SKIP",
            "TIME_CREATED_PRESERVE_AS_CUSTOM_TIME",
          ]).describe(
            "Specifies how each object's `timeCreated` metadata is preserved for transfers. If unspecified, the default behavior is the same as TIME_CREATED_SKIP. This behavior is supported for transfers to Cloud Storage buckets from Cloud Storage, Amazon S3, S3-compatible storage, and Azure sources.",
          ).optional(),
          uid: z.enum(["UID_UNSPECIFIED", "UID_SKIP", "UID_NUMBER"]).describe(
            "Specifies how each file's POSIX user ID (UID) attribute should be handled by the transfer. By default, UID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
        }).describe("Specifies the metadata options for running a transfer.")
          .optional(),
        overwriteObjectsAlreadyExistingInSink: z.boolean().describe(
          "When to overwrite objects that already exist in the sink. The default is that only objects that are different from the source are overwritten. If true, all objects in the sink whose name matches an object in the source are overwritten with the source object.",
        ).optional(),
        overwriteWhen: z.enum([
          "OVERWRITE_WHEN_UNSPECIFIED",
          "DIFFERENT",
          "NEVER",
          "ALWAYS",
        ]).describe(
          "When to overwrite objects that already exist in the sink. If not set, overwrite behavior is determined by overwrite_objects_already_existing_in_sink.",
        ).optional(),
      }).describe(
        "TransferOptions define the actions to be performed on objects in a transfer.",
      ).optional(),
    }).describe("Configuration for running a transfer.").optional(),
  }).describe(
    "This resource represents the configuration of a transfer job that runs periodically.",
  ).optional(),
  updateTransferJobFieldMask: z.string().describe(
    "The field mask of the fields in `transferJob` that are to be updated in this request. Fields in `transferJob` that can be updated are: description, transfer_spec, notification_config, logging_config, and status. To update the `transfer_spec` of the job, a complete transfer specification must be provided. An incomplete specification missing any required fields is rejected with the error INVALID_ARGUMENT.",
  ).optional(),
});

const StateSchema = z.object({
  creationTime: z.string().optional(),
  deletionTime: z.string().optional(),
  description: z.string().optional(),
  eventStream: z.object({
    eventStreamExpirationTime: z.string(),
    eventStreamStartTime: z.string(),
    name: z.string(),
  }).optional(),
  lastModificationTime: z.string().optional(),
  latestOperationName: z.string().optional(),
  loggingConfig: z.object({
    enableOnpremGcsTransferLogs: z.boolean(),
    logActionStates: z.array(z.string()),
    logActions: z.array(z.string()),
  }).optional(),
  name: z.string(),
  notificationConfig: z.object({
    eventTypes: z.array(z.string()),
    payloadFormat: z.string(),
    pubsubTopic: z.string(),
  }).optional(),
  projectId: z.string().optional(),
  replicationSpec: z.object({
    gcsDataSink: z.object({
      bucketName: z.string(),
      managedFolderTransferEnabled: z.boolean(),
      path: z.string(),
    }),
    gcsDataSource: z.object({
      bucketName: z.string(),
      managedFolderTransferEnabled: z.boolean(),
      path: z.string(),
    }),
    objectConditions: z.object({
      excludePrefixes: z.array(z.string()),
      includePrefixes: z.array(z.string()),
      lastModifiedBefore: z.string(),
      lastModifiedSince: z.string(),
      matchGlob: z.string(),
      maxTimeElapsedSinceLastModification: z.string(),
      minTimeElapsedSinceLastModification: z.string(),
    }),
    transferOptions: z.object({
      deleteObjectsFromSourceAfterTransfer: z.boolean(),
      deleteObjectsUniqueInSink: z.boolean(),
      metadataOptions: z.object({
        acl: z.string(),
        gid: z.string(),
        kmsKey: z.string(),
        mode: z.string(),
        storageClass: z.string(),
        symlink: z.string(),
        temporaryHold: z.string(),
        timeCreated: z.string(),
        uid: z.string(),
      }),
      overwriteObjectsAlreadyExistingInSink: z.boolean(),
      overwriteWhen: z.string(),
    }),
  }).optional(),
  schedule: z.object({
    endTimeOfDay: z.object({
      hours: z.number(),
      minutes: z.number(),
      nanos: z.number(),
      seconds: z.number(),
    }),
    repeatInterval: z.string(),
    scheduleEndDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    scheduleStartDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    startTimeOfDay: z.object({
      hours: z.number(),
      minutes: z.number(),
      nanos: z.number(),
      seconds: z.number(),
    }),
  }).optional(),
  serviceAccount: z.string().optional(),
  status: z.string().optional(),
  transferSpec: z.object({
    awsS3CompatibleDataSource: z.object({
      bucketName: z.string(),
      endpoint: z.string(),
      path: z.string(),
      region: z.string(),
      s3Metadata: z.object({
        authMethod: z.string(),
        listApi: z.string(),
        protocol: z.string(),
        requestModel: z.string(),
      }),
    }),
    awsS3DataSource: z.object({
      awsAccessKey: z.object({
        accessKeyId: z.string(),
        secretAccessKey: z.string(),
      }),
      bucketName: z.string(),
      cloudfrontDomain: z.string(),
      credentialsSecret: z.string(),
      managedPrivateNetwork: z.boolean(),
      path: z.string(),
      privateNetworkService: z.string(),
      roleArn: z.string(),
    }),
    azureBlobStorageDataSource: z.object({
      azureCredentials: z.object({
        sasToken: z.string(),
      }),
      container: z.string(),
      credentialsSecret: z.string(),
      federatedIdentityConfig: z.object({
        clientId: z.string(),
        tenantId: z.string(),
      }),
      path: z.string(),
      privateNetworkService: z.string(),
      storageAccount: z.string(),
    }),
    gcsDataSink: z.object({
      bucketName: z.string(),
      managedFolderTransferEnabled: z.boolean(),
      path: z.string(),
    }),
    gcsDataSource: z.object({
      bucketName: z.string(),
      managedFolderTransferEnabled: z.boolean(),
      path: z.string(),
    }),
    gcsIntermediateDataLocation: z.object({
      bucketName: z.string(),
      managedFolderTransferEnabled: z.boolean(),
      path: z.string(),
    }),
    hdfsDataSource: z.object({
      path: z.string(),
    }),
    httpDataSource: z.object({
      listUrl: z.string(),
    }),
    objectConditions: z.object({
      excludePrefixes: z.array(z.string()),
      includePrefixes: z.array(z.string()),
      lastModifiedBefore: z.string(),
      lastModifiedSince: z.string(),
      matchGlob: z.string(),
      maxTimeElapsedSinceLastModification: z.string(),
      minTimeElapsedSinceLastModification: z.string(),
    }),
    posixDataSink: z.object({
      rootDirectory: z.string(),
    }),
    posixDataSource: z.object({
      rootDirectory: z.string(),
    }),
    sinkAgentPoolName: z.string(),
    sourceAgentPoolName: z.string(),
    transferManifest: z.object({
      location: z.string(),
    }),
    transferOptions: z.object({
      deleteObjectsFromSourceAfterTransfer: z.boolean(),
      deleteObjectsUniqueInSink: z.boolean(),
      metadataOptions: z.object({
        acl: z.string(),
        gid: z.string(),
        kmsKey: z.string(),
        mode: z.string(),
        storageClass: z.string(),
        symlink: z.string(),
        temporaryHold: z.string(),
        timeCreated: z.string(),
        uid: z.string(),
      }),
      overwriteObjectsAlreadyExistingInSink: z.boolean(),
      overwriteWhen: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "A description provided by the user for the job. Its max length is 1024 bytes when Unicode-encoded.",
  ).optional(),
  eventStream: z.object({
    eventStreamExpirationTime: z.string().describe(
      "Specifies the data and time at which Storage Transfer Service stops listening for events from this stream. After this time, any transfers in progress will complete, but no new transfers are initiated.",
    ).optional(),
    eventStreamStartTime: z.string().describe(
      "Specifies the date and time that Storage Transfer Service starts listening for events from this stream. If no start time is specified or start time is in the past, Storage Transfer Service starts listening immediately.",
    ).optional(),
    name: z.string().describe(
      "Required. Specifies a unique name of the resource such as AWS SQS ARN in the form 'arn:aws:sqs:region:account_id:queue_name', or Pub/Sub subscription resource name in the form 'projects/{project}/subscriptions/{sub}'.",
    ).optional(),
  }).describe(
    "Specifies the Event-driven transfer options. Event-driven transfers listen to an event stream to transfer updated files.",
  ).optional(),
  latestOperationName: z.string().describe(
    "The name of the most recently started TransferOperation of this JobConfig. Present if a TransferOperation has been created for this JobConfig.",
  ).optional(),
  loggingConfig: z.object({
    enableOnpremGcsTransferLogs: z.boolean().describe(
      "For PosixFilesystem transfers, enables [file system transfer logs](https://cloud.google.com/storage-transfer/docs/on-prem-transfer-log-format) instead of, or in addition to, Cloud Logging. This option ignores [LoggableAction] and [LoggableActionState]. If these are set, Cloud Logging will also be enabled for this transfer.",
    ).optional(),
    logActionStates: z.array(
      z.enum([
        "LOGGABLE_ACTION_STATE_UNSPECIFIED",
        "SUCCEEDED",
        "FAILED",
        "SKIPPED",
      ]),
    ).describe(
      "States in which `log_actions` are logged. If empty, no logs are generated.",
    ).optional(),
    logActions: z.array(
      z.enum(["LOGGABLE_ACTION_UNSPECIFIED", "FIND", "DELETE", "COPY"]),
    ).describe(
      "Specifies the actions to be logged. If empty, no logs are generated.",
    ).optional(),
  }).describe(
    "Specifies the logging behavior for transfer operations. Logs can be sent to Cloud Logging for all transfer types. See [Read transfer logs](https://cloud.google.com/storage-transfer/docs/read-transfer-logs) for details.",
  ).optional(),
  name: z.string().describe(
    'A unique name (within the transfer project) assigned when the job is created. If this field is empty in a CreateTransferJobRequest, Storage Transfer Service assigns a unique name. Otherwise, the specified name is used as the unique name for this job. If the specified name is in use by a job, the creation request fails with an ALREADY_EXISTS error. This name must start with `"transferJobs/"` prefix and end with a letter or a number, and should be no more than 128 characters. For transfers involving PosixFilesystem, this name must start with `transferJobs/OPI` specifically. For all other transfer types, this name must not start with `transferJobs/OPI`. Non-PosixFilesystem example: `"transferJobs/^(?!OPI)[A-Za-z0-9-._~]*[A-Za-z0-9]$"` PosixFilesystem example: `"transferJobs/OPI^[A-Za-z0-9-._~]*[A-Za-z0-9]$"` Applications must not rely on the enforcement of naming requirements involving OPI. Invalid job names fail with an INVALID_ARGUMENT error.',
  ).optional(),
  notificationConfig: z.object({
    eventTypes: z.array(
      z.enum([
        "EVENT_TYPE_UNSPECIFIED",
        "TRANSFER_OPERATION_SUCCESS",
        "TRANSFER_OPERATION_FAILED",
        "TRANSFER_OPERATION_ABORTED",
      ]),
    ).describe(
      "Event types for which a notification is desired. If empty, send notifications for all event types.",
    ).optional(),
    payloadFormat: z.enum(["PAYLOAD_FORMAT_UNSPECIFIED", "NONE", "JSON"])
      .describe(
        "Required. The desired format of the notification message payloads.",
      ).optional(),
    pubsubTopic: z.string().describe(
      "Required. The `Topic.name` of the Pub/Sub topic to which to publish notifications. Must be of the format: `projects/{project}/topics/{topic}`. Not matching this format results in an INVALID_ARGUMENT error.",
    ).optional(),
  }).describe(
    'Specification to configure notifications published to Pub/Sub. Notifications are published to the customer-provided topic using the following `PubsubMessage.attributes`: * `"eventType"`: one of the EventType values * `"payloadFormat"`: one of the PayloadFormat values * `"projectId"`: the project_id of the `TransferOperation` * `"transferJobName"`: the transfer_job_name of the `TransferOperation` * `"transferOperationName"`: the name of the `TransferOperation` The `PubsubMessage.data` contains a TransferOperation resource formatted according to the specified `PayloadFormat`.',
  ).optional(),
  projectId: z.string().describe(
    "Required. The ID of the Google Cloud project that owns the job.",
  ).optional(),
  replicationSpec: z.object({
    gcsDataSink: z.object({
      bucketName: z.string().describe(
        "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
      ).optional(),
      managedFolderTransferEnabled: z.boolean().describe(
        "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
      ).optional(),
    }).describe(
      "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
    ).optional(),
    gcsDataSource: z.object({
      bucketName: z.string().describe(
        "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
      ).optional(),
      managedFolderTransferEnabled: z.boolean().describe(
        "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
      ).optional(),
    }).describe(
      "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
    ).optional(),
    objectConditions: z.object({
      excludePrefixes: z.array(z.string()).describe(
        "If you specify `exclude_prefixes`, Storage Transfer Service uses the items in the `exclude_prefixes` array to determine which objects to exclude from a transfer. Objects must not start with one of the matching `exclude_prefixes` for inclusion in a transfer. The following are requirements of `exclude_prefixes`: * Each exclude-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each exclude-prefix must omit the leading slash. For example, to exclude the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the exclude-prefix as `logs/y=2015/requests.gz`. * None of the exclude-prefix values can be empty, if specified. * Each exclude-prefix must exclude a distinct portion of the object namespace. No exclude-prefix may be a prefix of another exclude-prefix. * If include_prefixes is specified, then each exclude-prefix must start with the value of a path explicitly included by `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
      ).optional(),
      includePrefixes: z.array(z.string()).describe(
        "If you specify `include_prefixes`, Storage Transfer Service uses the items in the `include_prefixes` array to determine which objects to include in a transfer. Objects must start with one of the matching `include_prefixes` for inclusion in the transfer. If exclude_prefixes is specified, objects must not start with any of the `exclude_prefixes` specified for inclusion in the transfer. The following are requirements of `include_prefixes`: * Each include-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each include-prefix must omit the leading slash. For example, to include the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as `logs/y=2015/requests.gz`. * None of the include-prefix values can be empty, if specified. * Each include-prefix must include a distinct portion of the object namespace. No include-prefix may be a prefix of another include-prefix. The max size of `include_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
      ).optional(),
      lastModifiedBefore: z.string().describe(
        'If specified, only objects with a "last modification time" before this timestamp and objects that don\'t have a "last modification time" are transferred.',
      ).optional(),
      lastModifiedSince: z.string().describe(
        'If specified, only objects with a "last modification time" on or after this timestamp and objects that don\'t have a "last modification time" are transferred. The `last_modified_since` and `last_modified_before` fields can be used together for chunked data processing. For example, consider a script that processes each day\'s worth of data at a time. For that you\'d set each of the fields as follows: * `last_modified_since` to the start of the day * `last_modified_before` to the end of the day',
      ).optional(),
      matchGlob: z.string().describe(
        "Optional. If specified, only objects matching this glob are transferred.",
      ).optional(),
      maxTimeElapsedSinceLastModification: z.string().describe(
        'Ensures that objects are not transferred if a specific maximum time has elapsed since the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation`and the "last modification time" of the object is less than the value of max_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
      ).optional(),
      minTimeElapsedSinceLastModification: z.string().describe(
        'Ensures that objects are not transferred until a specific minimum time has elapsed after the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation` and the "last modification time" of the object is equal to or greater than the value of min_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
      ).optional(),
    }).describe(
      'Conditions that determine which objects are transferred. Applies only to Cloud Data Sources such as S3, Azure, and Cloud Storage. The "last modification time" refers to the time of the last change to the object\'s content or metadata — specifically, this is the `updated` property of Cloud Storage objects, the `LastModified` field of S3 objects, and the `Last-Modified` header of Azure blobs. For S3 objects, the `LastModified` value is the time the object begins uploading. If the object meets your "last modification time" criteria, but has not finished uploading, the object is not transferred. See [Transfer from Amazon S3 to Cloud Storage](https://cloud.google.com/storage-transfer/docs/create-transfers/agentless/s3#transfer_options) for more information. Transfers with a PosixFilesystem source or destination don\'t support `ObjectConditions`.',
    ).optional(),
    transferOptions: z.object({
      deleteObjectsFromSourceAfterTransfer: z.boolean().describe(
        "Whether objects should be deleted from the source after they are transferred to the sink. **Note:** This option and delete_objects_unique_in_sink are mutually exclusive.",
      ).optional(),
      deleteObjectsUniqueInSink: z.boolean().describe(
        "Whether objects that exist only in the sink should be deleted. **Note:** This option and delete_objects_from_source_after_transfer are mutually exclusive.",
      ).optional(),
      metadataOptions: z.object({
        acl: z.enum([
          "ACL_UNSPECIFIED",
          "ACL_DESTINATION_BUCKET_DEFAULT",
          "ACL_PRESERVE",
        ]).describe(
          "Specifies how each object's ACLs should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as ACL_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        gid: z.enum(["GID_UNSPECIFIED", "GID_SKIP", "GID_NUMBER"]).describe(
          "Specifies how each file's POSIX group ID (GID) attribute should be handled by the transfer. By default, GID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
        kmsKey: z.enum([
          "KMS_KEY_UNSPECIFIED",
          "KMS_KEY_DESTINATION_BUCKET_DEFAULT",
          "KMS_KEY_PRESERVE",
        ]).describe(
          "Specifies how each object's Cloud KMS customer-managed encryption key (CMEK) is preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as KMS_KEY_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        mode: z.enum(["MODE_UNSPECIFIED", "MODE_SKIP", "MODE_PRESERVE"])
          .describe(
            "Specifies how each file's mode attribute should be handled by the transfer. By default, mode is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
        storageClass: z.enum([
          "STORAGE_CLASS_UNSPECIFIED",
          "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT",
          "STORAGE_CLASS_PRESERVE",
          "STORAGE_CLASS_STANDARD",
          "STORAGE_CLASS_NEARLINE",
          "STORAGE_CLASS_COLDLINE",
          "STORAGE_CLASS_ARCHIVE",
        ]).describe(
          "Specifies the storage class to set on objects being transferred to Google Cloud Storage buckets. If unspecified, the default behavior is the same as STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        symlink: z.enum([
          "SYMLINK_UNSPECIFIED",
          "SYMLINK_SKIP",
          "SYMLINK_PRESERVE",
        ]).describe(
          "Specifies how symlinks should be handled by the transfer. By default, symlinks are not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
        temporaryHold: z.enum([
          "TEMPORARY_HOLD_UNSPECIFIED",
          "TEMPORARY_HOLD_SKIP",
          "TEMPORARY_HOLD_PRESERVE",
        ]).describe(
          "Specifies how each object's temporary hold status should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as TEMPORARY_HOLD_PRESERVE.",
        ).optional(),
        timeCreated: z.enum([
          "TIME_CREATED_UNSPECIFIED",
          "TIME_CREATED_SKIP",
          "TIME_CREATED_PRESERVE_AS_CUSTOM_TIME",
        ]).describe(
          "Specifies how each object's `timeCreated` metadata is preserved for transfers. If unspecified, the default behavior is the same as TIME_CREATED_SKIP. This behavior is supported for transfers to Cloud Storage buckets from Cloud Storage, Amazon S3, S3-compatible storage, and Azure sources.",
        ).optional(),
        uid: z.enum(["UID_UNSPECIFIED", "UID_SKIP", "UID_NUMBER"]).describe(
          "Specifies how each file's POSIX user ID (UID) attribute should be handled by the transfer. By default, UID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
      }).describe("Specifies the metadata options for running a transfer.")
        .optional(),
      overwriteObjectsAlreadyExistingInSink: z.boolean().describe(
        "When to overwrite objects that already exist in the sink. The default is that only objects that are different from the source are overwritten. If true, all objects in the sink whose name matches an object in the source are overwritten with the source object.",
      ).optional(),
      overwriteWhen: z.enum([
        "OVERWRITE_WHEN_UNSPECIFIED",
        "DIFFERENT",
        "NEVER",
        "ALWAYS",
      ]).describe(
        "When to overwrite objects that already exist in the sink. If not set, overwrite behavior is determined by overwrite_objects_already_existing_in_sink.",
      ).optional(),
    }).describe(
      "TransferOptions define the actions to be performed on objects in a transfer.",
    ).optional(),
  }).describe(
    "Specifies the configuration for a cross-bucket replication job. Cross-bucket replication copies new or updated objects from a source Cloud Storage bucket to a destination Cloud Storage bucket. Existing objects in the source bucket are not copied by a new cross-bucket replication job.",
  ).optional(),
  schedule: z.object({
    endTimeOfDay: z.object({
      hours: z.number().int().describe(
        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
      ).optional(),
      minutes: z.number().int().describe(
        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
      ).optional(),
      nanos: z.number().int().describe(
        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
      ).optional(),
      seconds: z.number().int().describe(
        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
      ).optional(),
    }).describe(
      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
    ).optional(),
    repeatInterval: z.string().describe(
      "Interval between the start of each scheduled TransferOperation. If unspecified, the default value is 24 hours. This value may not be less than 1 hour.",
    ).optional(),
    scheduleEndDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    scheduleStartDate: z.object({
      day: z.number().int().describe(
        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
      ).optional(),
      month: z.number().int().describe(
        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
      ).optional(),
      year: z.number().int().describe(
        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
      ).optional(),
    }).describe(
      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
    ).optional(),
    startTimeOfDay: z.object({
      hours: z.number().int().describe(
        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
      ).optional(),
      minutes: z.number().int().describe(
        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
      ).optional(),
      nanos: z.number().int().describe(
        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
      ).optional(),
      seconds: z.number().int().describe(
        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
      ).optional(),
    }).describe(
      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
    ).optional(),
  }).describe("Transfers can be scheduled to recur or to run just once.")
    .optional(),
  serviceAccount: z.string().describe(
    "Optional. The user-managed service account to which to delegate service agent permissions. You can grant Cloud Storage bucket permissions to this service account instead of to the Transfer Service service agent. Either the service account email (`SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`) or the unique ID (`123456789012345678901`) are accepted. See https://docs.cloud.google.com/storage-transfer/docs/delegate-service-agent-permissions for required permissions.",
  ).optional(),
  status: z.enum(["STATUS_UNSPECIFIED", "ENABLED", "DISABLED", "DELETED"])
    .describe(
      "Status of the job. This value MUST be specified for `CreateTransferJobRequests`. **Note:** The effect of the new job status takes place during a subsequent job run. For example, if you change the job status from ENABLED to DISABLED, and an operation spawned by the transfer is running, the status change would not affect the current operation.",
    ).optional(),
  transferSpec: z.object({
    awsS3CompatibleDataSource: z.object({
      bucketName: z.string().describe(
        "Required. Specifies the name of the bucket.",
      ).optional(),
      endpoint: z.string().describe(
        "Required. Specifies the endpoint of the storage service.",
      ).optional(),
      path: z.string().describe(
        "Specifies the root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
      ).optional(),
      region: z.string().describe(
        "Specifies the region to sign requests with. This can be left blank if requests should be signed with an empty region.",
      ).optional(),
      s3Metadata: z.object({
        authMethod: z.enum([
          "AUTH_METHOD_UNSPECIFIED",
          "AUTH_METHOD_AWS_SIGNATURE_V4",
          "AUTH_METHOD_AWS_SIGNATURE_V2",
        ]).describe(
          "Specifies the authentication and authorization method used by the storage service. When not specified, Transfer Service will attempt to determine right auth method to use.",
        ).optional(),
        listApi: z.enum([
          "LIST_API_UNSPECIFIED",
          "LIST_OBJECTS_V2",
          "LIST_OBJECTS",
        ]).describe(
          "The Listing API to use for discovering objects. When not specified, Transfer Service will attempt to determine the right API to use.",
        ).optional(),
        protocol: z.enum([
          "NETWORK_PROTOCOL_UNSPECIFIED",
          "NETWORK_PROTOCOL_HTTPS",
          "NETWORK_PROTOCOL_HTTP",
        ]).describe(
          "Specifies the network protocol of the agent. When not specified, the default value of NetworkProtocol NETWORK_PROTOCOL_HTTPS is used.",
        ).optional(),
        requestModel: z.enum([
          "REQUEST_MODEL_UNSPECIFIED",
          "REQUEST_MODEL_VIRTUAL_HOSTED_STYLE",
          "REQUEST_MODEL_PATH_STYLE",
        ]).describe(
          "Specifies the API request model used to call the storage service. When not specified, the default value of RequestModel REQUEST_MODEL_VIRTUAL_HOSTED_STYLE is used.",
        ).optional(),
      }).describe(
        "S3CompatibleMetadata contains the metadata fields that apply to the basic types of S3-compatible data providers.",
      ).optional(),
    }).describe("An AwsS3CompatibleData resource.").optional(),
    awsS3DataSource: z.object({
      awsAccessKey: z.object({
        accessKeyId: z.string().describe("Required. AWS access key ID.")
          .optional(),
        secretAccessKey: z.string().describe(
          "Required. AWS secret access key. This field is not returned in RPC responses.",
        ).optional(),
      }).describe(
        "AWS access key (see [AWS Security Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)). For information on our data retention policy for user credentials, see [User credentials](/storage-transfer/docs/data-retention#user-credentials).",
      ).optional(),
      bucketName: z.string().describe(
        "Required. S3 Bucket name (see [Creating a bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/create-bucket-get-location-example.html)).",
      ).optional(),
      cloudfrontDomain: z.string().describe(
        "Optional. The CloudFront distribution domain name pointing to this bucket, to use when fetching. See [Transfer from S3 via CloudFront](https://cloud.google.com/storage-transfer/docs/s3-cloudfront) for more information. Format: `https://{id}.cloudfront.net` or any valid custom domain. Must begin with `https://`.",
      ).optional(),
      credentialsSecret: z.string().describe(
        'Optional. The Resource name of a secret in Secret Manager. AWS credentials must be stored in Secret Manager in JSON format: { "access_key_id": "ACCESS_KEY_ID", "secret_access_key": "SECRET_ACCESS_KEY" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See [Configure access to a source: Amazon S3] (https://cloud.google.com/storage-transfer/docs/source-amazon-s3#secret_manager) for more information. If `credentials_secret` is specified, do not specify role_arn or aws_access_key. Format: `projects/{project_number}/secrets/{secret_name}`',
      ).optional(),
      managedPrivateNetwork: z.boolean().describe(
        "Egress bytes over a Google-managed private network. This network is shared between other users of Storage Transfer Service.",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
      ).optional(),
      privateNetworkService: z.string().describe(
        "Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}`",
      ).optional(),
      roleArn: z.string().describe(
        "The Amazon Resource Name (ARN) of the role to support temporary credentials via `AssumeRoleWithWebIdentity`. For more information about ARNs, see [IAM ARNs](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns). When a role ARN is provided, Transfer Service fetches temporary credentials for the session using a `AssumeRoleWithWebIdentity` call for the provided role using the GoogleServiceAccount for this project.",
      ).optional(),
    }).describe(
      "An AwsS3Data resource can be a data source, but not a data sink. In an AwsS3Data resource, an object's name is the S3 object's key name.",
    ).optional(),
    azureBlobStorageDataSource: z.object({
      azureCredentials: z.object({
        sasToken: z.string().describe(
          "Required. Azure shared access signature (SAS). For more information about SAS, see [Grant limited access to Azure Storage resources using shared access signatures (SAS)](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview).",
        ).optional(),
      }).describe(
        "Azure credentials For information on our data retention policy for user credentials, see [User credentials](/storage-transfer/docs/data-retention#user-credentials).",
      ).optional(),
      container: z.string().describe(
        "Required. The container to transfer from the Azure Storage account.",
      ).optional(),
      credentialsSecret: z.string().describe(
        'Optional. The Resource name of a secret in Secret Manager. The Azure SAS token must be stored in Secret Manager in JSON format: { "sas_token": "SAS_TOKEN" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See [Configure access to a source: Microsoft Azure Blob Storage] (https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#secret_manager) for more information. If `credentials_secret` is specified, do not specify azure_credentials. Format: `projects/{project_number}/secrets/{secret_name}`',
      ).optional(),
      federatedIdentityConfig: z.object({
        clientId: z.string().describe(
          "Required. The client (application) ID of the application with federated credentials.",
        ).optional(),
        tenantId: z.string().describe(
          "Required. The tenant (directory) ID of the application with federated credentials.",
        ).optional(),
      }).describe(
        "The identity of an Azure application through which Storage Transfer Service can authenticate requests using Azure workload identity federation. Storage Transfer Service can issue requests to Azure Storage through registered Azure applications, eliminating the need to pass credentials to Storage Transfer Service directly. To configure federated identity, see [Configure access to Microsoft Azure Storage](https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#option_3_authenticate_using_federated_identity).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
      ).optional(),
      privateNetworkService: z.string().describe(
        "Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}`",
      ).optional(),
      storageAccount: z.string().describe(
        "Required. The name of the Azure Storage account.",
      ).optional(),
    }).describe(
      "An AzureBlobStorageData resource can be a data source, but not a data sink. An AzureBlobStorageData resource represents one Azure container. The storage account determines the [Azure endpoint](https://docs.microsoft.com/en-us/azure/storage/common/storage-create-storage-account#storage-account-endpoints). In an AzureBlobStorageData resource, a blobs's name is the [Azure Blob Storage blob's key name](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#blob-names).",
    ).optional(),
    gcsDataSink: z.object({
      bucketName: z.string().describe(
        "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
      ).optional(),
      managedFolderTransferEnabled: z.boolean().describe(
        "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
      ).optional(),
    }).describe(
      "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
    ).optional(),
    gcsDataSource: z.object({
      bucketName: z.string().describe(
        "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
      ).optional(),
      managedFolderTransferEnabled: z.boolean().describe(
        "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
      ).optional(),
    }).describe(
      "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
    ).optional(),
    gcsIntermediateDataLocation: z.object({
      bucketName: z.string().describe(
        "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
      ).optional(),
      managedFolderTransferEnabled: z.boolean().describe(
        "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
      ).optional(),
      path: z.string().describe(
        "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
      ).optional(),
    }).describe(
      "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
    ).optional(),
    hdfsDataSource: z.object({
      path: z.string().describe("Root path to transfer files.").optional(),
    }).describe(
      "An HdfsData resource specifies a path within an HDFS entity (e.g. a cluster). All cluster-specific settings, such as namenodes and ports, are configured on the transfer agents servicing requests, so HdfsData only contains the root path to the data in our transfer.",
    ).optional(),
    httpDataSource: z.object({
      listUrl: z.string().describe(
        "Required. The URL that points to the file that stores the object list entries. This file must allow public access. The URL is either an HTTP/HTTPS address (e.g. `https://example.com/urllist.tsv`) or a Cloud Storage path (e.g. `gs://my-bucket/urllist.tsv`).",
      ).optional(),
    }).describe(
      'An HttpData resource specifies a list of objects on the web to be transferred over HTTP. The information of the objects to be transferred is contained in a file referenced by a URL. The first line in the file must be `"TsvHttpData-1.0"`, which specifies the format of the file. Subsequent lines specify the information of the list of objects, one object per list entry. Each entry has the following tab-delimited fields: * **HTTP URL** — The location of the object. * **Length** — The size of the object in bytes. * **MD5** — The base64-encoded MD5 hash of the object. For an example of a valid TSV file, see [Transferring data from URLs](https://cloud.google.com/storage-transfer/docs/create-url-list). When transferring data based on a URL list, keep the following in mind: * When an object located at `http(s)://hostname:port/` is transferred to a data sink, the name of the object at the data sink is `/`. * If the specified size of an object does not match the actual size of the object fetched, the object is not transferred. * If the specified MD5 does not match the MD5 computed from the transferred bytes, the object transfer fails. * Ensure that each URL you specify is publicly accessible. For example, in Cloud Storage you can [share an object publicly] (/storage/docs/cloud-console#_sharingdata) and get a link to it. * Storage Transfer Service obeys `robots.txt` rules and requires the source HTTP server to support `Range` requests and to return a `Content-Length` header in each response. * ObjectConditions have no effect when filtering objects to transfer.',
    ).optional(),
    objectConditions: z.object({
      excludePrefixes: z.array(z.string()).describe(
        "If you specify `exclude_prefixes`, Storage Transfer Service uses the items in the `exclude_prefixes` array to determine which objects to exclude from a transfer. Objects must not start with one of the matching `exclude_prefixes` for inclusion in a transfer. The following are requirements of `exclude_prefixes`: * Each exclude-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each exclude-prefix must omit the leading slash. For example, to exclude the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the exclude-prefix as `logs/y=2015/requests.gz`. * None of the exclude-prefix values can be empty, if specified. * Each exclude-prefix must exclude a distinct portion of the object namespace. No exclude-prefix may be a prefix of another exclude-prefix. * If include_prefixes is specified, then each exclude-prefix must start with the value of a path explicitly included by `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
      ).optional(),
      includePrefixes: z.array(z.string()).describe(
        "If you specify `include_prefixes`, Storage Transfer Service uses the items in the `include_prefixes` array to determine which objects to include in a transfer. Objects must start with one of the matching `include_prefixes` for inclusion in the transfer. If exclude_prefixes is specified, objects must not start with any of the `exclude_prefixes` specified for inclusion in the transfer. The following are requirements of `include_prefixes`: * Each include-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each include-prefix must omit the leading slash. For example, to include the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as `logs/y=2015/requests.gz`. * None of the include-prefix values can be empty, if specified. * Each include-prefix must include a distinct portion of the object namespace. No include-prefix may be a prefix of another include-prefix. The max size of `include_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
      ).optional(),
      lastModifiedBefore: z.string().describe(
        'If specified, only objects with a "last modification time" before this timestamp and objects that don\'t have a "last modification time" are transferred.',
      ).optional(),
      lastModifiedSince: z.string().describe(
        'If specified, only objects with a "last modification time" on or after this timestamp and objects that don\'t have a "last modification time" are transferred. The `last_modified_since` and `last_modified_before` fields can be used together for chunked data processing. For example, consider a script that processes each day\'s worth of data at a time. For that you\'d set each of the fields as follows: * `last_modified_since` to the start of the day * `last_modified_before` to the end of the day',
      ).optional(),
      matchGlob: z.string().describe(
        "Optional. If specified, only objects matching this glob are transferred.",
      ).optional(),
      maxTimeElapsedSinceLastModification: z.string().describe(
        'Ensures that objects are not transferred if a specific maximum time has elapsed since the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation`and the "last modification time" of the object is less than the value of max_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
      ).optional(),
      minTimeElapsedSinceLastModification: z.string().describe(
        'Ensures that objects are not transferred until a specific minimum time has elapsed after the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation` and the "last modification time" of the object is equal to or greater than the value of min_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
      ).optional(),
    }).describe(
      'Conditions that determine which objects are transferred. Applies only to Cloud Data Sources such as S3, Azure, and Cloud Storage. The "last modification time" refers to the time of the last change to the object\'s content or metadata — specifically, this is the `updated` property of Cloud Storage objects, the `LastModified` field of S3 objects, and the `Last-Modified` header of Azure blobs. For S3 objects, the `LastModified` value is the time the object begins uploading. If the object meets your "last modification time" criteria, but has not finished uploading, the object is not transferred. See [Transfer from Amazon S3 to Cloud Storage](https://cloud.google.com/storage-transfer/docs/create-transfers/agentless/s3#transfer_options) for more information. Transfers with a PosixFilesystem source or destination don\'t support `ObjectConditions`.',
    ).optional(),
    posixDataSink: z.object({
      rootDirectory: z.string().describe(
        "Root directory path to the filesystem.",
      ).optional(),
    }).describe("A POSIX filesystem resource.").optional(),
    posixDataSource: z.object({
      rootDirectory: z.string().describe(
        "Root directory path to the filesystem.",
      ).optional(),
    }).describe("A POSIX filesystem resource.").optional(),
    sinkAgentPoolName: z.string().describe(
      "Specifies the agent pool name associated with the posix data sink. When unspecified, the default name is used.",
    ).optional(),
    sourceAgentPoolName: z.string().describe(
      "Specifies the agent pool name associated with the posix data source. When unspecified, the default name is used.",
    ).optional(),
    transferManifest: z.object({
      location: z.string().describe(
        "Specifies the path to the manifest in Cloud Storage. The Google-managed service account for the transfer must have `storage.objects.get` permission for this object. An example path is `gs://bucket_name/path/manifest.csv`.",
      ).optional(),
    }).describe("Specifies where the manifest is located.").optional(),
    transferOptions: z.object({
      deleteObjectsFromSourceAfterTransfer: z.boolean().describe(
        "Whether objects should be deleted from the source after they are transferred to the sink. **Note:** This option and delete_objects_unique_in_sink are mutually exclusive.",
      ).optional(),
      deleteObjectsUniqueInSink: z.boolean().describe(
        "Whether objects that exist only in the sink should be deleted. **Note:** This option and delete_objects_from_source_after_transfer are mutually exclusive.",
      ).optional(),
      metadataOptions: z.object({
        acl: z.enum([
          "ACL_UNSPECIFIED",
          "ACL_DESTINATION_BUCKET_DEFAULT",
          "ACL_PRESERVE",
        ]).describe(
          "Specifies how each object's ACLs should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as ACL_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        gid: z.enum(["GID_UNSPECIFIED", "GID_SKIP", "GID_NUMBER"]).describe(
          "Specifies how each file's POSIX group ID (GID) attribute should be handled by the transfer. By default, GID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
        kmsKey: z.enum([
          "KMS_KEY_UNSPECIFIED",
          "KMS_KEY_DESTINATION_BUCKET_DEFAULT",
          "KMS_KEY_PRESERVE",
        ]).describe(
          "Specifies how each object's Cloud KMS customer-managed encryption key (CMEK) is preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as KMS_KEY_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        mode: z.enum(["MODE_UNSPECIFIED", "MODE_SKIP", "MODE_PRESERVE"])
          .describe(
            "Specifies how each file's mode attribute should be handled by the transfer. By default, mode is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
        storageClass: z.enum([
          "STORAGE_CLASS_UNSPECIFIED",
          "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT",
          "STORAGE_CLASS_PRESERVE",
          "STORAGE_CLASS_STANDARD",
          "STORAGE_CLASS_NEARLINE",
          "STORAGE_CLASS_COLDLINE",
          "STORAGE_CLASS_ARCHIVE",
        ]).describe(
          "Specifies the storage class to set on objects being transferred to Google Cloud Storage buckets. If unspecified, the default behavior is the same as STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT.",
        ).optional(),
        symlink: z.enum([
          "SYMLINK_UNSPECIFIED",
          "SYMLINK_SKIP",
          "SYMLINK_PRESERVE",
        ]).describe(
          "Specifies how symlinks should be handled by the transfer. By default, symlinks are not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
        temporaryHold: z.enum([
          "TEMPORARY_HOLD_UNSPECIFIED",
          "TEMPORARY_HOLD_SKIP",
          "TEMPORARY_HOLD_PRESERVE",
        ]).describe(
          "Specifies how each object's temporary hold status should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as TEMPORARY_HOLD_PRESERVE.",
        ).optional(),
        timeCreated: z.enum([
          "TIME_CREATED_UNSPECIFIED",
          "TIME_CREATED_SKIP",
          "TIME_CREATED_PRESERVE_AS_CUSTOM_TIME",
        ]).describe(
          "Specifies how each object's `timeCreated` metadata is preserved for transfers. If unspecified, the default behavior is the same as TIME_CREATED_SKIP. This behavior is supported for transfers to Cloud Storage buckets from Cloud Storage, Amazon S3, S3-compatible storage, and Azure sources.",
        ).optional(),
        uid: z.enum(["UID_UNSPECIFIED", "UID_SKIP", "UID_NUMBER"]).describe(
          "Specifies how each file's POSIX user ID (UID) attribute should be handled by the transfer. By default, UID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
        ).optional(),
      }).describe("Specifies the metadata options for running a transfer.")
        .optional(),
      overwriteObjectsAlreadyExistingInSink: z.boolean().describe(
        "When to overwrite objects that already exist in the sink. The default is that only objects that are different from the source are overwritten. If true, all objects in the sink whose name matches an object in the source are overwritten with the source object.",
      ).optional(),
      overwriteWhen: z.enum([
        "OVERWRITE_WHEN_UNSPECIFIED",
        "DIFFERENT",
        "NEVER",
        "ALWAYS",
      ]).describe(
        "When to overwrite objects that already exist in the sink. If not set, overwrite behavior is determined by overwrite_objects_already_existing_in_sink.",
      ).optional(),
    }).describe(
      "TransferOptions define the actions to be performed on objects in a transfer.",
    ).optional(),
  }).describe("Configuration for running a transfer.").optional(),
  transferJob: z.object({
    creationTime: z.string().describe(
      "Output only. The time that the transfer job was created.",
    ).optional(),
    deletionTime: z.string().describe(
      "Output only. The time that the transfer job was deleted.",
    ).optional(),
    description: z.string().describe(
      "A description provided by the user for the job. Its max length is 1024 bytes when Unicode-encoded.",
    ).optional(),
    eventStream: z.object({
      eventStreamExpirationTime: z.string().describe(
        "Specifies the data and time at which Storage Transfer Service stops listening for events from this stream. After this time, any transfers in progress will complete, but no new transfers are initiated.",
      ).optional(),
      eventStreamStartTime: z.string().describe(
        "Specifies the date and time that Storage Transfer Service starts listening for events from this stream. If no start time is specified or start time is in the past, Storage Transfer Service starts listening immediately.",
      ).optional(),
      name: z.string().describe(
        "Required. Specifies a unique name of the resource such as AWS SQS ARN in the form 'arn:aws:sqs:region:account_id:queue_name', or Pub/Sub subscription resource name in the form 'projects/{project}/subscriptions/{sub}'.",
      ).optional(),
    }).describe(
      "Specifies the Event-driven transfer options. Event-driven transfers listen to an event stream to transfer updated files.",
    ).optional(),
    lastModificationTime: z.string().describe(
      "Output only. The time that the transfer job was last modified.",
    ).optional(),
    latestOperationName: z.string().describe(
      "The name of the most recently started TransferOperation of this JobConfig. Present if a TransferOperation has been created for this JobConfig.",
    ).optional(),
    loggingConfig: z.object({
      enableOnpremGcsTransferLogs: z.boolean().describe(
        "For PosixFilesystem transfers, enables [file system transfer logs](https://cloud.google.com/storage-transfer/docs/on-prem-transfer-log-format) instead of, or in addition to, Cloud Logging. This option ignores [LoggableAction] and [LoggableActionState]. If these are set, Cloud Logging will also be enabled for this transfer.",
      ).optional(),
      logActionStates: z.array(
        z.enum([
          "LOGGABLE_ACTION_STATE_UNSPECIFIED",
          "SUCCEEDED",
          "FAILED",
          "SKIPPED",
        ]),
      ).describe(
        "States in which `log_actions` are logged. If empty, no logs are generated.",
      ).optional(),
      logActions: z.array(
        z.enum(["LOGGABLE_ACTION_UNSPECIFIED", "FIND", "DELETE", "COPY"]),
      ).describe(
        "Specifies the actions to be logged. If empty, no logs are generated.",
      ).optional(),
    }).describe(
      "Specifies the logging behavior for transfer operations. Logs can be sent to Cloud Logging for all transfer types. See [Read transfer logs](https://cloud.google.com/storage-transfer/docs/read-transfer-logs) for details.",
    ).optional(),
    name: z.string().describe(
      'A unique name (within the transfer project) assigned when the job is created. If this field is empty in a CreateTransferJobRequest, Storage Transfer Service assigns a unique name. Otherwise, the specified name is used as the unique name for this job. If the specified name is in use by a job, the creation request fails with an ALREADY_EXISTS error. This name must start with `"transferJobs/"` prefix and end with a letter or a number, and should be no more than 128 characters. For transfers involving PosixFilesystem, this name must start with `transferJobs/OPI` specifically. For all other transfer types, this name must not start with `transferJobs/OPI`. Non-PosixFilesystem example: `"transferJobs/^(?!OPI)[A-Za-z0-9-._~]*[A-Za-z0-9]$"` PosixFilesystem example: `"transferJobs/OPI^[A-Za-z0-9-._~]*[A-Za-z0-9]$"` Applications must not rely on the enforcement of naming requirements involving OPI. Invalid job names fail with an INVALID_ARGUMENT error.',
    ).optional(),
    notificationConfig: z.object({
      eventTypes: z.array(
        z.enum([
          "EVENT_TYPE_UNSPECIFIED",
          "TRANSFER_OPERATION_SUCCESS",
          "TRANSFER_OPERATION_FAILED",
          "TRANSFER_OPERATION_ABORTED",
        ]),
      ).describe(
        "Event types for which a notification is desired. If empty, send notifications for all event types.",
      ).optional(),
      payloadFormat: z.enum(["PAYLOAD_FORMAT_UNSPECIFIED", "NONE", "JSON"])
        .describe(
          "Required. The desired format of the notification message payloads.",
        ).optional(),
      pubsubTopic: z.string().describe(
        "Required. The `Topic.name` of the Pub/Sub topic to which to publish notifications. Must be of the format: `projects/{project}/topics/{topic}`. Not matching this format results in an INVALID_ARGUMENT error.",
      ).optional(),
    }).describe(
      'Specification to configure notifications published to Pub/Sub. Notifications are published to the customer-provided topic using the following `PubsubMessage.attributes`: * `"eventType"`: one of the EventType values * `"payloadFormat"`: one of the PayloadFormat values * `"projectId"`: the project_id of the `TransferOperation` * `"transferJobName"`: the transfer_job_name of the `TransferOperation` * `"transferOperationName"`: the name of the `TransferOperation` The `PubsubMessage.data` contains a TransferOperation resource formatted according to the specified `PayloadFormat`.',
    ).optional(),
    projectId: z.string().describe(
      "The ID of the Google Cloud project that owns the job.",
    ).optional(),
    replicationSpec: z.object({
      gcsDataSink: z.object({
        bucketName: z.string().describe(
          "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
        ).optional(),
        managedFolderTransferEnabled: z.boolean().describe(
          "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
        ).optional(),
      }).describe(
        "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
      ).optional(),
      gcsDataSource: z.object({
        bucketName: z.string().describe(
          "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
        ).optional(),
        managedFolderTransferEnabled: z.boolean().describe(
          "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
        ).optional(),
      }).describe(
        "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
      ).optional(),
      objectConditions: z.object({
        excludePrefixes: z.array(z.string()).describe(
          "If you specify `exclude_prefixes`, Storage Transfer Service uses the items in the `exclude_prefixes` array to determine which objects to exclude from a transfer. Objects must not start with one of the matching `exclude_prefixes` for inclusion in a transfer. The following are requirements of `exclude_prefixes`: * Each exclude-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each exclude-prefix must omit the leading slash. For example, to exclude the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the exclude-prefix as `logs/y=2015/requests.gz`. * None of the exclude-prefix values can be empty, if specified. * Each exclude-prefix must exclude a distinct portion of the object namespace. No exclude-prefix may be a prefix of another exclude-prefix. * If include_prefixes is specified, then each exclude-prefix must start with the value of a path explicitly included by `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
        ).optional(),
        includePrefixes: z.array(z.string()).describe(
          "If you specify `include_prefixes`, Storage Transfer Service uses the items in the `include_prefixes` array to determine which objects to include in a transfer. Objects must start with one of the matching `include_prefixes` for inclusion in the transfer. If exclude_prefixes is specified, objects must not start with any of the `exclude_prefixes` specified for inclusion in the transfer. The following are requirements of `include_prefixes`: * Each include-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each include-prefix must omit the leading slash. For example, to include the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as `logs/y=2015/requests.gz`. * None of the include-prefix values can be empty, if specified. * Each include-prefix must include a distinct portion of the object namespace. No include-prefix may be a prefix of another include-prefix. The max size of `include_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
        ).optional(),
        lastModifiedBefore: z.string().describe(
          'If specified, only objects with a "last modification time" before this timestamp and objects that don\'t have a "last modification time" are transferred.',
        ).optional(),
        lastModifiedSince: z.string().describe(
          'If specified, only objects with a "last modification time" on or after this timestamp and objects that don\'t have a "last modification time" are transferred. The `last_modified_since` and `last_modified_before` fields can be used together for chunked data processing. For example, consider a script that processes each day\'s worth of data at a time. For that you\'d set each of the fields as follows: * `last_modified_since` to the start of the day * `last_modified_before` to the end of the day',
        ).optional(),
        matchGlob: z.string().describe(
          "Optional. If specified, only objects matching this glob are transferred.",
        ).optional(),
        maxTimeElapsedSinceLastModification: z.string().describe(
          'Ensures that objects are not transferred if a specific maximum time has elapsed since the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation`and the "last modification time" of the object is less than the value of max_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
        ).optional(),
        minTimeElapsedSinceLastModification: z.string().describe(
          'Ensures that objects are not transferred until a specific minimum time has elapsed after the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation` and the "last modification time" of the object is equal to or greater than the value of min_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
        ).optional(),
      }).describe(
        'Conditions that determine which objects are transferred. Applies only to Cloud Data Sources such as S3, Azure, and Cloud Storage. The "last modification time" refers to the time of the last change to the object\'s content or metadata — specifically, this is the `updated` property of Cloud Storage objects, the `LastModified` field of S3 objects, and the `Last-Modified` header of Azure blobs. For S3 objects, the `LastModified` value is the time the object begins uploading. If the object meets your "last modification time" criteria, but has not finished uploading, the object is not transferred. See [Transfer from Amazon S3 to Cloud Storage](https://cloud.google.com/storage-transfer/docs/create-transfers/agentless/s3#transfer_options) for more information. Transfers with a PosixFilesystem source or destination don\'t support `ObjectConditions`.',
      ).optional(),
      transferOptions: z.object({
        deleteObjectsFromSourceAfterTransfer: z.boolean().describe(
          "Whether objects should be deleted from the source after they are transferred to the sink. **Note:** This option and delete_objects_unique_in_sink are mutually exclusive.",
        ).optional(),
        deleteObjectsUniqueInSink: z.boolean().describe(
          "Whether objects that exist only in the sink should be deleted. **Note:** This option and delete_objects_from_source_after_transfer are mutually exclusive.",
        ).optional(),
        metadataOptions: z.object({
          acl: z.enum([
            "ACL_UNSPECIFIED",
            "ACL_DESTINATION_BUCKET_DEFAULT",
            "ACL_PRESERVE",
          ]).describe(
            "Specifies how each object's ACLs should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as ACL_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          gid: z.enum(["GID_UNSPECIFIED", "GID_SKIP", "GID_NUMBER"]).describe(
            "Specifies how each file's POSIX group ID (GID) attribute should be handled by the transfer. By default, GID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
          kmsKey: z.enum([
            "KMS_KEY_UNSPECIFIED",
            "KMS_KEY_DESTINATION_BUCKET_DEFAULT",
            "KMS_KEY_PRESERVE",
          ]).describe(
            "Specifies how each object's Cloud KMS customer-managed encryption key (CMEK) is preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as KMS_KEY_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          mode: z.enum(["MODE_UNSPECIFIED", "MODE_SKIP", "MODE_PRESERVE"])
            .describe(
              "Specifies how each file's mode attribute should be handled by the transfer. By default, mode is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
            ).optional(),
          storageClass: z.enum([
            "STORAGE_CLASS_UNSPECIFIED",
            "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT",
            "STORAGE_CLASS_PRESERVE",
            "STORAGE_CLASS_STANDARD",
            "STORAGE_CLASS_NEARLINE",
            "STORAGE_CLASS_COLDLINE",
            "STORAGE_CLASS_ARCHIVE",
          ]).describe(
            "Specifies the storage class to set on objects being transferred to Google Cloud Storage buckets. If unspecified, the default behavior is the same as STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          symlink: z.enum([
            "SYMLINK_UNSPECIFIED",
            "SYMLINK_SKIP",
            "SYMLINK_PRESERVE",
          ]).describe(
            "Specifies how symlinks should be handled by the transfer. By default, symlinks are not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
          temporaryHold: z.enum([
            "TEMPORARY_HOLD_UNSPECIFIED",
            "TEMPORARY_HOLD_SKIP",
            "TEMPORARY_HOLD_PRESERVE",
          ]).describe(
            "Specifies how each object's temporary hold status should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as TEMPORARY_HOLD_PRESERVE.",
          ).optional(),
          timeCreated: z.enum([
            "TIME_CREATED_UNSPECIFIED",
            "TIME_CREATED_SKIP",
            "TIME_CREATED_PRESERVE_AS_CUSTOM_TIME",
          ]).describe(
            "Specifies how each object's `timeCreated` metadata is preserved for transfers. If unspecified, the default behavior is the same as TIME_CREATED_SKIP. This behavior is supported for transfers to Cloud Storage buckets from Cloud Storage, Amazon S3, S3-compatible storage, and Azure sources.",
          ).optional(),
          uid: z.enum(["UID_UNSPECIFIED", "UID_SKIP", "UID_NUMBER"]).describe(
            "Specifies how each file's POSIX user ID (UID) attribute should be handled by the transfer. By default, UID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
        }).describe("Specifies the metadata options for running a transfer.")
          .optional(),
        overwriteObjectsAlreadyExistingInSink: z.boolean().describe(
          "When to overwrite objects that already exist in the sink. The default is that only objects that are different from the source are overwritten. If true, all objects in the sink whose name matches an object in the source are overwritten with the source object.",
        ).optional(),
        overwriteWhen: z.enum([
          "OVERWRITE_WHEN_UNSPECIFIED",
          "DIFFERENT",
          "NEVER",
          "ALWAYS",
        ]).describe(
          "When to overwrite objects that already exist in the sink. If not set, overwrite behavior is determined by overwrite_objects_already_existing_in_sink.",
        ).optional(),
      }).describe(
        "TransferOptions define the actions to be performed on objects in a transfer.",
      ).optional(),
    }).describe(
      "Specifies the configuration for a cross-bucket replication job. Cross-bucket replication copies new or updated objects from a source Cloud Storage bucket to a destination Cloud Storage bucket. Existing objects in the source bucket are not copied by a new cross-bucket replication job.",
    ).optional(),
    schedule: z.object({
      endTimeOfDay: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
      repeatInterval: z.string().describe(
        "Interval between the start of each scheduled TransferOperation. If unspecified, the default value is 24 hours. This value may not be less than 1 hour.",
      ).optional(),
      scheduleEndDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      scheduleStartDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      startTimeOfDay: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    }).describe("Transfers can be scheduled to recur or to run just once.")
      .optional(),
    serviceAccount: z.string().describe(
      "Optional. The user-managed service account to which to delegate service agent permissions. You can grant Cloud Storage bucket permissions to this service account instead of to the Transfer Service service agent. Either the service account email (`SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`) or the unique ID (`123456789012345678901`) are accepted. See https://docs.cloud.google.com/storage-transfer/docs/delegate-service-agent-permissions for required permissions.",
    ).optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "ENABLED", "DISABLED", "DELETED"])
      .describe(
        "Status of the job. This value MUST be specified for `CreateTransferJobRequests`. **Note:** The effect of the new job status takes place during a subsequent job run. For example, if you change the job status from ENABLED to DISABLED, and an operation spawned by the transfer is running, the status change would not affect the current operation.",
      ).optional(),
    transferSpec: z.object({
      awsS3CompatibleDataSource: z.object({
        bucketName: z.string().describe(
          "Required. Specifies the name of the bucket.",
        ).optional(),
        endpoint: z.string().describe(
          "Required. Specifies the endpoint of the storage service.",
        ).optional(),
        path: z.string().describe(
          "Specifies the root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
        ).optional(),
        region: z.string().describe(
          "Specifies the region to sign requests with. This can be left blank if requests should be signed with an empty region.",
        ).optional(),
        s3Metadata: z.object({
          authMethod: z.enum([
            "AUTH_METHOD_UNSPECIFIED",
            "AUTH_METHOD_AWS_SIGNATURE_V4",
            "AUTH_METHOD_AWS_SIGNATURE_V2",
          ]).describe(
            "Specifies the authentication and authorization method used by the storage service. When not specified, Transfer Service will attempt to determine right auth method to use.",
          ).optional(),
          listApi: z.enum([
            "LIST_API_UNSPECIFIED",
            "LIST_OBJECTS_V2",
            "LIST_OBJECTS",
          ]).describe(
            "The Listing API to use for discovering objects. When not specified, Transfer Service will attempt to determine the right API to use.",
          ).optional(),
          protocol: z.enum([
            "NETWORK_PROTOCOL_UNSPECIFIED",
            "NETWORK_PROTOCOL_HTTPS",
            "NETWORK_PROTOCOL_HTTP",
          ]).describe(
            "Specifies the network protocol of the agent. When not specified, the default value of NetworkProtocol NETWORK_PROTOCOL_HTTPS is used.",
          ).optional(),
          requestModel: z.enum([
            "REQUEST_MODEL_UNSPECIFIED",
            "REQUEST_MODEL_VIRTUAL_HOSTED_STYLE",
            "REQUEST_MODEL_PATH_STYLE",
          ]).describe(
            "Specifies the API request model used to call the storage service. When not specified, the default value of RequestModel REQUEST_MODEL_VIRTUAL_HOSTED_STYLE is used.",
          ).optional(),
        }).describe(
          "S3CompatibleMetadata contains the metadata fields that apply to the basic types of S3-compatible data providers.",
        ).optional(),
      }).describe("An AwsS3CompatibleData resource.").optional(),
      awsS3DataSource: z.object({
        awsAccessKey: z.object({
          accessKeyId: z.string().describe("Required. AWS access key ID.")
            .optional(),
          secretAccessKey: z.string().describe(
            "Required. AWS secret access key. This field is not returned in RPC responses.",
          ).optional(),
        }).describe(
          "AWS access key (see [AWS Security Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)). For information on our data retention policy for user credentials, see [User credentials](/storage-transfer/docs/data-retention#user-credentials).",
        ).optional(),
        bucketName: z.string().describe(
          "Required. S3 Bucket name (see [Creating a bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/create-bucket-get-location-example.html)).",
        ).optional(),
        cloudfrontDomain: z.string().describe(
          "Optional. The CloudFront distribution domain name pointing to this bucket, to use when fetching. See [Transfer from S3 via CloudFront](https://cloud.google.com/storage-transfer/docs/s3-cloudfront) for more information. Format: `https://{id}.cloudfront.net` or any valid custom domain. Must begin with `https://`.",
        ).optional(),
        credentialsSecret: z.string().describe(
          'Optional. The Resource name of a secret in Secret Manager. AWS credentials must be stored in Secret Manager in JSON format: { "access_key_id": "ACCESS_KEY_ID", "secret_access_key": "SECRET_ACCESS_KEY" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See [Configure access to a source: Amazon S3] (https://cloud.google.com/storage-transfer/docs/source-amazon-s3#secret_manager) for more information. If `credentials_secret` is specified, do not specify role_arn or aws_access_key. Format: `projects/{project_number}/secrets/{secret_name}`',
        ).optional(),
        managedPrivateNetwork: z.boolean().describe(
          "Egress bytes over a Google-managed private network. This network is shared between other users of Storage Transfer Service.",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
        ).optional(),
        privateNetworkService: z.string().describe(
          "Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}`",
        ).optional(),
        roleArn: z.string().describe(
          "The Amazon Resource Name (ARN) of the role to support temporary credentials via `AssumeRoleWithWebIdentity`. For more information about ARNs, see [IAM ARNs](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns). When a role ARN is provided, Transfer Service fetches temporary credentials for the session using a `AssumeRoleWithWebIdentity` call for the provided role using the GoogleServiceAccount for this project.",
        ).optional(),
      }).describe(
        "An AwsS3Data resource can be a data source, but not a data sink. In an AwsS3Data resource, an object's name is the S3 object's key name.",
      ).optional(),
      azureBlobStorageDataSource: z.object({
        azureCredentials: z.object({
          sasToken: z.string().describe(
            "Required. Azure shared access signature (SAS). For more information about SAS, see [Grant limited access to Azure Storage resources using shared access signatures (SAS)](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview).",
          ).optional(),
        }).describe(
          "Azure credentials For information on our data retention policy for user credentials, see [User credentials](/storage-transfer/docs/data-retention#user-credentials).",
        ).optional(),
        container: z.string().describe(
          "Required. The container to transfer from the Azure Storage account.",
        ).optional(),
        credentialsSecret: z.string().describe(
          'Optional. The Resource name of a secret in Secret Manager. The Azure SAS token must be stored in Secret Manager in JSON format: { "sas_token": "SAS_TOKEN" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See [Configure access to a source: Microsoft Azure Blob Storage] (https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#secret_manager) for more information. If `credentials_secret` is specified, do not specify azure_credentials. Format: `projects/{project_number}/secrets/{secret_name}`',
        ).optional(),
        federatedIdentityConfig: z.object({
          clientId: z.string().describe(
            "Required. The client (application) ID of the application with federated credentials.",
          ).optional(),
          tenantId: z.string().describe(
            "Required. The tenant (directory) ID of the application with federated credentials.",
          ).optional(),
        }).describe(
          "The identity of an Azure application through which Storage Transfer Service can authenticate requests using Azure workload identity federation. Storage Transfer Service can issue requests to Azure Storage through registered Azure applications, eliminating the need to pass credentials to Storage Transfer Service directly. To configure federated identity, see [Configure access to Microsoft Azure Storage](https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#option_3_authenticate_using_federated_identity).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'.",
        ).optional(),
        privateNetworkService: z.string().describe(
          "Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}`",
        ).optional(),
        storageAccount: z.string().describe(
          "Required. The name of the Azure Storage account.",
        ).optional(),
      }).describe(
        "An AzureBlobStorageData resource can be a data source, but not a data sink. An AzureBlobStorageData resource represents one Azure container. The storage account determines the [Azure endpoint](https://docs.microsoft.com/en-us/azure/storage/common/storage-create-storage-account#storage-account-endpoints). In an AzureBlobStorageData resource, a blobs's name is the [Azure Blob Storage blob's key name](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#blob-names).",
      ).optional(),
      gcsDataSink: z.object({
        bucketName: z.string().describe(
          "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
        ).optional(),
        managedFolderTransferEnabled: z.boolean().describe(
          "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
        ).optional(),
      }).describe(
        "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
      ).optional(),
      gcsDataSource: z.object({
        bucketName: z.string().describe(
          "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
        ).optional(),
        managedFolderTransferEnabled: z.boolean().describe(
          "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
        ).optional(),
      }).describe(
        "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
      ).optional(),
      gcsIntermediateDataLocation: z.object({
        bucketName: z.string().describe(
          "Required. Cloud Storage bucket name. Must meet [Bucket Name Requirements](/storage/docs/naming#requirements).",
        ).optional(),
        managedFolderTransferEnabled: z.boolean().describe(
          "Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See [Transfer Cloud Storage managed folders](/storage-transfer/docs/managed-folders).",
        ).optional(),
        path: z.string().describe(
          "Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet [Object Name Requirements](/storage/docs/naming#objectnames).",
        ).optional(),
      }).describe(
        "In a GcsData resource, an object's name is the Cloud Storage object's name and its \"last modification time\" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.",
      ).optional(),
      hdfsDataSource: z.object({
        path: z.string().describe("Root path to transfer files.").optional(),
      }).describe(
        "An HdfsData resource specifies a path within an HDFS entity (e.g. a cluster). All cluster-specific settings, such as namenodes and ports, are configured on the transfer agents servicing requests, so HdfsData only contains the root path to the data in our transfer.",
      ).optional(),
      httpDataSource: z.object({
        listUrl: z.string().describe(
          "Required. The URL that points to the file that stores the object list entries. This file must allow public access. The URL is either an HTTP/HTTPS address (e.g. `https://example.com/urllist.tsv`) or a Cloud Storage path (e.g. `gs://my-bucket/urllist.tsv`).",
        ).optional(),
      }).describe(
        'An HttpData resource specifies a list of objects on the web to be transferred over HTTP. The information of the objects to be transferred is contained in a file referenced by a URL. The first line in the file must be `"TsvHttpData-1.0"`, which specifies the format of the file. Subsequent lines specify the information of the list of objects, one object per list entry. Each entry has the following tab-delimited fields: * **HTTP URL** — The location of the object. * **Length** — The size of the object in bytes. * **MD5** — The base64-encoded MD5 hash of the object. For an example of a valid TSV file, see [Transferring data from URLs](https://cloud.google.com/storage-transfer/docs/create-url-list). When transferring data based on a URL list, keep the following in mind: * When an object located at `http(s)://hostname:port/` is transferred to a data sink, the name of the object at the data sink is `/`. * If the specified size of an object does not match the actual size of the object fetched, the object is not transferred. * If the specified MD5 does not match the MD5 computed from the transferred bytes, the object transfer fails. * Ensure that each URL you specify is publicly accessible. For example, in Cloud Storage you can [share an object publicly] (/storage/docs/cloud-console#_sharingdata) and get a link to it. * Storage Transfer Service obeys `robots.txt` rules and requires the source HTTP server to support `Range` requests and to return a `Content-Length` header in each response. * ObjectConditions have no effect when filtering objects to transfer.',
      ).optional(),
      objectConditions: z.object({
        excludePrefixes: z.array(z.string()).describe(
          "If you specify `exclude_prefixes`, Storage Transfer Service uses the items in the `exclude_prefixes` array to determine which objects to exclude from a transfer. Objects must not start with one of the matching `exclude_prefixes` for inclusion in a transfer. The following are requirements of `exclude_prefixes`: * Each exclude-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each exclude-prefix must omit the leading slash. For example, to exclude the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the exclude-prefix as `logs/y=2015/requests.gz`. * None of the exclude-prefix values can be empty, if specified. * Each exclude-prefix must exclude a distinct portion of the object namespace. No exclude-prefix may be a prefix of another exclude-prefix. * If include_prefixes is specified, then each exclude-prefix must start with the value of a path explicitly included by `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
        ).optional(),
        includePrefixes: z.array(z.string()).describe(
          "If you specify `include_prefixes`, Storage Transfer Service uses the items in the `include_prefixes` array to determine which objects to include in a transfer. Objects must start with one of the matching `include_prefixes` for inclusion in the transfer. If exclude_prefixes is specified, objects must not start with any of the `exclude_prefixes` specified for inclusion in the transfer. The following are requirements of `include_prefixes`: * Each include-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. * Each include-prefix must omit the leading slash. For example, to include the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as `logs/y=2015/requests.gz`. * None of the include-prefix values can be empty, if specified. * Each include-prefix must include a distinct portion of the object namespace. No include-prefix may be a prefix of another include-prefix. The max size of `include_prefixes` is 1000. For more information, see [Filtering objects from transfers](/storage-transfer/docs/filtering-objects-from-transfers).",
        ).optional(),
        lastModifiedBefore: z.string().describe(
          'If specified, only objects with a "last modification time" before this timestamp and objects that don\'t have a "last modification time" are transferred.',
        ).optional(),
        lastModifiedSince: z.string().describe(
          'If specified, only objects with a "last modification time" on or after this timestamp and objects that don\'t have a "last modification time" are transferred. The `last_modified_since` and `last_modified_before` fields can be used together for chunked data processing. For example, consider a script that processes each day\'s worth of data at a time. For that you\'d set each of the fields as follows: * `last_modified_since` to the start of the day * `last_modified_before` to the end of the day',
        ).optional(),
        matchGlob: z.string().describe(
          "Optional. If specified, only objects matching this glob are transferred.",
        ).optional(),
        maxTimeElapsedSinceLastModification: z.string().describe(
          'Ensures that objects are not transferred if a specific maximum time has elapsed since the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation`and the "last modification time" of the object is less than the value of max_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
        ).optional(),
        minTimeElapsedSinceLastModification: z.string().describe(
          'Ensures that objects are not transferred until a specific minimum time has elapsed after the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation` and the "last modification time" of the object is equal to or greater than the value of min_time_elapsed_since_last_modification`. Objects that do not have a "last modification time" are also transferred.',
        ).optional(),
      }).describe(
        'Conditions that determine which objects are transferred. Applies only to Cloud Data Sources such as S3, Azure, and Cloud Storage. The "last modification time" refers to the time of the last change to the object\'s content or metadata — specifically, this is the `updated` property of Cloud Storage objects, the `LastModified` field of S3 objects, and the `Last-Modified` header of Azure blobs. For S3 objects, the `LastModified` value is the time the object begins uploading. If the object meets your "last modification time" criteria, but has not finished uploading, the object is not transferred. See [Transfer from Amazon S3 to Cloud Storage](https://cloud.google.com/storage-transfer/docs/create-transfers/agentless/s3#transfer_options) for more information. Transfers with a PosixFilesystem source or destination don\'t support `ObjectConditions`.',
      ).optional(),
      posixDataSink: z.object({
        rootDirectory: z.string().describe(
          "Root directory path to the filesystem.",
        ).optional(),
      }).describe("A POSIX filesystem resource.").optional(),
      posixDataSource: z.object({
        rootDirectory: z.string().describe(
          "Root directory path to the filesystem.",
        ).optional(),
      }).describe("A POSIX filesystem resource.").optional(),
      sinkAgentPoolName: z.string().describe(
        "Specifies the agent pool name associated with the posix data sink. When unspecified, the default name is used.",
      ).optional(),
      sourceAgentPoolName: z.string().describe(
        "Specifies the agent pool name associated with the posix data source. When unspecified, the default name is used.",
      ).optional(),
      transferManifest: z.object({
        location: z.string().describe(
          "Specifies the path to the manifest in Cloud Storage. The Google-managed service account for the transfer must have `storage.objects.get` permission for this object. An example path is `gs://bucket_name/path/manifest.csv`.",
        ).optional(),
      }).describe("Specifies where the manifest is located.").optional(),
      transferOptions: z.object({
        deleteObjectsFromSourceAfterTransfer: z.boolean().describe(
          "Whether objects should be deleted from the source after they are transferred to the sink. **Note:** This option and delete_objects_unique_in_sink are mutually exclusive.",
        ).optional(),
        deleteObjectsUniqueInSink: z.boolean().describe(
          "Whether objects that exist only in the sink should be deleted. **Note:** This option and delete_objects_from_source_after_transfer are mutually exclusive.",
        ).optional(),
        metadataOptions: z.object({
          acl: z.enum([
            "ACL_UNSPECIFIED",
            "ACL_DESTINATION_BUCKET_DEFAULT",
            "ACL_PRESERVE",
          ]).describe(
            "Specifies how each object's ACLs should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as ACL_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          gid: z.enum(["GID_UNSPECIFIED", "GID_SKIP", "GID_NUMBER"]).describe(
            "Specifies how each file's POSIX group ID (GID) attribute should be handled by the transfer. By default, GID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
          kmsKey: z.enum([
            "KMS_KEY_UNSPECIFIED",
            "KMS_KEY_DESTINATION_BUCKET_DEFAULT",
            "KMS_KEY_PRESERVE",
          ]).describe(
            "Specifies how each object's Cloud KMS customer-managed encryption key (CMEK) is preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as KMS_KEY_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          mode: z.enum(["MODE_UNSPECIFIED", "MODE_SKIP", "MODE_PRESERVE"])
            .describe(
              "Specifies how each file's mode attribute should be handled by the transfer. By default, mode is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
            ).optional(),
          storageClass: z.enum([
            "STORAGE_CLASS_UNSPECIFIED",
            "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT",
            "STORAGE_CLASS_PRESERVE",
            "STORAGE_CLASS_STANDARD",
            "STORAGE_CLASS_NEARLINE",
            "STORAGE_CLASS_COLDLINE",
            "STORAGE_CLASS_ARCHIVE",
          ]).describe(
            "Specifies the storage class to set on objects being transferred to Google Cloud Storage buckets. If unspecified, the default behavior is the same as STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT.",
          ).optional(),
          symlink: z.enum([
            "SYMLINK_UNSPECIFIED",
            "SYMLINK_SKIP",
            "SYMLINK_PRESERVE",
          ]).describe(
            "Specifies how symlinks should be handled by the transfer. By default, symlinks are not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
          temporaryHold: z.enum([
            "TEMPORARY_HOLD_UNSPECIFIED",
            "TEMPORARY_HOLD_SKIP",
            "TEMPORARY_HOLD_PRESERVE",
          ]).describe(
            "Specifies how each object's temporary hold status should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as TEMPORARY_HOLD_PRESERVE.",
          ).optional(),
          timeCreated: z.enum([
            "TIME_CREATED_UNSPECIFIED",
            "TIME_CREATED_SKIP",
            "TIME_CREATED_PRESERVE_AS_CUSTOM_TIME",
          ]).describe(
            "Specifies how each object's `timeCreated` metadata is preserved for transfers. If unspecified, the default behavior is the same as TIME_CREATED_SKIP. This behavior is supported for transfers to Cloud Storage buckets from Cloud Storage, Amazon S3, S3-compatible storage, and Azure sources.",
          ).optional(),
          uid: z.enum(["UID_UNSPECIFIED", "UID_SKIP", "UID_NUMBER"]).describe(
            "Specifies how each file's POSIX user ID (UID) attribute should be handled by the transfer. By default, UID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers.",
          ).optional(),
        }).describe("Specifies the metadata options for running a transfer.")
          .optional(),
        overwriteObjectsAlreadyExistingInSink: z.boolean().describe(
          "When to overwrite objects that already exist in the sink. The default is that only objects that are different from the source are overwritten. If true, all objects in the sink whose name matches an object in the source are overwritten with the source object.",
        ).optional(),
        overwriteWhen: z.enum([
          "OVERWRITE_WHEN_UNSPECIFIED",
          "DIFFERENT",
          "NEVER",
          "ALWAYS",
        ]).describe(
          "When to overwrite objects that already exist in the sink. If not set, overwrite behavior is determined by overwrite_objects_already_existing_in_sink.",
        ).optional(),
      }).describe(
        "TransferOptions define the actions to be performed on objects in a transfer.",
      ).optional(),
    }).describe("Configuration for running a transfer.").optional(),
  }).describe(
    "This resource represents the configuration of a transfer job that runs periodically.",
  ).optional(),
  updateTransferJobFieldMask: z.string().describe(
    "The field mask of the fields in `transferJob` that are to be updated in this request. Fields in `transferJob` that can be updated are: description, transfer_spec, notification_config, logging_config, and status. To update the `transfer_spec` of the job, a complete transfer specification must be provided. An incomplete specification missing any required fields is rejected with the error INVALID_ARGUMENT.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Storage Transfer TransferJobs. Registered at `@swamp/gcp/storagetransfer/transferjobs`. */
export const model = {
  type: "@swamp/gcp/storagetransfer/transferjobs",
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
      description:
        "This resource represents the configuration of a transfer job that runs period...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a transferJobs",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["eventStream"] !== undefined) {
          body["eventStream"] = g["eventStream"];
        }
        if (g["latestOperationName"] !== undefined) {
          body["latestOperationName"] = g["latestOperationName"];
        }
        if (g["loggingConfig"] !== undefined) {
          body["loggingConfig"] = g["loggingConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notificationConfig"] !== undefined) {
          body["notificationConfig"] = g["notificationConfig"];
        }
        if (g["projectId"] !== undefined) body["projectId"] = g["projectId"];
        if (g["replicationSpec"] !== undefined) {
          body["replicationSpec"] = g["replicationSpec"];
        }
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["transferSpec"] !== undefined) {
          body["transferSpec"] = g["transferSpec"];
        }
        if (g["jobName"] !== undefined) {
          params["jobName"] = String(g["jobName"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ENABLED"],
              "failedValues": [],
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
      description: "Get a transferJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the transferJobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["jobName"] !== undefined) {
          params["jobName"] = String(g["jobName"]);
        }
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
      description: "Update transferJobs attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        params["jobName"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["projectId"] !== undefined) body["projectId"] = g["projectId"];
        if (g["transferJob"] !== undefined) {
          body["transferJob"] = g["transferJob"];
        }
        if (g["updateTransferJobFieldMask"] !== undefined) {
          body["updateTransferJobFieldMask"] = g["updateTransferJobFieldMask"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ENABLED"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the transferJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the transferJobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["jobName"] !== undefined) {
          params["jobName"] = String(g["jobName"]);
        }
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
      description: "Sync transferJobs state from GCP",
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
          if (g["jobName"] !== undefined) {
            params["jobName"] = String(g["jobName"]);
          } else if (existing["jobName"]) {
            params["jobName"] = String(existing["jobName"]);
          }
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
    run: {
      description: "run",
      arguments: z.object({
        projectId: z.any().optional(),
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
        params["jobName"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["projectId"] !== undefined) {
          body["projectId"] = args["projectId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "storagetransfer.transferJobs.run",
            "path": "v1/{+jobName}:run",
            "httpMethod": "POST",
            "parameterOrder": ["jobName"],
            "parameters": {
              "jobName": { "location": "path", "required": true },
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
