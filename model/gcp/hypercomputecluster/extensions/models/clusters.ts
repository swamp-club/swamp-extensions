// Auto-generated extension model for @swamp/gcp/hypercomputecluster/clusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Cluster Director Clusters.
 *
 * A collection of virtual machines and connected resources forming a high-performance computing cluster capable of running large-scale, tightly coupled workloads. A cluster combines a set a compute resources that perform computations, storage resources that contain inputs and store outputs, an orchestrator that is responsible for assigning jobs to compute resources, and network resources that connect everything together.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/clusters/${shortName}`;
}

const BASE_URL = "https://hypercomputecluster.googleapis.com/";

const GET_CONFIG = {
  "id": "hypercomputecluster.projects.locations.clusters.get",
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
  "id": "hypercomputecluster.projects.locations.clusters.create",
  "path": "v1/{+parent}/clusters",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "clusterId": {
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

const PATCH_CONFIG = {
  "id": "hypercomputecluster.projects.locations.clusters.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
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
  "id": "hypercomputecluster.projects.locations.clusters.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  computeResources: z.record(
    z.string(),
    z.object({
      config: z.object({
        newFlexStartInstances: z.object({
          machineType: z.string().describe(
            "Required. Immutable. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`.",
          ).optional(),
          maxDuration: z.string().describe(
            "Required. Immutable. Specifies the time limit for created instances. Instances will be terminated at the end of this duration.",
          ).optional(),
          zone: z.string().describe(
            "Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster.",
          ).optional(),
        }).describe(
          "When set in a ComputeResourceConfig, indicates that VM instances should be created using [Flex Start](https://cloud.google.com/compute/docs/instances/provisioning-models).",
        ).optional(),
        newOnDemandInstances: z.object({
          machineType: z.string().describe(
            "Required. Immutable. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`.",
          ).optional(),
          zone: z.string().describe(
            "Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster.",
          ).optional(),
        }).describe(
          "When set in a ComputeResourceConfig, indicates that on-demand (i.e., using the standard provisioning model) VM instances should be created.",
        ).optional(),
        newReservedInstances: z.object({
          reservation: z.string().describe(
            "Optional. Immutable. Name of the reservation from which VM instances should be created, in the format `projects/{project}/zones/{zone}/reservations/{reservation}`.",
          ).optional(),
        }).describe(
          "When set in a ComputeResourceConfig, indicates that VM instances should be created from a [reservation](https://cloud.google.com/compute/docs/instances/reservations-overview).",
        ).optional(),
        newSpotInstances: z.object({
          machineType: z.string().describe(
            "Required. Immutable. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`.",
          ).optional(),
          terminationAction: z.enum([
            "TERMINATION_ACTION_UNSPECIFIED",
            "STOP",
            "DELETE",
          ]).describe(
            "Optional. Termination action for the instance. If not specified, Compute Engine sets the termination action to DELETE.",
          ).optional(),
          zone: z.string().describe(
            "Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster.",
          ).optional(),
        }).describe(
          "When set in a ComputeResourceConfig, indicates that [spot VM](https://cloud.google.com/compute/docs/instances/spot) instances should be created.",
        ).optional(),
      }).describe(
        "Describes how a compute resource should be created at runtime.",
      ).optional(),
    }),
  ).describe(
    "Optional. Compute resources available to the cluster. Keys specify the ID of the compute resource by which it can be referenced elsewhere, and must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
  ).optional(),
  description: z.string().describe(
    "Optional. User-provided description of the cluster. Maximum of 2048 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. [Labels](https://cloud.google.com/compute/docs/labeling-resources) applied to the cluster. Labels can be used to organize clusters and to filter them in queries.",
  ).optional(),
  name: z.string().describe(
    "Identifier. [Relative resource name](https://google.aip.dev/122) of the cluster, in the format `projects/{project}/locations/{location}/clusters/{cluster}`.",
  ).optional(),
  networkResources: z.record(
    z.string(),
    z.object({
      config: z.object({
        existingNetwork: z.object({
          network: z.string().describe(
            "Required. Immutable. Name of the network to import, in the format `projects/{project}/global/networks/{network}`.",
          ).optional(),
          subnetwork: z.string().describe(
            "Required. Immutable. Particular subnetwork to use, in the format `projects/{project}/regions/{region}/subnetworks/{subnetwork}`.",
          ).optional(),
        }).describe(
          "When set in a NetworkResourceConfig, indicates that an existing network should be imported.",
        ).optional(),
        newNetwork: z.object({
          description: z.string().describe(
            "Optional. Immutable. Description of the network. Maximum of 2048 characters.",
          ).optional(),
          network: z.string().describe(
            "Required. Immutable. Name of the network to create, in the format `projects/{project}/global/networks/{network}`.",
          ).optional(),
        }).describe(
          "When set in a NetworkResourceConfig, indicates that a new network should be created.",
        ).optional(),
      }).describe(
        "Describes how a network resource should be initialized. Each network resource can either be imported from an existing Google Cloud resource or initialized when the cluster is created.",
      ).optional(),
      network: z.object({
        network: z.string().describe(
          "Output only. Name of the network, in the format `projects/{project}/global/networks/{network}`.",
        ).optional(),
        subnetwork: z.string().describe(
          "Output only. Name of the particular subnetwork being used by the cluster, in the format `projects/{project}/regions/{region}/subnetworks/{subnetwork}`.",
        ).optional(),
      }).describe(
        "A reference to a [VPC network](https://cloud.google.com/vpc/docs/vpc) in Google Compute Engine.",
      ).optional(),
    }),
  ).describe(
    "Optional. Network resources available to the cluster. Must contain at most one value. Keys specify the ID of the network resource by which it can be referenced elsewhere, and must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
  ).optional(),
  orchestrator: z.object({
    slurm: z.object({
      defaultPartition: z.string().describe(
        "Optional. Default partition to use for submitted jobs that do not explicitly specify a partition. Required if and only if there is more than one partition, in which case it must match the id of one of the partitions.",
      ).optional(),
      epilogBashScripts: z.array(z.string()).describe(
        "Optional. Slurm [epilog scripts](https://slurm.schedmd.com/prolog_epilog.html), which will be executed by compute nodes whenever a node finishes running a job. Values must not be empty.",
      ).optional(),
      loginNodes: z.object({
        bootDisk: z.object({
          sizeGb: z.string().describe(
            "Required. Immutable. Size of the disk in gigabytes. Must be at least 10GB.",
          ).optional(),
          type: z.string().describe(
            "Required. Immutable. [Persistent disk type](https://cloud.google.com/compute/docs/disks#disk-types), in the format `projects/{project}/zones/{zone}/diskTypes/{disk_type}`.",
          ).optional(),
        }).describe(
          "A [Persistent disk](https://cloud.google.com/compute/docs/disks) used as the boot disk for a Compute Engine VM instance.",
        ).optional(),
        count: z.string().describe(
          "Required. Number of login node instances to create.",
        ).optional(),
        enableOsLogin: z.boolean().describe(
          "Optional. Whether [OS Login](https://cloud.google.com/compute/docs/oslogin) should be enabled on login node instances.",
        ).optional(),
        enablePublicIps: z.boolean().describe(
          "Optional. Whether login node instances should be assigned [external IP addresses](https://cloud.google.com/compute/docs/ip-addresses#externaladdresses).",
        ).optional(),
        instances: z.array(z.object({
          instance: z.unknown().describe(
            "Output only. Name of the VM instance, in the format `projects/{project}/zones/{zone}/instances/{instance}`.",
          ).optional(),
        })).describe(
          "Output only. Information about the login node instances that were created in Compute Engine.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "Optional. [Labels](https://cloud.google.com/compute/docs/labeling-resources) that should be applied to each login node instance.",
        ).optional(),
        machineType: z.string().describe(
          "Required. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use for login nodes, e.g. `n2-standard-2`.",
        ).optional(),
        startupScript: z.string().describe(
          "Optional. [Startup script](https://cloud.google.com/compute/docs/instances/startup-scripts/linux) to be run on each login node instance. Max 256KB. The script must complete within the system-defined default timeout of 5 minutes. For tasks that require more time, consider running them in the background using methods such as `&` or `nohup`.",
        ).optional(),
        storageConfigs: z.array(z.object({
          id: z.unknown().describe(
            "Required. ID of the storage resource to mount, which must match a key in the cluster's storage_resources.",
          ).optional(),
          localMount: z.unknown().describe(
            "Required. A directory inside the VM instance's file system where the storage resource should be mounted (e.g., `/mnt/share`).",
          ).optional(),
        })).describe(
          "Optional. How storage resources should be mounted on each login node.",
        ).optional(),
        zone: z.string().describe(
          "Required. Name of the zone in which login nodes should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster.",
        ).optional(),
      }).describe(
        "Configuration for Slurm [login nodes](https://slurm.schedmd.com/quickstart_admin.html#login) in the cluster. Login nodes are Compute Engine VM instances that allow users to access the cluster over SSH.",
      ).optional(),
      nodeSets: z.array(z.object({
        computeId: z.string().describe(
          "Optional. ID of the compute resource on which this nodeset will run. Must match a key in the cluster's compute_resources.",
        ).optional(),
        computeInstance: z.object({
          bootDisk: z.unknown().describe(
            "A [Persistent disk](https://cloud.google.com/compute/docs/disks) used as the boot disk for a Compute Engine VM instance.",
          ).optional(),
          labels: z.unknown().describe(
            "Optional. [Labels](https://cloud.google.com/compute/docs/labeling-resources) that should be applied to each VM instance in the nodeset.",
          ).optional(),
          startupScript: z.unknown().describe(
            "Optional. [Startup script](https://cloud.google.com/compute/docs/instances/startup-scripts/linux) to be run on each VM instance in the nodeset. Max 256KB.",
          ).optional(),
        }).describe(
          "When set in a SlurmNodeSet, indicates that the nodeset should be backed by Compute Engine VM instances.",
        ).optional(),
        id: z.string().describe(
          "Required. Identifier for the nodeset, which allows it to be referenced by partitions. Must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
        ).optional(),
        maxDynamicNodeCount: z.string().describe(
          "Optional. Controls how many additional nodes a cluster can bring online to handle workloads. Set this value to enable dynamic node creation and limit the number of additional nodes the cluster can bring online. Leave empty if you do not want the cluster to create nodes dynamically, and instead rely only on static nodes.",
        ).optional(),
        staticNodeCount: z.string().describe(
          "Optional. Number of nodes to be statically created for this nodeset. The cluster will attempt to ensure that at least this many nodes exist at all times.",
        ).optional(),
        storageConfigs: z.array(z.unknown()).describe(
          "Optional. How storage resources should be mounted on each compute node.",
        ).optional(),
      })).describe(
        "Optional. Compute resource configuration for the Slurm nodesets in your cluster. If not specified, the cluster won't create any nodes.",
      ).optional(),
      partitions: z.array(z.object({
        id: z.string().describe(
          "Required. ID of the partition, which is how users will identify it. Must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
        ).optional(),
        nodeSetIds: z.array(z.unknown()).describe(
          "Required. IDs of the nodesets that make up this partition. Values must match SlurmNodeSet.id.",
        ).optional(),
      })).describe(
        "Optional. Configuration for the Slurm partitions in your cluster. Each partition can contain one or more nodesets, and you can submit separate jobs on each partition. If you don't specify at least one partition in your cluster, you can't submit jobs to the cluster.",
      ).optional(),
      prologBashScripts: z.array(z.string()).describe(
        "Optional. Slurm [prolog scripts](https://slurm.schedmd.com/prolog_epilog.html), which will be executed by compute nodes before a node begins running a new job. Values must not be empty.",
      ).optional(),
    }).describe(
      "When set in Orchestrator, indicates that the cluster should use [Slurm](https://slurm.schedmd.com/) as the orchestrator.",
    ).optional(),
  }).describe(
    "The component responsible for scheduling and running workloads on the cluster as well as providing the user interface for interacting with the cluster at runtime.",
  ).optional(),
  storageResources: z.record(
    z.string(),
    z.object({
      bucket: z.object({
        bucket: z.string().describe("Output only. Name of the bucket.")
          .optional(),
      }).describe(
        "A reference to a [Google Cloud Storage](https://cloud.google.com/storage) bucket.",
      ).optional(),
      config: z.object({
        existingBucket: z.object({
          bucket: z.string().describe(
            "Required. Immutable. Name of the Cloud Storage bucket to import.",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that an existing [Google Cloud Storage](https://cloud.google.com/storage) bucket should be imported.",
        ).optional(),
        existingFilestore: z.object({
          filestore: z.string().describe(
            "Required. Immutable. Name of the Filestore instance to import, in the format `projects/{project}/locations/{location}/instances/{instance}`",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that an existing [Filestore](https://cloud.google.com/filestore) instance should be imported.",
        ).optional(),
        existingLustre: z.object({
          lustre: z.string().describe(
            "Required. Immutable. Name of the Managed Lustre instance to import, in the format `projects/{project}/locations/{location}/instances/{instance}`",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that an existing [Managed Lustre](https://cloud.google.com/products/managed-lustre) instance should be imported.",
        ).optional(),
        newBucket: z.object({
          autoclass: z.object({
            enabled: z.unknown().describe(
              "Required. Enables Auto-class feature.",
            ).optional(),
            terminalStorageClass: z.unknown().describe(
              "Optional. Terminal storage class of the autoclass bucket",
            ).optional(),
          }).describe(
            "Message describing Google Cloud Storage autoclass configuration",
          ).optional(),
          bucket: z.string().describe(
            "Required. Immutable. Name of the Cloud Storage bucket to create.",
          ).optional(),
          hierarchicalNamespace: z.object({
            enabled: z.unknown().describe(
              "Required. Enables hierarchical namespace setup for the bucket.",
            ).optional(),
          }).describe(
            "Message describing Google Cloud Storage hierarchical namespace configuration",
          ).optional(),
          storageClass: z.enum([
            "STORAGE_CLASS_UNSPECIFIED",
            "STANDARD",
            "NEARLINE",
            "COLDLINE",
            "ARCHIVE",
          ]).describe(
            "Optional. Immutable. If set, uses the provided storage class as the bucket's default storage class.",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that a new [Google Cloud Storage](https://cloud.google.com/storage) bucket should be created.",
        ).optional(),
        newFilestore: z.object({
          description: z.string().describe(
            "Optional. Immutable. Description of the instance. Maximum of 2048 characters.",
          ).optional(),
          fileShares: z.array(z.unknown()).describe(
            "Required. Immutable. File system shares on the instance. Exactly one file share must be specified.",
          ).optional(),
          filestore: z.string().describe(
            "Required. Immutable. Name of the Filestore instance to create, in the format `projects/{project}/locations/{location}/instances/{instance}`",
          ).optional(),
          protocol: z.enum(["PROTOCOL_UNSPECIFIED", "NFSV3", "NFSV41"])
            .describe(
              "Optional. Immutable. Access protocol to use for all file shares in the instance. Defaults to NFS V3 if not set.",
            ).optional(),
          tier: z.enum(["TIER_UNSPECIFIED", "ZONAL", "REGIONAL"]).describe(
            "Required. Immutable. Service tier to use for the instance.",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that a new [Filestore](https://cloud.google.com/filestore) instance should be created.",
        ).optional(),
        newLustre: z.object({
          capacityGb: z.string().describe(
            "Required. Immutable. Storage capacity of the instance in gibibytes (GiB). Allowed values are between 18000 and 7632000.",
          ).optional(),
          description: z.string().describe(
            "Optional. Immutable. Description of the Managed Lustre instance. Maximum of 2048 characters.",
          ).optional(),
          filesystem: z.string().describe(
            "Required. Immutable. Filesystem name for this instance. This name is used by client-side tools, including when mounting the instance. Must be 8 characters or less and can only contain letters and numbers.",
          ).optional(),
          lustre: z.string().describe(
            "Required. Immutable. Name of the Managed Lustre instance to create, in the format `projects/{project}/locations/{location}/instances/{instance}`",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that a new [Managed Lustre](https://cloud.google.com/products/managed-lustre) instance should be created.",
        ).optional(),
      }).describe(
        "Describes how a storage resource should be initialized. Each storage resource can either be imported from an existing Google Cloud resource or initialized when the cluster is created.",
      ).optional(),
      filestore: z.object({
        filestore: z.string().describe(
          "Output only. Name of the Filestore instance, in the format `projects/{project}/locations/{location}/instances/{instance}`",
        ).optional(),
      }).describe(
        "A reference to a [Filestore](https://cloud.google.com/filestore) instance.",
      ).optional(),
      lustre: z.object({
        lustre: z.string().describe(
          "Output only. Name of the Managed Lustre instance, in the format `projects/{project}/locations/{location}/instances/{instance}`",
        ).optional(),
      }).describe(
        "A reference to a [Managed Lustre](https://cloud.google.com/products/managed-lustre) instance.",
      ).optional(),
    }),
  ).describe(
    "Optional. Storage resources available to the cluster. Keys specify the ID of the storage resource by which it can be referenced elsewhere, and must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
  ).optional(),
  clusterId: z.string().describe(
    "Required. ID of the cluster to create. Must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique identifier for this request. A random UUID is recommended. This request is idempotent if and only if `request_id` is provided.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  computeResources: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  networkResources: z.record(z.string(), z.unknown()).optional(),
  orchestrator: z.object({
    slurm: z.object({
      defaultPartition: z.string(),
      epilogBashScripts: z.array(z.string()),
      loginNodes: z.object({
        bootDisk: z.object({
          sizeGb: z.string(),
          type: z.string(),
        }),
        count: z.string(),
        enableOsLogin: z.boolean(),
        enablePublicIps: z.boolean(),
        instances: z.array(z.object({
          instance: z.unknown(),
        })),
        labels: z.record(z.string(), z.unknown()),
        machineType: z.string(),
        startupScript: z.string(),
        storageConfigs: z.array(z.object({
          id: z.unknown(),
          localMount: z.unknown(),
        })),
        zone: z.string(),
      }),
      nodeSets: z.array(z.object({
        computeId: z.string(),
        computeInstance: z.object({
          bootDisk: z.unknown(),
          labels: z.unknown(),
          startupScript: z.unknown(),
        }),
        id: z.string(),
        maxDynamicNodeCount: z.string(),
        staticNodeCount: z.string(),
        storageConfigs: z.array(z.unknown()),
      })),
      partitions: z.array(z.object({
        id: z.string(),
        nodeSetIds: z.array(z.unknown()),
      })),
      prologBashScripts: z.array(z.string()),
    }),
  }).optional(),
  reconciling: z.boolean().optional(),
  storageResources: z.record(z.string(), z.unknown()).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  computeResources: z.record(
    z.string(),
    z.object({
      config: z.object({
        newFlexStartInstances: z.object({
          machineType: z.string().describe(
            "Required. Immutable. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`.",
          ).optional(),
          maxDuration: z.string().describe(
            "Required. Immutable. Specifies the time limit for created instances. Instances will be terminated at the end of this duration.",
          ).optional(),
          zone: z.string().describe(
            "Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster.",
          ).optional(),
        }).describe(
          "When set in a ComputeResourceConfig, indicates that VM instances should be created using [Flex Start](https://cloud.google.com/compute/docs/instances/provisioning-models).",
        ).optional(),
        newOnDemandInstances: z.object({
          machineType: z.string().describe(
            "Required. Immutable. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`.",
          ).optional(),
          zone: z.string().describe(
            "Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster.",
          ).optional(),
        }).describe(
          "When set in a ComputeResourceConfig, indicates that on-demand (i.e., using the standard provisioning model) VM instances should be created.",
        ).optional(),
        newReservedInstances: z.object({
          reservation: z.string().describe(
            "Optional. Immutable. Name of the reservation from which VM instances should be created, in the format `projects/{project}/zones/{zone}/reservations/{reservation}`.",
          ).optional(),
        }).describe(
          "When set in a ComputeResourceConfig, indicates that VM instances should be created from a [reservation](https://cloud.google.com/compute/docs/instances/reservations-overview).",
        ).optional(),
        newSpotInstances: z.object({
          machineType: z.string().describe(
            "Required. Immutable. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use, e.g. `n2-standard-2`.",
          ).optional(),
          terminationAction: z.enum([
            "TERMINATION_ACTION_UNSPECIFIED",
            "STOP",
            "DELETE",
          ]).describe(
            "Optional. Termination action for the instance. If not specified, Compute Engine sets the termination action to DELETE.",
          ).optional(),
          zone: z.string().describe(
            "Required. Immutable. Name of the zone in which VM instances should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster.",
          ).optional(),
        }).describe(
          "When set in a ComputeResourceConfig, indicates that [spot VM](https://cloud.google.com/compute/docs/instances/spot) instances should be created.",
        ).optional(),
      }).describe(
        "Describes how a compute resource should be created at runtime.",
      ).optional(),
    }),
  ).describe(
    "Optional. Compute resources available to the cluster. Keys specify the ID of the compute resource by which it can be referenced elsewhere, and must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
  ).optional(),
  description: z.string().describe(
    "Optional. User-provided description of the cluster. Maximum of 2048 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. [Labels](https://cloud.google.com/compute/docs/labeling-resources) applied to the cluster. Labels can be used to organize clusters and to filter them in queries.",
  ).optional(),
  name: z.string().describe(
    "Identifier. [Relative resource name](https://google.aip.dev/122) of the cluster, in the format `projects/{project}/locations/{location}/clusters/{cluster}`.",
  ).optional(),
  networkResources: z.record(
    z.string(),
    z.object({
      config: z.object({
        existingNetwork: z.object({
          network: z.string().describe(
            "Required. Immutable. Name of the network to import, in the format `projects/{project}/global/networks/{network}`.",
          ).optional(),
          subnetwork: z.string().describe(
            "Required. Immutable. Particular subnetwork to use, in the format `projects/{project}/regions/{region}/subnetworks/{subnetwork}`.",
          ).optional(),
        }).describe(
          "When set in a NetworkResourceConfig, indicates that an existing network should be imported.",
        ).optional(),
        newNetwork: z.object({
          description: z.string().describe(
            "Optional. Immutable. Description of the network. Maximum of 2048 characters.",
          ).optional(),
          network: z.string().describe(
            "Required. Immutable. Name of the network to create, in the format `projects/{project}/global/networks/{network}`.",
          ).optional(),
        }).describe(
          "When set in a NetworkResourceConfig, indicates that a new network should be created.",
        ).optional(),
      }).describe(
        "Describes how a network resource should be initialized. Each network resource can either be imported from an existing Google Cloud resource or initialized when the cluster is created.",
      ).optional(),
      network: z.object({
        network: z.string().describe(
          "Output only. Name of the network, in the format `projects/{project}/global/networks/{network}`.",
        ).optional(),
        subnetwork: z.string().describe(
          "Output only. Name of the particular subnetwork being used by the cluster, in the format `projects/{project}/regions/{region}/subnetworks/{subnetwork}`.",
        ).optional(),
      }).describe(
        "A reference to a [VPC network](https://cloud.google.com/vpc/docs/vpc) in Google Compute Engine.",
      ).optional(),
    }),
  ).describe(
    "Optional. Network resources available to the cluster. Must contain at most one value. Keys specify the ID of the network resource by which it can be referenced elsewhere, and must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
  ).optional(),
  orchestrator: z.object({
    slurm: z.object({
      defaultPartition: z.string().describe(
        "Optional. Default partition to use for submitted jobs that do not explicitly specify a partition. Required if and only if there is more than one partition, in which case it must match the id of one of the partitions.",
      ).optional(),
      epilogBashScripts: z.array(z.string()).describe(
        "Optional. Slurm [epilog scripts](https://slurm.schedmd.com/prolog_epilog.html), which will be executed by compute nodes whenever a node finishes running a job. Values must not be empty.",
      ).optional(),
      loginNodes: z.object({
        bootDisk: z.object({
          sizeGb: z.string().describe(
            "Required. Immutable. Size of the disk in gigabytes. Must be at least 10GB.",
          ).optional(),
          type: z.string().describe(
            "Required. Immutable. [Persistent disk type](https://cloud.google.com/compute/docs/disks#disk-types), in the format `projects/{project}/zones/{zone}/diskTypes/{disk_type}`.",
          ).optional(),
        }).describe(
          "A [Persistent disk](https://cloud.google.com/compute/docs/disks) used as the boot disk for a Compute Engine VM instance.",
        ).optional(),
        count: z.string().describe(
          "Required. Number of login node instances to create.",
        ).optional(),
        enableOsLogin: z.boolean().describe(
          "Optional. Whether [OS Login](https://cloud.google.com/compute/docs/oslogin) should be enabled on login node instances.",
        ).optional(),
        enablePublicIps: z.boolean().describe(
          "Optional. Whether login node instances should be assigned [external IP addresses](https://cloud.google.com/compute/docs/ip-addresses#externaladdresses).",
        ).optional(),
        instances: z.array(z.object({
          instance: z.unknown().describe(
            "Output only. Name of the VM instance, in the format `projects/{project}/zones/{zone}/instances/{instance}`.",
          ).optional(),
        })).describe(
          "Output only. Information about the login node instances that were created in Compute Engine.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "Optional. [Labels](https://cloud.google.com/compute/docs/labeling-resources) that should be applied to each login node instance.",
        ).optional(),
        machineType: z.string().describe(
          "Required. Name of the Compute Engine [machine type](https://cloud.google.com/compute/docs/machine-resource) to use for login nodes, e.g. `n2-standard-2`.",
        ).optional(),
        startupScript: z.string().describe(
          "Optional. [Startup script](https://cloud.google.com/compute/docs/instances/startup-scripts/linux) to be run on each login node instance. Max 256KB. The script must complete within the system-defined default timeout of 5 minutes. For tasks that require more time, consider running them in the background using methods such as `&` or `nohup`.",
        ).optional(),
        storageConfigs: z.array(z.object({
          id: z.unknown().describe(
            "Required. ID of the storage resource to mount, which must match a key in the cluster's storage_resources.",
          ).optional(),
          localMount: z.unknown().describe(
            "Required. A directory inside the VM instance's file system where the storage resource should be mounted (e.g., `/mnt/share`).",
          ).optional(),
        })).describe(
          "Optional. How storage resources should be mounted on each login node.",
        ).optional(),
        zone: z.string().describe(
          "Required. Name of the zone in which login nodes should run, e.g., `us-central1-a`. Must be in the same region as the cluster, and must match the zone of any other resources specified in the cluster.",
        ).optional(),
      }).describe(
        "Configuration for Slurm [login nodes](https://slurm.schedmd.com/quickstart_admin.html#login) in the cluster. Login nodes are Compute Engine VM instances that allow users to access the cluster over SSH.",
      ).optional(),
      nodeSets: z.array(z.object({
        computeId: z.string().describe(
          "Optional. ID of the compute resource on which this nodeset will run. Must match a key in the cluster's compute_resources.",
        ).optional(),
        computeInstance: z.object({
          bootDisk: z.unknown().describe(
            "A [Persistent disk](https://cloud.google.com/compute/docs/disks) used as the boot disk for a Compute Engine VM instance.",
          ).optional(),
          labels: z.unknown().describe(
            "Optional. [Labels](https://cloud.google.com/compute/docs/labeling-resources) that should be applied to each VM instance in the nodeset.",
          ).optional(),
          startupScript: z.unknown().describe(
            "Optional. [Startup script](https://cloud.google.com/compute/docs/instances/startup-scripts/linux) to be run on each VM instance in the nodeset. Max 256KB.",
          ).optional(),
        }).describe(
          "When set in a SlurmNodeSet, indicates that the nodeset should be backed by Compute Engine VM instances.",
        ).optional(),
        id: z.string().describe(
          "Required. Identifier for the nodeset, which allows it to be referenced by partitions. Must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
        ).optional(),
        maxDynamicNodeCount: z.string().describe(
          "Optional. Controls how many additional nodes a cluster can bring online to handle workloads. Set this value to enable dynamic node creation and limit the number of additional nodes the cluster can bring online. Leave empty if you do not want the cluster to create nodes dynamically, and instead rely only on static nodes.",
        ).optional(),
        staticNodeCount: z.string().describe(
          "Optional. Number of nodes to be statically created for this nodeset. The cluster will attempt to ensure that at least this many nodes exist at all times.",
        ).optional(),
        storageConfigs: z.array(z.unknown()).describe(
          "Optional. How storage resources should be mounted on each compute node.",
        ).optional(),
      })).describe(
        "Optional. Compute resource configuration for the Slurm nodesets in your cluster. If not specified, the cluster won't create any nodes.",
      ).optional(),
      partitions: z.array(z.object({
        id: z.string().describe(
          "Required. ID of the partition, which is how users will identify it. Must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
        ).optional(),
        nodeSetIds: z.array(z.unknown()).describe(
          "Required. IDs of the nodesets that make up this partition. Values must match SlurmNodeSet.id.",
        ).optional(),
      })).describe(
        "Optional. Configuration for the Slurm partitions in your cluster. Each partition can contain one or more nodesets, and you can submit separate jobs on each partition. If you don't specify at least one partition in your cluster, you can't submit jobs to the cluster.",
      ).optional(),
      prologBashScripts: z.array(z.string()).describe(
        "Optional. Slurm [prolog scripts](https://slurm.schedmd.com/prolog_epilog.html), which will be executed by compute nodes before a node begins running a new job. Values must not be empty.",
      ).optional(),
    }).describe(
      "When set in Orchestrator, indicates that the cluster should use [Slurm](https://slurm.schedmd.com/) as the orchestrator.",
    ).optional(),
  }).describe(
    "The component responsible for scheduling and running workloads on the cluster as well as providing the user interface for interacting with the cluster at runtime.",
  ).optional(),
  storageResources: z.record(
    z.string(),
    z.object({
      bucket: z.object({
        bucket: z.string().describe("Output only. Name of the bucket.")
          .optional(),
      }).describe(
        "A reference to a [Google Cloud Storage](https://cloud.google.com/storage) bucket.",
      ).optional(),
      config: z.object({
        existingBucket: z.object({
          bucket: z.string().describe(
            "Required. Immutable. Name of the Cloud Storage bucket to import.",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that an existing [Google Cloud Storage](https://cloud.google.com/storage) bucket should be imported.",
        ).optional(),
        existingFilestore: z.object({
          filestore: z.string().describe(
            "Required. Immutable. Name of the Filestore instance to import, in the format `projects/{project}/locations/{location}/instances/{instance}`",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that an existing [Filestore](https://cloud.google.com/filestore) instance should be imported.",
        ).optional(),
        existingLustre: z.object({
          lustre: z.string().describe(
            "Required. Immutable. Name of the Managed Lustre instance to import, in the format `projects/{project}/locations/{location}/instances/{instance}`",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that an existing [Managed Lustre](https://cloud.google.com/products/managed-lustre) instance should be imported.",
        ).optional(),
        newBucket: z.object({
          autoclass: z.object({
            enabled: z.unknown().describe(
              "Required. Enables Auto-class feature.",
            ).optional(),
            terminalStorageClass: z.unknown().describe(
              "Optional. Terminal storage class of the autoclass bucket",
            ).optional(),
          }).describe(
            "Message describing Google Cloud Storage autoclass configuration",
          ).optional(),
          bucket: z.string().describe(
            "Required. Immutable. Name of the Cloud Storage bucket to create.",
          ).optional(),
          hierarchicalNamespace: z.object({
            enabled: z.unknown().describe(
              "Required. Enables hierarchical namespace setup for the bucket.",
            ).optional(),
          }).describe(
            "Message describing Google Cloud Storage hierarchical namespace configuration",
          ).optional(),
          storageClass: z.enum([
            "STORAGE_CLASS_UNSPECIFIED",
            "STANDARD",
            "NEARLINE",
            "COLDLINE",
            "ARCHIVE",
          ]).describe(
            "Optional. Immutable. If set, uses the provided storage class as the bucket's default storage class.",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that a new [Google Cloud Storage](https://cloud.google.com/storage) bucket should be created.",
        ).optional(),
        newFilestore: z.object({
          description: z.string().describe(
            "Optional. Immutable. Description of the instance. Maximum of 2048 characters.",
          ).optional(),
          fileShares: z.array(z.unknown()).describe(
            "Required. Immutable. File system shares on the instance. Exactly one file share must be specified.",
          ).optional(),
          filestore: z.string().describe(
            "Required. Immutable. Name of the Filestore instance to create, in the format `projects/{project}/locations/{location}/instances/{instance}`",
          ).optional(),
          protocol: z.enum(["PROTOCOL_UNSPECIFIED", "NFSV3", "NFSV41"])
            .describe(
              "Optional. Immutable. Access protocol to use for all file shares in the instance. Defaults to NFS V3 if not set.",
            ).optional(),
          tier: z.enum(["TIER_UNSPECIFIED", "ZONAL", "REGIONAL"]).describe(
            "Required. Immutable. Service tier to use for the instance.",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that a new [Filestore](https://cloud.google.com/filestore) instance should be created.",
        ).optional(),
        newLustre: z.object({
          capacityGb: z.string().describe(
            "Required. Immutable. Storage capacity of the instance in gibibytes (GiB). Allowed values are between 18000 and 7632000.",
          ).optional(),
          description: z.string().describe(
            "Optional. Immutable. Description of the Managed Lustre instance. Maximum of 2048 characters.",
          ).optional(),
          filesystem: z.string().describe(
            "Required. Immutable. Filesystem name for this instance. This name is used by client-side tools, including when mounting the instance. Must be 8 characters or less and can only contain letters and numbers.",
          ).optional(),
          lustre: z.string().describe(
            "Required. Immutable. Name of the Managed Lustre instance to create, in the format `projects/{project}/locations/{location}/instances/{instance}`",
          ).optional(),
        }).describe(
          "When set in a StorageResourceConfig, indicates that a new [Managed Lustre](https://cloud.google.com/products/managed-lustre) instance should be created.",
        ).optional(),
      }).describe(
        "Describes how a storage resource should be initialized. Each storage resource can either be imported from an existing Google Cloud resource or initialized when the cluster is created.",
      ).optional(),
      filestore: z.object({
        filestore: z.string().describe(
          "Output only. Name of the Filestore instance, in the format `projects/{project}/locations/{location}/instances/{instance}`",
        ).optional(),
      }).describe(
        "A reference to a [Filestore](https://cloud.google.com/filestore) instance.",
      ).optional(),
      lustre: z.object({
        lustre: z.string().describe(
          "Output only. Name of the Managed Lustre instance, in the format `projects/{project}/locations/{location}/instances/{instance}`",
        ).optional(),
      }).describe(
        "A reference to a [Managed Lustre](https://cloud.google.com/products/managed-lustre) instance.",
      ).optional(),
    }),
  ).describe(
    "Optional. Storage resources available to the cluster. Keys specify the ID of the storage resource by which it can be referenced elsewhere, and must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
  ).optional(),
  clusterId: z.string().describe(
    "Required. ID of the cluster to create. Must conform to [RFC-1034](https://datatracker.ietf.org/doc/html/rfc1034) (lower-case, alphanumeric, and at most 63 characters).",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique identifier for this request. A random UUID is recommended. This request is idempotent if and only if `request_id` is provided.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Cluster Director Clusters. Registered at `@swamp/gcp/hypercomputecluster/clusters`. */
export const model = {
  type: "@swamp/gcp/hypercomputecluster/clusters",
  version: "2026.05.19.2",
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
      toVersion: "2026.04.09.1",
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
      toVersion: "2026.05.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A collection of virtual machines and connected resources forming a high-perfo...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a clusters",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["computeResources"] !== undefined) {
          body["computeResources"] = g["computeResources"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkResources"] !== undefined) {
          body["networkResources"] = g["networkResources"];
        }
        if (g["orchestrator"] !== undefined) {
          body["orchestrator"] = g["orchestrator"];
        }
        if (g["storageResources"] !== undefined) {
          body["storageResources"] = g["storageResources"];
        }
        if (g["clusterId"] !== undefined) body["clusterId"] = g["clusterId"];
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
      description: "Get a clusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the clusters"),
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
      description: "Update clusters attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["computeResources"] !== undefined) {
          body["computeResources"] = g["computeResources"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["networkResources"] !== undefined) {
          body["networkResources"] = g["networkResources"];
        }
        if (g["orchestrator"] !== undefined) {
          body["orchestrator"] = g["orchestrator"];
        }
        if (g["storageResources"] !== undefined) {
          body["storageResources"] = g["storageResources"];
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
      description: "Delete the clusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the clusters"),
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
      description: "Sync clusters state from GCP",
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
  },
};
