// Auto-generated extension model for @swamp/gcp/gkehub/memberships-rbacrolebindings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE Hub Memberships.Rbacrolebindings.
 *
 * RBACRoleBinding represents a rbacrolebinding across the Fleet
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
  return `${parent}/rbacrolebindings/${shortName}`;
}

const BASE_URL = "https://gkehub.googleapis.com/";

const GET_CONFIG = {
  "id": "gkehub.projects.locations.memberships.rbacrolebindings.get",
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
  "id": "gkehub.projects.locations.memberships.rbacrolebindings.create",
  "path": "v1/{+parent}/rbacrolebindings",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "rbacrolebindingId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "gkehub.projects.locations.memberships.rbacrolebindings.patch",
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
  "id": "gkehub.projects.locations.memberships.rbacrolebindings.delete",
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
  "id": "gkehub.projects.locations.memberships.rbacrolebindings.list",
  "path": "v1/{+parent}/rbacrolebindings",
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
  group: z.string().describe(
    "group is the group, as seen by the kubernetes cluster.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for this RBACRolebinding.",
  ).optional(),
  name: z.string().describe(
    "The resource name for the rbacrolebinding `projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}` or `projects/{project}/locations/{location}/memberships/{membership}/rbacrolebindings/{rbacrolebinding}`",
  ).optional(),
  role: z.object({
    customRole: z.string().describe(
      "Optional. custom_role is the name of a custom KubernetesClusterRole to use.",
    ).optional(),
    predefinedRole: z.enum([
      "UNKNOWN",
      "ADMIN",
      "EDIT",
      "VIEW",
      "ANTHOS_SUPPORT",
    ]).describe("predefined_role is the Kubernetes default role to use")
      .optional(),
  }).describe("Role is the type for Kubernetes roles").optional(),
  state: z.object({
    code: z.enum([
      "CODE_UNSPECIFIED",
      "CREATING",
      "READY",
      "DELETING",
      "UPDATING",
    ]).describe(
      "Output only. The current state of the rbacrolebinding resource.",
    ).optional(),
  }).describe(
    "RBACRoleBindingLifecycleState describes the state of a RbacRoleBinding resource.",
  ).optional(),
  user: z.string().describe(
    'user is the name of the user as seen by the kubernetes cluster, example "alice" or "alice@domain.tld"',
  ).optional(),
  rbacrolebindingId: z.string().describe(
    "Required. Client chosen ID for the RBACRoleBinding. `rbacrolebinding_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  group: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  role: z.object({
    customRole: z.string(),
    predefinedRole: z.string(),
  }).optional(),
  state: z.object({
    code: z.string(),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  user: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  group: z.string().describe(
    "group is the group, as seen by the kubernetes cluster.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels for this RBACRolebinding.",
  ).optional(),
  name: z.string().describe(
    "The resource name for the rbacrolebinding `projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}` or `projects/{project}/locations/{location}/memberships/{membership}/rbacrolebindings/{rbacrolebinding}`",
  ).optional(),
  role: z.object({
    customRole: z.string().describe(
      "Optional. custom_role is the name of a custom KubernetesClusterRole to use.",
    ).optional(),
    predefinedRole: z.enum([
      "UNKNOWN",
      "ADMIN",
      "EDIT",
      "VIEW",
      "ANTHOS_SUPPORT",
    ]).describe("predefined_role is the Kubernetes default role to use")
      .optional(),
  }).describe("Role is the type for Kubernetes roles").optional(),
  state: z.object({
    code: z.enum([
      "CODE_UNSPECIFIED",
      "CREATING",
      "READY",
      "DELETING",
      "UPDATING",
    ]).describe(
      "Output only. The current state of the rbacrolebinding resource.",
    ).optional(),
  }).describe(
    "RBACRoleBindingLifecycleState describes the state of a RbacRoleBinding resource.",
  ).optional(),
  user: z.string().describe(
    'user is the name of the user as seen by the kubernetes cluster, example "alice" or "alice@domain.tld"',
  ).optional(),
  rbacrolebindingId: z.string().describe(
    "Required. Client chosen ID for the RBACRoleBinding. `rbacrolebinding_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud GKE Hub Memberships.Rbacrolebindings. Registered at `@swamp/gcp/gkehub/memberships-rbacrolebindings`. */
export const model = {
  type: "@swamp/gcp/gkehub/memberships-rbacrolebindings",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "RBACRoleBinding represents a rbacrolebinding across the Fleet",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a rbacrolebindings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["group"] !== undefined) body["group"] = g["group"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["user"] !== undefined) body["user"] = g["user"];
        if (g["rbacrolebindingId"] !== undefined) {
          body["rbacrolebindingId"] = g["rbacrolebindingId"];
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
      description: "Get a rbacrolebindings",
      arguments: z.object({
        identifier: z.string().describe("The name of the rbacrolebindings"),
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
      description: "Update rbacrolebindings attributes",
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
        if (g["group"] !== undefined) body["group"] = g["group"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["user"] !== undefined) body["user"] = g["user"];
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
      description: "Delete the rbacrolebindings",
      arguments: z.object({
        identifier: z.string().describe("The name of the rbacrolebindings"),
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
      description: "Sync rbacrolebindings state from GCP",
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
      description: "List rbacrolebindings resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned.",
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
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "rbacrolebindings",
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
    generate_membership_rbacrole_binding_yaml: {
      description: "generate membership rbacrole binding yaml",
      arguments: z.object({
        createTime: z.any().optional(),
        deleteTime: z.any().optional(),
        group: z.any().optional(),
        labels: z.any().optional(),
        name: z.any().optional(),
        role: z.any().optional(),
        state: z.any().optional(),
        uid: z.any().optional(),
        updateTime: z.any().optional(),
        user: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["deleteTime"] !== undefined) {
          body["deleteTime"] = args["deleteTime"];
        }
        if (args["group"] !== undefined) body["group"] = args["group"];
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["role"] !== undefined) body["role"] = args["role"];
        if (args["state"] !== undefined) body["state"] = args["state"];
        if (args["uid"] !== undefined) body["uid"] = args["uid"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        if (args["user"] !== undefined) body["user"] = args["user"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "gkehub.projects.locations.memberships.rbacrolebindings.generateMembershipRBACRoleBindingYAML",
            "path":
              "v1/{+parent}/rbacrolebindings:generateMembershipRBACRoleBindingYAML",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "rbacrolebindingId": { "location": "query" },
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
