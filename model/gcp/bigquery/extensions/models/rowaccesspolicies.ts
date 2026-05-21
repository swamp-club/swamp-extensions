// Auto-generated extension model for @swamp/gcp/bigquery/rowaccesspolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BigQuery RowAccessPolicies.
 *
 * Represents access on a subset of rows on the specified table, defined by its filter predicate. Access to the subset of rows is controlled by its IAM policy.
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

const BASE_URL = "https://bigquery.googleapis.com/bigquery/v2/";

const GET_CONFIG = {
  "id": "bigquery.rowAccessPolicies.get",
  "path":
    "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies/{+policyId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "datasetId",
    "tableId",
    "policyId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "policyId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "tableId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "bigquery.rowAccessPolicies.insert",
  "path":
    "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
    "datasetId",
    "tableId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "tableId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "bigquery.rowAccessPolicies.update",
  "path":
    "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies/{+policyId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "projectId",
    "datasetId",
    "tableId",
    "policyId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "policyId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "tableId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "bigquery.rowAccessPolicies.delete",
  "path":
    "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies/{+policyId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "projectId",
    "datasetId",
    "tableId",
    "policyId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "force": {
      "location": "query",
    },
    "policyId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "tableId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "bigquery.rowAccessPolicies.list",
  "path":
    "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "datasetId",
    "tableId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "tableId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  filterPredicate: z.string().describe(
    "Required. A SQL boolean expression that represents the rows defined by this row access policy, similar to the boolean expression in a WHERE clause of a SELECT query on a table. References to other tables, routines, and temporary functions are not supported. Examples: region=\"EU\" date_field = CAST('2019-9-27' as DATE) nullable_field is not NULL numeric_field BETWEEN 1.0 AND 5.0",
  ).optional(),
  grantees: z.array(z.string()).describe(
    'Optional. Input only. The optional list of iam_member users or groups that specifies the initial members that the row-level access policy should be created with. grantees types: - "user:alice@example.com": An email address that represents a specific Google account. - "serviceAccount:my-other-app@appspot.gserviceaccount.com": An email address that represents a service account. - "group:admins@example.com": An email address that represents a Google group. - "domain:example.com":The Google Workspace domain (primary) that represents all the users of that domain. - "allAuthenticatedUsers": A special identifier that represents all service accounts and all users on the internet who have authenticated with a Google Account. This identifier includes accounts that aren\'t connected to a Google Workspace or Cloud Identity domain, such as personal Gmail accounts. Users who aren\'t authenticated, such as anonymous visitors, aren\'t included. - "allUsers":A special identifier that represents anyone who is on the internet, including authenticated and unauthenticated users. Because BigQuery requires authentication before a user can access the service, allUsers includes only authenticated users.',
  ).optional(),
  rowAccessPolicyReference: z.object({
    datasetId: z.string().describe(
      "Required. The ID of the dataset containing this row access policy.",
    ).optional(),
    policyId: z.string().describe(
      "Required. The ID of the row access policy. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
    ).optional(),
    projectId: z.string().describe(
      "Required. The ID of the project containing this row access policy.",
    ).optional(),
    tableId: z.string().describe(
      "Required. The ID of the table containing this row access policy.",
    ).optional(),
  }).describe("Id path of a row access policy.").optional(),
  datasetId: z.string().describe(
    "Required. Dataset ID of the table to get the row access policy.",
  ),
  tableId: z.string().describe(
    "Required. Table ID of the table to get the row access policy.",
  ),
});

