// Auto-generated extension model for @swamp/gcp/compute/images
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Images.
 *
 * Represents an Image resource. You can use images to create boot disks for your VM instances. For more information, read Images.
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
  "id": "compute.images.get",
  "path": "projects/{project}/global/images/{image}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "image",
  ],
  "parameters": {
    "image": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.images.insert",
  "path": "projects/{project}/global/images",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "forceCreate": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.images.patch",
  "path": "projects/{project}/global/images/{image}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "image",
  ],
  "parameters": {
    "image": {
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.images.delete",
  "path": "projects/{project}/global/images/{image}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "image",
  ],
  "parameters": {
    "image": {
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
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.images.list",
  "path": "projects/{project}/global/images",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
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
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"])
    .describe(
      "The architecture of the image. Valid values are ARM64 or X86_64.",
    ).optional(),
  archiveSizeBytes: z.string().describe(
    "Size of the image tar.gz archive stored in Google Cloud Storage (in bytes).",
  ).optional(),
  deprecated: z.object({
    deleted: z.string().describe(
      "An optional RFC3339 timestamp on or after which the state of this resource is intended to change to DELETED. This is only informational and the status will not change unless the client explicitly changes it.",
    ).optional(),
    deprecated: z.string().describe(
      "An optional RFC3339 timestamp on or after which the state of this resource is intended to change to DEPRECATED. This is only informational and the status will not change unless the client explicitly changes it.",
    ).optional(),
    obsolete: z.string().describe(
      "An optional RFC3339 timestamp on or after which the state of this resource is intended to change to OBSOLETE. This is only informational and the status will not change unless the client explicitly changes it.",
    ).optional(),
    replacement: z.string().describe(
      "The URL of the suggested replacement for a deprecated resource. The suggested replacement resource must be the same kind of resource as the deprecated resource.",
    ).optional(),
    state: z.enum(["ACTIVE", "DELETED", "DEPRECATED", "OBSOLETE"]).describe(
      "The deprecation state of this resource. This can be ACTIVE,DEPRECATED, OBSOLETE, or DELETED. Operations which communicate the end of life date for an image, can useACTIVE. Operations which create a new resource using aDEPRECATED resource will return successfully, but with a warning indicating the deprecated resource and recommending its replacement. Operations which use OBSOLETE orDELETED resources will be rejected and result in an error.",
    ).optional(),
  }).describe("Deprecation status for a public resource.").optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  diskSizeGb: z.string().describe(
    "Size of the image when restored onto a persistent disk (in GB).",
  ).optional(),
  family: z.string().describe(
    "The name of the image family to which this image belongs. The image family name can be from a publicly managed image family provided by Compute Engine, or from a custom image family you create. For example,centos-stream-9 is a publicly available image family. For more information, see Image family best practices. When creating disks, you can specify an image family instead of a specific image name. The image family always returns its latest image that is not deprecated. The name of the image family must comply with RFC1035.",
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
    "A list of features to enable on the guest operating system. Applicable only for bootable images. To see a list of available options, see theguestOSfeatures[].type parameter.",
  ).optional(),
  imageEncryptionKey: z.object({
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
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this image, which is essentially a hash of the labels used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an image.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels to apply to this image. These can be later modified by the setLabels method.",
  ).optional(),
  licenseCodes: z.array(z.string()).describe(
    "Integer license codes indicating which licenses are attached to this image.",
  ).optional(),
  licenses: z.array(z.string()).describe("Any applicable license URI.")
    .optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the image. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional image params.").optional(),
  rawDisk: z.object({
    containerType: z.enum(["TAR"]).describe(
      "The format used to encode and transmit the block device, which should beTAR. This is just a container and transmission format and not a runtime format. Provided by the client when the disk image is created.",
    ).optional(),
    sha1Checksum: z.string().regex(new RegExp("[a-f0-9]{40}")).describe(
      "[Deprecated] This field is deprecated. An optional SHA1 checksum of the disk image before unpackaging provided by the client when the disk image is created.",
    ).optional(),
    source: z.string().describe(
      "The full Google Cloud Storage URL or Artifact Registry path where the raw disk image archive is stored. The following are valid formats: - https://storage.googleapis.com/bucket_name/image_archive_name - https://storage.googleapis.com/bucket_name/folder_name/image_archive_name - projects/project/locations/location/repositories/repo/packages/package/versions/version_id - projects/project/locations/location/repositories/repo/packages/package/versions/version_id@dirsum_sha256:hex_value In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL",
    ).optional(),
  }).describe("The parameters of the raw disk image.").optional(),
  shieldedInstanceInitialState: z.object({
    dbs: z.array(z.object({
      content: z.string().describe("The raw content in the secure keys file.")
        .optional(),
      fileType: z.enum(["BIN", "UNDEFINED", "X509"]).describe(
        "The file type of source file.",
      ).optional(),
    })).describe("The Key Database (db).").optional(),
    dbxs: z.array(z.object({
      content: z.string().describe("The raw content in the secure keys file.")
        .optional(),
      fileType: z.enum(["BIN", "UNDEFINED", "X509"]).describe(
        "The file type of source file.",
      ).optional(),
    })).describe("The forbidden key database (dbx).").optional(),
    keks: z.array(z.object({
      content: z.string().describe("The raw content in the secure keys file.")
        .optional(),
      fileType: z.enum(["BIN", "UNDEFINED", "X509"]).describe(
        "The file type of source file.",
      ).optional(),
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
  sourceDisk: z.string().describe(
    "URL of the source disk used to create this image. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL",
  ).optional(),
  sourceDiskEncryptionKey: z.object({
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
  sourceImage: z.string().describe(
    "URL of the source image used to create this image. The following are valid formats for the URL: - https://www.googleapis.com/compute/v1/projects/project_id/global/ images/image_name - projects/project_id/global/images/image_name In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL",
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
    "URL of the source snapshot used to create this image. The following are valid formats for the URL: - https://www.googleapis.com/compute/v1/projects/project_id/global/ snapshots/snapshot_name - projects/project_id/global/snapshots/snapshot_name In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL",
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
  sourceType: z.enum(["RAW"]).describe(
    "The type of the image used to create this disk. The default and only valid value is RAW.",
  ).optional(),
  storageLocations: z.array(z.string()).describe(
    "Cloud Storage bucket storage location of the image (regional or multi-regional).",
  ).optional(),
  forceCreate: z.string().describe("Force image creation if true.").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  architecture: z.string().optional(),
  archiveSizeBytes: z.string().optional(),
  creationTimestamp: z.string().optional(),
  deprecated: z.object({
    deleted: z.string(),
    deprecated: z.string(),
    obsolete: z.string(),
    replacement: z.string(),
    state: z.string(),
  }).optional(),
  description: z.string().optional(),
  diskSizeGb: z.string().optional(),
  enableConfidentialCompute: z.boolean().optional(),
  family: z.string().optional(),
  guestOsFeatures: z.array(z.object({
    type: z.string(),
  })).optional(),
  id: z.string().optional(),
  imageEncryptionKey: z.object({
    kmsKeyName: z.string(),
    kmsKeyServiceAccount: z.string(),
    rawKey: z.string(),
    rsaEncryptedKey: z.string(),
    sha256: z.string(),
  }).optional(),
  kind: z.string().optional(),
  labelFingerprint: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  licenseCodes: z.array(z.string()).optional(),
  licenses: z.array(z.string()).optional(),
  name: z.string(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  rawDisk: z.object({
    containerType: z.string(),
    sha1Checksum: z.string(),
    source: z.string(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  selfLink: z.string().optional(),
  shieldedInstanceInitialState: z.object({
    dbs: z.array(z.object({
      content: z.string(),
      fileType: z.string(),
    })),
    dbxs: z.array(z.object({
      content: z.string(),
      fileType: z.string(),
    })),
    keks: z.array(z.object({
      content: z.string(),
      fileType: z.string(),
    })),
    pk: z.object({
      content: z.string(),
      fileType: z.string(),
    }),
  }).optional(),
  sourceDisk: z.string().optional(),
  sourceDiskEncryptionKey: z.object({
    kmsKeyName: z.string(),
    kmsKeyServiceAccount: z.string(),
    rawKey: z.string(),
    rsaEncryptedKey: z.string(),
    sha256: z.string(),
  }).optional(),
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
  sourceSnapshot: z.string().optional(),
  sourceSnapshotEncryptionKey: z.object({
    kmsKeyName: z.string(),
    kmsKeyServiceAccount: z.string(),
    rawKey: z.string(),
    rsaEncryptedKey: z.string(),
    sha256: z.string(),
  }).optional(),
  sourceSnapshotId: z.string().optional(),
  sourceType: z.string().optional(),
  status: z.string().optional(),
  storageLocations: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "ARM64", "X86_64"])
    .describe(
      "The architecture of the image. Valid values are ARM64 or X86_64.",
    ).optional(),
  archiveSizeBytes: z.string().describe(
    "Size of the image tar.gz archive stored in Google Cloud Storage (in bytes).",
  ).optional(),
  deprecated: z.object({
    deleted: z.string().describe(
      "An optional RFC3339 timestamp on or after which the state of this resource is intended to change to DELETED. This is only informational and the status will not change unless the client explicitly changes it.",
    ).optional(),
    deprecated: z.string().describe(
      "An optional RFC3339 timestamp on or after which the state of this resource is intended to change to DEPRECATED. This is only informational and the status will not change unless the client explicitly changes it.",
    ).optional(),
    obsolete: z.string().describe(
      "An optional RFC3339 timestamp on or after which the state of this resource is intended to change to OBSOLETE. This is only informational and the status will not change unless the client explicitly changes it.",
    ).optional(),
    replacement: z.string().describe(
      "The URL of the suggested replacement for a deprecated resource. The suggested replacement resource must be the same kind of resource as the deprecated resource.",
    ).optional(),
    state: z.enum(["ACTIVE", "DELETED", "DEPRECATED", "OBSOLETE"]).describe(
      "The deprecation state of this resource. This can be ACTIVE,DEPRECATED, OBSOLETE, or DELETED. Operations which communicate the end of life date for an image, can useACTIVE. Operations which create a new resource using aDEPRECATED resource will return successfully, but with a warning indicating the deprecated resource and recommending its replacement. Operations which use OBSOLETE orDELETED resources will be rejected and result in an error.",
    ).optional(),
  }).describe("Deprecation status for a public resource.").optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  diskSizeGb: z.string().describe(
    "Size of the image when restored onto a persistent disk (in GB).",
  ).optional(),
  family: z.string().describe(
    "The name of the image family to which this image belongs. The image family name can be from a publicly managed image family provided by Compute Engine, or from a custom image family you create. For example,centos-stream-9 is a publicly available image family. For more information, see Image family best practices. When creating disks, you can specify an image family instead of a specific image name. The image family always returns its latest image that is not deprecated. The name of the image family must comply with RFC1035.",
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
    "A list of features to enable on the guest operating system. Applicable only for bootable images. To see a list of available options, see theguestOSfeatures[].type parameter.",
  ).optional(),
  imageEncryptionKey: z.object({
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
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this image, which is essentially a hash of the labels used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an image.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels to apply to this image. These can be later modified by the setLabels method.",
  ).optional(),
  licenseCodes: z.array(z.string()).describe(
    "Integer license codes indicating which licenses are attached to this image.",
  ).optional(),
  licenses: z.array(z.string()).describe("Any applicable license URI.")
    .optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the image. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional image params.").optional(),
  rawDisk: z.object({
    containerType: z.enum(["TAR"]).describe(
      "The format used to encode and transmit the block device, which should beTAR. This is just a container and transmission format and not a runtime format. Provided by the client when the disk image is created.",
    ).optional(),
    sha1Checksum: z.string().regex(new RegExp("[a-f0-9]{40}")).describe(
      "[Deprecated] This field is deprecated. An optional SHA1 checksum of the disk image before unpackaging provided by the client when the disk image is created.",
    ).optional(),
    source: z.string().describe(
      "The full Google Cloud Storage URL or Artifact Registry path where the raw disk image archive is stored. The following are valid formats: - https://storage.googleapis.com/bucket_name/image_archive_name - https://storage.googleapis.com/bucket_name/folder_name/image_archive_name - projects/project/locations/location/repositories/repo/packages/package/versions/version_id - projects/project/locations/location/repositories/repo/packages/package/versions/version_id@dirsum_sha256:hex_value In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL",
    ).optional(),
  }).describe("The parameters of the raw disk image.").optional(),
  shieldedInstanceInitialState: z.object({
    dbs: z.array(z.object({
      content: z.string().describe("The raw content in the secure keys file.")
        .optional(),
      fileType: z.enum(["BIN", "UNDEFINED", "X509"]).describe(
        "The file type of source file.",
      ).optional(),
    })).describe("The Key Database (db).").optional(),
    dbxs: z.array(z.object({
      content: z.string().describe("The raw content in the secure keys file.")
        .optional(),
      fileType: z.enum(["BIN", "UNDEFINED", "X509"]).describe(
        "The file type of source file.",
      ).optional(),
    })).describe("The forbidden key database (dbx).").optional(),
    keks: z.array(z.object({
      content: z.string().describe("The raw content in the secure keys file.")
        .optional(),
      fileType: z.enum(["BIN", "UNDEFINED", "X509"]).describe(
        "The file type of source file.",
      ).optional(),
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
  sourceDisk: z.string().describe(
    "URL of the source disk used to create this image. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL",
  ).optional(),
  sourceDiskEncryptionKey: z.object({
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
  sourceImage: z.string().describe(
    "URL of the source image used to create this image. The following are valid formats for the URL: - https://www.googleapis.com/compute/v1/projects/project_id/global/ images/image_name - projects/project_id/global/images/image_name In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL",
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
    "URL of the source snapshot used to create this image. The following are valid formats for the URL: - https://www.googleapis.com/compute/v1/projects/project_id/global/ snapshots/snapshot_name - projects/project_id/global/snapshots/snapshot_name In order to create an image, you must provide the full or partial URL of one of the following: - The rawDisk.source URL - The sourceDisk URL - The sourceImage URL - The sourceSnapshot URL",
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
  sourceType: z.enum(["RAW"]).describe(
    "The type of the image used to create this disk. The default and only valid value is RAW.",
  ).optional(),
  storageLocations: z.array(z.string()).describe(
    "Cloud Storage bucket storage location of the image (regional or multi-regional).",
  ).optional(),
  forceCreate: z.string().describe("Force image creation if true.").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine Images. Registered at `@swamp/gcp/compute/images`. */
export const model = {
  type: "@swamp/gcp/compute/images",
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
      toVersion: "2026.05.25.2",
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
        "Represents an Image resource. You can use images to create boot disks for you...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a images",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["architecture"] !== undefined) {
          body["architecture"] = g["architecture"];
        }
        if (g["archiveSizeBytes"] !== undefined) {
          body["archiveSizeBytes"] = g["archiveSizeBytes"];
        }
        if (g["deprecated"] !== undefined) body["deprecated"] = g["deprecated"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskSizeGb"] !== undefined) body["diskSizeGb"] = g["diskSizeGb"];
        if (g["family"] !== undefined) body["family"] = g["family"];
        if (g["guestOsFeatures"] !== undefined) {
          body["guestOsFeatures"] = g["guestOsFeatures"];
        }
        if (g["imageEncryptionKey"] !== undefined) {
          body["imageEncryptionKey"] = g["imageEncryptionKey"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["licenseCodes"] !== undefined) {
          body["licenseCodes"] = g["licenseCodes"];
        }
        if (g["licenses"] !== undefined) body["licenses"] = g["licenses"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["rawDisk"] !== undefined) body["rawDisk"] = g["rawDisk"];
        if (g["shieldedInstanceInitialState"] !== undefined) {
          body["shieldedInstanceInitialState"] =
            g["shieldedInstanceInitialState"];
        }
        if (g["sourceDisk"] !== undefined) body["sourceDisk"] = g["sourceDisk"];
        if (g["sourceDiskEncryptionKey"] !== undefined) {
          body["sourceDiskEncryptionKey"] = g["sourceDiskEncryptionKey"];
        }
        if (g["sourceImage"] !== undefined) {
          body["sourceImage"] = g["sourceImage"];
        }
        if (g["sourceImageEncryptionKey"] !== undefined) {
          body["sourceImageEncryptionKey"] = g["sourceImageEncryptionKey"];
        }
        if (g["sourceSnapshot"] !== undefined) {
          body["sourceSnapshot"] = g["sourceSnapshot"];
        }
        if (g["sourceSnapshotEncryptionKey"] !== undefined) {
          body["sourceSnapshotEncryptionKey"] =
            g["sourceSnapshotEncryptionKey"];
        }
        if (g["sourceType"] !== undefined) body["sourceType"] = g["sourceType"];
        if (g["storageLocations"] !== undefined) {
          body["storageLocations"] = g["storageLocations"];
        }
        if (g["forceCreate"] !== undefined) {
          body["forceCreate"] = g["forceCreate"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["image"] = String(g["name"]);
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
            listParams: { "project": projectId },
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
      description: "Get a images",
      arguments: z.object({
        identifier: z.string().describe("The name of the images"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["image"] = args.identifier;
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
      description: "Update images attributes",
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
        params["image"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["architecture"] !== undefined) {
          body["architecture"] = g["architecture"];
        }
        if (g["archiveSizeBytes"] !== undefined) {
          body["archiveSizeBytes"] = g["archiveSizeBytes"];
        }
        if (g["deprecated"] !== undefined) body["deprecated"] = g["deprecated"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskSizeGb"] !== undefined) body["diskSizeGb"] = g["diskSizeGb"];
        if (g["family"] !== undefined) body["family"] = g["family"];
        if (g["guestOsFeatures"] !== undefined) {
          body["guestOsFeatures"] = g["guestOsFeatures"];
        }
        if (g["imageEncryptionKey"] !== undefined) {
          body["imageEncryptionKey"] = g["imageEncryptionKey"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["licenseCodes"] !== undefined) {
          body["licenseCodes"] = g["licenseCodes"];
        }
        if (g["licenses"] !== undefined) body["licenses"] = g["licenses"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["rawDisk"] !== undefined) body["rawDisk"] = g["rawDisk"];
        if (g["shieldedInstanceInitialState"] !== undefined) {
          body["shieldedInstanceInitialState"] =
            g["shieldedInstanceInitialState"];
        }
        if (g["sourceDisk"] !== undefined) body["sourceDisk"] = g["sourceDisk"];
        if (g["sourceDiskEncryptionKey"] !== undefined) {
          body["sourceDiskEncryptionKey"] = g["sourceDiskEncryptionKey"];
        }
        if (g["sourceImage"] !== undefined) {
          body["sourceImage"] = g["sourceImage"];
        }
        if (g["sourceImageEncryptionKey"] !== undefined) {
          body["sourceImageEncryptionKey"] = g["sourceImageEncryptionKey"];
        }
        if (g["sourceSnapshot"] !== undefined) {
          body["sourceSnapshot"] = g["sourceSnapshot"];
        }
        if (g["sourceSnapshotEncryptionKey"] !== undefined) {
          body["sourceSnapshotEncryptionKey"] =
            g["sourceSnapshotEncryptionKey"];
        }
        if (g["sourceType"] !== undefined) body["sourceType"] = g["sourceType"];
        if (g["storageLocations"] !== undefined) {
          body["storageLocations"] = g["storageLocations"];
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
      description: "Delete the images",
      arguments: z.object({
        identifier: z.string().describe("The name of the images"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["image"] = args.identifier;
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
      description: "Sync images state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["image"] = identifier;
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
      description: "List images resources",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
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
    deprecate: {
      description: "deprecate",
      arguments: z.object({
        deleted: z.any().optional(),
        deprecated: z.any().optional(),
        obsolete: z.any().optional(),
        replacement: z.any().optional(),
        state: z.any().optional(),
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
        params["image"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deleted"] !== undefined) body["deleted"] = args["deleted"];
        if (args["deprecated"] !== undefined) {
          body["deprecated"] = args["deprecated"];
        }
        if (args["obsolete"] !== undefined) body["obsolete"] = args["obsolete"];
        if (args["replacement"] !== undefined) {
          body["replacement"] = args["replacement"];
        }
        if (args["state"] !== undefined) body["state"] = args["state"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.images.deprecate",
            "path": "projects/{project}/global/images/{image}/deprecate",
            "httpMethod": "POST",
            "parameterOrder": ["project", "image"],
            "parameters": {
              "image": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_from_family: {
      description: "get from family",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["family"] !== undefined) params["family"] = String(g["family"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.images.getFromFamily",
            "path": "projects/{project}/global/images/family/{family}",
            "httpMethod": "GET",
            "parameterOrder": ["project", "family"],
            "parameters": {
              "family": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
            },
          },
          params,
          {},
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
            "id": "compute.images.getIamPolicy",
            "path": "projects/{project}/global/images/{resource}/getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "optionsRequestedPolicyVersion": { "location": "query" },
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
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
            "id": "compute.images.setIamPolicy",
            "path": "projects/{project}/global/images/{resource}/setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
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
            "id": "compute.images.setLabels",
            "path": "projects/{project}/global/images/{resource}/setLabels",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
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
            "id": "compute.images.testIamPermissions",
            "path":
              "projects/{project}/global/images/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
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
