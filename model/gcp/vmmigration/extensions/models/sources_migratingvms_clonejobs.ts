// Auto-generated extension model for @swamp/gcp/vmmigration/sources-migratingvms-clonejobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud VM Migration Sources.MigratingVms.CloneJobs.
 *
 * CloneJob describes the process of creating a clone of a MigratingVM to the requested target based on the latest successful uploaded snapshots. While the migration cycles of a MigratingVm take place, it is possible to verify the uploaded VM can be started in the cloud, by creating a clone. The clone can be created without any downtime, and it is created using the latest snapshots which are already in the cloud. The cloneJob is only responsible for its work, not its products, which means once it is finished, it will never touch the instance it created. It will only delete it in case of the CloneJob being cancelled or upon failure to clone.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/cloneJobs/${shortName}`;
}

const BASE_URL = "https://vmmigration.googleapis.com/";

const GET_CONFIG = {
  "id": "vmmigration.projects.locations.sources.migratingVms.cloneJobs.get",
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
  "id": "vmmigration.projects.locations.sources.migratingVms.cloneJobs.create",
  "path": "v1/{+parent}/cloneJobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "cloneJobId": {
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

const LIST_CONFIG = {
  "id": "vmmigration.projects.locations.sources.migratingVms.cloneJobs.list",
  "path": "v1/{+parent}/cloneJobs",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  computeEngineDisksTargetDetails: z.object({
    disks: z.array(z.object({
      diskUri: z.string().describe(
        "Output only. The URI of the Persistent Disk.",
      ).optional(),
      sourceDiskNumber: z.number().int().describe(
        "Output only. The ordinal number of the source VM disk.",
      ).optional(),
    })).describe("The details of each created Persistent Disk.").optional(),
    disksTargetDetails: z.object({}).describe(
      "Details for a disks-only migration.",
    ).optional(),
    vmTargetDetails: z.object({
      vmUri: z.string().describe(
        "Output only. The URI of the Compute Engine VM.",
      ).optional(),
    }).describe("Details for the VM created VM as part of disks migration.")
      .optional(),
  }).describe(
    "ComputeEngineDisksTargetDetails is a collection of created Persistent Disks details.",
  ).optional(),
  computeEngineTargetDetails: z.object({
    adaptationModifiers: z.array(z.object({
      modifier: z.string().describe("Optional. The modifier name.").optional(),
      value: z.string().describe(
        "Optional. The value of the modifier. The actual value depends on the modifier and can also be empty.",
      ).optional(),
    })).describe(
      "Optional. Modifiers to be used as configuration of the OS adaptation process.",
    ).optional(),
    additionalLicenses: z.array(z.string()).describe(
      "Additional licenses to assign to the VM.",
    ).optional(),
    appliedLicense: z.object({
      osLicense: z.string().describe(
        "The OS license returned from the adaptation module's report.",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "NONE", "PAYG", "BYOL"]).describe(
        "The license type that was used in OS adaptation.",
      ).optional(),
    }).describe(
      "AppliedLicense holds the license data returned by adaptation module report.",
    ).optional(),
    bootConversion: z.enum([
      "BOOT_CONVERSION_UNSPECIFIED",
      "NONE",
      "BIOS_TO_EFI",
    ]).describe(
      "Optional. By default the virtual machine will keep its existing boot option. Setting this property will trigger an internal process which will convert the virtual machine from using the existing boot option to another.",
    ).optional(),
    bootOption: z.enum([
      "COMPUTE_ENGINE_BOOT_OPTION_UNSPECIFIED",
      "COMPUTE_ENGINE_BOOT_OPTION_EFI",
      "COMPUTE_ENGINE_BOOT_OPTION_BIOS",
    ]).describe("The VM Boot Option, as set in the source VM.").optional(),
    computeScheduling: z.object({
      minNodeCpus: z.number().int().describe(
        "The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. Ignored if no node_affinites are configured.",
      ).optional(),
      nodeAffinities: z.array(z.object({
        key: z.string().describe("The label key of Node resource to reference.")
          .optional(),
        operator: z.enum(["OPERATOR_UNSPECIFIED", "IN", "NOT_IN"]).describe(
          "The operator to use for the node resources specified in the `values` parameter.",
        ).optional(),
        values: z.array(z.unknown()).describe(
          "Corresponds to the label values of Node resource.",
        ).optional(),
      })).describe(
        "A set of node affinity and anti-affinity configurations for sole tenant nodes.",
      ).optional(),
      onHostMaintenance: z.enum([
        "ON_HOST_MAINTENANCE_UNSPECIFIED",
        "TERMINATE",
        "MIGRATE",
      ]).describe(
        "How the instance should behave when the host machine undergoes maintenance that may temporarily impact instance performance.",
      ).optional(),
      restartType: z.enum([
        "RESTART_TYPE_UNSPECIFIED",
        "AUTOMATIC_RESTART",
        "NO_AUTOMATIC_RESTART",
      ]).describe(
        "Whether the Instance should be automatically restarted whenever it is terminated by Compute Engine (not terminated by user). This configuration is identical to `automaticRestart` field in Compute Engine create instance under scheduling. It was changed to an enum (instead of a boolean) to match the default value in Compute Engine which is automatic restart.",
      ).optional(),
    }).describe(
      "Scheduling information for VM on maintenance/restart behaviour and node allocation in sole tenant nodes. Options for instance behavior when the host machine undergoes maintenance that may temporarily impact instance performance.",
    ).optional(),
    diskReplicaZones: z.array(z.string()).describe(
      "Optional. Additional replica zones of the target regional disks. If this list is not empty a regional disk will be created. The first supported zone would be the one stated in the zone field. The rest are taken from this list. Please refer to the [regional disk creation API](https://cloud.google.com/compute/docs/regions-zones/global-regional-zonal-resources) for further details about regional vs zonal disks. If not specified, a zonal disk will be created in the same zone the VM is created.",
    ).optional(),
    diskType: z.enum([
      "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED",
      "COMPUTE_ENGINE_DISK_TYPE_STANDARD",
      "COMPUTE_ENGINE_DISK_TYPE_SSD",
      "COMPUTE_ENGINE_DISK_TYPE_BALANCED",
      "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED",
      "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY",
    ]).describe("The disk type to use in the VM.").optional(),
    enableIntegrityMonitoring: z.boolean().describe(
      "Optional. Defines whether the instance has integrity monitoring enabled.",
    ).optional(),
    enableVtpm: z.boolean().describe(
      "Optional. Defines whether the instance has vTPM enabled.",
    ).optional(),
    encryption: z.object({
      kmsKey: z.string().describe(
        "Required. The name of the encryption key that is stored in Google Cloud KMS.",
      ).optional(),
    }).describe(
      "Encryption message describes the details of the applied encryption.",
    ).optional(),
    hostname: z.string().describe("The hostname to assign to the VM.")
      .optional(),
    labels: z.record(z.string(), z.string()).describe(
      "A map of labels to associate with the VM.",
    ).optional(),
    licenseType: z.enum([
      "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT",
      "COMPUTE_ENGINE_LICENSE_TYPE_PAYG",
      "COMPUTE_ENGINE_LICENSE_TYPE_BYOL",
    ]).describe("The license type to use in OS adaptation.").optional(),
    machineType: z.string().describe("The machine type to create the VM with.")
      .optional(),
    machineTypeSeries: z.string().describe(
      "The machine type series to create the VM with.",
    ).optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "The metadata key/value pairs to assign to the VM.",
    ).optional(),
    networkInterfaces: z.array(z.object({
      externalIp: z.string().describe(
        "Optional. The external IP to define in the NIC.",
      ).optional(),
      internalIp: z.string().describe(
        "Optional. The internal IP to define in the NIC. The formats accepted are: `ephemeral` \\ ipv4 address \\ a named address resource full path.",
      ).optional(),
      network: z.string().describe(
        "Optional. The network to connect the NIC to.",
      ).optional(),
      networkTier: z.enum([
        "COMPUTE_ENGINE_NETWORK_TIER_UNSPECIFIED",
        "NETWORK_TIER_STANDARD",
        "NETWORK_TIER_PREMIUM",
      ]).describe(
        "Optional. The networking tier used for optimizing connectivity between instances and systems on the internet. Applies only for external ephemeral IP addresses. If left empty, will default to PREMIUM.",
      ).optional(),
      subnetwork: z.string().describe(
        "Optional. The subnetwork to connect the NIC to.",
      ).optional(),
    })).describe("List of NICs connected to this VM.").optional(),
    networkTags: z.array(z.string()).describe(
      "A list of network tags to associate with the VM.",
    ).optional(),
    project: z.string().describe(
      "The Google Cloud target project ID or project name.",
    ).optional(),
    secureBoot: z.boolean().describe(
      "Defines whether the instance has Secure Boot enabled. This can be set to true only if the VM boot option is EFI.",
    ).optional(),
    serviceAccount: z.string().describe(
      "The service account to associate the VM with.",
    ).optional(),
    storagePool: z.string().describe(
      'Optional. The storage pool used for the VM disks. If specified this will be the storage pool in which the disk is created. This is the full path of the storage pool resource, for example: "projects/my-project/zones/us-central1-a/storagePools/my-storage-pool". The storage pool must be in the same project and zone as the target disks. The storage pool\'s type must match the disk type.',
    ).optional(),
    vmName: z.string().describe("The name of the VM to create.").optional(),
    zone: z.string().describe("The zone in which to create the VM.").optional(),
  }).describe(
    "ComputeEngineTargetDetails is a collection of details for creating a VM in a target Compute Engine project.",
  ).optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  cloneJobId: z.string().describe("Required. The clone job identifier.")
    .optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  computeEngineDisksTargetDetails: z.object({
    disks: z.array(z.object({
      diskUri: z.string(),
      sourceDiskNumber: z.number(),
    })),
    disksTargetDetails: z.object({}),
    vmTargetDetails: z.object({
      vmUri: z.string(),
    }),
  }).optional(),
  computeEngineTargetDetails: z.object({
    adaptationModifiers: z.array(z.object({
      modifier: z.string(),
      value: z.string(),
    })),
    additionalLicenses: z.array(z.string()),
    appliedLicense: z.object({
      osLicense: z.string(),
      type: z.string(),
    }),
    bootConversion: z.string(),
    bootOption: z.string(),
    computeScheduling: z.object({
      minNodeCpus: z.number(),
      nodeAffinities: z.array(z.object({
        key: z.string(),
        operator: z.string(),
        values: z.array(z.unknown()),
      })),
      onHostMaintenance: z.string(),
      restartType: z.string(),
    }),
    diskReplicaZones: z.array(z.string()),
    diskType: z.string(),
    enableIntegrityMonitoring: z.boolean(),
    enableVtpm: z.boolean(),
    encryption: z.object({
      kmsKey: z.string(),
    }),
    hostname: z.string(),
    labels: z.record(z.string(), z.unknown()),
    licenseType: z.string(),
    machineType: z.string(),
    machineTypeSeries: z.string(),
    metadata: z.record(z.string(), z.unknown()),
    networkInterfaces: z.array(z.object({
      externalIp: z.string(),
      internalIp: z.string(),
      network: z.string(),
      networkTier: z.string(),
      subnetwork: z.string(),
    })),
    networkTags: z.array(z.string()),
    project: z.string(),
    secureBoot: z.boolean(),
    serviceAccount: z.string(),
    storagePool: z.string(),
    vmName: z.string(),
    zone: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  endTime: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  name: z.string(),
  state: z.string().optional(),
  stateTime: z.string().optional(),
  steps: z.array(z.object({
    adaptingOs: z.object({}),
    endTime: z.string(),
    instantiatingMigratedVm: z.object({}),
    preparingVmDisks: z.object({}),
    startTime: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  computeEngineDisksTargetDetails: z.object({
    disks: z.array(z.object({
      diskUri: z.string().describe(
        "Output only. The URI of the Persistent Disk.",
      ).optional(),
      sourceDiskNumber: z.number().int().describe(
        "Output only. The ordinal number of the source VM disk.",
      ).optional(),
    })).describe("The details of each created Persistent Disk.").optional(),
    disksTargetDetails: z.object({}).describe(
      "Details for a disks-only migration.",
    ).optional(),
    vmTargetDetails: z.object({
      vmUri: z.string().describe(
        "Output only. The URI of the Compute Engine VM.",
      ).optional(),
    }).describe("Details for the VM created VM as part of disks migration.")
      .optional(),
  }).describe(
    "ComputeEngineDisksTargetDetails is a collection of created Persistent Disks details.",
  ).optional(),
  computeEngineTargetDetails: z.object({
    adaptationModifiers: z.array(z.object({
      modifier: z.string().describe("Optional. The modifier name.").optional(),
      value: z.string().describe(
        "Optional. The value of the modifier. The actual value depends on the modifier and can also be empty.",
      ).optional(),
    })).describe(
      "Optional. Modifiers to be used as configuration of the OS adaptation process.",
    ).optional(),
    additionalLicenses: z.array(z.string()).describe(
      "Additional licenses to assign to the VM.",
    ).optional(),
    appliedLicense: z.object({
      osLicense: z.string().describe(
        "The OS license returned from the adaptation module's report.",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "NONE", "PAYG", "BYOL"]).describe(
        "The license type that was used in OS adaptation.",
      ).optional(),
    }).describe(
      "AppliedLicense holds the license data returned by adaptation module report.",
    ).optional(),
    bootConversion: z.enum([
      "BOOT_CONVERSION_UNSPECIFIED",
      "NONE",
      "BIOS_TO_EFI",
    ]).describe(
      "Optional. By default the virtual machine will keep its existing boot option. Setting this property will trigger an internal process which will convert the virtual machine from using the existing boot option to another.",
    ).optional(),
    bootOption: z.enum([
      "COMPUTE_ENGINE_BOOT_OPTION_UNSPECIFIED",
      "COMPUTE_ENGINE_BOOT_OPTION_EFI",
      "COMPUTE_ENGINE_BOOT_OPTION_BIOS",
    ]).describe("The VM Boot Option, as set in the source VM.").optional(),
    computeScheduling: z.object({
      minNodeCpus: z.number().int().describe(
        "The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. Ignored if no node_affinites are configured.",
      ).optional(),
      nodeAffinities: z.array(z.object({
        key: z.string().describe("The label key of Node resource to reference.")
          .optional(),
        operator: z.enum(["OPERATOR_UNSPECIFIED", "IN", "NOT_IN"]).describe(
          "The operator to use for the node resources specified in the `values` parameter.",
        ).optional(),
        values: z.array(z.unknown()).describe(
          "Corresponds to the label values of Node resource.",
        ).optional(),
      })).describe(
        "A set of node affinity and anti-affinity configurations for sole tenant nodes.",
      ).optional(),
      onHostMaintenance: z.enum([
        "ON_HOST_MAINTENANCE_UNSPECIFIED",
        "TERMINATE",
        "MIGRATE",
      ]).describe(
        "How the instance should behave when the host machine undergoes maintenance that may temporarily impact instance performance.",
      ).optional(),
      restartType: z.enum([
        "RESTART_TYPE_UNSPECIFIED",
        "AUTOMATIC_RESTART",
        "NO_AUTOMATIC_RESTART",
      ]).describe(
        "Whether the Instance should be automatically restarted whenever it is terminated by Compute Engine (not terminated by user). This configuration is identical to `automaticRestart` field in Compute Engine create instance under scheduling. It was changed to an enum (instead of a boolean) to match the default value in Compute Engine which is automatic restart.",
      ).optional(),
    }).describe(
      "Scheduling information for VM on maintenance/restart behaviour and node allocation in sole tenant nodes. Options for instance behavior when the host machine undergoes maintenance that may temporarily impact instance performance.",
    ).optional(),
    diskReplicaZones: z.array(z.string()).describe(
      "Optional. Additional replica zones of the target regional disks. If this list is not empty a regional disk will be created. The first supported zone would be the one stated in the zone field. The rest are taken from this list. Please refer to the [regional disk creation API](https://cloud.google.com/compute/docs/regions-zones/global-regional-zonal-resources) for further details about regional vs zonal disks. If not specified, a zonal disk will be created in the same zone the VM is created.",
    ).optional(),
    diskType: z.enum([
      "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED",
      "COMPUTE_ENGINE_DISK_TYPE_STANDARD",
      "COMPUTE_ENGINE_DISK_TYPE_SSD",
      "COMPUTE_ENGINE_DISK_TYPE_BALANCED",
      "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED",
      "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY",
    ]).describe("The disk type to use in the VM.").optional(),
    enableIntegrityMonitoring: z.boolean().describe(
      "Optional. Defines whether the instance has integrity monitoring enabled.",
    ).optional(),
    enableVtpm: z.boolean().describe(
      "Optional. Defines whether the instance has vTPM enabled.",
    ).optional(),
    encryption: z.object({
      kmsKey: z.string().describe(
        "Required. The name of the encryption key that is stored in Google Cloud KMS.",
      ).optional(),
    }).describe(
      "Encryption message describes the details of the applied encryption.",
    ).optional(),
    hostname: z.string().describe("The hostname to assign to the VM.")
      .optional(),
    labels: z.record(z.string(), z.string()).describe(
      "A map of labels to associate with the VM.",
    ).optional(),
    licenseType: z.enum([
      "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT",
      "COMPUTE_ENGINE_LICENSE_TYPE_PAYG",
      "COMPUTE_ENGINE_LICENSE_TYPE_BYOL",
    ]).describe("The license type to use in OS adaptation.").optional(),
    machineType: z.string().describe("The machine type to create the VM with.")
      .optional(),
    machineTypeSeries: z.string().describe(
      "The machine type series to create the VM with.",
    ).optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "The metadata key/value pairs to assign to the VM.",
    ).optional(),
    networkInterfaces: z.array(z.object({
      externalIp: z.string().describe(
        "Optional. The external IP to define in the NIC.",
      ).optional(),
      internalIp: z.string().describe(
        "Optional. The internal IP to define in the NIC. The formats accepted are: `ephemeral` \\ ipv4 address \\ a named address resource full path.",
      ).optional(),
      network: z.string().describe(
        "Optional. The network to connect the NIC to.",
      ).optional(),
      networkTier: z.enum([
        "COMPUTE_ENGINE_NETWORK_TIER_UNSPECIFIED",
        "NETWORK_TIER_STANDARD",
        "NETWORK_TIER_PREMIUM",
      ]).describe(
        "Optional. The networking tier used for optimizing connectivity between instances and systems on the internet. Applies only for external ephemeral IP addresses. If left empty, will default to PREMIUM.",
      ).optional(),
      subnetwork: z.string().describe(
        "Optional. The subnetwork to connect the NIC to.",
      ).optional(),
    })).describe("List of NICs connected to this VM.").optional(),
    networkTags: z.array(z.string()).describe(
      "A list of network tags to associate with the VM.",
    ).optional(),
    project: z.string().describe(
      "The Google Cloud target project ID or project name.",
    ).optional(),
    secureBoot: z.boolean().describe(
      "Defines whether the instance has Secure Boot enabled. This can be set to true only if the VM boot option is EFI.",
    ).optional(),
    serviceAccount: z.string().describe(
      "The service account to associate the VM with.",
    ).optional(),
    storagePool: z.string().describe(
      'Optional. The storage pool used for the VM disks. If specified this will be the storage pool in which the disk is created. This is the full path of the storage pool resource, for example: "projects/my-project/zones/us-central1-a/storagePools/my-storage-pool". The storage pool must be in the same project and zone as the target disks. The storage pool\'s type must match the disk type.',
    ).optional(),
    vmName: z.string().describe("The name of the VM to create.").optional(),
    zone: z.string().describe("The zone in which to create the VM.").optional(),
  }).describe(
    "ComputeEngineTargetDetails is a collection of details for creating a VM in a target Compute Engine project.",
  ).optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  cloneJobId: z.string().describe("Required. The clone job identifier.")
    .optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud VM Migration Sources.MigratingVms.CloneJobs. Registered at `@swamp/gcp/vmmigration/sources-migratingvms-clonejobs`. */
export const model = {
  type: "@swamp/gcp/vmmigration/sources-migratingvms-clonejobs",
  version: "2026.05.27.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "CloneJob describes the process of creating a clone of a MigratingVM to the re...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a cloneJobs",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["computeEngineDisksTargetDetails"] !== undefined) {
          body["computeEngineDisksTargetDetails"] =
            g["computeEngineDisksTargetDetails"];
        }
        if (g["computeEngineTargetDetails"] !== undefined) {
          body["computeEngineTargetDetails"] = g["computeEngineTargetDetails"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["cloneJobId"] !== undefined) body["cloneJobId"] = g["cloneJobId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE", "SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Get a cloneJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the cloneJobs"),
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
    sync: {
      description: "Sync cloneJobs state from GCP",
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
      description: "List cloneJobs resources",
      arguments: z.object({
        filter: z.string().describe("Optional. The filter request.").optional(),
        orderBy: z.string().describe(
          "Optional. the order by fields for the result.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of clone jobs to return. The service may return fewer than this value. If unspecified, at most 500 clone jobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "cloneJobs",
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
    cancel: {
      description: "cancel",
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
              "vmmigration.projects.locations.sources.migratingVms.cloneJobs.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
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
