// Auto-generated extension model for @swamp/gcp/cloudkms/ekmconnections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Key Management Service (KMS) EkmConnections.
 *
 * An EkmConnection represents an individual EKM connection. It can be used for creating CryptoKeys and CryptoKeyVersions with a ProtectionLevel of EXTERNAL_VPC, as well as performing cryptographic operations using keys created within the EkmConnection.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/ekmConnections/${shortName}`;
}

const BASE_URL = "https://cloudkms.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudkms.projects.locations.ekmConnections.get",
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
  "id": "cloudkms.projects.locations.ekmConnections.create",
  "path": "v1/{+parent}/ekmConnections",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "ekmConnectionId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "cloudkms.projects.locations.ekmConnections.patch",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  cryptoSpacePath: z.string().describe(
    "Optional. Identifies the EKM Crypto Space that this EkmConnection maps to. Note: This field is required if KeyManagementMode is CLOUD_KMS.",
  ).optional(),
  keyManagementMode: z.enum([
    "KEY_MANAGEMENT_MODE_UNSPECIFIED",
    "MANUAL",
    "CLOUD_KMS",
  ]).describe(
    "Optional. Describes who can perform control plane operations on the EKM. If unset, this defaults to MANUAL.",
  ).optional(),
  serviceResolvers: z.array(z.object({
    endpointFilter: z.string().describe(
      "Optional. The filter applied to the endpoints of the resolved service. If no filter is specified, all endpoints will be considered. An endpoint will be chosen arbitrarily from the filtered list for each request. For endpoint filter syntax and examples, see https://cloud.google.com/service-directory/docs/reference/rpc/google.cloud.servicedirectory.v1#resolveservicerequest.",
    ).optional(),
    hostname: z.string().describe(
      "Required. The hostname of the EKM replica used at TLS and HTTP layers.",
    ).optional(),
    serverCertificates: z.array(z.object({
      issuer: z.string().describe(
        "Output only. The issuer distinguished name in RFC 2253 format. Only present if parsed is true.",
      ).optional(),
      notAfterTime: z.string().describe(
        "Output only. The certificate is not valid after this time. Only present if parsed is true.",
      ).optional(),
      notBeforeTime: z.string().describe(
        "Output only. The certificate is not valid before this time. Only present if parsed is true.",
      ).optional(),
      parsed: z.boolean().describe(
        "Output only. True if the certificate was parsed successfully.",
      ).optional(),
      rawDer: z.string().describe(
        "Required. The raw certificate bytes in DER format.",
      ).optional(),
      serialNumber: z.string().describe(
        "Output only. The certificate serial number as a hex string. Only present if parsed is true.",
      ).optional(),
      sha256Fingerprint: z.string().describe(
        "Output only. The SHA-256 certificate fingerprint as a hex string. Only present if parsed is true.",
      ).optional(),
      subject: z.string().describe(
        "Output only. The subject distinguished name in RFC 2253 format. Only present if parsed is true.",
      ).optional(),
      subjectAlternativeDnsNames: z.array(z.unknown()).describe(
        "Output only. The subject Alternative DNS names. Only present if parsed is true.",
      ).optional(),
    })).describe(
      "Required. A list of leaf server certificates used to authenticate HTTPS connections to the EKM replica. Currently, a maximum of 10 Certificate is supported.",
    ).optional(),
    serviceDirectoryService: z.string().describe(
      "Required. The resource name of the Service Directory service pointing to an EKM replica, in the format `projects/*/locations/*/namespaces/*/services/*`.",
    ).optional(),
  })).describe(
    "Optional. A list of ServiceResolvers where the EKM can be reached. There should be one ServiceResolver per EKM replica. Currently, only a single ServiceResolver is supported.",
  ).optional(),
  ekmConnectionId: z.string().describe(
    "Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  cryptoSpacePath: z.string().optional(),
  etag: z.string().optional(),
  keyManagementMode: z.string().optional(),
  name: z.string(),
  serviceResolvers: z.array(z.object({
    endpointFilter: z.string(),
    hostname: z.string(),
    serverCertificates: z.array(z.object({
      issuer: z.string(),
      notAfterTime: z.string(),
      notBeforeTime: z.string(),
      parsed: z.boolean(),
      rawDer: z.string(),
      serialNumber: z.string(),
      sha256Fingerprint: z.string(),
      subject: z.string(),
      subjectAlternativeDnsNames: z.array(z.unknown()),
    })),
    serviceDirectoryService: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  cryptoSpacePath: z.string().describe(
    "Optional. Identifies the EKM Crypto Space that this EkmConnection maps to. Note: This field is required if KeyManagementMode is CLOUD_KMS.",
  ).optional(),
  keyManagementMode: z.enum([
    "KEY_MANAGEMENT_MODE_UNSPECIFIED",
    "MANUAL",
    "CLOUD_KMS",
  ]).describe(
    "Optional. Describes who can perform control plane operations on the EKM. If unset, this defaults to MANUAL.",
  ).optional(),
  serviceResolvers: z.array(z.object({
    endpointFilter: z.string().describe(
      "Optional. The filter applied to the endpoints of the resolved service. If no filter is specified, all endpoints will be considered. An endpoint will be chosen arbitrarily from the filtered list for each request. For endpoint filter syntax and examples, see https://cloud.google.com/service-directory/docs/reference/rpc/google.cloud.servicedirectory.v1#resolveservicerequest.",
    ).optional(),
    hostname: z.string().describe(
      "Required. The hostname of the EKM replica used at TLS and HTTP layers.",
    ).optional(),
    serverCertificates: z.array(z.object({
      issuer: z.string().describe(
        "Output only. The issuer distinguished name in RFC 2253 format. Only present if parsed is true.",
      ).optional(),
      notAfterTime: z.string().describe(
        "Output only. The certificate is not valid after this time. Only present if parsed is true.",
      ).optional(),
      notBeforeTime: z.string().describe(
        "Output only. The certificate is not valid before this time. Only present if parsed is true.",
      ).optional(),
      parsed: z.boolean().describe(
        "Output only. True if the certificate was parsed successfully.",
      ).optional(),
      rawDer: z.string().describe(
        "Required. The raw certificate bytes in DER format.",
      ).optional(),
      serialNumber: z.string().describe(
        "Output only. The certificate serial number as a hex string. Only present if parsed is true.",
      ).optional(),
      sha256Fingerprint: z.string().describe(
        "Output only. The SHA-256 certificate fingerprint as a hex string. Only present if parsed is true.",
      ).optional(),
      subject: z.string().describe(
        "Output only. The subject distinguished name in RFC 2253 format. Only present if parsed is true.",
      ).optional(),
      subjectAlternativeDnsNames: z.array(z.unknown()).describe(
        "Output only. The subject Alternative DNS names. Only present if parsed is true.",
      ).optional(),
    })).describe(
      "Required. A list of leaf server certificates used to authenticate HTTPS connections to the EKM replica. Currently, a maximum of 10 Certificate is supported.",
    ).optional(),
    serviceDirectoryService: z.string().describe(
      "Required. The resource name of the Service Directory service pointing to an EKM replica, in the format `projects/*/locations/*/namespaces/*/services/*`.",
    ).optional(),
  })).describe(
    "Optional. A list of ServiceResolvers where the EKM can be reached. There should be one ServiceResolver per EKM replica. Currently, only a single ServiceResolver is supported.",
  ).optional(),
  ekmConnectionId: z.string().describe(
    "Required. It must be unique within a location and match the regular expression `[a-zA-Z0-9_-]{1,63}`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Key Management Service (KMS) EkmConnections. Registered at `@swamp/gcp/cloudkms/ekmconnections`. */
