// Auto-generated extension model for @swamp/gcp/vmmigration/sources-migratingvms
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud VM Migration Sources.MigratingVms.
 *
 * MigratingVm describes the VM that will be migrated from a Source environment and its replication state.
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
  return `${parent}/migratingVms/${shortName}`;
}

const BASE_URL = "https://vmmigration.googleapis.com/";

const GET_CONFIG = {
  "id": "vmmigration.projects.locations.sources.migratingVms.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "vmmigration.projects.locations.sources.migratingVms.create",
  "path": "v1/{+parent}/migratingVms",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "migratingVmId": {
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
  "id": "vmmigration.projects.locations.sources.migratingVms.patch",
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
  "id": "vmmigration.projects.locations.sources.migratingVms.delete",
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
  "id": "vmmigration.projects.locations.sources.migratingVms.list",
  "path": "v1/{+parent}/migratingVms",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  awsSourceVmDetails: z.object({
    architecture: z.enum([
      "VM_ARCHITECTURE_UNSPECIFIED",
      "VM_ARCHITECTURE_X86_FAMILY",
      "VM_ARCHITECTURE_ARM64",
    ]).describe("Output only. The VM architecture.").optional(),
    committedStorageBytes: z.string().describe(
      "Output only. The total size of the disks being migrated in bytes.",
    ).optional(),
    disks: z.array(z.object({
      diskNumber: z.number().int().describe(
        "Output only. The ordinal number of the disk.",
      ).optional(),
      sizeGb: z.string().describe("Output only. Size in GB.").optional(),
      volumeId: z.string().describe("Output only. AWS volume ID.").optional(),
    })).describe("Output only. The disks attached to the source VM.")
      .optional(),
    firmware: z.enum(["FIRMWARE_UNSPECIFIED", "EFI", "BIOS"]).describe(
      "Output only. The firmware type of the source VM.",
    ).optional(),
    vmCapabilitiesInfo: z.object({
      lastOsCapabilitiesUpdateTime: z.string().describe(
        "Output only. The last time OS capabilities list was updated.",
      ).optional(),
      osCapabilities: z.array(
        z.enum([
          "OS_CAPABILITY_UNSPECIFIED",
          "OS_CAPABILITY_NVME_STORAGE_ACCESS",
          "OS_CAPABILITY_GVNIC_NETWORK_INTERFACE",
          "OS_CAPABILITY_IDPF_NETWORK_INTERFACE",
        ]),
      ).describe(
        "Output only. Unordered list. List of certain VM OS capabilities needed for some Compute Engine features.",
      ).optional(),
    }).describe(
      "Migrating VM source information about the VM capabilities needed for some Compute Engine features.",
    ).optional(),
  }).describe("Represent the source AWS VM details.").optional(),
  azureSourceVmDetails: z.object({
    architecture: z.enum([
      "VM_ARCHITECTURE_UNSPECIFIED",
      "VM_ARCHITECTURE_X86_FAMILY",
      "VM_ARCHITECTURE_ARM64",
    ]).describe("Output only. The VM architecture.").optional(),
    committedStorageBytes: z.string().describe(
      "Output only. The total size of the disks being migrated in bytes.",
    ).optional(),
    disks: z.array(z.object({
      diskId: z.string().describe("Output only. Azure disk ID.").optional(),
      diskNumber: z.number().int().describe(
        "Output only. The ordinal number of the disk.",
      ).optional(),
      sizeGb: z.string().describe("Output only. Size in GB.").optional(),
    })).describe("Output only. The disks attached to the source VM.")
      .optional(),
    firmware: z.enum(["FIRMWARE_UNSPECIFIED", "EFI", "BIOS"]).describe(
      "Output only. The firmware type of the source VM.",
    ).optional(),
    vmCapabilitiesInfo: z.object({
      lastOsCapabilitiesUpdateTime: z.string().describe(
        "Output only. The last time OS capabilities list was updated.",
      ).optional(),
      osCapabilities: z.array(
        z.enum([
          "OS_CAPABILITY_UNSPECIFIED",
          "OS_CAPABILITY_NVME_STORAGE_ACCESS",
          "OS_CAPABILITY_GVNIC_NETWORK_INTERFACE",
          "OS_CAPABILITY_IDPF_NETWORK_INTERFACE",
        ]),
      ).describe(
        "Output only. Unordered list. List of certain VM OS capabilities needed for some Compute Engine features.",
      ).optional(),
    }).describe(
      "Migrating VM source information about the VM capabilities needed for some Compute Engine features.",
    ).optional(),
  }).describe("Represent the source Azure VM details.").optional(),
  computeEngineDisksTargetDefaults: z.object({
    disks: z.array(z.object({
      additionalLabels: z.record(z.string(), z.string()).describe(
        "A map of labels to associate with the Persistent Disk.",
      ).optional(),
      diskName: z.string().describe(
        "Optional. The name of the Persistent Disk to create.",
      ).optional(),
      diskType: z.enum([
        "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED",
        "COMPUTE_ENGINE_DISK_TYPE_STANDARD",
        "COMPUTE_ENGINE_DISK_TYPE_SSD",
        "COMPUTE_ENGINE_DISK_TYPE_BALANCED",
        "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED",
        "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY",
      ]).describe("The disk type to use.").optional(),
      encryption: z.object({
        kmsKey: z.string().describe(
          "Required. The name of the encryption key that is stored in Google Cloud KMS.",
        ).optional(),
      }).describe(
        "Encryption message describes the details of the applied encryption.",
      ).optional(),
      sourceDiskNumber: z.number().int().describe(
        "Required. The ordinal number of the source VM disk.",
      ).optional(),
      vmAttachmentDetails: z.object({
        deviceName: z.string().describe(
          "Optional. Specifies a unique device name of your choice that is reflected into the /dev/disk/by-id/google-* tree of a Linux operating system running within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
        ).optional(),
      }).describe("Details for attachment of the disk to a VM.").optional(),
    })).describe("The details of each Persistent Disk to create.").optional(),
    disksTargetDefaults: z.object({}).describe(
      "Details for a disk only migration.",
    ).optional(),
    targetProject: z.string().describe(
      "The full path of the resource of type TargetProject which represents the Compute Engine project in which to create the Persistent Disks.",
    ).optional(),
    vmTargetDefaults: z.object({
      additionalLicenses: z.array(z.string()).describe(
        "Optional. Additional licenses to assign to the VM.",
      ).optional(),
      bootDiskDefaults: z.object({
        deviceName: z.string().describe(
          "Optional. Specifies a unique device name of your choice that is reflected into the /dev/disk/by-id/google-* tree of a Linux operating system running within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
        ).optional(),
        diskName: z.string().describe("Optional. The name of the disk.")
          .optional(),
        diskType: z.enum([
          "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED",
          "COMPUTE_ENGINE_DISK_TYPE_STANDARD",
          "COMPUTE_ENGINE_DISK_TYPE_SSD",
          "COMPUTE_ENGINE_DISK_TYPE_BALANCED",
          "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED",
          "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY",
        ]).describe(
          "Optional. The type of disk provisioning to use for the VM.",
        ).optional(),
        encryption: z.object({
          kmsKey: z.string().describe(
            "Required. The name of the encryption key that is stored in Google Cloud KMS.",
          ).optional(),
        }).describe(
          "Encryption message describes the details of the applied encryption.",
        ).optional(),
        image: z.object({
          sourceImage: z.string().describe(
            "Required. The Image resource used when creating the disk.",
          ).optional(),
        }).describe(
          "Contains details about the image source used to create the disk.",
        ).optional(),
      }).describe(
        "BootDiskDefaults hold information about the boot disk of a VM.",
      ).optional(),
      computeScheduling: z.object({
        minNodeCpus: z.number().int().describe(
          "The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. Ignored if no node_affinites are configured.",
        ).optional(),
        nodeAffinities: z.array(z.object({
          key: z.unknown().describe(
            "The label key of Node resource to reference.",
          ).optional(),
          operator: z.unknown().describe(
            "The operator to use for the node resources specified in the `values` parameter.",
          ).optional(),
          values: z.unknown().describe(
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
      hostname: z.string().describe(
        "Optional. The hostname to assign to the VM.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. A map of labels to associate with the VM.",
      ).optional(),
      machineType: z.string().describe(
        "Required. The machine type to create the VM with.",
      ).optional(),
      machineTypeSeries: z.string().describe(
        "Optional. The machine type series to create the VM with. For presentation only.",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Optional. The metadata key/value pairs to assign to the VM.",
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
      })).describe("Optional. NICs to attach to the VM.").optional(),
      networkTags: z.array(z.string()).describe(
        "Optional. A list of network tags to associate with the VM.",
      ).optional(),
      secureBoot: z.boolean().describe(
        "Optional. Defines whether the instance has Secure Boot enabled. This can be set to true only if the VM boot option is EFI.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. The service account to associate the VM with.",
      ).optional(),
      vmName: z.string().describe("Required. The name of the VM to create.")
        .optional(),
    }).describe(
      "Details for creation of a VM that migrated data disks will be attached to.",
    ).optional(),
    zone: z.string().describe(
      "The zone in which to create the Persistent Disks.",
    ).optional(),
  }).describe(
    "ComputeEngineDisksTargetDefaults is a collection of details for creating Persistent Disks in a target Compute Engine project.",
  ).optional(),
  computeEngineTargetDefaults: z.object({
    adaptationModifiers: z.array(z.object({
      modifier: z.string().describe("Optional. The modifier name.").optional(),
      value: z.string().describe(
        "Optional. The value of the modifier. The actual value depends on the modifier and can also be empty.",
      ).optional(),
    })).describe(
      "Optional. AdaptationModifiers are the set of modifiers used during OS adaptation.",
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
    ]).describe("Output only. The VM Boot Option, as set in the source VM.")
      .optional(),
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
      "Optional. Defines whether the instance has integrity monitoring enabled. This can be set to true only if the VM boot option is EFI, and vTPM is enabled.",
    ).optional(),
    enableVtpm: z.boolean().describe(
      "Optional. Defines whether the instance has vTPM enabled. This can be set to true only if the VM boot option is EFI.",
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
    secureBoot: z.boolean().describe(
      "Defines whether the instance has Secure Boot enabled. This can be set to true only if the VM boot option is EFI.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Optional. The service account to associate the VM with.",
    ).optional(),
    storagePool: z.string().describe(
      'Optional. If specified this will be the storage pool in which the disk is created. This is the full path of the storage pool resource, for example: "projects/my-project/zones/us-central1-a/storagePools/my-storage-pool". The storage pool must be in the same project and zone as the target disks. The storage pool\'s type must match the disk type.',
    ).optional(),
    targetProject: z.string().describe(
      "The full path of the resource of type TargetProject which represents the Compute Engine project in which to create this VM.",
    ).optional(),
    vmName: z.string().describe("The name of the VM to create.").optional(),
    zone: z.string().describe("The zone in which to create the VM.").optional(),
  }).describe(
    "ComputeEngineTargetDefaults is a collection of details for creating a VM in a target Compute Engine project.",
  ).optional(),
  currentSyncInfo: z.object({
    cycleNumber: z.number().int().describe("The cycle's ordinal number.")
      .optional(),
    endTime: z.string().describe("The time the replication cycle has ended.")
      .optional(),
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
    name: z.string().describe("The identifier of the ReplicationCycle.")
      .optional(),
    progressPercent: z.number().int().describe(
      "The current progress in percentage of this cycle. Was replaced by 'steps' field, which breaks down the cycle progression more accurately.",
    ).optional(),
    startTime: z.string().describe(
      "The time the replication cycle has started.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "RUNNING",
      "PAUSED",
      "FAILED",
      "SUCCEEDED",
    ]).describe("State of the ReplicationCycle.").optional(),
    steps: z.array(z.object({
      endTime: z.string().describe("The time the cycle step has ended.")
        .optional(),
      initializingReplication: z.object({}).describe(
        "InitializingReplicationStep contains specific step details.",
      ).optional(),
      postProcessing: z.object({}).describe(
        "PostProcessingStep contains specific step details.",
      ).optional(),
      replicating: z.object({
        lastThirtyMinutesAverageBytesPerSecond: z.string().describe(
          "The source disks replication rate for the last 30 minutes in bytes per second.",
        ).optional(),
        lastTwoMinutesAverageBytesPerSecond: z.string().describe(
          "The source disks replication rate for the last 2 minutes in bytes per second.",
        ).optional(),
        replicatedBytes: z.string().describe("Replicated bytes in the step.")
          .optional(),
        totalBytes: z.string().describe(
          "Total bytes to be handled in the step.",
        ).optional(),
      }).describe("ReplicatingStep contains specific step details.").optional(),
      startTime: z.string().describe("The time the cycle step has started.")
        .optional(),
    })).describe("The cycle's steps list representing its progress.")
      .optional(),
    totalPauseDuration: z.string().describe(
      "The accumulated duration the replication cycle was paused.",
    ).optional(),
    warnings: z.array(z.object({
      actionItem: z.object({
        locale: z.string().describe(
          'The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"',
        ).optional(),
        message: z.string().describe(
          "The localized error message in the above locale.",
        ).optional(),
      }).describe(
        "Provides a localized error message that is safe to return to the user which can be attached to an RPC error.",
      ).optional(),
      code: z.enum(["WARNING_CODE_UNSPECIFIED", "ADAPTATION_WARNING"]).describe(
        "The warning code.",
      ).optional(),
      helpLinks: z.array(z.object({
        description: z.unknown().describe("Describes what the link offers.")
          .optional(),
        url: z.unknown().describe("The URL of the link.").optional(),
      })).describe(
        "Output only. URL(s) pointing to additional information on handling the current warning.",
      ).optional(),
      warningMessage: z.object({
        locale: z.string().describe(
          'The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"',
        ).optional(),
        message: z.string().describe(
          "The localized error message in the above locale.",
        ).optional(),
      }).describe(
        "Provides a localized error message that is safe to return to the user which can be attached to an RPC error.",
      ).optional(),
      warningTime: z.string().describe("The time the warning occurred.")
        .optional(),
    })).describe("Output only. Warnings that occurred during the cycle.")
      .optional(),
  }).describe(
    "ReplicationCycle contains information about the current replication cycle status.",
  ).optional(),
  cutoverForecast: z.object({
    estimatedCutoverJobDuration: z.string().describe(
      "Output only. Estimation of the CutoverJob duration.",
    ).optional(),
  }).describe(
    "CutoverForecast holds information about future CutoverJobs of a MigratingVm.",
  ).optional(),
  description: z.string().describe(
    "The description attached to the migrating VM by the user.",
  ).optional(),
  displayName: z.string().describe(
    "The display name attached to the MigratingVm by the user.",
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
  expiration: z.object({
    expireTime: z.string().describe(
      "Output only. Timestamp of when this resource is considered expired.",
    ).optional(),
    extendable: z.boolean().describe(
      "Output only. Describes whether the expiration can be extended.",
    ).optional(),
    extensionCount: z.number().int().describe(
      "Output only. The number of times expiration was extended.",
    ).optional(),
  }).describe(
    "Expiration holds information about the expiration of a MigratingVm.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels of the migrating VM.",
  ).optional(),
  lastReplicationCycle: z.object({
    cycleNumber: z.number().int().describe("The cycle's ordinal number.")
      .optional(),
    endTime: z.string().describe("The time the replication cycle has ended.")
      .optional(),
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
    name: z.string().describe("The identifier of the ReplicationCycle.")
      .optional(),
    progressPercent: z.number().int().describe(
      "The current progress in percentage of this cycle. Was replaced by 'steps' field, which breaks down the cycle progression more accurately.",
    ).optional(),
    startTime: z.string().describe(
      "The time the replication cycle has started.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "RUNNING",
      "PAUSED",
      "FAILED",
      "SUCCEEDED",
    ]).describe("State of the ReplicationCycle.").optional(),
    steps: z.array(z.object({
      endTime: z.string().describe("The time the cycle step has ended.")
        .optional(),
      initializingReplication: z.object({}).describe(
        "InitializingReplicationStep contains specific step details.",
      ).optional(),
      postProcessing: z.object({}).describe(
        "PostProcessingStep contains specific step details.",
      ).optional(),
      replicating: z.object({
        lastThirtyMinutesAverageBytesPerSecond: z.string().describe(
          "The source disks replication rate for the last 30 minutes in bytes per second.",
        ).optional(),
        lastTwoMinutesAverageBytesPerSecond: z.string().describe(
          "The source disks replication rate for the last 2 minutes in bytes per second.",
        ).optional(),
        replicatedBytes: z.string().describe("Replicated bytes in the step.")
          .optional(),
        totalBytes: z.string().describe(
          "Total bytes to be handled in the step.",
        ).optional(),
      }).describe("ReplicatingStep contains specific step details.").optional(),
      startTime: z.string().describe("The time the cycle step has started.")
        .optional(),
    })).describe("The cycle's steps list representing its progress.")
      .optional(),
    totalPauseDuration: z.string().describe(
      "The accumulated duration the replication cycle was paused.",
    ).optional(),
    warnings: z.array(z.object({
      actionItem: z.object({
        locale: z.string().describe(
          'The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"',
        ).optional(),
        message: z.string().describe(
          "The localized error message in the above locale.",
        ).optional(),
      }).describe(
        "Provides a localized error message that is safe to return to the user which can be attached to an RPC error.",
      ).optional(),
      code: z.enum(["WARNING_CODE_UNSPECIFIED", "ADAPTATION_WARNING"]).describe(
        "The warning code.",
      ).optional(),
      helpLinks: z.array(z.object({
        description: z.unknown().describe("Describes what the link offers.")
          .optional(),
        url: z.unknown().describe("The URL of the link.").optional(),
      })).describe(
        "Output only. URL(s) pointing to additional information on handling the current warning.",
      ).optional(),
      warningMessage: z.object({
        locale: z.string().describe(
          'The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"',
        ).optional(),
        message: z.string().describe(
          "The localized error message in the above locale.",
        ).optional(),
      }).describe(
        "Provides a localized error message that is safe to return to the user which can be attached to an RPC error.",
      ).optional(),
      warningTime: z.string().describe("The time the warning occurred.")
        .optional(),
    })).describe("Output only. Warnings that occurred during the cycle.")
      .optional(),
  }).describe(
    "ReplicationCycle contains information about the current replication cycle status.",
  ).optional(),
  lastSync: z.object({
    lastSyncTime: z.string().describe(
      "The most updated snapshot created time in the source that finished replication.",
    ).optional(),
  }).describe(
    "ReplicationSync contain information about the last replica sync to the cloud.",
  ).optional(),
  policy: z.object({
    idleDuration: z.string().describe(
      "The idle duration between replication stages.",
    ).optional(),
    skipOsAdaptation: z.boolean().describe(
      "A flag to indicate whether to skip OS adaptation during the replication sync. OS adaptation is a process where the VM's operating system undergoes changes and adaptations to fully function on Compute Engine.",
    ).optional(),
  }).describe("A policy for scheduling replications.").optional(),
  sourceVmId: z.string().describe(
    "The unique ID of the VM in the source. The VM's name in vSphere can be changed, so this is not the VM's name but rather its moRef id. This id is of the form vm-.",
  ).optional(),
  vmwareSourceVmDetails: z.object({
    architecture: z.enum([
      "VM_ARCHITECTURE_UNSPECIFIED",
      "VM_ARCHITECTURE_X86_FAMILY",
      "VM_ARCHITECTURE_ARM64",
    ]).describe("Output only. The VM architecture.").optional(),
    committedStorageBytes: z.string().describe(
      "Output only. The total size of the disks being migrated in bytes.",
    ).optional(),
    disks: z.array(z.object({
      diskNumber: z.number().int().describe(
        "Output only. The ordinal number of the disk.",
      ).optional(),
      label: z.string().describe("Output only. The disk label.").optional(),
      sizeGb: z.string().describe("Output only. Size in GB.").optional(),
    })).describe("Output only. The disks attached to the source VM.")
      .optional(),
    firmware: z.enum(["FIRMWARE_UNSPECIFIED", "EFI", "BIOS"]).describe(
      "Output only. The firmware type of the source VM.",
    ).optional(),
    vmCapabilitiesInfo: z.object({
      lastOsCapabilitiesUpdateTime: z.string().describe(
        "Output only. The last time OS capabilities list was updated.",
      ).optional(),
      osCapabilities: z.array(
        z.enum([
          "OS_CAPABILITY_UNSPECIFIED",
          "OS_CAPABILITY_NVME_STORAGE_ACCESS",
          "OS_CAPABILITY_GVNIC_NETWORK_INTERFACE",
          "OS_CAPABILITY_IDPF_NETWORK_INTERFACE",
        ]),
      ).describe(
        "Output only. Unordered list. List of certain VM OS capabilities needed for some Compute Engine features.",
      ).optional(),
    }).describe(
      "Migrating VM source information about the VM capabilities needed for some Compute Engine features.",
    ).optional(),
  }).describe("Represent the source Vmware VM details.").optional(),
  migratingVmId: z.string().describe("Required. The migratingVm identifier.")
    .optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  awsSourceVmDetails: z.object({
    architecture: z.string(),
    committedStorageBytes: z.string(),
    disks: z.array(z.object({
      diskNumber: z.number(),
      sizeGb: z.string(),
      volumeId: z.string(),
    })),
    firmware: z.string(),
    vmCapabilitiesInfo: z.object({
      lastOsCapabilitiesUpdateTime: z.string(),
      osCapabilities: z.array(z.string()),
    }),
  }).optional(),
  azureSourceVmDetails: z.object({
    architecture: z.string(),
    committedStorageBytes: z.string(),
    disks: z.array(z.object({
      diskId: z.string(),
      diskNumber: z.number(),
      sizeGb: z.string(),
    })),
    firmware: z.string(),
    vmCapabilitiesInfo: z.object({
      lastOsCapabilitiesUpdateTime: z.string(),
      osCapabilities: z.array(z.string()),
    }),
  }).optional(),
  computeEngineDisksTargetDefaults: z.object({
    disks: z.array(z.object({
      additionalLabels: z.record(z.string(), z.unknown()),
      diskName: z.string(),
      diskType: z.string(),
      encryption: z.object({
        kmsKey: z.string(),
      }),
      sourceDiskNumber: z.number(),
      vmAttachmentDetails: z.object({
        deviceName: z.string(),
      }),
    })),
    disksTargetDefaults: z.object({}),
    targetProject: z.string(),
    vmTargetDefaults: z.object({
      additionalLicenses: z.array(z.string()),
      bootDiskDefaults: z.object({
        deviceName: z.string(),
        diskName: z.string(),
        diskType: z.string(),
        encryption: z.object({
          kmsKey: z.string(),
        }),
        image: z.object({
          sourceImage: z.string(),
        }),
      }),
      computeScheduling: z.object({
        minNodeCpus: z.number(),
        nodeAffinities: z.array(z.object({
          key: z.unknown(),
          operator: z.unknown(),
          values: z.unknown(),
        })),
        onHostMaintenance: z.string(),
        restartType: z.string(),
      }),
      enableIntegrityMonitoring: z.boolean(),
      enableVtpm: z.boolean(),
      encryption: z.object({
        kmsKey: z.string(),
      }),
      hostname: z.string(),
      labels: z.record(z.string(), z.unknown()),
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
      secureBoot: z.boolean(),
      serviceAccount: z.string(),
      vmName: z.string(),
    }),
    zone: z.string(),
  }).optional(),
  computeEngineTargetDefaults: z.object({
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
    secureBoot: z.boolean(),
    serviceAccount: z.string(),
    storagePool: z.string(),
    targetProject: z.string(),
    vmName: z.string(),
    zone: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  currentSyncInfo: z.object({
    cycleNumber: z.number(),
    endTime: z.string(),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    name: z.string(),
    progressPercent: z.number(),
    startTime: z.string(),
    state: z.string(),
    steps: z.array(z.object({
      endTime: z.string(),
      initializingReplication: z.object({}),
      postProcessing: z.object({}),
      replicating: z.object({
        lastThirtyMinutesAverageBytesPerSecond: z.string(),
        lastTwoMinutesAverageBytesPerSecond: z.string(),
        replicatedBytes: z.string(),
        totalBytes: z.string(),
      }),
      startTime: z.string(),
    })),
    totalPauseDuration: z.string(),
    warnings: z.array(z.object({
      actionItem: z.object({
        locale: z.string(),
        message: z.string(),
      }),
      code: z.string(),
      helpLinks: z.array(z.object({
        description: z.unknown(),
        url: z.unknown(),
      })),
      warningMessage: z.object({
        locale: z.string(),
        message: z.string(),
      }),
      warningTime: z.string(),
    })),
  }).optional(),
  cutoverForecast: z.object({
    estimatedCutoverJobDuration: z.string(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  expiration: z.object({
    expireTime: z.string(),
    extendable: z.boolean(),
    extensionCount: z.number(),
  }).optional(),
  group: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastReplicationCycle: z.object({
    cycleNumber: z.number(),
    endTime: z.string(),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    name: z.string(),
    progressPercent: z.number(),
    startTime: z.string(),
    state: z.string(),
    steps: z.array(z.object({
      endTime: z.string(),
      initializingReplication: z.object({}),
      postProcessing: z.object({}),
      replicating: z.object({
        lastThirtyMinutesAverageBytesPerSecond: z.string(),
        lastTwoMinutesAverageBytesPerSecond: z.string(),
        replicatedBytes: z.string(),
        totalBytes: z.string(),
      }),
      startTime: z.string(),
    })),
    totalPauseDuration: z.string(),
    warnings: z.array(z.object({
      actionItem: z.object({
        locale: z.string(),
        message: z.string(),
      }),
      code: z.string(),
      helpLinks: z.array(z.object({
        description: z.unknown(),
        url: z.unknown(),
      })),
      warningMessage: z.object({
        locale: z.string(),
        message: z.string(),
      }),
      warningTime: z.string(),
    })),
  }).optional(),
  lastSync: z.object({
    lastSyncTime: z.string(),
  }).optional(),
  name: z.string(),
  policy: z.object({
    idleDuration: z.string(),
    skipOsAdaptation: z.boolean(),
  }).optional(),
  recentCloneJobs: z.array(z.object({
    computeEngineDisksTargetDetails: z.object({
      disks: z.array(z.object({
        diskUri: z.unknown(),
        sourceDiskNumber: z.unknown(),
      })),
      disksTargetDetails: z.object({}),
      vmTargetDetails: z.object({
        vmUri: z.string(),
      }),
    }),
    computeEngineTargetDetails: z.object({
      adaptationModifiers: z.array(z.object({
        modifier: z.unknown(),
        value: z.unknown(),
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
        nodeAffinities: z.array(z.unknown()),
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
        externalIp: z.unknown(),
        internalIp: z.unknown(),
        network: z.unknown(),
        networkTier: z.unknown(),
        subnetwork: z.unknown(),
      })),
      networkTags: z.array(z.string()),
      project: z.string(),
      secureBoot: z.boolean(),
      serviceAccount: z.string(),
      storagePool: z.string(),
      vmName: z.string(),
      zone: z.string(),
    }),
    createTime: z.string(),
    endTime: z.string(),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    name: z.string(),
    state: z.string(),
    stateTime: z.string(),
    steps: z.array(z.object({
      adaptingOs: z.object({}),
      endTime: z.string(),
      instantiatingMigratedVm: z.object({}),
      preparingVmDisks: z.object({}),
      startTime: z.string(),
    })),
  })).optional(),
  recentCutoverJobs: z.array(z.object({
    computeEngineDisksTargetDetails: z.object({
      disks: z.array(z.object({
        diskUri: z.unknown(),
        sourceDiskNumber: z.unknown(),
      })),
      disksTargetDetails: z.object({}),
      vmTargetDetails: z.object({
        vmUri: z.string(),
      }),
    }),
    computeEngineTargetDetails: z.object({
      adaptationModifiers: z.array(z.object({
        modifier: z.unknown(),
        value: z.unknown(),
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
        nodeAffinities: z.array(z.unknown()),
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
        externalIp: z.unknown(),
        internalIp: z.unknown(),
        network: z.unknown(),
        networkTier: z.unknown(),
        subnetwork: z.unknown(),
      })),
      networkTags: z.array(z.string()),
      project: z.string(),
      secureBoot: z.boolean(),
      serviceAccount: z.string(),
      storagePool: z.string(),
      vmName: z.string(),
      zone: z.string(),
    }),
    createTime: z.string(),
    endTime: z.string(),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    name: z.string(),
    progressPercent: z.number(),
    state: z.string(),
    stateMessage: z.string(),
    stateTime: z.string(),
    steps: z.array(z.object({
      endTime: z.string(),
      finalSync: z.object({
        cycleNumber: z.unknown(),
        endTime: z.unknown(),
        error: z.unknown(),
        name: z.unknown(),
        progressPercent: z.unknown(),
        startTime: z.unknown(),
        state: z.unknown(),
        steps: z.unknown(),
        totalPauseDuration: z.unknown(),
        warnings: z.unknown(),
      }),
      instantiatingMigratedVm: z.object({}),
      preparingVmDisks: z.object({}),
      previousReplicationCycle: z.object({
        cycleNumber: z.unknown(),
        endTime: z.unknown(),
        error: z.unknown(),
        name: z.unknown(),
        progressPercent: z.unknown(),
        startTime: z.unknown(),
        state: z.unknown(),
        steps: z.unknown(),
        totalPauseDuration: z.unknown(),
        warnings: z.unknown(),
      }),
      shuttingDownSourceVm: z.object({}),
      startTime: z.string(),
    })),
  })).optional(),
  sourceVmId: z.string().optional(),
  state: z.string().optional(),
  stateTime: z.string().optional(),
  updateTime: z.string().optional(),
  vmwareSourceVmDetails: z.object({
    architecture: z.string(),
    committedStorageBytes: z.string(),
    disks: z.array(z.object({
      diskNumber: z.number(),
      label: z.string(),
      sizeGb: z.string(),
    })),
    firmware: z.string(),
    vmCapabilitiesInfo: z.object({
      lastOsCapabilitiesUpdateTime: z.string(),
      osCapabilities: z.array(z.string()),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  awsSourceVmDetails: z.object({
    architecture: z.enum([
      "VM_ARCHITECTURE_UNSPECIFIED",
      "VM_ARCHITECTURE_X86_FAMILY",
      "VM_ARCHITECTURE_ARM64",
    ]).describe("Output only. The VM architecture.").optional(),
    committedStorageBytes: z.string().describe(
      "Output only. The total size of the disks being migrated in bytes.",
    ).optional(),
    disks: z.array(z.object({
      diskNumber: z.number().int().describe(
        "Output only. The ordinal number of the disk.",
      ).optional(),
      sizeGb: z.string().describe("Output only. Size in GB.").optional(),
      volumeId: z.string().describe("Output only. AWS volume ID.").optional(),
    })).describe("Output only. The disks attached to the source VM.")
      .optional(),
    firmware: z.enum(["FIRMWARE_UNSPECIFIED", "EFI", "BIOS"]).describe(
      "Output only. The firmware type of the source VM.",
    ).optional(),
    vmCapabilitiesInfo: z.object({
      lastOsCapabilitiesUpdateTime: z.string().describe(
        "Output only. The last time OS capabilities list was updated.",
      ).optional(),
      osCapabilities: z.array(
        z.enum([
          "OS_CAPABILITY_UNSPECIFIED",
          "OS_CAPABILITY_NVME_STORAGE_ACCESS",
          "OS_CAPABILITY_GVNIC_NETWORK_INTERFACE",
          "OS_CAPABILITY_IDPF_NETWORK_INTERFACE",
        ]),
      ).describe(
        "Output only. Unordered list. List of certain VM OS capabilities needed for some Compute Engine features.",
      ).optional(),
    }).describe(
      "Migrating VM source information about the VM capabilities needed for some Compute Engine features.",
    ).optional(),
  }).describe("Represent the source AWS VM details.").optional(),
  azureSourceVmDetails: z.object({
    architecture: z.enum([
      "VM_ARCHITECTURE_UNSPECIFIED",
      "VM_ARCHITECTURE_X86_FAMILY",
      "VM_ARCHITECTURE_ARM64",
    ]).describe("Output only. The VM architecture.").optional(),
    committedStorageBytes: z.string().describe(
      "Output only. The total size of the disks being migrated in bytes.",
    ).optional(),
    disks: z.array(z.object({
      diskId: z.string().describe("Output only. Azure disk ID.").optional(),
      diskNumber: z.number().int().describe(
        "Output only. The ordinal number of the disk.",
      ).optional(),
      sizeGb: z.string().describe("Output only. Size in GB.").optional(),
    })).describe("Output only. The disks attached to the source VM.")
      .optional(),
    firmware: z.enum(["FIRMWARE_UNSPECIFIED", "EFI", "BIOS"]).describe(
      "Output only. The firmware type of the source VM.",
    ).optional(),
    vmCapabilitiesInfo: z.object({
      lastOsCapabilitiesUpdateTime: z.string().describe(
        "Output only. The last time OS capabilities list was updated.",
      ).optional(),
      osCapabilities: z.array(
        z.enum([
          "OS_CAPABILITY_UNSPECIFIED",
          "OS_CAPABILITY_NVME_STORAGE_ACCESS",
          "OS_CAPABILITY_GVNIC_NETWORK_INTERFACE",
          "OS_CAPABILITY_IDPF_NETWORK_INTERFACE",
        ]),
      ).describe(
        "Output only. Unordered list. List of certain VM OS capabilities needed for some Compute Engine features.",
      ).optional(),
    }).describe(
      "Migrating VM source information about the VM capabilities needed for some Compute Engine features.",
    ).optional(),
  }).describe("Represent the source Azure VM details.").optional(),
  computeEngineDisksTargetDefaults: z.object({
    disks: z.array(z.object({
      additionalLabels: z.record(z.string(), z.string()).describe(
        "A map of labels to associate with the Persistent Disk.",
      ).optional(),
      diskName: z.string().describe(
        "Optional. The name of the Persistent Disk to create.",
      ).optional(),
      diskType: z.enum([
        "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED",
        "COMPUTE_ENGINE_DISK_TYPE_STANDARD",
        "COMPUTE_ENGINE_DISK_TYPE_SSD",
        "COMPUTE_ENGINE_DISK_TYPE_BALANCED",
        "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED",
        "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY",
      ]).describe("The disk type to use.").optional(),
      encryption: z.object({
        kmsKey: z.string().describe(
          "Required. The name of the encryption key that is stored in Google Cloud KMS.",
        ).optional(),
      }).describe(
        "Encryption message describes the details of the applied encryption.",
      ).optional(),
      sourceDiskNumber: z.number().int().describe(
        "Required. The ordinal number of the source VM disk.",
      ).optional(),
      vmAttachmentDetails: z.object({
        deviceName: z.string().describe(
          "Optional. Specifies a unique device name of your choice that is reflected into the /dev/disk/by-id/google-* tree of a Linux operating system running within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
        ).optional(),
      }).describe("Details for attachment of the disk to a VM.").optional(),
    })).describe("The details of each Persistent Disk to create.").optional(),
    disksTargetDefaults: z.object({}).describe(
      "Details for a disk only migration.",
    ).optional(),
    targetProject: z.string().describe(
      "The full path of the resource of type TargetProject which represents the Compute Engine project in which to create the Persistent Disks.",
    ).optional(),
    vmTargetDefaults: z.object({
      additionalLicenses: z.array(z.string()).describe(
        "Optional. Additional licenses to assign to the VM.",
      ).optional(),
      bootDiskDefaults: z.object({
        deviceName: z.string().describe(
          "Optional. Specifies a unique device name of your choice that is reflected into the /dev/disk/by-id/google-* tree of a Linux operating system running within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
        ).optional(),
        diskName: z.string().describe("Optional. The name of the disk.")
          .optional(),
        diskType: z.enum([
          "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED",
          "COMPUTE_ENGINE_DISK_TYPE_STANDARD",
          "COMPUTE_ENGINE_DISK_TYPE_SSD",
          "COMPUTE_ENGINE_DISK_TYPE_BALANCED",
          "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED",
          "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY",
        ]).describe(
          "Optional. The type of disk provisioning to use for the VM.",
        ).optional(),
        encryption: z.object({
          kmsKey: z.string().describe(
            "Required. The name of the encryption key that is stored in Google Cloud KMS.",
          ).optional(),
        }).describe(
          "Encryption message describes the details of the applied encryption.",
        ).optional(),
        image: z.object({
          sourceImage: z.string().describe(
            "Required. The Image resource used when creating the disk.",
          ).optional(),
        }).describe(
          "Contains details about the image source used to create the disk.",
        ).optional(),
      }).describe(
        "BootDiskDefaults hold information about the boot disk of a VM.",
      ).optional(),
      computeScheduling: z.object({
        minNodeCpus: z.number().int().describe(
          "The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. Ignored if no node_affinites are configured.",
        ).optional(),
        nodeAffinities: z.array(z.object({
          key: z.unknown().describe(
            "The label key of Node resource to reference.",
          ).optional(),
          operator: z.unknown().describe(
            "The operator to use for the node resources specified in the `values` parameter.",
          ).optional(),
          values: z.unknown().describe(
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
      hostname: z.string().describe(
        "Optional. The hostname to assign to the VM.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. A map of labels to associate with the VM.",
      ).optional(),
      machineType: z.string().describe(
        "Required. The machine type to create the VM with.",
      ).optional(),
      machineTypeSeries: z.string().describe(
        "Optional. The machine type series to create the VM with. For presentation only.",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Optional. The metadata key/value pairs to assign to the VM.",
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
      })).describe("Optional. NICs to attach to the VM.").optional(),
      networkTags: z.array(z.string()).describe(
        "Optional. A list of network tags to associate with the VM.",
      ).optional(),
      secureBoot: z.boolean().describe(
        "Optional. Defines whether the instance has Secure Boot enabled. This can be set to true only if the VM boot option is EFI.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. The service account to associate the VM with.",
      ).optional(),
      vmName: z.string().describe("Required. The name of the VM to create.")
        .optional(),
    }).describe(
      "Details for creation of a VM that migrated data disks will be attached to.",
    ).optional(),
    zone: z.string().describe(
      "The zone in which to create the Persistent Disks.",
    ).optional(),
  }).describe(
    "ComputeEngineDisksTargetDefaults is a collection of details for creating Persistent Disks in a target Compute Engine project.",
  ).optional(),
  computeEngineTargetDefaults: z.object({
    adaptationModifiers: z.array(z.object({
      modifier: z.string().describe("Optional. The modifier name.").optional(),
      value: z.string().describe(
        "Optional. The value of the modifier. The actual value depends on the modifier and can also be empty.",
      ).optional(),
    })).describe(
      "Optional. AdaptationModifiers are the set of modifiers used during OS adaptation.",
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
    ]).describe("Output only. The VM Boot Option, as set in the source VM.")
      .optional(),
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
      "Optional. Defines whether the instance has integrity monitoring enabled. This can be set to true only if the VM boot option is EFI, and vTPM is enabled.",
    ).optional(),
    enableVtpm: z.boolean().describe(
      "Optional. Defines whether the instance has vTPM enabled. This can be set to true only if the VM boot option is EFI.",
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
    secureBoot: z.boolean().describe(
      "Defines whether the instance has Secure Boot enabled. This can be set to true only if the VM boot option is EFI.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Optional. The service account to associate the VM with.",
    ).optional(),
    storagePool: z.string().describe(
      'Optional. If specified this will be the storage pool in which the disk is created. This is the full path of the storage pool resource, for example: "projects/my-project/zones/us-central1-a/storagePools/my-storage-pool". The storage pool must be in the same project and zone as the target disks. The storage pool\'s type must match the disk type.',
    ).optional(),
    targetProject: z.string().describe(
      "The full path of the resource of type TargetProject which represents the Compute Engine project in which to create this VM.",
    ).optional(),
    vmName: z.string().describe("The name of the VM to create.").optional(),
    zone: z.string().describe("The zone in which to create the VM.").optional(),
  }).describe(
    "ComputeEngineTargetDefaults is a collection of details for creating a VM in a target Compute Engine project.",
  ).optional(),
  currentSyncInfo: z.object({
    cycleNumber: z.number().int().describe("The cycle's ordinal number.")
      .optional(),
    endTime: z.string().describe("The time the replication cycle has ended.")
      .optional(),
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
    name: z.string().describe("The identifier of the ReplicationCycle.")
      .optional(),
    progressPercent: z.number().int().describe(
      "The current progress in percentage of this cycle. Was replaced by 'steps' field, which breaks down the cycle progression more accurately.",
    ).optional(),
    startTime: z.string().describe(
      "The time the replication cycle has started.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "RUNNING",
      "PAUSED",
      "FAILED",
      "SUCCEEDED",
    ]).describe("State of the ReplicationCycle.").optional(),
    steps: z.array(z.object({
      endTime: z.string().describe("The time the cycle step has ended.")
        .optional(),
      initializingReplication: z.object({}).describe(
        "InitializingReplicationStep contains specific step details.",
      ).optional(),
      postProcessing: z.object({}).describe(
        "PostProcessingStep contains specific step details.",
      ).optional(),
      replicating: z.object({
        lastThirtyMinutesAverageBytesPerSecond: z.string().describe(
          "The source disks replication rate for the last 30 minutes in bytes per second.",
        ).optional(),
        lastTwoMinutesAverageBytesPerSecond: z.string().describe(
          "The source disks replication rate for the last 2 minutes in bytes per second.",
        ).optional(),
        replicatedBytes: z.string().describe("Replicated bytes in the step.")
          .optional(),
        totalBytes: z.string().describe(
          "Total bytes to be handled in the step.",
        ).optional(),
      }).describe("ReplicatingStep contains specific step details.").optional(),
      startTime: z.string().describe("The time the cycle step has started.")
        .optional(),
    })).describe("The cycle's steps list representing its progress.")
      .optional(),
    totalPauseDuration: z.string().describe(
      "The accumulated duration the replication cycle was paused.",
    ).optional(),
    warnings: z.array(z.object({
      actionItem: z.object({
        locale: z.string().describe(
          'The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"',
        ).optional(),
        message: z.string().describe(
          "The localized error message in the above locale.",
        ).optional(),
      }).describe(
        "Provides a localized error message that is safe to return to the user which can be attached to an RPC error.",
      ).optional(),
      code: z.enum(["WARNING_CODE_UNSPECIFIED", "ADAPTATION_WARNING"]).describe(
        "The warning code.",
      ).optional(),
      helpLinks: z.array(z.object({
        description: z.unknown().describe("Describes what the link offers.")
          .optional(),
        url: z.unknown().describe("The URL of the link.").optional(),
      })).describe(
        "Output only. URL(s) pointing to additional information on handling the current warning.",
      ).optional(),
      warningMessage: z.object({
        locale: z.string().describe(
          'The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"',
        ).optional(),
        message: z.string().describe(
          "The localized error message in the above locale.",
        ).optional(),
      }).describe(
        "Provides a localized error message that is safe to return to the user which can be attached to an RPC error.",
      ).optional(),
      warningTime: z.string().describe("The time the warning occurred.")
        .optional(),
    })).describe("Output only. Warnings that occurred during the cycle.")
      .optional(),
  }).describe(
    "ReplicationCycle contains information about the current replication cycle status.",
  ).optional(),
  cutoverForecast: z.object({
    estimatedCutoverJobDuration: z.string().describe(
      "Output only. Estimation of the CutoverJob duration.",
    ).optional(),
  }).describe(
    "CutoverForecast holds information about future CutoverJobs of a MigratingVm.",
  ).optional(),
  description: z.string().describe(
    "The description attached to the migrating VM by the user.",
  ).optional(),
  displayName: z.string().describe(
    "The display name attached to the MigratingVm by the user.",
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
  expiration: z.object({
    expireTime: z.string().describe(
      "Output only. Timestamp of when this resource is considered expired.",
    ).optional(),
    extendable: z.boolean().describe(
      "Output only. Describes whether the expiration can be extended.",
    ).optional(),
    extensionCount: z.number().int().describe(
      "Output only. The number of times expiration was extended.",
    ).optional(),
  }).describe(
    "Expiration holds information about the expiration of a MigratingVm.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels of the migrating VM.",
  ).optional(),
  lastReplicationCycle: z.object({
    cycleNumber: z.number().int().describe("The cycle's ordinal number.")
      .optional(),
    endTime: z.string().describe("The time the replication cycle has ended.")
      .optional(),
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
    name: z.string().describe("The identifier of the ReplicationCycle.")
      .optional(),
    progressPercent: z.number().int().describe(
      "The current progress in percentage of this cycle. Was replaced by 'steps' field, which breaks down the cycle progression more accurately.",
    ).optional(),
    startTime: z.string().describe(
      "The time the replication cycle has started.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "RUNNING",
      "PAUSED",
      "FAILED",
      "SUCCEEDED",
    ]).describe("State of the ReplicationCycle.").optional(),
    steps: z.array(z.object({
      endTime: z.string().describe("The time the cycle step has ended.")
        .optional(),
      initializingReplication: z.object({}).describe(
        "InitializingReplicationStep contains specific step details.",
      ).optional(),
      postProcessing: z.object({}).describe(
        "PostProcessingStep contains specific step details.",
      ).optional(),
      replicating: z.object({
        lastThirtyMinutesAverageBytesPerSecond: z.string().describe(
          "The source disks replication rate for the last 30 minutes in bytes per second.",
        ).optional(),
        lastTwoMinutesAverageBytesPerSecond: z.string().describe(
          "The source disks replication rate for the last 2 minutes in bytes per second.",
        ).optional(),
        replicatedBytes: z.string().describe("Replicated bytes in the step.")
          .optional(),
        totalBytes: z.string().describe(
          "Total bytes to be handled in the step.",
        ).optional(),
      }).describe("ReplicatingStep contains specific step details.").optional(),
      startTime: z.string().describe("The time the cycle step has started.")
        .optional(),
    })).describe("The cycle's steps list representing its progress.")
      .optional(),
    totalPauseDuration: z.string().describe(
      "The accumulated duration the replication cycle was paused.",
    ).optional(),
    warnings: z.array(z.object({
      actionItem: z.object({
        locale: z.string().describe(
          'The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"',
        ).optional(),
        message: z.string().describe(
          "The localized error message in the above locale.",
        ).optional(),
      }).describe(
        "Provides a localized error message that is safe to return to the user which can be attached to an RPC error.",
      ).optional(),
      code: z.enum(["WARNING_CODE_UNSPECIFIED", "ADAPTATION_WARNING"]).describe(
        "The warning code.",
      ).optional(),
      helpLinks: z.array(z.object({
        description: z.unknown().describe("Describes what the link offers.")
          .optional(),
        url: z.unknown().describe("The URL of the link.").optional(),
      })).describe(
        "Output only. URL(s) pointing to additional information on handling the current warning.",
      ).optional(),
      warningMessage: z.object({
        locale: z.string().describe(
          'The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"',
        ).optional(),
        message: z.string().describe(
          "The localized error message in the above locale.",
        ).optional(),
      }).describe(
        "Provides a localized error message that is safe to return to the user which can be attached to an RPC error.",
      ).optional(),
      warningTime: z.string().describe("The time the warning occurred.")
        .optional(),
    })).describe("Output only. Warnings that occurred during the cycle.")
      .optional(),
  }).describe(
    "ReplicationCycle contains information about the current replication cycle status.",
  ).optional(),
  lastSync: z.object({
    lastSyncTime: z.string().describe(
      "The most updated snapshot created time in the source that finished replication.",
    ).optional(),
  }).describe(
    "ReplicationSync contain information about the last replica sync to the cloud.",
  ).optional(),
  policy: z.object({
    idleDuration: z.string().describe(
      "The idle duration between replication stages.",
    ).optional(),
    skipOsAdaptation: z.boolean().describe(
      "A flag to indicate whether to skip OS adaptation during the replication sync. OS adaptation is a process where the VM's operating system undergoes changes and adaptations to fully function on Compute Engine.",
    ).optional(),
  }).describe("A policy for scheduling replications.").optional(),
  sourceVmId: z.string().describe(
    "The unique ID of the VM in the source. The VM's name in vSphere can be changed, so this is not the VM's name but rather its moRef id. This id is of the form vm-.",
  ).optional(),
  vmwareSourceVmDetails: z.object({
    architecture: z.enum([
      "VM_ARCHITECTURE_UNSPECIFIED",
      "VM_ARCHITECTURE_X86_FAMILY",
      "VM_ARCHITECTURE_ARM64",
    ]).describe("Output only. The VM architecture.").optional(),
    committedStorageBytes: z.string().describe(
      "Output only. The total size of the disks being migrated in bytes.",
    ).optional(),
    disks: z.array(z.object({
      diskNumber: z.number().int().describe(
        "Output only. The ordinal number of the disk.",
      ).optional(),
      label: z.string().describe("Output only. The disk label.").optional(),
      sizeGb: z.string().describe("Output only. Size in GB.").optional(),
    })).describe("Output only. The disks attached to the source VM.")
      .optional(),
    firmware: z.enum(["FIRMWARE_UNSPECIFIED", "EFI", "BIOS"]).describe(
      "Output only. The firmware type of the source VM.",
    ).optional(),
    vmCapabilitiesInfo: z.object({
      lastOsCapabilitiesUpdateTime: z.string().describe(
        "Output only. The last time OS capabilities list was updated.",
      ).optional(),
      osCapabilities: z.array(
        z.enum([
          "OS_CAPABILITY_UNSPECIFIED",
          "OS_CAPABILITY_NVME_STORAGE_ACCESS",
          "OS_CAPABILITY_GVNIC_NETWORK_INTERFACE",
          "OS_CAPABILITY_IDPF_NETWORK_INTERFACE",
        ]),
      ).describe(
        "Output only. Unordered list. List of certain VM OS capabilities needed for some Compute Engine features.",
      ).optional(),
    }).describe(
      "Migrating VM source information about the VM capabilities needed for some Compute Engine features.",
    ).optional(),
  }).describe("Represent the source Vmware VM details.").optional(),
  migratingVmId: z.string().describe("Required. The migratingVm identifier.")
    .optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud VM Migration Sources.MigratingVms. Registered at `@swamp/gcp/vmmigration/sources-migratingvms`. */
export const model = {
  type: "@swamp/gcp/vmmigration/sources-migratingvms",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "MigratingVm describes the VM that will be migrated from a Source environment ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a migratingVms",
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
        if (g["awsSourceVmDetails"] !== undefined) {
          body["awsSourceVmDetails"] = g["awsSourceVmDetails"];
        }
        if (g["azureSourceVmDetails"] !== undefined) {
          body["azureSourceVmDetails"] = g["azureSourceVmDetails"];
        }
        if (g["computeEngineDisksTargetDefaults"] !== undefined) {
          body["computeEngineDisksTargetDefaults"] =
            g["computeEngineDisksTargetDefaults"];
        }
        if (g["computeEngineTargetDefaults"] !== undefined) {
          body["computeEngineTargetDefaults"] =
            g["computeEngineTargetDefaults"];
        }
        if (g["currentSyncInfo"] !== undefined) {
          body["currentSyncInfo"] = g["currentSyncInfo"];
        }
        if (g["cutoverForecast"] !== undefined) {
          body["cutoverForecast"] = g["cutoverForecast"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["expiration"] !== undefined) body["expiration"] = g["expiration"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lastReplicationCycle"] !== undefined) {
          body["lastReplicationCycle"] = g["lastReplicationCycle"];
        }
        if (g["lastSync"] !== undefined) body["lastSync"] = g["lastSync"];
        if (g["policy"] !== undefined) body["policy"] = g["policy"];
        if (g["sourceVmId"] !== undefined) body["sourceVmId"] = g["sourceVmId"];
        if (g["vmwareSourceVmDetails"] !== undefined) {
          body["vmwareSourceVmDetails"] = g["vmwareSourceVmDetails"];
        }
        if (g["migratingVmId"] !== undefined) {
          body["migratingVmId"] = g["migratingVmId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY", "ACTIVE"],
              "failedValues": ["ERROR"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a migratingVms",
      arguments: z.object({
        identifier: z.string().describe("The name of the migratingVms"),
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
      description: "Update migratingVms attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["awsSourceVmDetails"] !== undefined) {
          body["awsSourceVmDetails"] = g["awsSourceVmDetails"];
        }
        if (g["azureSourceVmDetails"] !== undefined) {
          body["azureSourceVmDetails"] = g["azureSourceVmDetails"];
        }
        if (g["computeEngineDisksTargetDefaults"] !== undefined) {
          body["computeEngineDisksTargetDefaults"] =
            g["computeEngineDisksTargetDefaults"];
        }
        if (g["computeEngineTargetDefaults"] !== undefined) {
          body["computeEngineTargetDefaults"] =
            g["computeEngineTargetDefaults"];
        }
        if (g["currentSyncInfo"] !== undefined) {
          body["currentSyncInfo"] = g["currentSyncInfo"];
        }
        if (g["cutoverForecast"] !== undefined) {
          body["cutoverForecast"] = g["cutoverForecast"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["expiration"] !== undefined) body["expiration"] = g["expiration"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["lastReplicationCycle"] !== undefined) {
          body["lastReplicationCycle"] = g["lastReplicationCycle"];
        }
        if (g["lastSync"] !== undefined) body["lastSync"] = g["lastSync"];
        if (g["policy"] !== undefined) body["policy"] = g["policy"];
        if (g["sourceVmId"] !== undefined) body["sourceVmId"] = g["sourceVmId"];
        if (g["vmwareSourceVmDetails"] !== undefined) {
          body["vmwareSourceVmDetails"] = g["vmwareSourceVmDetails"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY", "ACTIVE"],
              "failedValues": ["ERROR"],
            }
            : undefined,
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
      description: "Delete the migratingVms",
      arguments: z.object({
        identifier: z.string().describe("The name of the migratingVms"),
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
      description: "Sync migratingVms state from GCP",
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
    extend_migration: {
      description: "extend migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["migratingVm"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmmigration.projects.locations.sources.migratingVms.extendMigration",
            "path": "v1/{+migratingVm}:extendMigration",
            "httpMethod": "POST",
            "parameterOrder": ["migratingVm"],
            "parameters": {
              "migratingVm": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    finalize_migration: {
      description: "finalize migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["migratingVm"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmmigration.projects.locations.sources.migratingVms.finalizeMigration",
            "path": "v1/{+migratingVm}:finalizeMigration",
            "httpMethod": "POST",
            "parameterOrder": ["migratingVm"],
            "parameters": {
              "migratingVm": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    pause_migration: {
      description: "pause migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["migratingVm"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmmigration.projects.locations.sources.migratingVms.pauseMigration",
            "path": "v1/{+migratingVm}:pauseMigration",
            "httpMethod": "POST",
            "parameterOrder": ["migratingVm"],
            "parameters": {
              "migratingVm": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    resume_migration: {
      description: "resume migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["migratingVm"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmmigration.projects.locations.sources.migratingVms.resumeMigration",
            "path": "v1/{+migratingVm}:resumeMigration",
            "httpMethod": "POST",
            "parameterOrder": ["migratingVm"],
            "parameters": {
              "migratingVm": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    start_migration: {
      description: "start migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["migratingVm"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmmigration.projects.locations.sources.migratingVms.startMigration",
            "path": "v1/{+migratingVm}:startMigration",
            "httpMethod": "POST",
            "parameterOrder": ["migratingVm"],
            "parameters": {
              "migratingVm": { "location": "path", "required": true },
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
