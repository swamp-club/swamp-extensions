// Auto-generated extension model for @swamp/gcp/compute/reservations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Reservations.
 *
 * Represents a reservation resource. A reservation ensures that capacity is held in a specific zone even if the reserved VMs are not running. For more information, read Reserving zonal resources.
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
  "id": "compute.reservations.get",
  "path": "projects/{project}/zones/{zone}/reservations/{reservation}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "reservation",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "reservation": {
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
  "id": "compute.reservations.insert",
  "path": "projects/{project}/zones/{zone}/reservations",
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
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.reservations.update",
  "path": "projects/{project}/zones/{zone}/reservations/{reservation}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "zone",
    "reservation",
  ],
  "parameters": {
    "paths": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "reservation": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.reservations.delete",
  "path": "projects/{project}/zones/{zone}/reservations/{reservation}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "zone",
    "reservation",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "reservation": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  advancedDeploymentControl: z.object({
    reservationOperationalMode: z.enum([
      "ALL_CAPACITY",
      "HIGHLY_AVAILABLE_CAPACITY",
      "RESERVATION_OPERATIONAL_MODE_UNSPECIFIED",
    ]).describe(
      "Indicates chosen reservation operational mode for the reservation.",
    ).optional(),
  }).describe(
    "Advance control for cluster management, applicable only to DENSE deployment type reservations.",
  ).optional(),
  aggregateReservation: z.object({
    inUseResources: z.array(z.object({
      accelerator: z.object({
        acceleratorCount: z.number().int().describe(
          "Number of accelerators of specified type.",
        ).optional(),
        acceleratorType: z.string().describe(
          'Full or partial URL to accelerator type. e.g. "projects/{PROJECT}/zones/{ZONE}/acceleratorTypes/ct4l"',
        ).optional(),
      }).optional(),
    })).describe(
      "Output only. [Output only] List of resources currently in use.",
    ).optional(),
    reservedResources: z.array(z.object({
      accelerator: z.object({
        acceleratorCount: z.number().int().describe(
          "Number of accelerators of specified type.",
        ).optional(),
        acceleratorType: z.string().describe(
          'Full or partial URL to accelerator type. e.g. "projects/{PROJECT}/zones/{ZONE}/acceleratorTypes/ct4l"',
        ).optional(),
      }).optional(),
    })).describe("List of reserved resources (CPUs, memory, accelerators).")
      .optional(),
    vmFamily: z.enum([
      "VM_FAMILY_CLOUD_TPU_DEVICE_CT3",
      "VM_FAMILY_CLOUD_TPU_LITE_DEVICE_CT5L",
      "VM_FAMILY_CLOUD_TPU_LITE_POD_SLICE_CT5LP",
      "VM_FAMILY_CLOUD_TPU_LITE_POD_SLICE_CT6E",
      "VM_FAMILY_CLOUD_TPU_POD_SLICE_CT3P",
      "VM_FAMILY_CLOUD_TPU_POD_SLICE_CT4P",
      "VM_FAMILY_CLOUD_TPU_POD_SLICE_CT5P",
      "VM_FAMILY_CLOUD_TPU_POD_SLICE_TPU7X",
    ]).describe(
      "The VM family that all instances scheduled against this reservation must belong to.",
    ).optional(),
    workloadType: z.enum(["BATCH", "SERVING", "UNSPECIFIED"]).describe(
      "The workload type of the instances that will target this reservation.",
    ).optional(),
  }).describe(
    "This reservation type is specified by total resource amounts (e.g. total count of CPUs) and can account for multiple instance SKUs. In other words, one can create instances of varying shapes against this reservation.",
  ).optional(),
  confidentialComputeType: z.enum([
    "CONFIDENTIAL_COMPUTE_TYPE_TDX",
    "CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED",
  ]).optional(),
  deleteAfterDuration: z.object({
    nanos: z.number().int().describe(
      "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
  ).optional(),
  deleteAtTime: z.string().describe(
    "Absolute time in future when the reservation will be auto-deleted by Compute Engine. Timestamp is represented inRFC3339 text format.",
  ).optional(),
  deploymentType: z.enum(["DENSE", "DEPLOYMENT_TYPE_UNSPECIFIED"]).describe(
    "Specifies the deployment strategy for this reservation.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  earlyAccessMaintenance: z.enum(["NO_EARLY_ACCESS", "WAVE1", "WAVE2"])
    .describe(
      "Indicates the early access maintenance for the reservation. If this field is absent or set to NO_EARLY_ACCESS, the reservation is not enrolled in early access maintenance and the standard notice applies.",
    ).optional(),
  enableEmergentMaintenance: z.boolean().describe(
    "Indicates whether Compute Engine allows unplanned maintenance for your VMs; for example, to fix hardware errors.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the reservation. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional reservation params.").optional(),
  protectionTier: z.enum([
    "CAPACITY_OPTIMIZED",
    "PROTECTION_TIER_UNSPECIFIED",
    "STANDARD",
  ]).describe(
    "Protection tier for the workload which specifies the workload expectations in the event of infrastructure failures at data center (e.g. power and/or cooling failures).",
  ).optional(),
  reservationSharingPolicy: z.object({
    serviceShareType: z.enum([
      "ALLOW_ALL",
      "DISALLOW_ALL",
      "SERVICE_SHARE_TYPE_UNSPECIFIED",
    ]).describe("Sharing config for all Google Cloud services.").optional(),
  }).optional(),
  resourcePolicies: z.record(z.string(), z.string()).describe(
    "Resource policies to be added to this reservation. The key is defined by user, and the value is resource policy url. This is to define placement policy with reservation.",
  ).optional(),
  schedulingType: z.enum([
    "GROUPED",
    "GROUP_MAINTENANCE_TYPE_UNSPECIFIED",
    "INDEPENDENT",
  ]).describe("The type of maintenance for the reservation.").optional(),
  shareSettings: z.object({
    projectMap: z.record(
      z.string(),
      z.object({
        projectId: z.string().describe(
          "The project ID, should be same as the key of this project config in the parent map.",
        ).optional(),
      }),
    ).describe(
      "A map of project id and project config. This is only valid when share_type's value is SPECIFIC_PROJECTS.",
    ).optional(),
    shareType: z.enum([
      "LOCAL",
      "ORGANIZATION",
      "SHARE_TYPE_UNSPECIFIED",
      "SPECIFIC_PROJECTS",
    ]).describe("Type of sharing for this shared-reservation").optional(),
  }).describe(
    "The share setting for reservations and sole tenancy node groups.",
  ).optional(),
  specificReservation: z.object({
    assuredCount: z.string().describe(
      "Output only. [Output Only] Indicates how many instances are actually usable currently.",
    ).optional(),
    count: z.string().describe(
      "Specifies the number of resources that are allocated.",
    ).optional(),
    inUseCount: z.string().describe(
      "Output only. [Output Only] Indicates how many instances are in use.",
    ).optional(),
    instanceProperties: z.object({
      guestAccelerators: z.array(z.object({
        acceleratorCount: z.number().int().describe(
          "The number of the guest accelerator cards exposed to this instance.",
        ).optional(),
        acceleratorType: z.string().describe(
          "Full or partial URL of the accelerator type resource to attach to this instance. For example:projects/my-project/zones/us-central1-c/acceleratorTypes/nvidia-tesla-p100 If you are creating an instance template, specify only the accelerator name. See GPUs on Compute Engine for a full list of accelerator types.",
        ).optional(),
      })).describe("Specifies accelerator type and count.").optional(),
      localSsds: z.array(z.object({
        diskSizeGb: z.string().describe(
          "Specifies the size of the disk in base-2 GB.",
        ).optional(),
        interface: z.enum(["NVME", "SCSI"]).describe(
          "Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. The default isSCSI. For performance characteristics of SCSI over NVMe, seeLocal SSD performance.",
        ).optional(),
      })).describe(
        "Specifies amount of local ssd to reserve with each instance. The type of disk is local-ssd.",
      ).optional(),
      locationHint: z.string().describe(
        "An opaque location hint used to place the allocation close to other resources. This field is for use by internal tools that use the public API.",
      ).optional(),
      machineType: z.string().describe(
        "Specifies type of machine (name only) which has fixed number of vCPUs and fixed amount of memory. This also includes specifying custom machine type following custom-NUMBER_OF_CPUS-AMOUNT_OF_MEMORY pattern.",
      ).optional(),
      minCpuPlatform: z.string().describe(
        "Minimum cpu platform the reservation.",
      ).optional(),
    }).describe("Properties of the SKU instances being reserved. Next ID: 10")
      .optional(),
    sourceInstanceTemplate: z.string().describe(
      "Specifies the instance template to create the reservation. If you use this field, you must exclude the instanceProperties field. This field is optional, and it can be a full or partial URL. For example, the following are all valid URLs to an instance template: - https://www.googleapis.com/compute/v1/projects/project/global/instanceTemplates/instanceTemplate - projects/project/global/instanceTemplates/instanceTemplate - global/instanceTemplates/instanceTemplate",
    ).optional(),
  }).describe(
    "This reservation type allows to pre allocate specific instance configuration.",
  ).optional(),
  specificReservationRequired: z.boolean().describe(
    'Indicates whether the reservation can be consumed by VMs with affinity for "any" reservation. If the field is set, then only VMs that target the reservation by name can consume from this reservation.',
  ).optional(),
  zone: z.string().describe(
    "Zone in which the reservation resides. A zone must be provided if the reservation is created within a commitment.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  advancedDeploymentControl: z.object({
    reservationOperationalMode: z.string(),
  }).optional(),
  aggregateReservation: z.object({
    inUseResources: z.array(z.object({
      accelerator: z.object({
        acceleratorCount: z.number(),
        acceleratorType: z.string(),
      }),
    })),
    reservedResources: z.array(z.object({
      accelerator: z.object({
        acceleratorCount: z.number(),
        acceleratorType: z.string(),
      }),
    })),
    vmFamily: z.string(),
    workloadType: z.string(),
  }).optional(),
  commitment: z.string().optional(),
  confidentialComputeType: z.string().optional(),
  creationTimestamp: z.string().optional(),
  deleteAfterDuration: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  deleteAtTime: z.string().optional(),
  deploymentType: z.string().optional(),
  description: z.string().optional(),
  earlyAccessMaintenance: z.string().optional(),
  enableEmergentMaintenance: z.boolean().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  linkedCommitments: z.array(z.string()).optional(),
  name: z.string(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  protectionTier: z.string().optional(),
  reservationSharingPolicy: z.object({
    serviceShareType: z.string(),
  }).optional(),
  resourcePolicies: z.record(z.string(), z.unknown()).optional(),
  resourceStatus: z.object({
    healthInfo: z.object({
      degradedBlockCount: z.number(),
      healthStatus: z.string(),
      healthyBlockCount: z.number(),
    }),
    reservationBlockCount: z.number(),
    reservationMaintenance: z.object({
      instanceMaintenanceOngoingCount: z.number(),
      instanceMaintenancePendingCount: z.number(),
      maintenanceOngoingCount: z.number(),
      maintenancePendingCount: z.number(),
      schedulingType: z.string(),
      subblockInfraMaintenanceOngoingCount: z.number(),
      subblockInfraMaintenancePendingCount: z.number(),
      upcomingGroupMaintenance: z.object({
        canReschedule: z.boolean(),
        latestWindowStartTime: z.string(),
        maintenanceOnShutdown: z.boolean(),
        maintenanceReasons: z.array(z.string()),
        maintenanceStatus: z.string(),
        type: z.string(),
        windowEndTime: z.string(),
        windowStartTime: z.string(),
      }),
    }),
    specificSkuAllocation: z.object({
      sourceInstanceTemplateId: z.string(),
      utilizations: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  satisfiesPzs: z.boolean().optional(),
  schedulingType: z.string().optional(),
  selfLink: z.string().optional(),
  shareSettings: z.object({
    projectMap: z.record(z.string(), z.unknown()),
    shareType: z.string(),
  }).optional(),
  specificReservation: z.object({
    assuredCount: z.string(),
    count: z.string(),
    inUseCount: z.string(),
    instanceProperties: z.object({
      guestAccelerators: z.array(z.object({
        acceleratorCount: z.number(),
        acceleratorType: z.string(),
      })),
      localSsds: z.array(z.object({
        diskSizeGb: z.string(),
        interface: z.string(),
      })),
      locationHint: z.string(),
      machineType: z.string(),
      minCpuPlatform: z.string(),
    }),
    sourceInstanceTemplate: z.string(),
  }).optional(),
  specificReservationRequired: z.boolean().optional(),
  status: z.string().optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  advancedDeploymentControl: z.object({
    reservationOperationalMode: z.enum([
      "ALL_CAPACITY",
      "HIGHLY_AVAILABLE_CAPACITY",
      "RESERVATION_OPERATIONAL_MODE_UNSPECIFIED",
    ]).describe(
      "Indicates chosen reservation operational mode for the reservation.",
    ).optional(),
  }).describe(
    "Advance control for cluster management, applicable only to DENSE deployment type reservations.",
  ).optional(),
  aggregateReservation: z.object({
    inUseResources: z.array(z.object({
      accelerator: z.object({
        acceleratorCount: z.number().int().describe(
          "Number of accelerators of specified type.",
        ).optional(),
        acceleratorType: z.string().describe(
          'Full or partial URL to accelerator type. e.g. "projects/{PROJECT}/zones/{ZONE}/acceleratorTypes/ct4l"',
        ).optional(),
      }).optional(),
    })).describe(
      "Output only. [Output only] List of resources currently in use.",
    ).optional(),
    reservedResources: z.array(z.object({
      accelerator: z.object({
        acceleratorCount: z.number().int().describe(
          "Number of accelerators of specified type.",
        ).optional(),
        acceleratorType: z.string().describe(
          'Full or partial URL to accelerator type. e.g. "projects/{PROJECT}/zones/{ZONE}/acceleratorTypes/ct4l"',
        ).optional(),
      }).optional(),
    })).describe("List of reserved resources (CPUs, memory, accelerators).")
      .optional(),
    vmFamily: z.enum([
      "VM_FAMILY_CLOUD_TPU_DEVICE_CT3",
      "VM_FAMILY_CLOUD_TPU_LITE_DEVICE_CT5L",
      "VM_FAMILY_CLOUD_TPU_LITE_POD_SLICE_CT5LP",
      "VM_FAMILY_CLOUD_TPU_LITE_POD_SLICE_CT6E",
      "VM_FAMILY_CLOUD_TPU_POD_SLICE_CT3P",
      "VM_FAMILY_CLOUD_TPU_POD_SLICE_CT4P",
      "VM_FAMILY_CLOUD_TPU_POD_SLICE_CT5P",
      "VM_FAMILY_CLOUD_TPU_POD_SLICE_TPU7X",
    ]).describe(
      "The VM family that all instances scheduled against this reservation must belong to.",
    ).optional(),
    workloadType: z.enum(["BATCH", "SERVING", "UNSPECIFIED"]).describe(
      "The workload type of the instances that will target this reservation.",
    ).optional(),
  }).describe(
    "This reservation type is specified by total resource amounts (e.g. total count of CPUs) and can account for multiple instance SKUs. In other words, one can create instances of varying shapes against this reservation.",
  ).optional(),
  confidentialComputeType: z.enum([
    "CONFIDENTIAL_COMPUTE_TYPE_TDX",
    "CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED",
  ]).optional(),
  deleteAfterDuration: z.object({
    nanos: z.number().int().describe(
      "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
  ).optional(),
  deleteAtTime: z.string().describe(
    "Absolute time in future when the reservation will be auto-deleted by Compute Engine. Timestamp is represented inRFC3339 text format.",
  ).optional(),
  deploymentType: z.enum(["DENSE", "DEPLOYMENT_TYPE_UNSPECIFIED"]).describe(
    "Specifies the deployment strategy for this reservation.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  earlyAccessMaintenance: z.enum(["NO_EARLY_ACCESS", "WAVE1", "WAVE2"])
    .describe(
      "Indicates the early access maintenance for the reservation. If this field is absent or set to NO_EARLY_ACCESS, the reservation is not enrolled in early access maintenance and the standard notice applies.",
    ).optional(),
  enableEmergentMaintenance: z.boolean().describe(
    "Indicates whether Compute Engine allows unplanned maintenance for your VMs; for example, to fix hardware errors.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the reservation. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional reservation params.").optional(),
  protectionTier: z.enum([
    "CAPACITY_OPTIMIZED",
    "PROTECTION_TIER_UNSPECIFIED",
    "STANDARD",
  ]).describe(
    "Protection tier for the workload which specifies the workload expectations in the event of infrastructure failures at data center (e.g. power and/or cooling failures).",
  ).optional(),
  reservationSharingPolicy: z.object({
    serviceShareType: z.enum([
      "ALLOW_ALL",
      "DISALLOW_ALL",
      "SERVICE_SHARE_TYPE_UNSPECIFIED",
    ]).describe("Sharing config for all Google Cloud services.").optional(),
  }).optional(),
  resourcePolicies: z.record(z.string(), z.string()).describe(
    "Resource policies to be added to this reservation. The key is defined by user, and the value is resource policy url. This is to define placement policy with reservation.",
  ).optional(),
  schedulingType: z.enum([
    "GROUPED",
    "GROUP_MAINTENANCE_TYPE_UNSPECIFIED",
    "INDEPENDENT",
  ]).describe("The type of maintenance for the reservation.").optional(),
  shareSettings: z.object({
    projectMap: z.record(
      z.string(),
      z.object({
        projectId: z.string().describe(
          "The project ID, should be same as the key of this project config in the parent map.",
        ).optional(),
      }),
    ).describe(
      "A map of project id and project config. This is only valid when share_type's value is SPECIFIC_PROJECTS.",
    ).optional(),
    shareType: z.enum([
      "LOCAL",
      "ORGANIZATION",
      "SHARE_TYPE_UNSPECIFIED",
      "SPECIFIC_PROJECTS",
    ]).describe("Type of sharing for this shared-reservation").optional(),
  }).describe(
    "The share setting for reservations and sole tenancy node groups.",
  ).optional(),
  specificReservation: z.object({
    assuredCount: z.string().describe(
      "Output only. [Output Only] Indicates how many instances are actually usable currently.",
    ).optional(),
    count: z.string().describe(
      "Specifies the number of resources that are allocated.",
    ).optional(),
    inUseCount: z.string().describe(
      "Output only. [Output Only] Indicates how many instances are in use.",
    ).optional(),
    instanceProperties: z.object({
      guestAccelerators: z.array(z.object({
        acceleratorCount: z.number().int().describe(
          "The number of the guest accelerator cards exposed to this instance.",
        ).optional(),
        acceleratorType: z.string().describe(
          "Full or partial URL of the accelerator type resource to attach to this instance. For example:projects/my-project/zones/us-central1-c/acceleratorTypes/nvidia-tesla-p100 If you are creating an instance template, specify only the accelerator name. See GPUs on Compute Engine for a full list of accelerator types.",
        ).optional(),
      })).describe("Specifies accelerator type and count.").optional(),
      localSsds: z.array(z.object({
        diskSizeGb: z.string().describe(
          "Specifies the size of the disk in base-2 GB.",
        ).optional(),
        interface: z.enum(["NVME", "SCSI"]).describe(
          "Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. The default isSCSI. For performance characteristics of SCSI over NVMe, seeLocal SSD performance.",
        ).optional(),
      })).describe(
        "Specifies amount of local ssd to reserve with each instance. The type of disk is local-ssd.",
      ).optional(),
      locationHint: z.string().describe(
        "An opaque location hint used to place the allocation close to other resources. This field is for use by internal tools that use the public API.",
      ).optional(),
      machineType: z.string().describe(
        "Specifies type of machine (name only) which has fixed number of vCPUs and fixed amount of memory. This also includes specifying custom machine type following custom-NUMBER_OF_CPUS-AMOUNT_OF_MEMORY pattern.",
      ).optional(),
      minCpuPlatform: z.string().describe(
        "Minimum cpu platform the reservation.",
      ).optional(),
    }).describe("Properties of the SKU instances being reserved. Next ID: 10")
      .optional(),
    sourceInstanceTemplate: z.string().describe(
      "Specifies the instance template to create the reservation. If you use this field, you must exclude the instanceProperties field. This field is optional, and it can be a full or partial URL. For example, the following are all valid URLs to an instance template: - https://www.googleapis.com/compute/v1/projects/project/global/instanceTemplates/instanceTemplate - projects/project/global/instanceTemplates/instanceTemplate - global/instanceTemplates/instanceTemplate",
    ).optional(),
  }).describe(
    "This reservation type allows to pre allocate specific instance configuration.",
  ).optional(),
  specificReservationRequired: z.boolean().describe(
    'Indicates whether the reservation can be consumed by VMs with affinity for "any" reservation. If the field is set, then only VMs that target the reservation by name can consume from this reservation.',
  ).optional(),
  zone: z.string().describe(
    "Zone in which the reservation resides. A zone must be provided if the reservation is created within a commitment.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine Reservations. Registered at `@swamp/gcp/compute/reservations`. */
export const model = {
  type: "@swamp/gcp/compute/reservations",
  version: "2026.05.18.2",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "Removed: confidentialComputeType",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { confidentialComputeType: _confidentialComputeType, ...rest } =
          old;
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
      description: "Added: confidentialComputeType",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.2",
      description: "Removed: confidentialComputeType",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { confidentialComputeType: _confidentialComputeType, ...rest } =
          old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.07.1",
      description: "Added: confidentialComputeType",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: confidentialComputeType",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { confidentialComputeType: _confidentialComputeType, ...rest } =
          old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: confidentialComputeType",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a reservation resource. A reservation ensures that capacity is hel...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a reservations",
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
        if (g["advancedDeploymentControl"] !== undefined) {
          body["advancedDeploymentControl"] = g["advancedDeploymentControl"];
        }
        if (g["aggregateReservation"] !== undefined) {
          body["aggregateReservation"] = g["aggregateReservation"];
        }
        if (g["confidentialComputeType"] !== undefined) {
          body["confidentialComputeType"] = g["confidentialComputeType"];
        }
        if (g["deleteAfterDuration"] !== undefined) {
          body["deleteAfterDuration"] = g["deleteAfterDuration"];
        }
        if (g["deleteAtTime"] !== undefined) {
          body["deleteAtTime"] = g["deleteAtTime"];
        }
        if (g["deploymentType"] !== undefined) {
          body["deploymentType"] = g["deploymentType"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["earlyAccessMaintenance"] !== undefined) {
          body["earlyAccessMaintenance"] = g["earlyAccessMaintenance"];
        }
        if (g["enableEmergentMaintenance"] !== undefined) {
          body["enableEmergentMaintenance"] = g["enableEmergentMaintenance"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["protectionTier"] !== undefined) {
          body["protectionTier"] = g["protectionTier"];
        }
        if (g["reservationSharingPolicy"] !== undefined) {
          body["reservationSharingPolicy"] = g["reservationSharingPolicy"];
        }
        if (g["resourcePolicies"] !== undefined) {
          body["resourcePolicies"] = g["resourcePolicies"];
        }
        if (g["schedulingType"] !== undefined) {
          body["schedulingType"] = g["schedulingType"];
        }
        if (g["shareSettings"] !== undefined) {
          body["shareSettings"] = g["shareSettings"];
        }
        if (g["specificReservation"] !== undefined) {
          body["specificReservation"] = g["specificReservation"];
        }
        if (g["specificReservationRequired"] !== undefined) {
          body["specificReservationRequired"] =
            g["specificReservationRequired"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["reservation"] = String(g["name"]);
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
              "failedValues": [],
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
      description: "Get a reservations",
      arguments: z.object({
        identifier: z.string().describe("The name of the reservations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["reservation"] = args.identifier;
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
      description: "Update reservations attributes",
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
        params["reservation"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["advancedDeploymentControl"] !== undefined) {
          body["advancedDeploymentControl"] = g["advancedDeploymentControl"];
        }
        if (g["aggregateReservation"] !== undefined) {
          body["aggregateReservation"] = g["aggregateReservation"];
        }
        if (g["confidentialComputeType"] !== undefined) {
          body["confidentialComputeType"] = g["confidentialComputeType"];
        }
        if (g["deleteAfterDuration"] !== undefined) {
          body["deleteAfterDuration"] = g["deleteAfterDuration"];
        }
        if (g["deleteAtTime"] !== undefined) {
          body["deleteAtTime"] = g["deleteAtTime"];
        }
        if (g["deploymentType"] !== undefined) {
          body["deploymentType"] = g["deploymentType"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["earlyAccessMaintenance"] !== undefined) {
          body["earlyAccessMaintenance"] = g["earlyAccessMaintenance"];
        }
        if (g["enableEmergentMaintenance"] !== undefined) {
          body["enableEmergentMaintenance"] = g["enableEmergentMaintenance"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["protectionTier"] !== undefined) {
          body["protectionTier"] = g["protectionTier"];
        }
        if (g["reservationSharingPolicy"] !== undefined) {
          body["reservationSharingPolicy"] = g["reservationSharingPolicy"];
        }
        if (g["resourcePolicies"] !== undefined) {
          body["resourcePolicies"] = g["resourcePolicies"];
        }
        if (g["schedulingType"] !== undefined) {
          body["schedulingType"] = g["schedulingType"];
        }
        if (g["shareSettings"] !== undefined) {
          body["shareSettings"] = g["shareSettings"];
        }
        if (g["specificReservation"] !== undefined) {
          body["specificReservation"] = g["specificReservation"];
        }
        if (g["specificReservationRequired"] !== undefined) {
          body["specificReservationRequired"] =
            g["specificReservationRequired"];
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
              "readyValues": ["READY"],
              "failedValues": [],
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
      description: "Delete the reservations",
      arguments: z.object({
        identifier: z.string().describe("The name of the reservations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["reservation"] = args.identifier;
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
      description: "Sync reservations state from GCP",
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
          params["reservation"] = identifier;
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
    perform_maintenance: {
      description: "perform maintenance",
      arguments: z.object({
        maintenanceScope: z.any().optional(),
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
        params["reservation"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["maintenanceScope"] !== undefined) {
          body["maintenanceScope"] = args["maintenanceScope"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.reservations.performMaintenance",
            "path":
              "projects/{project}/zones/{zone}/reservations/{reservation}/performMaintenance",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "reservation"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "reservation": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    resize: {
      description: "resize",
      arguments: z.object({
        specificSkuCount: z.any().optional(),
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
        params["reservation"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["specificSkuCount"] !== undefined) {
          body["specificSkuCount"] = args["specificSkuCount"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.reservations.resize",
            "path":
              "projects/{project}/zones/{zone}/reservations/{reservation}/resize",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "reservation"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "reservation": { "location": "path", "required": true },
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
