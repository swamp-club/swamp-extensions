// Auto-generated extension model for @swamp/gcp/dataplex/metadatafeeds
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex MetadataFeeds.
 *
 * MetadataFeed contains information related to the metadata feed.
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
  return `${parent}/metadataFeeds/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.metadataFeeds.get",
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
  "id": "dataplex.projects.locations.metadataFeeds.create",
  "path": "v1/{+parent}/metadataFeeds",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "metadataFeedId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataplex.projects.locations.metadataFeeds.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataplex.projects.locations.metadataFeeds.delete",
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
  filters: z.object({
    aspectTypes: z.array(z.string()).describe(
      "Optional. The aspect types that you want to listen to. Depending on how the aspect is attached to the entry, in the format: projects/{project_id_or_number}/locations/{location}/aspectTypes/{aspect_type_id}.",
    ).optional(),
    changeTypes: z.array(
      z.enum(["CHANGE_TYPE_UNSPECIFIED", "CREATE", "UPDATE", "DELETE"]),
    ).describe(
      "Optional. The type of change that you want to listen to. If not specified, all changes are published.",
    ).optional(),
    entryTypes: z.array(z.string()).describe(
      "Optional. The entry types that you want to listen to, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/entryTypes/{entry_type_id}. Only entries that belong to the specified entry types are published.",
    ).optional(),
  }).describe(
    "Filters defines the type of changes that you want to listen to. You can have multiple entry type filters and multiple aspect type filters. All of the entry type filters are OR'ed together. All of the aspect type filters are OR'ed together. All of the entry type filters and aspect type filters are AND'ed together.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the metadata feed, in the format projects/{project_id_or_number}/locations/{location_id}/metadataFeeds/{metadata_feed_id}.",
  ).optional(),
  pubsubTopic: z.string().describe(
    "Optional. The pubsub topic that you want the metadata feed messages to publish to. Please grant Dataplex service account the permission to publish messages to the topic. The service account is: service-{PROJECT_NUMBER}@gcp-sa-dataplex.iam.gserviceaccount.com.",
  ).optional(),
  scope: z.object({
    entryGroups: z.array(z.string()).describe(
      "Optional. The entry groups whose entries you want to listen to. Must be in the format: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}.",
    ).optional(),
    organizationLevel: z.boolean().describe(
      "Optional. Whether the metadata feed is at the organization-level. If true, all changes happened to the entries in the same organization as the feed are published. If false, you must specify a list of projects or a list of entry groups whose entries you want to listen to.The default is false.",
    ).optional(),
    projects: z.array(z.string()).describe(
      "Optional. The projects whose entries you want to listen to. Must be in the same organization as the feed. Must be in the format: projects/{project_id_or_number}.",
    ).optional(),
  }).describe(
    "Scope defines the scope of the metadata feed. Scopes are exclusive. Only one of the scopes can be specified.",
  ).optional(),
  metadataFeedId: z.string().describe(
    "Optional. The metadata job ID. If not provided, a unique ID is generated with the prefix metadata-job-.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  filters: z.object({
    aspectTypes: z.array(z.string()),
    changeTypes: z.array(z.string()),
    entryTypes: z.array(z.string()),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  pubsubTopic: z.string().optional(),
  scope: z.object({
    entryGroups: z.array(z.string()),
    organizationLevel: z.boolean(),
    projects: z.array(z.string()),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  filters: z.object({
    aspectTypes: z.array(z.string()).describe(
      "Optional. The aspect types that you want to listen to. Depending on how the aspect is attached to the entry, in the format: projects/{project_id_or_number}/locations/{location}/aspectTypes/{aspect_type_id}.",
    ).optional(),
    changeTypes: z.array(
      z.enum(["CHANGE_TYPE_UNSPECIFIED", "CREATE", "UPDATE", "DELETE"]),
    ).describe(
      "Optional. The type of change that you want to listen to. If not specified, all changes are published.",
    ).optional(),
    entryTypes: z.array(z.string()).describe(
      "Optional. The entry types that you want to listen to, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/entryTypes/{entry_type_id}. Only entries that belong to the specified entry types are published.",
    ).optional(),
  }).describe(
    "Filters defines the type of changes that you want to listen to. You can have multiple entry type filters and multiple aspect type filters. All of the entry type filters are OR'ed together. All of the aspect type filters are OR'ed together. All of the entry type filters and aspect type filters are AND'ed together.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the metadata feed, in the format projects/{project_id_or_number}/locations/{location_id}/metadataFeeds/{metadata_feed_id}.",
  ).optional(),
  pubsubTopic: z.string().describe(
    "Optional. The pubsub topic that you want the metadata feed messages to publish to. Please grant Dataplex service account the permission to publish messages to the topic. The service account is: service-{PROJECT_NUMBER}@gcp-sa-dataplex.iam.gserviceaccount.com.",
  ).optional(),
  scope: z.object({
    entryGroups: z.array(z.string()).describe(
      "Optional. The entry groups whose entries you want to listen to. Must be in the format: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}.",
    ).optional(),
    organizationLevel: z.boolean().describe(
      "Optional. Whether the metadata feed is at the organization-level. If true, all changes happened to the entries in the same organization as the feed are published. If false, you must specify a list of projects or a list of entry groups whose entries you want to listen to.The default is false.",
    ).optional(),
    projects: z.array(z.string()).describe(
      "Optional. The projects whose entries you want to listen to. Must be in the same organization as the feed. Must be in the format: projects/{project_id_or_number}.",
    ).optional(),
  }).describe(
    "Scope defines the scope of the metadata feed. Scopes are exclusive. Only one of the scopes can be specified.",
  ).optional(),
  metadataFeedId: z.string().describe(
    "Optional. The metadata job ID. If not provided, a unique ID is generated with the prefix metadata-job-.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataplex MetadataFeeds. Registered at `@swamp/gcp/dataplex/metadatafeeds`. */
export const model = {
  type: "@swamp/gcp/dataplex/metadatafeeds",
  version: "2026.05.18.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "MetadataFeed contains information related to the metadata feed.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a metadataFeeds",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["filters"] !== undefined) body["filters"] = g["filters"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pubsubTopic"] !== undefined) {
          body["pubsubTopic"] = g["pubsubTopic"];
        }
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["metadataFeedId"] !== undefined) {
          body["metadataFeedId"] = g["metadataFeedId"];
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
      description: "Get a metadataFeeds",
      arguments: z.object({
        identifier: z.string().describe("The name of the metadataFeeds"),
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
      description: "Update metadataFeeds attributes",
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
        if (g["filters"] !== undefined) body["filters"] = g["filters"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["pubsubTopic"] !== undefined) {
          body["pubsubTopic"] = g["pubsubTopic"];
        }
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
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
      description: "Delete the metadataFeeds",
      arguments: z.object({
        identifier: z.string().describe("The name of the metadataFeeds"),
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
      description: "Sync metadataFeeds state from GCP",
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
  },
};
