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

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isAlreadyExistsError,
  isResourceNotFoundError,
  listResources,
  readResource,
  request,
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

const LIST_CONFIG = {
  "id": "cloudidentity.groups.memberships.list",
  "path": "v1/{+parent}/memberships",
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
    "view": {
      "location": "query",
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
  preferredMemberKey: z.object({
    id: z.string().describe(
      "The ID of the entity. For Google-managed entities, the `id` should be the email address of an existing group or user. Email addresses need to adhere to [name guidelines for users and groups](https://support.google.com/a/answer/9193374). For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`.",
    ).optional(),
    namespace: z.string().describe(
      "The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source}`.",
    ).optional(),
  }).describe("Required. Immutable. The `EntityKey` of the member.").optional(),
  roles: z.array(z.object({
    expiryDetail: z.object({
      expireTime: z.string().describe(
        "The time at which the `MembershipRole` will expire.",
      ).optional(),
    }).describe(
      "The expiry details of the `MembershipRole`. Expiry details are only supported for `MEMBER` `MembershipRoles`. May be set if `name` is `MEMBER`. Must not be set if `name` is any other value.",
    ).optional(),
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
      }).describe(
        "Evaluation of the member restriction applied to this membership. Empty if the user lacks permission to view the restriction evaluation.",
      ).optional(),
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

// `request` is auto-imported by the generator for all enrichments; reference it
// so the generated model's import isn't flagged as unused by deno lint.
void request;

const membershipReconcileMethods = {
  set_members: {
    description:
      "Reconcile group membership to an exact desired set — add missing members, delete members not in the set",
    arguments: z.object({
      desiredMembers: z.array(z.object({
        id: z.string().describe(
          "The preferredMemberKey.id (email address or external identity) of the desired member",
        ),
        roles: z.array(z.object({
          name: z.string().describe(
            "Role name: OWNER, MANAGER, or MEMBER",
          ),
        })).optional().describe(
          "Roles to assign when creating a new membership. Defaults to [{ name: 'MEMBER' }] if omitted. Ignored for members that already exist.",
        ),
      })).describe(
        "The exact set of members the group should have after reconciliation. Members not in this list will be removed.",
      ),
      maxPages: z.number().optional().describe(
        "Maximum pages to fetch when listing current members (default: 100). Each page returns up to 200 members.",
      ),
    }),
    execute: async (
      args: Record<string, unknown>,
      context: any,
    ) => {
      const g = context.globalArgs;
      const baseUrl = g["apiEndpoint"]?.toString() ??
        Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
      const credentials = _buildGcpCredentials(g);
      const parent = String(g["parent"] ?? "");

      const desiredMembers = args["desiredMembers"] as Array<{
        id: string;
        roles?: Array<{ name: string }>;
      }>;
      const maxPages = (args["maxPages"] as number | undefined) ?? 100;

      const { items: currentMembers, nextPageToken } = await listResources(
        baseUrl,
        LIST_CONFIG,
        { parent },
        "memberships",
        maxPages,
        credentials,
      );

      if (nextPageToken) {
        throw new Error(
          `Group has more members than ${maxPages} pages can fetch. ` +
            `Increase maxPages to avoid incorrectly removing unfetched members.`,
        );
      }

      const desiredIds = new Set(desiredMembers.map((m) => m.id));
      const currentById = new Map<string, any>();
      for (const member of currentMembers) {
        const id = member?.preferredMemberKey?.id;
        if (id) currentById.set(id, member);
      }

      const toCreate = desiredMembers.filter((m) => !currentById.has(m.id));
      const toDelete = currentMembers.filter((m: any) => {
        const id = m?.preferredMemberKey?.id;
        return id && !desiredIds.has(id);
      });

      const created: any[] = [];
      for (const member of toCreate) {
        const body: Record<string, unknown> = {
          preferredMemberKey: { id: member.id },
          roles: member.roles ?? [{ name: "MEMBER" }],
        };
        try {
          const result = await createResource(
            baseUrl,
            INSERT_CONFIG,
            { parent },
            body,
            GET_CONFIG,
            undefined,
            undefined,
            credentials,
          );
          created.push(result);
        } catch (createErr) {
          if (!isAlreadyExistsError(createErr)) throw createErr;
          const { items } = await listResources(
            baseUrl,
            LIST_CONFIG,
            { parent },
            "memberships",
            100,
            credentials,
          );
          const existing = items.find((item: any) =>
            item?.preferredMemberKey?.id === member.id
          );
          if (existing) created.push(existing);
          else throw createErr;
        }
      }

      const deleted: string[] = [];
      for (const member of toDelete) {
        const memberName = member.name as string;
        await deleteResource(
          baseUrl,
          DELETE_CONFIG,
          { name: memberName },
          credentials,
        );
        deleted.push(member.preferredMemberKey?.id ?? memberName);
      }

      const { items: reconciledMembers } = await listResources(
        baseUrl,
        LIST_CONFIG,
        { parent },
        "memberships",
        maxPages,
        credentials,
      );

      const dataHandles = [];
      for (let i = 0; i < reconciledMembers.length; i++) {
        const item = reconciledMembers[i];
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

      return {
        dataHandles,
        result: {
          created: created.length,
          deleted: deleted.length,
          deletedIds: deleted,
          total: reconciledMembers.length,
        },
      };
    },
  },
};

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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  preferredMemberKey: z.object({
    id: z.string().describe(
      "The ID of the entity. For Google-managed entities, the `id` should be the email address of an existing group or user. Email addresses need to adhere to [name guidelines for users and groups](https://support.google.com/a/answer/9193374). For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`.",
    ).optional(),
    namespace: z.string().describe(
      "The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source}`.",
    ).optional(),
  }).describe("Required. Immutable. The `EntityKey` of the member.").optional(),
  roles: z.array(z.object({
    expiryDetail: z.object({
      expireTime: z.string().describe(
        "The time at which the `MembershipRole` will expire.",
      ).optional(),
    }).describe(
      "The expiry details of the `MembershipRole`. Expiry details are only supported for `MEMBER` `MembershipRoles`. May be set if `name` is `MEMBER`. Must not be set if `name` is any other value.",
    ).optional(),
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
      }).describe(
        "Evaluation of the member restriction applied to this membership. Empty if the user lacks permission to view the restriction evaluation.",
      ).optional(),
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

/** Swamp extension model for Google Cloud Identity Groups.Memberships. Registered at `@swamp/gcp/cloudidentity/groups-memberships`. */
export const model = {
  type: "@swamp/gcp/cloudidentity/groups-memberships",
  version: "2026.10.23.1",
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
      description: "No schema changes",
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
      toVersion: "2026.07.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.24.2",
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
      toVersion: "2026.08.12.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: id, namespace, expiryDetail, expireTime, restrictionEvaluations, memberRestrictionEvaluation, state",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          id: _id,
          namespace: _namespace,
          expiryDetail: _expiryDetail,
          expireTime: _expireTime,
          restrictionEvaluations: _restrictionEvaluations,
          memberRestrictionEvaluation: _memberRestrictionEvaluation,
          state: _state,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        let result: StateData;
        try {
          result = await createResource(
            baseUrl,
            INSERT_CONFIG,
            params,
            body,
            GET_CONFIG,
            undefined,
            undefined,
            credentials,
          ) as StateData;
        } catch (createErr) {
          if (!isAlreadyExistsError(createErr)) throw createErr;
          const matchValue = String(g["preferredMemberKey"]?.id ?? "");
          const { items } = await listResources(
            baseUrl,
            LIST_CONFIG,
            { "parent": String(body["parent"] ?? g["parent"] ?? "") },
            "memberships",
            100,
            credentials,
          );
          const existing = items.find((item: any) =>
            item?.preferredMemberKey?.id === matchValue
          );
          if (existing) result = existing as StateData;
          else throw createErr;
        }
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
      description: "Delete the memberships",
      arguments: z.object({
        identifier: z.string().describe("The name of the memberships"),
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
      description: "Sync memberships state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific memberships by name (e.g. one discovered by list)",
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
      description: "List memberships resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of results to return. Note that the number of results returned may be less than this value even if there are more available results. To fetch all results, clients must continue calling this method repeatedly until the response no longer contains a `next_page_token`. If unspecified, defaults to 200 for `GroupView.BASIC` and to 50 for `GroupView.FULL`. Must not be greater than 1000 for `GroupView.BASIC` or 500 for `GroupView.FULL`.",
        ).optional(),
        view: z.string().describe(
          "The level of detail to be returned. If unspecified, defaults to `View.BASIC`.",
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
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "memberships",
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
    check_transitive_membership: {
      description: "check transitive membership",
      arguments: z.object({
        query: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["query"] !== undefined) {
          params["query"] = String(args["query"]);
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_membership_graph: {
      description: "get membership graph",
      arguments: z.object({
        query: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["query"] !== undefined) {
          params["query"] = String(args["query"]);
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    lookup: {
      description: "lookup",
      arguments: z.object({
        memberKey_id: z.any().optional(),
        memberKey_namespace: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["memberKey_id"] !== undefined) {
          params["memberKey.id"] = String(args["memberKey_id"]);
        }
        if (args["memberKey_namespace"] !== undefined) {
          params["memberKey.namespace"] = String(args["memberKey_namespace"]);
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
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
        if (args["addRoles"] !== undefined) body["addRoles"] = args["addRoles"];
        if (args["removeRoles"] !== undefined) {
          body["removeRoles"] = args["removeRoles"];
        }
        if (args["updateRolesParams"] !== undefined) {
          body["updateRolesParams"] = args["updateRolesParams"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "cloudidentity.groups.memberships.modifyMembershipRoles",
            "path": "v1/{+name}:modifyMembershipRoles",
            "httpMethod": "POST",
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
    search_direct_groups: {
      description: "search direct groups",
      arguments: z.object({
        orderBy: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        query: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["pageToken"] !== undefined) {
          params["pageToken"] = String(args["pageToken"]);
        }
        if (args["query"] !== undefined) {
          params["query"] = String(args["query"]);
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    search_transitive_groups: {
      description: "search transitive groups",
      arguments: z.object({
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        query: z.any().optional(),
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
        if (args["pageToken"] !== undefined) {
          params["pageToken"] = String(args["pageToken"]);
        }
        if (args["query"] !== undefined) {
          params["query"] = String(args["query"]);
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    search_transitive_memberships: {
      description: "search transitive memberships",
      arguments: z.object({
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
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
        if (args["pageToken"] !== undefined) {
          params["pageToken"] = String(args["pageToken"]);
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    ...membershipReconcileMethods,
  },
};
