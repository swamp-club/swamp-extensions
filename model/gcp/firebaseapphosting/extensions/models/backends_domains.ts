// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/firebaseapphosting/backends-domains
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase App Hosting Backends.Domains.
 *
 * A domain name that is associated with a backend.
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
  return `${parent}/domains/${shortName}`;
}

const BASE_URL = "https://firebaseapphosting.googleapis.com/";

const GET_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.domains.get",
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
  "id": "firebaseapphosting.projects.locations.backends.domains.create",
  "path": "v1/{+parent}/domains",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "domainId": {
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
  "id": "firebaseapphosting.projects.locations.backends.domains.patch",
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
  "id": "firebaseapphosting.projects.locations.backends.domains.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
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

const LIST_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.domains.list",
  "path": "v1/{+parent}/domains",
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
    "showDeleted": {
      "location": "query",
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Annotations as key value pairs.",
  ).optional(),
  customDomainStatus: z.object({
    certState: z.enum([
      "CERT_STATE_UNSPECIFIED",
      "CERT_PREPARING",
      "CERT_VALIDATING",
      "CERT_PROPAGATING",
      "CERT_ACTIVE",
      "CERT_EXPIRING_SOON",
      "CERT_EXPIRED",
    ]).describe("Output only. Tracks SSL certificate status for the domain.")
      .optional(),
    hostState: z.enum([
      "HOST_STATE_UNSPECIFIED",
      "HOST_UNHOSTED",
      "HOST_UNREACHABLE",
      "HOST_NON_FAH",
      "HOST_CONFLICT",
      "HOST_WRONG_SHARD",
      "HOST_ACTIVE",
    ]).describe(
      "Output only. Tracks whether a custom domain is detected as appropriately directing traffic to App Hosting.",
    ).optional(),
    issues: z.array(z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.unknown())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    })).describe(
      "Output only. A list of issues with domain configuration. Allows users to self-correct problems with DNS records.",
    ).optional(),
    ownershipState: z.enum([
      "OWNERSHIP_STATE_UNSPECIFIED",
      "OWNERSHIP_MISSING",
      "OWNERSHIP_UNREACHABLE",
      "OWNERSHIP_MISMATCH",
      "OWNERSHIP_CONFLICT",
      "OWNERSHIP_PENDING",
      "OWNERSHIP_ACTIVE",
    ]).describe(
      "Output only. Tracks whether the backend is permitted to serve content on the domain, based off the domain's DNS records.",
    ).optional(),
    requiredDnsUpdates: z.array(z.object({
      checkTime: z.string().describe(
        "Output only. The last time App Hosting checked your custom domain's DNS records.",
      ).optional(),
      desired: z.array(z.object({
        checkError: z.unknown().describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        domainName: z.unknown().describe(
          "Output only. The domain name the record set pertains to.",
        ).optional(),
        records: z.unknown().describe("Output only. Records on the domain.")
          .optional(),
      })).describe(
        "Output only. The set of DNS records App Hosting needs in order to be able to serve secure content on the domain.",
      ).optional(),
      discovered: z.array(z.object({
        checkError: z.unknown().describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        domainName: z.unknown().describe(
          "Output only. The domain name the record set pertains to.",
        ).optional(),
        records: z.unknown().describe("Output only. Records on the domain.")
          .optional(),
      })).describe(
        "Output only. The set of DNS records App Hosting discovered when inspecting a domain.",
      ).optional(),
      domainName: z.string().describe(
        "Output only. The domain name the DNS updates pertain to.",
      ).optional(),
    })).describe(
      "Output only. Lists the records that must added or removed to a custom domain's DNS in order to finish setup and start serving content. Field is present during onboarding. Also present after onboarding if one or more of the above states is not *_ACTIVE, indicating the domain's DNS records are in a bad state.",
    ).optional(),
  }).describe("The status of a custom domain's linkage to a backend.")
    .optional(),
  disabled: z.boolean().describe(
    "Optional. Whether the domain is disabled. Defaults to false.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Mutable human-readable name for the domain. 63 character limit. e.g. `prod domain`.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the domain, e.g. `/projects/p/locations/l/backends/b/domains/foo.com`",
  ).optional(),
  serve: z.object({
    redirect: z.object({
      status: z.string().describe(
        "Optional. The status code to use in a redirect response. Must be a valid HTTP 3XX status code. Defaults to 302 if not present.",
      ).optional(),
      uri: z.string().describe(
        "Required. The URI of the redirect's intended destination. This URI will be prepended to the original request path. URI without a scheme are assumed to be HTTPS.",
      ).optional(),
    }).describe("Specifies redirect behavior for a domain.").optional(),
  }).describe("Indicates whether App Hosting will serve content on the domain.")
    .optional(),
  domainId: z.string().describe(
    "Required. Id of the domain to create. Must be a valid domain name.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  customDomainStatus: z.object({
    certState: z.string(),
    hostState: z.string(),
    issues: z.array(z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    })),
    ownershipState: z.string(),
    requiredDnsUpdates: z.array(z.object({
      checkTime: z.string(),
      desired: z.array(z.object({
        checkError: z.unknown(),
        domainName: z.unknown(),
        records: z.unknown(),
      })),
      discovered: z.array(z.object({
        checkError: z.unknown(),
        domainName: z.unknown(),
        records: z.unknown(),
      })),
      domainName: z.string(),
    })),
  }).optional(),
  deleteTime: z.string().optional(),
  disabled: z.boolean().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  serve: z.object({
    redirect: z.object({
      status: z.string(),
      uri: z.string(),
    }),
  }).optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Annotations as key value pairs.",
  ).optional(),
  customDomainStatus: z.object({
    certState: z.enum([
      "CERT_STATE_UNSPECIFIED",
      "CERT_PREPARING",
      "CERT_VALIDATING",
      "CERT_PROPAGATING",
      "CERT_ACTIVE",
      "CERT_EXPIRING_SOON",
      "CERT_EXPIRED",
    ]).describe("Output only. Tracks SSL certificate status for the domain.")
      .optional(),
    hostState: z.enum([
      "HOST_STATE_UNSPECIFIED",
      "HOST_UNHOSTED",
      "HOST_UNREACHABLE",
      "HOST_NON_FAH",
      "HOST_CONFLICT",
      "HOST_WRONG_SHARD",
      "HOST_ACTIVE",
    ]).describe(
      "Output only. Tracks whether a custom domain is detected as appropriately directing traffic to App Hosting.",
    ).optional(),
    issues: z.array(z.object({
      code: z.number().int().describe(
        "The status code, which should be an enum value of google.rpc.Code.",
      ).optional(),
      details: z.array(z.record(z.string(), z.unknown())).describe(
        "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
      ).optional(),
      message: z.string().describe(
        "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
      ).optional(),
    })).describe(
      "Output only. A list of issues with domain configuration. Allows users to self-correct problems with DNS records.",
    ).optional(),
    ownershipState: z.enum([
      "OWNERSHIP_STATE_UNSPECIFIED",
      "OWNERSHIP_MISSING",
      "OWNERSHIP_UNREACHABLE",
      "OWNERSHIP_MISMATCH",
      "OWNERSHIP_CONFLICT",
      "OWNERSHIP_PENDING",
      "OWNERSHIP_ACTIVE",
    ]).describe(
      "Output only. Tracks whether the backend is permitted to serve content on the domain, based off the domain's DNS records.",
    ).optional(),
    requiredDnsUpdates: z.array(z.object({
      checkTime: z.string().describe(
        "Output only. The last time App Hosting checked your custom domain's DNS records.",
      ).optional(),
      desired: z.array(z.object({
        checkError: z.unknown().describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        domainName: z.unknown().describe(
          "Output only. The domain name the record set pertains to.",
        ).optional(),
        records: z.unknown().describe("Output only. Records on the domain.")
          .optional(),
      })).describe(
        "Output only. The set of DNS records App Hosting needs in order to be able to serve secure content on the domain.",
      ).optional(),
      discovered: z.array(z.object({
        checkError: z.unknown().describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        domainName: z.unknown().describe(
          "Output only. The domain name the record set pertains to.",
        ).optional(),
        records: z.unknown().describe("Output only. Records on the domain.")
          .optional(),
      })).describe(
        "Output only. The set of DNS records App Hosting discovered when inspecting a domain.",
      ).optional(),
      domainName: z.string().describe(
        "Output only. The domain name the DNS updates pertain to.",
      ).optional(),
    })).describe(
      "Output only. Lists the records that must added or removed to a custom domain's DNS in order to finish setup and start serving content. Field is present during onboarding. Also present after onboarding if one or more of the above states is not *_ACTIVE, indicating the domain's DNS records are in a bad state.",
    ).optional(),
  }).describe("The status of a custom domain's linkage to a backend.")
    .optional(),
  disabled: z.boolean().describe(
    "Optional. Whether the domain is disabled. Defaults to false.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Mutable human-readable name for the domain. 63 character limit. e.g. `prod domain`.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the domain, e.g. `/projects/p/locations/l/backends/b/domains/foo.com`",
  ).optional(),
  serve: z.object({
    redirect: z.object({
      status: z.string().describe(
        "Optional. The status code to use in a redirect response. Must be a valid HTTP 3XX status code. Defaults to 302 if not present.",
      ).optional(),
      uri: z.string().describe(
        "Required. The URI of the redirect's intended destination. This URI will be prepended to the original request path. URI without a scheme are assumed to be HTTPS.",
      ).optional(),
    }).describe("Specifies redirect behavior for a domain.").optional(),
  }).describe("Indicates whether App Hosting will serve content on the domain.")
    .optional(),
  domainId: z.string().describe(
    "Required. Id of the domain to create. Must be a valid domain name.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
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

/** Swamp extension model for Google Cloud Firebase App Hosting Backends.Domains. Registered at `@swamp/gcp/firebaseapphosting/backends-domains`. */
export const model = {
  type: "@swamp/gcp/firebaseapphosting/backends-domains",
  version: "2026.06.08.1",
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
      toVersion: "2026.04.04.1",
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
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A domain name that is associated with a backend.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a domains",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        if (g["customDomainStatus"] !== undefined) {
          body["customDomainStatus"] = g["customDomainStatus"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["serve"] !== undefined) body["serve"] = g["serve"];
        if (g["domainId"] !== undefined) body["domainId"] = g["domainId"];
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
      description: "Get a domains",
      arguments: z.object({
        identifier: z.string().describe("The name of the domains"),
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
      description: "Update domains attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["customDomainStatus"] !== undefined) {
          body["customDomainStatus"] = g["customDomainStatus"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["serve"] !== undefined) body["serve"] = g["serve"];
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
      description: "Delete the domains",
      arguments: z.object({
        identifier: z.string().describe("The name of the domains"),
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
      description: "Sync domains state from GCP",
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
      description: "List domains resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. A filter to narrow down results to a preferred subset. Learn more about filtering in Google's [AIP 160 standard](https://google.aip.dev/160).",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Hint for how to order the results. Supported fields are `name` and `createTime`. To specify descending order, append a `desc` suffix.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of results to return. If not set, the service selects a default.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Optional. If true, the request returns soft-deleted resources that haven't been fully-deleted yet.",
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
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "domains",
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
