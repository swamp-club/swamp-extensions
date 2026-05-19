// Auto-generated extension model for @swamp/gcp/healthcare/datasets-hl7v2stores
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Healthcare Datasets.Hl7V2Stores.
 *
 * Represents an HL7v2 store.
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

const BASE_URL = "https://healthcare.googleapis.com/";

const GET_CONFIG = {
  "id": "healthcare.projects.locations.datasets.hl7V2Stores.get",
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
  "id": "healthcare.projects.locations.datasets.hl7V2Stores.create",
  "path": "v1/{+parent}/hl7V2Stores",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "hl7V2StoreId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "healthcare.projects.locations.datasets.hl7V2Stores.patch",
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
  "id": "healthcare.projects.locations.datasets.hl7V2Stores.delete",
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
    "User-supplied key-value pairs used to organize HL7v2 stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} No more than 64 labels can be associated with a given store.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the HL7v2 store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7v2_store_id}`.",
  ).optional(),
  notificationConfigs: z.array(z.object({
    filter: z.string().describe(
      'Optional. Restricts notifications sent for messages matching a filter. If this is empty, all messages are matched. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (``, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`), along with the less than/greater than operators (``, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it\'s just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. The following fields and functions are available for filtering: * `message_type`, from the MSH-9.1 field. For example, `NOT message_type = "ADT"`. * `send_date` or `sendDate`, the YYYY-MM-DD date the message was sent in the dataset\'s time_zone, from the MSH-7 segment. For example, `send_date < "2017-01-02"`. * `send_time`, the timestamp when the message was sent, using the RFC3339 time format for comparisons, from the MSH-7 segment. For example, `send_time < "2017-01-02T00:00:00-05:00"`. * `create_time`, the timestamp when the message was created in the HL7v2 store. Use the RFC3339 time format for comparisons. For example, `create_time < "2017-01-02T00:00:00-05:00"`. * `send_facility`, the care center that the message came from, from the MSH-4 segment. For example, `send_facility = "ABC"`. * `PatientId(value, type)`, which matches if the message lists a patient having an ID of the given value and type in the PID-2, PID-3, or PID-4 segments. For example, `PatientId("123456", "MRN")`. * `labels.x`, a string value of the label with key `x` as set using the Message.labels map. For example, `labels."priority"="high"`. The operator `:*` can be used to assert the existence of a label. For example, `labels."priority":*`.',
    ).optional(),
    pubsubTopic: z.string().describe(
      "The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. The notification is a `PubsubMessage` with the following fields: * `PubsubMessage.Data` contains the resource name. * `PubsubMessage.MessageId` is the ID of this notification. It's guaranteed to be unique within the topic. * `PubsubMessage.PublishTime` is the time when the message was published. Note that notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. The Cloud Healthcare API service account, service-PROJECT_NUMBER@gcp-sa-healthcare.iam.gserviceaccount.com, must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail. If a notification cannot be published to Pub/Sub, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).",
    ).optional(),
  })).describe(
    "Optional. A list of notification configs. Each configuration uses a filter to determine whether to publish a message (both Ingest & Create) on the corresponding notification destination. Only the message name is sent as part of the notification. Supplied by the client.",
  ).optional(),
  parserConfig: z.object({
    allowNullHeader: z.boolean().describe(
      "Optional. Determines whether messages with no header are allowed.",
    ).optional(),
    schema: z.object({
      ignoreMinOccurs: z.boolean().describe(
        "Optional. Flag to ignore all min_occurs restrictions in the schema. This means that incoming messages can omit any group, segment, field, component, or subcomponent.",
      ).optional(),
      schemas: z.array(z.object({
        messageSchemaConfigs: z.record(z.string(), z.unknown()).describe(
          "Map from each HL7v2 message type and trigger event pair, such as ADT_A04, to its schema configuration root group.",
        ).optional(),
        version: z.array(z.unknown()).describe(
          "Each VersionSource is tested and only if they all match is the schema used for the message.",
        ).optional(),
      })).describe(
        "Optional. Schema configs that are layered based on their VersionSources that match the incoming message. Schema configs present in higher indices override those in lower indices with the same message type and trigger event if their VersionSources all match an incoming message.",
      ).optional(),
      schematizedParsingType: z.enum([
        "SCHEMATIZED_PARSING_TYPE_UNSPECIFIED",
        "SOFT_FAIL",
        "HARD_FAIL",
      ]).describe(
        "Optional. Determines how messages that fail to parse are handled.",
      ).optional(),
      types: z.array(z.object({
        type: z.array(z.unknown()).describe("The HL7v2 type definitions.")
          .optional(),
        version: z.array(z.unknown()).describe(
          "The version selectors that this config applies to. A message must match ALL version sources to apply.",
        ).optional(),
      })).describe(
        "Optional. Schema type definitions that are layered based on their VersionSources that match the incoming message. Type definitions present in higher indices override those in lower indices with the same type name if their VersionSources all match an incoming message.",
      ).optional(),
      unexpectedSegmentHandling: z.enum([
        "UNEXPECTED_SEGMENT_HANDLING_MODE_UNSPECIFIED",
        "FAIL",
        "SKIP",
        "PARSE",
      ]).describe(
        "Optional. Determines how unexpected segments (segments not matched to the schema) are handled.",
      ).optional(),
    }).describe(
      "A schema package contains a set of schemas and type definitions.",
    ).optional(),
    segmentTerminator: z.string().describe(
      "Optional. Byte(s) to use as the segment terminator. If this is unset, '\\r' is used as segment terminator, matching the HL7 version 2 specification.",
    ).optional(),
    version: z.enum(["PARSER_VERSION_UNSPECIFIED", "V1", "V2", "V3"]).describe(
      "Immutable. Determines the version of both the default parser to be used when `schema` is not given, as well as the schematized parser used when `schema` is specified. This field is immutable after HL7v2 store creation.",
    ).optional(),
  }).describe(
    "The configuration for the parser. It determines how the server parses the messages.",
  ).optional(),
  rejectDuplicateMessage: z.boolean().describe(
    "Optional. Determines whether to reject duplicate messages. A duplicate message is a message with the same raw bytes as a message that has already been ingested/created in this HL7v2 store. The default value is false, meaning that the store accepts the duplicate messages and it also returns the same ACK message in the IngestMessageResponse as has been returned previously. Note that only one resource is created in the store. When this field is set to true, CreateMessage/IngestMessage requests with a duplicate message will be rejected by the store, and IngestMessageErrorDetail returns a NACK message upon rejection.",
  ).optional(),
  hl7V2StoreId: z.string().describe(
    "Required. The ID of the HL7v2 store that is being created. The string must match the following regex: `[\\p{L}\\p{N}_\\-\\.]{1,256}`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  notificationConfigs: z.array(z.object({
    filter: z.string(),
    pubsubTopic: z.string(),
  })).optional(),
  parserConfig: z.object({
    allowNullHeader: z.boolean(),
    schema: z.object({
      ignoreMinOccurs: z.boolean(),
      schemas: z.array(z.object({
        messageSchemaConfigs: z.record(z.string(), z.unknown()),
        version: z.array(z.unknown()),
      })),
      schematizedParsingType: z.string(),
      types: z.array(z.object({
        type: z.array(z.unknown()),
        version: z.array(z.unknown()),
      })),
      unexpectedSegmentHandling: z.string(),
    }),
    segmentTerminator: z.string(),
    version: z.string(),
  }).optional(),
  rejectDuplicateMessage: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  labels: z.record(z.string(), z.string()).describe(
    "User-supplied key-value pairs used to organize HL7v2 stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} No more than 64 labels can be associated with a given store.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the HL7v2 store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7v2_store_id}`.",
  ).optional(),
  notificationConfigs: z.array(z.object({
    filter: z.string().describe(
      'Optional. Restricts notifications sent for messages matching a filter. If this is empty, all messages are matched. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (``, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`), along with the less than/greater than operators (``, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it\'s just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. The following fields and functions are available for filtering: * `message_type`, from the MSH-9.1 field. For example, `NOT message_type = "ADT"`. * `send_date` or `sendDate`, the YYYY-MM-DD date the message was sent in the dataset\'s time_zone, from the MSH-7 segment. For example, `send_date < "2017-01-02"`. * `send_time`, the timestamp when the message was sent, using the RFC3339 time format for comparisons, from the MSH-7 segment. For example, `send_time < "2017-01-02T00:00:00-05:00"`. * `create_time`, the timestamp when the message was created in the HL7v2 store. Use the RFC3339 time format for comparisons. For example, `create_time < "2017-01-02T00:00:00-05:00"`. * `send_facility`, the care center that the message came from, from the MSH-4 segment. For example, `send_facility = "ABC"`. * `PatientId(value, type)`, which matches if the message lists a patient having an ID of the given value and type in the PID-2, PID-3, or PID-4 segments. For example, `PatientId("123456", "MRN")`. * `labels.x`, a string value of the label with key `x` as set using the Message.labels map. For example, `labels."priority"="high"`. The operator `:*` can be used to assert the existence of a label. For example, `labels."priority":*`.',
    ).optional(),
    pubsubTopic: z.string().describe(
      "The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. The notification is a `PubsubMessage` with the following fields: * `PubsubMessage.Data` contains the resource name. * `PubsubMessage.MessageId` is the ID of this notification. It's guaranteed to be unique within the topic. * `PubsubMessage.PublishTime` is the time when the message was published. Note that notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. The Cloud Healthcare API service account, service-PROJECT_NUMBER@gcp-sa-healthcare.iam.gserviceaccount.com, must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail. If a notification cannot be published to Pub/Sub, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).",
    ).optional(),
  })).describe(
    "Optional. A list of notification configs. Each configuration uses a filter to determine whether to publish a message (both Ingest & Create) on the corresponding notification destination. Only the message name is sent as part of the notification. Supplied by the client.",
  ).optional(),
  parserConfig: z.object({
    allowNullHeader: z.boolean().describe(
      "Optional. Determines whether messages with no header are allowed.",
    ).optional(),
    schema: z.object({
      ignoreMinOccurs: z.boolean().describe(
        "Optional. Flag to ignore all min_occurs restrictions in the schema. This means that incoming messages can omit any group, segment, field, component, or subcomponent.",
      ).optional(),
      schemas: z.array(z.object({
        messageSchemaConfigs: z.record(z.string(), z.unknown()).describe(
          "Map from each HL7v2 message type and trigger event pair, such as ADT_A04, to its schema configuration root group.",
        ).optional(),
        version: z.array(z.unknown()).describe(
          "Each VersionSource is tested and only if they all match is the schema used for the message.",
        ).optional(),
      })).describe(
        "Optional. Schema configs that are layered based on their VersionSources that match the incoming message. Schema configs present in higher indices override those in lower indices with the same message type and trigger event if their VersionSources all match an incoming message.",
      ).optional(),
      schematizedParsingType: z.enum([
        "SCHEMATIZED_PARSING_TYPE_UNSPECIFIED",
        "SOFT_FAIL",
        "HARD_FAIL",
      ]).describe(
        "Optional. Determines how messages that fail to parse are handled.",
      ).optional(),
      types: z.array(z.object({
        type: z.array(z.unknown()).describe("The HL7v2 type definitions.")
          .optional(),
        version: z.array(z.unknown()).describe(
          "The version selectors that this config applies to. A message must match ALL version sources to apply.",
        ).optional(),
      })).describe(
        "Optional. Schema type definitions that are layered based on their VersionSources that match the incoming message. Type definitions present in higher indices override those in lower indices with the same type name if their VersionSources all match an incoming message.",
      ).optional(),
      unexpectedSegmentHandling: z.enum([
        "UNEXPECTED_SEGMENT_HANDLING_MODE_UNSPECIFIED",
        "FAIL",
        "SKIP",
        "PARSE",
      ]).describe(
        "Optional. Determines how unexpected segments (segments not matched to the schema) are handled.",
      ).optional(),
    }).describe(
      "A schema package contains a set of schemas and type definitions.",
    ).optional(),
    segmentTerminator: z.string().describe(
      "Optional. Byte(s) to use as the segment terminator. If this is unset, '\\r' is used as segment terminator, matching the HL7 version 2 specification.",
    ).optional(),
    version: z.enum(["PARSER_VERSION_UNSPECIFIED", "V1", "V2", "V3"]).describe(
      "Immutable. Determines the version of both the default parser to be used when `schema` is not given, as well as the schematized parser used when `schema` is specified. This field is immutable after HL7v2 store creation.",
    ).optional(),
  }).describe(
    "The configuration for the parser. It determines how the server parses the messages.",
  ).optional(),
  rejectDuplicateMessage: z.boolean().describe(
    "Optional. Determines whether to reject duplicate messages. A duplicate message is a message with the same raw bytes as a message that has already been ingested/created in this HL7v2 store. The default value is false, meaning that the store accepts the duplicate messages and it also returns the same ACK message in the IngestMessageResponse as has been returned previously. Note that only one resource is created in the store. When this field is set to true, CreateMessage/IngestMessage requests with a duplicate message will be rejected by the store, and IngestMessageErrorDetail returns a NACK message upon rejection.",
  ).optional(),
  hl7V2StoreId: z.string().describe(
    "Required. The ID of the HL7v2 store that is being created. The string must match the following regex: `[\\p{L}\\p{N}_\\-\\.]{1,256}`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Healthcare Datasets.Hl7V2Stores. Registered at `@swamp/gcp/healthcare/datasets-hl7v2stores`. */
export const model = {
  type: "@swamp/gcp/healthcare/datasets-hl7v2stores",
  version: "2026.05.19.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents an HL7v2 store.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a hl7V2Stores",
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
        if (g["notificationConfigs"] !== undefined) {
          body["notificationConfigs"] = g["notificationConfigs"];
        }
        if (g["parserConfig"] !== undefined) {
          body["parserConfig"] = g["parserConfig"];
        }
        if (g["rejectDuplicateMessage"] !== undefined) {
          body["rejectDuplicateMessage"] = g["rejectDuplicateMessage"];
        }
        if (g["hl7V2StoreId"] !== undefined) {
          body["hl7V2StoreId"] = g["hl7V2StoreId"];
        }
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
      description: "Get a hl7V2Stores",
      arguments: z.object({
        identifier: z.string().describe("The name of the hl7V2Stores"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Update hl7V2Stores attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["notificationConfigs"] !== undefined) {
          body["notificationConfigs"] = g["notificationConfigs"];
        }
        if (g["parserConfig"] !== undefined) {
          body["parserConfig"] = g["parserConfig"];
        }
        if (g["rejectDuplicateMessage"] !== undefined) {
          body["rejectDuplicateMessage"] = g["rejectDuplicateMessage"];
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
      description: "Delete the hl7V2Stores",
      arguments: z.object({
        identifier: z.string().describe("The name of the hl7V2Stores"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync hl7V2Stores state from GCP",
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
          params["name"] = identifier;
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
    export: {
      description: "export",
      arguments: z.object({
        endTime: z.any().optional(),
        filter: z.any().optional(),
        gcsDestination: z.any().optional(),
        pubsubDestination: z.any().optional(),
        startTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["endTime"] !== undefined) body["endTime"] = args["endTime"];
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["gcsDestination"] !== undefined) {
          body["gcsDestination"] = args["gcsDestination"];
        }
        if (args["pubsubDestination"] !== undefined) {
          body["pubsubDestination"] = args["pubsubDestination"];
        }
        if (args["startTime"] !== undefined) {
          body["startTime"] = args["startTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "healthcare.projects.locations.datasets.hl7V2Stores.export",
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
    get_hl7v2store_metrics: {
      description: "get hl7v2store metrics",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "healthcare.projects.locations.datasets.hl7V2Stores.getHL7v2StoreMetrics",
            "path": "v1/{+name}:getHL7v2StoreMetrics",
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
        gcsSource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["gcsSource"] !== undefined) {
          body["gcsSource"] = args["gcsSource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "healthcare.projects.locations.datasets.hl7V2Stores.import",
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
    rollback: {
      description: "rollback",
      arguments: z.object({
        changeType: z.any().optional(),
        excludeRollbacks: z.any().optional(),
        filteringFields: z.any().optional(),
        force: z.any().optional(),
        inputGcsObject: z.any().optional(),
        resultGcsBucket: z.any().optional(),
        rollbackTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["changeType"] !== undefined) {
          body["changeType"] = args["changeType"];
        }
        if (args["excludeRollbacks"] !== undefined) {
          body["excludeRollbacks"] = args["excludeRollbacks"];
        }
        if (args["filteringFields"] !== undefined) {
          body["filteringFields"] = args["filteringFields"];
        }
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["inputGcsObject"] !== undefined) {
          body["inputGcsObject"] = args["inputGcsObject"];
        }
        if (args["resultGcsBucket"] !== undefined) {
          body["resultGcsBucket"] = args["resultGcsBucket"];
        }
        if (args["rollbackTime"] !== undefined) {
          body["rollbackTime"] = args["rollbackTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "healthcare.projects.locations.datasets.hl7V2Stores.rollback",
            "path": "v1/{+name}:rollback",
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
