// Auto-generated extension model for @swamp/gcp/eventarc/enrollments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Eventarc Enrollments.
 *
 * An enrollment represents a subscription for messages on a particular message bus. It defines a matching criteria for messages on the bus and the subscriber endpoint where matched messages should be delivered.
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
  return `${parent}/enrollments/${shortName}`;
}

const BASE_URL = "https://eventarc.googleapis.com/";

const GET_CONFIG = {
  "id": "eventarc.projects.locations.enrollments.get",
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
  "id": "eventarc.projects.locations.enrollments.create",
  "path": "v1/{+parent}/enrollments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "enrollmentId": {
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
  "id": "eventarc.projects.locations.enrollments.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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
  "id": "eventarc.projects.locations.enrollments.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Resource annotations.",
  ).optional(),
  celMatch: z.string().describe(
    "Required. A CEL expression identifying which messages this enrollment applies to.",
  ).optional(),
  destination: z.string().describe(
    'Required. Destination is the Pipeline that the Enrollment is delivering to. It must point to the full resource name of a Pipeline. Format: "projects/{PROJECT_ID}/locations/{region}/pipelines/{PIPELINE_ID)"',
  ).optional(),
  displayName: z.string().describe("Optional. Resource display name.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels.",
  ).optional(),
  messageBus: z.string().describe(
    "Required. Immutable. Resource name of the message bus identifying the source of the messages. It matches the form projects/{project}/locations/{location}/messageBuses/{messageBus}.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the form projects/{project}/locations/{location}/enrollments/{enrollment}",
  ).optional(),
  enrollmentId: z.string().describe(
    "Required. The user-provided ID to be assigned to the Enrollment. It should match the format `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  celMatch: z.string().optional(),
  createTime: z.string().optional(),
  destination: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  messageBus: z.string().optional(),
  name: z.string(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Resource annotations.",
  ).optional(),
  celMatch: z.string().describe(
    "Required. A CEL expression identifying which messages this enrollment applies to.",
  ).optional(),
  destination: z.string().describe(
    'Required. Destination is the Pipeline that the Enrollment is delivering to. It must point to the full resource name of a Pipeline. Format: "projects/{PROJECT_ID}/locations/{region}/pipelines/{PIPELINE_ID)"',
  ).optional(),
  displayName: z.string().describe("Optional. Resource display name.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels.",
  ).optional(),
  messageBus: z.string().describe(
    "Required. Immutable. Resource name of the message bus identifying the source of the messages. It matches the form projects/{project}/locations/{location}/messageBuses/{messageBus}.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the form projects/{project}/locations/{location}/enrollments/{enrollment}",
  ).optional(),
  enrollmentId: z.string().describe(
    "Required. The user-provided ID to be assigned to the Enrollment. It should match the format `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Eventarc Enrollments. Registered at `@swamp/gcp/eventarc/enrollments`. */
export const model = {
  type: "@swamp/gcp/eventarc/enrollments",
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
      description:
        "Removed: createTime, etag, uid, updateTime, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.03.2",
      description:
        "Removed: createTime, etag, uid, updateTime, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.03.3",
      description:
        "Removed: createTime, etag, uid, updateTime, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.23.1",
      description:
        "Removed: createTime, etag, uid, updateTime, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.1",
      description:
        "Removed: createTime, etag, uid, updateTime, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.19.1",
      description:
        "Removed: createTime, etag, uid, updateTime, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.19.2",
      description:
        "Removed: createTime, etag, uid, updateTime, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An enrollment represents a subscription for messages on a particular message ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a enrollments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["celMatch"] !== undefined) body["celMatch"] = g["celMatch"];
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["messageBus"] !== undefined) body["messageBus"] = g["messageBus"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["enrollmentId"] !== undefined) {
          body["enrollmentId"] = g["enrollmentId"];
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
      description: "Get a enrollments",
      arguments: z.object({
        identifier: z.string().describe("The name of the enrollments"),
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
      description: "Update enrollments attributes",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["celMatch"] !== undefined) body["celMatch"] = g["celMatch"];
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
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
      description: "Delete the enrollments",
      arguments: z.object({
        identifier: z.string().describe("The name of the enrollments"),
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
      description: "Sync enrollments state from GCP",
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
