// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/eventarc/pipelines
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Eventarc Pipelines.
 *
 * A representation of the Pipeline resource.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/pipelines/${shortName}`;
}

const BASE_URL = "https://eventarc.googleapis.com/";

const GET_CONFIG = {
  "id": "eventarc.projects.locations.pipelines.get",
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
  "id": "eventarc.projects.locations.pipelines.create",
  "path": "v1/{+parent}/pipelines",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "pipelineId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "eventarc.projects.locations.pipelines.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "eventarc.projects.locations.pipelines.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "eventarc.projects.locations.pipelines.list",
  "path": "v1/{+parent}/pipelines",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User-defined annotations. See https://google.aip.dev/128#annotations.",
  ).optional(),
  cryptoKeyName: z.string().describe(
    'Optional. Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt the event data. If not set, an internal Google-owned key will be used to encrypt messages. It must match the pattern "projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}".',
  ).optional(),
  destinations: z.array(z.object({
    authenticationConfig: z.object({
      googleOidc: z.object({
        audience: z.string().describe(
          "Optional. Audience to be used to generate the OIDC Token. The audience claim identifies the recipient that the JWT is intended for. If unspecified, the destination URI will be used.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. Service account email used to generate the OIDC Token. The principal who calls this API must have iam.serviceAccounts.actAs permission in the service account. See https://cloud.google.com/iam/docs/understanding-service-accounts for more information. Eventarc service agents must have roles/roles/iam.serviceAccountTokenCreator role to allow the Pipeline to create OpenID tokens for authenticated requests.",
        ).optional(),
      }).describe(
        "Represents a config used to authenticate with a Google OIDC token using a Google Cloud service account. Use this authentication method to invoke your Cloud Run and Cloud Functions destinations or HTTP endpoints that support Google OIDC.",
      ).optional(),
      oauthToken: z.object({
        scope: z.string().describe(
          'Optional. OAuth scope to be used for generating OAuth access token. If not specified, "https://www.googleapis.com/auth/cloud-platform" will be used.',
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. Service account email used to generate the [OAuth token](https://developers.google.com/identity/protocols/OAuth2). The principal who calls this API must have iam.serviceAccounts.actAs permission in the service account. See https://cloud.google.com/iam/docs/understanding-service-accounts for more information. Eventarc service agents must have roles/roles/iam.serviceAccountTokenCreator role to allow Pipeline to create OAuth2 tokens for authenticated requests.",
        ).optional(),
      }).describe(
        "Contains information needed for generating an [OAuth token](https://developers.google.com/identity/protocols/OAuth2). This type of authorization should generally only be used when calling Google APIs hosted on *.googleapis.com.",
      ).optional(),
    }).describe("Represents a config used to authenticate message requests.")
      .optional(),
    httpEndpoint: z.object({
      messageBindingTemplate: z.string().describe(
        'Optional. The CEL expression used to modify how the destination-bound HTTP request is constructed. If a binding expression is not specified here, the message is treated as a CloudEvent and is mapped to the HTTP request according to the CloudEvent HTTP Protocol Binding Binary Content Mode (https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/http-protocol-binding.md#31-binary-content-mode). In this representation, all fields except the `data` and `datacontenttype` field on the message are mapped to HTTP request headers with a prefix of `ce-`. To construct the HTTP request payload and the value of the content-type HTTP header, the payload format is defined as follows: 1) Use the output_payload_format_type on the Pipeline.Destination if it is set, else: 2) Use the input_payload_format_type on the Pipeline if it is set, else: 3) Treat the payload as opaque binary data. The `data` field of the message is converted to the payload format or left as-is for case 3) and then attached as the payload of the HTTP request. The `content-type` header on the HTTP request is set to the payload format type or left empty for case 3). However, if a mediation has updated the `datacontenttype` field on the message so that it is not the same as the payload format type but it is still a prefix of the payload format type, then the `content-type` header on the HTTP request is set to this `datacontenttype` value. For example, if the `datacontenttype` is "application/json" and the payload format type is "application/json; charset=utf-8", then the `content-type` header on the HTTP request is set to "application/json; charset=utf-8". If a non-empty binding expression is specified then this expression is used to modify the default CloudEvent HTTP Protocol Binding Binary Content representation. The result of the CEL expression must be a map of key/value pairs which is used as follows: - If a map named `headers` exists on the result of the expression, then its key/value pairs are directly mapped to the HTTP request headers. The headers values are constructed from the corresponding value type\'s canonical representation. If the `headers` field doesn\'t exist then the resulting HTTP request will be the headers of the CloudEvent HTTP Binding Binary Content Mode representation of the final message. Note: If the specified binding expression, has updated the `datacontenttype` field on the message so that it is not the same as the payload format type but it is still a prefix of the payload format type, then the `content-type` header in the `headers` map is set to this `datacontenttype` value. - If a field named `body` exists on the result of the expression then its value is directly mapped to the body of the request. If the value of the `body` field is of type bytes or string then it is used for the HTTP request body as-is, with no conversion. If the body field is of any other type then it is converted to a JSON string. If the body field does not exist then the resulting payload of the HTTP request will be data value of the CloudEvent HTTP Binding Binary Content Mode representation of the final message as described earlier. - Any other fields in the resulting expression will be ignored. The CEL expression may access the incoming CloudEvent message in its definition, as follows: - The `data` field of the incoming CloudEvent message can be accessed using the `message.data` value. Subfields of `message.data` may also be accessed if an input_payload_format has been specified on the Pipeline. - Each attribute of the incoming CloudEvent message can be accessed using the `message.` value, where is replaced with the name of the attribute. - Existing headers can be accessed in the CEL expression using the `headers` variable. The `headers` variable defines a map of key/value pairs corresponding to the HTTP headers of the CloudEvent HTTP Binding Binary Content Mode representation of the final message as described earlier. For example, the following CEL expression can be used to construct an HTTP request by adding an additional header to the HTTP headers of the CloudEvent HTTP Binding Binary Content Mode representation of the final message and by overwriting the body of the request: ` { "headers": headers.merge({"new-header-key": "new-header-value"}), "body": "new-body" } ` - The default binding for the message payload can be accessed using the `body` variable. It conatins a string representation of the message payload in the format specified by the `output_payload_format` field. If the `input_payload_format` field is not set, the `body` variable contains the same message payload bytes that were published. Additionally, the following CEL extension functions are provided for use in this CEL expression: - toBase64Url: map.toBase64Url() -> string - Converts a CelValue to a base64url encoded string - toJsonString: map.toJsonString() -> string - Converts a CelValue to a JSON string - merge: map1.merge(map2) -> map3 - Merges the passed CEL map with the existing CEL map the function is applied to. - If the same key exists in both maps, if the key\'s value is type map both maps are merged else the value from the passed map is used. - denormalize: map.denormalize() -> map - Denormalizes a CEL map such that every value of type map or key in the map is expanded to return a single level map. - The resulting keys are "." separated indices of the map keys. - For example: { "a": 1, "b": { "c": 2, "d": 3 } "e": [4, 5] }.denormalize() -> { "a": 1, "b.c": 2, "b.d": 3, "e.0": 4, "e.1": 5 } - setField: map.setField(key, value) -> message - Sets the field of the message with the given key to the given value. - If the field is not present it will be added. - If the field is present it will be overwritten. - The key can be a dot separated path to set a field in a nested message. - Key must be of type string. - Value may be any valid type. - removeFields: map.removeFields([key1, key2,...]) -> message - Removes the fields of the map with the given keys. - The keys can be a dot separated path to remove a field in a nested message. - If a key is not found it will be ignored. - Keys must be of type string. - toMap: [map1, map2,...].toMap() -> map - Converts a CEL list of CEL maps to a single CEL map - toCloudEventJsonWithPayloadFormat: message.toCloudEventJsonWithPayloadFormat() -> map - Converts a message to the corresponding structure of JSON format for CloudEvents. - It converts `data` to destination payload format specified in `output_payload_format`. If `output_payload_format` is not set, the data will remain unchanged. - It also sets the corresponding datacontenttype of the CloudEvent, as indicated by `output_payload_format`. If no `output_payload_format` is set it will use the value of the "datacontenttype" attribute on the CloudEvent if present, else remove "datacontenttype" attribute. - This function expects that the content of the message will adhere to the standard CloudEvent format. If it doesn\'t then this function will fail. - The result is a CEL map that corresponds to the JSON representation of the CloudEvent. To convert that data to a JSON string it can be chained with the toJsonString function. The Pipeline expects that the message it receives adheres to the standard CloudEvent format. If it doesn\'t then the outgoing message request may fail with a persistent error.',
      ).optional(),
      uri: z.string().describe(
        "Required. The URI of the HTTP endpoint. The value must be a RFC2396 URI string. Examples: `https://svc.us-central1.p.local:8080/route`. Only the HTTPS protocol is supported.",
      ).optional(),
    }).describe("Represents a HTTP endpoint destination.").optional(),
    messageBus: z.string().describe(
      "Optional. The resource name of the Message Bus to which events should be published. The Message Bus resource should exist in the same project as the Pipeline. Format: `projects/{project}/locations/{location}/messageBuses/{message_bus}`",
    ).optional(),
    networkConfig: z.object({
      networkAttachment: z.string().describe(
        "Required. Name of the NetworkAttachment that allows access to the consumer VPC. Format: `projects/{PROJECT_ID}/regions/{REGION}/networkAttachments/{NETWORK_ATTACHMENT_NAME}`",
      ).optional(),
    }).describe(
      "Represents a network config to be used for destination resolution and connectivity.",
    ).optional(),
    outputPayloadFormat: z.object({
      avro: z.object({
        schemaDefinition: z.string().describe(
          "Optional. The entire schema definition is stored in this field.",
        ).optional(),
      }).describe("The format of an AVRO message payload.").optional(),
      json: z.object({}).describe("The format of a JSON message payload.")
        .optional(),
      protobuf: z.object({
        schemaDefinition: z.string().describe(
          "Optional. The entire schema definition is stored in this field.",
        ).optional(),
      }).describe("The format of a Protobuf message payload.").optional(),
    }).describe("Represents the format of message data.").optional(),
    topic: z.string().describe(
      "Optional. The resource name of the Pub/Sub topic to which events should be published. Format: `projects/{project}/locations/{location}/topics/{topic}`",
    ).optional(),
    workflow: z.string().describe(
      "Optional. The resource name of the Workflow whose Executions are triggered by the events. The Workflow resource should be deployed in the same project as the Pipeline. Format: `projects/{project}/locations/{location}/workflows/{workflow}`",
    ).optional(),
  })).describe(
    "Required. List of destinations to which messages will be forwarded. Currently, exactly one destination is supported per Pipeline.",
  ).optional(),
  displayName: z.string().describe("Optional. Display name of resource.")
    .optional(),
  inputPayloadFormat: z.object({
    avro: z.object({
      schemaDefinition: z.string().describe(
        "Optional. The entire schema definition is stored in this field.",
      ).optional(),
    }).describe("The format of an AVRO message payload.").optional(),
    json: z.object({}).describe("The format of a JSON message payload.")
      .optional(),
    protobuf: z.object({
      schemaDefinition: z.string().describe(
        "Optional. The entire schema definition is stored in this field.",
      ).optional(),
    }).describe("The format of a Protobuf message payload.").optional(),
  }).describe("Represents the format of message data.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. User labels attached to the Pipeline that can be used to group resources. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
  ).optional(),
  loggingConfig: z.object({
    logSeverity: z.enum([
      "LOG_SEVERITY_UNSPECIFIED",
      "NONE",
      "DEBUG",
      "INFO",
      "NOTICE",
      "WARNING",
      "ERROR",
      "CRITICAL",
      "ALERT",
      "EMERGENCY",
    ]).describe(
      "Optional. The minimum severity of logs that will be sent to Stackdriver/Platform Telemetry. Logs at severitiy ≥ this value will be sent, unless it is NONE.",
    ).optional(),
  }).describe(
    "The configuration for Platform Telemetry logging for Eventarc Advanced resources.",
  ).optional(),
  mediations: z.array(z.object({
    transformation: z.object({
      transformationTemplate: z.string().describe(
        'Optional. The CEL expression template to apply to transform messages. The following CEL extension functions are provided for use in this CEL expression: - merge: map1.merge(map2) -> map3 - Merges the passed CEL map with the existing CEL map the function is applied to. - If the same key exists in both maps, if the key\'s value is type map both maps are merged else the value from the passed map is used. - denormalize: map.denormalize() -> map - Denormalizes a CEL map such that every value of type map or key in the map is expanded to return a single level map. - The resulting keys are "." separated indices of the map keys. - For example: { "a": 1, "b": { "c": 2, "d": 3 } "e": [4, 5] }.denormalize() -> { "a": 1, "b.c": 2, "b.d": 3, "e.0": 4, "e.1": 5 } - setField: map.setField(key, value) -> message - Sets the field of the message with the given key to the given value. - If the field is not present it will be added. - If the field is present it will be overwritten. - The key can be a dot separated path to set a field in a nested message. - Key must be of type string. - Value may be any valid type. - removeFields: map.removeFields([key1, key2,...]) -> message - Removes the fields of the map with the given keys. - The keys can be a dot separated path to remove a field in a nested message. - If a key is not found it will be ignored. - Keys must be of type string. - toMap: [map1, map2,...].toMap() -> map - Converts a CEL list of CEL maps to a single CEL map - toDestinationPayloadFormat(): message.data.toDestinationPayloadFormat() -> string or bytes - Converts the message data to the destination payload format specified in Pipeline.Destination.output_payload_format - This function is meant to be applied to the message.data field. - If the destination payload format is not set, the function will return the message data unchanged. - toCloudEventJsonWithPayloadFormat: message.toCloudEventJsonWithPayloadFormat() -> map - Converts a message to the corresponding structure of JSON format for CloudEvents - This function applies toDestinationPayloadFormat() to the message data. It also sets the corresponding datacontenttype of the CloudEvent, as indicated by Pipeline.Destination.output_payload_format. If no output_payload_format is set it will use the existing datacontenttype on the CloudEvent if present, else leave datacontenttype absent. - This function expects that the content of the message will adhere to the standard CloudEvent format. If it doesn\'t then this function will fail. - The result is a CEL map that corresponds to the JSON representation of the CloudEvent. To convert that data to a JSON string it can be chained with the toJsonString function.',
      ).optional(),
    }).describe(
      "Transformation defines the way to transform an incoming message.",
    ).optional(),
  })).describe(
    "Optional. List of mediation operations to be performed on the message. Currently, only one Transformation operation is allowed in each Pipeline.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Pipeline. Must be unique within the location of the project and must be in `projects/{project}/locations/{location}/pipelines/{pipeline}` format.",
  ).optional(),
  retryPolicy: z.object({
    maxAttempts: z.number().int().describe(
      "Optional. The maximum number of delivery attempts for any message. The value must be between 1 and 100. The default value for this field is 5.",
    ).optional(),
    maxRetryDelay: z.string().describe(
      "Optional. The maximum amount of seconds to wait between retry attempts. The value must be between 1 and 600. The default value for this field is 60.",
    ).optional(),
    minRetryDelay: z.string().describe(
      "Optional. The minimum amount of seconds to wait between retry attempts. The value must be between 1 and 600. The default value for this field is 5.",
    ).optional(),
  }).describe(
    "The retry policy configuration for the Pipeline. The pipeline exponentially backs off in case the destination is non responsive or returns a retryable error code. The default semantics are as follows: The backoff starts with a 5 second delay and doubles the delay after each failed attempt (10 seconds, 20 seconds, 40 seconds, etc.). The delay is capped at 60 seconds by default. Please note that if you set the min_retry_delay and max_retry_delay fields to the same value this will make the duration between retries constant.",
  ).optional(),
  pipelineId: z.string().describe(
    "Required. The user-provided ID to be assigned to the Pipeline. It should match the format `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  cryptoKeyName: z.string().optional(),
  destinations: z.array(z.object({
    authenticationConfig: z.object({
      googleOidc: z.object({
        audience: z.string(),
        serviceAccount: z.string(),
      }),
      oauthToken: z.object({
        scope: z.string(),
        serviceAccount: z.string(),
      }),
    }),
    httpEndpoint: z.object({
      messageBindingTemplate: z.string(),
      uri: z.string(),
    }),
    messageBus: z.string(),
    networkConfig: z.object({
      networkAttachment: z.string(),
    }),
    outputPayloadFormat: z.object({
      avro: z.object({
        schemaDefinition: z.string(),
      }),
      json: z.object({}),
      protobuf: z.object({
        schemaDefinition: z.string(),
      }),
    }),
    topic: z.string(),
    workflow: z.string(),
  })).optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  inputPayloadFormat: z.object({
    avro: z.object({
      schemaDefinition: z.string(),
    }),
    json: z.object({}),
    protobuf: z.object({
      schemaDefinition: z.string(),
    }),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  loggingConfig: z.object({
    logSeverity: z.string(),
  }).optional(),
  mediations: z.array(z.object({
    transformation: z.object({
      transformationTemplate: z.string(),
    }),
  })).optional(),
  name: z.string(),
  retryPolicy: z.object({
    maxAttempts: z.number(),
    maxRetryDelay: z.string(),
    minRetryDelay: z.string(),
  }).optional(),
  satisfiesPzs: z.boolean().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User-defined annotations. See https://google.aip.dev/128#annotations.",
  ).optional(),
  cryptoKeyName: z.string().describe(
    'Optional. Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt the event data. If not set, an internal Google-owned key will be used to encrypt messages. It must match the pattern "projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}".',
  ).optional(),
  destinations: z.array(z.object({
    authenticationConfig: z.object({
      googleOidc: z.object({
        audience: z.string().describe(
          "Optional. Audience to be used to generate the OIDC Token. The audience claim identifies the recipient that the JWT is intended for. If unspecified, the destination URI will be used.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. Service account email used to generate the OIDC Token. The principal who calls this API must have iam.serviceAccounts.actAs permission in the service account. See https://cloud.google.com/iam/docs/understanding-service-accounts for more information. Eventarc service agents must have roles/roles/iam.serviceAccountTokenCreator role to allow the Pipeline to create OpenID tokens for authenticated requests.",
        ).optional(),
      }).describe(
        "Represents a config used to authenticate with a Google OIDC token using a Google Cloud service account. Use this authentication method to invoke your Cloud Run and Cloud Functions destinations or HTTP endpoints that support Google OIDC.",
      ).optional(),
      oauthToken: z.object({
        scope: z.string().describe(
          'Optional. OAuth scope to be used for generating OAuth access token. If not specified, "https://www.googleapis.com/auth/cloud-platform" will be used.',
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. Service account email used to generate the [OAuth token](https://developers.google.com/identity/protocols/OAuth2). The principal who calls this API must have iam.serviceAccounts.actAs permission in the service account. See https://cloud.google.com/iam/docs/understanding-service-accounts for more information. Eventarc service agents must have roles/roles/iam.serviceAccountTokenCreator role to allow Pipeline to create OAuth2 tokens for authenticated requests.",
        ).optional(),
      }).describe(
        "Contains information needed for generating an [OAuth token](https://developers.google.com/identity/protocols/OAuth2). This type of authorization should generally only be used when calling Google APIs hosted on *.googleapis.com.",
      ).optional(),
    }).describe("Represents a config used to authenticate message requests.")
      .optional(),
    httpEndpoint: z.object({
      messageBindingTemplate: z.string().describe(
        'Optional. The CEL expression used to modify how the destination-bound HTTP request is constructed. If a binding expression is not specified here, the message is treated as a CloudEvent and is mapped to the HTTP request according to the CloudEvent HTTP Protocol Binding Binary Content Mode (https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/http-protocol-binding.md#31-binary-content-mode). In this representation, all fields except the `data` and `datacontenttype` field on the message are mapped to HTTP request headers with a prefix of `ce-`. To construct the HTTP request payload and the value of the content-type HTTP header, the payload format is defined as follows: 1) Use the output_payload_format_type on the Pipeline.Destination if it is set, else: 2) Use the input_payload_format_type on the Pipeline if it is set, else: 3) Treat the payload as opaque binary data. The `data` field of the message is converted to the payload format or left as-is for case 3) and then attached as the payload of the HTTP request. The `content-type` header on the HTTP request is set to the payload format type or left empty for case 3). However, if a mediation has updated the `datacontenttype` field on the message so that it is not the same as the payload format type but it is still a prefix of the payload format type, then the `content-type` header on the HTTP request is set to this `datacontenttype` value. For example, if the `datacontenttype` is "application/json" and the payload format type is "application/json; charset=utf-8", then the `content-type` header on the HTTP request is set to "application/json; charset=utf-8". If a non-empty binding expression is specified then this expression is used to modify the default CloudEvent HTTP Protocol Binding Binary Content representation. The result of the CEL expression must be a map of key/value pairs which is used as follows: - If a map named `headers` exists on the result of the expression, then its key/value pairs are directly mapped to the HTTP request headers. The headers values are constructed from the corresponding value type\'s canonical representation. If the `headers` field doesn\'t exist then the resulting HTTP request will be the headers of the CloudEvent HTTP Binding Binary Content Mode representation of the final message. Note: If the specified binding expression, has updated the `datacontenttype` field on the message so that it is not the same as the payload format type but it is still a prefix of the payload format type, then the `content-type` header in the `headers` map is set to this `datacontenttype` value. - If a field named `body` exists on the result of the expression then its value is directly mapped to the body of the request. If the value of the `body` field is of type bytes or string then it is used for the HTTP request body as-is, with no conversion. If the body field is of any other type then it is converted to a JSON string. If the body field does not exist then the resulting payload of the HTTP request will be data value of the CloudEvent HTTP Binding Binary Content Mode representation of the final message as described earlier. - Any other fields in the resulting expression will be ignored. The CEL expression may access the incoming CloudEvent message in its definition, as follows: - The `data` field of the incoming CloudEvent message can be accessed using the `message.data` value. Subfields of `message.data` may also be accessed if an input_payload_format has been specified on the Pipeline. - Each attribute of the incoming CloudEvent message can be accessed using the `message.` value, where is replaced with the name of the attribute. - Existing headers can be accessed in the CEL expression using the `headers` variable. The `headers` variable defines a map of key/value pairs corresponding to the HTTP headers of the CloudEvent HTTP Binding Binary Content Mode representation of the final message as described earlier. For example, the following CEL expression can be used to construct an HTTP request by adding an additional header to the HTTP headers of the CloudEvent HTTP Binding Binary Content Mode representation of the final message and by overwriting the body of the request: ` { "headers": headers.merge({"new-header-key": "new-header-value"}), "body": "new-body" } ` - The default binding for the message payload can be accessed using the `body` variable. It conatins a string representation of the message payload in the format specified by the `output_payload_format` field. If the `input_payload_format` field is not set, the `body` variable contains the same message payload bytes that were published. Additionally, the following CEL extension functions are provided for use in this CEL expression: - toBase64Url: map.toBase64Url() -> string - Converts a CelValue to a base64url encoded string - toJsonString: map.toJsonString() -> string - Converts a CelValue to a JSON string - merge: map1.merge(map2) -> map3 - Merges the passed CEL map with the existing CEL map the function is applied to. - If the same key exists in both maps, if the key\'s value is type map both maps are merged else the value from the passed map is used. - denormalize: map.denormalize() -> map - Denormalizes a CEL map such that every value of type map or key in the map is expanded to return a single level map. - The resulting keys are "." separated indices of the map keys. - For example: { "a": 1, "b": { "c": 2, "d": 3 } "e": [4, 5] }.denormalize() -> { "a": 1, "b.c": 2, "b.d": 3, "e.0": 4, "e.1": 5 } - setField: map.setField(key, value) -> message - Sets the field of the message with the given key to the given value. - If the field is not present it will be added. - If the field is present it will be overwritten. - The key can be a dot separated path to set a field in a nested message. - Key must be of type string. - Value may be any valid type. - removeFields: map.removeFields([key1, key2,...]) -> message - Removes the fields of the map with the given keys. - The keys can be a dot separated path to remove a field in a nested message. - If a key is not found it will be ignored. - Keys must be of type string. - toMap: [map1, map2,...].toMap() -> map - Converts a CEL list of CEL maps to a single CEL map - toCloudEventJsonWithPayloadFormat: message.toCloudEventJsonWithPayloadFormat() -> map - Converts a message to the corresponding structure of JSON format for CloudEvents. - It converts `data` to destination payload format specified in `output_payload_format`. If `output_payload_format` is not set, the data will remain unchanged. - It also sets the corresponding datacontenttype of the CloudEvent, as indicated by `output_payload_format`. If no `output_payload_format` is set it will use the value of the "datacontenttype" attribute on the CloudEvent if present, else remove "datacontenttype" attribute. - This function expects that the content of the message will adhere to the standard CloudEvent format. If it doesn\'t then this function will fail. - The result is a CEL map that corresponds to the JSON representation of the CloudEvent. To convert that data to a JSON string it can be chained with the toJsonString function. The Pipeline expects that the message it receives adheres to the standard CloudEvent format. If it doesn\'t then the outgoing message request may fail with a persistent error.',
      ).optional(),
      uri: z.string().describe(
        "Required. The URI of the HTTP endpoint. The value must be a RFC2396 URI string. Examples: `https://svc.us-central1.p.local:8080/route`. Only the HTTPS protocol is supported.",
      ).optional(),
    }).describe("Represents a HTTP endpoint destination.").optional(),
    messageBus: z.string().describe(
      "Optional. The resource name of the Message Bus to which events should be published. The Message Bus resource should exist in the same project as the Pipeline. Format: `projects/{project}/locations/{location}/messageBuses/{message_bus}`",
    ).optional(),
    networkConfig: z.object({
      networkAttachment: z.string().describe(
        "Required. Name of the NetworkAttachment that allows access to the consumer VPC. Format: `projects/{PROJECT_ID}/regions/{REGION}/networkAttachments/{NETWORK_ATTACHMENT_NAME}`",
      ).optional(),
    }).describe(
      "Represents a network config to be used for destination resolution and connectivity.",
    ).optional(),
    outputPayloadFormat: z.object({
      avro: z.object({
        schemaDefinition: z.string().describe(
          "Optional. The entire schema definition is stored in this field.",
        ).optional(),
      }).describe("The format of an AVRO message payload.").optional(),
      json: z.object({}).describe("The format of a JSON message payload.")
        .optional(),
      protobuf: z.object({
        schemaDefinition: z.string().describe(
          "Optional. The entire schema definition is stored in this field.",
        ).optional(),
      }).describe("The format of a Protobuf message payload.").optional(),
    }).describe("Represents the format of message data.").optional(),
    topic: z.string().describe(
      "Optional. The resource name of the Pub/Sub topic to which events should be published. Format: `projects/{project}/locations/{location}/topics/{topic}`",
    ).optional(),
    workflow: z.string().describe(
      "Optional. The resource name of the Workflow whose Executions are triggered by the events. The Workflow resource should be deployed in the same project as the Pipeline. Format: `projects/{project}/locations/{location}/workflows/{workflow}`",
    ).optional(),
  })).describe(
    "Required. List of destinations to which messages will be forwarded. Currently, exactly one destination is supported per Pipeline.",
  ).optional(),
  displayName: z.string().describe("Optional. Display name of resource.")
    .optional(),
  inputPayloadFormat: z.object({
    avro: z.object({
      schemaDefinition: z.string().describe(
        "Optional. The entire schema definition is stored in this field.",
      ).optional(),
    }).describe("The format of an AVRO message payload.").optional(),
    json: z.object({}).describe("The format of a JSON message payload.")
      .optional(),
    protobuf: z.object({
      schemaDefinition: z.string().describe(
        "Optional. The entire schema definition is stored in this field.",
      ).optional(),
    }).describe("The format of a Protobuf message payload.").optional(),
  }).describe("Represents the format of message data.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. User labels attached to the Pipeline that can be used to group resources. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
  ).optional(),
  loggingConfig: z.object({
    logSeverity: z.enum([
      "LOG_SEVERITY_UNSPECIFIED",
      "NONE",
      "DEBUG",
      "INFO",
      "NOTICE",
      "WARNING",
      "ERROR",
      "CRITICAL",
      "ALERT",
      "EMERGENCY",
    ]).describe(
      "Optional. The minimum severity of logs that will be sent to Stackdriver/Platform Telemetry. Logs at severitiy ≥ this value will be sent, unless it is NONE.",
    ).optional(),
  }).describe(
    "The configuration for Platform Telemetry logging for Eventarc Advanced resources.",
  ).optional(),
  mediations: z.array(z.object({
    transformation: z.object({
      transformationTemplate: z.string().describe(
        'Optional. The CEL expression template to apply to transform messages. The following CEL extension functions are provided for use in this CEL expression: - merge: map1.merge(map2) -> map3 - Merges the passed CEL map with the existing CEL map the function is applied to. - If the same key exists in both maps, if the key\'s value is type map both maps are merged else the value from the passed map is used. - denormalize: map.denormalize() -> map - Denormalizes a CEL map such that every value of type map or key in the map is expanded to return a single level map. - The resulting keys are "." separated indices of the map keys. - For example: { "a": 1, "b": { "c": 2, "d": 3 } "e": [4, 5] }.denormalize() -> { "a": 1, "b.c": 2, "b.d": 3, "e.0": 4, "e.1": 5 } - setField: map.setField(key, value) -> message - Sets the field of the message with the given key to the given value. - If the field is not present it will be added. - If the field is present it will be overwritten. - The key can be a dot separated path to set a field in a nested message. - Key must be of type string. - Value may be any valid type. - removeFields: map.removeFields([key1, key2,...]) -> message - Removes the fields of the map with the given keys. - The keys can be a dot separated path to remove a field in a nested message. - If a key is not found it will be ignored. - Keys must be of type string. - toMap: [map1, map2,...].toMap() -> map - Converts a CEL list of CEL maps to a single CEL map - toDestinationPayloadFormat(): message.data.toDestinationPayloadFormat() -> string or bytes - Converts the message data to the destination payload format specified in Pipeline.Destination.output_payload_format - This function is meant to be applied to the message.data field. - If the destination payload format is not set, the function will return the message data unchanged. - toCloudEventJsonWithPayloadFormat: message.toCloudEventJsonWithPayloadFormat() -> map - Converts a message to the corresponding structure of JSON format for CloudEvents - This function applies toDestinationPayloadFormat() to the message data. It also sets the corresponding datacontenttype of the CloudEvent, as indicated by Pipeline.Destination.output_payload_format. If no output_payload_format is set it will use the existing datacontenttype on the CloudEvent if present, else leave datacontenttype absent. - This function expects that the content of the message will adhere to the standard CloudEvent format. If it doesn\'t then this function will fail. - The result is a CEL map that corresponds to the JSON representation of the CloudEvent. To convert that data to a JSON string it can be chained with the toJsonString function.',
      ).optional(),
    }).describe(
      "Transformation defines the way to transform an incoming message.",
    ).optional(),
  })).describe(
    "Optional. List of mediation operations to be performed on the message. Currently, only one Transformation operation is allowed in each Pipeline.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Pipeline. Must be unique within the location of the project and must be in `projects/{project}/locations/{location}/pipelines/{pipeline}` format.",
  ).optional(),
  retryPolicy: z.object({
    maxAttempts: z.number().int().describe(
      "Optional. The maximum number of delivery attempts for any message. The value must be between 1 and 100. The default value for this field is 5.",
    ).optional(),
    maxRetryDelay: z.string().describe(
      "Optional. The maximum amount of seconds to wait between retry attempts. The value must be between 1 and 600. The default value for this field is 60.",
    ).optional(),
    minRetryDelay: z.string().describe(
      "Optional. The minimum amount of seconds to wait between retry attempts. The value must be between 1 and 600. The default value for this field is 5.",
    ).optional(),
  }).describe(
    "The retry policy configuration for the Pipeline. The pipeline exponentially backs off in case the destination is non responsive or returns a retryable error code. The default semantics are as follows: The backoff starts with a 5 second delay and doubles the delay after each failed attempt (10 seconds, 20 seconds, 40 seconds, etc.). The delay is capped at 60 seconds by default. Please note that if you set the min_retry_delay and max_retry_delay fields to the same value this will make the duration between retries constant.",
  ).optional(),
  pipelineId: z.string().describe(
    "Required. The user-provided ID to be assigned to the Pipeline. It should match the format `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Eventarc Pipelines. Registered at `@swamp/gcp/eventarc/pipelines`. */
export const model = {
  type: "@swamp/gcp/eventarc/pipelines",
  version: "2026.06.08.1",
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
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A representation of the Pipeline resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a pipelines",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["cryptoKeyName"] !== undefined) {
          body["cryptoKeyName"] = g["cryptoKeyName"];
        }
        if (g["destinations"] !== undefined) {
          body["destinations"] = g["destinations"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["inputPayloadFormat"] !== undefined) {
          body["inputPayloadFormat"] = g["inputPayloadFormat"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["loggingConfig"] !== undefined) {
          body["loggingConfig"] = g["loggingConfig"];
        }
        if (g["mediations"] !== undefined) body["mediations"] = g["mediations"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["retryPolicy"] !== undefined) {
          body["retryPolicy"] = g["retryPolicy"];
        }
        if (g["pipelineId"] !== undefined) body["pipelineId"] = g["pipelineId"];
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
      description: "Get a pipelines",
      arguments: z.object({
        identifier: z.string().describe("The name of the pipelines"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update pipelines attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["cryptoKeyName"] !== undefined) {
          body["cryptoKeyName"] = g["cryptoKeyName"];
        }
        if (g["destinations"] !== undefined) {
          body["destinations"] = g["destinations"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["inputPayloadFormat"] !== undefined) {
          body["inputPayloadFormat"] = g["inputPayloadFormat"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["loggingConfig"] !== undefined) {
          body["loggingConfig"] = g["loggingConfig"];
        }
        if (g["mediations"] !== undefined) body["mediations"] = g["mediations"];
        if (g["retryPolicy"] !== undefined) {
          body["retryPolicy"] = g["retryPolicy"];
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
          undefined,
          credentials,
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
      description: "Delete the pipelines",
      arguments: z.object({
        identifier: z.string().describe("The name of the pipelines"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync pipelines state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List pipelines resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. The filter field that the list request will filter on. Possible filters are described in https://google.aip.dev/160.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. The sorting order of the resources returned. Value should be a comma-separated list of fields. The default sorting order is ascending. To specify descending order for a field, append a `desc` suffix; for example: `name desc, update_time`.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of results to return on each page. Note: The service may send fewer.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          "pipelines",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "eventarc.projects.locations.pipelines.getIamPolicy",
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "eventarc.projects.locations.pipelines.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "eventarc.projects.locations.pipelines.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
