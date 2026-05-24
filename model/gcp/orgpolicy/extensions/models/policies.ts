// Auto-generated extension model for @swamp/gcp/orgpolicy/policies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Organization Policy Policies.
 *
 * Defines an organization policy that is used to specify constraints for configurations of Google Cloud resources.
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
  return `${parent}/policies/${shortName}`;
}

const BASE_URL = "https://orgpolicy.googleapis.com/";

const GET_CONFIG = {
  "id": "orgpolicy.folders.policies.get",
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
  "id": "orgpolicy.folders.policies.create",
  "path": "v2/{+parent}/policies",
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
  "id": "orgpolicy.folders.policies.patch",
  "path": "v2/{+name}",
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
  "id": "orgpolicy.folders.policies.delete",
  "path": "v2/{+name}",
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
  "id": "orgpolicy.folders.policies.list",
  "path": "v2/{+parent}/policies",
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
  alternate: z.object({
    launch: z.string().describe(
      "Reference to the launch that will be used while audit logging and to control the launch. Set only in the alternate policy.",
    ).optional(),
    spec: z.object({
      etag: z.string().describe(
        "An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset.",
      ).optional(),
      inheritFromParent: z.boolean().describe(
        "Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints.",
      ).optional(),
      reset: z.boolean().describe(
        "Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false.",
      ).optional(),
      rules: z.array(z.object({
        allowAll: z.boolean().describe(
          "Setting this to true means that all values are allowed. This field can be set only in policies for list constraints.",
        ).optional(),
        condition: z.object({
          description: z.unknown().describe(
            "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
          ).optional(),
          expression: z.unknown().describe(
            "Textual representation of an expression in Common Expression Language syntax.",
          ).optional(),
          location: z.unknown().describe(
            "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
          ).optional(),
          title: z.unknown().describe(
            "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
          ).optional(),
        }).describe(
          'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
        ).optional(),
        denyAll: z.boolean().describe(
          "Setting this to true means that all values are denied. This field can be set only in policies for list constraints.",
        ).optional(),
        enforce: z.boolean().describe(
          "If `true`, then the policy is enforced. If `false`, then any configuration is acceptable. This field can be set in policies for boolean constraints, custom constraints and managed constraints.",
        ).optional(),
        parameters: z.record(z.string(), z.unknown()).describe(
          'Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } `',
        ).optional(),
        values: z.object({
          allowedValues: z.unknown().describe(
            "List of values allowed at this resource.",
          ).optional(),
          deniedValues: z.unknown().describe(
            "List of values denied at this resource.",
          ).optional(),
        }).describe(
          'A message that holds specific allowed and denied values. This message can define specific values and subtrees of the Resource Manager resource hierarchy (`Organizations`, `Folders`, `Projects`) that are allowed or denied. This is achieved by using the `under:` and optional `is:` prefixes. The `under:` prefix is used to denote resource subtree values. The `is:` prefix is used to denote specific values, and is required only if the value contains a ":". Values prefixed with "is:" are treated the same as values with no prefix. Ancestry subtrees must be in one of the following formats: - `projects/` (for example, `projects/tokyo-rain-123`) - `folders/` (for example, `folders/1234`) - `organizations/` (for example, `organizations/1234`) The `supports_under` field of the associated `Constraint` defines whether ancestry prefixes can be used.',
        ).optional(),
      })).describe(
        "In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy.",
      ).optional(),
    }).describe(
      "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
    ).optional(),
  }).describe(
    "Similar to PolicySpec but with an extra 'launch' field for launch reference. The PolicySpec here is specific for dry-run.",
  ).optional(),
  dryRunSpec: z.object({
    etag: z.string().describe(
      "An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset.",
    ).optional(),
    inheritFromParent: z.boolean().describe(
      "Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints.",
    ).optional(),
    reset: z.boolean().describe(
      "Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false.",
    ).optional(),
    rules: z.array(z.object({
      allowAll: z.boolean().describe(
        "Setting this to true means that all values are allowed. This field can be set only in policies for list constraints.",
      ).optional(),
      condition: z.object({
        description: z.string().describe(
          "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
        ).optional(),
        expression: z.string().describe(
          "Textual representation of an expression in Common Expression Language syntax.",
        ).optional(),
        location: z.string().describe(
          "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
        ).optional(),
        title: z.string().describe(
          "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
        ).optional(),
      }).describe(
        'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
      ).optional(),
      denyAll: z.boolean().describe(
        "Setting this to true means that all values are denied. This field can be set only in policies for list constraints.",
      ).optional(),
      enforce: z.boolean().describe(
        "If `true`, then the policy is enforced. If `false`, then any configuration is acceptable. This field can be set in policies for boolean constraints, custom constraints and managed constraints.",
      ).optional(),
      parameters: z.record(z.string(), z.string()).describe(
        'Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } `',
      ).optional(),
      values: z.object({
        allowedValues: z.array(z.unknown()).describe(
          "List of values allowed at this resource.",
        ).optional(),
        deniedValues: z.array(z.unknown()).describe(
          "List of values denied at this resource.",
        ).optional(),
      }).describe(
        'A message that holds specific allowed and denied values. This message can define specific values and subtrees of the Resource Manager resource hierarchy (`Organizations`, `Folders`, `Projects`) that are allowed or denied. This is achieved by using the `under:` and optional `is:` prefixes. The `under:` prefix is used to denote resource subtree values. The `is:` prefix is used to denote specific values, and is required only if the value contains a ":". Values prefixed with "is:" are treated the same as values with no prefix. Ancestry subtrees must be in one of the following formats: - `projects/` (for example, `projects/tokyo-rain-123`) - `folders/` (for example, `folders/1234`) - `organizations/` (for example, `organizations/1234`) The `supports_under` field of the associated `Constraint` defines whether ancestry prefixes can be used.',
      ).optional(),
    })).describe(
      "In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy.",
    ).optional(),
  }).describe(
    "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint that this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number.",
  ).optional(),
  spec: z.object({
    etag: z.string().describe(
      "An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset.",
    ).optional(),
    inheritFromParent: z.boolean().describe(
      "Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints.",
    ).optional(),
    reset: z.boolean().describe(
      "Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false.",
    ).optional(),
    rules: z.array(z.object({
      allowAll: z.boolean().describe(
        "Setting this to true means that all values are allowed. This field can be set only in policies for list constraints.",
      ).optional(),
      condition: z.object({
        description: z.string().describe(
          "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
        ).optional(),
        expression: z.string().describe(
          "Textual representation of an expression in Common Expression Language syntax.",
        ).optional(),
        location: z.string().describe(
          "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
        ).optional(),
        title: z.string().describe(
          "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
        ).optional(),
      }).describe(
        'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
      ).optional(),
      denyAll: z.boolean().describe(
        "Setting this to true means that all values are denied. This field can be set only in policies for list constraints.",
      ).optional(),
      enforce: z.boolean().describe(
        "If `true`, then the policy is enforced. If `false`, then any configuration is acceptable. This field can be set in policies for boolean constraints, custom constraints and managed constraints.",
      ).optional(),
      parameters: z.record(z.string(), z.string()).describe(
        'Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } `',
      ).optional(),
      values: z.object({
        allowedValues: z.array(z.unknown()).describe(
          "List of values allowed at this resource.",
        ).optional(),
        deniedValues: z.array(z.unknown()).describe(
          "List of values denied at this resource.",
        ).optional(),
      }).describe(
        'A message that holds specific allowed and denied values. This message can define specific values and subtrees of the Resource Manager resource hierarchy (`Organizations`, `Folders`, `Projects`) that are allowed or denied. This is achieved by using the `under:` and optional `is:` prefixes. The `under:` prefix is used to denote resource subtree values. The `is:` prefix is used to denote specific values, and is required only if the value contains a ":". Values prefixed with "is:" are treated the same as values with no prefix. Ancestry subtrees must be in one of the following formats: - `projects/` (for example, `projects/tokyo-rain-123`) - `folders/` (for example, `folders/1234`) - `organizations/` (for example, `organizations/1234`) The `supports_under` field of the associated `Constraint` defines whether ancestry prefixes can be used.',
      ).optional(),
    })).describe(
      "In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy.",
    ).optional(),
  }).describe(
    "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  alternate: z.object({
    launch: z.string(),
    spec: z.object({
      etag: z.string(),
      inheritFromParent: z.boolean(),
      reset: z.boolean(),
      rules: z.array(z.object({
        allowAll: z.boolean(),
        condition: z.object({
          description: z.unknown(),
          expression: z.unknown(),
          location: z.unknown(),
          title: z.unknown(),
        }),
        denyAll: z.boolean(),
        enforce: z.boolean(),
        parameters: z.record(z.string(), z.unknown()),
        values: z.object({
          allowedValues: z.unknown(),
          deniedValues: z.unknown(),
        }),
      })),
      updateTime: z.string(),
    }),
  }).optional(),
  dryRunSpec: z.object({
    etag: z.string(),
    inheritFromParent: z.boolean(),
    reset: z.boolean(),
    rules: z.array(z.object({
      allowAll: z.boolean(),
      condition: z.object({
        description: z.string(),
        expression: z.string(),
        location: z.string(),
        title: z.string(),
      }),
      denyAll: z.boolean(),
      enforce: z.boolean(),
      parameters: z.record(z.string(), z.unknown()),
      values: z.object({
        allowedValues: z.array(z.unknown()),
        deniedValues: z.array(z.unknown()),
      }),
    })),
    updateTime: z.string(),
  }).optional(),
  etag: z.string().optional(),
  name: z.string(),
  spec: z.object({
    etag: z.string(),
    inheritFromParent: z.boolean(),
    reset: z.boolean(),
    rules: z.array(z.object({
      allowAll: z.boolean(),
      condition: z.object({
        description: z.string(),
        expression: z.string(),
        location: z.string(),
        title: z.string(),
      }),
      denyAll: z.boolean(),
      enforce: z.boolean(),
      parameters: z.record(z.string(), z.unknown()),
      values: z.object({
        allowedValues: z.array(z.unknown()),
        deniedValues: z.array(z.unknown()),
      }),
    })),
    updateTime: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  alternate: z.object({
    launch: z.string().describe(
      "Reference to the launch that will be used while audit logging and to control the launch. Set only in the alternate policy.",
    ).optional(),
    spec: z.object({
      etag: z.string().describe(
        "An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset.",
      ).optional(),
      inheritFromParent: z.boolean().describe(
        "Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints.",
      ).optional(),
      reset: z.boolean().describe(
        "Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false.",
      ).optional(),
      rules: z.array(z.object({
        allowAll: z.boolean().describe(
          "Setting this to true means that all values are allowed. This field can be set only in policies for list constraints.",
        ).optional(),
        condition: z.object({
          description: z.unknown().describe(
            "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
          ).optional(),
          expression: z.unknown().describe(
            "Textual representation of an expression in Common Expression Language syntax.",
          ).optional(),
          location: z.unknown().describe(
            "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
          ).optional(),
          title: z.unknown().describe(
            "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
          ).optional(),
        }).describe(
          'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
        ).optional(),
        denyAll: z.boolean().describe(
          "Setting this to true means that all values are denied. This field can be set only in policies for list constraints.",
        ).optional(),
        enforce: z.boolean().describe(
          "If `true`, then the policy is enforced. If `false`, then any configuration is acceptable. This field can be set in policies for boolean constraints, custom constraints and managed constraints.",
        ).optional(),
        parameters: z.record(z.string(), z.unknown()).describe(
          'Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } `',
        ).optional(),
        values: z.object({
          allowedValues: z.unknown().describe(
            "List of values allowed at this resource.",
          ).optional(),
          deniedValues: z.unknown().describe(
            "List of values denied at this resource.",
          ).optional(),
        }).describe(
          'A message that holds specific allowed and denied values. This message can define specific values and subtrees of the Resource Manager resource hierarchy (`Organizations`, `Folders`, `Projects`) that are allowed or denied. This is achieved by using the `under:` and optional `is:` prefixes. The `under:` prefix is used to denote resource subtree values. The `is:` prefix is used to denote specific values, and is required only if the value contains a ":". Values prefixed with "is:" are treated the same as values with no prefix. Ancestry subtrees must be in one of the following formats: - `projects/` (for example, `projects/tokyo-rain-123`) - `folders/` (for example, `folders/1234`) - `organizations/` (for example, `organizations/1234`) The `supports_under` field of the associated `Constraint` defines whether ancestry prefixes can be used.',
        ).optional(),
      })).describe(
        "In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy.",
      ).optional(),
    }).describe(
      "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
    ).optional(),
  }).describe(
    "Similar to PolicySpec but with an extra 'launch' field for launch reference. The PolicySpec here is specific for dry-run.",
  ).optional(),
  dryRunSpec: z.object({
    etag: z.string().describe(
      "An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset.",
    ).optional(),
    inheritFromParent: z.boolean().describe(
      "Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints.",
    ).optional(),
    reset: z.boolean().describe(
      "Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false.",
    ).optional(),
    rules: z.array(z.object({
      allowAll: z.boolean().describe(
        "Setting this to true means that all values are allowed. This field can be set only in policies for list constraints.",
      ).optional(),
      condition: z.object({
        description: z.string().describe(
          "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
        ).optional(),
        expression: z.string().describe(
          "Textual representation of an expression in Common Expression Language syntax.",
        ).optional(),
        location: z.string().describe(
          "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
        ).optional(),
        title: z.string().describe(
          "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
        ).optional(),
      }).describe(
        'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
      ).optional(),
      denyAll: z.boolean().describe(
        "Setting this to true means that all values are denied. This field can be set only in policies for list constraints.",
      ).optional(),
      enforce: z.boolean().describe(
        "If `true`, then the policy is enforced. If `false`, then any configuration is acceptable. This field can be set in policies for boolean constraints, custom constraints and managed constraints.",
      ).optional(),
      parameters: z.record(z.string(), z.string()).describe(
        'Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } `',
      ).optional(),
      values: z.object({
        allowedValues: z.array(z.unknown()).describe(
          "List of values allowed at this resource.",
        ).optional(),
        deniedValues: z.array(z.unknown()).describe(
          "List of values denied at this resource.",
        ).optional(),
      }).describe(
        'A message that holds specific allowed and denied values. This message can define specific values and subtrees of the Resource Manager resource hierarchy (`Organizations`, `Folders`, `Projects`) that are allowed or denied. This is achieved by using the `under:` and optional `is:` prefixes. The `under:` prefix is used to denote resource subtree values. The `is:` prefix is used to denote specific values, and is required only if the value contains a ":". Values prefixed with "is:" are treated the same as values with no prefix. Ancestry subtrees must be in one of the following formats: - `projects/` (for example, `projects/tokyo-rain-123`) - `folders/` (for example, `folders/1234`) - `organizations/` (for example, `organizations/1234`) The `supports_under` field of the associated `Constraint` defines whether ancestry prefixes can be used.',
      ).optional(),
    })).describe(
      "In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy.",
    ).optional(),
  }).describe(
    "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint that this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number.",
  ).optional(),
  spec: z.object({
    etag: z.string().describe(
      "An opaque tag indicating the current version of the policySpec, used for concurrency control. This field is ignored if used in a `CreatePolicy` request. When the policy is returned from either a `GetPolicy` or a `ListPolicies` request, this entity tag (ETag) indicates the version of the current policySpec to use when executing a read-modify-write loop. When the policy is returned from a `GetEffectivePolicy` request, the ETag will be unset.",
    ).optional(),
    inheritFromParent: z.boolean().describe(
      "Determines the inheritance behavior for this policy. If `inherit_from_parent` is true, policy rules set higher up in the hierarchy (up to the closest root) are inherited and present in the effective policy. If it is false, then no rules are inherited, and this policy becomes the new root for evaluation. This field can be set only for policies that configure list constraints.",
    ).optional(),
    reset: z.boolean().describe(
      "Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific constraint at this resource. This field can be set in policies for either list or boolean constraints. If set, `rules` must be empty and `inherit_from_parent` must be set to false.",
    ).optional(),
    rules: z.array(z.object({
      allowAll: z.boolean().describe(
        "Setting this to true means that all values are allowed. This field can be set only in policies for list constraints.",
      ).optional(),
      condition: z.object({
        description: z.string().describe(
          "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
        ).optional(),
        expression: z.string().describe(
          "Textual representation of an expression in Common Expression Language syntax.",
        ).optional(),
        location: z.string().describe(
          "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
        ).optional(),
        title: z.string().describe(
          "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
        ).optional(),
      }).describe(
        'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
      ).optional(),
      denyAll: z.boolean().describe(
        "Setting this to true means that all values are denied. This field can be set only in policies for list constraints.",
      ).optional(),
      enforce: z.boolean().describe(
        "If `true`, then the policy is enforced. If `false`, then any configuration is acceptable. This field can be set in policies for boolean constraints, custom constraints and managed constraints.",
      ).optional(),
      parameters: z.record(z.string(), z.string()).describe(
        'Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } `',
      ).optional(),
      values: z.object({
        allowedValues: z.array(z.unknown()).describe(
          "List of values allowed at this resource.",
        ).optional(),
        deniedValues: z.array(z.unknown()).describe(
          "List of values denied at this resource.",
        ).optional(),
      }).describe(
        'A message that holds specific allowed and denied values. This message can define specific values and subtrees of the Resource Manager resource hierarchy (`Organizations`, `Folders`, `Projects`) that are allowed or denied. This is achieved by using the `under:` and optional `is:` prefixes. The `under:` prefix is used to denote resource subtree values. The `is:` prefix is used to denote specific values, and is required only if the value contains a ":". Values prefixed with "is:" are treated the same as values with no prefix. Ancestry subtrees must be in one of the following formats: - `projects/` (for example, `projects/tokyo-rain-123`) - `folders/` (for example, `folders/1234`) - `organizations/` (for example, `organizations/1234`) The `supports_under` field of the associated `Constraint` defines whether ancestry prefixes can be used.',
      ).optional(),
    })).describe(
      "In policies for boolean constraints, the following requirements apply: - There must be exactly one policy rule where a condition is unset. - Boolean policy rules with conditions must set `enforced` to the opposite of the policy rule without a condition. - During policy evaluation, policy rules with conditions that are true for a target resource take precedence.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time stamp this was previously updated. This represents the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that policy.",
    ).optional(),
  }).describe(
    "Defines a Google Cloud policy specification that is used to specify constraints for configurations of Google Cloud resources.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Organization Policy Policies. Registered at `@swamp/gcp/orgpolicy/policies`. */
export const model = {
  type: "@swamp/gcp/orgpolicy/policies",
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
      toVersion: "2026.05.09.1",
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
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
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
        "Defines an organization policy that is used to specify constraints for config...",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["alternate"] !== undefined) body["alternate"] = g["alternate"];
        if (g["dryRunSpec"] !== undefined) body["dryRunSpec"] = g["dryRunSpec"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a policies",
      arguments: z.object({
        identifier: z.string().describe("The name of the policies"),
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
      description: "Update policies attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["alternate"] !== undefined) body["alternate"] = g["alternate"];
        if (g["dryRunSpec"] !== undefined) body["dryRunSpec"] = g["dryRunSpec"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
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
      description: "Delete the policies",
      arguments: z.object({
        identifier: z.string().describe("The name of the policies"),
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
    get_effective_policy: {
      description: "get effective policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "orgpolicy.folders.policies.getEffectivePolicy",
            "path": "v2/{+name}:getEffectivePolicy",
            "httpMethod": "GET",
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
