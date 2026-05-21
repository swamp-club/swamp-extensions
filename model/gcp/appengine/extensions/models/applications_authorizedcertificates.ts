// Auto-generated extension model for @swamp/gcp/appengine/applications-authorizedcertificates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Engine Admin Applications.AuthorizedCertificates.
 *
 * An SSL certificate that a user has been authorized to administer. A user is authorized to administer any certificate that applies to one of their authorized domains.
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

const BASE_URL = "https://appengine.googleapis.com/";

const GET_CONFIG = {
  "id": "appengine.projects.locations.applications.authorizedCertificates.get",
  "path":
    "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectsId",
    "locationsId",
    "applicationsId",
    "authorizedCertificatesId",
  ],
  "parameters": {
    "applicationsId": {
      "location": "path",
      "required": true,
    },
    "authorizedCertificatesId": {
      "location": "path",
      "required": true,
    },
    "locationsId": {
      "location": "path",
      "required": true,
    },
    "projectsId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id":
    "appengine.projects.locations.applications.authorizedCertificates.create",
  "path":
    "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectsId",
    "locationsId",
    "applicationsId",
  ],
  "parameters": {
    "applicationsId": {
      "location": "path",
      "required": true,
    },
    "locationsId": {
      "location": "path",
      "required": true,
    },
    "projectsId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "appengine.projects.locations.applications.authorizedCertificates.patch",
  "path":
    "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "projectsId",
    "locationsId",
    "applicationsId",
    "authorizedCertificatesId",
  ],
  "parameters": {
    "applicationsId": {
      "location": "path",
      "required": true,
    },
    "authorizedCertificatesId": {
      "location": "path",
      "required": true,
    },
    "locationsId": {
      "location": "path",
      "required": true,
    },
    "projectsId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "appengine.projects.locations.applications.authorizedCertificates.delete",
  "path":
    "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "projectsId",
    "locationsId",
    "applicationsId",
    "authorizedCertificatesId",
  ],
  "parameters": {
    "applicationsId": {
      "location": "path",
      "required": true,
    },
    "authorizedCertificatesId": {
      "location": "path",
      "required": true,
    },
    "locationsId": {
      "location": "path",
      "required": true,
    },
    "projectsId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "appengine.projects.locations.applications.authorizedCertificates.list",
  "path":
    "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectsId",
    "locationsId",
    "applicationsId",
  ],
  "parameters": {
    "applicationsId": {
      "location": "path",
      "required": true,
    },
    "locationsId": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projectsId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  certificateRawData: z.object({
    privateKey: z.string().describe(
      "Unencrypted PEM encoded RSA private key. This field is set once on certificate creation and then encrypted. The key size must be 2048 bits or fewer. Must include the header and footer. Example: -----BEGIN RSA PRIVATE KEY----- -----END RSA PRIVATE KEY----- @InputOnly",
    ).optional(),
    publicCertificate: z.string().describe(
      "PEM encoded x.509 public key certificate. This field is set once on certificate creation. Must include the header and footer. Example: -----BEGIN CERTIFICATE----- -----END CERTIFICATE-----",
    ).optional(),
  }).describe("An SSL certificate obtained from a certificate authority.")
    .optional(),
  displayName: z.string().describe(
    "The user-specified display name of the certificate. This is not guaranteed to be unique. Example: My Certificate.",
  ).optional(),
  domainMappingsCount: z.number().int().describe(
    "Aggregate count of the domain mappings with this certificate mapped. This count includes domain mappings on applications for which the user does not have VIEWER permissions.Only returned by GET or LIST requests when specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly",
  ).optional(),
  expireTime: z.string().describe(
    "The time when this certificate expires. To update the renewal time on this certificate, upload an SSL certificate with a different expiration time using AuthorizedCertificates.UpdateAuthorizedCertificate.@OutputOnly",
  ).optional(),
  managedCertificate: z.object({
    lastRenewalTime: z.string().describe(
      "Time at which the certificate was last renewed. The renewal process is fully managed. Certificate renewal will automatically occur before the certificate expires. Renewal errors can be tracked via ManagementStatus.@OutputOnly",
    ).optional(),
    status: z.enum([
      "MANAGEMENT_STATUS_UNSPECIFIED",
      "OK",
      "PENDING",
      "FAILED_RETRYING_NOT_VISIBLE",
      "FAILED_PERMANENT",
      "FAILED_RETRYING_CAA_FORBIDDEN",
      "FAILED_RETRYING_CAA_CHECKING",
    ]).describe(
      "Status of certificate management. Refers to the most recent certificate acquisition or renewal attempt.@OutputOnly",
    ).optional(),
  }).describe("A certificate managed by App Engine.").optional(),
  projectsId: z.string().describe(
    "Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp.",
  ),
  locationsId: z.string().describe(
    "Part of `parent`. See documentation of `projectsId`.",
  ),
  applicationsId: z.string().describe(
    "Part of `parent`. See documentation of `projectsId`.",
  ),
});

