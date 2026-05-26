// Auto-generated extension model for @swamp/gcp/compute/futurereservations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine FutureReservations.
 *
 * Retrieves information about the specified future reservation.
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
  "id": "compute.futureReservations.get",
  "path":
    "projects/{project}/zones/{zone}/futureReservations/{futureReservation}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "futureReservation",
  ],
  "parameters": {
    "futureReservation": {
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
  "id": "compute.futureReservations.insert",
  "path": "projects/{project}/zones/{zone}/futureReservations",
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
  "id": "compute.futureReservations.update",
  "path":
    "projects/{project}/zones/{zone}/futureReservations/{futureReservation}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "zone",
    "futureReservation",
  ],
  "parameters": {
    "futureReservation": {
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
  "id": "compute.futureReservations.delete",
  "path":
    "projects/{project}/zones/{zone}/futureReservations/{futureReservation}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "zone",
    "futureReservation",
  ],
  "parameters": {
    "futureReservation": {
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

const LIST_CONFIG = {
  "id": "compute.futureReservations.list",
  "path": "projects/{project}/zones/{zone}/futureReservations",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
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
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
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
  autoCreatedReservationsDeleteTime: z.string().describe(
    'Future timestamp when the FR auto-created reservations will be deleted by Compute Engine. Format of this field must be a valid href="https://www.ietf.org/rfc/rfc3339.txt">RFC3339 value.',
  ).optional(),
  autoCreatedReservationsDuration: z.object({
    nanos: z.number().int().describe(
      "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
  ).optional(),
  autoDeleteAutoCreatedReservations: z.boolean().describe(
    "Setting for enabling or disabling automatic deletion for auto-created reservation. If set to true, auto-created reservations will be deleted at Future Reservation's end time (default) or at user's defined timestamp if any of the [auto_created_reservations_delete_time, auto_created_reservations_duration] values is specified. For keeping auto-created reservation indefinitely, this value should be set to false.",
  ).optional(),
  commitmentInfo: z.object({
    commitmentName: z.string().describe(
      "name of the commitment where capacity is being delivered to.",
    ).optional(),
    commitmentPlan: z.enum(["INVALID", "THIRTY_SIX_MONTH", "TWELVE_MONTH"])
      .describe(
        "Indicates if a Commitment needs to be created as part of FR delivery. If this field is not present, then no commitment needs to be created.",
      ).optional(),
    previousCommitmentTerms: z.enum([
      "EXTEND",
      "PREVIOUSCOMMITMENTTERM_UNSPECIFIED",
    ]).describe(
      "Only applicable if FR is delivering to the same reservation. If set, all parent commitments will be extended to match the end date of the plan for this commitment.",
    ).optional(),
  }).optional(),
  confidentialComputeType: z.enum([
    "CONFIDENTIAL_COMPUTE_TYPE_TDX",
    "CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED",
  ]).optional(),
  deploymentType: z.enum(["DENSE", "DEPLOYMENT_TYPE_UNSPECIFIED"]).describe(
    "Type of the deployment requested as part of future reservation.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the future reservation.",
  ).optional(),
  enableEmergentMaintenance: z.boolean().describe(
    "Indicates if this group of VMs have emergent maintenance enabled.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  namePrefix: z.string().describe(
    "Name prefix for the reservations to be created at the time of delivery. The name prefix must comply with RFC1035. Maximum allowed length for name prefix is 20. Automatically created reservations name format will be -date-####.",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the future reservation. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional future reservation params.").optional(),
  planningStatus: z.enum(["DRAFT", "PLANNING_STATUS_UNSPECIFIED", "SUBMITTED"])
    .describe("Planning state before being submitted for evaluation")
    .optional(),
  reservationMode: z.enum([
    "CALENDAR",
    "DEFAULT",
    "RESERVATION_MODE_UNSPECIFIED",
  ]).describe(
    "The reservation mode which determines reservation-termination behavior and expected pricing.",
  ).optional(),
  reservationName: z.string().describe(
    "Name of reservations where the capacity is provisioned at the time of delivery of future reservations. If the reservation with the given name does not exist already, it is created automatically at the time of Approval with INACTIVE state till specified start-time. Either provide the reservation_name or a name_prefix.",
  ).optional(),
  schedulingType: z.enum([
    "GROUPED",
    "GROUP_MAINTENANCE_TYPE_UNSPECIFIED",
    "INDEPENDENT",
  ]).describe("Maintenance information for this reservation").optional(),
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
  specificReservationRequired: z.boolean().describe(
    'Indicates whether the auto-created reservation can be consumed by VMs with affinity for "any" reservation. If the field is set, then only VMs that target the reservation by name can consume from the delivered reservation.',
  ).optional(),
  specificSkuProperties: z.object({
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
      "The instance template that will be used to populate the ReservedInstanceProperties of the future reservation",
    ).optional(),
    totalCount: z.string().describe(
      "Total number of instances for which capacity assurance is requested at a future time period.",
    ).optional(),
  }).optional(),
  timeWindow: z.object({
    duration: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    endTime: z.string().optional(),
    startTime: z.string().describe(
      "Start time of the Future Reservation. The start_time is an RFC3339 string.",
    ).optional(),
  }).optional(),
  zone: z.string().describe(
    "Output only. [Output Only] URL of the Zone where this future reservation resides.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
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
  autoCreatedReservationsDeleteTime: z.string().optional(),
  autoCreatedReservationsDuration: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  autoDeleteAutoCreatedReservations: z.boolean().optional(),
  commitmentInfo: z.object({
    commitmentName: z.string(),
    commitmentPlan: z.string(),
    previousCommitmentTerms: z.string(),
  }).optional(),
  confidentialComputeType: z.string().optional(),
  creationTimestamp: z.string().optional(),
  deploymentType: z.string().optional(),
  description: z.string().optional(),
  enableEmergentMaintenance: z.boolean().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  namePrefix: z.string().optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  planningStatus: z.string().optional(),
  reservationMode: z.string().optional(),
  reservationName: z.string().optional(),
  schedulingType: z.string().optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  shareSettings: z.object({
    projectMap: z.record(z.string(), z.unknown()),
    shareType: z.string(),
  }).optional(),
  specificReservationRequired: z.boolean().optional(),
  specificSkuProperties: z.object({
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
    totalCount: z.string(),
  }).optional(),
  status: z.object({
    amendmentStatus: z.string(),
    autoCreatedReservations: z.array(z.string()),
    existingMatchingUsageInfo: z.object({
      count: z.string(),
      timestamp: z.string(),
    }),
    fulfilledCount: z.string(),
    lastKnownGoodState: z.object({
      description: z.string(),
      existingMatchingUsageInfo: z.object({
        count: z.string(),
        timestamp: z.string(),
      }),
      futureReservationSpecs: z.object({
        shareSettings: z.object({
          projectMap: z.record(z.string(), z.unknown()),
          shareType: z.string(),
        }),
        specificSkuProperties: z.object({
          instanceProperties: z.object({
            guestAccelerators: z.unknown(),
            localSsds: z.unknown(),
            locationHint: z.unknown(),
            machineType: z.unknown(),
            minCpuPlatform: z.unknown(),
          }),
          sourceInstanceTemplate: z.string(),
          totalCount: z.string(),
        }),
        timeWindow: z.object({
          duration: z.object({
            nanos: z.unknown(),
            seconds: z.unknown(),
          }),
          endTime: z.string(),
          startTime: z.string(),
        }),
      }),
      lockTime: z.string(),
      namePrefix: z.string(),
      procurementStatus: z.string(),
    }),
    lockTime: z.string(),
    procurementStatus: z.string(),
    specificSkuProperties: z.object({
      sourceInstanceTemplateId: z.string(),
    }),
  }).optional(),
  timeWindow: z.object({
    duration: z.object({
      nanos: z.number(),
      seconds: z.string(),
    }),
    endTime: z.string(),
    startTime: z.string(),
  }).optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
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
  autoCreatedReservationsDeleteTime: z.string().describe(
    'Future timestamp when the FR auto-created reservations will be deleted by Compute Engine. Format of this field must be a valid href="https://www.ietf.org/rfc/rfc3339.txt">RFC3339 value.',
  ).optional(),
  autoCreatedReservationsDuration: z.object({
    nanos: z.number().int().describe(
      "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
  ).optional(),
  autoDeleteAutoCreatedReservations: z.boolean().describe(
    "Setting for enabling or disabling automatic deletion for auto-created reservation. If set to true, auto-created reservations will be deleted at Future Reservation's end time (default) or at user's defined timestamp if any of the [auto_created_reservations_delete_time, auto_created_reservations_duration] values is specified. For keeping auto-created reservation indefinitely, this value should be set to false.",
  ).optional(),
  commitmentInfo: z.object({
    commitmentName: z.string().describe(
      "name of the commitment where capacity is being delivered to.",
    ).optional(),
    commitmentPlan: z.enum(["INVALID", "THIRTY_SIX_MONTH", "TWELVE_MONTH"])
      .describe(
        "Indicates if a Commitment needs to be created as part of FR delivery. If this field is not present, then no commitment needs to be created.",
      ).optional(),
    previousCommitmentTerms: z.enum([
      "EXTEND",
      "PREVIOUSCOMMITMENTTERM_UNSPECIFIED",
    ]).describe(
      "Only applicable if FR is delivering to the same reservation. If set, all parent commitments will be extended to match the end date of the plan for this commitment.",
    ).optional(),
  }).optional(),
  confidentialComputeType: z.enum([
    "CONFIDENTIAL_COMPUTE_TYPE_TDX",
    "CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED",
  ]).optional(),
  deploymentType: z.enum(["DENSE", "DEPLOYMENT_TYPE_UNSPECIFIED"]).describe(
    "Type of the deployment requested as part of future reservation.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the future reservation.",
  ).optional(),
  enableEmergentMaintenance: z.boolean().describe(
    "Indicates if this group of VMs have emergent maintenance enabled.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  namePrefix: z.string().describe(
    "Name prefix for the reservations to be created at the time of delivery. The name prefix must comply with RFC1035. Maximum allowed length for name prefix is 20. Automatically created reservations name format will be -date-####.",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the future reservation. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional future reservation params.").optional(),
  planningStatus: z.enum(["DRAFT", "PLANNING_STATUS_UNSPECIFIED", "SUBMITTED"])
    .describe("Planning state before being submitted for evaluation")
    .optional(),
  reservationMode: z.enum([
    "CALENDAR",
    "DEFAULT",
    "RESERVATION_MODE_UNSPECIFIED",
  ]).describe(
    "The reservation mode which determines reservation-termination behavior and expected pricing.",
  ).optional(),
  reservationName: z.string().describe(
    "Name of reservations where the capacity is provisioned at the time of delivery of future reservations. If the reservation with the given name does not exist already, it is created automatically at the time of Approval with INACTIVE state till specified start-time. Either provide the reservation_name or a name_prefix.",
  ).optional(),
  schedulingType: z.enum([
    "GROUPED",
    "GROUP_MAINTENANCE_TYPE_UNSPECIFIED",
    "INDEPENDENT",
  ]).describe("Maintenance information for this reservation").optional(),
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
  specificReservationRequired: z.boolean().describe(
    'Indicates whether the auto-created reservation can be consumed by VMs with affinity for "any" reservation. If the field is set, then only VMs that target the reservation by name can consume from the delivered reservation.',
  ).optional(),
  specificSkuProperties: z.object({
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
      "The instance template that will be used to populate the ReservedInstanceProperties of the future reservation",
    ).optional(),
    totalCount: z.string().describe(
      "Total number of instances for which capacity assurance is requested at a future time period.",
    ).optional(),
  }).optional(),
  timeWindow: z.object({
    duration: z.object({
      nanos: z.number().int().describe(
        "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
      ).optional(),
      seconds: z.string().describe(
        "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
      ).optional(),
    }).describe(
      'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
    ).optional(),
    endTime: z.string().optional(),
    startTime: z.string().describe(
      "Start time of the Future Reservation. The start_time is an RFC3339 string.",
    ).optional(),
  }).optional(),
  zone: z.string().describe(
    "Output only. [Output Only] URL of the Zone where this future reservation resides.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine FutureReservations. Registered at `@swamp/gcp/compute/futurereservations`. */
export const model = {
  type: "@swamp/gcp/compute/futurereservations",
  version: "2026.05.26.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "Removed: confidentialComputeType, params",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          confidentialComputeType: _confidentialComputeType,
          params: _params,
          ...rest
        } = old;
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
      description: "Added: confidentialComputeType, params",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.2",
      description: "Removed: confidentialComputeType, params",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          confidentialComputeType: _confidentialComputeType,
          params: _params,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.07.1",
      description: "Added: confidentialComputeType, params",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: confidentialComputeType, params",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          confidentialComputeType: _confidentialComputeType,
          params: _params,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: confidentialComputeType, params",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: confidentialComputeType, params",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          confidentialComputeType: _confidentialComputeType,
          params: _params,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: confidentialComputeType, params",
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
      description: "Removed: confidentialComputeType, params",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          confidentialComputeType: _confidentialComputeType,
          params: _params,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.26.1",
      description: "Added: confidentialComputeType, params",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Retrieves information about the specified future reservation.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a futureReservations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        const body: Record<string, unknown> = {};
        if (g["aggregateReservation"] !== undefined) {
          body["aggregateReservation"] = g["aggregateReservation"];
        }
        if (g["autoCreatedReservationsDeleteTime"] !== undefined) {
          body["autoCreatedReservationsDeleteTime"] =
            g["autoCreatedReservationsDeleteTime"];
        }
        if (g["autoCreatedReservationsDuration"] !== undefined) {
          body["autoCreatedReservationsDuration"] =
            g["autoCreatedReservationsDuration"];
        }
        if (g["autoDeleteAutoCreatedReservations"] !== undefined) {
          body["autoDeleteAutoCreatedReservations"] =
            g["autoDeleteAutoCreatedReservations"];
        }
        if (g["commitmentInfo"] !== undefined) {
          body["commitmentInfo"] = g["commitmentInfo"];
        }
        if (g["confidentialComputeType"] !== undefined) {
          body["confidentialComputeType"] = g["confidentialComputeType"];
        }
        if (g["deploymentType"] !== undefined) {
          body["deploymentType"] = g["deploymentType"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableEmergentMaintenance"] !== undefined) {
          body["enableEmergentMaintenance"] = g["enableEmergentMaintenance"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["namePrefix"] !== undefined) body["namePrefix"] = g["namePrefix"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["planningStatus"] !== undefined) {
          body["planningStatus"] = g["planningStatus"];
        }
        if (g["reservationMode"] !== undefined) {
          body["reservationMode"] = g["reservationMode"];
        }
        if (g["reservationName"] !== undefined) {
          body["reservationName"] = g["reservationName"];
        }
        if (g["schedulingType"] !== undefined) {
          body["schedulingType"] = g["schedulingType"];
        }
        if (g["shareSettings"] !== undefined) {
          body["shareSettings"] = g["shareSettings"];
        }
        if (g["specificReservationRequired"] !== undefined) {
          body["specificReservationRequired"] =
            g["specificReservationRequired"];
        }
        if (g["specificSkuProperties"] !== undefined) {
          body["specificSkuProperties"] = g["specificSkuProperties"];
        }
        if (g["timeWindow"] !== undefined) body["timeWindow"] = g["timeWindow"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["futureReservation"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "project": projectId,
              "zone": String(g["zone"] ?? ""),
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
      description: "Get a futureReservations",
      arguments: z.object({
        identifier: z.string().describe("The name of the futureReservations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["futureReservation"] = args.identifier;
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
      description: "Update futureReservations attributes",
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
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        else if (existing["zone"]) params["zone"] = String(existing["zone"]);
        params["futureReservation"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["aggregateReservation"] !== undefined) {
          body["aggregateReservation"] = g["aggregateReservation"];
        }
        if (g["autoCreatedReservationsDeleteTime"] !== undefined) {
          body["autoCreatedReservationsDeleteTime"] =
            g["autoCreatedReservationsDeleteTime"];
        }
        if (g["autoCreatedReservationsDuration"] !== undefined) {
          body["autoCreatedReservationsDuration"] =
            g["autoCreatedReservationsDuration"];
        }
        if (g["autoDeleteAutoCreatedReservations"] !== undefined) {
          body["autoDeleteAutoCreatedReservations"] =
            g["autoDeleteAutoCreatedReservations"];
        }
        if (g["commitmentInfo"] !== undefined) {
          body["commitmentInfo"] = g["commitmentInfo"];
        }
        if (g["confidentialComputeType"] !== undefined) {
          body["confidentialComputeType"] = g["confidentialComputeType"];
        }
        if (g["deploymentType"] !== undefined) {
          body["deploymentType"] = g["deploymentType"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableEmergentMaintenance"] !== undefined) {
          body["enableEmergentMaintenance"] = g["enableEmergentMaintenance"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["namePrefix"] !== undefined) body["namePrefix"] = g["namePrefix"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["planningStatus"] !== undefined) {
          body["planningStatus"] = g["planningStatus"];
        }
        if (g["reservationMode"] !== undefined) {
          body["reservationMode"] = g["reservationMode"];
        }
        if (g["reservationName"] !== undefined) {
          body["reservationName"] = g["reservationName"];
        }
        if (g["schedulingType"] !== undefined) {
          body["schedulingType"] = g["schedulingType"];
        }
        if (g["shareSettings"] !== undefined) {
          body["shareSettings"] = g["shareSettings"];
        }
        if (g["specificReservationRequired"] !== undefined) {
          body["specificReservationRequired"] =
            g["specificReservationRequired"];
        }
        if (g["specificSkuProperties"] !== undefined) {
          body["specificSkuProperties"] = g["specificSkuProperties"];
        }
        if (g["timeWindow"] !== undefined) body["timeWindow"] = g["timeWindow"];
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
      description: "Delete the futureReservations",
      arguments: z.object({
        identifier: z.string().describe("The name of the futureReservations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["futureReservation"] = args.identifier;
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
      description: "Sync futureReservations state from GCP",
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
          params["futureReservation"] = identifier;
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
      description: "List futureReservations resources",
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
    cancel: {
      description: "cancel",
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
        params["futureReservation"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.futureReservations.cancel",
            "path":
              "projects/{project}/zones/{zone}/futureReservations/{futureReservation}/cancel",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "futureReservation"],
            "parameters": {
              "futureReservation": { "location": "path", "required": true },
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
  },
};
