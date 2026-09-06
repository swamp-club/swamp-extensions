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

// Auto-generated extension model for @swamp/gcp/compute/machineimages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine MachineImages.
 *
 * Represents a machine image resource. A machine image is a Compute Engine resource that stores all the configuration, metadata, permissions, and data from one or more disks required to create a Virtual machine (VM) instance. For more information, seeMachine images.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.machineImages.get",
  "path": "projects/{project}/global/machineImages/{machineImage}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "machineImage",
  ],
  "parameters": {
    "machineImage": {
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
  "id": "compute.machineImages.insert",
  "path": "projects/{project}/global/machineImages",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "sourceInstance": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.machineImages.delete",
  "path": "projects/{project}/global/machineImages/{machineImage}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "machineImage",
  ],
  "parameters": {
    "machineImage": {
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
  "id": "compute.machineImages.list",
  "path": "projects/{project}/global/machineImages",
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
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  guestFlush: z.boolean().describe(
    "[Input Only] Whether to attempt an application consistent machine image by informing the OS to prepare for the snapshot process.",
  ).optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this machine image, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the machine image.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels to apply to this machine image. These can be later modified by the setLabels method.",
  ).optional(),
  machineImageEncryptionKey: z.object({
    kmsKeyName: z.string().describe(
      'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
    ).optional(),
    kmsKeyServiceAccount: z.string().describe(
      'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
    ).optional(),
    rawKey: z.string().describe(
      '[DEPRECATED] CSEK is no longer supported. Use CMEK instead. Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
    ).optional(),
    rsaEncryptedKey: z.string().describe(
      '[DEPRECATED] CSEK is no longer supported. Use CMEK instead. Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
    ).optional(),
    sha256: z.string().describe(
      "[DEPRECATED] CSEK is no longer supported. Use CMEK instead. [Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
    ).optional(),
  }).describe(
    "Encrypts the machine image using acustomer-supplied encryption key. After you encrypt a machine image using a customer-supplied key, you must provide the same key if you use the machine image later. For example, you must provide the encryption key when you create an instance from the encrypted machine image in a future request. Customer-supplied encryption keys do not protect access to metadata of the machine image. If you do not provide an encryption key when creating the machine image, then the machine image will be encrypted using an automatically generated key and you do not need to provide a key to use the machine image later.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the machine image. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe(
    "Input only. [Input Only] Additional parameters that are passed in the request, but are not persisted in the resource.",
  ).optional(),
  sourceDiskEncryptionKeys: z.array(z.object({
    diskEncryptionKey: z.object({
      kmsKeyName: z.string().describe(
        'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
      ).optional(),
      kmsKeyServiceAccount: z.string().describe(
        'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
      ).optional(),
      rawKey: z.string().describe(
        '[DEPRECATED] CSEK is no longer supported. Use CMEK instead. Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
      ).optional(),
      rsaEncryptedKey: z.string().describe(
        '[DEPRECATED] CSEK is no longer supported. Use CMEK instead. Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
      ).optional(),
      sha256: z.string().describe(
        "[DEPRECATED] CSEK is no longer supported. Use CMEK instead. [Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
      ).optional(),
    }).describe(
      "Thecustomer-supplied encryption key of the source disk. Required if the source disk is protected by a customer-supplied encryption key.",
    ).optional(),
    sourceDisk: z.string().describe(
      "URL of the disk attached to the source instance. This can be a full or valid partial URL. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk",
    ).optional(),
  })).describe(
    "[Input Only] Thecustomer-supplied encryption key of the disks attached to the source instance. Required if the source disk is protected by a customer-supplied encryption key.",
  ).optional(),
  sourceInstance: z.string().describe(
    "The source instance used to create the machine image. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance - projects/project/zones/zone/instances/instance",
  ).optional(),
  storageLocations: z.array(z.string()).describe(
    "The regional or multi-regional Cloud Storage bucket location where themachine image is stored.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  guestFlush: z.boolean().optional(),
  id: z.string().optional(),
  instanceProperties: z.object({
    advancedMachineFeatures: z.object({
      enableNestedVirtualization: z.boolean(),
      enableUefiNetworking: z.boolean(),
      performanceMonitoringUnit: z.string(),
      threadsPerCore: z.number(),
      turboMode: z.string(),
      visibleCoreCount: z.number(),
    }),
    canIpForward: z.boolean(),
    confidentialInstanceConfig: z.object({
      confidentialInstanceType: z.string(),
      enableConfidentialCompute: z.boolean(),
    }),
    description: z.string(),
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
        type: z.unknown(),
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
        licenses: z.array(z.unknown()),
        onUpdateAction: z.string(),
        provisionedIops: z.string(),
        provisionedThroughput: z.string(),
        replicaZones: z.array(z.unknown()),
        resourceManagerTags: z.record(z.string(), z.unknown()),
        resourcePolicies: z.array(z.unknown()),
        sourceImage: z.string(),
        sourceImageEncryptionKey: z.object({
          kmsKeyName: z.unknown(),
          kmsKeyServiceAccount: z.unknown(),
          rawKey: z.unknown(),
          rsaEncryptedKey: z.unknown(),
          sha256: z.unknown(),
        }),
        sourceSnapshot: z.string(),
        sourceSnapshotEncryptionKey: z.object({
          kmsKeyName: z.unknown(),
          kmsKeyServiceAccount: z.unknown(),
          rawKey: z.unknown(),
          rsaEncryptedKey: z.unknown(),
          sha256: z.unknown(),
        }),
        storagePool: z.string(),
      }),
      interface: z.string(),
      kind: z.string(),
      licenses: z.array(z.string()),
      mode: z.string(),
      savedState: z.string(),
      shieldedInstanceInitialState: z.object({
        dbs: z.array(z.unknown()),
        dbxs: z.array(z.unknown()),
        keks: z.array(z.unknown()),
        pk: z.object({
          content: z.unknown(),
          fileType: z.unknown(),
        }),
      }),
      source: z.string(),
      type: z.string(),
    })),
    guestAccelerators: z.array(z.object({
      acceleratorCount: z.number(),
      acceleratorType: z.string(),
    })),
    keyRevocationActionType: z.string(),
    labels: z.record(z.string(), z.unknown()),
    localSsdEncryptionMode: z.string(),
    machineType: z.string(),
    metadata: z.object({
      fingerprint: z.string(),
      items: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      kind: z.string(),
    }),
    minCpuPlatform: z.string(),
    networkInterfaces: z.array(z.object({
      accessConfigs: z.array(z.object({
        externalIpv6: z.unknown(),
        externalIpv6PrefixLength: z.unknown(),
        kind: z.unknown(),
        name: z.unknown(),
        natIP: z.unknown(),
        networkTier: z.unknown(),
        publicPtrDomainName: z.unknown(),
        securityPolicy: z.unknown(),
        setPublicPtr: z.unknown(),
        type: z.unknown(),
      })),
      aliasIpRanges: z.array(z.object({
        ipCidrRange: z.unknown(),
        subnetworkRangeName: z.unknown(),
      })),
      aliasIpv6Ranges: z.array(z.object({
        ipCidrRange: z.unknown(),
        subnetworkRangeName: z.unknown(),
      })),
      enableVpcScopedDns: z.boolean(),
      fingerprint: z.string(),
      igmpQuery: z.string(),
      internalIpv6PrefixLength: z.number(),
      ipv6AccessConfigs: z.array(z.object({
        externalIpv6: z.unknown(),
        externalIpv6PrefixLength: z.unknown(),
        kind: z.unknown(),
        name: z.unknown(),
        natIP: z.unknown(),
        networkTier: z.unknown(),
        publicPtrDomainName: z.unknown(),
        securityPolicy: z.unknown(),
        setPublicPtr: z.unknown(),
        type: z.unknown(),
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
    })),
    networkPerformanceConfig: z.object({
      totalEgressBandwidthTier: z.string(),
    }),
    privateIpv6GoogleAccess: z.string(),
    reservationAffinity: z.object({
      consumeReservationType: z.string(),
      key: z.string(),
      values: z.array(z.string()),
    }),
    resourceManagerTags: z.record(z.string(), z.unknown()),
    resourcePolicies: z.array(z.string()),
    scheduling: z.object({
      automaticRestart: z.boolean(),
      availabilityDomain: z.number(),
      exposeHostTopology: z.boolean(),
      gracefulShutdown: z.object({
        enabled: z.boolean(),
        maxDuration: z.object({
          nanos: z.number(),
          seconds: z.string(),
        }),
      }),
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
        values: z.array(z.unknown()),
      })),
      onHostMaintenance: z.string(),
      onInstanceStopAction: z.object({
        discardLocalSsd: z.boolean(),
      }),
      preemptible: z.boolean(),
      preemptionNoticeDuration: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      provisioningModel: z.string(),
      skipGuestOsShutdown: z.boolean(),
      terminationTime: z.string(),
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
    tags: z.object({
      fingerprint: z.string(),
      items: z.array(z.string()),
    }),
    workloadIdentityConfig: z.object({
      identity: z.string(),
      identityCertificateEnabled: z.boolean(),
    }),
  }).optional(),
  kind: z.string().optional(),
  labelFingerprint: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  machineImageEncryptionKey: z.object({
    kmsKeyName: z.string(),
    kmsKeyServiceAccount: z.string(),
    rawKey: z.string(),
    rsaEncryptedKey: z.string(),
    sha256: z.string(),
  }).optional(),
  name: z.string(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  savedDisks: z.array(z.object({
    architecture: z.string(),
    kind: z.string(),
    sourceDisk: z.string(),
    storageBytes: z.string(),
    storageBytesStatus: z.string(),
  })).optional(),
  selfLink: z.string().optional(),
  sourceDiskEncryptionKeys: z.array(z.object({
    diskEncryptionKey: z.object({
      kmsKeyName: z.string(),
      kmsKeyServiceAccount: z.string(),
      rawKey: z.string(),
      rsaEncryptedKey: z.string(),
      sha256: z.string(),
    }),
    sourceDisk: z.string(),
  })).optional(),
  sourceInstance: z.string().optional(),
  sourceInstanceProperties: z.object({
    canIpForward: z.boolean(),
    deletionProtection: z.boolean(),
    description: z.string(),
    disks: z.array(z.object({
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
      diskType: z.string(),
      guestOsFeatures: z.array(z.object({
        type: z.unknown(),
      })),
      index: z.number(),
      interface: z.string(),
      kind: z.string(),
      licenses: z.array(z.string()),
      mode: z.string(),
      source: z.string(),
      storageBytes: z.string(),
      storageBytesStatus: z.string(),
      type: z.string(),
    })),
    guestAccelerators: z.array(z.object({
      acceleratorCount: z.number(),
      acceleratorType: z.string(),
    })),
    keyRevocationActionType: z.string(),
    labels: z.record(z.string(), z.unknown()),
    machineType: z.string(),
    metadata: z.object({
      fingerprint: z.string(),
      items: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      kind: z.string(),
    }),
    minCpuPlatform: z.string(),
    networkInterfaces: z.array(z.object({
      accessConfigs: z.array(z.object({
        externalIpv6: z.unknown(),
        externalIpv6PrefixLength: z.unknown(),
        kind: z.unknown(),
        name: z.unknown(),
        natIP: z.unknown(),
        networkTier: z.unknown(),
        publicPtrDomainName: z.unknown(),
        securityPolicy: z.unknown(),
        setPublicPtr: z.unknown(),
        type: z.unknown(),
      })),
      aliasIpRanges: z.array(z.object({
        ipCidrRange: z.unknown(),
        subnetworkRangeName: z.unknown(),
      })),
      aliasIpv6Ranges: z.array(z.object({
        ipCidrRange: z.unknown(),
        subnetworkRangeName: z.unknown(),
      })),
      enableVpcScopedDns: z.boolean(),
      fingerprint: z.string(),
      igmpQuery: z.string(),
      internalIpv6PrefixLength: z.number(),
      ipv6AccessConfigs: z.array(z.object({
        externalIpv6: z.unknown(),
        externalIpv6PrefixLength: z.unknown(),
        kind: z.unknown(),
        name: z.unknown(),
        natIP: z.unknown(),
        networkTier: z.unknown(),
        publicPtrDomainName: z.unknown(),
        securityPolicy: z.unknown(),
        setPublicPtr: z.unknown(),
        type: z.unknown(),
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
    })),
    postKeyRevocationActionType: z.string(),
    scheduling: z.object({
      automaticRestart: z.boolean(),
      availabilityDomain: z.number(),
      exposeHostTopology: z.boolean(),
      gracefulShutdown: z.object({
        enabled: z.boolean(),
        maxDuration: z.object({
          nanos: z.number(),
          seconds: z.string(),
        }),
      }),
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
        values: z.array(z.unknown()),
      })),
      onHostMaintenance: z.string(),
      onInstanceStopAction: z.object({
        discardLocalSsd: z.boolean(),
      }),
      preemptible: z.boolean(),
      preemptionNoticeDuration: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      provisioningModel: z.string(),
      skipGuestOsShutdown: z.boolean(),
      terminationTime: z.string(),
    }),
    serviceAccounts: z.array(z.object({
      email: z.string(),
      scopes: z.array(z.string()),
    })),
    tags: z.object({
      fingerprint: z.string(),
      items: z.array(z.string()),
    }),
  }).optional(),
  status: z.string().optional(),
  storageLocations: z.array(z.string()).optional(),
  totalStorageBytes: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  guestFlush: z.boolean().describe(
    "[Input Only] Whether to attempt an application consistent machine image by informing the OS to prepare for the snapshot process.",
  ).optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this machine image, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the machine image.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels to apply to this machine image. These can be later modified by the setLabels method.",
  ).optional(),
  machineImageEncryptionKey: z.object({
    kmsKeyName: z.string().describe(
      'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
    ).optional(),
    kmsKeyServiceAccount: z.string().describe(
      'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
    ).optional(),
    rawKey: z.string().describe(
      '[DEPRECATED] CSEK is no longer supported. Use CMEK instead. Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
    ).optional(),
    rsaEncryptedKey: z.string().describe(
      '[DEPRECATED] CSEK is no longer supported. Use CMEK instead. Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
    ).optional(),
    sha256: z.string().describe(
      "[DEPRECATED] CSEK is no longer supported. Use CMEK instead. [Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
    ).optional(),
  }).describe(
    "Encrypts the machine image using acustomer-supplied encryption key. After you encrypt a machine image using a customer-supplied key, you must provide the same key if you use the machine image later. For example, you must provide the encryption key when you create an instance from the encrypted machine image in a future request. Customer-supplied encryption keys do not protect access to metadata of the machine image. If you do not provide an encryption key when creating the machine image, then the machine image will be encrypted using an automatically generated key and you do not need to provide a key to use the machine image later.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the machine image. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe(
    "Input only. [Input Only] Additional parameters that are passed in the request, but are not persisted in the resource.",
  ).optional(),
  sourceDiskEncryptionKeys: z.array(z.object({
    diskEncryptionKey: z.object({
      kmsKeyName: z.string().describe(
        'The name of the encryption key that is stored in Google Cloud KMS. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example: "kmsKeyName": "projects/kms_project_id/locations/region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1',
      ).optional(),
      kmsKeyServiceAccount: z.string().describe(
        'The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example: "kmsKeyServiceAccount": "name@project_id.iam.gserviceaccount.com/',
      ).optional(),
      rawKey: z.string().describe(
        '[DEPRECATED] CSEK is no longer supported. Use CMEK instead. Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0="',
      ).optional(),
      rsaEncryptedKey: z.string().describe(
        '[DEPRECATED] CSEK is no longer supported. Use CMEK instead. Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the rawKey or thersaEncryptedKey. For example: "rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine: 1. The key is wrapped using a RSA public key certificate provided by Google. 2. After being wrapped, the key must be encoded in RFC 4648 base64 encoding. Gets the RSA public key certificate provided by Google at: https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem',
      ).optional(),
      sha256: z.string().describe(
        "[DEPRECATED] CSEK is no longer supported. Use CMEK instead. [Output only] TheRFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.",
      ).optional(),
    }).describe(
      "Thecustomer-supplied encryption key of the source disk. Required if the source disk is protected by a customer-supplied encryption key.",
    ).optional(),
    sourceDisk: z.string().describe(
      "URL of the disk attached to the source instance. This can be a full or valid partial URL. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk - projects/project/zones/zone/disks/disk - zones/zone/disks/disk",
    ).optional(),
  })).describe(
    "[Input Only] Thecustomer-supplied encryption key of the disks attached to the source instance. Required if the source disk is protected by a customer-supplied encryption key.",
  ).optional(),
  sourceInstance: z.string().describe(
    "The source instance used to create the machine image. You can provide this as a partial or full URL to the resource. For example, the following are valid values: - https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance - projects/project/zones/zone/instances/instance",
  ).optional(),
  storageLocations: z.array(z.string()).describe(
    "The regional or multi-regional Cloud Storage bucket location where themachine image is stored.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Compute Engine MachineImages. Registered at `@swamp/gcp/compute/machineimages`. */
export const model = {
  type: "@swamp/gcp/compute/machineimages",
  version: "2026.09.06.1",
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
      toVersion: "2026.06.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
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
      description: "Removed: instanceProperties, sourceInstanceProperties",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          instanceProperties: _instanceProperties,
          sourceInstanceProperties: _sourceInstanceProperties,
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
      toVersion: "2026.07.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.28.1",
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
      toVersion: "2026.09.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a machine image resource. A machine image is a Compute Engine reso...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a machineImages",
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
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["guestFlush"] !== undefined) body["guestFlush"] = g["guestFlush"];
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["machineImageEncryptionKey"] !== undefined) {
          body["machineImageEncryptionKey"] = g["machineImageEncryptionKey"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["sourceDiskEncryptionKeys"] !== undefined) {
          body["sourceDiskEncryptionKeys"] = g["sourceDiskEncryptionKeys"];
        }
        if (g["sourceInstance"] !== undefined) {
          params["sourceInstance"] = String(g["sourceInstance"]);
        }
        if (g["storageLocations"] !== undefined) {
          body["storageLocations"] = g["storageLocations"];
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["name"] !== undefined) params["machineImage"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["READY"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "project": projectId },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a machineImages",
      arguments: z.object({
        identifier: z.string().describe("The name of the machineImages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["machineImage"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
    delete: {
      description: "Delete the machineImages",
      arguments: z.object({
        identifier: z.string().describe("The name of the machineImages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["machineImage"] = args.identifier;
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
      description: "Sync machineImages state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific machineImages by name (e.g. one discovered by list)",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["machineImage"] = identifier;
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
      description: "List machineImages resources",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
          LIST_CONFIG,
          params,
          "items",
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
    get_iam_policy: {
      description: "get iam policy",
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.machineImages.getIamPolicy",
            "path":
              "projects/{project}/global/machineImages/{resource}/getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "optionsRequestedPolicyVersion": { "location": "query" },
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
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
        bindings: z.any().optional(),
        etag: z.any().optional(),
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["bindings"] !== undefined) body["bindings"] = args["bindings"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.machineImages.setIamPolicy",
            "path":
              "projects/{project}/global/machineImages/{resource}/setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
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
    set_labels: {
      description: "set labels",
      arguments: z.object({
        labelFingerprint: z.any().optional(),
        labels: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = args["labelFingerprint"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.machineImages.setLabels",
            "path":
              "projects/{project}/global/machineImages/{resource}/setLabels",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "compute.machineImages.testIamPermissions",
            "path":
              "projects/{project}/global/machineImages/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
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
  },
};
