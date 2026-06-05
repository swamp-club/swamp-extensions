// Auto-generated extension model for @swamp/gcp/osconfig/ospolicyassignments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud OS Config OsPolicyAssignments.
 *
 * OS policy assignment is an API resource that is used to apply a set of OS policies to a dynamically targeted group of Compute Engine VM instances. An OS policy is used to define the desired state configuration for a Compute Engine VM instance through a set of configuration resources that provide capabilities such as installing or removing software packages, or executing a script. For more information about the OS policy resource definitions and examples, see [OS policy and OS policy assignment](https://cloud.google.com/compute/docs/os-configuration-management/working-with-os-policies).
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
  return `${parent}/osPolicyAssignments/${shortName}`;
}

const BASE_URL = "https://osconfig.googleapis.com/";

const GET_CONFIG = {
  "id": "osconfig.projects.locations.osPolicyAssignments.get",
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
  "id": "osconfig.projects.locations.osPolicyAssignments.create",
  "path": "v1/{+parent}/osPolicyAssignments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "osPolicyAssignmentId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "osconfig.projects.locations.osPolicyAssignments.patch",
  "path": "v1/{+name}",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "osconfig.projects.locations.osPolicyAssignments.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "osconfig.projects.locations.osPolicyAssignments.list",
  "path": "v1/{+parent}/osPolicyAssignments",
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
  description: z.string().describe(
    "OS policy assignment description. Length of the description is limited to 1024 characters.",
  ).optional(),
  instanceFilter: z.object({
    all: z.boolean().describe(
      "Target all VMs in the project. If true, no other criteria is permitted.",
    ).optional(),
    exclusionLabels: z.array(z.object({
      labels: z.record(z.string(), z.string()).describe(
        "Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected.",
      ).optional(),
    })).describe(
      "List of label sets used for VM exclusion. If the list has more than one label set, the VM is excluded if any of the label sets are applicable for the VM.",
    ).optional(),
    inclusionLabels: z.array(z.object({
      labels: z.record(z.string(), z.string()).describe(
        "Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected.",
      ).optional(),
    })).describe(
      "List of label sets used for VM inclusion. If the list has more than one `LabelSet`, the VM is included if any of the label sets are applicable for the VM.",
    ).optional(),
    inventories: z.array(z.object({
      osShortName: z.string().describe("Required. The OS short name")
        .optional(),
      osVersion: z.string().describe(
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
    mode: z.enum(["MODE_UNSPECIFIED", "VALIDATION", "ENFORCEMENT"]).describe(
      "Required. Policy mode",
    ).optional(),
    resourceGroups: z.array(z.object({
      inventoryFilters: z.array(z.unknown()).describe(
        "List of inventory filters for the resource group. The resources in this resource group are applied to the target VM if it satisfies at least one of the following inventory filters. For example, to apply this resource group to VMs running either `RHEL` or `CentOS` operating systems, specify 2 items for the list with following values: inventory_filters[0].os_short_name='rhel' and inventory_filters[1].os_short_name='centos' If the list is empty, this resource group will be applied to the target VM unconditionally.",
      ).optional(),
      resources: z.array(z.unknown()).describe(
        "Required. List of resources configured for this resource group. The resources are executed in the exact order specified here.",
      ).optional(),
    })).describe(
      "Required. List of resource groups for the policy. For a particular VM, resource groups are evaluated in the order specified and the first resource group that is applicable is selected and the rest are ignored. If none of the resource groups are applicable for a VM, the VM is considered to be non-compliant w.r.t this policy. This behavior can be toggled by the flag `allow_no_resource_group_match`",
    ).optional(),
  })).describe("Required. List of OS policies to be applied to the VMs.")
    .optional(),
  rollout: z.object({
    disruptionBudget: z.object({
      fixed: z.number().int().describe("Specifies a fixed value.").optional(),
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
  osPolicyAssignmentId: z.string().describe(
    "Required. The logical name of the OS policy assignment in the project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  baseline: z.boolean().optional(),
  deleted: z.boolean().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  instanceFilter: z.object({
    all: z.boolean(),
    exclusionLabels: z.array(z.object({
      labels: z.record(z.string(), z.unknown()),
    })),
    inclusionLabels: z.array(z.object({
      labels: z.record(z.string(), z.unknown()),
    })),
    inventories: z.array(z.object({
      osShortName: z.string(),
      osVersion: z.string(),
    })),
  }).optional(),
  name: z.string(),
  osPolicies: z.array(z.object({
    allowNoResourceGroupMatch: z.boolean(),
    description: z.string(),
    id: z.string(),
    mode: z.string(),
    resourceGroups: z.array(z.object({
      inventoryFilters: z.array(z.unknown()),
      resources: z.array(z.unknown()),
    })),
  })).optional(),
  reconciling: z.boolean().optional(),
  revisionCreateTime: z.string().optional(),
  revisionId: z.string().optional(),
  rollout: z.object({
    disruptionBudget: z.object({
      fixed: z.number(),
      percent: z.number(),
    }),
    minWaitDuration: z.string(),
  }).optional(),
  rolloutState: z.string().optional(),
  uid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "OS policy assignment description. Length of the description is limited to 1024 characters.",
  ).optional(),
  instanceFilter: z.object({
    all: z.boolean().describe(
      "Target all VMs in the project. If true, no other criteria is permitted.",
    ).optional(),
    exclusionLabels: z.array(z.object({
      labels: z.record(z.string(), z.string()).describe(
        "Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected.",
      ).optional(),
    })).describe(
      "List of label sets used for VM exclusion. If the list has more than one label set, the VM is excluded if any of the label sets are applicable for the VM.",
    ).optional(),
    inclusionLabels: z.array(z.object({
      labels: z.record(z.string(), z.string()).describe(
        "Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected.",
      ).optional(),
    })).describe(
      "List of label sets used for VM inclusion. If the list has more than one `LabelSet`, the VM is included if any of the label sets are applicable for the VM.",
    ).optional(),
    inventories: z.array(z.object({
      osShortName: z.string().describe("Required. The OS short name")
        .optional(),
      osVersion: z.string().describe(
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
    mode: z.enum(["MODE_UNSPECIFIED", "VALIDATION", "ENFORCEMENT"]).describe(
      "Required. Policy mode",
    ).optional(),
    resourceGroups: z.array(z.object({
      inventoryFilters: z.array(z.unknown()).describe(
        "List of inventory filters for the resource group. The resources in this resource group are applied to the target VM if it satisfies at least one of the following inventory filters. For example, to apply this resource group to VMs running either `RHEL` or `CentOS` operating systems, specify 2 items for the list with following values: inventory_filters[0].os_short_name='rhel' and inventory_filters[1].os_short_name='centos' If the list is empty, this resource group will be applied to the target VM unconditionally.",
      ).optional(),
      resources: z.array(z.unknown()).describe(
        "Required. List of resources configured for this resource group. The resources are executed in the exact order specified here.",
      ).optional(),
    })).describe(
      "Required. List of resource groups for the policy. For a particular VM, resource groups are evaluated in the order specified and the first resource group that is applicable is selected and the rest are ignored. If none of the resource groups are applicable for a VM, the VM is considered to be non-compliant w.r.t this policy. This behavior can be toggled by the flag `allow_no_resource_group_match`",
    ).optional(),
  })).describe("Required. List of OS policies to be applied to the VMs.")
    .optional(),
  rollout: z.object({
    disruptionBudget: z.object({
      fixed: z.number().int().describe("Specifies a fixed value.").optional(),
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
  osPolicyAssignmentId: z.string().describe(
    "Required. The logical name of the OS policy assignment in the project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud OS Config OsPolicyAssignments. Registered at `@swamp/gcp/osconfig/ospolicyassignments`. */
export const model = {
  type: "@swamp/gcp/osconfig/ospolicyassignments",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "OS policy assignment is an API resource that is used to apply a set of OS pol...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a osPolicyAssignments",
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
        if (g["instanceFilter"] !== undefined) {
          body["instanceFilter"] = g["instanceFilter"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["osPolicies"] !== undefined) body["osPolicies"] = g["osPolicies"];
        if (g["rollout"] !== undefined) body["rollout"] = g["rollout"];
        if (g["osPolicyAssignmentId"] !== undefined) {
          body["osPolicyAssignmentId"] = g["osPolicyAssignmentId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
      description: "Get a osPolicyAssignments",
      arguments: z.object({
        identifier: z.string().describe("The name of the osPolicyAssignments"),
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
      description: "Update osPolicyAssignments attributes",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["instanceFilter"] !== undefined) {
          body["instanceFilter"] = g["instanceFilter"];
        }
        if (g["osPolicies"] !== undefined) body["osPolicies"] = g["osPolicies"];
        if (g["rollout"] !== undefined) body["rollout"] = g["rollout"];
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
      description: "Delete the osPolicyAssignments",
      arguments: z.object({
        identifier: z.string().describe("The name of the osPolicyAssignments"),
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
      description: "Sync osPolicyAssignments state from GCP",
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
      description: "List osPolicyAssignments resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of assignments to return.",
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
          "osPolicyAssignments",
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
    list_revisions: {
      description: "list revisions",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "osconfig.projects.locations.osPolicyAssignments.listRevisions",
            "path": "v1/{+name}:listRevisions",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
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
