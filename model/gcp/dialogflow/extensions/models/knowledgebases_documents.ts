// Auto-generated extension model for @swamp/gcp/dialogflow/knowledgebases-documents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow KnowledgeBases.Documents.
 *
 * GCP dialogflow KnowledgeBases.Documents resource
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/documents/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.knowledgeBases.documents.get",
  "path": "v2/{+name}",
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
  "id": "dialogflow.projects.knowledgeBases.documents.create",
  "path": "v2/{+parent}/documents",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dialogflow.projects.knowledgeBases.documents.patch",
  "path": "v2/{+name}",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "dialogflow.projects.knowledgeBases.documents.delete",
  "path": "v2/{+name}",
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
  "id": "dialogflow.projects.knowledgeBases.documents.list",
  "path": "v2/{+parent}/documents",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  contentUri: z.string().optional(),
  displayName: z.string().optional(),
  enableAutoReload: z.boolean().optional(),
  knowledgeTypes: z.array(
    z.enum([
      "KNOWLEDGE_TYPE_UNSPECIFIED",
      "FAQ",
      "EXTRACTIVE_QA",
      "ARTICLE_SUGGESTION",
      "AGENT_FACING_SMART_REPLY",
    ]),
  ).optional(),
  latestReloadStatus: z.object({
    status: z.object({
      code: z.number().int().optional(),
      details: z.array(z.record(z.string(), z.string())).optional(),
      message: z.string().optional(),
    }).optional(),
    time: z.string().optional(),
  }).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  mimeType: z.string().optional(),
  name: z.string().optional(),
  rawContent: z.string().optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "ACTIVE",
    "UPDATING",
    "RELOADING",
    "DELETING",
  ]).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  contentUri: z.string().optional(),
  displayName: z.string().optional(),
  enableAutoReload: z.boolean().optional(),
  knowledgeTypes: z.array(z.string()).optional(),
  latestReloadStatus: z.object({
    status: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    time: z.string(),
  }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  mimeType: z.string().optional(),
  name: z.string(),
  rawContent: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  contentUri: z.string().optional(),
  displayName: z.string().optional(),
  enableAutoReload: z.boolean().optional(),
  knowledgeTypes: z.array(
    z.enum([
      "KNOWLEDGE_TYPE_UNSPECIFIED",
      "FAQ",
      "EXTRACTIVE_QA",
      "ARTICLE_SUGGESTION",
      "AGENT_FACING_SMART_REPLY",
    ]),
  ).optional(),
  latestReloadStatus: z.object({
    status: z.object({
      code: z.number().int().optional(),
      details: z.array(z.record(z.string(), z.string())).optional(),
      message: z.string().optional(),
    }).optional(),
    time: z.string().optional(),
  }).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  mimeType: z.string().optional(),
  name: z.string().optional(),
  rawContent: z.string().optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "ACTIVE",
    "UPDATING",
    "RELOADING",
    "DELETING",
  ]).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Dialogflow KnowledgeBases.Documents. Registered at `@swamp/gcp/dialogflow/knowledgebases-documents`. */
export const model = {
  type: "@swamp/gcp/dialogflow/knowledgebases-documents",
  version: "2026.06.07.1",
  upgrades: [
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
      description: "GCP dialogflow KnowledgeBases.Documents resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a documents",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["contentUri"] !== undefined) body["contentUri"] = g["contentUri"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableAutoReload"] !== undefined) {
          body["enableAutoReload"] = g["enableAutoReload"];
        }
        if (g["knowledgeTypes"] !== undefined) {
          body["knowledgeTypes"] = g["knowledgeTypes"];
        }
        if (g["latestReloadStatus"] !== undefined) {
          body["latestReloadStatus"] = g["latestReloadStatus"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["mimeType"] !== undefined) body["mimeType"] = g["mimeType"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rawContent"] !== undefined) body["rawContent"] = g["rawContent"];
        if (g["state"] !== undefined) body["state"] = g["state"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
      description: "Get a documents",
      arguments: z.object({
        identifier: z.string().describe("The name of the documents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update documents attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["contentUri"] !== undefined) body["contentUri"] = g["contentUri"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableAutoReload"] !== undefined) {
          body["enableAutoReload"] = g["enableAutoReload"];
        }
        if (g["knowledgeTypes"] !== undefined) {
          body["knowledgeTypes"] = g["knowledgeTypes"];
        }
        if (g["latestReloadStatus"] !== undefined) {
          body["latestReloadStatus"] = g["latestReloadStatus"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["mimeType"] !== undefined) body["mimeType"] = g["mimeType"];
        if (g["rawContent"] !== undefined) body["rawContent"] = g["rawContent"];
        if (g["state"] !== undefined) body["state"] = g["state"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the documents",
      arguments: z.object({
        identifier: z.string().describe("The name of the documents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync documents state from GCP",
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
      description: "List documents resources",
      arguments: z.object({
        filter: z.string().optional(),
        pageSize: z.number().optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "documents",
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
    export: {
      description: "export",
      arguments: z.object({
        exportFullContent: z.any().optional(),
        gcsDestination: z.any().optional(),
        smartMessagingPartialUpdate: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["exportFullContent"] !== undefined) {
          body["exportFullContent"] = args["exportFullContent"];
        }
        if (args["gcsDestination"] !== undefined) {
          body["gcsDestination"] = args["gcsDestination"];
        }
        if (args["smartMessagingPartialUpdate"] !== undefined) {
          body["smartMessagingPartialUpdate"] =
            args["smartMessagingPartialUpdate"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.knowledgeBases.documents.export",
            "path": "v2/{+name}:export",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    import: {
      description: "import",
      arguments: z.object({
        documentTemplate: z.any().optional(),
        gcsSource: z.any().optional(),
        importGcsCustomMetadata: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["documentTemplate"] !== undefined) {
          body["documentTemplate"] = args["documentTemplate"];
        }
        if (args["gcsSource"] !== undefined) {
          body["gcsSource"] = args["gcsSource"];
        }
        if (args["importGcsCustomMetadata"] !== undefined) {
          body["importGcsCustomMetadata"] = args["importGcsCustomMetadata"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.knowledgeBases.documents.import",
            "path": "v2/{+parent}/documents:import",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    reload: {
      description: "reload",
      arguments: z.object({
        contentUri: z.any().optional(),
        importGcsCustomMetadata: z.any().optional(),
        smartMessagingPartialUpdate: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["contentUri"] !== undefined) {
          body["contentUri"] = args["contentUri"];
        }
        if (args["importGcsCustomMetadata"] !== undefined) {
          body["importGcsCustomMetadata"] = args["importGcsCustomMetadata"];
        }
        if (args["smartMessagingPartialUpdate"] !== undefined) {
          body["smartMessagingPartialUpdate"] =
            args["smartMessagingPartialUpdate"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.knowledgeBases.documents.reload",
            "path": "v2/{+name}:reload",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
