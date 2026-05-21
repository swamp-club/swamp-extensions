// Auto-generated extension model for @swamp/gcp/osconfig/global-policyorchestrators
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud OS Config Global.PolicyOrchestrators.
 *
 * A policy orchestrator manages project-level and zone-level policy resources, such as OS policy assignments. It provides methods to create, update, and delete these resources across projects and locations at scale. The policy orchestrator operates as a continuous loop. In each iteration, the orchestrator identifies the set of resources to be modified and progressively applies changes. If the set of resources changes over time (for example, if you add new projects), subsequent iterations address those changes. The orchestrator can either upsert or delete policy resources. For more details, see the `action` and `orchestrated_resource` fields. The policy orchestrator does not manage the lifecycle of the resources it creates. Each iteration is independent and, besides Cloud Logging, the orchestrator retains only a minimal history of past actions. Deleting the orchestrator does not affect previously created resources; these resources remain in their current state. Similarly, removing projects from the orchestrator's scope does not affect existing resources.
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
  return `${parent}/policyOrchestrators/${shortName}`;
}

const BASE_URL = "https://osconfig.googleapis.com/";

const GET_CONFIG = {
  "id": "osconfig.folders.locations.global.policyOrchestrators.get",
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
  "id": "osconfig.folders.locations.global.policyOrchestrators.create",
  "path": "v2/{+parent}/policyOrchestrators",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "policyOrchestratorId": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "osconfig.folders.locations.global.policyOrchestrators.patch",
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
  "id": "osconfig.folders.locations.global.policyOrchestrators.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "osconfig.folders.locations.global.policyOrchestrators.list",
  "path": "v2/{+parent}/policyOrchestrators",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
  action: z.string().describe(
    "Required. Action to be done by the orchestrator in `projects/{project_id}/zones/{zone_id}` locations defined by the `orchestration_scope`. Allowed values: - `UPSERT` - Orchestrator will create or update target resources. - `DELETE` - Orchestrator will delete target resources, if they exist",
  ).optional(),
  description: z.string().describe(
    "Optional. Freeform text describing the purpose of the resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. In the following format: * `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}`",
  ).optional(),
  orchestratedResource: z.object({
    id: z.string().describe(
      "Optional. ID of the resource to be used while generating set of affected resources. For UPSERT action the value is auto-generated during PolicyOrchestrator creation when not set. When the value is set it should following next restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project. For DELETE action, ID must be specified explicitly during PolicyOrchestrator creation.",
    ).optional(),
    osPolicyAssignmentV1Payload: z.object({
      baseline: z.boolean().describe(
        "Output only. Indicates that this revision has been successfully rolled out in this zone and new VMs will be assigned OS policies from this revision. For a given OS policy assignment, there is only one revision with a value of `true` for this field.",
      ).optional(),
      deleted: z.boolean().describe(
        "Output only. Indicates that this revision deletes the OS policy assignment.",
      ).optional(),
      description: z.string().describe(
        "OS policy assignment description. Length of the description is limited to 1024 characters.",
      ).optional(),
      etag: z.string().describe(
        "The etag for this OS policy assignment. If this is provided on update, it must match the server's etag.",
      ).optional(),
      instanceFilter: z.object({
        all: z.boolean().describe(
          "Target all VMs in the project. If true, no other criteria is permitted.",
        ).optional(),
        exclusionLabels: z.array(z.object({
          labels: z.unknown().describe(
            "Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected.",
          ).optional(),
        })).describe(
          "List of label sets used for VM exclusion. If the list has more than one label set, the VM is excluded if any of the label sets are applicable for the VM.",
        ).optional(),
        inclusionLabels: z.array(z.object({
          labels: z.unknown().describe(
            "Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected.",
          ).optional(),
        })).describe(
          "List of label sets used for VM inclusion. If the list has more than one `LabelSet`, the VM is included if any of the label sets are applicable for the VM.",
        ).optional(),
        inventories: z.array(z.object({
          osShortName: z.unknown().describe("Required. The OS short name")
            .optional(),
          osVersion: z.unknown().describe(
            "The OS version Prefix matches are supported if asterisk(*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` An empty string matches all OS versions.",
          ).optional(),
        })).describe(
          "List of inventories to select VMs. A VM is selected if its inventory data matches at least one of the following inventories.",
        ).optional(),
      }).describe(
        "Filters to select target VMs for an assignment. If more than one filter criteria is specified below, a VM will be selected if and only if it satisfies all of them.",
      ).optional(),
      name: z.string().describe(
        "Resource name. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}` This field is ignored when you create an OS policy assignment.",
      ).optional(),
      osPolicies: z.array(z.object({
        allowNoResourceGroupMatch: z.boolean().describe(
          "This flag determines the OS policy compliance status when none of the resource groups within the policy are applicable for a VM. Set this value to `true` if the policy needs to be reported as compliant even if the policy has nothing to validate or enforce.",
        ).optional(),
        description: z.string().describe(
          "Policy description. Length of the description is limited to 1024 characters.",
        ).optional(),
        id: z.string().describe(
          "Required. The id of the OS policy with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the assignment.",
        ).optional(),
        mode: z.enum(["MODE_UNSPECIFIED", "VALIDATION", "ENFORCEMENT"])
          .describe("Required. Policy mode").optional(),
        resourceGroups: z.array(z.unknown()).describe(
          "Required. List of resource groups for the policy. For a particular VM, resource groups are evaluated in the order specified and the first resource group that is applicable is selected and the rest are ignored. If none of the resource groups are applicable for a VM, the VM is considered to be non-compliant w.r.t this policy. This behavior can be toggled by the flag `allow_no_resource_group_match`",
        ).optional(),
      })).describe("Required. List of OS policies to be applied to the VMs.")
        .optional(),
      reconciling: z.boolean().describe(
        "Output only. Indicates that reconciliation is in progress for the revision. This value is `true` when the `rollout_state` is one of: * IN_PROGRESS * CANCELLING",
      ).optional(),
      revisionCreateTime: z.string().describe(
        "Output only. The timestamp that the revision was created.",
      ).optional(),
      revisionId: z.string().describe(
        "Output only. The assignment revision ID A new revision is committed whenever a rollout is triggered for a OS policy assignment",
      ).optional(),
      rollout: z.object({
        disruptionBudget: z.object({
          fixed: z.number().int().describe("Specifies a fixed value.")
            .optional(),
          percent: z.number().int().describe(
            "Specifies the relative value defined as a percentage, which will be multiplied by a reference value.",
          ).optional(),
        }).describe(
          'Message encapsulating a value that can be either absolute ("fixed") or relative ("percent") to a value.',
        ).optional(),
        minWaitDuration: z.string().describe(
          "Required. This determines the minimum duration of time to wait after the configuration changes are applied through the current rollout. A VM continues to count towards the `disruption_budget` at least until this duration of time has passed after configuration changes are applied.",
        ).optional(),
      }).describe(
        "Message to configure the rollout at the zonal level for the OS policy assignment.",
      ).optional(),
      rolloutState: z.enum([
        "ROLLOUT_STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "CANCELLING",
        "CANCELLED",
        "SUCCEEDED",
      ]).describe("Output only. OS policy assignment rollout state").optional(),
      uid: z.string().describe(
        "Output only. Server generated unique id for the OS policy assignment resource.",
      ).optional(),
    }).describe(
      "OS policy assignment is an API resource that is used to apply a set of OS policies to a dynamically targeted group of Compute Engine VM instances. An OS policy is used to define the desired state configuration for a Compute Engine VM instance through a set of configuration resources that provide capabilities such as installing or removing software packages, or executing a script. For more information about the OS policy resource definitions and examples, see [OS policy and OS policy assignment](https://cloud.google.com/compute/docs/os-configuration-management/working-with-os-policies).",
    ).optional(),
  }).describe(
    "Represents a resource that is being orchestrated by the policy orchestrator.",
  ).optional(),
  orchestrationScope: z.object({
    selectors: z.array(z.object({
      locationSelector: z.object({
        includedLocations: z.array(z.unknown()).describe(
          "Optional. Names of the locations in scope. Format: `us-central1-a`",
        ).optional(),
      }).describe("Selector containing locations in scope.").optional(),
      resourceHierarchySelector: z.object({
        includedFolders: z.array(z.unknown()).describe(
          "Optional. Names of the folders in scope. Format: `folders/{folder_id}`",
        ).optional(),
        includedProjects: z.array(z.unknown()).describe(
          "Optional. Names of the projects in scope. Format: `projects/{project_number}`",
        ).optional(),
      }).describe(
        "Selector containing Cloud Resource Manager resource hierarchy nodes.",
      ).optional(),
    })).describe(
      "Optional. Selectors of the orchestration scope. There is a logical AND between each selector defined. When there is no explicit `ResourceHierarchySelector` selector specified, the scope is by default bounded to the parent of the policy orchestrator resource.",
    ).optional(),
  }).describe(
    "Defines a set of selectors which drive which resources are in scope of policy orchestration.",
  ).optional(),
  orchestrationState: z.object({
    currentIterationState: z.object({
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      failedActions: z.string().describe(
        "Output only. Number of orchestration actions which failed so far. For more details, query the Cloud Logs.",
      ).optional(),
      finishTime: z.string().describe(
        "Output only. Finish time of the wave iteration.",
      ).optional(),
      iterationId: z.string().describe(
        "Output only. Unique identifier of the iteration.",
      ).optional(),
      performedActions: z.string().describe(
        "Output only. Overall number of actions done by the orchestrator so far.",
      ).optional(),
      progress: z.number().describe(
        "Output only. An estimated percentage of the progress. Number between 0 and 100.",
      ).optional(),
      startTime: z.string().describe(
        "Output only. Start time of the wave iteration.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PROCESSING",
        "COMPLETED",
        "FAILED",
        "CANCELLED",
        "UNKNOWN",
      ]).describe("Output only. State of the iteration.").optional(),
    }).describe(
      "Describes the state of a single iteration of the orchestrator.",
    ).optional(),
    previousIterationState: z.object({
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      failedActions: z.string().describe(
        "Output only. Number of orchestration actions which failed so far. For more details, query the Cloud Logs.",
      ).optional(),
      finishTime: z.string().describe(
        "Output only. Finish time of the wave iteration.",
      ).optional(),
      iterationId: z.string().describe(
        "Output only. Unique identifier of the iteration.",
      ).optional(),
      performedActions: z.string().describe(
        "Output only. Overall number of actions done by the orchestrator so far.",
      ).optional(),
      progress: z.number().describe(
        "Output only. An estimated percentage of the progress. Number between 0 and 100.",
      ).optional(),
      startTime: z.string().describe(
        "Output only. Start time of the wave iteration.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PROCESSING",
        "COMPLETED",
        "FAILED",
        "CANCELLED",
        "UNKNOWN",
      ]).describe("Output only. State of the iteration.").optional(),
    }).describe(
      "Describes the state of a single iteration of the orchestrator.",
    ).optional(),
  }).describe("Describes the state of the orchestration process.").optional(),
  state: z.string().describe(
    "Optional. State of the orchestrator. Can be updated to change orchestrator behaviour. Allowed values: - `ACTIVE` - orchestrator is actively looking for actions to be taken. - `STOPPED` - orchestrator won't make any changes. Note: There might be more states added in the future. We use string here instead of an enum, to avoid the need of propagating new states to all the client code.",
  ).optional(),
  policyOrchestratorId: z.string().describe(
    "Required. The logical identifier of the policy orchestrator, with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the parent.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  action: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  orchestratedResource: z.object({
    id: z.string(),
    osPolicyAssignmentV1Payload: z.object({
      baseline: z.boolean(),
      deleted: z.boolean(),
      description: z.string(),
      etag: z.string(),
      instanceFilter: z.object({
        all: z.boolean(),
        exclusionLabels: z.array(z.object({
          labels: z.unknown(),
        })),
        inclusionLabels: z.array(z.object({
          labels: z.unknown(),
        })),
        inventories: z.array(z.object({
          osShortName: z.unknown(),
          osVersion: z.unknown(),
        })),
      }),
      name: z.string(),
      osPolicies: z.array(z.object({
        allowNoResourceGroupMatch: z.boolean(),
        description: z.string(),
        id: z.string(),
        mode: z.string(),
        resourceGroups: z.array(z.unknown()),
      })),
      reconciling: z.boolean(),
      revisionCreateTime: z.string(),
      revisionId: z.string(),
      rollout: z.object({
        disruptionBudget: z.object({
          fixed: z.number(),
          percent: z.number(),
        }),
        minWaitDuration: z.string(),
      }),
      rolloutState: z.string(),
      uid: z.string(),
    }),
  }).optional(),
  orchestrationScope: z.object({
    selectors: z.array(z.object({
      locationSelector: z.object({
        includedLocations: z.array(z.unknown()),
      }),
      resourceHierarchySelector: z.object({
        includedFolders: z.array(z.unknown()),
        includedProjects: z.array(z.unknown()),
      }),
    })),
  }).optional(),
  orchestrationState: z.object({
    currentIterationState: z.object({
      error: z.object({
        code: z.number(),
        details: z.array(z.record(z.string(), z.unknown())),
        message: z.string(),
      }),
      failedActions: z.string(),
      finishTime: z.string(),
      iterationId: z.string(),
      performedActions: z.string(),
      progress: z.number(),
      startTime: z.string(),
      state: z.string(),
    }),
    previousIterationState: z.object({
      error: z.object({
        code: z.number(),
        details: z.array(z.record(z.string(), z.unknown())),
        message: z.string(),
      }),
      failedActions: z.string(),
      finishTime: z.string(),
      iterationId: z.string(),
      performedActions: z.string(),
      progress: z.number(),
      startTime: z.string(),
      state: z.string(),
    }),
  }).optional(),
  reconciling: z.boolean().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  action: z.string().describe(
    "Required. Action to be done by the orchestrator in `projects/{project_id}/zones/{zone_id}` locations defined by the `orchestration_scope`. Allowed values: - `UPSERT` - Orchestrator will create or update target resources. - `DELETE` - Orchestrator will delete target resources, if they exist",
  ).optional(),
  description: z.string().describe(
    "Optional. Freeform text describing the purpose of the resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. In the following format: * `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}`",
  ).optional(),
  orchestratedResource: z.object({
    id: z.string().describe(
      "Optional. ID of the resource to be used while generating set of affected resources. For UPSERT action the value is auto-generated during PolicyOrchestrator creation when not set. When the value is set it should following next restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project. For DELETE action, ID must be specified explicitly during PolicyOrchestrator creation.",
    ).optional(),
    osPolicyAssignmentV1Payload: z.object({
      baseline: z.boolean().describe(
        "Output only. Indicates that this revision has been successfully rolled out in this zone and new VMs will be assigned OS policies from this revision. For a given OS policy assignment, there is only one revision with a value of `true` for this field.",
      ).optional(),
      deleted: z.boolean().describe(
        "Output only. Indicates that this revision deletes the OS policy assignment.",
      ).optional(),
      description: z.string().describe(
        "OS policy assignment description. Length of the description is limited to 1024 characters.",
      ).optional(),
      etag: z.string().describe(
        "The etag for this OS policy assignment. If this is provided on update, it must match the server's etag.",
      ).optional(),
      instanceFilter: z.object({
        all: z.boolean().describe(
          "Target all VMs in the project. If true, no other criteria is permitted.",
        ).optional(),
        exclusionLabels: z.array(z.object({
          labels: z.unknown().describe(
            "Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected.",
          ).optional(),
        })).describe(
          "List of label sets used for VM exclusion. If the list has more than one label set, the VM is excluded if any of the label sets are applicable for the VM.",
        ).optional(),
        inclusionLabels: z.array(z.object({
          labels: z.unknown().describe(
            "Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected.",
          ).optional(),
        })).describe(
          "List of label sets used for VM inclusion. If the list has more than one `LabelSet`, the VM is included if any of the label sets are applicable for the VM.",
        ).optional(),
        inventories: z.array(z.object({
          osShortName: z.unknown().describe("Required. The OS short name")
            .optional(),
          osVersion: z.unknown().describe(
            "The OS version Prefix matches are supported if asterisk(*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` An empty string matches all OS versions.",
          ).optional(),
        })).describe(
          "List of inventories to select VMs. A VM is selected if its inventory data matches at least one of the following inventories.",
        ).optional(),
      }).describe(
        "Filters to select target VMs for an assignment. If more than one filter criteria is specified below, a VM will be selected if and only if it satisfies all of them.",
      ).optional(),
      name: z.string().describe(
        "Resource name. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}` This field is ignored when you create an OS policy assignment.",
      ).optional(),
      osPolicies: z.array(z.object({
        allowNoResourceGroupMatch: z.boolean().describe(
          "This flag determines the OS policy compliance status when none of the resource groups within the policy are applicable for a VM. Set this value to `true` if the policy needs to be reported as compliant even if the policy has nothing to validate or enforce.",
        ).optional(),
        description: z.string().describe(
          "Policy description. Length of the description is limited to 1024 characters.",
        ).optional(),
        id: z.string().describe(
          "Required. The id of the OS policy with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the assignment.",
        ).optional(),
        mode: z.enum(["MODE_UNSPECIFIED", "VALIDATION", "ENFORCEMENT"])
          .describe("Required. Policy mode").optional(),
        resourceGroups: z.array(z.unknown()).describe(
          "Required. List of resource groups for the policy. For a particular VM, resource groups are evaluated in the order specified and the first resource group that is applicable is selected and the rest are ignored. If none of the resource groups are applicable for a VM, the VM is considered to be non-compliant w.r.t this policy. This behavior can be toggled by the flag `allow_no_resource_group_match`",
        ).optional(),
      })).describe("Required. List of OS policies to be applied to the VMs.")
        .optional(),
      reconciling: z.boolean().describe(
        "Output only. Indicates that reconciliation is in progress for the revision. This value is `true` when the `rollout_state` is one of: * IN_PROGRESS * CANCELLING",
      ).optional(),
      revisionCreateTime: z.string().describe(
        "Output only. The timestamp that the revision was created.",
      ).optional(),
      revisionId: z.string().describe(
        "Output only. The assignment revision ID A new revision is committed whenever a rollout is triggered for a OS policy assignment",
      ).optional(),
      rollout: z.object({
        disruptionBudget: z.object({
          fixed: z.number().int().describe("Specifies a fixed value.")
            .optional(),
          percent: z.number().int().describe(
            "Specifies the relative value defined as a percentage, which will be multiplied by a reference value.",
          ).optional(),
        }).describe(
          'Message encapsulating a value that can be either absolute ("fixed") or relative ("percent") to a value.',
        ).optional(),
        minWaitDuration: z.string().describe(
          "Required. This determines the minimum duration of time to wait after the configuration changes are applied through the current rollout. A VM continues to count towards the `disruption_budget` at least until this duration of time has passed after configuration changes are applied.",
        ).optional(),
      }).describe(
        "Message to configure the rollout at the zonal level for the OS policy assignment.",
      ).optional(),
      rolloutState: z.enum([
        "ROLLOUT_STATE_UNSPECIFIED",
        "IN_PROGRESS",
        "CANCELLING",
        "CANCELLED",
        "SUCCEEDED",
      ]).describe("Output only. OS policy assignment rollout state").optional(),
      uid: z.string().describe(
        "Output only. Server generated unique id for the OS policy assignment resource.",
      ).optional(),
    }).describe(
      "OS policy assignment is an API resource that is used to apply a set of OS policies to a dynamically targeted group of Compute Engine VM instances. An OS policy is used to define the desired state configuration for a Compute Engine VM instance through a set of configuration resources that provide capabilities such as installing or removing software packages, or executing a script. For more information about the OS policy resource definitions and examples, see [OS policy and OS policy assignment](https://cloud.google.com/compute/docs/os-configuration-management/working-with-os-policies).",
    ).optional(),
  }).describe(
    "Represents a resource that is being orchestrated by the policy orchestrator.",
  ).optional(),
  orchestrationScope: z.object({
    selectors: z.array(z.object({
      locationSelector: z.object({
        includedLocations: z.array(z.unknown()).describe(
          "Optional. Names of the locations in scope. Format: `us-central1-a`",
        ).optional(),
      }).describe("Selector containing locations in scope.").optional(),
      resourceHierarchySelector: z.object({
        includedFolders: z.array(z.unknown()).describe(
          "Optional. Names of the folders in scope. Format: `folders/{folder_id}`",
        ).optional(),
        includedProjects: z.array(z.unknown()).describe(
          "Optional. Names of the projects in scope. Format: `projects/{project_number}`",
        ).optional(),
      }).describe(
        "Selector containing Cloud Resource Manager resource hierarchy nodes.",
      ).optional(),
    })).describe(
      "Optional. Selectors of the orchestration scope. There is a logical AND between each selector defined. When there is no explicit `ResourceHierarchySelector` selector specified, the scope is by default bounded to the parent of the policy orchestrator resource.",
    ).optional(),
  }).describe(
    "Defines a set of selectors which drive which resources are in scope of policy orchestration.",
  ).optional(),
  orchestrationState: z.object({
    currentIterationState: z.object({
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      failedActions: z.string().describe(
        "Output only. Number of orchestration actions which failed so far. For more details, query the Cloud Logs.",
      ).optional(),
      finishTime: z.string().describe(
        "Output only. Finish time of the wave iteration.",
      ).optional(),
      iterationId: z.string().describe(
        "Output only. Unique identifier of the iteration.",
      ).optional(),
      performedActions: z.string().describe(
        "Output only. Overall number of actions done by the orchestrator so far.",
      ).optional(),
      progress: z.number().describe(
        "Output only. An estimated percentage of the progress. Number between 0 and 100.",
      ).optional(),
      startTime: z.string().describe(
        "Output only. Start time of the wave iteration.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PROCESSING",
        "COMPLETED",
        "FAILED",
        "CANCELLED",
        "UNKNOWN",
      ]).describe("Output only. State of the iteration.").optional(),
    }).describe(
      "Describes the state of a single iteration of the orchestrator.",
    ).optional(),
    previousIterationState: z.object({
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      failedActions: z.string().describe(
        "Output only. Number of orchestration actions which failed so far. For more details, query the Cloud Logs.",
      ).optional(),
      finishTime: z.string().describe(
        "Output only. Finish time of the wave iteration.",
      ).optional(),
      iterationId: z.string().describe(
        "Output only. Unique identifier of the iteration.",
      ).optional(),
      performedActions: z.string().describe(
        "Output only. Overall number of actions done by the orchestrator so far.",
      ).optional(),
      progress: z.number().describe(
        "Output only. An estimated percentage of the progress. Number between 0 and 100.",
      ).optional(),
      startTime: z.string().describe(
        "Output only. Start time of the wave iteration.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PROCESSING",
        "COMPLETED",
        "FAILED",
        "CANCELLED",
        "UNKNOWN",
      ]).describe("Output only. State of the iteration.").optional(),
    }).describe(
      "Describes the state of a single iteration of the orchestrator.",
    ).optional(),
  }).describe("Describes the state of the orchestration process.").optional(),
  state: z.string().describe(
    "Optional. State of the orchestrator. Can be updated to change orchestrator behaviour. Allowed values: - `ACTIVE` - orchestrator is actively looking for actions to be taken. - `STOPPED` - orchestrator won't make any changes. Note: There might be more states added in the future. We use string here instead of an enum, to avoid the need of propagating new states to all the client code.",
  ).optional(),
  policyOrchestratorId: z.string().describe(
    "Required. The logical identifier of the policy orchestrator, with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the parent.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud OS Config Global.PolicyOrchestrators. Registered at `@swamp/gcp/osconfig/global-policyorchestrators`. */
export const model = {
  type: "@swamp/gcp/osconfig/global-policyorchestrators",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A policy orchestrator manages project-level and zone-level policy resources, ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a policyOrchestrators",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["orchestratedResource"] !== undefined) {
          body["orchestratedResource"] = g["orchestratedResource"];
        }
        if (g["orchestrationScope"] !== undefined) {
          body["orchestrationScope"] = g["orchestrationScope"];
        }
        if (g["orchestrationState"] !== undefined) {
          body["orchestrationState"] = g["orchestrationState"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["policyOrchestratorId"] !== undefined) {
          body["policyOrchestratorId"] = g["policyOrchestratorId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
      description: "Get a policyOrchestrators",
      arguments: z.object({
        identifier: z.string().describe("The name of the policyOrchestrators"),
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
      description: "Update policyOrchestrators attributes",
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
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["orchestratedResource"] !== undefined) {
          body["orchestratedResource"] = g["orchestratedResource"];
        }
        if (g["orchestrationScope"] !== undefined) {
          body["orchestrationScope"] = g["orchestrationScope"];
        }
        if (g["orchestrationState"] !== undefined) {
          body["orchestrationState"] = g["orchestrationState"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
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
      description: "Delete the policyOrchestrators",
      arguments: z.object({
        identifier: z.string().describe("The name of the policyOrchestrators"),
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
      description: "Sync policyOrchestrators state from GCP",
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
