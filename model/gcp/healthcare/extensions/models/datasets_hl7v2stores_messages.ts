// Auto-generated extension model for @swamp/gcp/healthcare/datasets-hl7v2stores-messages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Healthcare Datasets.Hl7V2Stores.Messages.
 *
 * A complete HL7v2 message. See [Introduction to HL7 Standards] (https://www.hl7.org/implement/standards/index.cfm?ref=common) for details on the standard.
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
  return `${parent}/messages/${shortName}`;
}

const BASE_URL = "https://healthcare.googleapis.com/";

const GET_CONFIG = {
  "id": "healthcare.projects.locations.datasets.hl7V2Stores.messages.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "healthcare.projects.locations.datasets.hl7V2Stores.messages.create",
  "path": "v1/{+parent}/messages",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "healthcare.projects.locations.datasets.hl7V2Stores.messages.patch",
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
  "id": "healthcare.projects.locations.datasets.hl7V2Stores.messages.delete",
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
  message: z.object({
    createTime: z.string().describe(
      "Output only. The datetime when the message was created. Set by the server.",
    ).optional(),
    data: z.string().describe("Required. Raw message bytes.").optional(),
    labels: z.record(z.string(), z.string()).describe(
      "User-supplied key-value pairs used to organize HL7v2 stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} No more than 64 labels can be associated with a given store.",
    ).optional(),
    messageType: z.string().describe(
      "Output only. The message type for this message. MSH-9.1.",
    ).optional(),
    name: z.string().describe(
      "Output only. Resource name of the Message, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7_v2_store_id}/messages/{message_id}`.",
    ).optional(),
    parsedData: z.object({
      segments: z.array(z.object({
        fields: z.record(z.string(), z.unknown()).describe(
          'A mapping from the positional location to the value. The key string uses zero-based indexes separated by dots to identify Fields, components and sub-components. A bracket notation is also used to identify different instances of a repeated field. Regex for key: (\\d+)(\\[\\d+\\])?(.\\d+)?(.\\d+)? Examples of (key, value) pairs: * (0.1, "hemoglobin") denotes that the first component of Field 0 has the value "hemoglobin". * (1.1.2, "CBC") denotes that the second sub-component of the first component of Field 1 has the value "CBC". * (1[0].1, "HbA1c") denotes that the first component of the first Instance of Field 1, which is repeated, has the value "HbA1c".',
        ).optional(),
        segmentId: z.string().describe(
          "A string that indicates the type of segment. For example, EVN or PID.",
        ).optional(),
        setId: z.string().describe(
          "Set ID for segments that can be in a set. This can be empty if it's missing or isn't applicable.",
        ).optional(),
      })).optional(),
    }).describe("The content of a HL7v2 message in a structured format.")
      .optional(),
    patientIds: z.array(z.object({
      type: z.string().describe("ID type. For example, MRN or NHS.").optional(),
      value: z.string().describe("The patient's unique identifier.").optional(),
    })).describe(
      "Output only. All patient IDs listed in the PID-2, PID-3, and PID-4 segments of this message.",
    ).optional(),
    schematizedData: z.object({
      data: z.string().describe("JSON output of the parser.").optional(),
      error: z.string().describe("The error output of the parser.").optional(),
    }).describe(
      "The content of an HL7v2 message in a structured format as specified by a schema.",
    ).optional(),
    sendFacility: z.string().describe(
      "Output only. The hospital that this message came from. MSH-4.",
    ).optional(),
    sendTime: z.string().describe(
      "Output only. The datetime the sending application sent this message. MSH-7.",
    ).optional(),
  }).describe(
    "A complete HL7v2 message. See [Introduction to HL7 Standards] (https://www.hl7.org/implement/standards/index.cfm?ref=common) for details on the standard.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The datetime when the message was created. Set by the server.",
  ).optional(),
  data: z.string().describe("Required. Raw message bytes.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-supplied key-value pairs used to organize HL7v2 stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} No more than 64 labels can be associated with a given store.",
  ).optional(),
  messageType: z.string().describe(
    "Output only. The message type for this message. MSH-9.1.",
  ).optional(),
  name: z.string().describe(
    "Output only. Resource name of the Message, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7_v2_store_id}/messages/{message_id}`.",
  ).optional(),
  parsedData: z.object({
    segments: z.array(z.object({
      fields: z.record(z.string(), z.string()).describe(
        'A mapping from the positional location to the value. The key string uses zero-based indexes separated by dots to identify Fields, components and sub-components. A bracket notation is also used to identify different instances of a repeated field. Regex for key: (\\d+)(\\[\\d+\\])?(.\\d+)?(.\\d+)? Examples of (key, value) pairs: * (0.1, "hemoglobin") denotes that the first component of Field 0 has the value "hemoglobin". * (1.1.2, "CBC") denotes that the second sub-component of the first component of Field 1 has the value "CBC". * (1[0].1, "HbA1c") denotes that the first component of the first Instance of Field 1, which is repeated, has the value "HbA1c".',
      ).optional(),
      segmentId: z.string().describe(
        "A string that indicates the type of segment. For example, EVN or PID.",
      ).optional(),
      setId: z.string().describe(
        "Set ID for segments that can be in a set. This can be empty if it's missing or isn't applicable.",
      ).optional(),
    })).optional(),
  }).describe("The content of a HL7v2 message in a structured format.")
    .optional(),
  patientIds: z.array(z.object({
    type: z.string().describe("ID type. For example, MRN or NHS.").optional(),
    value: z.string().describe("The patient's unique identifier.").optional(),
  })).describe(
    "Output only. All patient IDs listed in the PID-2, PID-3, and PID-4 segments of this message.",
  ).optional(),
  schematizedData: z.object({
    data: z.string().describe("JSON output of the parser.").optional(),
    error: z.string().describe("The error output of the parser.").optional(),
  }).describe(
    "The content of an HL7v2 message in a structured format as specified by a schema.",
  ).optional(),
  sendFacility: z.string().describe(
    "Output only. The hospital that this message came from. MSH-4.",
  ).optional(),
  sendTime: z.string().describe(
    "Output only. The datetime the sending application sent this message. MSH-7.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  data: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  messageType: z.string().optional(),
  name: z.string(),
  parsedData: z.object({
    segments: z.array(z.object({
      fields: z.record(z.string(), z.unknown()),
      segmentId: z.string(),
      setId: z.string(),
    })),
  }).optional(),
  patientIds: z.array(z.object({
    type: z.string(),
    value: z.string(),
  })).optional(),
  schematizedData: z.object({
    data: z.string(),
    error: z.string(),
  }).optional(),
  sendFacility: z.string().optional(),
  sendTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  message: z.object({
    createTime: z.string().describe(
      "Output only. The datetime when the message was created. Set by the server.",
    ).optional(),
    data: z.string().describe("Required. Raw message bytes.").optional(),
    labels: z.record(z.string(), z.string()).describe(
      "User-supplied key-value pairs used to organize HL7v2 stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} No more than 64 labels can be associated with a given store.",
    ).optional(),
    messageType: z.string().describe(
      "Output only. The message type for this message. MSH-9.1.",
    ).optional(),
    name: z.string().describe(
      "Output only. Resource name of the Message, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7_v2_store_id}/messages/{message_id}`.",
    ).optional(),
    parsedData: z.object({
      segments: z.array(z.object({
        fields: z.record(z.string(), z.unknown()).describe(
          'A mapping from the positional location to the value. The key string uses zero-based indexes separated by dots to identify Fields, components and sub-components. A bracket notation is also used to identify different instances of a repeated field. Regex for key: (\\d+)(\\[\\d+\\])?(.\\d+)?(.\\d+)? Examples of (key, value) pairs: * (0.1, "hemoglobin") denotes that the first component of Field 0 has the value "hemoglobin". * (1.1.2, "CBC") denotes that the second sub-component of the first component of Field 1 has the value "CBC". * (1[0].1, "HbA1c") denotes that the first component of the first Instance of Field 1, which is repeated, has the value "HbA1c".',
        ).optional(),
        segmentId: z.string().describe(
          "A string that indicates the type of segment. For example, EVN or PID.",
        ).optional(),
        setId: z.string().describe(
          "Set ID for segments that can be in a set. This can be empty if it's missing or isn't applicable.",
        ).optional(),
      })).optional(),
    }).describe("The content of a HL7v2 message in a structured format.")
      .optional(),
    patientIds: z.array(z.object({
      type: z.string().describe("ID type. For example, MRN or NHS.").optional(),
      value: z.string().describe("The patient's unique identifier.").optional(),
    })).describe(
      "Output only. All patient IDs listed in the PID-2, PID-3, and PID-4 segments of this message.",
    ).optional(),
    schematizedData: z.object({
      data: z.string().describe("JSON output of the parser.").optional(),
      error: z.string().describe("The error output of the parser.").optional(),
    }).describe(
      "The content of an HL7v2 message in a structured format as specified by a schema.",
    ).optional(),
    sendFacility: z.string().describe(
      "Output only. The hospital that this message came from. MSH-4.",
    ).optional(),
    sendTime: z.string().describe(
      "Output only. The datetime the sending application sent this message. MSH-7.",
    ).optional(),
  }).describe(
    "A complete HL7v2 message. See [Introduction to HL7 Standards] (https://www.hl7.org/implement/standards/index.cfm?ref=common) for details on the standard.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The datetime when the message was created. Set by the server.",
  ).optional(),
  data: z.string().describe("Required. Raw message bytes.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-supplied key-value pairs used to organize HL7v2 stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \\p{Ll}\\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} No more than 64 labels can be associated with a given store.",
  ).optional(),
  messageType: z.string().describe(
    "Output only. The message type for this message. MSH-9.1.",
  ).optional(),
  name: z.string().describe(
    "Output only. Resource name of the Message, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7_v2_store_id}/messages/{message_id}`.",
  ).optional(),
  parsedData: z.object({
    segments: z.array(z.object({
      fields: z.record(z.string(), z.string()).describe(
        'A mapping from the positional location to the value. The key string uses zero-based indexes separated by dots to identify Fields, components and sub-components. A bracket notation is also used to identify different instances of a repeated field. Regex for key: (\\d+)(\\[\\d+\\])?(.\\d+)?(.\\d+)? Examples of (key, value) pairs: * (0.1, "hemoglobin") denotes that the first component of Field 0 has the value "hemoglobin". * (1.1.2, "CBC") denotes that the second sub-component of the first component of Field 1 has the value "CBC". * (1[0].1, "HbA1c") denotes that the first component of the first Instance of Field 1, which is repeated, has the value "HbA1c".',
      ).optional(),
      segmentId: z.string().describe(
        "A string that indicates the type of segment. For example, EVN or PID.",
      ).optional(),
      setId: z.string().describe(
        "Set ID for segments that can be in a set. This can be empty if it's missing or isn't applicable.",
      ).optional(),
    })).optional(),
  }).describe("The content of a HL7v2 message in a structured format.")
    .optional(),
  patientIds: z.array(z.object({
    type: z.string().describe("ID type. For example, MRN or NHS.").optional(),
    value: z.string().describe("The patient's unique identifier.").optional(),
  })).describe(
    "Output only. All patient IDs listed in the PID-2, PID-3, and PID-4 segments of this message.",
  ).optional(),
  schematizedData: z.object({
    data: z.string().describe("JSON output of the parser.").optional(),
    error: z.string().describe("The error output of the parser.").optional(),
  }).describe(
    "The content of an HL7v2 message in a structured format as specified by a schema.",
  ).optional(),
  sendFacility: z.string().describe(
    "Output only. The hospital that this message came from. MSH-4.",
  ).optional(),
  sendTime: z.string().describe(
    "Output only. The datetime the sending application sent this message. MSH-7.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Healthcare Datasets.Hl7V2Stores.Messages. Registered at `@swamp/gcp/healthcare/datasets-hl7v2stores-messages`. */
export const model = {
  type: "@swamp/gcp/healthcare/datasets-hl7v2stores-messages",
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
        "A complete HL7v2 message. See [Introduction to HL7 Standards] (https://www.hl...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a messages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["message"] !== undefined) body["message"] = g["message"];
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
      description: "Get a messages",
      arguments: z.object({
        identifier: z.string().describe("The name of the messages"),
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
      description: "Update messages attributes",
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
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["data"] !== undefined) body["data"] = g["data"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["messageType"] !== undefined) {
          body["messageType"] = g["messageType"];
        }
        if (g["parsedData"] !== undefined) body["parsedData"] = g["parsedData"];
        if (g["patientIds"] !== undefined) body["patientIds"] = g["patientIds"];
        if (g["schematizedData"] !== undefined) {
          body["schematizedData"] = g["schematizedData"];
        }
        if (g["sendFacility"] !== undefined) {
          body["sendFacility"] = g["sendFacility"];
        }
        if (g["sendTime"] !== undefined) body["sendTime"] = g["sendTime"];
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
      description: "Delete the messages",
      arguments: z.object({
        identifier: z.string().describe("The name of the messages"),
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
      description: "Sync messages state from GCP",
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
    ingest: {
      description: "ingest",
      arguments: z.object({
        message: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["message"] !== undefined) body["message"] = args["message"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "healthcare.projects.locations.datasets.hl7V2Stores.messages.ingest",
            "path": "v1/{+parent}/messages:ingest",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
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
