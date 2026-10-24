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

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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
      }).describe("Optional. The encryption to apply to the disk.").optional(),
      sourceDiskNumber: z.number().int().describe(
        "Required. The ordinal number of the source VM disk.",
      ).optional(),
      vmAttachmentDetails: z.object({
        deviceName: z.string().describe(
          "Optional. Specifies a unique device name of your choice that is reflected into the /dev/disk/by-id/google-* tree of a Linux operating system running within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
        ).optional(),
      }).describe(
        "Optional. Details for attachment of the disk to a VM. Used when the disk is set to be attached to a target VM.",
      ).optional(),
    })).describe("The details of each Persistent Disk to create.").optional(),
    disksTargetDefaults: z.object({}).describe(
      "Details of the disk only migration target.",
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
        }).describe("Optional. The encryption to apply to the boot disk.")
          .optional(),
        image: z.object({
          sourceImage: z.string().describe(
            "Required. The Image resource used when creating the disk.",
          ).optional(),
        }).describe("The image to use when creating the disk.").optional(),
      }).describe("Optional. Details of the boot disk of the VM.").optional(),
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
        "Optional. Compute instance scheduling information (if empty default is used).",
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
      }).describe("Optional. The encryption to apply to the VM.").optional(),
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
    }).describe("Details of the VM migration target.").optional(),
    zone: z.string().describe(
      "The zone in which to create the Persistent Disks.",
    ).optional(),
  }).describe("Details of the target Persistent Disks in Compute Engine.")
    .optional(),
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
      "Output only. The OS license returned from the adaptation module report.",
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
      "Compute instance scheduling information (if empty default is used).",
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
      }).describe("Optional. The encryption to apply to the disk.").optional(),
      sourceDiskNumber: z.number().int().describe(
        "Required. The ordinal number of the source VM disk.",
      ).optional(),
      vmAttachmentDetails: z.object({
        deviceName: z.string().describe(
          "Optional. Specifies a unique device name of your choice that is reflected into the /dev/disk/by-id/google-* tree of a Linux operating system running within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
        ).optional(),
      }).describe(
        "Optional. Details for attachment of the disk to a VM. Used when the disk is set to be attached to a target VM.",
      ).optional(),
    })).describe("Optional. The details of each disk to create.").optional(),
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
    }).describe("Optional. Immutable. The encryption to apply to the VM disks.")
      .optional(),
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
  }).describe("Details of the target VM in Compute Engine.").optional(),
  description: z.string().describe(
    "The description attached to the migrating VM by the user.",
  ).optional(),
  displayName: z.string().describe(
    "The display name attached to the MigratingVm by the user.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels of the migrating VM.",
  ).optional(),
  policy: z.object({
    idleDuration: z.string().describe(
      "The idle duration between replication stages.",
    ).optional(),
    skipOsAdaptation: z.boolean().describe(
      "A flag to indicate whether to skip OS adaptation during the replication sync. OS adaptation is a process where the VM's operating system undergoes changes and adaptations to fully function on Compute Engine.",
    ).optional(),
  }).describe("The replication schedule policy.").optional(),
  sourceVmId: z.string().describe(
    "The unique ID of the VM in the source. The VM's name in vSphere can be changed, so this is not the VM's name but rather its moRef id. This id is of the form vm-.",
  ).optional(),
  migratingVmId: z.string().describe("Required. The migratingVm identifier.")
    .optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
      }).describe("Optional. The encryption to apply to the disk.").optional(),
      sourceDiskNumber: z.number().int().describe(
        "Required. The ordinal number of the source VM disk.",
      ).optional(),
      vmAttachmentDetails: z.object({
        deviceName: z.string().describe(
          "Optional. Specifies a unique device name of your choice that is reflected into the /dev/disk/by-id/google-* tree of a Linux operating system running within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
        ).optional(),
      }).describe(
        "Optional. Details for attachment of the disk to a VM. Used when the disk is set to be attached to a target VM.",
      ).optional(),
    })).describe("The details of each Persistent Disk to create.").optional(),
    disksTargetDefaults: z.object({}).describe(
      "Details of the disk only migration target.",
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
        }).describe("Optional. The encryption to apply to the boot disk.")
          .optional(),
        image: z.object({
          sourceImage: z.string().describe(
            "Required. The Image resource used when creating the disk.",
          ).optional(),
        }).describe("The image to use when creating the disk.").optional(),
      }).describe("Optional. Details of the boot disk of the VM.").optional(),
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
        "Optional. Compute instance scheduling information (if empty default is used).",
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
      }).describe("Optional. The encryption to apply to the VM.").optional(),
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
    }).describe("Details of the VM migration target.").optional(),
    zone: z.string().describe(
      "The zone in which to create the Persistent Disks.",
    ).optional(),
  }).describe("Details of the target Persistent Disks in Compute Engine.")
    .optional(),
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
      "Output only. The OS license returned from the adaptation module report.",
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
      "Compute instance scheduling information (if empty default is used).",
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
      }).describe("Optional. The encryption to apply to the disk.").optional(),
      sourceDiskNumber: z.number().int().describe(
        "Required. The ordinal number of the source VM disk.",
      ).optional(),
      vmAttachmentDetails: z.object({
        deviceName: z.string().describe(
          "Optional. Specifies a unique device name of your choice that is reflected into the /dev/disk/by-id/google-* tree of a Linux operating system running within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
        ).optional(),
      }).describe(
        "Optional. Details for attachment of the disk to a VM. Used when the disk is set to be attached to a target VM.",
      ).optional(),
    })).describe("Optional. The details of each disk to create.").optional(),
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
    }).describe("Optional. Immutable. The encryption to apply to the VM disks.")
      .optional(),
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
  }).describe("Details of the target VM in Compute Engine.").optional(),
  description: z.string().describe(
    "The description attached to the migrating VM by the user.",
  ).optional(),
  displayName: z.string().describe(
    "The display name attached to the MigratingVm by the user.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels of the migrating VM.",
  ).optional(),
  policy: z.object({
    idleDuration: z.string().describe(
      "The idle duration between replication stages.",
    ).optional(),
    skipOsAdaptation: z.boolean().describe(
      "A flag to indicate whether to skip OS adaptation during the replication sync. OS adaptation is a process where the VM's operating system undergoes changes and adaptations to fully function on Compute Engine.",
    ).optional(),
  }).describe("The replication schedule policy.").optional(),
  sourceVmId: z.string().describe(
    "The unique ID of the VM in the source. The VM's name in vSphere can be changed, so this is not the VM's name but rather its moRef id. This id is of the form vm-.",
  ).optional(),
  migratingVmId: z.string().describe("Required. The migratingVm identifier.")
    .optional(),
  requestId: z.string().describe(
    "A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud VM Migration Sources.MigratingVms. Registered at `@swamp/gcp/vmmigration/sources-migratingvms`. */
export const model = {
  type: "@swamp/gcp/vmmigration/sources-migratingvms",
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
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
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
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description:
        "Removed: awsSourceVmDetails, azureSourceVmDetails, currentSyncInfo, cutoverForecast, error, expiration, lastReplicationCycle, lastSync, vmwareSourceVmDetails",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          awsSourceVmDetails: _awsSourceVmDetails,
          azureSourceVmDetails: _azureSourceVmDetails,
          currentSyncInfo: _currentSyncInfo,
          cutoverForecast: _cutoverForecast,
          error: _error,
          expiration: _expiration,
          lastReplicationCycle: _lastReplicationCycle,
          lastSync: _lastSync,
          vmwareSourceVmDetails: _vmwareSourceVmDetails,
          ...rest
        } = old;
        return rest;
      },
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
      toVersion: "2026.07.21.4",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["computeEngineDisksTargetDefaults"] !== undefined) {
          body["computeEngineDisksTargetDefaults"] =
            g["computeEngineDisksTargetDefaults"];
        }
        if (g["computeEngineTargetDefaults"] !== undefined) {
          body["computeEngineTargetDefaults"] =
            g["computeEngineTargetDefaults"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["policy"] !== undefined) body["policy"] = g["policy"];
        if (g["sourceVmId"] !== undefined) body["sourceVmId"] = g["sourceVmId"];
        if (g["migratingVmId"] !== undefined) {
          params["migratingVmId"] = String(g["migratingVmId"]);
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
    update: {
      description: "Update migratingVms attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific migratingVms by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
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
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["computeEngineDisksTargetDefaults"] !== undefined) {
          body["computeEngineDisksTargetDefaults"] =
            g["computeEngineDisksTargetDefaults"];
        }
        if (g["computeEngineTargetDefaults"] !== undefined) {
          body["computeEngineTargetDefaults"] =
            g["computeEngineTargetDefaults"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["policy"] !== undefined) body["policy"] = g["policy"];
        if (g["sourceVmId"] !== undefined) body["sourceVmId"] = g["sourceVmId"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
          credentials,
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
      description: "Sync migratingVms state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific migratingVms by name (e.g. one discovered by list)",
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
      description: "List migratingVms resources",
      arguments: z.object({
        filter: z.string().describe("Optional. The filter request.").optional(),
        orderBy: z.string().describe(
          "Optional. the order by fields for the result.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of migrating VMs to return. The service may return fewer than this value. If unspecified, at most 500 migrating VMs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        view: z.string().describe(
          "Optional. The level of details of each migrating VM.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "migratingVms",
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
    extend_migration: {
      description: "extend migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    finalize_migration: {
      description: "finalize migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    pause_migration: {
      description: "pause migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    resume_migration: {
      description: "resume migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    start_migration: {
      description: "start migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
