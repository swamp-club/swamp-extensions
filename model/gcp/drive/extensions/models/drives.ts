// Auto-generated extension model for @swamp/gcp/drive/drives
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Drive Drives.
 *
 * Representation of a shared drive. Some resource methods (such as `drives.update`) require a `driveId`. Use the `drives.list` method to retrieve the ID for a shared drive.
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

const BASE_URL = "https://www.googleapis.com/drive/v3/";

const GET_CONFIG = {
  "id": "drive.drives.get",
  "path": "drives/{driveId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "driveId",
  ],
  "parameters": {
    "driveId": {
      "location": "path",
      "required": true,
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "drive.drives.create",
  "path": "drives",
  "httpMethod": "POST",
  "parameterOrder": [
    "requestId",
  ],
  "parameters": {
    "requestId": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "drive.drives.update",
  "path": "drives/{driveId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "driveId",
  ],
  "parameters": {
    "driveId": {
      "location": "path",
      "required": true,
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "drive.drives.delete",
  "path": "drives/{driveId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "driveId",
  ],
  "parameters": {
    "allowItemDeletion": {
      "location": "query",
    },
    "driveId": {
      "location": "path",
      "required": true,
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "drive.drives.list",
  "path": "drives",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "q": {
      "location": "query",
    },
    "useDomainAdminAccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  backgroundImageFile: z.object({
    id: z.string().describe(
      "The ID of an image file in Google Drive to use for the background image.",
    ).optional(),
    width: z.number().describe(
      "The width of the cropped image in the closed range of 0 to 1. This value represents the width of the cropped image divided by the width of the entire image. The height is computed by applying a width to height aspect ratio of 80 to 9. The resulting image must be at least 1280 pixels wide and 144 pixels high.",
    ).optional(),
    xCoordinate: z.number().describe(
      "The X coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the horizontal distance from the left side of the entire image to the left side of the cropping area divided by the width of the entire image.",
    ).optional(),
    yCoordinate: z.number().describe(
      "The Y coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the vertical distance from the top side of the entire image to the top side of the cropping area divided by the height of the entire image.",
    ).optional(),
  }).describe(
    "An image file and cropping parameters from which a background image for this shared drive is set. This is a write only field; it can only be set on `drive.drives.update` requests that don't set `themeId`. When specified, all fields of the `backgroundImageFile` must be set.",
  ).optional(),
  colorRgb: z.string().describe(
    "The color of this shared drive as an RGB hex string. It can only be set on a `drive.drives.update` request that does not set `themeId`.",
  ).optional(),
  createdTime: z.string().describe(
    "The time at which the shared drive was created (RFC 3339 date-time).",
  ).optional(),
  hidden: z.boolean().describe(
    "Whether the shared drive is hidden from default view.",
  ).optional(),
  name: z.string().describe("The name of this shared drive.").optional(),
  restrictions: z.object({
    adminManagedRestrictions: z.boolean().describe(
      "Whether administrative privileges on this shared drive are required to modify restrictions.",
    ).optional(),
    copyRequiresWriterPermission: z.boolean().describe(
      "Whether the options to copy, print, or download files inside this shared drive, should be disabled for readers and commenters. When this restriction is set to `true`, it will override the similarly named field to `true` for any file inside this shared drive.",
    ).optional(),
    domainUsersOnly: z.boolean().describe(
      "Whether access to this shared drive and items inside this shared drive is restricted to users of the domain to which this shared drive belongs. This restriction may be overridden by other sharing policies controlled outside of this shared drive.",
    ).optional(),
    downloadRestriction: z.object({
      restrictedForReaders: z.boolean().describe(
        "Whether download and copy is restricted for readers.",
      ).optional(),
      restrictedForWriters: z.boolean().describe(
        "Whether download and copy is restricted for writers. If `true`, download is also restricted for readers.",
      ).optional(),
    }).describe("A restriction for copy and download of the file.").optional(),
    driveMembersOnly: z.boolean().describe(
      "Whether access to items inside this shared drive is restricted to its members.",
    ).optional(),
    sharingFoldersRequiresOrganizerPermission: z.boolean().describe(
      "If true, only users with the organizer role can share folders. If false, users with either the organizer role or the file organizer role can share folders.",
    ).optional(),
  }).describe(
    "A set of restrictions that apply to this shared drive or items inside this shared drive. Note that restrictions can't be set when creating a shared drive. To add a restriction, first create a shared drive and then use `drives.update` to add restrictions.",
  ).optional(),
  themeId: z.string().describe(
    "The ID of the theme from which the background image and color will be set. The set of possible `driveThemes` can be retrieved from a `drive.about.get` response. When not specified on a `drive.drives.create` request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set `colorRgb` or `backgroundImageFile`.",
  ).optional(),
  requestId: z.string().describe(
    "Required. An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned.",
  ),
});

const StateSchema = z.object({
  backgroundImageFile: z.object({
    id: z.string(),
    width: z.number(),
    xCoordinate: z.number(),
    yCoordinate: z.number(),
  }).optional(),
  backgroundImageLink: z.string().optional(),
  capabilities: z.object({
    canAddChildren: z.boolean(),
    canChangeCopyRequiresWriterPermissionRestriction: z.boolean(),
    canChangeDomainUsersOnlyRestriction: z.boolean(),
    canChangeDownloadRestriction: z.boolean(),
    canChangeDriveBackground: z.boolean(),
    canChangeDriveMembersOnlyRestriction: z.boolean(),
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction: z.boolean(),
    canComment: z.boolean(),
    canCopy: z.boolean(),
    canDeleteChildren: z.boolean(),
    canDeleteDrive: z.boolean(),
    canDownload: z.boolean(),
    canEdit: z.boolean(),
    canListChildren: z.boolean(),
    canManageMembers: z.boolean(),
    canReadRevisions: z.boolean(),
    canRename: z.boolean(),
    canRenameDrive: z.boolean(),
    canResetDriveRestrictions: z.boolean(),
    canShare: z.boolean(),
    canTrashChildren: z.boolean(),
  }).optional(),
  colorRgb: z.string().optional(),
  createdTime: z.string().optional(),
  hidden: z.boolean().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  orgUnitId: z.string().optional(),
  restrictions: z.object({
    adminManagedRestrictions: z.boolean(),
    copyRequiresWriterPermission: z.boolean(),
    domainUsersOnly: z.boolean(),
    downloadRestriction: z.object({
      restrictedForReaders: z.boolean(),
      restrictedForWriters: z.boolean(),
    }),
    driveMembersOnly: z.boolean(),
    sharingFoldersRequiresOrganizerPermission: z.boolean(),
  }).optional(),
  themeId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  backgroundImageFile: z.object({
    id: z.string().describe(
      "The ID of an image file in Google Drive to use for the background image.",
    ).optional(),
    width: z.number().describe(
      "The width of the cropped image in the closed range of 0 to 1. This value represents the width of the cropped image divided by the width of the entire image. The height is computed by applying a width to height aspect ratio of 80 to 9. The resulting image must be at least 1280 pixels wide and 144 pixels high.",
    ).optional(),
    xCoordinate: z.number().describe(
      "The X coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the horizontal distance from the left side of the entire image to the left side of the cropping area divided by the width of the entire image.",
    ).optional(),
    yCoordinate: z.number().describe(
      "The Y coordinate of the upper left corner of the cropping area in the background image. This is a value in the closed range of 0 to 1. This value represents the vertical distance from the top side of the entire image to the top side of the cropping area divided by the height of the entire image.",
    ).optional(),
  }).describe(
    "An image file and cropping parameters from which a background image for this shared drive is set. This is a write only field; it can only be set on `drive.drives.update` requests that don't set `themeId`. When specified, all fields of the `backgroundImageFile` must be set.",
  ).optional(),
  colorRgb: z.string().describe(
    "The color of this shared drive as an RGB hex string. It can only be set on a `drive.drives.update` request that does not set `themeId`.",
  ).optional(),
  createdTime: z.string().describe(
    "The time at which the shared drive was created (RFC 3339 date-time).",
  ).optional(),
  hidden: z.boolean().describe(
    "Whether the shared drive is hidden from default view.",
  ).optional(),
  name: z.string().describe("The name of this shared drive.").optional(),
  restrictions: z.object({
    adminManagedRestrictions: z.boolean().describe(
      "Whether administrative privileges on this shared drive are required to modify restrictions.",
    ).optional(),
    copyRequiresWriterPermission: z.boolean().describe(
      "Whether the options to copy, print, or download files inside this shared drive, should be disabled for readers and commenters. When this restriction is set to `true`, it will override the similarly named field to `true` for any file inside this shared drive.",
    ).optional(),
    domainUsersOnly: z.boolean().describe(
      "Whether access to this shared drive and items inside this shared drive is restricted to users of the domain to which this shared drive belongs. This restriction may be overridden by other sharing policies controlled outside of this shared drive.",
    ).optional(),
    downloadRestriction: z.object({
      restrictedForReaders: z.boolean().describe(
        "Whether download and copy is restricted for readers.",
      ).optional(),
      restrictedForWriters: z.boolean().describe(
        "Whether download and copy is restricted for writers. If `true`, download is also restricted for readers.",
      ).optional(),
    }).describe("A restriction for copy and download of the file.").optional(),
    driveMembersOnly: z.boolean().describe(
      "Whether access to items inside this shared drive is restricted to its members.",
    ).optional(),
    sharingFoldersRequiresOrganizerPermission: z.boolean().describe(
      "If true, only users with the organizer role can share folders. If false, users with either the organizer role or the file organizer role can share folders.",
    ).optional(),
  }).describe(
    "A set of restrictions that apply to this shared drive or items inside this shared drive. Note that restrictions can't be set when creating a shared drive. To add a restriction, first create a shared drive and then use `drives.update` to add restrictions.",
  ).optional(),
  themeId: z.string().describe(
    "The ID of the theme from which the background image and color will be set. The set of possible `driveThemes` can be retrieved from a `drive.about.get` response. When not specified on a `drive.drives.create` request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set `colorRgb` or `backgroundImageFile`.",
  ).optional(),
  requestId: z.string().describe(
    "Required. An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Drive Drives. Registered at `@swamp/gcp/drive/drives`. */
export const model = {
  type: "@swamp/gcp/drive/drives",
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
      description:
        "Representation of a shared drive. Some resource methods (such as `drives.upda...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a drives",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["backgroundImageFile"] !== undefined) {
          body["backgroundImageFile"] = g["backgroundImageFile"];
        }
        if (g["colorRgb"] !== undefined) body["colorRgb"] = g["colorRgb"];
        if (g["createdTime"] !== undefined) {
          body["createdTime"] = g["createdTime"];
        }
        if (g["hidden"] !== undefined) body["hidden"] = g["hidden"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["restrictions"] !== undefined) {
          body["restrictions"] = g["restrictions"];
        }
        if (g["themeId"] !== undefined) body["themeId"] = g["themeId"];
        if (g["name"] !== undefined) params["driveId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
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
      description: "Get a drives",
      arguments: z.object({
        identifier: z.string().describe("The name of the drives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["driveId"] = args.identifier;
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
      description: "Update drives attributes",
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
        params["driveId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["backgroundImageFile"] !== undefined) {
          body["backgroundImageFile"] = g["backgroundImageFile"];
        }
        if (g["colorRgb"] !== undefined) body["colorRgb"] = g["colorRgb"];
        if (g["createdTime"] !== undefined) {
          body["createdTime"] = g["createdTime"];
        }
        if (g["hidden"] !== undefined) body["hidden"] = g["hidden"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["restrictions"] !== undefined) {
          body["restrictions"] = g["restrictions"];
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
      description: "Delete the drives",
      arguments: z.object({
        identifier: z.string().describe("The name of the drives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["driveId"] = args.identifier;
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
      description: "Sync drives state from GCP",
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
          params["driveId"] = identifier;
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
      description: "List drives resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of shared drives to return per page.",
        ).optional(),
        q: z.string().describe("Query string for searching shared drives.")
          .optional(),
        useDomainAdminAccess: z.boolean().describe(
          "Issue the request as a domain administrator; if set to true, then all shared drives of the domain in which the requester is an administrator are returned.",
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
        if (args["q"] !== undefined) params["q"] = String(args["q"]);
        if (args["useDomainAdminAccess"] !== undefined) {
          params["useDomainAdminAccess"] = String(args["useDomainAdminAccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "drives",
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
    hide: {
      description: "hide",
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
        params["driveId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.drives.hide",
            "path": "drives/{driveId}/hide",
            "httpMethod": "POST",
            "parameterOrder": ["driveId"],
            "parameters": {
              "driveId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    unhide: {
      description: "unhide",
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
        params["driveId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "drive.drives.unhide",
            "path": "drives/{driveId}/unhide",
            "httpMethod": "POST",
            "parameterOrder": ["driveId"],
            "parameters": {
              "driveId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