export const model = {
  type: "@swamp/gcp/cloudkms/ekmconnections",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An EkmConnection represents an individual EKM connection. It can be used for ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ekmConnections",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["cryptoSpacePath"] !== undefined) {
          body["cryptoSpacePath"] = g["cryptoSpacePath"];
        }
        if (g["keyManagementMode"] !== undefined) {
          body["keyManagementMode"] = g["keyManagementMode"];
        }
        if (g["serviceResolvers"] !== undefined) {
          body["serviceResolvers"] = g["serviceResolvers"];
        }
        if (g["ekmConnectionId"] !== undefined) {
          body["ekmConnectionId"] = g["ekmConnectionId"];
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
      description: "Get a ekmConnections",
      arguments: z.object({
        identifier: z.string().describe("The name of the ekmConnections"),
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
      description: "Update ekmConnections attributes",
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
        if (g["cryptoSpacePath"] !== undefined) {
          body["cryptoSpacePath"] = g["cryptoSpacePath"];
        }
        if (g["keyManagementMode"] !== undefined) {
          body["keyManagementMode"] = g["keyManagementMode"];
        }
        if (g["serviceResolvers"] !== undefined) {
          body["serviceResolvers"] = g["serviceResolvers"];
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
    sync: {
      description: "Sync ekmConnections state from GCP",
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
    verify_connectivity: {
      description: "verify connectivity",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudkms.projects.locations.ekmConnections.verifyConnectivity",
            "path": "v1/{+name}:verifyConnectivity",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
