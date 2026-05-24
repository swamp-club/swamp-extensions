// Auto-generated extension model for @swamp/gcp/certificatemanager/trustconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Certificate Manager TrustConfigs.
 *
 * Defines a trust config.
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
  return `${parent}/trustConfigs/${shortName}`;
}

const BASE_URL = "https://certificatemanager.googleapis.com/";

const GET_CONFIG = {
  "id": "certificatemanager.projects.locations.trustConfigs.get",
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
  "id": "certificatemanager.projects.locations.trustConfigs.create",
  "path": "v1/{+parent}/trustConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "trustConfigId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "certificatemanager.projects.locations.trustConfigs.patch",
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
  "id": "certificatemanager.projects.locations.trustConfigs.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "certificatemanager.projects.locations.trustConfigs.list",
  "path": "v1/{+parent}/trustConfigs",
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
  allowlistedCertificates: z.array(z.object({
    pemCertificate: z.string().describe(
      "Required. PEM certificate that is allowlisted. The certificate can be up to 5k bytes, and must be a parseable X.509 certificate.",
    ).optional(),
  })).describe(
    "Optional. A certificate matching an allowlisted certificate is always considered valid as long as the certificate is parseable, proof of private key possession is established, and constraints on the certificate's SAN field are met.",
  ).optional(),
  description: z.string().describe(
    "Optional. One or more paragraphs of text description of a TrustConfig.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with a TrustConfig.",
  ).optional(),
  name: z.string().describe(
    "Identifier. A user-defined name of the trust config. TrustConfig names must be unique globally and match pattern `projects/*/locations/*/trustConfigs/*`.",
  ).optional(),
  spiffeTrustStores: z.record(
    z.string(),
    z.object({
      intermediateCas: z.array(z.object({
        pemCertificate: z.string().describe(
          "PEM intermediate certificate used for building up paths for validation. Each certificate provided in PEM format may occupy up to 5kB.",
        ).optional(),
      })).describe(
        "Optional. Set of intermediate CA certificates used for the path building phase of chain validation. The field is currently not supported if TrustConfig is used for the workload certificate feature.",
      ).optional(),
      trustAnchors: z.array(z.object({
        pemCertificate: z.string().describe(
          "PEM root certificate of the PKI used for validation. Each certificate provided in PEM format may occupy up to 5kB.",
        ).optional(),
      })).describe(
        "Optional. List of Trust Anchors to be used while performing validation against a given TrustStore.",
      ).optional(),
    }),
  ).describe(
    "Optional. Defines a mapping from a trust domain to a TrustStore. This is used for SPIFFE certificate validation.",
  ).optional(),
  trustStores: z.array(z.object({
    intermediateCas: z.array(z.object({
      pemCertificate: z.string().describe(
        "PEM intermediate certificate used for building up paths for validation. Each certificate provided in PEM format may occupy up to 5kB.",
      ).optional(),
    })).describe(
      "Optional. Set of intermediate CA certificates used for the path building phase of chain validation. The field is currently not supported if TrustConfig is used for the workload certificate feature.",
    ).optional(),
    trustAnchors: z.array(z.object({
      pemCertificate: z.string().describe(
        "PEM root certificate of the PKI used for validation. Each certificate provided in PEM format may occupy up to 5kB.",
      ).optional(),
    })).describe(
      "Optional. List of Trust Anchors to be used while performing validation against a given TrustStore.",
    ).optional(),
  })).describe(
    "Optional. Set of trust stores to perform validation against. This field is supported when TrustConfig is configured with Load Balancers, currently not supported for SPIFFE certificate validation. Only one TrustStore specified is currently allowed.",
  ).optional(),
  trustConfigId: z.string().describe(
    "Required. A user-provided name of the TrustConfig. Must match the regexp `[a-z0-9-]{1,63}`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  allowlistedCertificates: z.array(z.object({
    pemCertificate: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  spiffeTrustStores: z.record(z.string(), z.unknown()).optional(),
  trustStores: z.array(z.object({
    intermediateCas: z.array(z.object({
      pemCertificate: z.string(),
    })),
    trustAnchors: z.array(z.object({
      pemCertificate: z.string(),
    })),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  allowlistedCertificates: z.array(z.object({
    pemCertificate: z.string().describe(
      "Required. PEM certificate that is allowlisted. The certificate can be up to 5k bytes, and must be a parseable X.509 certificate.",
    ).optional(),
  })).describe(
    "Optional. A certificate matching an allowlisted certificate is always considered valid as long as the certificate is parseable, proof of private key possession is established, and constraints on the certificate's SAN field are met.",
  ).optional(),
  description: z.string().describe(
    "Optional. One or more paragraphs of text description of a TrustConfig.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with a TrustConfig.",
  ).optional(),
  name: z.string().describe(
    "Identifier. A user-defined name of the trust config. TrustConfig names must be unique globally and match pattern `projects/*/locations/*/trustConfigs/*`.",
  ).optional(),
  spiffeTrustStores: z.record(
    z.string(),
    z.object({
      intermediateCas: z.array(z.object({
        pemCertificate: z.string().describe(
          "PEM intermediate certificate used for building up paths for validation. Each certificate provided in PEM format may occupy up to 5kB.",
        ).optional(),
      })).describe(
        "Optional. Set of intermediate CA certificates used for the path building phase of chain validation. The field is currently not supported if TrustConfig is used for the workload certificate feature.",
      ).optional(),
      trustAnchors: z.array(z.object({
        pemCertificate: z.string().describe(
          "PEM root certificate of the PKI used for validation. Each certificate provided in PEM format may occupy up to 5kB.",
        ).optional(),
      })).describe(
        "Optional. List of Trust Anchors to be used while performing validation against a given TrustStore.",
      ).optional(),
    }),
  ).describe(
    "Optional. Defines a mapping from a trust domain to a TrustStore. This is used for SPIFFE certificate validation.",
  ).optional(),
  trustStores: z.array(z.object({
    intermediateCas: z.array(z.object({
      pemCertificate: z.string().describe(
        "PEM intermediate certificate used for building up paths for validation. Each certificate provided in PEM format may occupy up to 5kB.",
      ).optional(),
    })).describe(
      "Optional. Set of intermediate CA certificates used for the path building phase of chain validation. The field is currently not supported if TrustConfig is used for the workload certificate feature.",
    ).optional(),
    trustAnchors: z.array(z.object({
      pemCertificate: z.string().describe(
        "PEM root certificate of the PKI used for validation. Each certificate provided in PEM format may occupy up to 5kB.",
      ).optional(),
    })).describe(
      "Optional. List of Trust Anchors to be used while performing validation against a given TrustStore.",
    ).optional(),
  })).describe(
    "Optional. Set of trust stores to perform validation against. This field is supported when TrustConfig is configured with Load Balancers, currently not supported for SPIFFE certificate validation. Only one TrustStore specified is currently allowed.",
  ).optional(),
  trustConfigId: z.string().describe(
    "Required. A user-provided name of the TrustConfig. Must match the regexp `[a-z0-9-]{1,63}`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Certificate Manager TrustConfigs. Registered at `@swamp/gcp/certificatemanager/trustconfigs`. */
export const model = {
  type: "@swamp/gcp/certificatemanager/trustconfigs",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Defines a trust config.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a trustConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["allowlistedCertificates"] !== undefined) {
          body["allowlistedCertificates"] = g["allowlistedCertificates"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["spiffeTrustStores"] !== undefined) {
          body["spiffeTrustStores"] = g["spiffeTrustStores"];
        }
        if (g["trustStores"] !== undefined) {
          body["trustStores"] = g["trustStores"];
        }
        if (g["trustConfigId"] !== undefined) {
          body["trustConfigId"] = g["trustConfigId"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a trustConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the trustConfigs"),
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
      description: "Update trustConfigs attributes",
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
        if (g["allowlistedCertificates"] !== undefined) {
          body["allowlistedCertificates"] = g["allowlistedCertificates"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["spiffeTrustStores"] !== undefined) {
          body["spiffeTrustStores"] = g["spiffeTrustStores"];
        }
        if (g["trustStores"] !== undefined) {
          body["trustStores"] = g["trustStores"];
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
      description: "Delete the trustConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the trustConfigs"),
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
      description: "Sync trustConfigs state from GCP",
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
