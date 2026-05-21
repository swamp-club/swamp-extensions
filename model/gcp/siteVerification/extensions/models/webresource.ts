// Auto-generated extension model for @swamp/gcp/siteverification/webresource
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Site Verification WebResource.
 *
 * Get the most current data for a website or domain.
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

const BASE_URL = "https://www.googleapis.com/siteVerification/v1/";

const GET_CONFIG = {
  "id": "siteVerification.webResource.get",
  "path": "webResource/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "siteVerification.webResource.insert",
  "path": "webResource",
  "httpMethod": "POST",
  "parameterOrder": [
    "verificationMethod",
  ],
  "parameters": {
    "verificationMethod": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "siteVerification.webResource.update",
  "path": "webResource/{id}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "siteVerification.webResource.delete",
  "path": "webResource/{id}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "siteVerification.webResource.list",
  "path": "webResource",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {},
} as const;

const GlobalArgsSchema = z.object({
  id: z.string().describe(
    'The string used to identify this site. This value should be used in the "id" portion of the REST URL for the Get, Update, and Delete operations.',
  ).optional(),
  owners: z.array(z.string()).describe(
    "The email addresses of all verified owners.",
  ).optional(),
  site: z.object({
    identifier: z.string().describe(
      "The site identifier. If the type is set to SITE, the identifier is a URL. If the type is set to INET_DOMAIN, the site identifier is a domain name.",
    ).optional(),
    type: z.string().describe(
      "The site type. Can be SITE or INET_DOMAIN (domain name).",
    ).optional(),
  }).describe(
    "The address and type of a site that is verified or will be verified.",
  ).optional(),
  verificationMethod: z.string().describe(
    "The method to use for verifying a site or domain.",
  ),
});

const StateSchema = z.object({
  id: z.string(),
  owners: z.array(z.string()).optional(),
  site: z.object({
    identifier: z.string(),
    type: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  id: z.string().describe(
    'The string used to identify this site. This value should be used in the "id" portion of the REST URL for the Get, Update, and Delete operations.',
  ).optional(),
  owners: z.array(z.string()).describe(
    "The email addresses of all verified owners.",
  ).optional(),
  site: z.object({
    identifier: z.string().describe(
      "The site identifier. If the type is set to SITE, the identifier is a URL. If the type is set to INET_DOMAIN, the site identifier is a domain name.",
    ).optional(),
    type: z.string().describe(
      "The site type. Can be SITE or INET_DOMAIN (domain name).",
    ).optional(),
  }).describe(
    "The address and type of a site that is verified or will be verified.",
  ).optional(),
  verificationMethod: z.string().describe(
    "The method to use for verifying a site or domain.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Site Verification WebResource. Registered at `@swamp/gcp/siteverification/webresource`. */
export const model = {
  type: "@swamp/gcp/siteverification/webresource",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Get the most current data for a website or domain.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a webResource",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["verificationMethod"] !== undefined) {
          params["verificationMethod"] = String(g["verificationMethod"]);
        }
        const body: Record<string, unknown> = {};
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["owners"] !== undefined) body["owners"] = g["owners"];
        if (g["site"] !== undefined) body["site"] = g["site"];
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.id ?? g.id)?.toString() ?? "current")
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
      description: "Get a webResource",
      arguments: z.object({
        identifier: z.string().describe("The id of the webResource"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.id ?? g.id)?.toString() ?? args.identifier).replace(
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
      description: "Update webResource attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
        params["id"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["owners"] !== undefined) body["owners"] = g["owners"];
        if (g["site"] !== undefined) body["site"] = g["site"];
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
      description: "Delete the webResource",
      arguments: z.object({
        identifier: z.string().describe("The id of the webResource"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["id"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.id?.toString() ?? args.identifier).replace(
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
      description: "Sync webResource state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
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
    get_token: {
      description: "get token",
      arguments: z.object({
        site: z.any().optional(),
        verificationMethod: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["site"] !== undefined) body["site"] = args["site"];
        if (args["verificationMethod"] !== undefined) {
          body["verificationMethod"] = args["verificationMethod"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "siteVerification.webResource.getToken",
            "path": "token",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
