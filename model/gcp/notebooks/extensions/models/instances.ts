// Auto-generated extension model for @swamp/gcp/notebooks/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Notebooks Instances.
 *
 * The definition of a notebook instance.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://notebooks.googleapis.com/";

const GET_CONFIG = {
  "id": "notebooks.projects.locations.instances.get",
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
  "id": "notebooks.projects.locations.instances.create",
  "path": "v2/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "instanceId": {
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
  "id": "notebooks.projects.locations.instances.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "notebooks.projects.locations.instances.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  disableProxyAccess: z.boolean().describe(
    "Optional. If true, the notebook instance will not register with the proxy.",
  ).optional(),
  enableDeletionProtection: z.boolean().describe(
    "Optional. If true, deletion protection will be enabled for this Workbench Instance. If false, deletion protection will be disabled for this Workbench Instance.",
  ).optional(),
  enableManagedEuc: z.boolean().describe(
    "Optional. Flag to enable managed end user credentials for the instance.",
  ).optional(),
  enableThirdPartyIdentity: z.boolean().describe(
    "Optional. Flag that specifies that a notebook can be accessed with third party identity provider.",
  ).optional(),
  gceSetup: z.object({
    acceleratorConfigs: z.array(z.object({
      coreCount: z.string().describe(
        "Optional. Count of cores of this accelerator.",
      ).optional(),
      type: z.enum([
        "ACCELERATOR_TYPE_UNSPECIFIED",
        "NVIDIA_TESLA_P100",
        "NVIDIA_TESLA_V100",
        "NVIDIA_TESLA_P4",
        "NVIDIA_TESLA_T4",
        "NVIDIA_TESLA_A100",
        "NVIDIA_A100_80GB",
        "NVIDIA_L4",
        "NVIDIA_H100_80GB",
        "NVIDIA_H100_MEGA_80GB",
        "NVIDIA_H200_141GB",
        "NVIDIA_TESLA_T4_VWS",
        "NVIDIA_TESLA_P100_VWS",
        "NVIDIA_TESLA_P4_VWS",
        "NVIDIA_B200",
      ]).describe("Optional. Type of this accelerator.").optional(),
    })).describe(
      "Optional. The hardware accelerators used on this instance. If you use accelerators, make sure that your configuration has [enough vCPUs and memory to support the `machine_type` you have selected](https://cloud.google.com/compute/docs/gpus/#gpus-list). Currently supports only one accelerator configuration.",
    ).optional(),
    bootDisk: z.object({
      diskEncryption: z.enum(["DISK_ENCRYPTION_UNSPECIFIED", "GMEK", "CMEK"])
        .describe(
          "Optional. Input only. Disk encryption method used on the boot and data disks, defaults to GMEK.",
        ).optional(),
      diskSizeGb: z.string().describe(
        "Optional. The size of the boot disk in GB attached to this instance, up to a maximum of 64000 GB (64 TB). If not specified, this defaults to the recommended value of 150GB.",
      ).optional(),
      diskType: z.enum([
        "DISK_TYPE_UNSPECIFIED",
        "PD_STANDARD",
        "PD_SSD",
        "PD_BALANCED",
        "PD_EXTREME",
        "HYPERDISK_BALANCED",
      ]).describe("Optional. Indicates the type of the disk.").optional(),
      kmsKey: z.string().describe(
        "Optional. Input only. The KMS key used to encrypt the disks, only applicable if disk_encryption is CMEK. Format: `projects/{project_id}/locations/{location}/keyRings/{key_ring_id}/cryptoKeys/{key_id}` Learn more about using your own encryption keys.",
      ).optional(),
    }).describe("The definition of a boot disk.").optional(),
    confidentialInstanceConfig: z.object({
      confidentialInstanceType: z.enum([
        "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED",
        "SEV",
      ]).describe(
        "Optional. Defines the type of technology used by the confidential instance.",
      ).optional(),
    }).describe("A set of Confidential Instance options.").optional(),
    containerImage: z.object({
      repository: z.string().describe(
        "Required. The path to the container image repository. For example: `gcr.io/{project_id}/{image_name}`",
      ).optional(),
      tag: z.string().describe(
        "Optional. The tag of the container image. If not specified, this defaults to the latest tag.",
      ).optional(),
    }).describe(
      "Definition of a container image for starting a notebook instance with the environment installed in a container.",
    ).optional(),
    dataDisks: z.array(z.object({
      diskEncryption: z.enum(["DISK_ENCRYPTION_UNSPECIFIED", "GMEK", "CMEK"])
        .describe(
          "Optional. Input only. Disk encryption method used on the boot and data disks, defaults to GMEK.",
        ).optional(),
      diskSizeGb: z.string().describe(
        "Optional. The size of the disk in GB attached to this VM instance, up to a maximum of 64000 GB (64 TB). If not specified, this defaults to 100.",
      ).optional(),
      diskType: z.enum([
        "DISK_TYPE_UNSPECIFIED",
        "PD_STANDARD",
        "PD_SSD",
        "PD_BALANCED",
        "PD_EXTREME",
        "HYPERDISK_BALANCED",
      ]).describe("Optional. Input only. Indicates the type of the disk.")
        .optional(),
      kmsKey: z.string().describe(
        "Optional. Input only. The KMS key used to encrypt the disks, only applicable if disk_encryption is CMEK. Format: `projects/{project_id}/locations/{location}/keyRings/{key_ring_id}/cryptoKeys/{key_id}` Learn more about using your own encryption keys.",
      ).optional(),
      resourcePolicies: z.array(z.string()).describe(
        "Optional. The resource policies to apply to the data disk.",
      ).optional(),
    })).describe(
      "Optional. Data disks attached to the VM instance. Currently supports only one data disk.",
    ).optional(),
    disablePublicIp: z.boolean().describe(
      "Optional. If true, no external IP will be assigned to this VM instance.",
    ).optional(),
    enableIpForwarding: z.boolean().describe(
      "Optional. Flag to enable ip forwarding or not, default false/off. https://cloud.google.com/vpc/docs/using-routes#canipforward",
    ).optional(),
    gpuDriverConfig: z.object({
      customGpuDriverPath: z.string().describe(
        "Optional. Specify a custom Cloud Storage path where the GPU driver is stored. If not specified, we'll automatically choose from official GPU drivers.",
      ).optional(),
      enableGpuDriver: z.boolean().describe(
        "Optional. Whether the end user authorizes Google Cloud to install GPU driver on this VM instance. If this field is empty or set to false, the GPU driver won't be installed. Only applicable to instances with GPUs.",
      ).optional(),
    }).describe("A GPU driver configuration").optional(),
    instanceId: z.string().describe(
      "Output only. The unique ID of the Compute Engine instance resource.",
    ).optional(),
    machineType: z.string().describe(
      "Optional. The machine type of the VM instance. https://cloud.google.com/compute/docs/machine-resource",
    ).optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "Optional. Custom metadata to apply to this instance.",
    ).optional(),
    minCpuPlatform: z.string().describe(
      "Optional. The minimum CPU platform to use for this instance. The list of valid values can be found in https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform#availablezones",
    ).optional(),
    networkInterfaces: z.array(z.object({
      accessConfigs: z.array(z.object({
        externalIp: z.unknown().describe(
          "An external IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance.",
        ).optional(),
      })).describe(
        "Optional. An array of configurations for this interface. Currently, only one access config, ONE_TO_ONE_NAT, is supported. If no accessConfigs specified, the instance will have an external internet access through an ephemeral external IP address.",
      ).optional(),
      network: z.string().describe(
        "Optional. The name of the VPC that this VM instance is in. Format: `projects/{project_id}/global/networks/{network_id}`",
      ).optional(),
      nicType: z.enum(["NIC_TYPE_UNSPECIFIED", "VIRTIO_NET", "GVNIC"]).describe(
        "Optional. The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet.",
      ).optional(),
      subnet: z.string().describe(
        "Optional. The name of the subnet that this VM instance is in. Format: `projects/{project_id}/regions/{region}/subnetworks/{subnetwork_id}`",
      ).optional(),
    })).describe(
      "Optional. The network interfaces for the VM. Supports only one interface.",
    ).optional(),
    reservationAffinity: z.object({
      consumeReservationType: z.enum([
        "RESERVATION_UNSPECIFIED",
        "RESERVATION_NONE",
        "RESERVATION_ANY",
        "RESERVATION_SPECIFIC",
      ]).describe(
        "Required. Specifies the type of reservation from which this instance can consume resources: RESERVATION_ANY (default), RESERVATION_SPECIFIC, or RESERVATION_NONE. See Consuming reserved instances for examples.",
      ).optional(),
      key: z.string().describe(
        "Optional. Corresponds to the label key of a reservation resource. To target a RESERVATION_SPECIFIC by name, use compute.googleapis.com/reservation-name as the key and specify the name of your reservation as its value.",
      ).optional(),
      values: z.array(z.string()).describe(
        'Optional. Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or "projects/different-project/reservations/some-reservation-name" to target a shared reservation in the same zone but in a different project.',
      ).optional(),
    }).describe("A reservation that an instance can consume from.").optional(),
    serviceAccounts: z.array(z.object({
      email: z.string().describe(
        "Optional. Email address of the service account.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Output only. The list of scopes to be made available for this service account. Set by the CLH to https://www.googleapis.com/auth/cloud-platform",
      ).optional(),
    })).describe(
      "Optional. The service account that serves as an identity for the VM instance. Currently supports only one service account.",
    ).optional(),
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean().describe(
        "Optional. Defines whether the VM instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the VM instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the VM instance is created.",
      ).optional(),
      enableSecureBoot: z.boolean().describe(
        "Optional. Defines whether the VM instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails. Disabled by default.",
      ).optional(),
      enableVtpm: z.boolean().describe(
        "Optional. Defines whether the VM instance has the vTPM enabled.",
      ).optional(),
    }).describe(
      "A set of Shielded Instance options. See [Images using supported Shielded VM features](https://cloud.google.com/compute/docs/instances/modifying-shielded-vm). Not all combinations are valid.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "Optional. The Compute Engine network tags to add to runtime (see [Add network tags](https://cloud.google.com/vpc/docs/add-remove-network-tags)).",
    ).optional(),
    vmImage: z.object({
      family: z.string().describe(
        "Optional. Use this VM image family to find the image; the newest image in this family will be used.",
      ).optional(),
      name: z.string().describe(
        "Optional. Use VM image name to find the image.",
      ).optional(),
      project: z.string().describe(
        "Required. The name of the Google Cloud project that this VM image belongs to. Format: `{project_id}`",
      ).optional(),
    }).describe(
      "Definition of a custom Compute Engine virtual machine image for starting a notebook instance with the environment installed directly on the VM.",
    ).optional(),
  }).describe(
    "The definition of how to configure a VM instance outside of Resources and Identity.",
  ).optional(),
  instanceOwners: z.array(z.string()).describe(
    "Optional. The owner of this instance after creation. Format: `alias@example.com` Currently supports one owner only. If not specified, all of the service account users of your VM instance's service account can use the instance.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels to apply to this instance. These can be later modified by the UpdateInstance method.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. User-defined unique ID of this instance.",
  ).optional(),
  requestId: z.string().describe("Optional. Idempotent request UUID.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  creator: z.string().optional(),
  disableProxyAccess: z.boolean().optional(),
  enableDeletionProtection: z.boolean().optional(),
  enableManagedEuc: z.boolean().optional(),
  enableThirdPartyIdentity: z.boolean().optional(),
  gceSetup: z.object({
    acceleratorConfigs: z.array(z.object({
      coreCount: z.string(),
      type: z.string(),
    })),
    bootDisk: z.object({
      diskEncryption: z.string(),
      diskSizeGb: z.string(),
      diskType: z.string(),
      kmsKey: z.string(),
    }),
    confidentialInstanceConfig: z.object({
      confidentialInstanceType: z.string(),
    }),
    containerImage: z.object({
      repository: z.string(),
      tag: z.string(),
    }),
    dataDisks: z.array(z.object({
      diskEncryption: z.string(),
      diskSizeGb: z.string(),
      diskType: z.string(),
      kmsKey: z.string(),
      resourcePolicies: z.array(z.string()),
    })),
    disablePublicIp: z.boolean(),
    enableIpForwarding: z.boolean(),
    gpuDriverConfig: z.object({
      customGpuDriverPath: z.string(),
      enableGpuDriver: z.boolean(),
    }),
    instanceId: z.string(),
    machineType: z.string(),
    metadata: z.record(z.string(), z.unknown()),
    minCpuPlatform: z.string(),
    networkInterfaces: z.array(z.object({
      accessConfigs: z.array(z.object({
        externalIp: z.unknown(),
      })),
      network: z.string(),
      nicType: z.string(),
      subnet: z.string(),
    })),
    reservationAffinity: z.object({
      consumeReservationType: z.string(),
      key: z.string(),
      values: z.array(z.string()),
    }),
    serviceAccounts: z.array(z.object({
      email: z.string(),
      scopes: z.array(z.string()),
    })),
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean(),
      enableSecureBoot: z.boolean(),
      enableVtpm: z.boolean(),
    }),
    tags: z.array(z.string()),
    vmImage: z.object({
      family: z.string(),
      name: z.string(),
      project: z.string(),
    }),
  }).optional(),
  healthInfo: z.record(z.string(), z.unknown()).optional(),
  healthState: z.string().optional(),
  id: z.string().optional(),
  instanceOwners: z.array(z.string()).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  proxyUri: z.string().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  thirdPartyProxyUrl: z.string().optional(),
  updateTime: z.string().optional(),
  upgradeHistory: z.array(z.object({
    action: z.string(),
    containerImage: z.string(),
    createTime: z.string(),
    framework: z.string(),
    snapshot: z.string(),
    state: z.string(),
    targetVersion: z.string(),
    version: z.string(),
    vmImage: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  disableProxyAccess: z.boolean().describe(
    "Optional. If true, the notebook instance will not register with the proxy.",
  ).optional(),
  enableDeletionProtection: z.boolean().describe(
    "Optional. If true, deletion protection will be enabled for this Workbench Instance. If false, deletion protection will be disabled for this Workbench Instance.",
  ).optional(),
  enableManagedEuc: z.boolean().describe(
    "Optional. Flag to enable managed end user credentials for the instance.",
  ).optional(),
  enableThirdPartyIdentity: z.boolean().describe(
    "Optional. Flag that specifies that a notebook can be accessed with third party identity provider.",
  ).optional(),
  gceSetup: z.object({
    acceleratorConfigs: z.array(z.object({
      coreCount: z.string().describe(
        "Optional. Count of cores of this accelerator.",
      ).optional(),
      type: z.enum([
        "ACCELERATOR_TYPE_UNSPECIFIED",
        "NVIDIA_TESLA_P100",
        "NVIDIA_TESLA_V100",
        "NVIDIA_TESLA_P4",
        "NVIDIA_TESLA_T4",
        "NVIDIA_TESLA_A100",
        "NVIDIA_A100_80GB",
        "NVIDIA_L4",
        "NVIDIA_H100_80GB",
        "NVIDIA_H100_MEGA_80GB",
        "NVIDIA_H200_141GB",
        "NVIDIA_TESLA_T4_VWS",
        "NVIDIA_TESLA_P100_VWS",
        "NVIDIA_TESLA_P4_VWS",
        "NVIDIA_B200",
      ]).describe("Optional. Type of this accelerator.").optional(),
    })).describe(
      "Optional. The hardware accelerators used on this instance. If you use accelerators, make sure that your configuration has [enough vCPUs and memory to support the `machine_type` you have selected](https://cloud.google.com/compute/docs/gpus/#gpus-list). Currently supports only one accelerator configuration.",
    ).optional(),
    bootDisk: z.object({
      diskEncryption: z.enum(["DISK_ENCRYPTION_UNSPECIFIED", "GMEK", "CMEK"])
        .describe(
          "Optional. Input only. Disk encryption method used on the boot and data disks, defaults to GMEK.",
        ).optional(),
      diskSizeGb: z.string().describe(
        "Optional. The size of the boot disk in GB attached to this instance, up to a maximum of 64000 GB (64 TB). If not specified, this defaults to the recommended value of 150GB.",
      ).optional(),
      diskType: z.enum([
        "DISK_TYPE_UNSPECIFIED",
        "PD_STANDARD",
        "PD_SSD",
        "PD_BALANCED",
        "PD_EXTREME",
        "HYPERDISK_BALANCED",
      ]).describe("Optional. Indicates the type of the disk.").optional(),
      kmsKey: z.string().describe(
        "Optional. Input only. The KMS key used to encrypt the disks, only applicable if disk_encryption is CMEK. Format: `projects/{project_id}/locations/{location}/keyRings/{key_ring_id}/cryptoKeys/{key_id}` Learn more about using your own encryption keys.",
      ).optional(),
    }).describe("The definition of a boot disk.").optional(),
    confidentialInstanceConfig: z.object({
      confidentialInstanceType: z.enum([
        "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED",
        "SEV",
      ]).describe(
        "Optional. Defines the type of technology used by the confidential instance.",
      ).optional(),
    }).describe("A set of Confidential Instance options.").optional(),
    containerImage: z.object({
      repository: z.string().describe(
        "Required. The path to the container image repository. For example: `gcr.io/{project_id}/{image_name}`",
      ).optional(),
      tag: z.string().describe(
        "Optional. The tag of the container image. If not specified, this defaults to the latest tag.",
      ).optional(),
    }).describe(
      "Definition of a container image for starting a notebook instance with the environment installed in a container.",
    ).optional(),
    dataDisks: z.array(z.object({
      diskEncryption: z.enum(["DISK_ENCRYPTION_UNSPECIFIED", "GMEK", "CMEK"])
        .describe(
          "Optional. Input only. Disk encryption method used on the boot and data disks, defaults to GMEK.",
        ).optional(),
      diskSizeGb: z.string().describe(
        "Optional. The size of the disk in GB attached to this VM instance, up to a maximum of 64000 GB (64 TB). If not specified, this defaults to 100.",
      ).optional(),
      diskType: z.enum([
        "DISK_TYPE_UNSPECIFIED",
        "PD_STANDARD",
        "PD_SSD",
        "PD_BALANCED",
        "PD_EXTREME",
        "HYPERDISK_BALANCED",
      ]).describe("Optional. Input only. Indicates the type of the disk.")
        .optional(),
      kmsKey: z.string().describe(
        "Optional. Input only. The KMS key used to encrypt the disks, only applicable if disk_encryption is CMEK. Format: `projects/{project_id}/locations/{location}/keyRings/{key_ring_id}/cryptoKeys/{key_id}` Learn more about using your own encryption keys.",
      ).optional(),
      resourcePolicies: z.array(z.string()).describe(
        "Optional. The resource policies to apply to the data disk.",
      ).optional(),
    })).describe(
      "Optional. Data disks attached to the VM instance. Currently supports only one data disk.",
    ).optional(),
    disablePublicIp: z.boolean().describe(
      "Optional. If true, no external IP will be assigned to this VM instance.",
    ).optional(),
    enableIpForwarding: z.boolean().describe(
      "Optional. Flag to enable ip forwarding or not, default false/off. https://cloud.google.com/vpc/docs/using-routes#canipforward",
    ).optional(),
    gpuDriverConfig: z.object({
      customGpuDriverPath: z.string().describe(
        "Optional. Specify a custom Cloud Storage path where the GPU driver is stored. If not specified, we'll automatically choose from official GPU drivers.",
      ).optional(),
      enableGpuDriver: z.boolean().describe(
        "Optional. Whether the end user authorizes Google Cloud to install GPU driver on this VM instance. If this field is empty or set to false, the GPU driver won't be installed. Only applicable to instances with GPUs.",
      ).optional(),
    }).describe("A GPU driver configuration").optional(),
    instanceId: z.string().describe(
      "Output only. The unique ID of the Compute Engine instance resource.",
    ).optional(),
    machineType: z.string().describe(
      "Optional. The machine type of the VM instance. https://cloud.google.com/compute/docs/machine-resource",
    ).optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "Optional. Custom metadata to apply to this instance.",
    ).optional(),
    minCpuPlatform: z.string().describe(
      "Optional. The minimum CPU platform to use for this instance. The list of valid values can be found in https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform#availablezones",
    ).optional(),
    networkInterfaces: z.array(z.object({
      accessConfigs: z.array(z.object({
        externalIp: z.unknown().describe(
          "An external IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance.",
        ).optional(),
      })).describe(
        "Optional. An array of configurations for this interface. Currently, only one access config, ONE_TO_ONE_NAT, is supported. If no accessConfigs specified, the instance will have an external internet access through an ephemeral external IP address.",
      ).optional(),
      network: z.string().describe(
        "Optional. The name of the VPC that this VM instance is in. Format: `projects/{project_id}/global/networks/{network_id}`",
      ).optional(),
      nicType: z.enum(["NIC_TYPE_UNSPECIFIED", "VIRTIO_NET", "GVNIC"]).describe(
        "Optional. The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet.",
      ).optional(),
      subnet: z.string().describe(
        "Optional. The name of the subnet that this VM instance is in. Format: `projects/{project_id}/regions/{region}/subnetworks/{subnetwork_id}`",
      ).optional(),
    })).describe(
      "Optional. The network interfaces for the VM. Supports only one interface.",
    ).optional(),
    reservationAffinity: z.object({
      consumeReservationType: z.enum([
        "RESERVATION_UNSPECIFIED",
        "RESERVATION_NONE",
        "RESERVATION_ANY",
        "RESERVATION_SPECIFIC",
      ]).describe(
        "Required. Specifies the type of reservation from which this instance can consume resources: RESERVATION_ANY (default), RESERVATION_SPECIFIC, or RESERVATION_NONE. See Consuming reserved instances for examples.",
      ).optional(),
      key: z.string().describe(
        "Optional. Corresponds to the label key of a reservation resource. To target a RESERVATION_SPECIFIC by name, use compute.googleapis.com/reservation-name as the key and specify the name of your reservation as its value.",
      ).optional(),
      values: z.array(z.string()).describe(
        'Optional. Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or "projects/different-project/reservations/some-reservation-name" to target a shared reservation in the same zone but in a different project.',
      ).optional(),
    }).describe("A reservation that an instance can consume from.").optional(),
    serviceAccounts: z.array(z.object({
      email: z.string().describe(
        "Optional. Email address of the service account.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Output only. The list of scopes to be made available for this service account. Set by the CLH to https://www.googleapis.com/auth/cloud-platform",
      ).optional(),
    })).describe(
      "Optional. The service account that serves as an identity for the VM instance. Currently supports only one service account.",
    ).optional(),
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean().describe(
        "Optional. Defines whether the VM instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the VM instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the VM instance is created.",
      ).optional(),
      enableSecureBoot: z.boolean().describe(
        "Optional. Defines whether the VM instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails. Disabled by default.",
      ).optional(),
      enableVtpm: z.boolean().describe(
        "Optional. Defines whether the VM instance has the vTPM enabled.",
      ).optional(),
    }).describe(
      "A set of Shielded Instance options. See [Images using supported Shielded VM features](https://cloud.google.com/compute/docs/instances/modifying-shielded-vm). Not all combinations are valid.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "Optional. The Compute Engine network tags to add to runtime (see [Add network tags](https://cloud.google.com/vpc/docs/add-remove-network-tags)).",
    ).optional(),
    vmImage: z.object({
      family: z.string().describe(
        "Optional. Use this VM image family to find the image; the newest image in this family will be used.",
      ).optional(),
      name: z.string().describe(
        "Optional. Use VM image name to find the image.",
      ).optional(),
      project: z.string().describe(
        "Required. The name of the Google Cloud project that this VM image belongs to. Format: `{project_id}`",
      ).optional(),
    }).describe(
      "Definition of a custom Compute Engine virtual machine image for starting a notebook instance with the environment installed directly on the VM.",
    ).optional(),
  }).describe(
    "The definition of how to configure a VM instance outside of Resources and Identity.",
  ).optional(),
  instanceOwners: z.array(z.string()).describe(
    "Optional. The owner of this instance after creation. Format: `alias@example.com` Currently supports one owner only. If not specified, all of the service account users of your VM instance's service account can use the instance.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels to apply to this instance. These can be later modified by the UpdateInstance method.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. User-defined unique ID of this instance.",
  ).optional(),
  requestId: z.string().describe("Optional. Idempotent request UUID.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Notebooks Instances. Registered at `@swamp/gcp/notebooks/instances`. */
export const model = {
  type: "@swamp/gcp/notebooks/instances",
  version: "2026.05.19.2",
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
      toVersion: "2026.04.13.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The definition of a notebook instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
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
        if (g["disableProxyAccess"] !== undefined) {
          body["disableProxyAccess"] = g["disableProxyAccess"];
        }
        if (g["enableDeletionProtection"] !== undefined) {
          body["enableDeletionProtection"] = g["enableDeletionProtection"];
        }
        if (g["enableManagedEuc"] !== undefined) {
          body["enableManagedEuc"] = g["enableManagedEuc"];
        }
        if (g["enableThirdPartyIdentity"] !== undefined) {
          body["enableThirdPartyIdentity"] = g["enableThirdPartyIdentity"];
        }
        if (g["gceSetup"] !== undefined) body["gceSetup"] = g["gceSetup"];
        if (g["instanceOwners"] !== undefined) {
          body["instanceOwners"] = g["instanceOwners"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["instanceId"] !== undefined) body["instanceId"] = g["instanceId"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["STOPPED"],
            }
            : undefined,
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Update instances attributes",
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
        if (g["disableProxyAccess"] !== undefined) {
          body["disableProxyAccess"] = g["disableProxyAccess"];
        }
        if (g["enableDeletionProtection"] !== undefined) {
          body["enableDeletionProtection"] = g["enableDeletionProtection"];
        }
        if (g["enableManagedEuc"] !== undefined) {
          body["enableManagedEuc"] = g["enableManagedEuc"];
        }
        if (g["enableThirdPartyIdentity"] !== undefined) {
          body["enableThirdPartyIdentity"] = g["enableThirdPartyIdentity"];
        }
        if (g["gceSetup"] !== undefined) body["gceSetup"] = g["gceSetup"];
        if (g["instanceOwners"] !== undefined) {
          body["instanceOwners"] = g["instanceOwners"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Sync instances state from GCP",
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
    check_authorization: {
      description: "check authorization",
      arguments: z.object({
        authorizationDetails: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["authorizationDetails"] !== undefined) {
          body["authorizationDetails"] = args["authorizationDetails"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.instances.checkAuthorization",
            "path": "v2/{+name}:checkAuthorization",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    check_upgradability: {
      description: "check upgradability",
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
        params["notebookInstance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.instances.checkUpgradability",
            "path": "v2/{+notebookInstance}:checkUpgradability",
            "httpMethod": "GET",
            "parameterOrder": ["notebookInstance"],
            "parameters": {
              "notebookInstance": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
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
        const projectId = await getProjectId();
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
            "id": "notebooks.projects.locations.instances.diagnose",
            "path": "v2/{+name}:diagnose",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    generate_access_token: {
      description: "generate access token",
      arguments: z.object({
        vmToken: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["vmToken"] !== undefined) body["vmToken"] = args["vmToken"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.instances.generateAccessToken",
            "path": "v2/{+name}:generateAccessToken",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_config: {
      description: "get config",
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
            "id": "notebooks.projects.locations.instances.getConfig",
            "path": "v2/{+name}/instances:getConfig",
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
    report_info_system: {
      description: "report info system",
      arguments: z.object({
        event: z.any().optional(),
        vmId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            "id": "notebooks.projects.locations.instances.reportInfoSystem",
            "path": "v2/{+name}:reportInfoSystem",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    reset: {
      description: "reset",
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
            "id": "notebooks.projects.locations.instances.reset",
            "path": "v2/{+name}:reset",
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
    resize_disk: {
      description: "resize disk",
      arguments: z.object({
        bootDisk: z.any().optional(),
        dataDisk: z.any().optional(),
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
        params["notebookInstance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["bootDisk"] !== undefined) body["bootDisk"] = args["bootDisk"];
        if (args["dataDisk"] !== undefined) body["dataDisk"] = args["dataDisk"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.instances.resizeDisk",
            "path": "v2/{+notebookInstance}:resizeDisk",
            "httpMethod": "POST",
            "parameterOrder": ["notebookInstance"],
            "parameters": {
              "notebookInstance": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    restore: {
      description: "restore",
      arguments: z.object({
        snapshot: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["snapshot"] !== undefined) body["snapshot"] = args["snapshot"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.instances.restore",
            "path": "v2/{+name}:restore",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    rollback: {
      description: "rollback",
      arguments: z.object({
        revisionId: z.any().optional(),
        targetSnapshot: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["revisionId"] !== undefined) {
          body["revisionId"] = args["revisionId"];
        }
        if (args["targetSnapshot"] !== undefined) {
          body["targetSnapshot"] = args["targetSnapshot"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "notebooks.projects.locations.instances.rollback",
            "path": "v2/{+name}:rollback",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    start: {
      description: "start",
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
            "id": "notebooks.projects.locations.instances.start",
            "path": "v2/{+name}:start",
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
    stop: {
      description: "stop",
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
            "id": "notebooks.projects.locations.instances.stop",
            "path": "v2/{+name}:stop",
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
    upgrade: {
      description: "upgrade",
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
            "id": "notebooks.projects.locations.instances.upgrade",
            "path": "v2/{+name}:upgrade",
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
    upgrade_system: {
      description: "upgrade system",
      arguments: z.object({
        vmId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            "id": "notebooks.projects.locations.instances.upgradeSystem",
            "path": "v2/{+name}:upgradeSystem",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
