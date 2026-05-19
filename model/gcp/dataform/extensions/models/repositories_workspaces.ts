// Auto-generated extension model for @swamp/gcp/dataform/repositories-workspaces
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataform Repositories.Workspaces.
 *
 * Represents a Dataform Git workspace.
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
  return `${parent}/workspaces/${shortName}`;
}

const BASE_URL = "https://dataform.googleapis.com/";

const GET_CONFIG = {
  "id": "dataform.projects.locations.repositories.workspaces.get",
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
  "id": "dataform.projects.locations.repositories.workspaces.create",
  "path": "v1/{+parent}/workspaces",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "workspaceId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataform.projects.locations.repositories.workspaces.delete",
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
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string().describe(
      "Required. The KMS key version name with which data of a resource is encrypted.",
    ).optional(),
  }).describe("Describes encryption state of a resource.").optional(),
  disableMoves: z.boolean().describe(
    "Optional. If set to true, workspaces will not be moved if its linked Repository is moved. Instead, it will be deleted.",
  ).optional(),
  name: z.string().describe("Identifier. The workspace's name.").optional(),
  privateResourceMetadata: z.object({
    userScoped: z.boolean().describe(
      "Output only. If true, this resource is user-scoped, meaning it is either a workspace or sourced from a workspace.",
    ).optional(),
  }).describe("Metadata used to identify if a resource is user scoped.")
    .optional(),
  workspaceId: z.string().describe(
    "Required. The ID to use for the workspace, which will become the final component of the workspace's resource name.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string(),
  }).optional(),
  disableMoves: z.boolean().optional(),
  internalMetadata: z.string().optional(),
  name: z.string(),
  privateResourceMetadata: z.object({
    userScoped: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string().describe(
      "Required. The KMS key version name with which data of a resource is encrypted.",
    ).optional(),
  }).describe("Describes encryption state of a resource.").optional(),
  disableMoves: z.boolean().describe(
    "Optional. If set to true, workspaces will not be moved if its linked Repository is moved. Instead, it will be deleted.",
  ).optional(),
  name: z.string().describe("Identifier. The workspace's name.").optional(),
  privateResourceMetadata: z.object({
    userScoped: z.boolean().describe(
      "Output only. If true, this resource is user-scoped, meaning it is either a workspace or sourced from a workspace.",
    ).optional(),
  }).describe("Metadata used to identify if a resource is user scoped.")
    .optional(),
  workspaceId: z.string().describe(
    "Required. The ID to use for the workspace, which will become the final component of the workspace's resource name.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataform Repositories.Workspaces. Registered at `@swamp/gcp/dataform/repositories-workspaces`. */
export const model = {
  type: "@swamp/gcp/dataform/repositories-workspaces",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a Dataform Git workspace.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a workspaces",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["dataEncryptionState"] !== undefined) {
          body["dataEncryptionState"] = g["dataEncryptionState"];
        }
        if (g["disableMoves"] !== undefined) {
          body["disableMoves"] = g["disableMoves"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["privateResourceMetadata"] !== undefined) {
          body["privateResourceMetadata"] = g["privateResourceMetadata"];
        }
        if (g["workspaceId"] !== undefined) {
          body["workspaceId"] = g["workspaceId"];
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
      description: "Get a workspaces",
      arguments: z.object({
        identifier: z.string().describe("The name of the workspaces"),
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
      description: "Delete the workspaces",
      arguments: z.object({
        identifier: z.string().describe("The name of the workspaces"),
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
      description: "Sync workspaces state from GCP",
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
    commit: {
      description: "commit",
      arguments: z.object({
        author: z.any().optional(),
        commitMessage: z.any().optional(),
        paths: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["author"] !== undefined) body["author"] = args["author"];
        if (args["commitMessage"] !== undefined) {
          body["commitMessage"] = args["commitMessage"];
        }
        if (args["paths"] !== undefined) body["paths"] = args["paths"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataform.projects.locations.repositories.workspaces.commit",
            "path": "v1/{+name}:commit",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    fetch_file_diff: {
      description: "fetch file diff",
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
        params["workspace"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.fetchFileDiff",
            "path": "v1/{+workspace}:fetchFileDiff",
            "httpMethod": "GET",
            "parameterOrder": ["workspace"],
            "parameters": {
              "path": { "location": "query" },
              "workspace": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    fetch_file_git_statuses: {
      description: "fetch file git statuses",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.fetchFileGitStatuses",
            "path": "v1/{+name}:fetchFileGitStatuses",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    fetch_git_ahead_behind: {
      description: "fetch git ahead behind",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.fetchGitAheadBehind",
            "path": "v1/{+name}:fetchGitAheadBehind",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "remoteBranch": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    install_npm_packages: {
      description: "install npm packages",
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
        params["workspace"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.installNpmPackages",
            "path": "v1/{+workspace}:installNpmPackages",
            "httpMethod": "POST",
            "parameterOrder": ["workspace"],
            "parameters": {
              "workspace": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    make_directory: {
      description: "make directory",
      arguments: z.object({
        path: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["workspace"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["path"] !== undefined) body["path"] = args["path"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.makeDirectory",
            "path": "v1/{+workspace}:makeDirectory",
            "httpMethod": "POST",
            "parameterOrder": ["workspace"],
            "parameters": {
              "workspace": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    move_directory: {
      description: "move directory",
      arguments: z.object({
        newPath: z.any().optional(),
        path: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["workspace"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["newPath"] !== undefined) body["newPath"] = args["newPath"];
        if (args["path"] !== undefined) body["path"] = args["path"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.moveDirectory",
            "path": "v1/{+workspace}:moveDirectory",
            "httpMethod": "POST",
            "parameterOrder": ["workspace"],
            "parameters": {
              "workspace": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    move_file: {
      description: "move file",
      arguments: z.object({
        newPath: z.any().optional(),
        path: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["workspace"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["newPath"] !== undefined) body["newPath"] = args["newPath"];
        if (args["path"] !== undefined) body["path"] = args["path"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.moveFile",
            "path": "v1/{+workspace}:moveFile",
            "httpMethod": "POST",
            "parameterOrder": ["workspace"],
            "parameters": {
              "workspace": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    pull: {
      description: "pull",
      arguments: z.object({
        author: z.any().optional(),
        remoteBranch: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["author"] !== undefined) body["author"] = args["author"];
        if (args["remoteBranch"] !== undefined) {
          body["remoteBranch"] = args["remoteBranch"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataform.projects.locations.repositories.workspaces.pull",
            "path": "v1/{+name}:pull",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    push: {
      description: "push",
      arguments: z.object({
        remoteBranch: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["remoteBranch"] !== undefined) {
          body["remoteBranch"] = args["remoteBranch"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataform.projects.locations.repositories.workspaces.push",
            "path": "v1/{+name}:push",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    query_directory_contents: {
      description: "query directory contents",
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
        params["workspace"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.queryDirectoryContents",
            "path": "v1/{+workspace}:queryDirectoryContents",
            "httpMethod": "GET",
            "parameterOrder": ["workspace"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "path": { "location": "query" },
              "view": { "location": "query" },
              "workspace": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    read_file: {
      description: "read file",
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
        params["workspace"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.readFile",
            "path": "v1/{+workspace}:readFile",
            "httpMethod": "GET",
            "parameterOrder": ["workspace"],
            "parameters": {
              "path": { "location": "query" },
              "revision": { "location": "query" },
              "workspace": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    reset: {
      description: "reset",
      arguments: z.object({
        clean: z.any().optional(),
        paths: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["clean"] !== undefined) body["clean"] = args["clean"];
        if (args["paths"] !== undefined) body["paths"] = args["paths"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataform.projects.locations.repositories.workspaces.reset",
            "path": "v1/{+name}:reset",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    search_files: {
      description: "search files",
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
        params["workspace"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.searchFiles",
            "path": "v1/{+workspace}:searchFiles",
            "httpMethod": "GET",
            "parameterOrder": ["workspace"],
            "parameters": {
              "filter": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "workspace": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    write_file: {
      description: "write file",
      arguments: z.object({
        contents: z.any().optional(),
        path: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["workspace"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["path"] !== undefined) body["path"] = args["path"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.workspaces.writeFile",
            "path": "v1/{+workspace}:writeFile",
            "httpMethod": "POST",
            "parameterOrder": ["workspace"],
            "parameters": {
              "workspace": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
