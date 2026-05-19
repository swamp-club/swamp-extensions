// Auto-generated extension model for @swamp/gcp/binaryauthorization/attestors
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Binary Authorization Attestors.
 *
 * An attestor that attests to container image artifacts. An existing attestor cannot be modified except where indicated.
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
  return `${parent}/attestors/${shortName}`;
}

const BASE_URL = "https://binaryauthorization.googleapis.com/";

const GET_CONFIG = {
  "id": "binaryauthorization.projects.attestors.get",
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
  "id": "binaryauthorization.projects.attestors.create",
  "path": "v1/{+parent}/attestors",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "attestorId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "binaryauthorization.projects.attestors.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "binaryauthorization.projects.attestors.delete",
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

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "Optional. A descriptive comment. This field may be updated. The field may be displayed in chooser dialogs.",
  ).optional(),
  name: z.string().describe(
    "Required. The resource name, in the format: `projects/*/attestors/*`. This field may not be updated.",
  ).optional(),
  userOwnedGrafeasNote: z.object({
    delegationServiceAccountEmail: z.string().describe(
      "Output only. This field will contain the service account email address that this attestor will use as the principal when querying Container Analysis. Attestor administrators must grant this service account the IAM role needed to read attestations from the note_reference in Container Analysis (`containeranalysis.notes.occurrences.viewer`). This email address is fixed for the lifetime of the attestor, but callers should not make any other assumptions about the service account email; future versions may use an email based on a different naming pattern.",
    ).optional(),
    noteReference: z.string().describe(
      "Required. The Grafeas resource name of a Attestation.Authority Note, created by the user, in the format: `projects/[PROJECT_ID]/notes/*`. This field may not be updated. A project ID must be used, not a project number. An attestation by this attestor is stored as a Grafeas Attestation.Authority Occurrence that names a container image and that links to this Note. Grafeas is an external dependency.",
    ).optional(),
    publicKeys: z.array(z.object({
      asciiArmoredPgpPublicKey: z.string().describe(
        "ASCII-armored representation of a PGP public key, as the entire output by the command `gpg --export --armor foo@example.com` (either LF or CRLF line endings). When using this field, `id` should be left blank. The Binary Authorization API handlers will calculate the ID and fill it in automatically. Binary Authorization computes this ID as the OpenPGP RFC4880 V4 fingerprint, represented as upper-case hex. If `id` is provided by the caller, it will be overwritten by the API-calculated ID.",
      ).optional(),
      comment: z.string().describe(
        "Optional. A descriptive comment. This field may be updated.",
      ).optional(),
      id: z.string().describe(
        "The ID of this public key. Signatures verified by Binary Authorization must include the ID of the public key that can be used to verify them, and that ID must match the contents of this field exactly. Additional restrictions on this field can be imposed based on which public key type is encapsulated. See the documentation on `public_key` cases below for details.",
      ).optional(),
      pkixPublicKey: z.object({
        keyId: z.string().describe(
          "Optional. The ID of this public key. Signatures verified by Binary Authorization must include the ID of the public key that can be used to verify them. The ID must match exactly contents of the `key_id` field exactly. The ID may be explicitly provided by the caller, but it MUST be a valid RFC3986 URI. If `key_id` is left blank and this `PkixPublicKey` is not used in the context of a wrapper (see next paragraph), a default key ID will be computed based on the digest of the DER encoding of the public key. If this `PkixPublicKey` is used in the context of a wrapper that has its own notion of key ID (e.g. `AttestorPublicKey`), then this field can either match that value exactly, or be left blank, in which case it behaves exactly as though it is equal to that wrapper value.",
        ).optional(),
        publicKeyPem: z.string().describe(
          "A PEM-encoded public key, as described in https://tools.ietf.org/html/rfc7468#section-13",
        ).optional(),
        signatureAlgorithm: z.enum([
          "SIGNATURE_ALGORITHM_UNSPECIFIED",
          "RSA_PSS_2048_SHA256",
          "RSA_SIGN_PSS_2048_SHA256",
          "RSA_PSS_3072_SHA256",
          "RSA_SIGN_PSS_3072_SHA256",
          "RSA_PSS_4096_SHA256",
          "RSA_SIGN_PSS_4096_SHA256",
          "RSA_PSS_4096_SHA512",
          "RSA_SIGN_PSS_4096_SHA512",
          "RSA_SIGN_PKCS1_2048_SHA256",
          "RSA_SIGN_PKCS1_3072_SHA256",
          "RSA_SIGN_PKCS1_4096_SHA256",
          "RSA_SIGN_PKCS1_4096_SHA512",
          "ECDSA_P256_SHA256",
          "EC_SIGN_P256_SHA256",
          "ECDSA_P384_SHA384",
          "EC_SIGN_P384_SHA384",
          "ECDSA_P521_SHA512",
          "EC_SIGN_P521_SHA512",
        ]).describe(
          "The signature algorithm used to verify a message against a signature using this key. These signature algorithm must match the structure and any object identifiers encoded in `public_key_pem` (i.e. this algorithm must match that of the public key).",
        ).optional(),
      }).describe(
        "A public key in the PkixPublicKey [format](https://tools.ietf.org/html/rfc5280#section-4.1.2.7). Public keys of this type are typically textually encoded using the PEM format.",
      ).optional(),
    })).describe(
      "Optional. Public keys that verify attestations signed by this attestor. This field may be updated. If this field is non-empty, one of the specified public keys must verify that an attestation was signed by this attestor for the image specified in the admission request. If this field is empty, this attestor always returns that no valid attestations exist.",
    ).optional(),
  }).describe(
    "An user owned Grafeas note references a Grafeas Attestation.Authority Note created by the user.",
  ).optional(),
  attestorId: z.string().describe("Required. The attestors ID.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  etag: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
  userOwnedGrafeasNote: z.object({
    delegationServiceAccountEmail: z.string(),
    noteReference: z.string(),
    publicKeys: z.array(z.object({
      asciiArmoredPgpPublicKey: z.string(),
      comment: z.string(),
      id: z.string(),
      pkixPublicKey: z.object({
        keyId: z.string(),
        publicKeyPem: z.string(),
        signatureAlgorithm: z.string(),
      }),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "Optional. A descriptive comment. This field may be updated. The field may be displayed in chooser dialogs.",
  ).optional(),
  name: z.string().describe(
    "Required. The resource name, in the format: `projects/*/attestors/*`. This field may not be updated.",
  ).optional(),
  userOwnedGrafeasNote: z.object({
    delegationServiceAccountEmail: z.string().describe(
      "Output only. This field will contain the service account email address that this attestor will use as the principal when querying Container Analysis. Attestor administrators must grant this service account the IAM role needed to read attestations from the note_reference in Container Analysis (`containeranalysis.notes.occurrences.viewer`). This email address is fixed for the lifetime of the attestor, but callers should not make any other assumptions about the service account email; future versions may use an email based on a different naming pattern.",
    ).optional(),
    noteReference: z.string().describe(
      "Required. The Grafeas resource name of a Attestation.Authority Note, created by the user, in the format: `projects/[PROJECT_ID]/notes/*`. This field may not be updated. A project ID must be used, not a project number. An attestation by this attestor is stored as a Grafeas Attestation.Authority Occurrence that names a container image and that links to this Note. Grafeas is an external dependency.",
    ).optional(),
    publicKeys: z.array(z.object({
      asciiArmoredPgpPublicKey: z.string().describe(
        "ASCII-armored representation of a PGP public key, as the entire output by the command `gpg --export --armor foo@example.com` (either LF or CRLF line endings). When using this field, `id` should be left blank. The Binary Authorization API handlers will calculate the ID and fill it in automatically. Binary Authorization computes this ID as the OpenPGP RFC4880 V4 fingerprint, represented as upper-case hex. If `id` is provided by the caller, it will be overwritten by the API-calculated ID.",
      ).optional(),
      comment: z.string().describe(
        "Optional. A descriptive comment. This field may be updated.",
      ).optional(),
      id: z.string().describe(
        "The ID of this public key. Signatures verified by Binary Authorization must include the ID of the public key that can be used to verify them, and that ID must match the contents of this field exactly. Additional restrictions on this field can be imposed based on which public key type is encapsulated. See the documentation on `public_key` cases below for details.",
      ).optional(),
      pkixPublicKey: z.object({
        keyId: z.string().describe(
          "Optional. The ID of this public key. Signatures verified by Binary Authorization must include the ID of the public key that can be used to verify them. The ID must match exactly contents of the `key_id` field exactly. The ID may be explicitly provided by the caller, but it MUST be a valid RFC3986 URI. If `key_id` is left blank and this `PkixPublicKey` is not used in the context of a wrapper (see next paragraph), a default key ID will be computed based on the digest of the DER encoding of the public key. If this `PkixPublicKey` is used in the context of a wrapper that has its own notion of key ID (e.g. `AttestorPublicKey`), then this field can either match that value exactly, or be left blank, in which case it behaves exactly as though it is equal to that wrapper value.",
        ).optional(),
        publicKeyPem: z.string().describe(
          "A PEM-encoded public key, as described in https://tools.ietf.org/html/rfc7468#section-13",
        ).optional(),
        signatureAlgorithm: z.enum([
          "SIGNATURE_ALGORITHM_UNSPECIFIED",
          "RSA_PSS_2048_SHA256",
          "RSA_SIGN_PSS_2048_SHA256",
          "RSA_PSS_3072_SHA256",
          "RSA_SIGN_PSS_3072_SHA256",
          "RSA_PSS_4096_SHA256",
          "RSA_SIGN_PSS_4096_SHA256",
          "RSA_PSS_4096_SHA512",
          "RSA_SIGN_PSS_4096_SHA512",
          "RSA_SIGN_PKCS1_2048_SHA256",
          "RSA_SIGN_PKCS1_3072_SHA256",
          "RSA_SIGN_PKCS1_4096_SHA256",
          "RSA_SIGN_PKCS1_4096_SHA512",
          "ECDSA_P256_SHA256",
          "EC_SIGN_P256_SHA256",
          "ECDSA_P384_SHA384",
          "EC_SIGN_P384_SHA384",
          "ECDSA_P521_SHA512",
          "EC_SIGN_P521_SHA512",
        ]).describe(
          "The signature algorithm used to verify a message against a signature using this key. These signature algorithm must match the structure and any object identifiers encoded in `public_key_pem` (i.e. this algorithm must match that of the public key).",
        ).optional(),
      }).describe(
        "A public key in the PkixPublicKey [format](https://tools.ietf.org/html/rfc5280#section-4.1.2.7). Public keys of this type are typically textually encoded using the PEM format.",
      ).optional(),
    })).describe(
      "Optional. Public keys that verify attestations signed by this attestor. This field may be updated. If this field is non-empty, one of the specified public keys must verify that an attestation was signed by this attestor for the image specified in the admission request. If this field is empty, this attestor always returns that no valid attestations exist.",
    ).optional(),
  }).describe(
    "An user owned Grafeas note references a Grafeas Attestation.Authority Note created by the user.",
  ).optional(),
  attestorId: z.string().describe("Required. The attestors ID.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Binary Authorization Attestors. Registered at `@swamp/gcp/binaryauthorization/attestors`. */
export const model = {
  type: "@swamp/gcp/binaryauthorization/attestors",
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
        "An attestor that attests to container image artifacts. An existing attestor c...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a attestors",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["userOwnedGrafeasNote"] !== undefined) {
          body["userOwnedGrafeasNote"] = g["userOwnedGrafeasNote"];
        }
        if (g["attestorId"] !== undefined) body["attestorId"] = g["attestorId"];
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
      description: "Get a attestors",
      arguments: z.object({
        identifier: z.string().describe("The name of the attestors"),
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
      description: "Update attestors attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["userOwnedGrafeasNote"] !== undefined) {
          body["userOwnedGrafeasNote"] = g["userOwnedGrafeasNote"];
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
      description: "Delete the attestors",
      arguments: z.object({
        identifier: z.string().describe("The name of the attestors"),
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
      description: "Sync attestors state from GCP",
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
    validate_attestation_occurrence: {
      description: "validate attestation occurrence",
      arguments: z.object({
        attestation: z.any().optional(),
        occurrenceNote: z.any().optional(),
        occurrenceResourceUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["attestor"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["attestation"] !== undefined) {
          body["attestation"] = args["attestation"];
        }
        if (args["occurrenceNote"] !== undefined) {
          body["occurrenceNote"] = args["occurrenceNote"];
        }
        if (args["occurrenceResourceUri"] !== undefined) {
          body["occurrenceResourceUri"] = args["occurrenceResourceUri"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "binaryauthorization.projects.attestors.validateAttestationOccurrence",
            "path": "v1/{+attestor}:validateAttestationOccurrence",
            "httpMethod": "POST",
            "parameterOrder": ["attestor"],
            "parameters": {
              "attestor": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
