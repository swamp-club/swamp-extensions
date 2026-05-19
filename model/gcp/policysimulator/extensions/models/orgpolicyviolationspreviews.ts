// Auto-generated extension model for @swamp/gcp/policysimulator/orgpolicyviolationspreviews
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Policy Simulator OrgPolicyViolationsPreviews.
 *
 * OrgPolicyViolationsPreview is a resource providing a preview of the violations that will exist if an OrgPolicy change is made. The list of violations are modeled as child resources and retrieved via a ListOrgPolicyViolations API call. There are potentially more OrgPolicyViolations than could fit in an embedded field. Thus, the use of a child resource instead of a field.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/orgPolicyViolationsPreviews/${shortName}`;
}

const BASE_URL = "https://policysimulator.googleapis.com/";

const GET_CONFIG = {
  "id":
    "policysimulator.organizations.locations.orgPolicyViolationsPreviews.get",
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
  "id":
    "policysimulator.organizations.locations.orgPolicyViolationsPreviews.create",
  "path": "v1/{+parent}/orgPolicyViolationsPreviews",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "orgPolicyViolationsPreviewId": {
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
  overlay: z.object({
    customConstraints: z.array(z.object({
      customConstraint: z.object({
        actionType: z.enum(["ACTION_TYPE_UNSPECIFIED", "ALLOW", "DENY"])
          .describe("Allow or deny type.").optional(),
        condition: z.string().describe(
          'A Common Expression Language (CEL) condition which is used in the evaluation of the constraint. For example: `resource.instanceName.matches("(production|test)_(.+_)?[\\d]+")` or, `resource.management.auto_upgrade == true` The max length of the condition is 1000 characters.',
        ).optional(),
        description: z.string().describe(
          "Detailed information about this custom policy constraint. The max length of the description is 2000 characters.",
        ).optional(),
        displayName: z.string().describe(
          "One line display name for the UI. The max length of the display_name is 200 characters.",
        ).optional(),
        methodTypes: z.array(z.unknown()).describe(
          "All the operations being applied for this constraint.",
        ).optional(),
        name: z.string().describe(
          "Immutable. Name of the constraint. This is unique within the organization. The name must be of the form: * `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` The max length is 71 characters and the minimum length is 1. Note that the prefix `organizations/{organization_id}/customConstraints/custom.` is not counted.",
        ).optional(),
        resourceTypes: z.array(z.unknown()).describe(
          "Immutable. The resource instance type on which this policy applies. Format will be of the form: `/` Example: * `compute.googleapis.com/Instance`.",
        ).optional(),
        updateTime: z.string().describe(
          "Output only. The last time this custom constraint was updated. This represents the last time that the `CreateCustomConstraint` or `UpdateCustomConstraint` methods were called.",
        ).optional(),
      }).describe(
        "A custom constraint defined by customers which can *only* be applied to the given resource types and organization. By creating a custom constraint, customers can apply policies of this custom constraint. *Creating a custom constraint itself does NOT apply any policy enforcement*.",
      ).optional(),
      customConstraintParent: z.string().describe(
        'Optional. Resource the constraint is attached to. Example: "organization/987654"',
      ).optional(),
    })).describe(
      "Optional. The OrgPolicy CustomConstraint changes to preview violations for. Any existing CustomConstraints with the same name will be overridden in the simulation. That is, violations will be determined as if all custom constraints in the overlay were instantiated. Only a single custom_constraint is supported in the overlay at a time. For evaluating multiple constraints, multiple `GenerateOrgPolicyViolationsPreview` requests are made, where each request evaluates a single constraint.",
    ).optional(),
    policies: z.array(z.object({
      policy: z.object({
        alternate: z.object({
          launch: z.unknown().describe(
            "Reference to the launch that will be used while audit logging and to control the launch. Set only in the alternate policy.",
          ).optional(),
          spec: z.unknown().describe(
            "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
          ).optional(),
        }).describe(
          "Similar to PolicySpec but with an extra 'launch' field for launch reference. The PolicySpec here is specific for dry-run.",
        ).optional(),
        dryRunSpec: z.object({
          etag: z.unknown().describe(
            "An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset.",
          ).optional(),
          inheritFromParent: z.unknown().describe(
            "Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints.",
          ).optional(),
          reset: z.unknown().describe(
            "Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false.",
          ).optional(),
          rules: z.unknown().describe(
            "In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy.",
          ).optional(),
        }).describe(
          "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
        ).optional(),
        etag: z.string().describe(
          "Optional. An opaque tag indicating the current state of the policy, used for concurrency control. This entity tag (ETag) is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
        ).optional(),
        name: z.string().describe(
          "Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint that this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number.",
        ).optional(),
        spec: z.object({
          etag: z.unknown().describe(
            "An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset.",
          ).optional(),
          inheritFromParent: z.unknown().describe(
            "Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints.",
          ).optional(),
          reset: z.unknown().describe(
            "Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false.",
          ).optional(),
          rules: z.unknown().describe(
            "In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy.",
          ).optional(),
        }).describe(
          "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
        ).optional(),
      }).describe(
        "Defines an organization policy that is used to specify constraints for configurations of Google Cloud resources.",
      ).optional(),
      policyParent: z.string().describe(
        'Optional. The parent of the policy we are attaching to. Example: "projects/123456"',
      ).optional(),
    })).describe(
      "Optional. The OrgPolicy changes to preview violations for. Any existing OrgPolicies with the same name will be overridden in the simulation. That is, violations will be determined as if all policies in the overlay were created or updated.",
    ).optional(),
  }).describe("The proposed changes to OrgPolicy.").optional(),
  resourceCounts: z.object({
    compliant: z.number().int().describe(
      "Output only. Number of scanned resources with zero violations.",
    ).optional(),
    errors: z.number().int().describe(
      "Output only. Number of resources that returned an error when scanned.",
    ).optional(),
    noncompliant: z.number().int().describe(
      "Output only. Number of scanned resources with at least one violation.",
    ).optional(),
    scanned: z.number().int().describe(
      "Output only. Number of resources checked for compliance. Must equal: unenforced + noncompliant + compliant + error",
    ).optional(),
    unenforced: z.number().int().describe(
      "Output only. Number of resources where the constraint was not enforced, i.e. the Policy set `enforced: false` for that resource.",
    ).optional(),
  }).describe(
    "A summary of the state of all resources scanned for compliance with the changed OrgPolicy.",
  ).optional(),
  orgPolicyViolationsPreviewId: z.string().describe(
    "Optional. An optional user-specified ID for the OrgPolicyViolationsPreview. If not provided, a random ID will be generated.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  customConstraints: z.array(z.string()).optional(),
  name: z.string(),
  overlay: z.object({
    customConstraints: z.array(z.object({
      customConstraint: z.object({
        actionType: z.string(),
        condition: z.string(),
        description: z.string(),
        displayName: z.string(),
        methodTypes: z.array(z.unknown()),
        name: z.string(),
        resourceTypes: z.array(z.unknown()),
        updateTime: z.string(),
      }),
      customConstraintParent: z.string(),
    })),
    policies: z.array(z.object({
      policy: z.object({
        alternate: z.object({
          launch: z.unknown(),
          spec: z.unknown(),
        }),
        dryRunSpec: z.object({
          etag: z.unknown(),
          inheritFromParent: z.unknown(),
          reset: z.unknown(),
          rules: z.unknown(),
          updateTime: z.unknown(),
        }),
        etag: z.string(),
        name: z.string(),
        spec: z.object({
          etag: z.unknown(),
          inheritFromParent: z.unknown(),
          reset: z.unknown(),
          rules: z.unknown(),
          updateTime: z.unknown(),
        }),
      }),
      policyParent: z.string(),
    })),
  }).optional(),
  resourceCounts: z.object({
    compliant: z.number(),
    errors: z.number(),
    noncompliant: z.number(),
    scanned: z.number(),
    unenforced: z.number(),
  }).optional(),
  state: z.string().optional(),
  violationsCount: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  overlay: z.object({
    customConstraints: z.array(z.object({
      customConstraint: z.object({
        actionType: z.enum(["ACTION_TYPE_UNSPECIFIED", "ALLOW", "DENY"])
          .describe("Allow or deny type.").optional(),
        condition: z.string().describe(
          'A Common Expression Language (CEL) condition which is used in the evaluation of the constraint. For example: `resource.instanceName.matches("(production|test)_(.+_)?[\\d]+")` or, `resource.management.auto_upgrade == true` The max length of the condition is 1000 characters.',
        ).optional(),
        description: z.string().describe(
          "Detailed information about this custom policy constraint. The max length of the description is 2000 characters.",
        ).optional(),
        displayName: z.string().describe(
          "One line display name for the UI. The max length of the display_name is 200 characters.",
        ).optional(),
        methodTypes: z.array(z.unknown()).describe(
          "All the operations being applied for this constraint.",
        ).optional(),
        name: z.string().describe(
          "Immutable. Name of the constraint. This is unique within the organization. The name must be of the form: * `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` The max length is 71 characters and the minimum length is 1. Note that the prefix `organizations/{organization_id}/customConstraints/custom.` is not counted.",
        ).optional(),
        resourceTypes: z.array(z.unknown()).describe(
          "Immutable. The resource instance type on which this policy applies. Format will be of the form: `/` Example: * `compute.googleapis.com/Instance`.",
        ).optional(),
        updateTime: z.string().describe(
          "Output only. The last time this custom constraint was updated. This represents the last time that the `CreateCustomConstraint` or `UpdateCustomConstraint` methods were called.",
        ).optional(),
      }).describe(
        "A custom constraint defined by customers which can *only* be applied to the given resource types and organization. By creating a custom constraint, customers can apply policies of this custom constraint. *Creating a custom constraint itself does NOT apply any policy enforcement*.",
      ).optional(),
      customConstraintParent: z.string().describe(
        'Optional. Resource the constraint is attached to. Example: "organization/987654"',
      ).optional(),
    })).describe(
      "Optional. The OrgPolicy CustomConstraint changes to preview violations for. Any existing CustomConstraints with the same name will be overridden in the simulation. That is, violations will be determined as if all custom constraints in the overlay were instantiated. Only a single custom_constraint is supported in the overlay at a time. For evaluating multiple constraints, multiple `GenerateOrgPolicyViolationsPreview` requests are made, where each request evaluates a single constraint.",
    ).optional(),
    policies: z.array(z.object({
      policy: z.object({
        alternate: z.object({
          launch: z.unknown().describe(
            "Reference to the launch that will be used while audit logging and to control the launch. Set only in the alternate policy.",
          ).optional(),
          spec: z.unknown().describe(
            "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
          ).optional(),
        }).describe(
          "Similar to PolicySpec but with an extra 'launch' field for launch reference. The PolicySpec here is specific for dry-run.",
        ).optional(),
        dryRunSpec: z.object({
          etag: z.unknown().describe(
            "An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset.",
          ).optional(),
          inheritFromParent: z.unknown().describe(
            "Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints.",
          ).optional(),
          reset: z.unknown().describe(
            "Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false.",
          ).optional(),
          rules: z.unknown().describe(
            "In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy.",
          ).optional(),
        }).describe(
          "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
        ).optional(),
        etag: z.string().describe(
          "Optional. An opaque tag indicating the current state of the policy, used for concurrency control. This entity tag (ETag) is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
        ).optional(),
        name: z.string().describe(
          "Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint that this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number.",
        ).optional(),
        spec: z.object({
          etag: z.unknown().describe(
            "An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset.",
          ).optional(),
          inheritFromParent: z.unknown().describe(
            "Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints.",
          ).optional(),
          reset: z.unknown().describe(
            "Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false.",
          ).optional(),
          rules: z.unknown().describe(
            "In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence.",
          ).optional(),
          updateTime: z.unknown().describe(
            "Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy.",
          ).optional(),
        }).describe(
          "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
        ).optional(),
      }).describe(
        "Defines an organization policy that is used to specify constraints for configurations of Google Cloud resources.",
      ).optional(),
      policyParent: z.string().describe(
        'Optional. The parent of the policy we are attaching to. Example: "projects/123456"',
      ).optional(),
    })).describe(
      "Optional. The OrgPolicy changes to preview violations for. Any existing OrgPolicies with the same name will be overridden in the simulation. That is, violations will be determined as if all policies in the overlay were created or updated.",
    ).optional(),
  }).describe("The proposed changes to OrgPolicy.").optional(),
  resourceCounts: z.object({
    compliant: z.number().int().describe(
      "Output only. Number of scanned resources with zero violations.",
    ).optional(),
    errors: z.number().int().describe(
      "Output only. Number of resources that returned an error when scanned.",
    ).optional(),
    noncompliant: z.number().int().describe(
      "Output only. Number of scanned resources with at least one violation.",
    ).optional(),
    scanned: z.number().int().describe(
      "Output only. Number of resources checked for compliance. Must equal: unenforced + noncompliant + compliant + error",
    ).optional(),
    unenforced: z.number().int().describe(
      "Output only. Number of resources where the constraint was not enforced, i.e. the Policy set `enforced: false` for that resource.",
    ).optional(),
  }).describe(
    "A summary of the state of all resources scanned for compliance with the changed OrgPolicy.",
  ).optional(),
  orgPolicyViolationsPreviewId: z.string().describe(
    "Optional. An optional user-specified ID for the OrgPolicyViolationsPreview. If not provided, a random ID will be generated.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Policy Simulator OrgPolicyViolationsPreviews. Registered at `@swamp/gcp/policysimulator/orgpolicyviolationspreviews`. */
export const model = {
  type: "@swamp/gcp/policysimulator/orgpolicyviolationspreviews",
  version: "2026.05.19.1",
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
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "OrgPolicyViolationsPreview is a resource providing a preview of the violation...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a orgPolicyViolationsPreviews",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["overlay"] !== undefined) body["overlay"] = g["overlay"];
        if (g["resourceCounts"] !== undefined) {
          body["resourceCounts"] = g["resourceCounts"];
        }
        if (g["orgPolicyViolationsPreviewId"] !== undefined) {
          body["orgPolicyViolationsPreviewId"] =
            g["orgPolicyViolationsPreviewId"];
        }
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
      description: "Get a orgPolicyViolationsPreviews",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the orgPolicyViolationsPreviews",
        ),
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
    sync: {
      description: "Sync orgPolicyViolationsPreviews state from GCP",
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
  },
};
