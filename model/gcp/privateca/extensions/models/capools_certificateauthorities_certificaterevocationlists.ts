// Auto-generated extension model for @swamp/gcp/privateca/capools-certificateauthorities-certificaterevocationlists
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Certificate Authority CaPools.CertificateAuthorities.CertificateRevocationLists.
 *
 * A CertificateRevocationList corresponds to a signed X.509 certificate Revocation List (CRL). A CRL contains the serial numbers of certificates that should no longer be trusted.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/certificateRevocationLists/${shortName}`;
}

const BASE_URL = "https://privateca.googleapis.com/";

const GET_CONFIG = {
  "id":
    "privateca.projects.locations.caPools.certificateAuthorities.certificateRevocationLists.get",
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

const PATCH_CONFIG = {
  "id":
    "privateca.projects.locations.caPools.certificateAuthorities.certificateRevocationLists.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessUrl: z.string().describe(
    "Output only. The location where 'pem_crl' can be accessed.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The time at which this CertificateRevocationList was created.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels with user-defined metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this CertificateRevocationList in the format `projects/*/locations/*/caPools/*certificateAuthorities/*/ certificateRevocationLists/*`.",
  ).optional(),
  pemCrl: z.string().describe("Output only. The PEM-encoded X.509 CRL.")
    .optional(),
  revisionId: z.string().describe(
    "Output only. The revision ID of this CertificateRevocationList. A new revision is committed whenever a new CRL is published. The format is an 8-character hexadecimal string.",
  ).optional(),
  revokedCertificates: z.array(z.object({
    certificate: z.string().describe(
      "The resource name for the Certificate in the format `projects/*/locations/*/caPools/*/certificates/*`.",
    ).optional(),
    hexSerialNumber: z.string().describe(
      "The serial number of the Certificate.",
    ).optional(),
    revocationReason: z.enum([
      "REVOCATION_REASON_UNSPECIFIED",
      "KEY_COMPROMISE",
      "CERTIFICATE_AUTHORITY_COMPROMISE",
      "AFFILIATION_CHANGED",
      "SUPERSEDED",
      "CESSATION_OF_OPERATION",
      "CERTIFICATE_HOLD",
      "PRIVILEGE_WITHDRAWN",
      "ATTRIBUTE_AUTHORITY_COMPROMISE",
    ]).describe("The reason the Certificate was revoked.").optional(),
  })).describe(
    "Output only. The revoked serial numbers that appear in pem_crl.",
  ).optional(),
  sequenceNumber: z.string().describe(
    "Output only. The CRL sequence number that appears in pem_crl.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "SUPERSEDED"]).describe(
    "Output only. The State for this CertificateRevocationList.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time at which this CertificateRevocationList was updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  accessUrl: z.string().optional(),
  createTime: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  pemCrl: z.string().optional(),
  revisionId: z.string().optional(),
  revokedCertificates: z.array(z.object({
    certificate: z.string(),
    hexSerialNumber: z.string(),
    revocationReason: z.string(),
  })).optional(),
  sequenceNumber: z.string().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessUrl: z.string().describe(
    "Output only. The location where 'pem_crl' can be accessed.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The time at which this CertificateRevocationList was created.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels with user-defined metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for this CertificateRevocationList in the format `projects/*/locations/*/caPools/*certificateAuthorities/*/ certificateRevocationLists/*`.",
  ).optional(),
  pemCrl: z.string().describe("Output only. The PEM-encoded X.509 CRL.")
    .optional(),
  revisionId: z.string().describe(
    "Output only. The revision ID of this CertificateRevocationList. A new revision is committed whenever a new CRL is published. The format is an 8-character hexadecimal string.",
  ).optional(),
  revokedCertificates: z.array(z.object({
    certificate: z.string().describe(
      "The resource name for the Certificate in the format `projects/*/locations/*/caPools/*/certificates/*`.",
    ).optional(),
    hexSerialNumber: z.string().describe(
      "The serial number of the Certificate.",
    ).optional(),
    revocationReason: z.enum([
      "REVOCATION_REASON_UNSPECIFIED",
      "KEY_COMPROMISE",
      "CERTIFICATE_AUTHORITY_COMPROMISE",
      "AFFILIATION_CHANGED",
      "SUPERSEDED",
      "CESSATION_OF_OPERATION",
      "CERTIFICATE_HOLD",
      "PRIVILEGE_WITHDRAWN",
      "ATTRIBUTE_AUTHORITY_COMPROMISE",
    ]).describe("The reason the Certificate was revoked.").optional(),
  })).describe(
    "Output only. The revoked serial numbers that appear in pem_crl.",
  ).optional(),
  sequenceNumber: z.string().describe(
    "Output only. The CRL sequence number that appears in pem_crl.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "SUPERSEDED"]).describe(
    "Output only. The State for this CertificateRevocationList.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time at which this CertificateRevocationList was updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Certificate Authority CaPools.CertificateAuthorities.CertificateRevocationLists. Registered at `@swamp/gcp/privateca/capools-certificateauthorities-certificaterevocationlists`. */
export const model = {
  type:
    "@swamp/gcp/privateca/capools-certificateauthorities-certificaterevocationlists",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A CertificateRevocationList corresponds to a signed X.509 certificate Revocat...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a certificateRevocationLists",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the certificateRevocationLists",
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
      description: "Update certificateRevocationLists attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["accessUrl"] !== undefined) body["accessUrl"] = g["accessUrl"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["pemCrl"] !== undefined) body["pemCrl"] = g["pemCrl"];
        if (g["revisionId"] !== undefined) body["revisionId"] = g["revisionId"];
        if (g["revokedCertificates"] !== undefined) {
          body["revokedCertificates"] = g["revokedCertificates"];
        }
        if (g["sequenceNumber"] !== undefined) {
          body["sequenceNumber"] = g["sequenceNumber"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Sync certificateRevocationLists state from GCP",
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
