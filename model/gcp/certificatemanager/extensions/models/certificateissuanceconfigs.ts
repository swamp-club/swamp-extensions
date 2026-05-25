// Auto-generated extension model for @swamp/gcp/certificatemanager/certificateissuanceconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Certificate Manager CertificateIssuanceConfigs.
 *
 * CertificateIssuanceConfig specifies how to issue and manage a certificate.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/certificateIssuanceConfigs/${shortName}`;
}

const BASE_URL = "https://certificatemanager.googleapis.com/";

const GET_CONFIG = {
  "id": "certificatemanager.projects.locations.certificateIssuanceConfigs.get",
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
  "id":
    "certificatemanager.projects.locations.certificateIssuanceConfigs.create",
  "path": "v1/{+parent}/certificateIssuanceConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "certificateIssuanceConfigId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "certificatemanager.projects.locations.certificateIssuanceConfigs.patch",
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
  "id":
    "certificatemanager.projects.locations.certificateIssuanceConfigs.delete",
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
  "id": "certificatemanager.projects.locations.certificateIssuanceConfigs.list",
  "path": "v1/{+parent}/certificateIssuanceConfigs",
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
  certificateAuthorityConfig: z.object({
    certificateAuthorityServiceConfig: z.object({
      caPool: z.string().describe(
        'Required. A CA pool resource used to issue a certificate. The CA pool string has a relative resource path following the form "projects/{project}/locations/{location}/caPools/{ca_pool}".',
      ).optional(),
    }).describe("Contains information required to contact CA service.")
      .optional(),
  }).describe(
    "The CA that issues the workload certificate. It includes CA address, type, authentication to CA service, etc.",
  ).optional(),
  description: z.string().describe(
    "Optional. One or more paragraphs of text description of a CertificateIssuanceConfig.",
  ).optional(),
  keyAlgorithm: z.enum(["KEY_ALGORITHM_UNSPECIFIED", "RSA_2048", "ECDSA_P256"])
    .describe(
      "Required. The key algorithm to use when generating the private key.",
    ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with a CertificateIssuanceConfig.",
  ).optional(),
  lifetime: z.string().describe(
    "Required. Workload certificate lifetime requested.",
  ).optional(),
  name: z.string().describe(
    "Identifier. A user-defined name of the certificate issuance config. CertificateIssuanceConfig names must be unique globally and match pattern `projects/*/locations/*/certificateIssuanceConfigs/*`.",
  ).optional(),
  rotationWindowPercentage: z.number().int().describe(
    "Required. Specifies the percentage of elapsed time of the certificate lifetime to wait before renewing the certificate. Must be a number between 1-99, inclusive.",
  ).optional(),
  certificateIssuanceConfigId: z.string().describe(
    "Required. A user-provided name of the certificate config.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  certificateAuthorityConfig: z.object({
    certificateAuthorityServiceConfig: z.object({
      caPool: z.string(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  keyAlgorithm: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lifetime: z.string().optional(),
  name: z.string(),
  rotationWindowPercentage: z.number().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  certificateAuthorityConfig: z.object({
    certificateAuthorityServiceConfig: z.object({
      caPool: z.string().describe(
        'Required. A CA pool resource used to issue a certificate. The CA pool string has a relative resource path following the form "projects/{project}/locations/{location}/caPools/{ca_pool}".',
      ).optional(),
    }).describe("Contains information required to contact CA service.")
      .optional(),
  }).describe(
    "The CA that issues the workload certificate. It includes CA address, type, authentication to CA service, etc.",
  ).optional(),
  description: z.string().describe(
    "Optional. One or more paragraphs of text description of a CertificateIssuanceConfig.",
  ).optional(),
  keyAlgorithm: z.enum(["KEY_ALGORITHM_UNSPECIFIED", "RSA_2048", "ECDSA_P256"])
    .describe(
      "Required. The key algorithm to use when generating the private key.",
    ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with a CertificateIssuanceConfig.",
  ).optional(),
  lifetime: z.string().describe(
    "Required. Workload certificate lifetime requested.",
  ).optional(),
  name: z.string().describe(
    "Identifier. A user-defined name of the certificate issuance config. CertificateIssuanceConfig names must be unique globally and match pattern `projects/*/locations/*/certificateIssuanceConfigs/*`.",
  ).optional(),
  rotationWindowPercentage: z.number().int().describe(
    "Required. Specifies the percentage of elapsed time of the certificate lifetime to wait before renewing the certificate. Must be a number between 1-99, inclusive.",
  ).optional(),
  certificateIssuanceConfigId: z.string().describe(
    "Required. A user-provided name of the certificate config.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Certificate Manager CertificateIssuanceConfigs. Registered at `@swamp/gcp/certificatemanager/certificateissuanceconfigs`. */
export const model = {
  type: "@swamp/gcp/certificatemanager/certificateissuanceconfigs",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "CertificateIssuanceConfig specifies how to issue and manage a certificate.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a certificateIssuanceConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["certificateAuthorityConfig"] !== undefined) {
          body["certificateAuthorityConfig"] = g["certificateAuthorityConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["keyAlgorithm"] !== undefined) {
          body["keyAlgorithm"] = g["keyAlgorithm"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lifetime"] !== undefined) body["lifetime"] = g["lifetime"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rotationWindowPercentage"] !== undefined) {
          body["rotationWindowPercentage"] = g["rotationWindowPercentage"];
        }
        if (g["certificateIssuanceConfigId"] !== undefined) {
          body["certificateIssuanceConfigId"] =
            g["certificateIssuanceConfigId"];
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
      description: "Get a certificateIssuanceConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the certificateIssuanceConfigs",
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
      description: "Update certificateIssuanceConfigs attributes",
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
        if (g["certificateAuthorityConfig"] !== undefined) {
          body["certificateAuthorityConfig"] = g["certificateAuthorityConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["keyAlgorithm"] !== undefined) {
          body["keyAlgorithm"] = g["keyAlgorithm"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lifetime"] !== undefined) body["lifetime"] = g["lifetime"];
        if (g["rotationWindowPercentage"] !== undefined) {
          body["rotationWindowPercentage"] = g["rotationWindowPercentage"];
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
      description: "Delete the certificateIssuanceConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the certificateIssuanceConfigs",
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
      description: "Sync certificateIssuanceConfigs state from GCP",
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
    list: {
      description: "List certificateIssuanceConfigs resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter expression to restrict the Certificates Configs returned.",
        ).optional(),
        orderBy: z.string().describe(
          'Optional. A list of Certificate Config field names used to specify the order of the returned results. The default sorting order is ascending. To specify descending order for a field, add a suffix `" desc"`.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of certificate configs to return per call.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          BASE_URL,
          LIST_CONFIG,
          params,
          "certificateIssuanceConfigs",
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
