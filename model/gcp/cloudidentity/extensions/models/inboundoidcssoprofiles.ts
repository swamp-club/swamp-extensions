// Auto-generated extension model for @swamp/gcp/cloudidentity/inboundoidcssoprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity InboundOidcSsoProfiles.
 *
 * An [OIDC](https://openid.net/developers/how-connect-works/) federation between a Google enterprise customer and an OIDC identity provider.
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

const BASE_URL = "https://cloudidentity.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudidentity.inboundOidcSsoProfiles.get",
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
  "id": "cloudidentity.inboundOidcSsoProfiles.create",
  "path": "v1/inboundOidcSsoProfiles",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const PATCH_CONFIG = {
  "id": "cloudidentity.inboundOidcSsoProfiles.patch",
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
  "id": "cloudidentity.inboundOidcSsoProfiles.delete",
  "path": "v1/{+name}",
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
  "id": "cloudidentity.inboundOidcSsoProfiles.list",
  "path": "v1/inboundOidcSsoProfiles",
  "httpMethod": "GET",
  "parameterOrder": [],
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  customer: z.string().describe(
    "Immutable. The customer. For example: `customers/C0123abc`.",
  ).optional(),
  displayName: z.string().describe(
    "Human-readable name of the OIDC SSO profile.",
  ).optional(),
  idpConfig: z.object({
    changePasswordUri: z.string().describe(
      "The **Change Password URL** of the identity provider. Users will be sent to this URL when changing their passwords at `myaccount.google.com`. This takes precedence over the change password URL configured at customer-level. Must use `HTTPS`.",
    ).optional(),
    issuerUri: z.string().describe(
      "Required. The Issuer identifier for the IdP. Must be a URL. The discovery URL will be derived from this as described in Section 4 of [the OIDC specification](https://openid.net/specs/openid-connect-discovery-1_0.html).",
    ).optional(),
  }).describe("OIDC IDP (identity provider) configuration.").optional(),
  rpConfig: z.object({
    clientId: z.string().describe("OAuth2 client ID for OIDC.").optional(),
    clientSecret: z.string().describe(
      "Input only. OAuth2 client secret for OIDC.",
    ).optional(),
    redirectUris: z.array(z.string()).describe(
      "Output only. The URL(s) that this client may use in authentication requests.",
    ).optional(),
  }).describe("OIDC RP (relying party) configuration.").optional(),
});

const StateSchema = z.object({
  customer: z.string().optional(),
  displayName: z.string().optional(),
  idpConfig: z.object({
    changePasswordUri: z.string(),
    issuerUri: z.string(),
  }).optional(),
  name: z.string(),
  rpConfig: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
    redirectUris: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  customer: z.string().describe(
    "Immutable. The customer. For example: `customers/C0123abc`.",
  ).optional(),
  displayName: z.string().describe(
    "Human-readable name of the OIDC SSO profile.",
  ).optional(),
  idpConfig: z.object({
    changePasswordUri: z.string().describe(
      "The **Change Password URL** of the identity provider. Users will be sent to this URL when changing their passwords at `myaccount.google.com`. This takes precedence over the change password URL configured at customer-level. Must use `HTTPS`.",
    ).optional(),
    issuerUri: z.string().describe(
      "Required. The Issuer identifier for the IdP. Must be a URL. The discovery URL will be derived from this as described in Section 4 of [the OIDC specification](https://openid.net/specs/openid-connect-discovery-1_0.html).",
    ).optional(),
  }).describe("OIDC IDP (identity provider) configuration.").optional(),
  rpConfig: z.object({
    clientId: z.string().describe("OAuth2 client ID for OIDC.").optional(),
    clientSecret: z.string().describe(
      "Input only. OAuth2 client secret for OIDC.",
    ).optional(),
    redirectUris: z.array(z.string()).describe(
      "Output only. The URL(s) that this client may use in authentication requests.",
    ).optional(),
  }).describe("OIDC RP (relying party) configuration.").optional(),
});

/** Swamp extension model for Google Cloud Identity InboundOidcSsoProfiles. Registered at `@swamp/gcp/cloudidentity/inboundoidcssoprofiles`. */
export const model = {
  type: "@swamp/gcp/cloudidentity/inboundoidcssoprofiles",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An [OIDC](https://openid.net/developers/how-connect-works/) federation betwee...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a inboundOidcSsoProfiles",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["customer"] !== undefined) body["customer"] = g["customer"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["idpConfig"] !== undefined) body["idpConfig"] = g["idpConfig"];
        if (g["rpConfig"] !== undefined) body["rpConfig"] = g["rpConfig"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
      description: "Get a inboundOidcSsoProfiles",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the inboundOidcSsoProfiles",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Update inboundOidcSsoProfiles attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["idpConfig"] !== undefined) body["idpConfig"] = g["idpConfig"];
        if (g["rpConfig"] !== undefined) body["rpConfig"] = g["rpConfig"];
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
      description: "Delete the inboundOidcSsoProfiles",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the inboundOidcSsoProfiles",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync inboundOidcSsoProfiles state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
