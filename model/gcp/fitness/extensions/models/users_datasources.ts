// Auto-generated extension model for @swamp/gcp/fitness/users-datasources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Fitness Users.DataSources.
 *
 * Definition of a unique source of sensor data. Data sources can expose raw data coming from hardware sensors on local or companion devices. They can also expose derived data, created by transforming or merging other data sources. Multiple data sources can exist for the same data type. Every data point inserted into or read from this service has an associated data source. The data source contains enough information to uniquely identify its data, including the hardware device and the application that collected and/or transformed the data. It also holds useful metadata, such as the hardware and application versions, and the device type. Each data source produces a unique stream of data, with a unique identifier. Not all changes to data source affect the stream identifier, so that data collected by updated versions of the same application/device can still be considered to belong to the same data stream.
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

const BASE_URL = "https://fitness.googleapis.com/fitness/v1/users/";

const GET_CONFIG = {
  "id": "fitness.users.dataSources.get",
  "path": "{userId}/dataSources/{dataSourceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "dataSourceId",
  ],
  "parameters": {
    "dataSourceId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "fitness.users.dataSources.create",
  "path": "{userId}/dataSources",
  "httpMethod": "POST",
  "parameterOrder": [
    "userId",
  ],
  "parameters": {
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "fitness.users.dataSources.update",
  "path": "{userId}/dataSources/{dataSourceId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "userId",
    "dataSourceId",
  ],
  "parameters": {
    "dataSourceId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "fitness.users.dataSources.delete",
  "path": "{userId}/dataSources/{dataSourceId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "userId",
    "dataSourceId",
  ],
  "parameters": {
    "dataSourceId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  application: z.object({
    detailsUrl: z.string().describe(
      "An optional URI that can be used to link back to the application.",
    ).optional(),
    name: z.string().describe(
      "The name of this application. This is required for REST clients, but we do not enforce uniqueness of this name. It is provided as a matter of convenience for other developers who would like to identify which REST created an Application or Data Source.",
    ).optional(),
    packageName: z.string().describe(
      "Package name for this application. This is used as a unique identifier when created by Android applications, but cannot be specified by REST clients. REST clients will have their developer project number reflected into the Data Source data stream IDs, instead of the packageName.",
    ).optional(),
    version: z.string().describe(
      "Version of the application. You should update this field whenever the application changes in a way that affects the computation of the data.",
    ).optional(),
  }).optional(),
  dataStreamId: z.string().describe(
    "A unique identifier for the data stream produced by this data source. The identifier includes: - The physical device's manufacturer, model, and serial number (UID). - The application's package name or name. Package name is used when the data source was created by an Android application. The developer project number is used when the data source was created by a REST client. - The data source's type. - The data source's stream name. Note that not all attributes of the data source are used as part of the stream identifier. In particular, the version of the hardware/the application isn't used. This allows us to preserve the same stream through version updates. This also means that two DataSource objects may represent the same data stream even if they're not equal. The exact format of the data stream ID created by an Android application is: type:dataType.name:application.packageName:device.manufacturer:device.model:device.uid:dataStreamName The exact format of the data stream ID created by a REST client is: type:dataType.name:developer project number:device.manufacturer:device.model:device.uid:dataStreamName When any of the optional fields that make up the data stream ID are absent, they will be omitted from the data stream ID. The minimum viable data stream ID would be: type:dataType.name:developer project number Finally, the developer project number and device UID are obfuscated when read by any REST or Android client that did not create the data source. Only the data source creator will see the developer project number in clear and normal form. This means a client will see a different set of data_stream_ids than another client with different credentials.",
  ).optional(),
  dataStreamName: z.string().describe(
    "The stream name uniquely identifies this particular data source among other data sources of the same type from the same underlying producer. Setting the stream name is optional, but should be done whenever an application exposes two streams for the same data type, or when a device has two equivalent sensors.",
  ).optional(),
  dataType: z.object({
    field: z.array(z.object({
      format: z.enum([
        "integer",
        "floatPoint",
        "string",
        "map",
        "integerList",
        "floatList",
        "blob",
      ]).describe(
        "The different supported formats for each field in a data type.",
      ).optional(),
      name: z.string().describe(
        "Defines the name and format of data. Unlike data type names, field names are not namespaced, and only need to be unique within the data type.",
      ).optional(),
      optional: z.boolean().optional(),
    })).describe("A field represents one dimension of a data type.").optional(),
    name: z.string().describe(
      "Each data type has a unique, namespaced, name. All data types in the com.google namespace are shared as part of the platform.",
    ).optional(),
  }).optional(),
  device: z.object({
    manufacturer: z.string().describe("Manufacturer of the product/hardware.")
      .optional(),
    model: z.string().describe("End-user visible model name for the device.")
      .optional(),
    type: z.enum([
      "unknown",
      "phone",
      "tablet",
      "watch",
      "chestStrap",
      "scale",
      "headMounted",
      "smartDisplay",
    ]).describe("A constant representing the type of the device.").optional(),
    uid: z.string().describe(
      "The serial number or other unique ID for the hardware. This field is obfuscated when read by any REST or Android client that did not create the data source. Only the data source creator will see the uid field in clear and normal form. The obfuscation preserves equality; that is, given two IDs, if id1 == id2, obfuscated(id1) == obfuscated(id2).",
    ).optional(),
    version: z.string().describe(
      "Version string for the device hardware/software.",
    ).optional(),
  }).describe(
    "Representation of an integrated device (such as a phone or a wearable) that can hold sensors. Each sensor is exposed as a data source. The main purpose of the device information contained in this class is to identify the hardware of a particular data source. This can be useful in different ways, including: - Distinguishing two similar sensors on different devices (the step counter on two nexus 5 phones, for instance) - Display the source of data to the user (by using the device make / model) - Treat data differently depending on sensor type (accelerometers on a watch may give different patterns than those on a phone) - Build different analysis models for each device/version.",
  ).optional(),
  type: z.enum(["raw", "derived"]).describe(
    "A constant describing the type of this data source. Indicates whether this data source produces raw or derived data.",
  ),
  userId: z.string().describe(
    "Create the data source for the person identified. Use me to indicate the authenticated user. Only me is supported at this time.",
  ),
});

