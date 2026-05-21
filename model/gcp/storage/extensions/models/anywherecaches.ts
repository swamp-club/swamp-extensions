// Auto-generated extension model for @swamp/gcp/storage/anywherecaches
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage JSON AnywhereCaches.
 *
 * An Anywhere Cache instance.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://storage.googleapis.com/storage/v1/";

const GET_CONFIG = {
  "id": "storage.anywhereCaches.get",
  "path": "b/{bucket}/anywhereCaches/{anywhereCacheId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
    "anywhereCacheId",
  ],
  "parameters": {
    "anywhereCacheId": {
      "location": "path",
      "required": true,
    },
    "bucket": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "storage.anywhereCaches.insert",
  "path": "b/{bucket}/anywhereCaches",
  "httpMethod": "POST",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "storage.anywhereCaches.update",
  "path": "b/{bucket}/anywhereCaches/{anywhereCacheId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "bucket",
    "anywhereCacheId",
  ],
  "parameters": {
    "anywhereCacheId": {
      "location": "path",
      "required": true,
    },
    "bucket": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "storage.anywhereCaches.list",
  "path": "b/{bucket}/anywhereCaches",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
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
  admissionPolicy: z.string().describe(
    "The cache-level entry admission policy.",
  ).optional(),
  anywhereCacheId: z.string().describe("The ID of the Anywhere cache instance.")
    .optional(),
  bucket: z.string().describe(
    "The name of the bucket containing this cache instance.",
  ).optional(),
  createTime: z.string().describe(
    "The creation time of the cache instance in RFC 3339 format.",
  ).optional(),
  id: z.string().describe(
    "The ID of the resource, including the project number, bucket name and anywhere cache ID.",
  ).optional(),
  ingestOnWrite: z.boolean().describe(
    "Specifies whether objects are ingested into the cache upon write.",
  ).optional(),
  pendingUpdate: z.boolean().describe(
    "True if the cache instance has an active Update long-running operation.",
  ).optional(),
  state: z.string().describe("The current state of the cache instance.")
    .optional(),
  ttl: z.string().describe(
    'The TTL of all cache entries in whole seconds. e.g., "7200s".',
  ).optional(),
  updateTime: z.string().describe(
    "The modification time of the cache instance metadata in RFC 3339 format.",
  ).optional(),
  zone: z.string().describe(
    "The zone in which the cache instance is running. For example, us-central1-a.",
  ).optional(),
});