const StateSchema = z.object({
  creationTime: z.string().optional(),
  etag: z.string().optional(),
  filterPredicate: z.string().optional(),
  grantees: z.array(z.string()).optional(),
  lastModifiedTime: z.string().optional(),
  rowAccessPolicyReference: z.object({
    datasetId: z.string(),
    policyId: z.string(),
    projectId: z.string(),
    tableId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  filterPredicate: z.string().describe(
    "Required. A SQL boolean expression that represents the rows defined by this row access policy, similar to the boolean expression in a WHERE clause of a SELECT query on a table. References to other tables, routines, and temporary functions are not supported. Examples: region=\"EU\" date_field = CAST('2019-9-27' as DATE) nullable_field is not NULL numeric_field BETWEEN 1.0 AND 5.0",
  ).optional(),
  grantees: z.array(z.string()).describe(
    'Optional. Input only. The optional list of iam_member users or groups that specifies the initial members that the row-level access policy should be created with. grantees types: - "user:alice@example.com": An email address that represents a specific Google account. - "serviceAccount:my-other-app@appspot.gserviceaccount.com": An email address that represents a service account. - "group:admins@example.com": An email address that represents a Google group. - "domain:example.com":The Google Workspace domain (primary) that represents all the users of that domain. - "allAuthenticatedUsers": A special identifier that represents all service accounts and all users on the internet who have authenticated with a Google Account. This identifier includes accounts that aren\'t connected to a Google Workspace or Cloud Identity domain, such as personal Gmail accounts. Users who aren\'t authenticated, such as anonymous visitors, aren\'t included. - "allUsers":A special identifier that represents anyone who is on the internet, including authenticated and unauthenticated users. Because BigQuery requires authentication before a user can access the service, allUsers includes only authenticated users.',
  ).optional(),
  rowAccessPolicyReference: z.object({
    datasetId: z.string().describe(
      "Required. The ID of the dataset containing this row access policy.",
    ).optional(),
    policyId: z.string().describe(
      "Required. The ID of the row access policy. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
    ).optional(),
    projectId: z.string().describe(
      "Required. The ID of the project containing this row access policy.",
    ).optional(),
    tableId: z.string().describe(
      "Required. The ID of the table containing this row access policy.",
    ).optional(),
  }).describe("Id path of a row access policy.").optional(),
  datasetId: z.string().describe(
    "Required. Dataset ID of the table to get the row access policy.",
  ).optional(),
  tableId: z.string().describe(
    "Required. Table ID of the table to get the row access policy.",
  ).optional(),
});

/** Swamp extension model for Google Cloud BigQuery RowAccessPolicies. Registered at `@swamp/gcp/bigquery/rowaccesspolicies`. */
export const model = {
  type: "@swamp/gcp/bigquery/rowaccesspolicies",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents access on a subset of rows on the specified table, defined by its ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a rowAccessPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        }
        if (g["tableId"] !== undefined) {
          params["tableId"] = String(g["tableId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["filterPredicate"] !== undefined) {
          body["filterPredicate"] = g["filterPredicate"];
        }
        if (g["grantees"] !== undefined) body["grantees"] = g["grantees"];
        if (g["rowAccessPolicyReference"] !== undefined) {
          body["rowAccessPolicyReference"] = g["rowAccessPolicyReference"];
        }
        if (g["name"] !== undefined) params["policyId"] = String(g["name"]);
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
              "projectId": projectId,
              "datasetId": String(g["datasetId"] ?? ""),
              "tableId": String(g["tableId"] ?? ""),
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
      description: "Get a rowAccessPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the rowAccessPolicies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        }
        if (g["tableId"] !== undefined) {
          params["tableId"] = String(g["tableId"]);
        }
        params["policyId"] = args.identifier;
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
      description: "Update rowAccessPolicies attributes",
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
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        } else if (existing["datasetId"]) {
          params["datasetId"] = String(existing["datasetId"]);
        }
        if (g["tableId"] !== undefined) {
          params["tableId"] = String(g["tableId"]);
        } else if (existing["tableId"]) {
          params["tableId"] = String(existing["tableId"]);
        }
        params["policyId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["filterPredicate"] !== undefined) {
          body["filterPredicate"] = g["filterPredicate"];
        }
        if (g["grantees"] !== undefined) body["grantees"] = g["grantees"];
        if (g["rowAccessPolicyReference"] !== undefined) {
          body["rowAccessPolicyReference"] = g["rowAccessPolicyReference"];
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
      description: "Delete the rowAccessPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the rowAccessPolicies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        }
        if (g["tableId"] !== undefined) {
          params["tableId"] = String(g["tableId"]);
        }
        params["policyId"] = args.identifier;
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
      description: "Sync rowAccessPolicies state from GCP",
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
          if (g["datasetId"] !== undefined) {
            params["datasetId"] = String(g["datasetId"]);
          } else if (existing["datasetId"]) {
            params["datasetId"] = String(existing["datasetId"]);
          }
          if (g["tableId"] !== undefined) {
            params["tableId"] = String(g["tableId"]);
          } else if (existing["tableId"]) {
            params["tableId"] = String(existing["tableId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["policyId"] = identifier;
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        force: z.any().optional(),
        policyIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        }
        if (g["tableId"] !== undefined) {
          params["tableId"] = String(g["tableId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["force"] !== undefined) body["force"] = args["force"];
        if (args["policyIds"] !== undefined) {
          body["policyIds"] = args["policyIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigquery.rowAccessPolicies.batchDelete",
            "path":
              "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/rowAccessPolicies:batchDelete",
            "httpMethod": "POST",
            "parameterOrder": ["projectId", "datasetId", "tableId"],
            "parameters": {
              "datasetId": { "location": "path", "required": true },
              "projectId": { "location": "path", "required": true },
              "tableId": { "location": "path", "required": true },
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
            "id": "bigquery.rowAccessPolicies.getIamPolicy",
            "path": "{+resource}:getIamPolicy",
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
            "id": "bigquery.rowAccessPolicies.testIamPermissions",
            "path": "{+resource}:testIamPermissions",
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
  },
};
