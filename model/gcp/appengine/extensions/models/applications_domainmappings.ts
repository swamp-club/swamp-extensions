// Auto-generated extension model for @swamp/gcp/appengine/applications-domainmappings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Engine Admin Applications.DomainMappings.
 *
 * A domain serving an App Engine application.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://appengine.googleapis.com/";

const GET_CONFIG = {
  "id": "appengine.projects.locations.applications.domainMappings.get",
  "path":
    "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectsId",
    "locationsId",
    "applicationsId",
    "domainMappingsId",
  ],
  "parameters": {
    "applicationsId": {
      "location": "path",
      "required": true,
    },
    "domainMappingsId": {
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

const INSERT_CONFIG = {
  "id": "appengine.projects.locations.applications.domainMappings.create",
  "path":
    "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings",
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
    "overrideStrategy": {
      "location": "query",
    },
    "projectsId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "appengine.projects.locations.applications.domainMappings.patch",
  "path":
    "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "projectsId",
    "locationsId",
    "applicationsId",
    "domainMappingsId",
  ],
  "parameters": {
    "applicationsId": {
      "location": "path",
      "required": true,
    },
    "domainMappingsId": {
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
  "id": "appengine.projects.locations.applications.domainMappings.delete",
  "path":
    "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "projectsId",
    "locationsId",
    "applicationsId",
    "domainMappingsId",
  ],
  "parameters": {
    "applicationsId": {
      "location": "path",
      "required": true,
    },
    "domainMappingsId": {
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
  "id": "appengine.projects.locations.applications.domainMappings.list",
  "path":
    "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  id: z.string().describe(
    "Relative name of the domain serving the application. Example: example.com.",
  ).optional(),
  sslSettings: z.object({
    certificateId: z.string().describe(
      "ID of the AuthorizedCertificate resource configuring SSL for the application. Clearing this field will remove SSL support.By default, a managed certificate is automatically created for every domain mapping. To omit SSL support or to configure SSL manually, specify SslManagementType.MANUAL on a CREATE or UPDATE request. You must be authorized to administer the AuthorizedCertificate resource to manually map it to a DomainMapping resource. Example: 12345.",
    ).optional(),
    pendingManagedCertificateId: z.string().describe(
      "Output only. ID of the managed AuthorizedCertificate resource currently being provisioned, if applicable. Until the new managed certificate has been successfully provisioned, the previous SSL state will be preserved. Once the provisioning process completes, the certificate_id field will reflect the new managed certificate and this field will be left empty. To remove SSL support while there is still a pending managed certificate, clear the certificate_id field with an UpdateDomainMappingRequest.@OutputOnly",
    ).optional(),
    sslManagementType: z.enum([
      "SSL_MANAGEMENT_TYPE_UNSPECIFIED",
      "AUTOMATIC",
      "MANUAL",
    ]).describe(
      "SSL management type for this domain. If AUTOMATIC, a managed certificate is automatically provisioned. If MANUAL, certificate_id must be manually specified in order to configure SSL for this domain.",
    ).optional(),
  }).describe("SSL configuration for a DomainMapping resource.").optional(),
  projectsId: z.string().describe(
    "Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp.",
  ),
  locationsId: z.string().describe(
    "Part of `parent`. See documentation of `projectsId`.",
  ),
  applicationsId: z.string().describe(
    "Part of `parent`. See documentation of `projectsId`.",
  ),
  overrideStrategy: z.string().describe(
    "Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected.",
  ).optional(),
});

const StateSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  resourceRecords: z.array(z.object({
    name: z.string(),
    rrdata: z.string(),
    type: z.string(),
  })).optional(),
  sslSettings: z.object({
    certificateId: z.string(),
    pendingManagedCertificateId: z.string(),
    sslManagementType: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  id: z.string().describe(
    "Relative name of the domain serving the application. Example: example.com.",
  ).optional(),
  sslSettings: z.object({
    certificateId: z.string().describe(
      "ID of the AuthorizedCertificate resource configuring SSL for the application. Clearing this field will remove SSL support.By default, a managed certificate is automatically created for every domain mapping. To omit SSL support or to configure SSL manually, specify SslManagementType.MANUAL on a CREATE or UPDATE request. You must be authorized to administer the AuthorizedCertificate resource to manually map it to a DomainMapping resource. Example: 12345.",
    ).optional(),
    pendingManagedCertificateId: z.string().describe(
      "Output only. ID of the managed AuthorizedCertificate resource currently being provisioned, if applicable. Until the new managed certificate has been successfully provisioned, the previous SSL state will be preserved. Once the provisioning process completes, the certificate_id field will reflect the new managed certificate and this field will be left empty. To remove SSL support while there is still a pending managed certificate, clear the certificate_id field with an UpdateDomainMappingRequest.@OutputOnly",
    ).optional(),
    sslManagementType: z.enum([
      "SSL_MANAGEMENT_TYPE_UNSPECIFIED",
      "AUTOMATIC",
      "MANUAL",
    ]).describe(
      "SSL management type for this domain. If AUTOMATIC, a managed certificate is automatically provisioned. If MANUAL, certificate_id must be manually specified in order to configure SSL for this domain.",
    ).optional(),
  }).describe("SSL configuration for a DomainMapping resource.").optional(),
  projectsId: z.string().describe(
    "Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp.",
  ).optional(),
  locationsId: z.string().describe(
    "Part of `parent`. See documentation of `projectsId`.",
  ).optional(),
  applicationsId: z.string().describe(
    "Part of `parent`. See documentation of `projectsId`.",
  ).optional(),
  overrideStrategy: z.string().describe(
    "Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected.",
  ).optional(),
});

/** Swamp extension model for Google Cloud App Engine Admin Applications.DomainMappings. Registered at `@swamp/gcp/appengine/applications-domainmappings`. */
export const model = {
  type: "@swamp/gcp/appengine/applications-domainmappings",
  version: "2026.05.25.1",
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
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A domain serving an App Engine application.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a domainMappings",
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
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["sslSettings"] !== undefined) {
          body["sslSettings"] = g["sslSettings"];
        }
        if (g["overrideStrategy"] !== undefined) {
          body["overrideStrategy"] = g["overrideStrategy"];
        }
        if (g["name"] !== undefined) {
          params["domainMappingsId"] = String(g["name"]);
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a domainMappings",
      arguments: z.object({
        identifier: z.string().describe("The name of the domainMappings"),
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
        params["domainMappingsId"] = args.identifier;
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
      description: "Update domainMappings attributes",
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
        params["domainMappingsId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["sslSettings"] !== undefined) {
          body["sslSettings"] = g["sslSettings"];
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
      description: "Delete the domainMappings",
      arguments: z.object({
        identifier: z.string().describe("The name of the domainMappings"),
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
        params["domainMappingsId"] = args.identifier;
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
      description: "Sync domainMappings state from GCP",
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
          params["domainMappingsId"] = identifier;
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
    list: {
      description: "List domainMappings resources",
      arguments: z.object({
        pageSize: z.number().describe("Maximum results to return per page.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "domainMappings",
          (args.maxPages as number | undefined) ?? 10,
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
