// Auto-generated extension model for @swamp/gcp/compute/instancegroupmanagers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine InstanceGroupManagers.
 *
 * Represents a Managed Instance Group resource. An instance group is a collection of VM instances that you can manage as a single entity. For more information, readInstance groups. For zonal Managed Instance Group, use the instanceGroupManagers resource. For regional Managed Instance Group, use theregionInstanceGroupManagers resource.
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
  "id": "compute.instanceGroupManagers.get",
  "path":
    "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "instanceGroupManager",
  ],
  "parameters": {
    "instanceGroupManager": {
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
  "id": "compute.instanceGroupManagers.insert",
  "path": "projects/{project}/zones/{zone}/instanceGroupManagers",
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

const PATCH_CONFIG = {
  "id": "compute.instanceGroupManagers.patch",
  "path":
    "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "zone",
    "instanceGroupManager",
  ],
  "parameters": {
    "instanceGroupManager": {
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

const DELETE_CONFIG = {
  "id": "compute.instanceGroupManagers.delete",
  "path":
    "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "zone",
    "instanceGroupManager",
  ],
  "parameters": {
    "instanceGroupManager": {
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
  allInstancesConfig: z.object({
    properties: z.object({
      labels: z.record(z.string(), z.string()).describe(
        "The label key-value pairs that you want to patch onto the instance.",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "The metadata key-value pairs that you want to patch onto the instance. For more information, see Project and instance metadata.",
      ).optional(),
    }).describe(
      "Represents the change that you want to make to the instance properties.",
    ).optional(),
  }).optional(),
  autoHealingPolicies: z.array(z.object({
    healthCheck: z.string().describe(
      "The URL for the health check that signals autohealing.",
    ).optional(),
    initialDelaySec: z.number().int().describe(
      "The initial delay is the number of seconds that a new VM takes to initialize and run its startup script. During a VM's initial delay period, the MIG ignores unsuccessful health checks because the VM might be in the startup process. This prevents the MIG from prematurely recreating a VM. If the health check receives a healthy response during the initial delay, it indicates that the startup process is complete and the VM is ready. The value of initial delay must be between 0 and 3600 seconds. The default value is 0.",
    ).optional(),
  })).describe(
    "The autohealing policy for this managed instance group. You can specify only one value.",
  ).optional(),
  baseInstanceName: z.string().describe(
    'The base instance name is a prefix that you want to attach to the names of all VMs in a MIG. The maximum character length is 58 and the name must comply with RFC1035 format. When a VM is created in the group, the MIG appends a hyphen and a random four-character string to the base instance name. If you want the MIG to assign sequential numbers instead of a random string, then end the base instance name with a hyphen followed by one or more hash symbols. The hash symbols indicate the number of digits. For example, a base instance name of "vm-###" results in "vm-001" as a VM name. @pattern [a-z](([-a-z0-9]{0,57})|([-a-z0-9]{0,51}-#{1,10}(\\\\[[0-9]{1,10}\\\\])?))',
  ).optional(),
  currentActions: z.object({
    abandoning: z.number().int().describe(
      "Output only. [Output Only] The total number of instances in the managed instance group that are scheduled to be abandoned. Abandoning an instance removes it from the managed instance group without deleting it.",
    ).optional(),
    creating: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be created or are currently being created. If the group fails to create any of these instances, it tries again until it creates the instance successfully. If you have disabled creation retries, this field will not be populated; instead, the creatingWithoutRetries field will be populated.",
    ).optional(),
    creatingWithoutRetries: z.number().int().describe(
      "Output only. [Output Only] The number of instances that the managed instance group will attempt to create. The group attempts to create each instance only once. If the group fails to create any of these instances, it decreases the group's targetSize value accordingly.",
    ).optional(),
    deleting: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be deleted or are currently being deleted.",
    ).optional(),
    none: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are running and have no scheduled actions.",
    ).optional(),
    recreating: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be recreated or are currently being being recreated. Recreating an instance deletes the existing root persistent disk and creates a new disk from the image that is defined in the instance template.",
    ).optional(),
    refreshing: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are being reconfigured with properties that do not require a restart or a recreate action. For example, setting or removing target pools for the instance.",
    ).optional(),
    restarting: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be restarted or are currently being restarted.",
    ).optional(),
    resuming: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be resumed or are currently being resumed.",
    ).optional(),
    starting: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be started or are currently being started.",
    ).optional(),
    stopping: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be stopped or are currently being stopped.",
    ).optional(),
    suspending: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be suspended or are currently being suspended.",
    ).optional(),
    verifying: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are being verified. See the managedInstances[].currentAction property in the listManagedInstances method documentation.",
    ).optional(),
  }).optional(),
  description: z.string().describe("An optional description of this resource.")
    .optional(),
  distributionPolicy: z.object({
    targetShape: z.enum(["ANY", "ANY_SINGLE_ZONE", "BALANCED", "EVEN"])
      .describe(
        "The distribution shape to which the group converges either proactively or on resize events (depending on the value set inupdatePolicy.instanceRedistributionType).",
      ).optional(),
    zones: z.array(z.object({
      zone: z.string().describe(
        "The URL of thezone. The zone must exist in the region where the managed instance group is located.",
      ).optional(),
    })).describe(
      "Zones where the regional managed instance group will create and manage its instances. By default, a regional MIG doesn't automatically select an AI zone to create instances, even if an AI zone is available in the specified region. To create instances in an AI zone in the selected region, you must explicitly specify it in the distribution policy together with the other preferred zones.",
    ).optional(),
  }).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. This field may be used in optimistic locking. It will be ignored when inserting an InstanceGroupManager. An up-to-date fingerprint must be provided in order to update the InstanceGroupManager, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an InstanceGroupManager.",
  ).optional(),
  instanceFlexibilityPolicy: z.object({
    instanceSelections: z.record(
      z.string(),
      z.object({
        machineTypes: z.array(z.string()).describe(
          'Full machine-type names, e.g. "n1-standard-16".',
        ).optional(),
        rank: z.number().int().describe(
          "Preference of this instance selection. Lower number means higher preference. MIG will first try to create a VM based on the machine-type with lowest rank and fallback to next rank based on availability. Machine types and instance selections with the same rank have the same preference.",
        ).optional(),
      }),
    ).describe(
      "Named instance selections configuring properties that the group will use when creating new VMs.",
    ).optional(),
  }).optional(),
  instanceLifecyclePolicy: z.object({
    defaultActionOnFailure: z.enum(["DO_NOTHING", "REPAIR"]).describe(
      "The action that a MIG performs on a failed or an unhealthy VM. A VM is marked as unhealthy when the application running on that VM fails a health check. Valid values are - REPAIR (default): MIG automatically repairs a failed or an unhealthy VM by recreating it. For more information, see About repairing VMs in a MIG. - DO_NOTHING: MIG does not repair a failed or an unhealthy VM.",
    ).optional(),
    forceUpdateOnRepair: z.enum(["NO", "YES"]).describe(
      "A bit indicating whether to forcefully apply the group's latest configuration when repairing a VM. Valid options are: - NO (default): If configuration updates are available, they are not forcefully applied during repair. Instead, configuration updates are applied according to the group's update policy. - YES: If configuration updates are available, they are applied during repair.",
    ).optional(),
    onFailedHealthCheck: z.enum(["DEFAULT_ACTION", "DO_NOTHING", "REPAIR"])
      .describe(
        "The action that a MIG performs on an unhealthy VM. A VM is marked as unhealthy when the application running on that VM fails a health check. Valid values are: - DEFAULT_ACTION (default): MIG uses the same action configured for instanceLifecyclePolicy.defaultActionOnFailure field. - REPAIR: MIG automatically repairs an unhealthy VM by recreating it. - DO_NOTHING: MIG doesn't repair an unhealthy VM. For more information, see About repairing VMs in a MIG.",
      ).optional(),
  }).optional(),
  instanceTemplate: z.string().describe(
    "The URL of the instance template that is specified for this managed instance group. The group uses this template to create all new instances in the managed instance group. The templates for existing instances in the group do not change unless you run recreateInstances, runapplyUpdatesToInstances, or set the group'supdatePolicy.type to PROACTIVE.",
  ).optional(),
  listManagedInstancesResults: z.enum(["PAGELESS", "PAGINATED"]).describe(
    "Pagination behavior of the listManagedInstances API method for this managed instance group.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the managed instance group. The name must be 1-63 characters long, and comply withRFC1035.",
    ),
  resourcePolicies: z.object({
    workloadPolicy: z.string().describe(
      "The URL of the workload policy that is specified for this managed instance group. It can be a full or partial URL. For example, the following are all valid URLs to a workload policy: - https://www.googleapis.com/compute/v1/projects/project/regions/region/resourcePolicies/resourcePolicy - projects/project/regions/region/resourcePolicies/resourcePolicy - regions/region/resourcePolicies/resourcePolicy",
    ).optional(),
  }).optional(),
  standbyPolicy: z.object({
    initialDelaySec: z.number().int().describe(
      "Specifies the number of seconds that the MIG should wait to suspend or stop a VM after that VM was created. The initial delay gives the initialization script the time to prepare your VM for a quick scale out. The value of initial delay must be between 0 and 3600 seconds. The default value is 0.",
    ).optional(),
    mode: z.enum(["MANUAL", "SCALE_OUT_POOL"]).describe(
      "Defines how a MIG resumes or starts VMs from a standby pool when the group scales out. The default mode is `MANUAL`.",
    ).optional(),
  }).optional(),
  statefulPolicy: z.object({
    preservedState: z.object({
      disks: z.record(
        z.string(),
        z.object({
          autoDelete: z.enum(["NEVER", "ON_PERMANENT_INSTANCE_DELETION"])
            .describe(
              "These stateful disks will never be deleted during autohealing, update or VM instance recreate operations. This flag is used to configure if the disk should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted. Note: disks attached inREAD_ONLY mode cannot be auto-deleted.",
            ).optional(),
        }),
      ).describe(
        "Disks created on the instances that will be preserved on instance delete, update, etc. This map is keyed with the device names of the disks.",
      ).optional(),
      externalIPs: z.record(
        z.string(),
        z.object({
          autoDelete: z.enum(["NEVER", "ON_PERMANENT_INSTANCE_DELETION"])
            .describe(
              "These stateful IPs will never be released during autohealing, update or VM instance recreate operations. This flag is used to configure if the IP reservation should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted.",
            ).optional(),
        }),
      ).describe(
        "External network IPs assigned to the instances that will be preserved on instance delete, update, etc. This map is keyed with the network interface name.",
      ).optional(),
      internalIPs: z.record(
        z.string(),
        z.object({
          autoDelete: z.enum(["NEVER", "ON_PERMANENT_INSTANCE_DELETION"])
            .describe(
              "These stateful IPs will never be released during autohealing, update or VM instance recreate operations. This flag is used to configure if the IP reservation should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted.",
            ).optional(),
        }),
      ).describe(
        "Internal network IPs assigned to the instances that will be preserved on instance delete, update, etc. This map is keyed with the network interface name.",
      ).optional(),
    }).describe("Configuration of preserved resources.").optional(),
  }).optional(),
  status: z.object({
    allInstancesConfig: z.object({
      currentRevision: z.string().describe(
        "Output only. [Output Only] Current all-instances configuration revision. This value is in RFC3339 text format.",
      ).optional(),
      effective: z.boolean().describe(
        "Output only. [Output Only] A bit indicating whether this configuration has been applied to all managed instances in the group.",
      ).optional(),
    }).optional(),
    appliedAcceleratorTopologies: z.array(z.object({
      acceleratorTopology: z.string().describe(
        'Output only. [Output Only] Topology in the format of: "16x16", "4x4x4", etc. The value is the same as configured in the WorkloadPolicy.',
      ).optional(),
      state: z.enum([
        "ACTIVATING",
        "ACTIVE",
        "DEACTIVATING",
        "FAILED",
        "INCOMPLETE",
        "REACTIVATING",
      ]).describe(
        "Output only. [Output Only] The state of the accelerator topology.",
      ).optional(),
      stateDetails: z.object({
        error: z.object({
          errors: z.unknown().describe(
            "[Output Only] The array of errors encountered while processing this operation.",
          ).optional(),
        }).describe("Output only. [Output Only] Encountered errors.")
          .optional(),
        timestamp: z.string().describe(
          "Output only. [Output Only] Timestamp is shown only if there is an error. The field has // RFC3339 // text format.",
        ).optional(),
      }).optional(),
    })).describe(
      "Output only. [Output Only] The accelerator topology applied to this MIG. Currently only one accelerator topology is supported.",
    ).optional(),
    autoscaler: z.string().describe(
      "Output only. [Output Only] The URL of theAutoscaler that targets this instance group manager.",
    ).optional(),
    bulkInstanceOperation: z.object({
      inProgress: z.boolean().describe(
        "Output only. [Output Only] Informs whether bulk instance operation is in progress.",
      ).optional(),
      lastProgressCheck: z.object({
        error: z.object({
          errors: z.array(z.unknown()).describe(
            "[Output Only] The array of errors encountered while processing this operation.",
          ).optional(),
        }).describe(
          "Output only. [Output Only] Errors encountered during bulk instance operation.",
        ).optional(),
        timestamp: z.string().describe(
          "Output only. [Output Only] Timestamp of the last progress check of bulk instance operation. Timestamp is in RFC3339 text format.",
        ).optional(),
      }).optional(),
    }).describe(
      "Bulk instance operation is the creation of VMs in a MIG when the targetSizePolicy.mode is set to BULK.",
    ).optional(),
    isStable: z.boolean().describe(
      "Output only. [Output Only] A bit indicating whether the managed instance group is in a stable state. A stable state means that: none of the instances in the managed instance group is currently undergoing any type of change (for example, creation, restart, or deletion); no future changes are scheduled for instances in the managed instance group; and the managed instance group itself is not being modified.",
    ).optional(),
    stateful: z.object({
      hasStatefulConfig: z.boolean().describe(
        "Output only. [Output Only] A bit indicating whether the managed instance group has stateful configuration, that is, if you have configured any items in a stateful policy or in per-instance configs. The group might report that it has no stateful configuration even when there is still some preserved state on a managed instance, for example, if you have deleted all PICs but not yet applied those deletions.",
      ).optional(),
      perInstanceConfigs: z.object({
        allEffective: z.boolean().describe(
          "Output only. A bit indicating if all of the group's per-instance configurations (listed in the output of a listPerInstanceConfigs API call) have status EFFECTIVE or there are no per-instance-configs.",
        ).optional(),
      }).optional(),
    }).optional(),
    versionTarget: z.object({
      isReached: z.boolean().describe(
        "Output only. [Output Only] A bit indicating whether version target has been reached in this managed instance group, i.e. all instances are in their target version. Instances' target version are specified byversion field on Instance Group Manager.",
      ).optional(),
    }).optional(),
  }).optional(),
  targetPools: z.array(z.string()).describe(
    "The URLs for all TargetPool resources to which instances in theinstanceGroup field are added. The target pools automatically apply to all of the instances in the managed instance group.",
  ).optional(),
  targetSize: z.number().int().describe(
    "The target number of running instances for this managed instance group. You can reduce this number by using the instanceGroupManager deleteInstances or abandonInstances methods. Resizing the group also changes this number.",
  ),
  targetSizePolicy: z.object({
    mode: z.enum(["BULK", "INDIVIDUAL", "UNSPECIFIED_MODE"]).describe(
      "The mode of target size policy based on which the MIG creates its VMs individually or all at once.",
    ).optional(),
  }).optional(),
  targetStoppedSize: z.number().int().describe(
    "The target number of stopped instances for this managed instance group. This number changes when you: - Stop instance using the stopInstances method or start instances using the startInstances method. - Manually change the targetStoppedSize using the update method.",
  ).optional(),
  targetSuspendedSize: z.number().int().describe(
    "The target number of suspended instances for this managed instance group. This number changes when you: - Suspend instance using the suspendInstances method or resume instances using the resumeInstances method. - Manually change the targetSuspendedSize using the update method.",
  ).optional(),
  updatePolicy: z.object({
    instanceRedistributionType: z.enum(["NONE", "PROACTIVE"]).describe(
      "The instance redistribution policy for regional managed instance groups. Valid values are: - PROACTIVE (default): The group attempts to maintain an even distribution of VM instances across zones in the region. - NONE: For non-autoscaled groups, proactive redistribution is disabled.",
    ).optional(),
    maxSurge: z.object({
      calculated: z.number().int().describe(
        "Output only. [Output Only] Absolute value of VM instances calculated based on the specific mode. - If the value is fixed, then the calculated value is equal to the fixed value. - If the value is a percent, then the calculated value is percent/100 * targetSize. For example, the calculated value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.",
      ).optional(),
      fixed: z.number().int().describe(
        "Specifies a fixed number of VM instances. This must be a positive integer.",
      ).optional(),
      percent: z.number().int().describe(
        "Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify 80 for 80%.",
      ).optional(),
    }).describe(
      "Encapsulates numeric value that can be either absolute or relative.",
    ).optional(),
    maxUnavailable: z.object({
      calculated: z.number().int().describe(
        "Output only. [Output Only] Absolute value of VM instances calculated based on the specific mode. - If the value is fixed, then the calculated value is equal to the fixed value. - If the value is a percent, then the calculated value is percent/100 * targetSize. For example, the calculated value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.",
      ).optional(),
      fixed: z.number().int().describe(
        "Specifies a fixed number of VM instances. This must be a positive integer.",
      ).optional(),
      percent: z.number().int().describe(
        "Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify 80 for 80%.",
      ).optional(),
    }).describe(
      "Encapsulates numeric value that can be either absolute or relative.",
    ).optional(),
    minimalAction: z.enum(["NONE", "REFRESH", "REPLACE", "RESTART"]).describe(
      "Minimal action to be taken on an instance. Use this option to minimize disruption as much as possible or to apply a more disruptive action than is necessary. - To limit disruption as much as possible, set the minimal action toREFRESH. If your update requires a more disruptive action, Compute Engine performs the necessary action to execute the update. - To apply a more disruptive action than is strictly necessary, set the minimal action to RESTART or REPLACE. For example, Compute Engine does not need to restart a VM to change its metadata. But if your application reads instance metadata only when a VM is restarted, you can set the minimal action to RESTART in order to pick up metadata changes.",
    ).optional(),
    mostDisruptiveAllowedAction: z.enum([
      "NONE",
      "REFRESH",
      "REPLACE",
      "RESTART",
    ]).describe(
      "Most disruptive action that is allowed to be taken on an instance. You can specify either NONE to forbid any actions,REFRESH to avoid restarting the VM and to limit disruption as much as possible. RESTART to allow actions that can be applied without instance replacing or REPLACE to allow all possible actions. If the Updater determines that the minimal update action needed is more disruptive than most disruptive allowed action you specify it will not perform the update at all.",
    ).optional(),
    replacementMethod: z.enum(["RECREATE", "SUBSTITUTE"]).describe(
      "What action should be used to replace instances. See minimal_action.REPLACE",
    ).optional(),
    type: z.enum(["OPPORTUNISTIC", "PROACTIVE"]).describe(
      "The type of update process. You can specify either PROACTIVE so that the MIG automatically updates VMs to the latest configurations orOPPORTUNISTIC so that you can select the VMs that you want to update.",
    ).optional(),
  }).optional(),
  versions: z.array(z.object({
    instanceTemplate: z.string().describe(
      "The URL of the instance template that is specified for this managed instance group. The group uses this template to create new instances in the managed instance group until the `targetSize` for this version is reached. The templates for existing instances in the group do not change unless you run recreateInstances, runapplyUpdatesToInstances, or set the group'supdatePolicy.type to PROACTIVE; in those cases, existing instances are updated until the `targetSize` for this version is reached.",
    ).optional(),
    name: z.string().describe(
      "Name of the version. Unique among all versions in the scope of this managed instance group.",
    ).optional(),
    targetSize: z.object({
      calculated: z.number().int().describe(
        "Output only. [Output Only] Absolute value of VM instances calculated based on the specific mode. - If the value is fixed, then the calculated value is equal to the fixed value. - If the value is a percent, then the calculated value is percent/100 * targetSize. For example, the calculated value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.",
      ).optional(),
      fixed: z.number().int().describe(
        "Specifies a fixed number of VM instances. This must be a positive integer.",
      ).optional(),
      percent: z.number().int().describe(
        "Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify 80 for 80%.",
      ).optional(),
    }).describe(
      "Encapsulates numeric value that can be either absolute or relative.",
    ).optional(),
  })).describe(
    "Specifies the instance templates used by this managed instance group to create instances. Each version is defined by an instanceTemplate and aname. Every version can appear at most once per instance group. This field overrides the top-level instanceTemplate field. Read more about therelationships between these fields. Exactly one version must leave thetargetSize field unset. That version will be applied to all remaining instances. For more information, read aboutcanary updates.",
  ).optional(),
  zone: z.string().describe(
    "Output only. [Output Only] The URL of azone where the managed instance group is located (for zonal resources).",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  allInstancesConfig: z.object({
    properties: z.object({
      labels: z.record(z.string(), z.unknown()),
      metadata: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  autoHealingPolicies: z.array(z.object({
    healthCheck: z.string(),
    initialDelaySec: z.number(),
  })).optional(),
  baseInstanceName: z.string().optional(),
  creationTimestamp: z.string().optional(),
  currentActions: z.object({
    abandoning: z.number(),
    creating: z.number(),
    creatingWithoutRetries: z.number(),
    deleting: z.number(),
    none: z.number(),
    recreating: z.number(),
    refreshing: z.number(),
    restarting: z.number(),
    resuming: z.number(),
    starting: z.number(),
    stopping: z.number(),
    suspending: z.number(),
    verifying: z.number(),
  }).optional(),
  description: z.string().optional(),
  distributionPolicy: z.object({
    targetShape: z.string(),
    zones: z.array(z.object({
      zone: z.string(),
    })),
  }).optional(),
  fingerprint: z.string().optional(),
  id: z.string().optional(),
  instanceFlexibilityPolicy: z.object({
    instanceSelections: z.record(z.string(), z.unknown()),
  }).optional(),
  instanceGroup: z.string().optional(),
  instanceLifecyclePolicy: z.object({
    defaultActionOnFailure: z.string(),
    forceUpdateOnRepair: z.string(),
    onFailedHealthCheck: z.string(),
  }).optional(),
  instanceTemplate: z.string().optional(),
  kind: z.string().optional(),
  listManagedInstancesResults: z.string().optional(),
  name: z.string(),
  namedPorts: z.array(z.object({
    name: z.string(),
    port: z.number(),
  })).optional(),
  region: z.string().optional(),
  resourcePolicies: z.object({
    workloadPolicy: z.string(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  selfLink: z.string().optional(),
  standbyPolicy: z.object({
    initialDelaySec: z.number(),
    mode: z.string(),
  }).optional(),
  statefulPolicy: z.object({
    preservedState: z.object({
      disks: z.record(z.string(), z.unknown()),
      externalIPs: z.record(z.string(), z.unknown()),
      internalIPs: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  status: z.object({
    allInstancesConfig: z.object({
      currentRevision: z.string(),
      effective: z.boolean(),
    }),
    appliedAcceleratorTopologies: z.array(z.object({
      acceleratorTopology: z.string(),
      state: z.string(),
      stateDetails: z.object({
        error: z.object({
          errors: z.unknown(),
        }),
        timestamp: z.string(),
      }),
    })),
    autoscaler: z.string(),
    bulkInstanceOperation: z.object({
      inProgress: z.boolean(),
      lastProgressCheck: z.object({
        error: z.object({
          errors: z.array(z.unknown()),
        }),
        timestamp: z.string(),
      }),
    }),
    isStable: z.boolean(),
    stateful: z.object({
      hasStatefulConfig: z.boolean(),
      perInstanceConfigs: z.object({
        allEffective: z.boolean(),
      }),
    }),
    versionTarget: z.object({
      isReached: z.boolean(),
    }),
  }).optional(),
  targetPools: z.array(z.string()).optional(),
  targetSize: z.number().optional(),
  targetSizePolicy: z.object({
    mode: z.string(),
  }).optional(),
  targetStoppedSize: z.number().optional(),
  targetSuspendedSize: z.number().optional(),
  updatePolicy: z.object({
    instanceRedistributionType: z.string(),
    maxSurge: z.object({
      calculated: z.number(),
      fixed: z.number(),
      percent: z.number(),
    }),
    maxUnavailable: z.object({
      calculated: z.number(),
      fixed: z.number(),
      percent: z.number(),
    }),
    minimalAction: z.string(),
    mostDisruptiveAllowedAction: z.string(),
    replacementMethod: z.string(),
    type: z.string(),
  }).optional(),
  versions: z.array(z.object({
    instanceTemplate: z.string(),
    name: z.string(),
    targetSize: z.object({
      calculated: z.number(),
      fixed: z.number(),
      percent: z.number(),
    }),
  })).optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  allInstancesConfig: z.object({
    properties: z.object({
      labels: z.record(z.string(), z.string()).describe(
        "The label key-value pairs that you want to patch onto the instance.",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "The metadata key-value pairs that you want to patch onto the instance. For more information, see Project and instance metadata.",
      ).optional(),
    }).describe(
      "Represents the change that you want to make to the instance properties.",
    ).optional(),
  }).optional(),
  autoHealingPolicies: z.array(z.object({
    healthCheck: z.string().describe(
      "The URL for the health check that signals autohealing.",
    ).optional(),
    initialDelaySec: z.number().int().describe(
      "The initial delay is the number of seconds that a new VM takes to initialize and run its startup script. During a VM's initial delay period, the MIG ignores unsuccessful health checks because the VM might be in the startup process. This prevents the MIG from prematurely recreating a VM. If the health check receives a healthy response during the initial delay, it indicates that the startup process is complete and the VM is ready. The value of initial delay must be between 0 and 3600 seconds. The default value is 0.",
    ).optional(),
  })).describe(
    "The autohealing policy for this managed instance group. You can specify only one value.",
  ).optional(),
  baseInstanceName: z.string().describe(
    'The base instance name is a prefix that you want to attach to the names of all VMs in a MIG. The maximum character length is 58 and the name must comply with RFC1035 format. When a VM is created in the group, the MIG appends a hyphen and a random four-character string to the base instance name. If you want the MIG to assign sequential numbers instead of a random string, then end the base instance name with a hyphen followed by one or more hash symbols. The hash symbols indicate the number of digits. For example, a base instance name of "vm-###" results in "vm-001" as a VM name. @pattern [a-z](([-a-z0-9]{0,57})|([-a-z0-9]{0,51}-#{1,10}(\\\\[[0-9]{1,10}\\\\])?))',
  ).optional(),
  currentActions: z.object({
    abandoning: z.number().int().describe(
      "Output only. [Output Only] The total number of instances in the managed instance group that are scheduled to be abandoned. Abandoning an instance removes it from the managed instance group without deleting it.",
    ).optional(),
    creating: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be created or are currently being created. If the group fails to create any of these instances, it tries again until it creates the instance successfully. If you have disabled creation retries, this field will not be populated; instead, the creatingWithoutRetries field will be populated.",
    ).optional(),
    creatingWithoutRetries: z.number().int().describe(
      "Output only. [Output Only] The number of instances that the managed instance group will attempt to create. The group attempts to create each instance only once. If the group fails to create any of these instances, it decreases the group's targetSize value accordingly.",
    ).optional(),
    deleting: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be deleted or are currently being deleted.",
    ).optional(),
    none: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are running and have no scheduled actions.",
    ).optional(),
    recreating: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be recreated or are currently being being recreated. Recreating an instance deletes the existing root persistent disk and creates a new disk from the image that is defined in the instance template.",
    ).optional(),
    refreshing: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are being reconfigured with properties that do not require a restart or a recreate action. For example, setting or removing target pools for the instance.",
    ).optional(),
    restarting: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be restarted or are currently being restarted.",
    ).optional(),
    resuming: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be resumed or are currently being resumed.",
    ).optional(),
    starting: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be started or are currently being started.",
    ).optional(),
    stopping: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be stopped or are currently being stopped.",
    ).optional(),
    suspending: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are scheduled to be suspended or are currently being suspended.",
    ).optional(),
    verifying: z.number().int().describe(
      "Output only. [Output Only] The number of instances in the managed instance group that are being verified. See the managedInstances[].currentAction property in the listManagedInstances method documentation.",
    ).optional(),
  }).optional(),
  description: z.string().describe("An optional description of this resource.")
    .optional(),
  distributionPolicy: z.object({
    targetShape: z.enum(["ANY", "ANY_SINGLE_ZONE", "BALANCED", "EVEN"])
      .describe(
        "The distribution shape to which the group converges either proactively or on resize events (depending on the value set inupdatePolicy.instanceRedistributionType).",
      ).optional(),
    zones: z.array(z.object({
      zone: z.string().describe(
        "The URL of thezone. The zone must exist in the region where the managed instance group is located.",
      ).optional(),
    })).describe(
      "Zones where the regional managed instance group will create and manage its instances. By default, a regional MIG doesn't automatically select an AI zone to create instances, even if an AI zone is available in the specified region. To create instances in an AI zone in the selected region, you must explicitly specify it in the distribution policy together with the other preferred zones.",
    ).optional(),
  }).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. This field may be used in optimistic locking. It will be ignored when inserting an InstanceGroupManager. An up-to-date fingerprint must be provided in order to update the InstanceGroupManager, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an InstanceGroupManager.",
  ).optional(),
  instanceFlexibilityPolicy: z.object({
    instanceSelections: z.record(
      z.string(),
      z.object({
        machineTypes: z.array(z.string()).describe(
          'Full machine-type names, e.g. "n1-standard-16".',
        ).optional(),
        rank: z.number().int().describe(
          "Preference of this instance selection. Lower number means higher preference. MIG will first try to create a VM based on the machine-type with lowest rank and fallback to next rank based on availability. Machine types and instance selections with the same rank have the same preference.",
        ).optional(),
      }),
    ).describe(
      "Named instance selections configuring properties that the group will use when creating new VMs.",
    ).optional(),
  }).optional(),
  instanceLifecyclePolicy: z.object({
    defaultActionOnFailure: z.enum(["DO_NOTHING", "REPAIR"]).describe(
      "The action that a MIG performs on a failed or an unhealthy VM. A VM is marked as unhealthy when the application running on that VM fails a health check. Valid values are - REPAIR (default): MIG automatically repairs a failed or an unhealthy VM by recreating it. For more information, see About repairing VMs in a MIG. - DO_NOTHING: MIG does not repair a failed or an unhealthy VM.",
    ).optional(),
    forceUpdateOnRepair: z.enum(["NO", "YES"]).describe(
      "A bit indicating whether to forcefully apply the group's latest configuration when repairing a VM. Valid options are: - NO (default): If configuration updates are available, they are not forcefully applied during repair. Instead, configuration updates are applied according to the group's update policy. - YES: If configuration updates are available, they are applied during repair.",
    ).optional(),
    onFailedHealthCheck: z.enum(["DEFAULT_ACTION", "DO_NOTHING", "REPAIR"])
      .describe(
        "The action that a MIG performs on an unhealthy VM. A VM is marked as unhealthy when the application running on that VM fails a health check. Valid values are: - DEFAULT_ACTION (default): MIG uses the same action configured for instanceLifecyclePolicy.defaultActionOnFailure field. - REPAIR: MIG automatically repairs an unhealthy VM by recreating it. - DO_NOTHING: MIG doesn't repair an unhealthy VM. For more information, see About repairing VMs in a MIG.",
      ).optional(),
  }).optional(),
  instanceTemplate: z.string().describe(
    "The URL of the instance template that is specified for this managed instance group. The group uses this template to create all new instances in the managed instance group. The templates for existing instances in the group do not change unless you run recreateInstances, runapplyUpdatesToInstances, or set the group'supdatePolicy.type to PROACTIVE.",
  ).optional(),
  listManagedInstancesResults: z.enum(["PAGELESS", "PAGINATED"]).describe(
    "Pagination behavior of the listManagedInstances API method for this managed instance group.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the managed instance group. The name must be 1-63 characters long, and comply withRFC1035.",
    ).optional(),
  resourcePolicies: z.object({
    workloadPolicy: z.string().describe(
      "The URL of the workload policy that is specified for this managed instance group. It can be a full or partial URL. For example, the following are all valid URLs to a workload policy: - https://www.googleapis.com/compute/v1/projects/project/regions/region/resourcePolicies/resourcePolicy - projects/project/regions/region/resourcePolicies/resourcePolicy - regions/region/resourcePolicies/resourcePolicy",
    ).optional(),
  }).optional(),
  standbyPolicy: z.object({
    initialDelaySec: z.number().int().describe(
      "Specifies the number of seconds that the MIG should wait to suspend or stop a VM after that VM was created. The initial delay gives the initialization script the time to prepare your VM for a quick scale out. The value of initial delay must be between 0 and 3600 seconds. The default value is 0.",
    ).optional(),
    mode: z.enum(["MANUAL", "SCALE_OUT_POOL"]).describe(
      "Defines how a MIG resumes or starts VMs from a standby pool when the group scales out. The default mode is `MANUAL`.",
    ).optional(),
  }).optional(),
  statefulPolicy: z.object({
    preservedState: z.object({
      disks: z.record(
        z.string(),
        z.object({
          autoDelete: z.enum(["NEVER", "ON_PERMANENT_INSTANCE_DELETION"])
            .describe(
              "These stateful disks will never be deleted during autohealing, update or VM instance recreate operations. This flag is used to configure if the disk should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted. Note: disks attached inREAD_ONLY mode cannot be auto-deleted.",
            ).optional(),
        }),
      ).describe(
        "Disks created on the instances that will be preserved on instance delete, update, etc. This map is keyed with the device names of the disks.",
      ).optional(),
      externalIPs: z.record(
        z.string(),
        z.object({
          autoDelete: z.enum(["NEVER", "ON_PERMANENT_INSTANCE_DELETION"])
            .describe(
              "These stateful IPs will never be released during autohealing, update or VM instance recreate operations. This flag is used to configure if the IP reservation should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted.",
            ).optional(),
        }),
      ).describe(
        "External network IPs assigned to the instances that will be preserved on instance delete, update, etc. This map is keyed with the network interface name.",
      ).optional(),
      internalIPs: z.record(
        z.string(),
        z.object({
          autoDelete: z.enum(["NEVER", "ON_PERMANENT_INSTANCE_DELETION"])
            .describe(
              "These stateful IPs will never be released during autohealing, update or VM instance recreate operations. This flag is used to configure if the IP reservation should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted.",
            ).optional(),
        }),
      ).describe(
        "Internal network IPs assigned to the instances that will be preserved on instance delete, update, etc. This map is keyed with the network interface name.",
      ).optional(),
    }).describe("Configuration of preserved resources.").optional(),
  }).optional(),
  status: z.object({
    allInstancesConfig: z.object({
      currentRevision: z.string().describe(
        "Output only. [Output Only] Current all-instances configuration revision. This value is in RFC3339 text format.",
      ).optional(),
      effective: z.boolean().describe(
        "Output only. [Output Only] A bit indicating whether this configuration has been applied to all managed instances in the group.",
      ).optional(),
    }).optional(),
    appliedAcceleratorTopologies: z.array(z.object({
      acceleratorTopology: z.string().describe(
        'Output only. [Output Only] Topology in the format of: "16x16", "4x4x4", etc. The value is the same as configured in the WorkloadPolicy.',
      ).optional(),
      state: z.enum([
        "ACTIVATING",
        "ACTIVE",
        "DEACTIVATING",
        "FAILED",
        "INCOMPLETE",
        "REACTIVATING",
      ]).describe(
        "Output only. [Output Only] The state of the accelerator topology.",
      ).optional(),
      stateDetails: z.object({
        error: z.object({
          errors: z.unknown().describe(
            "[Output Only] The array of errors encountered while processing this operation.",
          ).optional(),
        }).describe("Output only. [Output Only] Encountered errors.")
          .optional(),
        timestamp: z.string().describe(
          "Output only. [Output Only] Timestamp is shown only if there is an error. The field has // RFC3339 // text format.",
        ).optional(),
      }).optional(),
    })).describe(
      "Output only. [Output Only] The accelerator topology applied to this MIG. Currently only one accelerator topology is supported.",
    ).optional(),
    autoscaler: z.string().describe(
      "Output only. [Output Only] The URL of theAutoscaler that targets this instance group manager.",
    ).optional(),
    bulkInstanceOperation: z.object({
      inProgress: z.boolean().describe(
        "Output only. [Output Only] Informs whether bulk instance operation is in progress.",
      ).optional(),
      lastProgressCheck: z.object({
        error: z.object({
          errors: z.array(z.unknown()).describe(
            "[Output Only] The array of errors encountered while processing this operation.",
          ).optional(),
        }).describe(
          "Output only. [Output Only] Errors encountered during bulk instance operation.",
        ).optional(),
        timestamp: z.string().describe(
          "Output only. [Output Only] Timestamp of the last progress check of bulk instance operation. Timestamp is in RFC3339 text format.",
        ).optional(),
      }).optional(),
    }).describe(
      "Bulk instance operation is the creation of VMs in a MIG when the targetSizePolicy.mode is set to BULK.",
    ).optional(),
    isStable: z.boolean().describe(
      "Output only. [Output Only] A bit indicating whether the managed instance group is in a stable state. A stable state means that: none of the instances in the managed instance group is currently undergoing any type of change (for example, creation, restart, or deletion); no future changes are scheduled for instances in the managed instance group; and the managed instance group itself is not being modified.",
    ).optional(),
    stateful: z.object({
      hasStatefulConfig: z.boolean().describe(
        "Output only. [Output Only] A bit indicating whether the managed instance group has stateful configuration, that is, if you have configured any items in a stateful policy or in per-instance configs. The group might report that it has no stateful configuration even when there is still some preserved state on a managed instance, for example, if you have deleted all PICs but not yet applied those deletions.",
      ).optional(),
      perInstanceConfigs: z.object({
        allEffective: z.boolean().describe(
          "Output only. A bit indicating if all of the group's per-instance configurations (listed in the output of a listPerInstanceConfigs API call) have status EFFECTIVE or there are no per-instance-configs.",
        ).optional(),
      }).optional(),
    }).optional(),
    versionTarget: z.object({
      isReached: z.boolean().describe(
        "Output only. [Output Only] A bit indicating whether version target has been reached in this managed instance group, i.e. all instances are in their target version. Instances' target version are specified byversion field on Instance Group Manager.",
      ).optional(),
    }).optional(),
  }).optional(),
  targetPools: z.array(z.string()).describe(
    "The URLs for all TargetPool resources to which instances in theinstanceGroup field are added. The target pools automatically apply to all of the instances in the managed instance group.",
  ).optional(),
  targetSize: z.number().int().describe(
    "The target number of running instances for this managed instance group. You can reduce this number by using the instanceGroupManager deleteInstances or abandonInstances methods. Resizing the group also changes this number.",
  ).optional(),
  targetSizePolicy: z.object({
    mode: z.enum(["BULK", "INDIVIDUAL", "UNSPECIFIED_MODE"]).describe(
      "The mode of target size policy based on which the MIG creates its VMs individually or all at once.",
    ).optional(),
  }).optional(),
  targetStoppedSize: z.number().int().describe(
    "The target number of stopped instances for this managed instance group. This number changes when you: - Stop instance using the stopInstances method or start instances using the startInstances method. - Manually change the targetStoppedSize using the update method.",
  ).optional(),
  targetSuspendedSize: z.number().int().describe(
    "The target number of suspended instances for this managed instance group. This number changes when you: - Suspend instance using the suspendInstances method or resume instances using the resumeInstances method. - Manually change the targetSuspendedSize using the update method.",
  ).optional(),
  updatePolicy: z.object({
    instanceRedistributionType: z.enum(["NONE", "PROACTIVE"]).describe(
      "The instance redistribution policy for regional managed instance groups. Valid values are: - PROACTIVE (default): The group attempts to maintain an even distribution of VM instances across zones in the region. - NONE: For non-autoscaled groups, proactive redistribution is disabled.",
    ).optional(),
    maxSurge: z.object({
      calculated: z.number().int().describe(
        "Output only. [Output Only] Absolute value of VM instances calculated based on the specific mode. - If the value is fixed, then the calculated value is equal to the fixed value. - If the value is a percent, then the calculated value is percent/100 * targetSize. For example, the calculated value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.",
      ).optional(),
      fixed: z.number().int().describe(
        "Specifies a fixed number of VM instances. This must be a positive integer.",
      ).optional(),
      percent: z.number().int().describe(
        "Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify 80 for 80%.",
      ).optional(),
    }).describe(
      "Encapsulates numeric value that can be either absolute or relative.",
    ).optional(),
    maxUnavailable: z.object({
      calculated: z.number().int().describe(
        "Output only. [Output Only] Absolute value of VM instances calculated based on the specific mode. - If the value is fixed, then the calculated value is equal to the fixed value. - If the value is a percent, then the calculated value is percent/100 * targetSize. For example, the calculated value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.",
      ).optional(),
      fixed: z.number().int().describe(
        "Specifies a fixed number of VM instances. This must be a positive integer.",
      ).optional(),
      percent: z.number().int().describe(
        "Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify 80 for 80%.",
      ).optional(),
    }).describe(
      "Encapsulates numeric value that can be either absolute or relative.",
    ).optional(),
    minimalAction: z.enum(["NONE", "REFRESH", "REPLACE", "RESTART"]).describe(
      "Minimal action to be taken on an instance. Use this option to minimize disruption as much as possible or to apply a more disruptive action than is necessary. - To limit disruption as much as possible, set the minimal action toREFRESH. If your update requires a more disruptive action, Compute Engine performs the necessary action to execute the update. - To apply a more disruptive action than is strictly necessary, set the minimal action to RESTART or REPLACE. For example, Compute Engine does not need to restart a VM to change its metadata. But if your application reads instance metadata only when a VM is restarted, you can set the minimal action to RESTART in order to pick up metadata changes.",
    ).optional(),
    mostDisruptiveAllowedAction: z.enum([
      "NONE",
      "REFRESH",
      "REPLACE",
      "RESTART",
    ]).describe(
      "Most disruptive action that is allowed to be taken on an instance. You can specify either NONE to forbid any actions,REFRESH to avoid restarting the VM and to limit disruption as much as possible. RESTART to allow actions that can be applied without instance replacing or REPLACE to allow all possible actions. If the Updater determines that the minimal update action needed is more disruptive than most disruptive allowed action you specify it will not perform the update at all.",
    ).optional(),
    replacementMethod: z.enum(["RECREATE", "SUBSTITUTE"]).describe(
      "What action should be used to replace instances. See minimal_action.REPLACE",
    ).optional(),
    type: z.enum(["OPPORTUNISTIC", "PROACTIVE"]).describe(
      "The type of update process. You can specify either PROACTIVE so that the MIG automatically updates VMs to the latest configurations orOPPORTUNISTIC so that you can select the VMs that you want to update.",
    ).optional(),
  }).optional(),
  versions: z.array(z.object({
    instanceTemplate: z.string().describe(
      "The URL of the instance template that is specified for this managed instance group. The group uses this template to create new instances in the managed instance group until the `targetSize` for this version is reached. The templates for existing instances in the group do not change unless you run recreateInstances, runapplyUpdatesToInstances, or set the group'supdatePolicy.type to PROACTIVE; in those cases, existing instances are updated until the `targetSize` for this version is reached.",
    ).optional(),
    name: z.string().describe(
      "Name of the version. Unique among all versions in the scope of this managed instance group.",
    ).optional(),
    targetSize: z.object({
      calculated: z.number().int().describe(
        "Output only. [Output Only] Absolute value of VM instances calculated based on the specific mode. - If the value is fixed, then the calculated value is equal to the fixed value. - If the value is a percent, then the calculated value is percent/100 * targetSize. For example, the calculated value of a 80% of a managed instance group with 150 instances would be (80/100 * 150) = 120 VM instances. If there is a remainder, the number is rounded.",
      ).optional(),
      fixed: z.number().int().describe(
        "Specifies a fixed number of VM instances. This must be a positive integer.",
      ).optional(),
      percent: z.number().int().describe(
        "Specifies a percentage of instances between 0 to 100%, inclusive. For example, specify 80 for 80%.",
      ).optional(),
    }).describe(
      "Encapsulates numeric value that can be either absolute or relative.",
    ).optional(),
  })).describe(
    "Specifies the instance templates used by this managed instance group to create instances. Each version is defined by an instanceTemplate and aname. Every version can appear at most once per instance group. This field overrides the top-level instanceTemplate field. Read more about therelationships between these fields. Exactly one version must leave thetargetSize field unset. That version will be applied to all remaining instances. For more information, read aboutcanary updates.",
  ).optional(),
  zone: z.string().describe(
    "Output only. [Output Only] The URL of azone where the managed instance group is located (for zonal resources).",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine InstanceGroupManagers. Registered at `@swamp/gcp/compute/instancegroupmanagers`. */
export const model = {
  type: "@swamp/gcp/compute/instancegroupmanagers",
  version: "2026.05.18.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Managed Instance Group resource. An instance group is a collecti...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instanceGroupManagers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        const body: Record<string, unknown> = {};
        if (g["allInstancesConfig"] !== undefined) {
          body["allInstancesConfig"] = g["allInstancesConfig"];
        }
        if (g["autoHealingPolicies"] !== undefined) {
          body["autoHealingPolicies"] = g["autoHealingPolicies"];
        }
        if (g["baseInstanceName"] !== undefined) {
          body["baseInstanceName"] = g["baseInstanceName"];
        }
        if (g["currentActions"] !== undefined) {
          body["currentActions"] = g["currentActions"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["distributionPolicy"] !== undefined) {
          body["distributionPolicy"] = g["distributionPolicy"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["instanceFlexibilityPolicy"] !== undefined) {
          body["instanceFlexibilityPolicy"] = g["instanceFlexibilityPolicy"];
        }
        if (g["instanceLifecyclePolicy"] !== undefined) {
          body["instanceLifecyclePolicy"] = g["instanceLifecyclePolicy"];
        }
        if (g["instanceTemplate"] !== undefined) {
          body["instanceTemplate"] = g["instanceTemplate"];
        }
        if (g["listManagedInstancesResults"] !== undefined) {
          body["listManagedInstancesResults"] =
            g["listManagedInstancesResults"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["resourcePolicies"] !== undefined) {
          body["resourcePolicies"] = g["resourcePolicies"];
        }
        if (g["standbyPolicy"] !== undefined) {
          body["standbyPolicy"] = g["standbyPolicy"];
        }
        if (g["statefulPolicy"] !== undefined) {
          body["statefulPolicy"] = g["statefulPolicy"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["targetPools"] !== undefined) {
          body["targetPools"] = g["targetPools"];
        }
        if (g["targetSize"] !== undefined) body["targetSize"] = g["targetSize"];
        if (g["targetSizePolicy"] !== undefined) {
          body["targetSizePolicy"] = g["targetSizePolicy"];
        }
        if (g["targetStoppedSize"] !== undefined) {
          body["targetStoppedSize"] = g["targetStoppedSize"];
        }
        if (g["targetSuspendedSize"] !== undefined) {
          body["targetSuspendedSize"] = g["targetSuspendedSize"];
        }
        if (g["updatePolicy"] !== undefined) {
          body["updatePolicy"] = g["updatePolicy"];
        }
        if (g["versions"] !== undefined) body["versions"] = g["versions"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["instanceGroupManager"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a instanceGroupManagers",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the instanceGroupManagers",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["instanceGroupManager"] = args.identifier;
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
      description: "Update instanceGroupManagers attributes",
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
        params["instanceGroupManager"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["allInstancesConfig"] !== undefined) {
          body["allInstancesConfig"] = g["allInstancesConfig"];
        }
        if (g["autoHealingPolicies"] !== undefined) {
          body["autoHealingPolicies"] = g["autoHealingPolicies"];
        }
        if (g["baseInstanceName"] !== undefined) {
          body["baseInstanceName"] = g["baseInstanceName"];
        }
        if (g["currentActions"] !== undefined) {
          body["currentActions"] = g["currentActions"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["distributionPolicy"] !== undefined) {
          body["distributionPolicy"] = g["distributionPolicy"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["instanceFlexibilityPolicy"] !== undefined) {
          body["instanceFlexibilityPolicy"] = g["instanceFlexibilityPolicy"];
        }
        if (g["instanceLifecyclePolicy"] !== undefined) {
          body["instanceLifecyclePolicy"] = g["instanceLifecyclePolicy"];
        }
        if (g["instanceTemplate"] !== undefined) {
          body["instanceTemplate"] = g["instanceTemplate"];
        }
        if (g["listManagedInstancesResults"] !== undefined) {
          body["listManagedInstancesResults"] =
            g["listManagedInstancesResults"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["resourcePolicies"] !== undefined) {
          body["resourcePolicies"] = g["resourcePolicies"];
        }
        if (g["standbyPolicy"] !== undefined) {
          body["standbyPolicy"] = g["standbyPolicy"];
        }
        if (g["statefulPolicy"] !== undefined) {
          body["statefulPolicy"] = g["statefulPolicy"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["targetPools"] !== undefined) {
          body["targetPools"] = g["targetPools"];
        }
        if (g["targetSize"] !== undefined) body["targetSize"] = g["targetSize"];
        if (g["targetSizePolicy"] !== undefined) {
          body["targetSizePolicy"] = g["targetSizePolicy"];
        }
        if (g["targetStoppedSize"] !== undefined) {
          body["targetStoppedSize"] = g["targetStoppedSize"];
        }
        if (g["targetSuspendedSize"] !== undefined) {
          body["targetSuspendedSize"] = g["targetSuspendedSize"];
        }
        if (g["updatePolicy"] !== undefined) {
          body["updatePolicy"] = g["updatePolicy"];
        }
        if (g["versions"] !== undefined) body["versions"] = g["versions"];
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
      description: "Delete the instanceGroupManagers",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the instanceGroupManagers",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["instanceGroupManager"] = args.identifier;
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
      description: "Sync instanceGroupManagers state from GCP",
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
          params["instanceGroupManager"] = identifier;
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
    abandon_instances: {
      description: "abandon instances",
      arguments: z.object({
        instances: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.abandonInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/abandonInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
    apply_updates_to_instances: {
      description: "apply updates to instances",
      arguments: z.object({
        allInstances: z.any().optional(),
        instances: z.any().optional(),
        minimalAction: z.any().optional(),
        mostDisruptiveAllowedAction: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["allInstances"] !== undefined) {
          body["allInstances"] = args["allInstances"];
        }
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        if (args["minimalAction"] !== undefined) {
          body["minimalAction"] = args["minimalAction"];
        }
        if (args["mostDisruptiveAllowedAction"] !== undefined) {
          body["mostDisruptiveAllowedAction"] =
            args["mostDisruptiveAllowedAction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.applyUpdatesToInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/applyUpdatesToInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    create_instances: {
      description: "create instances",
      arguments: z.object({
        instances: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.createInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/createInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
    list_errors: {
      description: "list errors",
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.listErrors",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/listErrors",
            "httpMethod": "GET",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "filter": { "location": "query" },
              "instanceGroupManager": { "location": "path", "required": true },
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
    list_managed_instances: {
      description: "list managed instances",
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.listManagedInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/listManagedInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "filter": { "location": "query" },
              "instanceGroupManager": { "location": "path", "required": true },
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
    list_per_instance_configs: {
      description: "list per instance configs",
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.listPerInstanceConfigs",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/listPerInstanceConfigs",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "filter": { "location": "query" },
              "instanceGroupManager": { "location": "path", "required": true },
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
    patch_per_instance_configs: {
      description: "patch per instance configs",
      arguments: z.object({
        perInstanceConfigs: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["perInstanceConfigs"] !== undefined) {
          body["perInstanceConfigs"] = args["perInstanceConfigs"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.patchPerInstanceConfigs",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/patchPerInstanceConfigs",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
    recreate_instances: {
      description: "recreate instances",
      arguments: z.object({
        instances: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.recreateInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/recreateInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
    resize: {
      description: "resize",
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
        params["instanceGroupManager"] =
          existing["instanceGroupManager"]?.toString() ??
            g["instanceGroupManager"]?.toString() ?? "";
        params["size"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.resize",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/resize",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "instanceGroupManager",
              "size",
            ],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "size": { "location": "query", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    resume_instances: {
      description: "resume instances",
      arguments: z.object({
        instances: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.resumeInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/resumeInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
    set_instance_template: {
      description: "set instance template",
      arguments: z.object({
        instanceTemplate: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instanceTemplate"] !== undefined) {
          body["instanceTemplate"] = args["instanceTemplate"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.setInstanceTemplate",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/setInstanceTemplate",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
    set_target_pools: {
      description: "set target pools",
      arguments: z.object({
        fingerprint: z.any().optional(),
        targetPools: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["targetPools"] !== undefined) {
          body["targetPools"] = args["targetPools"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.setTargetPools",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/setTargetPools",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
    start_instances: {
      description: "start instances",
      arguments: z.object({
        instances: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.startInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/startInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
    stop_instances: {
      description: "stop instances",
      arguments: z.object({
        forceStop: z.any().optional(),
        instances: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["forceStop"] !== undefined) {
          body["forceStop"] = args["forceStop"];
        }
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.stopInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/stopInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
    suspend_instances: {
      description: "suspend instances",
      arguments: z.object({
        forceSuspend: z.any().optional(),
        instances: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["forceSuspend"] !== undefined) {
          body["forceSuspend"] = args["forceSuspend"];
        }
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.suspendInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/suspendInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
    update_per_instance_configs: {
      description: "update per instance configs",
      arguments: z.object({
        perInstanceConfigs: z.any().optional(),
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
        params["instanceGroupManager"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["perInstanceConfigs"] !== undefined) {
          body["perInstanceConfigs"] = args["perInstanceConfigs"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroupManagers.updatePerInstanceConfigs",
            "path":
              "projects/{project}/zones/{zone}/instanceGroupManagers/{instanceGroupManager}/updatePerInstanceConfigs",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroupManager"],
            "parameters": {
              "instanceGroupManager": { "location": "path", "required": true },
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
