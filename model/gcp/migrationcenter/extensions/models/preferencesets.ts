// Auto-generated extension model for @swamp/gcp/migrationcenter/preferencesets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Migration Center PreferenceSets.
 *
 * The preferences that apply to all assets in a given context.
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
  return `${parent}/preferenceSets/${shortName}`;
}

const BASE_URL = "https://migrationcenter.googleapis.com/";

const GET_CONFIG = {
  "id": "migrationcenter.projects.locations.preferenceSets.get",
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
  "id": "migrationcenter.projects.locations.preferenceSets.create",
  "path": "v1/{+parent}/preferenceSets",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "preferenceSetId": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "migrationcenter.projects.locations.preferenceSets.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "migrationcenter.projects.locations.preferenceSets.delete",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  description: z.string().describe("A description of the preference set.")
    .optional(),
  displayName: z.string().describe(
    "User-friendly display name. Maximum length is 63 characters.",
  ).optional(),
  virtualMachinePreferences: z.object({
    commitmentPlan: z.enum([
      "COMMITMENT_PLAN_UNSPECIFIED",
      "COMMITMENT_PLAN_NONE",
      "COMMITMENT_PLAN_ONE_YEAR",
      "COMMITMENT_PLAN_THREE_YEARS",
    ]).describe(
      "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
    ).optional(),
    computeEnginePreferences: z.object({
      licenseType: z.enum([
        "LICENSE_TYPE_UNSPECIFIED",
        "LICENSE_TYPE_DEFAULT",
        "LICENSE_TYPE_BRING_YOUR_OWN_LICENSE",
      ]).describe(
        "License type to consider when calculating costs for virtual machine insights and recommendations. If unspecified, costs are calculated based on the default licensing plan.",
      ).optional(),
      machinePreferences: z.object({
        allowedMachineSeries: z.array(z.object({
          code: z.unknown().describe(
            "Code to identify a machine series. Consult this for more details on the available series for Compute Engine: https://cloud.google.com/compute/docs/machine-resource#machine_type_comparison Consult this for more details on the available series for Google Cloud VMware Engine: https://cloud.google.com/vmware-engine/pricing",
          ).optional(),
        })).describe(
          "Compute Engine machine series to consider for insights and recommendations. If empty, no restriction is applied on the machine series.",
        ).optional(),
      }).describe(
        "The type of machines to consider when calculating virtual machine migration insights and recommendations. Not all machine types are available in all zones and regions.",
      ).optional(),
      persistentDiskType: z.enum([
        "PERSISTENT_DISK_TYPE_UNSPECIFIED",
        "PERSISTENT_DISK_TYPE_STANDARD",
        "PERSISTENT_DISK_TYPE_BALANCED",
        "PERSISTENT_DISK_TYPE_SSD",
      ]).describe(
        "Persistent disk type to use. If unspecified (default), all types are considered, based on available usage data.",
      ).optional(),
    }).describe(
      "The user preferences relating to Compute Engine target platform.",
    ).optional(),
    regionPreferences: z.object({
      preferredRegions: z.array(z.string()).describe(
        "A list of preferred regions, ordered by the most preferred region first. Set only valid Google Cloud region names. See https://cloud.google.com/compute/docs/regions-zones for available regions.",
      ).optional(),
    }).describe("The user preferences relating to target regions.").optional(),
    sizingOptimizationStrategy: z.enum([
      "SIZING_OPTIMIZATION_STRATEGY_UNSPECIFIED",
      "SIZING_OPTIMIZATION_STRATEGY_SAME_AS_SOURCE",
      "SIZING_OPTIMIZATION_STRATEGY_MODERATE",
      "SIZING_OPTIMIZATION_STRATEGY_AGGRESSIVE",
    ]).describe(
      "Sizing optimization strategy specifies the preferred strategy used when extrapolating usage data to calculate insights and recommendations for a virtual machine. If you are unsure which value to set, a moderate sizing optimization strategy is often a good value to start with.",
    ).optional(),
    soleTenancyPreferences: z.object({
      commitmentPlan: z.enum([
        "COMMITMENT_PLAN_UNSPECIFIED",
        "ON_DEMAND",
        "COMMITMENT_1_YEAR",
        "COMMITMENT_3_YEAR",
      ]).describe(
        "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
      ).optional(),
      cpuOvercommitRatio: z.number().describe(
        "CPU overcommit ratio. Acceptable values are between 1.0 and 2.0 inclusive.",
      ).optional(),
      hostMaintenancePolicy: z.enum([
        "HOST_MAINTENANCE_POLICY_UNSPECIFIED",
        "HOST_MAINTENANCE_POLICY_DEFAULT",
        "HOST_MAINTENANCE_POLICY_RESTART_IN_PLACE",
        "HOST_MAINTENANCE_POLICY_MIGRATE_WITHIN_NODE_GROUP",
      ]).describe("Sole Tenancy nodes maintenance policy.").optional(),
      nodeTypes: z.array(z.object({
        nodeName: z.string().describe(
          "Name of the Sole Tenant node. Consult https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes",
        ).optional(),
      })).describe(
        "A list of sole tenant node types. An empty list means that all possible node types will be considered.",
      ).optional(),
    }).describe("Preferences concerning Sole Tenancy nodes and VMs.")
      .optional(),
    targetProduct: z.enum([
      "COMPUTE_MIGRATION_TARGET_PRODUCT_UNSPECIFIED",
      "COMPUTE_MIGRATION_TARGET_PRODUCT_COMPUTE_ENGINE",
      "COMPUTE_MIGRATION_TARGET_PRODUCT_VMWARE_ENGINE",
      "COMPUTE_MIGRATION_TARGET_PRODUCT_SOLE_TENANCY",
    ]).describe(
      "Target product for assets using this preference set. Specify either target product or business goal, but not both.",
    ).optional(),
    vmwareEnginePreferences: z.object({
      commitmentPlan: z.enum([
        "COMMITMENT_PLAN_UNSPECIFIED",
        "ON_DEMAND",
        "COMMITMENT_1_YEAR_MONTHLY_PAYMENTS",
        "COMMITMENT_3_YEAR_MONTHLY_PAYMENTS",
        "COMMITMENT_1_YEAR_UPFRONT_PAYMENT",
        "COMMITMENT_3_YEAR_UPFRONT_PAYMENT",
      ]).describe(
        "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
      ).optional(),
      cpuOvercommitRatio: z.number().describe(
        "CPU overcommit ratio. Acceptable values are between 1.0 and 8.0, with 0.1 increment.",
      ).optional(),
      memoryOvercommitRatio: z.number().describe(
        "Memory overcommit ratio. Acceptable values are 1.0, 1.25, 1.5, 1.75 and 2.0.",
      ).optional(),
      storageDeduplicationCompressionRatio: z.number().describe(
        "The Deduplication and Compression ratio is based on the logical (Used Before) space required to store data before applying deduplication and compression, in relation to the physical (Used After) space required after applying deduplication and compression. Specifically, the ratio is the Used Before space divided by the Used After space. For example, if the Used Before space is 3 GB, but the physical Used After space is 1 GB, the deduplication and compression ratio is 3x. Acceptable values are between 1.0 and 4.0.",
      ).optional(),
    }).describe(
      "The user preferences relating to Google Cloud VMware Engine target platform.",
    ).optional(),
  }).describe(
    "VirtualMachinePreferences enables you to create sets of assumptions, for example, a geographical location and pricing track, for your migrated virtual machines. The set of preferences influence recommendations for migrating virtual machine assets.",
  ).optional(),
  preferenceSetId: z.string().describe(
    "Required. User specified ID for the preference set. It will become the last component of the preference set name. The ID must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. The ID must match the regular expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
  virtualMachinePreferences: z.object({
    commitmentPlan: z.string(),
    computeEnginePreferences: z.object({
      licenseType: z.string(),
      machinePreferences: z.object({
        allowedMachineSeries: z.array(z.object({
          code: z.unknown(),
        })),
      }),
      persistentDiskType: z.string(),
    }),
    regionPreferences: z.object({
      preferredRegions: z.array(z.string()),
    }),
    sizingOptimizationStrategy: z.string(),
    soleTenancyPreferences: z.object({
      commitmentPlan: z.string(),
      cpuOvercommitRatio: z.number(),
      hostMaintenancePolicy: z.string(),
      nodeTypes: z.array(z.object({
        nodeName: z.string(),
      })),
    }),
    targetProduct: z.string(),
    vmwareEnginePreferences: z.object({
      commitmentPlan: z.string(),
      cpuOvercommitRatio: z.number(),
      memoryOvercommitRatio: z.number(),
      storageDeduplicationCompressionRatio: z.number(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().describe("A description of the preference set.")
    .optional(),
  displayName: z.string().describe(
    "User-friendly display name. Maximum length is 63 characters.",
  ).optional(),
  virtualMachinePreferences: z.object({
    commitmentPlan: z.enum([
      "COMMITMENT_PLAN_UNSPECIFIED",
      "COMMITMENT_PLAN_NONE",
      "COMMITMENT_PLAN_ONE_YEAR",
      "COMMITMENT_PLAN_THREE_YEARS",
    ]).describe(
      "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
    ).optional(),
    computeEnginePreferences: z.object({
      licenseType: z.enum([
        "LICENSE_TYPE_UNSPECIFIED",
        "LICENSE_TYPE_DEFAULT",
        "LICENSE_TYPE_BRING_YOUR_OWN_LICENSE",
      ]).describe(
        "License type to consider when calculating costs for virtual machine insights and recommendations. If unspecified, costs are calculated based on the default licensing plan.",
      ).optional(),
      machinePreferences: z.object({
        allowedMachineSeries: z.array(z.object({
          code: z.unknown().describe(
            "Code to identify a machine series. Consult this for more details on the available series for Compute Engine: https://cloud.google.com/compute/docs/machine-resource#machine_type_comparison Consult this for more details on the available series for Google Cloud VMware Engine: https://cloud.google.com/vmware-engine/pricing",
          ).optional(),
        })).describe(
          "Compute Engine machine series to consider for insights and recommendations. If empty, no restriction is applied on the machine series.",
        ).optional(),
      }).describe(
        "The type of machines to consider when calculating virtual machine migration insights and recommendations. Not all machine types are available in all zones and regions.",
      ).optional(),
      persistentDiskType: z.enum([
        "PERSISTENT_DISK_TYPE_UNSPECIFIED",
        "PERSISTENT_DISK_TYPE_STANDARD",
        "PERSISTENT_DISK_TYPE_BALANCED",
        "PERSISTENT_DISK_TYPE_SSD",
      ]).describe(
        "Persistent disk type to use. If unspecified (default), all types are considered, based on available usage data.",
      ).optional(),
    }).describe(
      "The user preferences relating to Compute Engine target platform.",
    ).optional(),
    regionPreferences: z.object({
      preferredRegions: z.array(z.string()).describe(
        "A list of preferred regions, ordered by the most preferred region first. Set only valid Google Cloud region names. See https://cloud.google.com/compute/docs/regions-zones for available regions.",
      ).optional(),
    }).describe("The user preferences relating to target regions.").optional(),
    sizingOptimizationStrategy: z.enum([
      "SIZING_OPTIMIZATION_STRATEGY_UNSPECIFIED",
      "SIZING_OPTIMIZATION_STRATEGY_SAME_AS_SOURCE",
      "SIZING_OPTIMIZATION_STRATEGY_MODERATE",
      "SIZING_OPTIMIZATION_STRATEGY_AGGRESSIVE",
    ]).describe(
      "Sizing optimization strategy specifies the preferred strategy used when extrapolating usage data to calculate insights and recommendations for a virtual machine. If you are unsure which value to set, a moderate sizing optimization strategy is often a good value to start with.",
    ).optional(),
    soleTenancyPreferences: z.object({
      commitmentPlan: z.enum([
        "COMMITMENT_PLAN_UNSPECIFIED",
        "ON_DEMAND",
        "COMMITMENT_1_YEAR",
        "COMMITMENT_3_YEAR",
      ]).describe(
        "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
      ).optional(),
      cpuOvercommitRatio: z.number().describe(
        "CPU overcommit ratio. Acceptable values are between 1.0 and 2.0 inclusive.",
      ).optional(),
      hostMaintenancePolicy: z.enum([
        "HOST_MAINTENANCE_POLICY_UNSPECIFIED",
        "HOST_MAINTENANCE_POLICY_DEFAULT",
        "HOST_MAINTENANCE_POLICY_RESTART_IN_PLACE",
        "HOST_MAINTENANCE_POLICY_MIGRATE_WITHIN_NODE_GROUP",
      ]).describe("Sole Tenancy nodes maintenance policy.").optional(),
      nodeTypes: z.array(z.object({
        nodeName: z.string().describe(
          "Name of the Sole Tenant node. Consult https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes",
        ).optional(),
      })).describe(
        "A list of sole tenant node types. An empty list means that all possible node types will be considered.",
      ).optional(),
    }).describe("Preferences concerning Sole Tenancy nodes and VMs.")
      .optional(),
    targetProduct: z.enum([
      "COMPUTE_MIGRATION_TARGET_PRODUCT_UNSPECIFIED",
      "COMPUTE_MIGRATION_TARGET_PRODUCT_COMPUTE_ENGINE",
      "COMPUTE_MIGRATION_TARGET_PRODUCT_VMWARE_ENGINE",
      "COMPUTE_MIGRATION_TARGET_PRODUCT_SOLE_TENANCY",
    ]).describe(
      "Target product for assets using this preference set. Specify either target product or business goal, but not both.",
    ).optional(),
    vmwareEnginePreferences: z.object({
      commitmentPlan: z.enum([
        "COMMITMENT_PLAN_UNSPECIFIED",
        "ON_DEMAND",
        "COMMITMENT_1_YEAR_MONTHLY_PAYMENTS",
        "COMMITMENT_3_YEAR_MONTHLY_PAYMENTS",
        "COMMITMENT_1_YEAR_UPFRONT_PAYMENT",
        "COMMITMENT_3_YEAR_UPFRONT_PAYMENT",
      ]).describe(
        "Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with.",
      ).optional(),
      cpuOvercommitRatio: z.number().describe(
        "CPU overcommit ratio. Acceptable values are between 1.0 and 8.0, with 0.1 increment.",
      ).optional(),
      memoryOvercommitRatio: z.number().describe(
        "Memory overcommit ratio. Acceptable values are 1.0, 1.25, 1.5, 1.75 and 2.0.",
      ).optional(),
      storageDeduplicationCompressionRatio: z.number().describe(
        "The Deduplication and Compression ratio is based on the logical (Used Before) space required to store data before applying deduplication and compression, in relation to the physical (Used After) space required after applying deduplication and compression. Specifically, the ratio is the Used Before space divided by the Used After space. For example, if the Used Before space is 3 GB, but the physical Used After space is 1 GB, the deduplication and compression ratio is 3x. Acceptable values are between 1.0 and 4.0.",
      ).optional(),
    }).describe(
      "The user preferences relating to Google Cloud VMware Engine target platform.",
    ).optional(),
  }).describe(
    "VirtualMachinePreferences enables you to create sets of assumptions, for example, a geographical location and pricing track, for your migrated virtual machines. The set of preferences influence recommendations for migrating virtual machine assets.",
  ).optional(),
  preferenceSetId: z.string().describe(
    "Required. User specified ID for the preference set. It will become the last component of the preference set name. The ID must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. The ID must match the regular expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Migration Center PreferenceSets. Registered at `@swamp/gcp/migrationcenter/preferencesets`. */
export const model = {
  type: "@swamp/gcp/migrationcenter/preferencesets",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The preferences that apply to all assets in a given context.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a preferenceSets",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["virtualMachinePreferences"] !== undefined) {
          body["virtualMachinePreferences"] = g["virtualMachinePreferences"];
        }
        if (g["preferenceSetId"] !== undefined) {
          body["preferenceSetId"] = g["preferenceSetId"];
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
      description: "Get a preferenceSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the preferenceSets"),
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
    update: {
      description: "Update preferenceSets attributes",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["virtualMachinePreferences"] !== undefined) {
          body["virtualMachinePreferences"] = g["virtualMachinePreferences"];
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
      description: "Delete the preferenceSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the preferenceSets"),
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
      description: "Sync preferenceSets state from GCP",
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
  },
};
