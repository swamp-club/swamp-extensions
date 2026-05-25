// Auto-generated extension model for @swamp/gcp/pubsub/topics
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Pub/Sub Topics.
 *
 * A topic resource.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://pubsub.googleapis.com/";

const GET_CONFIG = {
  "id": "pubsub.projects.topics.get",
  "path": "v1/{+topic}",
  "httpMethod": "GET",
  "parameterOrder": [
    "topic",
  ],
  "parameters": {
    "topic": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "pubsub.projects.topics.create",
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
  "id": "pubsub.projects.topics.patch",
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
  "id": "pubsub.projects.topics.delete",
  "path": "v1/{+topic}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "topic",
  ],
  "parameters": {
    "topic": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "pubsub.projects.topics.list",
  "path": "v1/{+project}/topics",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  ingestionDataSourceSettings: z.object({
    awsKinesis: z.object({
      awsRoleArn: z.string().describe(
        "Required. AWS role ARN to be used for Federated Identity authentication with Kinesis. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it.",
      ).optional(),
      consumerArn: z.string().describe(
        "Required. The Kinesis consumer ARN to used for ingestion in Enhanced Fan-Out mode. The consumer must be already created and ready to be used.",
      ).optional(),
      gcpServiceAccount: z.string().describe(
        "Required. The GCP service account to be used for Federated Identity authentication with Kinesis (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "KINESIS_PERMISSION_DENIED",
        "PUBLISH_PERMISSION_DENIED",
        "STREAM_NOT_FOUND",
        "CONSUMER_NOT_FOUND",
        "CONFLICTING_REGION_CONSTRAINTS",
      ]).describe(
        "Output only. An output-only field that indicates the state of the Kinesis ingestion source.",
      ).optional(),
      streamArn: z.string().describe(
        "Required. The Kinesis stream ARN to ingest data from.",
      ).optional(),
    }).describe("Ingestion settings for Amazon Kinesis Data Streams.")
      .optional(),
    awsMsk: z.object({
      awsRoleArn: z.string().describe(
        "Required. AWS role ARN to be used for Federated Identity authentication with Amazon MSK. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it.",
      ).optional(),
      clusterArn: z.string().describe(
        "Required. The Amazon Resource Name (ARN) that uniquely identifies the cluster.",
      ).optional(),
      gcpServiceAccount: z.string().describe(
        "Required. The GCP service account to be used for Federated Identity authentication with Amazon MSK (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "MSK_PERMISSION_DENIED",
        "PUBLISH_PERMISSION_DENIED",
        "CLUSTER_NOT_FOUND",
        "TOPIC_NOT_FOUND",
        "CONFLICTING_REGION_CONSTRAINTS",
      ]).describe(
        "Output only. An output-only field that indicates the state of the Amazon MSK ingestion source.",
      ).optional(),
      topic: z.string().describe(
        "Required. The name of the topic in the Amazon MSK cluster that Pub/Sub will import from.",
      ).optional(),
    }).describe("Ingestion settings for Amazon MSK.").optional(),
    azureEventHubs: z.object({
      clientId: z.string().describe(
        "Optional. The client id of the Azure application that is being used to authenticate Pub/Sub.",
      ).optional(),
      eventHub: z.string().describe("Optional. The name of the Event Hub.")
        .optional(),
      gcpServiceAccount: z.string().describe(
        "Optional. The GCP service account to be used for Federated Identity authentication.",
      ).optional(),
      namespace: z.string().describe(
        "Optional. The name of the Event Hubs namespace.",
      ).optional(),
      resourceGroup: z.string().describe(
        "Optional. Name of the resource group within the azure subscription.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "EVENT_HUBS_PERMISSION_DENIED",
        "PUBLISH_PERMISSION_DENIED",
        "NAMESPACE_NOT_FOUND",
        "EVENT_HUB_NOT_FOUND",
        "SUBSCRIPTION_NOT_FOUND",
        "RESOURCE_GROUP_NOT_FOUND",
        "CONFLICTING_REGION_CONSTRAINTS",
      ]).describe(
        "Output only. An output-only field that indicates the state of the Event Hubs ingestion source.",
      ).optional(),
      subscriptionId: z.string().describe(
        "Optional. The Azure subscription id.",
      ).optional(),
      tenantId: z.string().describe(
        "Optional. The tenant id of the Azure application that is being used to authenticate Pub/Sub.",
      ).optional(),
    }).describe("Ingestion settings for Azure Event Hubs.").optional(),
    cloudStorage: z.object({
      avroFormat: z.object({}).describe(
        "Configuration for reading Cloud Storage data in Avro binary format. The bytes of each object will be set to the `data` field of a Pub/Sub message.",
      ).optional(),
      bucket: z.string().describe(
        'Optional. Cloud Storage bucket. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming).',
      ).optional(),
      matchGlob: z.string().describe(
        "Optional. Glob pattern used to match objects that will be ingested. If unset, all objects will be ingested. See the [supported patterns](https://cloud.google.com/storage/docs/json_api/v1/objects/list#list-objects-and-prefixes-using-glob).",
      ).optional(),
      minimumObjectCreateTime: z.string().describe(
        "Optional. Only objects with a larger or equal creation timestamp will be ingested.",
      ).optional(),
      pubsubAvroFormat: z.object({}).describe(
        "Configuration for reading Cloud Storage data written via [Cloud Storage subscriptions](https://cloud.google.com/pubsub/docs/cloudstorage). The data and attributes fields of the originally exported Pub/Sub message will be restored when publishing.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "CLOUD_STORAGE_PERMISSION_DENIED",
        "PUBLISH_PERMISSION_DENIED",
        "BUCKET_NOT_FOUND",
        "TOO_MANY_OBJECTS",
        "CONFLICTING_REGION_CONSTRAINTS",
      ]).describe(
        "Output only. An output-only field that indicates the state of the Cloud Storage ingestion source.",
      ).optional(),
      textFormat: z.object({
        delimiter: z.string().describe("Optional. When unset, '\\n' is used.")
          .optional(),
      }).describe(
        "Configuration for reading Cloud Storage data in text format. Each line of text as specified by the delimiter will be set to the `data` field of a Pub/Sub message.",
      ).optional(),
    }).describe("Ingestion settings for Cloud Storage.").optional(),
    confluentCloud: z.object({
      bootstrapServer: z.string().describe(
        "Required. The address of the bootstrap server. The format is url:port.",
      ).optional(),
      clusterId: z.string().describe("Required. The id of the cluster.")
        .optional(),
      gcpServiceAccount: z.string().describe(
        "Required. The GCP service account to be used for Federated Identity authentication with `identity_pool_id`.",
      ).optional(),
      identityPoolId: z.string().describe(
        "Required. The id of the identity pool to be used for Federated Identity authentication with Confluent Cloud. See https://docs.confluent.io/cloud/current/security/authenticate/workload-identities/identity-providers/oauth/identity-pools.html#add-oauth-identity-pools.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "CONFLUENT_CLOUD_PERMISSION_DENIED",
        "PUBLISH_PERMISSION_DENIED",
        "UNREACHABLE_BOOTSTRAP_SERVER",
        "CLUSTER_NOT_FOUND",
        "TOPIC_NOT_FOUND",
        "CONFLICTING_REGION_CONSTRAINTS",
      ]).describe(
        "Output only. An output-only field that indicates the state of the Confluent Cloud ingestion source.",
      ).optional(),
      topic: z.string().describe(
        "Required. The name of the topic in the Confluent Cloud cluster that Pub/Sub will import from.",
      ).optional(),
    }).describe("Ingestion settings for Confluent Cloud.").optional(),
    platformLogsSettings: z.object({
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "DISABLED",
        "DEBUG",
        "INFO",
        "WARNING",
        "ERROR",
      ]).describe(
        "Optional. The minimum severity level of Platform Logs that will be written.",
      ).optional(),
    }).describe("Settings for Platform Logs produced by Pub/Sub.").optional(),
  }).describe("Settings for an ingestion data source on a topic.").optional(),
  kmsKeyName: z.string().describe(
    "Optional. The resource name of the Cloud KMS CryptoKey to be used to protect access to messages published on this topic. The expected format is `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. See [Creating and managing labels] (https://cloud.google.com/pubsub/docs/labels).",
  ).optional(),
  messageRetentionDuration: z.string().describe(
    "Optional. Indicates the minimum duration to retain a message after it is published to the topic. If this field is set, messages published to the topic in the last `message_retention_duration` are always available to subscribers. For instance, it allows any attached subscription to [seek to a timestamp](https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) that is up to `message_retention_duration` in the past. If this field is not set, message retention is controlled by settings on individual subscriptions. Cannot be more than 31 days or less than 10 minutes.",
  ).optional(),
  messageStoragePolicy: z.object({
    allowedPersistenceRegions: z.array(z.string()).describe(
      "Optional. A list of IDs of Google Cloud regions where messages that are published to the topic may be persisted in storage. Messages published by publishers running in non-allowed Google Cloud regions (or running outside of Google Cloud altogether) are routed for storage in one of the allowed regions. An empty list means that no regions are allowed, and is not a valid configuration.",
    ).optional(),
    enforceInTransit: z.boolean().describe(
      "Optional. If true, `allowed_persistence_regions` is also used to enforce in-transit guarantees for messages. That is, Pub/Sub will fail Publish operations on this topic and subscribe operations on any subscription attached to this topic in any region that is not in `allowed_persistence_regions`.",
    ).optional(),
  }).describe(
    "A policy constraining the storage of messages published to the topic.",
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
    "Optional. Transforms to be applied to messages published to the topic. Transforms are applied in the order specified.",
  ).optional(),
  name: z.string().describe(
    'Required. Identifier. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`.',
  ).optional(),
  satisfiesPzs: z.boolean().describe(
    "Optional. Reserved for future use. This field is set only in responses from the server; it is ignored if it is set in any requests.",
  ).optional(),
  schemaSettings: z.object({
    encoding: z.enum(["ENCODING_UNSPECIFIED", "JSON", "BINARY"]).describe(
      "Optional. The encoding of messages validated against `schema`.",
    ).optional(),
    firstRevisionId: z.string().describe(
      "Optional. The minimum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against last_revision or any revision created before.",
    ).optional(),
    lastRevisionId: z.string().describe(
      "Optional. The maximum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against first_revision or any revision created after.",
    ).optional(),
    schema: z.string().describe(
      "Required. The name of the schema that messages published should be validated against. Format is `projects/{project}/schemas/{schema}`. The value of this field will be `_deleted-schema_` if the schema has been deleted.",
    ).optional(),
  }).describe("Settings for validating messages published against a schema.")
    .optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  topic: z.object({
    ingestionDataSourceSettings: z.object({
      awsKinesis: z.object({
        awsRoleArn: z.string().describe(
          "Required. AWS role ARN to be used for Federated Identity authentication with Kinesis. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it.",
        ).optional(),
        consumerArn: z.string().describe(
          "Required. The Kinesis consumer ARN to used for ingestion in Enhanced Fan-Out mode. The consumer must be already created and ready to be used.",
        ).optional(),
        gcpServiceAccount: z.string().describe(
          "Required. The GCP service account to be used for Federated Identity authentication with Kinesis (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "ACTIVE",
          "KINESIS_PERMISSION_DENIED",
          "PUBLISH_PERMISSION_DENIED",
          "STREAM_NOT_FOUND",
          "CONSUMER_NOT_FOUND",
          "CONFLICTING_REGION_CONSTRAINTS",
        ]).describe(
          "Output only. An output-only field that indicates the state of the Kinesis ingestion source.",
        ).optional(),
        streamArn: z.string().describe(
          "Required. The Kinesis stream ARN to ingest data from.",
        ).optional(),
      }).describe("Ingestion settings for Amazon Kinesis Data Streams.")
        .optional(),
      awsMsk: z.object({
        awsRoleArn: z.string().describe(
          "Required. AWS role ARN to be used for Federated Identity authentication with Amazon MSK. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it.",
        ).optional(),
        clusterArn: z.string().describe(
          "Required. The Amazon Resource Name (ARN) that uniquely identifies the cluster.",
        ).optional(),
        gcpServiceAccount: z.string().describe(
          "Required. The GCP service account to be used for Federated Identity authentication with Amazon MSK (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "ACTIVE",
          "MSK_PERMISSION_DENIED",
          "PUBLISH_PERMISSION_DENIED",
          "CLUSTER_NOT_FOUND",
          "TOPIC_NOT_FOUND",
          "CONFLICTING_REGION_CONSTRAINTS",
        ]).describe(
          "Output only. An output-only field that indicates the state of the Amazon MSK ingestion source.",
        ).optional(),
        topic: z.string().describe(
          "Required. The name of the topic in the Amazon MSK cluster that Pub/Sub will import from.",
        ).optional(),
      }).describe("Ingestion settings for Amazon MSK.").optional(),
      azureEventHubs: z.object({
        clientId: z.string().describe(
          "Optional. The client id of the Azure application that is being used to authenticate Pub/Sub.",
        ).optional(),
        eventHub: z.string().describe("Optional. The name of the Event Hub.")
          .optional(),
        gcpServiceAccount: z.string().describe(
          "Optional. The GCP service account to be used for Federated Identity authentication.",
        ).optional(),
        namespace: z.string().describe(
          "Optional. The name of the Event Hubs namespace.",
        ).optional(),
        resourceGroup: z.string().describe(
          "Optional. Name of the resource group within the azure subscription.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "ACTIVE",
          "EVENT_HUBS_PERMISSION_DENIED",
          "PUBLISH_PERMISSION_DENIED",
          "NAMESPACE_NOT_FOUND",
          "EVENT_HUB_NOT_FOUND",
          "SUBSCRIPTION_NOT_FOUND",
          "RESOURCE_GROUP_NOT_FOUND",
          "CONFLICTING_REGION_CONSTRAINTS",
        ]).describe(
          "Output only. An output-only field that indicates the state of the Event Hubs ingestion source.",
        ).optional(),
        subscriptionId: z.string().describe(
          "Optional. The Azure subscription id.",
        ).optional(),
        tenantId: z.string().describe(
          "Optional. The tenant id of the Azure application that is being used to authenticate Pub/Sub.",
        ).optional(),
      }).describe("Ingestion settings for Azure Event Hubs.").optional(),
      cloudStorage: z.object({
        avroFormat: z.object({}).describe(
          "Configuration for reading Cloud Storage data in Avro binary format. The bytes of each object will be set to the `data` field of a Pub/Sub message.",
        ).optional(),
        bucket: z.string().describe(
          'Optional. Cloud Storage bucket. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming).',
        ).optional(),
        matchGlob: z.string().describe(
          "Optional. Glob pattern used to match objects that will be ingested. If unset, all objects will be ingested. See the [supported patterns](https://cloud.google.com/storage/docs/json_api/v1/objects/list#list-objects-and-prefixes-using-glob).",
        ).optional(),
        minimumObjectCreateTime: z.string().describe(
          "Optional. Only objects with a larger or equal creation timestamp will be ingested.",
        ).optional(),
        pubsubAvroFormat: z.object({}).describe(
          "Configuration for reading Cloud Storage data written via [Cloud Storage subscriptions](https://cloud.google.com/pubsub/docs/cloudstorage). The data and attributes fields of the originally exported Pub/Sub message will be restored when publishing.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "ACTIVE",
          "CLOUD_STORAGE_PERMISSION_DENIED",
          "PUBLISH_PERMISSION_DENIED",
          "BUCKET_NOT_FOUND",
          "TOO_MANY_OBJECTS",
          "CONFLICTING_REGION_CONSTRAINTS",
        ]).describe(
          "Output only. An output-only field that indicates the state of the Cloud Storage ingestion source.",
        ).optional(),
        textFormat: z.object({
          delimiter: z.string().describe("Optional. When unset, '\\n' is used.")
            .optional(),
        }).describe(
          "Configuration for reading Cloud Storage data in text format. Each line of text as specified by the delimiter will be set to the `data` field of a Pub/Sub message.",
        ).optional(),
      }).describe("Ingestion settings for Cloud Storage.").optional(),
      confluentCloud: z.object({
        bootstrapServer: z.string().describe(
          "Required. The address of the bootstrap server. The format is url:port.",
        ).optional(),
        clusterId: z.string().describe("Required. The id of the cluster.")
          .optional(),
        gcpServiceAccount: z.string().describe(
          "Required. The GCP service account to be used for Federated Identity authentication with `identity_pool_id`.",
        ).optional(),
        identityPoolId: z.string().describe(
          "Required. The id of the identity pool to be used for Federated Identity authentication with Confluent Cloud. See https://docs.confluent.io/cloud/current/security/authenticate/workload-identities/identity-providers/oauth/identity-pools.html#add-oauth-identity-pools.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "ACTIVE",
          "CONFLUENT_CLOUD_PERMISSION_DENIED",
          "PUBLISH_PERMISSION_DENIED",
          "UNREACHABLE_BOOTSTRAP_SERVER",
          "CLUSTER_NOT_FOUND",
          "TOPIC_NOT_FOUND",
          "CONFLICTING_REGION_CONSTRAINTS",
        ]).describe(
          "Output only. An output-only field that indicates the state of the Confluent Cloud ingestion source.",
        ).optional(),
        topic: z.string().describe(
          "Required. The name of the topic in the Confluent Cloud cluster that Pub/Sub will import from.",
        ).optional(),
      }).describe("Ingestion settings for Confluent Cloud.").optional(),
      platformLogsSettings: z.object({
        severity: z.enum([
          "SEVERITY_UNSPECIFIED",
          "DISABLED",
          "DEBUG",
          "INFO",
          "WARNING",
          "ERROR",
        ]).describe(
          "Optional. The minimum severity level of Platform Logs that will be written.",
        ).optional(),
      }).describe("Settings for Platform Logs produced by Pub/Sub.").optional(),
    }).describe("Settings for an ingestion data source on a topic.").optional(),
    kmsKeyName: z.string().describe(
      "Optional. The resource name of the Cloud KMS CryptoKey to be used to protect access to messages published on this topic. The expected format is `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. See [Creating and managing labels] (https://cloud.google.com/pubsub/docs/labels).",
    ).optional(),
    messageRetentionDuration: z.string().describe(
      "Optional. Indicates the minimum duration to retain a message after it is published to the topic. If this field is set, messages published to the topic in the last `message_retention_duration` are always available to subscribers. For instance, it allows any attached subscription to [seek to a timestamp](https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) that is up to `message_retention_duration` in the past. If this field is not set, message retention is controlled by settings on individual subscriptions. Cannot be more than 31 days or less than 10 minutes.",
    ).optional(),
    messageStoragePolicy: z.object({
      allowedPersistenceRegions: z.array(z.string()).describe(
        "Optional. A list of IDs of Google Cloud regions where messages that are published to the topic may be persisted in storage. Messages published by publishers running in non-allowed Google Cloud regions (or running outside of Google Cloud altogether) are routed for storage in one of the allowed regions. An empty list means that no regions are allowed, and is not a valid configuration.",
      ).optional(),
      enforceInTransit: z.boolean().describe(
        "Optional. If true, `allowed_persistence_regions` is also used to enforce in-transit guarantees for messages. That is, Pub/Sub will fail Publish operations on this topic and subscribe operations on any subscription attached to this topic in any region that is not in `allowed_persistence_regions`.",
      ).optional(),
    }).describe(
      "A policy constraining the storage of messages published to the topic.",
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
      "Optional. Transforms to be applied to messages published to the topic. Transforms are applied in the order specified.",
    ).optional(),
    name: z.string().describe(
      'Required. Identifier. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`.',
    ).optional(),
    satisfiesPzs: z.boolean().describe(
      "Optional. Reserved for future use. This field is set only in responses from the server; it is ignored if it is set in any requests.",
    ).optional(),
    schemaSettings: z.object({
      encoding: z.enum(["ENCODING_UNSPECIFIED", "JSON", "BINARY"]).describe(
        "Optional. The encoding of messages validated against `schema`.",
      ).optional(),
      firstRevisionId: z.string().describe(
        "Optional. The minimum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against last_revision or any revision created before.",
      ).optional(),
      lastRevisionId: z.string().describe(
        "Optional. The maximum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against first_revision or any revision created after.",
      ).optional(),
      schema: z.string().describe(
        "Required. The name of the schema that messages published should be validated against. Format is `projects/{project}/schemas/{schema}`. The value of this field will be `_deleted-schema_` if the schema has been deleted.",
      ).optional(),
    }).describe("Settings for validating messages published against a schema.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "INGESTION_RESOURCE_ERROR"])
      .describe(
        "Output only. An output-only field indicating the state of the topic.",
      ).optional(),
    tags: z.record(z.string(), z.string()).describe(
      'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
    ).optional(),
  }).describe("A topic resource.").optional(),
  updateMask: z.string().describe(
    'Required. Indicates which fields in the provided topic to update. Must be specified and non-empty. Note that if `update_mask` contains "message_storage_policy" but the `message_storage_policy` is not set in the `topic` provided above, then the updated value is determined by the policy configured at the project or organization level.',
  ).optional(),
});