const StateSchema = z.object({
  certificateRawData: z.object({
    privateKey: z.string(),
    publicCertificate: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  domainMappingsCount: z.number().optional(),
  domainNames: z.array(z.string()).optional(),
  expireTime: z.string().optional(),
  id: z.string().optional(),
  managedCertificate: z.object({
    lastRenewalTime: z.string(),
    status: z.string(),
  }).optional(),
  name: z.string(),
  visibleDomainMappings: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  certificateRawData: z.object({
    privateKey: z.string().describe(
      "Unencrypted PEM encoded RSA private key. This field is set once on certificate creation and then encrypted. The key size must be 2048 bits or fewer. Must include the header and footer. Example: -----BEGIN RSA PRIVATE KEY----- -----END RSA PRIVATE KEY----- @InputOnly",
    ).optional(),
    publicCertificate: z.string().describe(
      "PEM encoded x.509 public key certificate. This field is set once on certificate creation. Must include the header and footer. Example: -----BEGIN CERTIFICATE----- -----END CERTIFICATE-----",
    ).optional(),
  }).describe("An SSL certificate obtained from a certificate authority.")
    .optional(),
  displayName: z.string().describe(
    "The user-specified display name of the certificate. This is not guaranteed to be unique. Example: My Certificate.",
  ).optional(),
  domainMappingsCount: z.number().int().describe(
    "Aggregate count of the domain mappings with this certificate mapped. This count includes domain mappings on applications for which the user does not have VIEWER permissions.Only returned by GET or LIST requests when specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly",
  ).optional(),
  expireTime: z.string().describe(
    "The time when this certificate expires. To update the renewal time on this certificate, upload an SSL certificate with a different expiration time using AuthorizedCertificates.UpdateAuthorizedCertificate.@OutputOnly",
  ).optional(),
  managedCertificate: z.object({
    lastRenewalTime: z.string().describe(
      "Time at which the certificate was last renewed. The renewal process is fully managed. Certificate renewal will automatically occur before the certificate expires. Renewal errors can be tracked via ManagementStatus.@OutputOnly",
    ).optional(),
    status: z.enum([
      "MANAGEMENT_STATUS_UNSPECIFIED",
      "OK",
      "PENDING",
      "FAILED_RETRYING_NOT_VISIBLE",
      "FAILED_PERMANENT",
      "FAILED_RETRYING_CAA_FORBIDDEN",
      "FAILED_RETRYING_CAA_CHECKING",
    ]).describe(
      "Status of certificate management. Refers to the most recent certificate acquisition or renewal attempt.@OutputOnly",
    ).optional(),
  }).describe("A certificate managed by App Engine.").optional(),
  projectsId: z.string().describe(
    "Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp.",
  ).optional(),
  locationsId: z.string().describe(
    "Part of `parent`. See documentation of `projectsId`.",
  ).optional(),
  applicationsId: z.string().describe(
    "Part of `parent`. See documentation of `projectsId`.",
  ).optional(),
});

/** Swamp extension model for Google Cloud App Engine Admin Applications.AuthorizedCertificates. Registered at `@swamp/gcp/appengine/applications-authorizedcertificates`. */
export const model = {
  type: "@swamp/gcp/appengine/applications-authorizedcertificates",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An SSL certificate that a user has been authorized to administer. A user is a...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a authorizedCertificates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["projectsId"] !== undefined) {
          params["projectsId"] = String(g["projectsId"]);
        }
        if (g["locationsId"] !== undefined) {
          params["locationsId"] = String(g["locationsId"]);
        }
        if (g["applicationsId"] !== undefined) {
          params["applicationsId"] = String(g["applicationsId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["certificateRawData"] !== undefined) {
          body["certificateRawData"] = g["certificateRawData"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["domainMappingsCount"] !== undefined) {
          body["domainMappingsCount"] = g["domainMappingsCount"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["managedCertificate"] !== undefined) {
          body["managedCertificate"] = g["managedCertificate"];
        }
        if (g["name"] !== undefined) {
          params["authorizedCertificatesId"] = String(g["name"]);
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
              "projectsId": String(g["projectsId"] ?? ""),
              "locationsId": String(g["locationsId"] ?? ""),
              "applicationsId": String(g["applicationsId"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a authorizedCertificates",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the authorizedCertificates",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["projectsId"] !== undefined) {
          params["projectsId"] = String(g["projectsId"]);
        }
        if (g["locationsId"] !== undefined) {
          params["locationsId"] = String(g["locationsId"]);
        }
        if (g["applicationsId"] !== undefined) {
          params["applicationsId"] = String(g["applicationsId"]);
        }
        params["authorizedCertificatesId"] = args.identifier;
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
      description: "Update authorizedCertificates attributes",
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
        if (g["projectsId"] !== undefined) {
          params["projectsId"] = String(g["projectsId"]);
        } else if (existing["projectsId"]) {
          params["projectsId"] = String(existing["projectsId"]);
        }
        if (g["locationsId"] !== undefined) {
          params["locationsId"] = String(g["locationsId"]);
        } else if (existing["locationsId"]) {
          params["locationsId"] = String(existing["locationsId"]);
        }
        if (g["applicationsId"] !== undefined) {
          params["applicationsId"] = String(g["applicationsId"]);
        } else if (existing["applicationsId"]) {
          params["applicationsId"] = String(existing["applicationsId"]);
        }
        params["authorizedCertificatesId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["certificateRawData"] !== undefined) {
          body["certificateRawData"] = g["certificateRawData"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["domainMappingsCount"] !== undefined) {
          body["domainMappingsCount"] = g["domainMappingsCount"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["managedCertificate"] !== undefined) {
          body["managedCertificate"] = g["managedCertificate"];
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
      description: "Delete the authorizedCertificates",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the authorizedCertificates",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["projectsId"] !== undefined) {
          params["projectsId"] = String(g["projectsId"]);
        }
        if (g["locationsId"] !== undefined) {
          params["locationsId"] = String(g["locationsId"]);
        }
        if (g["applicationsId"] !== undefined) {
          params["applicationsId"] = String(g["applicationsId"]);
        }
        params["authorizedCertificatesId"] = args.identifier;
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
      description: "Sync authorizedCertificates state from GCP",
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
          if (g["projectsId"] !== undefined) {
            params["projectsId"] = String(g["projectsId"]);
          } else if (existing["projectsId"]) {
            params["projectsId"] = String(existing["projectsId"]);
          }
          if (g["locationsId"] !== undefined) {
            params["locationsId"] = String(g["locationsId"]);
          } else if (existing["locationsId"]) {
            params["locationsId"] = String(existing["locationsId"]);
          }
          if (g["applicationsId"] !== undefined) {
            params["applicationsId"] = String(g["applicationsId"]);
          } else if (existing["applicationsId"]) {
            params["applicationsId"] = String(existing["applicationsId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["authorizedCertificatesId"] = identifier;
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
