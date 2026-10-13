// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/binaryauthorization/platforms-policies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Binary Authorization Platforms.Policies.
 *
 * A Binary Authorization platform policy for deployments on various platforms.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/policies/${shortName}`;
}

const BASE_URL = "https://binaryauthorization.googleapis.com/";

const GET_CONFIG = {
  "id": "binaryauthorization.projects.platforms.policies.get",
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
  "id": "binaryauthorization.projects.platforms.policies.create",
  "path": "v1/{+parent}/policies",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "policyId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "binaryauthorization.projects.platforms.policies.delete",
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
  "id": "binaryauthorization.projects.platforms.policies.list",
  "path": "v1/{+parent}/policies",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  description: z.string().describe(
    "Optional. A description comment about the policy.",
  ).optional(),
  gkePolicy: z.object({
    checkSets: z.array(z.object({
      checks: z.array(z.object({
        alwaysDeny: z.unknown().describe(
          'Optional. A special-case check that always denies. Note that this still only applies when the scope of the `CheckSet` applies and the image isn\'t exempted by an image allowlist. This check is primarily useful for testing, or to set the default behavior for all unmatched scopes to "deny".',
        ).optional(),
        displayName: z.unknown().describe(
          "Optional. A user-provided name for this check. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
        ).optional(),
        imageAllowlist: z.unknown().describe(
          "Optional. Images exempted from this check. If any of the patterns match the image url, the check will not be evaluated.",
        ).optional(),
        imageFreshnessCheck: z.unknown().describe(
          "Optional. Require that an image is no older than a configured expiration time. Image age is determined by its upload time.",
        ).optional(),
        sigstoreSignatureCheck: z.unknown().describe(
          "Optional. Require that an image was signed by Cosign with a trusted key. This check requires that both the image and signature are stored in Artifact Registry.",
        ).optional(),
        simpleSigningAttestationCheck: z.unknown().describe(
          "Optional. Require a SimpleSigning-type attestation for every image in the deployment.",
        ).optional(),
        slsaCheck: z.unknown().describe(
          "Optional. Require that an image was built by a trusted builder (such as Google Cloud Build), meets requirements for Supply chain Levels for Software Artifacts (SLSA), and was built from a trusted source code repostitory.",
        ).optional(),
        trustedDirectoryCheck: z.unknown().describe(
          "Optional. Require that an image lives in a trusted directory.",
        ).optional(),
        vulnerabilityCheck: z.unknown().describe(
          "Optional. Require that an image does not contain vulnerabilities that violate the configured rules, such as based on severity levels.",
        ).optional(),
      })).describe(
        'Optional. The checks to apply. The ultimate result of evaluating the check set will be "allow" if and only if every check in `checks` evaluates to "allow". If `checks` is empty, the default behavior is "always allow".',
      ).optional(),
      displayName: z.string().describe(
        "Optional. A user-provided name for this `CheckSet`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
      ).optional(),
      imageAllowlist: z.object({
        allowPattern: z.array(z.unknown()).describe(
          "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
        ).optional(),
      }).describe(
        "Optional. Images exempted from this `CheckSet`. If any of the patterns match the image being evaluated, no checks in the `CheckSet` will be evaluated.",
      ).optional(),
      scope: z.object({
        kubernetesNamespace: z.string().describe(
          "Optional. Matches all Kubernetes service accounts in the provided namespace, unless a more specific `kubernetes_service_account` scope already matched.",
        ).optional(),
        kubernetesServiceAccount: z.string().describe(
          "Optional. Matches a single Kubernetes service account, e.g. `my-namespace:my-service-account`. `kubernetes_service_account` scope is always more specific than `kubernetes_namespace` scope for the same namespace.",
        ).optional(),
      }).describe(
        "Optional. The scope to which this `CheckSet` applies. If unset or an empty string (the default), applies to all namespaces and service accounts. See the `Scope` message documentation for details on scoping rules.",
      ).optional(),
    })).describe(
      'Optional. The `CheckSet` objects to apply, scoped by namespace or namespace and service account. Exactly one `CheckSet` will be evaluated for a given Pod (unless the list is empty, in which case the behavior is "always allow"). If multiple `CheckSet` objects have scopes that match the namespace and service account of the Pod being evaluated, only the `CheckSet` with the MOST SPECIFIC scope will match. `CheckSet` objects must be listed in order of decreasing specificity, i.e. if a scope matches a given service account (which must include the namespace), it must come before a `CheckSet` with a scope matching just that namespace. This property is enforced by server-side validation. The purpose of this restriction is to ensure that if more than one `CheckSet` matches a given Pod, the `CheckSet` that will be evaluated will always be the first in the list to match (because if any other matches, it must be less specific). If `check_sets` is empty, the default behavior is to allow all images. If `check_sets` is non-empty, the last `check_sets` entry must always be a `CheckSet` with no scope set, i.e. a catchall to handle any situation not caught by the preceding `CheckSet` objects.',
    ).optional(),
    imageAllowlist: z.object({
      allowPattern: z.array(z.string()).describe(
        "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
      ).optional(),
    }).describe(
      "Optional. Images exempted from this policy. If any of the patterns match the image being evaluated, the rest of the policy will not be evaluated.",
    ).optional(),
  }).describe("Optional. GKE platform-specific policy.").optional(),
  policyId: z.string().describe("Required. The platform policy ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  etag: z.string().optional(),
  gkePolicy: z.object({
    checkSets: z.array(z.object({
      checks: z.array(z.object({
        alwaysDeny: z.unknown(),
        displayName: z.unknown(),
        imageAllowlist: z.unknown(),
        imageFreshnessCheck: z.unknown(),
        sigstoreSignatureCheck: z.unknown(),
        simpleSigningAttestationCheck: z.unknown(),
        slsaCheck: z.unknown(),
        trustedDirectoryCheck: z.unknown(),
        vulnerabilityCheck: z.unknown(),
      })),
      displayName: z.string(),
      imageAllowlist: z.object({
        allowPattern: z.array(z.unknown()),
      }),
      scope: z.object({
        kubernetesNamespace: z.string(),
        kubernetesServiceAccount: z.string(),
      }),
    })),
    imageAllowlist: z.object({
      allowPattern: z.array(z.string()),
    }),
  }).optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  description: z.string().describe(
    "Optional. A description comment about the policy.",
  ).optional(),
  gkePolicy: z.object({
    checkSets: z.array(z.object({
      checks: z.array(z.object({
        alwaysDeny: z.unknown().describe(
          'Optional. A special-case check that always denies. Note that this still only applies when the scope of the `CheckSet` applies and the image isn\'t exempted by an image allowlist. This check is primarily useful for testing, or to set the default behavior for all unmatched scopes to "deny".',
        ).optional(),
        displayName: z.unknown().describe(
          "Optional. A user-provided name for this check. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
        ).optional(),
        imageAllowlist: z.unknown().describe(
          "Optional. Images exempted from this check. If any of the patterns match the image url, the check will not be evaluated.",
        ).optional(),
        imageFreshnessCheck: z.unknown().describe(
          "Optional. Require that an image is no older than a configured expiration time. Image age is determined by its upload time.",
        ).optional(),
        sigstoreSignatureCheck: z.unknown().describe(
          "Optional. Require that an image was signed by Cosign with a trusted key. This check requires that both the image and signature are stored in Artifact Registry.",
        ).optional(),
        simpleSigningAttestationCheck: z.unknown().describe(
          "Optional. Require a SimpleSigning-type attestation for every image in the deployment.",
        ).optional(),
        slsaCheck: z.unknown().describe(
          "Optional. Require that an image was built by a trusted builder (such as Google Cloud Build), meets requirements for Supply chain Levels for Software Artifacts (SLSA), and was built from a trusted source code repostitory.",
        ).optional(),
        trustedDirectoryCheck: z.unknown().describe(
          "Optional. Require that an image lives in a trusted directory.",
        ).optional(),
        vulnerabilityCheck: z.unknown().describe(
          "Optional. Require that an image does not contain vulnerabilities that violate the configured rules, such as based on severity levels.",
        ).optional(),
      })).describe(
        'Optional. The checks to apply. The ultimate result of evaluating the check set will be "allow" if and only if every check in `checks` evaluates to "allow". If `checks` is empty, the default behavior is "always allow".',
      ).optional(),
      displayName: z.string().describe(
        "Optional. A user-provided name for this `CheckSet`. This field has no effect on the policy evaluation behavior except to improve readability of messages in evaluation results.",
      ).optional(),
      imageAllowlist: z.object({
        allowPattern: z.array(z.unknown()).describe(
          "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
        ).optional(),
      }).describe(
        "Optional. Images exempted from this `CheckSet`. If any of the patterns match the image being evaluated, no checks in the `CheckSet` will be evaluated.",
      ).optional(),
      scope: z.object({
        kubernetesNamespace: z.string().describe(
          "Optional. Matches all Kubernetes service accounts in the provided namespace, unless a more specific `kubernetes_service_account` scope already matched.",
        ).optional(),
        kubernetesServiceAccount: z.string().describe(
          "Optional. Matches a single Kubernetes service account, e.g. `my-namespace:my-service-account`. `kubernetes_service_account` scope is always more specific than `kubernetes_namespace` scope for the same namespace.",
        ).optional(),
      }).describe(
        "Optional. The scope to which this `CheckSet` applies. If unset or an empty string (the default), applies to all namespaces and service accounts. See the `Scope` message documentation for details on scoping rules.",
      ).optional(),
    })).describe(
      'Optional. The `CheckSet` objects to apply, scoped by namespace or namespace and service account. Exactly one `CheckSet` will be evaluated for a given Pod (unless the list is empty, in which case the behavior is "always allow"). If multiple `CheckSet` objects have scopes that match the namespace and service account of the Pod being evaluated, only the `CheckSet` with the MOST SPECIFIC scope will match. `CheckSet` objects must be listed in order of decreasing specificity, i.e. if a scope matches a given service account (which must include the namespace), it must come before a `CheckSet` with a scope matching just that namespace. This property is enforced by server-side validation. The purpose of this restriction is to ensure that if more than one `CheckSet` matches a given Pod, the `CheckSet` that will be evaluated will always be the first in the list to match (because if any other matches, it must be less specific). If `check_sets` is empty, the default behavior is to allow all images. If `check_sets` is non-empty, the last `check_sets` entry must always be a `CheckSet` with no scope set, i.e. a catchall to handle any situation not caught by the preceding `CheckSet` objects.',
    ).optional(),
    imageAllowlist: z.object({
      allowPattern: z.array(z.string()).describe(
        "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
      ).optional(),
    }).describe(
      "Optional. Images exempted from this policy. If any of the patterns match the image being evaluated, the rest of the policy will not be evaluated.",
    ).optional(),
  }).describe("Optional. GKE platform-specific policy.").optional(),
  policyId: z.string().describe("Required. The platform policy ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Binary Authorization Platforms.Policies. Registered at `@swamp/gcp/binaryauthorization/platforms-policies`. */
export const model = {
  type: "@swamp/gcp/binaryauthorization/platforms-policies",
  version: "2026.10.13.1",
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
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Binary Authorization platform policy for deployments on various platforms.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a policies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["gkePolicy"] !== undefined) body["gkePolicy"] = g["gkePolicy"];
        if (g["policyId"] !== undefined) {
          params["policyId"] = String(g["policyId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
          credentials,
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
      description: "Get a policies",
      arguments: z.object({
        identifier: z.string().describe("The name of the policies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
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
    delete: {
      description: "Delete the policies",
      arguments: z.object({
        identifier: z.string().describe("The name of the policies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync policies state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific policies by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
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
      description: "List policies resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Requested page size. The server may return fewer results than requested. If unspecified, the server picks an appropriate default.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "platformPolicies",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
    replace_platform_policy: {
      description: "replace platform policy",
      arguments: z.object({
        description: z.any().optional(),
        etag: z.any().optional(),
        gkePolicy: z.any().optional(),
        name: z.any().optional(),
        updateTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["gkePolicy"] !== undefined) {
          body["gkePolicy"] = args["gkePolicy"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "binaryauthorization.projects.platforms.policies.replacePlatformPolicy",
            "path": "v1/{+name}",
            "httpMethod": "PUT",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
