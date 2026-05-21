// Auto-generated extension model for @swamp/gcp/bigquerydatapolicy/datapolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BigQuery Data Policy DataPolicies.
 *
 * Represents the label-policy binding.
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
  return `${parent}/dataPolicies/${shortName}`;
}

const BASE_URL = "https://bigquerydatapolicy.googleapis.com/";

const GET_CONFIG = {
  "id": "bigquerydatapolicy.projects.locations.dataPolicies.get",
  "path": "v2/{+name}",
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
  "id": "bigquerydatapolicy.projects.locations.dataPolicies.create",
  "path": "v2/{+parent}/dataPolicies",
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

const PATCH_CONFIG = {
  "id": "bigquerydatapolicy.projects.locations.dataPolicies.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
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
  "id": "bigquerydatapolicy.projects.locations.dataPolicies.delete",
  "path": "v2/{+name}",
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
  "id": "bigquerydatapolicy.projects.locations.dataPolicies.list",
  "path": "v2/{+parent}/dataPolicies",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
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
  dataPolicy: z.object({
    dataGovernanceTag: z.object({
      key: z.string().describe(
        "Optional. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example `parent-id/pii` where `parent-id` is the ID of the parent organization or project resource for this tag key.",
      ).optional(),
      value: z.string().describe(
        "Optional. Specifies the tag value as the short name, for example `sensitive`.",
      ).optional(),
    }).describe(
      "Data Governance tag This is a namespaced name specifying the key and the value. For example: `project-id/pii/sensitive`.",
    ).optional(),
    dataMaskingPolicy: z.object({
      predefinedExpression: z.enum([
        "PREDEFINED_EXPRESSION_UNSPECIFIED",
        "SHA256",
        "ALWAYS_NULL",
        "DEFAULT_MASKING_VALUE",
        "LAST_FOUR_CHARACTERS",
        "FIRST_FOUR_CHARACTERS",
        "EMAIL_MASK",
        "DATE_YEAR_MASK",
        "RANDOM_HASH",
      ]).describe("Optional. A predefined masking expression.").optional(),
      routine: z.string().describe(
        "Optional. The name of the BigQuery routine that contains the custom masking routine, in the format of `projects/{project_number}/datasets/{dataset_id}/routines/{routine_id}`.",
      ).optional(),
    }).describe("The policy used to specify data masking rule.").optional(),
    dataPolicyId: z.string().describe(
      "Output only. User-assigned (human readable) ID of the data policy that needs to be unique within a project. Used as {data_policy_id} in part of the resource name.",
    ).optional(),
    dataPolicyType: z.enum([
      "DATA_POLICY_TYPE_UNSPECIFIED",
      "DATA_MASKING_POLICY",
      "RAW_DATA_ACCESS_POLICY",
      "COLUMN_LEVEL_SECURITY_POLICY",
    ]).describe("Required. Type of data policy.").optional(),
    etag: z.string().describe(
      "The etag for this Data Policy. This field is used for UpdateDataPolicy calls. If Data Policy exists, this field is required and must match the server's etag. It will also be populated in the response of GetDataPolicy, CreateDataPolicy, and UpdateDataPolicy calls.",
    ).optional(),
    grantees: z.array(z.string()).describe(
      "Optional. The list of IAM principals that have Fine Grained Access to the underlying data goverened by this data policy. Uses the [IAM V2 principal syntax](https://cloud.google.com/iam/docs/principal-identifiers#v2) Only supports principal types users, groups, serviceaccounts, cloudidentity. This field is supported in V2 Data Policy only. In case of V1 data policies (i.e. verion = 1 and policy_tag is set), this field is not populated.",
    ).optional(),
    name: z.string().describe(
      "Identifier. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`.",
    ).optional(),
    policyTag: z.string().describe(
      "Output only. Policy tag resource name, in the format of `projects/{project_number}/locations/{location_id}/taxonomies/{taxonomy_id}/policyTags/{policyTag_id}`. policy_tag is supported only for V1 data policies.",
    ).optional(),
    version: z.enum(["VERSION_UNSPECIFIED", "V1", "V2"]).describe(
      "Output only. The version of the Data Policy resource.",
    ).optional(),
  }).describe("Represents the label-policy binding.").optional(),
  dataPolicyId: z.string().describe(
    "Output only. User-assigned (human readable) ID of the data policy that needs to be unique within a project. Used as {data_policy_id} in part of the resource name.",
  ).optional(),
  dataGovernanceTag: z.object({
    key: z.string().describe(
      "Optional. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example `parent-id/pii` where `parent-id` is the ID of the parent organization or project resource for this tag key.",
    ).optional(),
    value: z.string().describe(
      "Optional. Specifies the tag value as the short name, for example `sensitive`.",
    ).optional(),
  }).describe(
    "Data Governance tag This is a namespaced name specifying the key and the value. For example: `project-id/pii/sensitive`.",
  ).optional(),
  dataMaskingPolicy: z.object({
    predefinedExpression: z.enum([
      "PREDEFINED_EXPRESSION_UNSPECIFIED",
      "SHA256",
      "ALWAYS_NULL",
      "DEFAULT_MASKING_VALUE",
      "LAST_FOUR_CHARACTERS",
      "FIRST_FOUR_CHARACTERS",
      "EMAIL_MASK",
      "DATE_YEAR_MASK",
      "RANDOM_HASH",
    ]).describe("Optional. A predefined masking expression.").optional(),
    routine: z.string().describe(
      "Optional. The name of the BigQuery routine that contains the custom masking routine, in the format of `projects/{project_number}/datasets/{dataset_id}/routines/{routine_id}`.",
    ).optional(),
  }).describe("The policy used to specify data masking rule.").optional(),
  dataPolicyType: z.enum([
    "DATA_POLICY_TYPE_UNSPECIFIED",
    "DATA_MASKING_POLICY",
    "RAW_DATA_ACCESS_POLICY",
    "COLUMN_LEVEL_SECURITY_POLICY",
  ]).describe("Required. Type of data policy.").optional(),
  etag: z.string().describe(
    "The etag for this Data Policy. This field is used for UpdateDataPolicy calls. If Data Policy exists, this field is required and must match the server's etag. It will also be populated in the response of GetDataPolicy, CreateDataPolicy, and UpdateDataPolicy calls.",
  ).optional(),
  grantees: z.array(z.string()).describe(
    "Optional. The list of IAM principals that have Fine Grained Access to the underlying data goverened by this data policy. Uses the [IAM V2 principal syntax](https://cloud.google.com/iam/docs/principal-identifiers#v2) Only supports principal types users, groups, serviceaccounts, cloudidentity. This field is supported in V2 Data Policy only. In case of V1 data policies (i.e. verion = 1 and policy_tag is set), this field is not populated.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`.",
  ).optional(),
  policyTag: z.string().describe(
    "Output only. Policy tag resource name, in the format of `projects/{project_number}/locations/{location_id}/taxonomies/{taxonomy_id}/policyTags/{policyTag_id}`. policy_tag is supported only for V1 data policies.",
  ).optional(),
  version: z.enum(["VERSION_UNSPECIFIED", "V1", "V2"]).describe(
    "Output only. The version of the Data Policy resource.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  dataGovernanceTag: z.object({
    key: z.string(),
    value: z.string(),
  }).optional(),
  dataMaskingPolicy: z.object({
    predefinedExpression: z.string(),
    routine: z.string(),
  }).optional(),
  dataPolicyId: z.string().optional(),
  dataPolicyType: z.string().optional(),
  etag: z.string().optional(),
  grantees: z.array(z.string()).optional(),
  name: z.string(),
  policyTag: z.string().optional(),
  version: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  dataPolicy: z.object({
    dataGovernanceTag: z.object({
      key: z.string().describe(
        "Optional. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example `parent-id/pii` where `parent-id` is the ID of the parent organization or project resource for this tag key.",
      ).optional(),
      value: z.string().describe(
        "Optional. Specifies the tag value as the short name, for example `sensitive`.",
      ).optional(),
    }).describe(
      "Data Governance tag This is a namespaced name specifying the key and the value. For example: `project-id/pii/sensitive`.",
    ).optional(),
    dataMaskingPolicy: z.object({
      predefinedExpression: z.enum([
        "PREDEFINED_EXPRESSION_UNSPECIFIED",
        "SHA256",
        "ALWAYS_NULL",
        "DEFAULT_MASKING_VALUE",
        "LAST_FOUR_CHARACTERS",
        "FIRST_FOUR_CHARACTERS",
        "EMAIL_MASK",
        "DATE_YEAR_MASK",
        "RANDOM_HASH",
      ]).describe("Optional. A predefined masking expression.").optional(),
      routine: z.string().describe(
        "Optional. The name of the BigQuery routine that contains the custom masking routine, in the format of `projects/{project_number}/datasets/{dataset_id}/routines/{routine_id}`.",
      ).optional(),
    }).describe("The policy used to specify data masking rule.").optional(),
    dataPolicyId: z.string().describe(
      "Output only. User-assigned (human readable) ID of the data policy that needs to be unique within a project. Used as {data_policy_id} in part of the resource name.",
    ).optional(),
    dataPolicyType: z.enum([
      "DATA_POLICY_TYPE_UNSPECIFIED",
      "DATA_MASKING_POLICY",
      "RAW_DATA_ACCESS_POLICY",
      "COLUMN_LEVEL_SECURITY_POLICY",
    ]).describe("Required. Type of data policy.").optional(),
    etag: z.string().describe(
      "The etag for this Data Policy. This field is used for UpdateDataPolicy calls. If Data Policy exists, this field is required and must match the server's etag. It will also be populated in the response of GetDataPolicy, CreateDataPolicy, and UpdateDataPolicy calls.",
    ).optional(),
    grantees: z.array(z.string()).describe(
      "Optional. The list of IAM principals that have Fine Grained Access to the underlying data goverened by this data policy. Uses the [IAM V2 principal syntax](https://cloud.google.com/iam/docs/principal-identifiers#v2) Only supports principal types users, groups, serviceaccounts, cloudidentity. This field is supported in V2 Data Policy only. In case of V1 data policies (i.e. verion = 1 and policy_tag is set), this field is not populated.",
    ).optional(),
    name: z.string().describe(
      "Identifier. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`.",
    ).optional(),
    policyTag: z.string().describe(
      "Output only. Policy tag resource name, in the format of `projects/{project_number}/locations/{location_id}/taxonomies/{taxonomy_id}/policyTags/{policyTag_id}`. policy_tag is supported only for V1 data policies.",
    ).optional(),
    version: z.enum(["VERSION_UNSPECIFIED", "V1", "V2"]).describe(
      "Output only. The version of the Data Policy resource.",
    ).optional(),
  }).describe("Represents the label-policy binding.").optional(),
  dataPolicyId: z.string().describe(
    "Output only. User-assigned (human readable) ID of the data policy that needs to be unique within a project. Used as {data_policy_id} in part of the resource name.",
  ).optional(),
  dataGovernanceTag: z.object({
    key: z.string().describe(
      "Optional. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example `parent-id/pii` where `parent-id` is the ID of the parent organization or project resource for this tag key.",
    ).optional(),
    value: z.string().describe(
      "Optional. Specifies the tag value as the short name, for example `sensitive`.",
    ).optional(),
  }).describe(
    "Data Governance tag This is a namespaced name specifying the key and the value. For example: `project-id/pii/sensitive`.",
  ).optional(),
  dataMaskingPolicy: z.object({
    predefinedExpression: z.enum([
      "PREDEFINED_EXPRESSION_UNSPECIFIED",
      "SHA256",
      "ALWAYS_NULL",
      "DEFAULT_MASKING_VALUE",
      "LAST_FOUR_CHARACTERS",
      "FIRST_FOUR_CHARACTERS",
      "EMAIL_MASK",
      "DATE_YEAR_MASK",
      "RANDOM_HASH",
    ]).describe("Optional. A predefined masking expression.").optional(),
    routine: z.string().describe(
      "Optional. The name of the BigQuery routine that contains the custom masking routine, in the format of `projects/{project_number}/datasets/{dataset_id}/routines/{routine_id}`.",
    ).optional(),
  }).describe("The policy used to specify data masking rule.").optional(),
  dataPolicyType: z.enum([
    "DATA_POLICY_TYPE_UNSPECIFIED",
    "DATA_MASKING_POLICY",
    "RAW_DATA_ACCESS_POLICY",
    "COLUMN_LEVEL_SECURITY_POLICY",
  ]).describe("Required. Type of data policy.").optional(),
  etag: z.string().describe(
    "The etag for this Data Policy. This field is used for UpdateDataPolicy calls. If Data Policy exists, this field is required and must match the server's etag. It will also be populated in the response of GetDataPolicy, CreateDataPolicy, and UpdateDataPolicy calls.",
  ).optional(),
  grantees: z.array(z.string()).describe(
    "Optional. The list of IAM principals that have Fine Grained Access to the underlying data goverened by this data policy. Uses the [IAM V2 principal syntax](https://cloud.google.com/iam/docs/principal-identifiers#v2) Only supports principal types users, groups, serviceaccounts, cloudidentity. This field is supported in V2 Data Policy only. In case of V1 data policies (i.e. verion = 1 and policy_tag is set), this field is not populated.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`.",
  ).optional(),
  policyTag: z.string().describe(
    "Output only. Policy tag resource name, in the format of `projects/{project_number}/locations/{location_id}/taxonomies/{taxonomy_id}/policyTags/{policyTag_id}`. policy_tag is supported only for V1 data policies.",
  ).optional(),
  version: z.enum(["VERSION_UNSPECIFIED", "V1", "V2"]).describe(
    "Output only. The version of the Data Policy resource.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud BigQuery Data Policy DataPolicies. Registered at `@swamp/gcp/bigquerydatapolicy/datapolicies`. */
export const model = {
  type: "@swamp/gcp/bigquerydatapolicy/datapolicies",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "Added: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "Removed: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dataGovernanceTag: _dataGovernanceTag, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.01.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
      description: "Added: dataGovernanceTag",
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
      description: "Removed: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dataGovernanceTag: _dataGovernanceTag, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.09.1",
      description: "Added: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.13.1",
      description: "Removed: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dataGovernanceTag: _dataGovernanceTag, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.15.1",
      description: "Added: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.16.1",
      description: "Removed: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dataGovernanceTag: _dataGovernanceTag, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.19.1",
      description: "Added: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.22.1",
      description: "Removed: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dataGovernanceTag: _dataGovernanceTag, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.23.1",
      description: "Added: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "Removed: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dataGovernanceTag: _dataGovernanceTag, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.24.1",
      description: "Added: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.02.1",
      description: "Removed: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dataGovernanceTag: _dataGovernanceTag, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.04.1",
      description: "Added: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dataGovernanceTag: _dataGovernanceTag, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: dataGovernanceTag",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dataGovernanceTag: _dataGovernanceTag, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: dataGovernanceTag",
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
      description: "Represents the label-policy binding.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dataPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["dataPolicy"] !== undefined) body["dataPolicy"] = g["dataPolicy"];
        if (g["dataPolicyId"] !== undefined) {
          body["dataPolicyId"] = g["dataPolicyId"];
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
      description: "Get a dataPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataPolicies"),
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
      description: "Update dataPolicies attributes",
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
        if (g["dataPolicyId"] !== undefined) {
          body["dataPolicyId"] = g["dataPolicyId"];
        }
        if (g["dataGovernanceTag"] !== undefined) {
          body["dataGovernanceTag"] = g["dataGovernanceTag"];
        }
        if (g["dataMaskingPolicy"] !== undefined) {
          body["dataMaskingPolicy"] = g["dataMaskingPolicy"];
        }
        if (g["dataPolicyType"] !== undefined) {
          body["dataPolicyType"] = g["dataPolicyType"];
        }
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["grantees"] !== undefined) body["grantees"] = g["grantees"];
        if (g["policyTag"] !== undefined) body["policyTag"] = g["policyTag"];
        if (g["version"] !== undefined) body["version"] = g["version"];
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
      description: "Delete the dataPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataPolicies"),
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
      description: "Sync dataPolicies state from GCP",
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
    add_grantees: {
      description: "add grantees",
      arguments: z.object({
        grantees: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["dataPolicy"] !== undefined) {
          params["dataPolicy"] = String(g["dataPolicy"]);
        }
        const body: Record<string, unknown> = {};
        if (args["grantees"] !== undefined) body["grantees"] = args["grantees"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "bigquerydatapolicy.projects.locations.dataPolicies.addGrantees",
            "path": "v2/{+dataPolicy}:addGrantees",
            "httpMethod": "POST",
            "parameterOrder": ["dataPolicy"],
            "parameters": {
              "dataPolicy": { "location": "path", "required": true },
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
            "id":
              "bigquerydatapolicy.projects.locations.dataPolicies.getIamPolicy",
            "path": "v2/{+resource}:getIamPolicy",
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
            "id":
              "bigquerydatapolicy.projects.locations.dataPolicies.setIamPolicy",
            "path": "v2/{+resource}:setIamPolicy",
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
              "bigquerydatapolicy.projects.locations.dataPolicies.testIamPermissions",
            "path": "v2/{+resource}:testIamPermissions",
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
