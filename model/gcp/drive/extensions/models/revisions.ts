// Auto-generated extension model for @swamp/gcp/drive/revisions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Drive Revisions.
 *
 * The metadata for a revision to a file. Some resource methods (such as `revisions.update`) require a `revisionId`. Use the `revisions.list` method to retrieve the ID for a revision.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/drive/v3/";

const GET_CONFIG = {
  "id": "drive.revisions.get",
  "path": "files/{fileId}/revisions/{revisionId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
    "revisionId",
  ],
  "parameters": {
    "acknowledgeAbuse": {
      "location": "query",
    },
    "fileId": {
      "location": "path",
      "required": true,
    },
    "revisionId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "drive.revisions.update",
  "path": "files/{fileId}/revisions/{revisionId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "fileId",
    "revisionId",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
    "revisionId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "drive.revisions.delete",
  "path": "files/{fileId}/revisions/{revisionId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "fileId",
    "revisionId",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
    "revisionId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "drive.revisions.list",
  "path": "files/{fileId}/revisions",
  "httpMethod": "GET",
  "parameterOrder": [
    "fileId",
  ],
  "parameters": {
    "fileId": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  exportLinks: z.record(z.string(), z.string()).describe(
    "Output only. Links for exporting Docs Editors files to specific formats.",
  ).optional(),
  id: z.string().describe("Output only. The ID of the revision.").optional(),
  keepForever: z.boolean().describe(
    "Whether to keep this revision forever, even if it is no longer the head revision. If not set, the revision will be automatically purged 30 days after newer content is uploaded. This can be set on a maximum of 200 revisions for a file. This field is only applicable to files with binary content in Drive.",
  ).optional(),
  kind: z.string().describe(
    'Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#revision"`.',
  ).optional(),
  lastModifyingUser: z.object({
    displayName: z.string().describe(
      "Output only. A plain text displayable name for this user.",
    ).optional(),
    emailAddress: z.string().describe(
      "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
    ).optional(),
    kind: z.string().describe(
      "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
    ).optional(),
    me: z.boolean().describe(
      "Output only. Whether this user is the requesting user.",
    ).optional(),
    permissionId: z.string().describe(
      "Output only. The user's ID as visible in Permission resources.",
    ).optional(),
    photoLink: z.string().describe(
      "Output only. A link to the user's profile photo, if available.",
    ).optional(),
  }).describe("Information about a Drive user.").optional(),
  md5Checksum: z.string().describe(
    "Output only. The MD5 checksum of the revision's content. This is only applicable to files with binary content in Drive.",
  ).optional(),
  mimeType: z.string().describe("Output only. The MIME type of the revision.")
    .optional(),
  modifiedTime: z.string().describe(
    "The last time the revision was modified (RFC 3339 date-time).",
  ).optional(),
  originalFilename: z.string().describe(
    "Output only. The original filename used to create this revision. This is only applicable to files with binary content in Drive.",
  ).optional(),
  publishAuto: z.boolean().describe(
    "Whether subsequent revisions will be automatically republished. This is only applicable to Docs Editors files.",
  ).optional(),
  published: z.boolean().describe(
    "Whether this revision is published. This is only applicable to Docs Editors files.",
  ).optional(),
  publishedLink: z.string().describe(
    "Output only. A link to the published revision. This is only populated for Docs Editors files.",
  ).optional(),
  publishedOutsideDomain: z.boolean().describe(
    "Whether this revision is published outside the domain. This is only applicable to Docs Editors files.",
  ).optional(),
  size: z.string().describe(
    "Output only. The size of the revision's content in bytes. This is only applicable to files with binary content in Drive.",
  ).optional(),
});

