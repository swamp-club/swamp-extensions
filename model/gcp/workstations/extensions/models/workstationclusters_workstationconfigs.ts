// Auto-generated extension model for @swamp/gcp/workstations/workstationclusters-workstationconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Workstations WorkstationClusters.WorkstationConfigs.
 *
 * A workstation configuration resource in the Cloud Workstations API. Workstation configurations act as templates for workstations. The workstation configuration defines details such as the workstation virtual machine (VM) instance type, persistent storage, container image defining environment, which IDE or Code Editor to use, and more. Administrators and platform teams can also use [Identity and Access Management (IAM)](https://cloud.google.com/iam/docs/overview) rules to grant access to teams or to individual developers.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/workstationConfigs/${shortName}`;
}

const BASE_URL = "https://workstations.googleapis.com/";

const GET_CONFIG = {
  "id":
    "workstations.projects.locations.workstationClusters.workstationConfigs.get",
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
  "id":
    "workstations.projects.locations.workstationClusters.workstationConfigs.create",
  "path": "v1/{+parent}/workstationConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
    "workstationConfigId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "workstations.projects.locations.workstationClusters.workstationConfigs.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "workstations.projects.locations.workstationClusters.workstationConfigs.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id":
    "workstations.projects.locations.workstationClusters.workstationConfigs.list",
  "path": "v1/{+parent}/workstationConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  allowedPorts: z.array(z.object({
    first: z.number().int().describe(
      "Required. Starting port number for the current range of ports. Valid ports are 22, 80, and ports within the range 1024-65535.",
    ).optional(),
    last: z.number().int().describe(
      "Required. Ending port number for the current range of ports. Valid ports are 22, 80, and ports within the range 1024-65535.",
    ).optional(),
  })).describe(
    "Optional. A list of PortRanges specifying single ports or ranges of ports that are externally accessible in the workstation. Allowed ports must be one of 22, 80, or within range 1024-65535. If not specified defaults to ports 22, 80, and ports 1024-65535.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Client-specified annotations.",
  ).optional(),
  container: z.object({
    args: z.array(z.string()).describe(
      "Optional. Arguments passed to the entrypoint.",
    ).optional(),
    command: z.array(z.string()).describe(
      "Optional. If set, overrides the default ENTRYPOINT specified by the image.",
    ).optional(),
    env: z.record(z.string(), z.string()).describe(
      "Optional. Environment variables passed to the container's entrypoint.",
    ).optional(),
    image: z.string().describe(
      "Optional. A Docker container image that defines a custom environment. Cloud Workstations provides a number of [preconfigured images](https://cloud.google.com/workstations/docs/preconfigured-base-images), but you can create your own [custom container images](https://cloud.google.com/workstations/docs/custom-container-images). If using a private image, the `host.gceInstance.serviceAccount` field must be specified in the workstation configuration. If using a custom container image, the service account must have [Artifact Registry Reader](https://cloud.google.com/artifact-registry/docs/access-control#roles) permission to pull the specified image. Otherwise, the image must be publicly accessible.",
    ).optional(),
    runAsUser: z.number().int().describe(
      "Optional. If set, overrides the USER specified in the image with the given uid.",
    ).optional(),
    workingDir: z.string().describe(
      "Optional. If set, overrides the default DIR specified by the image.",
    ).optional(),
  }).describe("A Docker container.").optional(),
  disableTcpConnections: z.boolean().describe(
    "Optional. Disables support for plain TCP connections in the workstation. By default the service supports TCP connections through a websocket relay. Setting this option to true disables that relay, which prevents the usage of services that require plain TCP connections, such as SSH. When enabled, all communication must occur over HTTPS or WSS.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name for this workstation configuration.",
  ).optional(),
  enableAuditAgent: z.boolean().describe(
    'Optional. Whether to enable Linux `auditd` logging on the workstation. When enabled, a service_account must also be specified that has `roles/logging.logWriter` and `roles/monitoring.metricWriter` on the project. Operating system audit logging is distinct from [Cloud Audit Logs](https://cloud.google.com/workstations/docs/audit-logging) and [Container output logging](https://cloud.google.com/workstations/docs/container-output-logging#overview). Operating system audit logs are available in the [Cloud Logging](https://cloud.google.com/logging/docs) console by querying: resource.type="gce_instance" log_name:"/logs/linux-auditd"',
  ).optional(),
  encryptionKey: z.object({
    kmsKey: z.string().describe(
      'Immutable. The name of the Google Cloud KMS encryption key. For example, `"projects/PROJECT_ID/locations/REGION/keyRings/KEY_RING/cryptoKeys/KEY_NAME"`. The key must be in the same region as the workstation configuration.',
    ).optional(),
    kmsKeyServiceAccount: z.string().describe(
      "Immutable. The service account to use with the specified KMS key. We recommend that you use a separate service account and follow KMS best practices. For more information, see [Separation of duties](https://cloud.google.com/kms/docs/separation-of-duties) and `gcloud kms keys add-iam-policy-binding` [`--member`](https://cloud.google.com/sdk/gcloud/reference/kms/keys/add-iam-policy-binding#--member).",
    ).optional(),
  }).describe(
    "A customer-managed encryption key (CMEK) for the Compute Engine resources of the associated workstation configuration. Specify the name of your Cloud KMS encryption key and the default service account. We recommend that you use a separate service account and follow [Cloud KMS best practices](https://cloud.google.com/kms/docs/separation-of-duties).",
  ).optional(),
  ephemeralDirectories: z.array(z.object({
    gcePd: z.object({
      diskType: z.string().describe(
        'Optional. Type of the disk to use. Defaults to `"pd-standard"`.',
      ).optional(),
      readOnly: z.boolean().describe(
        "Optional. Whether the disk is read only. If true, the disk may be shared by multiple VMs and source_snapshot must be set.",
      ).optional(),
      sourceImage: z.string().describe(
        "Optional. Name of the disk image to use as the source for the disk. Must be empty if source_snapshot is set. Updating source_image will update content in the ephemeral directory after the workstation is restarted. Only file systems supported by Container-Optimized OS (COS) are explicitly supported. For a list of supported file systems, please refer to the [COS documentation](https://cloud.google.com/container-optimized-os/docs/concepts/supported-filesystems). This field is mutable.",
      ).optional(),
      sourceSnapshot: z.string().describe(
        "Optional. Name of the snapshot to use as the source for the disk. Must be empty if source_image is set. Must be empty if read_only is false. Updating source_snapshot will update content in the ephemeral directory after the workstation is restarted. Only file systems supported by Container-Optimized OS (COS) are explicitly supported. For a list of supported file systems, see [the filesystems available in Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs/concepts/supported-filesystems). This field is mutable.",
      ).optional(),
    }).describe(
      "An EphemeralDirectory is backed by a Compute Engine persistent disk.",
    ).optional(),
    mountPath: z.string().describe(
      "Required. Location of this directory in the running workstation.",
    ).optional(),
  })).describe(
    "Optional. Ephemeral directories which won't persist across workstation sessions.",
  ).optional(),
  grantWorkstationAdminRoleOnCreate: z.boolean().describe(
    "Optional. Grant creator of a workstation `roles/workstations.policyAdmin` role along with `roles/workstations.user` role on the workstation created by them. This allows workstation users to share access to either their entire workstation, or individual ports. Defaults to false.",
  ).optional(),
  host: z.object({
    gceInstance: z.object({
      accelerators: z.array(z.object({
        count: z.number().int().describe(
          "Optional. Number of accelerator cards exposed to the instance.",
        ).optional(),
        type: z.string().describe(
          'Optional. Type of accelerator resource to attach to the instance, for example, `"nvidia-tesla-p100"`.',
        ).optional(),
      })).describe(
        "Optional. A list of the type and count of accelerator cards attached to the instance.",
      ).optional(),
      boostConfigs: z.array(z.object({
        accelerators: z.array(z.unknown()).describe(
          "Optional. A list of the type and count of accelerator cards attached to the boost instance. Defaults to `none`.",
        ).optional(),
        bootDiskSizeGb: z.number().int().describe(
          "Optional. The size of the boot disk for the VM in gigabytes (GB). The minimum boot disk size is `30` GB. Defaults to `50` GB.",
        ).optional(),
        enableNestedVirtualization: z.boolean().describe(
          "Optional. Whether to enable nested virtualization on boosted Cloud Workstations VMs running using this boost configuration. Defaults to false. Nested virtualization lets you run virtual machine (VM) instances inside your workstation. Before enabling nested virtualization, consider the following important considerations. Cloud Workstations instances are subject to the [same restrictions as Compute Engine instances](https://cloud.google.com/compute/docs/instances/nested-virtualization/overview#restrictions): * **Organization policy**: projects, folders, or organizations may be restricted from creating nested VMs if the **Disable VM nested virtualization** constraint is enforced in the organization policy. For more information, see the Compute Engine section, [Checking whether nested virtualization is allowed](https://cloud.google.com/compute/docs/instances/nested-virtualization/managing-constraint#checking_whether_nested_virtualization_is_allowed). * **Performance**: nested VMs might experience a 10% or greater decrease in performance for workloads that are CPU-bound and possibly greater than a 10% decrease for workloads that are input/output bound. * **Machine Type**: nested virtualization can only be enabled on boost configurations that specify a machine_type in the N1 or N2 machine series.",
        ).optional(),
        id: z.string().describe(
          "Required. The ID to be used for the boost configuration.",
        ).optional(),
        machineType: z.string().describe(
          "Optional. The type of machine that boosted VM instances will use—for example, `e2-standard-4`. For more information about machine types that Cloud Workstations supports, see the list of [available machine types](https://cloud.google.com/workstations/docs/available-machine-types). Defaults to `e2-standard-4`.",
        ).optional(),
        poolSize: z.number().int().describe(
          "Optional. The number of boost VMs that the system should keep idle so that workstations can be boosted quickly. Defaults to `0`.",
        ).optional(),
      })).describe(
        "Optional. A list of the boost configurations that workstations created using this workstation configuration are allowed to use. If specified, users will have the option to choose from the list of boost configs when starting a workstation.",
      ).optional(),
      bootDiskSizeGb: z.number().int().describe(
        "Optional. The size of the boot disk for the VM in gigabytes (GB). The minimum boot disk size is `30` GB. Defaults to `50` GB.",
      ).optional(),
      confidentialInstanceConfig: z.object({
        enableConfidentialCompute: z.boolean().describe(
          "Optional. Whether the instance has confidential compute enabled.",
        ).optional(),
      }).describe("A set of Compute Engine Confidential VM instance options.")
        .optional(),
      disablePublicIpAddresses: z.boolean().describe(
        "Optional. When set to true, disables public IP addresses for VMs. If you disable public IP addresses, you must set up Private Google Access or Cloud NAT on your network. If you use Private Google Access and you use `private.googleapis.com` or `restricted.googleapis.com` for Container Registry and Artifact Registry, make sure that you set up DNS records for domains `*.gcr.io` and `*.pkg.dev`. Defaults to false (VMs have public IP addresses).",
      ).optional(),
      disableSsh: z.boolean().describe(
        "Optional. Whether to disable SSH access to the VM.",
      ).optional(),
      enableNestedVirtualization: z.boolean().describe(
        "Optional. Whether to enable nested virtualization on Cloud Workstations VMs created using this workstation configuration. Defaults to false. Nested virtualization lets you run virtual machine (VM) instances inside your workstation. Before enabling nested virtualization, consider the following important considerations. Cloud Workstations instances are subject to the [same restrictions as Compute Engine instances](https://cloud.google.com/compute/docs/instances/nested-virtualization/overview#restrictions): * **Organization policy**: projects, folders, or organizations may be restricted from creating nested VMs if the **Disable VM nested virtualization** constraint is enforced in the organization policy. For more information, see the Compute Engine section, [Checking whether nested virtualization is allowed](https://cloud.google.com/compute/docs/instances/nested-virtualization/managing-constraint#checking_whether_nested_virtualization_is_allowed). * **Performance**: nested VMs might experience a 10% or greater decrease in performance for workloads that are CPU-bound and possibly greater than a 10% decrease for workloads that are input/output bound. * **Machine Type**: nested virtualization can only be enabled on workstation configurations that specify a machine_type in the N1 or N2 machine series.",
      ).optional(),
      instanceMetadata: z.record(z.string(), z.string()).describe(
        "Optional. Custom metadata to apply to Compute Engine instances.",
      ).optional(),
      machineType: z.string().describe(
        'Optional. The type of machine to use for VM instances—for example, `"e2-standard-4"`. For more information about machine types that Cloud Workstations supports, see the list of [available machine types](https://cloud.google.com/workstations/docs/available-machine-types).',
      ).optional(),
      poolSize: z.number().int().describe(
        "Optional. The number of VMs that the system should keep idle so that new workstations can be started quickly for new users. Defaults to `0` in the API.",
      ).optional(),
      pooledInstances: z.number().int().describe(
        "Output only. Number of instances currently available in the pool for faster workstation startup.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. The email address of the service account for Cloud Workstations VMs created with this configuration. When specified, be sure that the service account has `logging.logEntries.create` and `monitoring.timeSeries.create` permissions on the project so it can write logs out to Cloud Logging. If using a custom container image, the service account must have [Artifact Registry Reader](https://cloud.google.com/artifact-registry/docs/access-control#roles) permission to pull the specified image. If you as the administrator want to be able to `ssh` into the underlying VM, you need to set this value to a service account for which you have the `iam.serviceAccounts.actAs` permission. Conversely, if you don't want anyone to be able to `ssh` into the underlying VM, use a service account where no one has that permission. If not set, VMs run with a service account provided by the Cloud Workstations service, and the image must be publicly accessible.",
      ).optional(),
      serviceAccountScopes: z.array(z.string()).describe(
        "Optional. Scopes to grant to the service_account. When specified, users of workstations under this configuration must have `iam.serviceAccounts.actAs` on the service account.",
      ).optional(),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean().describe(
          "Optional. Whether the instance has integrity monitoring enabled.",
        ).optional(),
        enableSecureBoot: z.boolean().describe(
          "Optional. Whether the instance has Secure Boot enabled.",
        ).optional(),
        enableVtpm: z.boolean().describe(
          "Optional. Whether the instance has the vTPM enabled.",
        ).optional(),
      }).describe("A set of Compute Engine Shielded instance options.")
        .optional(),
      startupScriptUri: z.string().describe(
        "Optional. Link to the startup script stored in Cloud Storage. This script will be run on the host workstation VM when the VM is created. The URI must be of the form gs://{bucket-name}/{object-name}. If specifying a startup script, the service account must have [Permission to access the bucket and script file in Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-permissions). Otherwise, the script must be publicly accessible. Note that the service regularly updates the OS version of the host VM, and it is the responsibility of the user to ensure the script stays compatible with the OS version.",
      ).optional(),
      tags: z.array(z.string()).describe(
        "Optional. Network tags to add to the Compute Engine VMs backing the workstations. This option applies [network tags](https://cloud.google.com/vpc/docs/add-remove-network-tags) to VMs created with this configuration. These network tags enable the creation of [firewall rules](https://cloud.google.com/workstations/docs/configure-firewall-rules).",
      ).optional(),
      vmTags: z.record(z.string(), z.string()).describe(
        "Optional. Resource manager tags to be bound to this instance. Tag keys and values have the same definition as [resource manager tags](https://cloud.google.com/resource-manager/docs/tags/tags-overview). Keys must be in the format `tagKeys/{tag_key_id}`, and values are in the format `tagValues/456`.",
      ).optional(),
    }).describe("A runtime using a Compute Engine instance.").optional(),
  }).describe("Runtime host for a workstation.").optional(),
  idleTimeout: z.string().describe(
    'Optional. Number of seconds to wait before automatically stopping a workstation after it last received user traffic. A value of `"0s"` indicates that Cloud Workstations VMs created with this configuration should never time out due to idleness. Provide [duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#duration) terminated by `s` for seconds—for example, `"7200s"` (2 hours). The default is `"1200s"` (20 minutes).',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. [Labels](https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation configuration and that are also propagated to the underlying Compute Engine resources.",
  ).optional(),
  maxUsableWorkstations: z.number().int().describe(
    "Optional. Maximum number of workstations under this configuration a user can have `workstations.workstation.use` permission on. Only enforced on CreateWorkstation API calls on the user issuing the API request. Can be overridden by: - granting a user workstations.workstationConfigs.exemptMaxUsableWorkstationLimit permission, or - having a user with that permission create a workstation and granting another user `workstations.workstation.use` permission on that workstation. If not specified, defaults to `0`, which indicates unlimited.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Full name of this workstation configuration.",
  ).optional(),
  persistentDirectories: z.array(z.object({
    gceHd: z.object({
      archiveTimeout: z.string().describe(
        'Optional. Number of seconds to wait after initially creating or subsequently shutting down the workstation before converting its disk into a snapshot. This generally saves costs at the expense of greater startup time on next workstation start, as the service will need to create a disk from the archival snapshot. A value of `"0s"` indicates that the disk will never be archived.',
      ).optional(),
      reclaimPolicy: z.enum(["RECLAIM_POLICY_UNSPECIFIED", "DELETE", "RETAIN"])
        .describe(
          "Optional. Whether the persistent disk should be deleted when the workstation is deleted. Valid values are `DELETE` and `RETAIN`. Defaults to `DELETE`.",
        ).optional(),
      sizeGb: z.number().int().describe(
        "Optional. The GB capacity of a persistent home directory for each workstation created with this configuration. Must be empty if source_snapshot is set. Valid values are `10`, `50`, `100`, `200`, `500`, or `1000`. Defaults to `200`.",
      ).optional(),
      sourceSnapshot: z.string().describe(
        "Optional. Name of the snapshot to use as the source for the disk. If set, size_gb must be empty. Must be formatted as ext4 file system with no partitions.",
      ).optional(),
    }).describe(
      "A Persistent Directory backed by a Compute Engine [Hyperdisk Balanced High Availability Disk](https://cloud.google.com/compute/docs/disks/hd-types/hyperdisk-balanced-ha). This is a high-availability block storage solution that offers a balance between performance and cost for most general-purpose workloads.",
    ).optional(),
    gcePd: z.object({
      archiveTimeout: z.string().describe(
        'Optional. Number of seconds to wait after initially creating or subsequently shutting down the workstation before converting its disk into a snapshot. This generally saves costs at the expense of greater startup time on next workstation start, as the service will need to create a disk from the archival snapshot. A value of `"0s"` indicates that the disk will never be archived.',
      ).optional(),
      diskType: z.string().describe(
        'Optional. The [type of the persistent disk](https://cloud.google.com/compute/docs/disks#disk-types) for the home directory. Defaults to `"pd-standard"`.',
      ).optional(),
      fsType: z.string().describe(
        'Optional. Type of file system that the disk should be formatted with. The workstation image must support this file system type. Must be empty if source_snapshot is set. Defaults to `"ext4"`.',
      ).optional(),
      reclaimPolicy: z.enum(["RECLAIM_POLICY_UNSPECIFIED", "DELETE", "RETAIN"])
        .describe(
          "Optional. Whether the persistent disk should be deleted when the workstation is deleted. Valid values are `DELETE` and `RETAIN`. Defaults to `DELETE`.",
        ).optional(),
      sizeGb: z.number().int().describe(
        'Optional. The GB capacity of a persistent home directory for each workstation created with this configuration. Must be empty if source_snapshot is set. Valid values are `10`, `50`, `100`, `200`, `500`, or `1000`. Defaults to `200`. If less than `200` GB, the disk_type must be `"pd-balanced"` or `"pd-ssd"`.',
      ).optional(),
      sourceSnapshot: z.string().describe(
        "Optional. Name of the snapshot to use as the source for the disk. If set, size_gb and fs_type must be empty. Must be formatted as ext4 file system with no partitions.",
      ).optional(),
    }).describe(
      "A Persistent Directory backed by a Compute Engine regional persistent disk. The persistent_directories field is repeated, but it may contain only one entry. It creates a [persistent disk](https://cloud.google.com/compute/docs/disks/persistent-disks) that mounts to the workstation VM at `/home` when the session starts and detaches when the session ends. If this field is empty, workstations created with this configuration do not have a persistent home directory.",
    ).optional(),
    mountPath: z.string().describe(
      "Optional. Location of this directory in the running workstation.",
    ).optional(),
  })).describe("Optional. Directories to persist across workstation sessions.")
    .optional(),
  readinessChecks: z.array(z.object({
    path: z.string().describe(
      "Optional. Path to which the request should be sent.",
    ).optional(),
    port: z.number().int().describe(
      "Optional. Port to which the request should be sent.",
    ).optional(),
  })).describe(
    "Optional. Readiness checks to perform when starting a workstation using this workstation configuration. Mark a workstation as running only after all specified readiness checks return 200 status codes.",
  ).optional(),
  replicaZones: z.array(z.string()).describe(
    "Optional. Immutable. Specifies the zones used to replicate the VM and disk resources within the region. If set, exactly two zones within the workstation cluster's region must be specified—for example, `['us-central1-a', 'us-central1-f']`. If this field is empty, two default zones within the region are used. Immutable after the workstation configuration is created.",
  ).optional(),
  runningTimeout: z.string().describe(
    'Optional. Number of seconds that a workstation can run until it is automatically shut down. We recommend that workstations be shut down daily to reduce costs and so that security updates can be applied upon restart. The idle_timeout and running_timeout fields are independent of each other. Note that the running_timeout field shuts down VMs after the specified time, regardless of whether or not the VMs are idle. Provide duration terminated by `s` for seconds—for example, `"54000s"` (15 hours). Defaults to `"43200s"` (12 hours). A value of `"0s"` indicates that workstations using this configuration should never time out. If encryption_key is set, it must be greater than `"0s"` and less than `"86400s"` (24 hours). Warning: A value of `"0s"` indicates that Cloud Workstations VMs created with this configuration have no maximum running time. This is strongly discouraged because you incur costs and will not pick up security updates.',
  ).optional(),
  workstationConfigId: z.string().describe(
    "Required. ID to use for the workstation configuration.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  allowedPorts: z.array(z.object({
    first: z.number(),
    last: z.number(),
  })).optional(),
  annotations: z.record(z.string(), z.unknown()).optional(),
  conditions: z.array(z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  })).optional(),
  container: z.object({
    args: z.array(z.string()),
    command: z.array(z.string()),
    env: z.record(z.string(), z.unknown()),
    image: z.string(),
    runAsUser: z.number(),
    workingDir: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  degraded: z.boolean().optional(),
  deleteTime: z.string().optional(),
  disableTcpConnections: z.boolean().optional(),
  displayName: z.string().optional(),
  enableAuditAgent: z.boolean().optional(),
  encryptionKey: z.object({
    kmsKey: z.string(),
    kmsKeyServiceAccount: z.string(),
  }).optional(),
  ephemeralDirectories: z.array(z.object({
    gcePd: z.object({
      diskType: z.string(),
      readOnly: z.boolean(),
      sourceImage: z.string(),
      sourceSnapshot: z.string(),
    }),
    mountPath: z.string(),
  })).optional(),
  etag: z.string().optional(),
  grantWorkstationAdminRoleOnCreate: z.boolean().optional(),
  host: z.object({
    gceInstance: z.object({
      accelerators: z.array(z.object({
        count: z.number(),
        type: z.string(),
      })),
      boostConfigs: z.array(z.object({
        accelerators: z.array(z.unknown()),
        bootDiskSizeGb: z.number(),
        enableNestedVirtualization: z.boolean(),
        id: z.string(),
        machineType: z.string(),
        poolSize: z.number(),
      })),
      bootDiskSizeGb: z.number(),
      confidentialInstanceConfig: z.object({
        enableConfidentialCompute: z.boolean(),
      }),
      disablePublicIpAddresses: z.boolean(),
      disableSsh: z.boolean(),
      enableNestedVirtualization: z.boolean(),
      instanceMetadata: z.record(z.string(), z.unknown()),
      machineType: z.string(),
      poolSize: z.number(),
      pooledInstances: z.number(),
      serviceAccount: z.string(),
      serviceAccountScopes: z.array(z.string()),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean(),
        enableSecureBoot: z.boolean(),
        enableVtpm: z.boolean(),
      }),
      startupScriptUri: z.string(),
      tags: z.array(z.string()),
      vmTags: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  idleTimeout: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  maxUsableWorkstations: z.number().optional(),
  name: z.string(),
  persistentDirectories: z.array(z.object({
    gceHd: z.object({
      archiveTimeout: z.string(),
      reclaimPolicy: z.string(),
      sizeGb: z.number(),
      sourceSnapshot: z.string(),
    }),
    gcePd: z.object({
      archiveTimeout: z.string(),
      diskType: z.string(),
      fsType: z.string(),
      reclaimPolicy: z.string(),
      sizeGb: z.number(),
      sourceSnapshot: z.string(),
    }),
    mountPath: z.string(),
  })).optional(),
  readinessChecks: z.array(z.object({
    path: z.string(),
    port: z.number(),
  })).optional(),
  reconciling: z.boolean().optional(),
  replicaZones: z.array(z.string()).optional(),
  runningTimeout: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  allowedPorts: z.array(z.object({
    first: z.number().int().describe(
      "Required. Starting port number for the current range of ports. Valid ports are 22, 80, and ports within the range 1024-65535.",
    ).optional(),
    last: z.number().int().describe(
      "Required. Ending port number for the current range of ports. Valid ports are 22, 80, and ports within the range 1024-65535.",
    ).optional(),
  })).describe(
    "Optional. A list of PortRanges specifying single ports or ranges of ports that are externally accessible in the workstation. Allowed ports must be one of 22, 80, or within range 1024-65535. If not specified defaults to ports 22, 80, and ports 1024-65535.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Client-specified annotations.",
  ).optional(),
  container: z.object({
    args: z.array(z.string()).describe(
      "Optional. Arguments passed to the entrypoint.",
    ).optional(),
    command: z.array(z.string()).describe(
      "Optional. If set, overrides the default ENTRYPOINT specified by the image.",
    ).optional(),
    env: z.record(z.string(), z.string()).describe(
      "Optional. Environment variables passed to the container's entrypoint.",
    ).optional(),
    image: z.string().describe(
      "Optional. A Docker container image that defines a custom environment. Cloud Workstations provides a number of [preconfigured images](https://cloud.google.com/workstations/docs/preconfigured-base-images), but you can create your own [custom container images](https://cloud.google.com/workstations/docs/custom-container-images). If using a private image, the `host.gceInstance.serviceAccount` field must be specified in the workstation configuration. If using a custom container image, the service account must have [Artifact Registry Reader](https://cloud.google.com/artifact-registry/docs/access-control#roles) permission to pull the specified image. Otherwise, the image must be publicly accessible.",
    ).optional(),
    runAsUser: z.number().int().describe(
      "Optional. If set, overrides the USER specified in the image with the given uid.",
    ).optional(),
    workingDir: z.string().describe(
      "Optional. If set, overrides the default DIR specified by the image.",
    ).optional(),
  }).describe("A Docker container.").optional(),
  disableTcpConnections: z.boolean().describe(
    "Optional. Disables support for plain TCP connections in the workstation. By default the service supports TCP connections through a websocket relay. Setting this option to true disables that relay, which prevents the usage of services that require plain TCP connections, such as SSH. When enabled, all communication must occur over HTTPS or WSS.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name for this workstation configuration.",
  ).optional(),
  enableAuditAgent: z.boolean().describe(
    'Optional. Whether to enable Linux `auditd` logging on the workstation. When enabled, a service_account must also be specified that has `roles/logging.logWriter` and `roles/monitoring.metricWriter` on the project. Operating system audit logging is distinct from [Cloud Audit Logs](https://cloud.google.com/workstations/docs/audit-logging) and [Container output logging](https://cloud.google.com/workstations/docs/container-output-logging#overview). Operating system audit logs are available in the [Cloud Logging](https://cloud.google.com/logging/docs) console by querying: resource.type="gce_instance" log_name:"/logs/linux-auditd"',
  ).optional(),
  encryptionKey: z.object({
    kmsKey: z.string().describe(
      'Immutable. The name of the Google Cloud KMS encryption key. For example, `"projects/PROJECT_ID/locations/REGION/keyRings/KEY_RING/cryptoKeys/KEY_NAME"`. The key must be in the same region as the workstation configuration.',
    ).optional(),
    kmsKeyServiceAccount: z.string().describe(
      "Immutable. The service account to use with the specified KMS key. We recommend that you use a separate service account and follow KMS best practices. For more information, see [Separation of duties](https://cloud.google.com/kms/docs/separation-of-duties) and `gcloud kms keys add-iam-policy-binding` [`--member`](https://cloud.google.com/sdk/gcloud/reference/kms/keys/add-iam-policy-binding#--member).",
    ).optional(),
  }).describe(
    "A customer-managed encryption key (CMEK) for the Compute Engine resources of the associated workstation configuration. Specify the name of your Cloud KMS encryption key and the default service account. We recommend that you use a separate service account and follow [Cloud KMS best practices](https://cloud.google.com/kms/docs/separation-of-duties).",
  ).optional(),
  ephemeralDirectories: z.array(z.object({
    gcePd: z.object({
      diskType: z.string().describe(
        'Optional. Type of the disk to use. Defaults to `"pd-standard"`.',
      ).optional(),
      readOnly: z.boolean().describe(
        "Optional. Whether the disk is read only. If true, the disk may be shared by multiple VMs and source_snapshot must be set.",
      ).optional(),
      sourceImage: z.string().describe(
        "Optional. Name of the disk image to use as the source for the disk. Must be empty if source_snapshot is set. Updating source_image will update content in the ephemeral directory after the workstation is restarted. Only file systems supported by Container-Optimized OS (COS) are explicitly supported. For a list of supported file systems, please refer to the [COS documentation](https://cloud.google.com/container-optimized-os/docs/concepts/supported-filesystems). This field is mutable.",
      ).optional(),
      sourceSnapshot: z.string().describe(
        "Optional. Name of the snapshot to use as the source for the disk. Must be empty if source_image is set. Must be empty if read_only is false. Updating source_snapshot will update content in the ephemeral directory after the workstation is restarted. Only file systems supported by Container-Optimized OS (COS) are explicitly supported. For a list of supported file systems, see [the filesystems available in Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs/concepts/supported-filesystems). This field is mutable.",
      ).optional(),
    }).describe(
      "An EphemeralDirectory is backed by a Compute Engine persistent disk.",
    ).optional(),
    mountPath: z.string().describe(
      "Required. Location of this directory in the running workstation.",
    ).optional(),
  })).describe(
    "Optional. Ephemeral directories which won't persist across workstation sessions.",
  ).optional(),
  grantWorkstationAdminRoleOnCreate: z.boolean().describe(
    "Optional. Grant creator of a workstation `roles/workstations.policyAdmin` role along with `roles/workstations.user` role on the workstation created by them. This allows workstation users to share access to either their entire workstation, or individual ports. Defaults to false.",
  ).optional(),
  host: z.object({
    gceInstance: z.object({
      accelerators: z.array(z.object({
        count: z.number().int().describe(
          "Optional. Number of accelerator cards exposed to the instance.",
        ).optional(),
        type: z.string().describe(
          'Optional. Type of accelerator resource to attach to the instance, for example, `"nvidia-tesla-p100"`.',
        ).optional(),
      })).describe(
        "Optional. A list of the type and count of accelerator cards attached to the instance.",
      ).optional(),
      boostConfigs: z.array(z.object({
        accelerators: z.array(z.unknown()).describe(
          "Optional. A list of the type and count of accelerator cards attached to the boost instance. Defaults to `none`.",
        ).optional(),
        bootDiskSizeGb: z.number().int().describe(
          "Optional. The size of the boot disk for the VM in gigabytes (GB). The minimum boot disk size is `30` GB. Defaults to `50` GB.",
        ).optional(),
        enableNestedVirtualization: z.boolean().describe(
          "Optional. Whether to enable nested virtualization on boosted Cloud Workstations VMs running using this boost configuration. Defaults to false. Nested virtualization lets you run virtual machine (VM) instances inside your workstation. Before enabling nested virtualization, consider the following important considerations. Cloud Workstations instances are subject to the [same restrictions as Compute Engine instances](https://cloud.google.com/compute/docs/instances/nested-virtualization/overview#restrictions): * **Organization policy**: projects, folders, or organizations may be restricted from creating nested VMs if the **Disable VM nested virtualization** constraint is enforced in the organization policy. For more information, see the Compute Engine section, [Checking whether nested virtualization is allowed](https://cloud.google.com/compute/docs/instances/nested-virtualization/managing-constraint#checking_whether_nested_virtualization_is_allowed). * **Performance**: nested VMs might experience a 10% or greater decrease in performance for workloads that are CPU-bound and possibly greater than a 10% decrease for workloads that are input/output bound. * **Machine Type**: nested virtualization can only be enabled on boost configurations that specify a machine_type in the N1 or N2 machine series.",
        ).optional(),
        id: z.string().describe(
          "Required. The ID to be used for the boost configuration.",
        ).optional(),
        machineType: z.string().describe(
          "Optional. The type of machine that boosted VM instances will use—for example, `e2-standard-4`. For more information about machine types that Cloud Workstations supports, see the list of [available machine types](https://cloud.google.com/workstations/docs/available-machine-types). Defaults to `e2-standard-4`.",
        ).optional(),
        poolSize: z.number().int().describe(
          "Optional. The number of boost VMs that the system should keep idle so that workstations can be boosted quickly. Defaults to `0`.",
        ).optional(),
      })).describe(
        "Optional. A list of the boost configurations that workstations created using this workstation configuration are allowed to use. If specified, users will have the option to choose from the list of boost configs when starting a workstation.",
      ).optional(),
      bootDiskSizeGb: z.number().int().describe(
        "Optional. The size of the boot disk for the VM in gigabytes (GB). The minimum boot disk size is `30` GB. Defaults to `50` GB.",
      ).optional(),
      confidentialInstanceConfig: z.object({
        enableConfidentialCompute: z.boolean().describe(
          "Optional. Whether the instance has confidential compute enabled.",
        ).optional(),
      }).describe("A set of Compute Engine Confidential VM instance options.")
        .optional(),
      disablePublicIpAddresses: z.boolean().describe(
        "Optional. When set to true, disables public IP addresses for VMs. If you disable public IP addresses, you must set up Private Google Access or Cloud NAT on your network. If you use Private Google Access and you use `private.googleapis.com` or `restricted.googleapis.com` for Container Registry and Artifact Registry, make sure that you set up DNS records for domains `*.gcr.io` and `*.pkg.dev`. Defaults to false (VMs have public IP addresses).",
      ).optional(),
      disableSsh: z.boolean().describe(
        "Optional. Whether to disable SSH access to the VM.",
      ).optional(),
      enableNestedVirtualization: z.boolean().describe(
        "Optional. Whether to enable nested virtualization on Cloud Workstations VMs created using this workstation configuration. Defaults to false. Nested virtualization lets you run virtual machine (VM) instances inside your workstation. Before enabling nested virtualization, consider the following important considerations. Cloud Workstations instances are subject to the [same restrictions as Compute Engine instances](https://cloud.google.com/compute/docs/instances/nested-virtualization/overview#restrictions): * **Organization policy**: projects, folders, or organizations may be restricted from creating nested VMs if the **Disable VM nested virtualization** constraint is enforced in the organization policy. For more information, see the Compute Engine section, [Checking whether nested virtualization is allowed](https://cloud.google.com/compute/docs/instances/nested-virtualization/managing-constraint#checking_whether_nested_virtualization_is_allowed). * **Performance**: nested VMs might experience a 10% or greater decrease in performance for workloads that are CPU-bound and possibly greater than a 10% decrease for workloads that are input/output bound. * **Machine Type**: nested virtualization can only be enabled on workstation configurations that specify a machine_type in the N1 or N2 machine series.",
      ).optional(),
      instanceMetadata: z.record(z.string(), z.string()).describe(
        "Optional. Custom metadata to apply to Compute Engine instances.",
      ).optional(),
      machineType: z.string().describe(
        'Optional. The type of machine to use for VM instances—for example, `"e2-standard-4"`. For more information about machine types that Cloud Workstations supports, see the list of [available machine types](https://cloud.google.com/workstations/docs/available-machine-types).',
      ).optional(),
      poolSize: z.number().int().describe(
        "Optional. The number of VMs that the system should keep idle so that new workstations can be started quickly for new users. Defaults to `0` in the API.",
      ).optional(),
      pooledInstances: z.number().int().describe(
        "Output only. Number of instances currently available in the pool for faster workstation startup.",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. The email address of the service account for Cloud Workstations VMs created with this configuration. When specified, be sure that the service account has `logging.logEntries.create` and `monitoring.timeSeries.create` permissions on the project so it can write logs out to Cloud Logging. If using a custom container image, the service account must have [Artifact Registry Reader](https://cloud.google.com/artifact-registry/docs/access-control#roles) permission to pull the specified image. If you as the administrator want to be able to `ssh` into the underlying VM, you need to set this value to a service account for which you have the `iam.serviceAccounts.actAs` permission. Conversely, if you don't want anyone to be able to `ssh` into the underlying VM, use a service account where no one has that permission. If not set, VMs run with a service account provided by the Cloud Workstations service, and the image must be publicly accessible.",
      ).optional(),
      serviceAccountScopes: z.array(z.string()).describe(
        "Optional. Scopes to grant to the service_account. When specified, users of workstations under this configuration must have `iam.serviceAccounts.actAs` on the service account.",
      ).optional(),
      shieldedInstanceConfig: z.object({
        enableIntegrityMonitoring: z.boolean().describe(
          "Optional. Whether the instance has integrity monitoring enabled.",
        ).optional(),
        enableSecureBoot: z.boolean().describe(
          "Optional. Whether the instance has Secure Boot enabled.",
        ).optional(),
        enableVtpm: z.boolean().describe(
          "Optional. Whether the instance has the vTPM enabled.",
        ).optional(),
      }).describe("A set of Compute Engine Shielded instance options.")
        .optional(),
      startupScriptUri: z.string().describe(
        "Optional. Link to the startup script stored in Cloud Storage. This script will be run on the host workstation VM when the VM is created. The URI must be of the form gs://{bucket-name}/{object-name}. If specifying a startup script, the service account must have [Permission to access the bucket and script file in Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-permissions). Otherwise, the script must be publicly accessible. Note that the service regularly updates the OS version of the host VM, and it is the responsibility of the user to ensure the script stays compatible with the OS version.",
      ).optional(),
      tags: z.array(z.string()).describe(
        "Optional. Network tags to add to the Compute Engine VMs backing the workstations. This option applies [network tags](https://cloud.google.com/vpc/docs/add-remove-network-tags) to VMs created with this configuration. These network tags enable the creation of [firewall rules](https://cloud.google.com/workstations/docs/configure-firewall-rules).",
      ).optional(),
      vmTags: z.record(z.string(), z.string()).describe(
        "Optional. Resource manager tags to be bound to this instance. Tag keys and values have the same definition as [resource manager tags](https://cloud.google.com/resource-manager/docs/tags/tags-overview). Keys must be in the format `tagKeys/{tag_key_id}`, and values are in the format `tagValues/456`.",
      ).optional(),
    }).describe("A runtime using a Compute Engine instance.").optional(),
  }).describe("Runtime host for a workstation.").optional(),
  idleTimeout: z.string().describe(
    'Optional. Number of seconds to wait before automatically stopping a workstation after it last received user traffic. A value of `"0s"` indicates that Cloud Workstations VMs created with this configuration should never time out due to idleness. Provide [duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#duration) terminated by `s` for seconds—for example, `"7200s"` (2 hours). The default is `"1200s"` (20 minutes).',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. [Labels](https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation configuration and that are also propagated to the underlying Compute Engine resources.",
  ).optional(),
  maxUsableWorkstations: z.number().int().describe(
    "Optional. Maximum number of workstations under this configuration a user can have `workstations.workstation.use` permission on. Only enforced on CreateWorkstation API calls on the user issuing the API request. Can be overridden by: - granting a user workstations.workstationConfigs.exemptMaxUsableWorkstationLimit permission, or - having a user with that permission create a workstation and granting another user `workstations.workstation.use` permission on that workstation. If not specified, defaults to `0`, which indicates unlimited.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Full name of this workstation configuration.",
  ).optional(),
  persistentDirectories: z.array(z.object({
    gceHd: z.object({
      archiveTimeout: z.string().describe(
        'Optional. Number of seconds to wait after initially creating or subsequently shutting down the workstation before converting its disk into a snapshot. This generally saves costs at the expense of greater startup time on next workstation start, as the service will need to create a disk from the archival snapshot. A value of `"0s"` indicates that the disk will never be archived.',
      ).optional(),
      reclaimPolicy: z.enum(["RECLAIM_POLICY_UNSPECIFIED", "DELETE", "RETAIN"])
        .describe(
          "Optional. Whether the persistent disk should be deleted when the workstation is deleted. Valid values are `DELETE` and `RETAIN`. Defaults to `DELETE`.",
        ).optional(),
      sizeGb: z.number().int().describe(
        "Optional. The GB capacity of a persistent home directory for each workstation created with this configuration. Must be empty if source_snapshot is set. Valid values are `10`, `50`, `100`, `200`, `500`, or `1000`. Defaults to `200`.",
      ).optional(),
      sourceSnapshot: z.string().describe(
        "Optional. Name of the snapshot to use as the source for the disk. If set, size_gb must be empty. Must be formatted as ext4 file system with no partitions.",
      ).optional(),
    }).describe(
      "A Persistent Directory backed by a Compute Engine [Hyperdisk Balanced High Availability Disk](https://cloud.google.com/compute/docs/disks/hd-types/hyperdisk-balanced-ha). This is a high-availability block storage solution that offers a balance between performance and cost for most general-purpose workloads.",
    ).optional(),
    gcePd: z.object({
      archiveTimeout: z.string().describe(
        'Optional. Number of seconds to wait after initially creating or subsequently shutting down the workstation before converting its disk into a snapshot. This generally saves costs at the expense of greater startup time on next workstation start, as the service will need to create a disk from the archival snapshot. A value of `"0s"` indicates that the disk will never be archived.',
      ).optional(),
      diskType: z.string().describe(
        'Optional. The [type of the persistent disk](https://cloud.google.com/compute/docs/disks#disk-types) for the home directory. Defaults to `"pd-standard"`.',
      ).optional(),
      fsType: z.string().describe(
        'Optional. Type of file system that the disk should be formatted with. The workstation image must support this file system type. Must be empty if source_snapshot is set. Defaults to `"ext4"`.',
      ).optional(),
      reclaimPolicy: z.enum(["RECLAIM_POLICY_UNSPECIFIED", "DELETE", "RETAIN"])
        .describe(
          "Optional. Whether the persistent disk should be deleted when the workstation is deleted. Valid values are `DELETE` and `RETAIN`. Defaults to `DELETE`.",
        ).optional(),
      sizeGb: z.number().int().describe(
        'Optional. The GB capacity of a persistent home directory for each workstation created with this configuration. Must be empty if source_snapshot is set. Valid values are `10`, `50`, `100`, `200`, `500`, or `1000`. Defaults to `200`. If less than `200` GB, the disk_type must be `"pd-balanced"` or `"pd-ssd"`.',
      ).optional(),
      sourceSnapshot: z.string().describe(
        "Optional. Name of the snapshot to use as the source for the disk. If set, size_gb and fs_type must be empty. Must be formatted as ext4 file system with no partitions.",
      ).optional(),
    }).describe(
      "A Persistent Directory backed by a Compute Engine regional persistent disk. The persistent_directories field is repeated, but it may contain only one entry. It creates a [persistent disk](https://cloud.google.com/compute/docs/disks/persistent-disks) that mounts to the workstation VM at `/home` when the session starts and detaches when the session ends. If this field is empty, workstations created with this configuration do not have a persistent home directory.",
    ).optional(),
    mountPath: z.string().describe(
      "Optional. Location of this directory in the running workstation.",
    ).optional(),
  })).describe("Optional. Directories to persist across workstation sessions.")
    .optional(),
  readinessChecks: z.array(z.object({
    path: z.string().describe(
      "Optional. Path to which the request should be sent.",
    ).optional(),
    port: z.number().int().describe(
      "Optional. Port to which the request should be sent.",
    ).optional(),
  })).describe(
    "Optional. Readiness checks to perform when starting a workstation using this workstation configuration. Mark a workstation as running only after all specified readiness checks return 200 status codes.",
  ).optional(),
  replicaZones: z.array(z.string()).describe(
    "Optional. Immutable. Specifies the zones used to replicate the VM and disk resources within the region. If set, exactly two zones within the workstation cluster's region must be specified—for example, `['us-central1-a', 'us-central1-f']`. If this field is empty, two default zones within the region are used. Immutable after the workstation configuration is created.",
  ).optional(),
  runningTimeout: z.string().describe(
    'Optional. Number of seconds that a workstation can run until it is automatically shut down. We recommend that workstations be shut down daily to reduce costs and so that security updates can be applied upon restart. The idle_timeout and running_timeout fields are independent of each other. Note that the running_timeout field shuts down VMs after the specified time, regardless of whether or not the VMs are idle. Provide duration terminated by `s` for seconds—for example, `"54000s"` (15 hours). Defaults to `"43200s"` (12 hours). A value of `"0s"` indicates that workstations using this configuration should never time out. If encryption_key is set, it must be greater than `"0s"` and less than `"86400s"` (24 hours). Warning: A value of `"0s"` indicates that Cloud Workstations VMs created with this configuration have no maximum running time. This is strongly discouraged because you incur costs and will not pick up security updates.',
  ).optional(),
  workstationConfigId: z.string().describe(
    "Required. ID to use for the workstation configuration.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Workstations WorkstationClusters.WorkstationConfigs. Registered at `@swamp/gcp/workstations/workstationclusters-workstationconfigs`. */
export const model = {
  type: "@swamp/gcp/workstations/workstationclusters-workstationconfigs",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
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
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A workstation configuration resource in the Cloud Workstations API. Workstati...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a workstationConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["allowedPorts"] !== undefined) {
          body["allowedPorts"] = g["allowedPorts"];
        }
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["container"] !== undefined) body["container"] = g["container"];
        if (g["disableTcpConnections"] !== undefined) {
          body["disableTcpConnections"] = g["disableTcpConnections"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableAuditAgent"] !== undefined) {
          body["enableAuditAgent"] = g["enableAuditAgent"];
        }
        if (g["encryptionKey"] !== undefined) {
          body["encryptionKey"] = g["encryptionKey"];
        }
        if (g["ephemeralDirectories"] !== undefined) {
          body["ephemeralDirectories"] = g["ephemeralDirectories"];
        }
        if (g["grantWorkstationAdminRoleOnCreate"] !== undefined) {
          body["grantWorkstationAdminRoleOnCreate"] =
            g["grantWorkstationAdminRoleOnCreate"];
        }
        if (g["host"] !== undefined) body["host"] = g["host"];
        if (g["idleTimeout"] !== undefined) {
          body["idleTimeout"] = g["idleTimeout"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maxUsableWorkstations"] !== undefined) {
          body["maxUsableWorkstations"] = g["maxUsableWorkstations"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["persistentDirectories"] !== undefined) {
          body["persistentDirectories"] = g["persistentDirectories"];
        }
        if (g["readinessChecks"] !== undefined) {
          body["readinessChecks"] = g["readinessChecks"];
        }
        if (g["replicaZones"] !== undefined) {
          body["replicaZones"] = g["replicaZones"];
        }
        if (g["runningTimeout"] !== undefined) {
          body["runningTimeout"] = g["runningTimeout"];
        }
        if (g["workstationConfigId"] !== undefined) {
          body["workstationConfigId"] = g["workstationConfigId"];
        }
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
      description: "Get a workstationConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the workstationConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update workstationConfigs attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["allowedPorts"] !== undefined) {
          body["allowedPorts"] = g["allowedPorts"];
        }
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["container"] !== undefined) body["container"] = g["container"];
        if (g["disableTcpConnections"] !== undefined) {
          body["disableTcpConnections"] = g["disableTcpConnections"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableAuditAgent"] !== undefined) {
          body["enableAuditAgent"] = g["enableAuditAgent"];
        }
        if (g["encryptionKey"] !== undefined) {
          body["encryptionKey"] = g["encryptionKey"];
        }
        if (g["ephemeralDirectories"] !== undefined) {
          body["ephemeralDirectories"] = g["ephemeralDirectories"];
        }
        if (g["grantWorkstationAdminRoleOnCreate"] !== undefined) {
          body["grantWorkstationAdminRoleOnCreate"] =
            g["grantWorkstationAdminRoleOnCreate"];
        }
        if (g["host"] !== undefined) body["host"] = g["host"];
        if (g["idleTimeout"] !== undefined) {
          body["idleTimeout"] = g["idleTimeout"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maxUsableWorkstations"] !== undefined) {
          body["maxUsableWorkstations"] = g["maxUsableWorkstations"];
        }
        if (g["persistentDirectories"] !== undefined) {
          body["persistentDirectories"] = g["persistentDirectories"];
        }
        if (g["readinessChecks"] !== undefined) {
          body["readinessChecks"] = g["readinessChecks"];
        }
        if (g["runningTimeout"] !== undefined) {
          body["runningTimeout"] = g["runningTimeout"];
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
          undefined,
          credentials,
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
      description: "Delete the workstationConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the workstationConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync workstationConfigs state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List workstationConfigs resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter the WorkstationConfigs to be listed. Possible filters are described in https://google.aip.dev/160.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of items to return.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "workstationConfigs",
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
          BASE_URL,
          {
            "id":
              "workstations.projects.locations.workstationClusters.workstationConfigs.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    list_usable: {
      description: "list usable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "workstations.projects.locations.workstationClusters.workstationConfigs.listUsable",
            "path": "v1/{+parent}/workstationConfigs:listUsable",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
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
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "workstations.projects.locations.workstationClusters.workstationConfigs.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
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
          BASE_URL,
          {
            "id":
              "workstations.projects.locations.workstationClusters.workstationConfigs.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
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
