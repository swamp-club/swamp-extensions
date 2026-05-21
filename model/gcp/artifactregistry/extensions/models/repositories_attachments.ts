// Auto-generated extension model for @swamp/gcp/artifactregistry/repositories-attachments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Artifact Registry Repositories.Attachments.
 *
 * An Attachment refers to additional metadata that can be attached to artifacts in Artifact Registry. An attachment consists of one or more files.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/attachments/${shortName}`;
}

const BASE_URL = "https://artifactregistry.googleapis.com/";

const GET_CONFIG = {
  "id": "artifactregistry.projects.locations.repositories.attachments.get",
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
  "id": "artifactregistry.projects.locations.repositories.attachments.create",
  "path": "v1/{+parent}/attachments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "attachmentId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "artifactregistry.projects.locations.repositories.attachments.delete",
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
  "id": "artifactregistry.projects.locations.repositories.attachments.list",
  "path": "v1/{+parent}/attachments",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Artifact Registry. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  attachmentNamespace: z.string().describe(
    "The namespace this attachment belongs to. E.g. If an attachment is created by artifact analysis, namespace is set to `artifactanalysis.googleapis.com`.",
  ).optional(),
  files: z.array(z.string()).describe(
    "Required. The files that belong to this attachment. If the file ID part contains slashes, they are escaped. E.g. `projects/p1/locations/us-central1/repositories/repo1/files/sha:`.",
  ).optional(),
  name: z.string().describe(
    "The name of the attachment. E.g. `projects/p1/locations/us/repositories/repo/attachments/sbom`.",
  ).optional(),
  target: z.string().describe(
    "Required. The target the attachment is for, can be a Version, Package or Repository. E.g. `projects/p1/locations/us-central1/repositories/repo1/packages/p1/versions/v1`.",
  ).optional(),
  type: z.string().describe(
    "Type of attachment. E.g. `application/vnd.spdx+json`",
  ).optional(),
  attachmentId: z.string().describe(
    "Required. The attachment id to use for this attachment.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  attachmentNamespace: z.string().optional(),
  createTime: z.string().optional(),
  files: z.array(z.string()).optional(),
  name: z.string(),
  ociVersionName: z.string().optional(),
  target: z.string().optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Artifact Registry. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  attachmentNamespace: z.string().describe(
    "The namespace this attachment belongs to. E.g. If an attachment is created by artifact analysis, namespace is set to `artifactanalysis.googleapis.com`.",
  ).optional(),
  files: z.array(z.string()).describe(
    "Required. The files that belong to this attachment. If the file ID part contains slashes, they are escaped. E.g. `projects/p1/locations/us-central1/repositories/repo1/files/sha:`.",
  ).optional(),
  name: z.string().describe(
    "The name of the attachment. E.g. `projects/p1/locations/us/repositories/repo/attachments/sbom`.",
  ).optional(),
  target: z.string().describe(
    "Required. The target the attachment is for, can be a Version, Package or Repository. E.g. `projects/p1/locations/us-central1/repositories/repo1/packages/p1/versions/v1`.",
  ).optional(),
  type: z.string().describe(
    "Type of attachment. E.g. `application/vnd.spdx+json`",
  ).optional(),
  attachmentId: z.string().describe(
    "Required. The attachment id to use for this attachment.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Artifact Registry Repositories.Attachments. Registered at `@swamp/gcp/artifactregistry/repositories-attachments`. */
export const model = {
  type: "@swamp/gcp/artifactregistry/repositories-attachments",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An Attachment refers to additional metadata that can be attached to artifacts...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a attachments",
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
        if (g["attachmentNamespace"] !== undefined) {
          body["attachmentNamespace"] = g["attachmentNamespace"];
        }
        if (g["files"] !== undefined) body["files"] = g["files"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["target"] !== undefined) body["target"] = g["target"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["attachmentId"] !== undefined) {
          body["attachmentId"] = g["attachmentId"];
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
      description: "Get a attachments",
      arguments: z.object({
        identifier: z.string().describe("The name of the attachments"),
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
    delete: {
      description: "Delete the attachments",
      arguments: z.object({
        identifier: z.string().describe("The name of the attachments"),
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
      description: "Sync attachments state from GCP",
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
