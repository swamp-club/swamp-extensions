// Auto-generated extension model for @swamp/gcp/networksecurity/tlsinspectionpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Security TlsInspectionPolicies.
 *
 * The TlsInspectionPolicy resource contains references to CA pools in Certificate Authority Service and associated metadata.
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
  return `${parent}/tlsInspectionPolicies/${shortName}`;
}

const BASE_URL = "https://networksecurity.googleapis.com/";

const GET_CONFIG = {
  "id": "networksecurity.projects.locations.tlsInspectionPolicies.get",
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
  "id": "networksecurity.projects.locations.tlsInspectionPolicies.create",
  "path": "v1/{+parent}/tlsInspectionPolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "tlsInspectionPolicyId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networksecurity.projects.locations.tlsInspectionPolicies.patch",
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
  "id": "networksecurity.projects.locations.tlsInspectionPolicies.delete",
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
  caPool: z.string().describe(
    'Required. A CA pool resource used to issue interception certificates. The CA pool string has a relative resource path following the form "projects/{project}/locations/{location}/caPools/{ca_pool}".',
  ).optional(),
  customTlsFeatures: z.array(z.string()).describe(
    "Optional. List of custom TLS cipher suites selected. This field is valid only if the selected tls_feature_profile is CUSTOM. The compute.SslPoliciesService.ListAvailableFeatures method returns the set of features that can be specified in this list. Note that Secure Web Proxy does not yet honor this field.",
  ).optional(),
  description: z.string().describe(
    "Optional. Free-text description of the resource.",
  ).optional(),
  excludePublicCaSet: z.boolean().describe(
    'Optional. If FALSE (the default), use our default set of public CAs in addition to any CAs specified in trust_config. These public CAs are currently based on the Mozilla Root Program and are subject to change over time. If TRUE, do not accept our default set of public CAs. Only CAs specified in trust_config will be accepted. This defaults to FALSE (use public CAs in addition to trust_config) for backwards compatibility, but trusting public root CAs is *not recommended* unless the traffic in question is outbound to public web servers. When possible, prefer setting this to "false" and explicitly specifying trusted CAs and certificates in a TrustConfig. Note that Secure Web Proxy does not yet honor this field.',
  ).optional(),
  minTlsVersion: z.enum([
    "TLS_VERSION_UNSPECIFIED",
    "TLS_1_0",
    "TLS_1_1",
    "TLS_1_2",
    "TLS_1_3",
  ]).describe(
    "Optional. Minimum TLS version that the firewall should use when negotiating connections with both clients and servers. If this is not set, then the default value is to allow the broadest set of clients and servers (TLS 1.0 or higher). Setting this to more restrictive values may improve security, but may also prevent the firewall from connecting to some clients or servers. Note that Secure Web Proxy does not yet honor this field.",
  ).optional(),
  name: z.string().describe(
    "Required. Name of the resource. Name is of the form projects/{project}/locations/{location}/tlsInspectionPolicies/{tls_inspection_policy} tls_inspection_policy should match the pattern:(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$).",
  ).optional(),
  tlsFeatureProfile: z.enum([
    "PROFILE_UNSPECIFIED",
    "PROFILE_COMPATIBLE",
    "PROFILE_MODERN",
    "PROFILE_RESTRICTED",
    "PROFILE_CUSTOM",
  ]).describe(
    'Optional. The selected Profile. If this is not set, then the default value is to allow the broadest set of clients and servers ("PROFILE_COMPATIBLE"). Setting this to more restrictive values may improve security, but may also prevent the TLS inspection proxy from connecting to some clients or servers. Note that Secure Web Proxy does not yet honor this field.',
  ).optional(),
  trustConfig: z.string().describe(
    'Optional. A TrustConfig resource used when making a connection to the TLS server. This is a relative resource path following the form "projects/{project}/locations/{location}/trustConfigs/{trust_config}". This is necessary to intercept TLS connections to servers with certificates signed by a private CA or self-signed certificates. Note that Secure Web Proxy does not yet honor this field.',
  ).optional(),
  tlsInspectionPolicyId: z.string().describe(
    'Required. Short name of the TlsInspectionPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "tls_inspection_policy1".',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  caPool: z.string().optional(),
  createTime: z.string().optional(),
  customTlsFeatures: z.array(z.string()).optional(),
  description: z.string().optional(),
  excludePublicCaSet: z.boolean().optional(),
  minTlsVersion: z.string().optional(),
  name: z.string(),
  tlsFeatureProfile: z.string().optional(),
  trustConfig: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  caPool: z.string().describe(
    'Required. A CA pool resource used to issue interception certificates. The CA pool string has a relative resource path following the form "projects/{project}/locations/{location}/caPools/{ca_pool}".',
  ).optional(),
  customTlsFeatures: z.array(z.string()).describe(
    "Optional. List of custom TLS cipher suites selected. This field is valid only if the selected tls_feature_profile is CUSTOM. The compute.SslPoliciesService.ListAvailableFeatures method returns the set of features that can be specified in this list. Note that Secure Web Proxy does not yet honor this field.",
  ).optional(),
  description: z.string().describe(
    "Optional. Free-text description of the resource.",
  ).optional(),
  excludePublicCaSet: z.boolean().describe(
    'Optional. If FALSE (the default), use our default set of public CAs in addition to any CAs specified in trust_config. These public CAs are currently based on the Mozilla Root Program and are subject to change over time. If TRUE, do not accept our default set of public CAs. Only CAs specified in trust_config will be accepted. This defaults to FALSE (use public CAs in addition to trust_config) for backwards compatibility, but trusting public root CAs is *not recommended* unless the traffic in question is outbound to public web servers. When possible, prefer setting this to "false" and explicitly specifying trusted CAs and certificates in a TrustConfig. Note that Secure Web Proxy does not yet honor this field.',
  ).optional(),
  minTlsVersion: z.enum([
    "TLS_VERSION_UNSPECIFIED",
    "TLS_1_0",
    "TLS_1_1",
    "TLS_1_2",
    "TLS_1_3",
  ]).describe(
    "Optional. Minimum TLS version that the firewall should use when negotiating connections with both clients and servers. If this is not set, then the default value is to allow the broadest set of clients and servers (TLS 1.0 or higher). Setting this to more restrictive values may improve security, but may also prevent the firewall from connecting to some clients or servers. Note that Secure Web Proxy does not yet honor this field.",
  ).optional(),
  name: z.string().describe(
    "Required. Name of the resource. Name is of the form projects/{project}/locations/{location}/tlsInspectionPolicies/{tls_inspection_policy} tls_inspection_policy should match the pattern:(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$).",
  ).optional(),
  tlsFeatureProfile: z.enum([
    "PROFILE_UNSPECIFIED",
    "PROFILE_COMPATIBLE",
    "PROFILE_MODERN",
    "PROFILE_RESTRICTED",
    "PROFILE_CUSTOM",
  ]).describe(
    'Optional. The selected Profile. If this is not set, then the default value is to allow the broadest set of clients and servers ("PROFILE_COMPATIBLE"). Setting this to more restrictive values may improve security, but may also prevent the TLS inspection proxy from connecting to some clients or servers. Note that Secure Web Proxy does not yet honor this field.',
  ).optional(),
  trustConfig: z.string().describe(
    'Optional. A TrustConfig resource used when making a connection to the TLS server. This is a relative resource path following the form "projects/{project}/locations/{location}/trustConfigs/{trust_config}". This is necessary to intercept TLS connections to servers with certificates signed by a private CA or self-signed certificates. Note that Secure Web Proxy does not yet honor this field.',
  ).optional(),
  tlsInspectionPolicyId: z.string().describe(
    'Required. Short name of the TlsInspectionPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "tls_inspection_policy1".',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Security TlsInspectionPolicies. Registered at `@swamp/gcp/networksecurity/tlsinspectionpolicies`. */
export const model = {
  type: "@swamp/gcp/networksecurity/tlsinspectionpolicies",
  version: "2026.05.18.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The TlsInspectionPolicy resource contains references to CA pools in Certifica...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tlsInspectionPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["caPool"] !== undefined) body["caPool"] = g["caPool"];
        if (g["customTlsFeatures"] !== undefined) {
          body["customTlsFeatures"] = g["customTlsFeatures"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["excludePublicCaSet"] !== undefined) {
          body["excludePublicCaSet"] = g["excludePublicCaSet"];
        }
        if (g["minTlsVersion"] !== undefined) {
          body["minTlsVersion"] = g["minTlsVersion"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["tlsFeatureProfile"] !== undefined) {
          body["tlsFeatureProfile"] = g["tlsFeatureProfile"];
        }
        if (g["trustConfig"] !== undefined) {
          body["trustConfig"] = g["trustConfig"];
        }
        if (g["tlsInspectionPolicyId"] !== undefined) {
          body["tlsInspectionPolicyId"] = g["tlsInspectionPolicyId"];
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
      description: "Get a tlsInspectionPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the tlsInspectionPolicies",
        ),
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
      description: "Update tlsInspectionPolicies attributes",
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
        if (g["caPool"] !== undefined) body["caPool"] = g["caPool"];
        if (g["customTlsFeatures"] !== undefined) {
          body["customTlsFeatures"] = g["customTlsFeatures"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["excludePublicCaSet"] !== undefined) {
          body["excludePublicCaSet"] = g["excludePublicCaSet"];
        }
        if (g["minTlsVersion"] !== undefined) {
          body["minTlsVersion"] = g["minTlsVersion"];
        }
        if (g["tlsFeatureProfile"] !== undefined) {
          body["tlsFeatureProfile"] = g["tlsFeatureProfile"];
        }
        if (g["trustConfig"] !== undefined) {
          body["trustConfig"] = g["trustConfig"];
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
      description: "Delete the tlsInspectionPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the tlsInspectionPolicies",
        ),
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
      description: "Sync tlsInspectionPolicies state from GCP",
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
