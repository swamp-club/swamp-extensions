// Auto-generated extension model for @swamp/gcp/dataform/repositories
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataform Repositories.
 *
 * Represents a Dataform Git repository.
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
  return `${parent}/repositories/${shortName}`;
}

const BASE_URL = "https://dataform.googleapis.com/";

const GET_CONFIG = {
  "id": "dataform.projects.locations.repositories.get",
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
  "id": "dataform.projects.locations.repositories.create",
  "path": "v1/{+parent}/repositories",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "repositoryId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataform.projects.locations.repositories.patch",
  "path": "v1/{+name}",
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
  "id": "dataform.projects.locations.repositories.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  containingFolder: z.string().describe(
    "Optional. The name of the containing folder of the repository. The field is immutable and it can be modified via a MoveRepository operation. Format: `projects/*/locations/*/folders/*`. or `projects/*/locations/*/teamFolders/*`.",
  ).optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string().describe(
      "Required. The KMS key version name with which data of a resource is encrypted.",
    ).optional(),
  }).describe("Describes encryption state of a resource.").optional(),
  displayName: z.string().describe(
    "Optional. The repository's user-friendly name.",
  ).optional(),
  gitRemoteSettings: z.object({
    authenticationTokenSecretVersion: z.string().describe(
      "Optional. The name of the Secret Manager secret version to use as an authentication token for Git operations. Must be in the format `projects/*/secrets/*/versions/*`.",
    ).optional(),
    defaultBranch: z.string().describe(
      "Required. The Git remote's default branch name. If not set, `main` will be used and stored for the repository.",
    ).optional(),
    sshAuthenticationConfig: z.object({
      hostPublicKey: z.string().describe(
        "Required. Content of a public SSH key to verify an identity of a remote Git host.",
      ).optional(),
      userPrivateKeySecretVersion: z.string().describe(
        "Required. The name of the Secret Manager secret version to use as a ssh private key for Git operations. Must be in the format `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Configures fields for performing SSH authentication.")
      .optional(),
    tokenStatus: z.enum([
      "TOKEN_STATUS_UNSPECIFIED",
      "NOT_FOUND",
      "INVALID",
      "VALID",
    ]).describe(
      "Output only. Deprecated: The field does not contain any token status information.",
    ).optional(),
    url: z.string().describe("Required. The Git remote's URL.").optional(),
  }).describe("Controls Git remote configuration for a repository.").optional(),
  kmsKeyName: z.string().describe(
    "Optional. The reference to a KMS encryption key. If provided, it will be used to encrypt user data in the repository and all child resources. It is not possible to add or update the encryption key after the repository is created. Example: `projects/{kms_project}/locations/{location}/keyRings/{key_location}/cryptoKeys/{key}`",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Repository user labels.",
  ).optional(),
  name: z.string().describe("Identifier. The repository's name.").optional(),
  npmrcEnvironmentVariablesSecretVersion: z.string().describe(
    "Optional. The name of the Secret Manager secret version to be used to interpolate variables into the.npmrc file for package installation operations. Must be in the format `projects/*/secrets/*/versions/*`. The file itself must be in a JSON format.",
  ).optional(),
  serviceAccount: z.string().describe(
    "Optional. The service account to run workflow invocations under.",
  ).optional(),
  setAuthenticatedUserAdmin: z.boolean().describe(
    "Optional. Input only. If set to true, the authenticated user will be granted the roles/dataform.admin role on the created repository.",
  ).optional(),
  workspaceCompilationOverrides: z.object({
    defaultDatabase: z.string().describe(
      "Optional. The default database (Google Cloud project ID).",
    ).optional(),
    schemaSuffix: z.string().describe(
      "Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names.",
    ).optional(),
    tablePrefix: z.string().describe(
      "Optional. The prefix that should be prepended to all table names.",
    ).optional(),
  }).describe("Configures workspace compilation overrides for a repository.")
    .optional(),
  repositoryId: z.string().describe(
    "Required. The ID to use for the repository, which will become the final component of the repository's resource name.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  containingFolder: z.string().optional(),
  createTime: z.string().optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  gitRemoteSettings: z.object({
    authenticationTokenSecretVersion: z.string(),
    defaultBranch: z.string(),
    sshAuthenticationConfig: z.object({
      hostPublicKey: z.string(),
      userPrivateKeySecretVersion: z.string(),
    }),
    tokenStatus: z.string(),
    url: z.string(),
  }).optional(),
  internalMetadata: z.string().optional(),
  kmsKeyName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  npmrcEnvironmentVariablesSecretVersion: z.string().optional(),
  serviceAccount: z.string().optional(),
  setAuthenticatedUserAdmin: z.boolean().optional(),
  teamFolderName: z.string().optional(),
  workspaceCompilationOverrides: z.object({
    defaultDatabase: z.string(),
    schemaSuffix: z.string(),
    tablePrefix: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  containingFolder: z.string().describe(
    "Optional. The name of the containing folder of the repository. The field is immutable and it can be modified via a MoveRepository operation. Format: `projects/*/locations/*/folders/*`. or `projects/*/locations/*/teamFolders/*`.",
  ).optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string().describe(
      "Required. The KMS key version name with which data of a resource is encrypted.",
    ).optional(),
  }).describe("Describes encryption state of a resource.").optional(),
  displayName: z.string().describe(
    "Optional. The repository's user-friendly name.",
  ).optional(),
  gitRemoteSettings: z.object({
    authenticationTokenSecretVersion: z.string().describe(
      "Optional. The name of the Secret Manager secret version to use as an authentication token for Git operations. Must be in the format `projects/*/secrets/*/versions/*`.",
    ).optional(),
    defaultBranch: z.string().describe(
      "Required. The Git remote's default branch name. If not set, `main` will be used and stored for the repository.",
    ).optional(),
    sshAuthenticationConfig: z.object({
      hostPublicKey: z.string().describe(
        "Required. Content of a public SSH key to verify an identity of a remote Git host.",
      ).optional(),
      userPrivateKeySecretVersion: z.string().describe(
        "Required. The name of the Secret Manager secret version to use as a ssh private key for Git operations. Must be in the format `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Configures fields for performing SSH authentication.")
      .optional(),
    tokenStatus: z.enum([
      "TOKEN_STATUS_UNSPECIFIED",
      "NOT_FOUND",
      "INVALID",
      "VALID",
    ]).describe(
      "Output only. Deprecated: The field does not contain any token status information.",
    ).optional(),
    url: z.string().describe("Required. The Git remote's URL.").optional(),
  }).describe("Controls Git remote configuration for a repository.").optional(),
  kmsKeyName: z.string().describe(
    "Optional. The reference to a KMS encryption key. If provided, it will be used to encrypt user data in the repository and all child resources. It is not possible to add or update the encryption key after the repository is created. Example: `projects/{kms_project}/locations/{location}/keyRings/{key_location}/cryptoKeys/{key}`",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Repository user labels.",
  ).optional(),
  name: z.string().describe("Identifier. The repository's name.").optional(),
  npmrcEnvironmentVariablesSecretVersion: z.string().describe(
    "Optional. The name of the Secret Manager secret version to be used to interpolate variables into the.npmrc file for package installation operations. Must be in the format `projects/*/secrets/*/versions/*`. The file itself must be in a JSON format.",
  ).optional(),
  serviceAccount: z.string().describe(
    "Optional. The service account to run workflow invocations under.",
  ).optional(),
  setAuthenticatedUserAdmin: z.boolean().describe(
    "Optional. Input only. If set to true, the authenticated user will be granted the roles/dataform.admin role on the created repository.",
  ).optional(),
  workspaceCompilationOverrides: z.object({
    defaultDatabase: z.string().describe(
      "Optional. The default database (Google Cloud project ID).",
    ).optional(),
    schemaSuffix: z.string().describe(
      "Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names.",
    ).optional(),
    tablePrefix: z.string().describe(
      "Optional. The prefix that should be prepended to all table names.",
    ).optional(),
  }).describe("Configures workspace compilation overrides for a repository.")
    .optional(),
  repositoryId: z.string().describe(
    "Required. The ID to use for the repository, which will become the final component of the repository's resource name.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataform Repositories. Registered at `@swamp/gcp/dataform/repositories`. */
export const model = {
  type: "@swamp/gcp/dataform/repositories",
  version: "2026.05.20.1",
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
      toVersion: "2026.04.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a Dataform Git repository.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a repositories",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["containingFolder"] !== undefined) {
          body["containingFolder"] = g["containingFolder"];
        }
        if (g["dataEncryptionState"] !== undefined) {
          body["dataEncryptionState"] = g["dataEncryptionState"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gitRemoteSettings"] !== undefined) {
          body["gitRemoteSettings"] = g["gitRemoteSettings"];
        }
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["npmrcEnvironmentVariablesSecretVersion"] !== undefined) {
          body["npmrcEnvironmentVariablesSecretVersion"] =
            g["npmrcEnvironmentVariablesSecretVersion"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["setAuthenticatedUserAdmin"] !== undefined) {
          body["setAuthenticatedUserAdmin"] = g["setAuthenticatedUserAdmin"];
        }
        if (g["workspaceCompilationOverrides"] !== undefined) {
          body["workspaceCompilationOverrides"] =
            g["workspaceCompilationOverrides"];
        }
        if (g["repositoryId"] !== undefined) {
          body["repositoryId"] = g["repositoryId"];
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
      description: "Get a repositories",
      arguments: z.object({
        identifier: z.string().describe("The name of the repositories"),
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
      description: "Update repositories attributes",
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
        if (g["dataEncryptionState"] !== undefined) {
          body["dataEncryptionState"] = g["dataEncryptionState"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gitRemoteSettings"] !== undefined) {
          body["gitRemoteSettings"] = g["gitRemoteSettings"];
        }
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["npmrcEnvironmentVariablesSecretVersion"] !== undefined) {
          body["npmrcEnvironmentVariablesSecretVersion"] =
            g["npmrcEnvironmentVariablesSecretVersion"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["setAuthenticatedUserAdmin"] !== undefined) {
          body["setAuthenticatedUserAdmin"] = g["setAuthenticatedUserAdmin"];
        }
        if (g["workspaceCompilationOverrides"] !== undefined) {
          body["workspaceCompilationOverrides"] =
            g["workspaceCompilationOverrides"];
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
      description: "Delete the repositories",
      arguments: z.object({
        identifier: z.string().describe("The name of the repositories"),
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
      description: "Sync repositories state from GCP",
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
        commitMetadata: z.any().optional(),
        fileOperations: z.any().optional(),
        requiredHeadCommitSha: z.any().optional(),
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
        if (args["commitMetadata"] !== undefined) {
          body["commitMetadata"] = args["commitMetadata"];
        }
        if (args["fileOperations"] !== undefined) {
          body["fileOperations"] = args["fileOperations"];
        }
        if (args["requiredHeadCommitSha"] !== undefined) {
          body["requiredHeadCommitSha"] = args["requiredHeadCommitSha"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataform.projects.locations.repositories.commit",
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
    compute_access_token_status: {
      description: "compute access token status",
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
              "dataform.projects.locations.repositories.computeAccessTokenStatus",
            "path": "v1/{+name}:computeAccessTokenStatus",
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
    fetch_history: {
      description: "fetch history",
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
            "id": "dataform.projects.locations.repositories.fetchHistory",
            "path": "v1/{+name}:fetchHistory",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    fetch_remote_branches: {
      description: "fetch remote branches",
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
              "dataform.projects.locations.repositories.fetchRemoteBranches",
            "path": "v1/{+name}:fetchRemoteBranches",
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
    move: {
      description: "move",
      arguments: z.object({
        destinationContainingFolder: z.any().optional(),
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
        if (args["destinationContainingFolder"] !== undefined) {
          body["destinationContainingFolder"] =
            args["destinationContainingFolder"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataform.projects.locations.repositories.move",
            "path": "v1/{+name}:move",
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
              "dataform.projects.locations.repositories.queryDirectoryContents",
            "path": "v1/{+name}:queryDirectoryContents",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "commitSha": { "location": "query" },
              "name": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "path": { "location": "query" },
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
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataform.projects.locations.repositories.readFile",
            "path": "v1/{+name}:readFile",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "commitSha": { "location": "query" },
              "name": { "location": "path", "required": true },
              "path": { "location": "query" },
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