const StateSchema = z.object({
  exportLinks: z.record(z.string(), z.unknown()).optional(),
  id: z.string().optional(),
  keepForever: z.boolean().optional(),
  kind: z.string().optional(),
  lastModifyingUser: z.object({
    displayName: z.string(),
    emailAddress: z.string(),
    kind: z.string(),
    me: z.boolean(),
    permissionId: z.string(),
    photoLink: z.string(),
  }).optional(),
  md5Checksum: z.string().optional(),
  mimeType: z.string().optional(),
  modifiedTime: z.string().optional(),
  originalFilename: z.string().optional(),
  publishAuto: z.boolean().optional(),
  published: z.boolean().optional(),
  publishedLink: z.string().optional(),
  publishedOutsideDomain: z.boolean().optional(),
  size: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  exportLinks: z.record(z.string(), z.string()).describe(
    "Output only. Links for exporting Docs Editors files to specific formats.",
  ).optional(),
  id: z.string().describe("Output only. The ID of the revision.").optional(),
  keepForever: z.boolean().describe(
    "Whether to keep this revision forever, even if it is no longer the head revision. If not set, the revision will be automatically purged 30 days after newer content is uploaded. This can be set on a maximum of 200 revisions for a file. This field is only applicable to files with binary content in Drive.",
  ).optional(),
  kind: z.string().describe(
    'Output only. Identifies what kind of resource this is. Value: the fixed string `"drive#revision"`.',
  ).optional(),
  lastModifyingUser: z.object({
    displayName: z.string().describe(
      "Output only. A plain text displayable name for this user.",
    ).optional(),
    emailAddress: z.string().describe(
      "Output only. The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester.",
    ).optional(),
    kind: z.string().describe(
      "Output only. Identifies what kind of resource this is. Value: the fixed string `drive#user`.",
    ).optional(),
    me: z.boolean().describe(
      "Output only. Whether this user is the requesting user.",
    ).optional(),
    permissionId: z.string().describe(
      "Output only. The user's ID as visible in Permission resources.",
    ).optional(),
    photoLink: z.string().describe(
      "Output only. A link to the user's profile photo, if available.",
    ).optional(),
  }).describe("Information about a Drive user.").optional(),
  md5Checksum: z.string().describe(
    "Output only. The MD5 checksum of the revision's content. This is only applicable to files with binary content in Drive.",
  ).optional(),
  mimeType: z.string().describe("Output only. The MIME type of the revision.")
    .optional(),
  modifiedTime: z.string().describe(
    "The last time the revision was modified (RFC 3339 date-time).",
  ).optional(),
  originalFilename: z.string().describe(
    "Output only. The original filename used to create this revision. This is only applicable to files with binary content in Drive.",
  ).optional(),
  publishAuto: z.boolean().describe(
    "Whether subsequent revisions will be automatically republished. This is only applicable to Docs Editors files.",
  ).optional(),
  published: z.boolean().describe(
    "Whether this revision is published. This is only applicable to Docs Editors files.",
  ).optional(),
  publishedLink: z.string().describe(
    "Output only. A link to the published revision. This is only populated for Docs Editors files.",
  ).optional(),
  publishedOutsideDomain: z.boolean().describe(
    "Whether this revision is published outside the domain. This is only applicable to Docs Editors files.",
  ).optional(),
  size: z.string().describe(
    "Output only. The size of the revision's content in bytes. This is only applicable to files with binary content in Drive.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Drive Revisions. Registered at `@swamp/gcp/drive/revisions`. */
export const model = {
  type: "@swamp/gcp/drive/revisions",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The metadata for a revision to a file. Some resource methods (such as `revisi...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a revisions",
      arguments: z.object({
        identifier: z.string().describe("The name of the revisions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        params["revisionId"] = args.identifier;
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
      description: "Update revisions attributes",
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
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        else if (existing["fileId"]) {
          params["fileId"] = String(existing["fileId"]);
        }
        params["revisionId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["exportLinks"] !== undefined) {
          body["exportLinks"] = g["exportLinks"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["keepForever"] !== undefined) {
          body["keepForever"] = g["keepForever"];
        }
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["lastModifyingUser"] !== undefined) {
          body["lastModifyingUser"] = g["lastModifyingUser"];
        }
        if (g["md5Checksum"] !== undefined) {
          body["md5Checksum"] = g["md5Checksum"];
        }
        if (g["mimeType"] !== undefined) body["mimeType"] = g["mimeType"];
        if (g["modifiedTime"] !== undefined) {
          body["modifiedTime"] = g["modifiedTime"];
        }
        if (g["originalFilename"] !== undefined) {
          body["originalFilename"] = g["originalFilename"];
        }
        if (g["publishAuto"] !== undefined) {
          body["publishAuto"] = g["publishAuto"];
        }
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["publishedLink"] !== undefined) {
          body["publishedLink"] = g["publishedLink"];
        }
        if (g["publishedOutsideDomain"] !== undefined) {
          body["publishedOutsideDomain"] = g["publishedOutsideDomain"];
        }
        if (g["size"] !== undefined) body["size"] = g["size"];
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
      description: "Delete the revisions",
      arguments: z.object({
        identifier: z.string().describe("The name of the revisions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        params["revisionId"] = args.identifier;
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
      description: "Sync revisions state from GCP",
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
          if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
          else if (existing["fileId"]) {
            params["fileId"] = String(existing["fileId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["revisionId"] = identifier;
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
      description: "List revisions resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of revisions to return per page.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["fileId"] !== undefined) params["fileId"] = String(g["fileId"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "revisions",
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
