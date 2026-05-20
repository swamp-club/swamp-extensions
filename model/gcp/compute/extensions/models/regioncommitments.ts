// Auto-generated extension model for @swamp/gcp/compute/regioncommitments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine RegionCommitments.
 *
 * Represents a regional resource-based commitment resource. Creating this commitment resource means that you are purchasing a resource-based committed use contract, with an explicit start and end time. You can purchase resource-based commitments for both hardware and software resources. For more information, read Resource-based committed use discounts
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.regionCommitments.get",
  "path": "projects/{project}/regions/{region}/commitments/{commitment}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "commitment",
  ],
  "parameters": {
    "commitment": {
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
  "id": "compute.regionCommitments.insert",
  "path": "projects/{project}/regions/{region}/commitments",
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
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.regionCommitments.update",
  "path": "projects/{project}/regions/{region}/commitments/{commitment}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "commitment",
  ],
  "parameters": {
    "commitment": {
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

const GlobalArgsSchema = z.object({
  autoRenew: z.boolean().describe(
    "Specifies whether to automatically renew the commitment at the end of its current term. The default value is false. If you set the field to true, each time your commitment reaches the end of its term, Compute Engine automatically renews it for another term. You can update this field anytime before the commitment expires. For example, if the commitment is set to expire at 12 AM UTC-8 on January 3, 2027, you can update this field until 11:59 PM UTC-8 on January 2, 2027.",
  ).optional(),
  category: z.enum(["CATEGORY_UNSPECIFIED", "LICENSE", "MACHINE"]).describe(
    "The category of the commitment; specifies whether the commitment is for hardware or software resources. Category MACHINE specifies that you are committing to hardware machine resources such asVCPU or MEMORY, listed in resources. Category LICENSE specifies that you are committing to software licenses, listed in licenseResources. Note that if you specify MACHINE commitments, then you must also specify a type to indicate the machine series of the hardware resource that you are committing to.",
  ).optional(),
  customEndTimestamp: z.string().describe(
    "[Input Only] Optional, specifies the requested commitment end time inRFC3339 text format. Use this option when the desired commitment's end date is later than the start date + term duration.",
  ).optional(),
  description: z.string().describe(
    "An optional description of the commitment. You can provide this property when you create the resource.",
  ).optional(),
  existingReservations: z.array(z.string()).optional(),
  licenseResource: z.object({
    amount: z.string().describe("The number of licenses you plan to purchase.")
      .optional(),
    coresPerLicense: z.string().describe("The number of cores per license.")
      .optional(),
    license: z.string().describe("The applicable license URI.").optional(),
  }).describe("Commitment for a particular license resource.").optional(),
  mergeSourceCommitments: z.array(z.string()).describe(
    "The list of source commitments that you are merging to create the new merged commitment. For more information, see Merging commitments.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the commitment. You must specify a name when you purchase the commitment. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the commitment. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional commitment params.").optional(),
  plan: z.enum(["INVALID", "THIRTY_SIX_MONTH", "TWELVE_MONTH"]).describe(
    "The minimum time duration that you commit to purchasing resources. The plan that you choose determines the preset term length of the commitment (which is 1 year or 3 years) and affects the discount rate that you receive for your resources. Committing to a longer time duration typically gives you a higher discount rate. The supported values for this field are TWELVE_MONTH (1 year), andTHIRTY_SIX_MONTH (3 years).",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the commitment and committed resources are located.",
  ).optional(),
  reservations: z.array(z.object({
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
        accelerator: z.unknown().optional(),
      })).describe(
        "Output only. [Output only] List of resources currently in use.",
      ).optional(),
      reservedResources: z.array(z.object({
        accelerator: z.unknown().optional(),
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
    commitment: z.string().describe(
      "Output only. [Output Only] Full or partial URL to a parent commitment. This field displays for reservations that are tied to a commitment.",
    ).optional(),
    confidentialComputeType: z.enum([
      "CONFIDENTIAL_COMPUTE_TYPE_TDX",
      "CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED",
    ]).optional(),
    creationTimestamp: z.string().describe(
      "Output only. [Output Only] Creation timestamp inRFC3339 text format.",
    ).optional(),
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
    id: z.string().describe(
      "Output only. [Output Only] The unique identifier for the resource. This identifier is defined by the server.",
    ).optional(),
    kind: z.string().describe(
      "Output only. [Output Only] Type of the resource. Alwayscompute#reservations for reservations.",
    ).optional(),
    linkedCommitments: z.array(z.string()).describe(
      "Output only. [Output Only] Full or partial URL to parent commitments. This field displays for reservations that are tied to multiple commitments.",
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
    resourceStatus: z.object({
      healthInfo: z.object({
        degradedBlockCount: z.number().int().describe(
          "The number of reservation blocks that are degraded.",
        ).optional(),
        healthStatus: z.enum([
          "DEGRADED",
          "HEALTHY",
          "HEALTH_STATUS_UNSPECIFIED",
        ]).describe("The health status of the reservation.").optional(),
        healthyBlockCount: z.number().int().describe(
          "The number of reservation blocks that are healthy.",
        ).optional(),
      }).describe("Health information for the reservation.").optional(),
      reservationBlockCount: z.number().int().describe(
        "The number of reservation blocks associated with this reservation.",
      ).optional(),
      reservationMaintenance: z.object({
        instanceMaintenanceOngoingCount: z.number().int().describe(
          "Describes number of instances that have ongoing maintenance.",
        ).optional(),
        instanceMaintenancePendingCount: z.number().int().describe(
          "Describes number of instances that have pending maintenance.",
        ).optional(),
        maintenanceOngoingCount: z.number().int().describe(
          "Progress for ongoing maintenance for this group of VMs/hosts. Describes number of hosts in the block that have ongoing maintenance.",
        ).optional(),
        maintenancePendingCount: z.number().int().describe(
          "Progress for ongoing maintenance for this group of VMs/hosts. Describes number of hosts in the block that have pending maintenance.",
        ).optional(),
        schedulingType: z.enum([
          "GROUPED",
          "GROUP_MAINTENANCE_TYPE_UNSPECIFIED",
          "INDEPENDENT",
        ]).describe("The type of maintenance for the reservation.").optional(),
        subblockInfraMaintenanceOngoingCount: z.number().int().describe(
          "Describes number of subblock Infrastructure that has ongoing maintenance. Here, Subblock Infrastructure Maintenance pertains to upstream hardware contained in the Subblock that is necessary for a VM Family(e.g. NVLink Domains). Not all VM Families will support this field.",
        ).optional(),
        subblockInfraMaintenancePendingCount: z.number().int().describe(
          "Describes number of subblock Infrastructure that has pending maintenance. Here, Subblock Infrastructure Maintenance pertains to upstream hardware contained in the Subblock that is necessary for a VM Family (e.g. NVLink Domains). Not all VM Families will support this field.",
        ).optional(),
        upcomingGroupMaintenance: z.object({
          canReschedule: z.unknown().describe(
            "Indicates if the maintenance can be customer triggered.",
          ).optional(),
          latestWindowStartTime: z.unknown().describe(
            "The latest time for the planned maintenance window to start. This timestamp value is in RFC3339 text format.",
          ).optional(),
          maintenanceOnShutdown: z.unknown().describe(
            "Indicates whether the UpcomingMaintenance will be triggered on VM shutdown.",
          ).optional(),
          maintenanceReasons: z.unknown().describe(
            "The reasons for the maintenance. Only valid for vms.",
          ).optional(),
          maintenanceStatus: z.unknown().optional(),
          type: z.unknown().describe("Defines the type of maintenance.")
            .optional(),
          windowEndTime: z.unknown().describe(
            "The time by which the maintenance disruption will be completed. This timestamp value is in RFC3339 text format.",
          ).optional(),
          windowStartTime: z.unknown().describe(
            "The current start time of the maintenance window. This timestamp value is in RFC3339 text format.",
          ).optional(),
        }).describe("Upcoming Maintenance notification information.")
          .optional(),
      }).describe("Maintenance Info for ReservationBlocks.").optional(),
      specificSkuAllocation: z.object({
        sourceInstanceTemplateId: z.string().describe(
          "ID of the instance template used to populate reservation properties.",
        ).optional(),
        utilizations: z.record(z.string(), z.unknown()).describe(
          "Per service utilization breakdown. The Key is the Google Cloud managed service name.",
        ).optional(),
      }).describe("Contains Properties set for the reservation.").optional(),
    }).describe("[Output Only] Contains output only fields.").optional(),
    satisfiesPzs: z.boolean().describe(
      "Output only. [Output Only] Reserved for future use.",
    ).optional(),
    schedulingType: z.enum([
      "GROUPED",
      "GROUP_MAINTENANCE_TYPE_UNSPECIFIED",
      "INDEPENDENT",
    ]).describe("The type of maintenance for the reservation.").optional(),
    selfLink: z.string().describe(
      "Output only. [Output Only] Server-defined fully-qualified URL for this resource.",
    ).optional(),
    shareSettings: z.object({
      projectMap: z.record(
        z.string(),
        z.object({
          projectId: z.unknown().describe(
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
        guestAccelerators: z.array(z.unknown()).describe(
          "Specifies accelerator type and count.",
        ).optional(),
        localSsds: z.array(z.unknown()).describe(
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
    status: z.enum(["CREATING", "DELETING", "INVALID", "READY", "UPDATING"])
      .describe(
        "Output only. [Output Only] The status of the reservation. - CREATING: Reservation resources are being allocated. - READY: Reservation resources have been allocated, and the reservation is ready for use. - DELETING: Reservation deletion is in progress. - UPDATING: Reservation update is in progress.",
      ).optional(),
    zone: z.string().describe(
      "Zone in which the reservation resides. A zone must be provided if the reservation is created within a commitment.",
    ).optional(),
  })).describe(
    "The list of new reservations that you want to create and attach to this commitment. You must attach reservations to your commitment if your commitment specifies any GPUs or Local SSD disks. For more information, see Attach reservations to resource-based commitments. Specify this property only if you want to create new reservations to attach. To attach existing reservations, specify theexistingReservations property instead.",
  ).optional(),
  resources: z.array(z.object({
    acceleratorType: z.string().describe(
      "Name of the accelerator type or GPU resource. Specify this field only when the type of hardware resource is ACCELERATOR.",
    ).optional(),
    amount: z.string().describe(
      "The quantity of the hardware resource that you want to commit to purchasing (in a type-dependent unit). - For vCPUs, you must specify an integer value. - For memory, you specify the amount of MB that you want. The value you specify must be a multiple of 256 MB, with up to 6.5 GB of memory per every vCPU. - For GPUs, you must specify an integer value. - For Local SSD disks, you must specify the amount in GB. The size of a single Local SSD disk is 375 GB.",
    ).optional(),
    type: z.enum(["ACCELERATOR", "LOCAL_SSD", "MEMORY", "UNSPECIFIED", "VCPU"])
      .describe(
        "The type of hardware resource that you want to specify. You can specify any of the following values: - VCPU - MEMORY - LOCAL_SSD - ACCELERATOR Specify as a separate entry in the list for each individual resource type.",
      ).optional(),
  })).describe(
    "The list of all the hardware resources, with their types and amounts, that you want to commit to. Specify as a separate entry in the list for each individual resource type.",
  ).optional(),
  splitSourceCommitment: z.string().describe(
    "The source commitment from which you are transferring resources to create the new split commitment. For more information, see Split commitments.",
  ).optional(),
  type: z.enum([
    "ACCELERATOR_OPTIMIZED",
    "ACCELERATOR_OPTIMIZED_A3",
    "ACCELERATOR_OPTIMIZED_A3_MEGA",
    "ACCELERATOR_OPTIMIZED_A3_ULTRA",
    "ACCELERATOR_OPTIMIZED_A4",
    "COMPUTE_OPTIMIZED",
    "COMPUTE_OPTIMIZED_C2D",
    "COMPUTE_OPTIMIZED_C3",
    "COMPUTE_OPTIMIZED_C3D",
    "COMPUTE_OPTIMIZED_H3",
    "COMPUTE_OPTIMIZED_H4D",
    "GENERAL_PURPOSE",
    "GENERAL_PURPOSE_C4",
    "GENERAL_PURPOSE_C4A",
    "GENERAL_PURPOSE_C4D",
    "GENERAL_PURPOSE_E2",
    "GENERAL_PURPOSE_N2",
    "GENERAL_PURPOSE_N2D",
    "GENERAL_PURPOSE_N4",
    "GENERAL_PURPOSE_N4A",
    "GENERAL_PURPOSE_N4D",
    "GENERAL_PURPOSE_T2D",
    "GRAPHICS_OPTIMIZED",
    "GRAPHICS_OPTIMIZED_G4",
    "GRAPHICS_OPTIMIZED_G4_VGPU",
    "MEMORY_OPTIMIZED",
    "MEMORY_OPTIMIZED_M3",
    "MEMORY_OPTIMIZED_M4",
    "MEMORY_OPTIMIZED_M4_6TB",
    "MEMORY_OPTIMIZED_X4_1440_24T",
    "MEMORY_OPTIMIZED_X4_16TB",
    "MEMORY_OPTIMIZED_X4_1920_32T",
    "MEMORY_OPTIMIZED_X4_24TB",
    "MEMORY_OPTIMIZED_X4_32TB",
    "MEMORY_OPTIMIZED_X4_480_6T",
    "MEMORY_OPTIMIZED_X4_480_8T",
    "MEMORY_OPTIMIZED_X4_960_12T",
    "MEMORY_OPTIMIZED_X4_960_16T",
    "STORAGE_OPTIMIZED_Z3",
    "TYPE_UNSPECIFIED",
  ]).describe(
    "The type of commitment; specifies the machine series for which you want to commit to purchasing resources. The choice of machine series affects the discount rate and the eligible resource types. The type must be one of the following:ACCELERATOR_OPTIMIZED, ACCELERATOR_OPTIMIZED_A3,ACCELERATOR_OPTIMIZED_A3_MEGA,COMPUTE_OPTIMIZED, COMPUTE_OPTIMIZED_C2D, COMPUTE_OPTIMIZED_C3, COMPUTE_OPTIMIZED_C3D,COMPUTE_OPTIMIZED_H3, GENERAL_PURPOSE,GENERAL_PURPOSE_C4, GENERAL_PURPOSE_E2,GENERAL_PURPOSE_N2, GENERAL_PURPOSE_N2D,GENERAL_PURPOSE_N4, GENERAL_PURPOSE_T2D,GRAPHICS_OPTIMIZED, GRAPHICS_OPTIMIZED_G4,GRAPHICS_OPTIMIZED_G4_VGPU,MEMORY_OPTIMIZED, MEMORY_OPTIMIZED_M3,MEMORY_OPTIMIZED_X4, STORAGE_OPTIMIZED_Z3. For example, type MEMORY_OPTIMIZED specifies a commitment that applies only to eligible resources of memory optimized M1 and M2 machine series. Type GENERAL_PURPOSE specifies a commitment that applies only to eligible resources of general purpose N1 machine series.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  autoRenew: z.boolean().optional(),
  category: z.string().optional(),
  creationTimestamp: z.string().optional(),
  customEndTimestamp: z.string().optional(),
  description: z.string().optional(),
  endTimestamp: z.string().optional(),
  existingReservations: z.array(z.string()).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  licenseResource: z.object({
    amount: z.string(),
    coresPerLicense: z.string(),
    license: z.string(),
  }).optional(),
  mergeSourceCommitments: z.array(z.string()).optional(),
  name: z.string(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  plan: z.string().optional(),
  region: z.string().optional(),
  reservations: z.array(z.object({
    advancedDeploymentControl: z.object({
      reservationOperationalMode: z.string(),
    }),
    aggregateReservation: z.object({
      inUseResources: z.array(z.object({
        accelerator: z.unknown(),
      })),
      reservedResources: z.array(z.object({
        accelerator: z.unknown(),
      })),
      vmFamily: z.string(),
      workloadType: z.string(),
    }),
    commitment: z.string(),
    confidentialComputeType: z.string(),
    creationTimestamp: z.string(),
    deleteAfterDuration: z.object({
      nanos: z.number(),
      seconds: z.string(),
    }),
    deleteAtTime: z.string(),
    deploymentType: z.string(),
    description: z.string(),
    earlyAccessMaintenance: z.string(),
    enableEmergentMaintenance: z.boolean(),
    id: z.string(),
    kind: z.string(),
    linkedCommitments: z.array(z.string()),
    name: z.string(),
    params: z.object({
      resourceManagerTags: z.record(z.string(), z.unknown()),
    }),
    protectionTier: z.string(),
    reservationSharingPolicy: z.object({
      serviceShareType: z.string(),
    }),
    resourcePolicies: z.record(z.string(), z.unknown()),
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
          canReschedule: z.unknown(),
          latestWindowStartTime: z.unknown(),
          maintenanceOnShutdown: z.unknown(),
          maintenanceReasons: z.unknown(),
          maintenanceStatus: z.unknown(),
          type: z.unknown(),
          windowEndTime: z.unknown(),
          windowStartTime: z.unknown(),
        }),
      }),
      specificSkuAllocation: z.object({
        sourceInstanceTemplateId: z.string(),
        utilizations: z.record(z.string(), z.unknown()),
      }),
    }),
    satisfiesPzs: z.boolean(),
    schedulingType: z.string(),
    selfLink: z.string(),
    shareSettings: z.object({
      projectMap: z.record(z.string(), z.unknown()),
      shareType: z.string(),
    }),
    specificReservation: z.object({
      assuredCount: z.string(),
      count: z.string(),
      inUseCount: z.string(),
      instanceProperties: z.object({
        guestAccelerators: z.array(z.unknown()),
        localSsds: z.array(z.unknown()),
        locationHint: z.string(),
        machineType: z.string(),
        minCpuPlatform: z.string(),
      }),
      sourceInstanceTemplate: z.string(),
    }),
    specificReservationRequired: z.boolean(),
    status: z.string(),
    zone: z.string(),
  })).optional(),
  resourceStatus: z.object({
    customTermEligibilityEndTimestamp: z.string(),
  }).optional(),
  resources: z.array(z.object({
    acceleratorType: z.string(),
    amount: z.string(),
    type: z.string(),
  })).optional(),
  selfLink: z.string().optional(),
  splitSourceCommitment: z.string().optional(),
  startTimestamp: z.string().optional(),
  status: z.string().optional(),
  statusMessage: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  autoRenew: z.boolean().describe(
    "Specifies whether to automatically renew the commitment at the end of its current term. The default value is false. If you set the field to true, each time your commitment reaches the end of its term, Compute Engine automatically renews it for another term. You can update this field anytime before the commitment expires. For example, if the commitment is set to expire at 12 AM UTC-8 on January 3, 2027, you can update this field until 11:59 PM UTC-8 on January 2, 2027.",
  ).optional(),
  category: z.enum(["CATEGORY_UNSPECIFIED", "LICENSE", "MACHINE"]).describe(
    "The category of the commitment; specifies whether the commitment is for hardware or software resources. Category MACHINE specifies that you are committing to hardware machine resources such asVCPU or MEMORY, listed in resources. Category LICENSE specifies that you are committing to software licenses, listed in licenseResources. Note that if you specify MACHINE commitments, then you must also specify a type to indicate the machine series of the hardware resource that you are committing to.",
  ).optional(),
  customEndTimestamp: z.string().describe(
    "[Input Only] Optional, specifies the requested commitment end time inRFC3339 text format. Use this option when the desired commitment's end date is later than the start date + term duration.",
  ).optional(),
  description: z.string().describe(
    "An optional description of the commitment. You can provide this property when you create the resource.",
  ).optional(),
  existingReservations: z.array(z.string()).optional(),
  licenseResource: z.object({
    amount: z.string().describe("The number of licenses you plan to purchase.")
      .optional(),
    coresPerLicense: z.string().describe("The number of cores per license.")
      .optional(),
    license: z.string().describe("The applicable license URI.").optional(),
  }).describe("Commitment for a particular license resource.").optional(),
  mergeSourceCommitments: z.array(z.string()).describe(
    "The list of source commitments that you are merging to create the new merged commitment. For more information, see Merging commitments.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the commitment. You must specify a name when you purchase the commitment. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the commitment. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional commitment params.").optional(),
  plan: z.enum(["INVALID", "THIRTY_SIX_MONTH", "TWELVE_MONTH"]).describe(
    "The minimum time duration that you commit to purchasing resources. The plan that you choose determines the preset term length of the commitment (which is 1 year or 3 years) and affects the discount rate that you receive for your resources. Committing to a longer time duration typically gives you a higher discount rate. The supported values for this field are TWELVE_MONTH (1 year), andTHIRTY_SIX_MONTH (3 years).",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the commitment and committed resources are located.",
  ).optional(),
  reservations: z.array(z.object({
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
        accelerator: z.unknown().optional(),
      })).describe(
        "Output only. [Output only] List of resources currently in use.",
      ).optional(),
      reservedResources: z.array(z.object({
        accelerator: z.unknown().optional(),
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
    commitment: z.string().describe(
      "Output only. [Output Only] Full or partial URL to a parent commitment. This field displays for reservations that are tied to a commitment.",
    ).optional(),
    confidentialComputeType: z.enum([
      "CONFIDENTIAL_COMPUTE_TYPE_TDX",
      "CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED",
    ]).optional(),
    creationTimestamp: z.string().describe(
      "Output only. [Output Only] Creation timestamp inRFC3339 text format.",
    ).optional(),
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
    id: z.string().describe(
      "Output only. [Output Only] The unique identifier for the resource. This identifier is defined by the server.",
    ).optional(),
    kind: z.string().describe(
      "Output only. [Output Only] Type of the resource. Alwayscompute#reservations for reservations.",
    ).optional(),
    linkedCommitments: z.array(z.string()).describe(
      "Output only. [Output Only] Full or partial URL to parent commitments. This field displays for reservations that are tied to multiple commitments.",
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
    resourceStatus: z.object({
      healthInfo: z.object({
        degradedBlockCount: z.number().int().describe(
          "The number of reservation blocks that are degraded.",
        ).optional(),
        healthStatus: z.enum([
          "DEGRADED",
          "HEALTHY",
          "HEALTH_STATUS_UNSPECIFIED",
        ]).describe("The health status of the reservation.").optional(),
        healthyBlockCount: z.number().int().describe(
          "The number of reservation blocks that are healthy.",
        ).optional(),
      }).describe("Health information for the reservation.").optional(),
      reservationBlockCount: z.number().int().describe(
        "The number of reservation blocks associated with this reservation.",
      ).optional(),
      reservationMaintenance: z.object({
        instanceMaintenanceOngoingCount: z.number().int().describe(
          "Describes number of instances that have ongoing maintenance.",
        ).optional(),
        instanceMaintenancePendingCount: z.number().int().describe(
          "Describes number of instances that have pending maintenance.",
        ).optional(),
        maintenanceOngoingCount: z.number().int().describe(
          "Progress for ongoing maintenance for this group of VMs/hosts. Describes number of hosts in the block that have ongoing maintenance.",
        ).optional(),
        maintenancePendingCount: z.number().int().describe(
          "Progress for ongoing maintenance for this group of VMs/hosts. Describes number of hosts in the block that have pending maintenance.",
        ).optional(),
        schedulingType: z.enum([
          "GROUPED",
          "GROUP_MAINTENANCE_TYPE_UNSPECIFIED",
          "INDEPENDENT",
        ]).describe("The type of maintenance for the reservation.").optional(),
        subblockInfraMaintenanceOngoingCount: z.number().int().describe(
          "Describes number of subblock Infrastructure that has ongoing maintenance. Here, Subblock Infrastructure Maintenance pertains to upstream hardware contained in the Subblock that is necessary for a VM Family(e.g. NVLink Domains). Not all VM Families will support this field.",
        ).optional(),
        subblockInfraMaintenancePendingCount: z.number().int().describe(
          "Describes number of subblock Infrastructure that has pending maintenance. Here, Subblock Infrastructure Maintenance pertains to upstream hardware contained in the Subblock that is necessary for a VM Family (e.g. NVLink Domains). Not all VM Families will support this field.",
        ).optional(),
        upcomingGroupMaintenance: z.object({
          canReschedule: z.unknown().describe(
            "Indicates if the maintenance can be customer triggered.",
          ).optional(),
          latestWindowStartTime: z.unknown().describe(
            "The latest time for the planned maintenance window to start. This timestamp value is in RFC3339 text format.",
          ).optional(),
          maintenanceOnShutdown: z.unknown().describe(
            "Indicates whether the UpcomingMaintenance will be triggered on VM shutdown.",
          ).optional(),
          maintenanceReasons: z.unknown().describe(
            "The reasons for the maintenance. Only valid for vms.",
          ).optional(),
          maintenanceStatus: z.unknown().optional(),
          type: z.unknown().describe("Defines the type of maintenance.")
            .optional(),
          windowEndTime: z.unknown().describe(
            "The time by which the maintenance disruption will be completed. This timestamp value is in RFC3339 text format.",
          ).optional(),
          windowStartTime: z.unknown().describe(
            "The current start time of the maintenance window. This timestamp value is in RFC3339 text format.",
          ).optional(),
        }).describe("Upcoming Maintenance notification information.")
          .optional(),
      }).describe("Maintenance Info for ReservationBlocks.").optional(),
      specificSkuAllocation: z.object({
        sourceInstanceTemplateId: z.string().describe(
          "ID of the instance template used to populate reservation properties.",
        ).optional(),
        utilizations: z.record(z.string(), z.unknown()).describe(
          "Per service utilization breakdown. The Key is the Google Cloud managed service name.",
        ).optional(),
      }).describe("Contains Properties set for the reservation.").optional(),
    }).describe("[Output Only] Contains output only fields.").optional(),
    satisfiesPzs: z.boolean().describe(
      "Output only. [Output Only] Reserved for future use.",
    ).optional(),
    schedulingType: z.enum([
      "GROUPED",
      "GROUP_MAINTENANCE_TYPE_UNSPECIFIED",
      "INDEPENDENT",
    ]).describe("The type of maintenance for the reservation.").optional(),
    selfLink: z.string().describe(
      "Output only. [Output Only] Server-defined fully-qualified URL for this resource.",
    ).optional(),
    shareSettings: z.object({
      projectMap: z.record(
        z.string(),
        z.object({
          projectId: z.unknown().describe(
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
        guestAccelerators: z.array(z.unknown()).describe(
          "Specifies accelerator type and count.",
        ).optional(),
        localSsds: z.array(z.unknown()).describe(
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
    status: z.enum(["CREATING", "DELETING", "INVALID", "READY", "UPDATING"])
      .describe(
        "Output only. [Output Only] The status of the reservation. - CREATING: Reservation resources are being allocated. - READY: Reservation resources have been allocated, and the reservation is ready for use. - DELETING: Reservation deletion is in progress. - UPDATING: Reservation update is in progress.",
      ).optional(),
    zone: z.string().describe(
      "Zone in which the reservation resides. A zone must be provided if the reservation is created within a commitment.",
    ).optional(),
  })).describe(
    "The list of new reservations that you want to create and attach to this commitment. You must attach reservations to your commitment if your commitment specifies any GPUs or Local SSD disks. For more information, see Attach reservations to resource-based commitments. Specify this property only if you want to create new reservations to attach. To attach existing reservations, specify theexistingReservations property instead.",
  ).optional(),
  resources: z.array(z.object({
    acceleratorType: z.string().describe(
      "Name of the accelerator type or GPU resource. Specify this field only when the type of hardware resource is ACCELERATOR.",
    ).optional(),
    amount: z.string().describe(
      "The quantity of the hardware resource that you want to commit to purchasing (in a type-dependent unit). - For vCPUs, you must specify an integer value. - For memory, you specify the amount of MB that you want. The value you specify must be a multiple of 256 MB, with up to 6.5 GB of memory per every vCPU. - For GPUs, you must specify an integer value. - For Local SSD disks, you must specify the amount in GB. The size of a single Local SSD disk is 375 GB.",
    ).optional(),
    type: z.enum(["ACCELERATOR", "LOCAL_SSD", "MEMORY", "UNSPECIFIED", "VCPU"])
      .describe(
        "The type of hardware resource that you want to specify. You can specify any of the following values: - VCPU - MEMORY - LOCAL_SSD - ACCELERATOR Specify as a separate entry in the list for each individual resource type.",
      ).optional(),
  })).describe(
    "The list of all the hardware resources, with their types and amounts, that you want to commit to. Specify as a separate entry in the list for each individual resource type.",
  ).optional(),
  splitSourceCommitment: z.string().describe(
    "The source commitment from which you are transferring resources to create the new split commitment. For more information, see Split commitments.",
  ).optional(),
  type: z.enum([
    "ACCELERATOR_OPTIMIZED",
    "ACCELERATOR_OPTIMIZED_A3",
    "ACCELERATOR_OPTIMIZED_A3_MEGA",
    "ACCELERATOR_OPTIMIZED_A3_ULTRA",
    "ACCELERATOR_OPTIMIZED_A4",
    "COMPUTE_OPTIMIZED",
    "COMPUTE_OPTIMIZED_C2D",
    "COMPUTE_OPTIMIZED_C3",
    "COMPUTE_OPTIMIZED_C3D",
    "COMPUTE_OPTIMIZED_H3",
    "COMPUTE_OPTIMIZED_H4D",
    "GENERAL_PURPOSE",
    "GENERAL_PURPOSE_C4",
    "GENERAL_PURPOSE_C4A",
    "GENERAL_PURPOSE_C4D",
    "GENERAL_PURPOSE_E2",
    "GENERAL_PURPOSE_N2",
    "GENERAL_PURPOSE_N2D",
    "GENERAL_PURPOSE_N4",
    "GENERAL_PURPOSE_N4A",
    "GENERAL_PURPOSE_N4D",
    "GENERAL_PURPOSE_T2D",
    "GRAPHICS_OPTIMIZED",
    "GRAPHICS_OPTIMIZED_G4",
    "GRAPHICS_OPTIMIZED_G4_VGPU",
    "MEMORY_OPTIMIZED",
    "MEMORY_OPTIMIZED_M3",
    "MEMORY_OPTIMIZED_M4",
    "MEMORY_OPTIMIZED_M4_6TB",
    "MEMORY_OPTIMIZED_X4_1440_24T",
    "MEMORY_OPTIMIZED_X4_16TB",
    "MEMORY_OPTIMIZED_X4_1920_32T",
    "MEMORY_OPTIMIZED_X4_24TB",
    "MEMORY_OPTIMIZED_X4_32TB",
    "MEMORY_OPTIMIZED_X4_480_6T",
    "MEMORY_OPTIMIZED_X4_480_8T",
    "MEMORY_OPTIMIZED_X4_960_12T",
    "MEMORY_OPTIMIZED_X4_960_16T",
    "STORAGE_OPTIMIZED_Z3",
    "TYPE_UNSPECIFIED",
  ]).describe(
    "The type of commitment; specifies the machine series for which you want to commit to purchasing resources. The choice of machine series affects the discount rate and the eligible resource types. The type must be one of the following:ACCELERATOR_OPTIMIZED, ACCELERATOR_OPTIMIZED_A3,ACCELERATOR_OPTIMIZED_A3_MEGA,COMPUTE_OPTIMIZED, COMPUTE_OPTIMIZED_C2D, COMPUTE_OPTIMIZED_C3, COMPUTE_OPTIMIZED_C3D,COMPUTE_OPTIMIZED_H3, GENERAL_PURPOSE,GENERAL_PURPOSE_C4, GENERAL_PURPOSE_E2,GENERAL_PURPOSE_N2, GENERAL_PURPOSE_N2D,GENERAL_PURPOSE_N4, GENERAL_PURPOSE_T2D,GRAPHICS_OPTIMIZED, GRAPHICS_OPTIMIZED_G4,GRAPHICS_OPTIMIZED_G4_VGPU,MEMORY_OPTIMIZED, MEMORY_OPTIMIZED_M3,MEMORY_OPTIMIZED_X4, STORAGE_OPTIMIZED_Z3. For example, type MEMORY_OPTIMIZED specifies a commitment that applies only to eligible resources of memory optimized M1 and M2 machine series. Type GENERAL_PURPOSE specifies a commitment that applies only to eligible resources of general purpose N1 machine series.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine RegionCommitments. Registered at `@swamp/gcp/compute/regioncommitments`. */
export const model = {
  type: "@swamp/gcp/compute/regioncommitments",
  version: "2026.05.20.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "Removed: params",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { params: _params, ...rest } = old;
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
      description: "Added: params",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.2",
      description: "Removed: params",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { params: _params, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.07.1",
      description: "Added: params",
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
      toVersion: "2026.05.18.1",
      description: "Removed: params",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { params: _params, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: params",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: params",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { params: _params, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: params",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a regional resource-based commitment resource. Creating this commi...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a regionCommitments",
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
        if (g["autoRenew"] !== undefined) body["autoRenew"] = g["autoRenew"];
        if (g["category"] !== undefined) body["category"] = g["category"];
        if (g["customEndTimestamp"] !== undefined) {
          body["customEndTimestamp"] = g["customEndTimestamp"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["existingReservations"] !== undefined) {
          body["existingReservations"] = g["existingReservations"];
        }
        if (g["licenseResource"] !== undefined) {
          body["licenseResource"] = g["licenseResource"];
        }
        if (g["mergeSourceCommitments"] !== undefined) {
          body["mergeSourceCommitments"] = g["mergeSourceCommitments"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["plan"] !== undefined) body["plan"] = g["plan"];
        if (g["reservations"] !== undefined) {
          body["reservations"] = g["reservations"];
        }
        if (g["resources"] !== undefined) body["resources"] = g["resources"];
        if (g["splitSourceCommitment"] !== undefined) {
          body["splitSourceCommitment"] = g["splitSourceCommitment"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["commitment"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ACTIVE"],
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
      description: "Get a regionCommitments",
      arguments: z.object({
        identifier: z.string().describe("The name of the regionCommitments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["commitment"] = args.identifier;
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
      description: "Update regionCommitments attributes",
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
        params["commitment"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["autoRenew"] !== undefined) body["autoRenew"] = g["autoRenew"];
        if (g["category"] !== undefined) body["category"] = g["category"];
        if (g["customEndTimestamp"] !== undefined) {
          body["customEndTimestamp"] = g["customEndTimestamp"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["existingReservations"] !== undefined) {
          body["existingReservations"] = g["existingReservations"];
        }
        if (g["licenseResource"] !== undefined) {
          body["licenseResource"] = g["licenseResource"];
        }
        if (g["mergeSourceCommitments"] !== undefined) {
          body["mergeSourceCommitments"] = g["mergeSourceCommitments"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["plan"] !== undefined) body["plan"] = g["plan"];
        if (g["reservations"] !== undefined) {
          body["reservations"] = g["reservations"];
        }
        if (g["resources"] !== undefined) body["resources"] = g["resources"];
        if (g["splitSourceCommitment"] !== undefined) {
          body["splitSourceCommitment"] = g["splitSourceCommitment"];
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
              "readyValues": ["ACTIVE"],
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
    sync: {
      description: "Sync regionCommitments state from GCP",
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
          params["commitment"] = identifier;
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
  },
};