const StateSchema = z.object({
  ingestionDataSourceSettings: z.object({
    awsKinesis: z.object({
      awsRoleArn: z.string(),
      consumerArn: z.string(),
      gcpServiceAccount: z.string(),
      state: z.string(),
      streamArn: z.string(),
    }),
    awsMsk: z.object({
      awsRoleArn: z.string(),
      clusterArn: z.string(),
      gcpServiceAccount: z.string(),
      state: z.string(),
      topic: z.string(),
    }),
    azureEventHubs: z.object({
      clientId: z.string(),
      eventHub: z.string(),
      gcpServiceAccount: z.string(),
      namespace: z.string(),
      resourceGroup: z.string(),
      state: z.string(),
      subscriptionId: z.string(),
      tenantId: z.string(),
    }),
    cloudStorage: z.object({
      avroFormat: z.object({}),
      bucket: z.string(),
      matchGlob: z.string(),
      minimumObjectCreateTime: z.string(),
      pubsubAvroFormat: z.object({}),
      state: z.string(),
      textFormat: z.object({
        delimiter: z.string(),
      }),
    }),
    confluentCloud: z.object({
      bootstrapServer: z.string(),
      clusterId: z.string(),
      gcpServiceAccount: z.string(),
      identityPoolId: z.string(),
      state: z.string(),
      topic: z.string(),
    }),
    platformLogsSettings: z.object({
      severity: z.string(),
    }),
  }).optional(),
  kmsKeyName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  messageRetentionDuration: z.string().optional(),
  messageStoragePolicy: z.object({
    allowedPersistenceRegions: z.array(z.string()),
    enforceInTransit: z.boolean(),
  }).optional(),
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
  satisfiesPzs: z.boolean().optional(),
  schemaSettings: z.object({
    encoding: z.string(),
    firstRevisionId: z.string(),
    lastRevisionId: z.string(),
    schema: z.string(),
  }).optional(),
  state: z.string().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ingestionDataSourceSettings: z.object({
    awsKinesis: z.object({
      awsRoleArn: z.string().describe(
        "Required. AWS role ARN to be used for Federated Identity authentication with Kinesis. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it.",
      ).optional(),
      consumerArn: z.string().describe(
        "Required. The Kinesis consumer ARN to used for ingestion in Enhanced Fan-Out mode. The consumer must be already created and ready to be used.",
      ).optional(),
      gcpServiceAccount: z.string().describe(
        "Required. The GCP service account to be used for Federated Identity authentication with Kinesis (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "KINESIS_PERMISSION_DENIED",
        "PUBLISH_PERMISSION_DENIED",
        "STREAM_NOT_FOUND",
        "CONSUMER_NOT_FOUND",
        "CONFLICTING_REGION_CONSTRAINTS",
      ]).describe(
        "Output only. An output-only field that indicates the state of the Kinesis ingestion source.",
      ).optional(),
      streamArn: z.string().describe(
        "Required. The Kinesis stream ARN to ingest data from.",
      ).optional(),
    }).describe("Ingestion settings for Amazon Kinesis Data Streams.")
      .optional(),
    awsMsk: z.object({
      awsRoleArn: z.string().describe(
        "Required. AWS role ARN to be used for Federated Identity authentication with Amazon MSK. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it.",
      ).optional(),
      clusterArn: z.string().describe(
        "Required. The Amazon Resource Name (ARN) that uniquely identifies the cluster.",
      ).optional(),
      gcpServiceAccount: z.string().describe(
        "Required. The GCP service account to be used for Federated Identity authentication with Amazon MSK (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "MSK_PERMISSION_DENIED",
        "PUBLISH_PERMISSION_DENIED",
        "CLUSTER_NOT_FOUND",
        "TOPIC_NOT_FOUND",
        "CONFLICTING_REGION_CONSTRAINTS",
      ]).describe(
        "Output only. An output-only field that indicates the state of the Amazon MSK ingestion source.",
      ).optional(),
      topic: z.string().describe(
        "Required. The name of the topic in the Amazon MSK cluster that Pub/Sub will import from.",
      ).optional(),
    }).describe("Ingestion settings for Amazon MSK.").optional(),
    azureEventHubs: z.object({
      clientId: z.string().describe(
        "Optional. The client id of the Azure application that is being used to authenticate Pub/Sub.",
      ).optional(),
      eventHub: z.string().describe("Optional. The name of the Event Hub.")
        .optional(),
      gcpServiceAccount: z.string().describe(
        "Optional. The GCP service account to be used for Federated Identity authentication.",
      ).optional(),
      namespace: z.string().describe(
        "Optional. The name of the Event Hubs namespace.",
      ).optional(),
      resourceGroup: z.string().describe(
        "Optional. Name of the resource group within the azure subscription.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "EVENT_HUBS_PERMISSION_DENIED",
        "PUBLISH_PERMISSION_DENIED",
        "NAMESPACE_NOT_FOUND",
        "EVENT_HUB_NOT_FOUND",
        "SUBSCRIPTION_NOT_FOUND",
        "RESOURCE_GROUP_NOT_FOUND",
        "CONFLICTING_REGION_CONSTRAINTS",
      ]).describe(
        "Output only. An output-only field that indicates the state of the Event Hubs ingestion source.",
      ).optional(),
      subscriptionId: z.string().describe(
        "Optional. The Azure subscription id.",
      ).optional(),
      tenantId: z.string().describe(
        "Optional. The tenant id of the Azure application that is being used to authenticate Pub/Sub.",
      ).optional(),
    }).describe("Ingestion settings for Azure Event Hubs.").optional(),
    cloudStorage: z.object({
      avroFormat: z.object({}).describe(
        "Configuration for reading Cloud Storage data in Avro binary format. The bytes of each object will be set to the `data` field of a Pub/Sub message.",
      ).optional(),
      bucket: z.string().describe(
        'Optional. Cloud Storage bucket. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming).',
      ).optional(),
      matchGlob: z.string().describe(
        "Optional. Glob pattern used to match objects that will be ingested. If unset, all objects will be ingested. See the [supported patterns](https://cloud.google.com/storage/docs/json_api/v1/objects/list#list-objects-and-prefixes-using-glob).",
      ).optional(),
      minimumObjectCreateTime: z.string().describe(
        "Optional. Only objects with a larger or equal creation timestamp will be ingested.",
      ).optional(),
      pubsubAvroFormat: z.object({}).describe(
        "Configuration for reading Cloud Storage data written via [Cloud Storage subscriptions](https://cloud.google.com/pubsub/docs/cloudstorage). The data and attributes fields of the originally exported Pub/Sub message will be restored when publishing.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "CLOUD_STORAGE_PERMISSION_DENIED",
        "PUBLISH_PERMISSION_DENIED",
        "BUCKET_NOT_FOUND",
        "TOO_MANY_OBJECTS",
        "CONFLICTING_REGION_CONSTRAINTS",
      ]).describe(
        "Output only. An output-only field that indicates the state of the Cloud Storage ingestion source.",
      ).optional(),
      textFormat: z.object({
        delimiter: z.string().describe("Optional. When unset, '\\n' is used.")
          .optional(),
      }).describe(
        "Configuration for reading Cloud Storage data in text format. Each line of text as specified by the delimiter will be set to the `data` field of a Pub/Sub message.",
      ).optional(),
    }).describe("Ingestion settings for Cloud Storage.").optional(),
    confluentCloud: z.object({
      bootstrapServer: z.string().describe(
        "Required. The address of the bootstrap server. The format is url:port.",
      ).optional(),
      clusterId: z.string().describe("Required. The id of the cluster.")
        .optional(),
      gcpServiceAccount: z.string().describe(
        "Required. The GCP service account to be used for Federated Identity authentication with `identity_pool_id`.",
      ).optional(),
      identityPoolId: z.string().describe(
        "Required. The id of the identity pool to be used for Federated Identity authentication with Confluent Cloud. See https://docs.confluent.io/cloud/current/security/authenticate/workload-identities/identity-providers/oauth/identity-pools.html#add-oauth-identity-pools.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "ACTIVE",
        "CONFLUENT_CLOUD_PERMISSION_DENIED",
        "PUBLISH_PERMISSION_DENIED",
        "UNREACHABLE_BOOTSTRAP_SERVER",
        "CLUSTER_NOT_FOUND",
        "TOPIC_NOT_FOUND",
        "CONFLICTING_REGION_CONSTRAINTS",
      ]).describe(
        "Output only. An output-only field that indicates the state of the Confluent Cloud ingestion source.",
      ).optional(),
      topic: z.string().describe(
        "Required. The name of the topic in the Confluent Cloud cluster that Pub/Sub will import from.",
      ).optional(),
    }).describe("Ingestion settings for Confluent Cloud.").optional(),
    platformLogsSettings: z.object({
      severity: z.enum([
        "SEVERITY_UNSPECIFIED",
        "DISABLED",
        "DEBUG",
        "INFO",
        "WARNING",
        "ERROR",
      ]).describe(
        "Optional. The minimum severity level of Platform Logs that will be written.",
      ).optional(),
    }).describe("Settings for Platform Logs produced by Pub/Sub.").optional(),
  }).describe("Settings for an ingestion data source on a topic.").optional(),
  kmsKeyName: z.string().describe(
    "Optional. The resource name of the Cloud KMS CryptoKey to be used to protect access to messages published on this topic. The expected format is `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. See [Creating and managing labels] (https://cloud.google.com/pubsub/docs/labels).",
  ).optional(),
  messageRetentionDuration: z.string().describe(
    "Optional. Indicates the minimum duration to retain a message after it is published to the topic. If this field is set, messages published to the topic in the last `message_retention_duration` are always available to subscribers. For instance, it allows any attached subscription to [seek to a timestamp](https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) that is up to `message_retention_duration` in the past. If this field is not set, message retention is controlled by settings on individual subscriptions. Cannot be more than 31 days or less than 10 minutes.",
  ).optional(),
  messageStoragePolicy: z.object({
    allowedPersistenceRegions: z.array(z.string()).describe(
      "Optional. A list of IDs of Google Cloud regions where messages that are published to the topic may be persisted in storage. Messages published by publishers running in non-allowed Google Cloud regions (or running outside of Google Cloud altogether) are routed for storage in one of the allowed regions. An empty list means that no regions are allowed, and is not a valid configuration.",
    ).optional(),
    enforceInTransit: z.boolean().describe(
      "Optional. If true, `allowed_persistence_regions` is also used to enforce in-transit guarantees for messages. That is, Pub/Sub will fail Publish operations on this topic and subscribe operations on any subscription attached to this topic in any region that is not in `allowed_persistence_regions`.",
    ).optional(),
  }).describe(
    "A policy constraining the storage of messages published to the topic.",
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
    "Optional. Transforms to be applied to messages published to the topic. Transforms are applied in the order specified.",
  ).optional(),
  name: z.string().describe(
    'Required. Identifier. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`.',
  ).optional(),
  satisfiesPzs: z.boolean().describe(
    "Optional. Reserved for future use. This field is set only in responses from the server; it is ignored if it is set in any requests.",
  ).optional(),
  schemaSettings: z.object({
    encoding: z.enum(["ENCODING_UNSPECIFIED", "JSON", "BINARY"]).describe(
      "Optional. The encoding of messages validated against `schema`.",
    ).optional(),
    firstRevisionId: z.string().describe(
      "Optional. The minimum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against last_revision or any revision created before.",
    ).optional(),
    lastRevisionId: z.string().describe(
      "Optional. The maximum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against first_revision or any revision created after.",
    ).optional(),
    schema: z.string().describe(
      "Required. The name of the schema that messages published should be validated against. Format is `projects/{project}/schemas/{schema}`. The value of this field will be `_deleted-schema_` if the schema has been deleted.",
    ).optional(),
  }).describe("Settings for validating messages published against a schema.")
    .optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  topic: z.object({
    ingestionDataSourceSettings: z.object({
      awsKinesis: z.object({
        awsRoleArn: z.string().describe(
          "Required. AWS role ARN to be used for Federated Identity authentication with Kinesis. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it.",
        ).optional(),
        consumerArn: z.string().describe(
          "Required. The Kinesis consumer ARN to used for ingestion in Enhanced Fan-Out mode. The consumer must be already created and ready to be used.",
        ).optional(),
        gcpServiceAccount: z.string().describe(
          "Required. The GCP service account to be used for Federated Identity authentication with Kinesis (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "ACTIVE",
          "KINESIS_PERMISSION_DENIED",
          "PUBLISH_PERMISSION_DENIED",
          "STREAM_NOT_FOUND",
          "CONSUMER_NOT_FOUND",
          "CONFLICTING_REGION_CONSTRAINTS",
        ]).describe(
          "Output only. An output-only field that indicates the state of the Kinesis ingestion source.",
        ).optional(),
        streamArn: z.string().describe(
          "Required. The Kinesis stream ARN to ingest data from.",
        ).optional(),
      }).describe("Ingestion settings for Amazon Kinesis Data Streams.")
        .optional(),
      awsMsk: z.object({
        awsRoleArn: z.string().describe(
          "Required. AWS role ARN to be used for Federated Identity authentication with Amazon MSK. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it.",
        ).optional(),
        clusterArn: z.string().describe(
          "Required. The Amazon Resource Name (ARN) that uniquely identifies the cluster.",
        ).optional(),
        gcpServiceAccount: z.string().describe(
          "Required. The GCP service account to be used for Federated Identity authentication with Amazon MSK (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "ACTIVE",
          "MSK_PERMISSION_DENIED",
          "PUBLISH_PERMISSION_DENIED",
          "CLUSTER_NOT_FOUND",
          "TOPIC_NOT_FOUND",
          "CONFLICTING_REGION_CONSTRAINTS",
        ]).describe(
          "Output only. An output-only field that indicates the state of the Amazon MSK ingestion source.",
        ).optional(),
        topic: z.string().describe(
          "Required. The name of the topic in the Amazon MSK cluster that Pub/Sub will import from.",
        ).optional(),
      }).describe("Ingestion settings for Amazon MSK.").optional(),
      azureEventHubs: z.object({
        clientId: z.string().describe(
          "Optional. The client id of the Azure application that is being used to authenticate Pub/Sub.",
        ).optional(),
        eventHub: z.string().describe("Optional. The name of the Event Hub.")
          .optional(),
        gcpServiceAccount: z.string().describe(
          "Optional. The GCP service account to be used for Federated Identity authentication.",
        ).optional(),
        namespace: z.string().describe(
          "Optional. The name of the Event Hubs namespace.",
        ).optional(),
        resourceGroup: z.string().describe(
          "Optional. Name of the resource group within the azure subscription.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "ACTIVE",
          "EVENT_HUBS_PERMISSION_DENIED",
          "PUBLISH_PERMISSION_DENIED",
          "NAMESPACE_NOT_FOUND",
          "EVENT_HUB_NOT_FOUND",
          "SUBSCRIPTION_NOT_FOUND",
          "RESOURCE_GROUP_NOT_FOUND",
          "CONFLICTING_REGION_CONSTRAINTS",
        ]).describe(
          "Output only. An output-only field that indicates the state of the Event Hubs ingestion source.",
        ).optional(),
        subscriptionId: z.string().describe(
          "Optional. The Azure subscription id.",
        ).optional(),
        tenantId: z.string().describe(
          "Optional. The tenant id of the Azure application that is being used to authenticate Pub/Sub.",
        ).optional(),
      }).describe("Ingestion settings for Azure Event Hubs.").optional(),
      cloudStorage: z.object({
        avroFormat: z.object({}).describe(
          "Configuration for reading Cloud Storage data in Avro binary format. The bytes of each object will be set to the `data` field of a Pub/Sub message.",
        ).optional(),
        bucket: z.string().describe(
          'Optional. Cloud Storage bucket. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming).',
        ).optional(),
        matchGlob: z.string().describe(
          "Optional. Glob pattern used to match objects that will be ingested. If unset, all objects will be ingested. See the [supported patterns](https://cloud.google.com/storage/docs/json_api/v1/objects/list#list-objects-and-prefixes-using-glob).",
        ).optional(),
        minimumObjectCreateTime: z.string().describe(
          "Optional. Only objects with a larger or equal creation timestamp will be ingested.",
        ).optional(),
        pubsubAvroFormat: z.object({}).describe(
          "Configuration for reading Cloud Storage data written via [Cloud Storage subscriptions](https://cloud.google.com/pubsub/docs/cloudstorage). The data and attributes fields of the originally exported Pub/Sub message will be restored when publishing.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "ACTIVE",
          "CLOUD_STORAGE_PERMISSION_DENIED",
          "PUBLISH_PERMISSION_DENIED",
          "BUCKET_NOT_FOUND",
          "TOO_MANY_OBJECTS",
          "CONFLICTING_REGION_CONSTRAINTS",
        ]).describe(
          "Output only. An output-only field that indicates the state of the Cloud Storage ingestion source.",
        ).optional(),
        textFormat: z.object({
          delimiter: z.string().describe("Optional. When unset, '\\n' is used.")
            .optional(),
        }).describe(
          "Configuration for reading Cloud Storage data in text format. Each line of text as specified by the delimiter will be set to the `data` field of a Pub/Sub message.",
        ).optional(),
      }).describe("Ingestion settings for Cloud Storage.").optional(),
      confluentCloud: z.object({
        bootstrapServer: z.string().describe(
          "Required. The address of the bootstrap server. The format is url:port.",
        ).optional(),
        clusterId: z.string().describe("Required. The id of the cluster.")
          .optional(),
        gcpServiceAccount: z.string().describe(
          "Required. The GCP service account to be used for Federated Identity authentication with `identity_pool_id`.",
        ).optional(),
        identityPoolId: z.string().describe(
          "Required. The id of the identity pool to be used for Federated Identity authentication with Confluent Cloud. See https://docs.confluent.io/cloud/current/security/authenticate/workload-identities/identity-providers/oauth/identity-pools.html#add-oauth-identity-pools.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "ACTIVE",
          "CONFLUENT_CLOUD_PERMISSION_DENIED",
          "PUBLISH_PERMISSION_DENIED",
          "UNREACHABLE_BOOTSTRAP_SERVER",
          "CLUSTER_NOT_FOUND",
          "TOPIC_NOT_FOUND",
          "CONFLICTING_REGION_CONSTRAINTS",
        ]).describe(
          "Output only. An output-only field that indicates the state of the Confluent Cloud ingestion source.",
        ).optional(),
        topic: z.string().describe(
          "Required. The name of the topic in the Confluent Cloud cluster that Pub/Sub will import from.",
        ).optional(),
      }).describe("Ingestion settings for Confluent Cloud.").optional(),
      platformLogsSettings: z.object({
        severity: z.enum([
          "SEVERITY_UNSPECIFIED",
          "DISABLED",
          "DEBUG",
          "INFO",
          "WARNING",
          "ERROR",
        ]).describe(
          "Optional. The minimum severity level of Platform Logs that will be written.",
        ).optional(),
      }).describe("Settings for Platform Logs produced by Pub/Sub.").optional(),
    }).describe("Settings for an ingestion data source on a topic.").optional(),
    kmsKeyName: z.string().describe(
      "Optional. The resource name of the Cloud KMS CryptoKey to be used to protect access to messages published on this topic. The expected format is `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. See [Creating and managing labels] (https://cloud.google.com/pubsub/docs/labels).",
    ).optional(),
    messageRetentionDuration: z.string().describe(
      "Optional. Indicates the minimum duration to retain a message after it is published to the topic. If this field is set, messages published to the topic in the last `message_retention_duration` are always available to subscribers. For instance, it allows any attached subscription to [seek to a timestamp](https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) that is up to `message_retention_duration` in the past. If this field is not set, message retention is controlled by settings on individual subscriptions. Cannot be more than 31 days or less than 10 minutes.",
    ).optional(),
    messageStoragePolicy: z.object({
      allowedPersistenceRegions: z.array(z.string()).describe(
        "Optional. A list of IDs of Google Cloud regions where messages that are published to the topic may be persisted in storage. Messages published by publishers running in non-allowed Google Cloud regions (or running outside of Google Cloud altogether) are routed for storage in one of the allowed regions. An empty list means that no regions are allowed, and is not a valid configuration.",
      ).optional(),
      enforceInTransit: z.boolean().describe(
        "Optional. If true, `allowed_persistence_regions` is also used to enforce in-transit guarantees for messages. That is, Pub/Sub will fail Publish operations on this topic and subscribe operations on any subscription attached to this topic in any region that is not in `allowed_persistence_regions`.",
      ).optional(),
    }).describe(
      "A policy constraining the storage of messages published to the topic.",
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
      "Optional. Transforms to be applied to messages published to the topic. Transforms are applied in the order specified.",
    ).optional(),
    name: z.string().describe(
      'Required. Identifier. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`.',
    ).optional(),
    satisfiesPzs: z.boolean().describe(
      "Optional. Reserved for future use. This field is set only in responses from the server; it is ignored if it is set in any requests.",
    ).optional(),
    schemaSettings: z.object({
      encoding: z.enum(["ENCODING_UNSPECIFIED", "JSON", "BINARY"]).describe(
        "Optional. The encoding of messages validated against `schema`.",
      ).optional(),
      firstRevisionId: z.string().describe(
        "Optional. The minimum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against last_revision or any revision created before.",
      ).optional(),
      lastRevisionId: z.string().describe(
        "Optional. The maximum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against first_revision or any revision created after.",
      ).optional(),
      schema: z.string().describe(
        "Required. The name of the schema that messages published should be validated against. Format is `projects/{project}/schemas/{schema}`. The value of this field will be `_deleted-schema_` if the schema has been deleted.",
      ).optional(),
    }).describe("Settings for validating messages published against a schema.")
      .optional(),
    state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "INGESTION_RESOURCE_ERROR"])
      .describe(
        "Output only. An output-only field indicating the state of the topic.",
      ).optional(),
    tags: z.record(z.string(), z.string()).describe(
      'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
    ).optional(),
  }).describe("A topic resource.").optional(),
  updateMask: z.string().describe(
    'Required. Indicates which fields in the provided topic to update. Must be specified and non-empty. Note that if `update_mask` contains "message_storage_policy" but the `message_storage_policy` is not set in the `topic` provided above, then the updated value is determined by the policy configured at the project or organization level.',
  ).optional(),
});

