// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/notebooks/runtimes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Notebooks Runtimes.
 *
 * The definition of a Runtime for a managed notebook instance.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/runtimes/${shortName}`;
}

const BASE_URL = "https://notebooks.googleapis.com/";

const GET_CONFIG = {
  "id": "notebooks.projects.locations.runtimes.get",
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
  "id": "notebooks.projects.locations.runtimes.create",
  "path": "v1/{+parent}/runtimes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "runtimeId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "notebooks.projects.locations.runtimes.patch",
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
  "id": "notebooks.projects.locations.runtimes.delete",
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
  "id": "notebooks.projects.locations.runtimes.list",
  "path": "v1/{+parent}/runtimes",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  accessConfig: z.object({
    accessType: z.enum([
      "RUNTIME_ACCESS_TYPE_UNSPECIFIED",
      "SINGLE_USER",
      "SERVICE_ACCOUNT",
    ]).describe("The type of access mode this instance.").optional(),
    proxyUri: z.string().describe(
      "Output only. The proxy endpoint that is used to access the runtime.",
    ).optional(),
    runtimeOwner: z.string().describe(
      "The owner of this runtime after creation. Format: `alias@example.com` Currently supports one owner only.",
    ).optional(),
  }).describe("Specifies the login configuration for Runtime").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels to associate with this Managed Notebook or Runtime. Label **keys** must contain 1 to 63 characters, and must conform to [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt). Label **values** may be empty, but, if present, must contain 1 to 63 characters, and must conform to [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a cluster.",
  ).optional(),
  metrics: z.object({
    systemMetrics: z.record(z.string(), z.string()).describe(
      "Output only. The system metrics.",
    ).optional(),
  }).describe(
    "Contains runtime daemon metrics, such as OS and kernels and sessions stats.",
  ).optional(),
  runtimeMigrationEligibility: z.object({
    errors: z.array(z.enum(["ERROR_UNSPECIFIED", "CUSTOM_CONTAINER"])).describe(
      "Output only. Certain configurations make the GmN ineligible for an automatic migration. A manual migration is required.",
    ).optional(),
    warnings: z.array(
      z.enum([
        "WARNING_UNSPECIFIED",
        "UNSUPPORTED_ACCELERATOR_TYPE",
        "UNSUPPORTED_OS",
        "RESERVED_IP_RANGE",
        "GOOGLE_MANAGED_NETWORK",
        "POST_STARTUP_SCRIPT",
        "SINGLE_USER",
      ]),
    ).describe(
      "Output only. Certain configurations will be defaulted during the migration.",
    ).optional(),
  }).describe(
    "RuntimeMigrationEligibility represents the feasibility information of a migration from GmN to WbI.",
  ).optional(),
  softwareConfig: z.object({
    customGpuDriverPath: z.string().describe(
      "Specify a custom Cloud Storage path where the GPU driver is stored. If not specified, we'll automatically choose from official GPU drivers.",
    ).optional(),
    disableTerminal: z.boolean().describe(
      "Bool indicating whether JupyterLab terminal will be available or not. Default: False",
    ).optional(),
    enableHealthMonitoring: z.boolean().describe(
      "Verifies core internal services are running. Default: True",
    ).optional(),
    idleShutdown: z.boolean().describe(
      "Runtime will automatically shutdown after idle_shutdown_time. Default: True",
    ).optional(),
    idleShutdownTimeout: z.number().int().describe(
      "Time in minutes to wait before shutting down runtime. Default: 180 minutes",
    ).optional(),
    installGpuDriver: z.boolean().describe(
      "Install Nvidia Driver automatically. Default: True",
    ).optional(),
    kernels: z.array(z.object({
      repository: z.string().describe(
        "Required. The path to the container image repository. For example: `gcr.io/{project_id}/{image_name}`",
      ).optional(),
      tag: z.string().describe(
        "The tag of the container image. If not specified, this defaults to the latest tag.",
      ).optional(),
    })).describe(
      "Optional. Use a list of container images to use as Kernels in the notebook instance.",
    ).optional(),
    mixerDisabled: z.boolean().describe(
      "Bool indicating whether mixer client should be disabled. Default: False",
    ).optional(),
    notebookUpgradeSchedule: z.string().describe(
      "Cron expression in UTC timezone, used to schedule instance auto upgrade. Please follow the [cron format](https://en.wikipedia.org/wiki/Cron).",
    ).optional(),
    postStartupScript: z.string().describe(
      "Path to a Bash script that automatically runs after a notebook instance fully boots up. The path must be a URL or Cloud Storage path (`gs://path-to-file/file-name`).",
    ).optional(),
    postStartupScriptBehavior: z.enum([
      "POST_STARTUP_SCRIPT_BEHAVIOR_UNSPECIFIED",
      "RUN_EVERY_START",
      "DOWNLOAD_AND_RUN_EVERY_START",
    ]).describe("Behavior for the post startup script.").optional(),
    upgradeable: z.boolean().describe(
      "Output only. Bool indicating whether an newer image is available in an image family.",
    ).optional(),
    version: z.string().describe(
      "Output only. version of boot image such as M100, from release label of the image.",
    ).optional(),
  }).describe(
    "Specifies the selection and configuration of software inside the runtime. The properties to set on runtime. Properties keys are specified in `key:value` format, for example: * `idle_shutdown: true` * `idle_shutdown_timeout: 180` * `enable_health_monitoring: true`",
  ).optional(),
  virtualMachine: z.object({
    instanceId: z.string().describe(
      "Output only. The unique identifier of the Managed Compute Engine instance.",
    ).optional(),
    instanceName: z.string().describe(
      "Output only. The user-friendly name of the Managed Compute Engine instance.",
    ).optional(),
    virtualMachineConfig: z.object({
      acceleratorConfig: z.object({
        coreCount: z.string().describe("Count of cores of this accelerator.")
          .optional(),
        type: z.enum([
          "ACCELERATOR_TYPE_UNSPECIFIED",
          "NVIDIA_TESLA_K80",
          "NVIDIA_TESLA_P100",
          "NVIDIA_TESLA_V100",
          "NVIDIA_TESLA_P4",
          "NVIDIA_TESLA_T4",
          "NVIDIA_TESLA_A100",
          "NVIDIA_L4",
          "TPU_V2",
          "TPU_V3",
          "NVIDIA_TESLA_T4_VWS",
          "NVIDIA_TESLA_P100_VWS",
          "NVIDIA_TESLA_P4_VWS",
        ]).describe("Accelerator model.").optional(),
      }).describe(
        "Definition of the types of hardware accelerators that can be used. See [Compute Engine AcceleratorTypes](https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes). Examples: * `nvidia-tesla-k80` * `nvidia-tesla-p100` * `nvidia-tesla-v100` * `nvidia-tesla-p4` * `nvidia-tesla-t4` * `nvidia-tesla-a100`",
      ).optional(),
      bootImage: z.object({}).describe(
        "Definition of the boot image used by the Runtime. Used to facilitate runtime upgradeability.",
      ).optional(),
      containerImages: z.array(z.object({
        repository: z.string().describe(
          "Required. The path to the container image repository. For example: `gcr.io/{project_id}/{image_name}`",
        ).optional(),
        tag: z.string().describe(
          "The tag of the container image. If not specified, this defaults to the latest tag.",
        ).optional(),
      })).describe(
        "Optional. Use a list of container images to use as Kernels in the notebook instance.",
      ).optional(),
      dataDisk: z.object({
        autoDelete: z.boolean().describe(
          "Optional. Output only. Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance).",
        ).optional(),
        boot: z.boolean().describe(
          "Optional. Output only. Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem.",
        ).optional(),
        deviceName: z.string().describe(
          "Optional. Output only. Specifies a unique device name of your choice that is reflected into the `/dev/disk/by-id/google-*` tree of a Linux operating system running within the instance. This name can be used to reference the device for mounting, resizing, and so on, from within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
        ).optional(),
        guestOsFeatures: z.array(z.object({
          type: z.unknown().describe(
            "The ID of a supported feature. Read [Enabling guest operating system features](https://cloud.google.com/compute/docs/images/create-delete-deprecate-private-images#guest-os-features) to see a list of available options. Valid values: * `FEATURE_TYPE_UNSPECIFIED` * `MULTI_IP_SUBNET` * `SECURE_BOOT` * `UEFI_COMPATIBLE` * `VIRTIO_SCSI_MULTIQUEUE` * `WINDOWS`",
          ).optional(),
        })).describe(
          "Output only. Indicates a list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options.",
        ).optional(),
        index: z.number().int().describe(
          "Output only. A zero-based index to this disk, where 0 is reserved for the boot disk. If you have many disks attached to an instance, each disk would have a unique index number.",
        ).optional(),
        initializeParams: z.object({
          description: z.string().describe(
            "Optional. Provide this property when creating the disk.",
          ).optional(),
          diskName: z.string().describe(
            "Optional. Specifies the disk name. If not specified, the default is to use the name of the instance. If the disk with the instance name exists already in the given zone/region, a new name will be automatically generated.",
          ).optional(),
          diskSizeGb: z.string().describe(
            "Optional. Specifies the size of the disk in base-2 GB. If not specified, the disk will be the same size as the image (usually 10GB). If specified, the size must be equal to or larger than 10GB. Default 100 GB.",
          ).optional(),
          diskType: z.enum([
            "DISK_TYPE_UNSPECIFIED",
            "PD_STANDARD",
            "PD_SSD",
            "PD_BALANCED",
            "PD_EXTREME",
          ]).describe(
            "Input only. The type of the boot disk attached to this instance, defaults to standard persistent disk (`PD_STANDARD`).",
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            "Optional. Labels to apply to this disk. These can be later modified by the disks.setLabels method. This field is only applicable for persistent disks.",
          ).optional(),
        }).describe(
          "Input only. Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new runtime. This property is mutually exclusive with the source property; you can only define one or the other, but not both.",
        ).optional(),
        interface: z.string().describe(
          "Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. The default is SCSI. Persistent disks must always use SCSI and the request will fail if you attempt to attach a persistent disk in any other format than SCSI. Local SSDs can use either NVME or SCSI. For performance characteristics of SCSI over NVMe, see Local SSD performance. Valid values: * `NVME` * `SCSI`",
        ).optional(),
        kind: z.string().describe(
          "Output only. Type of the resource. Always compute#attachedDisk for attached disks.",
        ).optional(),
        licenses: z.array(z.string()).describe(
          "Output only. Any valid publicly visible licenses.",
        ).optional(),
        mode: z.string().describe(
          "The mode in which to attach this disk, either `READ_WRITE` or `READ_ONLY`. If not specified, the default is to attach the disk in `READ_WRITE` mode. Valid values: * `READ_ONLY` * `READ_WRITE`",
        ).optional(),
        source: z.string().describe(
          "Specifies a valid partial or full URL to an existing Persistent Disk resource.",
        ).optional(),
        type: z.string().describe(
          "Specifies the type of the disk, either `SCRATCH` or `PERSISTENT`. If not specified, the default is `PERSISTENT`. Valid values: * `PERSISTENT` * `SCRATCH`",
        ).optional(),
      }).describe("A Local attached disk resource.").optional(),
      encryptionConfig: z.object({
        kmsKey: z.string().describe(
          "The Cloud KMS resource identifier of the customer-managed encryption key used to protect a resource, such as a disks. It has the following format: `projects/{PROJECT_ID}/locations/{REGION}/keyRings/{KEY_RING_NAME}/cryptoKeys/{KEY_NAME}`",
        ).optional(),
      }).describe(
        "Represents a custom encryption key configuration that can be applied to a resource. This will encrypt all disks in Virtual Machine.",
      ).optional(),
      guestAttributes: z.record(z.string(), z.string()).describe(
        "Output only. The Compute Engine guest attributes. (see [Project and instance guest attributes](https://cloud.google.com/compute/docs/storing-retrieving-metadata#guest_attributes)).",
      ).optional(),
      internalIpOnly: z.boolean().describe(
        "Optional. If true, runtime will only have internal IP addresses. By default, runtimes are not restricted to internal IP addresses, and will have ephemeral external IP addresses assigned to each vm. This `internal_ip_only` restriction can only be enabled for subnetwork enabled networks, and all dependencies must be configured to be accessible without external IP addresses.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. The labels to associate with this runtime. Label **keys** must contain 1 to 63 characters, and must conform to [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt). Label **values** may be empty, but, if present, must contain 1 to 63 characters, and must conform to [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a cluster.",
      ).optional(),
      machineType: z.string().describe(
        "Required. The Compute Engine machine type used for runtimes. Short name is valid. Examples: * `n1-standard-2` * `e2-standard-8`",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Optional. The Compute Engine metadata entries to add to virtual machine. (see [Project and instance metadata](https://cloud.google.com/compute/docs/storing-retrieving-metadata#project_and_instance_metadata)).",
      ).optional(),
      network: z.string().describe(
        'Optional. The Compute Engine network to be used for machine communications. Cannot be specified with subnetwork. If neither `network` nor `subnet` is specified, the "default" network of the project is used, if it exists. A full URL or partial URI. Examples: * `https://www.googleapis.com/compute/v1/projects/[project_id]/global/networks/default` * `projects/[project_id]/global/networks/default` Runtimes are managed resources inside Google Infrastructure. Runtimes support the following network configurations: * Google Managed Network (Network & subnet are empty) * Consumer Project VPC (network & subnet are required). Requires configuring Private Service Access. * Shared VPC (network & subnet are required). Requires configuring Private Service Access.',
      ).optional(),
      nicType: z.enum(["UNSPECIFIED_NIC_TYPE", "VIRTIO_NET", "GVNIC"]).describe(
        "Optional. The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet.",
      ).optional(),
      reservedIpRange: z.string().describe(
        'Optional. Reserved IP Range name is used for VPC Peering. The subnetwork allocation will use the range *name* if it\'s assigned. Example: managed-notebooks-range-c PEERING_RANGE_NAME_3=managed-notebooks-range-c gcloud compute addresses create $PEERING_RANGE_NAME_3 \\ --global \\ --prefix-length=24 \\ --description="Google Cloud Managed Notebooks Range 24 c" \\ --network=$NETWORK \\ --addresses=192.168.0.0 \\ --purpose=VPC_PEERING Field value will be: `managed-notebooks-range-c`',
      ).optional(),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean().describe(
          "Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created. Enabled by default.",
        ).optional(),
        enableSecureBoot: z.boolean().describe(
          "Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails. Disabled by default.",
        ).optional(),
        enableVtpm: z.boolean().describe(
          "Defines whether the instance has the vTPM enabled. Enabled by default.",
        ).optional(),
      }).describe(
        "A set of Shielded Instance options. See [Images using supported Shielded VM features](https://cloud.google.com/compute/docs/instances/modifying-shielded-vm). Not all combinations are valid.",
      ).optional(),
      subnet: z.string().describe(
        "Optional. The Compute Engine subnetwork to be used for machine communications. Cannot be specified with network. A full URL or partial URI are valid. Examples: * `https://www.googleapis.com/compute/v1/projects/[project_id]/regions/us-east1/subnetworks/sub0` * `projects/[project_id]/regions/us-east1/subnetworks/sub0`",
      ).optional(),
      tags: z.array(z.string()).describe(
        "Optional. The Compute Engine network tags to add to runtime (see [Add network tags](https://cloud.google.com/vpc/docs/add-remove-network-tags)).",
      ).optional(),
      zone: z.string().describe(
        "Output only. The zone where the virtual machine is located. If using regional request, the notebooks service will pick a location in the corresponding runtime region. On a get request, zone will always be present. Example: * `us-central1-b`",
      ).optional(),
    }).describe("The config settings for virtual machine.").optional(),
  }).describe("Runtime using Virtual Machine for computing.").optional(),
  requestId: z.string().describe("Idempotent request UUID.").optional(),
  runtimeId: z.string().describe(
    "Required. User-defined unique ID of this Runtime.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  accessConfig: z.object({
    accessType: z.string(),
    proxyUri: z.string(),
    runtimeOwner: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  healthState: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  metrics: z.object({
    systemMetrics: z.record(z.string(), z.unknown()),
  }).optional(),
  migrated: z.boolean().optional(),
  name: z.string(),
  runtimeMigrationEligibility: z.object({
    errors: z.array(z.string()),
    warnings: z.array(z.string()),
  }).optional(),
  softwareConfig: z.object({
    customGpuDriverPath: z.string(),
    disableTerminal: z.boolean(),
    enableHealthMonitoring: z.boolean(),
    idleShutdown: z.boolean(),
    idleShutdownTimeout: z.number(),
    installGpuDriver: z.boolean(),
    kernels: z.array(z.object({
      repository: z.string(),
      tag: z.string(),
    })),
    mixerDisabled: z.boolean(),
    notebookUpgradeSchedule: z.string(),
    postStartupScript: z.string(),
    postStartupScriptBehavior: z.string(),
    upgradeable: z.boolean(),
    version: z.string(),
  }).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  virtualMachine: z.object({
    instanceId: z.string(),
    instanceName: z.string(),
    virtualMachineConfig: z.object({
      acceleratorConfig: z.object({
        coreCount: z.string(),
        type: z.string(),
      }),
      bootImage: z.object({}),
      containerImages: z.array(z.object({
        repository: z.string(),
        tag: z.string(),
      })),
      dataDisk: z.object({
        autoDelete: z.boolean(),
        boot: z.boolean(),
        deviceName: z.string(),
        guestOsFeatures: z.array(z.object({
          type: z.unknown(),
        })),
        index: z.number(),
        initializeParams: z.object({
          description: z.string(),
          diskName: z.string(),
          diskSizeGb: z.string(),
          diskType: z.string(),
          labels: z.record(z.string(), z.unknown()),
        }),
        interface: z.string(),
        kind: z.string(),
        licenses: z.array(z.string()),
        mode: z.string(),
        source: z.string(),
        type: z.string(),
      }),
      encryptionConfig: z.object({
        kmsKey: z.string(),
      }),
      guestAttributes: z.record(z.string(), z.unknown()),
      internalIpOnly: z.boolean(),
      labels: z.record(z.string(), z.unknown()),
      machineType: z.string(),
      metadata: z.record(z.string(), z.unknown()),
      network: z.string(),
      nicType: z.string(),
      reservedIpRange: z.string(),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean(),
        enableSecureBoot: z.boolean(),
        enableVtpm: z.boolean(),
      }),
      subnet: z.string(),
      tags: z.array(z.string()),
      zone: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  accessConfig: z.object({
    accessType: z.enum([
      "RUNTIME_ACCESS_TYPE_UNSPECIFIED",
      "SINGLE_USER",
      "SERVICE_ACCOUNT",
    ]).describe("The type of access mode this instance.").optional(),
    proxyUri: z.string().describe(
      "Output only. The proxy endpoint that is used to access the runtime.",
    ).optional(),
    runtimeOwner: z.string().describe(
      "The owner of this runtime after creation. Format: `alias@example.com` Currently supports one owner only.",
    ).optional(),
  }).describe("Specifies the login configuration for Runtime").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels to associate with this Managed Notebook or Runtime. Label **keys** must contain 1 to 63 characters, and must conform to [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt). Label **values** may be empty, but, if present, must contain 1 to 63 characters, and must conform to [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a cluster.",
  ).optional(),
  metrics: z.object({
    systemMetrics: z.record(z.string(), z.string()).describe(
      "Output only. The system metrics.",
    ).optional(),
  }).describe(
    "Contains runtime daemon metrics, such as OS and kernels and sessions stats.",
  ).optional(),
  runtimeMigrationEligibility: z.object({
    errors: z.array(z.enum(["ERROR_UNSPECIFIED", "CUSTOM_CONTAINER"])).describe(
      "Output only. Certain configurations make the GmN ineligible for an automatic migration. A manual migration is required.",
    ).optional(),
    warnings: z.array(
      z.enum([
        "WARNING_UNSPECIFIED",
        "UNSUPPORTED_ACCELERATOR_TYPE",
        "UNSUPPORTED_OS",
        "RESERVED_IP_RANGE",
        "GOOGLE_MANAGED_NETWORK",
        "POST_STARTUP_SCRIPT",
        "SINGLE_USER",
      ]),
    ).describe(
      "Output only. Certain configurations will be defaulted during the migration.",
    ).optional(),
  }).describe(
    "RuntimeMigrationEligibility represents the feasibility information of a migration from GmN to WbI.",
  ).optional(),
  softwareConfig: z.object({
    customGpuDriverPath: z.string().describe(
      "Specify a custom Cloud Storage path where the GPU driver is stored. If not specified, we'll automatically choose from official GPU drivers.",
    ).optional(),
    disableTerminal: z.boolean().describe(
      "Bool indicating whether JupyterLab terminal will be available or not. Default: False",
    ).optional(),
    enableHealthMonitoring: z.boolean().describe(
      "Verifies core internal services are running. Default: True",
    ).optional(),
    idleShutdown: z.boolean().describe(
      "Runtime will automatically shutdown after idle_shutdown_time. Default: True",
    ).optional(),
    idleShutdownTimeout: z.number().int().describe(
      "Time in minutes to wait before shutting down runtime. Default: 180 minutes",
    ).optional(),
    installGpuDriver: z.boolean().describe(
      "Install Nvidia Driver automatically. Default: True",
    ).optional(),
    kernels: z.array(z.object({
      repository: z.string().describe(
        "Required. The path to the container image repository. For example: `gcr.io/{project_id}/{image_name}`",
      ).optional(),
      tag: z.string().describe(
        "The tag of the container image. If not specified, this defaults to the latest tag.",
      ).optional(),
    })).describe(
      "Optional. Use a list of container images to use as Kernels in the notebook instance.",
    ).optional(),
    mixerDisabled: z.boolean().describe(
      "Bool indicating whether mixer client should be disabled. Default: False",
    ).optional(),
    notebookUpgradeSchedule: z.string().describe(
      "Cron expression in UTC timezone, used to schedule instance auto upgrade. Please follow the [cron format](https://en.wikipedia.org/wiki/Cron).",
    ).optional(),
    postStartupScript: z.string().describe(
      "Path to a Bash script that automatically runs after a notebook instance fully boots up. The path must be a URL or Cloud Storage path (`gs://path-to-file/file-name`).",
    ).optional(),
    postStartupScriptBehavior: z.enum([
      "POST_STARTUP_SCRIPT_BEHAVIOR_UNSPECIFIED",
      "RUN_EVERY_START",
      "DOWNLOAD_AND_RUN_EVERY_START",
    ]).describe("Behavior for the post startup script.").optional(),
    upgradeable: z.boolean().describe(
      "Output only. Bool indicating whether an newer image is available in an image family.",
    ).optional(),
    version: z.string().describe(
      "Output only. version of boot image such as M100, from release label of the image.",
    ).optional(),
  }).describe(
    "Specifies the selection and configuration of software inside the runtime. The properties to set on runtime. Properties keys are specified in `key:value` format, for example: * `idle_shutdown: true` * `idle_shutdown_timeout: 180` * `enable_health_monitoring: true`",
  ).optional(),
  virtualMachine: z.object({
    instanceId: z.string().describe(
      "Output only. The unique identifier of the Managed Compute Engine instance.",
    ).optional(),
    instanceName: z.string().describe(
      "Output only. The user-friendly name of the Managed Compute Engine instance.",
    ).optional(),
    virtualMachineConfig: z.object({
      acceleratorConfig: z.object({
        coreCount: z.string().describe("Count of cores of this accelerator.")
          .optional(),
        type: z.enum([
          "ACCELERATOR_TYPE_UNSPECIFIED",
          "NVIDIA_TESLA_K80",
          "NVIDIA_TESLA_P100",
          "NVIDIA_TESLA_V100",
          "NVIDIA_TESLA_P4",
          "NVIDIA_TESLA_T4",
          "NVIDIA_TESLA_A100",
          "NVIDIA_L4",
          "TPU_V2",
          "TPU_V3",
          "NVIDIA_TESLA_T4_VWS",
          "NVIDIA_TESLA_P100_VWS",
          "NVIDIA_TESLA_P4_VWS",
        ]).describe("Accelerator model.").optional(),
      }).describe(
        "Definition of the types of hardware accelerators that can be used. See [Compute Engine AcceleratorTypes](https://cloud.google.com/compute/docs/reference/beta/acceleratorTypes). Examples: * `nvidia-tesla-k80` * `nvidia-tesla-p100` * `nvidia-tesla-v100` * `nvidia-tesla-p4` * `nvidia-tesla-t4` * `nvidia-tesla-a100`",
      ).optional(),
      bootImage: z.object({}).describe(
        "Definition of the boot image used by the Runtime. Used to facilitate runtime upgradeability.",
      ).optional(),
      containerImages: z.array(z.object({
        repository: z.string().describe(
          "Required. The path to the container image repository. For example: `gcr.io/{project_id}/{image_name}`",
        ).optional(),
        tag: z.string().describe(
          "The tag of the container image. If not specified, this defaults to the latest tag.",
        ).optional(),
      })).describe(
        "Optional. Use a list of container images to use as Kernels in the notebook instance.",
      ).optional(),
      dataDisk: z.object({
        autoDelete: z.boolean().describe(
          "Optional. Output only. Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance).",
        ).optional(),
        boot: z.boolean().describe(
          "Optional. Output only. Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem.",
        ).optional(),
        deviceName: z.string().describe(
          "Optional. Output only. Specifies a unique device name of your choice that is reflected into the `/dev/disk/by-id/google-*` tree of a Linux operating system running within the instance. This name can be used to reference the device for mounting, resizing, and so on, from within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
        ).optional(),
        guestOsFeatures: z.array(z.object({
          type: z.unknown().describe(
            "The ID of a supported feature. Read [Enabling guest operating system features](https://cloud.google.com/compute/docs/images/create-delete-deprecate-private-images#guest-os-features) to see a list of available options. Valid values: * `FEATURE_TYPE_UNSPECIFIED` * `MULTI_IP_SUBNET` * `SECURE_BOOT` * `UEFI_COMPATIBLE` * `VIRTIO_SCSI_MULTIQUEUE` * `WINDOWS`",
          ).optional(),
        })).describe(
          "Output only. Indicates a list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options.",
        ).optional(),
        index: z.number().int().describe(
          "Output only. A zero-based index to this disk, where 0 is reserved for the boot disk. If you have many disks attached to an instance, each disk would have a unique index number.",
        ).optional(),
        initializeParams: z.object({
          description: z.string().describe(
            "Optional. Provide this property when creating the disk.",
          ).optional(),
          diskName: z.string().describe(
            "Optional. Specifies the disk name. If not specified, the default is to use the name of the instance. If the disk with the instance name exists already in the given zone/region, a new name will be automatically generated.",
          ).optional(),
          diskSizeGb: z.string().describe(
            "Optional. Specifies the size of the disk in base-2 GB. If not specified, the disk will be the same size as the image (usually 10GB). If specified, the size must be equal to or larger than 10GB. Default 100 GB.",
          ).optional(),
          diskType: z.enum([
            "DISK_TYPE_UNSPECIFIED",
            "PD_STANDARD",
            "PD_SSD",
            "PD_BALANCED",
            "PD_EXTREME",
          ]).describe(
            "Input only. The type of the boot disk attached to this instance, defaults to standard persistent disk (`PD_STANDARD`).",
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            "Optional. Labels to apply to this disk. These can be later modified by the disks.setLabels method. This field is only applicable for persistent disks.",
          ).optional(),
        }).describe(
          "Input only. Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new runtime. This property is mutually exclusive with the source property; you can only define one or the other, but not both.",
        ).optional(),
        interface: z.string().describe(
          "Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. The default is SCSI. Persistent disks must always use SCSI and the request will fail if you attempt to attach a persistent disk in any other format than SCSI. Local SSDs can use either NVME or SCSI. For performance characteristics of SCSI over NVMe, see Local SSD performance. Valid values: * `NVME` * `SCSI`",
        ).optional(),
        kind: z.string().describe(
          "Output only. Type of the resource. Always compute#attachedDisk for attached disks.",
        ).optional(),
        licenses: z.array(z.string()).describe(
          "Output only. Any valid publicly visible licenses.",
        ).optional(),
        mode: z.string().describe(
          "The mode in which to attach this disk, either `READ_WRITE` or `READ_ONLY`. If not specified, the default is to attach the disk in `READ_WRITE` mode. Valid values: * `READ_ONLY` * `READ_WRITE`",
        ).optional(),
        source: z.string().describe(
          "Specifies a valid partial or full URL to an existing Persistent Disk resource.",
        ).optional(),
        type: z.string().describe(
          "Specifies the type of the disk, either `SCRATCH` or `PERSISTENT`. If not specified, the default is `PERSISTENT`. Valid values: * `PERSISTENT` * `SCRATCH`",
        ).optional(),
      }).describe("A Local attached disk resource.").optional(),
      encryptionConfig: z.object({
        kmsKey: z.string().describe(
          "The Cloud KMS resource identifier of the customer-managed encryption key used to protect a resource, such as a disks. It has the following format: `projects/{PROJECT_ID}/locations/{REGION}/keyRings/{KEY_RING_NAME}/cryptoKeys/{KEY_NAME}`",
        ).optional(),
      }).describe(
        "Represents a custom encryption key configuration that can be applied to a resource. This will encrypt all disks in Virtual Machine.",
      ).optional(),
      guestAttributes: z.record(z.string(), z.string()).describe(
        "Output only. The Compute Engine guest attributes. (see [Project and instance guest attributes](https://cloud.google.com/compute/docs/storing-retrieving-metadata#guest_attributes)).",
      ).optional(),
      internalIpOnly: z.boolean().describe(
        "Optional. If true, runtime will only have internal IP addresses. By default, runtimes are not restricted to internal IP addresses, and will have ephemeral external IP addresses assigned to each vm. This `internal_ip_only` restriction can only be enabled for subnetwork enabled networks, and all dependencies must be configured to be accessible without external IP addresses.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Optional. The labels to associate with this runtime. Label **keys** must contain 1 to 63 characters, and must conform to [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt). Label **values** may be empty, but, if present, must contain 1 to 63 characters, and must conform to [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be associated with a cluster.",
      ).optional(),
      machineType: z.string().describe(
        "Required. The Compute Engine machine type used for runtimes. Short name is valid. Examples: * `n1-standard-2` * `e2-standard-8`",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Optional. The Compute Engine metadata entries to add to virtual machine. (see [Project and instance metadata](https://cloud.google.com/compute/docs/storing-retrieving-metadata#project_and_instance_metadata)).",
      ).optional(),
      network: z.string().describe(
        'Optional. The Compute Engine network to be used for machine communications. Cannot be specified with subnetwork. If neither `network` nor `subnet` is specified, the "default" network of the project is used, if it exists. A full URL or partial URI. Examples: * `https://www.googleapis.com/compute/v1/projects/[project_id]/global/networks/default` * `projects/[project_id]/global/networks/default` Runtimes are managed resources inside Google Infrastructure. Runtimes support the following network configurations: * Google Managed Network (Network & subnet are empty) * Consumer Project VPC (network & subnet are required). Requires configuring Private Service Access. * Shared VPC (network & subnet are required). Requires configuring Private Service Access.',
      ).optional(),
      nicType: z.enum(["UNSPECIFIED_NIC_TYPE", "VIRTIO_NET", "GVNIC"]).describe(
        "Optional. The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet.",
      ).optional(),
      reservedIpRange: z.string().describe(
        'Optional. Reserved IP Range name is used for VPC Peering. The subnetwork allocation will use the range *name* if it\'s assigned. Example: managed-notebooks-range-c PEERING_RANGE_NAME_3=managed-notebooks-range-c gcloud compute addresses create $PEERING_RANGE_NAME_3 \\ --global \\ --prefix-length=24 \\ --description="Google Cloud Managed Notebooks Range 24 c" \\ --network=$NETWORK \\ --addresses=192.168.0.0 \\ --purpose=VPC_PEERING Field value will be: `managed-notebooks-range-c`',
      ).optional(),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean().describe(
          "Defines whether the instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the instance is created. Enabled by default.",
        ).optional(),
        enableSecureBoot: z.boolean().describe(
          "Defines whether the instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails. Disabled by default.",
        ).optional(),
        enableVtpm: z.boolean().describe(
          "Defines whether the instance has the vTPM enabled. Enabled by default.",
        ).optional(),
      }).describe(
        "A set of Shielded Instance options. See [Images using supported Shielded VM features](https://cloud.google.com/compute/docs/instances/modifying-shielded-vm). Not all combinations are valid.",
      ).optional(),
      subnet: z.string().describe(
        "Optional. The Compute Engine subnetwork to be used for machine communications. Cannot be specified with network. A full URL or partial URI are valid. Examples: * `https://www.googleapis.com/compute/v1/projects/[project_id]/regions/us-east1/subnetworks/sub0` * `projects/[project_id]/regions/us-east1/subnetworks/sub0`",
      ).optional(),
      tags: z.array(z.string()).describe(
        "Optional. The Compute Engine network tags to add to runtime (see [Add network tags](https://cloud.google.com/vpc/docs/add-remove-network-tags)).",
      ).optional(),
      zone: z.string().describe(
        "Output only. The zone where the virtual machine is located. If using regional request, the notebooks service will pick a location in the corresponding runtime region. On a get request, zone will always be present. Example: * `us-central1-b`",
      ).optional(),
    }).describe("The config settings for virtual machine.").optional(),
  }).describe("Runtime using Virtual Machine for computing.").optional(),
  requestId: z.string().describe("Idempotent request UUID.").optional(),
  runtimeId: z.string().describe(
    "Required. User-defined unique ID of this Runtime.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Notebooks Runtimes. Registered at `@swamp/gcp/notebooks/runtimes`. */
export const model = {
  type: "@swamp/gcp/notebooks/runtimes",
  version: "2026.06.08.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The definition of a Runtime for a managed notebook instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a runtimes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["accessConfig"] !== undefined) {
          body["accessConfig"] = g["accessConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["runtimeMigrationEligibility"] !== undefined) {
          body["runtimeMigrationEligibility"] =
            g["runtimeMigrationEligibility"];
        }
        if (g["softwareConfig"] !== undefined) {
          body["softwareConfig"] = g["softwareConfig"];
        }
        if (g["virtualMachine"] !== undefined) {
          body["virtualMachine"] = g["virtualMachine"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["runtimeId"] !== undefined) body["runtimeId"] = g["runtimeId"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["STOPPED"],
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
      description: "Get a runtimes",
      arguments: z.object({
        identifier: z.string().describe("The name of the runtimes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
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
      description: "Update runtimes attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["accessConfig"] !== undefined) {
          body["accessConfig"] = g["accessConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["runtimeMigrationEligibility"] !== undefined) {
          body["runtimeMigrationEligibility"] =
            g["runtimeMigrationEligibility"];
        }
        if (g["softwareConfig"] !== undefined) {
          body["softwareConfig"] = g["softwareConfig"];
        }
        if (g["virtualMachine"] !== undefined) {
          body["virtualMachine"] = g["virtualMachine"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["STOPPED"],
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
      description: "Delete the runtimes",
      arguments: z.object({
        identifier: z.string().describe("The name of the runtimes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync runtimes state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List runtimes resources",
      arguments: z.object({
        filter: z.string().describe("Optional. List filter.").optional(),
        orderBy: z.string().describe(
          'Optional. Sort results. Supported values are "name", "name desc" or "" (unsorted).',
        ).optional(),
        pageSize: z.number().describe("Maximum return size of the list call.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          "runtimes",
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
    diagnose: {
      description: "diagnose",
      arguments: z.object({
        diagnosticConfig: z.any().optional(),
        timeoutMinutes: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["diagnosticConfig"] !== undefined) {
          body["diagnosticConfig"] = args["diagnosticConfig"];
        }
        if (args["timeoutMinutes"] !== undefined) {
          body["timeoutMinutes"] = args["timeoutMinutes"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.diagnose",
            "path": "v1/{+name}:diagnose",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
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
    migrate: {
      description: "migrate",
      arguments: z.object({
        network: z.any().optional(),
        postStartupScriptOption: z.any().optional(),
        requestId: z.any().optional(),
        serviceAccount: z.any().optional(),
        subnet: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["network"] !== undefined) body["network"] = args["network"];
        if (args["postStartupScriptOption"] !== undefined) {
          body["postStartupScriptOption"] = args["postStartupScriptOption"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["serviceAccount"] !== undefined) {
          body["serviceAccount"] = args["serviceAccount"];
        }
        if (args["subnet"] !== undefined) body["subnet"] = args["subnet"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.migrate",
            "path": "v1/{+name}:migrate",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    refresh_runtime_token_internal: {
      description: "refresh runtime token internal",
      arguments: z.object({
        vmId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["vmId"] !== undefined) body["vmId"] = args["vmId"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "notebooks.projects.locations.runtimes.refreshRuntimeTokenInternal",
            "path": "v1/{+name}:refreshRuntimeTokenInternal",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    report_event: {
      description: "report event",
      arguments: z.object({
        event: z.any().optional(),
        vmId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["event"] !== undefined) body["event"] = args["event"];
        if (args["vmId"] !== undefined) body["vmId"] = args["vmId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.reportEvent",
            "path": "v1/{+name}:reportEvent",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    reset: {
      description: "reset",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.reset",
            "path": "v1/{+name}:reset",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    start: {
      description: "start",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.start",
            "path": "v1/{+name}:start",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    stop: {
      description: "stop",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.stop",
            "path": "v1/{+name}:stop",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    switch: {
      description: "switch",
      arguments: z.object({
        acceleratorConfig: z.any().optional(),
        machineType: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["acceleratorConfig"] !== undefined) {
          body["acceleratorConfig"] = args["acceleratorConfig"];
        }
        if (args["machineType"] !== undefined) {
          body["machineType"] = args["machineType"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.switch",
            "path": "v1/{+name}:switch",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    upgrade: {
      description: "upgrade",
      arguments: z.object({
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.runtimes.upgrade",
            "path": "v1/{+name}:upgrade",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
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
