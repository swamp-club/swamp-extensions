// Auto-generated extension model for @swamp/gcp/androidpublisher/edits-expansionfiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Edits.Expansionfiles.
 *
 * An expansion file. The resource for ExpansionFilesService.
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

const BASE_URL = "https://androidpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "androidpublisher.edits.expansionfiles.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks/{apkVersionCode}/expansionFiles/{expansionFileType}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "editId",
    "apkVersionCode",
    "expansionFileType",
  ],
  "parameters": {
    "apkVersionCode": {
      "location": "path",
      "required": true,
    },
    "editId": {
      "location": "path",
      "required": true,
    },
    "expansionFileType": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "androidpublisher.edits.expansionfiles.update",
  "path":
    "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks/{apkVersionCode}/expansionFiles/{expansionFileType}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "packageName",
    "editId",
    "apkVersionCode",
    "expansionFileType",
  ],
  "parameters": {
    "apkVersionCode": {
      "location": "path",
      "required": true,
    },
    "editId": {
      "location": "path",
      "required": true,
    },
    "expansionFileType": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  fileSize: z.string().describe(
    "If set, this field indicates that this APK has an expansion file uploaded to it: this APK does not reference another APK's expansion file. The field's value is the size of the uploaded expansion file in bytes.",
  ).optional(),
  referencesVersion: z.number().int().describe(
    "If set, this APK's expansion file references another APK's expansion file. The file_size field will not be set.",
  ).optional(),
});

const StateSchema = z.object({
  fileSize: z.string().optional(),
  referencesVersion: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  fileSize: z.string().describe(
    "If set, this field indicates that this APK has an expansion file uploaded to it: this APK does not reference another APK's expansion file. The field's value is the size of the uploaded expansion file in bytes.",
  ).optional(),
  referencesVersion: z.number().int().describe(
    "If set, this APK's expansion file references another APK's expansion file. The file_size field will not be set.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Edits.Expansionfiles. Registered at `@swamp/gcp/androidpublisher/edits-expansionfiles`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/edits-expansionfiles",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An expansion file. The resource for ExpansionFilesService.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a expansionfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the expansionfiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
        if (g["apkVersionCode"] !== undefined) {
          params["apkVersionCode"] = String(g["apkVersionCode"]);
        }
        params["expansionFileType"] = args.identifier;
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
      description: "Update expansionfiles attributes",
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
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        } else if (existing["packageName"]) {
          params["packageName"] = String(existing["packageName"]);
        }
        if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
        else if (existing["editId"]) {
          params["editId"] = String(existing["editId"]);
        }
        if (g["apkVersionCode"] !== undefined) {
          params["apkVersionCode"] = String(g["apkVersionCode"]);
        } else if (existing["apkVersionCode"]) {
          params["apkVersionCode"] = String(existing["apkVersionCode"]);
        }
        params["expansionFileType"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["fileSize"] !== undefined) body["fileSize"] = g["fileSize"];
        if (g["referencesVersion"] !== undefined) {
          body["referencesVersion"] = g["referencesVersion"];
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
    sync: {
      description: "Sync expansionfiles state from GCP",
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
          if (g["packageName"] !== undefined) {
            params["packageName"] = String(g["packageName"]);
          } else if (existing["packageName"]) {
            params["packageName"] = String(existing["packageName"]);
          }
          if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
          else if (existing["editId"]) {
            params["editId"] = String(existing["editId"]);
          }
          if (g["apkVersionCode"] !== undefined) {
            params["apkVersionCode"] = String(g["apkVersionCode"]);
          } else if (existing["apkVersionCode"]) {
            params["apkVersionCode"] = String(existing["apkVersionCode"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["expansionFileType"] = identifier;
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
    upload: {
      description: "upload",
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
        params["packageName"] = existing["packageName"]?.toString() ??
          g["packageName"]?.toString() ?? "";
        params["editId"] = existing["editId"]?.toString() ??
          g["editId"]?.toString() ?? "";
        params["apkVersionCode"] = existing["apkVersionCode"]?.toString() ??
          g["apkVersionCode"]?.toString() ?? "";
        params["expansionFileType"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.edits.expansionfiles.upload",
            "path":
              "androidpublisher/v3/applications/{packageName}/edits/{editId}/apks/{apkVersionCode}/expansionFiles/{expansionFileType}",
            "httpMethod": "POST",
            "parameterOrder": [
              "packageName",
              "editId",
              "apkVersionCode",
              "expansionFileType",
            ],
            "parameters": {
              "apkVersionCode": { "location": "path", "required": true },
              "editId": { "location": "path", "required": true },
              "expansionFileType": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
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