/** Swamp extension model for Google Cloud Pub/Sub Topics. Registered at `@swamp/gcp/pubsub/topics`. */
export const model = {
  type: "@swamp/gcp/pubsub/topics",
  version: "2026.05.25.2",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A topic resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a topics",
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
        if (g["ingestionDataSourceSettings"] !== undefined) {
          body["ingestionDataSourceSettings"] =
            g["ingestionDataSourceSettings"];
        }
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["messageRetentionDuration"] !== undefined) {
          body["messageRetentionDuration"] = g["messageRetentionDuration"];
        }
        if (g["messageStoragePolicy"] !== undefined) {
          body["messageStoragePolicy"] = g["messageStoragePolicy"];
        }
        if (g["messageTransforms"] !== undefined) {
          body["messageTransforms"] = g["messageTransforms"];
        }
        if (g["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = g["satisfiesPzs"];
        }
        if (g["schemaSettings"] !== undefined) {
          body["schemaSettings"] = g["schemaSettings"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["name"] !== undefined) params["topic"] = String(g["name"]);
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
          {
            listConfig: LIST_CONFIG,
            listParams: { "project": projectId },
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
      description: "Get a topics",
      arguments: z.object({
        identifier: z.string().describe("The name of the topics"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["topic"] = args.identifier;
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
      description: "Update topics attributes",
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
        if (g["topic"] !== undefined) body["topic"] = g["topic"];
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
      description: "Delete the topics",
      arguments: z.object({
        identifier: z.string().describe("The name of the topics"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["topic"] = args.identifier;
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
      description: "Sync topics state from GCP",
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
          params["topic"] = identifier;
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
      description: "List topics resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Maximum number of topics to return.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "topics",
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
    get_iam_policy: {
      description: "get iam policy",
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "pubsub.projects.topics.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    publish: {
      description: "publish",
      arguments: z.object({
        messages: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["topic"] !== undefined) params["topic"] = String(g["topic"]);
        const body: Record<string, unknown> = {};
        if (args["messages"] !== undefined) body["messages"] = args["messages"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "pubsub.projects.topics.publish",
            "path": "v1/{+topic}:publish",
            "httpMethod": "POST",
            "parameterOrder": ["topic"],
            "parameters": { "topic": { "location": "path", "required": true } },
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
            "id": "pubsub.projects.topics.setIamPolicy",
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
            "id": "pubsub.projects.topics.testIamPermissions",
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
