// Auto-generated extension model for @swamp/gcp/tpu/queuedresources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud TPU QueuedResources.
 *
 * A QueuedResource represents a request for resources that will be placed in a queue and fulfilled when the necessary resources are available.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/queuedResources/${shortName}`;
}

const BASE_URL = "https://tpu.googleapis.com/";

const GET_CONFIG = {
  "id": "tpu.projects.locations.queuedResources.get",
  "path": "v2/{+name}",
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
  "id": "tpu.projects.locations.queuedResources.create",
  "path": "v2/{+parent}/queuedResources",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "queuedResourceId": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "tpu.projects.locations.queuedResources.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  guaranteed: z.object({
    minDuration: z.string().describe(
      "Optional. Defines the minimum duration of the guarantee. If specified, the requested resources will only be provisioned if they can be allocated for at least the given duration.",
    ).optional(),
  }).describe("Guaranteed tier definition.").optional(),
  queueingPolicy: z.object({
    validAfterDuration: z.string().describe(
      "Optional. A relative time after which resources may be created.",
    ).optional(),
    validAfterTime: z.string().describe(
      "Optional. An absolute time after which resources may be created.",
    ).optional(),
    validInterval: z.object({
      endTime: z.string().describe(
        "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
      ).optional(),
      startTime: z.string().describe(
        "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
      ).optional(),
    }).describe(
      "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
    ).optional(),
    validUntilDuration: z.string().describe(
      "Optional. A relative time after which resources should not be created. If the request cannot be fulfilled by this time the request will be failed.",
    ).optional(),
    validUntilTime: z.string().describe(
      "Optional. An absolute time after which resources should not be created. If the request cannot be fulfilled by this time the request will be failed.",
    ).optional(),
  }).describe("Defines the policy of the QueuedRequest.").optional(),
  reservationName: z.string().describe(
    "Optional. Name of the reservation in which the resource should be provisioned. Format: projects/{project}/locations/{zone}/reservations/{reservation}",
  ).optional(),
  spot: z.object({}).describe("Spot tier definition.").optional(),
  state: z.object({
    acceptedData: z.object({}).describe("Further data for the accepted state.")
      .optional(),
    activeData: z.object({}).describe("Further data for the active state.")
      .optional(),
    creatingData: z.object({}).describe("Further data for the creating state.")
      .optional(),
    deletingData: z.object({}).describe("Further data for the deleting state.")
      .optional(),
    failedData: z.object({
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
    }).describe("Further data for the failed state.").optional(),
    provisioningData: z.object({}).describe(
      "Further data for the provisioning state.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "ACCEPTED",
      "PROVISIONING",
      "FAILED",
      "DELETING",
      "ACTIVE",
      "SUSPENDING",
      "SUSPENDED",
      "WAITING_FOR_RESOURCES",
    ]).describe("Output only. State of the QueuedResource request.").optional(),
    stateInitiator: z.enum(["STATE_INITIATOR_UNSPECIFIED", "USER", "SERVICE"])
      .describe(
        "Output only. The initiator of the QueuedResources's current state. Used to indicate whether the SUSPENDING/SUSPENDED state was initiated by the user or the service.",
      ).optional(),
    suspendedData: z.object({}).describe(
      "Further data for the suspended state.",
    ).optional(),
    suspendingData: z.object({}).describe(
      "Further data for the suspending state.",
    ).optional(),
  }).describe(
    "QueuedResourceState defines the details of the QueuedResource request.",
  ).optional(),
  tpu: z.object({
    nodeSpec: z.array(z.object({
      multisliceParams: z.object({
        nodeCount: z.number().int().describe(
          'Required. Number of nodes with this spec. The system will attempt to provision "node_count" nodes as part of the request. This needs to be > 1.',
        ).optional(),
        nodeIdPrefix: z.string().describe(
          'Optional. Prefix of node_ids in case of multislice request. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. If node_count = 3 and node_id_prefix = "np", node ids of nodes created will be "np-0", "np-1", "np-2". If this field is not provided we use queued_resource_id as the node_id_prefix.',
        ).optional(),
      }).describe(
        "Parameters to specify for multislice QueuedResource requests. This message must be populated in case of multislice requests instead of node_id.",
      ).optional(),
      node: z.object({
        acceleratorConfig: z.object({
          topology: z.unknown().describe("Required. Topology of TPU in chips.")
            .optional(),
          type: z.unknown().describe("Required. Type of TPU.").optional(),
        }).describe("A TPU accelerator configuration.").optional(),
        acceleratorType: z.string().describe(
          "Optional. The type of hardware accelerators associated with this node.",
        ).optional(),
        apiVersion: z.enum([
          "API_VERSION_UNSPECIFIED",
          "V1_ALPHA1",
          "V1",
          "V2_ALPHA1",
          "V2",
        ]).describe("Output only. The API version that created this Node.")
          .optional(),
        bootDiskConfig: z.object({
          customerEncryptionKey: z.unknown().describe(
            "Defines the customer encryption key for disk encryption.",
          ).optional(),
        }).describe("Sets the boot disk configuration for the TPU node.")
          .optional(),
        cidrBlock: z.string().describe(
          "The CIDR block that the TPU node will use when selecting an IP address. This CIDR block must be a /29 block; the Compute Engine networks API forbids a smaller block, and using a larger block would be wasteful (a node can only consume one IP address). Errors will occur if the CIDR block has already been used for a currently existing TPU node, the CIDR block conflicts with any subnetworks in the user's provided network, or the provided network is peered with another network that is using that CIDR block.",
        ).optional(),
        createTime: z.string().describe(
          "Output only. The time when the node was created.",
        ).optional(),
        dataDisks: z.array(z.unknown()).describe(
          "The additional data disks for the Node.",
        ).optional(),
        description: z.string().describe(
          "The user-supplied description of the TPU. Maximum of 512 characters.",
        ).optional(),
        health: z.enum([
          "HEALTH_UNSPECIFIED",
          "HEALTHY",
          "TIMEOUT",
          "UNHEALTHY_TENSORFLOW",
          "UNHEALTHY_MAINTENANCE",
        ]).describe("The health status of the TPU node.").optional(),
        healthDescription: z.string().describe(
          "Output only. If this field is populated, it contains a description of why the TPU Node is unhealthy.",
        ).optional(),
        id: z.string().describe(
          "Output only. The unique identifier for the TPU Node.",
        ).optional(),
        labels: z.record(z.string(), z.unknown()).describe(
          "Resource labels to represent user-provided metadata.",
        ).optional(),
        metadata: z.record(z.string(), z.unknown()).describe(
          "Custom metadata to apply to the TPU Node. Can set startup-script and shutdown-script",
        ).optional(),
        multisliceNode: z.boolean().describe(
          "Output only. Whether the Node belongs to a Multislice group.",
        ).optional(),
        name: z.string().describe(
          "Output only. Immutable. The name of the TPU.",
        ).optional(),
        networkConfig: z.object({
          canIpForward: z.unknown().describe(
            "Allows the TPU node to send and receive packets with non-matching destination or source IPs. This is required if you plan to use the TPU workers to forward routes.",
          ).optional(),
          enableExternalIps: z.unknown().describe(
            "Indicates that external IP addresses would be associated with the TPU workers. If set to false, the specified subnetwork or network should have Private Google Access enabled.",
          ).optional(),
          network: z.unknown().describe(
            'The name of the network for the TPU node. It must be a preexisting Google Compute Engine network. If none is provided, "default" will be used.',
          ).optional(),
          queueCount: z.unknown().describe(
            "Optional. Specifies networking queue count for TPU VM instance's network interface.",
          ).optional(),
          subnetwork: z.unknown().describe(
            'The name of the subnetwork for the TPU node. It must be a preexisting Google Compute Engine subnetwork. If none is provided, "default" will be used.',
          ).optional(),
        }).describe("Network related configurations.").optional(),
        networkConfigs: z.array(z.unknown()).describe(
          "Optional. Repeated network configurations for the TPU node. This field is used to specify multiple networks configs for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned.",
        ).optional(),
        networkEndpoints: z.array(z.unknown()).describe(
          "Output only. The network endpoints where TPU workers can be accessed and sent work. It is recommended that runtime clients of the node reach out to the 0th entry in this map first.",
        ).optional(),
        queuedResource: z.string().describe(
          "Output only. The qualified name of the QueuedResource that requested this Node.",
        ).optional(),
        runtimeVersion: z.string().describe(
          "Required. The runtime version running in the Node.",
        ).optional(),
        schedulingConfig: z.object({
          preemptible: z.unknown().describe(
            "Defines whether the node is preemptible.",
          ).optional(),
          reserved: z.unknown().describe(
            "Whether the node is created under a reservation.",
          ).optional(),
          spot: z.unknown().describe(
            "Optional. Defines whether the node is Spot VM.",
          ).optional(),
        }).describe("Sets the scheduling options for this node.").optional(),
        serviceAccount: z.object({
          email: z.unknown().describe(
            "Email address of the service account. If empty, default Compute service account will be used.",
          ).optional(),
          scope: z.unknown().describe(
            "The list of scopes to be made available for this service account. If empty, access to all Cloud APIs will be allowed.",
          ).optional(),
        }).describe("A service account.").optional(),
        shieldedInstanceConfig: z.object({
          enableSecureBoot: z.unknown().describe(
            "Defines whether the instance has Secure Boot enabled.",
          ).optional(),
        }).describe("A set of Shielded Instance options.").optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "CREATING",
          "READY",
          "RESTARTING",
          "REIMAGING",
          "DELETING",
          "REPAIRING",
          "STOPPED",
          "STOPPING",
          "STARTING",
          "PREEMPTED",
          "TERMINATED",
          "HIDING",
          "HIDDEN",
          "UNHIDING",
          "UNKNOWN",
        ]).describe("Output only. The current state for the TPU Node.")
          .optional(),
        symptoms: z.array(z.unknown()).describe(
          "Output only. The Symptoms that have occurred to the TPU Node.",
        ).optional(),
        tags: z.array(z.unknown()).describe(
          "Tags to apply to the TPU Node. Tags are used to identify valid sources or targets for network firewalls.",
        ).optional(),
        upcomingMaintenance: z.object({
          canReschedule: z.unknown().describe(
            "Indicates if the maintenance can be customer triggered.",
          ).optional(),
          latestWindowStartTime: z.unknown().describe(
            "The latest time for the planned maintenance window to start. This timestamp value is in RFC3339 text format.",
          ).optional(),
          maintenanceStatus: z.unknown().describe(
            "The status of the maintenance.",
          ).optional(),
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
      }).describe("A TPU instance.").optional(),
      nodeId: z.string().describe(
        "Optional. The unqualified resource name. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. This is only specified when requesting a single node. In case of multislice requests, multislice_params must be populated instead.",
      ).optional(),
      parent: z.string().describe("Required. The parent resource name.")
        .optional(),
    })).describe("Optional. The TPU node(s) being requested.").optional(),
  }).describe("Details of the TPU resource(s) being requested.").optional(),
  queuedResourceId: z.string().describe(
    "Optional. The unqualified resource name. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format.",
  ).optional(),
  requestId: z.string().describe("Optional. Idempotent request UUID.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  guaranteed: z.object({
    minDuration: z.string(),
  }).optional(),
  name: z.string(),
  queueingPolicy: z.object({
    validAfterDuration: z.string(),
    validAfterTime: z.string(),
    validInterval: z.object({
      endTime: z.string(),
      startTime: z.string(),
    }),
    validUntilDuration: z.string(),
    validUntilTime: z.string(),
  }).optional(),
  reservationName: z.string().optional(),
  spot: z.object({}).optional(),
  state: z.object({
    acceptedData: z.object({}),
    activeData: z.object({}),
    creatingData: z.object({}),
    deletingData: z.object({}),
    failedData: z.object({
      error: z.object({
        code: z.number(),
        details: z.array(z.record(z.string(), z.unknown())),
        message: z.string(),
      }),
    }),
    provisioningData: z.object({}),
    state: z.string(),
    stateInitiator: z.string(),
    suspendedData: z.object({}),
    suspendingData: z.object({}),
  }).optional(),
  tpu: z.object({
    nodeSpec: z.array(z.object({
      multisliceParams: z.object({
        nodeCount: z.number(),
        nodeIdPrefix: z.string(),
      }),
      node: z.object({
        acceleratorConfig: z.object({
          topology: z.unknown(),
          type: z.unknown(),
        }),
        acceleratorType: z.string(),
        apiVersion: z.string(),
        bootDiskConfig: z.object({
          customerEncryptionKey: z.unknown(),
        }),
        cidrBlock: z.string(),
        createTime: z.string(),
        dataDisks: z.array(z.unknown()),
        description: z.string(),
        health: z.string(),
        healthDescription: z.string(),
        id: z.string(),
        labels: z.record(z.string(), z.unknown()),
        metadata: z.record(z.string(), z.unknown()),
        multisliceNode: z.boolean(),
        name: z.string(),
        networkConfig: z.object({
          canIpForward: z.unknown(),
          enableExternalIps: z.unknown(),
          network: z.unknown(),
          queueCount: z.unknown(),
          subnetwork: z.unknown(),
        }),
        networkConfigs: z.array(z.unknown()),
        networkEndpoints: z.array(z.unknown()),
        queuedResource: z.string(),
        runtimeVersion: z.string(),
        schedulingConfig: z.object({
          preemptible: z.unknown(),
          reserved: z.unknown(),
          spot: z.unknown(),
        }),
        serviceAccount: z.object({
          email: z.unknown(),
          scope: z.unknown(),
        }),
        shieldedInstanceConfig: z.object({
          enableSecureBoot: z.unknown(),
        }),
        state: z.string(),
        symptoms: z.array(z.unknown()),
        tags: z.array(z.unknown()),
        upcomingMaintenance: z.object({
          canReschedule: z.unknown(),
          latestWindowStartTime: z.unknown(),
          maintenanceStatus: z.unknown(),
          type: z.unknown(),
          windowEndTime: z.unknown(),
          windowStartTime: z.unknown(),
        }),
      }),
      nodeId: z.string(),
      parent: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  guaranteed: z.object({
    minDuration: z.string().describe(
      "Optional. Defines the minimum duration of the guarantee. If specified, the requested resources will only be provisioned if they can be allocated for at least the given duration.",
    ).optional(),
  }).describe("Guaranteed tier definition.").optional(),
  queueingPolicy: z.object({
    validAfterDuration: z.string().describe(
      "Optional. A relative time after which resources may be created.",
    ).optional(),
    validAfterTime: z.string().describe(
      "Optional. An absolute time after which resources may be created.",
    ).optional(),
    validInterval: z.object({
      endTime: z.string().describe(
        "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
      ).optional(),
      startTime: z.string().describe(
        "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
      ).optional(),
    }).describe(
      "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
    ).optional(),
    validUntilDuration: z.string().describe(
      "Optional. A relative time after which resources should not be created. If the request cannot be fulfilled by this time the request will be failed.",
    ).optional(),
    validUntilTime: z.string().describe(
      "Optional. An absolute time after which resources should not be created. If the request cannot be fulfilled by this time the request will be failed.",
    ).optional(),
  }).describe("Defines the policy of the QueuedRequest.").optional(),
  reservationName: z.string().describe(
    "Optional. Name of the reservation in which the resource should be provisioned. Format: projects/{project}/locations/{zone}/reservations/{reservation}",
  ).optional(),
  spot: z.object({}).describe("Spot tier definition.").optional(),
  state: z.object({
    acceptedData: z.object({}).describe("Further data for the accepted state.")
      .optional(),
    activeData: z.object({}).describe("Further data for the active state.")
      .optional(),
    creatingData: z.object({}).describe("Further data for the creating state.")
      .optional(),
    deletingData: z.object({}).describe("Further data for the deleting state.")
      .optional(),
    failedData: z.object({
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
    }).describe("Further data for the failed state.").optional(),
    provisioningData: z.object({}).describe(
      "Further data for the provisioning state.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "ACCEPTED",
      "PROVISIONING",
      "FAILED",
      "DELETING",
      "ACTIVE",
      "SUSPENDING",
      "SUSPENDED",
      "WAITING_FOR_RESOURCES",
    ]).describe("Output only. State of the QueuedResource request.").optional(),
    stateInitiator: z.enum(["STATE_INITIATOR_UNSPECIFIED", "USER", "SERVICE"])
      .describe(
        "Output only. The initiator of the QueuedResources's current state. Used to indicate whether the SUSPENDING/SUSPENDED state was initiated by the user or the service.",
      ).optional(),
    suspendedData: z.object({}).describe(
      "Further data for the suspended state.",
    ).optional(),
    suspendingData: z.object({}).describe(
      "Further data for the suspending state.",
    ).optional(),
  }).describe(
    "QueuedResourceState defines the details of the QueuedResource request.",
  ).optional(),
  tpu: z.object({
    nodeSpec: z.array(z.object({
      multisliceParams: z.object({
        nodeCount: z.number().int().describe(
          'Required. Number of nodes with this spec. The system will attempt to provision "node_count" nodes as part of the request. This needs to be > 1.',
        ).optional(),
        nodeIdPrefix: z.string().describe(
          'Optional. Prefix of node_ids in case of multislice request. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. If node_count = 3 and node_id_prefix = "np", node ids of nodes created will be "np-0", "np-1", "np-2". If this field is not provided we use queued_resource_id as the node_id_prefix.',
        ).optional(),
      }).describe(
        "Parameters to specify for multislice QueuedResource requests. This message must be populated in case of multislice requests instead of node_id.",
      ).optional(),
      node: z.object({
        acceleratorConfig: z.object({
          topology: z.unknown().describe("Required. Topology of TPU in chips.")
            .optional(),
          type: z.unknown().describe("Required. Type of TPU.").optional(),
        }).describe("A TPU accelerator configuration.").optional(),
        acceleratorType: z.string().describe(
          "Optional. The type of hardware accelerators associated with this node.",
        ).optional(),
        apiVersion: z.enum([
          "API_VERSION_UNSPECIFIED",
          "V1_ALPHA1",
          "V1",
          "V2_ALPHA1",
          "V2",
        ]).describe("Output only. The API version that created this Node.")
          .optional(),
        bootDiskConfig: z.object({
          customerEncryptionKey: z.unknown().describe(
            "Defines the customer encryption key for disk encryption.",
          ).optional(),
        }).describe("Sets the boot disk configuration for the TPU node.")
          .optional(),
        cidrBlock: z.string().describe(
          "The CIDR block that the TPU node will use when selecting an IP address. This CIDR block must be a /29 block; the Compute Engine networks API forbids a smaller block, and using a larger block would be wasteful (a node can only consume one IP address). Errors will occur if the CIDR block has already been used for a currently existing TPU node, the CIDR block conflicts with any subnetworks in the user's provided network, or the provided network is peered with another network that is using that CIDR block.",
        ).optional(),
        createTime: z.string().describe(
          "Output only. The time when the node was created.",
        ).optional(),
        dataDisks: z.array(z.unknown()).describe(
          "The additional data disks for the Node.",
        ).optional(),
        description: z.string().describe(
          "The user-supplied description of the TPU. Maximum of 512 characters.",
        ).optional(),
        health: z.enum([
          "HEALTH_UNSPECIFIED",
          "HEALTHY",
          "TIMEOUT",
          "UNHEALTHY_TENSORFLOW",
          "UNHEALTHY_MAINTENANCE",
        ]).describe("The health status of the TPU node.").optional(),
        healthDescription: z.string().describe(
          "Output only. If this field is populated, it contains a description of why the TPU Node is unhealthy.",
        ).optional(),
        id: z.string().describe(
          "Output only. The unique identifier for the TPU Node.",
        ).optional(),
        labels: z.record(z.string(), z.unknown()).describe(
          "Resource labels to represent user-provided metadata.",
        ).optional(),
        metadata: z.record(z.string(), z.unknown()).describe(
          "Custom metadata to apply to the TPU Node. Can set startup-script and shutdown-script",
        ).optional(),
        multisliceNode: z.boolean().describe(
          "Output only. Whether the Node belongs to a Multislice group.",
        ).optional(),
        name: z.string().describe(
          "Output only. Immutable. The name of the TPU.",
        ).optional(),
        networkConfig: z.object({
          canIpForward: z.unknown().describe(
            "Allows the TPU node to send and receive packets with non-matching destination or source IPs. This is required if you plan to use the TPU workers to forward routes.",
          ).optional(),
          enableExternalIps: z.unknown().describe(
            "Indicates that external IP addresses would be associated with the TPU workers. If set to false, the specified subnetwork or network should have Private Google Access enabled.",
          ).optional(),
          network: z.unknown().describe(
            'The name of the network for the TPU node. It must be a preexisting Google Compute Engine network. If none is provided, "default" will be used.',
          ).optional(),
          queueCount: z.unknown().describe(
            "Optional. Specifies networking queue count for TPU VM instance's network interface.",
          ).optional(),
          subnetwork: z.unknown().describe(
            'The name of the subnetwork for the TPU node. It must be a preexisting Google Compute Engine subnetwork. If none is provided, "default" will be used.',
          ).optional(),
        }).describe("Network related configurations.").optional(),
        networkConfigs: z.array(z.unknown()).describe(
          "Optional. Repeated network configurations for the TPU node. This field is used to specify multiple networks configs for the TPU node. network_config and network_configs are mutually exclusive, you can only specify one of them. If both are specified, an error will be returned.",
        ).optional(),
        networkEndpoints: z.array(z.unknown()).describe(
          "Output only. The network endpoints where TPU workers can be accessed and sent work. It is recommended that runtime clients of the node reach out to the 0th entry in this map first.",
        ).optional(),
        queuedResource: z.string().describe(
          "Output only. The qualified name of the QueuedResource that requested this Node.",
        ).optional(),
        runtimeVersion: z.string().describe(
          "Required. The runtime version running in the Node.",
        ).optional(),
        schedulingConfig: z.object({
          preemptible: z.unknown().describe(
            "Defines whether the node is preemptible.",
          ).optional(),
          reserved: z.unknown().describe(
            "Whether the node is created under a reservation.",
          ).optional(),
          spot: z.unknown().describe(
            "Optional. Defines whether the node is Spot VM.",
          ).optional(),
        }).describe("Sets the scheduling options for this node.").optional(),
        serviceAccount: z.object({
          email: z.unknown().describe(
            "Email address of the service account. If empty, default Compute service account will be used.",
          ).optional(),
          scope: z.unknown().describe(
            "The list of scopes to be made available for this service account. If empty, access to all Cloud APIs will be allowed.",
          ).optional(),
        }).describe("A service account.").optional(),
        shieldedInstanceConfig: z.object({
          enableSecureBoot: z.unknown().describe(
            "Defines whether the instance has Secure Boot enabled.",
          ).optional(),
        }).describe("A set of Shielded Instance options.").optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "CREATING",
          "READY",
          "RESTARTING",
          "REIMAGING",
          "DELETING",
          "REPAIRING",
          "STOPPED",
          "STOPPING",
          "STARTING",
          "PREEMPTED",
          "TERMINATED",
          "HIDING",
          "HIDDEN",
          "UNHIDING",
          "UNKNOWN",
        ]).describe("Output only. The current state for the TPU Node.")
          .optional(),
        symptoms: z.array(z.unknown()).describe(
          "Output only. The Symptoms that have occurred to the TPU Node.",
        ).optional(),
        tags: z.array(z.unknown()).describe(
          "Tags to apply to the TPU Node. Tags are used to identify valid sources or targets for network firewalls.",
        ).optional(),
        upcomingMaintenance: z.object({
          canReschedule: z.unknown().describe(
            "Indicates if the maintenance can be customer triggered.",
          ).optional(),
          latestWindowStartTime: z.unknown().describe(
            "The latest time for the planned maintenance window to start. This timestamp value is in RFC3339 text format.",
          ).optional(),
          maintenanceStatus: z.unknown().describe(
            "The status of the maintenance.",
          ).optional(),
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
      }).describe("A TPU instance.").optional(),
      nodeId: z.string().describe(
        "Optional. The unqualified resource name. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. This is only specified when requesting a single node. In case of multislice requests, multislice_params must be populated instead.",
      ).optional(),
      parent: z.string().describe("Required. The parent resource name.")
        .optional(),
    })).describe("Optional. The TPU node(s) being requested.").optional(),
  }).describe("Details of the TPU resource(s) being requested.").optional(),
  queuedResourceId: z.string().describe(
    "Optional. The unqualified resource name. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format.",
  ).optional(),
  requestId: z.string().describe("Optional. Idempotent request UUID.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud TPU QueuedResources. Registered at `@swamp/gcp/tpu/queuedresources`. */
export const model = {
  type: "@swamp/gcp/tpu/queuedresources",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A QueuedResource represents a request for resources that will be placed in a ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a queuedResources",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["guaranteed"] !== undefined) body["guaranteed"] = g["guaranteed"];
        if (g["queueingPolicy"] !== undefined) {
          body["queueingPolicy"] = g["queueingPolicy"];
        }
        if (g["reservationName"] !== undefined) {
          body["reservationName"] = g["reservationName"];
        }
        if (g["spot"] !== undefined) body["spot"] = g["spot"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["tpu"] !== undefined) body["tpu"] = g["tpu"];
        if (g["queuedResourceId"] !== undefined) {
          body["queuedResourceId"] = g["queuedResourceId"];
        }
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
      description: "Get a queuedResources",
      arguments: z.object({
        identifier: z.string().describe("The name of the queuedResources"),
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
      description: "Delete the queuedResources",
      arguments: z.object({
        identifier: z.string().describe("The name of the queuedResources"),
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
      description: "Sync queuedResources state from GCP",
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
    reset: {
      description: "reset",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "tpu.projects.locations.queuedResources.reset",
            "path": "v2/{+name}:reset",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
