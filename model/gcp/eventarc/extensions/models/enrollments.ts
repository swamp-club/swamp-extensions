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

const LIST_CONFIG = {
  "id": "eventarc.projects.locations.enrollments.list",
  "path": "v1/{+parent}/enrollments",
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
  allowMissing: z.string().describe(
    "Optional. If set to true, and the Enrollment is not found, a new Enrollment will be created. In this situation, `update_mask` is ignored.",
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
  allowMissing: z.string().describe(
    "Optional. If set to true, and the Enrollment is not found, a new Enrollment will be created. In this situation, `update_mask` is ignored.",
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

/** Swamp extension model for Google Cloud Eventarc Enrollments. Registered at `@swamp/gcp/eventarc/enrollments`. */
export const model = {
  type: "@swamp/gcp/eventarc/enrollments",
  version: "2026.10.23.1",
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
    {
      toVersion: "2026.05.21.1",
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
      toVersion: "2026.05.21.2",
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
      toVersion: "2026.05.24.1",
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
      toVersion: "2026.05.25.1",
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
      toVersion: "2026.06.07.1",
      description:
        "Added: accessToken, credentialsJson, project. Removed: createTime, etag, uid, updateTime, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
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
      toVersion: "2026.06.08.1",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.07.17.1",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.07.17.2",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.07.18.1",
      description:
        "Added: scopes. Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.07.18.2",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.07.19.1",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.07.20.1",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.07.21.1",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.07.21.2",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.07.29.1",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.08.12.1",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.08.12.2",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.09.07.1",
      description:
        "Added: allowMissing. Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.09.07.2",
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
      toVersion: "2026.10.13.1",
      description:
        "Removed: createTime, etag, uid, updateTime, g, type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          createTime: _createTime,
          etag: _etag,
          uid: _uid,
          updateTime: _updateTime,
          g: _g,
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
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          params["enrollmentId"] = String(g["enrollmentId"]);
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
      description: "Get a enrollments",
      arguments: z.object({
        identifier: z.string().describe("The name of the enrollments"),
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
      description: "Update enrollments attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific enrollments by name (e.g. one discovered by list)",
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
        if (g["allowMissing"] !== undefined) {
          params["allowMissing"] = String(g["allowMissing"]);
        } else if (existing["allowMissing"] !== undefined) {
          params["allowMissing"] = String(existing["allowMissing"]);
        }
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
      description: "Delete the enrollments",
      arguments: z.object({
        identifier: z.string().describe("The name of the enrollments"),
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
      description: "Sync enrollments state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific enrollments by name (e.g. one discovered by list)",
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
      description: "List enrollments resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. The filter field that the list request will filter on. Possible filtersare described in https://google.aip.dev/160.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. The sorting order of the resources returned. Value should be a comma-separated list of fields. The default sorting order is ascending. To specify descending order for a field, append a `desc` suffix; for example: `name desc, update_time`.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of results to return on each page. Note: The service may send fewer.",
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
          "enrollments",
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
            "id": "eventarc.projects.locations.enrollments.getIamPolicy",
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
            "id": "eventarc.projects.locations.enrollments.setIamPolicy",
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
            "id": "eventarc.projects.locations.enrollments.testIamPermissions",
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
