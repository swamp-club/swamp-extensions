// Auto-generated extension model for @swamp/gcp/datafusion/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Data Fusion Instances.
 *
 * Represents a Data Fusion instance.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://datafusion.googleapis.com/";

const GET_CONFIG = {
  "id": "datafusion.projects.locations.instances.get",
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
  "id": "datafusion.projects.locations.instances.create",
  "path": "v1/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "instanceId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "datafusion.projects.locations.instances.patch",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "datafusion.projects.locations.instances.delete",
  "path": "v1/{+name}",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  cryptoKeyConfig: z.object({
    keyReference: z.string().describe(
      "Optional. The name of the key which is used to encrypt/decrypt customer data. For key in Cloud KMS, the key should be in the format of `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
    ).optional(),
  }).describe(
    "The crypto key configuration. This field is used by the Customer-managed encryption keys (CMEK) feature.",
  ).optional(),
  dataplexDataLineageIntegrationEnabled: z.boolean().describe(
    "Optional. Option to enable the Dataplex Lineage Integration feature.",
  ).optional(),
  dataprocServiceAccount: z.string().describe(
    "Optional. User-managed service account to set on Dataproc when Cloud Data Fusion creates Dataproc to run data processing pipelines. This allows users to have fine-grained access control on Dataproc's accesses to cloud resources.",
  ).optional(),
  description: z.string().describe("Optional. A description of this instance.")
    .optional(),
  displayName: z.string().describe("Optional. Display name for an instance.")
    .optional(),
  enableRbac: z.boolean().describe(
    "Optional. Option to enable granular role-based access control.",
  ).optional(),
  enableStackdriverLogging: z.boolean().describe(
    "Optional. Option to enable Dataproc Stackdriver Logging.",
  ).optional(),
  enableStackdriverMonitoring: z.boolean().describe(
    "Optional. Option to enable Stackdriver Monitoring.",
  ).optional(),
  eventPublishConfig: z.object({
    enabled: z.boolean().describe(
      "Required. Option to enable Event Publishing.",
    ).optional(),
    topic: z.string().describe(
      "Required. The resource name of the Pub/Sub topic. Format: projects/{project_id}/topics/{topic_id}",
    ).optional(),
  }).describe("Confirguration of PubSubEventWriter.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The resource labels for instance to use to annotate any related underlying resources such as Compute Engine VMs. The character '=' is not allowed to be used within the labels.",
  ).optional(),
  loggingConfig: z.object({
    enableInstanceV2Logs: z.boolean().describe(
      "Optional. Option to enable the InstanceV2 logging for this instance. This field is supported only in CDF patch revision versions 6.11.1.1 and above.",
    ).optional(),
    instanceCloudLoggingDisabled: z.boolean().describe(
      "Optional. Option to determine whether instance logs should be written to Cloud Logging. By default, instance logs are written to Cloud Logging.",
    ).optional(),
  }).describe("Logging configuration for a Data Fusion instance.").optional(),
  maintenancePolicy: z.object({
    maintenanceExclusionWindow: z.object({
      endTime: z.string().describe(
        'Required. The end time of the time window provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. The end time should take place after the start time. Example: "2024-01-02T12:04:06-06:00"',
      ).optional(),
      startTime: z.string().describe(
        'Required. The start time of the time window provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. Example: "2024-01-01T12:04:06-04:00"',
      ).optional(),
    }).describe("Represents an arbitrary window of time.").optional(),
    maintenanceWindow: z.object({
      recurringTimeWindow: z.object({
        recurrence: z.string().describe(
          'Required. An RRULE with format [RFC-5545](https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how this window reccurs. They go on for the span of time between the start and end time. The only supported FREQ value is "WEEKLY". To have something repeat every weekday, use: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR". This specifies how frequently the window starts. To have a 9 am - 5 pm UTC-4 window every weekday, use something like: ` start time = 2019-01-01T09:00:00-0400 end time = 2019-01-01T17:00:00-0400 recurrence = FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR `',
        ).optional(),
        window: z.object({
          endTime: z.string().describe(
            'Required. The end time of the time window provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. The end time should take place after the start time. Example: "2024-01-02T12:04:06-06:00"',
          ).optional(),
          startTime: z.string().describe(
            'Required. The start time of the time window provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. Example: "2024-01-01T12:04:06-04:00"',
          ).optional(),
        }).describe("Represents an arbitrary window of time.").optional(),
      }).describe("Represents an arbitrary window of time that recurs.")
        .optional(),
    }).describe("Maintenance window of the instance.").optional(),
  }).describe("Maintenance policy of the instance.").optional(),
  monitoringConfig: z.object({
    enableInstanceV2Metrics: z.boolean().describe(
      "Optional. Option to enable the instance v2 metrics for this instance. This field is supported only in CDF versions 6.11.1.1 and above.",
    ).optional(),
  }).describe("Monitoring configuration for a Data Fusion instance.")
    .optional(),
  networkConfig: z.object({
    connectionType: z.enum([
      "CONNECTION_TYPE_UNSPECIFIED",
      "VPC_PEERING",
      "PRIVATE_SERVICE_CONNECT_INTERFACES",
    ]).describe(
      "Optional. Type of connection for establishing private IP connectivity between the Data Fusion customer project VPC and the corresponding tenant project from a predefined list of available connection modes. If this field is unspecified for a private instance, VPC peering is used.",
    ).optional(),
    ipAllocation: z.string().describe(
      "Optional. The IP range in CIDR notation to use for the managed Data Fusion instance nodes. This range must not overlap with any other ranges used in the Data Fusion instance network. This is required only when using connection type VPC_PEERING. Format: a.b.c.d/22 Example: 192.168.0.0/22",
    ).optional(),
    network: z.string().describe(
      "Optional. Name of the network in the customer project with which the Tenant Project will be peered for executing pipelines. In case of shared VPC where the network resides in another host project the network should specified in the form of projects/{host-project-id}/global/networks/{network}. This is only required for connectivity type VPC_PEERING.",
    ).optional(),
    privateServiceConnectConfig: z.object({
      effectiveUnreachableCidrBlock: z.string().describe(
        "Output only. The CIDR block to which the CDF instance can't route traffic to in the consumer project VPC. The size of this block is /25. The format of this field is governed by RFC 4632. Example: 240.0.0.0/25",
      ).optional(),
      networkAttachment: z.string().describe(
        "Required. The reference to the network attachment used to establish private connectivity. It will be of the form projects/{project-id}/regions/{region}/networkAttachments/{network-attachment-id}.",
      ).optional(),
      unreachableCidrBlock: z.string().describe(
        "Optional. Input only. The CIDR block to which the CDF instance can't route traffic to in the consumer project VPC. The size of this block should be at least /25. This range should not overlap with the primary address range of any subnetwork used by the network attachment. This range can be used for other purposes in the consumer VPC as long as there is no requirement for CDF to reach destinations using these addresses. If this value is not provided, the server chooses a non RFC 1918 address range. The format of this field is governed by RFC 4632. Example: 192.168.0.0/25",
      ).optional(),
    }).describe(
      "Configuration for using Private Service Connect to establish connectivity between the Data Fusion consumer project and the corresponding tenant project.",
    ).optional(),
  }).describe(
    "Network configuration for a Data Fusion instance. These configurations are used for peering with the customer network. Configurations are optional when a public Data Fusion instance is to be created. However, providing these configurations allows several benefits, such as reduced network latency while accessing the customer resources from managed Data Fusion instance nodes, as well as access to the customer on-prem resources.",
  ).optional(),
  options: z.record(z.string(), z.string()).describe(
    "Optional. Map of additional options used to configure the behavior of Data Fusion instance.",
  ).optional(),
  patchRevision: z.string().describe(
    "Optional. Current patch revision of the Data Fusion.",
  ).optional(),
  privateInstance: z.boolean().describe(
    "Optional. Specifies whether the Data Fusion instance should be private. If set to true, all Data Fusion nodes will have private IP addresses and will not be able to access the public internet.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "BASIC", "ENTERPRISE", "DEVELOPER"])
    .describe("Required. Instance type.").optional(),
  version: z.string().describe(
    "Optional. Current version of the Data Fusion. Only specifiable in Update.",
  ).optional(),
  zone: z.string().describe(
    "Optional. Name of the zone in which the Data Fusion instance will be created. Only DEVELOPER instances use this field.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. The name of the instance to create. Instance name can only contain lowercase alphanumeric characters and hyphens. It must start with a letter and must not end with a hyphen. It can have a maximum of 30 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  accelerators: z.array(z.object({
    acceleratorType: z.string(),
    state: z.string(),
  })).optional(),
  apiEndpoint: z.string().optional(),
  availableVersion: z.array(z.object({
    availableFeatures: z.array(z.string()),
    defaultVersion: z.boolean(),
    type: z.string(),
    versionNumber: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  cryptoKeyConfig: z.object({
    keyReference: z.string(),
  }).optional(),
  dataplexDataLineageIntegrationEnabled: z.boolean().optional(),
  dataprocServiceAccount: z.string().optional(),
  description: z.string().optional(),
  disabledReason: z.array(z.string()).optional(),
  displayName: z.string().optional(),
  enableRbac: z.boolean().optional(),
  enableStackdriverLogging: z.boolean().optional(),
  enableStackdriverMonitoring: z.boolean().optional(),
  enableZoneSeparation: z.boolean().optional(),
  eventPublishConfig: z.object({
    enabled: z.boolean(),
    topic: z.string(),
  }).optional(),
  gcsBucket: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  loggingConfig: z.object({
    enableInstanceV2Logs: z.boolean(),
    instanceCloudLoggingDisabled: z.boolean(),
  }).optional(),
  maintenanceEvents: z.array(z.object({
    endTime: z.string(),
    startTime: z.string(),
    state: z.string(),
  })).optional(),
  maintenancePolicy: z.object({
    maintenanceExclusionWindow: z.object({
      endTime: z.string(),
      startTime: z.string(),
    }),
    maintenanceWindow: z.object({
      recurringTimeWindow: z.object({
        recurrence: z.string(),
        window: z.object({
          endTime: z.string(),
          startTime: z.string(),
        }),
      }),
    }),
  }).optional(),
  monitoringConfig: z.object({
    enableInstanceV2Metrics: z.boolean(),
  }).optional(),
  name: z.string(),
  networkConfig: z.object({
    connectionType: z.string(),
    ipAllocation: z.string(),
    network: z.string(),
    privateServiceConnectConfig: z.object({
      effectiveUnreachableCidrBlock: z.string(),
      networkAttachment: z.string(),
      unreachableCidrBlock: z.string(),
    }),
  }).optional(),
  options: z.record(z.string(), z.unknown()).optional(),
  p4ServiceAccount: z.string().optional(),
  patchRevision: z.string().optional(),
  privateInstance: z.boolean().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  serviceAccount: z.string().optional(),
  serviceEndpoint: z.string().optional(),
  state: z.string().optional(),
  stateMessage: z.string().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  tenantProjectId: z.string().optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
  version: z.string().optional(),
  workforceIdentityServiceEndpoint: z.string().optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  cryptoKeyConfig: z.object({
    keyReference: z.string().describe(
      "Optional. The name of the key which is used to encrypt/decrypt customer data. For key in Cloud KMS, the key should be in the format of `projects/*/locations/*/keyRings/*/cryptoKeys/*`.",
    ).optional(),
  }).describe(
    "The crypto key configuration. This field is used by the Customer-managed encryption keys (CMEK) feature.",
  ).optional(),
  dataplexDataLineageIntegrationEnabled: z.boolean().describe(
    "Optional. Option to enable the Dataplex Lineage Integration feature.",
  ).optional(),
  dataprocServiceAccount: z.string().describe(
    "Optional. User-managed service account to set on Dataproc when Cloud Data Fusion creates Dataproc to run data processing pipelines. This allows users to have fine-grained access control on Dataproc's accesses to cloud resources.",
  ).optional(),
  description: z.string().describe("Optional. A description of this instance.")
    .optional(),
  displayName: z.string().describe("Optional. Display name for an instance.")
    .optional(),
  enableRbac: z.boolean().describe(
    "Optional. Option to enable granular role-based access control.",
  ).optional(),
  enableStackdriverLogging: z.boolean().describe(
    "Optional. Option to enable Dataproc Stackdriver Logging.",
  ).optional(),
  enableStackdriverMonitoring: z.boolean().describe(
    "Optional. Option to enable Stackdriver Monitoring.",
  ).optional(),
  eventPublishConfig: z.object({
    enabled: z.boolean().describe(
      "Required. Option to enable Event Publishing.",
    ).optional(),
    topic: z.string().describe(
      "Required. The resource name of the Pub/Sub topic. Format: projects/{project_id}/topics/{topic_id}",
    ).optional(),
  }).describe("Confirguration of PubSubEventWriter.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The resource labels for instance to use to annotate any related underlying resources such as Compute Engine VMs. The character '=' is not allowed to be used within the labels.",
  ).optional(),
  loggingConfig: z.object({
    enableInstanceV2Logs: z.boolean().describe(
      "Optional. Option to enable the InstanceV2 logging for this instance. This field is supported only in CDF patch revision versions 6.11.1.1 and above.",
    ).optional(),
    instanceCloudLoggingDisabled: z.boolean().describe(
      "Optional. Option to determine whether instance logs should be written to Cloud Logging. By default, instance logs are written to Cloud Logging.",
    ).optional(),
  }).describe("Logging configuration for a Data Fusion instance.").optional(),
  maintenancePolicy: z.object({
    maintenanceExclusionWindow: z.object({
      endTime: z.string().describe(
        'Required. The end time of the time window provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. The end time should take place after the start time. Example: "2024-01-02T12:04:06-06:00"',
      ).optional(),
      startTime: z.string().describe(
        'Required. The start time of the time window provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. Example: "2024-01-01T12:04:06-04:00"',
      ).optional(),
    }).describe("Represents an arbitrary window of time.").optional(),
    maintenanceWindow: z.object({
      recurringTimeWindow: z.object({
        recurrence: z.string().describe(
          'Required. An RRULE with format [RFC-5545](https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how this window reccurs. They go on for the span of time between the start and end time. The only supported FREQ value is "WEEKLY". To have something repeat every weekday, use: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR". This specifies how frequently the window starts. To have a 9 am - 5 pm UTC-4 window every weekday, use something like: ` start time = 2019-01-01T09:00:00-0400 end time = 2019-01-01T17:00:00-0400 recurrence = FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR `',
        ).optional(),
        window: z.object({
          endTime: z.string().describe(
            'Required. The end time of the time window provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. The end time should take place after the start time. Example: "2024-01-02T12:04:06-06:00"',
          ).optional(),
          startTime: z.string().describe(
            'Required. The start time of the time window provided in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. Example: "2024-01-01T12:04:06-04:00"',
          ).optional(),
        }).describe("Represents an arbitrary window of time.").optional(),
      }).describe("Represents an arbitrary window of time that recurs.")
        .optional(),
    }).describe("Maintenance window of the instance.").optional(),
  }).describe("Maintenance policy of the instance.").optional(),
  monitoringConfig: z.object({
    enableInstanceV2Metrics: z.boolean().describe(
      "Optional. Option to enable the instance v2 metrics for this instance. This field is supported only in CDF versions 6.11.1.1 and above.",
    ).optional(),
  }).describe("Monitoring configuration for a Data Fusion instance.")
    .optional(),
  networkConfig: z.object({
    connectionType: z.enum([
      "CONNECTION_TYPE_UNSPECIFIED",
      "VPC_PEERING",
      "PRIVATE_SERVICE_CONNECT_INTERFACES",
    ]).describe(
      "Optional. Type of connection for establishing private IP connectivity between the Data Fusion customer project VPC and the corresponding tenant project from a predefined list of available connection modes. If this field is unspecified for a private instance, VPC peering is used.",
    ).optional(),
    ipAllocation: z.string().describe(
      "Optional. The IP range in CIDR notation to use for the managed Data Fusion instance nodes. This range must not overlap with any other ranges used in the Data Fusion instance network. This is required only when using connection type VPC_PEERING. Format: a.b.c.d/22 Example: 192.168.0.0/22",
    ).optional(),
    network: z.string().describe(
      "Optional. Name of the network in the customer project with which the Tenant Project will be peered for executing pipelines. In case of shared VPC where the network resides in another host project the network should specified in the form of projects/{host-project-id}/global/networks/{network}. This is only required for connectivity type VPC_PEERING.",
    ).optional(),
    privateServiceConnectConfig: z.object({
      effectiveUnreachableCidrBlock: z.string().describe(
        "Output only. The CIDR block to which the CDF instance can't route traffic to in the consumer project VPC. The size of this block is /25. The format of this field is governed by RFC 4632. Example: 240.0.0.0/25",
      ).optional(),
      networkAttachment: z.string().describe(
        "Required. The reference to the network attachment used to establish private connectivity. It will be of the form projects/{project-id}/regions/{region}/networkAttachments/{network-attachment-id}.",
      ).optional(),
      unreachableCidrBlock: z.string().describe(
        "Optional. Input only. The CIDR block to which the CDF instance can't route traffic to in the consumer project VPC. The size of this block should be at least /25. This range should not overlap with the primary address range of any subnetwork used by the network attachment. This range can be used for other purposes in the consumer VPC as long as there is no requirement for CDF to reach destinations using these addresses. If this value is not provided, the server chooses a non RFC 1918 address range. The format of this field is governed by RFC 4632. Example: 192.168.0.0/25",
      ).optional(),
    }).describe(
      "Configuration for using Private Service Connect to establish connectivity between the Data Fusion consumer project and the corresponding tenant project.",
    ).optional(),
  }).describe(
    "Network configuration for a Data Fusion instance. These configurations are used for peering with the customer network. Configurations are optional when a public Data Fusion instance is to be created. However, providing these configurations allows several benefits, such as reduced network latency while accessing the customer resources from managed Data Fusion instance nodes, as well as access to the customer on-prem resources.",
  ).optional(),
  options: z.record(z.string(), z.string()).describe(
    "Optional. Map of additional options used to configure the behavior of Data Fusion instance.",
  ).optional(),
  patchRevision: z.string().describe(
    "Optional. Current patch revision of the Data Fusion.",
  ).optional(),
  privateInstance: z.boolean().describe(
    "Optional. Specifies whether the Data Fusion instance should be private. If set to true, all Data Fusion nodes will have private IP addresses and will not be able to access the public internet.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "BASIC", "ENTERPRISE", "DEVELOPER"])
    .describe("Required. Instance type.").optional(),
  version: z.string().describe(
    "Optional. Current version of the Data Fusion. Only specifiable in Update.",
  ).optional(),
  zone: z.string().describe(
    "Optional. Name of the zone in which the Data Fusion instance will be created. Only DEVELOPER instances use this field.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. The name of the instance to create. Instance name can only contain lowercase alphanumeric characters and hyphens. It must start with a letter and must not end with a hyphen. It can have a maximum of 30 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Data Fusion Instances. Registered at `@swamp/gcp/datafusion/instances`. */
export const model = {
  type: "@swamp/gcp/datafusion/instances",
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
      toVersion: "2026.05.18.2",
      description: "Added: location",
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
      description: "Represents a Data Fusion instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["cryptoKeyConfig"] !== undefined) {
          body["cryptoKeyConfig"] = g["cryptoKeyConfig"];
        }
        if (g["dataplexDataLineageIntegrationEnabled"] !== undefined) {
          body["dataplexDataLineageIntegrationEnabled"] =
            g["dataplexDataLineageIntegrationEnabled"];
        }
        if (g["dataprocServiceAccount"] !== undefined) {
          body["dataprocServiceAccount"] = g["dataprocServiceAccount"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableRbac"] !== undefined) body["enableRbac"] = g["enableRbac"];
        if (g["enableStackdriverLogging"] !== undefined) {
          body["enableStackdriverLogging"] = g["enableStackdriverLogging"];
        }
        if (g["enableStackdriverMonitoring"] !== undefined) {
          body["enableStackdriverMonitoring"] =
            g["enableStackdriverMonitoring"];
        }
        if (g["eventPublishConfig"] !== undefined) {
          body["eventPublishConfig"] = g["eventPublishConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["loggingConfig"] !== undefined) {
          body["loggingConfig"] = g["loggingConfig"];
        }
        if (g["maintenancePolicy"] !== undefined) {
          body["maintenancePolicy"] = g["maintenancePolicy"];
        }
        if (g["monitoringConfig"] !== undefined) {
          body["monitoringConfig"] = g["monitoringConfig"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["options"] !== undefined) body["options"] = g["options"];
        if (g["patchRevision"] !== undefined) {
          body["patchRevision"] = g["patchRevision"];
        }
        if (g["privateInstance"] !== undefined) {
          body["privateInstance"] = g["privateInstance"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["version"] !== undefined) body["version"] = g["version"];
        if (g["zone"] !== undefined) body["zone"] = g["zone"];
        if (g["instanceId"] !== undefined) body["instanceId"] = g["instanceId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
    update: {
      description: "Update instances attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["cryptoKeyConfig"] !== undefined) {
          body["cryptoKeyConfig"] = g["cryptoKeyConfig"];
        }
        if (g["dataplexDataLineageIntegrationEnabled"] !== undefined) {
          body["dataplexDataLineageIntegrationEnabled"] =
            g["dataplexDataLineageIntegrationEnabled"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableRbac"] !== undefined) body["enableRbac"] = g["enableRbac"];
        if (g["enableStackdriverLogging"] !== undefined) {
          body["enableStackdriverLogging"] = g["enableStackdriverLogging"];
        }
        if (g["enableStackdriverMonitoring"] !== undefined) {
          body["enableStackdriverMonitoring"] =
            g["enableStackdriverMonitoring"];
        }
        if (g["eventPublishConfig"] !== undefined) {
          body["eventPublishConfig"] = g["eventPublishConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["loggingConfig"] !== undefined) {
          body["loggingConfig"] = g["loggingConfig"];
        }
        if (g["maintenancePolicy"] !== undefined) {
          body["maintenancePolicy"] = g["maintenancePolicy"];
        }
        if (g["monitoringConfig"] !== undefined) {
          body["monitoringConfig"] = g["monitoringConfig"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["options"] !== undefined) body["options"] = g["options"];
        if (g["patchRevision"] !== undefined) {
          body["patchRevision"] = g["patchRevision"];
        }
        if (g["privateInstance"] !== undefined) {
          body["privateInstance"] = g["privateInstance"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["version"] !== undefined) body["version"] = g["version"];
        if (g["zone"] !== undefined) body["zone"] = g["zone"];
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
              "statusField": "state",
              "readyValues": ["ACTIVE"],
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Sync instances state from GCP",
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
    restart: {
      description: "restart",
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
            "id": "datafusion.projects.locations.instances.restart",
            "path": "v1/{+name}:restart",
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