const StateSchema = z.object({
  admissionPolicy: z.string().optional(),
  anywhereCacheId: z.string().optional(),
  bucket: z.string().optional(),
  createTime: z.string().optional(),
  id: z.string().optional(),
  ingestOnWrite: z.boolean().optional(),
  kind: z.string().optional(),
  pendingUpdate: z.boolean().optional(),
  selfLink: z.string().optional(),
  state: z.string().optional(),
  ttl: z.string().optional(),
  updateTime: z.string().optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  admissionPolicy: z.string().describe(
    "The cache-level entry admission policy.",
  ).optional(),
  anywhereCacheId: z.string().describe("The ID of the Anywhere cache instance.")
    .optional(),
  bucket: z.string().describe(
    "The name of the bucket containing this cache instance.",
  ).optional(),
  createTime: z.string().describe(
    "The creation time of the cache instance in RFC 3339 format.",
  ).optional(),
  id: z.string().describe(
    "The ID of the resource, including the project number, bucket name and anywhere cache ID.",
  ).optional(),
  ingestOnWrite: z.boolean().describe(
    "Specifies whether objects are ingested into the cache upon write.",
  ).optional(),
  pendingUpdate: z.boolean().describe(
    "True if the cache instance has an active Update long-running operation.",
  ).optional(),
  state: z.string().describe("The current state of the cache instance.")
    .optional(),
  ttl: z.string().describe(
    'The TTL of all cache entries in whole seconds. e.g., "7200s".',
  ).optional(),
  updateTime: z.string().describe(
    "The modification time of the cache instance metadata in RFC 3339 format.",
  ).optional(),
  zone: z.string().describe(
    "The zone in which the cache instance is running. For example, us-central1-a.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Storage JSON AnywhereCaches. Registered at `@swamp/gcp/storage/anywherecaches`. */
export const model = {
  type: "@swamp/gcp/storage/anywherecaches",
  version: "2026.05.21.2",
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
      toVersion: "2026.04.13.1",
      description: "Added: ingestOnWrite",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: ingestOnWrite",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { ingestOnWrite: _ingestOnWrite, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: ingestOnWrite",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: ingestOnWrite",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { ingestOnWrite: _ingestOnWrite, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: ingestOnWrite",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An Anywhere Cache instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a anywhereCaches",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        const body: Record<string, unknown> = {};
        if (g["admissionPolicy"] !== undefined) {
          body["admissionPolicy"] = g["admissionPolicy"];
        }
        if (g["anywhereCacheId"] !== undefined) {
          body["anywhereCacheId"] = g["anywhereCacheId"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["ingestOnWrite"] !== undefined) {
          body["ingestOnWrite"] = g["ingestOnWrite"];
        }
        if (g["pendingUpdate"] !== undefined) {
          body["pendingUpdate"] = g["pendingUpdate"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["zone"] !== undefined) body["zone"] = g["zone"];
        if (g["name"] !== undefined) {
          params["anywhereCacheId"] = String(g["name"]);
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
            listParams: { "bucket": String(g["bucket"] ?? "") },
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
      description: "Get a anywhereCaches",
      arguments: z.object({
        identifier: z.string().describe("The name of the anywhereCaches"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        params["anywhereCacheId"] = args.identifier;
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
      description: "Update anywhereCaches attributes",
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
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        else if (existing["bucket"]) {
          params["bucket"] = String(existing["bucket"]);
        }
        params["anywhereCacheId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["admissionPolicy"] !== undefined) {
          body["admissionPolicy"] = g["admissionPolicy"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["ingestOnWrite"] !== undefined) {
          body["ingestOnWrite"] = g["ingestOnWrite"];
        }
        if (g["pendingUpdate"] !== undefined) {
          body["pendingUpdate"] = g["pendingUpdate"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["zone"] !== undefined) body["zone"] = g["zone"];
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
    sync: {
      description: "Sync anywhereCaches state from GCP",
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
          if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
          else if (existing["bucket"]) {
            params["bucket"] = String(existing["bucket"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["anywhereCacheId"] = identifier;
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
    disable: {
      description: "disable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        if (g["anywhereCacheId"] !== undefined) {
          params["anywhereCacheId"] = String(g["anywhereCacheId"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.anywhereCaches.disable",
            "path": "b/{bucket}/anywhereCaches/{anywhereCacheId}/disable",
            "httpMethod": "POST",
            "parameterOrder": ["bucket", "anywhereCacheId"],
            "parameters": {
              "anywhereCacheId": { "location": "path", "required": true },
              "bucket": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    pause: {
      description: "pause",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        if (g["anywhereCacheId"] !== undefined) {
          params["anywhereCacheId"] = String(g["anywhereCacheId"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.anywhereCaches.pause",
            "path": "b/{bucket}/anywhereCaches/{anywhereCacheId}/pause",
            "httpMethod": "POST",
            "parameterOrder": ["bucket", "anywhereCacheId"],
            "parameters": {
              "anywhereCacheId": { "location": "path", "required": true },
              "bucket": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    resume: {
      description: "resume",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        if (g["anywhereCacheId"] !== undefined) {
          params["anywhereCacheId"] = String(g["anywhereCacheId"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "storage.anywhereCaches.resume",
            "path": "b/{bucket}/anywhereCaches/{anywhereCacheId}/resume",
            "httpMethod": "POST",
            "parameterOrder": ["bucket", "anywhereCacheId"],
            "parameters": {
              "anywhereCacheId": { "location": "path", "required": true },
              "bucket": { "location": "path", "required": true },
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
