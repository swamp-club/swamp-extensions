// Auto-generated extension model for @swamp/gcp/storage/hmackeys
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage JSON HmacKeys.
 *
 * JSON template to produce a JSON-style HMAC Key metadata resource.
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

const BASE_URL = "https://storage.googleapis.com/storage/v1/";

const GET_CONFIG = {
  "id": "storage.projects.hmacKeys.get",
  "path": "projects/{projectId}/hmacKeys/{accessId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "accessId",
  ],
  "parameters": {
    "accessId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "storage.projects.hmacKeys.create",
  "path": "projects/{projectId}/hmacKeys",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
    "serviceAccountEmail",
  ],
  "parameters": {
    "projectId": {
      "location": "path",
      "required": true,
    },
    "serviceAccountEmail": {
      "location": "query",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "storage.projects.hmacKeys.update",
  "path": "projects/{projectId}/hmacKeys/{accessId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "projectId",
    "accessId",
  ],
  "parameters": {
    "accessId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "storage.projects.hmacKeys.delete",
  "path": "projects/{projectId}/hmacKeys/{accessId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "projectId",
    "accessId",
  ],
  "parameters": {
    "accessId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "storage.projects.hmacKeys.list",
  "path": "projects/{projectId}/hmacKeys",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
  ],
  "parameters": {
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "serviceAccountEmail": {
      "location": "query",
    },
    "showDeletedKeys": {
      "location": "query",
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessId: z.string().describe("The ID of the HMAC Key.").optional(),
  etag: z.string().describe("HTTP 1.1 Entity tag for the HMAC key.").optional(),
  id: z.string().describe(
    "The ID of the HMAC key, including the Project ID and the Access ID.",
  ).optional(),
  kind: z.string().describe(
    "The kind of item this is. For HMAC Key metadata, this is always storage#hmacKeyMetadata.",
  ).optional(),
  projectId: z.string().describe(
    "Project ID owning the service account to which the key authenticates.",
  ).optional(),
  selfLink: z.string().describe("The link to this resource.").optional(),
  serviceAccountEmail: z.string().describe(
    "The email address of the key's associated service account.",
  ).optional(),
  state: z.string().describe(
    "The state of the key. Can be one of ACTIVE, INACTIVE, or DELETED.",
  ).optional(),
  timeCreated: z.string().describe(
    "The creation time of the HMAC key in RFC 3339 format.",
  ).optional(),
  updated: z.string().describe(
    "The last modification time of the HMAC key metadata in RFC 3339 format.",
  ).optional(),
  userProject: z.string().describe("The project to be billed for this request.")
    .optional(),
});

const StateSchema = z.object({
  accessId: z.string().optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  projectId: z.string().optional(),
  selfLink: z.string().optional(),
  serviceAccountEmail: z.string().optional(),
  state: z.string().optional(),
  timeCreated: z.string().optional(),
  updated: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessId: z.string().describe("The ID of the HMAC Key.").optional(),
  etag: z.string().describe("HTTP 1.1 Entity tag for the HMAC key.").optional(),
  id: z.string().describe(
    "The ID of the HMAC key, including the Project ID and the Access ID.",
  ).optional(),
  kind: z.string().describe(
    "The kind of item this is. For HMAC Key metadata, this is always storage#hmacKeyMetadata.",
  ).optional(),
  projectId: z.string().describe(
    "Project ID owning the service account to which the key authenticates.",
  ).optional(),
  selfLink: z.string().describe("The link to this resource.").optional(),
  serviceAccountEmail: z.string().describe(
    "The email address of the key's associated service account.",
  ).optional(),
  state: z.string().describe(
    "The state of the key. Can be one of ACTIVE, INACTIVE, or DELETED.",
  ).optional(),
  timeCreated: z.string().describe(
    "The creation time of the HMAC key in RFC 3339 format.",
  ).optional(),
  updated: z.string().describe(
    "The last modification time of the HMAC key metadata in RFC 3339 format.",
  ).optional(),
  userProject: z.string().describe("The project to be billed for this request.")
    .optional(),
});

/** Swamp extension model for Google Cloud Storage JSON HmacKeys. Registered at `@swamp/gcp/storage/hmackeys`. */
export const model = {
  type: "@swamp/gcp/storage/hmackeys",
  version: "2026.05.22.1",
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
      toVersion: "2026.05.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "JSON template to produce a JSON-style HMAC Key metadata resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a hmacKeys",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["serviceAccountEmail"] !== undefined) {
          params["serviceAccountEmail"] = String(g["serviceAccountEmail"]);
        }
        const body: Record<string, unknown> = {};
        if (g["userProject"] !== undefined) {
          body["userProject"] = g["userProject"];
        }
        if (g["name"] !== undefined) params["accessId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "projectId": projectId },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a hmacKeys",
      arguments: z.object({
        identifier: z.string().describe("The name of the hmacKeys"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["accessId"] = args.identifier;
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
      description: "Update hmacKeys attributes",
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
        params["accessId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["selfLink"] !== undefined) body["selfLink"] = g["selfLink"];
        if (g["serviceAccountEmail"] !== undefined) {
          body["serviceAccountEmail"] = g["serviceAccountEmail"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["timeCreated"] !== undefined) {
          body["timeCreated"] = g["timeCreated"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
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
      description: "Delete the hmacKeys",
      arguments: z.object({
        identifier: z.string().describe("The name of the hmacKeys"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["accessId"] = args.identifier;
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
      description: "Sync hmacKeys state from GCP",
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
          params["accessId"] = identifier;
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
