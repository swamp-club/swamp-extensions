// Auto-generated extension model for @swamp/gcp/cloudidentity/groups-memberships
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity Groups.Memberships.
 *
 * A membership within the Cloud Identity Groups API. A `Membership` defines a relationship between a `Group` and an entity belonging to that `Group`, referred to as a "member".
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
  return `${parent}/memberships/${shortName}`;
}

const BASE_URL = "https://cloudidentity.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudidentity.groups.memberships.get",
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
  "id": "cloudidentity.groups.memberships.create",
  "path": "v1/{+parent}/memberships",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "cloudidentity.groups.memberships.delete",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  preferredMemberKey: z.object({
    id: z.string().describe(
      "The ID of the entity. For Google-managed entities, the `id` should be the email address of an existing group or user. Email addresses need to adhere to [name guidelines for users and groups](https://support.google.com/a/answer/9193374). For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`.",
    ).optional(),
    namespace: z.string().describe(
      "The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source}`.",
    ).optional(),
  }).describe(
    "A unique identifier for an entity in the Cloud Identity Groups API. An entity can represent either a group with an optional `namespace` or a user without a `namespace`. The combination of `id` and `namespace` must be unique; however, the same `id` can be used with different `namespace`s.",
  ).optional(),
  roles: z.array(z.object({
    expiryDetail: z.object({
      expireTime: z.string().describe(
        "The time at which the `MembershipRole` will expire.",
      ).optional(),
    }).describe("The `MembershipRole` expiry details.").optional(),
    name: z.string().describe(
      "The name of the `MembershipRole`. Must be one of `OWNER`, `MANAGER`, `MEMBER`.",
    ).optional(),
    restrictionEvaluations: z.object({
      memberRestrictionEvaluation: z.object({
        state: z.enum([
          "STATE_UNSPECIFIED",
          "COMPLIANT",
          "FORWARD_COMPLIANT",
          "NON_COMPLIANT",
          "EVALUATING",
        ]).describe("Output only. The current state of the restriction")
          .optional(),
      }).describe("The evaluated state of this restriction.").optional(),
    }).describe(
      "Evaluations of restrictions applied to parent group on this membership.",
    ).optional(),
  })).describe(
    "The `MembershipRole`s that apply to the `Membership`. If unspecified, defaults to a single `MembershipRole` with `name` `MEMBER`. Must not contain duplicate `MembershipRole`s with the same `name`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  deliverySetting: z.string().optional(),
  name: z.string(),
  preferredMemberKey: z.object({
    id: z.string(),
    namespace: z.string(),
  }).optional(),
  roles: z.array(z.object({
    expiryDetail: z.object({
      expireTime: z.string(),
    }),
    name: z.string(),
    restrictionEvaluations: z.object({
      memberRestrictionEvaluation: z.object({
        state: z.string(),
      }),
    }),
  })).optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  preferredMemberKey: z.object({
    id: z.string().describe(
      "The ID of the entity. For Google-managed entities, the `id` should be the email address of an existing group or user. Email addresses need to adhere to [name guidelines for users and groups](https://support.google.com/a/answer/9193374). For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`.",
    ).optional(),
    namespace: z.string().describe(
      "The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source}`.",
    ).optional(),
  }).describe(
    "A unique identifier for an entity in the Cloud Identity Groups API. An entity can represent either a group with an optional `namespace` or a user without a `namespace`. The combination of `id` and `namespace` must be unique; however, the same `id` can be used with different `namespace`s.",
  ).optional(),
  roles: z.array(z.object({
    expiryDetail: z.object({
      expireTime: z.string().describe(
        "The time at which the `MembershipRole` will expire.",
      ).optional(),
    }).describe("The `MembershipRole` expiry details.").optional(),
    name: z.string().describe(
      "The name of the `MembershipRole`. Must be one of `OWNER`, `MANAGER`, `MEMBER`.",
    ).optional(),
    restrictionEvaluations: z.object({
      memberRestrictionEvaluation: z.object({
        state: z.enum([
          "STATE_UNSPECIFIED",
          "COMPLIANT",
          "FORWARD_COMPLIANT",
          "NON_COMPLIANT",
          "EVALUATING",
        ]).describe("Output only. The current state of the restriction")
          .optional(),
      }).describe("The evaluated state of this restriction.").optional(),
    }).describe(
      "Evaluations of restrictions applied to parent group on this membership.",
    ).optional(),
  })).describe(
    "The `MembershipRole`s that apply to the `Membership`. If unspecified, defaults to a single `MembershipRole` with `name` `MEMBER`. Must not contain duplicate `MembershipRole`s with the same `name`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Identity Groups.Memberships. Registered at `@swamp/gcp/cloudidentity/groups-memberships`. */
export const model = {
  type: "@swamp/gcp/cloudidentity/groups-memberships",
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
        "A membership within the Cloud Identity Groups API. A `Membership` defines a r...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a memberships",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["preferredMemberKey"] !== undefined) {
          body["preferredMemberKey"] = g["preferredMemberKey"];
        }
        if (g["roles"] !== undefined) body["roles"] = g["roles"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
      description: "Get a memberships",
      arguments: z.object({
        identifier: z.string().describe("The name of the memberships"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Delete the memberships",
      arguments: z.object({
        identifier: z.string().describe("The name of the memberships"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync memberships state from GCP",
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
            String(g["parent"] ?? ""),
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
    check_transitive_membership: {
      description: "check transitive membership",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudidentity.groups.memberships.checkTransitiveMembership",
            "path": "v1/{+parent}/memberships:checkTransitiveMembership",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "query": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_membership_graph: {
      description: "get membership graph",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudidentity.groups.memberships.getMembershipGraph",
            "path": "v1/{+parent}/memberships:getMembershipGraph",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "query": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    lookup: {
      description: "lookup",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudidentity.groups.memberships.lookup",
            "path": "v1/{+parent}/memberships:lookup",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "memberKey.id": { "location": "query" },
              "memberKey.namespace": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    modify_membership_roles: {
      description: "modify membership roles",
      arguments: z.object({
        addRoles: z.any().optional(),
        removeRoles: z.any().optional(),
        updateRolesParams: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["addRoles"] !== undefined) body["addRoles"] = args["addRoles"];
        if (args["removeRoles"] !== undefined) {
          body["removeRoles"] = args["removeRoles"];
        }
        if (args["updateRolesParams"] !== undefined) {
          body["updateRolesParams"] = args["updateRolesParams"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudidentity.groups.memberships.modifyMembershipRoles",
            "path": "v1/{+name}:modifyMembershipRoles",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    search_direct_groups: {
      description: "search direct groups",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudidentity.groups.memberships.searchDirectGroups",
            "path": "v1/{+parent}/memberships:searchDirectGroups",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "query": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    search_transitive_groups: {
      description: "search transitive groups",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudidentity.groups.memberships.searchTransitiveGroups",
            "path": "v1/{+parent}/memberships:searchTransitiveGroups",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "query": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    search_transitive_memberships: {
      description: "search transitive memberships",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudidentity.groups.memberships.searchTransitiveMemberships",
            "path": "v1/{+parent}/memberships:searchTransitiveMemberships",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
