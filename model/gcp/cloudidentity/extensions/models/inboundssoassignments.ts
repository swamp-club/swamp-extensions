// Auto-generated extension model for @swamp/gcp/cloudidentity/inboundssoassignments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity InboundSsoAssignments.
 *
 * Targets with "set" SSO assignments and their respective assignments.
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
  "id": "cloudidentity.inboundSsoAssignments.get",
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
  "id": "cloudidentity.inboundSsoAssignments.create",
  "path": "v1/inboundSsoAssignments",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const PATCH_CONFIG = {
  "id": "cloudidentity.inboundSsoAssignments.patch",
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
  "id": "cloudidentity.inboundSsoAssignments.delete",
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
  "id": "cloudidentity.inboundSsoAssignments.list",
  "path": "v1/inboundSsoAssignments",
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
  oidcSsoInfo: z.object({
    inboundOidcSsoProfile: z.string().describe(
      "Required. Name of the `InboundOidcSsoProfile` to use. Must be of the form `inboundOidcSsoProfiles/{inbound_oidc_sso_profile}`.",
    ).optional(),
  }).describe(
    "Details that are applicable when `sso_mode` is set to `OIDC_SSO`.",
  ).optional(),
  rank: z.number().int().describe(
    "Must be zero (which is the default value so it can be omitted) for assignments with `target_org_unit` set and must be greater-than-or-equal-to one for assignments with `target_group` set.",
  ).optional(),
  samlSsoInfo: z.object({
    inboundSamlSsoProfile: z.string().describe(
      "Required. Name of the `InboundSamlSsoProfile` to use. Must be of the form `inboundSamlSsoProfiles/{inbound_saml_sso_profile}`.",
    ).optional(),
  }).describe("Details that are applicable when `sso_mode` == `SAML_SSO`.")
    .optional(),
  signInBehavior: z.object({
    redirectCondition: z.enum(["REDIRECT_CONDITION_UNSPECIFIED", "NEVER"])
      .describe("When to redirect sign-ins to the IdP.").optional(),
  }).describe("Controls sign-in behavior.").optional(),
  ssoMode: z.enum([
    "SSO_MODE_UNSPECIFIED",
    "SSO_OFF",
    "SAML_SSO",
    "OIDC_SSO",
    "DOMAIN_WIDE_SAML_IF_ENABLED",
  ]).describe("Inbound SSO behavior.").optional(),
  targetGroup: z.string().describe(
    "Immutable. Must be of the form `groups/{group}`.",
  ).optional(),
  targetOrgUnit: z.string().describe(
    "Immutable. Must be of the form `orgUnits/{org_unit}`.",
  ).optional(),
});

const StateSchema = z.object({
  customer: z.string().optional(),
  name: z.string(),
  oidcSsoInfo: z.object({
    inboundOidcSsoProfile: z.string(),
  }).optional(),
  rank: z.number().optional(),
  samlSsoInfo: z.object({
    inboundSamlSsoProfile: z.string(),
  }).optional(),
  signInBehavior: z.object({
    redirectCondition: z.string(),
  }).optional(),
  ssoMode: z.string().optional(),
  targetGroup: z.string().optional(),
  targetOrgUnit: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  customer: z.string().describe(
    "Immutable. The customer. For example: `customers/C0123abc`.",
  ).optional(),
  oidcSsoInfo: z.object({
    inboundOidcSsoProfile: z.string().describe(
      "Required. Name of the `InboundOidcSsoProfile` to use. Must be of the form `inboundOidcSsoProfiles/{inbound_oidc_sso_profile}`.",
    ).optional(),
  }).describe(
    "Details that are applicable when `sso_mode` is set to `OIDC_SSO`.",
  ).optional(),
  rank: z.number().int().describe(
    "Must be zero (which is the default value so it can be omitted) for assignments with `target_org_unit` set and must be greater-than-or-equal-to one for assignments with `target_group` set.",
  ).optional(),
  samlSsoInfo: z.object({
    inboundSamlSsoProfile: z.string().describe(
      "Required. Name of the `InboundSamlSsoProfile` to use. Must be of the form `inboundSamlSsoProfiles/{inbound_saml_sso_profile}`.",
    ).optional(),
  }).describe("Details that are applicable when `sso_mode` == `SAML_SSO`.")
    .optional(),
  signInBehavior: z.object({
    redirectCondition: z.enum(["REDIRECT_CONDITION_UNSPECIFIED", "NEVER"])
      .describe("When to redirect sign-ins to the IdP.").optional(),
  }).describe("Controls sign-in behavior.").optional(),
  ssoMode: z.enum([
    "SSO_MODE_UNSPECIFIED",
    "SSO_OFF",
    "SAML_SSO",
    "OIDC_SSO",
    "DOMAIN_WIDE_SAML_IF_ENABLED",
  ]).describe("Inbound SSO behavior.").optional(),
  targetGroup: z.string().describe(
    "Immutable. Must be of the form `groups/{group}`.",
  ).optional(),
  targetOrgUnit: z.string().describe(
    "Immutable. Must be of the form `orgUnits/{org_unit}`.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Identity InboundSsoAssignments. Registered at `@swamp/gcp/cloudidentity/inboundssoassignments`. */
export const model = {
  type: "@swamp/gcp/cloudidentity/inboundssoassignments",
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
      description:
        'Targets with "set" SSO assignments and their respective assignments.',
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a inboundSsoAssignments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["customer"] !== undefined) body["customer"] = g["customer"];
        if (g["oidcSsoInfo"] !== undefined) {
          body["oidcSsoInfo"] = g["oidcSsoInfo"];
        }
        if (g["rank"] !== undefined) body["rank"] = g["rank"];
        if (g["samlSsoInfo"] !== undefined) {
          body["samlSsoInfo"] = g["samlSsoInfo"];
        }
        if (g["signInBehavior"] !== undefined) {
          body["signInBehavior"] = g["signInBehavior"];
        }
        if (g["ssoMode"] !== undefined) body["ssoMode"] = g["ssoMode"];
        if (g["targetGroup"] !== undefined) {
          body["targetGroup"] = g["targetGroup"];
        }
        if (g["targetOrgUnit"] !== undefined) {
          body["targetOrgUnit"] = g["targetOrgUnit"];
        }
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
      description: "Get a inboundSsoAssignments",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the inboundSsoAssignments",
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
      description: "Update inboundSsoAssignments attributes",
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
        if (g["oidcSsoInfo"] !== undefined) {
          body["oidcSsoInfo"] = g["oidcSsoInfo"];
        }
        if (g["rank"] !== undefined) body["rank"] = g["rank"];
        if (g["samlSsoInfo"] !== undefined) {
          body["samlSsoInfo"] = g["samlSsoInfo"];
        }
        if (g["signInBehavior"] !== undefined) {
          body["signInBehavior"] = g["signInBehavior"];
        }
        if (g["ssoMode"] !== undefined) body["ssoMode"] = g["ssoMode"];
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
      description: "Delete the inboundSsoAssignments",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the inboundSsoAssignments",
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
      description: "Sync inboundSsoAssignments state from GCP",
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
