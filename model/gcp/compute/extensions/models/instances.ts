// Auto-generated extension model for @swamp/gcp/compute/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Instances.
 *
 * Represents an Instance resource. An instance is a virtual machine that is hosted on Google Cloud Platform. For more information, readVirtual Machine Instances.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.instances.get",
  "path": "projects/{project}/zones/{zone}/instances/{instance}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "instance",
  ],
  "parameters": {
    "instance": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.instances.insert",
  "path": "projects/{project}/zones/{zone}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "zone",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "sourceInstanceTemplate": {
      "location": "query",
    },
    "sourceMachineImage": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.instances.update",
  "path": "projects/{project}/zones/{zone}/instances/{instance}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "zone",
    "instance",
  ],
  "parameters": {
    "discardLocalSsd": {
      "location": "query",
    },
    "instance": {
      "location": "path",
      "required": true,
    },
    "minimalAction": {
      "location": "query",
    },
    "mostDisruptiveAllowedAction": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.instances.delete",
  "path": "projects/{project}/zones/{zone}/instances/{instance}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "zone",
    "instance",
  ],
  "parameters": {
    "instance": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  advancedMachineFeatures: z.object({
    enableNestedVirtualization: z.boolean().describe(
      "Whether to enable nested virtualization or not (default is false).",
    ).optional(),
    enableUefiNetworking: z.boolean().describe(
      "Whether to enable UEFI networking for instance creation.",
    ).optional(),
    performanceMonitoringUnit: z.enum([
      "ARCHITECTURAL",
      "ENHANCED",
      "PERFORMANCE_MONITORING_UNIT_UNSPECIFIED",
      "STANDARD",
    ]).describe("Type of Performance Monitoring Unit requested on instance.")
      .optional(),
    threadsPerCore: z.number().int().describe(
      "The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed.",
    ).optional(),
    turboMode: z.string().describe(
      "Turbo frequency mode to use for the instance. Supported modes include: * ALL_CORE_MAX Using empty string or not setting this field will use the platform-specific default turbo mode.",
    ).optional(),
    visibleCoreCount: z.number().int().describe(
      "The number of physical cores to expose to an instance. Multiply by the number of threads per core to compute the total number of virtual CPUs to expose to the instance. If unset, the number of cores is inferred from the instance's nominal CPU count and the underlying platform's SMT width.",
    ).optional(),
  }).describe(
    "Specifies options for controlling advanced machine features. Options that would traditionally be configured in a BIOS belong here. Features that require operating system support may have corresponding entries in the GuestOsFeatures of anImage (e.g., whether or not the OS in theImage supports nested virtualization being enabled or disabled).",
  ).optional(),
  canIpForward: z.boolean().describe(
    "Allows this instance to send and receive packets with non-matching destination or source IPs. This is required if you plan to use this instance to forward routes. For more information, seeEnabling IP Forwarding.",
  ).optional(),
  confidentialInstanceConfig: z.object({
    confidentialInstanceType: z.enum([
      "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED",
      "SEV",
      "SEV_SNP",
      "TDX",
    ]).describe(
      "Defines the type of technology used by the confidential instance.",
    ).optional(),
    enableConfidentialCompute: z.boolean().describe(
      "Defines whether the instance should have confidential compute enabled.",
    ).optional(),
  }).describe("A set of Confidential Instance options.").optional(),
  deletionProtection: z.boolean().describe(
    "Whether the resource should be protected against deletion.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  disks: z.array(z.object({
    architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"])
      .describe(
        "Output only. [Output Only] The architecture of the attached disk. Valid values are ARM64 or X86_64.",
      ).optional(),
    autoDelete: z.boolean().describe(
      "Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance).",
    ).optional(),
    boot: z.boolean().describe(
      "Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem.",
    ).optional(),
    deviceName: z.string().describe(
      "Specifies a unique device name of your choice that is reflected into the/dev/disk/by-id/google-* tree of a Linux operating system running within the instance. This name can be used to reference the device for mounting, resizing, and so on, from within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
    ).optional(),
    diskEncryptionKey: z.object({
      kmsKeyName: z.string().describe(
        'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
      ).optional(),
      kmsKeyServiceAccount: z.string().describe(
        'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
      ).optional(),
      rawKey: z.string().describe(
        'Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
      ).optional(),
      rsaEncryptedKey: z.string().describe(
        'Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
      ).optional(),
      sha256: z.string().describe(
        "[Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
      ).optional(),
    }).optional(),
    diskSizeGb: z.string().describe("The size of the disk in GB.").optional(),
    forceAttach: z.boolean().describe(
      "[Input Only] Whether to force attach the regional disk even if it's currently attached to another instance. If you try to force attach a zonal disk to an instance, you will receive an error.",
    ).optional(),
    guestOsFeatures: z.array(z.object({
      type: z.enum([
        "BARE_METAL_LINUX_COMPATIBLE",
        "FEATURE_TYPE_UNSPECIFIED",
        "GVNIC",
        "IDPF",
        "MULTI_IP_SUBNET",
        "SECURE_BOOT",
        "SEV_CAPABLE",
        "SEV_LIVE_MIGRATABLE",
        "SEV_LIVE_MIGRATABLE_V2",
        "SEV_SNP_CAPABLE",
        "SNP_SVSM_CAPABLE",
        "TDX_CAPABLE",
        "UEFI_COMPATIBLE",
        "VIRTIO_SCSI_MULTIQUEUE",
        "WINDOWS",
      ]).describe(
        "The ID of a supported feature. To add multiple values, use commas to separate values. Set to one or more of the following values: - VIRTIO_SCSI_MULTIQUEUE - WINDOWS - MULTI_IP_SUBNET - UEFI_COMPATIBLE - GVNIC - SEV_CAPABLE - SUSPEND_RESUME_COMPATIBLE - SEV_LIVE_MIGRATABLE_V2 - SEV_SNP_CAPABLE - TDX_CAPABLE - IDPF - SNP_SVSM_CAPABLE - CCA_CAPABLE For more information, see Enabling guest operating system features.",
      ).optional(),
    })).describe(
      "A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options.",
    ).optional(),
    index: z.number().int().describe(
      "Output only. [Output Only] A zero-based index to this disk, where 0 is reserved for the boot disk. If you have many disks attached to an instance, each disk would have a unique index number.",
    ).optional(),
    initializeParams: z.object({
      architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"])
        .describe(
          "The architecture of the attached disk. Valid values are arm64 or x86_64.",
        ).optional(),
      description: z.string().describe(
        "An optional description. Provide this property when creating the disk.",
      ).optional(),
      diskName: z.string().describe(
        "Specifies the disk name. If not specified, the default is to use the name of the instance. If a disk with the same name already exists in the given region, the existing disk is attached to the new instance and the new disk is not created.",
      ).optional(),
      diskSizeGb: z.string().describe(
        "Specifies the size of the disk in base-2 GB. The size must be at least 10 GB. If you specify a sourceImage, which is required for boot disks, the default size is the size of the sourceImage. If you do not specify a sourceImage, the default disk size is 500 GB.",
      ).optional(),
      diskType: z.string().describe(
        "Specifies the disk type to use to create the instance. If not specified, the default is pd-standard, specified using the full URL. For example: https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/pd-standard For a full list of acceptable values, seePersistent disk types. If you specify this field when creating a VM, you can provide either the full or partial URL. For example, the following values are valid: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/diskType - projects/project/zones/zone/diskTypes/diskType - zones/zone/diskTypes/diskType If you specify this field when creating or updating an instance template or all-instances configuration, specify the type of the disk, not the URL. For example: pd-standard.",
      ).optional(),
      enableConfidentialCompute: z.boolean().describe(
        "Whether this disk is using confidential compute mode.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Labels to apply to this disk. These can be later modified by thedisks.setLabels method. This field is only applicable for persistent disks.",
      ).optional(),
      licenses: z.array(z.string()).describe(
        "A list of publicly visible licenses. Reserved for Google's use.",
      ).optional(),
      onUpdateAction: z.enum([
        "RECREATE_DISK",
        "RECREATE_DISK_IF_SOURCE_CHANGED",
        "USE_EXISTING_DISK",
      ]).describe(
        "Specifies which action to take on instance update with this disk. Default is to use the existing disk.",
      ).optional(),
      provisionedIops: z.string().describe(
        "Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation.",
      ).optional(),
      provisionedThroughput: z.string().describe(
        "Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must greater than or equal to 1.",
      ).optional(),
      replicaZones: z.array(z.string()).describe(
        "Required for each regional disk associated with the instance. Specify the URLs of the zones where the disk should be replicated to. You must provide exactly two replica zones, and one zone must be the same as the instance zone.",
      ).optional(),
      resourceManagerTags: z.record(z.string(), z.string()).describe(
        "Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
      ).optional(),
      resourcePolicies: z.array(z.string()).describe(
        "Resource policies applied to this disk for automatic snapshot creations. Specified using the full or partial URL. For instance template, specify only the resource policy name.",
      ).optional(),
      sourceImage: z.string().describe(
        "The source image to create this disk. When creating a new instance boot disk, one of initializeParams.sourceImage orinitializeParams.sourceSnapshot or disks.source is required. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family If the source image is deleted later, this field will not be set.",
      ).optional(),
      sourceImageEncryptionKey: z.object({
        kmsKeyName: z.string().describe(
          'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
        ).optional(),
        kmsKeyServiceAccount: z.string().describe(
          'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
        ).optional(),
        rawKey: z.string().describe(
          'Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
        ).optional(),
        rsaEncryptedKey: z.string().describe(
          'Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
        ).optional(),
        sha256: z.string().describe(
          "[Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
        ).optional(),
      }).optional(),
      sourceSnapshot: z.string().describe(
        "The source snapshot to create this disk. When creating a new instance boot disk, one of initializeParams.sourceSnapshot orinitializeParams.sourceImage or disks.source is required. To create a disk with a snapshot that you created, specify the snapshot name in the following format: global/snapshots/my-backup If the source snapshot is deleted later, this field will not be set. Note: You cannot create VMs in bulk using a snapshot as the source. Use an image instead when you create VMs using the bulk insert method.",
      ).optional(),
      sourceSnapshotEncryptionKey: z.object({
        kmsKeyName: z.string().describe(
          'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
        ).optional(),
        kmsKeyServiceAccount: z.string().describe(
          'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
        ).optional(),
        rawKey: z.string().describe(
          'Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
        ).optional(),
        rsaEncryptedKey: z.string().describe(
          'Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
        ).optional(),
        sha256: z.string().describe(
          "[Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
        ).optional(),
      }).optional(),
      storagePool: z.string().describe(
        "The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool",
      ).optional(),
    }).describe(
      "[Input Only] Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new instance. This field is persisted and returned for instanceTemplate and not returned in the context of instance. This property is mutually exclusive with the source property; you can only define one or the other, but not both.",
    ).optional(),
    interface: z.enum(["NVME", "SCSI"]).describe(
      "Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. For most machine types, the default is SCSI. Local SSDs can use either NVME or SCSI. In certain configurations, persistent disks can use NVMe. For more information, seeAbout persistent disks.",
    ).optional(),
    kind: z.string().describe(
      "Output only. [Output Only] Type of the resource. Alwayscompute#attachedDisk for attached disks.",
    ).optional(),
    licenses: z.array(z.string()).describe(
      "Output only. [Output Only] Any valid publicly visible licenses.",
    ).optional(),
    mode: z.enum(["READ_ONLY", "READ_WRITE"]).describe(
      "The mode in which to attach this disk, either READ_WRITE orREAD_ONLY. If not specified, the default is to attach the disk in READ_WRITE mode.",
    ).optional(),
    savedState: z.enum(["DISK_SAVED_STATE_UNSPECIFIED", "PRESERVED"]).describe(
      "Output only. For LocalSSD disks on VM Instances in STOPPED or SUSPENDED state, this field is set to PRESERVED if the LocalSSD data has been saved to a persistent location by customer request. (see the discard_local_ssd option on Stop/Suspend). Read-only in the api.",
    ).optional(),
    shieldedInstanceInitialState: z.object({
      dbs: z.array(z.object({
        content: z.unknown().describe(
          "The raw content in the secure keys file.",
        ).optional(),
        fileType: z.unknown().describe("The file type of source file.")
          .optional(),
      })).describe("The Key Database (db).").optional(),
      dbxs: z.array(z.object({
        content: z.unknown().describe(
          "The raw content in the secure keys file.",
        ).optional(),
        fileType: z.unknown().describe("The file type of source file.")
          .optional(),
      })).describe("The forbidden key database (dbx).").optional(),
      keks: z.array(z.object({
        content: z.unknown().describe(
          "The raw content in the secure keys file.",
        ).optional(),
        fileType: z.unknown().describe("The file type of source file.")
          .optional(),
      })).describe("The Key Exchange Key (KEK).").optional(),
      pk: z.object({
        content: z.string().describe("The raw content in the secure keys file.")
          .optional(),
        fileType: z.enum(["BIN", "UNDEFINED", "X509"]).describe(
          "The file type of source file.",
        ).optional(),
      }).optional(),
    }).describe(
      "Initial State for shielded instance, these are public keys which are safe to store in public",
    ).optional(),
    source: z.string().describe(
      "Specifies a valid partial or full URL to an existing Persistent Disk resource. When creating a new instance boot disk, one ofinitializeParams.sourceImage orinitializeParams.sourceSnapshot or disks.source is required. If desired, you can also attach existing non-root persistent disks using this property. This field is only applicable for persistent disks. Note that for InstanceTemplate, specify the disk name for zonal disk, and the URL for regional disk.",
    ).optional(),
    type: z.enum(["PERSISTENT", "SCRATCH"]).describe(
      "Specifies the type of the disk, either SCRATCH orPERSISTENT. If not specified, the default isPERSISTENT.",
    ).optional(),
  })).describe(
    "Array of disks associated with this instance. Persistent disks must be created before you can assign them.",
  ).optional(),
  displayDevice: z.object({
    enableDisplay: z.boolean().describe(
      "Defines whether the instance has Display enabled.",
    ).optional(),
  }).describe("A set of Display Device options").optional(),
  fingerprint: z.string().describe(
    "Specifies a fingerprint for this resource, which is essentially a hash of the instance's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update the instance. You must always provide an up-to-date fingerprint hash in order to update the instance. To see the latest fingerprint, make get() request to the instance.",
  ).optional(),
  guestAccelerators: z.array(z.object({
    acceleratorCount: z.number().int().describe(
      "The number of the guest accelerator cards exposed to this instance.",
    ).optional(),
    acceleratorType: z.string().describe(
      "Full or partial URL of the accelerator type resource to attach to this instance. For example:projects/my-project/zones/us-central1-c/acceleratorTypes/nvidia-tesla-p100 If you are creating an instance template, specify only the accelerator name. See GPUs on Compute Engine for a full list of accelerator types.",
    ).optional(),
  })).describe(
    "A list of the type and count of accelerator cards attached to the instance.",
  ).optional(),
  hostname: z.string().describe(
    "Specifies the hostname of the instance. The specified hostname must be RFC1035 compliant. If hostname is not specified, the default hostname is [INSTANCE_NAME].c.[PROJECT_ID].internal when using the global DNS, and [INSTANCE_NAME].[ZONE].c.[PROJECT_ID].internal when using zonal DNS.",
  ).optional(),
  instanceEncryptionKey: z.object({
    kmsKeyName: z.string().describe(
      'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
    ).optional(),
    kmsKeyServiceAccount: z.string().describe(
      'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
    ).optional(),
    rawKey: z.string().describe(
      'Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
    ).optional(),
    rsaEncryptedKey: z.string().describe(
      'Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
    ).optional(),
    sha256: z.string().describe(
      "[Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
    ).optional(),
  }).optional(),
  keyRevocationActionType: z.enum([
    "KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED",
    "NONE",
    "STOP",
  ]).describe(
    'KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified.',
  ).optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for this request, which is essentially a hash of the label's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the instance.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels to apply to this instance. These can be later modified by the setLabels method.",
  ).optional(),
  machineType: z.string().describe(
    "Full or partial URL of the machine type resource to use for this instance, in the format:zones/zone/machineTypes/machine-type. This is provided by the client when the instance is created. For example, the following is a valid partial url to a predefined machine type: zones/us-central1-f/machineTypes/n1-standard-1 To create acustom machine type, provide a URL to a machine type in the following format, where CPUS is 1 or an even number up to 32 (2, 4, 6,... 24, etc), and MEMORY is the total memory for this instance. Memory must be a multiple of 256 MB and must be supplied in MB (e.g. 5 GB of memory is 5120 MB): zones/zone/machineTypes/custom-CPUS-MEMORY For example: zones/us-central1-f/machineTypes/custom-4-5120 For a full list of restrictions, read theSpecifications for custom machine types.",
  ).optional(),
  metadata: z.object({
    fingerprint: z.string().describe(
      "Specifies a fingerprint for this request, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the resource.",
    ).optional(),
    items: z.array(z.object({
      key: z.string().regex(new RegExp("[a-zA-Z0-9-_]{1,128}")).describe(
        "Key for the metadata entry. Keys must conform to the following regexp: [a-zA-Z0-9-_]+, and be less than 128 bytes in length. This is reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project.",
      ).optional(),
      value: z.string().describe(
        "Value for the metadata entry. These are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on values is that their size must be less than or equal to 262144 bytes (256 KiB).",
      ).optional(),
    })).describe(
      "Array of key/value pairs. The total size of all keys and values must be less than 512 KB.",
    ).optional(),
    kind: z.string().describe(
      "Output only. [Output Only] Type of the resource. Always compute#metadata for metadata.",
    ).optional(),
  }).describe("A metadata key/value entry.").optional(),
  minCpuPlatform: z.string().describe(
    'Specifies aminimum CPU platform for the VM instance. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: "Intel Haswell" or minCpuPlatform: "Intel Sandy Bridge".',
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ),
  networkInterfaces: z.array(z.object({
    accessConfigs: z.array(z.object({
      externalIpv6: z.string().describe(
        "Applies to ipv6AccessConfigs only. The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored inexternalIpv6PrefixLength in ipv6AccessConfig. To use a static external IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an external IPv6 address from the instance's subnetwork.",
      ).optional(),
      externalIpv6PrefixLength: z.number().int().describe(
        "Applies to ipv6AccessConfigs only. The prefix length of the external IPv6 range.",
      ).optional(),
      kind: z.string().describe(
        "Output only. [Output Only] Type of the resource. Alwayscompute#accessConfig for access configs.",
      ).optional(),
      name: z.string().describe(
        "The name of this access configuration. In accessConfigs (IPv4), the default and recommended name is External NAT, but you can use any arbitrary string, such as My external IP orNetwork Access. In ipv6AccessConfigs, the recommend name is External IPv6.",
      ).optional(),
      natIP: z.string().describe(
        "Applies to accessConfigs (IPv4) only. Anexternal IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance.",
      ).optional(),
      networkTier: z.enum([
        "FIXED_STANDARD",
        "PREMIUM",
        "STANDARD",
        "STANDARD_OVERRIDES_FIXED_STANDARD",
      ]).describe(
        "This signifies the networking tier used for configuring this access configuration and can only take the following values: PREMIUM,STANDARD. If an AccessConfig is specified without a valid external IP address, an ephemeral IP will be created with this networkTier. If an AccessConfig with a valid external IP address is specified, it must match that of the networkTier associated with the Address resource owning that IP.",
      ).optional(),
      publicPtrDomainName: z.string().describe(
        "The DNS domain name for the public PTR record. You can set this field only if the `setPublicPtr` field is enabled inaccessConfig. If this field is unspecified inipv6AccessConfig, a default PTR record will be created for first IP in associated external IPv6 range.",
      ).optional(),
      securityPolicy: z.string().describe(
        "The resource URL for the security policy associated with this access config.",
      ).optional(),
      setPublicPtr: z.boolean().describe(
        "Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name. This field is not used in ipv6AccessConfig. A default PTR record will be created if the VM has external IPv6 range associated.",
      ).optional(),
      type: z.enum(["DIRECT_IPV6", "ONE_TO_ONE_NAT"]).describe(
        "The type of configuration. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. Inipv6AccessConfigs, the default and only option isDIRECT_IPV6.",
      ).optional(),
    })).describe(
      "An array of configurations for this interface. Currently, only one access config, ONE_TO_ONE_NAT, is supported. If there are noaccessConfigs specified, then this instance will have no external internet access.",
    ).optional(),
    aliasIpRanges: z.array(z.object({
      ipCidrRange: z.string().describe(
        "The IP alias ranges to allocate for this interface. This IP CIDR range must belong to the specified subnetwork and cannot contain IP addresses reserved by system or used by other network interfaces. This range may be a single IP address (such as 10.2.3.4), a netmask (such as/24) or a CIDR-formatted string (such as10.1.2.0/24).",
      ).optional(),
      subnetworkRangeName: z.string().describe(
        "The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used.",
      ).optional(),
    })).describe(
      "An array of alias IP ranges for this network interface. You can only specify this field for network interfaces in VPC networks.",
    ).optional(),
    enableVpcScopedDns: z.boolean().describe(
      "Optional. If true, DNS resolution will be enabled over this interface. Only valid with network_attachment.",
    ).optional(),
    fingerprint: z.string().describe(
      "Fingerprint hash of contents stored in this network interface. This field will be ignored when inserting an Instance or adding a NetworkInterface. An up-to-date fingerprint must be provided in order to update theNetworkInterface. The request will fail with error400 Bad Request if the fingerprint is not provided, or412 Precondition Failed if the fingerprint is out of date.",
    ).optional(),
    igmpQuery: z.enum(["IGMP_QUERY_DISABLED", "IGMP_QUERY_V2"]).describe(
      "Indicate whether igmp query is enabled on the network interface or not. If enabled, also indicates the version of IGMP supported.",
    ).optional(),
    internalIpv6PrefixLength: z.number().int().describe(
      "The prefix length of the primary internal IPv6 range.",
    ).optional(),
    ipv6AccessConfigs: z.array(z.object({
      externalIpv6: z.string().describe(
        "Applies to ipv6AccessConfigs only. The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored inexternalIpv6PrefixLength in ipv6AccessConfig. To use a static external IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an external IPv6 address from the instance's subnetwork.",
      ).optional(),
      externalIpv6PrefixLength: z.number().int().describe(
        "Applies to ipv6AccessConfigs only. The prefix length of the external IPv6 range.",
      ).optional(),
      kind: z.string().describe(
        "Output only. [Output Only] Type of the resource. Alwayscompute#accessConfig for access configs.",
      ).optional(),
      name: z.string().describe(
        "The name of this access configuration. In accessConfigs (IPv4), the default and recommended name is External NAT, but you can use any arbitrary string, such as My external IP orNetwork Access. In ipv6AccessConfigs, the recommend name is External IPv6.",
      ).optional(),
      natIP: z.string().describe(
        "Applies to accessConfigs (IPv4) only. Anexternal IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance.",
      ).optional(),
      networkTier: z.enum([
        "FIXED_STANDARD",
        "PREMIUM",
        "STANDARD",
        "STANDARD_OVERRIDES_FIXED_STANDARD",
      ]).describe(
        "This signifies the networking tier used for configuring this access configuration and can only take the following values: PREMIUM,STANDARD. If an AccessConfig is specified without a valid external IP address, an ephemeral IP will be created with this networkTier. If an AccessConfig with a valid external IP address is specified, it must match that of the networkTier associated with the Address resource owning that IP.",
      ).optional(),
      publicPtrDomainName: z.string().describe(
        "The DNS domain name for the public PTR record. You can set this field only if the `setPublicPtr` field is enabled inaccessConfig. If this field is unspecified inipv6AccessConfig, a default PTR record will be created for first IP in associated external IPv6 range.",
      ).optional(),
      securityPolicy: z.string().describe(
        "The resource URL for the security policy associated with this access config.",
      ).optional(),
      setPublicPtr: z.boolean().describe(
        "Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name. This field is not used in ipv6AccessConfig. A default PTR record will be created if the VM has external IPv6 range associated.",
      ).optional(),
      type: z.enum(["DIRECT_IPV6", "ONE_TO_ONE_NAT"]).describe(
        "The type of configuration. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. Inipv6AccessConfigs, the default and only option isDIRECT_IPV6.",
      ).optional(),
    })).describe(
      "An array of IPv6 access configurations for this interface. Currently, only one IPv6 access config, DIRECT_IPV6, is supported. If there is no ipv6AccessConfig specified, then this instance will have no external IPv6 Internet access.",
    ).optional(),
    ipv6AccessType: z.enum(["EXTERNAL", "INTERNAL"]).describe(
      "Output only. [Output Only] One of EXTERNAL, INTERNAL to indicate whether the IP can be accessed from the Internet. This field is always inherited from its subnetwork. Valid only if stackType is IPV4_IPV6.",
    ).optional(),
    ipv6Address: z.string().describe(
      "An IPv6 internal network address for this network interface. To use a static internal IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an internal IPv6 address from the instance's subnetwork.",
    ).optional(),
    kind: z.string().describe(
      "Output only. [Output Only] Type of the resource. Alwayscompute#networkInterface for network interfaces.",
    ).optional(),
    name: z.string().describe(
      "[Output Only] The name of the network interface, which is generated by the server. For a VM, the network interface uses the nicN naming format. Where N is a value between 0 and7. The default interface value is nic0.",
    ).optional(),
    network: z.string().describe(
      "URL of the VPC network resource for this instance. When creating an instance, if neither the network nor the subnetwork is specified, the default network global/networks/default is used. If the selected project doesn't have the default network, you must specify a network or subnet. If the network is not specified but the subnetwork is specified, the network is inferred. If you specify this property, you can specify the network as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/global/networks/network - projects/project/global/networks/network - global/networks/default",
    ).optional(),
    networkAttachment: z.string().describe(
      "The URL of the network attachment that this interface should connect to in the following format: projects/{project_number}/regions/{region_name}/networkAttachments/{network_attachment_name}.",
    ).optional(),
    networkIP: z.string().describe(
      "An IPv4 internal IP address to assign to the instance for this network interface. If not specified by the user, an unused internal IP is assigned by the system.",
    ).optional(),
    nicType: z.enum([
      "GVNIC",
      "IDPF",
      "IRDMA",
      "MRDMA",
      "UNSPECIFIED_NIC_TYPE",
      "VIRTIO_NET",
    ]).describe(
      "The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet.",
    ).optional(),
    parentNicName: z.string().describe(
      "Name of the parent network interface of a dynamic network interface.",
    ).optional(),
    queueCount: z.number().int().describe(
      "The networking queue count that's specified by users for the network interface. Both Rx and Tx queues will be set to this number. It'll be empty if not specified by the users.",
    ).optional(),
    serviceClassId: z.string().describe(
      "Optional. Producer Service's Service class Id for the region of this network interface. Can only be used with network_attachment. It is not possible to use on its own however, network_attachment can be used without service_class_id.",
    ).optional(),
    stackType: z.enum(["IPV4_IPV6", "IPV4_ONLY", "IPV6_ONLY"]).describe(
      "The stack type for this network interface. To assign only IPv4 addresses, use IPV4_ONLY. To assign both IPv4 and IPv6 addresses, useIPV4_IPV6. If not specified, IPV4_ONLY is used. This field can be both set at instance creation and update network interface operations.",
    ).optional(),
    subnetwork: z.string().describe(
      "The URL of the Subnetwork resource for this instance. If the network resource is inlegacy mode, do not specify this field. If the network is in auto subnet mode, specifying the subnetwork is optional. If the network is in custom subnet mode, specifying the subnetwork is required. If you specify this field, you can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/regions/region/subnetworks/subnetwork - regions/region/subnetworks/subnetwork",
    ).optional(),
    vlan: z.number().int().describe(
      "VLAN tag of a dynamic network interface, must be an integer in the range from 2 to 255 inclusively.",
    ).optional(),
  })).describe(
    "An array of network configurations for this instance. These specify how interfaces are configured to interact with other network services, such as connecting to the internet. Multiple interfaces are supported per instance.",
  ).optional(),
  networkPerformanceConfig: z.object({
    totalEgressBandwidthTier: z.enum(["DEFAULT", "TIER_1"]).optional(),
  }).optional(),
  params: z.object({
    requestValidForDuration: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the instance. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional instance params.").optional(),
  privateIpv6GoogleAccess: z.enum([
    "ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE",
    "ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE",
    "INHERIT_FROM_SUBNETWORK",
  ]).describe(
    "The private IPv6 google access type for the VM. If not specified, use INHERIT_FROM_SUBNETWORK as default.",
  ).optional(),
  reservationAffinity: z.object({
    consumeReservationType: z.enum([
      "ANY_RESERVATION",
      "NO_RESERVATION",
      "SPECIFIC_RESERVATION",
      "UNSPECIFIED",
    ]).describe(
      "Specifies the type of reservation from which this instance can consume resources: ANY_RESERVATION (default),SPECIFIC_RESERVATION, or NO_RESERVATION. See Consuming reserved instances for examples.",
    ).optional(),
    key: z.string().describe(
      "Corresponds to the label key of a reservation resource. To target aSPECIFIC_RESERVATION by name, specifygoogleapis.com/reservation-name as the key and specify the name of your reservation as its value.",
    ).optional(),
    values: z.array(z.string()).describe(
      'Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or "projects/different-project/reservations/some-reservation-name" to target a shared reservation in the same zone but in a different project.',
    ).optional(),
  }).describe("Specifies the reservations that this instance can consume from.")
    .optional(),
  resourcePolicies: z.array(z.string()).describe(
    "Resource policies applied to this instance.",
  ).optional(),
  scheduling: z.object({
    automaticRestart: z.boolean().describe(
      "Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user). You can only set the automatic restart option for standard instances.Preemptible instances cannot be automatically restarted. By default, this is set to true so an instance is automatically restarted if it is terminated by Compute Engine.",
    ).optional(),
    availabilityDomain: z.number().int().describe(
      "Specifies the availability domain to place the instance in. The value must be a number between 1 and the number of availability domains specified in the spread placement policy attached to the instance.",
    ).optional(),
    hostErrorTimeoutSeconds: z.number().int().describe(
      "Specify the time in seconds for host error detection, the value must be within the range of [90, 330] with the increment of 30, if unset, the default behavior of host error recovery will be used.",
    ).optional(),
    instanceTerminationAction: z.enum([
      "DELETE",
      "INSTANCE_TERMINATION_ACTION_UNSPECIFIED",
      "STOP",
    ]).describe("Specifies the termination action for the instance.")
      .optional(),
    localSsdRecoveryTimeout: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    locationHint: z.string().describe(
      "An opaque location hint used to place the instance close to other resources. This field is for use by internal tools that use the public API.",
    ).optional(),
    maxRunDuration: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    minNodeCpus: z.number().int().describe(
      "The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node.",
    ).optional(),
    nodeAffinities: z.array(z.object({
      key: z.string().describe("Corresponds to the label key of Node resource.")
        .optional(),
      operator: z.enum(["IN", "NOT_IN", "OPERATOR_UNSPECIFIED"]).describe(
        "Defines the operation of node selection. Valid operators areIN for affinity and NOT_IN for anti-affinity.",
      ).optional(),
      values: z.array(z.string()).describe(
        "Corresponds to the label values of Node resource.",
      ).optional(),
    })).describe(
      "A set of node affinity and anti-affinity configurations. Refer toConfiguring node affinity for more information. Overrides reservationAffinity.",
    ).optional(),
    onHostMaintenance: z.enum(["MIGRATE", "TERMINATE"]).describe(
      "Defines the maintenance behavior for this instance. For standard instances, the default behavior is MIGRATE. Forpreemptible instances, the default and only possible behavior is TERMINATE. For more information, see Set VM host maintenance policy.",
    ).optional(),
    onInstanceStopAction: z.object({
      discardLocalSsd: z.boolean().describe(
        "If true, the contents of any attached Local SSD disks will be discarded else, the Local SSD data will be preserved when the instance is stopped at the end of the run duration/termination time.",
      ).optional(),
    }).describe(
      "Defines the behaviour for instances with the instance_termination_actionSTOP.",
    ).optional(),
    preemptible: z.boolean().describe(
      "Defines whether the instance is preemptible. This can only be set during instance creation or while the instance isstopped and therefore, in a `TERMINATED` state. SeeInstance Life Cycle for more information on the possible instance states.",
    ).optional(),
    provisioningModel: z.enum([
      "FLEX_START",
      "RESERVATION_BOUND",
      "SPOT",
      "STANDARD",
    ]).describe("Specifies the provisioning model of the instance.").optional(),
    skipGuestOsShutdown: z.boolean().describe(
      "Default is false and there will be 120 seconds between GCE ACPI G2 Soft Off and ACPI G3 Mechanical Off for Standard VMs and 30 seconds for Spot VMs.",
    ).optional(),
    terminationTime: z.string().describe(
      "Specifies the timestamp, when the instance will be terminated, inRFC3339 text format. If specified, the instance termination action will be performed at the termination time.",
    ).optional(),
  }).describe("Sets the scheduling options for an Instance.").optional(),
  serviceAccounts: z.array(z.object({
    email: z.string().describe("Email address of the service account.")
      .optional(),
    scopes: z.array(z.string()).describe(
      "The list of scopes to be made available for this service account.",
    ).optional(),
  })).describe(
    "A list of service accounts, with their specified scopes, authorized for this instance. Only one service account per VM instance is supported. Service accounts generate access tokens that can be accessed through the metadata server and used to authenticate applications on the instance. SeeService Accounts for more information.",
  ).optional(),
  shieldedInstanceConfig: z.object({
    enableIntegrityMonitoring: z.boolean().describe(
      "Defines whether the instance has integrity monitoring enabled.Enabled by default.",
    ).optional(),
    enableSecureBoot: z.boolean().describe(
      "Defines whether the instance has Secure Boot enabled.Disabled by default.",
    ).optional(),
    enableVtpm: z.boolean().describe(
      "Defines whether the instance has the vTPM enabled.Enabled by default.",
    ).optional(),
  }).describe("A set of Shielded Instance options.").optional(),
  shieldedInstanceIntegrityPolicy: z.object({
    updateAutoLearnPolicy: z.boolean().describe(
      "Updates the integrity policy baseline using the measurements from the VM instance's most recent boot.",
    ).optional(),
  }).describe(
    "The policy describes the baseline against which Instance boot integrity is measured.",
  ).optional(),
  sourceMachineImage: z.string().describe("Source machine image").optional(),
  sourceMachineImageEncryptionKey: z.object({
    kmsKeyName: z.string().describe(
      'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
    ).optional(),
    kmsKeyServiceAccount: z.string().describe(
      'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
    ).optional(),
    rawKey: z.string().describe(
      'Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
    ).optional(),
    rsaEncryptedKey: z.string().describe(
      'Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
    ).optional(),
    sha256: z.string().describe(
      "[Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
    ).optional(),
  }).optional(),
  tags: z.object({
    fingerprint: z.string().describe(
      "Specifies a fingerprint for this request, which is essentially a hash of the tags' contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update tags. You must always provide an up-to-date fingerprint hash in order to update or change tags. To see the latest fingerprint, make get() request to the instance.",
    ).optional(),
    items: z.array(z.string()).describe(
      "An array of tags. Each tag must be 1-63 characters long, and comply with RFC1035.",
    ).optional(),
  }).describe("A set of instance tags.").optional(),
  workloadIdentityConfig: z.object({
    identity: z.string().optional(),
    identityCertificateEnabled: z.boolean().optional(),
  }).optional(),
  zone: z.string().describe(
    "Output only. [Output Only] URL of the zone where the instance resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  sourceInstanceTemplate: z.string().describe(
    "Specifies instance template to create the instance. This field is optional. It can be a full or partial URL. For example, the following are all valid URLs to an instance template: - https://www.googleapis.com/compute/v1/projects/project/global/instanceTemplates/instanceTemplate - projects/project/global/instanceTemplates/instanceTemplate - global/instanceTemplates/instanceTemplate",
  ).optional(),
});

