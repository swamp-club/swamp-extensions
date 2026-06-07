// Auto-generated extension model for @swamp/gcp/storage/bucketaccesscontrols
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage JSON BucketAccessControls.
 *
 * An access-control entry.
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

const BASE_URL = "https://storage.googleapis.com/storage/v1/";

const GET_CONFIG = {
  "id": "storage.bucketAccessControls.get",
  "path": "b/{bucket}/acl/{entity}",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
    "entity",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "entity": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "storage.bucketAccessControls.insert",
  "path": "b/{bucket}/acl",
  "httpMethod": "POST",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "storage.bucketAccessControls.update",
  "path": "b/{bucket}/acl/{entity}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "bucket",
    "entity",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "entity": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "storage.bucketAccessControls.delete",
  "path": "b/{bucket}/acl/{entity}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "bucket",
    "entity",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "entity": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "storage.bucketAccessControls.list",
  "path": "b/{bucket}/acl",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  bucket: z.string().describe("The name of the bucket.").optional(),
  domain: z.string().describe("The domain associated with the entity, if any.")
    .optional(),
  email: z.string().describe(
    "The email address associated with the entity, if any.",
  ).optional(),
  entity: z.string().describe(
    "The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.",
  ),
  entityId: z.string().describe("The ID for the entity, if any.").optional(),
  id: z.string().describe("The ID of the access-control entry.").optional(),
  projectTeam: z.object({
    projectNumber: z.string().describe("The project number.").optional(),
    team: z.string().describe("The team.").optional(),
  }).describe("The project team associated with the entity, if any.")
    .optional(),
  role: z.string().describe("The access permission for the entity."),
  userProject: z.string().describe(
    "The project to be billed for this request. Required for Requester Pays buckets.",
  ).optional(),
});

const StateSchema = z.object({
  bucket: z.string().optional(),
  domain: z.string().optional(),
  email: z.string().optional(),
  entity: z.string().optional(),
  entityId: z.string().optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  projectTeam: z.object({
    projectNumber: z.string(),
    team: z.string(),
  }).optional(),
  role: z.string().optional(),
  selfLink: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  bucket: z.string().describe("The name of the bucket.").optional(),
  domain: z.string().describe("The domain associated with the entity, if any.")
    .optional(),
  email: z.string().describe(
    "The email address associated with the entity, if any.",
  ).optional(),
  entity: z.string().describe(
    "The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.",
  ).optional(),
  entityId: z.string().describe("The ID for the entity, if any.").optional(),
  id: z.string().describe("The ID of the access-control entry.").optional(),
  projectTeam: z.object({
    projectNumber: z.string().describe("The project number.").optional(),
    team: z.string().describe("The team.").optional(),
  }).describe("The project team associated with the entity, if any.")
    .optional(),
  role: z.string().describe("The access permission for the entity.").optional(),
  userProject: z.string().describe(
    "The project to be billed for this request. Required for Requester Pays buckets.",
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

/** Swamp extension model for Google Cloud Storage JSON BucketAccessControls. Registered at `@swamp/gcp/storage/bucketaccesscontrols`. */
export const model = {
  type: "@swamp/gcp/storage/bucketaccesscontrols",
  version: "2026.06.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An access-control entry.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a bucketAccessControls",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        const body: Record<string, unknown> = {};
        if (g["domain"] !== undefined) body["domain"] = g["domain"];
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["entity"] !== undefined) body["entity"] = g["entity"];
        if (g["entityId"] !== undefined) body["entityId"] = g["entityId"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["projectTeam"] !== undefined) {
          body["projectTeam"] = g["projectTeam"];
        }
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["userProject"] !== undefined) {
          body["userProject"] = g["userProject"];
        }
        if (g["name"] !== undefined) params["entity"] = String(g["name"]);
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
          credentials,
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
      description: "Get a bucketAccessControls",
      arguments: z.object({
        identifier: z.string().describe("The name of the bucketAccessControls"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        params["entity"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update bucketAccessControls attributes",
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
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        else if (existing["bucket"]) {
          params["bucket"] = String(existing["bucket"]);
        }
        params["entity"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["domain"] !== undefined) body["domain"] = g["domain"];
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["entityId"] !== undefined) body["entityId"] = g["entityId"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["projectTeam"] !== undefined) {
          body["projectTeam"] = g["projectTeam"];
        }
        if (g["role"] !== undefined) body["role"] = g["role"];
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
      description: "Delete the bucketAccessControls",
      arguments: z.object({
        identifier: z.string().describe("The name of the bucketAccessControls"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        params["entity"] = args.identifier;
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
      description: "Sync bucketAccessControls state from GCP",
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
          params["entity"] = identifier;
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
      description: "List bucketAccessControls resources",
      arguments: z.object({
        userProject: z.string().describe(
          "The project to be billed for this request. Required for Requester Pays buckets.",
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
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        if (args["userProject"] !== undefined) {
          params["userProject"] = String(args["userProject"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
