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
  getProjectId,
  isResourceNotFoundError,
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
          "Images that are exempted from normal checks based on name pattern only.",
        ).optional(),
        imageFreshnessCheck: z.unknown().describe(
          "An image freshness check, which rejects images that were uploaded before the set number of days ago to the supported repositories.",
        ).optional(),
        sigstoreSignatureCheck: z.unknown().describe(
          "A Sigstore signature check, which verifies the Sigstore signature associated with an image.",
        ).optional(),
        simpleSigningAttestationCheck: z.unknown().describe(
          "Require a signed [DSSE](https://github.com/secure-systems-lab/dsse) attestation with type SimpleSigning.",
        ).optional(),
        slsaCheck: z.unknown().describe(
          "A SLSA provenance attestation check, which ensures that images are built by a trusted builder using source code from its trusted repositories only.",
        ).optional(),
        trustedDirectoryCheck: z.unknown().describe(
          "A trusted directory check, which rejects images that do not come from the set of user-configured trusted directories.",
        ).optional(),
        vulnerabilityCheck: z.unknown().describe(
          "An image vulnerability check, which rejects images that violate the configured vulnerability rules.",
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
        "Images that are exempted from normal checks based on name pattern only.",
      ).optional(),
      scope: z.object({
        kubernetesNamespace: z.string().describe(
          "Optional. Matches all Kubernetes service accounts in the provided namespace, unless a more specific `kubernetes_service_account` scope already matched.",
        ).optional(),
        kubernetesServiceAccount: z.string().describe(
          "Optional. Matches a single Kubernetes service account, e.g. `my-namespace:my-service-account`. `kubernetes_service_account` scope is always more specific than `kubernetes_namespace` scope for the same namespace.",
        ).optional(),
      }).describe("A scope specifier for `CheckSet` objects.").optional(),
    })).describe(
      'Optional. The `CheckSet` objects to apply, scoped by namespace or namespace and service account. Exactly one `CheckSet` will be evaluated for a given Pod (unless the list is empty, in which case the behavior is "always allow"). If multiple `CheckSet` objects have scopes that match the namespace and service account of the Pod being evaluated, only the `CheckSet` with the MOST SPECIFIC scope will match. `CheckSet` objects must be listed in order of decreasing specificity, i.e. if a scope matches a given service account (which must include the namespace), it must come before a `CheckSet` with a scope matching just that namespace. This property is enforced by server-side validation. The purpose of this restriction is to ensure that if more than one `CheckSet` matches a given Pod, the `CheckSet` that will be evaluated will always be the first in the list to match (because if any other matches, it must be less specific). If `check_sets` is empty, the default behavior is to allow all images. If `check_sets` is non-empty, the last `check_sets` entry must always be a `CheckSet` with no scope set, i.e. a catchall to handle any situation not caught by the preceding `CheckSet` objects.',
    ).optional(),
    imageAllowlist: z.object({
      allowPattern: z.array(z.string()).describe(
        "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
      ).optional(),
    }).describe(
      "Images that are exempted from normal checks based on name pattern only.",
    ).optional(),
  }).describe(
    "A Binary Authorization policy for a GKE cluster. This is one type of policy that can occur as a `PlatformPolicy`.",
  ).optional(),
  policyId: z.string().describe("Required. The platform policy ID.").optional(),
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
          "Images that are exempted from normal checks based on name pattern only.",
        ).optional(),
        imageFreshnessCheck: z.unknown().describe(
          "An image freshness check, which rejects images that were uploaded before the set number of days ago to the supported repositories.",
        ).optional(),
        sigstoreSignatureCheck: z.unknown().describe(
          "A Sigstore signature check, which verifies the Sigstore signature associated with an image.",
        ).optional(),
        simpleSigningAttestationCheck: z.unknown().describe(
          "Require a signed [DSSE](https://github.com/secure-systems-lab/dsse) attestation with type SimpleSigning.",
        ).optional(),
        slsaCheck: z.unknown().describe(
          "A SLSA provenance attestation check, which ensures that images are built by a trusted builder using source code from its trusted repositories only.",
        ).optional(),
        trustedDirectoryCheck: z.unknown().describe(
          "A trusted directory check, which rejects images that do not come from the set of user-configured trusted directories.",
        ).optional(),
        vulnerabilityCheck: z.unknown().describe(
          "An image vulnerability check, which rejects images that violate the configured vulnerability rules.",
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
        "Images that are exempted from normal checks based on name pattern only.",
      ).optional(),
      scope: z.object({
        kubernetesNamespace: z.string().describe(
          "Optional. Matches all Kubernetes service accounts in the provided namespace, unless a more specific `kubernetes_service_account` scope already matched.",
        ).optional(),
        kubernetesServiceAccount: z.string().describe(
          "Optional. Matches a single Kubernetes service account, e.g. `my-namespace:my-service-account`. `kubernetes_service_account` scope is always more specific than `kubernetes_namespace` scope for the same namespace.",
        ).optional(),
      }).describe("A scope specifier for `CheckSet` objects.").optional(),
    })).describe(
      'Optional. The `CheckSet` objects to apply, scoped by namespace or namespace and service account. Exactly one `CheckSet` will be evaluated for a given Pod (unless the list is empty, in which case the behavior is "always allow"). If multiple `CheckSet` objects have scopes that match the namespace and service account of the Pod being evaluated, only the `CheckSet` with the MOST SPECIFIC scope will match. `CheckSet` objects must be listed in order of decreasing specificity, i.e. if a scope matches a given service account (which must include the namespace), it must come before a `CheckSet` with a scope matching just that namespace. This property is enforced by server-side validation. The purpose of this restriction is to ensure that if more than one `CheckSet` matches a given Pod, the `CheckSet` that will be evaluated will always be the first in the list to match (because if any other matches, it must be less specific). If `check_sets` is empty, the default behavior is to allow all images. If `check_sets` is non-empty, the last `check_sets` entry must always be a `CheckSet` with no scope set, i.e. a catchall to handle any situation not caught by the preceding `CheckSet` objects.',
    ).optional(),
    imageAllowlist: z.object({
      allowPattern: z.array(z.string()).describe(
        "Required. A disjunction of image patterns to allow. If any of these patterns match, then the image is considered exempted by this allowlist.",
      ).optional(),
    }).describe(
      "Images that are exempted from normal checks based on name pattern only.",
    ).optional(),
  }).describe(
    "A Binary Authorization policy for a GKE cluster. This is one type of policy that can occur as a `PlatformPolicy`.",
  ).optional(),
  policyId: z.string().describe("Required. The platform policy ID.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Binary Authorization Platforms.Policies. Registered at `@swamp/gcp/binaryauthorization/platforms-policies`. */
export const model = {
  type: "@swamp/gcp/binaryauthorization/platforms-policies",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["gkePolicy"] !== undefined) body["gkePolicy"] = g["gkePolicy"];
        if (g["policyId"] !== undefined) body["policyId"] = g["policyId"];
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
    delete: {
      description: "Delete the policies",
      arguments: z.object({
        identifier: z.string().describe("The name of the policies"),
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
      description: "Sync policies state from GCP",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
          BASE_URL,
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
        );
        return { result };
      },
    },
  },
};
