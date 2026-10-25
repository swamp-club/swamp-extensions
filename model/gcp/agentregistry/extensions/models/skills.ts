// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/agentregistry/skills
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Registry Skills.
 *
 * Represents an Executable Agent Skill or a Composite Tool Suite (Bundle). Sibling resource with Agent and McpServer under agentregistry.googleapis.com.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  return `${parent}/skills/${shortName}`;
}

const BASE_URL = "https://agentregistry.googleapis.com/";

const GET_CONFIG = {
  "id": "agentregistry.projects.locations.skills.get",
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
  "id": "agentregistry.projects.locations.skills.create",
  "path": "v1/{+parent}/skills",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "skillId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "agentregistry.projects.locations.skills.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "agentregistry.projects.locations.skills.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "agentregistry.projects.locations.skills.list",
  "path": "v1/{+parent}/skills",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  defaultRevision: z.string().describe(
    "Optional. The full resource name of the revision currently served by default (floating track). Format: `projects/{project}/locations/{location}/skills/{skill}/revisions/{revision}`",
  ).optional(),
  description: z.string().describe(
    "Optional. Brief summary describing the capabilities of the skill. Maximum length is 2048 characters.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Human-readable display name of the skill. Maximum length is 128 characters.",
  ).optional(),
  initialRevision: z.object({
    archiveUploadSource: z.object({
      archiveContent: z.string().describe(
        "Required. Input only. Write-only raw ZIP/TAR archive payload bytes containing the skill package.",
      ).optional(),
    }).describe(
      "Optional. Immutable. Direct write-only raw archive upload source.",
    ).optional(),
    createTime: z.string().describe("Output only. Revision creation timestamp.")
      .optional(),
    frontmatter: z.object({
      compatibility: z.string().describe(
        "Optional. Environmental dependencies or local sidecars.",
      ).optional(),
      description: z.string().describe("Required. Functional description.")
        .optional(),
      license: z.string().describe("Optional. License.").optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Optional. Extensible flattened map mapping custom tags, authors, and version parameters.",
      ).optional(),
      name: z.string().describe("Required. The name of the skill.").optional(),
    }).describe(
      "Output only. Extracted YAML frontmatter configuration snapshot.",
    ).optional(),
    gcsSource: z.object({
      generation: z.string().describe(
        "Optional. Cloud Storage object generation ID. If not specified, the latest generation is used.",
      ).optional(),
      uri: z.string().describe(
        "Required. Cloud Storage object URI. Format: `gs://{bucket_name}/{object_name}`",
      ).optional(),
    }).describe("Optional. Immutable. Cloud Storage object generation URI.")
      .optional(),
    name: z.string().describe(
      "Identifier. Resource name of the SkillRevision. Format: `projects/{project}/locations/{location}/skills/{skill}/revisions/{revision}`",
    ).optional(),
    scanResult: z.object({
      errorMessage: z.string().describe(
        "Output only. The error message if the scan failed.",
      ).optional(),
      findings: z.array(z.string()).describe(
        "Output only. The finding resource names for the skill revision.",
      ).optional(),
      scanState: z.enum([
        "SCAN_STATE_UNSPECIFIED",
        "FAILED",
        "UNSUPPORTED_FORMAT",
        "SUCCEEDED",
        "DISABLED",
        "RUNNING",
      ]).describe("Output only. The state of the vulnerability check.")
        .optional(),
      scanTime: z.string().describe(
        "Output only. The time when the scan was completed.",
      ).optional(),
    }).describe("Output only. Scan result of the skill revision.").optional(),
    sha256Hash: z.string().describe(
      "Output only. Cryptographic SHA-256 integrity and deduplication digest of the payload zip.",
    ).optional(),
    sizeBytes: z.string().describe(
      "Output only. Size of the compiled zip payload in bytes (assists client download progress).",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "ACTIVE",
      "FAILED",
      "DELETING",
    ]).describe(
      "Output only. The system-managed lifecycle state of this revision.",
    ).optional(),
    uid: z.string().describe(
      "Output only. Universally unique identifier (UUID4) for the skill revision.",
    ).optional(),
  }).describe(
    "Optional. Input only. Optional nested initial revision payload to support standard one-shot creation. The server processes this field on input during creation but must never return it in responses.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the Skill. Format: `projects/{project}/locations/{location}/skills/{skill}` The `{skill}` segment acts as the resource ID. If the skill is associated with a Publisher, this segment typically uses a hyphenated namespace prefix corresponding to the publisher (e.g., `google-workspace-create-docs`).",
  ).optional(),
  publisher: z.string().describe(
    "Optional. The publisher resource associated with this skill. Format: `projects/{project}/locations/{location}/publishers/{publisher}` The publisher dictates the allowed namespace prefixes for the skill's name and logical `skill_id` (e.g., Publisher `google` authorizes the `google-*` prefix).",
  ).optional(),
  scanningConfig: z.object({
    policy: z.enum([
      "POLICY_UNSPECIFIED",
      "DISABLED",
      "ENABLED_BLOCKING",
      "ENABLED_NONBLOCKING",
    ]).describe("Optional. The security scanning policy.").optional(),
  }).describe("Optional. Optional. Scanning configuration for the skill.")
    .optional(),
  targetState: z.enum([
    "TARGET_STATE_UNSPECIFIED",
    "TARGET_STATE_DRAFT",
    "TARGET_STATE_ACTIVE",
    "TARGET_STATE_DISABLED",
    "TARGET_STATE_DEPRECATED",
    "TARGET_STATE_DECOMMISSIONED",
  ]).describe("Required. User-managed target state of the skill.").optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "SIMPLE"]).describe(
    "Required. Structural deployment type (SIMPLE leaf vs COMPOSITE bundle).",
  ).optional(),
  requestId: z.string().describe(
    "Optional. Signed UUID request idempotency token.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  defaultRevision: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  frontmatter: z.object({
    compatibility: z.string(),
    description: z.string(),
    license: z.string(),
    metadata: z.record(z.string(), z.unknown()),
    name: z.string(),
  }).optional(),
  initialRevision: z.object({
    archiveUploadSource: z.object({
      archiveContent: z.string(),
    }),
    createTime: z.string(),
    frontmatter: z.object({
      compatibility: z.string(),
      description: z.string(),
      license: z.string(),
      metadata: z.record(z.string(), z.unknown()),
      name: z.string(),
    }),
    gcsSource: z.object({
      generation: z.string(),
      uri: z.string(),
    }),
    name: z.string(),
    scanResult: z.object({
      errorMessage: z.string(),
      findings: z.array(z.string()),
      scanState: z.string(),
      scanTime: z.string(),
    }),
    sha256Hash: z.string(),
    sizeBytes: z.string(),
    state: z.string(),
    uid: z.string(),
  }).optional(),
  name: z.string(),
  publisher: z.string().optional(),
  scanningConfig: z.object({
    policy: z.string(),
  }).optional(),
  skillId: z.string().optional(),
  state: z.string().optional(),
  targetState: z.string().optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  defaultRevision: z.string().describe(
    "Optional. The full resource name of the revision currently served by default (floating track). Format: `projects/{project}/locations/{location}/skills/{skill}/revisions/{revision}`",
  ).optional(),
  description: z.string().describe(
    "Optional. Brief summary describing the capabilities of the skill. Maximum length is 2048 characters.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Human-readable display name of the skill. Maximum length is 128 characters.",
  ).optional(),
  initialRevision: z.object({
    archiveUploadSource: z.object({
      archiveContent: z.string().describe(
        "Required. Input only. Write-only raw ZIP/TAR archive payload bytes containing the skill package.",
      ).optional(),
    }).describe(
      "Optional. Immutable. Direct write-only raw archive upload source.",
    ).optional(),
    createTime: z.string().describe("Output only. Revision creation timestamp.")
      .optional(),
    frontmatter: z.object({
      compatibility: z.string().describe(
        "Optional. Environmental dependencies or local sidecars.",
      ).optional(),
      description: z.string().describe("Required. Functional description.")
        .optional(),
      license: z.string().describe("Optional. License.").optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Optional. Extensible flattened map mapping custom tags, authors, and version parameters.",
      ).optional(),
      name: z.string().describe("Required. The name of the skill.").optional(),
    }).describe(
      "Output only. Extracted YAML frontmatter configuration snapshot.",
    ).optional(),
    gcsSource: z.object({
      generation: z.string().describe(
        "Optional. Cloud Storage object generation ID. If not specified, the latest generation is used.",
      ).optional(),
      uri: z.string().describe(
        "Required. Cloud Storage object URI. Format: `gs://{bucket_name}/{object_name}`",
      ).optional(),
    }).describe("Optional. Immutable. Cloud Storage object generation URI.")
      .optional(),
    name: z.string().describe(
      "Identifier. Resource name of the SkillRevision. Format: `projects/{project}/locations/{location}/skills/{skill}/revisions/{revision}`",
    ).optional(),
    scanResult: z.object({
      errorMessage: z.string().describe(
        "Output only. The error message if the scan failed.",
      ).optional(),
      findings: z.array(z.string()).describe(
        "Output only. The finding resource names for the skill revision.",
      ).optional(),
      scanState: z.enum([
        "SCAN_STATE_UNSPECIFIED",
        "FAILED",
        "UNSUPPORTED_FORMAT",
        "SUCCEEDED",
        "DISABLED",
        "RUNNING",
      ]).describe("Output only. The state of the vulnerability check.")
        .optional(),
      scanTime: z.string().describe(
        "Output only. The time when the scan was completed.",
      ).optional(),
    }).describe("Output only. Scan result of the skill revision.").optional(),
    sha256Hash: z.string().describe(
      "Output only. Cryptographic SHA-256 integrity and deduplication digest of the payload zip.",
    ).optional(),
    sizeBytes: z.string().describe(
      "Output only. Size of the compiled zip payload in bytes (assists client download progress).",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "ACTIVE",
      "FAILED",
      "DELETING",
    ]).describe(
      "Output only. The system-managed lifecycle state of this revision.",
    ).optional(),
    uid: z.string().describe(
      "Output only. Universally unique identifier (UUID4) for the skill revision.",
    ).optional(),
  }).describe(
    "Optional. Input only. Optional nested initial revision payload to support standard one-shot creation. The server processes this field on input during creation but must never return it in responses.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the Skill. Format: `projects/{project}/locations/{location}/skills/{skill}` The `{skill}` segment acts as the resource ID. If the skill is associated with a Publisher, this segment typically uses a hyphenated namespace prefix corresponding to the publisher (e.g., `google-workspace-create-docs`).",
  ).optional(),
  publisher: z.string().describe(
    "Optional. The publisher resource associated with this skill. Format: `projects/{project}/locations/{location}/publishers/{publisher}` The publisher dictates the allowed namespace prefixes for the skill's name and logical `skill_id` (e.g., Publisher `google` authorizes the `google-*` prefix).",
  ).optional(),
  scanningConfig: z.object({
    policy: z.enum([
      "POLICY_UNSPECIFIED",
      "DISABLED",
      "ENABLED_BLOCKING",
      "ENABLED_NONBLOCKING",
    ]).describe("Optional. The security scanning policy.").optional(),
  }).describe("Optional. Optional. Scanning configuration for the skill.")
    .optional(),
  targetState: z.enum([
    "TARGET_STATE_UNSPECIFIED",
    "TARGET_STATE_DRAFT",
    "TARGET_STATE_ACTIVE",
    "TARGET_STATE_DISABLED",
    "TARGET_STATE_DEPRECATED",
    "TARGET_STATE_DECOMMISSIONED",
  ]).describe("Required. User-managed target state of the skill.").optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "SIMPLE"]).describe(
    "Required. Structural deployment type (SIMPLE leaf vs COMPOSITE bundle).",
  ).optional(),
  requestId: z.string().describe(
    "Optional. Signed UUID request idempotency token.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Agent Registry Skills. Registered at `@swamp/gcp/agentregistry/skills`. */
export const model = {
  type: "@swamp/gcp/agentregistry/skills",
  version: "2026.10.25.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents an Executable Agent Skill or a Composite Tool Suite (Bundle). Sibl...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a skills",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["defaultRevision"] !== undefined) {
          body["defaultRevision"] = g["defaultRevision"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["initialRevision"] !== undefined) {
          body["initialRevision"] = g["initialRevision"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["publisher"] !== undefined) body["publisher"] = g["publisher"];
        if (g["scanningConfig"] !== undefined) {
          body["scanningConfig"] = g["scanningConfig"];
        }
        if (g["targetState"] !== undefined) {
          body["targetState"] = g["targetState"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a skills",
      arguments: z.object({
        identifier: z.string().describe("The name of the skills"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update skills attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific skills by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["defaultRevision"] !== undefined) {
          body["defaultRevision"] = g["defaultRevision"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["initialRevision"] !== undefined) {
          body["initialRevision"] = g["initialRevision"];
        }
        if (g["publisher"] !== undefined) body["publisher"] = g["publisher"];
        if (g["scanningConfig"] !== undefined) {
          body["scanningConfig"] = g["scanningConfig"];
        }
        if (g["targetState"] !== undefined) {
          body["targetState"] = g["targetState"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
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
      description: "Delete the skills",
      arguments: z.object({
        identifier: z.string().describe("The name of the skills"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync skills state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific skills by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List skills resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Use this field to specify filter criteria on list results. Filter expressions can be used to restrict results based upon filterable fields, where equality operators can be used. See [instructions](https://docs.cloud.google.com/agent-registry/search-agents-and-tools) for more details. Allowed operators: `=`, `<`, `>`, `NOT`, `AND`, `OR`, and `()`. | Field | `=` | `<`, `>` | |--------------|-----|----------| | state | Yes | No | | targetState | Yes | No | | createTime | Yes | Yes | | updateTime | Yes | Yes | Examples: * `state=ACTIVE` to restrict results to skills in the `ACTIVE` state.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Hint for how to order the results",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "skills",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options_requestedPolicyVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "agentregistry.projects.locations.skills.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    search: {
      description: "search",
      arguments: z.object({
        filter: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        searchString: z.any().optional(),
        searchType: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["pageToken"] !== undefined) {
          params["pageToken"] = String(args["pageToken"]);
        }
        if (args["searchString"] !== undefined) {
          params["searchString"] = String(args["searchString"]);
        }
        if (args["searchType"] !== undefined) {
          params["searchType"] = String(args["searchType"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "agentregistry.projects.locations.skills.search",
            "path": "v1/{+parent}/skills:search",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "filter": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "searchString": { "location": "query" },
              "searchType": { "location": "query" },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "agentregistry.projects.locations.skills.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "agentregistry.projects.locations.skills.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
  },
};
