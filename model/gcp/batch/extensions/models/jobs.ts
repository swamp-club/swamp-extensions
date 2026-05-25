// Auto-generated extension model for @swamp/gcp/batch/jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Batch Jobs.
 *
 * The Cloud Batch Job description.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/jobs/${shortName}`;
}

const BASE_URL = "https://batch.googleapis.com/";

const GET_CONFIG = {
  "id": "batch.projects.locations.jobs.get",
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
  "id": "batch.projects.locations.jobs.create",
  "path": "v1/{+parent}/jobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "jobId": {
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

const DELETE_CONFIG = {
  "id": "batch.projects.locations.jobs.delete",
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
    "reason": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "batch.projects.locations.jobs.list",
  "path": "v1/{+parent}/jobs",
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
  allocationPolicy: z.object({
    instances: z.array(z.object({
      blockProjectSshKeys: z.boolean().describe(
        "Optional. Set this field to `true` if you want Batch to block project-level SSH keys from accessing this job's VMs. Alternatively, you can configure the job to specify a VM instance template that blocks project-level SSH keys. In either case, Batch blocks project-level SSH keys while creating the VMs for this job. Batch allows project-level SSH keys for a job's VMs only if all the following are true: + This field is undefined or set to `false`. + The job's VM instance template (if any) doesn't block project-level SSH keys. Notably, you can override this behavior by manually updating a VM to block or allow project-level SSH keys. For more information about blocking project-level SSH keys, see the Compute Engine documentation: https://cloud.google.com/compute/docs/connect/restrict-ssh-keys#block-keys",
      ).optional(),
      installGpuDrivers: z.boolean().describe(
        "Set this field true if you want Batch to help fetch drivers from a third party location and install them for GPUs specified in `policy.accelerators` or `instance_template` on your behalf. Default is false. For Container-Optimized Image cases, Batch will install the accelerator driver following milestones of https://cloud.google.com/container-optimized-os/docs/release-notes. For non Container-Optimized Image cases, following https://github.com/GoogleCloudPlatform/compute-gpu-installation/blob/main/linux/install_gpu_driver.py.",
      ).optional(),
      installOpsAgent: z.boolean().describe(
        "Optional. Set this field true if you want Batch to install Ops Agent on your behalf. Default is false.",
      ).optional(),
      instanceTemplate: z.string().describe(
        "Name of an instance template used to create VMs. Named the field as 'instance_template' instead of 'template' to avoid C++ keyword conflict. Batch only supports global instance templates from the same project as the job. You can specify the global instance template as a full or partial URL.",
      ).optional(),
      policy: z.object({
        accelerators: z.array(z.unknown()).describe(
          "The accelerators attached to each VM instance.",
        ).optional(),
        bootDisk: z.object({
          diskInterface: z.unknown().describe(
            'Local SSDs are available through both "SCSI" and "NVMe" interfaces. If not indicated, "NVMe" will be the default one for local ssds. This field is ignored for persistent disks as the interface is chosen automatically. See https://cloud.google.com/compute/docs/disks/persistent-disks#choose_an_interface.',
          ).optional(),
          image: z.unknown().describe(
            "URL for a VM image to use as the data source for this disk. For example, the following are all valid URLs: * Specify the image by its family name: projects/{project}/global/images/family/{image_family} * Specify the image version: projects/{project}/global/images/{image_version} You can also use Batch customized image in short names. The following image values are supported for a boot disk: * `batch-debian`: use Batch Debian images. * `batch-cos`: use Batch Container-Optimized images. * `batch-hpc-rocky`: use Batch HPC Rocky Linux images.",
          ).optional(),
          sizeGb: z.unknown().describe(
            "Disk size in GB. **Non-Boot Disk**: If the `type` specifies a persistent disk, this field is ignored if `data_source` is set as `image` or `snapshot`. If the `type` specifies a local SSD, this field should be a multiple of 375 GB, otherwise, the final size will be the next greater multiple of 375 GB. **Boot Disk**: Batch will calculate the boot disk size based on source image and task requirements if you do not speicify the size. If both this field and the `boot_disk_mib` field in task spec's `compute_resource` are defined, Batch will only honor this field. Also, this field should be no smaller than the source disk's size when the `data_source` is set as `snapshot` or `image`. For example, if you set an image as the `data_source` field and the image's default disk size 30 GB, you can only use this field to make the disk larger or equal to 30 GB.",
          ).optional(),
          snapshot: z.unknown().describe(
            "Name of a snapshot used as the data source. Snapshot is not supported as boot disk now.",
          ).optional(),
          type: z.unknown().describe(
            'Disk type as shown in `gcloud compute disk-types list`. For example, local SSD uses type "local-ssd". Persistent disks and boot disks use "pd-balanced", "pd-extreme", "pd-ssd" or "pd-standard". If not specified, "pd-standard" will be used as the default type for non-boot disks, "pd-balanced" will be used as the default type for boot disks.',
          ).optional(),
        }).describe(
          "A new persistent disk or a local ssd. A VM can only have one local SSD setting but multiple local SSD partitions. See https://cloud.google.com/compute/docs/disks#pdspecs and https://cloud.google.com/compute/docs/disks#localssds.",
        ).optional(),
        disks: z.array(z.unknown()).describe(
          "Non-boot disks to be attached for each VM created by this InstancePolicy. New disks will be deleted when the VM is deleted. A non-boot disk is a disk that can be of a device with a file system or a raw storage drive that is not ready for data storage and accessing.",
        ).optional(),
        machineType: z.string().describe("The Compute Engine machine type.")
          .optional(),
        minCpuPlatform: z.string().describe(
          "The minimum CPU platform. See https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform.",
        ).optional(),
        provisioningModel: z.enum([
          "PROVISIONING_MODEL_UNSPECIFIED",
          "STANDARD",
          "SPOT",
          "PREEMPTIBLE",
          "RESERVATION_BOUND",
          "FLEX_START",
        ]).describe("The provisioning model.").optional(),
        reservation: z.string().describe(
          'Optional. If not specified (default), VMs will consume any applicable reservation. If "NO_RESERVATION" is specified, VMs will not consume any reservation. Otherwise, if specified, VMs will consume only the specified reservation.',
        ).optional(),
      }).describe(
        "InstancePolicy describes an instance type and resources attached to each VM created by this InstancePolicy.",
      ).optional(),
    })).describe(
      "Describe instances that can be created by this AllocationPolicy. Only instances[0] is supported now.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      'Custom labels to apply to the job and all the Compute Engine resources that both are created by this allocation policy and support labels. Use labels to group and describe the resources they are applied to. Batch automatically applies predefined labels and supports multiple `labels` fields for each job, which each let you apply custom labels to various resources. Label names that start with "goog-" or "google-" are reserved for predefined labels. For more information about labels with Batch, see [Organize resources using labels](https://cloud.google.com/batch/docs/organize-resources-using-labels).',
    ).optional(),
    location: z.object({
      allowedLocations: z.array(z.string()).describe(
        'A list of allowed location names represented by internal URLs. Each location can be a region or a zone. Only one region or multiple zones in one region is supported now. For example, ["regions/us-central1"] allow VMs in any zones in region us-central1. ["zones/us-central1-a", "zones/us-central1-c"] only allow VMs in zones us-central1-a and us-central1-c. Mixing locations from different regions would cause errors. For example, ["regions/us-central1", "zones/us-central1-a", "zones/us-central1-b", "zones/us-west1-a"] contains locations from two distinct regions: us-central1 and us-west1. This combination will trigger an error.',
      ).optional(),
    }).optional(),
    network: z.object({
      networkInterfaces: z.array(z.object({
        network: z.string().describe(
          "The URL of an existing network resource. You can specify the network as a full or partial URL. For example, the following are all valid URLs: * https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network} * projects/{project}/global/networks/{network} * global/networks/{network}",
        ).optional(),
        noExternalIpAddress: z.boolean().describe(
          "Default is false (with an external IP address). Required if no external public IP address is attached to the VM. If no external public IP address, additional configuration is required to allow the VM to access Google Services. See https://cloud.google.com/vpc/docs/configure-private-google-access and https://cloud.google.com/nat/docs/gce-example#create-nat for more information.",
        ).optional(),
        subnetwork: z.string().describe(
          "The URL of an existing subnetwork resource in the network. You can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs: * https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/subnetworks/{subnetwork} * projects/{project}/regions/{region}/subnetworks/{subnetwork} * regions/{region}/subnetworks/{subnetwork}",
        ).optional(),
      })).describe("Network configurations.").optional(),
    }).describe("NetworkPolicy describes VM instance network configurations.")
      .optional(),
    placement: z.object({
      collocation: z.string().describe(
        "UNSPECIFIED vs. COLLOCATED (default UNSPECIFIED). Use COLLOCATED when you want VMs to be located close to each other for low network latency between the VMs. No placement policy will be generated when collocation is UNSPECIFIED.",
      ).optional(),
      maxDistance: z.string().describe(
        "When specified, causes the job to fail if more than max_distance logical switches are required between VMs. Batch uses the most compact possible placement of VMs even when max_distance is not specified. An explicit max_distance makes that level of compactness a strict requirement. Not yet implemented",
      ).optional(),
    }).describe(
      "PlacementPolicy describes a group placement policy for the VMs controlled by this AllocationPolicy.",
    ).optional(),
    serviceAccount: z.object({
      email: z.string().describe("Email address of the service account.")
        .optional(),
      scopes: z.array(z.string()).describe(
        "List of scopes to be enabled for this service account.",
      ).optional(),
    }).describe("Carries information about a Google Cloud service account.")
      .optional(),
    tags: z.array(z.string()).describe(
      "Optional. Tags applied to the VM instances. The tags identify valid sources or targets for network firewalls. Each tag must be 1-63 characters long, and comply with [RFC1035](https://www.ietf.org/rfc/rfc1035.txt).",
    ).optional(),
  }).describe(
    "A Job's resource allocation policy describes when, where, and how compute resources should be allocated for the Job.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Custom labels to apply to the job and any Cloud Logging [LogEntry](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry) that it generates. Use labels to group and describe the resources they are applied to. Batch automatically applies predefined labels and supports multiple `labels` fields for each job, which each let you apply custom labels to various resources. Label names that start with "goog-" or "google-" are reserved for predefined labels. For more information about labels with Batch, see [Organize resources using labels](https://cloud.google.com/batch/docs/organize-resources-using-labels).',
  ).optional(),
  logsPolicy: z.object({
    cloudLoggingOption: z.object({
      useGenericTaskMonitoredResource: z.boolean().describe(
        "Optional. Set this field to `true` to change the [monitored resource type](https://cloud.google.com/monitoring/api/resources) for Cloud Logging logs generated by this Batch job from the [`batch.googleapis.com/Job`](https://cloud.google.com/monitoring/api/resources#tag_batch.googleapis.com/Job) type to the formerly used [`generic_task`](https://cloud.google.com/monitoring/api/resources#tag_generic_task) type.",
      ).optional(),
    }).describe(
      "`CloudLoggingOption` contains additional settings for Cloud Logging logs generated by Batch job.",
    ).optional(),
    destination: z.enum(["DESTINATION_UNSPECIFIED", "CLOUD_LOGGING", "PATH"])
      .describe("If and where logs should be saved.").optional(),
    logsPath: z.string().describe(
      "When `destination` is set to `PATH`, you must set this field to the path where you want logs to be saved. This path can point to a local directory on the VM or (if congifured) a directory under the mount path of any Cloud Storage bucket, network file system (NFS), or writable persistent disk that is mounted to the job. For example, if the job has a bucket with `mountPath` set to `/mnt/disks/my-bucket`, you can write logs to the root directory of the `remotePath` of that bucket by setting this field to `/mnt/disks/my-bucket/`.",
    ).optional(),
  }).describe(
    "LogsPolicy describes if and how a job's logs are preserved. Logs include information that is automatically written by the Batch service agent and any information that you configured the job's runnables to write to the `stdout` or `stderr` streams.",
  ).optional(),
  notifications: z.array(z.object({
    message: z.object({
      newJobState: z.enum([
        "STATE_UNSPECIFIED",
        "QUEUED",
        "SCHEDULED",
        "RUNNING",
        "SUCCEEDED",
        "FAILED",
        "DELETION_IN_PROGRESS",
        "CANCELLATION_IN_PROGRESS",
        "CANCELLED",
      ]).describe("The new job state.").optional(),
      newTaskState: z.enum([
        "STATE_UNSPECIFIED",
        "PENDING",
        "ASSIGNED",
        "RUNNING",
        "FAILED",
        "SUCCEEDED",
        "UNEXECUTED",
      ]).describe("The new task state.").optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "JOB_STATE_CHANGED",
        "TASK_STATE_CHANGED",
      ]).describe("The message type.").optional(),
    }).describe(
      "Message details. Describe the conditions under which messages will be sent. If no attribute is defined, no message will be sent by default. One message should specify either the job or the task level attributes, but not both. For example, job level: JOB_STATE_CHANGED and/or a specified new_job_state; task level: TASK_STATE_CHANGED and/or a specified new_task_state.",
    ).optional(),
    pubsubTopic: z.string().describe(
      "The Pub/Sub topic where notifications for the job, like state changes, will be published. If undefined, no Pub/Sub notifications are sent for this job. Specify the topic using the following format: `projects/{project}/topics/{topic}`. Notably, if you want to specify a Pub/Sub topic that is in a different project than the job, your administrator must grant your project's Batch service agent permission to publish to that topic. For more information about configuring Pub/Sub notifications for a job, see https://cloud.google.com/batch/docs/enable-notifications.",
    ).optional(),
  })).describe("Notification configurations.").optional(),
  priority: z.string().describe(
    "Priority of the Job. The valid value range is [0, 100). Default value is 0. Higher value indicates higher priority. A job with higher priority value is more likely to run earlier if all other requirements are satisfied.",
  ).optional(),
  status: z.object({
    runDuration: z.string().describe(
      "The duration of time that the Job spent in status RUNNING.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "QUEUED",
      "SCHEDULED",
      "RUNNING",
      "SUCCEEDED",
      "FAILED",
      "DELETION_IN_PROGRESS",
      "CANCELLATION_IN_PROGRESS",
      "CANCELLED",
    ]).describe("Job state").optional(),
    statusEvents: z.array(z.object({
      description: z.string().describe("Description of the event.").optional(),
      eventTime: z.string().describe("The time this event occurred.")
        .optional(),
      taskExecution: z.object({
        exitCode: z.number().int().describe(
          "The exit code of a finished task. If the task succeeded, the exit code will be 0. If the task failed but not due to the following reasons, the exit code will be 50000. Otherwise, it can be from different sources: * Batch known failures: https://cloud.google.com/batch/docs/troubleshooting#reserved-exit-codes. * Batch runnable execution failures; you can rely on Batch logs to further diagnose: https://cloud.google.com/batch/docs/analyze-job-using-logs. If there are multiple runnables failures, Batch only exposes the first error.",
        ).optional(),
      }).describe(
        "This Task Execution field includes detail information for task execution procedures, based on StatusEvent types.",
      ).optional(),
      taskState: z.enum([
        "STATE_UNSPECIFIED",
        "PENDING",
        "ASSIGNED",
        "RUNNING",
        "FAILED",
        "SUCCEEDED",
        "UNEXECUTED",
      ]).describe(
        "Task State. This field is only defined for task-level status events.",
      ).optional(),
      type: z.string().describe("Type of the event.").optional(),
    })).describe("Job status events").optional(),
    taskGroups: z.record(
      z.string(),
      z.object({
        counts: z.record(z.string(), z.string()).describe(
          "Count of task in each state in the TaskGroup. The map key is task state name.",
        ).optional(),
        instances: z.array(z.object({
          bootDisk: z.unknown().describe(
            "A new persistent disk or a local ssd. A VM can only have one local SSD setting but multiple local SSD partitions. See https://cloud.google.com/compute/docs/disks#pdspecs and https://cloud.google.com/compute/docs/disks#localssds.",
          ).optional(),
          machineType: z.unknown().describe("The Compute Engine machine type.")
            .optional(),
          provisioningModel: z.unknown().describe(
            "The VM instance provisioning model.",
          ).optional(),
          taskPack: z.unknown().describe(
            "The max number of tasks can be assigned to this instance type.",
          ).optional(),
        })).describe("Status of instances allocated for the TaskGroup.")
          .optional(),
      }),
    ).describe(
      "Aggregated task status for each TaskGroup in the Job. The map key is TaskGroup ID.",
    ).optional(),
  }).describe("Job status.").optional(),
  taskGroups: z.array(z.object({
    name: z.string().describe(
      'Output only. TaskGroup name. The system generates this field based on parent Job name. For example: "projects/123456/locations/us-west1/jobs/job01/taskGroups/group01".',
    ).optional(),
    parallelism: z.string().describe(
      "Max number of tasks that can run in parallel. Default to min(task_count, parallel tasks per job limit). See: [Job Limits](https://cloud.google.com/batch/quotas#job_limits). Field parallelism must be 1 if the scheduling_policy is IN_ORDER.",
    ).optional(),
    permissiveSsh: z.boolean().describe(
      "When true, Batch will configure SSH to allow passwordless login between VMs running the Batch tasks in the same TaskGroup.",
    ).optional(),
    requireHostsFile: z.boolean().describe(
      "When true, Batch will populate a file with a list of all VMs assigned to the TaskGroup and set the BATCH_HOSTS_FILE environment variable to the path of that file. Defaults to false. The host file supports up to 1000 VMs.",
    ).optional(),
    runAsNonRoot: z.boolean().describe(
      "Optional. If not set or set to false, Batch uses the root user to execute runnables. If set to true, Batch runs the runnables using a non-root user. Currently, the non-root user Batch used is generated by OS Login. For more information, see [About OS Login](https://cloud.google.com/compute/docs/oslogin).",
    ).optional(),
    schedulingPolicy: z.enum([
      "SCHEDULING_POLICY_UNSPECIFIED",
      "AS_SOON_AS_POSSIBLE",
      "IN_ORDER",
    ]).describe(
      "Scheduling policy for Tasks in the TaskGroup. The default value is AS_SOON_AS_POSSIBLE.",
    ).optional(),
    taskCount: z.string().describe(
      "Number of Tasks in the TaskGroup. Default is 1.",
    ).optional(),
    taskCountPerNode: z.string().describe(
      "Max number of tasks that can be run on a VM at the same time. If not specified, the system will decide a value based on available compute resources on a VM and task requirements.",
    ).optional(),
    taskEnvironments: z.array(z.object({
      encryptedVariables: z.object({
        cipherText: z.unknown().describe(
          "The value of the cipherText response from the `encrypt` method.",
        ).optional(),
        keyName: z.unknown().describe(
          "The name of the KMS key that will be used to decrypt the cipher text.",
        ).optional(),
      }).optional(),
      secretVariables: z.record(z.string(), z.unknown()).describe(
        "A map of environment variable names to Secret Manager secret names. The VM will access the named secrets to set the value of each environment variable.",
      ).optional(),
      variables: z.record(z.string(), z.unknown()).describe(
        "A map of environment variable names to values.",
      ).optional(),
    })).describe(
      "An array of environment variable mappings, which are passed to Tasks with matching indices. If task_environments is used then task_count should not be specified in the request (and will be ignored). Task count will be the length of task_environments. Tasks get a BATCH_TASK_INDEX and BATCH_TASK_COUNT environment variable, in addition to any environment variables set in task_environments, specifying the number of Tasks in the Task's parent TaskGroup, and the specific Task's index in the TaskGroup (0 through BATCH_TASK_COUNT - 1).",
    ).optional(),
    taskSpec: z.object({
      computeResource: z.object({
        bootDiskMib: z.string().describe(
          "Extra boot disk size in MiB for each task.",
        ).optional(),
        cpuMilli: z.string().describe(
          "The milliCPU count. `cpuMilli` defines the amount of CPU resources per task in milliCPU units. For example, `1000` corresponds to 1 vCPU per task. If undefined, the default value is `2000`. If you also define the VM's machine type using the `machineType` in [InstancePolicy](https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicy) field or inside the `instanceTemplate` in the [InstancePolicyOrTemplate](https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicyortemplate) field, make sure the CPU resources for both fields are compatible with each other and with how many tasks you want to allow to run on the same VM at the same time. For example, if you specify the `n2-standard-2` machine type, which has 2 vCPUs each, you are recommended to set `cpuMilli` no more than `2000`, or you are recommended to run two tasks on the same VM if you set `cpuMilli` to `1000` or less.",
        ).optional(),
        memoryMib: z.string().describe(
          "Memory in MiB. `memoryMib` defines the amount of memory per task in MiB units. If undefined, the default value is `2000`. If you also define the VM's machine type using the `machineType` in [InstancePolicy](https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicy) field or inside the `instanceTemplate` in the [InstancePolicyOrTemplate](https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicyortemplate) field, make sure the memory resources for both fields are compatible with each other and with how many tasks you want to allow to run on the same VM at the same time. For example, if you specify the `n2-standard-2` machine type, which has 8 GiB each, you are recommended to set `memoryMib` to no more than `8192`, or you are recommended to run two tasks on the same VM if you set `memoryMib` to `4096` or less.",
        ).optional(),
      }).describe(
        "Compute resource requirements. ComputeResource defines the amount of resources required for each task. Make sure your tasks have enough resources to successfully run. If you also define the types of resources for a job to use with the [InstancePolicyOrTemplate](https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicyortemplate) field, make sure both fields are compatible with each other.",
      ).optional(),
      environment: z.object({
        encryptedVariables: z.object({
          cipherText: z.unknown().describe(
            "The value of the cipherText response from the `encrypt` method.",
          ).optional(),
          keyName: z.unknown().describe(
            "The name of the KMS key that will be used to decrypt the cipher text.",
          ).optional(),
        }).optional(),
        secretVariables: z.record(z.string(), z.unknown()).describe(
          "A map of environment variable names to Secret Manager secret names. The VM will access the named secrets to set the value of each environment variable.",
        ).optional(),
        variables: z.record(z.string(), z.unknown()).describe(
          "A map of environment variable names to values.",
        ).optional(),
      }).describe(
        "An Environment describes a collection of environment variables to set when executing Tasks.",
      ).optional(),
      environments: z.record(z.string(), z.string()).describe(
        "Deprecated: please use environment(non-plural) instead.",
      ).optional(),
      lifecyclePolicies: z.array(z.object({
        action: z.unknown().describe(
          "Action to execute when ActionCondition is true. When RETRY_TASK is specified, we will retry failed tasks if we notice any exit code match and fail tasks if no match is found. Likewise, when FAIL_TASK is specified, we will fail tasks if we notice any exit code match and retry tasks if no match is found.",
        ).optional(),
        actionCondition: z.unknown().describe(
          "Conditions for actions to deal with task failures.",
        ).optional(),
      })).describe(
        "Lifecycle management schema when any task in a task group is failed. Currently we only support one lifecycle policy. When the lifecycle policy condition is met, the action in the policy will execute. If task execution result does not meet with the defined lifecycle policy, we consider it as the default policy. Default policy means if the exit code is 0, exit task. If task ends with non-zero exit code, retry the task with max_retry_count.",
      ).optional(),
      maxRetryCount: z.number().int().describe(
        "Maximum number of retries on failures. The default, 0, which means never retry. The valid value range is [0, 10].",
      ).optional(),
      maxRunDuration: z.string().describe(
        "Maximum duration the task should run before being automatically retried (if enabled) or automatically failed. Format the value of this field as a time limit in seconds followed by `s`—for example, `3600s` for 1 hour. The field accepts any value between 0 and the maximum listed for the `Duration` field type at https://protobuf.dev/reference/protobuf/google.protobuf/#duration; however, the actual maximum run time for a job will be limited to the maximum run time for a job listed at https://cloud.google.com/batch/quotas#max-job-duration.",
      ).optional(),
      runnables: z.array(z.object({
        alwaysRun: z.unknown().describe(
          "By default, after a Runnable fails, no further Runnable are executed. This flag indicates that this Runnable must be run even if the Task has already failed. This is useful for Runnables that copy output files off of the VM or for debugging. The always_run flag does not override the Task's overall max_run_duration. If the max_run_duration has expired then no further Runnables will execute, not even always_run Runnables.",
        ).optional(),
        background: z.unknown().describe(
          "Normally, a runnable that doesn't exit causes its task to fail. However, you can set this field to `true` to configure a background runnable. Background runnables are allowed continue running in the background while the task executes subsequent runnables. For example, background runnables are useful for providing services to other runnables or providing debugging-support tools like SSH servers. Specifically, background runnables are killed automatically (if they have not already exited) a short time after all foreground runnables have completed. Even though this is likely to result in a non-zero exit status for the background runnable, these automatic kills are not treated as task failures.",
        ).optional(),
        barrier: z.unknown().describe(
          "A barrier runnable automatically blocks the execution of subsequent runnables until all the tasks in the task group reach the barrier.",
        ).optional(),
        container: z.unknown().describe("Container runnable.").optional(),
        displayName: z.unknown().describe(
          "Optional. DisplayName is an optional field that can be provided by the caller. If provided, it will be used in logs and other outputs to identify the script, making it easier for users to understand the logs. If not provided the index of the runnable will be used for outputs.",
        ).optional(),
        environment: z.unknown().describe(
          "An Environment describes a collection of environment variables to set when executing Tasks.",
        ).optional(),
        ignoreExitStatus: z.unknown().describe(
          "Normally, a runnable that returns a non-zero exit status fails and causes the task to fail. However, you can set this field to `true` to allow the task to continue executing its other runnables even if this runnable fails.",
        ).optional(),
        labels: z.unknown().describe("Labels for this Runnable.").optional(),
        script: z.unknown().describe("Script runnable.").optional(),
        timeout: z.unknown().describe("Timeout for this Runnable.").optional(),
      })).describe(
        "Required. The sequence of one or more runnables (executable scripts, executable containers, and/or barriers) for each task in this task group to run. Each task runs this list of runnables in order. For a task to succeed, all of its script and container runnables each must meet at least one of the following conditions: + The runnable exited with a zero status. + The runnable didn't finish, but you enabled its `background` subfield. + The runnable exited with a non-zero status, but you enabled its `ignore_exit_status` subfield.",
      ).optional(),
      volumes: z.array(z.object({
        deviceName: z.unknown().describe(
          "Device name of an attached disk volume, which should align with a device_name specified by job.allocation_policy.instances[0].policy.disks[i].device_name or defined by the given instance template in job.allocation_policy.instances[0].instance_template.",
        ).optional(),
        gcs: z.unknown().describe("Represents a Google Cloud Storage volume.")
          .optional(),
        mountOptions: z.unknown().describe(
          "Mount options vary based on the type of storage volume: * For a Cloud Storage bucket, all the mount options provided by the [`gcsfuse` tool](https://cloud.google.com/storage/docs/gcsfuse-cli) are supported. * For an existing persistent disk, all mount options provided by the [`mount` command](https://man7.org/linux/man-pages/man8/mount.8.html) except writing are supported. This is due to restrictions of [multi-writer mode](https://cloud.google.com/compute/docs/disks/sharing-disks-between-vms). * For any other disk or a Network File System (NFS), all the mount options provided by the `mount` command are supported.",
        ).optional(),
        mountPath: z.unknown().describe(
          "The mount path for the volume, e.g. /mnt/disks/share.",
        ).optional(),
        nfs: z.unknown().describe("Represents an NFS volume.").optional(),
      })).describe("Volumes to mount before running Tasks using this TaskSpec.")
        .optional(),
    }).describe("Spec of a task").optional(),
  })).describe(
    "Required. TaskGroups in the Job. Only one TaskGroup is supported now.",
  ).optional(),
  jobId: z.string().describe(
    "ID used to uniquely identify the Job within its parent scope. This field should contain at most 63 characters and must start with lowercase characters. Only lowercase characters, numbers and '-' are accepted. The '-' character cannot be the first or the last one. A system generated ID will be used if the field is not set. The job.name field in the request will be ignored and the created resource name of the Job will be \"{parent}/jobs/{job_id}\".",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  allocationPolicy: z.object({
    instances: z.array(z.object({
      blockProjectSshKeys: z.boolean(),
      installGpuDrivers: z.boolean(),
      installOpsAgent: z.boolean(),
      instanceTemplate: z.string(),
      policy: z.object({
        accelerators: z.array(z.unknown()),
        bootDisk: z.object({
          diskInterface: z.unknown(),
          image: z.unknown(),
          sizeGb: z.unknown(),
          snapshot: z.unknown(),
          type: z.unknown(),
        }),
        disks: z.array(z.unknown()),
        machineType: z.string(),
        minCpuPlatform: z.string(),
        provisioningModel: z.string(),
        reservation: z.string(),
      }),
    })),
    labels: z.record(z.string(), z.unknown()),
    location: z.object({
      allowedLocations: z.array(z.string()),
    }),
    network: z.object({
      networkInterfaces: z.array(z.object({
        network: z.string(),
        noExternalIpAddress: z.boolean(),
        subnetwork: z.string(),
      })),
    }),
    placement: z.object({
      collocation: z.string(),
      maxDistance: z.string(),
    }),
    serviceAccount: z.object({
      email: z.string(),
      scopes: z.array(z.string()),
    }),
    tags: z.array(z.string()),
  }).optional(),
  createTime: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  logsPolicy: z.object({
    cloudLoggingOption: z.object({
      useGenericTaskMonitoredResource: z.boolean(),
    }),
    destination: z.string(),
    logsPath: z.string(),
  }).optional(),
  name: z.string(),
  notifications: z.array(z.object({
    message: z.object({
      newJobState: z.string(),
      newTaskState: z.string(),
      type: z.string(),
    }),
    pubsubTopic: z.string(),
  })).optional(),
  priority: z.string().optional(),
  status: z.object({
    runDuration: z.string(),
    state: z.string(),
    statusEvents: z.array(z.object({
      description: z.string(),
      eventTime: z.string(),
      taskExecution: z.object({
        exitCode: z.number(),
      }),
      taskState: z.string(),
      type: z.string(),
    })),
    taskGroups: z.record(z.string(), z.unknown()),
  }).optional(),
  taskGroups: z.array(z.object({
    name: z.string(),
    parallelism: z.string(),
    permissiveSsh: z.boolean(),
    requireHostsFile: z.boolean(),
    runAsNonRoot: z.boolean(),
    schedulingPolicy: z.string(),
    taskCount: z.string(),
    taskCountPerNode: z.string(),
    taskEnvironments: z.array(z.object({
      encryptedVariables: z.object({
        cipherText: z.unknown(),
        keyName: z.unknown(),
      }),
      secretVariables: z.record(z.string(), z.unknown()),
      variables: z.record(z.string(), z.unknown()),
    })),
    taskSpec: z.object({
      computeResource: z.object({
        bootDiskMib: z.string(),
        cpuMilli: z.string(),
        memoryMib: z.string(),
      }),
      environment: z.object({
        encryptedVariables: z.object({
          cipherText: z.unknown(),
          keyName: z.unknown(),
        }),
        secretVariables: z.record(z.string(), z.unknown()),
        variables: z.record(z.string(), z.unknown()),
      }),
      environments: z.record(z.string(), z.unknown()),
      lifecyclePolicies: z.array(z.object({
        action: z.unknown(),
        actionCondition: z.unknown(),
      })),
      maxRetryCount: z.number(),
      maxRunDuration: z.string(),
      runnables: z.array(z.object({
        alwaysRun: z.unknown(),
        background: z.unknown(),
        barrier: z.unknown(),
        container: z.unknown(),
        displayName: z.unknown(),
        environment: z.unknown(),
        ignoreExitStatus: z.unknown(),
        labels: z.unknown(),
        script: z.unknown(),
        timeout: z.unknown(),
      })),
      volumes: z.array(z.object({
        deviceName: z.unknown(),
        gcs: z.unknown(),
        mountOptions: z.unknown(),
        mountPath: z.unknown(),
        nfs: z.unknown(),
      })),
    }),
  })).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  allocationPolicy: z.object({
    instances: z.array(z.object({
      blockProjectSshKeys: z.boolean().describe(
        "Optional. Set this field to `true` if you want Batch to block project-level SSH keys from accessing this job's VMs. Alternatively, you can configure the job to specify a VM instance template that blocks project-level SSH keys. In either case, Batch blocks project-level SSH keys while creating the VMs for this job. Batch allows project-level SSH keys for a job's VMs only if all the following are true: + This field is undefined or set to `false`. + The job's VM instance template (if any) doesn't block project-level SSH keys. Notably, you can override this behavior by manually updating a VM to block or allow project-level SSH keys. For more information about blocking project-level SSH keys, see the Compute Engine documentation: https://cloud.google.com/compute/docs/connect/restrict-ssh-keys#block-keys",
      ).optional(),
      installGpuDrivers: z.boolean().describe(
        "Set this field true if you want Batch to help fetch drivers from a third party location and install them for GPUs specified in `policy.accelerators` or `instance_template` on your behalf. Default is false. For Container-Optimized Image cases, Batch will install the accelerator driver following milestones of https://cloud.google.com/container-optimized-os/docs/release-notes. For non Container-Optimized Image cases, following https://github.com/GoogleCloudPlatform/compute-gpu-installation/blob/main/linux/install_gpu_driver.py.",
      ).optional(),
      installOpsAgent: z.boolean().describe(
        "Optional. Set this field true if you want Batch to install Ops Agent on your behalf. Default is false.",
      ).optional(),
      instanceTemplate: z.string().describe(
        "Name of an instance template used to create VMs. Named the field as 'instance_template' instead of 'template' to avoid C++ keyword conflict. Batch only supports global instance templates from the same project as the job. You can specify the global instance template as a full or partial URL.",
      ).optional(),
      policy: z.object({
        accelerators: z.array(z.unknown()).describe(
          "The accelerators attached to each VM instance.",
        ).optional(),
        bootDisk: z.object({
          diskInterface: z.unknown().describe(
            'Local SSDs are available through both "SCSI" and "NVMe" interfaces. If not indicated, "NVMe" will be the default one for local ssds. This field is ignored for persistent disks as the interface is chosen automatically. See https://cloud.google.com/compute/docs/disks/persistent-disks#choose_an_interface.',
          ).optional(),
          image: z.unknown().describe(
            "URL for a VM image to use as the data source for this disk. For example, the following are all valid URLs: * Specify the image by its family name: projects/{project}/global/images/family/{image_family} * Specify the image version: projects/{project}/global/images/{image_version} You can also use Batch customized image in short names. The following image values are supported for a boot disk: * `batch-debian`: use Batch Debian images. * `batch-cos`: use Batch Container-Optimized images. * `batch-hpc-rocky`: use Batch HPC Rocky Linux images.",
          ).optional(),
          sizeGb: z.unknown().describe(
            "Disk size in GB. **Non-Boot Disk**: If the `type` specifies a persistent disk, this field is ignored if `data_source` is set as `image` or `snapshot`. If the `type` specifies a local SSD, this field should be a multiple of 375 GB, otherwise, the final size will be the next greater multiple of 375 GB. **Boot Disk**: Batch will calculate the boot disk size based on source image and task requirements if you do not speicify the size. If both this field and the `boot_disk_mib` field in task spec's `compute_resource` are defined, Batch will only honor this field. Also, this field should be no smaller than the source disk's size when the `data_source` is set as `snapshot` or `image`. For example, if you set an image as the `data_source` field and the image's default disk size 30 GB, you can only use this field to make the disk larger or equal to 30 GB.",
          ).optional(),
          snapshot: z.unknown().describe(
            "Name of a snapshot used as the data source. Snapshot is not supported as boot disk now.",
          ).optional(),
          type: z.unknown().describe(
            'Disk type as shown in `gcloud compute disk-types list`. For example, local SSD uses type "local-ssd". Persistent disks and boot disks use "pd-balanced", "pd-extreme", "pd-ssd" or "pd-standard". If not specified, "pd-standard" will be used as the default type for non-boot disks, "pd-balanced" will be used as the default type for boot disks.',
          ).optional(),
        }).describe(
          "A new persistent disk or a local ssd. A VM can only have one local SSD setting but multiple local SSD partitions. See https://cloud.google.com/compute/docs/disks#pdspecs and https://cloud.google.com/compute/docs/disks#localssds.",
        ).optional(),
        disks: z.array(z.unknown()).describe(
          "Non-boot disks to be attached for each VM created by this InstancePolicy. New disks will be deleted when the VM is deleted. A non-boot disk is a disk that can be of a device with a file system or a raw storage drive that is not ready for data storage and accessing.",
        ).optional(),
        machineType: z.string().describe("The Compute Engine machine type.")
          .optional(),
        minCpuPlatform: z.string().describe(
          "The minimum CPU platform. See https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform.",
        ).optional(),
        provisioningModel: z.enum([
          "PROVISIONING_MODEL_UNSPECIFIED",
          "STANDARD",
          "SPOT",
          "PREEMPTIBLE",
          "RESERVATION_BOUND",
          "FLEX_START",
        ]).describe("The provisioning model.").optional(),
        reservation: z.string().describe(
          'Optional. If not specified (default), VMs will consume any applicable reservation. If "NO_RESERVATION" is specified, VMs will not consume any reservation. Otherwise, if specified, VMs will consume only the specified reservation.',
        ).optional(),
      }).describe(
        "InstancePolicy describes an instance type and resources attached to each VM created by this InstancePolicy.",
      ).optional(),
    })).describe(
      "Describe instances that can be created by this AllocationPolicy. Only instances[0] is supported now.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      'Custom labels to apply to the job and all the Compute Engine resources that both are created by this allocation policy and support labels. Use labels to group and describe the resources they are applied to. Batch automatically applies predefined labels and supports multiple `labels` fields for each job, which each let you apply custom labels to various resources. Label names that start with "goog-" or "google-" are reserved for predefined labels. For more information about labels with Batch, see [Organize resources using labels](https://cloud.google.com/batch/docs/organize-resources-using-labels).',
    ).optional(),
    location: z.object({
      allowedLocations: z.array(z.string()).describe(
        'A list of allowed location names represented by internal URLs. Each location can be a region or a zone. Only one region or multiple zones in one region is supported now. For example, ["regions/us-central1"] allow VMs in any zones in region us-central1. ["zones/us-central1-a", "zones/us-central1-c"] only allow VMs in zones us-central1-a and us-central1-c. Mixing locations from different regions would cause errors. For example, ["regions/us-central1", "zones/us-central1-a", "zones/us-central1-b", "zones/us-west1-a"] contains locations from two distinct regions: us-central1 and us-west1. This combination will trigger an error.',
      ).optional(),
    }).optional(),
    network: z.object({
      networkInterfaces: z.array(z.object({
        network: z.string().describe(
          "The URL of an existing network resource. You can specify the network as a full or partial URL. For example, the following are all valid URLs: * https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network} * projects/{project}/global/networks/{network} * global/networks/{network}",
        ).optional(),
        noExternalIpAddress: z.boolean().describe(
          "Default is false (with an external IP address). Required if no external public IP address is attached to the VM. If no external public IP address, additional configuration is required to allow the VM to access Google Services. See https://cloud.google.com/vpc/docs/configure-private-google-access and https://cloud.google.com/nat/docs/gce-example#create-nat for more information.",
        ).optional(),
        subnetwork: z.string().describe(
          "The URL of an existing subnetwork resource in the network. You can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs: * https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/subnetworks/{subnetwork} * projects/{project}/regions/{region}/subnetworks/{subnetwork} * regions/{region}/subnetworks/{subnetwork}",
        ).optional(),
      })).describe("Network configurations.").optional(),
    }).describe("NetworkPolicy describes VM instance network configurations.")
      .optional(),
    placement: z.object({
      collocation: z.string().describe(
        "UNSPECIFIED vs. COLLOCATED (default UNSPECIFIED). Use COLLOCATED when you want VMs to be located close to each other for low network latency between the VMs. No placement policy will be generated when collocation is UNSPECIFIED.",
      ).optional(),
      maxDistance: z.string().describe(
        "When specified, causes the job to fail if more than max_distance logical switches are required between VMs. Batch uses the most compact possible placement of VMs even when max_distance is not specified. An explicit max_distance makes that level of compactness a strict requirement. Not yet implemented",
      ).optional(),
    }).describe(
      "PlacementPolicy describes a group placement policy for the VMs controlled by this AllocationPolicy.",
    ).optional(),
    serviceAccount: z.object({
      email: z.string().describe("Email address of the service account.")
        .optional(),
      scopes: z.array(z.string()).describe(
        "List of scopes to be enabled for this service account.",
      ).optional(),
    }).describe("Carries information about a Google Cloud service account.")
      .optional(),
    tags: z.array(z.string()).describe(
      "Optional. Tags applied to the VM instances. The tags identify valid sources or targets for network firewalls. Each tag must be 1-63 characters long, and comply with [RFC1035](https://www.ietf.org/rfc/rfc1035.txt).",
    ).optional(),
  }).describe(
    "A Job's resource allocation policy describes when, where, and how compute resources should be allocated for the Job.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Custom labels to apply to the job and any Cloud Logging [LogEntry](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry) that it generates. Use labels to group and describe the resources they are applied to. Batch automatically applies predefined labels and supports multiple `labels` fields for each job, which each let you apply custom labels to various resources. Label names that start with "goog-" or "google-" are reserved for predefined labels. For more information about labels with Batch, see [Organize resources using labels](https://cloud.google.com/batch/docs/organize-resources-using-labels).',
  ).optional(),
  logsPolicy: z.object({
    cloudLoggingOption: z.object({
      useGenericTaskMonitoredResource: z.boolean().describe(
        "Optional. Set this field to `true` to change the [monitored resource type](https://cloud.google.com/monitoring/api/resources) for Cloud Logging logs generated by this Batch job from the [`batch.googleapis.com/Job`](https://cloud.google.com/monitoring/api/resources#tag_batch.googleapis.com/Job) type to the formerly used [`generic_task`](https://cloud.google.com/monitoring/api/resources#tag_generic_task) type.",
      ).optional(),
    }).describe(
      "`CloudLoggingOption` contains additional settings for Cloud Logging logs generated by Batch job.",
    ).optional(),
    destination: z.enum(["DESTINATION_UNSPECIFIED", "CLOUD_LOGGING", "PATH"])
      .describe("If and where logs should be saved.").optional(),
    logsPath: z.string().describe(
      "When `destination` is set to `PATH`, you must set this field to the path where you want logs to be saved. This path can point to a local directory on the VM or (if congifured) a directory under the mount path of any Cloud Storage bucket, network file system (NFS), or writable persistent disk that is mounted to the job. For example, if the job has a bucket with `mountPath` set to `/mnt/disks/my-bucket`, you can write logs to the root directory of the `remotePath` of that bucket by setting this field to `/mnt/disks/my-bucket/`.",
    ).optional(),
  }).describe(
    "LogsPolicy describes if and how a job's logs are preserved. Logs include information that is automatically written by the Batch service agent and any information that you configured the job's runnables to write to the `stdout` or `stderr` streams.",
  ).optional(),
  notifications: z.array(z.object({
    message: z.object({
      newJobState: z.enum([
        "STATE_UNSPECIFIED",
        "QUEUED",
        "SCHEDULED",
        "RUNNING",
        "SUCCEEDED",
        "FAILED",
        "DELETION_IN_PROGRESS",
        "CANCELLATION_IN_PROGRESS",
        "CANCELLED",
      ]).describe("The new job state.").optional(),
      newTaskState: z.enum([
        "STATE_UNSPECIFIED",
        "PENDING",
        "ASSIGNED",
        "RUNNING",
        "FAILED",
        "SUCCEEDED",
        "UNEXECUTED",
      ]).describe("The new task state.").optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "JOB_STATE_CHANGED",
        "TASK_STATE_CHANGED",
      ]).describe("The message type.").optional(),
    }).describe(
      "Message details. Describe the conditions under which messages will be sent. If no attribute is defined, no message will be sent by default. One message should specify either the job or the task level attributes, but not both. For example, job level: JOB_STATE_CHANGED and/or a specified new_job_state; task level: TASK_STATE_CHANGED and/or a specified new_task_state.",
    ).optional(),
    pubsubTopic: z.string().describe(
      "The Pub/Sub topic where notifications for the job, like state changes, will be published. If undefined, no Pub/Sub notifications are sent for this job. Specify the topic using the following format: `projects/{project}/topics/{topic}`. Notably, if you want to specify a Pub/Sub topic that is in a different project than the job, your administrator must grant your project's Batch service agent permission to publish to that topic. For more information about configuring Pub/Sub notifications for a job, see https://cloud.google.com/batch/docs/enable-notifications.",
    ).optional(),
  })).describe("Notification configurations.").optional(),
  priority: z.string().describe(
    "Priority of the Job. The valid value range is [0, 100). Default value is 0. Higher value indicates higher priority. A job with higher priority value is more likely to run earlier if all other requirements are satisfied.",
  ).optional(),
  status: z.object({
    runDuration: z.string().describe(
      "The duration of time that the Job spent in status RUNNING.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "QUEUED",
      "SCHEDULED",
      "RUNNING",
      "SUCCEEDED",
      "FAILED",
      "DELETION_IN_PROGRESS",
      "CANCELLATION_IN_PROGRESS",
      "CANCELLED",
    ]).describe("Job state").optional(),
    statusEvents: z.array(z.object({
      description: z.string().describe("Description of the event.").optional(),
      eventTime: z.string().describe("The time this event occurred.")
        .optional(),
      taskExecution: z.object({
        exitCode: z.number().int().describe(
          "The exit code of a finished task. If the task succeeded, the exit code will be 0. If the task failed but not due to the following reasons, the exit code will be 50000. Otherwise, it can be from different sources: * Batch known failures: https://cloud.google.com/batch/docs/troubleshooting#reserved-exit-codes. * Batch runnable execution failures; you can rely on Batch logs to further diagnose: https://cloud.google.com/batch/docs/analyze-job-using-logs. If there are multiple runnables failures, Batch only exposes the first error.",
        ).optional(),
      }).describe(
        "This Task Execution field includes detail information for task execution procedures, based on StatusEvent types.",
      ).optional(),
      taskState: z.enum([
        "STATE_UNSPECIFIED",
        "PENDING",
        "ASSIGNED",
        "RUNNING",
        "FAILED",
        "SUCCEEDED",
        "UNEXECUTED",
      ]).describe(
        "Task State. This field is only defined for task-level status events.",
      ).optional(),
      type: z.string().describe("Type of the event.").optional(),
    })).describe("Job status events").optional(),
    taskGroups: z.record(
      z.string(),
      z.object({
        counts: z.record(z.string(), z.string()).describe(
          "Count of task in each state in the TaskGroup. The map key is task state name.",
        ).optional(),
        instances: z.array(z.object({
          bootDisk: z.unknown().describe(
            "A new persistent disk or a local ssd. A VM can only have one local SSD setting but multiple local SSD partitions. See https://cloud.google.com/compute/docs/disks#pdspecs and https://cloud.google.com/compute/docs/disks#localssds.",
          ).optional(),
          machineType: z.unknown().describe("The Compute Engine machine type.")
            .optional(),
          provisioningModel: z.unknown().describe(
            "The VM instance provisioning model.",
          ).optional(),
          taskPack: z.unknown().describe(
            "The max number of tasks can be assigned to this instance type.",
          ).optional(),
        })).describe("Status of instances allocated for the TaskGroup.")
          .optional(),
      }),
    ).describe(
      "Aggregated task status for each TaskGroup in the Job. The map key is TaskGroup ID.",
    ).optional(),
  }).describe("Job status.").optional(),
  taskGroups: z.array(z.object({
    name: z.string().describe(
      'Output only. TaskGroup name. The system generates this field based on parent Job name. For example: "projects/123456/locations/us-west1/jobs/job01/taskGroups/group01".',
    ).optional(),
    parallelism: z.string().describe(
      "Max number of tasks that can run in parallel. Default to min(task_count, parallel tasks per job limit). See: [Job Limits](https://cloud.google.com/batch/quotas#job_limits). Field parallelism must be 1 if the scheduling_policy is IN_ORDER.",
    ).optional(),
    permissiveSsh: z.boolean().describe(
      "When true, Batch will configure SSH to allow passwordless login between VMs running the Batch tasks in the same TaskGroup.",
    ).optional(),
    requireHostsFile: z.boolean().describe(
      "When true, Batch will populate a file with a list of all VMs assigned to the TaskGroup and set the BATCH_HOSTS_FILE environment variable to the path of that file. Defaults to false. The host file supports up to 1000 VMs.",
    ).optional(),
    runAsNonRoot: z.boolean().describe(
      "Optional. If not set or set to false, Batch uses the root user to execute runnables. If set to true, Batch runs the runnables using a non-root user. Currently, the non-root user Batch used is generated by OS Login. For more information, see [About OS Login](https://cloud.google.com/compute/docs/oslogin).",
    ).optional(),
    schedulingPolicy: z.enum([
      "SCHEDULING_POLICY_UNSPECIFIED",
      "AS_SOON_AS_POSSIBLE",
      "IN_ORDER",
    ]).describe(
      "Scheduling policy for Tasks in the TaskGroup. The default value is AS_SOON_AS_POSSIBLE.",
    ).optional(),
    taskCount: z.string().describe(
      "Number of Tasks in the TaskGroup. Default is 1.",
    ).optional(),
    taskCountPerNode: z.string().describe(
      "Max number of tasks that can be run on a VM at the same time. If not specified, the system will decide a value based on available compute resources on a VM and task requirements.",
    ).optional(),
    taskEnvironments: z.array(z.object({
      encryptedVariables: z.object({
        cipherText: z.unknown().describe(
          "The value of the cipherText response from the `encrypt` method.",
        ).optional(),
        keyName: z.unknown().describe(
          "The name of the KMS key that will be used to decrypt the cipher text.",
        ).optional(),
      }).optional(),
      secretVariables: z.record(z.string(), z.unknown()).describe(
        "A map of environment variable names to Secret Manager secret names. The VM will access the named secrets to set the value of each environment variable.",
      ).optional(),
      variables: z.record(z.string(), z.unknown()).describe(
        "A map of environment variable names to values.",
      ).optional(),
    })).describe(
      "An array of environment variable mappings, which are passed to Tasks with matching indices. If task_environments is used then task_count should not be specified in the request (and will be ignored). Task count will be the length of task_environments. Tasks get a BATCH_TASK_INDEX and BATCH_TASK_COUNT environment variable, in addition to any environment variables set in task_environments, specifying the number of Tasks in the Task's parent TaskGroup, and the specific Task's index in the TaskGroup (0 through BATCH_TASK_COUNT - 1).",
    ).optional(),
    taskSpec: z.object({
      computeResource: z.object({
        bootDiskMib: z.string().describe(
          "Extra boot disk size in MiB for each task.",
        ).optional(),
        cpuMilli: z.string().describe(
          "The milliCPU count. `cpuMilli` defines the amount of CPU resources per task in milliCPU units. For example, `1000` corresponds to 1 vCPU per task. If undefined, the default value is `2000`. If you also define the VM's machine type using the `machineType` in [InstancePolicy](https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicy) field or inside the `instanceTemplate` in the [InstancePolicyOrTemplate](https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicyortemplate) field, make sure the CPU resources for both fields are compatible with each other and with how many tasks you want to allow to run on the same VM at the same time. For example, if you specify the `n2-standard-2` machine type, which has 2 vCPUs each, you are recommended to set `cpuMilli` no more than `2000`, or you are recommended to run two tasks on the same VM if you set `cpuMilli` to `1000` or less.",
        ).optional(),
        memoryMib: z.string().describe(
          "Memory in MiB. `memoryMib` defines the amount of memory per task in MiB units. If undefined, the default value is `2000`. If you also define the VM's machine type using the `machineType` in [InstancePolicy](https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicy) field or inside the `instanceTemplate` in the [InstancePolicyOrTemplate](https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicyortemplate) field, make sure the memory resources for both fields are compatible with each other and with how many tasks you want to allow to run on the same VM at the same time. For example, if you specify the `n2-standard-2` machine type, which has 8 GiB each, you are recommended to set `memoryMib` to no more than `8192`, or you are recommended to run two tasks on the same VM if you set `memoryMib` to `4096` or less.",
        ).optional(),
      }).describe(
        "Compute resource requirements. ComputeResource defines the amount of resources required for each task. Make sure your tasks have enough resources to successfully run. If you also define the types of resources for a job to use with the [InstancePolicyOrTemplate](https://cloud.google.com/batch/docs/reference/rest/v1/projects.locations.jobs#instancepolicyortemplate) field, make sure both fields are compatible with each other.",
      ).optional(),
      environment: z.object({
        encryptedVariables: z.object({
          cipherText: z.unknown().describe(
            "The value of the cipherText response from the `encrypt` method.",
          ).optional(),
          keyName: z.unknown().describe(
            "The name of the KMS key that will be used to decrypt the cipher text.",
          ).optional(),
        }).optional(),
        secretVariables: z.record(z.string(), z.unknown()).describe(
          "A map of environment variable names to Secret Manager secret names. The VM will access the named secrets to set the value of each environment variable.",
        ).optional(),
        variables: z.record(z.string(), z.unknown()).describe(
          "A map of environment variable names to values.",
        ).optional(),
      }).describe(
        "An Environment describes a collection of environment variables to set when executing Tasks.",
      ).optional(),
      environments: z.record(z.string(), z.string()).describe(
        "Deprecated: please use environment(non-plural) instead.",
      ).optional(),
      lifecyclePolicies: z.array(z.object({
        action: z.unknown().describe(
          "Action to execute when ActionCondition is true. When RETRY_TASK is specified, we will retry failed tasks if we notice any exit code match and fail tasks if no match is found. Likewise, when FAIL_TASK is specified, we will fail tasks if we notice any exit code match and retry tasks if no match is found.",
        ).optional(),
        actionCondition: z.unknown().describe(
          "Conditions for actions to deal with task failures.",
        ).optional(),
      })).describe(
        "Lifecycle management schema when any task in a task group is failed. Currently we only support one lifecycle policy. When the lifecycle policy condition is met, the action in the policy will execute. If task execution result does not meet with the defined lifecycle policy, we consider it as the default policy. Default policy means if the exit code is 0, exit task. If task ends with non-zero exit code, retry the task with max_retry_count.",
      ).optional(),
      maxRetryCount: z.number().int().describe(
        "Maximum number of retries on failures. The default, 0, which means never retry. The valid value range is [0, 10].",
      ).optional(),
      maxRunDuration: z.string().describe(
        "Maximum duration the task should run before being automatically retried (if enabled) or automatically failed. Format the value of this field as a time limit in seconds followed by `s`—for example, `3600s` for 1 hour. The field accepts any value between 0 and the maximum listed for the `Duration` field type at https://protobuf.dev/reference/protobuf/google.protobuf/#duration; however, the actual maximum run time for a job will be limited to the maximum run time for a job listed at https://cloud.google.com/batch/quotas#max-job-duration.",
      ).optional(),
      runnables: z.array(z.object({
        alwaysRun: z.unknown().describe(
          "By default, after a Runnable fails, no further Runnable are executed. This flag indicates that this Runnable must be run even if the Task has already failed. This is useful for Runnables that copy output files off of the VM or for debugging. The always_run flag does not override the Task's overall max_run_duration. If the max_run_duration has expired then no further Runnables will execute, not even always_run Runnables.",
        ).optional(),
        background: z.unknown().describe(
          "Normally, a runnable that doesn't exit causes its task to fail. However, you can set this field to `true` to configure a background runnable. Background runnables are allowed continue running in the background while the task executes subsequent runnables. For example, background runnables are useful for providing services to other runnables or providing debugging-support tools like SSH servers. Specifically, background runnables are killed automatically (if they have not already exited) a short time after all foreground runnables have completed. Even though this is likely to result in a non-zero exit status for the background runnable, these automatic kills are not treated as task failures.",
        ).optional(),
        barrier: z.unknown().describe(
          "A barrier runnable automatically blocks the execution of subsequent runnables until all the tasks in the task group reach the barrier.",
        ).optional(),
        container: z.unknown().describe("Container runnable.").optional(),
        displayName: z.unknown().describe(
          "Optional. DisplayName is an optional field that can be provided by the caller. If provided, it will be used in logs and other outputs to identify the script, making it easier for users to understand the logs. If not provided the index of the runnable will be used for outputs.",
        ).optional(),
        environment: z.unknown().describe(
          "An Environment describes a collection of environment variables to set when executing Tasks.",
        ).optional(),
        ignoreExitStatus: z.unknown().describe(
          "Normally, a runnable that returns a non-zero exit status fails and causes the task to fail. However, you can set this field to `true` to allow the task to continue executing its other runnables even if this runnable fails.",
        ).optional(),
        labels: z.unknown().describe("Labels for this Runnable.").optional(),
        script: z.unknown().describe("Script runnable.").optional(),
        timeout: z.unknown().describe("Timeout for this Runnable.").optional(),
      })).describe(
        "Required. The sequence of one or more runnables (executable scripts, executable containers, and/or barriers) for each task in this task group to run. Each task runs this list of runnables in order. For a task to succeed, all of its script and container runnables each must meet at least one of the following conditions: + The runnable exited with a zero status. + The runnable didn't finish, but you enabled its `background` subfield. + The runnable exited with a non-zero status, but you enabled its `ignore_exit_status` subfield.",
      ).optional(),
      volumes: z.array(z.object({
        deviceName: z.unknown().describe(
          "Device name of an attached disk volume, which should align with a device_name specified by job.allocation_policy.instances[0].policy.disks[i].device_name or defined by the given instance template in job.allocation_policy.instances[0].instance_template.",
        ).optional(),
        gcs: z.unknown().describe("Represents a Google Cloud Storage volume.")
          .optional(),
        mountOptions: z.unknown().describe(
          "Mount options vary based on the type of storage volume: * For a Cloud Storage bucket, all the mount options provided by the [`gcsfuse` tool](https://cloud.google.com/storage/docs/gcsfuse-cli) are supported. * For an existing persistent disk, all mount options provided by the [`mount` command](https://man7.org/linux/man-pages/man8/mount.8.html) except writing are supported. This is due to restrictions of [multi-writer mode](https://cloud.google.com/compute/docs/disks/sharing-disks-between-vms). * For any other disk or a Network File System (NFS), all the mount options provided by the `mount` command are supported.",
        ).optional(),
        mountPath: z.unknown().describe(
          "The mount path for the volume, e.g. /mnt/disks/share.",
        ).optional(),
        nfs: z.unknown().describe("Represents an NFS volume.").optional(),
      })).describe("Volumes to mount before running Tasks using this TaskSpec.")
        .optional(),
    }).describe("Spec of a task").optional(),
  })).describe(
    "Required. TaskGroups in the Job. Only one TaskGroup is supported now.",
  ).optional(),
  jobId: z.string().describe(
    "ID used to uniquely identify the Job within its parent scope. This field should contain at most 63 characters and must start with lowercase characters. Only lowercase characters, numbers and '-' are accepted. The '-' character cannot be the first or the last one. A system generated ID will be used if the field is not set. The job.name field in the request will be ignored and the created resource name of the Job will be \"{parent}/jobs/{job_id}\".",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Batch Jobs. Registered at `@swamp/gcp/batch/jobs`. */
export const model = {
  type: "@swamp/gcp/batch/jobs",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The Cloud Batch Job description.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["allocationPolicy"] !== undefined) {
          body["allocationPolicy"] = g["allocationPolicy"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["logsPolicy"] !== undefined) body["logsPolicy"] = g["logsPolicy"];
        if (g["notifications"] !== undefined) {
          body["notifications"] = g["notifications"];
        }
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["taskGroups"] !== undefined) body["taskGroups"] = g["taskGroups"];
        if (g["jobId"] !== undefined) body["jobId"] = g["jobId"];
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
          undefined,
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
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
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
    delete: {
      description: "Delete the jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
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
      description: "Sync jobs state from GCP",
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
    list: {
      description: "List jobs resources",
      arguments: z.object({
        filter: z.string().describe("List filter.").optional(),
        orderBy: z.string().describe(
          'Optional. Sort results. Supported are "name", "name desc", "create_time", and "create_time desc".',
        ).optional(),
        pageSize: z.number().describe("Page size.").optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          "jobs",
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
      arguments: z.object({
        requestId: z.any().optional(),
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
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "batch.projects.locations.jobs.cancel",
            "path": "v1/{+name}:cancel",
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
