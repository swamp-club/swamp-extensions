// Auto-generated extension model for @swamp/gcp/pubsub/subscriptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Pub/Sub Subscriptions.
 *
 * A subscription resource. If none of `push_config`, `bigquery_config`, `cloud_storage_config`, or `bigtable_config` is set, then the subscriber will pull and ack messages using API methods. At most one of these fields may be set.
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

const BASE_URL = "https://pubsub.googleapis.com/";

const GET_CONFIG = {
  "id": "pubsub.projects.subscriptions.get",
  "path": "v1/{+subscription}",
  "httpMethod": "GET",
  "parameterOrder": [
    "subscription",
  ],
  "parameters": {
    "subscription": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "pubsub.projects.subscriptions.create",
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

const PATCH_CONFIG = {
  "id": "pubsub.projects.subscriptions.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "pubsub.projects.subscriptions.delete",
  "path": "v1/{+subscription}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "subscription",
  ],
  "parameters": {
    "subscription": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  ackDeadlineSeconds: z.number().int().describe(
    "Optional. The approximate amount of time (on a best-effort basis) Pub/Sub waits for the subscriber to acknowledge receipt before resending the message. In the interval after the message is delivered and before it is acknowledged, it is considered to be _outstanding_. During that time period, the message will not be redelivered (on a best-effort basis). For pull subscriptions, this value is used as the initial value for the ack deadline. To override this value for a given message, call `ModifyAckDeadline` with the corresponding `ack_id` if using non-streaming pull or send the `ack_id` in a `StreamingModifyAckDeadlineRequest` if using streaming pull. The minimum custom deadline you can specify is 10 seconds. The maximum custom deadline you can specify is 600 seconds (10 minutes). If this parameter is 0, a default value of 10 seconds is used. For push delivery, this value is also used to set the request timeout for the call to the push endpoint. If the subscriber never acknowledges the message, the Pub/Sub system will eventually redeliver the message.",
  ).optional(),
  analyticsHubSubscriptionInfo: z.object({
    listing: z.string().describe(
      'Optional. The name of the associated Analytics Hub listing resource. Pattern: "projects/{project}/locations/{location}/dataExchanges/{data_exchange}/listings/{listing}"',
    ).optional(),
    subscription: z.string().describe(
      'Optional. The name of the associated Analytics Hub subscription resource. Pattern: "projects/{project}/locations/{location}/subscriptions/{subscription}"',
    ).optional(),
  }).describe(
    "Information about an associated [Analytics Hub subscription](https://cloud.google.com/bigquery/docs/analytics-hub-manage-subscriptions).",
  ).optional(),
  bigqueryConfig: z.object({
    dropUnknownFields: z.boolean().describe(
      "Optional. When true and use_topic_schema is true, any fields that are a part of the topic schema that are not part of the BigQuery table schema are dropped when writing to BigQuery. Otherwise, the schemas must be kept in sync and any messages with extra fields are not written and remain in the subscription's backlog.",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. The service account to use to write to BigQuery. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "PERMISSION_DENIED",
      "NOT_FOUND",
      "SCHEMA_MISMATCH",
      "IN_TRANSIT_LOCATION_RESTRICTION",
      "VERTEX_AI_LOCATION_RESTRICTION",
    ]).describe(
      "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
    ).optional(),
    table: z.string().describe(
      "Optional. The name of the table to which to write data, of the form {projectId}.{datasetId}.{tableId}",
    ).optional(),
    useTableSchema: z.boolean().describe(
      "Optional. When true, use the BigQuery table's schema as the columns to write to in BigQuery. `use_table_schema` and `use_topic_schema` cannot be enabled at the same time.",
    ).optional(),
    useTopicSchema: z.boolean().describe(
      "Optional. When true, use the topic's schema as the columns to write to in BigQuery, if it exists. `use_topic_schema` and `use_table_schema` cannot be enabled at the same time.",
    ).optional(),
    writeMetadata: z.boolean().describe(
      "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column.",
    ).optional(),
  }).describe("Configuration for a BigQuery subscription.").optional(),
  bigtableConfig: z.object({
    appProfileId: z.string().describe(
      'Optional. The app profile to use for the Bigtable writes. If not specified, the "default" application profile will be used. The app profile must use single-cluster routing.',
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. The service account to use to write to Bigtable. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "NOT_FOUND",
      "APP_PROFILE_MISCONFIGURED",
      "PERMISSION_DENIED",
      "SCHEMA_MISMATCH",
      "IN_TRANSIT_LOCATION_RESTRICTION",
      "VERTEX_AI_LOCATION_RESTRICTION",
    ]).describe(
      "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
    ).optional(),
    table: z.string().describe(
      "Optional. The unique name of the table to write messages to. Values are of the form `projects//instances//tables/`.",
    ).optional(),
    writeMetadata: z.boolean().describe(
      "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table under the pubsub_metadata column family. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column.",
    ).optional(),
  }).describe(
    'Configuration for a Bigtable subscription. The Pub/Sub message will be written to a Bigtable row as follows: - row key: subscription name and message ID delimited by #. - columns: message bytes written to a single column family "data" with an empty-string column qualifier. - cell timestamp: the message publish timestamp.',
  ).optional(),
  cloudStorageConfig: z.object({
    avroConfig: z.object({
      useTopicSchema: z.boolean().describe(
        "Optional. When true, the output Cloud Storage file will be serialized using the topic schema, if it exists.",
      ).optional(),
      writeMetadata: z.boolean().describe(
        "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key as additional fields in the output. The subscription name, message_id, and publish_time fields are put in their own fields while all other message properties other than data (for example, an ordering_key, if present) are added as entries in the attributes map.",
      ).optional(),
    }).describe(
      "Configuration for writing message data in Avro format. Message payloads and metadata will be written to files as an Avro binary.",
    ).optional(),
    bucket: z.string().describe(
      'Required. User-provided name for the Cloud Storage bucket. The bucket must be created by the user. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming).',
    ).optional(),
    filenameDatetimeFormat: z.string().describe(
      "Optional. User-provided format string specifying how to represent datetimes in Cloud Storage filenames. See the [datetime format guidance](https://cloud.google.com/pubsub/docs/create-cloudstorage-subscription#file_names).",
    ).optional(),
    filenamePrefix: z.string().describe(
      "Optional. User-provided prefix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming).",
    ).optional(),
    filenameSuffix: z.string().describe(
      'Optional. User-provided suffix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming). Must not end in "/".',
    ).optional(),
    maxBytes: z.string().describe(
      "Optional. The maximum bytes that can be written to a Cloud Storage file before a new file is created. Min 1 KB, max 10 GiB. The max_bytes limit may be exceeded in cases where messages are larger than the limit.",
    ).optional(),
    maxDuration: z.string().describe(
      "Optional. The maximum duration that can elapse before a new Cloud Storage file is created. Min 1 minute, max 10 minutes, default 5 minutes. May not exceed the subscription's acknowledgment deadline.",
    ).optional(),
    maxMessages: z.string().describe(
      "Optional. The maximum number of messages that can be written to a Cloud Storage file before a new file is created. Min 1000 messages.",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. The service account to use to write to Cloud Storage. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "PERMISSION_DENIED",
      "NOT_FOUND",
      "IN_TRANSIT_LOCATION_RESTRICTION",
      "SCHEMA_MISMATCH",
      "VERTEX_AI_LOCATION_RESTRICTION",
    ]).describe(
      "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
    ).optional(),
    textConfig: z.object({}).describe(
      "Configuration for writing message data in text format. Message payloads will be written to files as raw text, separated by a newline.",
    ).optional(),
  }).describe("Configuration for a Cloud Storage subscription.").optional(),
  deadLetterPolicy: z.object({
    deadLetterTopic: z.string().describe(
      "Optional. The name of the topic to which dead letter messages should be published. Format is `projects/{project}/topics/{topic}`.The Pub/Sub service account associated with the enclosing subscription's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Publish() to this topic. The operation will fail if the topic does not exist. Users should ensure that there is a subscription attached to this topic since messages published to a topic with no subscriptions are lost.",
    ).optional(),
    maxDeliveryAttempts: z.number().int().describe(
      "Optional. The maximum number of delivery attempts for any message. The value must be between 5 and 100. The number of delivery attempts is defined as 1 + (the sum of number of NACKs and number of times the acknowledgment deadline has been exceeded for the message). A NACK is any call to ModifyAckDeadline with a 0 deadline. Note that client libraries may automatically extend ack_deadlines. This field will be honored on a best effort basis. If this parameter is 0, a default value of 5 is used.",
    ).optional(),
  }).describe(
    "Dead lettering is done on a best effort basis. The same message might be dead lettered multiple times. If validation on any of the fields fails at subscription creation/updation, the create/update subscription request will fail.",
  ).optional(),
  detached: z.boolean().describe(
    "Optional. Indicates whether the subscription is detached from its topic. Detached subscriptions don't receive messages from their topic and don't retain any backlog. `Pull` and `StreamingPull` requests will return FAILED_PRECONDITION. If the subscription is a push subscription, pushes to the endpoint will not be made.",
  ).optional(),
  enableExactlyOnceDelivery: z.boolean().describe(
    "Optional. If true, Pub/Sub provides the following guarantees for the delivery of a message with a given value of `message_id` on this subscription: * The message sent to a subscriber is guaranteed not to be resent before the message's acknowledgment deadline expires. * An acknowledged message will not be resent to a subscriber. Note that subscribers may still receive multiple copies of a message when `enable_exactly_once_delivery` is true if the message was published multiple times by a publisher client. These copies are considered distinct by Pub/Sub and have distinct `message_id` values.",
  ).optional(),
  enableMessageOrdering: z.boolean().describe(
    "Optional. If true, messages published with the same `ordering_key` in `PubsubMessage` will be delivered to the subscribers in the order in which they are received by the Pub/Sub system. Otherwise, they may be delivered in any order.",
  ).optional(),
  expirationPolicy: z.object({
    ttl: z.string().describe(
      'Optional. Specifies the "time-to-live" duration for an associated resource. The resource expires if it is not active for a period of `ttl`. The definition of "activity" depends on the type of the associated resource. The minimum and maximum allowed values for `ttl` depend on the type of the associated resource, as well. If `ttl` is not set, the associated resource never expires.',
    ).optional(),
  }).describe(
    "A policy that specifies the conditions for resource expiration (i.e., automatic resource deletion).",
  ).optional(),
  filter: z.string().describe(
    "Optional. An expression written in the Pub/Sub [filter language](https://cloud.google.com/pubsub/docs/filtering). If non-empty, then only `PubsubMessage`s whose `attributes` field matches the filter are delivered on this subscription. If empty, then no messages are filtered out.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. See [Creating and managing labels](https://cloud.google.com/pubsub/docs/labels).",
  ).optional(),
  messageRetentionDuration: z.string().describe(
    "Optional. How long to retain unacknowledged messages in the subscription's backlog, from the moment a message is published. If `retain_acked_messages` is true, then this also configures the retention of acknowledged messages, and thus configures how far back in time a `Seek` can be done. Defaults to 7 days. Cannot be more than 31 days or less than 10 minutes.",
  ).optional(),
  messageTransforms: z.array(z.object({
    aiInference: z.object({
      endpoint: z.string().describe(
        "Required. An endpoint to a Vertex AI model of the form `projects/{project}/locations/{location}/endpoints/{endpoint}` or `projects/{project}/locations/{location}/publishers/{publisher}/models/{model}`. Vertex AI API requests will be sent to this endpoint.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. The service account to use to make prediction requests against endpoints. The resource creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
      ).optional(),
      unstructuredInference: z.object({
        parameters: z.record(z.string(), z.unknown()).describe(
          "Optional. A parameters object to be included in each inference request. The parameters object is combined with the data field of the Pub/Sub message to form the inference request.",
        ).optional(),
      }).describe(
        "Configuration for making inferences using arbitrary JSON payloads.",
      ).optional(),
    }).describe(
      "Configuration for making inference requests against Vertex AI models.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. If true, the transform is disabled and will not be applied to messages. Defaults to `false`.",
    ).optional(),
    enabled: z.boolean().describe(
      "Optional. This field is deprecated, use the `disabled` field to disable transforms.",
    ).optional(),
    javascriptUdf: z.object({
      code: z.string().describe(
        "Required. JavaScript code that contains a function `function_name` with the below signature: ``` /** * Transforms a Pub/Sub message. * @return {(Object)>|null)} - To * filter a message, return `null`. To transform a message return a map * with the following keys: * - (required) 'data': {string} * - (optional) 'attributes': {Object} * Returning empty `attributes` will remove all attributes from the * message. * * @param {(Object)>} Pub/Sub * message. Keys: * - (required) 'data': {string} * - (required) 'attributes': {Object} * * @param {Object} metadata - Pub/Sub message metadata. * Keys: * - (optional) 'message_id': {string} * - (optional) 'publish_time': {string} YYYY-MM-DDTHH:MM:SSZ format * - (optional) 'ordering_key': {string} */ function (message, metadata) { } ```",
      ).optional(),
      functionName: z.string().describe(
        "Required. Name of the JavasScript function that should applied to Pub/Sub messages.",
      ).optional(),
    }).describe(
      "User-defined JavaScript function that can transform or filter a Pub/Sub message.",
    ).optional(),
  })).describe(
    "Optional. Transforms to be applied to messages before they are delivered to subscribers. Transforms are applied in the order specified.",
  ).optional(),
  name: z.string().describe(
    'Required. Identifier. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`.',
  ).optional(),
  pushConfig: z.object({
    attributes: z.record(z.string(), z.string()).describe(
      'Optional. Endpoint configuration attributes that can be used to control different aspects of the message delivery. The only currently supported attribute is `x-goog-version`, which you can use to change the format of the pushed message. This attribute indicates the version of the data expected by the endpoint. This controls the shape of the pushed message (i.e., its fields and metadata). If not present during the `CreateSubscription` call, it will default to the version of the Pub/Sub API used to make such call. If not present in a `ModifyPushConfig` call, its value will not be changed. `GetSubscription` calls will always return a valid version, even if the subscription was created without this attribute. The only supported values for the `x-goog-version` attribute are: * `v1beta1`: uses the push format defined in the v1beta1 Pub/Sub API. * `v1` or `v1beta2`: uses the push format defined in the v1 Pub/Sub API. For example: `attributes { "x-goog-version": "v1" }`',
    ).optional(),
    noWrapper: z.object({
      writeMetadata: z.boolean().describe(
        "Optional. When true, writes the Pub/Sub message metadata to `x-goog-pubsub-:` headers of the HTTP request. Writes the Pub/Sub message attributes to `:` headers of the HTTP request.",
      ).optional(),
    }).describe("Sets the `data` field as the HTTP body for delivery.")
      .optional(),
    oidcToken: z.object({
      audience: z.string().describe(
        "Optional. Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. The audience value is a single case-sensitive string. Having multiple values (array) for the audience field is not supported. More info about the OIDC JWT token audience here: https://tools.ietf.org/html/rfc7519#section-4.1.3 Note: if not specified, the Push endpoint URL will be used.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. [Service account email](https://cloud.google.com/iam/docs/service-accounts) used for generating the OIDC token. For more information on setting up authentication, see [Push subscriptions](https://cloud.google.com/pubsub/docs/push).",
      ).optional(),
    }).describe(
      "Contains information needed for generating an [OpenID Connect token](https://developers.google.com/identity/protocols/OpenIDConnect).",
    ).optional(),
    pubsubWrapper: z.object({}).describe(
      "The payload to the push endpoint is in the form of the JSON representation of a PubsubMessage (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#pubsubmessage).",
    ).optional(),
    pushEndpoint: z.string().describe(
      "Optional. A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use `https://example.com/push`.",
    ).optional(),
  }).describe("Configuration for a push delivery endpoint.").optional(),
  retainAckedMessages: z.boolean().describe(
    "Optional. Indicates whether to retain acknowledged messages. If true, then messages are not expunged from the subscription's backlog, even if they are acknowledged, until they fall out of the `message_retention_duration` window. This must be true if you would like to [`Seek` to a timestamp] (https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) in the past to replay previously-acknowledged messages.",
  ).optional(),
  retryPolicy: z.object({
    maximumBackoff: z.string().describe(
      "Optional. The maximum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 600 seconds.",
    ).optional(),
    minimumBackoff: z.string().describe(
      "Optional. The minimum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 10 seconds.",
    ).optional(),
  }).describe(
    "A policy that specifies how Pub/Sub retries message delivery. Retry delay will be exponential based on provided minimum and maximum backoffs. https://en.wikipedia.org/wiki/Exponential_backoff. RetryPolicy will be triggered on NACKs or acknowledgment deadline exceeded events for a given message. Retry Policy is implemented on a best effort basis. At times, the delay between consecutive deliveries may not match the configuration. That is, delay can be more or less than configured backoff.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" See https://{$universe.dns_names.final_documentation_domain}/pubsub/docs/tags for more information on using tags with Pub/Sub resources.',
  ).optional(),
  topic: z.string().describe(
    "Required. The name of the topic from which this subscription is receiving messages. Format is `projects/{project}/topics/{topic}`. The value of this field will be `_deleted-topic_` if the topic has been deleted.",
  ).optional(),
  subscription: z.object({
    ackDeadlineSeconds: z.number().int().describe(
      "Optional. The approximate amount of time (on a best-effort basis) Pub/Sub waits for the subscriber to acknowledge receipt before resending the message. In the interval after the message is delivered and before it is acknowledged, it is considered to be _outstanding_. During that time period, the message will not be redelivered (on a best-effort basis). For pull subscriptions, this value is used as the initial value for the ack deadline. To override this value for a given message, call `ModifyAckDeadline` with the corresponding `ack_id` if using non-streaming pull or send the `ack_id` in a `StreamingModifyAckDeadlineRequest` if using streaming pull. The minimum custom deadline you can specify is 10 seconds. The maximum custom deadline you can specify is 600 seconds (10 minutes). If this parameter is 0, a default value of 10 seconds is used. For push delivery, this value is also used to set the request timeout for the call to the push endpoint. If the subscriber never acknowledges the message, the Pub/Sub system will eventually redeliver the message.",
    ).optional(),
    analyticsHubSubscriptionInfo: z.object({
      listing: z.string().describe(
        'Optional. The name of the associated Analytics Hub listing resource. Pattern: "projects/{project}/locations/{location}/dataExchanges/{data_exchange}/listings/{listing}"',
      ).optional(),
      subscription: z.string().describe(
        'Optional. The name of the associated Analytics Hub subscription resource. Pattern: "projects/{project}/locations/{location}/subscriptions/{subscription}"',
      ).optional(),
    }).describe(
      "Information about an associated [Analytics Hub subscription](https://cloud.google.com/bigquery/docs/analytics-hub-manage-subscriptions).",
    ).optional(),
    bigqueryConfig: z.object({
      dropUnknownFields: z.boolean().describe(
        "Optional. When true and use_topic_schema is true, any fields that are a part of the topic schema that are not part of the BigQuery table schema are dropped when writing to BigQuery. Otherwise, the schemas must be kept in sync and any messages with extra fields are not written and remain in the subscription's backlog.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. The service account to use to write to BigQuery. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "PERMISSION_DENIED",
        "NOT_FOUND",
        "SCHEMA_MISMATCH",
        "IN_TRANSIT_LOCATION_RESTRICTION",
        "VERTEX_AI_LOCATION_RESTRICTION",
      ]).describe(
        "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
      ).optional(),
      table: z.string().describe(
        "Optional. The name of the table to which to write data, of the form {projectId}.{datasetId}.{tableId}",
      ).optional(),
      useTableSchema: z.boolean().describe(
        "Optional. When true, use the BigQuery table's schema as the columns to write to in BigQuery. `use_table_schema` and `use_topic_schema` cannot be enabled at the same time.",
      ).optional(),
      useTopicSchema: z.boolean().describe(
        "Optional. When true, use the topic's schema as the columns to write to in BigQuery, if it exists. `use_topic_schema` and `use_table_schema` cannot be enabled at the same time.",
      ).optional(),
      writeMetadata: z.boolean().describe(
        "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column.",
      ).optional(),
    }).describe("Configuration for a BigQuery subscription.").optional(),
    bigtableConfig: z.object({
      appProfileId: z.string().describe(
        'Optional. The app profile to use for the Bigtable writes. If not specified, the "default" application profile will be used. The app profile must use single-cluster routing.',
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. The service account to use to write to Bigtable. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "NOT_FOUND",
        "APP_PROFILE_MISCONFIGURED",
        "PERMISSION_DENIED",
        "SCHEMA_MISMATCH",
        "IN_TRANSIT_LOCATION_RESTRICTION",
        "VERTEX_AI_LOCATION_RESTRICTION",
      ]).describe(
        "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
      ).optional(),
      table: z.string().describe(
        "Optional. The unique name of the table to write messages to. Values are of the form `projects//instances//tables/`.",
      ).optional(),
      writeMetadata: z.boolean().describe(
        "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table under the pubsub_metadata column family. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column.",
      ).optional(),
    }).describe(
      'Configuration for a Bigtable subscription. The Pub/Sub message will be written to a Bigtable row as follows: - row key: subscription name and message ID delimited by #. - columns: message bytes written to a single column family "data" with an empty-string column qualifier. - cell timestamp: the message publish timestamp.',
    ).optional(),
    cloudStorageConfig: z.object({
      avroConfig: z.object({
        useTopicSchema: z.boolean().describe(
          "Optional. When true, the output Cloud Storage file will be serialized using the topic schema, if it exists.",
        ).optional(),
        writeMetadata: z.boolean().describe(
          "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key as additional fields in the output. The subscription name, message_id, and publish_time fields are put in their own fields while all other message properties other than data (for example, an ordering_key, if present) are added as entries in the attributes map.",
        ).optional(),
      }).describe(
        "Configuration for writing message data in Avro format. Message payloads and metadata will be written to files as an Avro binary.",
      ).optional(),
      bucket: z.string().describe(
        'Required. User-provided name for the Cloud Storage bucket. The bucket must be created by the user. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming).',
      ).optional(),
      filenameDatetimeFormat: z.string().describe(
        "Optional. User-provided format string specifying how to represent datetimes in Cloud Storage filenames. See the [datetime format guidance](https://cloud.google.com/pubsub/docs/create-cloudstorage-subscription#file_names).",
      ).optional(),
      filenamePrefix: z.string().describe(
        "Optional. User-provided prefix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming).",
      ).optional(),
      filenameSuffix: z.string().describe(
        'Optional. User-provided suffix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming). Must not end in "/".',
      ).optional(),
      maxBytes: z.string().describe(
        "Optional. The maximum bytes that can be written to a Cloud Storage file before a new file is created. Min 1 KB, max 10 GiB. The max_bytes limit may be exceeded in cases where messages are larger than the limit.",
      ).optional(),
      maxDuration: z.string().describe(
        "Optional. The maximum duration that can elapse before a new Cloud Storage file is created. Min 1 minute, max 10 minutes, default 5 minutes. May not exceed the subscription's acknowledgment deadline.",
      ).optional(),
      maxMessages: z.string().describe(
        "Optional. The maximum number of messages that can be written to a Cloud Storage file before a new file is created. Min 1000 messages.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. The service account to use to write to Cloud Storage. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "PERMISSION_DENIED",
        "NOT_FOUND",
        "IN_TRANSIT_LOCATION_RESTRICTION",
        "SCHEMA_MISMATCH",
        "VERTEX_AI_LOCATION_RESTRICTION",
      ]).describe(
        "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
      ).optional(),
      textConfig: z.object({}).describe(
        "Configuration for writing message data in text format. Message payloads will be written to files as raw text, separated by a newline.",
      ).optional(),
    }).describe("Configuration for a Cloud Storage subscription.").optional(),
    deadLetterPolicy: z.object({
      deadLetterTopic: z.string().describe(
        "Optional. The name of the topic to which dead letter messages should be published. Format is `projects/{project}/topics/{topic}`.The Pub/Sub service account associated with the enclosing subscription's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Publish() to this topic. The operation will fail if the topic does not exist. Users should ensure that there is a subscription attached to this topic since messages published to a topic with no subscriptions are lost.",
      ).optional(),
      maxDeliveryAttempts: z.number().int().describe(
        "Optional. The maximum number of delivery attempts for any message. The value must be between 5 and 100. The number of delivery attempts is defined as 1 + (the sum of number of NACKs and number of times the acknowledgment deadline has been exceeded for the message). A NACK is any call to ModifyAckDeadline with a 0 deadline. Note that client libraries may automatically extend ack_deadlines. This field will be honored on a best effort basis. If this parameter is 0, a default value of 5 is used.",
      ).optional(),
    }).describe(
      "Dead lettering is done on a best effort basis. The same message might be dead lettered multiple times. If validation on any of the fields fails at subscription creation/updation, the create/update subscription request will fail.",
    ).optional(),
    detached: z.boolean().describe(
      "Optional. Indicates whether the subscription is detached from its topic. Detached subscriptions don't receive messages from their topic and don't retain any backlog. `Pull` and `StreamingPull` requests will return FAILED_PRECONDITION. If the subscription is a push subscription, pushes to the endpoint will not be made.",
    ).optional(),
    enableExactlyOnceDelivery: z.boolean().describe(
      "Optional. If true, Pub/Sub provides the following guarantees for the delivery of a message with a given value of `message_id` on this subscription: * The message sent to a subscriber is guaranteed not to be resent before the message's acknowledgment deadline expires. * An acknowledged message will not be resent to a subscriber. Note that subscribers may still receive multiple copies of a message when `enable_exactly_once_delivery` is true if the message was published multiple times by a publisher client. These copies are considered distinct by Pub/Sub and have distinct `message_id` values.",
    ).optional(),
    enableMessageOrdering: z.boolean().describe(
      "Optional. If true, messages published with the same `ordering_key` in `PubsubMessage` will be delivered to the subscribers in the order in which they are received by the Pub/Sub system. Otherwise, they may be delivered in any order.",
    ).optional(),
    expirationPolicy: z.object({
      ttl: z.string().describe(
        'Optional. Specifies the "time-to-live" duration for an associated resource. The resource expires if it is not active for a period of `ttl`. The definition of "activity" depends on the type of the associated resource. The minimum and maximum allowed values for `ttl` depend on the type of the associated resource, as well. If `ttl` is not set, the associated resource never expires.',
      ).optional(),
    }).describe(
      "A policy that specifies the conditions for resource expiration (i.e., automatic resource deletion).",
    ).optional(),
    filter: z.string().describe(
      "Optional. An expression written in the Pub/Sub [filter language](https://cloud.google.com/pubsub/docs/filtering). If non-empty, then only `PubsubMessage`s whose `attributes` field matches the filter are delivered on this subscription. If empty, then no messages are filtered out.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. See [Creating and managing labels](https://cloud.google.com/pubsub/docs/labels).",
    ).optional(),
    messageRetentionDuration: z.string().describe(
      "Optional. How long to retain unacknowledged messages in the subscription's backlog, from the moment a message is published. If `retain_acked_messages` is true, then this also configures the retention of acknowledged messages, and thus configures how far back in time a `Seek` can be done. Defaults to 7 days. Cannot be more than 31 days or less than 10 minutes.",
    ).optional(),
    messageTransforms: z.array(z.object({
      aiInference: z.object({
        endpoint: z.string().describe(
          "Required. An endpoint to a Vertex AI model of the form `projects/{project}/locations/{location}/endpoints/{endpoint}` or `projects/{project}/locations/{location}/publishers/{publisher}/models/{model}`. Vertex AI API requests will be sent to this endpoint.",
        ).optional(),
        serviceAccountEmail: z.string().describe(
          "Optional. The service account to use to make prediction requests against endpoints. The resource creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
        ).optional(),
        unstructuredInference: z.object({
          parameters: z.unknown().describe(
            "Optional. A parameters object to be included in each inference request. The parameters object is combined with the data field of the Pub/Sub message to form the inference request.",
          ).optional(),
        }).describe(
          "Configuration for making inferences using arbitrary JSON payloads.",
        ).optional(),
      }).describe(
        "Configuration for making inference requests against Vertex AI models.",
      ).optional(),
      disabled: z.boolean().describe(
        "Optional. If true, the transform is disabled and will not be applied to messages. Defaults to `false`.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. This field is deprecated, use the `disabled` field to disable transforms.",
      ).optional(),
      javascriptUdf: z.object({
        code: z.string().describe(
          "Required. JavaScript code that contains a function `function_name` with the below signature: ``` /** * Transforms a Pub/Sub message. * @return {(Object)>|null)} - To * filter a message, return `null`. To transform a message return a map * with the following keys: * - (required) 'data': {string} * - (optional) 'attributes': {Object} * Returning empty `attributes` will remove all attributes from the * message. * * @param {(Object)>} Pub/Sub * message. Keys: * - (required) 'data': {string} * - (required) 'attributes': {Object} * * @param {Object} metadata - Pub/Sub message metadata. * Keys: * - (optional) 'message_id': {string} * - (optional) 'publish_time': {string} YYYY-MM-DDTHH:MM:SSZ format * - (optional) 'ordering_key': {string} */ function (message, metadata) { } ```",
        ).optional(),
        functionName: z.string().describe(
          "Required. Name of the JavasScript function that should applied to Pub/Sub messages.",
        ).optional(),
      }).describe(
        "User-defined JavaScript function that can transform or filter a Pub/Sub message.",
      ).optional(),
    })).describe(
      "Optional. Transforms to be applied to messages before they are delivered to subscribers. Transforms are applied in the order specified.",
    ).optional(),
    name: z.string().describe(
      'Required. Identifier. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`.',
    ).optional(),
    pushConfig: z.object({
      attributes: z.record(z.string(), z.string()).describe(
        'Optional. Endpoint configuration attributes that can be used to control different aspects of the message delivery. The only currently supported attribute is `x-goog-version`, which you can use to change the format of the pushed message. This attribute indicates the version of the data expected by the endpoint. This controls the shape of the pushed message (i.e., its fields and metadata). If not present during the `CreateSubscription` call, it will default to the version of the Pub/Sub API used to make such call. If not present in a `ModifyPushConfig` call, its value will not be changed. `GetSubscription` calls will always return a valid version, even if the subscription was created without this attribute. The only supported values for the `x-goog-version` attribute are: * `v1beta1`: uses the push format defined in the v1beta1 Pub/Sub API. * `v1` or `v1beta2`: uses the push format defined in the v1 Pub/Sub API. For example: `attributes { "x-goog-version": "v1" }`',
      ).optional(),
      noWrapper: z.object({
        writeMetadata: z.boolean().describe(
          "Optional. When true, writes the Pub/Sub message metadata to `x-goog-pubsub-:` headers of the HTTP request. Writes the Pub/Sub message attributes to `:` headers of the HTTP request.",
        ).optional(),
      }).describe("Sets the `data` field as the HTTP body for delivery.")
        .optional(),
      oidcToken: z.object({
        audience: z.string().describe(
          "Optional. Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. The audience value is a single case-sensitive string. Having multiple values (array) for the audience field is not supported. More info about the OIDC JWT token audience here: https://tools.ietf.org/html/rfc7519#section-4.1.3 Note: if not specified, the Push endpoint URL will be used.",
        ).optional(),
        serviceAccountEmail: z.string().describe(
          "Optional. [Service account email](https://cloud.google.com/iam/docs/service-accounts) used for generating the OIDC token. For more information on setting up authentication, see [Push subscriptions](https://cloud.google.com/pubsub/docs/push).",
        ).optional(),
      }).describe(
        "Contains information needed for generating an [OpenID Connect token](https://developers.google.com/identity/protocols/OpenIDConnect).",
      ).optional(),
      pubsubWrapper: z.object({}).describe(
        "The payload to the push endpoint is in the form of the JSON representation of a PubsubMessage (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#pubsubmessage).",
      ).optional(),
      pushEndpoint: z.string().describe(
        "Optional. A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use `https://example.com/push`.",
      ).optional(),
    }).describe("Configuration for a push delivery endpoint.").optional(),
    retainAckedMessages: z.boolean().describe(
      "Optional. Indicates whether to retain acknowledged messages. If true, then messages are not expunged from the subscription's backlog, even if they are acknowledged, until they fall out of the `message_retention_duration` window. This must be true if you would like to [`Seek` to a timestamp] (https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) in the past to replay previously-acknowledged messages.",
    ).optional(),
    retryPolicy: z.object({
      maximumBackoff: z.string().describe(
        "Optional. The maximum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 600 seconds.",
      ).optional(),
      minimumBackoff: z.string().describe(
        "Optional. The minimum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 10 seconds.",
      ).optional(),
    }).describe(
      "A policy that specifies how Pub/Sub retries message delivery. Retry delay will be exponential based on provided minimum and maximum backoffs. https://en.wikipedia.org/wiki/Exponential_backoff. RetryPolicy will be triggered on NACKs or acknowledgment deadline exceeded events for a given message. Retry Policy is implemented on a best effort basis. At times, the delay between consecutive deliveries may not match the configuration. That is, delay can be more or less than configured backoff.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "RESOURCE_ERROR"]).describe(
      "Output only. An output-only field indicating whether or not the subscription can receive messages.",
    ).optional(),
    tags: z.record(z.string(), z.string()).describe(
      'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" See https://{$universe.dns_names.final_documentation_domain}/pubsub/docs/tags for more information on using tags with Pub/Sub resources.',
    ).optional(),
    topic: z.string().describe(
      "Required. The name of the topic from which this subscription is receiving messages. Format is `projects/{project}/topics/{topic}`. The value of this field will be `_deleted-topic_` if the topic has been deleted.",
    ).optional(),
    topicMessageRetentionDuration: z.string().describe(
      "Output only. Indicates the minimum duration for which a message is retained after it is published to the subscription's topic. If this field is set, messages published to the subscription's topic in the last `topic_message_retention_duration` are always available to subscribers. See the `message_retention_duration` field in `Topic`. This field is set only in responses from the server; it is ignored if it is set in any requests.",
    ).optional(),
  }).describe(
    "A subscription resource. If none of `push_config`, `bigquery_config`, `cloud_storage_config`, or `bigtable_config` is set, then the subscriber will pull and ack messages using API methods. At most one of these fields may be set.",
  ).optional(),
  updateMask: z.string().describe(
    "Required. Indicates which fields in the provided subscription to update. Must be specified and non-empty.",
  ).optional(),
});

