// Auto-generated extension model for @swamp/gcp/fitness/users-datasources-datasets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Fitness Users.DataSources.Datasets.
 *
 * A dataset represents a projection container for data points. They do not carry any info of their own. Datasets represent a set of data points from a particular data source. A data point can be found in more than one dataset.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://fitness.googleapis.com/fitness/v1/users/";

const GET_CONFIG = {
  "id": "fitness.users.dataSources.datasets.get",
  "path": "{userId}/dataSources/{dataSourceId}/datasets/{datasetId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "dataSourceId",
    "datasetId",
  ],
  "parameters": {
    "dataSourceId": {
      "location": "path",
      "required": true,
    },
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "limit": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "fitness.users.dataSources.datasets.patch",
  "path": "{userId}/dataSources/{dataSourceId}/datasets/{datasetId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "userId",
    "dataSourceId",
    "datasetId",
  ],
  "parameters": {
    "dataSourceId": {
      "location": "path",
      "required": true,
    },
    "datasetId": {
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
  "id": "fitness.users.dataSources.datasets.delete",
  "path": "{userId}/dataSources/{dataSourceId}/datasets/{datasetId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "userId",
    "dataSourceId",
    "datasetId",
  ],
  "parameters": {
    "dataSourceId": {
      "location": "path",
      "required": true,
    },
    "datasetId": {
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
  dataSourceId: z.string().describe(
    "The data stream ID of the data source that created the points in this dataset.",
  ).optional(),
  maxEndTimeNs: z.string().describe(
    "The largest end time of all data points in this possibly partial representation of the dataset. Time is in nanoseconds from epoch. This should also match the second part of the dataset identifier.",
  ).optional(),
  minStartTimeNs: z.string().describe(
    "The smallest start time of all data points in this possibly partial representation of the dataset. Time is in nanoseconds from epoch. This should also match the first part of the dataset identifier.",
  ).optional(),
  nextPageToken: z.string().describe(
    "This token will be set when a dataset is received in response to a GET request and the dataset is too large to be included in a single response. Provide this value in a subsequent GET request to return the next page of data points within this dataset.",
  ).optional(),
  point: z.array(z.object({
    computationTimeMillis: z.string().describe(
      "DO NOT USE THIS FIELD. It is ignored, and not stored.",
    ).optional(),
    dataTypeName: z.string().describe(
      "The data type defining the format of the values in this data point.",
    ).optional(),
    endTimeNanos: z.string().describe(
      "The end time of the interval represented by this data point, in nanoseconds since epoch.",
    ).optional(),
    modifiedTimeMillis: z.string().describe(
      "Indicates the last time this data point was modified. Useful only in contexts where we are listing the data changes, rather than representing the current state of the data.",
    ).optional(),
    originDataSourceId: z.string().describe(
      "If the data point is contained in a dataset for a derived data source, this field will be populated with the data source stream ID that created the data point originally. WARNING: do not rely on this field for anything other than debugging. The value of this field, if it is set at all, is an implementation detail and is not guaranteed to remain consistent.",
    ).optional(),
    rawTimestampNanos: z.string().describe(
      "The raw timestamp from the original SensorEvent.",
    ).optional(),
    startTimeNanos: z.string().describe(
      "The start time of the interval represented by this data point, in nanoseconds since epoch.",
    ).optional(),
    value: z.array(z.object({
      fpVal: z.number().describe(
        "Floating point value. When this is set, other values must not be set.",
      ).optional(),
      intVal: z.number().int().describe(
        "Integer value. When this is set, other values must not be set.",
      ).optional(),
      mapVal: z.array(z.unknown()).describe(
        "Map value. The valid key space and units for the corresponding value of each entry should be documented as part of the data type definition. Keys should be kept small whenever possible. Data streams with large keys and high data frequency may be down sampled.",
      ).optional(),
      stringVal: z.string().describe(
        "String value. When this is set, other values must not be set. Strings should be kept small whenever possible. Data streams with large string values and high data frequency may be down sampled.",
      ).optional(),
    })).describe(
      "Values of each data type field for the data point. It is expected that each value corresponding to a data type field will occur in the same order that the field is listed with in the data type specified in a data source. Only one of integer and floating point fields will be populated, depending on the format enum value within data source's type field.",
    ).optional(),
  })).describe(
    "A partial list of data points contained in the dataset, ordered by endTimeNanos. This list is considered complete when retrieving a small dataset and partial when patching a dataset or retrieving a dataset that is too large to include in a single response.",
  ).optional(),
});

const StateSchema = z.object({
  dataSourceId: z.string().optional(),
  maxEndTimeNs: z.string().optional(),
  minStartTimeNs: z.string().optional(),
  nextPageToken: z.string().optional(),
  point: z.array(z.object({
    computationTimeMillis: z.string(),
    dataTypeName: z.string(),
    endTimeNanos: z.string(),
    modifiedTimeMillis: z.string(),
    originDataSourceId: z.string(),
    rawTimestampNanos: z.string(),
    startTimeNanos: z.string(),
    value: z.array(z.object({
      fpVal: z.number(),
      intVal: z.number(),
      mapVal: z.array(z.unknown()),
      stringVal: z.string(),
    })),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  dataSourceId: z.string().describe(
    "The data stream ID of the data source that created the points in this dataset.",
  ).optional(),
  maxEndTimeNs: z.string().describe(
    "The largest end time of all data points in this possibly partial representation of the dataset. Time is in nanoseconds from epoch. This should also match the second part of the dataset identifier.",
  ).optional(),
  minStartTimeNs: z.string().describe(
    "The smallest start time of all data points in this possibly partial representation of the dataset. Time is in nanoseconds from epoch. This should also match the first part of the dataset identifier.",
  ).optional(),
  nextPageToken: z.string().describe(
    "This token will be set when a dataset is received in response to a GET request and the dataset is too large to be included in a single response. Provide this value in a subsequent GET request to return the next page of data points within this dataset.",
  ).optional(),
  point: z.array(z.object({
    computationTimeMillis: z.string().describe(
      "DO NOT USE THIS FIELD. It is ignored, and not stored.",
    ).optional(),
    dataTypeName: z.string().describe(
      "The data type defining the format of the values in this data point.",
    ).optional(),
    endTimeNanos: z.string().describe(
      "The end time of the interval represented by this data point, in nanoseconds since epoch.",
    ).optional(),
    modifiedTimeMillis: z.string().describe(
      "Indicates the last time this data point was modified. Useful only in contexts where we are listing the data changes, rather than representing the current state of the data.",
    ).optional(),
    originDataSourceId: z.string().describe(
      "If the data point is contained in a dataset for a derived data source, this field will be populated with the data source stream ID that created the data point originally. WARNING: do not rely on this field for anything other than debugging. The value of this field, if it is set at all, is an implementation detail and is not guaranteed to remain consistent.",
    ).optional(),
    rawTimestampNanos: z.string().describe(
      "The raw timestamp from the original SensorEvent.",
    ).optional(),
    startTimeNanos: z.string().describe(
      "The start time of the interval represented by this data point, in nanoseconds since epoch.",
    ).optional(),
    value: z.array(z.object({
      fpVal: z.number().describe(
        "Floating point value. When this is set, other values must not be set.",
      ).optional(),
      intVal: z.number().int().describe(
        "Integer value. When this is set, other values must not be set.",
      ).optional(),
      mapVal: z.array(z.unknown()).describe(
        "Map value. The valid key space and units for the corresponding value of each entry should be documented as part of the data type definition. Keys should be kept small whenever possible. Data streams with large keys and high data frequency may be down sampled.",
      ).optional(),
      stringVal: z.string().describe(
        "String value. When this is set, other values must not be set. Strings should be kept small whenever possible. Data streams with large string values and high data frequency may be down sampled.",
      ).optional(),
    })).describe(
      "Values of each data type field for the data point. It is expected that each value corresponding to a data type field will occur in the same order that the field is listed with in the data type specified in a data source. Only one of integer and floating point fields will be populated, depending on the format enum value within data source's type field.",
    ).optional(),
  })).describe(
    "A partial list of data points contained in the dataset, ordered by endTimeNanos. This list is considered complete when retrieving a small dataset and partial when patching a dataset or retrieving a dataset that is too large to include in a single response.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Fitness Users.DataSources.Datasets. Registered at `@swamp/gcp/fitness/users-datasources-datasets`. */
export const model = {
  type: "@swamp/gcp/fitness/users-datasources-datasets",
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
        "A dataset represents a projection container for data points. They do not carr...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a datasets",
      arguments: z.object({
        identifier: z.string().describe("The name of the datasets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["dataSourceId"] !== undefined) {
          params["dataSourceId"] = String(g["dataSourceId"]);
        }
        params["datasetId"] = args.identifier;
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
      description: "Update datasets attributes",
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
        if (g["dataSourceId"] !== undefined) {
          params["dataSourceId"] = String(g["dataSourceId"]);
        } else if (existing["dataSourceId"]) {
          params["dataSourceId"] = String(existing["dataSourceId"]);
        }
        params["datasetId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["maxEndTimeNs"] !== undefined) {
          body["maxEndTimeNs"] = g["maxEndTimeNs"];
        }
        if (g["minStartTimeNs"] !== undefined) {
          body["minStartTimeNs"] = g["minStartTimeNs"];
        }
        if (g["nextPageToken"] !== undefined) {
          body["nextPageToken"] = g["nextPageToken"];
        }
        if (g["point"] !== undefined) body["point"] = g["point"];
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
      description: "Delete the datasets",
      arguments: z.object({
        identifier: z.string().describe("The name of the datasets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["dataSourceId"] !== undefined) {
          params["dataSourceId"] = String(g["dataSourceId"]);
        }
        params["datasetId"] = args.identifier;
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
      description: "Sync datasets state from GCP",
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
          if (g["dataSourceId"] !== undefined) {
            params["dataSourceId"] = String(g["dataSourceId"]);
          } else if (existing["dataSourceId"]) {
            params["dataSourceId"] = String(existing["dataSourceId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["datasetId"] = identifier;
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
