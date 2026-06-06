// Auto-generated extension model for @swamp/gcp/iam/workloadidentitypools
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity and Access Management (IAM) WorkloadIdentityPools.
 *
 * Represents a collection of workload identities. You can define IAM policies to grant these identities access to Google Cloud resources.
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
  return `${parent}/workloadIdentityPools/${shortName}`;
}

const BASE_URL = "https://iam.googleapis.com/";

const GET_CONFIG = {
  "id": "iam.projects.locations.workloadIdentityPools.get",
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
  "id": "iam.projects.locations.workloadIdentityPools.create",
  "path": "v1/{+parent}/workloadIdentityPools",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "workloadIdentityPoolId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "iam.projects.locations.workloadIdentityPools.patch",
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
  "id": "iam.projects.locations.workloadIdentityPools.delete",
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
  "id": "iam.projects.locations.workloadIdentityPools.list",
  "path": "v1/{+parent}/workloadIdentityPools",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
    "showDeleted": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "Optional. A description of the pool. Cannot exceed 256 characters.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Whether the pool is disabled. You cannot use a disabled pool to exchange tokens, or use existing tokens to access resources. If the pool is re-enabled, existing tokens grant access again.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. A display name for the pool. Cannot exceed 32 characters.",
  ).optional(),
  inlineCertificateIssuanceConfig: z.object({
    caPools: z.record(z.string(), z.string()).describe(
      "Optional. A required mapping of a Google Cloud region to the CA pool resource located in that region. The CA pool is used for certificate issuance, adhering to the following constraints: * Key format: A supported cloud region name equivalent to the location identifier in the corresponding map entry's value. * Value format: A valid CA pool resource path format like: \"projects/{project}/locations/{location}/caPools/{ca_pool}\" * Region Matching: Workloads are ONLY issued certificates from CA pools within the same region. Also the CA pool region (in value) must match the workload's region (key).",
    ).optional(),
    keyAlgorithm: z.enum([
      "KEY_ALGORITHM_UNSPECIFIED",
      "RSA_2048",
      "RSA_3072",
      "RSA_4096",
      "ECDSA_P256",
      "ECDSA_P384",
    ]).describe(
      "Optional. Key algorithm to use when generating the key pair. This key pair will be used to create the certificate. If not specified, this will default to ECDSA_P256.",
    ).optional(),
    lifetime: z.string().describe(
      "Optional. Lifetime of the workload certificates issued by the CA pool. Must be between 24 hours and 30 days. If not specified, this will be defaulted to 24 hours.",
    ).optional(),
    rotationWindowPercentage: z.number().int().describe(
      "Optional. Rotation window percentage, the percentage of remaining lifetime after which certificate rotation is initiated. Must be between 50 and 80. If no value is specified, rotation window percentage is defaulted to 50.",
    ).optional(),
    useDefaultSharedCa: z.boolean().describe(
      "Optional. If set to true, the trust domain will utilize the GCP-provisioned default CA. A default CA in the same region as the workload will be selected to issue the certificate. Enabling this will clear any existing `ca_pools` configuration to provision the certificates. NOTE: This field is mutually exclusive with `ca_pools`. If this flag is enabled, certificates will be automatically provisioned from the default shared CAs. This flag should not be set if you want to use your own CA pools to provision the certificates.",
    ).optional(),
  }).describe(
    "Represents configuration for generating mutual TLS (mTLS) certificates for the identities within this pool.",
  ).optional(),
  inlineTrustConfig: z.object({
    additionalTrustBundles: z.record(
      z.string(),
      z.object({
        intermediateCas: z.array(z.object({
          pemCertificate: z.unknown().describe(
            "PEM certificate of the PKI used for validation. Must only contain one ca certificate.",
          ).optional(),
        })).describe(
          "Optional. Set of intermediate CA certificates used for building the trust chain to the trust anchor. Important: Intermediate CAs are only supported for X.509 federation.",
        ).optional(),
        trustAnchors: z.array(z.object({
          pemCertificate: z.unknown().describe(
            "PEM certificate of the PKI used for validation. Must only contain one ca certificate (either root or intermediate cert).",
          ).optional(),
        })).describe(
          "Required. List of trust anchors to be used while performing validation against a given TrustStore. The incoming end entity's certificate must be in the trust chain of one of the trust anchors here.",
        ).optional(),
        trustDefaultSharedCa: z.boolean().describe(
          "Optional. If set to True, the trust bundle will include the private ca managed identity regional root public certificates. Important: `trust_default_shared_ca` is only supported for managed identity trust domain resource.",
        ).optional(),
      }),
    ).describe(
      "Optional. Maps specific trust domains (e.g., \"example.com\") to their corresponding TrustStore, which contain the trusted root certificates for that domain. There can be a maximum of 10 trust domain entries in this map. Note that a trust domain automatically trusts itself and don't need to be specified here. If however, this WorkloadIdentityPool's trust domain contains any trust anchors in the additional_trust_bundles map, those trust anchors will be *appended to* the trust bundle automatically derived from your InlineCertificateIssuanceConfig's ca_pools.",
    ).optional(),
  }).describe(
    "Defines configuration for extending trust to additional trust domains. By establishing trust with another domain, the current domain will recognize and accept certificates issued by entities within the trusted domains. Note that a trust domain automatically trusts itself, eliminating the need for explicit configuration.",
  ).optional(),
  mode: z.enum([
    "MODE_UNSPECIFIED",
    "FEDERATION_ONLY",
    "TRUST_DOMAIN",
    "SYSTEM_TRUST_DOMAIN",
  ]).describe("Immutable. The mode the pool is operating in.").optional(),
  name: z.string().describe("Identifier. The resource name of the pool.")
    .optional(),
  workloadIdentityPoolId: z.string().describe(
    "Required. The ID to use for the pool, which becomes the final component of the resource name. This value should be 4-32 characters, and may contain the characters [a-z0-9-]. The prefix `gcp-` is reserved for use by Google, and may not be specified.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  disabled: z.boolean().optional(),
  displayName: z.string().optional(),
  expireTime: z.string().optional(),
  inlineCertificateIssuanceConfig: z.object({
    caPools: z.record(z.string(), z.unknown()),
    keyAlgorithm: z.string(),
    lifetime: z.string(),
    rotationWindowPercentage: z.number(),
    useDefaultSharedCa: z.boolean(),
  }).optional(),
  inlineTrustConfig: z.object({
    additionalTrustBundles: z.record(z.string(), z.unknown()),
  }).optional(),
  mode: z.string().optional(),
  name: z.string(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "Optional. A description of the pool. Cannot exceed 256 characters.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Whether the pool is disabled. You cannot use a disabled pool to exchange tokens, or use existing tokens to access resources. If the pool is re-enabled, existing tokens grant access again.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. A display name for the pool. Cannot exceed 32 characters.",
  ).optional(),
  inlineCertificateIssuanceConfig: z.object({
    caPools: z.record(z.string(), z.string()).describe(
      "Optional. A required mapping of a Google Cloud region to the CA pool resource located in that region. The CA pool is used for certificate issuance, adhering to the following constraints: * Key format: A supported cloud region name equivalent to the location identifier in the corresponding map entry's value. * Value format: A valid CA pool resource path format like: \"projects/{project}/locations/{location}/caPools/{ca_pool}\" * Region Matching: Workloads are ONLY issued certificates from CA pools within the same region. Also the CA pool region (in value) must match the workload's region (key).",
    ).optional(),
    keyAlgorithm: z.enum([
      "KEY_ALGORITHM_UNSPECIFIED",
      "RSA_2048",
      "RSA_3072",
      "RSA_4096",
      "ECDSA_P256",
      "ECDSA_P384",
    ]).describe(
      "Optional. Key algorithm to use when generating the key pair. This key pair will be used to create the certificate. If not specified, this will default to ECDSA_P256.",
    ).optional(),
    lifetime: z.string().describe(
      "Optional. Lifetime of the workload certificates issued by the CA pool. Must be between 24 hours and 30 days. If not specified, this will be defaulted to 24 hours.",
    ).optional(),
    rotationWindowPercentage: z.number().int().describe(
      "Optional. Rotation window percentage, the percentage of remaining lifetime after which certificate rotation is initiated. Must be between 50 and 80. If no value is specified, rotation window percentage is defaulted to 50.",
    ).optional(),
    useDefaultSharedCa: z.boolean().describe(
      "Optional. If set to true, the trust domain will utilize the GCP-provisioned default CA. A default CA in the same region as the workload will be selected to issue the certificate. Enabling this will clear any existing `ca_pools` configuration to provision the certificates. NOTE: This field is mutually exclusive with `ca_pools`. If this flag is enabled, certificates will be automatically provisioned from the default shared CAs. This flag should not be set if you want to use your own CA pools to provision the certificates.",
    ).optional(),
  }).describe(
    "Represents configuration for generating mutual TLS (mTLS) certificates for the identities within this pool.",
  ).optional(),
  inlineTrustConfig: z.object({
    additionalTrustBundles: z.record(
      z.string(),
      z.object({
        intermediateCas: z.array(z.object({
          pemCertificate: z.unknown().describe(
            "PEM certificate of the PKI used for validation. Must only contain one ca certificate.",
          ).optional(),
        })).describe(
          "Optional. Set of intermediate CA certificates used for building the trust chain to the trust anchor. Important: Intermediate CAs are only supported for X.509 federation.",
        ).optional(),
        trustAnchors: z.array(z.object({
          pemCertificate: z.unknown().describe(
            "PEM certificate of the PKI used for validation. Must only contain one ca certificate (either root or intermediate cert).",
          ).optional(),
        })).describe(
          "Required. List of trust anchors to be used while performing validation against a given TrustStore. The incoming end entity's certificate must be in the trust chain of one of the trust anchors here.",
        ).optional(),
        trustDefaultSharedCa: z.boolean().describe(
          "Optional. If set to True, the trust bundle will include the private ca managed identity regional root public certificates. Important: `trust_default_shared_ca` is only supported for managed identity trust domain resource.",
        ).optional(),
      }),
    ).describe(
      "Optional. Maps specific trust domains (e.g., \"example.com\") to their corresponding TrustStore, which contain the trusted root certificates for that domain. There can be a maximum of 10 trust domain entries in this map. Note that a trust domain automatically trusts itself and don't need to be specified here. If however, this WorkloadIdentityPool's trust domain contains any trust anchors in the additional_trust_bundles map, those trust anchors will be *appended to* the trust bundle automatically derived from your InlineCertificateIssuanceConfig's ca_pools.",
    ).optional(),
  }).describe(
    "Defines configuration for extending trust to additional trust domains. By establishing trust with another domain, the current domain will recognize and accept certificates issued by entities within the trusted domains. Note that a trust domain automatically trusts itself, eliminating the need for explicit configuration.",
  ).optional(),
  mode: z.enum([
    "MODE_UNSPECIFIED",
    "FEDERATION_ONLY",
    "TRUST_DOMAIN",
    "SYSTEM_TRUST_DOMAIN",
  ]).describe("Immutable. The mode the pool is operating in.").optional(),
  name: z.string().describe("Identifier. The resource name of the pool.")
    .optional(),
  workloadIdentityPoolId: z.string().describe(
    "Required. The ID to use for the pool, which becomes the final component of the resource name. This value should be 4-32 characters, and may contain the characters [a-z0-9-]. The prefix `gcp-` is reserved for use by Google, and may not be specified.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Identity and Access Management (IAM) WorkloadIdentityPools. Registered at `@swamp/gcp/iam/workloadidentitypools`. */
export const model = {
  type: "@swamp/gcp/iam/workloadidentitypools",
  version: "2026.06.06.2",
  upgrades: [
    {
      toVersion: "2026.06.06.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a collection of workload identities. You can define IAM policies t...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a workloadIdentityPools",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["inlineCertificateIssuanceConfig"] !== undefined) {
          body["inlineCertificateIssuanceConfig"] =
            g["inlineCertificateIssuanceConfig"];
        }
        if (g["inlineTrustConfig"] !== undefined) {
          body["inlineTrustConfig"] = g["inlineTrustConfig"];
        }
        if (g["mode"] !== undefined) body["mode"] = g["mode"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["workloadIdentityPoolId"] !== undefined) {
          body["workloadIdentityPoolId"] = g["workloadIdentityPoolId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a workloadIdentityPools",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the workloadIdentityPools",
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
      description: "Update workloadIdentityPools attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["inlineCertificateIssuanceConfig"] !== undefined) {
          body["inlineCertificateIssuanceConfig"] =
            g["inlineCertificateIssuanceConfig"];
        }
        if (g["inlineTrustConfig"] !== undefined) {
          body["inlineTrustConfig"] = g["inlineTrustConfig"];
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
    delete: {
      description: "Delete the workloadIdentityPools",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the workloadIdentityPools",
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
      description: "Sync workloadIdentityPools state from GCP",
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
      description: "List workloadIdentityPools resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of pools to return. If unspecified, at most 50 pools are returned. The maximum value is 1000; values above are 1000 truncated to 1000.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Whether to return soft-deleted pools.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "workloadIdentityPools",
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
    add_attestation_rule: {
      description: "add attestation rule",
      arguments: z.object({
        attestationRule: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["attestationRule"] !== undefined) {
          body["attestationRule"] = args["attestationRule"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "iam.projects.locations.workloadIdentityPools.addAttestationRule",
            "path": "v1/{+resource}:addAttestationRule",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "iam.projects.locations.workloadIdentityPools.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_attestation_rules: {
      description: "list attestation rules",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "iam.projects.locations.workloadIdentityPools.listAttestationRules",
            "path": "v1/{+resource}:listAttestationRules",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "filter": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_attestation_rules: {
      description: "set attestation rules",
      arguments: z.object({
        attestationRules: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["attestationRules"] !== undefined) {
          body["attestationRules"] = args["attestationRules"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "iam.projects.locations.workloadIdentityPools.setAttestationRules",
            "path": "v1/{+resource}:setAttestationRules",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "iam.projects.locations.workloadIdentityPools.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "iam.projects.locations.workloadIdentityPools.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    undelete: {
      description: "undelete",
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
            "id": "iam.projects.locations.workloadIdentityPools.undelete",
            "path": "v1/{+name}:undelete",
            "httpMethod": "POST",
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