const StateSchema = z.object({
  ackDeadlineSeconds: z.number().optional(),
  analyticsHubSubscriptionInfo: z.object({
    listing: z.string(),
    subscription: z.string(),
  }).optional(),
  bigqueryConfig: z.object({
    dropUnknownFields: z.boolean(),
    serviceAccountEmail: z.string(),
    state: z.string(),
    table: z.string(),
    useTableSchema: z.boolean(),
    useTopicSchema: z.boolean(),
    writeMetadata: z.boolean(),
  }).optional(),
  bigtableConfig: z.object({
    appProfileId: z.string(),
    serviceAccountEmail: z.string(),
    state: z.string(),
    table: z.string(),
    writeMetadata: z.boolean(),
  }).optional(),
  cloudStorageConfig: z.object({
    avroConfig: z.object({
      useTopicSchema: z.boolean(),
      writeMetadata: z.boolean(),
    }),
    bucket: z.string(),
    filenameDatetimeFormat: z.string(),
    filenamePrefix: z.string(),
    filenameSuffix: z.string(),
    maxBytes: z.string(),
    maxDuration: z.string(),
    maxMessages: z.string(),
    serviceAccountEmail: z.string(),
    state: z.string(),
    textConfig: z.object({}),
  }).optional(),
  deadLetterPolicy: z.object({
    deadLetterTopic: z.string(),
    maxDeliveryAttempts: z.number(),
  }).optional(),
  detached: z.boolean().optional(),
  enableExactlyOnceDelivery: z.boolean().optional(),
  enableMessageOrdering: z.boolean().optional(),
  expirationPolicy: z.object({
    ttl: z.string(),
  }).optional(),
  filter: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  messageRetentionDuration: z.string().optional(),
  messageTransforms: z.array(z.object({
    aiInference: z.object({
      endpoint: z.string(),
      serviceAccountEmail: z.string(),
      unstructuredInference: z.object({
        parameters: z.record(z.string(), z.unknown()),
      }),
    }),
    disabled: z.boolean(),
    enabled: z.boolean(),
    javascriptUdf: z.object({
      code: z.string(),
      functionName: z.string(),
    }),
  })).optional(),
  name: z.string(),
  pushConfig: z.object({
    attributes: z.record(z.string(), z.unknown()),
    noWrapper: z.object({
      writeMetadata: z.boolean(),
    }),
    oidcToken: z.object({
      audience: z.string(),
      serviceAccountEmail: z.string(),
    }),
    pubsubWrapper: z.object({}),
    pushEndpoint: z.string(),
  }).optional(),
  retainAckedMessages: z.boolean().optional(),
  retryPolicy: z.object({
    maximumBackoff: z.string(),
    minimumBackoff: z.string(),
  }).optional(),
  state: z.string().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  topic: z.string().optional(),
  topicMessageRetentionDuration: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ackDeadlineSeconds: z.number().int().describe(
    "Optional. The approximate amount of time (on a best-effort basis) Pub/Sub waits for the subscriber to acknowledge receipt before resending the message. In the interval after the message is delivered and before it is acknowledged, it is considered to be _outstanding_. During that time period, the message will not be redelivered (on a best-effort basis). For pull subscriptions, this value is used as the initial value for the ack deadline. To override this value for a given message, call `ModifyAckDeadline` with the corresponding `ack_id` if using non-streaming pull or send the `ack_id` in a `StreamingModifyAckDeadlineRequest` if using streaming pull. The minimum custom deadline you can specify is 10 seconds. The maximum custom deadline you can specify is 600 seconds (10 minutes). If this parameter is 0, a default value of 10 seconds is used. For push delivery, this value is also used to set the request timeout for the call to the push endpoint. If the subscriber never acknowledges the message, the Pub/Sub system will eventually redeliver the message.",
  ).optional(),
  analyticsHubSubscriptionInfo: z.object({
    listing: z.string().describe(
      'Optional. The name of the associated Analytics Hub listing resource. Pattern: "projects/{project}/locations/{location}/dataExchanges/{data_exchange}/listings/{listing}"',
    ).optional(),
    subscription: z.string().describe(
      'Optional. The name of the associated Analytics Hub subscription resource. Pattern: "projects/{project}/locations/{location}/subscriptions/{subscription}"',
    ).optional(),
  }).describe(
    "Information about an associated [Analytics Hub subscription](https://cloud.google.com/bigquery/docs/analytics-hub-manage-subscriptions).",
  ).optional(),
  bigqueryConfig: z.object({
    dropUnknownFields: z.boolean().describe(
      "Optional. When true and use_topic_schema is true, any fields that are a part of the topic schema that are not part of the BigQuery table schema are dropped when writing to BigQuery. Otherwise, the schemas must be kept in sync and any messages with extra fields are not written and remain in the subscription's backlog.",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. The service account to use to write to BigQuery. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "PERMISSION_DENIED",
      "NOT_FOUND",
      "SCHEMA_MISMATCH",
      "IN_TRANSIT_LOCATION_RESTRICTION",
      "VERTEX_AI_LOCATION_RESTRICTION",
    ]).describe(
      "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
    ).optional(),
    table: z.string().describe(
      "Optional. The name of the table to which to write data, of the form {projectId}.{datasetId}.{tableId}",
    ).optional(),
    useTableSchema: z.boolean().describe(
      "Optional. When true, use the BigQuery table's schema as the columns to write to in BigQuery. `use_table_schema` and `use_topic_schema` cannot be enabled at the same time.",
    ).optional(),
    useTopicSchema: z.boolean().describe(
      "Optional. When true, use the topic's schema as the columns to write to in BigQuery, if it exists. `use_topic_schema` and `use_table_schema` cannot be enabled at the same time.",
    ).optional(),
    writeMetadata: z.boolean().describe(
      "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column.",
    ).optional(),
  }).describe("Configuration for a BigQuery subscription.").optional(),
  bigtableConfig: z.object({
    appProfileId: z.string().describe(
      'Optional. The app profile to use for the Bigtable writes. If not specified, the "default" application profile will be used. The app profile must use single-cluster routing.',
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. The service account to use to write to Bigtable. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "NOT_FOUND",
      "APP_PROFILE_MISCONFIGURED",
      "PERMISSION_DENIED",
      "SCHEMA_MISMATCH",
      "IN_TRANSIT_LOCATION_RESTRICTION",
      "VERTEX_AI_LOCATION_RESTRICTION",
    ]).describe(
      "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
    ).optional(),
    table: z.string().describe(
      "Optional. The unique name of the table to write messages to. Values are of the form `projects//instances//tables/`.",
    ).optional(),
    writeMetadata: z.boolean().describe(
      "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table under the pubsub_metadata column family. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column.",
    ).optional(),
  }).describe(
    'Configuration for a Bigtable subscription. The Pub/Sub message will be written to a Bigtable row as follows: - row key: subscription name and message ID delimited by #. - columns: message bytes written to a single column family "data" with an empty-string column qualifier. - cell timestamp: the message publish timestamp.',
  ).optional(),
  cloudStorageConfig: z.object({
    avroConfig: z.object({
      useTopicSchema: z.boolean().describe(
        "Optional. When true, the output Cloud Storage file will be serialized using the topic schema, if it exists.",
      ).optional(),
      writeMetadata: z.boolean().describe(
        "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key as additional fields in the output. The subscription name, message_id, and publish_time fields are put in their own fields while all other message properties other than data (for example, an ordering_key, if present) are added as entries in the attributes map.",
      ).optional(),
    }).describe(
      "Configuration for writing message data in Avro format. Message payloads and metadata will be written to files as an Avro binary.",
    ).optional(),
    bucket: z.string().describe(
      'Required. User-provided name for the Cloud Storage bucket. The bucket must be created by the user. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming).',
    ).optional(),
    filenameDatetimeFormat: z.string().describe(
      "Optional. User-provided format string specifying how to represent datetimes in Cloud Storage filenames. See the [datetime format guidance](https://cloud.google.com/pubsub/docs/create-cloudstorage-subscription#file_names).",
    ).optional(),
    filenamePrefix: z.string().describe(
      "Optional. User-provided prefix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming).",
    ).optional(),
    filenameSuffix: z.string().describe(
      'Optional. User-provided suffix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming). Must not end in "/".',
    ).optional(),
    maxBytes: z.string().describe(
      "Optional. The maximum bytes that can be written to a Cloud Storage file before a new file is created. Min 1 KB, max 10 GiB. The max_bytes limit may be exceeded in cases where messages are larger than the limit.",
    ).optional(),
    maxDuration: z.string().describe(
      "Optional. The maximum duration that can elapse before a new Cloud Storage file is created. Min 1 minute, max 10 minutes, default 5 minutes. May not exceed the subscription's acknowledgment deadline.",
    ).optional(),
    maxMessages: z.string().describe(
      "Optional. The maximum number of messages that can be written to a Cloud Storage file before a new file is created. Min 1000 messages.",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. The service account to use to write to Cloud Storage. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "PERMISSION_DENIED",
      "NOT_FOUND",
      "IN_TRANSIT_LOCATION_RESTRICTION",
      "SCHEMA_MISMATCH",
      "VERTEX_AI_LOCATION_RESTRICTION",
    ]).describe(
      "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
    ).optional(),
    textConfig: z.object({}).describe(
      "Configuration for writing message data in text format. Message payloads will be written to files as raw text, separated by a newline.",
    ).optional(),
  }).describe("Configuration for a Cloud Storage subscription.").optional(),
  deadLetterPolicy: z.object({
    deadLetterTopic: z.string().describe(
      "Optional. The name of the topic to which dead letter messages should be published. Format is `projects/{project}/topics/{topic}`.The Pub/Sub service account associated with the enclosing subscription's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Publish() to this topic. The operation will fail if the topic does not exist. Users should ensure that there is a subscription attached to this topic since messages published to a topic with no subscriptions are lost.",
    ).optional(),
    maxDeliveryAttempts: z.number().int().describe(
      "Optional. The maximum number of delivery attempts for any message. The value must be between 5 and 100. The number of delivery attempts is defined as 1 + (the sum of number of NACKs and number of times the acknowledgment deadline has been exceeded for the message). A NACK is any call to ModifyAckDeadline with a 0 deadline. Note that client libraries may automatically extend ack_deadlines. This field will be honored on a best effort basis. If this parameter is 0, a default value of 5 is used.",
    ).optional(),
  }).describe(
    "Dead lettering is done on a best effort basis. The same message might be dead lettered multiple times. If validation on any of the fields fails at subscription creation/updation, the create/update subscription request will fail.",
  ).optional(),
  detached: z.boolean().describe(
    "Optional. Indicates whether the subscription is detached from its topic. Detached subscriptions don't receive messages from their topic and don't retain any backlog. `Pull` and `StreamingPull` requests will return FAILED_PRECONDITION. If the subscription is a push subscription, pushes to the endpoint will not be made.",
  ).optional(),
  enableExactlyOnceDelivery: z.boolean().describe(
    "Optional. If true, Pub/Sub provides the following guarantees for the delivery of a message with a given value of `message_id` on this subscription: * The message sent to a subscriber is guaranteed not to be resent before the message's acknowledgment deadline expires. * An acknowledged message will not be resent to a subscriber. Note that subscribers may still receive multiple copies of a message when `enable_exactly_once_delivery` is true if the message was published multiple times by a publisher client. These copies are considered distinct by Pub/Sub and have distinct `message_id` values.",
  ).optional(),
  enableMessageOrdering: z.boolean().describe(
    "Optional. If true, messages published with the same `ordering_key` in `PubsubMessage` will be delivered to the subscribers in the order in which they are received by the Pub/Sub system. Otherwise, they may be delivered in any order.",
  ).optional(),
  expirationPolicy: z.object({
    ttl: z.string().describe(
      'Optional. Specifies the "time-to-live" duration for an associated resource. The resource expires if it is not active for a period of `ttl`. The definition of "activity" depends on the type of the associated resource. The minimum and maximum allowed values for `ttl` depend on the type of the associated resource, as well. If `ttl` is not set, the associated resource never expires.',
    ).optional(),
  }).describe(
    "A policy that specifies the conditions for resource expiration (i.e., automatic resource deletion).",
  ).optional(),
  filter: z.string().describe(
    "Optional. An expression written in the Pub/Sub [filter language](https://cloud.google.com/pubsub/docs/filtering). If non-empty, then only `PubsubMessage`s whose `attributes` field matches the filter are delivered on this subscription. If empty, then no messages are filtered out.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. See [Creating and managing labels](https://cloud.google.com/pubsub/docs/labels).",
  ).optional(),
  messageRetentionDuration: z.string().describe(
    "Optional. How long to retain unacknowledged messages in the subscription's backlog, from the moment a message is published. If `retain_acked_messages` is true, then this also configures the retention of acknowledged messages, and thus configures how far back in time a `Seek` can be done. Defaults to 7 days. Cannot be more than 31 days or less than 10 minutes.",
  ).optional(),
  messageTransforms: z.array(z.object({
    aiInference: z.object({
      endpoint: z.string().describe(
        "Required. An endpoint to a Vertex AI model of the form `projects/{project}/locations/{location}/endpoints/{endpoint}` or `projects/{project}/locations/{location}/publishers/{publisher}/models/{model}`. Vertex AI API requests will be sent to this endpoint.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. The service account to use to make prediction requests against endpoints. The resource creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
      ).optional(),
      unstructuredInference: z.object({
        parameters: z.record(z.string(), z.unknown()).describe(
          "Optional. A parameters object to be included in each inference request. The parameters object is combined with the data field of the Pub/Sub message to form the inference request.",
        ).optional(),
      }).describe(
        "Configuration for making inferences using arbitrary JSON payloads.",
      ).optional(),
    }).describe(
      "Configuration for making inference requests against Vertex AI models.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. If true, the transform is disabled and will not be applied to messages. Defaults to `false`.",
    ).optional(),
    enabled: z.boolean().describe(
      "Optional. This field is deprecated, use the `disabled` field to disable transforms.",
    ).optional(),
    javascriptUdf: z.object({
      code: z.string().describe(
        "Required. JavaScript code that contains a function `function_name` with the below signature: ``` /** * Transforms a Pub/Sub message. * @return {(Object)>|null)} - To * filter a message, return `null`. To transform a message return a map * with the following keys: * - (required) 'data': {string} * - (optional) 'attributes': {Object} * Returning empty `attributes` will remove all attributes from the * message. * * @param {(Object)>} Pub/Sub * message. Keys: * - (required) 'data': {string} * - (required) 'attributes': {Object} * * @param {Object} metadata - Pub/Sub message metadata. * Keys: * - (optional) 'message_id': {string} * - (optional) 'publish_time': {string} YYYY-MM-DDTHH:MM:SSZ format * - (optional) 'ordering_key': {string} */ function (message, metadata) { } ```",
      ).optional(),
      functionName: z.string().describe(
        "Required. Name of the JavasScript function that should applied to Pub/Sub messages.",
      ).optional(),
    }).describe(
      "User-defined JavaScript function that can transform or filter a Pub/Sub message.",
    ).optional(),
  })).describe(
    "Optional. Transforms to be applied to messages before they are delivered to subscribers. Transforms are applied in the order specified.",
  ).optional(),
  name: z.string().describe(
    'Required. Identifier. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`.',
  ).optional(),
  pushConfig: z.object({
    attributes: z.record(z.string(), z.string()).describe(
      'Optional. Endpoint configuration attributes that can be used to control different aspects of the message delivery. The only currently supported attribute is `x-goog-version`, which you can use to change the format of the pushed message. This attribute indicates the version of the data expected by the endpoint. This controls the shape of the pushed message (i.e., its fields and metadata). If not present during the `CreateSubscription` call, it will default to the version of the Pub/Sub API used to make such call. If not present in a `ModifyPushConfig` call, its value will not be changed. `GetSubscription` calls will always return a valid version, even if the subscription was created without this attribute. The only supported values for the `x-goog-version` attribute are: * `v1beta1`: uses the push format defined in the v1beta1 Pub/Sub API. * `v1` or `v1beta2`: uses the push format defined in the v1 Pub/Sub API. For example: `attributes { "x-goog-version": "v1" }`',
    ).optional(),
    noWrapper: z.object({
      writeMetadata: z.boolean().describe(
        "Optional. When true, writes the Pub/Sub message metadata to `x-goog-pubsub-:` headers of the HTTP request. Writes the Pub/Sub message attributes to `:` headers of the HTTP request.",
      ).optional(),
    }).describe("Sets the `data` field as the HTTP body for delivery.")
      .optional(),
    oidcToken: z.object({
      audience: z.string().describe(
        "Optional. Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. The audience value is a single case-sensitive string. Having multiple values (array) for the audience field is not supported. More info about the OIDC JWT token audience here: https://tools.ietf.org/html/rfc7519#section-4.1.3 Note: if not specified, the Push endpoint URL will be used.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. [Service account email](https://cloud.google.com/iam/docs/service-accounts) used for generating the OIDC token. For more information on setting up authentication, see [Push subscriptions](https://cloud.google.com/pubsub/docs/push).",
      ).optional(),
    }).describe(
      "Contains information needed for generating an [OpenID Connect token](https://developers.google.com/identity/protocols/OpenIDConnect).",
    ).optional(),
    pubsubWrapper: z.object({}).describe(
      "The payload to the push endpoint is in the form of the JSON representation of a PubsubMessage (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#pubsubmessage).",
    ).optional(),
    pushEndpoint: z.string().describe(
      "Optional. A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use `https://example.com/push`.",
    ).optional(),
  }).describe("Configuration for a push delivery endpoint.").optional(),
  retainAckedMessages: z.boolean().describe(
    "Optional. Indicates whether to retain acknowledged messages. If true, then messages are not expunged from the subscription's backlog, even if they are acknowledged, until they fall out of the `message_retention_duration` window. This must be true if you would like to [`Seek` to a timestamp] (https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) in the past to replay previously-acknowledged messages.",
  ).optional(),
  retryPolicy: z.object({
    maximumBackoff: z.string().describe(
      "Optional. The maximum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 600 seconds.",
    ).optional(),
    minimumBackoff: z.string().describe(
      "Optional. The minimum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 10 seconds.",
    ).optional(),
  }).describe(
    "A policy that specifies how Pub/Sub retries message delivery. Retry delay will be exponential based on provided minimum and maximum backoffs. https://en.wikipedia.org/wiki/Exponential_backoff. RetryPolicy will be triggered on NACKs or acknowledgment deadline exceeded events for a given message. Retry Policy is implemented on a best effort basis. At times, the delay between consecutive deliveries may not match the configuration. That is, delay can be more or less than configured backoff.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" See https://{$universe.dns_names.final_documentation_domain}/pubsub/docs/tags for more information on using tags with Pub/Sub resources.',
  ).optional(),
  topic: z.string().describe(
    "Required. The name of the topic from which this subscription is receiving messages. Format is `projects/{project}/topics/{topic}`. The value of this field will be `_deleted-topic_` if the topic has been deleted.",
  ).optional(),
  subscription: z.object({
    ackDeadlineSeconds: z.number().int().describe(
      "Optional. The approximate amount of time (on a best-effort basis) Pub/Sub waits for the subscriber to acknowledge receipt before resending the message. In the interval after the message is delivered and before it is acknowledged, it is considered to be _outstanding_. During that time period, the message will not be redelivered (on a best-effort basis). For pull subscriptions, this value is used as the initial value for the ack deadline. To override this value for a given message, call `ModifyAckDeadline` with the corresponding `ack_id` if using non-streaming pull or send the `ack_id` in a `StreamingModifyAckDeadlineRequest` if using streaming pull. The minimum custom deadline you can specify is 10 seconds. The maximum custom deadline you can specify is 600 seconds (10 minutes). If this parameter is 0, a default value of 10 seconds is used. For push delivery, this value is also used to set the request timeout for the call to the push endpoint. If the subscriber never acknowledges the message, the Pub/Sub system will eventually redeliver the message.",
    ).optional(),
    analyticsHubSubscriptionInfo: z.object({
      listing: z.string().describe(
        'Optional. The name of the associated Analytics Hub listing resource. Pattern: "projects/{project}/locations/{location}/dataExchanges/{data_exchange}/listings/{listing}"',
      ).optional(),
      subscription: z.string().describe(
        'Optional. The name of the associated Analytics Hub subscription resource. Pattern: "projects/{project}/locations/{location}/subscriptions/{subscription}"',
      ).optional(),
    }).describe(
      "Information about an associated [Analytics Hub subscription](https://cloud.google.com/bigquery/docs/analytics-hub-manage-subscriptions).",
    ).optional(),
    bigqueryConfig: z.object({
      dropUnknownFields: z.boolean().describe(
        "Optional. When true and use_topic_schema is true, any fields that are a part of the topic schema that are not part of the BigQuery table schema are dropped when writing to BigQuery. Otherwise, the schemas must be kept in sync and any messages with extra fields are not written and remain in the subscription's backlog.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. The service account to use to write to BigQuery. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "PERMISSION_DENIED",
        "NOT_FOUND",
        "SCHEMA_MISMATCH",
        "IN_TRANSIT_LOCATION_RESTRICTION",
        "VERTEX_AI_LOCATION_RESTRICTION",
      ]).describe(
        "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
      ).optional(),
      table: z.string().describe(
        "Optional. The name of the table to which to write data, of the form {projectId}.{datasetId}.{tableId}",
      ).optional(),
      useTableSchema: z.boolean().describe(
        "Optional. When true, use the BigQuery table's schema as the columns to write to in BigQuery. `use_table_schema` and `use_topic_schema` cannot be enabled at the same time.",
      ).optional(),
      useTopicSchema: z.boolean().describe(
        "Optional. When true, use the topic's schema as the columns to write to in BigQuery, if it exists. `use_topic_schema` and `use_table_schema` cannot be enabled at the same time.",
      ).optional(),
      writeMetadata: z.boolean().describe(
        "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column.",
      ).optional(),
    }).describe("Configuration for a BigQuery subscription.").optional(),
    bigtableConfig: z.object({
      appProfileId: z.string().describe(
        'Optional. The app profile to use for the Bigtable writes. If not specified, the "default" application profile will be used. The app profile must use single-cluster routing.',
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. The service account to use to write to Bigtable. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "NOT_FOUND",
        "APP_PROFILE_MISCONFIGURED",
        "PERMISSION_DENIED",
        "SCHEMA_MISMATCH",
        "IN_TRANSIT_LOCATION_RESTRICTION",
        "VERTEX_AI_LOCATION_RESTRICTION",
      ]).describe(
        "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
      ).optional(),
      table: z.string().describe(
        "Optional. The unique name of the table to write messages to. Values are of the form `projects//instances//tables/`.",
      ).optional(),
      writeMetadata: z.boolean().describe(
        "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table under the pubsub_metadata column family. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column.",
      ).optional(),
    }).describe(
      'Configuration for a Bigtable subscription. The Pub/Sub message will be written to a Bigtable row as follows: - row key: subscription name and message ID delimited by #. - columns: message bytes written to a single column family "data" with an empty-string column qualifier. - cell timestamp: the message publish timestamp.',
    ).optional(),
    cloudStorageConfig: z.object({
      avroConfig: z.object({
        useTopicSchema: z.boolean().describe(
          "Optional. When true, the output Cloud Storage file will be serialized using the topic schema, if it exists.",
        ).optional(),
        writeMetadata: z.boolean().describe(
          "Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key as additional fields in the output. The subscription name, message_id, and publish_time fields are put in their own fields while all other message properties other than data (for example, an ordering_key, if present) are added as entries in the attributes map.",
        ).optional(),
      }).describe(
        "Configuration for writing message data in Avro format. Message payloads and metadata will be written to files as an Avro binary.",
      ).optional(),
      bucket: z.string().describe(
        'Required. User-provided name for the Cloud Storage bucket. The bucket must be created by the user. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming).',
      ).optional(),
      filenameDatetimeFormat: z.string().describe(
        "Optional. User-provided format string specifying how to represent datetimes in Cloud Storage filenames. See the [datetime format guidance](https://cloud.google.com/pubsub/docs/create-cloudstorage-subscription#file_names).",
      ).optional(),
      filenamePrefix: z.string().describe(
        "Optional. User-provided prefix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming).",
      ).optional(),
      filenameSuffix: z.string().describe(
        'Optional. User-provided suffix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming). Must not end in "/".',
      ).optional(),
      maxBytes: z.string().describe(
        "Optional. The maximum bytes that can be written to a Cloud Storage file before a new file is created. Min 1 KB, max 10 GiB. The max_bytes limit may be exceeded in cases where messages are larger than the limit.",
      ).optional(),
      maxDuration: z.string().describe(
        "Optional. The maximum duration that can elapse before a new Cloud Storage file is created. Min 1 minute, max 10 minutes, default 5 minutes. May not exceed the subscription's acknowledgment deadline.",
      ).optional(),
      maxMessages: z.string().describe(
        "Optional. The maximum number of messages that can be written to a Cloud Storage file before a new file is created. Min 1000 messages.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "Optional. The service account to use to write to Cloud Storage. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "PERMISSION_DENIED",
        "NOT_FOUND",
        "IN_TRANSIT_LOCATION_RESTRICTION",
        "SCHEMA_MISMATCH",
        "VERTEX_AI_LOCATION_RESTRICTION",
      ]).describe(
        "Output only. An output-only field that indicates whether or not the subscription can receive messages.",
      ).optional(),
      textConfig: z.object({}).describe(
        "Configuration for writing message data in text format. Message payloads will be written to files as raw text, separated by a newline.",
      ).optional(),
    }).describe("Configuration for a Cloud Storage subscription.").optional(),
    deadLetterPolicy: z.object({
      deadLetterTopic: z.string().describe(
        "Optional. The name of the topic to which dead letter messages should be published. Format is `projects/{project}/topics/{topic}`.The Pub/Sub service account associated with the enclosing subscription's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Publish() to this topic. The operation will fail if the topic does not exist. Users should ensure that there is a subscription attached to this topic since messages published to a topic with no subscriptions are lost.",
      ).optional(),
      maxDeliveryAttempts: z.number().int().describe(
        "Optional. The maximum number of delivery attempts for any message. The value must be between 5 and 100. The number of delivery attempts is defined as 1 + (the sum of number of NACKs and number of times the acknowledgment deadline has been exceeded for the message). A NACK is any call to ModifyAckDeadline with a 0 deadline. Note that client libraries may automatically extend ack_deadlines. This field will be honored on a best effort basis. If this parameter is 0, a default value of 5 is used.",
      ).optional(),
    }).describe(
      "Dead lettering is done on a best effort basis. The same message might be dead lettered multiple times. If validation on any of the fields fails at subscription creation/updation, the create/update subscription request will fail.",
    ).optional(),
    detached: z.boolean().describe(
      "Optional. Indicates whether the subscription is detached from its topic. Detached subscriptions don't receive messages from their topic and don't retain any backlog. `Pull` and `StreamingPull` requests will return FAILED_PRECONDITION. If the subscription is a push subscription, pushes to the endpoint will not be made.",
    ).optional(),
    enableExactlyOnceDelivery: z.boolean().describe(
      "Optional. If true, Pub/Sub provides the following guarantees for the delivery of a message with a given value of `message_id` on this subscription: * The message sent to a subscriber is guaranteed not to be resent before the message's acknowledgment deadline expires. * An acknowledged message will not be resent to a subscriber. Note that subscribers may still receive multiple copies of a message when `enable_exactly_once_delivery` is true if the message was published multiple times by a publisher client. These copies are considered distinct by Pub/Sub and have distinct `message_id` values.",
    ).optional(),
    enableMessageOrdering: z.boolean().describe(
      "Optional. If true, messages published with the same `ordering_key` in `PubsubMessage` will be delivered to the subscribers in the order in which they are received by the Pub/Sub system. Otherwise, they may be delivered in any order.",
    ).optional(),
    expirationPolicy: z.object({
      ttl: z.string().describe(
        'Optional. Specifies the "time-to-live" duration for an associated resource. The resource expires if it is not active for a period of `ttl`. The definition of "activity" depends on the type of the associated resource. The minimum and maximum allowed values for `ttl` depend on the type of the associated resource, as well. If `ttl` is not set, the associated resource never expires.',
      ).optional(),
    }).describe(
      "A policy that specifies the conditions for resource expiration (i.e., automatic resource deletion).",
    ).optional(),
    filter: z.string().describe(
      "Optional. An expression written in the Pub/Sub [filter language](https://cloud.google.com/pubsub/docs/filtering). If non-empty, then only `PubsubMessage`s whose `attributes` field matches the filter are delivered on this subscription. If empty, then no messages are filtered out.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. See [Creating and managing labels](https://cloud.google.com/pubsub/docs/labels).",
    ).optional(),
    messageRetentionDuration: z.string().describe(
      "Optional. How long to retain unacknowledged messages in the subscription's backlog, from the moment a message is published. If `retain_acked_messages` is true, then this also configures the retention of acknowledged messages, and thus configures how far back in time a `Seek` can be done. Defaults to 7 days. Cannot be more than 31 days or less than 10 minutes.",
    ).optional(),
    messageTransforms: z.array(z.object({
      aiInference: z.object({
        endpoint: z.string().describe(
          "Required. An endpoint to a Vertex AI model of the form `projects/{project}/locations/{location}/endpoints/{endpoint}` or `projects/{project}/locations/{location}/publishers/{publisher}/models/{model}`. Vertex AI API requests will be sent to this endpoint.",
        ).optional(),
        serviceAccountEmail: z.string().describe(
          "Optional. The service account to use to make prediction requests against endpoints. The resource creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used.",
        ).optional(),
        unstructuredInference: z.object({
          parameters: z.unknown().describe(
            "Optional. A parameters object to be included in each inference request. The parameters object is combined with the data field of the Pub/Sub message to form the inference request.",
          ).optional(),
        }).describe(
          "Configuration for making inferences using arbitrary JSON payloads.",
        ).optional(),
      }).describe(
        "Configuration for making inference requests against Vertex AI models.",
      ).optional(),
      disabled: z.boolean().describe(
        "Optional. If true, the transform is disabled and will not be applied to messages. Defaults to `false`.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. This field is deprecated, use the `disabled` field to disable transforms.",
      ).optional(),
      javascriptUdf: z.object({
        code: z.string().describe(
          "Required. JavaScript code that contains a function `function_name` with the below signature: ``` /** * Transforms a Pub/Sub message. * @return {(Object)>|null)} - To * filter a message, return `null`. To transform a message return a map * with the following keys: * - (required) 'data': {string} * - (optional) 'attributes': {Object} * Returning empty `attributes` will remove all attributes from the * message. * * @param {(Object)>} Pub/Sub * message. Keys: * - (required) 'data': {string} * - (required) 'attributes': {Object} * * @param {Object} metadata - Pub/Sub message metadata. * Keys: * - (optional) 'message_id': {string} * - (optional) 'publish_time': {string} YYYY-MM-DDTHH:MM:SSZ format * - (optional) 'ordering_key': {string} */ function (message, metadata) { } ```",
        ).optional(),
        functionName: z.string().describe(
          "Required. Name of the JavasScript function that should applied to Pub/Sub messages.",
        ).optional(),
      }).describe(
        "User-defined JavaScript function that can transform or filter a Pub/Sub message.",
      ).optional(),
    })).describe(
      "Optional. Transforms to be applied to messages before they are delivered to subscribers. Transforms are applied in the order specified.",
    ).optional(),
    name: z.string().describe(
      'Required. Identifier. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`.',
    ).optional(),
    pushConfig: z.object({
      attributes: z.record(z.string(), z.string()).describe(
        'Optional. Endpoint configuration attributes that can be used to control different aspects of the message delivery. The only currently supported attribute is `x-goog-version`, which you can use to change the format of the pushed message. This attribute indicates the version of the data expected by the endpoint. This controls the shape of the pushed message (i.e., its fields and metadata). If not present during the `CreateSubscription` call, it will default to the version of the Pub/Sub API used to make such call. If not present in a `ModifyPushConfig` call, its value will not be changed. `GetSubscription` calls will always return a valid version, even if the subscription was created without this attribute. The only supported values for the `x-goog-version` attribute are: * `v1beta1`: uses the push format defined in the v1beta1 Pub/Sub API. * `v1` or `v1beta2`: uses the push format defined in the v1 Pub/Sub API. For example: `attributes { "x-goog-version": "v1" }`',
      ).optional(),
      noWrapper: z.object({
        writeMetadata: z.boolean().describe(
          "Optional. When true, writes the Pub/Sub message metadata to `x-goog-pubsub-:` headers of the HTTP request. Writes the Pub/Sub message attributes to `:` headers of the HTTP request.",
        ).optional(),
      }).describe("Sets the `data` field as the HTTP body for delivery.")
        .optional(),
      oidcToken: z.object({
        audience: z.string().describe(
          "Optional. Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. The audience value is a single case-sensitive string. Having multiple values (array) for the audience field is not supported. More info about the OIDC JWT token audience here: https://tools.ietf.org/html/rfc7519#section-4.1.3 Note: if not specified, the Push endpoint URL will be used.",
        ).optional(),
        serviceAccountEmail: z.string().describe(
          "Optional. [Service account email](https://cloud.google.com/iam/docs/service-accounts) used for generating the OIDC token. For more information on setting up authentication, see [Push subscriptions](https://cloud.google.com/pubsub/docs/push).",
        ).optional(),
      }).describe(
        "Contains information needed for generating an [OpenID Connect token](https://developers.google.com/identity/protocols/OpenIDConnect).",
      ).optional(),
      pubsubWrapper: z.object({}).describe(
        "The payload to the push endpoint is in the form of the JSON representation of a PubsubMessage (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#pubsubmessage).",
      ).optional(),
      pushEndpoint: z.string().describe(
        "Optional. A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use `https://example.com/push`.",
      ).optional(),
    }).describe("Configuration for a push delivery endpoint.").optional(),
    retainAckedMessages: z.boolean().describe(
      "Optional. Indicates whether to retain acknowledged messages. If true, then messages are not expunged from the subscription's backlog, even if they are acknowledged, until they fall out of the `message_retention_duration` window. This must be true if you would like to [`Seek` to a timestamp] (https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) in the past to replay previously-acknowledged messages.",
    ).optional(),
    retryPolicy: z.object({
      maximumBackoff: z.string().describe(
        "Optional. The maximum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 600 seconds.",
      ).optional(),
      minimumBackoff: z.string().describe(
        "Optional. The minimum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 10 seconds.",
      ).optional(),
    }).describe(
      "A policy that specifies how Pub/Sub retries message delivery. Retry delay will be exponential based on provided minimum and maximum backoffs. https://en.wikipedia.org/wiki/Exponential_backoff. RetryPolicy will be triggered on NACKs or acknowledgment deadline exceeded events for a given message. Retry Policy is implemented on a best effort basis. At times, the delay between consecutive deliveries may not match the configuration. That is, delay can be more or less than configured backoff.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "RESOURCE_ERROR"]).describe(
      "Output only. An output-only field indicating whether or not the subscription can receive messages.",
    ).optional(),
    tags: z.record(z.string(), z.string()).describe(
      'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" See https://{$universe.dns_names.final_documentation_domain}/pubsub/docs/tags for more information on using tags with Pub/Sub resources.',
    ).optional(),
    topic: z.string().describe(
      "Required. The name of the topic from which this subscription is receiving messages. Format is `projects/{project}/topics/{topic}`. The value of this field will be `_deleted-topic_` if the topic has been deleted.",
    ).optional(),
    topicMessageRetentionDuration: z.string().describe(
      "Output only. Indicates the minimum duration for which a message is retained after it is published to the subscription's topic. If this field is set, messages published to the subscription's topic in the last `topic_message_retention_duration` are always available to subscribers. See the `message_retention_duration` field in `Topic`. This field is set only in responses from the server; it is ignored if it is set in any requests.",
    ).optional(),
  }).describe(
    "A subscription resource. If none of `push_config`, `bigquery_config`, `cloud_storage_config`, or `bigtable_config` is set, then the subscriber will pull and ack messages using API methods. At most one of these fields may be set.",
  ).optional(),
  updateMask: z.string().describe(
    "Required. Indicates which fields in the provided subscription to update. Must be specified and non-empty.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Pub/Sub Subscriptions. Registered at `@swamp/gcp/pubsub/subscriptions`. */
export const model = {
  type: "@swamp/gcp/pubsub/subscriptions",
  version: "2026.05.04.1",
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
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A subscription resource. If none of `push_config`, `bigquery_config`, `cloud_...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a subscriptions",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (g["ackDeadlineSeconds"] !== undefined) {
          body["ackDeadlineSeconds"] = g["ackDeadlineSeconds"];
        }
        if (g["analyticsHubSubscriptionInfo"] !== undefined) {
          body["analyticsHubSubscriptionInfo"] =
            g["analyticsHubSubscriptionInfo"];
        }
        if (g["bigqueryConfig"] !== undefined) {
          body["bigqueryConfig"] = g["bigqueryConfig"];
        }
        if (g["bigtableConfig"] !== undefined) {
          body["bigtableConfig"] = g["bigtableConfig"];
        }
        if (g["cloudStorageConfig"] !== undefined) {
          body["cloudStorageConfig"] = g["cloudStorageConfig"];
        }
        if (g["deadLetterPolicy"] !== undefined) {
          body["deadLetterPolicy"] = g["deadLetterPolicy"];
        }
        if (g["detached"] !== undefined) body["detached"] = g["detached"];
        if (g["enableExactlyOnceDelivery"] !== undefined) {
          body["enableExactlyOnceDelivery"] = g["enableExactlyOnceDelivery"];
        }
        if (g["enableMessageOrdering"] !== undefined) {
          body["enableMessageOrdering"] = g["enableMessageOrdering"];
        }
        if (g["expirationPolicy"] !== undefined) {
          body["expirationPolicy"] = g["expirationPolicy"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["messageRetentionDuration"] !== undefined) {
          body["messageRetentionDuration"] = g["messageRetentionDuration"];
        }
        if (g["messageTransforms"] !== undefined) {
          body["messageTransforms"] = g["messageTransforms"];
        }
        if (g["pushConfig"] !== undefined) body["pushConfig"] = g["pushConfig"];
        if (g["retainAckedMessages"] !== undefined) {
          body["retainAckedMessages"] = g["retainAckedMessages"];
        }
        if (g["retryPolicy"] !== undefined) {
          body["retryPolicy"] = g["retryPolicy"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["topic"] !== undefined) body["topic"] = g["topic"];
        if (g["name"] !== undefined) params["subscription"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
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
      description: "Get a subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["subscription"] = args.identifier;
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
      description: "Update subscriptions attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["subscription"] !== undefined) {
          body["subscription"] = g["subscription"];
        }
        if (g["updateMask"] !== undefined) body["updateMask"] = g["updateMask"];
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
              "statusField": "state",
              "readyValues": ["ACTIVE"],
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
      description: "Delete the subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["subscription"] = args.identifier;
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
      description: "Sync subscriptions state from GCP",
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
          params["subscription"] = identifier;
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
    acknowledge: {
      description: "acknowledge",
      arguments: z.object({
        ackIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["subscription"] !== undefined) {
          params["subscription"] = String(g["subscription"]);
        }
        const body: Record<string, unknown> = {};
        if (args["ackIds"] !== undefined) body["ackIds"] = args["ackIds"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "pubsub.projects.subscriptions.acknowledge",
            "path": "v1/{+subscription}:acknowledge",
            "httpMethod": "POST",
            "parameterOrder": ["subscription"],
            "parameters": {
              "subscription": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    detach: {
      description: "detach",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["subscription"] !== undefined) {
          params["subscription"] = String(g["subscription"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "pubsub.projects.subscriptions.detach",
            "path": "v1/{+subscription}:detach",
            "httpMethod": "POST",
            "parameterOrder": ["subscription"],
            "parameters": {
              "subscription": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    modify_ack_deadline: {
      description: "modify ack deadline",
      arguments: z.object({
        ackDeadlineSeconds: z.any().optional(),
        ackIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["subscription"] !== undefined) {
          params["subscription"] = String(g["subscription"]);
        }
        const body: Record<string, unknown> = {};
        if (args["ackDeadlineSeconds"] !== undefined) {
          body["ackDeadlineSeconds"] = args["ackDeadlineSeconds"];
        }
        if (args["ackIds"] !== undefined) body["ackIds"] = args["ackIds"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "pubsub.projects.subscriptions.modifyAckDeadline",
            "path": "v1/{+subscription}:modifyAckDeadline",
            "httpMethod": "POST",
            "parameterOrder": ["subscription"],
            "parameters": {
              "subscription": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    modify_push_config: {
      description: "modify push config",
      arguments: z.object({
        pushConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["subscription"] !== undefined) {
          params["subscription"] = String(g["subscription"]);
        }
        const body: Record<string, unknown> = {};
        if (args["pushConfig"] !== undefined) {
          body["pushConfig"] = args["pushConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "pubsub.projects.subscriptions.modifyPushConfig",
            "path": "v1/{+subscription}:modifyPushConfig",
            "httpMethod": "POST",
            "parameterOrder": ["subscription"],
            "parameters": {
              "subscription": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    pull: {
      description: "pull",
      arguments: z.object({
        maxMessages: z.any().optional(),
        returnImmediately: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["subscription"] !== undefined) {
          params["subscription"] = String(g["subscription"]);
        }
        const body: Record<string, unknown> = {};
        if (args["maxMessages"] !== undefined) {
          body["maxMessages"] = args["maxMessages"];
        }
        if (args["returnImmediately"] !== undefined) {
          body["returnImmediately"] = args["returnImmediately"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "pubsub.projects.subscriptions.pull",
            "path": "v1/{+subscription}:pull",
            "httpMethod": "POST",
            "parameterOrder": ["subscription"],
            "parameters": {
              "subscription": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    seek: {
      description: "seek",
      arguments: z.object({
        snapshot: z.any().optional(),
        time: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["subscription"] !== undefined) {
          params["subscription"] = String(g["subscription"]);
        }
        const body: Record<string, unknown> = {};
        if (args["snapshot"] !== undefined) body["snapshot"] = args["snapshot"];
        if (args["time"] !== undefined) body["time"] = args["time"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "pubsub.projects.subscriptions.seek",
            "path": "v1/{+subscription}:seek",
            "httpMethod": "POST",
            "parameterOrder": ["subscription"],
            "parameters": {
              "subscription": { "location": "path", "required": true },
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