const StateSchema = z.object({
  advancedMachineFeatures: z.object({
    enableNestedVirtualization: z.boolean(),
    enableUefiNetworking: z.boolean(),
    performanceMonitoringUnit: z.string(),
    threadsPerCore: z.number(),
    turboMode: z.string(),
    visibleCoreCount: z.number(),
  }).optional(),
  canIpForward: z.boolean().optional(),
  confidentialInstanceConfig: z.object({
    confidentialInstanceType: z.string(),
    enableConfidentialCompute: z.boolean(),
  }).optional(),
  cpuPlatform: z.string().optional(),
  creationTimestamp: z.string().optional(),
  deletionProtection: z.boolean().optional(),
  description: z.string().optional(),
  disks: z.array(z.object({
    architecture: z.string(),
    autoDelete: z.boolean(),
    boot: z.boolean(),
    deviceName: z.string(),
    diskEncryptionKey: z.object({
      kmsKeyName: z.string(),
      kmsKeyServiceAccount: z.string(),
      rawKey: z.string(),
      rsaEncryptedKey: z.string(),
      sha256: z.string(),
    }),
    diskSizeGb: z.string(),
    forceAttach: z.boolean(),
    guestOsFeatures: z.array(z.object({
      type: z.string(),
    })),
    index: z.number(),
    initializeParams: z.object({
      architecture: z.string(),
      description: z.string(),
      diskName: z.string(),
      diskSizeGb: z.string(),
      diskType: z.string(),
      enableConfidentialCompute: z.boolean(),
      labels: z.record(z.string(), z.unknown()),
      licenses: z.array(z.string()),
      onUpdateAction: z.string(),
      provisionedIops: z.string(),
      provisionedThroughput: z.string(),
      replicaZones: z.array(z.string()),
      resourceManagerTags: z.record(z.string(), z.unknown()),
      resourcePolicies: z.array(z.string()),
      sourceImage: z.string(),
      sourceImageEncryptionKey: z.object({
        kmsKeyName: z.string(),
        kmsKeyServiceAccount: z.string(),
        rawKey: z.string(),
        rsaEncryptedKey: z.string(),
        sha256: z.string(),
      }),
      sourceSnapshot: z.string(),
      sourceSnapshotEncryptionKey: z.object({
        kmsKeyName: z.string(),
        kmsKeyServiceAccount: z.string(),
        rawKey: z.string(),
        rsaEncryptedKey: z.string(),
        sha256: z.string(),
      }),
      storagePool: z.string(),
    }),
    interface: z.string(),
    kind: z.string(),
    licenses: z.array(z.string()),
    mode: z.string(),
    savedState: z.string(),
    shieldedInstanceInitialState: z.object({
      dbs: z.array(z.object({
        content: z.unknown(),
        fileType: z.unknown(),
      })),
      dbxs: z.array(z.object({
        content: z.unknown(),
        fileType: z.unknown(),
      })),
      keks: z.array(z.object({
        content: z.unknown(),
        fileType: z.unknown(),
      })),
      pk: z.object({
        content: z.string(),
        fileType: z.string(),
      }),
    }),
    source: z.string(),
    type: z.string(),
  })).optional(),
  displayDevice: z.object({
    enableDisplay: z.boolean(),
  }).optional(),
  fingerprint: z.string().optional(),
  guestAccelerators: z.array(z.object({
    acceleratorCount: z.number(),
    acceleratorType: z.string(),
  })).optional(),
  hostname: z.string().optional(),
  id: z.string().optional(),
  instanceEncryptionKey: z.object({
    kmsKeyName: z.string(),
    kmsKeyServiceAccount: z.string(),
    rawKey: z.string(),
    rsaEncryptedKey: z.string(),
    sha256: z.string(),
  }).optional(),
  keyRevocationActionType: z.string().optional(),
  kind: z.string().optional(),
  labelFingerprint: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastStartTimestamp: z.string().optional(),
  lastStopTimestamp: z.string().optional(),
  lastSuspendedTimestamp: z.string().optional(),
  machineType: z.string().optional(),
  metadata: z.object({
    fingerprint: z.string(),
    items: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })),
    kind: z.string(),
  }).optional(),
  minCpuPlatform: z.string().optional(),
  name: z.string(),
  networkInterfaces: z.array(z.object({
    accessConfigs: z.array(z.object({
      externalIpv6: z.string(),
      externalIpv6PrefixLength: z.number(),
      kind: z.string(),
      name: z.string(),
      natIP: z.string(),
      networkTier: z.string(),
      publicPtrDomainName: z.string(),
      securityPolicy: z.string(),
      setPublicPtr: z.boolean(),
      type: z.string(),
    })),
    aliasIpRanges: z.array(z.object({
      ipCidrRange: z.string(),
      subnetworkRangeName: z.string(),
    })),
    enableVpcScopedDns: z.boolean(),
    fingerprint: z.string(),
    igmpQuery: z.string(),
    internalIpv6PrefixLength: z.number(),
    ipv6AccessConfigs: z.array(z.object({
      externalIpv6: z.string(),
      externalIpv6PrefixLength: z.number(),
      kind: z.string(),
      name: z.string(),
      natIP: z.string(),
      networkTier: z.string(),
      publicPtrDomainName: z.string(),
      securityPolicy: z.string(),
      setPublicPtr: z.boolean(),
      type: z.string(),
    })),
    ipv6AccessType: z.string(),
    ipv6Address: z.string(),
    kind: z.string(),
    name: z.string(),
    network: z.string(),
    networkAttachment: z.string(),
    networkIP: z.string(),
    nicType: z.string(),
    parentNicName: z.string(),
    queueCount: z.number(),
    serviceClassId: z.string(),
    stackType: z.string(),
    subnetwork: z.string(),
    vlan: z.number(),
  })).optional(),
  networkPerformanceConfig: z.object({
    totalEgressBandwidthTier: z.string(),
  }).optional(),
  params: z.object({
    requestValidForDuration: z.object({
      nanos: z.number(),
      seconds: z.string(),
    }),
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  privateIpv6GoogleAccess: z.string().optional(),
  reservationAffinity: z.object({
    consumeReservationType: z.string(),
    key: z.string(),
    values: z.array(z.string()),
  }).optional(),
  resourcePolicies: z.array(z.string()).optional(),
  resourceStatus: z.object({
    effectiveInstanceMetadata: z.object({
      blockProjectSshKeysMetadataValue: z.boolean(),
      enableGuestAttributesMetadataValue: z.boolean(),
      enableOsInventoryMetadataValue: z.boolean(),
      enableOsconfigMetadataValue: z.boolean(),
      enableOsloginMetadataValue: z.boolean(),
      gceContainerDeclarationMetadataValue: z.boolean(),
      serialPortEnableMetadataValue: z.boolean(),
      serialPortLoggingEnableMetadataValue: z.boolean(),
      vmDnsSettingMetadataValue: z.string(),
    }),
    physicalHost: z.string(),
    physicalHostTopology: z.object({
      block: z.string(),
      cluster: z.string(),
      host: z.string(),
      subblock: z.string(),
    }),
    reservationConsumptionInfo: z.object({
      consumedReservation: z.string(),
    }),
    scheduling: z.object({
      availabilityDomain: z.number(),
    }),
    upcomingMaintenance: z.object({
      canReschedule: z.boolean(),
      latestWindowStartTime: z.string(),
      maintenanceOnShutdown: z.boolean(),
      maintenanceReasons: z.array(z.string()),
      maintenanceStatus: z.string(),
      type: z.string(),
      windowEndTime: z.string(),
      windowStartTime: z.string(),
    }),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  scheduling: z.object({
    automaticRestart: z.boolean(),
    availabilityDomain: z.number(),
    hostErrorTimeoutSeconds: z.number(),
    instanceTerminationAction: z.string(),
    localSsdRecoveryTimeout: z.object({
      nanos: z.number(),
      seconds: z.string(),
    }),
    locationHint: z.string(),
    maxRunDuration: z.object({
      nanos: z.number(),
      seconds: z.string(),
    }),
    minNodeCpus: z.number(),
    nodeAffinities: z.array(z.object({
      key: z.string(),
      operator: z.string(),
      values: z.array(z.string()),
    })),
    onHostMaintenance: z.string(),
    onInstanceStopAction: z.object({
      discardLocalSsd: z.boolean(),
    }),
    preemptible: z.boolean(),
    provisioningModel: z.string(),
    skipGuestOsShutdown: z.boolean(),
    terminationTime: z.string(),
  }).optional(),
  selfLink: z.string().optional(),
  serviceAccounts: z.array(z.object({
    email: z.string(),
    scopes: z.array(z.string()),
  })).optional(),
  shieldedInstanceConfig: z.object({
    enableIntegrityMonitoring: z.boolean(),
    enableSecureBoot: z.boolean(),
    enableVtpm: z.boolean(),
  }).optional(),
  shieldedInstanceIntegrityPolicy: z.object({
    updateAutoLearnPolicy: z.boolean(),
  }).optional(),
  sourceMachineImage: z.string().optional(),
  sourceMachineImageEncryptionKey: z.object({
    kmsKeyName: z.string(),
    kmsKeyServiceAccount: z.string(),
    rawKey: z.string(),
    rsaEncryptedKey: z.string(),
    sha256: z.string(),
  }).optional(),
  startRestricted: z.boolean().optional(),
  status: z.string().optional(),
  statusMessage: z.string().optional(),
  tags: z.object({
    fingerprint: z.string(),
    items: z.array(z.string()),
  }).optional(),
  workloadIdentityConfig: z.object({
    identity: z.string(),
    identityCertificateEnabled: z.boolean(),
  }).optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  advancedMachineFeatures: z.object({
    enableNestedVirtualization: z.boolean().describe(
      "Whether to enable nested virtualization or not (default is false).",
    ).optional(),
    enableUefiNetworking: z.boolean().describe(
      "Whether to enable UEFI networking for instance creation.",
    ).optional(),
    performanceMonitoringUnit: z.enum([
      "ARCHITECTURAL",
      "ENHANCED",
      "PERFORMANCE_MONITORING_UNIT_UNSPECIFIED",
      "STANDARD",
    ]).describe("Type of Performance Monitoring Unit requested on instance.")
      .optional(),
    threadsPerCore: z.number().int().describe(
      "The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed.",
    ).optional(),
    turboMode: z.string().describe(
      "Turbo frequency mode to use for the instance. Supported modes include: * ALL_CORE_MAX Using empty string or not setting this field will use the platform-specific default turbo mode.",
    ).optional(),
    visibleCoreCount: z.number().int().describe(
      "The number of physical cores to expose to an instance. Multiply by the number of threads per core to compute the total number of virtual CPUs to expose to the instance. If unset, the number of cores is inferred from the instance's nominal CPU count and the underlying platform's SMT width.",
    ).optional(),
  }).describe(
    "Specifies options for controlling advanced machine features. Options that would traditionally be configured in a BIOS belong here. Features that require operating system support may have corresponding entries in the GuestOsFeatures of anImage (e.g., whether or not the OS in theImage supports nested virtualization being enabled or disabled).",
  ).optional(),
  canIpForward: z.boolean().describe(
    "Allows this instance to send and receive packets with non-matching destination or source IPs. This is required if you plan to use this instance to forward routes. For more information, seeEnabling IP Forwarding.",
  ).optional(),
  confidentialInstanceConfig: z.object({
    confidentialInstanceType: z.enum([
      "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED",
      "SEV",
      "SEV_SNP",
      "TDX",
    ]).describe(
      "Defines the type of technology used by the confidential instance.",
    ).optional(),
    enableConfidentialCompute: z.boolean().describe(
      "Defines whether the instance should have confidential compute enabled.",
    ).optional(),
  }).describe("A set of Confidential Instance options.").optional(),
  deletionProtection: z.boolean().describe(
    "Whether the resource should be protected against deletion.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  disks: z.array(z.object({
    architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"])
      .describe(
        "Output only. [Output Only] The architecture of the attached disk. Valid values are ARM64 or X86_64.",
      ).optional(),
    autoDelete: z.boolean().describe(
      "Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance).",
    ).optional(),
    boot: z.boolean().describe(
      "Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem.",
    ).optional(),
    deviceName: z.string().describe(
      "Specifies a unique device name of your choice that is reflected into the/dev/disk/by-id/google-* tree of a Linux operating system running within the instance. This name can be used to reference the device for mounting, resizing, and so on, from within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.",
    ).optional(),
    diskEncryptionKey: z.object({
      kmsKeyName: z.string().describe(
        'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
      ).optional(),
      kmsKeyServiceAccount: z.string().describe(
        'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
      ).optional(),
      rawKey: z.string().describe(
        'Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
      ).optional(),
      rsaEncryptedKey: z.string().describe(
        'Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
      ).optional(),
      sha256: z.string().describe(
        "[Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
      ).optional(),
    }).optional(),
    diskSizeGb: z.string().describe("The size of the disk in GB.").optional(),
    forceAttach: z.boolean().describe(
      "[Input Only] Whether to force attach the regional disk even if it's currently attached to another instance. If you try to force attach a zonal disk to an instance, you will receive an error.",
    ).optional(),
    guestOsFeatures: z.array(z.object({
      type: z.enum([
        "BARE_METAL_LINUX_COMPATIBLE",
        "FEATURE_TYPE_UNSPECIFIED",
        "GVNIC",
        "IDPF",
        "MULTI_IP_SUBNET",
        "SECURE_BOOT",
        "SEV_CAPABLE",
        "SEV_LIVE_MIGRATABLE",
        "SEV_LIVE_MIGRATABLE_V2",
        "SEV_SNP_CAPABLE",
        "SNP_SVSM_CAPABLE",
        "TDX_CAPABLE",
        "UEFI_COMPATIBLE",
        "VIRTIO_SCSI_MULTIQUEUE",
        "WINDOWS",
      ]).describe(
        "The ID of a supported feature. To add multiple values, use commas to separate values. Set to one or more of the following values: - VIRTIO_SCSI_MULTIQUEUE - WINDOWS - MULTI_IP_SUBNET - UEFI_COMPATIBLE - GVNIC - SEV_CAPABLE - SUSPEND_RESUME_COMPATIBLE - SEV_LIVE_MIGRATABLE_V2 - SEV_SNP_CAPABLE - TDX_CAPABLE - IDPF - SNP_SVSM_CAPABLE - CCA_CAPABLE For more information, see Enabling guest operating system features.",
      ).optional(),
    })).describe(
      "A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options.",
    ).optional(),
    index: z.number().int().describe(
      "Output only. [Output Only] A zero-based index to this disk, where 0 is reserved for the boot disk. If you have many disks attached to an instance, each disk would have a unique index number.",
    ).optional(),
    initializeParams: z.object({
      architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"])
        .describe(
          "The architecture of the attached disk. Valid values are arm64 or x86_64.",
        ).optional(),
      description: z.string().describe(
        "An optional description. Provide this property when creating the disk.",
      ).optional(),
      diskName: z.string().describe(
        "Specifies the disk name. If not specified, the default is to use the name of the instance. If a disk with the same name already exists in the given region, the existing disk is attached to the new instance and the new disk is not created.",
      ).optional(),
      diskSizeGb: z.string().describe(
        "Specifies the size of the disk in base-2 GB. The size must be at least 10 GB. If you specify a sourceImage, which is required for boot disks, the default size is the size of the sourceImage. If you do not specify a sourceImage, the default disk size is 500 GB.",
      ).optional(),
      diskType: z.string().describe(
        "Specifies the disk type to use to create the instance. If not specified, the default is pd-standard, specified using the full URL. For example: https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/pd-standard For a full list of acceptable values, seePersistent disk types. If you specify this field when creating a VM, you can provide either the full or partial URL. For example, the following values are valid: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/diskType - projects/project/zones/zone/diskTypes/diskType - zones/zone/diskTypes/diskType If you specify this field when creating or updating an instance template or all-instances configuration, specify the type of the disk, not the URL. For example: pd-standard.",
      ).optional(),
      enableConfidentialCompute: z.boolean().describe(
        "Whether this disk is using confidential compute mode.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Labels to apply to this disk. These can be later modified by thedisks.setLabels method. This field is only applicable for persistent disks.",
      ).optional(),
      licenses: z.array(z.string()).describe(
        "A list of publicly visible licenses. Reserved for Google's use.",
      ).optional(),
      onUpdateAction: z.enum([
        "RECREATE_DISK",
        "RECREATE_DISK_IF_SOURCE_CHANGED",
        "USE_EXISTING_DISK",
      ]).describe(
        "Specifies which action to take on instance update with this disk. Default is to use the existing disk.",
      ).optional(),
      provisionedIops: z.string().describe(
        "Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation.",
      ).optional(),
      provisionedThroughput: z.string().describe(
        "Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must greater than or equal to 1.",
      ).optional(),
      replicaZones: z.array(z.string()).describe(
        "Required for each regional disk associated with the instance. Specify the URLs of the zones where the disk should be replicated to. You must provide exactly two replica zones, and one zone must be the same as the instance zone.",
      ).optional(),
      resourceManagerTags: z.record(z.string(), z.string()).describe(
        "Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
      ).optional(),
      resourcePolicies: z.array(z.string()).describe(
        "Resource policies applied to this disk for automatic snapshot creations. Specified using the full or partial URL. For instance template, specify only the resource policy name.",
      ).optional(),
      sourceImage: z.string().describe(
        "The source image to create this disk. When creating a new instance boot disk, one of initializeParams.sourceImage orinitializeParams.sourceSnapshot or disks.source is required. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family If the source image is deleted later, this field will not be set.",
      ).optional(),
      sourceImageEncryptionKey: z.object({
        kmsKeyName: z.string().describe(
          'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
        ).optional(),
        kmsKeyServiceAccount: z.string().describe(
          'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
        ).optional(),
        rawKey: z.string().describe(
          'Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
        ).optional(),
        rsaEncryptedKey: z.string().describe(
          'Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
        ).optional(),
        sha256: z.string().describe(
          "[Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
        ).optional(),
      }).optional(),
      sourceSnapshot: z.string().describe(
        "The source snapshot to create this disk. When creating a new instance boot disk, one of initializeParams.sourceSnapshot orinitializeParams.sourceImage or disks.source is required. To create a disk with a snapshot that you created, specify the snapshot name in the following format: global/snapshots/my-backup If the source snapshot is deleted later, this field will not be set. Note: You cannot create VMs in bulk using a snapshot as the source. Use an image instead when you create VMs using the bulk insert method.",
      ).optional(),
      sourceSnapshotEncryptionKey: z.object({
        kmsKeyName: z.string().describe(
          'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
        ).optional(),
        kmsKeyServiceAccount: z.string().describe(
          'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
        ).optional(),
        rawKey: z.string().describe(
          'Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
        ).optional(),
        rsaEncryptedKey: z.string().describe(
          'Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
        ).optional(),
        sha256: z.string().describe(
          "[Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
        ).optional(),
      }).optional(),
      storagePool: z.string().describe(
        "The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool",
      ).optional(),
    }).describe(
      "[Input Only] Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new instance. This field is persisted and returned for instanceTemplate and not returned in the context of instance. This property is mutually exclusive with the source property; you can only define one or the other, but not both.",
    ).optional(),
    interface: z.enum(["NVME", "SCSI"]).describe(
      "Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. For most machine types, the default is SCSI. Local SSDs can use either NVME or SCSI. In certain configurations, persistent disks can use NVMe. For more information, seeAbout persistent disks.",
    ).optional(),
    kind: z.string().describe(
      "Output only. [Output Only] Type of the resource. Alwayscompute#attachedDisk for attached disks.",
    ).optional(),
    licenses: z.array(z.string()).describe(
      "Output only. [Output Only] Any valid publicly visible licenses.",
    ).optional(),
    mode: z.enum(["READ_ONLY", "READ_WRITE"]).describe(
      "The mode in which to attach this disk, either READ_WRITE orREAD_ONLY. If not specified, the default is to attach the disk in READ_WRITE mode.",
    ).optional(),
    savedState: z.enum(["DISK_SAVED_STATE_UNSPECIFIED", "PRESERVED"]).describe(
      "Output only. For LocalSSD disks on VM Instances in STOPPED or SUSPENDED state, this field is set to PRESERVED if the LocalSSD data has been saved to a persistent location by customer request. (see the discard_local_ssd option on Stop/Suspend). Read-only in the api.",
    ).optional(),
    shieldedInstanceInitialState: z.object({
      dbs: z.array(z.object({
        content: z.unknown().describe(
          "The raw content in the secure keys file.",
        ).optional(),
        fileType: z.unknown().describe("The file type of source file.")
          .optional(),
      })).describe("The Key Database (db).").optional(),
      dbxs: z.array(z.object({
        content: z.unknown().describe(
          "The raw content in the secure keys file.",
        ).optional(),
        fileType: z.unknown().describe("The file type of source file.")
          .optional(),
      })).describe("The forbidden key database (dbx).").optional(),
      keks: z.array(z.object({
        content: z.unknown().describe(
          "The raw content in the secure keys file.",
        ).optional(),
        fileType: z.unknown().describe("The file type of source file.")
          .optional(),
      })).describe("The Key Exchange Key (KEK).").optional(),
      pk: z.object({
        content: z.string().describe("The raw content in the secure keys file.")
          .optional(),
        fileType: z.enum(["BIN", "UNDEFINED", "X509"]).describe(
          "The file type of source file.",
        ).optional(),
      }).optional(),
    }).describe(
      "Initial State for shielded instance, these are public keys which are safe to store in public",
    ).optional(),
    source: z.string().describe(
      "Specifies a valid partial or full URL to an existing Persistent Disk resource. When creating a new instance boot disk, one ofinitializeParams.sourceImage orinitializeParams.sourceSnapshot or disks.source is required. If desired, you can also attach existing non-root persistent disks using this property. This field is only applicable for persistent disks. Note that for InstanceTemplate, specify the disk name for zonal disk, and the URL for regional disk.",
    ).optional(),
    type: z.enum(["PERSISTENT", "SCRATCH"]).describe(
      "Specifies the type of the disk, either SCRATCH orPERSISTENT. If not specified, the default isPERSISTENT.",
    ).optional(),
  })).describe(
    "Array of disks associated with this instance. Persistent disks must be created before you can assign them.",
  ).optional(),
  displayDevice: z.object({
    enableDisplay: z.boolean().describe(
      "Defines whether the instance has Display enabled.",
    ).optional(),
  }).describe("A set of Display Device options").optional(),
  fingerprint: z.string().describe(
    "Specifies a fingerprint for this resource, which is essentially a hash of the instance's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update the instance. You must always provide an up-to-date fingerprint hash in order to update the instance. To see the latest fingerprint, make get() request to the instance.",
  ).optional(),
  guestAccelerators: z.array(z.object({
    acceleratorCount: z.number().int().describe(
      "The number of the guest accelerator cards exposed to this instance.",
    ).optional(),
    acceleratorType: z.string().describe(
      "Full or partial URL of the accelerator type resource to attach to this instance. For example:projects/my-project/zones/us-central1-c/acceleratorTypes/nvidia-tesla-p100 If you are creating an instance template, specify only the accelerator name. See GPUs on Compute Engine for a full list of accelerator types.",
    ).optional(),
  })).describe(
    "A list of the type and count of accelerator cards attached to the instance.",
  ).optional(),
  hostname: z.string().describe(
    "Specifies the hostname of the instance. The specified hostname must be RFC1035 compliant. If hostname is not specified, the default hostname is [INSTANCE_NAME].c.[PROJECT_ID].internal when using the global DNS, and [INSTANCE_NAME].[ZONE].c.[PROJECT_ID].internal when using zonal DNS.",
  ).optional(),
  instanceEncryptionKey: z.object({
    kmsKeyName: z.string().describe(
      'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
    ).optional(),
    kmsKeyServiceAccount: z.string().describe(
      'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
    ).optional(),
    rawKey: z.string().describe(
      'Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
    ).optional(),
    rsaEncryptedKey: z.string().describe(
      'Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
    ).optional(),
    sha256: z.string().describe(
      "[Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
    ).optional(),
  }).optional(),
  keyRevocationActionType: z.enum([
    "KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED",
    "NONE",
    "STOP",
  ]).describe(
    'KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified.',
  ).optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for this request, which is essentially a hash of the label's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the instance.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels to apply to this instance. These can be later modified by the setLabels method.",
  ).optional(),
  machineType: z.string().describe(
    "Full or partial URL of the machine type resource to use for this instance, in the format:zones/zone/machineTypes/machine-type. This is provided by the client when the instance is created. For example, the following is a valid partial url to a predefined machine type: zones/us-central1-f/machineTypes/n1-standard-1 To create acustom machine type, provide a URL to a machine type in the following format, where CPUS is 1 or an even number up to 32 (2, 4, 6,... 24, etc), and MEMORY is the total memory for this instance. Memory must be a multiple of 256 MB and must be supplied in MB (e.g. 5 GB of memory is 5120 MB): zones/zone/machineTypes/custom-CPUS-MEMORY For example: zones/us-central1-f/machineTypes/custom-4-5120 For a full list of restrictions, read theSpecifications for custom machine types.",
  ).optional(),
  metadata: z.object({
    fingerprint: z.string().describe(
      "Specifies a fingerprint for this request, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the resource.",
    ).optional(),
    items: z.array(z.object({
      key: z.string().regex(new RegExp("[a-zA-Z0-9-_]{1,128}")).describe(
        "Key for the metadata entry. Keys must conform to the following regexp: [a-zA-Z0-9-_]+, and be less than 128 bytes in length. This is reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project.",
      ).optional(),
      value: z.string().describe(
        "Value for the metadata entry. These are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on values is that their size must be less than or equal to 262144 bytes (256 KiB).",
      ).optional(),
    })).describe(
      "Array of key/value pairs. The total size of all keys and values must be less than 512 KB.",
    ).optional(),
    kind: z.string().describe(
      "Output only. [Output Only] Type of the resource. Always compute#metadata for metadata.",
    ).optional(),
  }).describe("A metadata key/value entry.").optional(),
  minCpuPlatform: z.string().describe(
    'Specifies aminimum CPU platform for the VM instance. Applicable values are the friendly names of CPU platforms, such as minCpuPlatform: "Intel Haswell" or minCpuPlatform: "Intel Sandy Bridge".',
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  networkInterfaces: z.array(z.object({
    accessConfigs: z.array(z.object({
      externalIpv6: z.string().describe(
        "Applies to ipv6AccessConfigs only. The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored inexternalIpv6PrefixLength in ipv6AccessConfig. To use a static external IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an external IPv6 address from the instance's subnetwork.",
      ).optional(),
      externalIpv6PrefixLength: z.number().int().describe(
        "Applies to ipv6AccessConfigs only. The prefix length of the external IPv6 range.",
      ).optional(),
      kind: z.string().describe(
        "Output only. [Output Only] Type of the resource. Alwayscompute#accessConfig for access configs.",
      ).optional(),
      name: z.string().describe(
        "The name of this access configuration. In accessConfigs (IPv4), the default and recommended name is External NAT, but you can use any arbitrary string, such as My external IP orNetwork Access. In ipv6AccessConfigs, the recommend name is External IPv6.",
      ).optional(),
      natIP: z.string().describe(
        "Applies to accessConfigs (IPv4) only. Anexternal IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance.",
      ).optional(),
      networkTier: z.enum([
        "FIXED_STANDARD",
        "PREMIUM",
        "STANDARD",
        "STANDARD_OVERRIDES_FIXED_STANDARD",
      ]).describe(
        "This signifies the networking tier used for configuring this access configuration and can only take the following values: PREMIUM,STANDARD. If an AccessConfig is specified without a valid external IP address, an ephemeral IP will be created with this networkTier. If an AccessConfig with a valid external IP address is specified, it must match that of the networkTier associated with the Address resource owning that IP.",
      ).optional(),
      publicPtrDomainName: z.string().describe(
        "The DNS domain name for the public PTR record. You can set this field only if the `setPublicPtr` field is enabled inaccessConfig. If this field is unspecified inipv6AccessConfig, a default PTR record will be created for first IP in associated external IPv6 range.",
      ).optional(),
      securityPolicy: z.string().describe(
        "The resource URL for the security policy associated with this access config.",
      ).optional(),
      setPublicPtr: z.boolean().describe(
        "Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name. This field is not used in ipv6AccessConfig. A default PTR record will be created if the VM has external IPv6 range associated.",
      ).optional(),
      type: z.enum(["DIRECT_IPV6", "ONE_TO_ONE_NAT"]).describe(
        "The type of configuration. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. Inipv6AccessConfigs, the default and only option isDIRECT_IPV6.",
      ).optional(),
    })).describe(
      "An array of configurations for this interface. Currently, only one access config, ONE_TO_ONE_NAT, is supported. If there are noaccessConfigs specified, then this instance will have no external internet access.",
    ).optional(),
    aliasIpRanges: z.array(z.object({
      ipCidrRange: z.string().describe(
        "The IP alias ranges to allocate for this interface. This IP CIDR range must belong to the specified subnetwork and cannot contain IP addresses reserved by system or used by other network interfaces. This range may be a single IP address (such as 10.2.3.4), a netmask (such as/24) or a CIDR-formatted string (such as10.1.2.0/24).",
      ).optional(),
      subnetworkRangeName: z.string().describe(
        "The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used.",
      ).optional(),
    })).describe(
      "An array of alias IP ranges for this network interface. You can only specify this field for network interfaces in VPC networks.",
    ).optional(),
    enableVpcScopedDns: z.boolean().describe(
      "Optional. If true, DNS resolution will be enabled over this interface. Only valid with network_attachment.",
    ).optional(),
    fingerprint: z.string().describe(
      "Fingerprint hash of contents stored in this network interface. This field will be ignored when inserting an Instance or adding a NetworkInterface. An up-to-date fingerprint must be provided in order to update theNetworkInterface. The request will fail with error400 Bad Request if the fingerprint is not provided, or412 Precondition Failed if the fingerprint is out of date.",
    ).optional(),
    igmpQuery: z.enum(["IGMP_QUERY_DISABLED", "IGMP_QUERY_V2"]).describe(
      "Indicate whether igmp query is enabled on the network interface or not. If enabled, also indicates the version of IGMP supported.",
    ).optional(),
    internalIpv6PrefixLength: z.number().int().describe(
      "The prefix length of the primary internal IPv6 range.",
    ).optional(),
    ipv6AccessConfigs: z.array(z.object({
      externalIpv6: z.string().describe(
        "Applies to ipv6AccessConfigs only. The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored inexternalIpv6PrefixLength in ipv6AccessConfig. To use a static external IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an external IPv6 address from the instance's subnetwork.",
      ).optional(),
      externalIpv6PrefixLength: z.number().int().describe(
        "Applies to ipv6AccessConfigs only. The prefix length of the external IPv6 range.",
      ).optional(),
      kind: z.string().describe(
        "Output only. [Output Only] Type of the resource. Alwayscompute#accessConfig for access configs.",
      ).optional(),
      name: z.string().describe(
        "The name of this access configuration. In accessConfigs (IPv4), the default and recommended name is External NAT, but you can use any arbitrary string, such as My external IP orNetwork Access. In ipv6AccessConfigs, the recommend name is External IPv6.",
      ).optional(),
      natIP: z.string().describe(
        "Applies to accessConfigs (IPv4) only. Anexternal IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance.",
      ).optional(),
      networkTier: z.enum([
        "FIXED_STANDARD",
        "PREMIUM",
        "STANDARD",
        "STANDARD_OVERRIDES_FIXED_STANDARD",
      ]).describe(
        "This signifies the networking tier used for configuring this access configuration and can only take the following values: PREMIUM,STANDARD. If an AccessConfig is specified without a valid external IP address, an ephemeral IP will be created with this networkTier. If an AccessConfig with a valid external IP address is specified, it must match that of the networkTier associated with the Address resource owning that IP.",
      ).optional(),
      publicPtrDomainName: z.string().describe(
        "The DNS domain name for the public PTR record. You can set this field only if the `setPublicPtr` field is enabled inaccessConfig. If this field is unspecified inipv6AccessConfig, a default PTR record will be created for first IP in associated external IPv6 range.",
      ).optional(),
      securityPolicy: z.string().describe(
        "The resource URL for the security policy associated with this access config.",
      ).optional(),
      setPublicPtr: z.boolean().describe(
        "Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name. This field is not used in ipv6AccessConfig. A default PTR record will be created if the VM has external IPv6 range associated.",
      ).optional(),
      type: z.enum(["DIRECT_IPV6", "ONE_TO_ONE_NAT"]).describe(
        "The type of configuration. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. Inipv6AccessConfigs, the default and only option isDIRECT_IPV6.",
      ).optional(),
    })).describe(
      "An array of IPv6 access configurations for this interface. Currently, only one IPv6 access config, DIRECT_IPV6, is supported. If there is no ipv6AccessConfig specified, then this instance will have no external IPv6 Internet access.",
    ).optional(),
    ipv6AccessType: z.enum(["EXTERNAL", "INTERNAL"]).describe(
      "Output only. [Output Only] One of EXTERNAL, INTERNAL to indicate whether the IP can be accessed from the Internet. This field is always inherited from its subnetwork. Valid only if stackType is IPV4_IPV6.",
    ).optional(),
    ipv6Address: z.string().describe(
      "An IPv6 internal network address for this network interface. To use a static internal IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an internal IPv6 address from the instance's subnetwork.",
    ).optional(),
    kind: z.string().describe(
      "Output only. [Output Only] Type of the resource. Alwayscompute#networkInterface for network interfaces.",
    ).optional(),
    name: z.string().describe(
      "[Output Only] The name of the network interface, which is generated by the server. For a VM, the network interface uses the nicN naming format. Where N is a value between 0 and7. The default interface value is nic0.",
    ).optional(),
    network: z.string().describe(
      "URL of the VPC network resource for this instance. When creating an instance, if neither the network nor the subnetwork is specified, the default network global/networks/default is used. If the selected project doesn't have the default network, you must specify a network or subnet. If the network is not specified but the subnetwork is specified, the network is inferred. If you specify this property, you can specify the network as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/global/networks/network - projects/project/global/networks/network - global/networks/default",
    ).optional(),
    networkAttachment: z.string().describe(
      "The URL of the network attachment that this interface should connect to in the following format: projects/{project_number}/regions/{region_name}/networkAttachments/{network_attachment_name}.",
    ).optional(),
    networkIP: z.string().describe(
      "An IPv4 internal IP address to assign to the instance for this network interface. If not specified by the user, an unused internal IP is assigned by the system.",
    ).optional(),
    nicType: z.enum([
      "GVNIC",
      "IDPF",
      "IRDMA",
      "MRDMA",
      "UNSPECIFIED_NIC_TYPE",
      "VIRTIO_NET",
    ]).describe(
      "The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet.",
    ).optional(),
    parentNicName: z.string().describe(
      "Name of the parent network interface of a dynamic network interface.",
    ).optional(),
    queueCount: z.number().int().describe(
      "The networking queue count that's specified by users for the network interface. Both Rx and Tx queues will be set to this number. It'll be empty if not specified by the users.",
    ).optional(),
    serviceClassId: z.string().describe(
      "Optional. Producer Service's Service class Id for the region of this network interface. Can only be used with network_attachment. It is not possible to use on its own however, network_attachment can be used without service_class_id.",
    ).optional(),
    stackType: z.enum(["IPV4_IPV6", "IPV4_ONLY", "IPV6_ONLY"]).describe(
      "The stack type for this network interface. To assign only IPv4 addresses, use IPV4_ONLY. To assign both IPv4 and IPv6 addresses, useIPV4_IPV6. If not specified, IPV4_ONLY is used. This field can be both set at instance creation and update network interface operations.",
    ).optional(),
    subnetwork: z.string().describe(
      "The URL of the Subnetwork resource for this instance. If the network resource is inlegacy mode, do not specify this field. If the network is in auto subnet mode, specifying the subnetwork is optional. If the network is in custom subnet mode, specifying the subnetwork is required. If you specify this field, you can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/regions/region/subnetworks/subnetwork - regions/region/subnetworks/subnetwork",
    ).optional(),
    vlan: z.number().int().describe(
      "VLAN tag of a dynamic network interface, must be an integer in the range from 2 to 255 inclusively.",
    ).optional(),
  })).describe(
    "An array of network configurations for this instance. These specify how interfaces are configured to interact with other network services, such as connecting to the internet. Multiple interfaces are supported per instance.",
  ).optional(),
  networkPerformanceConfig: z.object({
    totalEgressBandwidthTier: z.enum(["DEFAULT", "TIER_1"]).optional(),
  }).optional(),
  params: z.object({
    requestValidForDuration: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the instance. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional instance params.").optional(),
  privateIpv6GoogleAccess: z.enum([
    "ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE",
    "ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE",
    "INHERIT_FROM_SUBNETWORK",
  ]).describe(
    "The private IPv6 google access type for the VM. If not specified, use INHERIT_FROM_SUBNETWORK as default.",
  ).optional(),
  reservationAffinity: z.object({
    consumeReservationType: z.enum([
      "ANY_RESERVATION",
      "NO_RESERVATION",
      "SPECIFIC_RESERVATION",
      "UNSPECIFIED",
    ]).describe(
      "Specifies the type of reservation from which this instance can consume resources: ANY_RESERVATION (default),SPECIFIC_RESERVATION, or NO_RESERVATION. See Consuming reserved instances for examples.",
    ).optional(),
    key: z.string().describe(
      "Corresponds to the label key of a reservation resource. To target aSPECIFIC_RESERVATION by name, specifygoogleapis.com/reservation-name as the key and specify the name of your reservation as its value.",
    ).optional(),
    values: z.array(z.string()).describe(
      'Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or "projects/different-project/reservations/some-reservation-name" to target a shared reservation in the same zone but in a different project.',
    ).optional(),
  }).describe("Specifies the reservations that this instance can consume from.")
    .optional(),
  resourcePolicies: z.array(z.string()).describe(
    "Resource policies applied to this instance.",
  ).optional(),
  scheduling: z.object({
    automaticRestart: z.boolean().describe(
      "Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user). You can only set the automatic restart option for standard instances.Preemptible instances cannot be automatically restarted. By default, this is set to true so an instance is automatically restarted if it is terminated by Compute Engine.",
    ).optional(),
    availabilityDomain: z.number().int().describe(
      "Specifies the availability domain to place the instance in. The value must be a number between 1 and the number of availability domains specified in the spread placement policy attached to the instance.",
    ).optional(),
    hostErrorTimeoutSeconds: z.number().int().describe(
      "Specify the time in seconds for host error detection, the value must be within the range of [90, 330] with the increment of 30, if unset, the default behavior of host error recovery will be used.",
    ).optional(),
    instanceTerminationAction: z.enum([
      "DELETE",
      "INSTANCE_TERMINATION_ACTION_UNSPECIFIED",
      "STOP",
    ]).describe("Specifies the termination action for the instance.")
      .optional(),
    localSsdRecoveryTimeout: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    locationHint: z.string().describe(
      "An opaque location hint used to place the instance close to other resources. This field is for use by internal tools that use the public API.",
    ).optional(),
    maxRunDuration: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    minNodeCpus: z.number().int().describe(
      "The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node.",
    ).optional(),
    nodeAffinities: z.array(z.object({
      key: z.string().describe("Corresponds to the label key of Node resource.")
        .optional(),
      operator: z.enum(["IN", "NOT_IN", "OPERATOR_UNSPECIFIED"]).describe(
        "Defines the operation of node selection. Valid operators areIN for affinity and NOT_IN for anti-affinity.",
      ).optional(),
      values: z.array(z.string()).describe(
        "Corresponds to the label values of Node resource.",
      ).optional(),
    })).describe(
      "A set of node affinity and anti-affinity configurations. Refer toConfiguring node affinity for more information. Overrides reservationAffinity.",
    ).optional(),
    onHostMaintenance: z.enum(["MIGRATE", "TERMINATE"]).describe(
      "Defines the maintenance behavior for this instance. For standard instances, the default behavior is MIGRATE. Forpreemptible instances, the default and only possible behavior is TERMINATE. For more information, see Set VM host maintenance policy.",
    ).optional(),
    onInstanceStopAction: z.object({
      discardLocalSsd: z.boolean().describe(
        "If true, the contents of any attached Local SSD disks will be discarded else, the Local SSD data will be preserved when the instance is stopped at the end of the run duration/termination time.",
      ).optional(),
    }).describe(
      "Defines the behaviour for instances with the instance_termination_actionSTOP.",
    ).optional(),
    preemptible: z.boolean().describe(
      "Defines whether the instance is preemptible. This can only be set during instance creation or while the instance isstopped and therefore, in a `TERMINATED` state. SeeInstance Life Cycle for more information on the possible instance states.",
    ).optional(),
    provisioningModel: z.enum([
      "FLEX_START",
      "RESERVATION_BOUND",
      "SPOT",
      "STANDARD",
    ]).describe("Specifies the provisioning model of the instance.").optional(),
    skipGuestOsShutdown: z.boolean().describe(
      "Default is false and there will be 120 seconds between GCE ACPI G2 Soft Off and ACPI G3 Mechanical Off for Standard VMs and 30 seconds for Spot VMs.",
    ).optional(),
    terminationTime: z.string().describe(
      "Specifies the timestamp, when the instance will be terminated, inRFC3339 text format. If specified, the instance termination action will be performed at the termination time.",
    ).optional(),
  }).describe("Sets the scheduling options for an Instance.").optional(),
  serviceAccounts: z.array(z.object({
    email: z.string().describe("Email address of the service account.")
      .optional(),
    scopes: z.array(z.string()).describe(
      "The list of scopes to be made available for this service account.",
    ).optional(),
  })).describe(
    "A list of service accounts, with their specified scopes, authorized for this instance. Only one service account per VM instance is supported. Service accounts generate access tokens that can be accessed through the metadata server and used to authenticate applications on the instance. SeeService Accounts for more information.",
  ).optional(),
  shieldedInstanceConfig: z.object({
    enableIntegrityMonitoring: z.boolean().describe(
      "Defines whether the instance has integrity monitoring enabled.Enabled by default.",
    ).optional(),
    enableSecureBoot: z.boolean().describe(
      "Defines whether the instance has Secure Boot enabled.Disabled by default.",
    ).optional(),
    enableVtpm: z.boolean().describe(
      "Defines whether the instance has the vTPM enabled.Enabled by default.",
    ).optional(),
  }).describe("A set of Shielded Instance options.").optional(),
  shieldedInstanceIntegrityPolicy: z.object({
    updateAutoLearnPolicy: z.boolean().describe(
      "Updates the integrity policy baseline using the measurements from the VM instance's most recent boot.",
    ).optional(),
  }).describe(
    "The policy describes the baseline against which Instance boot integrity is measured.",
  ).optional(),
  sourceMachineImage: z.string().describe("Source machine image").optional(),
  sourceMachineImageEncryptionKey: z.object({
    kmsKeyName: z.string().describe(
      'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
    ).optional(),
    kmsKeyServiceAccount: z.string().describe(
      'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
    ).optional(),
    rawKey: z.string().describe(
      'Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
    ).optional(),
    rsaEncryptedKey: z.string().describe(
      'Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
    ).optional(),
    sha256: z.string().describe(
      "[Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
    ).optional(),
  }).optional(),
  tags: z.object({
    fingerprint: z.string().describe(
      "Specifies a fingerprint for this request, which is essentially a hash of the tags' contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update tags. You must always provide an up-to-date fingerprint hash in order to update or change tags. To see the latest fingerprint, make get() request to the instance.",
    ).optional(),
    items: z.array(z.string()).describe(
      "An array of tags. Each tag must be 1-63 characters long, and comply with RFC1035.",
    ).optional(),
  }).describe("A set of instance tags.").optional(),
  workloadIdentityConfig: z.object({
    identity: z.string().optional(),
    identityCertificateEnabled: z.boolean().optional(),
  }).optional(),
  zone: z.string().describe(
    "Output only. [Output Only] URL of the zone where the instance resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  sourceInstanceTemplate: z.string().describe(
    "Specifies instance template to create the instance. This field is optional. It can be a full or partial URL. For example, the following are all valid URLs to an instance template: - https://www.googleapis.com/compute/v1/projects/project/global/instanceTemplates/instanceTemplate - projects/project/global/instanceTemplates/instanceTemplate - global/instanceTemplates/instanceTemplate",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine Instances. Registered at `@swamp/gcp/compute/instances`. */
export const model = {
  type: "@swamp/gcp/compute/instances",
  version: "2026.05.01.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "Removed: partnerMetadata",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { partnerMetadata: _partnerMetadata, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.04.04.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents an Instance resource. An instance is a virtual machine that is hos...",
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        const body: Record<string, unknown> = {};
        if (g["advancedMachineFeatures"] !== undefined) {
          body["advancedMachineFeatures"] = g["advancedMachineFeatures"];
        }
        if (g["canIpForward"] !== undefined) {
          body["canIpForward"] = g["canIpForward"];
        }
        if (g["confidentialInstanceConfig"] !== undefined) {
          body["confidentialInstanceConfig"] = g["confidentialInstanceConfig"];
        }
        if (g["deletionProtection"] !== undefined) {
          body["deletionProtection"] = g["deletionProtection"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disks"] !== undefined) body["disks"] = g["disks"];
        if (g["displayDevice"] !== undefined) {
          body["displayDevice"] = g["displayDevice"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["guestAccelerators"] !== undefined) {
          body["guestAccelerators"] = g["guestAccelerators"];
        }
        if (g["hostname"] !== undefined) body["hostname"] = g["hostname"];
        if (g["instanceEncryptionKey"] !== undefined) {
          body["instanceEncryptionKey"] = g["instanceEncryptionKey"];
        }
        if (g["keyRevocationActionType"] !== undefined) {
          body["keyRevocationActionType"] = g["keyRevocationActionType"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["machineType"] !== undefined) {
          body["machineType"] = g["machineType"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["minCpuPlatform"] !== undefined) {
          body["minCpuPlatform"] = g["minCpuPlatform"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkInterfaces"] !== undefined) {
          body["networkInterfaces"] = g["networkInterfaces"];
        }
        if (g["networkPerformanceConfig"] !== undefined) {
          body["networkPerformanceConfig"] = g["networkPerformanceConfig"];
        }
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["privateIpv6GoogleAccess"] !== undefined) {
          body["privateIpv6GoogleAccess"] = g["privateIpv6GoogleAccess"];
        }
        if (g["reservationAffinity"] !== undefined) {
          body["reservationAffinity"] = g["reservationAffinity"];
        }
        if (g["resourcePolicies"] !== undefined) {
          body["resourcePolicies"] = g["resourcePolicies"];
        }
        if (g["scheduling"] !== undefined) body["scheduling"] = g["scheduling"];
        if (g["serviceAccounts"] !== undefined) {
          body["serviceAccounts"] = g["serviceAccounts"];
        }
        if (g["shieldedInstanceConfig"] !== undefined) {
          body["shieldedInstanceConfig"] = g["shieldedInstanceConfig"];
        }
        if (g["shieldedInstanceIntegrityPolicy"] !== undefined) {
          body["shieldedInstanceIntegrityPolicy"] =
            g["shieldedInstanceIntegrityPolicy"];
        }
        if (g["sourceMachineImage"] !== undefined) {
          body["sourceMachineImage"] = g["sourceMachineImage"];
        }
        if (g["sourceMachineImageEncryptionKey"] !== undefined) {
          body["sourceMachineImageEncryptionKey"] =
            g["sourceMachineImageEncryptionKey"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["workloadIdentityConfig"] !== undefined) {
          body["workloadIdentityConfig"] = g["workloadIdentityConfig"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["sourceInstanceTemplate"] !== undefined) {
          body["sourceInstanceTemplate"] = g["sourceInstanceTemplate"];
        }
        if (g["name"] !== undefined) params["instance"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["RUNNING"],
              "failedValues": ["STOPPED", "TERMINATED"],
            }
            : undefined,
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["instance"] = args.identifier;
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        else if (existing["zone"]) params["zone"] = String(existing["zone"]);
        params["instance"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["advancedMachineFeatures"] !== undefined) {
          body["advancedMachineFeatures"] = g["advancedMachineFeatures"];
        }
        if (g["canIpForward"] !== undefined) {
          body["canIpForward"] = g["canIpForward"];
        }
        if (g["confidentialInstanceConfig"] !== undefined) {
          body["confidentialInstanceConfig"] = g["confidentialInstanceConfig"];
        }
        if (g["deletionProtection"] !== undefined) {
          body["deletionProtection"] = g["deletionProtection"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disks"] !== undefined) body["disks"] = g["disks"];
        if (g["displayDevice"] !== undefined) {
          body["displayDevice"] = g["displayDevice"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["guestAccelerators"] !== undefined) {
          body["guestAccelerators"] = g["guestAccelerators"];
        }
        if (g["hostname"] !== undefined) body["hostname"] = g["hostname"];
        if (g["instanceEncryptionKey"] !== undefined) {
          body["instanceEncryptionKey"] = g["instanceEncryptionKey"];
        }
        if (g["keyRevocationActionType"] !== undefined) {
          body["keyRevocationActionType"] = g["keyRevocationActionType"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["machineType"] !== undefined) {
          body["machineType"] = g["machineType"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["minCpuPlatform"] !== undefined) {
          body["minCpuPlatform"] = g["minCpuPlatform"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkInterfaces"] !== undefined) {
          body["networkInterfaces"] = g["networkInterfaces"];
        }
        if (g["networkPerformanceConfig"] !== undefined) {
          body["networkPerformanceConfig"] = g["networkPerformanceConfig"];
        }
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["privateIpv6GoogleAccess"] !== undefined) {
          body["privateIpv6GoogleAccess"] = g["privateIpv6GoogleAccess"];
        }
        if (g["reservationAffinity"] !== undefined) {
          body["reservationAffinity"] = g["reservationAffinity"];
        }
        if (g["resourcePolicies"] !== undefined) {
          body["resourcePolicies"] = g["resourcePolicies"];
        }
        if (g["scheduling"] !== undefined) body["scheduling"] = g["scheduling"];
        if (g["serviceAccounts"] !== undefined) {
          body["serviceAccounts"] = g["serviceAccounts"];
        }
        if (g["shieldedInstanceConfig"] !== undefined) {
          body["shieldedInstanceConfig"] = g["shieldedInstanceConfig"];
        }
        if (g["shieldedInstanceIntegrityPolicy"] !== undefined) {
          body["shieldedInstanceIntegrityPolicy"] =
            g["shieldedInstanceIntegrityPolicy"];
        }
        if (g["sourceMachineImage"] !== undefined) {
          body["sourceMachineImage"] = g["sourceMachineImage"];
        }
        if (g["sourceMachineImageEncryptionKey"] !== undefined) {
          body["sourceMachineImageEncryptionKey"] =
            g["sourceMachineImageEncryptionKey"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["workloadIdentityConfig"] !== undefined) {
          body["workloadIdentityConfig"] = g["workloadIdentityConfig"];
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
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["RUNNING"],
              "failedValues": ["STOPPED", "TERMINATED"],
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["instance"] = args.identifier;
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
          if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
          else if (existing["zone"]) params["zone"] = String(existing["zone"]);
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["instance"] = identifier;
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
    add_access_config: {
      description: "add access config",
      arguments: z.object({
        externalIpv6: z.any().optional(),
        externalIpv6PrefixLength: z.any().optional(),
        kind: z.any().optional(),
        name: z.any().optional(),
        natIP: z.any().optional(),
        networkTier: z.any().optional(),
        publicPtrDomainName: z.any().optional(),
        securityPolicy: z.any().optional(),
        setPublicPtr: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["instance"]?.toString() ??
          g["instance"]?.toString() ?? "";
        params["networkInterface"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["externalIpv6"] !== undefined) {
          body["externalIpv6"] = args["externalIpv6"];
        }
        if (args["externalIpv6PrefixLength"] !== undefined) {
          body["externalIpv6PrefixLength"] = args["externalIpv6PrefixLength"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["natIP"] !== undefined) body["natIP"] = args["natIP"];
        if (args["networkTier"] !== undefined) {
          body["networkTier"] = args["networkTier"];
        }
        if (args["publicPtrDomainName"] !== undefined) {
          body["publicPtrDomainName"] = args["publicPtrDomainName"];
        }
        if (args["securityPolicy"] !== undefined) {
          body["securityPolicy"] = args["securityPolicy"];
        }
        if (args["setPublicPtr"] !== undefined) {
          body["setPublicPtr"] = args["setPublicPtr"];
        }
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.addAccessConfig",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/addAccessConfig",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "instance",
              "networkInterface",
            ],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "networkInterface": { "location": "query", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    add_network_interface: {
      description: "add network interface",
      arguments: z.object({
        accessConfigs: z.any().optional(),
        aliasIpRanges: z.any().optional(),
        enableVpcScopedDns: z.any().optional(),
        fingerprint: z.any().optional(),
        igmpQuery: z.any().optional(),
        internalIpv6PrefixLength: z.any().optional(),
        ipv6AccessConfigs: z.any().optional(),
        ipv6AccessType: z.any().optional(),
        ipv6Address: z.any().optional(),
        kind: z.any().optional(),
        name: z.any().optional(),
        network: z.any().optional(),
        networkAttachment: z.any().optional(),
        networkIP: z.any().optional(),
        nicType: z.any().optional(),
        parentNicName: z.any().optional(),
        queueCount: z.any().optional(),
        serviceClassId: z.any().optional(),
        stackType: z.any().optional(),
        subnetwork: z.any().optional(),
        vlan: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["accessConfigs"] !== undefined) {
          body["accessConfigs"] = args["accessConfigs"];
        }
        if (args["aliasIpRanges"] !== undefined) {
          body["aliasIpRanges"] = args["aliasIpRanges"];
        }
        if (args["enableVpcScopedDns"] !== undefined) {
          body["enableVpcScopedDns"] = args["enableVpcScopedDns"];
        }
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["igmpQuery"] !== undefined) {
          body["igmpQuery"] = args["igmpQuery"];
        }
        if (args["internalIpv6PrefixLength"] !== undefined) {
          body["internalIpv6PrefixLength"] = args["internalIpv6PrefixLength"];
        }
        if (args["ipv6AccessConfigs"] !== undefined) {
          body["ipv6AccessConfigs"] = args["ipv6AccessConfigs"];
        }
        if (args["ipv6AccessType"] !== undefined) {
          body["ipv6AccessType"] = args["ipv6AccessType"];
        }
        if (args["ipv6Address"] !== undefined) {
          body["ipv6Address"] = args["ipv6Address"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["network"] !== undefined) body["network"] = args["network"];
        if (args["networkAttachment"] !== undefined) {
          body["networkAttachment"] = args["networkAttachment"];
        }
        if (args["networkIP"] !== undefined) {
          body["networkIP"] = args["networkIP"];
        }
        if (args["nicType"] !== undefined) body["nicType"] = args["nicType"];
        if (args["parentNicName"] !== undefined) {
          body["parentNicName"] = args["parentNicName"];
        }
        if (args["queueCount"] !== undefined) {
          body["queueCount"] = args["queueCount"];
        }
        if (args["serviceClassId"] !== undefined) {
          body["serviceClassId"] = args["serviceClassId"];
        }
        if (args["stackType"] !== undefined) {
          body["stackType"] = args["stackType"];
        }
        if (args["subnetwork"] !== undefined) {
          body["subnetwork"] = args["subnetwork"];
        }
        if (args["vlan"] !== undefined) body["vlan"] = args["vlan"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.addNetworkInterface",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/addNetworkInterface",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    add_resource_policies: {
      description: "add resource policies",
      arguments: z.object({
        resourcePolicies: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["resourcePolicies"] !== undefined) {
          body["resourcePolicies"] = args["resourcePolicies"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.addResourcePolicies",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/addResourcePolicies",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    attach_disk: {
      description: "attach disk",
      arguments: z.object({
        architecture: z.any().optional(),
        autoDelete: z.any().optional(),
        boot: z.any().optional(),
        deviceName: z.any().optional(),
        diskEncryptionKey: z.any().optional(),
        diskSizeGb: z.any().optional(),
        forceAttach: z.any().optional(),
        guestOsFeatures: z.any().optional(),
        index: z.any().optional(),
        initializeParams: z.any().optional(),
        interface: z.any().optional(),
        kind: z.any().optional(),
        licenses: z.any().optional(),
        mode: z.any().optional(),
        savedState: z.any().optional(),
        shieldedInstanceInitialState: z.any().optional(),
        source: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["architecture"] !== undefined) {
          body["architecture"] = args["architecture"];
        }
        if (args["autoDelete"] !== undefined) {
          body["autoDelete"] = args["autoDelete"];
        }
        if (args["boot"] !== undefined) body["boot"] = args["boot"];
        if (args["deviceName"] !== undefined) {
          body["deviceName"] = args["deviceName"];
        }
        if (args["diskEncryptionKey"] !== undefined) {
          body["diskEncryptionKey"] = args["diskEncryptionKey"];
        }
        if (args["diskSizeGb"] !== undefined) {
          body["diskSizeGb"] = args["diskSizeGb"];
        }
        if (args["forceAttach"] !== undefined) {
          body["forceAttach"] = args["forceAttach"];
        }
        if (args["guestOsFeatures"] !== undefined) {
          body["guestOsFeatures"] = args["guestOsFeatures"];
        }
        if (args["index"] !== undefined) body["index"] = args["index"];
        if (args["initializeParams"] !== undefined) {
          body["initializeParams"] = args["initializeParams"];
        }
        if (args["interface"] !== undefined) {
          body["interface"] = args["interface"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["licenses"] !== undefined) body["licenses"] = args["licenses"];
        if (args["mode"] !== undefined) body["mode"] = args["mode"];
        if (args["savedState"] !== undefined) {
          body["savedState"] = args["savedState"];
        }
        if (args["shieldedInstanceInitialState"] !== undefined) {
          body["shieldedInstanceInitialState"] =
            args["shieldedInstanceInitialState"];
        }
        if (args["source"] !== undefined) body["source"] = args["source"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.attachDisk",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/attachDisk",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "forceAttach": { "location": "query" },
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    bulk_insert: {
      description: "bulk insert",
      arguments: z.object({
        count: z.any().optional(),
        instanceFlexibilityPolicy: z.any().optional(),
        instanceProperties: z.any().optional(),
        locationPolicy: z.any().optional(),
        minCount: z.any().optional(),
        namePattern: z.any().optional(),
        perInstanceProperties: z.any().optional(),
        sourceInstanceTemplate: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        const body: Record<string, unknown> = {};
        if (args["count"] !== undefined) body["count"] = args["count"];
        if (args["instanceFlexibilityPolicy"] !== undefined) {
          body["instanceFlexibilityPolicy"] = args["instanceFlexibilityPolicy"];
        }
        if (args["instanceProperties"] !== undefined) {
          body["instanceProperties"] = args["instanceProperties"];
        }
        if (args["locationPolicy"] !== undefined) {
          body["locationPolicy"] = args["locationPolicy"];
        }
        if (args["minCount"] !== undefined) body["minCount"] = args["minCount"];
        if (args["namePattern"] !== undefined) {
          body["namePattern"] = args["namePattern"];
        }
        if (args["perInstanceProperties"] !== undefined) {
          body["perInstanceProperties"] = args["perInstanceProperties"];
        }
        if (args["sourceInstanceTemplate"] !== undefined) {
          body["sourceInstanceTemplate"] = args["sourceInstanceTemplate"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.bulkInsert",
            "path": "projects/{project}/zones/{zone}/instances/bulkInsert",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    detach_disk: {
      description: "detach disk",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["instance"]?.toString() ??
          g["instance"]?.toString() ?? "";
        params["deviceName"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.detachDisk",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/detachDisk",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance", "deviceName"],
            "parameters": {
              "deviceName": { "location": "query", "required": true },
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_effective_firewalls: {
      description: "get effective firewalls",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["instance"]?.toString() ??
          g["instance"]?.toString() ?? "";
        params["networkInterface"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.getEffectiveFirewalls",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/getEffectiveFirewalls",
            "httpMethod": "GET",
            "parameterOrder": [
              "project",
              "zone",
              "instance",
              "networkInterface",
            ],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "networkInterface": { "location": "query", "required": true },
              "project": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_guest_attributes: {
      description: "get guest attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.getGuestAttributes",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/getGuestAttributes",
            "httpMethod": "GET",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "queryPath": { "location": "query" },
              "variableKey": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_screenshot: {
      description: "get screenshot",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.getScreenshot",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/screenshot",
            "httpMethod": "GET",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_serial_port_output: {
      description: "get serial port output",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.getSerialPortOutput",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/serialPort",
            "httpMethod": "GET",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "port": { "location": "query" },
              "project": { "location": "path", "required": true },
              "start": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_shielded_instance_identity: {
      description: "get shielded instance identity",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.getShieldedInstanceIdentity",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/getShieldedInstanceIdentity",
            "httpMethod": "GET",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    list_referrers: {
      description: "list referrers",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.listReferrers",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/referrers",
            "httpMethod": "GET",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "filter": { "location": "query" },
              "instance": { "location": "path", "required": true },
              "maxResults": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "project": { "location": "path", "required": true },
              "returnPartialSuccess": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    perform_maintenance: {
      description: "perform maintenance",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.performMaintenance",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/performMaintenance",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    report_host_as_faulty: {
      description: "report host as faulty",
      arguments: z.object({
        disruptionSchedule: z.any().optional(),
        faultReasons: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["disruptionSchedule"] !== undefined) {
          body["disruptionSchedule"] = args["disruptionSchedule"];
        }
        if (args["faultReasons"] !== undefined) {
          body["faultReasons"] = args["faultReasons"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.reportHostAsFaulty",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/reportHostAsFaulty",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.reset",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/reset",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    resume: {
      description: "resume",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.resume",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/resume",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    send_diagnostic_interrupt: {
      description: "send diagnostic interrupt",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.sendDiagnosticInterrupt",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/sendDiagnosticInterrupt",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_deletion_protection: {
      description: "set deletion protection",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
            "id": "compute.instances.setDeletionProtection",
            "path":
              "projects/{project}/zones/{zone}/instances/{resource}/setDeletionProtection",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "resource"],
            "parameters": {
              "deletionProtection": { "location": "query" },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "resource": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_disk_auto_delete: {
      description: "set disk auto delete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["instance"]?.toString() ??
          g["instance"]?.toString() ?? "";
        params["autoDelete"] = existing["autoDelete"]?.toString() ??
          g["autoDelete"]?.toString() ?? "";
        params["deviceName"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setDiskAutoDelete",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setDiskAutoDelete",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "instance",
              "autoDelete",
              "deviceName",
            ],
            "parameters": {
              "autoDelete": { "location": "query", "required": true },
              "deviceName": { "location": "query", "required": true },
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_labels: {
      description: "set labels",
      arguments: z.object({
        labelFingerprint: z.any().optional(),
        labels: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = args["labelFingerprint"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setLabels",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setLabels",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_machine_resources: {
      description: "set machine resources",
      arguments: z.object({
        guestAccelerators: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["guestAccelerators"] !== undefined) {
          body["guestAccelerators"] = args["guestAccelerators"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setMachineResources",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setMachineResources",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_machine_type: {
      description: "set machine type",
      arguments: z.object({
        machineType: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["machineType"] !== undefined) {
          body["machineType"] = args["machineType"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setMachineType",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setMachineType",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_metadata: {
      description: "set metadata",
      arguments: z.object({
        fingerprint: z.any().optional(),
        items: z.any().optional(),
        kind: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["items"] !== undefined) body["items"] = args["items"];
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setMetadata",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setMetadata",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_min_cpu_platform: {
      description: "set min cpu platform",
      arguments: z.object({
        minCpuPlatform: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["minCpuPlatform"] !== undefined) {
          body["minCpuPlatform"] = args["minCpuPlatform"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setMinCpuPlatform",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setMinCpuPlatform",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_name: {
      description: "set name",
      arguments: z.object({
        currentName: z.any().optional(),
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["currentName"] !== undefined) {
          body["currentName"] = args["currentName"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setName",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setName",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_scheduling: {
      description: "set scheduling",
      arguments: z.object({
        automaticRestart: z.any().optional(),
        availabilityDomain: z.any().optional(),
        hostErrorTimeoutSeconds: z.any().optional(),
        instanceTerminationAction: z.any().optional(),
        localSsdRecoveryTimeout: z.any().optional(),
        locationHint: z.any().optional(),
        maxRunDuration: z.any().optional(),
        minNodeCpus: z.any().optional(),
        nodeAffinities: z.any().optional(),
        onHostMaintenance: z.any().optional(),
        onInstanceStopAction: z.any().optional(),
        preemptible: z.any().optional(),
        provisioningModel: z.any().optional(),
        skipGuestOsShutdown: z.any().optional(),
        terminationTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["automaticRestart"] !== undefined) {
          body["automaticRestart"] = args["automaticRestart"];
        }
        if (args["availabilityDomain"] !== undefined) {
          body["availabilityDomain"] = args["availabilityDomain"];
        }
        if (args["hostErrorTimeoutSeconds"] !== undefined) {
          body["hostErrorTimeoutSeconds"] = args["hostErrorTimeoutSeconds"];
        }
        if (args["instanceTerminationAction"] !== undefined) {
          body["instanceTerminationAction"] = args["instanceTerminationAction"];
        }
        if (args["localSsdRecoveryTimeout"] !== undefined) {
          body["localSsdRecoveryTimeout"] = args["localSsdRecoveryTimeout"];
        }
        if (args["locationHint"] !== undefined) {
          body["locationHint"] = args["locationHint"];
        }
        if (args["maxRunDuration"] !== undefined) {
          body["maxRunDuration"] = args["maxRunDuration"];
        }
        if (args["minNodeCpus"] !== undefined) {
          body["minNodeCpus"] = args["minNodeCpus"];
        }
        if (args["nodeAffinities"] !== undefined) {
          body["nodeAffinities"] = args["nodeAffinities"];
        }
        if (args["onHostMaintenance"] !== undefined) {
          body["onHostMaintenance"] = args["onHostMaintenance"];
        }
        if (args["onInstanceStopAction"] !== undefined) {
          body["onInstanceStopAction"] = args["onInstanceStopAction"];
        }
        if (args["preemptible"] !== undefined) {
          body["preemptible"] = args["preemptible"];
        }
        if (args["provisioningModel"] !== undefined) {
          body["provisioningModel"] = args["provisioningModel"];
        }
        if (args["skipGuestOsShutdown"] !== undefined) {
          body["skipGuestOsShutdown"] = args["skipGuestOsShutdown"];
        }
        if (args["terminationTime"] !== undefined) {
          body["terminationTime"] = args["terminationTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setScheduling",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setScheduling",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_security_policy: {
      description: "set security policy",
      arguments: z.object({
        networkInterfaces: z.any().optional(),
        securityPolicy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["networkInterfaces"] !== undefined) {
          body["networkInterfaces"] = args["networkInterfaces"];
        }
        if (args["securityPolicy"] !== undefined) {
          body["securityPolicy"] = args["securityPolicy"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setSecurityPolicy",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setSecurityPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_service_account: {
      description: "set service account",
      arguments: z.object({
        email: z.any().optional(),
        scopes: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["email"] !== undefined) body["email"] = args["email"];
        if (args["scopes"] !== undefined) body["scopes"] = args["scopes"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setServiceAccount",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setServiceAccount",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_shielded_instance_integrity_policy: {
      description: "set shielded instance integrity policy",
      arguments: z.object({
        updateAutoLearnPolicy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["updateAutoLearnPolicy"] !== undefined) {
          body["updateAutoLearnPolicy"] = args["updateAutoLearnPolicy"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setShieldedInstanceIntegrityPolicy",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setShieldedInstanceIntegrityPolicy",
            "httpMethod": "PATCH",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_tags: {
      description: "set tags",
      arguments: z.object({
        fingerprint: z.any().optional(),
        items: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["items"] !== undefined) body["items"] = args["items"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.setTags",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/setTags",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    simulate_maintenance_event: {
      description: "simulate maintenance event",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.simulateMaintenanceEvent",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/simulateMaintenanceEvent",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "withExtendedNotifications": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.start",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/start",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    start_with_encryption_key: {
      description: "start with encryption key",
      arguments: z.object({
        disks: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["disks"] !== undefined) body["disks"] = args["disks"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.startWithEncryptionKey",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/startWithEncryptionKey",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.stop",
            "path": "projects/{project}/zones/{zone}/instances/{instance}/stop",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "discardLocalSsd": { "location": "query" },
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    suspend: {
      description: "suspend",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.suspend",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/suspend",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "discardLocalSsd": { "location": "query" },
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    update_access_config: {
      description: "update access config",
      arguments: z.object({
        externalIpv6: z.any().optional(),
        externalIpv6PrefixLength: z.any().optional(),
        kind: z.any().optional(),
        name: z.any().optional(),
        natIP: z.any().optional(),
        networkTier: z.any().optional(),
        publicPtrDomainName: z.any().optional(),
        securityPolicy: z.any().optional(),
        setPublicPtr: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["instance"]?.toString() ??
          g["instance"]?.toString() ?? "";
        params["networkInterface"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["externalIpv6"] !== undefined) {
          body["externalIpv6"] = args["externalIpv6"];
        }
        if (args["externalIpv6PrefixLength"] !== undefined) {
          body["externalIpv6PrefixLength"] = args["externalIpv6PrefixLength"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["natIP"] !== undefined) body["natIP"] = args["natIP"];
        if (args["networkTier"] !== undefined) {
          body["networkTier"] = args["networkTier"];
        }
        if (args["publicPtrDomainName"] !== undefined) {
          body["publicPtrDomainName"] = args["publicPtrDomainName"];
        }
        if (args["securityPolicy"] !== undefined) {
          body["securityPolicy"] = args["securityPolicy"];
        }
        if (args["setPublicPtr"] !== undefined) {
          body["setPublicPtr"] = args["setPublicPtr"];
        }
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.updateAccessConfig",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/updateAccessConfig",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "instance",
              "networkInterface",
            ],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "networkInterface": { "location": "query", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_display_device: {
      description: "update display device",
      arguments: z.object({
        enableDisplay: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["enableDisplay"] !== undefined) {
          body["enableDisplay"] = args["enableDisplay"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.updateDisplayDevice",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/updateDisplayDevice",
            "httpMethod": "PATCH",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_network_interface: {
      description: "update network interface",
      arguments: z.object({
        accessConfigs: z.any().optional(),
        aliasIpRanges: z.any().optional(),
        enableVpcScopedDns: z.any().optional(),
        fingerprint: z.any().optional(),
        igmpQuery: z.any().optional(),
        internalIpv6PrefixLength: z.any().optional(),
        ipv6AccessConfigs: z.any().optional(),
        ipv6AccessType: z.any().optional(),
        ipv6Address: z.any().optional(),
        kind: z.any().optional(),
        name: z.any().optional(),
        network: z.any().optional(),
        networkAttachment: z.any().optional(),
        networkIP: z.any().optional(),
        nicType: z.any().optional(),
        parentNicName: z.any().optional(),
        queueCount: z.any().optional(),
        serviceClassId: z.any().optional(),
        stackType: z.any().optional(),
        subnetwork: z.any().optional(),
        vlan: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["instance"]?.toString() ??
          g["instance"]?.toString() ?? "";
        params["networkInterface"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["accessConfigs"] !== undefined) {
          body["accessConfigs"] = args["accessConfigs"];
        }
        if (args["aliasIpRanges"] !== undefined) {
          body["aliasIpRanges"] = args["aliasIpRanges"];
        }
        if (args["enableVpcScopedDns"] !== undefined) {
          body["enableVpcScopedDns"] = args["enableVpcScopedDns"];
        }
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["igmpQuery"] !== undefined) {
          body["igmpQuery"] = args["igmpQuery"];
        }
        if (args["internalIpv6PrefixLength"] !== undefined) {
          body["internalIpv6PrefixLength"] = args["internalIpv6PrefixLength"];
        }
        if (args["ipv6AccessConfigs"] !== undefined) {
          body["ipv6AccessConfigs"] = args["ipv6AccessConfigs"];
        }
        if (args["ipv6AccessType"] !== undefined) {
          body["ipv6AccessType"] = args["ipv6AccessType"];
        }
        if (args["ipv6Address"] !== undefined) {
          body["ipv6Address"] = args["ipv6Address"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["network"] !== undefined) body["network"] = args["network"];
        if (args["networkAttachment"] !== undefined) {
          body["networkAttachment"] = args["networkAttachment"];
        }
        if (args["networkIP"] !== undefined) {
          body["networkIP"] = args["networkIP"];
        }
        if (args["nicType"] !== undefined) body["nicType"] = args["nicType"];
        if (args["parentNicName"] !== undefined) {
          body["parentNicName"] = args["parentNicName"];
        }
        if (args["queueCount"] !== undefined) {
          body["queueCount"] = args["queueCount"];
        }
        if (args["serviceClassId"] !== undefined) {
          body["serviceClassId"] = args["serviceClassId"];
        }
        if (args["stackType"] !== undefined) {
          body["stackType"] = args["stackType"];
        }
        if (args["subnetwork"] !== undefined) {
          body["subnetwork"] = args["subnetwork"];
        }
        if (args["vlan"] !== undefined) body["vlan"] = args["vlan"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.updateNetworkInterface",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/updateNetworkInterface",
            "httpMethod": "PATCH",
            "parameterOrder": [
              "project",
              "zone",
              "instance",
              "networkInterface",
            ],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "networkInterface": { "location": "query", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_shielded_instance_config: {
      description: "update shielded instance config",
      arguments: z.object({
        enableIntegrityMonitoring: z.any().optional(),
        enableSecureBoot: z.any().optional(),
        enableVtpm: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instance"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["enableIntegrityMonitoring"] !== undefined) {
          body["enableIntegrityMonitoring"] = args["enableIntegrityMonitoring"];
        }
        if (args["enableSecureBoot"] !== undefined) {
          body["enableSecureBoot"] = args["enableSecureBoot"];
        }
        if (args["enableVtpm"] !== undefined) {
          body["enableVtpm"] = args["enableVtpm"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instances.updateShieldedInstanceConfig",
            "path":
              "projects/{project}/zones/{zone}/instances/{instance}/updateShieldedInstanceConfig",
            "httpMethod": "PATCH",
            "parameterOrder": ["project", "zone", "instance"],
            "parameters": {
              "instance": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
