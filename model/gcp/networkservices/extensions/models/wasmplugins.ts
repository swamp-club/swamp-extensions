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

// Auto-generated extension model for @swamp/gcp/networkservices/wasmplugins
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Services WasmPlugins.
 *
 * `WasmPlugin` is a resource representing a service executing a customer-provided Wasm module.
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
  return `${parent}/wasmPlugins/${shortName}`;
}

const BASE_URL = "https://networkservices.googleapis.com/";

const GET_CONFIG = {
  "id": "networkservices.projects.locations.wasmPlugins.get",
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
  "id": "networkservices.projects.locations.wasmPlugins.create",
  "path": "v1/{+parent}/wasmPlugins",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "wasmPluginId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkservices.projects.locations.wasmPlugins.patch",
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
  "id": "networkservices.projects.locations.wasmPlugins.delete",
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

const LIST_CONFIG = {
  "id": "networkservices.projects.locations.wasmPlugins.list",
  "path": "v1/{+parent}/wasmPlugins",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  description: z.string().describe(
    "Optional. A human-readable description of the resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with the `WasmPlugin` resource. The format must comply with [the following requirements](/compute/docs/labeling-resources#requirements).",
  ).optional(),
  logConfig: z.object({
    enable: z.boolean().describe(
      "Optional. Specifies whether to enable logging for activity by this plugin. Defaults to `false`.",
    ).optional(),
    minLogLevel: z.enum([
      "LOG_LEVEL_UNSPECIFIED",
      "TRACE",
      "DEBUG",
      "INFO",
      "WARN",
      "ERROR",
      "CRITICAL",
    ]).describe(
      "Non-empty default. Specifies the lowest level of the plugin logs that are exported to Cloud Logging. This setting relates to the logs generated by using logging statements in your Wasm code. This field is can be set only if logging is enabled for the plugin. If the field is not provided when logging is enabled, it is set to `INFO` by default.",
    ).optional(),
    sampleRate: z.number().describe(
      "Non-empty default. Configures the sampling rate of activity logs, where `1.0` means all logged activity is reported and `0.0` means no activity is reported. A floating point value between `0.0` and `1.0` indicates that a percentage of log messages is stored. The default value when logging is enabled is `1.0`. The value of the field must be between `0` and `1` (inclusive). This field can be specified only if logging is enabled for this plugin.",
    ).optional(),
  }).describe(
    "Specifies the logging options for the activity performed by this plugin. If logging is enabled, plugin logs are exported to Cloud Logging.",
  ).optional(),
  mainVersionId: z.string().describe(
    "Optional. The ID of the `WasmPluginVersion` resource that is the currently serving one. The version referred to must be a child of this `WasmPlugin` resource.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `WasmPlugin` resource in the following format: `projects/{project}/locations/{location}/wasmPlugins/{wasm_plugin}`.",
  ).optional(),
  versions: z.record(
    z.string(),
    z.object({
      createTime: z.string().describe(
        "Output only. The timestamp when the resource was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. A human-readable description of the resource.",
      ).optional(),
      imageDigest: z.string().describe(
        "Output only. This field holds the digest (usually checksum) value for the plugin image. The value is calculated based on the `image_uri` field. If the `image_uri` field refers to a container image, the digest value is obtained from the container image. If the `image_uri` field refers to a generic artifact, the digest value is calculated based on the contents of the file.",
      ).optional(),
      imageUri: z.string().describe(
        "Optional. URI of the image containing the Wasm module, stored in Artifact Registry. The URI can refer to one of the following repository formats: * Container images: the `image_uri` must point to a container that contains a single file with the name `plugin.wasm`. When a new `WasmPluginVersion` resource is created, the digest of the image is saved in the `image_digest` field. When pulling a container image from Artifact Registry, the digest value is used instead of an image tag. * Generic artifacts: the `image_uri` must be in this format: `projects/{project}/locations/{location}/repositories/{repository}/ genericArtifacts/{package}:{version}`. The specified package and version must contain a file with the name `plugin.wasm`. When a new `WasmPluginVersion` resource is created, the checksum of the contents of the file is saved in the `image_digest` field.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. Set of labels associated with the `WasmPluginVersion` resource.",
      ).optional(),
      pluginConfigData: z.string().describe(
        "Configuration for the plugin. The configuration is provided to the plugin at runtime through the `ON_CONFIGURE` callback. When a new `WasmPluginVersion` version is created, the digest of the contents is saved in the `plugin_config_digest` field.",
      ).optional(),
      pluginConfigDigest: z.string().describe(
        "Output only. This field holds the digest (usually checksum) value for the plugin configuration. The value is calculated based on the contents of `plugin_config_data` field or the image defined by the `plugin_config_uri` field.",
      ).optional(),
      pluginConfigUri: z.string().describe(
        "URI of the plugin configuration stored in the Artifact Registry. The configuration is provided to the plugin at runtime through the `ON_CONFIGURE` callback. The URI can refer to one of the following repository formats: * Container images: the `plugin_config_uri` must point to a container that contains a single file with the name `plugin.config`. When a new `WasmPluginVersion` resource is created, the digest of the image is saved in the `plugin_config_digest` field. When pulling a container image from Artifact Registry, the digest value is used instead of an image tag. * Generic artifacts: the `plugin_config_uri` must be in this format: `projects/{project}/locations/{location}/repositories/{repository}/ genericArtifacts/{package}:{version}`. The specified package and version must contain a file with the name `plugin.config`. When a new `WasmPluginVersion` resource is created, the checksum of the contents of the file is saved in the `plugin_config_digest` field.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The timestamp when the resource was updated.",
      ).optional(),
    }),
  ).describe(
    "Optional. All versions of this `WasmPlugin` resource in the key-value format. The key is the resource ID, and the value is the `VersionDetails` object. Lets you create or update a `WasmPlugin` resource and its versions in a single request. When the `main_version_id` field is not empty, it must point to one of the `VersionDetails` objects in the map. If provided in a `PATCH` request, the new versions replace the previous set. Any version omitted from the `versions` field is removed. Because the `WasmPluginVersion` resource is immutable, if a `WasmPluginVersion` resource with the same name already exists and differs, the request fails. Note: In a `GET` request, this field is populated only if the field `GetWasmPluginRequest.view` is set to `WASM_PLUGIN_VIEW_FULL`.",
  ).optional(),
  wasmPluginId: z.string().describe(
    "Required. User-provided ID of the `WasmPlugin` resource to be created.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  logConfig: z.object({
    enable: z.boolean(),
    minLogLevel: z.string(),
    sampleRate: z.number(),
  }).optional(),
  mainVersionId: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
  usedBy: z.array(z.object({
    name: z.string(),
  })).optional(),
  versions: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe(
    "Optional. A human-readable description of the resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with the `WasmPlugin` resource. The format must comply with [the following requirements](/compute/docs/labeling-resources#requirements).",
  ).optional(),
  logConfig: z.object({
    enable: z.boolean().describe(
      "Optional. Specifies whether to enable logging for activity by this plugin. Defaults to `false`.",
    ).optional(),
    minLogLevel: z.enum([
      "LOG_LEVEL_UNSPECIFIED",
      "TRACE",
      "DEBUG",
      "INFO",
      "WARN",
      "ERROR",
      "CRITICAL",
    ]).describe(
      "Non-empty default. Specifies the lowest level of the plugin logs that are exported to Cloud Logging. This setting relates to the logs generated by using logging statements in your Wasm code. This field is can be set only if logging is enabled for the plugin. If the field is not provided when logging is enabled, it is set to `INFO` by default.",
    ).optional(),
    sampleRate: z.number().describe(
      "Non-empty default. Configures the sampling rate of activity logs, where `1.0` means all logged activity is reported and `0.0` means no activity is reported. A floating point value between `0.0` and `1.0` indicates that a percentage of log messages is stored. The default value when logging is enabled is `1.0`. The value of the field must be between `0` and `1` (inclusive). This field can be specified only if logging is enabled for this plugin.",
    ).optional(),
  }).describe(
    "Specifies the logging options for the activity performed by this plugin. If logging is enabled, plugin logs are exported to Cloud Logging.",
  ).optional(),
  mainVersionId: z.string().describe(
    "Optional. The ID of the `WasmPluginVersion` resource that is the currently serving one. The version referred to must be a child of this `WasmPlugin` resource.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `WasmPlugin` resource in the following format: `projects/{project}/locations/{location}/wasmPlugins/{wasm_plugin}`.",
  ).optional(),
  versions: z.record(
    z.string(),
    z.object({
      createTime: z.string().describe(
        "Output only. The timestamp when the resource was created.",
      ).optional(),
      description: z.string().describe(
        "Optional. A human-readable description of the resource.",
      ).optional(),
      imageDigest: z.string().describe(
        "Output only. This field holds the digest (usually checksum) value for the plugin image. The value is calculated based on the `image_uri` field. If the `image_uri` field refers to a container image, the digest value is obtained from the container image. If the `image_uri` field refers to a generic artifact, the digest value is calculated based on the contents of the file.",
      ).optional(),
      imageUri: z.string().describe(
        "Optional. URI of the image containing the Wasm module, stored in Artifact Registry. The URI can refer to one of the following repository formats: * Container images: the `image_uri` must point to a container that contains a single file with the name `plugin.wasm`. When a new `WasmPluginVersion` resource is created, the digest of the image is saved in the `image_digest` field. When pulling a container image from Artifact Registry, the digest value is used instead of an image tag. * Generic artifacts: the `image_uri` must be in this format: `projects/{project}/locations/{location}/repositories/{repository}/ genericArtifacts/{package}:{version}`. The specified package and version must contain a file with the name `plugin.wasm`. When a new `WasmPluginVersion` resource is created, the checksum of the contents of the file is saved in the `image_digest` field.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. Set of labels associated with the `WasmPluginVersion` resource.",
      ).optional(),
      pluginConfigData: z.string().describe(
        "Configuration for the plugin. The configuration is provided to the plugin at runtime through the `ON_CONFIGURE` callback. When a new `WasmPluginVersion` version is created, the digest of the contents is saved in the `plugin_config_digest` field.",
      ).optional(),
      pluginConfigDigest: z.string().describe(
        "Output only. This field holds the digest (usually checksum) value for the plugin configuration. The value is calculated based on the contents of `plugin_config_data` field or the image defined by the `plugin_config_uri` field.",
      ).optional(),
      pluginConfigUri: z.string().describe(
        "URI of the plugin configuration stored in the Artifact Registry. The configuration is provided to the plugin at runtime through the `ON_CONFIGURE` callback. The URI can refer to one of the following repository formats: * Container images: the `plugin_config_uri` must point to a container that contains a single file with the name `plugin.config`. When a new `WasmPluginVersion` resource is created, the digest of the image is saved in the `plugin_config_digest` field. When pulling a container image from Artifact Registry, the digest value is used instead of an image tag. * Generic artifacts: the `plugin_config_uri` must be in this format: `projects/{project}/locations/{location}/repositories/{repository}/ genericArtifacts/{package}:{version}`. The specified package and version must contain a file with the name `plugin.config`. When a new `WasmPluginVersion` resource is created, the checksum of the contents of the file is saved in the `plugin_config_digest` field.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The timestamp when the resource was updated.",
      ).optional(),
    }),
  ).describe(
    "Optional. All versions of this `WasmPlugin` resource in the key-value format. The key is the resource ID, and the value is the `VersionDetails` object. Lets you create or update a `WasmPlugin` resource and its versions in a single request. When the `main_version_id` field is not empty, it must point to one of the `VersionDetails` objects in the map. If provided in a `PATCH` request, the new versions replace the previous set. Any version omitted from the `versions` field is removed. Because the `WasmPluginVersion` resource is immutable, if a `WasmPluginVersion` resource with the same name already exists and differs, the request fails. Note: In a `GET` request, this field is populated only if the field `GetWasmPluginRequest.view` is set to `WASM_PLUGIN_VIEW_FULL`.",
  ).optional(),
  wasmPluginId: z.string().describe(
    "Required. User-provided ID of the `WasmPlugin` resource to be created.",
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

/** Swamp extension model for Google Cloud Network Services WasmPlugins. Registered at `@swamp/gcp/networkservices/wasmplugins`. */
export const model = {
  type: "@swamp/gcp/networkservices/wasmplugins",
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
      description:
        "`WasmPlugin` is a resource representing a service executing a customer-provid...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a wasmPlugins",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["logConfig"] !== undefined) body["logConfig"] = g["logConfig"];
        if (g["mainVersionId"] !== undefined) {
          body["mainVersionId"] = g["mainVersionId"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["versions"] !== undefined) body["versions"] = g["versions"];
        if (g["wasmPluginId"] !== undefined) {
          body["wasmPluginId"] = g["wasmPluginId"];
        }
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a wasmPlugins",
      arguments: z.object({
        identifier: z.string().describe("The name of the wasmPlugins"),
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
      description: "Update wasmPlugins attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["logConfig"] !== undefined) body["logConfig"] = g["logConfig"];
        if (g["mainVersionId"] !== undefined) {
          body["mainVersionId"] = g["mainVersionId"];
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
      description: "Delete the wasmPlugins",
      arguments: z.object({
        identifier: z.string().describe("The name of the wasmPlugins"),
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
      description: "Sync wasmPlugins state from GCP",
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
      description: "List wasmPlugins resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of `WasmPlugin` resources to return per call. If not specified, at most 50 `WasmPlugin` resources are returned. The maximum value is 1000; values above 1000 are coerced to 1000.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "wasmPlugins",
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
  },
};