const StateSchema = z.object({
  application: z.object({
    detailsUrl: z.string(),
    name: z.string(),
    packageName: z.string(),
    version: z.string(),
  }).optional(),
  dataQualityStandard: z.array(z.string()).optional(),
  dataStreamId: z.string().optional(),
  dataStreamName: z.string().optional(),
  dataType: z.object({
    field: z.array(z.object({
      format: z.string(),
      name: z.string(),
      optional: z.boolean(),
    })),
    name: z.string(),
  }).optional(),
  device: z.object({
    manufacturer: z.string(),
    model: z.string(),
    type: z.string(),
    uid: z.string(),
    version: z.string(),
  }).optional(),
  name: z.string(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  application: z.object({
    detailsUrl: z.string().describe(
      "An optional URI that can be used to link back to the application.",
    ).optional(),
    name: z.string().describe(
      "The name of this application. This is required for REST clients, but we do not enforce uniqueness of this name. It is provided as a matter of convenience for other developers who would like to identify which REST created an Application or Data Source.",
    ).optional(),
    packageName: z.string().describe(
      "Package name for this application. This is used as a unique identifier when created by Android applications, but cannot be specified by REST clients. REST clients will have their developer project number reflected into the Data Source data stream IDs, instead of the packageName.",
    ).optional(),
    version: z.string().describe(
      "Version of the application. You should update this field whenever the application changes in a way that affects the computation of the data.",
    ).optional(),
  }).optional(),
  dataStreamId: z.string().describe(
    "A unique identifier for the data stream produced by this data source. The identifier includes: - The physical device's manufacturer, model, and serial number (UID). - The application's package name or name. Package name is used when the data source was created by an Android application. The developer project number is used when the data source was created by a REST client. - The data source's type. - The data source's stream name. Note that not all attributes of the data source are used as part of the stream identifier. In particular, the version of the hardware/the application isn't used. This allows us to preserve the same stream through version updates. This also means that two DataSource objects may represent the same data stream even if they're not equal. The exact format of the data stream ID created by an Android application is: type:dataType.name:application.packageName:device.manufacturer:device.model:device.uid:dataStreamName The exact format of the data stream ID created by a REST client is: type:dataType.name:developer project number:device.manufacturer:device.model:device.uid:dataStreamName When any of the optional fields that make up the data stream ID are absent, they will be omitted from the data stream ID. The minimum viable data stream ID would be: type:dataType.name:developer project number Finally, the developer project number and device UID are obfuscated when read by any REST or Android client that did not create the data source. Only the data source creator will see the developer project number in clear and normal form. This means a client will see a different set of data_stream_ids than another client with different credentials.",
  ).optional(),
  dataStreamName: z.string().describe(
    "The stream name uniquely identifies this particular data source among other data sources of the same type from the same underlying producer. Setting the stream name is optional, but should be done whenever an application exposes two streams for the same data type, or when a device has two equivalent sensors.",
  ).optional(),
  dataType: z.object({
    field: z.array(z.object({
      format: z.enum([
        "integer",
        "floatPoint",
        "string",
        "map",
        "integerList",
        "floatList",
        "blob",
      ]).describe(
        "The different supported formats for each field in a data type.",
      ).optional(),
      name: z.string().describe(
        "Defines the name and format of data. Unlike data type names, field names are not namespaced, and only need to be unique within the data type.",
      ).optional(),
      optional: z.boolean().optional(),
    })).describe("A field represents one dimension of a data type.").optional(),
    name: z.string().describe(
      "Each data type has a unique, namespaced, name. All data types in the com.google namespace are shared as part of the platform.",
    ).optional(),
  }).optional(),
  device: z.object({
    manufacturer: z.string().describe("Manufacturer of the product/hardware.")
      .optional(),
    model: z.string().describe("End-user visible model name for the device.")
      .optional(),
    type: z.enum([
      "unknown",
      "phone",
      "tablet",
      "watch",
      "chestStrap",
      "scale",
      "headMounted",
      "smartDisplay",
    ]).describe("A constant representing the type of the device.").optional(),
    uid: z.string().describe(
      "The serial number or other unique ID for the hardware. This field is obfuscated when read by any REST or Android client that did not create the data source. Only the data source creator will see the uid field in clear and normal form. The obfuscation preserves equality; that is, given two IDs, if id1 == id2, obfuscated(id1) == obfuscated(id2).",
    ).optional(),
    version: z.string().describe(
      "Version string for the device hardware/software.",
    ).optional(),
  }).describe(
    "Representation of an integrated device (such as a phone or a wearable) that can hold sensors. Each sensor is exposed as a data source. The main purpose of the device information contained in this class is to identify the hardware of a particular data source. This can be useful in different ways, including: - Distinguishing two similar sensors on different devices (the step counter on two nexus 5 phones, for instance) - Display the source of data to the user (by using the device make / model) - Treat data differently depending on sensor type (accelerometers on a watch may give different patterns than those on a phone) - Build different analysis models for each device/version.",
  ).optional(),
  type: z.enum(["raw", "derived"]).describe(
    "A constant describing the type of this data source. Indicates whether this data source produces raw or derived data.",
  ).optional(),
  userId: z.string().describe(
    "Create the data source for the person identified. Use me to indicate the authenticated user. Only me is supported at this time.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Fitness Users.DataSources. Registered at `@swamp/gcp/fitness/users-datasources`. */
export const model = {
  type: "@swamp/gcp/fitness/users-datasources",
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
        "Definition of a unique source of sensor data. Data sources can expose raw dat...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dataSources",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (g["application"] !== undefined) {
          body["application"] = g["application"];
        }
        if (g["dataStreamId"] !== undefined) {
          body["dataStreamId"] = g["dataStreamId"];
        }
        if (g["dataStreamName"] !== undefined) {
          body["dataStreamName"] = g["dataStreamName"];
        }
        if (g["dataType"] !== undefined) body["dataType"] = g["dataType"];
        if (g["device"] !== undefined) body["device"] = g["device"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["name"] !== undefined) params["dataSourceId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a dataSources",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataSources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["dataSourceId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update dataSources attributes",
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
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        else if (existing["userId"]) {
          params["userId"] = String(existing["userId"]);
        }
        params["dataSourceId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["application"] !== undefined) {
          body["application"] = g["application"];
        }
        if (g["dataStreamId"] !== undefined) {
          body["dataStreamId"] = g["dataStreamId"];
        }
        if (g["dataStreamName"] !== undefined) {
          body["dataStreamName"] = g["dataStreamName"];
        }
        if (g["dataType"] !== undefined) body["dataType"] = g["dataType"];
        if (g["device"] !== undefined) body["device"] = g["device"];
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the dataSources",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataSources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["dataSourceId"] = args.identifier;
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
      description: "Sync dataSources state from GCP",
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
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["dataSourceId"] = identifier;
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
