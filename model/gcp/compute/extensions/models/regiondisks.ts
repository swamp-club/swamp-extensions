// Auto-generated extension model for @swamp/gcp/compute/regiondisks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine RegionDisks.
 *
 * Represents a Persistent Disk resource. Google Compute Engine has two Disk resources: * [Zonal](/compute/docs/reference/rest/v1/disks) * [Regional](/compute/docs/reference/rest/v1/regionDisks) Persistent disks are required for running your VM instances. Create both boot and non-boot (data) persistent disks. For more information, read Persistent Disks. For more storage options, read Storage options. The disks resource represents a zonal persistent disk. For more information, readZonal persistent disks. The regionDisks resource represents a regional persistent disk. For more information, read Regional resources.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.regionDisks.get",
  "path": "projects/{project}/regions/{region}/disks/{disk}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "disk",
  ],
  "parameters": {
    "disk": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.regionDisks.insert",
  "path": "projects/{project}/regions/{region}/disks",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "sourceImage": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.regionDisks.update",
  "path": "projects/{project}/regions/{region}/disks/{disk}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "disk",
  ],
  "parameters": {
    "disk": {
      "location": "path",
      "required": true,
    },
    "paths": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
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
  "id": "compute.regionDisks.delete",
  "path": "projects/{project}/regions/{region}/disks/{disk}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "disk",
  ],
  "parameters": {
    "disk": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.regionDisks.list",
  "path": "projects/{project}/regions/{region}/disks",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessMode: z.enum(["READ_ONLY_MANY", "READ_WRITE_MANY", "READ_WRITE_SINGLE"])
    .describe(
      "The access mode of the disk. - READ_WRITE_SINGLE: The default AccessMode, means the disk can be attached to single instance in RW mode. - READ_WRITE_MANY: The AccessMode means the disk can be attached to multiple instances in RW mode. - READ_ONLY_MANY: The AccessMode means the disk can be attached to multiple instances in RO mode. The AccessMode is only valid for Hyperdisk disk types.",
    ).optional(),
  architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"])
    .describe("The architecture of the disk. Valid values are ARM64 or X86_64.")
    .optional(),
  asyncPrimaryDisk: z.object({
    consistencyGroupPolicy: z.string().describe(
      "Output only. [Output Only] URL of the DiskConsistencyGroupPolicy if replication was started on the disk as a member of a group.",
    ).optional(),
    consistencyGroupPolicyId: z.string().describe(
      "Output only. [Output Only] ID of the DiskConsistencyGroupPolicy if replication was started on the disk as a member of a group.",
    ).optional(),
    disk: z.string().describe(
      "The other disk asynchronously replicated to or from the current disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk",
    ).optional(),
    diskId: z.string().describe(
      "Output only. [Output Only] The unique ID of the other disk asynchronously replicated to or from the current disk. This value identifies the exact disk that was used to create this replication. For example, if you started replicating the persistent disk from a disk that was later deleted and recreated under the same name, the disk ID would identify the exact version of the disk that was used.",
    ).optional(),
  }).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
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
  enableConfidentialCompute: z.boolean().describe(
    "Whether this disk is using confidential compute mode.",
  ).optional(),
  guestOsFeatures: z.array(z.object({
    type: z.enum([
      "BARE_METAL_LINUX_COMPATIBLE",
      "CCA_CAPABLE",
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
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this disk, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a disk.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels to apply to this disk. These can be later modified by the setLabels method.",
  ).optional(),
  licenseCodes: z.array(z.string()).describe(
    "Integer license codes indicating which licenses are attached to this disk.",
  ).optional(),
  licenses: z.array(z.string()).describe(
    "A list of publicly visible licenses. Reserved for Google's use.",
  ).optional(),
  locationHint: z.string().describe(
    "An opaque location hint used to place the disk close to other resources. This field is for use by internal tools that use the public API.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  options: z.string().describe("Internal use only.").optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional disk params.").optional(),
  physicalBlockSizeBytes: z.string().describe(
    "Physical block size of the persistent disk, in bytes. If not present in a request, a default value is used. The currently supported size is 4096, other sizes may be added in the future. If an unsupported value is requested, the error message will list the supported values for the caller's project.",
  ).optional(),
  provisionedIops: z.string().describe(
    "Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation.",
  ).optional(),
  provisionedThroughput: z.string().describe(
    "Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the disk resides. Only applicable for regional resources. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  replicaZones: z.array(z.string()).describe(
    "URLs of the zones where the disk should be replicated to. Only applicable for regional resources.",
  ).optional(),
  resourcePolicies: z.array(z.string()).describe(
    "Resource policies applied to this disk for automatic snapshot creations.",
  ).optional(),
  resourceStatus: z.object({
    asyncPrimaryDisk: z.object({
      state: z.enum([
        "ACTIVE",
        "CREATED",
        "STARTING",
        "STATE_UNSPECIFIED",
        "STOPPED",
        "STOPPING",
      ]).optional(),
    }).optional(),
    asyncSecondaryDisks: z.record(
      z.string(),
      z.object({
        state: z.enum([
          "ACTIVE",
          "CREATED",
          "STARTING",
          "STATE_UNSPECIFIED",
          "STOPPED",
          "STOPPING",
        ]).optional(),
      }),
    ).describe("Key: disk, value: AsyncReplicationStatus message").optional(),
  }).optional(),
  sizeGb: z.string().describe(
    "Size, in GB, of the persistent disk. You can specify this field when creating a persistent disk using thesourceImage, sourceSnapshot, orsourceDisk parameter, or specify it alone to create an empty persistent disk. If you specify this field along with a source, the value ofsizeGb must not be less than the size of the source. Acceptable values are greater than 0.",
  ).optional(),
  sourceDisk: z.string().describe(
    "The source disk used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk - projects/project/zones/zone/disks/disk - projects/project/regions/region/disks/disk - zones/zone/disks/disk - regions/region/disks/disk",
  ).optional(),
  sourceImage: z.string().describe(
    "The source image used to create this disk. If the source image is deleted, this field will not be set. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family",
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
  sourceInstantSnapshot: z.string().describe(
    "The source instant snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshots/instantSnapshot - projects/project/zones/zone/instantSnapshots/instantSnapshot - zones/zone/instantSnapshots/instantSnapshot",
  ).optional(),
  sourceSnapshot: z.string().describe(
    "The source snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/snapshots/snapshot - projects/project/global/snapshots/snapshot - global/snapshots/snapshot",
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
  sourceStorageObject: z.string().describe(
    "The full Google Cloud Storage URI where the disk image is stored. This file must be a gzip-compressed tarball whose name ends in.tar.gz or virtual machine disk whose name ends in vmdk. Valid URIs may start with gs:// or https://storage.googleapis.com/. This flag is not optimized for creating multiple disks from a source storage object. To create many disks from a source storage object, use gcloud compute images import instead.",
  ).optional(),
  storagePool: z.string().describe(
    "The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool",
  ).optional(),
  type: z.string().describe(
    "URL of the disk type resource describing which disk type to use to create the disk. Provide this when creating the disk. For example:projects/project/zones/zone/diskTypes/pd-ssd. See Persistent disk types.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  accessMode: z.string().optional(),
  architecture: z.string().optional(),
  asyncPrimaryDisk: z.object({
    consistencyGroupPolicy: z.string(),
    consistencyGroupPolicyId: z.string(),
    disk: z.string(),
    diskId: z.string(),
  }).optional(),
  asyncSecondaryDisks: z.record(z.string(), z.unknown()).optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  diskEncryptionKey: z.object({
    kmsKeyName: z.string(),
    kmsKeyServiceAccount: z.string(),
    rawKey: z.string(),
    rsaEncryptedKey: z.string(),
    sha256: z.string(),
  }).optional(),
  enableConfidentialCompute: z.boolean().optional(),
  guestOsFeatures: z.array(z.object({
    type: z.string(),
  })).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  labelFingerprint: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastAttachTimestamp: z.string().optional(),
  lastDetachTimestamp: z.string().optional(),
  licenseCodes: z.array(z.string()).optional(),
  licenses: z.array(z.string()).optional(),
  locationHint: z.string().optional(),
  name: z.string(),
  options: z.string().optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  physicalBlockSizeBytes: z.string().optional(),
  provisionedIops: z.string().optional(),
  provisionedThroughput: z.string().optional(),
  region: z.string().optional(),
  replicaZones: z.array(z.string()).optional(),
  resourcePolicies: z.array(z.string()).optional(),
  resourceStatus: z.object({
    asyncPrimaryDisk: z.object({
      state: z.string(),
    }),
    asyncSecondaryDisks: z.record(z.string(), z.unknown()),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  selfLink: z.string().optional(),
  sizeGb: z.string().optional(),
  sourceConsistencyGroupPolicy: z.string().optional(),
  sourceConsistencyGroupPolicyId: z.string().optional(),
  sourceDisk: z.string().optional(),
  sourceDiskId: z.string().optional(),
  sourceImage: z.string().optional(),
  sourceImageEncryptionKey: z.object({
    kmsKeyName: z.string(),
    kmsKeyServiceAccount: z.string(),
    rawKey: z.string(),
    rsaEncryptedKey: z.string(),
    sha256: z.string(),
  }).optional(),
  sourceImageId: z.string().optional(),
  sourceInstantSnapshot: z.string().optional(),
  sourceInstantSnapshotId: z.string().optional(),
  sourceSnapshot: z.string().optional(),
  sourceSnapshotEncryptionKey: z.object({
    kmsKeyName: z.string(),
    kmsKeyServiceAccount: z.string(),
    rawKey: z.string(),
    rsaEncryptedKey: z.string(),
    sha256: z.string(),
  }).optional(),
  sourceSnapshotId: z.string().optional(),
  sourceStorageObject: z.string().optional(),
  status: z.string().optional(),
  storagePool: z.string().optional(),
  type: z.string().optional(),
  users: z.array(z.string()).optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessMode: z.enum(["READ_ONLY_MANY", "READ_WRITE_MANY", "READ_WRITE_SINGLE"])
    .describe(
      "The access mode of the disk. - READ_WRITE_SINGLE: The default AccessMode, means the disk can be attached to single instance in RW mode. - READ_WRITE_MANY: The AccessMode means the disk can be attached to multiple instances in RW mode. - READ_ONLY_MANY: The AccessMode means the disk can be attached to multiple instances in RO mode. The AccessMode is only valid for Hyperdisk disk types.",
    ).optional(),
  architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"])
    .describe("The architecture of the disk. Valid values are ARM64 or X86_64.")
    .optional(),
  asyncPrimaryDisk: z.object({
    consistencyGroupPolicy: z.string().describe(
      "Output only. [Output Only] URL of the DiskConsistencyGroupPolicy if replication was started on the disk as a member of a group.",
    ).optional(),
    consistencyGroupPolicyId: z.string().describe(
      "Output only. [Output Only] ID of the DiskConsistencyGroupPolicy if replication was started on the disk as a member of a group.",
    ).optional(),
    disk: z.string().describe(
      "The other disk asynchronously replicated to or from the current disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk",
    ).optional(),
    diskId: z.string().describe(
      "Output only. [Output Only] The unique ID of the other disk asynchronously replicated to or from the current disk. This value identifies the exact disk that was used to create this replication. For example, if you started replicating the persistent disk from a disk that was later deleted and recreated under the same name, the disk ID would identify the exact version of the disk that was used.",
    ).optional(),
  }).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
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
  enableConfidentialCompute: z.boolean().describe(
    "Whether this disk is using confidential compute mode.",
  ).optional(),
  guestOsFeatures: z.array(z.object({
    type: z.enum([
      "BARE_METAL_LINUX_COMPATIBLE",
      "CCA_CAPABLE",
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
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this disk, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a disk.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels to apply to this disk. These can be later modified by the setLabels method.",
  ).optional(),
  licenseCodes: z.array(z.string()).describe(
    "Integer license codes indicating which licenses are attached to this disk.",
  ).optional(),
  licenses: z.array(z.string()).describe(
    "A list of publicly visible licenses. Reserved for Google's use.",
  ).optional(),
  locationHint: z.string().describe(
    "An opaque location hint used to place the disk close to other resources. This field is for use by internal tools that use the public API.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  options: z.string().describe("Internal use only.").optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional disk params.").optional(),
  physicalBlockSizeBytes: z.string().describe(
    "Physical block size of the persistent disk, in bytes. If not present in a request, a default value is used. The currently supported size is 4096, other sizes may be added in the future. If an unsupported value is requested, the error message will list the supported values for the caller's project.",
  ).optional(),
  provisionedIops: z.string().describe(
    "Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see theExtreme persistent disk documentation.",
  ).optional(),
  provisionedThroughput: z.string().describe(
    "Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the disk resides. Only applicable for regional resources. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  replicaZones: z.array(z.string()).describe(
    "URLs of the zones where the disk should be replicated to. Only applicable for regional resources.",
  ).optional(),
  resourcePolicies: z.array(z.string()).describe(
    "Resource policies applied to this disk for automatic snapshot creations.",
  ).optional(),
  resourceStatus: z.object({
    asyncPrimaryDisk: z.object({
      state: z.enum([
        "ACTIVE",
        "CREATED",
        "STARTING",
        "STATE_UNSPECIFIED",
        "STOPPED",
        "STOPPING",
      ]).optional(),
    }).optional(),
    asyncSecondaryDisks: z.record(
      z.string(),
      z.object({
        state: z.enum([
          "ACTIVE",
          "CREATED",
          "STARTING",
          "STATE_UNSPECIFIED",
          "STOPPED",
          "STOPPING",
        ]).optional(),
      }),
    ).describe("Key: disk, value: AsyncReplicationStatus message").optional(),
  }).optional(),
  sizeGb: z.string().describe(
    "Size, in GB, of the persistent disk. You can specify this field when creating a persistent disk using thesourceImage, sourceSnapshot, orsourceDisk parameter, or specify it alone to create an empty persistent disk. If you specify this field along with a source, the value ofsizeGb must not be less than the size of the source. Acceptable values are greater than 0.",
  ).optional(),
  sourceDisk: z.string().describe(
    "The source disk used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk - projects/project/zones/zone/disks/disk - projects/project/regions/region/disks/disk - zones/zone/disks/disk - regions/region/disks/disk",
  ).optional(),
  sourceImage: z.string().describe(
    "The source image used to create this disk. If the source image is deleted, this field will not be set. To create a disk with one of the public operating system images, specify the image by its family name. For example, specifyfamily/debian-9 to use the latest Debian 9 image: projects/debian-cloud/global/images/family/debian-9 Alternatively, use a specific version of a public operating system image: projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD To create a disk with a custom image that you created, specify the image name in the following format: global/images/my-custom-image You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with family/family-name: global/images/family/my-image-family",
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
  sourceInstantSnapshot: z.string().describe(
    "The source instant snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshots/instantSnapshot - projects/project/zones/zone/instantSnapshots/instantSnapshot - zones/zone/instantSnapshots/instantSnapshot",
  ).optional(),
  sourceSnapshot: z.string().describe(
    "The source snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/global/snapshots/snapshot - projects/project/global/snapshots/snapshot - global/snapshots/snapshot",
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
  sourceStorageObject: z.string().describe(
    "The full Google Cloud Storage URI where the disk image is stored. This file must be a gzip-compressed tarball whose name ends in.tar.gz or virtual machine disk whose name ends in vmdk. Valid URIs may start with gs:// or https://storage.googleapis.com/. This flag is not optimized for creating multiple disks from a source storage object. To create many disks from a source storage object, use gcloud compute images import instead.",
  ).optional(),
  storagePool: z.string().describe(
    "The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool - projects/project/zones/zone/storagePools/storagePool - zones/zone/storagePools/storagePool",
  ).optional(),
  type: z.string().describe(
    "URL of the disk type resource describing which disk type to use to create the disk. Provide this when creating the disk. For example:projects/project/zones/zone/diskTypes/pd-ssd. See Persistent disk types.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine RegionDisks. Registered at `@swamp/gcp/compute/regiondisks`. */
export const model = {
  type: "@swamp/gcp/compute/regiondisks",
  version: "2026.05.26.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
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
    {
      toVersion: "2026.05.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.15.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Persistent Disk resource. Google Compute Engine has two Disk res...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a regionDisks",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["accessMode"] !== undefined) body["accessMode"] = g["accessMode"];
        if (g["architecture"] !== undefined) {
          body["architecture"] = g["architecture"];
        }
        if (g["asyncPrimaryDisk"] !== undefined) {
          body["asyncPrimaryDisk"] = g["asyncPrimaryDisk"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskEncryptionKey"] !== undefined) {
          body["diskEncryptionKey"] = g["diskEncryptionKey"];
        }
        if (g["enableConfidentialCompute"] !== undefined) {
          body["enableConfidentialCompute"] = g["enableConfidentialCompute"];
        }
        if (g["guestOsFeatures"] !== undefined) {
          body["guestOsFeatures"] = g["guestOsFeatures"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["licenseCodes"] !== undefined) {
          body["licenseCodes"] = g["licenseCodes"];
        }
        if (g["licenses"] !== undefined) body["licenses"] = g["licenses"];
        if (g["locationHint"] !== undefined) {
          body["locationHint"] = g["locationHint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["options"] !== undefined) body["options"] = g["options"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["physicalBlockSizeBytes"] !== undefined) {
          body["physicalBlockSizeBytes"] = g["physicalBlockSizeBytes"];
        }
        if (g["provisionedIops"] !== undefined) {
          body["provisionedIops"] = g["provisionedIops"];
        }
        if (g["provisionedThroughput"] !== undefined) {
          body["provisionedThroughput"] = g["provisionedThroughput"];
        }
        if (g["replicaZones"] !== undefined) {
          body["replicaZones"] = g["replicaZones"];
        }
        if (g["resourcePolicies"] !== undefined) {
          body["resourcePolicies"] = g["resourcePolicies"];
        }
        if (g["resourceStatus"] !== undefined) {
          body["resourceStatus"] = g["resourceStatus"];
        }
        if (g["sizeGb"] !== undefined) body["sizeGb"] = g["sizeGb"];
        if (g["sourceDisk"] !== undefined) body["sourceDisk"] = g["sourceDisk"];
        if (g["sourceImage"] !== undefined) {
          body["sourceImage"] = g["sourceImage"];
        }
        if (g["sourceImageEncryptionKey"] !== undefined) {
          body["sourceImageEncryptionKey"] = g["sourceImageEncryptionKey"];
        }
        if (g["sourceInstantSnapshot"] !== undefined) {
          body["sourceInstantSnapshot"] = g["sourceInstantSnapshot"];
        }
        if (g["sourceSnapshot"] !== undefined) {
          body["sourceSnapshot"] = g["sourceSnapshot"];
        }
        if (g["sourceSnapshotEncryptionKey"] !== undefined) {
          body["sourceSnapshotEncryptionKey"] =
            g["sourceSnapshotEncryptionKey"];
        }
        if (g["sourceStorageObject"] !== undefined) {
          body["sourceStorageObject"] = g["sourceStorageObject"];
        }
        if (g["storagePool"] !== undefined) {
          body["storagePool"] = g["storagePool"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["disk"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["READY"],
              "failedValues": ["FAILED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "project": projectId,
              "region": String(g["region"] ?? ""),
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
      description: "Get a regionDisks",
      arguments: z.object({
        identifier: z.string().describe("The name of the regionDisks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["disk"] = args.identifier;
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
      description: "Update regionDisks attributes",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
        params["disk"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accessMode"] !== undefined) body["accessMode"] = g["accessMode"];
        if (g["architecture"] !== undefined) {
          body["architecture"] = g["architecture"];
        }
        if (g["asyncPrimaryDisk"] !== undefined) {
          body["asyncPrimaryDisk"] = g["asyncPrimaryDisk"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskEncryptionKey"] !== undefined) {
          body["diskEncryptionKey"] = g["diskEncryptionKey"];
        }
        if (g["enableConfidentialCompute"] !== undefined) {
          body["enableConfidentialCompute"] = g["enableConfidentialCompute"];
        }
        if (g["guestOsFeatures"] !== undefined) {
          body["guestOsFeatures"] = g["guestOsFeatures"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["licenseCodes"] !== undefined) {
          body["licenseCodes"] = g["licenseCodes"];
        }
        if (g["licenses"] !== undefined) body["licenses"] = g["licenses"];
        if (g["locationHint"] !== undefined) {
          body["locationHint"] = g["locationHint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["options"] !== undefined) body["options"] = g["options"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["physicalBlockSizeBytes"] !== undefined) {
          body["physicalBlockSizeBytes"] = g["physicalBlockSizeBytes"];
        }
        if (g["provisionedIops"] !== undefined) {
          body["provisionedIops"] = g["provisionedIops"];
        }
        if (g["provisionedThroughput"] !== undefined) {
          body["provisionedThroughput"] = g["provisionedThroughput"];
        }
        if (g["replicaZones"] !== undefined) {
          body["replicaZones"] = g["replicaZones"];
        }
        if (g["resourcePolicies"] !== undefined) {
          body["resourcePolicies"] = g["resourcePolicies"];
        }
        if (g["resourceStatus"] !== undefined) {
          body["resourceStatus"] = g["resourceStatus"];
        }
        if (g["sizeGb"] !== undefined) body["sizeGb"] = g["sizeGb"];
        if (g["sourceDisk"] !== undefined) body["sourceDisk"] = g["sourceDisk"];
        if (g["sourceImage"] !== undefined) {
          body["sourceImage"] = g["sourceImage"];
        }
        if (g["sourceImageEncryptionKey"] !== undefined) {
          body["sourceImageEncryptionKey"] = g["sourceImageEncryptionKey"];
        }
        if (g["sourceInstantSnapshot"] !== undefined) {
          body["sourceInstantSnapshot"] = g["sourceInstantSnapshot"];
        }
        if (g["sourceSnapshot"] !== undefined) {
          body["sourceSnapshot"] = g["sourceSnapshot"];
        }
        if (g["sourceSnapshotEncryptionKey"] !== undefined) {
          body["sourceSnapshotEncryptionKey"] =
            g["sourceSnapshotEncryptionKey"];
        }
        if (g["sourceStorageObject"] !== undefined) {
          body["sourceStorageObject"] = g["sourceStorageObject"];
        }
        if (g["storagePool"] !== undefined) {
          body["storagePool"] = g["storagePool"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
              "readyValues": ["READY"],
              "failedValues": ["FAILED"],
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
      description: "Delete the regionDisks",
      arguments: z.object({
        identifier: z.string().describe("The name of the regionDisks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["disk"] = args.identifier;
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
      description: "Sync regionDisks state from GCP",
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
          if (g["region"] !== undefined) params["region"] = String(g["region"]);
          else if (existing["region"]) {
            params["region"] = String(existing["region"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["disk"] = identifier;
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
      description: "List regionDisks resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters resources listed in the response. Most",
        ).optional(),
        maxResults: z.number().describe(
          "The maximum number of results per page that should be returned.",
        ).optional(),
        orderBy: z.string().describe(
          "Sorts list results by a certain order. By default, results",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Opt-in for partial success behavior which provides partial results in case",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
    add_resource_policies: {
      description: "add resource policies",
      arguments: z.object({
        resourcePolicies: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["disk"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["resourcePolicies"] !== undefined) {
          body["resourcePolicies"] = args["resourcePolicies"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionDisks.addResourcePolicies",
            "path":
              "projects/{project}/regions/{region}/disks/{disk}/addResourcePolicies",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "disk"],
            "parameters": {
              "disk": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
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
        instantSnapshotGroupParameters: z.any().optional(),
        snapshotGroupParameters: z.any().optional(),
        sourceConsistencyGroupPolicy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (args["instantSnapshotGroupParameters"] !== undefined) {
          body["instantSnapshotGroupParameters"] =
            args["instantSnapshotGroupParameters"];
        }
        if (args["snapshotGroupParameters"] !== undefined) {
          body["snapshotGroupParameters"] = args["snapshotGroupParameters"];
        }
        if (args["sourceConsistencyGroupPolicy"] !== undefined) {
          body["sourceConsistencyGroupPolicy"] =
            args["sourceConsistencyGroupPolicy"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionDisks.bulkInsert",
            "path": "projects/{project}/regions/{region}/disks/bulkInsert",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    create_snapshot: {
      description: "create snapshot",
      arguments: z.object({
        architecture: z.any().optional(),
        autoCreated: z.any().optional(),
        chainName: z.any().optional(),
        creationSizeBytes: z.any().optional(),
        creationTimestamp: z.any().optional(),
        description: z.any().optional(),
        diskSizeGb: z.any().optional(),
        downloadBytes: z.any().optional(),
        enableConfidentialCompute: z.any().optional(),
        guestFlush: z.any().optional(),
        guestOsFeatures: z.any().optional(),
        id: z.any().optional(),
        kind: z.any().optional(),
        labelFingerprint: z.any().optional(),
        labels: z.any().optional(),
        licenseCodes: z.any().optional(),
        licenses: z.any().optional(),
        locationHint: z.any().optional(),
        name: z.any().optional(),
        params: z.any().optional(),
        region: z.any().optional(),
        satisfiesPzi: z.any().optional(),
        satisfiesPzs: z.any().optional(),
        selfLink: z.any().optional(),
        snapshotEncryptionKey: z.any().optional(),
        snapshotGroupId: z.any().optional(),
        snapshotGroupName: z.any().optional(),
        snapshotType: z.any().optional(),
        sourceDisk: z.any().optional(),
        sourceDiskEncryptionKey: z.any().optional(),
        sourceDiskForRecoveryCheckpoint: z.any().optional(),
        sourceDiskId: z.any().optional(),
        sourceInstantSnapshot: z.any().optional(),
        sourceInstantSnapshotEncryptionKey: z.any().optional(),
        sourceInstantSnapshotId: z.any().optional(),
        sourceSnapshotSchedulePolicy: z.any().optional(),
        sourceSnapshotSchedulePolicyId: z.any().optional(),
        status: z.any().optional(),
        storageBytes: z.any().optional(),
        storageBytesStatus: z.any().optional(),
        storageLocations: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["disk"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["architecture"] !== undefined) {
          body["architecture"] = args["architecture"];
        }
        if (args["autoCreated"] !== undefined) {
          body["autoCreated"] = args["autoCreated"];
        }
        if (args["chainName"] !== undefined) {
          body["chainName"] = args["chainName"];
        }
        if (args["creationSizeBytes"] !== undefined) {
          body["creationSizeBytes"] = args["creationSizeBytes"];
        }
        if (args["creationTimestamp"] !== undefined) {
          body["creationTimestamp"] = args["creationTimestamp"];
        }
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["diskSizeGb"] !== undefined) {
          body["diskSizeGb"] = args["diskSizeGb"];
        }
        if (args["downloadBytes"] !== undefined) {
          body["downloadBytes"] = args["downloadBytes"];
        }
        if (args["enableConfidentialCompute"] !== undefined) {
          body["enableConfidentialCompute"] = args["enableConfidentialCompute"];
        }
        if (args["guestFlush"] !== undefined) {
          body["guestFlush"] = args["guestFlush"];
        }
        if (args["guestOsFeatures"] !== undefined) {
          body["guestOsFeatures"] = args["guestOsFeatures"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = args["labelFingerprint"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["licenseCodes"] !== undefined) {
          body["licenseCodes"] = args["licenseCodes"];
        }
        if (args["licenses"] !== undefined) body["licenses"] = args["licenses"];
        if (args["locationHint"] !== undefined) {
          body["locationHint"] = args["locationHint"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["region"] !== undefined) body["region"] = args["region"];
        if (args["satisfiesPzi"] !== undefined) {
          body["satisfiesPzi"] = args["satisfiesPzi"];
        }
        if (args["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = args["satisfiesPzs"];
        }
        if (args["selfLink"] !== undefined) body["selfLink"] = args["selfLink"];
        if (args["snapshotEncryptionKey"] !== undefined) {
          body["snapshotEncryptionKey"] = args["snapshotEncryptionKey"];
        }
        if (args["snapshotGroupId"] !== undefined) {
          body["snapshotGroupId"] = args["snapshotGroupId"];
        }
        if (args["snapshotGroupName"] !== undefined) {
          body["snapshotGroupName"] = args["snapshotGroupName"];
        }
        if (args["snapshotType"] !== undefined) {
          body["snapshotType"] = args["snapshotType"];
        }
        if (args["sourceDisk"] !== undefined) {
          body["sourceDisk"] = args["sourceDisk"];
        }
        if (args["sourceDiskEncryptionKey"] !== undefined) {
          body["sourceDiskEncryptionKey"] = args["sourceDiskEncryptionKey"];
        }
        if (args["sourceDiskForRecoveryCheckpoint"] !== undefined) {
          body["sourceDiskForRecoveryCheckpoint"] =
            args["sourceDiskForRecoveryCheckpoint"];
        }
        if (args["sourceDiskId"] !== undefined) {
          body["sourceDiskId"] = args["sourceDiskId"];
        }
        if (args["sourceInstantSnapshot"] !== undefined) {
          body["sourceInstantSnapshot"] = args["sourceInstantSnapshot"];
        }
        if (args["sourceInstantSnapshotEncryptionKey"] !== undefined) {
          body["sourceInstantSnapshotEncryptionKey"] =
            args["sourceInstantSnapshotEncryptionKey"];
        }
        if (args["sourceInstantSnapshotId"] !== undefined) {
          body["sourceInstantSnapshotId"] = args["sourceInstantSnapshotId"];
        }
        if (args["sourceSnapshotSchedulePolicy"] !== undefined) {
          body["sourceSnapshotSchedulePolicy"] =
            args["sourceSnapshotSchedulePolicy"];
        }
        if (args["sourceSnapshotSchedulePolicyId"] !== undefined) {
          body["sourceSnapshotSchedulePolicyId"] =
            args["sourceSnapshotSchedulePolicyId"];
        }
        if (args["status"] !== undefined) body["status"] = args["status"];
        if (args["storageBytes"] !== undefined) {
          body["storageBytes"] = args["storageBytes"];
        }
        if (args["storageBytesStatus"] !== undefined) {
          body["storageBytesStatus"] = args["storageBytesStatus"];
        }
        if (args["storageLocations"] !== undefined) {
          body["storageLocations"] = args["storageLocations"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionDisks.createSnapshot",
            "path":
              "projects/{project}/regions/{region}/disks/{disk}/createSnapshot",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "disk"],
            "parameters": {
              "disk": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
            "id": "compute.regionDisks.getIamPolicy",
            "path":
              "projects/{project}/regions/{region}/disks/{resource}/getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "optionsRequestedPolicyVersion": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    resize: {
      description: "resize",
      arguments: z.object({
        sizeGb: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["disk"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["sizeGb"] !== undefined) body["sizeGb"] = args["sizeGb"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionDisks.resize",
            "path": "projects/{project}/regions/{region}/disks/{disk}/resize",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "disk"],
            "parameters": {
              "disk": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        bindings: z.any().optional(),
        etag: z.any().optional(),
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        if (args["bindings"] !== undefined) body["bindings"] = args["bindings"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionDisks.setIamPolicy",
            "path":
              "projects/{project}/regions/{region}/disks/{resource}/setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        if (args["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = args["labelFingerprint"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionDisks.setLabels",
            "path":
              "projects/{project}/regions/{region}/disks/{resource}/setLabels",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    start_async_replication: {
      description: "start async replication",
      arguments: z.object({
        asyncSecondaryDisk: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["disk"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["asyncSecondaryDisk"] !== undefined) {
          body["asyncSecondaryDisk"] = args["asyncSecondaryDisk"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionDisks.startAsyncReplication",
            "path":
              "projects/{project}/regions/{region}/disks/{disk}/startAsyncReplication",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "disk"],
            "parameters": {
              "disk": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    stop_async_replication: {
      description: "stop async replication",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["disk"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionDisks.stopAsyncReplication",
            "path":
              "projects/{project}/regions/{region}/disks/{disk}/stopAsyncReplication",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "disk"],
            "parameters": {
              "disk": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    stop_group_async_replication: {
      description: "stop group async replication",
      arguments: z.object({
        resourcePolicy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (args["resourcePolicy"] !== undefined) {
          body["resourcePolicy"] = args["resourcePolicy"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionDisks.stopGroupAsyncReplication",
            "path":
              "projects/{project}/regions/{region}/disks/stopGroupAsyncReplication",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
            "id": "compute.regionDisks.testIamPermissions",
            "path":
              "projects/{project}/regions/{region}/disks/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_kms_key: {
      description: "update kms key",
      arguments: z.object({
        kmsKeyName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["disk"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["kmsKeyName"] !== undefined) {
          body["kmsKeyName"] = args["kmsKeyName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionDisks.updateKmsKey",
            "path":
              "projects/{project}/regions/{region}/disks/{disk}/updateKmsKey",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "disk"],
            "parameters": {
              "disk": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
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
