// Auto-generated extension model for @swamp/gcp/firebaseapphosting/backends
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase App Hosting Backends.
 *
 * A backend is the primary resource of App Hosting.
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
  return `${parent}/backends/${shortName}`;
}

const BASE_URL = "https://firebaseapphosting.googleapis.com/";

const GET_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.get",
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
  "id": "firebaseapphosting.projects.locations.backends.create",
  "path": "v1/{+parent}/backends",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "backendId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.patch",
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
    "requestId": {
      "location": "query",
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
  "id": "firebaseapphosting.projects.locations.backends.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects.",
  ).optional(),
  appId: z.string().describe(
    "Optional. The [ID of a Web App](https://firebase.google.com/docs/reference/firebase-management/rest/v1beta1/projects.webApps#WebApp.FIELDS.app_id) associated with the backend.",
  ).optional(),
  codebase: z.object({
    repository: z.string().describe(
      "Required. The resource name for the Developer Connect [`gitRepositoryLink`](https://cloud.google.com/developer-connect/docs/api/reference/rest/v1/projects.locations.connections.gitRepositoryLinks) connected to this backend, in the format: `projects/{project}/locations/{location}/connections/{connection}/gitRepositoryLinks/{repositoryLink}` The connection for the `gitRepositoryLink` must made be using the Firebase App Hosting GitHub App via the Firebase Console.",
    ).optional(),
    rootDirectory: z.string().describe(
      "Optional. If `repository` is provided, the directory relative to the root of the repository to use as the root for the deployed web app. Defaults to use the root of the repository if not provided. If deploying a [monorepo](https://firebase.google.com/docs/app-hosting/monorepos), this should be the directory that contains the `package.json` or `apphosting.yaml` file.",
    ).optional(),
  }).describe(
    "The connection to an external source repository to watch for event-driven updates to the backend.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name. 63 character limit.",
  ).optional(),
  environment: z.string().describe(
    "Optional. The environment name of the backend, used to load environment variables from environment specific configuration.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that can be used to organize and categorize objects.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the backend. Format: `projects/{project}/locations/{locationId}/backends/{backendId}`.",
  ).optional(),
  requestLogsDisabled: z.boolean().describe(
    "Optional. A field that, if true, indicates that incoming request logs are disabled for this backend. Incoming request logs are enabled by default.",
  ).optional(),
  serviceAccount: z.string().describe(
    "Required. The name of the service account used for Cloud Build and Cloud Run. Should have the role roles/firebaseapphosting.computeRunner or equivalent permissions.",
  ).optional(),
  servingLocality: z.enum([
    "SERVING_LOCALITY_UNSPECIFIED",
    "REGIONAL_STRICT",
    "GLOBAL_ACCESS",
  ]).describe(
    "Required. Immutable. Specifies how App Hosting will serve the content for this backend. It will either be contained to a single region (REGIONAL_STRICT) or allowed to use App Hosting's global-replicated serving infrastructure (GLOBAL_ACCESS).",
  ).optional(),
  backendId: z.string().describe(
    "Required. Id of the backend. Also used as the service ID for Cloud Run, and as part of the default domain name.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  appId: z.string().optional(),
  codebase: z.object({
    repository: z.string(),
    rootDirectory: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  environment: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  managedResources: z.array(z.object({
    runService: z.object({
      service: z.string(),
    }),
  })).optional(),
  mode: z.string().optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  requestLogsDisabled: z.boolean().optional(),
  serviceAccount: z.string().optional(),
  servingLocality: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  uri: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects.",
  ).optional(),
  appId: z.string().describe(
    "Optional. The [ID of a Web App](https://firebase.google.com/docs/reference/firebase-management/rest/v1beta1/projects.webApps#WebApp.FIELDS.app_id) associated with the backend.",
  ).optional(),
  codebase: z.object({
    repository: z.string().describe(
      "Required. The resource name for the Developer Connect [`gitRepositoryLink`](https://cloud.google.com/developer-connect/docs/api/reference/rest/v1/projects.locations.connections.gitRepositoryLinks) connected to this backend, in the format: `projects/{project}/locations/{location}/connections/{connection}/gitRepositoryLinks/{repositoryLink}` The connection for the `gitRepositoryLink` must made be using the Firebase App Hosting GitHub App via the Firebase Console.",
    ).optional(),
    rootDirectory: z.string().describe(
      "Optional. If `repository` is provided, the directory relative to the root of the repository to use as the root for the deployed web app. Defaults to use the root of the repository if not provided. If deploying a [monorepo](https://firebase.google.com/docs/app-hosting/monorepos), this should be the directory that contains the `package.json` or `apphosting.yaml` file.",
    ).optional(),
  }).describe(
    "The connection to an external source repository to watch for event-driven updates to the backend.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name. 63 character limit.",
  ).optional(),
  environment: z.string().describe(
    "Optional. The environment name of the backend, used to load environment variables from environment specific configuration.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that can be used to organize and categorize objects.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the backend. Format: `projects/{project}/locations/{locationId}/backends/{backendId}`.",
  ).optional(),
  requestLogsDisabled: z.boolean().describe(
    "Optional. A field that, if true, indicates that incoming request logs are disabled for this backend. Incoming request logs are enabled by default.",
  ).optional(),
  serviceAccount: z.string().describe(
    "Required. The name of the service account used for Cloud Build and Cloud Run. Should have the role roles/firebaseapphosting.computeRunner or equivalent permissions.",
  ).optional(),
  servingLocality: z.enum([
    "SERVING_LOCALITY_UNSPECIFIED",
    "REGIONAL_STRICT",
    "GLOBAL_ACCESS",
  ]).describe(
    "Required. Immutable. Specifies how App Hosting will serve the content for this backend. It will either be contained to a single region (REGIONAL_STRICT) or allowed to use App Hosting's global-replicated serving infrastructure (GLOBAL_ACCESS).",
  ).optional(),
  backendId: z.string().describe(
    "Required. Id of the backend. Also used as the service ID for Cloud Run, and as part of the default domain name.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firebase App Hosting Backends. Registered at `@swamp/gcp/firebaseapphosting/backends`. */
export const model = {
  type: "@swamp/gcp/firebaseapphosting/backends",
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
      toVersion: "2026.05.18.1",
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
      description: "A backend is the primary resource of App Hosting.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a backends",
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
        if (g["appId"] !== undefined) body["appId"] = g["appId"];
        if (g["codebase"] !== undefined) body["codebase"] = g["codebase"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["environment"] !== undefined) {
          body["environment"] = g["environment"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["requestLogsDisabled"] !== undefined) {
          body["requestLogsDisabled"] = g["requestLogsDisabled"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["servingLocality"] !== undefined) {
          body["servingLocality"] = g["servingLocality"];
        }
        if (g["backendId"] !== undefined) body["backendId"] = g["backendId"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
      description: "Get a backends",
      arguments: z.object({
        identifier: z.string().describe("The name of the backends"),
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
      description: "Update backends attributes",
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
        if (g["appId"] !== undefined) body["appId"] = g["appId"];
        if (g["codebase"] !== undefined) body["codebase"] = g["codebase"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["environment"] !== undefined) {
          body["environment"] = g["environment"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["requestLogsDisabled"] !== undefined) {
          body["requestLogsDisabled"] = g["requestLogsDisabled"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
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
      description: "Delete the backends",
      arguments: z.object({
        identifier: z.string().describe("The name of the backends"),
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
      description: "Sync backends state from GCP",
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
