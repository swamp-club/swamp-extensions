// Auto-generated extension model for @swamp/gcp/analyticsadmin/properties-datastreams
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Admin Properties.DataStreams.
 *
 * A resource message representing a data stream.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/dataStreams/${shortName}`;
}

const BASE_URL = "https://analyticsadmin.googleapis.com/";

const GET_CONFIG = {
  "id": "analyticsadmin.properties.dataStreams.get",
  "path": "v1beta/{+name}",
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
  "id": "analyticsadmin.properties.dataStreams.create",
  "path": "v1beta/{+parent}/dataStreams",
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
  "id": "analyticsadmin.properties.dataStreams.patch",
  "path": "v1beta/{+name}",
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
  "id": "analyticsadmin.properties.dataStreams.delete",
  "path": "v1beta/{+name}",
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

const LIST_CONFIG = {
  "id": "analyticsadmin.properties.dataStreams.list",
  "path": "v1beta/{+parent}/dataStreams",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  androidAppStreamData: z.object({
    firebaseAppId: z.string().describe(
      "Output only. ID of the corresponding Android app in Firebase, if any. This ID can change if the Android app is deleted and recreated.",
    ).optional(),
    packageName: z.string().describe(
      'Immutable. The package name for the app being measured. Example: "com.example.myandroidapp"',
    ).optional(),
  }).describe("Data specific to Android app streams.").optional(),
  displayName: z.string().describe(
    "Human-readable display name for the Data Stream. Required for web data streams. The max allowed display name length is 255 UTF-16 code units.",
  ).optional(),
  iosAppStreamData: z.object({
    bundleId: z.string().describe(
      'Required. Immutable. The Apple App Store Bundle ID for the app Example: "com.example.myiosapp"',
    ).optional(),
    firebaseAppId: z.string().describe(
      "Output only. ID of the corresponding iOS app in Firebase, if any. This ID can change if the iOS app is deleted and recreated.",
    ).optional(),
  }).describe("Data specific to iOS app streams.").optional(),
  name: z.string().describe(
    'Identifier. Resource name of this Data Stream. Format: properties/{property_id}/dataStreams/{stream_id} Example: "properties/1000/dataStreams/2000"',
  ).optional(),
  type: z.enum([
    "DATA_STREAM_TYPE_UNSPECIFIED",
    "WEB_DATA_STREAM",
    "ANDROID_APP_DATA_STREAM",
    "IOS_APP_DATA_STREAM",
  ]).describe("Required. Immutable. The type of this DataStream resource.")
    .optional(),
  webStreamData: z.object({
    defaultUri: z.string().describe(
      'Domain name of the web app being measured, or empty. Example: "http://www.google.com", "https://www.google.com"',
    ).optional(),
    firebaseAppId: z.string().describe(
      "Output only. ID of the corresponding web app in Firebase, if any. This ID can change if the web app is deleted and recreated.",
    ).optional(),
    measurementId: z.string().describe(
      'Output only. Analytics Measurement ID. Example: "G-1A2BCD345E"',
    ).optional(),
  }).describe("Data specific to web streams.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  androidAppStreamData: z.object({
    firebaseAppId: z.string(),
    packageName: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  iosAppStreamData: z.object({
    bundleId: z.string(),
    firebaseAppId: z.string(),
  }).optional(),
  name: z.string(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
  webStreamData: z.object({
    defaultUri: z.string(),
    firebaseAppId: z.string(),
    measurementId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  androidAppStreamData: z.object({
    firebaseAppId: z.string().describe(
      "Output only. ID of the corresponding Android app in Firebase, if any. This ID can change if the Android app is deleted and recreated.",
    ).optional(),
    packageName: z.string().describe(
      'Immutable. The package name for the app being measured. Example: "com.example.myandroidapp"',
    ).optional(),
  }).describe("Data specific to Android app streams.").optional(),
  displayName: z.string().describe(
    "Human-readable display name for the Data Stream. Required for web data streams. The max allowed display name length is 255 UTF-16 code units.",
  ).optional(),
  iosAppStreamData: z.object({
    bundleId: z.string().describe(
      'Required. Immutable. The Apple App Store Bundle ID for the app Example: "com.example.myiosapp"',
    ).optional(),
    firebaseAppId: z.string().describe(
      "Output only. ID of the corresponding iOS app in Firebase, if any. This ID can change if the iOS app is deleted and recreated.",
    ).optional(),
  }).describe("Data specific to iOS app streams.").optional(),
  name: z.string().describe(
    'Identifier. Resource name of this Data Stream. Format: properties/{property_id}/dataStreams/{stream_id} Example: "properties/1000/dataStreams/2000"',
  ).optional(),
  type: z.enum([
    "DATA_STREAM_TYPE_UNSPECIFIED",
    "WEB_DATA_STREAM",
    "ANDROID_APP_DATA_STREAM",
    "IOS_APP_DATA_STREAM",
  ]).describe("Required. Immutable. The type of this DataStream resource.")
    .optional(),
  webStreamData: z.object({
    defaultUri: z.string().describe(
      'Domain name of the web app being measured, or empty. Example: "http://www.google.com", "https://www.google.com"',
    ).optional(),
    firebaseAppId: z.string().describe(
      "Output only. ID of the corresponding web app in Firebase, if any. This ID can change if the web app is deleted and recreated.",
    ).optional(),
    measurementId: z.string().describe(
      'Output only. Analytics Measurement ID. Example: "G-1A2BCD345E"',
    ).optional(),
  }).describe("Data specific to web streams.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Admin Properties.DataStreams. Registered at `@swamp/gcp/analyticsadmin/properties-datastreams`. */
export const model = {
  type: "@swamp/gcp/analyticsadmin/properties-datastreams",
  version: "2026.05.26.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A resource message representing a data stream.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dataStreams",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["androidAppStreamData"] !== undefined) {
          body["androidAppStreamData"] = g["androidAppStreamData"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["iosAppStreamData"] !== undefined) {
          body["iosAppStreamData"] = g["iosAppStreamData"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["webStreamData"] !== undefined) {
          body["webStreamData"] = g["webStreamData"];
        }
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a dataStreams",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataStreams"),
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
    update: {
      description: "Update dataStreams attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["androidAppStreamData"] !== undefined) {
          body["androidAppStreamData"] = g["androidAppStreamData"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["iosAppStreamData"] !== undefined) {
          body["iosAppStreamData"] = g["iosAppStreamData"];
        }
        if (g["webStreamData"] !== undefined) {
          body["webStreamData"] = g["webStreamData"];
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
      description: "Delete the dataStreams",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataStreams"),
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
      description: "Sync dataStreams state from GCP",
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
    list: {
      description: "List dataStreams resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum).",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "dataStreams",
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
  },
};
